// elements
const display = document.querySelector('#display');
const numbers = Array.from(document.getElementsByClassName('numeric'));
const clearBtn = document.querySelector('#clear');
const addBtn = document.querySelector('#add');
const multiplyBtn = document.querySelector('#multiply');
const computeBtn = document.querySelector('#compute');


//variables
let readyForInput = true; // when display awaits for input
let operandA = null;
let operandB = null;


let operations = {
    sum : false,
    multiply : false,
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
   
   clearBtn.addEventListener('click', ()  => clearDisplay());
   addBtn.addEventListener('click', ()  => sum());
   multiplyBtn.addEventListener('click', ()  => multiply());
   computeBtn.addEventListener('click', ()  => compute());

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
            computedValue = Number(operandA) * Number(operandB);
            break;
        case 'sum':
            computedValue = sum(operandA, operandB);
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
        setUpForOperation('sum')
    } else{
        // perform operation;
        computedValue = Number(a) + Number(b);
    };
    return computedValue;
}

function takeInput(){
    if (!!operandA){
        operandA += Number(display.value);
        readyForInput = true;
        updateDisplay(operandA, true);
    } else {
        operandA = Number(display.value);
    }
    readyForInput = true;
}

function multiply(a, b){
    if(a == null && b == null){ 
        setUpForOperation('multiply')
    } else {
        //perform operation
    }
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