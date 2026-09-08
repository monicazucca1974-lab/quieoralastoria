function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50' }}>Qui e ora</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>La storia a portata di mano</p>

      <div style={{ 
        maxWidth: '400px', 
        margin: '40px auto', 
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

    </div>
  );
}

export default App;