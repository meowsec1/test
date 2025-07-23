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


let currentOperation: string | null = null;
let firstNumber: number | null = null;
let secondNumber: number | null = null;
let result: number | null = null;
let shouldChain: boolean = false;

let onFirstNumber: boolean = true;


for (const numButton of numButtons)
{
    numButton.addEventListener("click", function(){
        if (shouldChain)
        {
            calcView.value = '';
            shouldChain = false;
        }
        calcView.value += numButton.innerHTML;
        if (onFirstNumber)
        {
            firstNumber = Number(calcView.value);
            console.log("First number: ", firstNumber);
        }
        else
        {
            secondNumber = Number(calcView.value);
            console.log("Second number: ", secondNumber);
        }
    })
}


for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", function(){
        if (operatorButton.innerHTML == "c") {
            calcView.value = '';
            result = null;
            firstNumber = null;
            secondNumber = null;
            onFirstNumber = true;
        }

        else if (operatorButton.innerHTML == "=") 
        {
            if (firstNumber && secondNumber && currentOperation)
            {
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
            else if (firstNumber && secondNumber)
            {
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
    })
}
