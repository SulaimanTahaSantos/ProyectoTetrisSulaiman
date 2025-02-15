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
import colorPieza from '../../lib/colorPieza';


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
const [tiempoRestante, setTiempoRestante] = useState(2500

);
const [filasEliminadas, setFilasEliminadas] = useState(0);
const [piezaSiguiente, setPiezaSiguiente] = useState(() => {
  const columnaAleatoria = Math.floor(Math.random() * 9) + 1;
  return nuevaPieza(0, columnaAleatoria); 
});


  
 
const borrarFilaLlena = () => {
  const newArray = [...arrayCasillas];
  let filasEliminadasTemp = 0; 

  for (let fila = arrayCasillas.length - 1; fila >= 0; fila--) {
    if (newArray[fila].every(celda => celda !== 0)) {
      filasEliminadasTemp++; 

      newArray[fila] = newArray[fila].map((celda, columnaIndex) => {
        if (columnaIndex !== 0 && columnaIndex !== newArray[fila].length - 1) {
          return (celda >= 2 && celda <= 8 ? 0 : celda);
        }
        return celda;
      });

      for (let i = fila - 1; i >= 0; i--) {
        newArray[i + 1] = [...newArray[i]];
      }

      newArray[0] = newArray[0].map((celda, columnaIndex) => {
        return (columnaIndex !== 0 && columnaIndex !== newArray[0].length - 1 ? 0 : celda);
      });
    }
  }
  console.log("Filas eliminadas:", filasEliminadasTemp);

  setFilasEliminadas(prev => prev + filasEliminadasTemp); 
  setArrayCasillas(newArray);
};
 
  
  
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

  const hayColision = (pieza) => {
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
          console.log("Colisión detectada:", !estaLibre);
          console.log("Dentro de límites:", dentroDeLimites);
         
  
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
  if (hayColision(nueva)) {
    actualizarPieza(nueva);
    setPuntos((prevPuntos) => prevPuntos + 20); 
    console.log("Pieza se ha girado. +20 puntos.");

  }
};
  const moverIzq = () => {
    const nuevaColumna = piezaActual.columna - 1; 
    const nueva = new modeloPieza(
      piezaActual.numero,
      piezaActual.fila,
     nuevaColumna,
      piezaActual.angulo
    );

    if (hayColision(nueva)) {
      actualizarPieza(nueva);
      setPuntos((prevPuntos) => prevPuntos + 10); 
      console.log("Pieza se ha movido a la izquierda. +10 puntos.");

    }
   
  };

const moverDra = () => {
  
  const nuevaColumna = piezaActual.columna + 1; 

  
  const nueva = new modeloPieza(
    piezaActual.numero,
    piezaActual.fila,
    nuevaColumna,
    piezaActual.angulo 
  );

  if (hayColision(nueva)) {
    actualizarPieza(nueva);
    setPuntos((prevPuntos) => prevPuntos + 10); 
    console.log("Pieza se ha movido a la derecha. +10 puntos.");

  }

  
};



const actualizarPieza = (nuevaPieza) => {
  borrarPieza(piezaActual);

  if (hayColision(nuevaPieza)) {
    setPiezaActual(nuevaPieza);
  } else {
    pintarPieza(piezaActual);
    borrarFilaLlena(); 
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
    if (hayColision(nueva)) {
      actualizarPieza(nueva);
      console.log("colision detectada");
    } else {
      setPiezaActual(nuevaPieza(0, Math.floor(Math.random() * 9) + 1));
    }
  }, 2500);

  const countdownId = setInterval(() => {
    setTiempoRestante((prev) => (prev > 0 ? prev - 1 : 0));
  }, 2500);

  return () => {
    clearInterval(intervalId);
    clearInterval(countdownId);
  };
}, [piezaActual]);




const bajar = () => {
  const filaNueva = piezaActual.fila + 1;

  const nuevaPiezaGenerada = new modeloPieza(
    piezaActual.numero,
    filaNueva,
    piezaActual.columna,
    piezaActual.angulo
  );

  if (filaNueva === 21 || !hayColision(nuevaPiezaGenerada)) {
    setPuntos((prevPuntos) => prevPuntos + 50);

    setPiezaActual(piezaSiguiente);
    
    setPiezaSiguiente(nuevaPieza(0, Math.floor(Math.random() * 9) + 1));
  } else {
    setPuntos((prevPuntos) => prevPuntos + 10);
  }

  actualizarPieza(nuevaPiezaGenerada);
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

  const cambiarPieza = () => {
    borrarPieza(piezaActual);
    
    setPiezaActual({ 
      ...piezaSiguiente, 
      fila: piezaActual.fila,  
      columna: piezaActual.columna
    });
    
    setPiezaSiguiente(nuevaPieza(0, Math.floor(Math.random() * 9) + 1));
  };
  
  


  return (
    <>
      <AppMenu />
      <GameOver show={gameOver} message="¡Has perdido la partida!" />

      <Container>
        <h1 className="mt-5">Juego</h1>
        <div onClick={cambiarPieza} style={{ border: "1px solid black", padding: "10px", margin: "10px", display: "inline-block" }}>
  <h4>Siguiente Pieza</h4>
  {piezaSiguiente && piezaSiguiente.matriz.map((fila, filaIndex) => (
    <div key={filaIndex} style={{ display: "flex", justifyContent: "center" }}>
      {fila.map((celda, celdaIndex) => (
        <div key={celdaIndex} style={{
          width: "20px",
          height: "20px",
          border: "1px solid black"
        }}
        className={`border ${celda === 0 ? 'bg-white' : colorPieza(celda)}`} 
        ></div>
      ))}
    </div>
  ))}
</div>

        <Panel grid={arrayCasillas} />
        <p>Tiempo para la próxima pieza: {tiempoRestante} s</p>
        <p>Puntos actuales: {puntos}</p>
        <p>Filas eliminadas: {filasEliminadas}</p>
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