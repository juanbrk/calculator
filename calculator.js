// elements
const display = document.querySelector('#display');
const numbers = Array.from(document.getElementsByClassName('numeric'));
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
    resetOperands();
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
   
   addBtn.addEventListener('click', ()  => sum());
   multiplyBtn.addEventListener('click', ()  => multiply());
   subtractBtn.addEventListener('click', ()  => subtract());
   divideBtn.addEventListener('click', ()  => divide());
   computeBtn.addEventListener('click', ()  => compute());
   clearBtn.addEventListener('click', ()  => clearDisplay());

}

/**
 * Make calculations
 */
function compute(){
    let computedValue = null;
    operandB = display.value;
    let operationToPerform = checkOperation();
    computedValue = performOperation(operationToPerform);
    readyForInput = true;
    updateDisplay(computedValue, true);
    resetOperands();
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

function resetOperands(){
    operandA = null;
    operandB = null;
}

/**
 * Sets up calculator for sum || adds up two numbers
 * @param {string} a sumA
 * @param {string} b sumB
 */
function sum(a, b){
    let computedValue = 0;
    if(a == null && b == null){ 
        setUpForOperation('sum');
    } else{
        // perform operation;
        computedValue = Number(a) + Number(b);
    };
    return computedValue;
}

function multiply(a, b){
    let computedValue = 0;
    if(a == null && b == null){ 
        setUpForOperation('multiply');
    } else {
        //perform operation
        computedValue = Number(a) * Number(b);
    }
    return computedValue;
}

function subtract(a, b){
    let computedValue = 0;
    if(a == null && b == null){ 
        setUpForOperation('subtract');
    } else {
        //perform operation
        computedValue = Number(a) - Number(b);
    }
    return computedValue;
}

function divide(a,b){
    let computedValue = 0;
    if(a == null && b == null){ 
        setUpForOperation('divide');
    } else {
        //perform operation
        computedValue = Number(a) / Number(b);
    }
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
    takeInput();
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