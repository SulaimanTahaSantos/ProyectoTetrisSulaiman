import React from 'react';

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

export default Pieza;
