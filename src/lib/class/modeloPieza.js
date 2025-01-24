import modelos from "../modelos";

class modeloPieza {
    constructor(numero, fila = 0, columna = 1) {
        this.numero = numero;
        this.nombre = modelos.piezas[this.numero].nombre;
        this.angulo = 0; // El ángulo inicial es 0
        this.fila = fila; // Posición por defecto
        this.columna = columna; // Posición por defecto
        this.matriz = modelos.piezas[this.numero].rotaciones[this.angulo]; // Inicializa la matriz con la rotación 0
    }

    girar() {
        // Aumenta el ángulo y ajusta al rango de 0 a 3
        this.angulo = (this.angulo + 1) % 4;
        this.matriz = modelos.piezas[this.numero].rotaciones[this.angulo]; // Actualiza la matriz después de girar
    }
}

export default modeloPieza;