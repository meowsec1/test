type twoNumberFunction = (a: number, b: number, operator?: string) => number;

const calcOperations: Record<string, twoNumberFunction> = {
    add: (a, b) => a+b,
    subtract: (a, b) => a-b,
    multiply: (a, b) => a*b,
    divide: (a, b) => a/b,
}


function evaluate(a: number, b: number, operator: string): number {
    if (operator == "+") return calcOperations.add(a, b);
    else if (operator == "-") return calcOperations.subtract(a, b);
    else if (operator == "*") return calcOperations.multiply(a, b)
    else return calcOperations.divide(a, b)

}

const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");

const calcView = document.querySelector("input")!;
const clearButton = document.querySelector(".clear")!;
const evalButton = document.querySelector(".eval")!;

let current_operation: string | null = null;
let first_number: number | null = null;
let second_number: number | null = null;



clearButton.addEventListener("click", () => calcView.value = '')


// on number press

for (const numButton of numButtons)
{
    numButton.addEventListener("click", function(){
        calcView.value += numButton.innerHTML;
    })
}

// on operator press
// make current operator the operator pressed
// store numbers in variables
// if already have current operator, compute based on last operator
for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", function(){

        if (current_operation) {
            // We have a pending operation
            if (first_number && calcView.value !== '') {
                // Get second number from current display
                second_number = Number(calcView.value);
                
                // Evaluate the pending operation
                const result = evaluate(first_number, second_number, current_operation);
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
    })
}
