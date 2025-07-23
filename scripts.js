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
var clearButton = document.querySelector(".clear");
var evalButton = document.querySelector(".eval");
var current_operation = null;
var first_number = null;
var second_number = null;
clearButton.addEventListener("click", function () { return calcView.value = ''; });
var _loop_1 = function (numButton) {
    numButton.addEventListener("click", function () {
        calcView.value += numButton.innerHTML;
    });
};
// on number press
for (var _i = 0, numButtons_1 = numButtons; _i < numButtons_1.length; _i++) {
    var numButton = numButtons_1[_i];
    _loop_1(numButton);
}
var _loop_2 = function (operatorButton) {
    operatorButton.addEventListener("click", function () {
        if (current_operation) {
            // We have a pending operation
            if (first_number && calcView.value !== '') {
                // Get second number from current display
                second_number = Number(calcView.value);
                // Evaluate the pending operation
                var result = evaluate(first_number, second_number, current_operation);
                calcView.value = result.toString();
                console.log("Result: ", calcView.value);
                // Set up for next operation
                first_number = result;
                second_number = null;
                current_operation = operatorButton.innerHTML;
                calcView.value = ''; // Clear for next number input
            }
        }
        else {
            // No pending operation
            if (calcView.value === '') {
                console.log("Do nothing");
            }
            else {
                // Store first number and set operation
                first_number = Number(calcView.value);
                console.log("First number", first_number);
                current_operation = operatorButton.innerHTML;
                calcView.value = ''; // Clear for second number input
            }
        }
    });
};
// on operator press
// make current operator the operator pressed
// store numbers in variables
// if already have current operator, compute based on last operator
for (var _a = 0, operatorButtons_1 = operatorButtons; _a < operatorButtons_1.length; _a++) {
    var operatorButton = operatorButtons_1[_a];
    _loop_2(operatorButton);
}
