import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PartidasProvider } from './context/PartidasContext';  // Importar el PartidasProvider
import Inicio from './components/views/Inicio';
import Juego from './components/views/Juego';
import Partidas from './components/views/Partidas';
import Ranking from './components/views/Ranking';

function App() {
  return (
    <PartidasProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Juego" element={<Juego />} />
          <Route path="/Partidas" element={<Partidas />} />
          <Route path="/Ranking" element={<Ranking />} />
        </Routes>
      </Router>
    </PartidasProvider>
  );
}

export default App;
