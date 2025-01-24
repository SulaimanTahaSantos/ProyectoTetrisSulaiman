import React from 'react';
import colorPieza from '../lib/colorPieza';

const Pieza = ({ rotacion }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${rotacion.length}, 1fr)`,
        gridTemplateColumns: `repeat(${rotacion[0].length}, 1fr)`,
        width: '120px',
        height: '120px',
        border: '2px solid black',
        backgroundColor: 'lightgray',
      }}
    >
      {rotacion.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`border ${cell === 0 ? 'bg-white' : colorPieza(cell)}`} // Asegúrate de que la interpolación esté bien hecha
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        ))
      )}
    </div>
  );
};

export default Pieza;
