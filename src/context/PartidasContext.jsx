import React, { createContext, useContext, useState } from "react";

const PartidasContext = createContext();

export const usePartidas = () => {
  return useContext(PartidasContext);
};

export const PartidasProvider = ({ children }) => {
  const [partidas, setPartidas] = useState([]);

  const registrarPartida = (nuevaPartida) => {
    setPartidas((prevPartidas) => [...prevPartidas, nuevaPartida]);
  };

  return (
    <PartidasContext.Provider value={{ partidas, registrarPartida }}>
      {children}
    </PartidasContext.Provider>
  );
};
