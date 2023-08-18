// import './jsNode/prototypes.js';
require('./jsNode/prototypes.js')

// Number.prototype.formatPrice = function formatPrice() {
//     return new Intl.NumberFormat("de-DE").format(this);
// }

// var num = 1000;

// console.log(num.discountPrice(30));
// console.log(num);

var array1 = [
    {cost_price: '319095', date: '2023-02-17'},
    {cost_price: '1800', date: '2023-02-20'},
    {cost_price: '13611', date: '2023-02-27'}
];
var array2 = [
    {sale_cost: '262840', date: '2023-02-17'},
    {sale_cost: '100376', date: '2023-02-20'},
    {sale_cost: '64474', date: '2023-03-01'}
];

var finalArray = [array1, array2].fusionByAttribute('date');
// array.orderBy().string('str', 'asc');
console.log(finalArray);
// console.log(array.orderByString('num', 'asc'));

// const select = document.querySelector('#exampleSetValuesSelectMultiple');
// var data = ["1","3"];

// select.setMultipleValues(data);