import { useState } from 'react';
import eventi from './eventi';
import curiosita from './curiosita';

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

function App() {
  const [posizione, setPosizione] = useState(null);
  const [errore, setErrore] = useState(null);
  const [caricamento, setCaricamento] = useState(false);
  const [raggio, setRaggio] = useState(50);
  const [eventoSelezionato, setEventoSelezionato] = useState(null);
  const [curiositaAperta, setCuriositaAperta] = useState(false);
  const [indiceCuriosita, setIndiceCuriosita] = useState(0);

  function apriChiudiCuriosita() {
    if (!curiositaAperta) {
      setIndiceCuriosita(Math.floor(Math.random() * curiosita.length));
    }
    setCuriositaAperta(!curiositaAperta);
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
          setErrore('Permesso negato. Attiva la geolocalizzazione per questo sito nelle impostazioni del browser.');
        } else if (err.code === err.TIMEOUT) {
          setErrore('La ricerca della posizione ha impiegato troppo tempo. Riprova.');
        } else {
          setErrore('Non riesco a trovare la tua posizione.');
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

  let eventiDaMostrare = eventiConDistanza;
  if (posizione) {
    eventiDaMostrare = eventiConDistanza
      .filter(e => e.distanza <= raggio)
      .sort((a, b) => a.distanza - b.distanza);
  }

  const eventoAperto = eventoSelezionato
    ? eventiConDistanza.find(e => e.id === eventoSelezionato)
    : null;

  if (eventoAperto) {
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

        <h1 style={{ color: '#2c3e50', marginTop: '25px' }}>{eventoAperto.titolo}</h1>
        <p style={{ color: '#888', fontSize: '17px' }}>{eventoAperto.data}</p>
        <p style={{ color: '#888', fontSize: '17px' }}>{eventoAperto.luogo}</p>
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

      {posizione && (
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

      {posizione && eventiDaMostrare.length === 0 && (
        <p style={{ marginTop: '30px', color: '#888' }}>
          Nessun evento entro {raggio} km. Prova ad allargare la ricerca.
        </p>
      )}

      {eventiDaMostrare.map(evento => (
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
            cursor: 'pointer'
          }}
        >
          <h2 style={{ color: '#2c3e50' }}>{evento.titolo}</h2>
          <p style={{ color: '#888' }}>{evento.data}</p>
          <p style={{ color: '#888' }}>{evento.luogo}</p>
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
      ))}

    </div>
  );
}

export default App;
