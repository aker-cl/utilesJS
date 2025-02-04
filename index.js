// @ts-check

/**
 * This function orders an array by string, date or number according to the attribute and in both ascending and descending order
 * 
 * @param {Array} array 
 * 
 */
export const arrayOrderBy = (array) => {
    if (typeof array != 'object') throw new Error('The argument "array" must be an array');

    return {
        /**
         * @param {string} attr name of attribute 
         * @param {'asc'|'desc'} order
         * 
         * @return {array}
         */
        string: (attr, order) => {
            if (typeof attr != 'string') throw new Error('The argument "attr" must be a string');
            if (typeof order != 'string') throw new Error('The argument "order" must be a string');
            if(!['asc', 'desc'].includes(order)) throw new Error('The attribute "order" must be "asc" or "desc"');

            array.sort(function (a,b) {
                return order == 'asc' ? ((a[attr] == b[attr]) ? 0 : ((a[attr] < b[attr]) ? 1 : -1 )):
                                        ((a[attr] == b[attr]) ? 0 : ((a[attr] > b[attr]) ? 1 : -1 ));
            });
    
            return array;
        },
        /**
         * @param {string} attr name of attribute 
         * @param {'asc'|'desc'} order
         * 
         * @return {array}
         */
        date: (attr, order) => {
            if (typeof attr != 'string') throw new Error('The argument "attr" must be a string');
            if (typeof order != 'string') throw new Error('The argument "order" must be a string');
            if(!['asc', 'desc'].includes(order)) throw new Error('The attribute "order" must be "asc" or "desc"');

            array.sort(function (a, b) {
                let v1 = new Date(a[attr]);
                let v2 = new Date(b[attr]);
    
                let sort1 = v1, sort2 = v2;
    
                // @ts-ignore
                return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
            });
    
            return array;
        },
        /**
         * @param {string} attr name of attribute 
         * @param {'asc'|'desc'} order
         * 
         * @return {array}
         */
        number: (attr, order) => {
            if (typeof attr != 'string') throw new Error('The argument "attr" must be a string');
            if (typeof order != 'string') throw new Error('The argument "order" must be a string');
            if(!['asc', 'desc'].includes(order)) throw new Error('The attribute "order" must be "asc" or "desc"');

            array.sort(function (a, b) {
                let v1 = a[attr];
                let v2 = b[attr];
    
                let sort1 = v1, sort2 = v2;
    
                return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
            });
    
            return array;
        }
    }
}

/**
 * This function groups an array by category/attribute.
 * Just work in a new variable.
 * 
 * @param {Array} arr array 
 * @param {string} attribute attribute name to group
 *
 * @return {Array} new array grouped by attribute
 */
export const arrayGroupBy = (arr, attribute) => {
    if (typeof arr != 'object') throw new Error('The argument "arr" must be an array');
    if (typeof attribute != 'string') throw new Error('The argument "attribute" must be a string');

    // @ts-ignore
    return arr.reduce((group, array) => {
        group[array[attribute]] = group[array[attribute]] ?? [];
        group[array[attribute]].push(array);
        return group;
    }, {});
}

/**
 * This function merges arrays and groups them based on the value of an attribute that matches between them.
 * Just work in a new variable. Ex: var array2 = Utiles().arrayFusionByAttribute([array1, array2], 'date')
 * 
 * @param {Array} arrays 
 * @param {string} attribute 
 * 
 * @returns {Array} 
 */
export const arrayFusionByAttribute = (arrays, attribute) => {
    if (typeof arrays != 'object') throw new Error('The argument "arrays" must be an object');
    if (typeof attribute != 'string') throw new Error('The argument "attribute" must be a string');

    let newArray = [];
    let finalArray = [];

    arrays.forEach(element => {
        let obj = arrayGroupBy(element, attribute);
        newArray.push(obj);
    });

    newArray.forEach(element => {
        for(const [key, value] of Object.entries(element)){
            switch (finalArray.hasOwnProperty(key)) {
                case false:
                    finalArray[key] = value[0];
                    break;
                case true:
                    for (const [key2, value2] of Object.entries(value[0])) {
                        if(!finalArray[key].hasOwnProperty(key2)){
                            finalArray[key][key2] = value2;
                        }
                    }
                    break;
            }
        }
    });

    return finalArray;
}

/**
 * This function removes the elements of an array based on their index, respecting the initial order
 * 
 * @param {Array} array 
 * @param {Array} indexes [1,2,...]
 */
export const arrayRemoveItemsByIndex = (array, indexes) => {
    if (typeof array != 'object') throw new Error('The argument "array" must be an object');
    if (typeof indexes != 'object') throw new Error('The argument "indexes" must be an object');

    indexes.sort((a, b) => b - a);
    
    for (let index of indexes) {
        array.splice(index, 1);
    }
}

/**
 * This function indexes the elements of an array based on the value of a parameter
 * 
 * @param {Array<Object>} array 
 * @param {String} prop 
 * @returns 
 */
export const arrayIndexBy = (array, prop) => {
    return array.reduce((acc, item) => {
        acc[item[prop]] = item;
        return acc
    }, {})
}

/**
 * 
 * @param {Array} array 
 * 
 * @returns {Array}
 */
export const arrayClone = (array) => {
    return [...array];
}

/** Strings */

/**
 * This function converts the first letter of a string to uppercase
 * 
 * @param {string} str
 *
 * @returns {string}
 */
export const capFirstLetter = (str) => {
    if (typeof str != 'string') throw new Error('The argument "str" must be a string');

    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * This function generates line breaks based on the number of characters specified
 * 
 * @param {string} text 
 * @param {number} charactersPerLine 
 * 
 * @returns {string} text with line break
 */
export const addLineBreak = (text, charactersPerLine) => {
    if (typeof text != 'string') throw new Error('The argument "text" must be a string');
    if (typeof charactersPerLine != 'number') throw new Error('The argument "charactersPerLine" must be a number');

    var words = text.split(' ');
    var formattedText = '';
    var counter = 0;

    for (var i = 0; i < words.length; i++) {
        var currentWord = words[i];
    
        if (counter + currentWord.length > charactersPerLine) {
            formattedText += '<br>';
            counter = 0;
        }
    
        formattedText += currentWord + ' ';
        counter += currentWord.length + 1;
    }

    return formattedText.trim();
}

/**
 * This function validates the format of the mail
 * 
 * @param {string} email email to validate
 *
 * @returns {boolean} TRUE if the email is valid, otherwise FALSE
 */
export const validateEmail = (email) => {
    if (typeof email != 'string') throw new Error('The argument "email" must be a string');

    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

/**
 * This function validates the format of the rut
 * 
 * @param {string} rut rut to validate
 *
 * @returns {boolean} TRUE if the rut is valid, otherwise FALSE
 */
export const validateRut = (rut) => {
    if (typeof rut != 'string') throw new Error('The argument "rut" must be a string');

    var dashCheck = rut.match(/-/g)
  
    if(dashCheck == null || dashCheck.length > 1)
        return false
    
    rut = rut.replace(/\./g, "").replace(/-/g, "")

  
    var checkDigit = rut.charAt(rut.length - 1)


    var rutWithoutDigit = rut.slice(0, -1)


    var sum = 0
    var multiplier = 2

    for (var i = rutWithoutDigit.length - 1; i >= 0; i--) {
        sum += 
        multiplier * parseInt(rutWithoutDigit.charAt(i), 10)
        multiplier = multiplier < 7 ? multiplier + 1 : 2
    }

    /** @type {string|number} */
    var expectedDigit = 11 - (sum % 11)

    expectedDigit = (expectedDigit === 11) ? "0" : (expectedDigit === 10) ? "K" : expectedDigit.toString()

    return checkDigit === expectedDigit
}

/** Numbers */

/**
 * This function add thousand points to prices
 * @param {number} price
 *
 * @returns {string} price with thousand points (1.000, 10.000, etc.)
 */
export const formatPrice = (price) => {
    if (typeof price != 'number') throw new Error('The argument "price" must be a number');

    return new Intl.NumberFormat("de-DE").format(price);
}

/**
 * This function round prices in base 10
 * @param {number} price
 *
 * @returns {number} price rounded to base 10
 */
export const roundPrice = (price) => {
    if (typeof price != 'number') throw new Error('The argument "price" must be a number');

    let total = price;
    let round = parseInt(total.toString().charAt(total.toString().length - 1));

    if(round != 0){
        if(round >= 6){
            round = 10 - round;
        }else if(round <= 5){
            round = round * -1;
        }
    }

    total = total + round;

    return total;
}

/**
 * This function get the discounted price
 * 
 * @param {number} price
 * @param {number} discount discount percentage
 *
 * @returns {number}  price
 */
export const discountPrice = (price, discount) => {
    if (typeof price != 'number') throw new Error('The argument "price" must be a number');
    if (typeof discount != 'number') throw new Error('The argument "discount" must be a number');

    let newPrice = 0;
    newPrice = price - (price * (discount / 100));
    return newPrice;
}

/**
 * This function calculates the percentage difference between one number and another
 * 
 * @param {number} num1 previous value
 * @param {number} num2 current value
 * @param {true|null} absVal if the return will be an absolute value or not
 * 
 * @returns {number|boolean} if the num2 is 0, return false
 */
export const percentDiff = (num1, num2, absVal = null) => {
    if(num2 == 0)
        return false
        
    let diff = num2 - num1
    let percent = (diff / num2) * 100
    let roundedPercent = parseFloat(percent.toFixed(2))
    // @ts-ignore
    let result = roundedPercent % 1 === 0 ? parseInt(roundedPercent) : roundedPercent

    if(absVal)
        return Math.abs(result)
    return result
}

/**
 * This function divides a number into parts and adjusts the parts
 * 
 * @param {Number} number 
 * @param {Number} divider 
 * @returns 
 */
export const divideAndAdjust = (number, divider) => {
    const base = Math.floor(number / divider)
    const rest = number % divider
    const parts = []

    for (let i = 0; i < divider; i++){
        parts.push(base)
    }
    
    for (let i = 0; i < rest; i++) {
        parts[i] += 1
    }
    
    return parts
}

/** DOM */

/**
 * This function get the selected option text from a select element
 * 
 * @param {Object|string} select element or id element
 *
 * @returns {string} text of selected option
 */
export const getTextOfSelect = (select) => {
    if(!['string', 'object'].includes(typeof select)) throw new Error('The type of the "select" argument must be string or object');
    if(typeof select == 'string' && document.querySelector(`#${select}`) == undefined) throw new Error(`The element with id "${select}" is undefined`);
    if(typeof select == 'object' && select.nodeName != 'SELECT') throw new Error('The element type of the "select" argument must be a select');
    // @ts-ignore
    if(typeof select == 'string') select = document.querySelector(`#${select}`);
    // @ts-ignore
    return select.options[select.selectedIndex].text;
}

/**
 * This function get the value of an attribute of the selected option of select element
 * 
 * @param {Object|string} select element or id element
 * @param {string} attribute attribute name to retrieve
 *
 * @returns {string} attribute value of selected option
 */
export const getDataOfSelect = (select, attribute) => {
    if(!['string', 'object'].includes(typeof select)) throw new Error('The type of the "select" argument must be string or object');
    if(typeof select == 'string' && document.querySelector(`#${select}`) == undefined) throw new Error(`The element with id "${select}" is undefined`);
    if(typeof select == 'object' && select.nodeName != 'SELECT') throw new Error('The element type of the "select" argument must be a select');
    if(typeof attribute != 'string') throw new Error('The argument "attribute" must be a string');
    // @ts-ignore
    if(typeof select == 'string') select = document.querySelector(`#${select}`);
    // @ts-ignore
    return select.options[select.selectedIndex].getAttribute(attribute);
}

/**
 * This function get all attributes values of the selected options of a select element
 * 
 * @param {Object|string} select element or id element
 *
 * @returns {array} array with attributes of selected options
 */
export const getAllDataOfSelect = (select) => {
    if(!['string', 'object'].includes(typeof select)) throw new Error('The type of the "select" argument must be string or object');
    if(typeof select == 'string' && document.querySelector(`#${select}`) == undefined) throw new Error(`The element with id "${select}" is undefined`);
    if(typeof select == 'object' && select.nodeName != 'SELECT') throw new Error('The element type of the "select" argument must be a select');
    // @ts-ignore
    if(typeof select == 'string') select = document.querySelector(`#${select}`);

    let array = {};

    // @ts-ignore
    for (const option of select.options) {
        if (option.selected == true) {
            array[option.text] = {};
            for (const attr of option.attributes) {
                array[option.text][attr.name] = attr.value;
            }
        }
    }

    // @ts-ignore
    return array;
}

/**
 * This function get selected options values of a select multiple
 * 
 * @param {Object|string} select element or id element
 * 
 * @returns {array} array with selected options values
 */
export const getValuesSelectMultiple = (select) => {
    if(!['string', 'object'].includes(typeof select)) throw new Error('The type of the "select" argument must be string or object');
    if(typeof select == 'string' && document.querySelector(`#${select}`) == undefined) throw new Error(`The element with id "${select}" is undefined`);
    if(typeof select == 'object' && select.nodeName != 'SELECT') throw new Error('The element type of the "select" argument must be a select');
    if(typeof select == 'string') select = document.querySelector(`#${select}`);

    let values = [];
    let options = select.selectedOptions;

    for (const option of options) {
        values.push(option.value);
    }

    return values;
}

/**
 * This function change the value of a select element
 * 
 * @param {Object|string} select element or id element
 * @param {string | number} value value to assign in the select
 */
export const setValueOfSelect =  (select, value) => {
    if(!['string', 'object'].includes(typeof select)) throw new Error('The type of the "select" argument must be string or object');
    if(typeof select == 'string' && document.querySelector(`#${select}`) == undefined) throw new Error(`The element with id "${select}" is undefined`);
    if(typeof select == 'object' && select.nodeName != 'SELECT') throw new Error('The element type of the "select" argument must be a select');
    if(!['string', 'number'].includes(typeof value)) throw new Error('The type of the "value" argument must be string or number');
    if(typeof select == 'string') select = document.querySelector(`#${select}`);

    const eventChange = new Event("change");
    
    select.value = value;
    select.dispatchEvent(eventChange);
}

/**
 * This function assign values to a select multiple
 * 
 * @param {Object|string} select element or id element
 * @param {Object|array} data object with attributes or array with values
 * @param {string|null} attribute attribute name of object in array to assign values to the select multiple
 */
export const setValuesSelectMultiple = (select, data, attribute = null) => {
    if(!['string', 'object'].includes(typeof select)) throw new Error('The type of the "select" argument must be string or object');
    if(typeof select == 'string' && document.querySelector(`#${select}`) == undefined) throw new Error(`The element with id "${select}" is undefined`);
    if(typeof select == 'object' && select.nodeName != 'SELECT') throw new Error('The element type of the "select" argument must be a select');
    if(!['object'].includes(typeof data)) throw new Error('The type of the "data" argument must be an object');
    if(attribute != null && typeof attribute != 'string') throw new Error('The type of the "attribute" argument must be an object');
    if(typeof select == 'string') select = document.querySelector(`#${select}`);

    function getTypeOf(obj) {
        for (const o of obj) {
            if (typeof o == 'object') {
                return 'object';
            }
        }

        return 'array';
    }

    const event = new Event("change");
    let values = [];

    switch (getTypeOf(data)) {
        case 'object':
            for(const object of data){
                // @ts-ignore
                values.push(object[attribute]);
            }
            break;
        case 'array':
            values = data;
            break;
    }

    values = values.map(i => String(i));
    for (const option of select.options) {
        if (values.includes(option.value)) {
            option.selected = true;
        }else{
            option.selected = false;
        }
    }
    select.dispatchEvent(event);
}

/**
 * This function add a row to an HTML table in a designed position
 * 
 * @param {Object|string} table element or id element
 * @param {string} row HTML of the row to be added
 * @param {'first'|'last'|number} position 'first' | 'last' | number -> position of the row in the table
 * @param {Object|null} object object of values to add to the new row
 */
export const addRowToTable = (table, row, position, object = null) => {
    if(!['string', 'object'].includes(typeof table)) throw new Error('The type of the "table" argument must be string or object');
    if(typeof table == 'string' && document.querySelector(`#${table}`) == undefined) throw new Error(`The element with id "${table}" is undefined`);
    if(typeof row != 'string') throw new Error('The type of the "row" argument must be a string');
    if(!['string','number'].includes(typeof position)) throw new Error('The type of the "position" argument must be a string or a number');
    if(typeof position == 'string' && !['first','last'].includes(position)) throw new Error('The strings of the "position" argument must be "first" or "last"');
    if(object != null && !['object'].includes(typeof object)) throw new Error('The type of the "object" argument must be an object');
    if(typeof table == 'object') table = table.id;

    let tableRef = document.querySelector(`#${table} tbody`);
    let newRow;

    switch (position) {
        case 'first':
            // @ts-ignore
            newRow = tableRef.insertRow(0);
        break;
        case 'last':
            // @ts-ignore
            newRow = tableRef.insertRow(tableRef.rows.length)
        break;
        default:
            // @ts-ignore
            newRow = tableRef.insertRow(position);
        break;
    }

    if(object != null){
        for(const [key, value] of Object.entries(object)){
            newRow[key] = value;
        }
    }
    
    newRow.innerHTML = row;
}

/**
 * This function delete a row from an HTML table
 * 
 * @param {HTMLTableRowElement|string} row tr element from a table
 */
export const deleteRowOfTable = (row) => {
    if(!['string', 'object'].includes(typeof row)) throw new Error('The type of the "row" argument must be string or object');
    // @ts-ignore
    if(typeof row == 'string') row = document.querySelector(`#${row}`);
    // @ts-ignore
    row.parentNode.removeChild(row);
}

/**
 * This function get a URL parameter
 * 
 * @param {string} parameter name of the URL parameter
 * 
 * @returns {string} URL parameter value
 */
export const getParamUrl = (parameter) => {
    if(typeof parameter != 'string') throw new Error('The type of the "parameter" argument must be a string');

    let url = new URL(window.location.href);
    let param = url.searchParams.get(parameter);

    // @ts-ignore
    return param;
}

/**
 * This function adds parameters to the url (this reloads the page to take effect)
 * 
 * @param {string} parameter name of parameter
 * @param {string} value value of parameter
*/
export const setParamUrl = (parameter, value) => {
    if(typeof parameter != 'string') throw new Error('The type of the "parameter" argument must be a string');
    if(typeof value != 'string') throw new Error('The type of the "value" argument must be a string');

    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set(parameter, value);
    // @ts-ignore
    document.location.search = params;
}

/**
 * This function removes a parameter from the url (if 'parameters' is empty, all parameters are removed)
 * 
 * @param {array} parameters name of parameter
*/
export const deleteParamUrl = (parameters= []) => {
    // Obtener la URL actual
    const url = new URL(window.location.href);
    
    if (parameters.length === 0) {
        // Si no se especifican parámetros, eliminar todos
        url.search = '';
    } else {
        // Eliminar solo los parámetros especificados
        parameters.forEach(param => url.searchParams.delete(param));
    }
    
    // Actualizar la URL en la barra de direcciones sin recargar la página
    window.history.replaceState({}, '', url);
}

/**
 * This function gets the current hash of the url
 *
 * @returns hash of url
*/
export const getHashUrl = () => {
    return window.location.hash;
}

/**
 * This function add a hash in the url
 * @param {string} hash
*/
export const setHashUrl = (hash) => {
    if(typeof hash != 'string') throw new Error('The type of the "hash" argument must be a string');

    window.location.hash = `#${hash}`;
}

/**
 * This function removes the hash in the url
*/
export const deleteHashUrl = () => {
    history.pushState("", "", `${location.pathname}${location.search}`);
}

/**
 * This function filters the page using parameters in the url
 * 
 * @param {string} elClass filter element class
 * @param {string} page url name of actual page 
 * @param {number|null} numPage number of page to filter
 */
export const filterPage = (elClass, page, numPage = null) => {
    const filters = document.querySelectorAll(elClass);
    let url = `${page}?`;

    filters.forEach((element, index) => {
        if(index == 0){
            // @ts-ignore
            url += `${element.id}=${element.value}`;
        }

        if(index != 0){
            if(element.id == 'page' && numPage != null){
                url += `&${element.id}=${numPage}`;
            }else{
                // @ts-ignore
                url += `&${element.id}=${element.value}`;
            }
        }
    });

    url += `${getHashUrl()}`;

    window.location.href = url;
}

/**
 * This function filters the page by pressing enter in filter inputs
 * 
 * @param {string} elClass filter element class
 * @param {string} page url name of actual page 
 */
export const listenerInputsFilter = (elClass, page) => {
    const filtros = document.querySelectorAll(elClass);

    Array.from(filtros).forEach(function(element) {
        element.addEventListener('keyup', function(e){
            e.preventDefault();
            // @ts-ignore
            if(e.keyCode == 13) {
                filterPage(elClass, page, 1);
            }
        });
    });
}

/**
 * This function filters the page by clicking on the page number (links)
 * 
 * @param {string} classLink class of the link element
 * @param {string} classFilter filter input class
 * @param {string} url url name of actual page 
 * @param {string} idPageInput input page id
 */
export const listenerNumberPage =  (classLink, classFilter, url, idPageInput) => {
    const links = document.querySelectorAll(classLink);
    const page =  document.querySelector(idPageInput);

    Array.from(links).forEach(function(element) {
        element.addEventListener('click', function(e){
            e.preventDefault();
            if(this.text != undefined){
                let rel = this.getAttribute('rel');

                if (rel != null) {
                    if (rel == 'next') {
                        // @ts-ignore
                        page.value = parseInt(page.value) + 1
                    }else if(rel == 'prev') {
                        // @ts-ignore
                        page.value = parseInt(page.value) - 1
                    }
                }else{
                    // @ts-ignore
                    page.value = parseInt(this.text);
                }
            }
            // @ts-ignore
            filterPage(classFilter, url, page.value);
        });
    });
}

// Animations

/**
 * This function simulates that the user is pressing a key and writes the character in the input
 * 
 * @param {string} elementId id of input element
 * @param {string|number} value value to write to input
 */
export const simulateKeyPress = (elementId, value) => {
    let inputElement = document.querySelector(`#${elementId}`);
    let event = new Event('keypress');
    let text = value.toString();
    let index = 0;

    setInterval(addCharacter, 100);

    function addCharacter() {
        if (index < text.length) {
            var currentChar = text.charAt(index);
            // @ts-ignore
            inputElement.value += currentChar;
            // @ts-ignore
            inputElement.dispatchEvent(event);
            index++;
        } else {
            // @ts-ignore
            clearInterval();
        }
    }
}

/**
 * This function displays a transition between a range of numbers in a DOM element
 * 
 * @param {Object} element DOM element
 * @param {number} start number to start the count
 * @param {number} end number to end the count
 * @param {string} textBefore text to show before the number
 * @param {string} textAfter text to show after the number
 */
export const animateValue = (element, start, end, textBefore = '', textAfter = '') => {
    let current = start;
    let step = end / 70;
    let increment = step;
    let timer = setInterval(function() {
        current += increment;
        element.innerHTML = `${textBefore}${Math.floor(current).toLocaleString('de-DE')}`;
        if (current >= end) {
            // @ts-ignore
            clearInterval(timer);
            element.innerHTML = `${textBefore}${end.toLocaleString('de-DE')}${textAfter}`;
        }
    }, 10);
}

/** ATTENTION! this function just work with transition.css
 * This function make a transition for show or hide a element
 *
 * @param {Object|Array} element div, span, select, etc.
 * @param {'show'|'hide'} action
 */
export const elementTransition = (element, action) => {
    switch (action) {
        case 'show':
            if(typeof element == 'object' && typeof element[Symbol.iterator] === 'function'){
                for (const el of element) {
                    el.removeAttribute('hidden');
                }

                setTimeout(() => {
                    for (const el of element) {
                        el.classList.remove('div-hide');
                        el.classList.add('div-show');
                    }
                }, 200);
            }else{
                element.removeAttribute('hidden');

                setTimeout(() => {
                    element.classList.remove('div-hide');
                    element.classList.add('div-show');
                }, 200);
            }

            break;
        case 'hide':
            if(typeof element == 'object' && typeof element[Symbol.iterator] === 'function'){
                for (const el of element) {
                    el.classList.remove('div-show');
                    el.classList.add('div-hide');
                }

                setTimeout(() => {
                    for (const el of element) {
                        el.setAttribute('hidden', 'hidden');
                    }
                }, 400);
            }else{
                element.classList.remove('div-show');
                element.classList.add('div-hide');

                setTimeout(() => {
                    element.setAttribute('hidden', 'hidden');
                }, 400);
            }

            break;
    }
}

/**
 * This function disable a button or "a" element and displays a custom text next to a spinner based on button text
 * 
 * @param {Object|string} btn element | id of element
 * @param {'start' | 'stop'} action action of element
 * @param {object} opts element style options
 * @param {string|null} opts.text [text = ''] - button text
 * @param {number|null} opts.width [width = 0.8] - spinner width
 * @param {number|null} opts.height [height = 0.8] - spinner height
 * @param {string|null} opts.spinnerClass [spinnerClass = 'spinner-loading'] - class in span of spinner
 */ 
export const loadingButton = (btn, action, opts) => {
    let text = '', spinnerClass = 'spinner-loading';
    let width = 0.8, height = 0.8;

    if(!['string', 'object'].includes(typeof btn)) throw new Error('The type of the "btn" argument must be string or object');
    if(!['start', 'stop'].includes(action)) throw new Error('The strings of the "action" argument must be "start" or "stop"');
    if(typeof btn == 'string' && document.querySelector(`#${btn}`) == undefined) throw new Error(`The element with id "${btn}" is undefined`);

    if(opts){
        if(opts.text && typeof opts.text != 'string') throw new Error('The type of the "text" property of the opts argument must be string');
        if(opts.spinnerClass && typeof opts.spinnerClass != 'string') throw new Error('The type of the "spinnerClass" property of the opts argument must be string');
        if(opts.width && typeof opts.width != 'number') throw new Error('The type of the "width" property of the opts argument must be number');
        if(opts.height && typeof opts.height != 'number') throw new Error('The type of the "height" property of the opts argument must be number');

        text = opts.text ?? text;
        width = opts.width ?? width;
        height = opts.height ?? height;
        spinnerClass = opts.spinnerClass ?? spinnerClass;
    }

    // @ts-ignore
    if(typeof btn == 'string') btn = document.querySelector(`#${btn}`);

    switch (action) {
        case 'start':
            // @ts-ignore
            btn.setAttribute('data-btn-text', btn.innerHTML);
            let span = document.createElement('span');
            span.classList.add(`${spinnerClass}`);
            span.style.width = `${width}rem`;
            span.style.height = `${height}rem`;
            // @ts-ignore
            btn.innerHTML = `${span.outerHTML} ${text}`;
            // @ts-ignore
            btn.nodeName == 'A' ? btn.classList.add("disabled") : btn.disabled = true;                
            break;
        case 'stop':
            // @ts-ignore
            btn.innerHTML = btn.getAttribute('data-btn-text');
            // @ts-ignore
            btn.nodeName == 'A' ? btn.classList.remove("disabled") : btn.disabled = false;
            break;
    }
}

// Events

/**
 * This function formats the RUT to the text of an input in format 11111111-1
 * It is recommended to use the function on input with onkeyup
 * 
 * @param {Object} input
 */
export const formatRut = (input) =>{
    if(typeof input != 'object') throw new Error('The type of the "input" argument must be an object');

    let text = input.value.replace('.', '');
    text = text.replace('-', '');

    if(text.length > 2){
        let body = text.slice(0, -1);
        let dv = text.slice(-1).toUpperCase();
        input.value = `${body}-${dv}`;
    }
}

/**
 * This function controls the maximum number of characters in an input, useful with type="number" inputs 
 * It is recommended to use the function on input with onkeypress
 * 
 * @param {Object} input
 */
export const maxLengthCheck = (input) =>{
    if(typeof input != 'object') throw new Error('The type of the "input" argument must be an object');

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
 * @param {Array<"letters"|"capitalLetters"|"accentMarkLetters"|"accentMarkCapitalLetters"|
 * "numbers"|"space"|"plus"|"minus"|"k"|"capitalK"|"dot"|"comma"|"specials">} validation type of validation
 */
export const checkKeys = (event, validation) => {
    if(typeof event != 'object') throw new Error('The type of the "event" argument must be an object');
    if(typeof validation != 'object') throw new Error('The type of the "validation" argument must be an object');

    // @ts-ignore
    let key = event.key;
    let keys = [];
    let array = [];

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
        comma: [","],
        specials: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "]", "{", "}", ";", ":", "'", "\"", ",", ".", "<", ">", "/", "?", "|", "\\"]
    }

    for (const val of validation) {
        let keyValidateAttr = keyValidate[val];

        if(array.length == 0){
            array = keyValidateAttr;
        }else{
            array = array.concat(keyValidateAttr);
        }     
    }

    keys = array;

    if(!keys.includes(key)){
        event.preventDefault();
    }
}

/**
 * This function filters by text an html table
 * 
 * @param {Object|string} input element | id of element
 * @param {Object|string} table element | id of element
 */
export const filterTable = (input, table) => {
    if(!['string', 'object'].includes(typeof table)) throw new Error('The type of the "table" argument must be string or object');
    if(!['string', 'object'].includes(typeof input)) throw new Error('The type of the "input" argument must be string or object');
    if(typeof table == 'string' && document.querySelector(`#${table}`) == undefined) throw new Error(`The element with id "${table}" is undefined`);
    if(typeof input == 'string' && document.querySelector(`#${input}`) == undefined) throw new Error(`The element with id "${input}" is undefined`);
    // @ts-ignore
    if(typeof table == 'string') table = document.querySelector(`#${table}`);
    // @ts-ignore
    if(typeof input == 'string') input = document.querySelector(`#${input}`);
    // @ts-ignore
    let rows = table.getElementsByTagName("TR");
    // @ts-ignore
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

/**
 * This function does the same as the "sticky" css property, but you can define which will be the "tops" of both the top and bottom element,
 * together with the space between each one and the focus in the scroll of an element or window.
 *
 * @param {Object} opts Function configuration object
 * @param {string} opts.elementToMove id of element to move.
 * @param {'window'|string} opts.scrollFocusElement id or name of scroll focus element ('window' or 'elementID').
 * @param {string|null} opts.topElement id of upper stop element (null is the top of the window).
 * @param {string|null} opts.bottomElement id of bottom stop element (with null there is no bottom stop).
 * @param {number} opts.topSeparation spacing size with top element in px.
 * @param {number} opts.bottomSeparation spacing size with bottom element in px.
 */
export const scrollTransition = (opts) => {
    if(typeof opts != 'object') throw new Error('The type of the "opts" argument must be an object');
    if(typeof opts.elementToMove != 'string') throw new Error('The type of the "elementToMove" property of the opts argument must be string');
    if(typeof opts.scrollFocusElement != 'string') throw new Error('The type of the "scrollFocusElement" property of the opts argument must be string');
    if(opts.scrollFocusElement != 'window' && document.querySelector(`#${opts.scrollFocusElement}`) == undefined) throw new Error(`The element with id "${opts.scrollFocusElement}" is undefined`);
    if(typeof opts.topSeparation != 'number') throw new Error('The type of the "topSeparation" property of the opts argument must be number');
    if(typeof opts.bottomSeparation != 'number') throw new Error('The type of the "bottomSeparation" property of the opts argument must be number');

    if(opts.topElement){
        if(typeof opts.topElement != 'string') throw new Error('The type of the "topElement" property of the opts argument must be string');
    }

    if(opts.bottomElement){
        if(typeof opts.bottomElement != 'string') throw new Error('The type of the "bottomElement" property of the opts argument must be string');
    }

    var scrollY = window.scrollY;
    var diffWidth = 0;
    var addHeight = 0;
    var addBottom = 0;
    var topElementId = null; 
    var bottomElementId = null;
    var elementId = opts.elementToMove;

    topElementId = opts.topElement ?? null;
    bottomElementId = opts.bottomElement ?? null;

    if(opts.scrollFocusElement == 'window'){
        addHeight = opts.topSeparation ?? 7;
        // @ts-ignore
        addBottom = opts.bottomSeparation * -1 ?? -55;

        window.addEventListener('scroll', () => {
            setPositions();
        });
    }else{
        let elementListener = document.querySelector(`#${opts.scrollFocusElement}`);
        addHeight = opts.topSeparation ?? 35;
        addBottom = opts.bottomSeparation ?? 20;
        // @ts-ignore
        elementListener.addEventListener('scroll', function() {
            diffWidth = 0.15;
            setPositions();
        });
    }
    
    function setPositions(){
        const element = document.querySelector(`#${elementId}`);
        // @ts-ignore
        const parentElement = element.parentNode;
        // @ts-ignore
        const elementRect = parentElement.getBoundingClientRect();
        // @ts-ignore
        const elementTop = parentElement.getBoundingClientRect().top + scrollY;
        // @ts-ignore
        const elementStyle = getComputedStyle(parentElement);
        const widthScreen = window.innerWidth;
        
        /** Top element limit */
        let topElement;
        let topElementStyle;
        let heightTopElement;
        let topElementRect;

        /** Bottom element limit */
        let bottomElement;
        let bottomElementStyle;
        let bottomElementRect;
        let bottomBottomElement;
        
        if(topElementId){
            topElement = document.querySelector(`#${topElementId}`);
            // @ts-ignore
            topElementStyle = getComputedStyle(topElement);
            heightTopElement = parseFloat(topElementStyle.getPropertyValue("height")) + addHeight;
            // @ts-ignore
            topElementRect = topElement.getBoundingClientRect();
        }

        if(bottomElementId){
            bottomElement = document.querySelector(`#${bottomElementId}`);
            // @ts-ignore
            bottomElementStyle = getComputedStyle(bottomElement);
            bottomBottomElement = parseFloat(bottomElementStyle.getPropertyValue("bottom"));
            // @ts-ignore
            bottomElementRect = bottomElement.getBoundingClientRect();
        }


        let widthWithPadding = elementStyle.getPropertyValue("width");
        let paddingLeft = parseFloat(elementStyle.getPropertyValue("padding-left"));
        let paddingRight = parseFloat(elementStyle.getPropertyValue("padding-right"));
        let realWidth = parseFloat(widthWithPadding) - (paddingLeft + paddingRight);
        let totalWidth = ((realWidth * 100) / widthScreen) + 0.15 - diffWidth;
        
        if(topElementId){
            if(bottomElementId){
                // @ts-ignore
                if (topElementRect.bottom <= elementRect.top) {
                    cleanElement();
                    // @ts-ignore
                } else if(topElementRect.bottom >= elementRect.top){
                    // @ts-ignore
                    if(bottomElementRect.height - addBottom >= elementRect.bottom || (bottomElementRect.height - addBottom - elementRect.bottom) >= ((element.offsetHeight * -1) + 32)){
                        setPropElement('sticky', `${bottomBottomElement}px`, '');                             
                    }else{
                        setPropElement('fixed', `${heightTopElement}px`, `${totalWidth}%`);                             
                    }                   
                }
            }else{
                // @ts-ignore
                if (topElementRect.bottom <= elementRect.top) {
                    cleanElement();
                    // @ts-ignore
                } else if(topElementRect.bottom >= elementRect.top){
                    setPropElement('fixed', `${heightTopElement}px`, `${totalWidth}%`);               
                }
            }
        }else if(bottomElementId){
            if (scrollY <= elementTop) {
                cleanElement();
            } else if(scrollY >= elementRect.top){
                if(scrollY >= elementRect.bottom){
                    setPropElement('sticky', '5px', '');
                }else{
                    setPropElement('fixed', '5px', `${totalWidth}%`);
                }                   
            }        
        }else{
            // @ts-ignore
            if (scrollY >= elementTop && scrollY <= elementTop + parentElement.offsetHeight) {
                setPropElement('fixed', '5px', `${totalWidth}%`);
            } else {
                cleanElement();
            }
        }

        function cleanElement(){
            // @ts-ignore
            element.style.position = 'sticky';
            // @ts-ignore
            element.style.top = '';
            // @ts-ignore
            element.style.width = '';
        }

        function setPropElement(pos, top, width){
            // @ts-ignore
            element.style.position = pos;
            // @ts-ignore
            element.style.top = top;
            // @ts-ignore
            element.style.width = width;
        }
    }
}