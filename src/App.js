
import { useState } from 'react';

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

      {posizione && (
        <p style={{ marginTop: '20px', color: '#555' }}>
          Sei a: {posizione.lat.toFixed(4)}, {posizione.lon.toFixed(4)}
        </p>
      )}

      {errore && (
        <p style={{ marginTop: '20px', color: 'red' }}>{errore}</p>
      )}

      <div style={{ 
        maxWidth: '400px', 
        margin: '30px auto', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '10px',
        textAlign: 'left'
      }}>
        <h2 style={{ color: '#2c3e50' }}>Inaugurazione del Colosseo</h2>
        <p style={{ color: '#888' }}>25 maggio 80 d.C.</p>
        <p style={{ color: '#888' }}>Colosseo, Roma</p>
        <p>L'imperatore Tito inaugura solennemente l'Anfiteatro Flavio dopo 8 anni di costruzione.</p>
      </div>

      <div style={{ 
        maxWidth: '400px', 
        margin: '30px auto', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '10px',
        textAlign: 'left'
      }}>
        <h2 style={{ color: '#2c3e50' }}>Assassinio di Giulio Cesare</h2>
        <p style={{ color: '#888' }}>15 marzo 44 a.C.</p>
        <p style={{ color: '#888' }}>Curia di Pompeo, Roma</p>
        <p>Giulio Cesare viene assassinato da un gruppo di senatori durante la seduta del Senato.</p>
      </div>

    </div>
  );
}

export default App;
