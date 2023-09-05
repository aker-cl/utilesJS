/**
 * This prototype displays a transition between a range of numbers in a DOM element
 * 
 * @param {number} start number to start the count
 * @param {number} end number to end the count
 * @param {string} textBefore text to show before the number
 * @param {string} textAfter text to show after the number 
*/

Element.prototype.animateValue = function animateValue(start, end, textBefore = '', textAfter = ''){
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
 * @param {string} action transition of show of hide
 */
Element.prototype.elementTransition = function elementTransition(action){
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

NodeList.prototype.elementTransition = function elementTransition(action){
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
 * @param {string} action action of button
 * @param {string} text text of button
*/

HTMLButtonElement.prototype.loadingButton = function loadingButton(action, text = null) {
    switch (action) {
        case 'start':
            this.setAttribute('data-btn-text', this.innerHTML);
            this.innerHTML = `<span class="spinner-loading"></span> ${text}`;
            this.disabled = true;
            break;
        case 'stop':
            this.innerHTML = this.getAttribute('data-btn-text');
            this.disabled = false;
            break;
    }
}

HTMLAnchorElement.prototype.loadingButton = function loadingButton(action, text = null) {
    switch (action) {
        case 'start':
            this.setAttribute('data-btn-text', this.innerHTML);
            this.setAttribute('data-href', this.href);
            this.setAttribute('href', 'javascript:;');
            this.innerHTML = `<span class="spinner-loading"></span> ${text}`;
            this.disabled = true;
            break;
        case 'stop':
            this.innerHTML = this.getAttribute('data-btn-text');
            this.href = this.getAttribute('data-href');
            break;
    }
}

module.exports = {};