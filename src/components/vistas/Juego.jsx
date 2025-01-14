import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AppMenu from '../AppMenu';
import modelos from '../../lib/modelos';
import Panel from '../panel';
import Pieza from '../Pieza';

const Juego = () => {
  const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz);

  return (
    <>
      <AppMenu />
      <Container>
        <h1 className='mt-5'>Juego</h1>
     
          <Panel grid={arrayCasillas} />
         
        <div>
          {modelos.piezas.map((pieza, index) => (
            <div key={index}>
              <h3>{pieza.nombre}</h3>
              {pieza.rotaciones.map((rotacion, rotIndex) => (
                <div key={rotIndex}>
                  <h4>Rotación {rotIndex + 1}</h4>
                  <Pieza rotacion={rotacion} />
                </div>
              ))}
            </div>
          ))}
        </div>

        
      </Container>
    </>
  );
};

export default Juego;
