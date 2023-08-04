/******************************************\
* AnimationPrototypes 1.0                  *
*                                          *
* @author jp7434 <scorpion9915@gmail.com>  *
* @license MIT License                     *  
\******************************************/

const animationCSS = document.createElement('link');
animationCSS.href = '../css/transition.css';
animationCSS.rel = 'stylesheet';
document.head.appendChild(animationCSS);

'use strict';

/**
 * This prototype displays a transition between a range of numbers in a DOM element
 * 
 * @param {number} start 
 * @param {number} end 
 * @param {string} textBefore 
 * @param {string} textAfter 
 * 
 * Example: 
 * let divCount = document.querySelector("#divCount");
 * let credits = 150000;
 * divCount.animateValue(0, credits, "$");
*/

Element.prototype.animateValue = function animateValue(start, end, textBefore = '', textAfter = ''){
    let current = start;
    let step = end / 50;
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

/**
 * 
 * @param {string} action 
*/

NodeList.prototype.elementTransition = function elementTransition(action){
    switch (action) {
        case 'show':
            if(typeof this == 'object' && typeof this[Symbol.iterator] === 'function'){
                for (const el of this) {
                    el.removeAttribute('hidden');
                }

                setTimeout(() => {
                    for (const el of this) {
                        el.classList.remove('divHide');
                        el.classList.add('divShow');
                    }
                }, 200);
            }else{
                this.removeAttribute('hidden');

                setTimeout(() => {
                    this.classList.remove('divHide');
                    this.classList.add('divShow');
                }, 200);
            }

            break;
        case 'hide':
            if(typeof this == 'object' && typeof this[Symbol.iterator] === 'function'){
                for (const el of this) {
                    el.classList.remove('divShow');
                    el.classList.add('divHide');
                }

                setTimeout(() => {
                    for (const el of this) {
                        el.setAttribute('hidden', 'hidden');
                    }
                }, 200);
            }else{
                this.classList.remove('divShow');
                this.classList.add('divHide');

                setTimeout(() => {
                    this.setAttribute('hidden', 'hidden');
                }, 200);
            }

            break;
    }
} 

/**
 * 
 * @param {*} action 
 * @param {*} text 
*/

HTMLButtonElement.prototype.loadingButton = function loadingButton(action, text = null) {
    switch (action) {
        case 'start':
            this.setAttribute('data-btn-text', this.innerHTML);
            this.innerHTML = `<span class="spinner-border spinner-border-sm"></span> ${text}`;
            this.disabled = true;
            break;
        case 'stop':
            this.innerHTML = this.getAttribute('data-btn-text');
            this.disabled = false;
            break;
    }
}