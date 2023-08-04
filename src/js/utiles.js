/******************************************\
* UtilesJS 1.0                             *
*                                          *
* @author jp7434 <scorpion9915@gmail.com>  *
* @license MIT License                     *  
\******************************************/


/**
 * To use this class you can do this:
 * const Utiles = new UtilesClass();
*/

class UtilesClass {
    /**
     * This function allows initializing a promise
     * @param {any} data nullable
     *
     * @returns data in resolve
    */

    async initPromise(data = null){
        return new Promise(async (resolve, reject) => {
            try {
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * This function allows do a query to the backend with a promise using fetch
     * @param {string} url 
     * @param {string} method 
     * @param {array} headers 
     * @param {object | array} data 
     * 
     * @returns data from backend in resolve
     *
     * Example:
     * const Utiles = new UtilesClass();
     * const getData = async() => {
     *      try {
     *          const url = "{{ route('data.backend') }}"; this is a example of route with Laravel
     *          let user = {
     *              id: 1,
     *              name: "Juan"
     *          }
     *
     *          await Utiles.getDataPromise(url, user)
     *          .then(data => {
     *              ...
     *          })
     *          catch(error => {
     *              ...
     *          });
     *      } catch (error) {
     *          ...
     *      }
     * }
    */
   
    async getDataPromise(url, method, headers, data = null){
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
    }

    /** ATTENTION! This function use moment.js
     * This function calculates the age
     *
     * @param {date} birthDate 
     * @param {date} now
     * @param {string} lang default: spanish
     * 
     * @returns age
     * 
     * Example:
     * var date = '1982-04-26';
     * var now = moment.now();
     * var age = Utiles.calculateAge(date, now);
     *
     * The final string of the day, month and year is in spanish, if you want it in english, the param 'lang' most be 'en'
    */

    calculateAge(birthDate, now, lang = null){
        let birth = moment(birthDate);

        // get years
        let years = now.diff(birth, 'years');

        // get months
        let diffMonthsDate = now.add(years * -1, 'years');
        let months = diffMonthsDate.diff(birth, 'months');

        // get days
        let days = 0;

        if(months == 0){
            days = diffMonthsDate.diff(birth, 'days');
        }
        
        if(months > 0){
            let diffDaysDate = diffMonthsDate.add(months * -1, 'months');
            days = diffDaysDate.diff(birth, 'days');
        }

        switch (years) {
            case 0:
                years = '';
                break;
            case 1:
                years = `${years} ${lang ? 'year' : 'año'}`;
                break;
            default:
                years = `${years} ${lang ? 'years' : 'años'}`;
                break;
        }

        switch (months) {
            case 0:
                months = '';
                break;
            case 1:
                months = `, ${months} ${lang ? 'month' : 'mes'}`;
                break;
            default:
                months = `, ${months} ${lang ? 'months' : 'meses'}`;
                break;
        }

        switch (days) {
            case 0:
                days = '';
                break;
            case 1:
                days = ` ${lang ? 'and' : 'y'} ${days} ${lang ? 'day' : 'dia'}`;
                break;
            default:
                days = ` ${lang ? 'and' : 'y'} ${days} ${lang ? 'days' : 'dias'}`;
                break;
        }

        return `${years}${months}${days}`;
    }

    /**
     * This function sorts an array based on the string value of an attribute
     * @param {array} array array to filter
     * @param {string} attribute name of attribute of object to filter
     * @param {string} order asc | desc -> order of orderBy
     *
     * Example:
     * var array = [{name: 'Julio'},{name: 'Esteban'},{name: 'Andrés'}];
     * var newArray = Utiles.arrayOrderByString(array, 'name', 'asc');
     *
     * @return array sorted by specified string attribute
    */

    arrayOrderByString(array, attribute, order){
        array.sort(function (a,b) {
            return order == 'asc' ? ((a[attribute] == b[attribute]) ? 0 : ((a[attribute] < b[attribute]) ? 1 : -1 )):
                                    ((a[attribute] == b[attribute]) ? 0 : ((a[attribute] > b[attribute]) ? 1 : -1 ));
        });

        return array;
    }

    /**
     * This function orders an object according to the string or numeric value of an attribute.
     * @param {array} array array to filter
     * @param {string} type date | number
     * @param {string} order asc | desc
     * @param {string} date name of date attribute of object
     * @param {int} number name of number attribute of object
     *
     * Example:
     * var array = [{nextDate: '2022-10-26', nextNumber: 15},{date: '2022-12-14', nextNumber: 5}];
     * var newArray = Utiles.arrayOrderByDateOrNumber(array, 'date', 'asc', 'nextDate', null) || arrayOrderByDateOrNumber(array, 'number', 'desc', null, 'nextNumber');
     *
     * @return array sorted by specified date or number attribute
    */

    arrayOrderByDateOrNumber(array, type, order, date = null, number = null){
        array.sort(function (a, b) {
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

        return array;
    }


    /**
     * 
     * @param {array} array 
     * 
     * @returns array according to specified order
    */

    arrayOrderBy(array){
        /**
         * @param {string} attr name of attribute 
         * @param {string} order asc | desc
        */

        return {
            string: (attr, order) => {
                array.sort(function (a,b) {
                    return order == 'asc' ? ((a[attr] == b[attr]) ? 0 : ((a[attr] < b[attr]) ? 1 : -1 )):
                                            ((a[attr] == b[attr]) ? 0 : ((a[attr] > b[attr]) ? 1 : -1 ));
                });
        
                return array;
            },
            date: (attr, order) => {
                array.sort(function (a, b) {
                    let v1 = new Date(a[attr]);
                    let v2 = new Date(b[attr]);
        
                    let sort1 = v1, sort2 = v2;
        
                    return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
                });
        
                return array;
            },
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
    }


    /**
     * This function groups an array by category/attribute
     * @param {array} array array to filter
     * @param {string} attribute attribute name to group
     *
     * Example:
     * var array = [{date: '2022-05-28', indicator: 1},{date: '2022-05-28', indicator: 2},{date: '2022-07-05', indicator: 1}];
     * var newArray = Utiles.arrayGroupBy(array, 'date');
     *
     * @return array grouped by attribute
    */

    arrayGroupBy(object, attribute){
        const groupBy = object.reduce((group, array) => {
            group[array[attribute]] = group[array[attribute]] ?? [];
            group[array[attribute]].push(array);
            return group;
        }, {});

        return groupBy;
    }

    /**
     * This function merges arrays by grouping an attribute
     * @param {array} arrays array set
     * @param {string} attribute attribute to group and merge arrayss
     *
     * Función requerida para funcionamiento: objectGroupBy
     *
     * Example:
     * var array1 = [{cost_price: '319095', date: '2023-02-17'},{cost_price: '1800', date: '2023-02-20'},{cost_price: '13611', date: '2023-02-27'}];
     * var array2 = [{sale_cost: '262840', date: '2023-02-17'},{sale_cost: '100376', date: '2023-02-20'},{sale_cost: '64474', date: '2023-03-01'}];
     * var finalArray = Utiles.arrayFusionByAttribute([oj1, obj2], 'date');
     *
     * @returns merged arrays and grouped according to the attribute
    */

    arrayFusionByAttribute(arrays, attribute){
        let newArray = [];
        let finalArray = [];

        arrays.forEach(element => {
            let obj = objectGroupBy(element, attribute);
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
     * 
     * @param {*} array 
     * @param {*} indexes 
     */

    arrayRemoveItemsByIndex(array, indexes) {
        indexes.sort((a, b) => b - a);
        
        for (let index of indexes) {
            array.splice(index, 1);
        }
    }

    /**
     * This function finds the index of a value in an object
     * @param {object} object
     * @param {string | int} valor
     *
     * Example:
     * var objectIndex = [5, 12, 8, 130, 44];
     * var index = Utiles.objectGetIndex(objectIndex, 12);
     *
     * @return index of value
    */

    objectGetIndex(object, valor){
        const value = (element) => element == valor;

        return object.findIndex(value);
    }

    /**
     * This function converts the first letter of a string to uppercase
     * @param {string} str
     *
     * Example:
     * ver str = 'word';
     * str = Utiles.capFirstLetter(str);
     *
     * @returns string with first letter capitalized
    */

    capFirstLetter(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * This function generates line breaks based on the number of characters specified
     * @param {string} text 
     * @param {number} charactersPerLine 
     * 
     * @returns text with line break
    */

    addLineBreak(text, charactersPerLine) {
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
     * This function returns a date format
     * @param {string} date
     * @param {string} lang
     * 
     * Example: 
     * let date = '2022-01-25 10:05:00';
     * let newDate = formatDate(date);
     *
     * @returns date with format d-m-Y h:i:s
    */

    formatDate(date){
        let newDate = new Date(date);

        let formatDate = Intl.DateTimeFormat('es-CL', {
            year: 'numeric',    //  2-digits
            month: '2-digit',   //  numeric (03), long(March), short(Mar), narrow(M)
            day: '2-digit',     //  numeric (05)
            hour: '2-digit',    //  numeric (05)
            minute: '2-digit',  //  nuemric (05)
            second: '2-digit',  //  numeric (05)
            hour12: false       //  true for 12 hour format
        }).format(newDate);

        return formatDate;
    }

    /**
     * Function to add thousand points to prices
     * @param {int} price
     *
     * Example: 
     * var price = 12500; 
     * var newPrice = formatPrice(price);
     *
     * @returns price with thousand points
    */

    formatPrice(price){
        return new Intl.NumberFormat("de-DE").format(price);
    }

    /**
     * Function to round prices in base 10
     * @param {int} price
     *
     * Example: 
     * var price = 256;
     * var newPrice = roundPrice(price);
     *
     * @returns price rounded to base 10
    */

    roundPrice(price){
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
    }

    /**
     * Function to get the discounted price
     * @param {int} price
     * @param {int} discount discount percentage
     *
     * Example: 
     * var {price, discountedPrice} = discountPrice(1500, 50);
     *
     * @returns initial price and discounted price
    */

    discountPrice(price, discount){
        let newPrice = 0;
        newPrice = price - (price * (discount / 100));
        return {price, newPrice};
    }

    /**
     * Function to validate the structure of an email
     * @param {string} email email to validate
     *
     * Example:
     * let isValid = validateEmail('something@example.com');
     *
     * @returns TRUE if the email is valid, otherwise FALSE
    */

    validateEmail(email){
        const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Function to get the selected text from a select element
     * @param {element} select select element from the DOM
     *
     * Example:
     * const select = document.querySelector('#select_id');
     * var selectText = getTextOfSelect(select);
     *
     * @returns selected text from the select element
    */

    getTextOfSelect(select){
        return select.options[select.selectedIndex].text;
    }

    /**
     * Function to get the value of an attribute of select element
     * @param {element} select select element from the DOM
     * @param {string} attribute attribute name to retrieve
     *
     * Example:
     * const select = document.querySelector('#select_id');
     * var value = getDataOfSelect(select, 'data-id');
     *
     * @returns attribute value
    */

    getDataOfSelect(select, attribute){
        return select.options[select.selectedIndex].getAttribute(attribute);
    }

    /**
     * Function to get all attributes of a select element
     * @param {element} element select element from the DOM
     *
     * Example:
     * const select = document.querySelector('#select_id');
     * var attributes = getAllDataOfSelect(select);
     *
     * @returns array with element's attributes
    */

    getAllDataOfSelect(element){
        const option = element.options[element.selectedIndex].attributes;
        let array = {};

        for (const attr of option) {
            array[attr.name] = attr.value;
        }

        return array;
    }

    /**
     * Function to only have one radio buttons or checkboxes option active when selected
     * @param {element} els array of element
     * 
     * Example:
     * let radios = document.querySelectorAll('.radios');
     * radios.forEach(element => {
            element.addEventListener('change', function() {
                element.checkOnlyOpt(radios);
            });
        });
    */

    checkOnlyOpt(els){
        let value = this.value;
        els.forEach(e => {
            if(e.value != value){
                e.checked = false;
            }                    
        });
    }

    /**
     * Function to get values of a multiple select
     * @param {element} select select element from the DOM
     *
     * Example:
     * const select = document.querySelector('#select');
     * var values = getSelectMultipleValues(select);
     *
     * @returns array with select values
    */

    getValuesSelectMultiple(select){
        let values = [];
        let options = select.selectedOptions;

        for (const option of options) {
            values.push(option.value);
        }

        return values;
    }

    /**
     * Function to change the value of a select element
     * @param {element} select select element from the DOM
     * @param {string | int} value value to assign in the select
     *
     * Example:
     * const select = document.querySelector('#select_id');
     * setValueOfSelect(select, "1");
    */

    setValueOfSelect(select, value){
        const eventChange = new Event("change");
        select.value = value;
        select.dispatchEvent(eventChange);
    }

    /**
     * Function to assign values to a multiple select
     * @param {element} select select element from the DOM
     * @param {array} array object with attributes
     * @param {string} attribute attribute name to assign values to the select
     *
     * Example:
     * const select = document.querySelector('#select_id');
     * var object = [{id: 1, name: 'Pedro'}, {id: 3, name: 'Cristian'}];
     * setValuesSelectMultiple(select, object, 'id');
    */

    setValuesSelectMultiple(select, array, attribute){
        const event = new Event("change");
        let values = [];

        for(const object of array){
            values[values.length] = object[attribute];
        }

        select.value = values;
        select.dispatchEvent(event);
    }

    /**
     * Function to add a row to an HTML table at the last position
     * @param {element} table table element from the DOM
     * @param {string} row HTML of the row to be added
     * @param {array} array array of values to add to the new row
     * @param {string, int} position 'first' | 'last' | number -> position of the row in the table
     *
     * Example:
     * const table = document.querySelector('#table_id');
     * var row = <tr><td></td><tr>;
     * var array = {id: 1, name: 'tr_1'};
     * addRowToTable(table, row, array, 'first'); || addRowToTable(table, row, array, 'last') || addRowToTable(table, row, array, 3);
    */

    addRowToTable(table, row, array, position){
        let tableRef = table.getElementsByTagName('tbody')[0];
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

        for(const [key, value] of Object.entries(array)){
            newRow[key] = value;
        }

        newRow.innerHTML = row;
    }

    /**
     * Function to delete a row from an HTML table
     * @param {element} row tr element from the DOM
     *
     * Example:
     * const row = document.querySelector('#row_id');
     * deleteRowOfTable(row);
    */

    deleteRowOfTable(row){
        row.parentNode.removeChild(row);
    }

    /**
     * Function to get a URL parameter
     * @param {string} parameter name of the URL parameter
     *
     * Example:
     * var param = getParamUrl('id');
     *
     * @returns URL parameter value
    */

    getParamUrl(parameter){
        let url = new URL(window.location.href);
        let param = url.searchParams.get(parameter);

        return param;
    }

    /**
     * Función para agregar parametros a la url (esto debe recargar la página para surtir efecto)
     * @param {string} parameter nombre del parametro
     * @param {string} value valor del parametro
    */

    setParamUrl(parameter, value){
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        params.set(parameter, value);
        document.location.search = params;
    }

    /**
     * Función para eliminar parametro de url
     * @param {string} parametro nombre de parametro url
     *
     * Uso de función: deleteParamUrl('id');
    */

    deleteParamUrl(parametro){
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
    }

    /**
     * Función para obtener el hash actual de la url
     *
     * @returns hash de url
    */

    getHashUrl(){
        return window.location.hash;
    }

    /**
     * Función para agregar hash en url
     * @param {string} hash
    */

    setHashUrl(hash){
        window.location.hash = `#${hash}`;
    }

    /**
     * Función para eliminar hash de url
    */

    deleteHashUrl(){
        history.pushState("", "", `${location.pathname}${location.search}`);
    }

    /**
     * Función para filtar página mediante parametros
     * @param {string} clase clase de elementos del filtro
     * @param {string} pagina nombre de url a filtar
     * @param {int} numPagina numero de pagina a mostrar
     *
     * Uso de función:
     * Ejemplo de url -> 127.0.0.1:8000/ventas
     * 1 -> <input class="filtro" id="flitro_id" value="1"/>
     * 2 -> filterPage('.filtro', 'ventas');
    */

    filterPage(clase, pagina, numPagina = null){
        const filtros = document.querySelectorAll(clase);
        let url = `${pagina}?`;

        filtros.forEach(element = (element, index) => {
            if(index == 0){
                url += `${element.id}=${element.value}`;
            }

            if(index != 0){
                if(element.id == 'page' && numPagina != null){
                    url += `&${element.id}=${numPagina}`;
                }else{
                    url += `&${element.id}=${element.value}`;
                }

            }
        });

        window.location.href = url;
    }

    /**
     * Función filtrar página la presionar enter en inputs de filtro
     * @param {string} clase clase de los input de filtro
     *
     * Uso de función: listenerInputsFilter('.filtros');
    */

    listenerInputsFilter(clase, url){
        const filtros = document.querySelectorAll(clase);

        Array.from(filtros).forEach(function(element) {
            element.addEventListener('keyup', function(e){
                e.preventDefault();
                if(e.which == 13) {
                    filterPage(clase, url, 1);
                }
            });
        });
    }

    /**
     * Función para filtar página la hacer clic en número de página (links)
     * @param {string} claseLink clase del elemento link
     * @param {string} claseFiltro clase de los input de filtro
     * @param {string} url nombre de url a filtrar
     * @param {string} idPageInput id de input page
     *
     * Uso de función:
     * 1 -> input <input id="page" class="filtro" value="" hidden /> El valor de page se determima según lenguaje de backend
     * Ej de laravel: <input type="text" class="filtro" id="page" name="page" value="{{ Request::get('page') }}" hidden>
     * 2 -> listenerNumberPage('.page-link', '.filtro', 'ventas', '#page');
    */

    listenerNumberPage(claseLink, claseFiltro, url, idPageInput){
        const links = document.querySelectorAll(claseLink);
        const page =  document.querySelector(idPageInput);

        Array.from(links).forEach(function(element) {
            element.addEventListener('click', function(e){
                e.preventDefault();
                if(this.text != undefined){
                    page.value = this.text;
                }

                filterPage(claseFiltro, url);
            });
        });
    }

    /**
     * 
     * @param {*} element 
     * @param {*} value 
     * @param {*} typeEvent 
    */

    simulateKeyPress(element, value, typeEvent) {

        let inputElement = element;
        let event = new Event(typeEvent);
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
