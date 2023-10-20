/** Arrays */

/**
 * This prototype orders an array by string, date or number according to the attribute and in both ascending and descending order
 */
Array.prototype.orderBy = function orderBy(){
    return {
        /**
         * @param {string} attr name of attribute 
         * @param {'asc'|'desc'} order
         * 
         * @return {array}
         */
        string: (attr, order) => {
            this.sort(function (a,b) {
                return order == 'asc' ? ((a[attr] == b[attr]) ? 0 : ((a[attr] < b[attr]) ? 1 : -1 )):
                                        ((a[attr] == b[attr]) ? 0 : ((a[attr] > b[attr]) ? 1 : -1 ));
            });
    
            return this;
        },
        /**
         * @param {string} attr name of attribute 
         * @param {'asc'|'desc'} order
         * 
         * @return {array}
         */
        date: (attr, order) => {
            this.sort(function (a, b) {
                let v1 = new Date(a[attr]);
                let v2 = new Date(b[attr]);
    
                let sort1 = v1, sort2 = v2;
    
                return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
            });
    
            return this;
        },
        /**
         * @param {string} attr name of attribute 
         * @param {'asc'|'desc'} order
         * 
         * @return {array}
         */
        number: (attr, order) => {
            this.sort(function (a, b) {
                let v1 = a[attr];
                let v2 = b[attr];
    
                let sort1 = v1, sort2 = v2;
    
                return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
            });
    
            return this;
        }
    }
}

/**
 * This prototype groups an array by category/attribute.
 * Just work in a new variable. Ex: var array2 = array1.groupByAttribute('attrName')
 *
 * @param {string} attribute attribute name to group
 *
 * @return {Array} new array grouped by attribute
 */
Array.prototype.groupBy = function groupBy(attribute) {
    return this.reduce(function(group, obj) {
        group[obj[attribute]] = group[obj[attribute]] || [];
        group[obj[attribute]].push(obj);
        return group;
    }, {});
};

/**
 * This prototype merges arrays and groups them based on the value of an attribute that matches between them.
 * Just work in a new variable. Ex: var array2 = [array1, array2].fusionByAttribute('date')
 * 
 * @param {string} attribute 
 * 
 * @returns {array} 
 */
Array.prototype.fusionBy = function fusionBy(attribute){
    let newArray = [];
    let finalArray = [];

    this.forEach(element => {
        let obj = element.groupBy(attribute);
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
 * This prototype removes the elements of an array based on their index, respecting the initial order
 * 
 * @param {array} indexes [1,2,...]
 */
Array.prototype.removeItemsByIndex = function removeItemsByIndex(indexes) {
    indexes.sort((a, b) => b - a);
    
    for (let index of indexes) {
        this.splice(index, 1);
    }
}

/** Strings */

/**
 * This prototype validates the format of the mail
 *
 * @returns {boolean} TRUE if the email is valid, otherwise FALSE
 */
String.prototype.validateEmail = function validateEmail() {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

/**
 * This function converts the first letter of a string to uppercase
 *
 * @returns {string}
 */
String.prototype.capFirstLetter = function capFirstLetter() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * This function generates line breaks based on the number of characters specified
 *
 * @param {number} charactersPerLine 
 * 
 * @returns {string} text with line break
 */
String.prototype.addLineBreak = function addLineBreak(charactersPerLine) {
    var words = this.split(' ');
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

/** Numbers */

/**
 * This prototype add thousand points to prices
 *
 * @returns {string} price with thousand points (1.000, 10.000, etc.)
 */
Number.prototype.formatPrice = function formatPrice() {
    return new Intl.NumberFormat("de-DE").format(this);
}

/**
 * This prototype round prices in base 10
 *
 * @returns {number} price rounded to base 10
 */
Number.prototype.roundPrice = function roundPrice() {
    let total = this;
    let round = total.toString().charAt(total.toString().length - 1);

    if(round != 0){
        if(round >= 6){
            round = 10 - round;
        }else if(round <= 5){
            round = round * -1;
        }
    }

    total = parseInt(total) + parseInt(round);

    return total;
}

/**
 * This prototype get the discounted price
 * 
 * @param {number} discount discount percentage
 *
 * @returns {number} discounted price
 */
Number.prototype.discountPrice = function discountPrice(discount){
    let newPrice = 0;
    newPrice = this - (this * (discount / 100));
    return newPrice;
}

/** DOM */

/**
 * This prototype get the selected option text from a select element
 *
 * @returns selected text from the select element
 */
Object.prototype.getTextOptSelected = function getTextOptSelected() {
    return this.options[this.selectedIndex].text;
}

/**
 * This prototype get the value of an attribute of the selected option of select element
 * 
 * @param {string} attribute attribute name to retrieve
 *
 * @returns attribute value
 */
Object.prototype.getDataOptSelected = function getDataOptSelected(attribute){
    return this.options[this.selectedIndex].getAttribute(attribute);
}

/**
 * This prototype get all attributes values of the selected options of a select element
 *
 * @returns array with element's attributes
 */
Object.prototype.getAllDataOptSelected = function getAllDataOptSelected() {
    const option = this.options[this.selectedIndex].attributes;
    let array = {};

    for (const attr of option) {
        array[attr.name] = attr.value;
    }

    return array;
}

/**
 * This prototype get selected options values of a select multiple
 *
 * @returns {array }array with selected options values
 */
Object.prototype.getValuesMultipleOpts = function getValuesMultipleOpts(){
    let values = [];
    let options = this.selectedOptions;

    for (const option of options) {
        values.push(option.value);
    }

    return values;
}

/**
 * This prototype change the value of a select element
 * 
 * @param {string|int} value value to assign in the select
 */
Object.prototype.setValue = function setValue(value){
    const eventChange = new Event("change");
    this.value = value;
    this.dispatchEvent(eventChange);
}

/**
 * This prototype assign values to a select multiple
 * 
 * @param {array} data object with attributes
 */
Object.prototype.setMultipleValues = function setMultipleValues(data){
    const event = new Event("change");
    let values = data;

    values = values.map(i => String(i));

    for (const option of this.options) {
        if (values.includes(option.value)) {
            option.selected = true;
        }else{
            option.selected = false;
        }
    }

    this.dispatchEvent(event);
}

/**
 * This prototype add a row to an HTML table in a designed position
 * 
 * @param {string} row HTML of the row to be added
 * @param {string|int} position 'first' | 'last' | number -> position of the row in the table
 * @param {Object|null} object object of values to add to the new row (id, class, etc)
 */
Object.prototype.addRow = function addRow(row, position, object = null){
    let tablaRef = this.getElementsByTagName('tbody')[0];
    let newRow;

    switch (position) {
        case 'first':
            newRow = tablaRef.insertRow(0);
        break;
        case 'last':
            newRow = tablaRef.insertRow(tablaRef.rows.length)
        break;
        default:
            newRow = tablaRef.insertRow(position);
        break;
    }

    if (object) {
        for(const [key, value] of Object.entries(object)){
            newRow[key] = value;
        }
    }
    
    newRow.innerHTML = row;
}

/**
 * This prototype delete a row from an HTML table
 */
Object.prototype.deleteRow = function deleteRow() {
    this.parentNode.removeChild(this);
}

/**
 * This prototype simulates that the user is pressing a key and writes the character in the input
 * 
 * @param {string|number} value value to write to input
 */
Object.prototype.simulateKeyPress =  function simulateKeyPress(value){
    let element = this;
    let event = new Event('keypress');
    let text = value.toString();
    let index = 0;

    setInterval(addCharacter, 100);

    function addCharacter() {
        if (index < text.length) {
            var currentChar = text.charAt(index);
            element.value += currentChar;
            element.dispatchEvent(event);
            index++;
        } else {
            clearInterval();
        }
    }
}

/**
 * This prototype displays a transition between a range of numbers in a DOM element
 * 
 * @param {number} start number to start the count
 * @param {number} end number to end the count
 * @param {string} textBefore text to show before the number
 * @param {string} textAfter text to show after the number 
*/
Object.prototype.animateValue = function animateValue(start, end, textBefore = '', textAfter = ''){
    let current = start;
    let step = end / 70;
    let increment = step;
    let timer = setInterval(() => {
        current += increment;
        this.innerHTML = `${textBefore}${Math.floor(current).toLocaleString('de-DE')}${textAfter}`;
        if (current >= end) {
            clearInterval(timer);
            this.innerHTML = `${textBefore}${end.toLocaleString('de-DE')}${textAfter}`;
        }
    }, 10);
}

/** ATTENTION! this function just work with transition.css
 * This function make a transition for show or hide a element
 * 
 * @param {'show'|'hide'} action transition of show of hide
 */
Object.prototype.elementTransition = function elementTransition(action){
    switch (action) {
        case 'show':
            if(typeof this == 'object' && typeof this[Symbol.iterator] === 'function'){
                for (const el of this) {
                    el.removeAttribute('hidden');
                }

                setTimeout(() => {
                    for (const el of this) {
                        el.classList.remove('div-hide');
                        el.classList.add('div-show');
                    }
                }, 200);
            }else{
                this.removeAttribute('hidden');

                setTimeout(() => {
                    this.classList.remove('div-hide');
                    this.classList.add('div-show');
                }, 200);
            }

            break;
        case 'hide':
            if(typeof this == 'object' && typeof this[Symbol.iterator] === 'function'){
                for (const el of this) {
                    el.classList.remove('div-show');
                    el.classList.add('div-hide');
                }

                setTimeout(() => {
                    for (const el of this) {
                        el.setAttribute('hidden', 'hidden');
                    }
                }, 200);
            }else{
                this.classList.remove('div-show');
                this.classList.add('div-hide');

                setTimeout(() => {
                    this.setAttribute('hidden', 'hidden');
                }, 200);
            }

            break;
    }
} 

/** ATTENTION! this function just work with transition.css
 * This function make a transition for show or hide a element
 * 
 * @param {'show'|'hide'} action transition of show of hide
 */
Object.prototype.elementTransition = function elementTransition(action){
    switch (action) {
        case 'show':
            if(typeof this == 'object' && typeof this[Symbol.iterator] === 'function'){
                for (const el of this) {
                    el.removeAttribute('hidden');
                }

                setTimeout(() => {
                    for (const el of this) {
                        el.classList.remove('div-hide');
                        el.classList.add('div-show');
                    }
                }, 200);
            }else{
                this.removeAttribute('hidden');

                setTimeout(() => {
                    this.classList.remove('div-hide');
                    this.classList.add('div-show');
                }, 200);
            }

            break;
        case 'hide':
            if(typeof this == 'object' && typeof this[Symbol.iterator] === 'function'){
                for (const el of this) {
                    el.classList.remove('div-show');
                    el.classList.add('div-hide');
                }

                setTimeout(() => {
                    for (const el of this) {
                        el.setAttribute('hidden', 'hidden');
                    }
                }, 200);
            }else{
                this.classList.remove('div-show');
                this.classList.add('div-hide');

                setTimeout(() => {
                    this.setAttribute('hidden', 'hidden');
                }, 200);
            }

            break;
    }
} 

/** ATTENTION! this function just work with transition.css
 * This function make a transition for show or hide a element
 * 
 * @param {'show'|'hide'} action transition of show of hide
 */
Array.prototype.elementTransition = function elementTransition(action){
    switch (action) {
        case 'show':
            if(typeof this == 'object' && typeof this[Symbol.iterator] === 'function'){
                for (const el of this) {
                    el.removeAttribute('hidden');
                }

                setTimeout(() => {
                    for (const el of this) {
                        el.classList.remove('div-hide');
                        el.classList.add('div-show');
                    }
                }, 200);
            }else{
                this.removeAttribute('hidden');

                setTimeout(() => {
                    this.classList.remove('div-hide');
                    this.classList.add('div-show');
                }, 200);
            }

            break;
        case 'hide':
            if(typeof this == 'object' && typeof this[Symbol.iterator] === 'function'){
                for (const el of this) {
                    el.classList.remove('div-show');
                    el.classList.add('div-hide');
                }

                setTimeout(() => {
                    for (const el of this) {
                        el.setAttribute('hidden', 'hidden');
                    }
                }, 200);
            }else{
                this.classList.remove('div-show');
                this.classList.add('div-hide');

                setTimeout(() => {
                    this.setAttribute('hidden', 'hidden');
                }, 200);
            }

            break;
    }
} 


/** ATTENTION! this function just work with transition.css
 * This function disable a button and displays a custom text next to a spinner based on button text
 * 
 * @param {object} opts element style options
 * @param {string|null} opts.text [text = ''] - button text
 * @param {number|null} opts.width [width = 0.8] - spinner width
 * @param {number|null} opts.height [height = 0.8] - spinner height
 * @param {string|null} opts.spinnerClass [spinnerClass = 'spinner-loading'] - class in span of spinner
*/

Object.prototype.loadingButton = function loadingButton(action, opts) {
    let text = '', spinnerClass = 'spinner-loading';
    let width = 0.8, height = 0.8;

    text = opts.text ?? text;
    width = opts.width ?? width;
    height = opts.height ?? height;
    spinnerClass = opts.spinnerClass ?? spinnerClass;

    switch (action) {
        case 'start':
            // @ts-ignore
            this.setAttribute('data-btn-text', this.innerHTML);
            let span = document.createElement('span');
            span.classList.add(`${spinnerClass}`);
            span.style.width = `${width}rem`;
            span.style.height = `${height}rem`;
            // @ts-ignore
            this.innerHTML = `${span.outerHTML} ${text}`;
            // @ts-ignore
            this.nodeName == 'A' ? this.classList.add("disabled") : this.disabled = true;                
            break;
        case 'stop':
            // @ts-ignore
            this.innerHTML = this.getAttribute('data-btn-text');
            // @ts-ignore
            this.nodeName == 'A' ? this.classList.remove("disabled") : this.disabled = false;
            break;
    }
}

export {};
