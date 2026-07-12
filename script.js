const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const actionButtons = document.querySelectorAll(".action-btn");
const equalButton = document.querySelector(".equal-btn");


let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;


function updateDisplay(value) {
    display.textContent = value;
}



function appendNumber(number) {

    if (shouldResetDisplay) {
        currentInput = "0";
        shouldResetDisplay = false;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay(currentInput);

}


function chooseOperator(selectedOperator) {

    if (currentInput === "") {
        return;
    }

    if (previousInput !== "" && !shouldResetDisplay) {
        calculate();
    }

    previousInput = currentInput;
    operator = selectedOperator;
    shouldResetDisplay = true;

}


// calculation
function calculate() {

    if (
        previousInput === "" ||
        currentInput === "" ||
        operator === ""
    ) {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {

                updateDisplay("Cannot divide by 0");

                currentInput = "0";
                previousInput = "";
                operator = "";

                return;

            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;

    }

    result = Number(result.toFixed(10));

    currentInput = result.toString();
    previousInput = "";
    operator = "";

    shouldResetDisplay = true;

    updateDisplay(currentInput);

}


// clear calculator
function clearCalculator() {

    currentInput = "0";
    previousInput = "";
    operator = "";
    shouldResetDisplay = false;

    updateDisplay(currentInput);

}


// delete last digit
function deleteLastDigit() {

    if (shouldResetDisplay) {
        currentInput = "0";
        shouldResetDisplay = false;
        updateDisplay(currentInput);
        return;
    }

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }

    updateDisplay(currentInput);

}


// number buttons
numberButtons.forEach((button) => {

    button.addEventListener("click", () => {

        appendNumber(button.dataset.number);

    });

});


// operator buttons
operatorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        chooseOperator(button.dataset.operator);

    });

});


// equal button
equalButton.addEventListener("click", () => {

    calculate();

});


// action buttons
actionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        switch (action) {

            case "clear":
                clearCalculator();
                break;

            case "delete":
                deleteLastDigit();
                break;
        }

    });

});

// keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    if ((key >= "0" && key <= "9") || key === ".") {
        appendNumber(key);
        return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
        return;
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
        return;
    }

    if (key === "Backspace") {
        event.preventDefault();
        deleteLastDigit();
        return;
    }

    // Clear calculator
    if (key === "Escape") {
        clearCalculator();
    }

});