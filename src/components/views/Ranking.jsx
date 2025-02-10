import React from "react";
import { Container, Table, Badge } from "react-bootstrap";
import AppMenu from "../AppMenu";
import { usePartidas } from "../../context/PartidasContext";

const Ranking = () => {
  const { partidas } = usePartidas();

  const rankingData = partidas
  .sort((a, b) => b.point - a.point) 
  .map((partida, index) => ({
    position: index + 1,
    id: partida.id,
    name: partida.name,
    title: partida.title,
    point: partida.point,
    releaseDate: partida.releaseDate,
  }));

const topRanking = rankingData.slice(0, 3);


  return (
    <>
      <AppMenu />
      <Container>
        <h1 className="mt-5 mb-4">Top 3 Ranking</h1>
        <Table striped bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>Posición</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Puntos</th>
              <th>Titulo</th>
              <th>Fecha de fin de la partida</th>
            </tr>
          </thead>
          <tbody>
            {topRanking.map((player) => (
              <tr key={player.position}>
                <td>
                  <Badge 
                    bg={player.position <= 3 ? "warning" : "secondary"}
                    text={player.position <= 3 ? "dark" : "white"}
                  >
                    {player.position}
                  </Badge>
                </td>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.point}</td>
                <td>{player.title}</td>
                <td>{player.releaseDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Ranking;
