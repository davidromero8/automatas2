function print(texto) {
    console.log("Son Iguales " + texto);
    contador = contador + 1;
}

const reglas_sintacticas = {
    "SELECT": [200, 10, 10],
    "UPDATE": [201],
    "DELETE": [202],
};

const SELECT_1 = [200, 10, 10];
const FROM = [115, 998];
const DATA = [200, 10, 10, 115, 998, 12, 60, 201, 10]; // tokens contenido
const DISTINCT = [203];
const ORDER_BY = [204];
const LIMIT = [205];
const GROUP_BY = [206];
const HAVING = [207];
const JOIN = [208];
const INNER_JOIN = [209];
const LEFT_JOIN = [210];
const RIGHT_JOIN = [211];
const COUNT = [212];
const SUM = [213];
const AVG = [214];
const MAX = [215];
const MIN = [216];
const AS = [217];
const LIKE = [218];
const IN = [219];
const BETWEEN = [220];
const IS_NULL = [221];
const IS_NOT_NULL = [222];
const ASC = [223];
const DESC = [224];

function print_error(token) {
    console.error("Error sintáctico en el token " + token);
}

function valida_select(posicion) {
    console.log("Posicion: " + posicion);
    console.log(posicion + " -> SELECT : " + SELECT_1);

    for (var j = 1; j < SELECT_1.length; j++) {
        console.log("Validando : " + SELECT_1[j]);
        if (DATA[posicion + j] !== SELECT_1[j]) {
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
    if (DATA[posicion] !== 998) print_error(DATA[posicion]);
    return posicion;
}

function valida_update(posicion) {
    console.log(posicion + " -> UPDATE : " + reglas_sintacticas.UPDATE);
    return posicion;
}

function valida_delete(posicion) {
    console.log(posicion + " -> DELETE : " + reglas_sintacticas.DELETE);
    return posicion;
}

function valida_where(posicion) {
    console.log(posicion + " -> WHERE : " + reglas_sintacticas.WHERE);
    posicion = posicion + 1;
    console.info("DATA where : " + DATA[posicion]);

    if (DATA[posicion] !== 12 || DATA[posicion + 1] !== 60 || DATA[posicion + 2] !== 1) {
        print_error(DATA[posicion]);
    }

    return posicion + 2;
}

function valida_distinct(posicion) {
    console.log(posicion + " -> DISTINCT : " + DISTINCT);
    return posicion;
}

function valida_order_by(posicion) {
    console.log(posicion + " -> ORDER BY : " + ORDER_BY);
    return posicion;
}

function valida_limit(posicion) {
    console.log(posicion + " -> LIMIT : " + LIMIT);

    return posicion;
}

function valida_group_by(posicion) {
    console.log(posicion + " -> GROUP BY : " + GROUP_BY);
    return posicion;
}

function valida_having(posicion) {
    console.log(posicion + " -> HAVING : " + HAVING);
    return posicion;
}

function valida_join(posicion) {
    console.log(posicion + " -> JOIN : " + JOIN);
    return posicion;
}
console.log("DATA: " + DATA);

for (var i = 0; i < DATA.length; i++) {
    if (DATA[i] === 200) {
        i = valida_select(i); // SELECT
        console.log("i : " + i);
    } else if (DATA[i] === 115) {
        i = valida_from(i); // FROM
    } else if (DATA[i] === 201) {
        i = valida_update(i); // UPDATE
    } 
      else if (DATA[i] === 203) {
        i = valida_distinct(i);
    }

      else if (DATA[i] === 204) {
        i = valida_order_by(i);
    }

      else if (DATA[i] === 205) {
        i = valida_limit(i);
    }

      else if (DATA[i] === 206) {
        i = valida_group_by(i);
    }

      else if (DATA[i] === 207) {
        i = valida_having(i);
    }
      else if (DATA[i] === 208) {
        i = valida_join(i);
    }
      else if (DATA[i] === 202) {
        i = valida_delete(i); // DELETE
    } else if (DATA[i] === 10) {

        continue;
    } else if (DATA[i] === 13 && DATA[i + 1] === 13) {
        console.log("FIN");
        break;
    } else {
        print_error(DATA[i]);
        break;
    }
}
