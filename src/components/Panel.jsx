import React from 'react';
import colorPieza from '../lib/colorPieza';

const Panel = ({ grid }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(21, 1fr)', 
        gridTemplateColumns: 'repeat(12, 1fr)', 
        width: '360px',
        height: '660px',
        border: '2px solid black',
        backgroundColor: 'lightgray',
      }}
    >
      {grid.map((row, rowIndex) =>
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

export default Panel;
