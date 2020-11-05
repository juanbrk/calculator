// elements
const display = document.querySelector('#display');
const numbers = Array.from(document.getElementsByClassName('numeric'));
const clearBtn = document.querySelector('#clear');

//variables
let zeroed = true; // when display awaits for input

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
clearDisplay();
addClickability();