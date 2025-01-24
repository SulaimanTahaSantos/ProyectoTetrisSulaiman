import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Asegúrate de que sea `Routes` y no `Switch`
import Inicio from './components/views/Inicio';
import Juego from './components/views/Juego';
import Partidas from './components/views/Partidas';
import Ranking from './components/views/Ranking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="./components/views/Juego.jsx" element={<Juego />} />
        <Route path="./components/views/Partidas.jsx" element={<Partidas />} />
        <Route path="./components/views/Ranking.jsx" element={<Ranking />} />
      </Routes>
    </Router>
  );
}

export default App;
