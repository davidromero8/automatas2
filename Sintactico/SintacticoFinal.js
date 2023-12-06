function print(texto) {
    console.log("Son Iguales " + texto);
    contador = contador + 1;
}

const reglas_sintacticas = {
    "SELECT": [200, 10, 10],
    "UPDATE": [201],
    "DELETE": [202],
    "INSERT": [203]
}
const SELECT_1 = [200, 10, 10];
const FROM = [115, 998];
//DATA LEYERA LOS TOKENS
const DATA = [200, 10, 10, 115, 998, 12, 60, 201,10];

const WHERE = [60, 201, 10]; const ORDER_BY = [203]; const LIMIT = [204]; const GROUP_BY = [205]; const HAVING = [206]; 
const JOIN = [207]; const INNER_JOIN = [208]; const LEFT_JOIN = [209]; const RIGHT_JOIN = [210]; 
const COUNT = [211]; const SUM = [212]; const AVG = [213]; const MAX = [214];
const MIN = [215]; const AS = [216]; const LIKE = [217]; const IN = [218];
const BETWEEN = [219]; const IS_NULL = [220]; const IS_NOT_NULL = [221]; const ASC = [222];
const DESC = [223];

function print_error(token) {
    console.error("Error sintactico, en el token " + token);
}

function valida_select(posicion) {
    console.log("Posicion: " + posicion);
    console.log(posicion + " -> SELECT : " + SELECT_1);

    for (var j = 1; j <= SELECT_1.length - 1; j++) {
        console.log("Validando : " + SELECT_1[j]);
        if (DATA[posicion + j] != SELECT_1[j]) {
            print_error(DATA[posicion + j]);
        }
    }

    console.log("j : " + j);
    return posicion + (j - 1);
}

function valida_from(posicion) {
    console.log(posicion + " -> FROM : " + FROM);
    posicion = posicion + 1;

    console.info("DATA from : " + DATA[posicion]);
    if (DATA[posicion] != 998) {
        print_error(DATA[posicion]);
    }

    return posicion;
}

function valida_where(posicion) {
    console.log(posicion + " -> WHERE");
    if (
        DATA[posicion + 1] === WHERE[0] &&
        DATA[posicion + 2] === WHERE[1] &&
        DATA[posicion + 3] === WHERE[2]
    ) {
        posicion += 4; // Moverse más allá de los tokens WHERE, 201, y 10
        while (DATA[posicion] !== undefined && DATA[posicion] !== 218) { 
            console.log("Validando condición: " + DATA[posicion]);
            posicion += 1;
        }

        if (DATA[posicion] !== 218) {
            print_error("Falta cerrar paréntesis en la cláusula WHERE");
        }
    } else {
        console.log("No hay cláusula WHERE en la consulta");
    }
    return posicion;
}

function valida_distinct(posicion) {
    console.log("Cláusula DISTINCT");
    if (DATA[posicion + 1] === 10) { 
        console.log("Token DISTINCT encontrado");
        posicion = posicion + 2; 
    }
    return posicion;
}

function valida_order_by(posicion) {
    console.log(posicion + " -> ORDER BY : " + ORDER_BY);
    if (DATA[posicion + 1] !== undefined) {
        console.log("Validando ordenamiento");

        if (DATA[posicion + 1] === ASC || DATA[posicion + 1] === DESC) {
            posicion += 2; // Moverse más allá de ASC o DESC
        } else {
            print_error(DATA[posicion + 1]);
        }
    } else {
        print_error("Falta especificación de ordenamiento después de ORDER BY");
    }
    return posicion;
}

function valida_limit(posicion) {
    console.log(posicion + " -> LIMIT : " + LIMIT);
    if (DATA[posicion + 1] !== undefined) {
        if (typeof DATA[posicion + 1] === 'number') {
            const limite = DATA[posicion + 1];
            console.log("Límite: " + limite);
            posicion += 2; 
        } else {
            print_error("Después de LIMIT se espera un valor numérico");
        }
    } else {
        print_error("Falta especificación de valor después de LIMIT");
    }
    return posicion;
}

function valida_group_by(posicion) {
    console.log(posicion + " -> GROUP BY : " + GROUP_BY);

    if (DATA[posicion + 1] !== undefined) {
        console.log("Columnas de agrupación:");
        while (
            DATA[posicion + 1] !== undefined &&
            ![ORDER_BY, LIMIT, HAVING, JOIN].includes(DATA[posicion + 1])
        ) {
            console.log("Columna: " + DATA[posicion + 1]);
            posicion = moveToNextPosition(posicion + 1, GROUP_BY);
        }
    } else {
        print_error("Falta especificación de columnas de agrupación después de GROUP BY");
    }
    return posicion;
}

function valida_having(posicion) {
    console.log(posicion + " -> HAVING : " + HAVING);
    if (DATA[posicion + 1] !== undefined) {
        console.log("Expresión HAVING: " + DATA[posicion + 1]);
        posicion += 2; // Incrementa en 2 ya que HAVING está seguido por una expresión
    } else {
        print_error("Falta especificación de expresión después de HAVING");
    }
    return posicion;
}

function valida_join(posicion) {
    console.log(posicion + " -> JOIN : " + JOIN);
    if (DATA[posicion + 1] !== undefined && DATA[posicion + 2] !== undefined) {
        console.log("Tipo de JOIN: " + DATA[posicion + 1]);
        console.log("Tablas involucradas: " + DATA[posicion + 2]);
        posicion += 3; // Incrementa en 3 ya que JOIN está seguido por el tipo de JOIN y las tablas involucradas
    } else {
        print_error("Falta especificación de tipo de JOIN o tablas después de JOIN");
    }
    return posicion;
}

function valida_agregacion(posicion) {
    console.log("Agregación encontrada");
    if (DATA[posicion + 1] !== undefined) {
        console.log("Función de agregación: " + DATA[posicion + 1]);
        posicion += 2; // Incrementa en 2 ya que la palabra clave de agregación está seguida por la función de agregación
    } else {
        print_error("Falta especificación de función de agregación después de la palabra clave de agregación");
    }
    return posicion;
}

function valida_as(posicion) {
    console.log(posicion + " -> AS : " + AS);
    if (DATA[posicion + 1] !== undefined) {
        console.log("Alias: " + DATA[posicion + 1]);
        posicion += 2; // Incrementa en 2 ya que AS está seguido por el alias
    } else {
        print_error("Falta especificación de alias después de AS");
    }
    return posicion;
}

function valida_like(posicion) {
    console.log(posicion + " -> LIKE : " + LIKE);
    if (DATA[posicion + 1] !== undefined) {
        console.log("Expresión LIKE: " + DATA[posicion + 1]);
        posicion += 2; // Incrementa en 2 ya que LIKE está seguido por la expresión
    } else {
        print_error("Falta especificación de expresión después de LIKE");
    }
    return posicion;
}

function valida_in(posicion) {
    console.log(posicion + " -> IN : " + IN);
    if (DATA[posicion + 1] !== undefined && DATA[posicion + 1] === 218 && DATA[posicion + 2] !== undefined) {
        console.log("Lista de valores en IN: " + DATA.slice(posicion + 2)); // Puedes ajustar según la estructura específica de tu gramática
        posicion += 3; 
    } else {
        print_error("Falta especificación de lista de valores después de IN");
    }
    return posicion;
}

function valida_between(posicion) {
    console.log(posicion + " -> BETWEEN : " + BETWEEN);
    if (DATA[posicion + 1] !== undefined) {
        console.log("Expresión BETWEEN: " + DATA.slice(posicion + 1)); 
        posicion += 3;
    } else {
        print_error("Falta especificación de expresiones después de BETWEEN");
    }

    return posicion;
}

function valida_null(posicion, is_null) {
    console.log(posicion + " -> " + (is_null ? "IS NULL" : "IS NOT NULL"));
    if (DATA[posicion + 1] !== undefined) {
        console.log("Expresión después de IS NULL/NOT NULL: " + DATA[posicion + 1]);
        posicion += 2; 
    } else {
        print_error("Falta especificación de expresión después de IS NULL/NOT NULL");
    }

    return posicion;
}

function valida_asc_desc(posicion) {
    console.log(posicion + " -> ASC/DESC : " + (DATA[posicion] === ASC ? "ASC" : "DESC"));
    if (DATA[posicion + 1] !== undefined) {
        console.log("Expresión después de ASC/DESC: " + DATA[posicion + 1]);
        posicion += 2; // Incrementa en 2 ya que ASC o DESC está seguido por una expresión
    } else {
        print_error("Falta especificación de expresión después de ASC/DESC");
    }
    return posicion;
}


function valida_count(posicion) {
    console.log(posicion + " -> COUNT : " + COUNT);
    if (DATA[posicion + 1] !== undefined) {
        console.log("Expresión después de COUNT: " + DATA[posicion + 1]);
        posicion += 2; 
    } else {
        print_error("Falta especificación de expresión después de COUNT");
    }

    return posicion;
}

console.log("DATA: " + DATA);

for (i = 0; i < DATA.length; i++) {
    if (DATA[i] == 200) {
        i = valida_select(i); // SELECT
        console.log("i : " + i);
        i = valida_distinct(i);

        while (DATA[i] === ORDER_BY || DATA[i] === LIMIT || DATA[i] === GROUP_BY || DATA[i] === HAVING || DATA[i] === JOIN) {
            if (DATA[i] === ORDER_BY) {
                i = valida_order_by(i);
            } else if (DATA[i] === LIMIT) {
                i = valida_limit(i);
            } else if (DATA[i] === GROUP_BY) {
                i = valida_group_by(i);
            } else if (DATA[i] === HAVING) {
                i = valida_having(i);
            } else if (DATA[i] === JOIN) {
                i = valida_join(i);
            }
        }

        while (DATA[i] === COUNT || DATA[i] === SUM || DATA[i] === AVG || DATA[i] === MAX || DATA[i] === MIN) {
            if (DATA[i] === COUNT) {
                i = valida_count(i);
            } else if (DATA[i] === SUM) {
                // Lógica para validar SUM
            } else if (DATA[i] === AVG) {
                // Lógica para validar AVG
            } else if (DATA[i] === MAX) {
                // Lógica para validar MAX
            } else if (DATA[i] === MIN) {
                // Lógica para validar MIN
            }
        }
        while (
            DATA[i] === AS || DATA[i] === LIKE || DATA[i] === IN || DATA[i] === BETWEEN ||
            DATA[i] === IS_NULL || DATA[i] === IS_NOT_NULL || DATA[i] === ASC || DATA[i] === DESC
        ) {
            if (DATA[i] === AS) {
                i = valida_as(i);
            } else if (DATA[i] === LIKE) {
                i = valida_like(i);
            } else if (DATA[i] === IN) {
                i = valida_in(i);
            } else if (DATA[i] === BETWEEN) {
                i = valida_between(i);
            } else if (DATA[i] === IS_NULL || DATA[i] === IS_NOT_NULL) {
                i = valida_null(i, DATA[i] === IS_NULL);
            } else if (DATA[i] === ASC || DATA[i] === DESC) {
                i = valida_asc_desc(i);
            }
        }
    } else if (DATA[i] == 115) {
        i = valida_from(i); // FROM
    } else if (DATA[i] == 12 || (DATA[i] == 13 && DATA[i + 1] == 13)) {
        console.log("FIN");
        break;
    } else {
        print_error(DATA[i]);
        break;
    }
}
