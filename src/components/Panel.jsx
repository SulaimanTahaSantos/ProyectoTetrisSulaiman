// components/Panel.jsx
import React from 'react';

// Componente Panel que recibe el array bidimensional como prop
const Panel = ({ grid }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(21, 1fr)', // 22 filas
        gridTemplateColumns: 'repeat(12, 1fr)', // 12 columnas
        width: '360px',
        height: '660px',
        border: '2px solid black',
        backgroundColor: 'lightgray',
      }}
    >
      {/* Renderizamos las celdas de la matriz */}
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #ccc',
              backgroundColor: cell === 0 ? 'white' : 'blue', // Cambiar color según el valor de la celda
            }}
          />
        ))
      )}
    </div>
  );
};

export default Panel;
