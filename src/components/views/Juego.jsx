import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import AppMenu from '../AppMenu';
import Panel from '../Panel';
import Pieza from '../Pieza';
import modelos from '../../lib/modelos';  

const Juego = () => {
  const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz); 
  const [piezasAleatorias, setPiezasAleatorias] = useState([]);

  const generarPiezaAleatoria = () => {
    const piezaAleatoria = modelos.piezas[Math.floor(Math.random() * modelos.piezas.length)];
    setPiezasAleatorias([...piezasAleatorias, piezaAleatoria]);
  };

  return (
    <>
      <AppMenu />
      <Container>
        <h1 className="mt-5">Juego</h1>

        <Panel grid={arrayCasillas} />  

        <div>
          <Button onClick={generarPiezaAleatoria} className="mt-3">
            Generar pieza aleatoria
          </Button>
          <div className="mt-4">
            {piezasAleatorias.map((pieza, index) => (
              <div key={index}>
                <h3>{pieza.nombre} (Ángulo: {pieza.rotaciones[0]})</h3>
                <Pieza rotacion={pieza.rotaciones[0]} /> 
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Juego;
