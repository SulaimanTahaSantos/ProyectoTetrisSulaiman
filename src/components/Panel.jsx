// components/Panel.jsx
import React from 'react';

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
