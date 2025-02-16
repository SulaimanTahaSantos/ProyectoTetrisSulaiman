import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap"
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
  const generarColumnaValida = () => {
    let columna;
    do {
      columna = Math.floor(Math.random() * 7) + 1; // Genera entre 1 y 7
    } while (arrayCasillas[0][columna] === 1); 
    return columna;
  };
  
  
  const piezaGenerada = nuevaPieza(0, generarColumnaValida());

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
const [velocidadCaida, setVelocidadCaida] = useState(2500); 
useEffect(() => {
  if (filasEliminadas % 5 === 0 && filasEliminadas > 0) {
    setVelocidadCaida(prevVel => Math.max(prevVel - 200, 500)); 
  }
}, [filasEliminadas]);

const [jugando, setJugando] = useState(false);
const [nick, setNick] = useState("");
const [mostrarInputNick, setMostrarInputNick] = useState(false);


let sonidos = {
  sonidoMovimiento: new Audio('/src/sounds/move.mp3'),
  sonidoColision: new Audio('/src/sounds/collision.wav'),
  sonidoBorrarFila: new Audio('/src/sounds/filaEliminada.wav'),
  sonidoPerder: new Audio('/src/sounds/gameOver.mp3'),
  musicaFondo: new Audio('/src/sounds/backgroundMusic.mp3')
};

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
  sonidos.sonidoBorrarFila.play()
};
 
  
  
  const verificarGameOver = () => {
    if (arrayCasillas[0].every(col => col !== 0)) {
      setGameOver(true);
    }
  }
  
 
  useEffect(() => { 
    if (gameOver) {
      sonidos.sonidoPerder.play();
      setMostrarInputNick(true); 
    }
  }, [gameOver, puntos, registrarPartida, navigate, partidas]);;
  
  const guardarPartida = () => {
    if (!nick.trim()) return; 
  
    registrarPartida({
      id: Date.now(),
      name: nick,
      title: "Juego Terminado",
      point: puntos,
      releaseDate: new Date().toLocaleDateString(),
    });
  
    navigate("/Partidas");
  };
  
  
  
  
  
  


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
    sonidos.sonidoMovimiento.play();

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
      sonidos.sonidoMovimiento.play();

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
    sonidos.sonidoMovimiento.play();

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
  if (jugando) {
    sonidos.musicaFondo.play(); 
    sonidos.musicaFondo.loop = true;
  } else {
    sonidos.musicaFondo.pause(); 
  }
}, [jugando]);



useEffect(() => {
  if (!jugando ) return;

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
      console.log("Colisión detectada");
    } else {
      setPiezaActual(nuevaPieza(0, Math.floor(Math.random() * 9) + 1));
    }
  }, velocidadCaida);

  const countdownId = setInterval(() => {
    setTiempoRestante((prev) => (prev > 0 ? prev - 1 : 0));
  }, 2500);

  return () => {
    clearInterval(intervalId);
    clearInterval(countdownId);
  };
}, [piezaActual, velocidadCaida, jugando]);





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
      <Modal show={gameOver && mostrarInputNick} onHide={() => setMostrarInputNick(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>¡Juego terminado!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          placeholder="Ingresa tu Nick"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarInputNick(false)}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={guardarPartida}>
          Guardar Partida
        </Button>
      </Modal.Footer>
    </Modal>

      <Container className="py-5">
        <h1 className="text-center mb-5">Tetris</h1>
        <Row>
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body className="d-flex justify-content-center align-items-center">
                <Panel grid={arrayCasillas} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="text-center mb-3">Siguiente Pieza</h4>
                <div onClick={cambiarPieza} className="siguientePieza">
                  {piezaSiguiente &&
                    piezaSiguiente.matriz.map((fila, filaIndex) => (
                      <div key={filaIndex} className="d-flex justify-content-center">
                        {fila.map((celda, celdaIndex) => (
                          <div
                            key={celdaIndex}
                            className={`celdasDeLaSiguientePieza ${celda === 0 ? "bg-light" : colorPieza(celda)}`}
                          ></div>
                        ))}
                      </div>
                    ))}
                </div>
              </Card.Body>
            </Card>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="text-center mb-3">Estadísticas</h4>
              
                <p>
                  <strong>Velocidad de caída:</strong> {velocidadCaida}
                </p>
                <p>
                  <strong>Puntos actuales:</strong> {puntos}
                </p>
                <p>
                  <strong>Filas eliminadas:</strong> {filasEliminadas}
                </p>
              </Card.Body>
            </Card>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={() => setJugando(true)}>
                JUGAR
              </Button>
              <Button variant="danger" size="lg" onClick={() => setGameOver(true)}>
                Perder
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
  
};

export default Juego;