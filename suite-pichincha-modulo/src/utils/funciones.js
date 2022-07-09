

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return  result ? parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) : null;
}

export function formatoFecha(fecha, formato) {
    const moment = require('moment');
    let now = moment(fecha);
    let min = moment('1900-01-01');
    if (now <= min) {
        return ''
    } else {
        return now.format(formato || "DD-MM-YYYY");
    }
}