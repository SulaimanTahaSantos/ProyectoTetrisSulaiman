import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePartidas } from "../context/PartidasContext";

const TableGames = () => {
  const { partidas, registrarPartida } = usePartidas();
 // Array de juegos


  // Estado para ordenar columnas

  const [sortColumns, setSortColumns] = useState({
    key: "id",
    direction: "ascending",
  });

  // Estado para abrir modal
  const [showModal, setShowModal] = useState(false);

    // Función para ordenar columnas
    const handleSort = (key) => {
        let direction = "ascending";
        if (sortColumns.key === key && sortColumns.direction === "ascending") {
          direction = "descending";
        }
        setSortColumns({ key, direction });
    }

    // ordenar las filas segun la key

    const sortedGames = [...partidas].sort((a,b)=>{
        if(a[sortColumns.key] < b[sortColumns.key]){
            return sortColumns.direction === "ascending" ? -1 : 1;
        }
        if(a[sortColumns.key] > b[sortColumns.key]){
            return sortColumns.direction === "ascending" ? 1 : -1;
        }
        return 0;
        
    })

      const getArrow = (key) => {
    if (sortColumns.key === key) {
      return sortColumns.direction === 'ascending' ? '↑' : '↓';
    }
    return '';
  };

  // Modal para agregar juego
    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleAddGame = (e) => {
      e.preventDefault();
      setShowModal(false);
    
      const newGame = {
        id: parseInt(e.target.id.value),
        name: e.target.name.value,
        title: e.target.title.value,
        point: parseInt(e.target.point.value),
        releaseDate: e.target.releaseDate.value,
      };
    
      registrarPartida(newGame);
    };
    
    

   return (
    <div >
        <Button className="mt-3 mb-4" variant="outline-success" onClick={handleShowModal}>
            Add Game
        </Button>
          <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <Form onSubmit={handleAddGame}>
      <Form.Group className="mb-3" controlId="id">
        <Form.Label>Id</Form.Label>
        <Form.Control type="number" placeholder="Enter id" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Games</Form.Label>
        <Form.Control type="text" placeholder="Games" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="point">
        <Form.Label>Points</Form.Label>
        <Form.Control type="number" placeholder="Points" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="releaseDate">
        <Form.Label>Release Date</Form.Label>
        <Form.Control type="date" placeholder="Date for game" />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {getArrow('id')}
            </th>
            <th onClick={() => handleSort('name')}>
              Name {getArrow('name')}
            </th>
            <th onClick={() => handleSort('title')}>
              Games {getArrow('title')}
            </th>
            <th onClick={() => handleSort('point')}>
              Points {getArrow('point')}
            </th>
            <th onClick={() => handleSort('releaseDate')}>
              Release Date {getArrow('releaseDate')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.name}</td>
              <td>{game.title}</td>
              <td>{game.point}</td>
              <td>{game.releaseDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableGames;
