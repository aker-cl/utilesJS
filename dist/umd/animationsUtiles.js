/**
 * This function displays a transition between a range of numbers in a DOM element
 * 
 * @param {Object} element DOM element
 * @param {number} start number to start the count
 * @param {number} end number to end the count
 * @param {string} textBefore text to show before the number
 * @param {string} textAfter text to show after the number
 */
const animateValue = (element, start, end, textBefore = '', textAfter = '') => {
    let current = start;
    let step = end / 70;
    let increment = step;
    let timer = setInterval(function() {
        current += increment;
        element.innerHTML = `${textBefore}${Math.floor(current).toLocaleString('de-DE')}`;
        if (current >= end) {
            clearInterval(timer);
            element.innerHTML = `${textBefore}${end.toLocaleString('de-DE')}${textAfter}`;
        }
    }, 10);
}

/** ATTENTION! this function just work with transition.css
 * This function make a transition for show or hide a element
 *
 * @param {Object|Array} element div, span, select, etc.
 * @param {string} action
 */
const elementTransition = (element, action) => {
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
 * This function disable a button and displays a custom text next to a spinner based on button text
 * 
 * @param {element} btn button element DOM
 * @param {'start' | 'stop'} action action of button
 * @param {string} text text of button
 */ 
const loadingButton = (btn, action, text = null) => {
    switch (action) {
        case 'start':
            btn.setAttribute('data-btn-text', btn.innerHTML);
            btn.innerHTML = `<span class="spinner-loading"></span> ${text}`;
            btn.disabled = true;
            break;
        case 'stop':
            btn.innerHTML = btn.getAttribute('data-btn-text');
            btn.disabled = false;
            break;
    }
}