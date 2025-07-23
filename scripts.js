var calcOperations = {
    add: function (a, b) { return a + b; },
    subtract: function (a, b) { return a - b; },
    multiply: function (a, b) { return a * b; },
    divide: function (a, b) { return a / b; },
};
function evaluate(a, b, operator) {
    if (operator == "+")
        return calcOperations.add(a, b);
    else if (operator == "-")
        return calcOperations.subtract(a, b);
    else if (operator == "*")
        return calcOperations.multiply(a, b);
    else
        return calcOperations.divide(a, b);
}
var numButtons = document.querySelectorAll(".num");
var operatorButtons = document.querySelectorAll(".operator");
var calcView = document.querySelector("input");
var currentOperation = null;
var firstNumber = null;
var secondNumber = null;
var result = null;
var shouldChain = false;
var onFirstNumber = true;
var _loop_1 = function (numButton) {
    numButton.addEventListener("click", function () {
        if (shouldChain) {
            calcView.value = '';
            shouldChain = false;
        }
        calcView.value += numButton.innerHTML;
        if (onFirstNumber) {
            firstNumber = Number(calcView.value);
            console.log("First number: ", firstNumber);
        }
        else {
            secondNumber = Number(calcView.value);
            console.log("Second number: ", secondNumber);
        }
    });
};
for (var _i = 0, numButtons_1 = numButtons; _i < numButtons_1.length; _i++) {
    var numButton = numButtons_1[_i];
    _loop_1(numButton);
}
var _loop_2 = function (operatorButton) {
    operatorButton.addEventListener("click", function () {
        if (operatorButton.innerHTML == "c") {
            calcView.value = '';
            result = null;
            firstNumber = null;
            secondNumber = null;
            onFirstNumber = true;
        }
        else if (operatorButton.innerHTML == "=") {
            if (firstNumber && secondNumber && currentOperation) {
                result = evaluate(firstNumber, secondNumber, currentOperation);
                calcView.value = result.toString();
                firstNumber = result;
                secondNumber = null;
                onFirstNumber = false;
                console.log("Result: ", result);
            }
        }
        else {
            if (!firstNumber) {
                console.log("Do nothing");
            }
            else if (!secondNumber) {
                onFirstNumber = false;
                calcView.value = '';
                currentOperation = operatorButton.innerHTML;
            }
            else if (firstNumber && secondNumber) {
                currentOperation = operatorButton.innerHTML;
                result = evaluate(firstNumber, secondNumber, currentOperation);
                calcView.value = result.toString();
                firstNumber = result;
                secondNumber = null;
                onFirstNumber = false;
                console.log("Result: ", result);
                shouldChain = true;
            }
        }
    });
};
for (var _a = 0, operatorButtons_1 = operatorButtons; _a < operatorButtons_1.length; _a++) {
    var operatorButton = operatorButtons_1[_a];
    _loop_2(operatorButton);
}
