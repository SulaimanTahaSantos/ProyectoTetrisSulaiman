import React from "react";
import { Container, Table, Badge } from "react-bootstrap";
import AppMenu from "../AppMenu";

// Datos de ejemplo para el ranking
const rankingData = [
  { position: 1, name: "Juan Pérez", points: 1200, games: 45 },
  { position: 2, name: "María García", points: 1150, games: 42 },
  { position: 3, name: "Carlos Rodríguez", points: 1100, games: 40 },
  { position: 4, name: "Ana Martínez", points: 1050, games: 38 },
  { position: 5, name: "Luis Sánchez", points: 1000, games: 36 },
];

const Ranking = () => {
  return (
    <>
      <AppMenu />
      <Container>
        <h1 className="mt-5 mb-4">Ranking de Jugadores</h1>
        <Table striped bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>Posición</th>
              <th>Jugador</th>
              <th>Puntos</th>
              <th>Partidas Jugadas</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((player) => (
              <tr key={player.position}>
                <td>
                  <Badge 
                    bg={player.position <= 3 ? "warning" : "secondary"}
                    text={player.position <= 3 ? "dark" : "white"}
                  >
                    {player.position}
                  </Badge>
                </td>
                <td>{player.name}</td>
                <td>{player.points}</td>
                <td>{player.games}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Ranking;

