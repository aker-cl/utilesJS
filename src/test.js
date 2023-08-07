import { UtilesJS } from '../dist/js/ES6/utiles.js';

var array1 = [{cost_price: '319095', date: '2023-02-17'},{cost_price: '1800', date: '2023-02-20'},{cost_price: '13611', date: '2023-02-27'}];
var array2 = [{sale_cost: '262840', date: '2023-02-17'},{sale_cost: '100376', date: '2023-02-20'},{sale_cost: '64474', date: '2023-03-01'}];
var finalArray = UtilesJS().arrayFusionByAttribute([array1, array2], 'date')

console.log(finalArray);

// UtilesJS().simulateKeyPress('inputTest', 'Hi! my name is Aker, nice to meet you.');