/**
 * This function formats the RUT to the text of an input
 * It is recommended to use the function on input with onkeyup
 * @param {string} input
 *
 * Example: <input onkeyup="formatRut(this)"/>
*/

const formatRut = (input) =>{
    let text = input.value.replace('.','');
    text = text.replace('-','');

    if(text.length > 2){
        body = text.slice(0,-1);
        dv = text.slice(-1).toUpperCase();
        input.value = body + '-'+ dv;
    }
}

/**
 * This function controls the maximum number of characters in an input
 * It is recommended to use the function on input with onkeyup
 * @param {string, int} input
 *
 * Example: <input onkeypress="return maxLengthCheck(this)"/>
*/

const maxLengthCheck = (input) =>{
    if(input.value.length < input.maxLength){
        return true;
    }else{
        return false;
    }
}

/**
 * This function validates the keys pressed
 * It is recommended to use the function on input with onkeypress
 * Example: <input onkeypress="return checkKeys(event, 'LNS')"/>
 *
 * @param {event} event
 * @param {string} validation type of validation
 *
 * Validation:
 * -> 'LNS' letters, numbers and space
 * -> 'LWS' letters and space
 * -> 'CFN' (phone number) numbers, plus sign (+)
 * -> 'LTS' letters
 * -> 'NBS' numbers
 * -> 'DNS' decimal numbers
 * -> 'LWA' letters without accent mark
 * -> 'RUT' numbers and sign (-)
 *
 *
 * @returns if the key is valid it allows writing, if not, it does not write to the input
*/

const checkKeys = (event, validation) => {
    let key = event.key;
    let keys = [];

    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const capitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const accentMarkLetters = ["á", "é", "í", "ó", "ú"];
    const accentMarkCapitalLetters = ["Á", "É", "Í", "Ó", "Ú"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","];
    const space = [" "];
    const plus = ["+"];
    const minus = ["-"];
    const k = ["k"];
    const capitalK = ["K"];
    const dot = ["."];
    const comma = [","];

    keys = letters.concat(numbers);

    switch (validation) {
        case 'LNS':
            keys = letters.concat(
                capitalLetters,
                accentMarkLetters,
                accentMarkCapitalLetters,
                numbers,
                space,
            );
            break;
        case 'CFN':
            keys = numbers.concat(plus);
            break;
        case 'LTS':
            keys = letters.concat(
                capitalLetters,
                accentMarkLetters,
                accentMarkCapitalLetters
            );
            break;
        case 'LWA':
            keys = letters.concat(capitalLetters);
            break;
        case 'LWS':
            keys = letters.concat(
                capitalLetters,
                accentMarkLetters,
                accentMarkCapitalLetters,
                space
            );
            break;
        case 'NBS':
            keys = numbers.concat(minus);
            break;
        case 'DNS':
            keys = numbers.concat(comma);
        case 'RUT':
            keys = numbers.concat(
                minus,
                k,
                capitalK
            );
            break;
    }


    if(keys.includes(key)){
        return true;
    }else{
        return false;
    }
}

/**
 * Función para filtar tabla HTML
 * @param {string} tablaId id de la tabla
 * @param {string} inputId id de input de filtro
 *
 * Uso de función:
 * <input type="text" class="form-control" id="filtroTabla" onkeyup="filterTable('#tablaId', '#filtroTabla')" placeholder="Buscar..">
*/

const filterTable = (tablaId, inputId) => {
    let table = document.querySelector(tablaId);
    let input = document.querySelector(inputId);
    let rows = table.getElementsByTagName("TR");
    let filter = input.value.toUpperCase();
    let coincidence = false;
    let count = 0;

    for (let row of rows) {
        if(count > 0){
            let celdas = row.getElementsByTagName("TD");
            for (let celda of celdas) {
                if (celda.textContent.toUpperCase().indexOf(filter) > -1) {
                    coincidence = true;
                    break;
                }
            }

            if (coincidence) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

            coincidence = false;
        }
        count++;
    }
}
