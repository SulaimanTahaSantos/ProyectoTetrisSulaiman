import React from "react";
import TableGames from "../TableGames";
import { Container } from "react-bootstrap";
import AppMenu from "../AppMenu";

const Partidas = () => {
    
    return (
        <>
        <AppMenu/>
        <Container>
            <h1 className="mt-5 mb-3">Partidas</h1>
            <TableGames />
        </Container>
        </>
    );
       
}

export default Partidas;