import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import AppMenu from "../AppMenu";
import Panel from "../Panel";
import modelos from "../../lib/modelos";
import nuevaPieza from "../../lib/nuevaPieza";
import modeloPieza from "../../lib/class/modeloPieza";

const Juego = () => {
  const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz);
  const [piezaActual, setPiezaActual] = useState(() => {
    const columnaAleatoria = Math.floor(Math.random() * 9) + 1;
    return nuevaPieza(0, columnaAleatoria);
  });

  const validarMovimiento = (pieza) => {
    return pieza.matriz.every((fila, filaIndex) =>
      fila.every((columna, columnaIndex) => {
        if (columna === 0) return true;
        const filaPos = pieza.fila + filaIndex;
        const columnaPos = pieza.columna + columnaIndex;
        return (
          filaPos >= 0 &&
          filaPos < arrayCasillas.length &&
          columnaPos >= 0 &&
          columnaPos < arrayCasillas[0].length &&
          arrayCasillas[filaPos][columnaPos] === 0
        );
      })
    );
  };

  const pintarPieza = (pieza) => {
    if (!pieza || !pieza.matriz) return;

    const newArray = [...arrayCasillas];
    pieza.matriz.forEach((fila, filaIndex) => {
      fila.forEach((columna, columnaIndex) => {
        if (columna !== 0) {
          const filaPos = pieza.fila + filaIndex;
          const columnaPos = pieza.columna + columnaIndex;
          if (
            filaPos >= 0 &&
            filaPos < newArray.length &&
            columnaPos >= 0 &&
            columnaPos < newArray[0].length
          ) {
            newArray[filaPos][columnaPos] = columna;
          }
        }
      });
    });

    setArrayCasillas(newArray);
  };

  const borrarPieza = (pieza) => {
    const newArray = [...arrayCasillas];
    pieza.matriz.forEach((fila, filaIndex) => {
      fila.forEach((columna, columnaIndex) => {
        if (columna !== 0) {
          const filaPos = pieza.fila + filaIndex;
          const columnaPos = pieza.columna + columnaIndex;
          if (
            filaPos >= 0 &&
            filaPos < newArray.length &&
            columnaPos >= 0 &&
            columnaPos < newArray[0].length
          ) {
            newArray[filaPos][columnaPos] = 0;
          }
        }
      });
    });

    setArrayCasillas(newArray);
  };

  const actualizarPieza = (nuevaPieza) => {
    borrarPieza(piezaActual);
    if (validarMovimiento(nuevaPieza)) {
      setPiezaActual(nuevaPieza);
      pintarPieza(nuevaPieza);
    } else {
      pintarPieza(piezaActual);
    }
  };

  const girar = () => {
    const nueva = new modeloPieza(
      piezaActual.numero,
      piezaActual.fila,
      piezaActual.columna
    );
    nueva.girar();
    actualizarPieza(nueva);
  };

  const moverIzq = () => {
    const nueva = new modeloPieza(
      piezaActual.numero,
      piezaActual.fila,
      piezaActual.columna - 1
    );
    actualizarPieza(nueva);
  };

  const moverDra = () => {
    const nueva = new modeloPieza(
      piezaActual.numero,
      piezaActual.fila,
      piezaActual.columna + 1
    );
    actualizarPieza(nueva);
  };

  const bajar = () => {
    const nueva = new modeloPieza(
      piezaActual.numero,
      piezaActual.fila + 1,
      piezaActual.columna
    );
    console.log("He bajado de fila")
    if (validarMovimiento(nueva)) {
      actualizarPieza(nueva);
    } else {
      setPiezaActual(nuevaPieza(0, Math.floor(Math.random() * 9) + 1));
    }
  };

  const iniciarMovimiento = () => {
    setInterval(bajar, 300);
  };

  const controlTeclas = (e) => {
    switch (e.key) {
      case "ArrowUp":
        girar();
        break;
      case "ArrowDown":
        bajar();
        break;
      case "ArrowLeft":
        moverIzq();
        break;
      case "ArrowRight":
        moverDra();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", controlTeclas);
    return () => {
      window.removeEventListener("keydown", controlTeclas);
    };
  }, [piezaActual, arrayCasillas]);

  return (
    <>
      <AppMenu />
      <Container>
        <h1 className="mt-5">Juego</h1>
        <Panel grid={arrayCasillas} />
        <div>
          <Button onClick={iniciarMovimiento} className="mt-3">
            JUGAR
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Juego;
