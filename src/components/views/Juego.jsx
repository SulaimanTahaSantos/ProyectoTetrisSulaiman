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

  const moverDra = () => {
    console.log("Mover a la derecha")
    setPiezaActual(antes => {
      if (antes.columna < arrayCasillas[0].length - antes.matriz[0].length) {
        return { ...antes, columna: antes.columna + 1 };
      }
      return antes;
    });
  }
  const moverIzq = () => {
    console.log("Mover a la izquierda")
    setPiezaActual(antes => {
      if (antes.columna > 0) {
        return { ...antes, columna: antes.columna - 1 };
      }
      return antes;
    });
  }
 const bajar = () => {
  console.log("Bajar")
    setPiezaActual(antes => {
      if (antes.fila < arrayCasillas.length - antes.matriz.length) {
        return { ...antes, fila: antes.fila + 1 };
      }
      return antes;
    });
    pintarPieza();
  };

 

   const controlTeclas = (event) => {
    switch (event.key) {
      case 'ArrowRight':
        moverDra();
        break;
      case 'ArrowLeft':
        moverIzq();
        break;
      case 'ArrowDown':
        bajar();
        break;
      case 'ArrowUp':
        piezaActual.girar();
        break;
      default:
        break;
    }
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
