const transformHTML = (html) => {
    return html.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.querySelector('#codeEmail').innerHTML = 
`String.prototype.validateEmail = function validateEmail() {
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}`;

document.querySelector('#exampleJsEmail').innerHTML = 
`const emailInput = document.querySelector('#emailInput');

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
}`;

document.querySelector('#exampleHtmlEmail').innerHTML = 
transformHTML(
`<form class="needs-validation" action="javascript:checkEmail();" novalidate>
    <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">@</span>
        <input type="text" class="form-control" id="emailInput" onblur="resetCheckEmail()" placeholder="Email"/>
        <div id="validateEmail1" class="valid-tooltip">
            The email entered is valid!
        </div>
        <div id="validateEmail1" class="invalid-tooltip">
            The email entered is not valid
        </div>
        <button class="btn btn-outline-secondary" type="button" onclick="checkEmail()" id="button-addon2">Validate</button>
    </div>
</form>`);

document.querySelector('#codeCap').innerHTML = 
`String.prototype.capFirstLetter = function capFirstLetter() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}`;

document.querySelector('#exampleCapJs').innerHTML = 
`const capInput = document.querySelector('#capInput');
const capLetter = () => {
    capInput.value = capInput.value.capFirstLetter();
}`;

document.querySelector('#exampleCapHtml').innerHTML = 
transformHTML(
`<div class="input-group flex-nowrap">
    <input type="text" class="form-control" id="capInput" placeholder="Write something"/>
    <button class="btn btn-outline-secondary" type="button" onclick="capLetter()" id="button-addon2">Capitalize</button>
</div>`);

document.querySelector('#codeLineBreak').innerHTML = 
`String.prototype.addLineBreak = function addLineBreak(charactersPerLine) {
    var words = this.split(' ');
    var formattedText = '';
    var counter = 0;

    for (var i = 0; i < words.length; i++) {
        var currentWord = words[i];
    
        if (counter + currentWord.length > charactersPerLine) {
            formattedText += '<br>';
            counter = 0;
        }
    
        formattedText += currentWord + ' ';
        counter += currentWord.length + 1;
    }

    return formattedText.trim();
}`;

document.querySelector('#exampleLineBreakJs').innerHTML = 
`const lineInput = document.querySelector('#lineInput');
const numberLineInput = document.querySelector('#numberLineInput');
const lineInputAfter = document.querySelector('#lineInputAfter');

const breakLine = () => {
    lineInputAfter.innerHTML = lineInput.value.addLineBreak(numberLineInput.value);
}`;

document.querySelector('#exampleLineBreakCapHtml').innerHTML = 
transformHTML(
`<div class="row">
    <div class="col-md-8">
        <div class="row">
            <div class="col-md-4">
                <input type="text" id="lineInput" class="form-control" placeholder="Write something" autocomplete="off"/>
            </div>
            <div class="col-md-5">
                <input type="number" step="1" id="numberLineInput" class="form-control" placeholder="Characters before break" autocomplete="off"/>
            </div>
            <div class="col-md-3 mt-1">
                <button class="btn btn-outline-secondary" type="button" onclick="breakLine()" id="button-break">Break</button>
            </div>
        </div>                                            
    </div>
    <div class="col-md-4" style="background-color: white; min-height: 100px; max-width: 310px;" id="lineInputAfter">
        
    </div>
</div>  `);

document.querySelector('#codeFormatPrice').innerHTML = 
`Number.prototype.formatPrice = function formatPrice() {
    return new Intl.NumberFormat("de-DE").format(this);
}

// Example
var number = 12000;
console.log(number.formatPrice()); // "12.000"`;

document.querySelector('#codeRoundPrice').innerHTML = 
`Number.prototype.roundPrice = function roundPrice() {
    let total = this;
    let round = total.toString().charAt(total.toString().length - 1);

    if(round != 0){
        if(round >= 6){
            round = 10 - round;
        }else if(round <= 5){
            round = round * -1;
        }
    }

    total = parseInt(total) + parseInt(round);

    return total;
}

// Example
var num1 = 49;
var num2 = 54;
var num3 = 35;

console.log(num1.roundPrice()); // 50
console.log(num2.roundPrice()); // 50
console.log(num3.roundPrice()); // 30`;



document.querySelector('#codeGetTextSelect').innerHTML = 
`HTMLSelectElement.prototype.getTextOptSelected = function getTextOptSelected() {
    return this.options[this.selectedIndex].text;
}`;

document.querySelector('#exampleGetTextSelectJs').innerHTML = 
`const exampleGetTextSelect = document.querySelector('#exampleGetTextSelect');
const textExampleGetTextSelect = document.querySelector('#textExampleGetTextSelect');

const getTextSelect = () => {
    textExampleGetTextSelect.value = exampleGetTextSelect.getTextOptSelected();
}`;

document.querySelector('#exampleGetTextSelectHtml').innerHTML = 
transformHTML(
`<div class="row">
    <div class="col-md-4">
        <select class="form-control" id="exampleGetTextSelect">
            <option value="0" disabled selected>Select a option</option>
            <option value="1">Text 1</option>
            <option value="2">Text 2</option>
            <option value="3">Text 3</option>
        </select>
    </div>   
    <div class="col-md-2 mt-1">
        <button class="btn btn-outline-secondary" type="button" onclick="getTextSelect()" id="button-break">Get text</button>
    </div>   
    <div class="col-md-6">
        <input type="text" class="form-control" id="textExampleGetTextSelect" readonly/>
    </div>                                      
</div>`);

document.querySelector('#codeGetDataSelect').innerHTML = 
`HTMLSelectElement.prototype.getDataOptSelected = function getDataOptSelected(attribute){
    return this.options[this.selectedIndex].getAttribute(attribute);
}`;

document.querySelector('#exampleGetDataSelectJs').innerHTML = 
`const exampleGetDataSelect = document.querySelector('#exampleGetDataSelect');
const exampleDataGetDataSelect = document.querySelector('#exampleDataGetDataSelect');
const textExampleGetDataSelect = document.querySelector('#textExampleGetDataSelect');

const getDataSelect = () => {
    textExampleGetDataSelect.value = exampleGetDataSelect.getDataOptSelected(exampleDataGetDataSelect.value);
}`;

document.querySelector('#exampleGetDataSelectHtml').innerHTML = 
transformHTML(
`<div class="row">
    <div class="col-md-3">
        <select class="form-control" id="exampleGetDataSelect">
            <option value="0" disabled selected>Select a option</option>
            <option value="1" data-opt="example1" data-opt2="select1">Text 1</option>
            <option value="2" data-opt="example2" data-opt2="select2">Text 2</option>
            <option value="3" data-opt="example3" data-opt2="select3">Text 3</option>
        </select>                                                
    </div>
    <div class="col-md-3">
        <select class="form-control" id="exampleDataGetDataSelect">
            <option value="data-opt">data-opt</option>
            <option value="data-opt2">data-opt2</option>
        </select>                                                
    </div>
    <div class="col-md-3 mt-1">
        <button class="btn btn-outline-secondary" type="button" onclick="getDataSelect()" id="button-break">Get data</button>
    </div>   
    <div class="col-md-3">
        <input type="text" class="form-control" id="textExampleGetDataSelect" readonly/>
    </div>                                      
</div>`);

document.querySelector('#codeGetAllDataSelect').innerHTML = 
`HTMLSelectElement.prototype.getAllDataOptSelected = function getAllDataOptSelected() {
    const option = this.options[this.selectedIndex].attributes;
    let array = {};

    for (const attr of option) {
        array[attr.name] = attr.value;
    }

    return array;
}`;

document.querySelector('#exampleGetAllDataSelectJs').innerHTML = 
`const exampleGetAllDataSelect = document.querySelector('#exampleGetAllDataSelect');
const textExampleGetAllDataSelect = document.querySelector('#textExampleGetAllDataSelect');

const getAllDataSelect = () => {
    textExampleGetAllDataSelect.value = JSON.stringify(exampleGetAllDataSelect.getAllDataOptSelected());
}`;

document.querySelector('#exampleGetAllDataSelectHtml').innerHTML = 
transformHTML(
`<div class="row">
    <div class="col-md-3">
        <select class="form-control" id="exampleGetAllDataSelect">
            <option value="0" disabled selected>Select a option</option>
            <option value="1" data-opt="example1" data-opt2="select1">Text 1</option>
            <option value="2" data-opt="example2" data-opt2="select2">Text 2</option>
            <option value="3" data-opt="example3" data-opt2="select3">Text 3</option>
        </select>                                                
    </div>
    <div class="col-md-3 mt-1">
        <button class="btn btn-outline-secondary" type="button" onclick="getAllDataSelect()" id="button-break">Get all data</button>
    </div>   
    <div class="col-md-6">
        <input type="text" class="form-control" id="textExampleGetAllDataSelect" readonly/>
    </div>
</div>`);

document.querySelector('#codeGetValuesMultipleSelect').innerHTML = 
`HTMLSelectElement.prototype.getValuesMultipleOptSelected = function getValuesMultipleOptSelected(){
    let values = [];
    let options = this.selectedOptions;

    for (const option of options) {
        values.push(option.value);
    }

    return values;
}`;

document.querySelector('#exampleGetValuesMultipleSelectJs').innerHTML =
`const exampleGetValuesMultipleSelect = document.querySelector('#exampleGetValuesMultipleSelect');
const textGetValuesMultipleSelect = document.querySelector('#textGetValuesMultipleSelect');

const getValuesMultipleSelect = () => {
    console.log(exampleGetValuesMultipleSelect.getValuesMultipleOpts());
    textGetValuesMultipleSelect.value = JSON.stringify(exampleGetValuesMultipleSelect.getValuesMultipleOpts());
}`;

document.querySelector('#exampleGetValuesMultipleSelectHtml').innerHTML = 
transformHTML(
`<div class="row">
    <div class="col-md-3">
        <select class="form-control select2" id="exampleGetValuesMultipleSelect" multiple>
            <option value="1" data-opt="example1" data-opt2="select1">Text 1</option>
            <option value="2" data-opt="example2" data-opt2="select2">Text 2</option>
            <option value="3" data-opt="example3" data-opt2="select3">Text 3</option>
        </select>                                                
    </div>
    <div class="col-md-2">
        <button class="btn btn-outline-secondary" type="button" onclick="getValuesMultipleSelect()" id="button-break">Get all values</button>
    </div>   
    <div class="col-md-7">
        <input type="text" class="form-control" id="textGetValuesMultipleSelect" readonly/>
    </div>
</div>`);

