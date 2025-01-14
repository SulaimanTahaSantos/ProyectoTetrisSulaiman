import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AppMenu() {
  return (
    <Navbar expand="lg" className="bg-dark" style={{ width: '100%' }}>
      <Container fluid>
        <Navbar.Brand href="/" className="text-light">Tetris Sulaiman</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/" className="text-light">Inicio</Nav.Link>
            <Nav.Link href="/Juego" className="text-light">Juego</Nav.Link>
            <Nav.Link href="/Partidas" className="text-light">Partidas</Nav.Link>
            <Nav.Link href="/Ranking" className="text-light">Ranking</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppMenu;
