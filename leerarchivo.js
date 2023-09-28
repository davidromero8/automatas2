/*
 *Leer el contenido del archivo data, renglo por renglon y pasarlo a un vector,
 imprimir el contenido del vector y pasar al siguiente renglon del archivo
 * */

const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    var cadena_split = data.split('\n');
    console.log(cadena_split);

    console.log(data);
});
