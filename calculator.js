// elements
const display = document.querySelector('#display');
const numbers = Array.from(document.getElementsByClassName('numeric'));

//variables
let zeroed = true; // when display awaits for input

// consts

// functions

//Initializes display 
function initializeDisplay(){
    display.value = 0;
}

/**
 * Now buttons can be clicked, and their value displayed on the screen
 */
function addClickabilityNumbers(){
   for (var i = 0; i < numbers.length; i++) {
     numbers[i].addEventListener('click', element => {
        updateDisplay(element.currentTarget.value);
     });
   }
}

/**
 * displays whatever was clicked
 * @param {string} value of the clicked button to be displayed
 */
function updateDisplay(value){
    if (zeroed){ // no input yet
        display.value = value;
        zeroed = false;
    } else {
        let displayValue = display.value;
        display.value = displayValue + value;
    }
}
// main
initializeDisplay();
addClickabilityNumbers();