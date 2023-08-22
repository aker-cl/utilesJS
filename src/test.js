// @ts-check
import './jsNode/prototypes.js';
// require('./jsNode/prototypes.js');


var array = [
    {date: '2023-05-28', indicator: 1},
    {date: '2023-05-28', indicator: 2},
    {date: '2023-07-05', indicator: 1}
];

// @ts-ignore
var newArray = array.groupByAttribute('date');

console.log(newArray);