// elements
const display = document.querySelector('#display');
const numbers = Array.from(document.getElementsByClassName('numeric'));
const accionables = Array.from(document.getElementsByClassName('accionable'));
const clearBtn = document.querySelector('#clear');
const addBtn = document.querySelector('#add');
const multiplyBtn = document.querySelector('#multiply');
const computeBtn = document.querySelector('#compute');
const subtractBtn = document.querySelector('#subtract');
const divideBtn = document.querySelector('#divide');


//variables
let readyForInput = true; // when display awaits for input
let operandA = null;
let operandB = null;
let operationInProcess = false;
let ongoingOperation = '';


let operations = {
    sum : false,
    multiply : false,
    subtract: false,
    divide: false,
}
// consts

// functions

//Initializes display 
function clearDisplay(){
    display.value = 0;
    readyForInput = true;
    let clearOngoingOperation = true;
    resetOperands(clearOngoingOperation);
}

/**
 * Now buttons can be clicked, and their value displayed on the screen
 */
function addClickability(){
    for (var i = 0; i < numbers.length; i++) {
     numbers[i].addEventListener('click', element => {
        updateDisplay(element.currentTarget.value);
     });
    }
    
    // for (var i = 0; i < accionables.length; i++) {
    //     accionables[i].addEventListener('click', () => beginOperation());
    // }
    
    addBtn.addEventListener('click', ()  => setUpForOperation('sum'));
    multiplyBtn.addEventListener('click', ()  => setUpForOperation('multiply'));
    subtractBtn.addEventListener('click', ()  => setUpForOperation('subtract'));
    divideBtn.addEventListener('click', ()  => setUpForOperation('divide'));
    computeBtn.addEventListener('click', ()  => compute(true));
    clearBtn.addEventListener('click', ()  => clearDisplay());
    
}

function beginOperation(operationName){
    operationInProcess = true;
    ongoingOperation = operationName;
}

/**
 * Make calculations and resetOperands to allow for new operations
 */
function compute(clearOperands=false){
    let computedValue = null;
    if (!!operandA){ // 
        let operationToPerform = operationInProcess ? ongoingOperation : checkOperation(); 
        operandB = display.value;
        computedValue = performOperation(operationToPerform);
        readyForInput = true;
        updateDisplay(computedValue, true);
        resetOperands(clearOperands);        
    } else { // no input received
        computedValue = 0;
    }

    return computedValue;
}

/**
 * When computing, checks what operation to perform in order to compute properly. 
 */
function checkOperation(){
    let operation = Object.keys(operations).reduce((operation, op) =>{
        if (operations[op]){
            operation = op;
        };
        return operation;
    }, '');

    return operation;
}

/**
 * Computes an operation 
 */
function performOperation(operationToPerform){
    let computedValue = null;

    switch(operationToPerform){
        case 'multiply':
            computedValue = multiply(operandA, operandB);
            break;
        case 'sum':
            computedValue = sum(operandA, operandB);
            break;
        case 'subtract':
            computedValue = subtract(operandA, operandB);
            break;
        case 'divide':
            computedValue = divide(operandA, operandB);
    } 

    return computedValue;
}

function resetOperands(resetOperation=false){
    if(resetOperation){
        operandA = null;
        operandB = null;
        operationInProcess = false;
        ongoingOperation = '';
    } else {
        //si aún no se presionó el btn =, solo se actualiza el valor de operandA
        operandA = display.value;
        operandB = null;
    }
}

/**
 * Sets up calculator for sum || adds up two numbers
 * @param {string} a sumA
 * @param {string} b sumB
 */
function sum(a, b){
    let computedValue = Number(a) + Number(b);
    return computedValue;
}

function multiply(a, b){
    let computedValue = Number(a) * Number(b);
    return computedValue;
}

function subtract(a, b){
    let computedValue =  Number(a) - Number(b);
    return computedValue;
}

function divide(a,b){
    let computedValue = Number(a) / Number(b);
    return computedValue;
}


function takeInput(){
    if (!!operandA){
        operandA += Number(display.value);
        updateDisplay(operandA, true);
    } else {
        operandA = Number(display.value);
    }
    readyForInput = true;
}

/**
 * Takes input and sets only one flag on and resets the others, in order to allow
 * one operation at a time and disable the others
 */
function setUpForOperation(operationName){
    if (!operationInProcess){
        beginOperation(operationName);
        takeInput();
        flagOngoingOperation(operationName);

    } else if (operationInProcess  && ongoingOperation == operationName ){
        compute();
    } else {
        // user is performing succesive operations, finish ongoing operation and begin new one
        compute();
        beginOperation(operationName);
    }
}

/**
 * Sets a flag on operations.operationName, to know what operation is to be 
 * performed
 * @param {string} operationName 
 */
function flagOngoingOperation(operationName){
    let keys = Object.keys(operations);
    keys.map((key, index)=>{
        operations[key] = (key == operationName) ;
    });
}


/**
 * displays whatever was clicked
 * @param {string} value of the clicked button to be displayed
 */
function updateDisplay(value, resetDisplay = false){
    if (readyForInput){ // no input yet
        display.value = value;
        readyForInput = false;
    } else {
        let displayValue = display.value;
        display.value = displayValue + value;
    }

    readyForInput = resetDisplay; 
}
// main
clearDisplay();
addClickability();