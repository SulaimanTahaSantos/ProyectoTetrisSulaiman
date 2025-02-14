import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";  
import { usePartidas } from "../../context/PartidasContext";  
import AppMenu from "../AppMenu";
import Panel from "../Panel";
import modelos from "../../lib/modelos";
import nuevaPieza from "../../lib/nuevaPieza";
import modeloPieza from "../../lib/class/modeloPieza";
import GameOver from "../GameOver";

const Juego = () => {
  const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz);
const [piezaActual, setPiezaActual] = useState(() => {
  const columnaAleatoria = Math.floor(Math.random() * 9) + 1;
  const piezaGenerada = nuevaPieza(0, columnaAleatoria);

  if (!piezaGenerada || !piezaGenerada.matriz) {
    console.error("La pieza no tiene una matriz válida.");
    return {}; 
  }

  return piezaGenerada;
});
const [puntos, setPuntos] = useState(0);
const [gameOver, setGameOver] = useState(false);
const { partidas, registrarPartida } = usePartidas();  
const navigate = useNavigate();  
const [tiempoRestante, setTiempoRestante] = useState(2500);  
  const verificarGameOver = () => {
    if (arrayCasillas[0].every(col => col !== 0)) {
      setGameOver(true);
    }
  }
  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        const existingGame = partidas.some(partida =>
          partida.name === "Jugador" &&
          partida.point === puntos &&
          partida.releaseDate === new Date().toLocaleDateString()
        );
        
        if (!existingGame) {
          registrarPartida({
            id: Date.now(),  
            name: "Jugador",  
            title: "Juego Terminado",  
            point: puntos,  
            releaseDate: new Date().toLocaleDateString(),  
          });
        }
        
        if (location.pathname === "/Partidas") {
          window.location.reload();  
        }
        navigate("/Partidas");  
      }, 2000);  
    }
  }, [gameOver, puntos, registrarPartida, navigate, partidas]);
  
  
  
  
  


  useEffect(() => {
    verificarGameOver();
  }, [arrayCasillas]);  

  const validarMovimiento = (pieza) => {
    if (!pieza || !pieza.matriz) return false;
  
    return pieza.matriz.every((fila, filaIndex) =>
      fila.every((columna, columnaIndex) => {
        if (columna === 0) return true;  
        const filaPos = pieza.fila + filaIndex;
        const columnaPos = pieza.columna + columnaIndex;
  
        const dentroDeLimites =
          filaPos >= 0 &&
          filaPos < arrayCasillas.length &&
          columnaPos >= 0 &&
          columnaPos < arrayCasillas[0].length;
  
        const estaLibre =
          dentroDeLimites && (arrayCasillas[filaPos][columnaPos] === 0 || (arrayCasillas[filaPos][columnaPos] === columna));
  
        return estaLibre;
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

const girar = () => {
  const nueva = new modeloPieza(
    piezaActual.numero,
    piezaActual.fila,
    piezaActual.columna,
    (piezaActual.angulo + 90) % 360
  );
  nueva.girar(); 
  console.log("Pieza girada:", nueva); 
  actualizarPieza(nueva);
  setPuntos(puntos + 20);
};
  const moverIzq = () => {
    const nuevaColumna = piezaActual.columna - 1; 
    const nueva = new modeloPieza(
      piezaActual.numero,
      piezaActual.fila,
     nuevaColumna,
      piezaActual.angulo
    );
    actualizarPieza(nueva);
    setPuntos(puntos + 10);
  };

const moverDra = () => {
  
  const nuevaColumna = piezaActual.columna + 1; 

  
  const nueva = new modeloPieza(
    piezaActual.numero,
    piezaActual.fila,
    nuevaColumna,
    piezaActual.angulo 
  );
  actualizarPieza(nueva);
  setPuntos(puntos + 10);

  
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


  useEffect(() => {
    pintarPieza(piezaActual);
    setTiempoRestante(2.5);

    const intervalId = setInterval(() => {
      const nueva = new modeloPieza(
        piezaActual.numero,
        piezaActual.fila + 1,
        piezaActual.columna
      );
      if (validarMovimiento(nueva)) {
        actualizarPieza(nueva);
      } else {
        setPiezaActual(nuevaPieza(0, Math.floor(Math.random() * 9) + 1));
      }
    }, 2500);

    const countdownId = setInterval(() => {
      setTiempoRestante((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, [piezaActual]);


  const bajar = () => {
    const filaNueva = piezaActual.fila + 1; 
  
    
    if (filaNueva === 17) {
      setPuntos((prevPuntos) => prevPuntos + 50); 
      console.log("Pieza ha llegado a la fila 16. +50 puntos.");
    }
  
    
    const nuevaPieza = new modeloPieza(
      piezaActual.numero,
      filaNueva,
      piezaActual.columna,
      piezaActual.angulo
    );
  
    if (!validarMovimiento(nuevaPieza)) {
      setPuntos((prevPuntos) => prevPuntos + 50); 
      console.log("Pieza ha colisionado. +50 puntos.");
    } else {
      setPuntos((prevPuntos) => prevPuntos + 10); 
      console.log("Pieza ha bajado. +10 puntos.");
    }
  
    actualizarPieza(nuevaPieza);
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
      <GameOver show={gameOver} message="¡Has perdido la partida!" />

      <Container>
        <h1 className="mt-5">Juego</h1>
        <Panel grid={arrayCasillas} />
        <p>Tiempo para la próxima pieza: {tiempoRestante} s</p>
        <p>Puntos actuales: {puntos}</p>
        <div>
          <Button className="mt-3" disabled>
            JUGAR (Inicia Automáticamente)
          </Button>
          <Button className="mt-3"  onClick={() => setGameOver(true)} >
            perder
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Juego;
