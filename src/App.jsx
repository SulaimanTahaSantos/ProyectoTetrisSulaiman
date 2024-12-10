import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Asegúrate de que sea `Routes` y no `Switch`
import Inicio from './components/vistas/Inicio';
import Juego from './components/vistas/Juego';
import Partidas from './components/vistas/Partidas';
import Ranking from './components/vistas/Ranking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Juego" element={<Juego />} />
        <Route path="/Partidas" element={<Partidas />} />
        <Route path="/Ranking" element={<Ranking />} />
      </Routes>
    </Router>
  );
}

export default App;
