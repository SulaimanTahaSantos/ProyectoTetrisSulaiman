import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AppMenu from '../AppMenu';
import modelos from '../../lib/modelos';
import Panel from '../panel';

const Juego = () => {
  const [arrayCasillas, setArrayCasillas] = useState(modelos.matriz);

  return (
    <>
      <AppMenu />
      <Container>
        <h1 className='mt-5'>Juego</h1>
     
          <Panel grid={arrayCasillas} />
        
      </Container>
    </>
  );
};

export default Juego;
