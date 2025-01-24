import modeloPieza from "../lib/class/modeloPieza";

function nuevaPieza(fila, columna) {
    const numeroPieza = Math.floor(Math.random() * 7);
    const pieza = new modeloPieza(numeroPieza, fila, columna);

    console.log(pieza.numero);
    console.log(pieza.nombre);
    console.log(pieza.fila, pieza.columna);
    console.log(pieza.matriz);
    pieza.girar();

    return pieza;
}

export default nuevaPieza;