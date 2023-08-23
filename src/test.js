// import './jsNode/prototypes.js';
import { filterTable } from '../dist/js/ES/eventsUtiles.js';
// require('./jsNode/prototypes.js');
// console.log(filterTable('#tableFilter'));

document.querySelector('#inputFilter').addEventListener('keyup', function(){
    filterTable('#tableFilter', this)
});