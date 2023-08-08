import { UtilesJS } from '../dist/js/ES6/utiles.js';

var array = [1,2,3,4,5];
var array2 = [
    {sale_cost: '262840', date: '2023-02-17'},
    {sale_cost: '100376', date: '2023-02-20'},
    {sale_cost: '64474', date: '2023-03-01'}
];

UtilesJS().arrayRemoveItemsByIndex(array, [1,3]);
UtilesJS().arrayRemoveItemsByIndex(array2, [2]);

console.log(array2);

// UtilesJS().simulateKeyPress('inputTest', 'Hi! my name is Aker, nice to meet you.');