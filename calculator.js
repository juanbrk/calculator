// elements
const display = document.querySelector('#display');
const numbers = Array.from(document.getElementsByClassName('numeric'));
const clearBtn = document.querySelector('#clear');
const addBtn = document.querySelector('#add');
const computeBtn = document.querySelector('#compute');


//variables
let zeroed = true; // when display awaits for input
let operandA = null;
let operandB = null;
let isSum = false; // to refactor into an object of operations

// consts

// functions

//Initializes display 
function clearDisplay(){
    display.value = 0;
    zeroed = true;
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
   computeBtn.addEventListener('click', ()  => compute());

}

/**
 * Make calculations
 */
function compute(){
    let computedValue = null;
    operandB = display.value;
    if (isSum){
        computedValue = Number(operandB) + Number(operandA);
    }
    zeroed = true;
    updateDisplay(computedValue, true);
    resetOperands();
    return computedValue;
}

function resetOperands(){
    operandA = null;
    operandB = null;
}


function sum(){
    if (!!operandA){
        operandA += Number(display.value);
        zeroed = true;
        updateDisplay(operandA, true);
    } else {
        operandA = Number(display.value);
    }

    zeroed = true;
    isSum = true;
}


/**
 * displays whatever was clicked
 * @param {string} value of the clicked button to be displayed
 */
function updateDisplay(value, resetDisplay = false){
    if (zeroed){ // no input yet
        display.value = value;
        zeroed = false;
    } else {
        let displayValue = display.value;
        display.value = displayValue + value;
    }

    zeroed = resetDisplay; 
}
// main
clearDisplay();
addClickability();