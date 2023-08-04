/******************************************\
* Prototypes 1.0                           *
*                                          *
* @author aker <scorpion9915@gmail.com>    *
* @license MIT License                     *  
\******************************************/

'use strict';

String.prototype.validateEmail = function validateEmail() {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    console.log(this);

    if (this.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

String.prototype.capFirstLetter = function capFirstLetter() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

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

Number.prototype.formatPrice = function formatPrice() {
    return new Intl.NumberFormat("de-DE").format(this);
}

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

HTMLSelectElement.prototype.getTextOptSelected = function getTextOptSelected() {
    return this.options[this.selectedIndex].text;
}

HTMLSelectElement.prototype.getDataOptSelected = function getDataOptSelected(attribute){
    return this.options[this.selectedIndex].getAttribute(attribute);
}

HTMLSelectElement.prototype.getAllDataOptSelected = function getAllDataOptSelected() {
    const option = this.options[this.selectedIndex].attributes;
    let array = {};

    for (const attr of option) {
        array[attr.name] = attr.value;
    }

    return array;
}

HTMLSelectElement.prototype.getValuesMultipleOpts = function getValuesMultipleOpts(){
    let values = [];
    let options = this.selectedOptions;

    for (const option of options) {
        values.push(option.value);
    }

    return values;
}

HTMLSelectElement.prototype.setValue = function setValue(value){
    const eventChange = new Event("change");
    this.value = value;
    this.dispatchEvent(eventChange);
}

HTMLSelectElement.prototype.setMultipleValues = function setMultipleValues(data, attribute = null){
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
                values.push(object[attribute]);
            }
            break;
        case 'array':
            values = data;
            break;
    }

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

HTMLInputElement.prototype.checkOnlyOpt = function checkOnlyOpt(els){
    let value = this.value;
    els.forEach(e => {
        if(e.value != value){
            e.checked = false;
        }                    
    });
}


HTMLInputElement.prototype.simulateKeyPress = function simulateKeyPress(value, typeEvent) {
    let event = new Event(typeEvent);

    for (const char of value) {
        this.value = char;

        this.dispatchEvent(event);

        setTimeout(function() {}, 500);
    }
}

HTMLTableElement.prototype.addRow = function addRow(fila, position, array = null){
    let tablaRef = this.getElementsByTagName('tbody')[0];
    let nuevaFila;

    switch (position) {
        case 'first':
            nuevaFila = tablaRef.insertRow(0);
        break;
        case 'last':
            nuevaFila = tablaRef.insertRow(tablaRef.rows.length)
        break;
        default:
            nuevaFila = tablaRef.insertRow(position);
        break;
    }

    if (array) {
        for(const [key, value] of Object.entries(array)){
            nuevaFila[key] = value;
        }
    }
    
    nuevaFila.innerHTML = fila;
}

HTMLTableRowElement.prototype.deleteRow = function deleteRow() {
    this.parentNode.removeChild(this);
}

Array.prototype.orderByString = function orderByString(attribute, order) {
    this.sort(function (a,b) {
        return order == 'asc' ? ((a[attribute] == b[attribute]) ? 0 : ((a[attribute] < b[attribute]) ? 1 : -1 )):
                                ((a[attribute] == b[attribute]) ? 0 : ((a[attribute] > b[attribute]) ? 1 : -1 ));
    });

    return this;
}

Array.prototype.orderByDateOrNumber = function orderByDateOrNumber(type, order, date = null, number = null) {
    this.sort(function (a, b) {
        let v1, v2;

        switch (type) {
            case 'date':
                v1 = new Date(a[date]);
                v2 = new Date(b[date]);
            break;
            case 'number':
                v1 = a[number];
                v2 = b[number];
            break;
        }

        let sort1 = v1, sort2 = v2;

        return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
    });

    return this;
}

Array.prototype.groupByAttribute = function groupByAttribute(attribute) {
    return this.reduce(function(group, obj) {
        group[obj[attribute]] = group[obj[attribute]] || [];
        group[obj[attribute]].push(obj);
        return group;
    }, {});
};

Array.prototype.fusionByAttribute = function fusionByAttribute(arrays, attribute){
    let newArray = [];
    let finalArray = [];

    arrays.forEach(element => {
        let obj = element.groupByAttribute(attribute);
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

Array.prototype.getIndex = function getIndex(val) {
    const value = (element) => element == val;

    return this.findIndex(value);
}

Array.prototype.removeItemsByIndex = function removeItemsByIndex(arrayIndex) {
    arrayIndex.sort((a, b) => b - a);
    
    for (let index of arrayIndex) {
        array.splice(index, 1);
    }
}
