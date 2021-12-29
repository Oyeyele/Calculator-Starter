class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear(); //bcos we want to clear our input and set it to default value when we creat a new calculator
  }
  // to clear all
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }

  // to delete a single number
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  } // recall: slice method extracts a part of a string and returns the extracted part

  //anytime a user clicks a number to add to the screen
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  } // we are using .toString bcos we want our numbers to be appended and not added

  //picks the particular operation the user selects
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation; //the specific operation
    this.previousOperand = this.currentOperand; //this means we are done typing the current operand, so we want it to appear in the previous operand
    this.currentOperand = ""; //to clear out the current operand
  }

  //shows the single value displayed as the answer
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "%":
        computation = prev / 100;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = "";
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]); // the number before the decimal
    const decimalDigits = parseFloat(stringNumber.split(".")[1]); // the number after the decimal
    let integerDisplay;
    if (parseFloat(integerDigits) !== +integerDigits) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en");
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // this will update the value inside of our output
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation !== null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    }
    // this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearButton = document.querySelector("[data-clear]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const deleteButton = document.querySelector("[data-delete]");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
