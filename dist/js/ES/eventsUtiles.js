/**
 * This function formats the RUT to the text of an input
 * It is recommended to use the function on input with onkeyup
 * 
 * @param {Object} input
 */
export const formatRut = (input) =>{
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
 * It is recommended to use the function on input with onkeypress
 * 
 * @param {Object} input
 */
export const maxLengthCheck = (input) =>{
    let value = input.value.toString();

    if(value.length < input.maxLength){
        return true;
    }else{
        return false;
    }
}

/**
 * This function validates the keys pressed
 * It is recommended to use the function on input with onkeypress
 *
 * @param {Event} event
 * @param {string|Array} validation type of validation
 *
 * Default Validation (string):
 * -> 'LNS' letters, numbers and space
 * -> 'LWS' letters and space
 * -> 'CFN' (phone number) numbers, plus sign (+)
 * -> 'LTS' letters
 * -> 'NBS' numbers
 * -> 'DNS' decimal numbers
 * -> 'LWA' letters without accent mark
 * -> 'RUT' numbers and sign (-)
 *
 * @returns if the key is valid it allows writing, if not, it does not write to the input
 */
export const checkKeys = (event, validation) => {
    let key = event.key;
    let keys = [];

    const keyValidate = {
        letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        capitalLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        accentMarkLetters: ["á", "é", "í", "ó", "ú"],
        accentMarkCapitalLetters: ["Á", "É", "Í", "Ó", "Ú"],
        numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        space: [" "],
        plus: ["+"],
        minus: ["-"],
        k: ["k"],
        capitalK: ["K"],
        dot: ["."],
        comma: [","]
    }

    switch (typeof validation) {
        case 'string':
            switch (validation) {
                case 'LNS':
                    keys = keyValidate.letters.concat(
                        keyValidate.capitalLetters,
                        keyValidate.accentMarkLetters,
                        keyValidate.accentMarkCapitalLetters,
                        keyValidate.numbers,
                        keyValidate.space,
                    );
                    break;
                case 'CFN':
                    keys = keyValidate.numbers.concat(keyValidate.plus);
                    break;
                case 'LTS':
                    keys = keyValidate.letters.concat(
                        keyValidate.capitalLetters,
                        keyValidate.accentMarkLetters,
                        keyValidate.accentMarkCapitalLetters
                    );
                    break;
                case 'LWA':
                    keys = keyValidate.letters.concat(keyValidate.capitalLetters);
                    break;
                case 'LWS':
                    keys = keyValidate.letters.concat(
                        keyValidate.capitalLetters,
                        keyValidate.accentMarkLetters,
                        keyValidate.accentMarkCapitalLetters,
                        keyValidate.space
                    );
                    break;
                case 'NBS':
                    keys = numbers.concat(minus);
                    break;
                case 'DNS':
                    keys = keyValidate.numbers.concat(
                        keyValidate.minus,
                        keyValidate.comma,
                        keyValidate.dot
                    );
                    break;
                case 'RUT':
                    keys = keyValidate.numbers.concat(
                        keyValidate.minus,
                        keyValidate.k,
                        keyValidate.capitalK
                    );
                    break;
            }
            break;
        default:
            let array = [];

            for (const val of validation) {
                let keyValidateAttr = keyValidate[val];

                if(array.length == 0){
                    array = keyValidateAttr;
                }else{
                    array = array.concat(keyValidateAttr);
                }     
            }

            keys = array;
            break;
    }

    if(keys.includes(key)){
        return true;
    }else{
        return false;
    }
}

/**
 * This function filters by text an html table
 * 
 * @param {string} tableId id de la tabla
 * @param {Object} input this
 */
export const filterTable = (tableId, input) => {
    let table = document.querySelector(tableId);
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
