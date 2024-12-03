import React, { useState } from "react";
import { Table } from "react-bootstrap";

const TableGames = () => {
  // Array de juegos
  const partidas = [
    { id: 1, name: "zulaiman" , title: "Game 1", point: 1200, releaseDate: "2021-01-01" },
    { id: 2, name: "Sulaiman" , title: "Game 2", point: 1400, releaseDate: "2020-12-31" },
    { id: 3, name: "aulaiman" , title: "Game 3", point: 1600, releaseDate: "2020-11-30" },
  ];

  // Estado para ordenar columnas

  const [sortColumns, setSortColumns] = useState({
    key: "id",
    direction: "ascending",
  });

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

   return (
    <div>
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
