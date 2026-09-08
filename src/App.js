import { useState } from 'react';

const eventi = [
  {
    id: 1,
    titolo: 'Inaugurazione del Colosseo',
    data: '25 maggio 80 d.C.',
    luogo: 'Colosseo, Roma',
    lat: 41.8902,
    lon: 12.4922,
    descrizione: "L'imperatore Tito inaugura solennemente l'Anfiteatro Flavio dopo 8 anni di costruzione."
  },
  {
    id: 2,
    titolo: 'Assassinio di Giulio Cesare',
    data: '15 marzo 44 a.C.',
    luogo: 'Curia di Pompeo, Roma',
    lat: 41.8956,
    lon: 12.4769,
    descrizione: 'Giulio Cesare viene assassinato da un gruppo di senatori durante la seduta del Senato.'
  },
  {
    id: 3,
    titolo: 'Ultima Cena di Leonardo',
    data: '1495-1498',
    luogo: 'Santa Maria delle Grazie, Milano',
    lat: 45.4659,
    lon: 9.1706,
    descrizione: 'Leonardo da Vinci dipinge il Cenacolo nel refettorio del convento domenicano.'
  },
  {
    id: 4,
    titolo: 'Le Cinque Giornate di Milano',
    data: '18-22 marzo 1848',
    luogo: 'Centro storico, Milano',
    lat: 45.4642,
    lon: 9.1900,
    descrizione: 'I milanesi insorgono contro il dominio austriaco e cacciano le truppe di Radetzky dalla città.'
  }
];

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

function App() {
  const [posizione, setPosizione] = useState(null);
  const [errore, setErrore] = useState(null);
  const [raggio, setRaggio] = useState(50);
  const [eventoSelezionato, setEventoSelezionato] = useState(null);

  function trovaPosizione() {
    if (!navigator.geolocation) {
      setErrore('Il tuo browser non supporta la geolocalizzazione');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosizione({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
        setErrore(null);
      },
      () => {
        setErrore('Non riesco a trovare la tua posizione');
      }
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
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50' }}>Qui e ora</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>La storia a portata di mano</p>

      <button
        onClick={trovaPosizione}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Trova la mia posizione
      </button>

      {errore && (
        <p style={{ marginTop: '20px', color: 'red' }}>{errore}</p>
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
          <p>{evento.descrizione}</p>
          <p style={{ color: '#2980b9', fontWeight: 'bold', marginTop: '10px' }}>
            Leggi di piu &rarr;
          </p>
        </div>
      ))}

    </div>
  );
}

export default App;
