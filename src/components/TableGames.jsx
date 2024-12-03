import React from "react";
import { Table } from "react-bootstrap";

const TableGames = () => {
  // Array de juegos
  const partidas = [
    { id: 1, name: "zulaiman" , title: "Game 1", point: 1200, releaseDate: "2021-01-01" },
    { id: 2, name: "Sulaiman" , title: "Game 2", point: 1400, releaseDate: "2020-12-31" },
    { id: 3, name: "aulaiman" , title: "Game 3", point: 1600, releaseDate: "2020-11-30" },
  ];



  return (
    <div>
      <h1>Game List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {partidas.map((game) => (
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
