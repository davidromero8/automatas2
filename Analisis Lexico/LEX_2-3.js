/*--------------------------LEXICO 1/3--------------------------------------*/
const fs = require('fs');

fs.readFile('sql_text.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

function separarTexto(data, palabraClave) {
    data = data.trim()
    let guardarPalabras = []
    let palabra = ''
    let id = []

    for (let i = 0; i < data.length; i++) {
        let caracter = data[i]
    
        if (caracter !== ' ') {
            palabra += caracter
        } else if (palabra !== '') {
            guardarPalabras.push(palabra)
            if (palabraClave[palabra]) {
                id.push(palabraClave[palabra])
            } else {
                id.push(null)
            }
            palabra = ''
        }
    }
    
    if (palabra !== '') {
        guardarPalabras.push(palabra)
        if (palabraClave[palabra]) {
            id.push(palabraClave[palabra])
        } else {
            id.push(null)
        }
    }

    return { palabras: guardarPalabras, ids: id }
}

/*--------------------------LEXICO 2/3--------------------------------------*/

// leer archivo sqlkeywords
fs.readFile('sqlkeywords.txt', 'utf8', (err, keyData) => {
    if (err) {
        console.error(err);
        return;
    }

    // se separa id y palabra clave
    const linea = keyData.split('\n')
const keywords = []
const num = []

//dividira laas lineas en 2, una antes de : y despues de :
for (let i = 0; i < linea.length; i++) {
    let dividirLinea = linea[i]
    let parts = dividirLinea.split(': ')

    //verifica que se dividio y guarda las 2 partes
    if (parts.length === 2) {
        keywords[parts[1].trim()] = parseInt(parts[0])
    }
}   

        const { palabras, ids } = separarTexto(data, keywords)
        console.log(palabras)
        console.log(ids)
    })
})
