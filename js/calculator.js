function Calculator(answer, exp, currentOperand) {
    this.anwser = answer;
    this.exp = exp;
    this.currentOperand = currentOperand;
}

Calculator.prototype.getInputByMouse = function () {
    var displayElement = document.getElementById("calculator-display-area");
    var getButtons = document.getElementsByClassName("calculator-btn");
    if (displayElement && getButtons) {
        for (var i = 0; i < getButtons.length; i++) {
            getButtons[i].onclick = function (index) {
                return function () {
                    var value = getButtons[index].value;
                    if (value !== "=") {
                        if (value === "AC") {
                            calculator.handleAC(displayElement);
                        }
                        if (value === "DEL") {
                            calculator.handleDEL(displayElement);
                        }
                        if (value === "%") {
                            calculator.handlePercent(displayElement, value, "100");
                        }
                        if (Number(value) >= 0 && Number(value) <= 9 || value === ".") {
                            calculator.handleNum(displayElement, value);
                        }
                        if (value === "+" || value === "-" || value === "x" || value === "/") {
                            calculator.handleOperator(displayElement, value);
                        }
                    } else {
                        calculator.handleEqual(displayElement);
                    }
                };
            }(i);
        }
    }
}

Calculator.prototype.getInputByKeyboard = function () {
    document.onkeydown = function (e) {
        var displayElement = document.getElementById("calculator-display-area");
        var key_press = e.key;
        var value = key_press;

        if (key_press !== "Enter") {
            if (key_press === "Delete") {
                calculator.handleAC(displayElement);
            } else if (key_press === "Backspace") {
                calculator.handleDEL(displayElement);
            } else if ((key_press >= "1" && key_press <= "9") || key_press === ".") {
                calculator.handleNum(displayElement, value);
            } else if (key_press === "-" || key_press === "/" || key_press === "+" || key_press === "x") {
                calculator.handleOperator(displayElement, value);
            } else if (key_press === "%") {
                calculator.handlePercent(displayElement, value, "100");
            }
            console.log(key_press);
        } else {
            // Handle Enter key
            calculator.handleEqual(displayElement);
        }
    };
};

Calculator.prototype.operations = function (operand1, operator, operand2) {
    var result = 0;
    switch (operator) {
        case "+":
            result = operand1 + operand2;
            break;
        case "-":
            result = operand1 - operand2;
            break;
        case "x":
            result = operand1 * operand2;
            break;
        case "/":
            if (operand2 === 0) {
                return "NaN";
            }
            result = operand1 / operand2;
            break;
        default:
            break;
    }
    return result;
}

Calculator.prototype.calculate = function (arr) {
    var operand1, operand2, operator, result;
    if (arr[0] === "+" || arr[0] === "-" || arr[0] === "x" || arr[0] === "/")
        return "Syntax Error";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "x") {
            operand1 = parseFloat(arr[i - 1]);
            operand2 = parseFloat(arr[i + 1]);
            operator = arr[i];
            result = calculator.operations(operand1, operator, operand2);
            arr.splice(i - 1, 3, result.toString());
            i = 0;
        }
        if (arr[i] === "/") {
            operand1 = parseFloat(arr[i - 1]);
            operand2 = parseFloat(arr[i + 1]);
            operator = arr[i];
            result = calculator.operations(operand1, operator, operand2);
            arr.splice(i - 1, 3, result.toString());
            i = 0;
        }
    }
    // console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "+") {
            operand1 = parseFloat(arr[i - 1]);
            operand2 = parseFloat(arr[i + 1]);
            operator = arr[i];
            result = calculator.operations(operand1, operator, operand2);
            arr.splice(i - 1, 3, result.toString());
            i = 0;
        }
        if (arr[i] === "-") {
            operand1 = parseFloat(arr[i - 1]);
            operand2 = parseFloat(arr[i + 1]);
            operator = arr[i];
            result = calculator.operations(operand1, operator, operand2);
            arr.splice(i - 1, 3, result.toString());
            i = 0;
        }
    }
    // console.log(arr);
    return arr[0];
}

Calculator.prototype.handleAC = function (displayElement) {
    displayElement.innerHTML = "";
    calculator.exp = [];
    calculator.anwser = 0;
}

Calculator.prototype.handleDEL = function (displayElement) {
    if (calculator.exp.length === 1) {
        calculator.exp = [];
        displayElement.innerHTML = "";
    }
    displayElement.innerHTML = displayElement.textContent.substring(0, displayElement.textContent.length - 1);
    if (calculator.currentOperand !== "")
        calculator.currentOperand = calculator.currentOperand.substring(0, calculator.currentOperand.length - 1);
    else
        calculator.exp.pop();
}

Calculator.prototype.handleNum = function (displayElement, value) {
    calculator.currentOperand += value;
    displayElement.innerHTML += value;
    console.log("exp num: ", calculator.exp);
}

Calculator.prototype.handleOperator = function (displayElement, value) {
    if (calculator.currentOperand !== "")
        calculator.exp.push(calculator.currentOperand);
    calculator.exp.push(value);
    displayElement.innerHTML += value;
    calculator.currentOperand = "";
}

Calculator.prototype.handleEqual = function (displayElement) {
    calculator.exp.push(calculator.currentOperand);
    calculator.currentOperand = "";
    calculator.anwser = calculator.calculate(calculator.exp);
    displayElement.innerHTML = calculator.anwser;
    calculator.exp = [];
    if (calculator.anwser !== "Syntax Error")
        calculator.exp.push(calculator.anwser);
    console.log("Exp: ", calculator.exp);
}

Calculator.prototype.handlePercent = function(displayElement, value, percent) {
    displayElement.innerHTML += value;
    calculator.exp.push(calculator.currentOperand);
    calculator.exp.push("/");
    calculator.exp.push(percent);
    calculator.currentOperand = "";
}