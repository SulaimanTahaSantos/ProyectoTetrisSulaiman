import React from "react";
import { Container, Row, Col, Card, ListGroup, Button, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppMenu from "../AppMenu";

const Inicio = () => {
let navigate = useNavigate();

  return (
    <>
     <AppMenu/>
    <Container className="py-5">
      
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center text-primary mb-4">Instrucciones Tetris</Card.Title>
              
              <Card.Text className="lead">
                <strong>Objetivo del juego:</strong> El objetivo de Tetris es formar líneas completas con las piezas que caen. Cuando una línea se llena completamente, desaparece y se suman puntos. El juego termina cuando las piezas se acumulan hasta la parte superior de la pantalla.
              </Card.Text>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Movimiento de las piezas:</strong> Las piezas caen de forma automática desde la parte superior de la pantalla.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Rotar piezas:</strong> Usa la tecla de rotación para cambiar la orientación de las piezas.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Mover las piezas:</strong> Usa las teclas de flecha izquierda y derecha para mover las piezas lateralmente.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Descelerar las piezas:</strong> Usa la flecha hacia abajo para hacer que las piezas caigan más rápido.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Cambiar de pieza: </strong> Si haces click en la pieza siguiente podras cambiarla.
                </ListGroup.Item>
              </ListGroup>

              <div className="text-center mt-4">
                <Image 
                  src="https://ucarecdn.com/2b1f7c45-b555-42c0-b90b-6d5fa00007a0/" 
                  alt="Tetris Logo" 
                  fluid 
                  style={{ maxWidth: '200px' }} 
                />
              </div>

              <div className="text-center mt-4">
                <Button variant="primary" size="lg" onClick={() => navigate('/Juego')}>
                  Empezar Juego
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
   
  );
}

export default Inicio;
