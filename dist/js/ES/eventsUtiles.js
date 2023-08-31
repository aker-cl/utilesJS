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

/**
 * This function does the same as the "sticky" css property, but you can define which will be the "tops" of both the top and bottom element,
 * together with the space between each one and the focus in the scroll of an element or window.
 *
 * @param {Object} opts Function configuration object
 * @param {string} opts.elementToMove id of element to move.
 * @param {string} opts.scrollFocusElement id or name of scroll focus element ('window' or 'elementID').
 * @param {string|null} opts.topElement id of upper stop element (null is de top of the window).
 * @param {string|null} opts.bottomElement id of bottom stop element (with null there is no bottom stop).
 * @param {number} opts.topSeparation spacing size with top element in px.
 * @param {number} opts.bottomSeparation spacing size with bottom element in px.
 */
export const scrollTransition = (opts) => {
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
        addBottom = opts.bottomSeparation * -1 ?? -55;

        window.addEventListener('scroll', () => {
            setPositions();
        });
    }else{
        let elementListener = document.querySelector(`#${opts.scrollFocusElement}`);
        addHeight = opts.topSeparation ?? 35;
        addBottom = opts.bottomSeparation ?? 20;
        
        elementListener.addEventListener('scroll', function() {
            diffWidth = 0.15;
            setPositions();
        });
    }
    
    function setPositions(){
        const element = document.querySelector(`#${elementId}`);
        const parentElement = element.parentNode;
        const elementRect = parentElement.getBoundingClientRect();
        const elementTop = parentElement.getBoundingClientRect().top + scrollY;
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
            topElementStyle = getComputedStyle(topElement);
            heightTopElement = parseFloat(topElementStyle.getPropertyValue("height")) + addHeight;
            topElementRect = topElement.getBoundingClientRect();
        }

        if(bottomElementId){
            bottomElement = document.querySelector(`#${bottomElementId}`);
            bottomElementStyle = getComputedStyle(bottomElement);
            bottomBottomElement = parseFloat(bottomElementStyle.getPropertyValue("bottom"));
            bottomElementRect = bottomElement.getBoundingClientRect();
        }


        let widthWithPadding = elementStyle.getPropertyValue("width");
        let paddingLeft = parseFloat(elementStyle.getPropertyValue("padding-left"));
        let paddingRight = parseFloat(elementStyle.getPropertyValue("padding-right"));
        let realWidth = parseFloat(widthWithPadding) - (paddingLeft + paddingRight);
        let totalWidth = ((realWidth * 100) / widthScreen) + 0.15 - diffWidth;
        
        if(topElementId){
            if(bottomElementId){
                if (topElementRect.bottom <= elementRect.top) {
                    cleanElement();
                } else if(topElementRect.bottom >= elementRect.top){
                    if(bottomElementRect.height - addBottom >= elementRect.bottom || (bottomElementRect.height - addBottom - elementRect.bottom) >= ((element.offsetHeight * -1) + 32)){
                        setPropElement('sticky', `${bottomBottomElement}px`, '');                             
                    }else{
                        setPropElement('fixed', `${heightTopElement}px`, `${totalWidth}%`);                             
                    }                   
                }
            }else{
                if (topElementRect.bottom <= elementRect.top) {
                    cleanElement();
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
            if (scrollY >= elementTop && scrollY <= elementTop + parentElement.offsetHeight) {
                setPropElement('fixed', '5px', `${totalWidth}%`);
            } else {
                cleanElement();
            }
        }

        function cleanElement(){
            element.style.position = 'sticky';
            element.style.top = '';
            element.style.width = '';
        }

        function setPropElement(pos, top, width){
            element.style.position = pos;
            element.style.top = top;
            element.style.width = width;
        }
    }
}
