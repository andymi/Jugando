function toJSON(data) {
    return JSON.stringify(data);
}

function mostSelling(consumo) {
    var max = {
        cantidad: 0
    };
    consumo.forEach(function(b) {
        if (b.cantidad > max.cantidad) {
            max = b
        }
    });

    return max.insumo + ' ' + max.cantidad;
}