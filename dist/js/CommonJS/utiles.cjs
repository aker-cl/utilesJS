function UtilesJS(){
    return {
        /** Fetch */

        /**
         * This function initializes a promise
         * 
         * @param {any} data nullable
         *
         * @returns {any} data in resolve
         */
        initPromise: async (data = null) => {
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        },
        /**
         * This function uses fetch together with a promise with any method
         * 
         * @param {string} url 
         * @param {string} method 
         * @param {object} headers 
         * @param {any} data 
         * 
         * @returns {any} data in resolve
         */
        fetchDataPromise: async(url, method, headers, data = null) => {
            return new Promise(async (resolve, reject) => {
                try {
                    await fetch(url, {
                        headers,
                        method,
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(datos => {
                        resolve(datos);
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },

        /** Arrays */

        /**
         * This function orders an array by string, date or number according to the attribute and in both ascending and descending order
         * 
         * @param {array} array 
         * 
         */
        arrayOrderBy: (array) => {
            return {
                /**
                 * @param {string} attr name of attribute 
                 * @param {string} order asc | desc
                 * 
                 * @return {array}
                 */
                string: (attr, order) => {
                    array.sort(function (a,b) {
                        return order == 'asc' ? ((a[attr] == b[attr]) ? 0 : ((a[attr] < b[attr]) ? 1 : -1 )):
                                                ((a[attr] == b[attr]) ? 0 : ((a[attr] > b[attr]) ? 1 : -1 ));
                    });
            
                    return array;
                },
                /**
                 * @param {string} attr name of attribute 
                 * @param {string} order asc | desc
                 * 
                 * @return {array}
                 */
                date: (attr, order) => {
                    array.sort(function (a, b) {
                        let v1 = new Date(a[attr]);
                        let v2 = new Date(b[attr]);
            
                        let sort1 = v1, sort2 = v2;
            
                        return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
                    });
            
                    return array;
                },
                /**
                 * @param {string} attr name of attribute 
                 * @param {string} order asc | desc
                 * 
                 * @return {array}
                 */
                number: (attr, order) => {
                    array.sort(function (a, b) {
                        let v1 = a[attr];
                        let v2 = b[attr];
            
                        let sort1 = v1, sort2 = v2;
            
                        return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
                    });
            
                    return array;
                }
            }
        },
        /**
         * This function groups an array by category/attribute.
         * Just work in a new variable. Ex: var array2 = Utiles().arrayGroupBy(array1, 'attrName')
         * 
         * @param {array} arr array 
         * @param {string} attribute attribute name to group
         *
         * @return {array} new array grouped by attribute
         */
        arrayGroupBy: (arr, attribute) => {
            const groupBy = arr.reduce((group, array) => {
                group[array[attribute]] = group[array[attribute]] ?? [];
                group[array[attribute]].push(array);
                return group;
            }, {});
    
            return groupBy;
        },
        /**
         * This function merges arrays and groups them based on the value of an attribute that matches between them.
         * Just work in a new variable. Ex: var array2 = Utiles().arrayFusionByAttribute([array1, array2], 'date')
         * 
         * @param {array} arrays 
         * @param {string} attribute 
         * 
         * @returns {array} 
         */
        arrayFusionByAttribute: (arrays, attribute) => {
            let newArray = [];
            let finalArray = [];
    
            arrays.forEach(element => {
                let obj = UtilesJS().arrayGroupBy(element, attribute);
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
        },
        /**
         * This function removes the elements of an array based on their index, respecting the initial order
         * 
         * @param {array} array 
         * @param {array} indexes [1,2,...]
         */
        arrayRemoveItemsByIndex: (array, indexes) => {
            indexes.sort((a, b) => b - a);
            
            for (let index of indexes) {
                array.splice(index, 1);
            }
        },

        /** Strings */

        /**
         * This function converts the first letter of a string to uppercase
         * 
         * @param {string} str
         *
         * @returns {string}
         */
        capFirstLetter: (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        /**
         * This function generates line breaks based on the number of characters specified
         * 
         * @param {string} text 
         * @param {number} charactersPerLine 
         * 
         * @returns {string} text with line break
         */
        addLineBreak: (text, charactersPerLine) => {
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
        },
        /**
         * This function validates the format of the mail
         * 
         * @param {string} email email to validate
         *
         * @returns {boolean}TRUE if the email is valid, otherwise FALSE
         */
        validateEmail: (email) => {
            const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (email.match(validRegex)) {
                return true;
            } else {
                return false;
            }
        },

        /** Numbers */

        /**
         * This function add thousand points to prices
         * @param {number} price
         *
         * @returns {strings} price with thousand points (1.000, 10.000, etc.)
         */
        formatPrice: (price) => {
            return new Intl.NumberFormat("de-DE").format(price);
        },
        /**
         * This function round prices in base 10
         * @param {number} price
         *
         * @returns {number} price rounded to base 10
         */
        roundPrice: (price) => {
            let total = price;
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
        },
        /**
         * This function get the discounted price
         * 
         * @param {number} price
         * @param {number} discount discount percentage
         *
         * @returns {object} { price, newPrice } initial price and discounted price
         */
        discountPrice: (price, discount) => {
            let newPrice = 0;
            newPrice = price - (price * (discount / 100));
            return {price, newPrice};
        },

        /** DOM */

        /**
         * This function get the selected option text from a select element
         * 
         * @param {element} select select element from the DOM
         *
         * @returns selected text from the select element
         */
        getTextOfSelect: (select) => {
            return select.options[select.selectedIndex].text;
        },
        /**
         * Ths function get the value of an attribute of the selected option of select element
         * 
         * @param {element} select select element from the DOM
         * @param {string} attribute attribute name to retrieve
         *
         * @returns attribute value
         */
        getDataOfSelect: (select, attribute) => {
            return select.options[select.selectedIndex].getAttribute(attribute);
        },
        /**
         * This function get all attributes values of the selected options of a select element
         * 
         * @param {select} select select element from the DOM
         *
         * @returns array with element's attributes
         */
        getAllDataOfSelect: (select) => {
            let array = {};

            for (const option of select.options) {
                if (option.selected == true) {
                    array[option.text] = {};
                    for (const attr of option.attributes) {
                        array[option.text][attr.name] = attr.value;
                    }
                }
            }

            return array;
        },
        /**
         * This function get selected options values of a select multiple
         * 
         * @param {element} select select element from the DOM
         * 
         * @returns {array }array with selected options values
         */
        getValuesSelectMultiple: (select) => {
            let values = [];
            let options = select.selectedOptions;

            for (const option of options) {
                values.push(option.value);
            }

            return values;
        },
        /**
         * This function change the value of a select element
         * 
         * @param {element} select select element from the DOM
         * @param {string | int} value value to assign in the select
         */
        setValueOfSelect: (select, value) => {
            const eventChange = new Event("change");
            select.value = value;
            select.dispatchEvent(eventChange);
        },
        /**
         * This function assign values to a select multiple
         * 
         * @param {element} select select element from the DOM
         * @param {array} array object with attributes
         * @param {string|null} attribute attribute name of object in array to assign values to the select multiple
         */
        setValuesSelectMultiple: (select, data, attribute = null) => {
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
        
            for (const option of select.options) {
                if (values.includes(option.value)) {
                    option.selected = true;
                }else{
                    option.selected = false;
                }
            }
        
            select.dispatchEvent(event);
        },
        /**
         * This function add a row to an HTML table in a designed position
         * 
         * @param {string} tableID id of table
         * @param {string} row HTML of the row to be added
         * @param {string|int} position 'first' | 'last' | number -> position of the row in the table
         * @param {array|null} array array of values to add to the new row
         */
        addRowToTable: (tableID, row, position, array = null) => {
            let tableRef = document.querySelector(`#${tableID} tbody`);
            let newRow;

            switch (position) {
                case 'first':
                    newRow = tableRef.insertRow(0);
                break;
                case 'last':
                    newRow = tableRef.insertRow(tableRef.rows.length)
                break;
                default:
                    newRow = tableRef.insertRow(position);
                break;
            }

            if(array != null){
                for(const [key, value] of Object.entries(array)){
                    newRow[key] = value;
                }
            }
            
            newRow.innerHTML = row;
        },
        /**
         * This function delete a row from an HTML table
         * 
         * @param {string} rowId tr element from the DOM
         */
        deleteRowOfTable: (rowId) => {
            let row = document.querySelector(`#${rowId}`);
            row.parentNode.removeChild(row);
        },
        /**
         * This function get a URL parameter
         * 
         * @param {string} parameter name of the URL parameter
         * 
         * @returns {string} URL parameter value
         */
        getParamUrl: (parameter) => {
            let url = new URL(window.location.href);
            let param = url.searchParams.get(parameter);

            return param;
        },
        /**
         * This function adds parameters to the url (this reloads the page to take effect)
         * 
         * @param {string} parameter name of parameter
         * @param {string} value value of parameter
        */
        setParamUrl: (parameter, value) => {
            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search);
            params.set(parameter, value);
            document.location.search = params;
        },
        /**
         * This function removes a parameter from the url (this reloads the page to take effect)
         * 
         * @param {string} parameter name of parameter
        */
        deleteParamUrl: (parametro) => {
            if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search.slice(1));
                params.delete(parametro);
                window.history.replaceState(
                    {},
                    '',
                    `${window.location.pathname}${params}${window.location.hash}`,
                )
            }
        },
        /**
         * This function gets the current hash of the url
         *
         * @returns hash of url
        */
        getHashUrl: () => {
            return window.location.hash;
        },
        /**
         * This function add a hash in the url
         * @param {string} hash
        */
        setHashUrl: (hash) => {
            window.location.hash = `#${hash}`;
        },
        /**
         * This function removes the hash in the url
        */
        deleteHashUrl: () => {
            history.pushState("", "", `${location.pathname}${location.search}`);
        },
        /**
         * This function filters the page using parameters in the url
         * 
         * @param {string} elClass filter element class
         * @param {string} page url name of actual page 
         * @param {number} numPage number of page to filter
         */
        filterPage: (elClass, page, numPage = null) => {
            const filters = document.querySelectorAll(elClass);
            let url = `${page}?`;

            filters.forEach(element = (element, index) => {
                if(index == 0){
                    url += `${element.id}=${element.value}`;
                }

                if(index != 0){
                    if(element.id == 'page' && numPage != null){
                        url += `&${element.id}=${numPage}`;
                    }else{
                        url += `&${element.id}=${element.value}`;
                    }
                }
            });

            window.location.href = url;
        },
        /**
         * This function filters the page by pressing enter in filter inputs
         * 
         * @param {string} elClass filter element class
         * @param {string} page url name of actual page 
         */
        listenerInputsFilter: (elClass, page) => {
            const filtros = document.querySelectorAll(elClass);

            Array.from(filtros).forEach(function(element) {
                element.addEventListener('keyup', function(e){
                    e.preventDefault();
                    if(e.which == 13) {
                        UtilesJS().filterPage(clase, page, 1);
                    }
                });
            });
        },
        /**
         * This function filters the page by clicking on the page number (links)
         * 
         * @param {string} classLink class of the link element
         * @param {string} classFilter filter input class
         * @param {string} url url name of actual page 
         * @param {string} idPageInput input page id
         */
        listenerNumberPage: (classLink, classFilter, url, idPageInput) => {
            const links = document.querySelectorAll(classLink);
            const page =  document.querySelector(idPageInput);

            Array.from(links).forEach(function(element) {
                element.addEventListener('click', function(e){
                    e.preventDefault();
                    if(this.text != undefined){
                        page.value = this.text;
                    }

                    UtilesJS().filterPage(classFilter, url);
                });
            });
        },
        /**
         * This function simulates that the user is pressing a key and writes the character in the input
         * 
         * @param {*} elementId id of input element
         * @param {*} value value to write to input
         */
        simulateKeyPress: (elementId, value) => {

            let inputElement = document.querySelector(`#${elementId}`);
            let event = new Event('keypress');
            let text = value.toString();
            let index = 0;

            setInterval(addCharacter, 100);

            function addCharacter() {
                if (index < text.length) {
                    var currentChar = text.charAt(index);
                    inputElement.value += currentChar;
                    inputElement.dispatchEvent(event);
                    index++;
                } else {
                    clearInterval();
                }
            }
        }
    }
}

module.exports = UtilesJS;