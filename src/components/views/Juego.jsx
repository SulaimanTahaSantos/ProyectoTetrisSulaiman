import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import AppMenu from '../AppMenu';
import Panel from '../Panel';
import modelos from '../../lib/modelos';
import nuevaPieza from '../../lib/nuevaPieza';  

const Juego = () => {
  const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz);
  
  const [piezaActual, setPiezaActual] = useState(() => {
    const columnaAleatoria = Math.floor(Math.random() * 9) + 1; 
    return nuevaPieza(0, columnaAleatoria); 
  });

  const pintarPieza = () => {
    if (!piezaActual || !piezaActual.matriz) return; 

    const newArray = [...arrayCasillas];

    piezaActual.matriz.forEach((fila, filaIndex) => {
      fila.forEach((columna, columnaIndex) => {
        if (columna !== 0) { 
          const filaPos = piezaActual.fila + filaIndex;
          const columnaPos = piezaActual.columna + columnaIndex;

          if (filaPos >= 0 && filaPos < newArray.length && columnaPos >= 0 && columnaPos < newArray[0].length) {
            newArray[filaPos][columnaPos] = columna;  
          }
        }
      });
    });

    setArrayCasillas(newArray); 
  };

  const insertaNuevaPieza = () => {
    pintarPieza(); 
  };

  return (
    <>
      <AppMenu />
      <Container>
        <h1 className="mt-5">Juego</h1>

        <Panel grid={arrayCasillas} />  

        <div>
          <Button onClick={insertaNuevaPieza} className="mt-3">
            Insertar pieza
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Juego;
