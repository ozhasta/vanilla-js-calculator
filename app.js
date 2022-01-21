"use strict"
const currentScreenResult = document.querySelector("#current-screen-result")
const previousScreenResult = document.querySelector("#previous-screen-result")
const previousScreenOperation = document.querySelector("#previous-screen-operation")
const btnContainer = document.querySelector(".btn-container")
let currentOperation, previousOperation, result

function operInit() {
  // the dot(".") character should not be a stand-alone input
  if (currentScreenResult.innerText !== ".") {
    // the top screen is okay but if the bottom screen is blank
    if (!currentScreenResult.innerText && previousScreenResult.innerText) {
      previousOperation = currentOperation
      previousScreenOperation.innerText = currentOperation
      // if the bottom screen is blank
    } else {
      previousOperation = currentOperation
      previousScreenOperation.innerText = currentOperation
      previousScreenResult.innerText = currentScreenResult.innerText
      currentScreenResult.innerText = ""
    }
  }
}

function compute(num1, oper, num2) {
  switch (oper) {
    case "+":
      result = num1 + num2
      break
    case "-":
      result = num1 - num2
      break
    case "*":
      result = num1 * num2
      break
    case "/":
      result = num1 / num2
      break
  }
  result = parseFloat(result.toFixed(6))
  currentScreenResult.innerText = isNaN(result) ? "Invalid operation." : result
  // if (isNaN(result)) {
  //   previousOperation = null
  //   currentOperation = null
  //   console.log("calistim")
  // }
}
// FIXME: After  "Invalid operation." we still can add inputs.
// TODO: Think about if compute and equals functions better for combination in one function
function equals() {
  // calculate only if inputs not empty and not invalid
  if (currentScreenResult.innerText && previousScreenResult.innerText && previousOperation && currentScreenResult.innerText !== ".") {
    compute(Number(previousScreenResult.innerText), previousOperation, Number(currentScreenResult.innerText))
    previousScreenResult.innerText = ""
    previousScreenOperation.innerText = ""
  }
}

// add event listener to btn-container only and check clicked element is actual button
btnContainer.addEventListener("click", (e) => {
  const btn = e.target
  if (btn.classList.contains("calc-btn")) {
    currentOperation = btn.dataset.operator
    handleInput()
  }
})

// add event listener for keydown
document.addEventListener(
  "keydown",
  (e) => {
    currentOperation = e.key
    handleInput()
  },
  false
)

function handleInput() {
  switch (currentOperation) {
    case "/":
    case "*":
    case "-":
    case "+":
      equals()
      operInit()
      break

    case "Enter": // for keyboard
    case "=":
      equals()
      break

    case "Delete": // for keyboard
    case "C":
      previousOperation = null
      currentOperation = null
      currentScreenResult.innerText = 0
      previousScreenResult.innerText = ""
      previousScreenOperation.innerText = ""
      break

    case "Backspace": // for keyboard
    case "←":
      // TODO: dont delete invalid operation message and dont delete last chars
      currentScreenResult.innerText = currentScreenResult.innerText.substring(0, currentScreenResult.innerText.length - 1)
      break

    case ".": // for keyboard
    case ",":
      if (!currentScreenResult.innerText.includes(".")) {
        currentScreenResult.innerText = currentScreenResult.innerText + "."
      }
      break

    default:
      // default section is only for number inputs
      if (!isNaN(currentOperation) && currentScreenResult.innerText.length < 12 /* 12 is max input length */) {
        if (currentScreenResult.innerText === "0") {
          currentScreenResult.innerText = currentOperation
        } else {
          currentScreenResult.innerText += currentOperation
          // FIXME: After  "Invalid operation." we still can add inputs.
        }
      }
  }
}
