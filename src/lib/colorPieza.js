function colorPieza(num) {
    switch (num) {
        case 0:
            return 'bg-white';
        case 1:
            return 'bg-primary';
        case 2:
            return 'bg-danger';
        case 3:
            return 'bg-success';
        case 4:
            return 'bg-warning';
        case 5:
            return 'bg-black';
        case 6:
            return 'bg-info';
        case 7:
            return 'bg-secondary';
        case 8:
            return 'bg-dark'
        default:
            return 'white';
    }
}

export default colorPieza;