import { useState } from 'react';
import eventi from './eventi';
import curiosita from './curiosita';

const CHIAVE_PREFERITI = 'quieoralastoria_preferiti';
const EPOCHE = ['Roma antica', 'Medioevo', 'Rinascimento', 'Età moderna', 'Risorgimento', 'Novecento'];

function calcolaDistanza(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Accorcia un testo lungo per l'anteprima nella lista.
function anteprima(testo, lunghezza = 140) {
  if (testo.length <= lunghezza) return testo;
  return testo.slice(0, lunghezza).trimEnd() + '…';
}

// Pesca l'indice di una curiosità a caso, diverso da quello attuale.
function altraCuriosita(indiceAttuale) {
  if (curiosita.length <= 1) return 0;
  let n = indiceAttuale;
  while (n === indiceAttuale) {
    n = Math.floor(Math.random() * curiosita.length);
  }
  return n;
}

function leggiPreferitiSalvati() {
  try {
    const salvati = localStorage.getItem(CHIAVE_PREFERITI);
    return salvati ? JSON.parse(salvati) : [];
  } catch {
    return [];
  }
}

function stileInput() {
  return {
    padding: '8px 10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontFamily: 'Arial'
  };
}

function App() {
  const [posizione, setPosizione] = useState(null);
  const [errore, setErrore] = useState(null);
  const [caricamento, setCaricamento] = useState(false);
  const [raggio, setRaggio] = useState(50);
  const [eventoSelezionato, setEventoSelezionato] = useState(null);
  const [curiositaAperta, setCuriositaAperta] = useState(false);
  const [indiceCuriosita, setIndiceCuriosita] = useState(0);

  const [ricerca, setRicerca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('tutte');
  const [filtroAnnoDa, setFiltroAnnoDa] = useState('');
  const [filtroAnnoA, setFiltroAnnoA] = useState('');
  const [soloPreferiti, setSoloPreferiti] = useState(false);
  const [preferiti, setPreferiti] = useState(leggiPreferitiSalvati);

  function apriChiudiCuriosita() {
    if (!curiositaAperta) {
      setIndiceCuriosita(Math.floor(Math.random() * curiosita.length));
    }
    setCuriositaAperta(!curiositaAperta);
  }

  function alternaPreferito(id) {
    setPreferiti(prev => {
      const nuovo = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem(CHIAVE_PREFERITI, JSON.stringify(nuovo));
      } catch {
        // localStorage non disponibile: il preferito resta solo per questa sessione.
      }
      return nuovo;
    });
  }

  function resetFiltri() {
    setRicerca('');
    setFiltroCategoria('tutte');
    setFiltroAnnoDa('');
    setFiltroAnnoA('');
    setSoloPreferiti(false);
  }

  function trovaPosizione() {
    if (!navigator.geolocation) {
      setErrore('Il tuo browser non supporta la geolocalizzazione.');
      return;
    }
    setCaricamento(true);
    setErrore(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosizione({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
        setErrore(null);
        setCaricamento(false);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setErrore('Permesso negato. Attiva la geolocalizzazione per questo sito nelle impostazioni del browser, oppure usa la ricerca qui sotto per trovare eventi senza posizione.');
        } else if (err.code === err.TIMEOUT) {
          setErrore('La ricerca della posizione ha impiegato troppo tempo. Riprova, oppure usa la ricerca qui sotto.');
        } else {
          setErrore('Non riesco a trovare la tua posizione. Puoi comunque usare la ricerca qui sotto.');
        }
        setCaricamento(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  }

  let eventiConDistanza = eventi;
  if (posizione) {
    eventiConDistanza = eventi.map(e => ({
      ...e,
      distanza: calcolaDistanza(posizione.lat, posizione.lon, e.lat, e.lon)
    }));
  }

  const testoRicerca = ricerca.trim().toLowerCase();
  const staRicercando = testoRicerca.length > 0;

  let eventiDaMostrare = eventiConDistanza;

  if (staRicercando) {
    eventiDaMostrare = eventiDaMostrare.filter(e =>
      e.titolo.toLowerCase().includes(testoRicerca) ||
      e.luogo.toLowerCase().includes(testoRicerca) ||
      e.descrizione.toLowerCase().includes(testoRicerca) ||
      e.categoria.toLowerCase().includes(testoRicerca) ||
      (e.curiosita && e.curiosita.toLowerCase().includes(testoRicerca))
    );
  } else if (posizione) {
    eventiDaMostrare = eventiDaMostrare.filter(e => e.distanza <= raggio);
  }

  if (filtroCategoria !== 'tutte') {
    eventiDaMostrare = eventiDaMostrare.filter(e => e.categoria === filtroCategoria);
  }

  const annoDaNum = filtroAnnoDa !== '' ? Number(filtroAnnoDa) : null;
  const annoANum = filtroAnnoA !== '' ? Number(filtroAnnoA) : null;
  if (annoDaNum !== null && !Number.isNaN(annoDaNum)) {
    eventiDaMostrare = eventiDaMostrare.filter(e => e.anno >= annoDaNum);
  }
  if (annoANum !== null && !Number.isNaN(annoANum)) {
    eventiDaMostrare = eventiDaMostrare.filter(e => e.anno <= annoANum);
  }

  if (soloPreferiti) {
    eventiDaMostrare = eventiDaMostrare.filter(e => preferiti.includes(e.id));
  }

  eventiDaMostrare = [...eventiDaMostrare].sort((x, y) => {
    if (posizione && !staRicercando) return x.distanza - y.distanza;
    return x.anno - y.anno;
  });

  const curiositaTrovate = staRicercando
    ? curiosita.filter(c => c.toLowerCase().includes(testoRicerca))
    : [];

  const filtriAttivi = staRicercando || filtroCategoria !== 'tutte' || filtroAnnoDa !== '' || filtroAnnoA !== '' || soloPreferiti;

  const eventoAperto = eventoSelezionato
    ? eventiConDistanza.find(e => e.id === eventoSelezionato)
    : null;

  if (eventoAperto) {
    const eventiCorrelati = eventi
      .filter(e => e.id !== eventoAperto.id && e.categoria === eventoAperto.categoria)
      .slice(0, 3);
    const eEPreferito = preferiti.includes(eventoAperto.id);

    return (
      <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial' }}>
        <button
          onClick={() => setEventoSelezionato(null)}
          style={{
            padding: '10px 18px',
            fontSize: '15px',
            backgroundColor: '#eee',
            color: '#2c3e50',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          &larr; Torna indietro
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '25px' }}>
          <h1 style={{ color: '#2c3e50', margin: 0 }}>{eventoAperto.titolo}</h1>
          <button
            onClick={() => alternaPreferito(eventoAperto.id)}
            aria-label={eEPreferito ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: eEPreferito ? '#e8a93a' : '#ccc',
              lineHeight: 1
            }}
          >
            {eEPreferito ? '★' : '☆'}
          </button>
        </div>

        {eventoAperto.immagine && (
          <div style={{ marginTop: '15px' }}>
            <img
              src={eventoAperto.immagine}
              alt={eventoAperto.titolo}
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
              style={{
                width: '100%',
                maxHeight: '320px',
                objectFit: 'cover',
                borderRadius: '10px',
                display: 'block'
              }}
            />
            <p style={{ fontSize: '12px', color: '#999', margin: '4px 0 0' }}>
              Immagine: Wikimedia Commons
            </p>
          </div>
        )}

        <p style={{ color: '#888', fontSize: '17px', marginTop: '15px' }}>{eventoAperto.data}</p>
        <p style={{ color: '#888', fontSize: '17px' }}>{eventoAperto.luogo}</p>
        <p style={{ color: '#2980b9', fontSize: '14px', fontWeight: 'bold' }}>{eventoAperto.categoria}</p>
        {eventoAperto.distanza !== undefined && (
          <p style={{ color: '#2c3e50', fontWeight: 'bold' }}>
            {eventoAperto.distanza.toFixed(1)} km da te
          </p>
        )}
        <p style={{ fontSize: '17px', lineHeight: '1.6', marginTop: '20px' }}>
          {eventoAperto.descrizione}
        </p>
        {eventoAperto.fonte && (
          <p style={{ marginTop: '20px' }}>
            <a
              href={eventoAperto.fonte}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2980b9' }}
            >
              Fonte: Wikipedia &nearr;
            </a>
          </p>
        )}
        {eventoAperto.curiosita && (
          <div style={{
            marginTop: '25px',
            padding: '15px 18px',
            backgroundColor: '#f5f7fa',
            borderLeft: '4px solid #2980b9',
            borderRadius: '6px'
          }}>
            <p style={{ margin: '0 0 6px', fontWeight: 'bold', color: '#2c3e50' }}>
              💡 Lo sapevi che…?
            </p>
            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5' }}>
              {eventoAperto.curiosita}
            </p>
          </div>
        )}

        {eventiCorrelati.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <p style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '10px' }}>
              Altri eventi di questa epoca
            </p>
            {eventiCorrelati.map(e => (
              <div
                key={e.id}
                onClick={() => setEventoSelezionato(e.id)}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    setEventoSelezionato(e.id);
                  }
                }}
                role="button"
                tabIndex={0}
                style={{
                  padding: '10px 14px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <strong style={{ color: '#2c3e50' }}>{e.titolo}</strong>
                <div style={{ color: '#888', fontSize: '14px' }}>{e.data} — {e.luogo}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50' }}>Qui e ora</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>La storia a portata di mano</p>

      <div style={{ marginTop: '15px' }}>
        <button
          onClick={apriChiudiCuriosita}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: 'transparent',
            color: '#2980b9',
            border: '1px solid #2980b9',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          💡 Lo sapevi che…?
        </button>
      </div>

      {curiositaAperta && (
        <div style={{
          maxWidth: '400px',
          margin: '15px auto 0',
          padding: '15px 18px',
          backgroundColor: '#f5f7fa',
          borderLeft: '4px solid #2980b9',
          borderRadius: '6px',
          textAlign: 'left'
        }}>
          <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5' }}>
            {curiosita[indiceCuriosita]}
          </p>
          <button
            onClick={() => setIndiceCuriosita(altraCuriosita(indiceCuriosita))}
            style={{
              marginTop: '12px',
              padding: '6px 14px',
              fontSize: '13px',
              backgroundColor: '#2980b9',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Un'altra
          </button>
        </div>
      )}

      <button
        onClick={trovaPosizione}
        disabled={caricamento}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: caricamento ? 'default' : 'pointer',
          opacity: caricamento ? 0.6 : 1,
          marginTop: '20px'
        }}
      >
        {caricamento ? 'Sto cercando…' : 'Trova la mia posizione'}
      </button>

      {errore && (
        <p style={{ marginTop: '20px', color: 'red', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>{errore}</p>
      )}

      {posizione && !staRicercando && (
        <div style={{ marginTop: '25px' }}>
          <p style={{ color: '#555' }}>Cerca eventi entro {raggio} km</p>
          <input
            type="range"
            min="1"
            max="500"
            value={raggio}
            onChange={(e) => setRaggio(Number(e.target.value))}
            aria-label={`Raggio di ricerca: ${raggio} chilometri`}
            style={{ width: '250px' }}
          />
        </div>
      )}

      <div style={{
        maxWidth: '420px',
        margin: '30px auto 0',
        padding: '18px',
        backgroundColor: '#f5f7fa',
        borderRadius: '10px',
        textAlign: 'left'
      }}>
        <label htmlFor="campo-ricerca" style={{ display: 'block', fontWeight: 'bold', color: '#2c3e50', marginBottom: '6px' }}>
          Cerca luogo, evento, personaggio…
        </label>
        <input
          id="campo-ricerca"
          type="text"
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          placeholder="es. Colosseo, Cesare, Firenze…"
          style={{ ...stileInput(), width: '100%', boxSizing: 'border-box' }}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 160px' }}>
            <label htmlFor="filtro-epoca" style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
              Epoca
            </label>
            <select
              id="filtro-epoca"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              style={{ ...stileInput(), width: '100%' }}
            >
              <option value="tutte">Tutte le epoche</option>
              {EPOCHE.map(ep => (
                <option key={ep} value={ep}>{ep}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: '1 1 90px' }}>
            <label htmlFor="anno-da" style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
              Anno da
            </label>
            <input
              id="anno-da"
              type="number"
              value={filtroAnnoDa}
              onChange={(e) => setFiltroAnnoDa(e.target.value)}
              placeholder="es. -44"
              style={{ ...stileInput(), width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: '1 1 90px' }}>
            <label htmlFor="anno-a" style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
              Anno a
            </label>
            <input
              id="anno-a"
              type="number"
              value={filtroAnnoA}
              onChange={(e) => setFiltroAnnoA(e.target.value)}
              placeholder="es. 1970"
              style={{ ...stileInput(), width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>
        <p style={{ fontSize: '12px', color: '#888', margin: '6px 0 0' }}>
          Per gli anni avanti Cristo usa il segno meno, es. 44 a.C. = -44.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
          <label style={{ fontSize: '14px', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="checkbox"
              checked={soloPreferiti}
              onChange={(e) => setSoloPreferiti(e.target.checked)}
            />
            ★ Solo preferiti ({preferiti.length})
          </label>
          {filtriAttivi && (
            <button
              onClick={resetFiltri}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                backgroundColor: 'transparent',
                color: '#2980b9',
                border: '1px solid #2980b9',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Reset filtri
            </button>
          )}
        </div>
      </div>

      {curiositaTrovate.length > 0 && (
        <div style={{ maxWidth: '420px', margin: '25px auto 0', textAlign: 'left' }}>
          <p style={{ fontWeight: 'bold', color: '#2c3e50' }}>💡 Curiosità trovate</p>
          {curiositaTrovate.map((c, i) => (
            <p key={i} style={{
              backgroundColor: '#f5f7fa',
              borderLeft: '4px solid #2980b9',
              borderRadius: '6px',
              padding: '10px 14px',
              fontSize: '15px',
              lineHeight: '1.5'
            }}>
              {c}
            </p>
          ))}
        </div>
      )}

      {eventiDaMostrare.length === 0 && (
        <p style={{ marginTop: '30px', color: '#888' }}>
          {soloPreferiti
            ? 'Non hai ancora salvato nessun preferito.'
            : staRicercando || filtriAttivi
              ? 'Nessun evento trovato con questi filtri. Prova ad ampliarli o a fare Reset filtri.'
              : `Nessun evento entro ${raggio} km. Prova ad allargare la ricerca.`}
        </p>
      )}

      {eventiDaMostrare.map(evento => {
        const eEPreferito = preferiti.includes(evento.id);
        return (
          <div
            key={evento.id}
            onClick={() => setEventoSelezionato(evento.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setEventoSelezionato(evento.id);
              }
            }}
            role="button"
            tabIndex={0}
            style={{
              maxWidth: '400px',
              margin: '30px auto',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              textAlign: 'left',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                alternaPreferito(evento.id);
              }}
              aria-label={eEPreferito ? `Rimuovi ${evento.titolo} dai preferiti` : `Aggiungi ${evento.titolo} ai preferiti`}
              style={{
                position: 'absolute',
                top: '12px',
                right: '14px',
                background: 'none',
                border: 'none',
                fontSize: '22px',
                cursor: 'pointer',
                color: eEPreferito ? '#e8a93a' : '#ccc',
                lineHeight: 1
              }}
            >
              {eEPreferito ? '★' : '☆'}
            </button>
            {evento.immagine && (
              <img
                src={evento.immagine}
                alt={evento.titolo}
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  display: 'block'
                }}
              />
            )}
            <h2 style={{ color: '#2c3e50', marginRight: '30px' }}>{evento.titolo}</h2>
            <p style={{ color: '#888' }}>{evento.data}</p>
            <p style={{ color: '#888' }}>{evento.luogo}</p>
            <p style={{ color: '#2980b9', fontSize: '13px', fontWeight: 'bold' }}>{evento.categoria}</p>
            {evento.distanza !== undefined && (
              <p style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                {evento.distanza.toFixed(1)} km da te
              </p>
            )}
            <p>{anteprima(evento.descrizione)}</p>
            <p style={{ color: '#2980b9', fontWeight: 'bold', marginTop: '10px' }}>
              Leggi di più &rarr;
            </p>
          </div>
        );
      })}

    </div>
  );
}

export default App;
