import modelos from "../modelos";
class modeloPieza {
    constructor(numero, fila, columna) {
        this.numero = numero;
        this.nombre = modelos.piezas[numero].nombre;
        this.angulo = 0;
        this.fila = fila;
        this.columna = columna;
        this.matriz = modelos.piezas[numero].rotaciones[this.angulo];
    }

    girar() {
        this.angulo = (this.angulo + 1) % 4
        this.matriz = modelos.piezas[this.numero].rotaciones[this.angulo];
    }
}

export default modeloPieza;