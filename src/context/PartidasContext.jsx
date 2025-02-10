import React, { createContext, useContext, useState, useEffect } from "react";

const PartidasContext = createContext();

export const usePartidas = () => {
  return useContext(PartidasContext);
};

export const PartidasProvider = ({ children }) => {
  const [partidas, setPartidas] = useState([]);

  useEffect(() => {
    cargarPartidas();
  }, []);

  const registrarPartida = (partida) => {
    const partidasGuardadas = JSON.parse(localStorage.getItem("partidas")) || [];
    partidasGuardadas.push(partida);
    localStorage.setItem("partidas", JSON.stringify(partidasGuardadas));

    setPartidas(partidasGuardadas);
  };

  const cargarPartidas = () => {
    const partidasGuardadas = JSON.parse(localStorage.getItem("partidas"));
    if (partidasGuardadas) {
      setPartidas(partidasGuardadas);  
    }
  };

  return (
    <PartidasContext.Provider value={{ partidas, registrarPartida }}>
      {children}
    </PartidasContext.Provider>
  );
};
