$('.select2').select2({
    placeholder: "Select a option",
});

const emailInput = document.querySelector('#emailInput');

const checkEmail = () => {
    resetCheckEmail();

    if(emailInput.value.validateEmail()){
        emailInput.classList.add('is-valid');
    }else{
        emailInput.classList.add('is-invalid');
    }
}

const resetCheckEmail = () => {
    emailInput.classList.remove('is-invalid', 'is-valid');
}

const capInput = document.querySelector('#capInput');

const capLetter = () => {
    capInput.value = capInput.value.capFirstLetter();
}

const lineInput = document.querySelector('#lineInput');
const numberLineInput = document.querySelector('#numberLineInput');
const lineInputAfter = document.querySelector('#lineInputAfter');

const breakLine = () => {
    lineInputAfter.innerHTML = lineInput.value.addLineBreak(numberLineInput.value);
}

const exampleGetTextSelect = document.querySelector('#exampleGetTextSelect');
const textExampleGetTextSelect = document.querySelector('#textExampleGetTextSelect');

const getTextSelect = () => {
    textExampleGetTextSelect.value = exampleGetTextSelect.getTextOptSelected();
}

const exampleGetDataSelect = document.querySelector('#exampleGetDataSelect');
const exampleDataGetDataSelect = document.querySelector('#exampleDataGetDataSelect');
const textExampleGetDataSelect = document.querySelector('#textExampleGetDataSelect');

const getDataSelect = () => {
    textExampleGetDataSelect.value = exampleGetDataSelect.getDataOptSelected(exampleDataGetDataSelect.value);
}

const exampleGetAllDataSelect = document.querySelector('#exampleGetAllDataSelect');
const textExampleGetAllDataSelect = document.querySelector('#textExampleGetAllDataSelect');

const getAllDataSelect = () => {
    textExampleGetAllDataSelect.value = JSON.stringify(exampleGetAllDataSelect.getAllDataOptSelected());
}

const exampleGetValuesMultipleSelect = document.querySelector('#exampleGetValuesMultipleSelect');
const textGetValuesMultipleSelect = document.querySelector('#textGetValuesMultipleSelect');

const getValuesMultipleSelect = () => {
    console.log(exampleGetValuesMultipleSelect.getValuesMultipleOpts());
    textGetValuesMultipleSelect.value = JSON.stringify(exampleGetValuesMultipleSelect.getValuesMultipleOpts());
}