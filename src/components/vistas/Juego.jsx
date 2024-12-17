import React from 'react';
import { Container } from 'react-bootstrap';
import AppMenu from '../AppMenu';

const Juego = () => {
  return (
    <>
      <AppMenu />
      <Container>
        <h1 className='mt-5'>Juego</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '300px',
              height: '600px',
              border: '2px solid black',
              backgroundColor: 'lightgray',
              
            }}
          >
            {/* Aquí mostraremos la lógica del juego */}
           
          </div>
        </div>
      </Container>
    </>
  );
};

export default Juego;
