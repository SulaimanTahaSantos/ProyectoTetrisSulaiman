import modeloPieza from "../lib/class/modeloPieza";

function nuevaPieza() {
    const numeroPieza = Math.floor(Math.random() * 7);
    const pieza = new modeloPieza(numeroPieza, 0, 0);
    console.log(pieza.numero);
    console.log(pieza.nombre);
    pieza.angulo = Math.floor(Math.random() * 4);
    console.log(pieza.fila, pieza.columna);
    console.log(pieza.matriz);
    console.log(pieza.girar());
    return pieza;
}

export default nuevaPieza;