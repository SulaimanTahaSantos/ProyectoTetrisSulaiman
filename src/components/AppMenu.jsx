import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; 

function AppMenu() {
  return (
    <Navbar expand="lg" className="bg-dark" style={{ width: '100%' }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-light">Tetris Sulaiman</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/" className="text-light">Inicio</Nav.Link> 
            <Nav.Link as={Link} to="/Juego" className="text-light">Juego</Nav.Link>
            <Nav.Link as={Link} to="/Partidas" className="text-light">Partidas</Nav.Link>
            <Nav.Link as={Link} to="/Ranking" className="text-light">Ranking</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppMenu;
