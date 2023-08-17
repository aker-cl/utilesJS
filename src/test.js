import { UtilesJS } from '../dist/js/ES6/utiles.js';

const exampleSetValuesSelectMultiple = document.querySelector('#exampleSetValuesSelectMultiple');
const btnSelect = document.querySelector('#btnSelect');

// btnSelect.addEventListener('click', () => {
//     let selectValue = "3";
//     UtilesJS().setValueOfSelect(exampleSetValueOfSelect, selectValue);
// });

btnSelect.addEventListener('click', () => {
    let values = ["2", "3"];
    // UtilesJS().setValueOfSelect(exampleSetValueOfSelect, selectValue);
    UtilesJS().setValuesSelectMultiple(exampleSetValuesSelectMultiple, values);
});



function setValuesSelect(selectValue){
    UtilesJS().setValueOfSelect(exampleSetValueOfSelect, selectValue);
}

const setValuesSelectMultiple = (values) => {
    UtilesJS().setValuesSelectMultiple(exampleSetValueOfSelect, values);
}

// console.log(UtilesJS().discountPrice(price, discount)); // 31160