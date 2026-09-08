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

  let eventiDaMostrare = eventi;
  if (posizione) {
    eventiDaMostrare = eventi
      .map(e => ({
        ...e,
        distanza: calcolaDistanza(posizione.lat, posizione.lon, e.lat, e.lon)
      }))
      .sort((a, b) => a.distanza - b.distanza);
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

      {eventiDaMostrare.map(evento => (
        <div key={evento.id} style={{ 
          maxWidth: '400px', 
          margin: '30px auto', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '10px',
          textAlign: 'left'
        }}>
          <h2 style={{ color: '#2c3e50' }}>{evento.titolo}</h2>
          <p style={{ color: '#888' }}>{evento.data}</p>
          <p style={{ color: '#888' }}>{evento.luogo}</p>
          {evento.distanza !== undefined && (
            <p style={{ color: '#2c3e50', fontWeight: 'bold' }}>
              {evento.distanza.toFixed(1)} km da te
            </p>
          )}
          <p>{evento.descrizione}</p>
        </div>
      ))}

    </div>
  );
}

export default App;
