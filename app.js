"use strict"
const currentScreenResult = document.querySelector("#current-screen-result")
const previousScreenResult = document.querySelector("#previous-screen-result")
const previousScreenOperation = document.querySelector("#previous-screen-operation")
const btnContainer = document.querySelector(".btn-container")
let currentInput, previousInput, result, invalidOperation

function operInit() {
  // the dot(".") character should not be a stand-alone input
  if (currentScreenResult.innerText !== ".") {
    // the top screen is okay but if the bottom screen is blank
    if (!currentScreenResult.innerText && previousScreenResult.innerText) {
      previousInput = currentInput
      previousScreenOperation.innerText = currentInput
      // if the bottom screen is blank
    } else {
      previousInput = currentInput
      previousScreenOperation.innerText = currentInput
      previousScreenResult.innerText = currentScreenResult.innerText
      currentScreenResult.innerText = ""
    }
  }
}

function equals() {
  if (previousScreenResult.innerText && currentScreenResult.innerText && previousInput && currentScreenResult.innerText !== ".") {
    // num1 or num2 can be 0 (falsy) so don't declare them above if statement
    let num1 = Number(previousScreenResult.innerText)
    let num2 = Number(currentScreenResult.innerText)
    switch (previousInput) {
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
    if (isNaN(result)) {
      currentScreenResult.innerText = "Invalid operation"
      invalidOperation = true
    } else {
      currentScreenResult.innerText = result
    }
    previousScreenResult.innerText = ""
    previousScreenOperation.innerText = ""
  }
}

// add event listener to btn-container only and check clicked element is actual button
btnContainer.addEventListener("click", (e) => {
  const btn = e.target
  if (btn.classList.contains("calc-btn")) {
    currentInput = btn.dataset.operator
    handleInput()
  }
})

// add event listener for keydown
document.addEventListener(
  "keydown",
  (e) => {
    currentInput = e.key
    handleInput()
  },
  false
)

function handleInput() {
  invalidOperation ? (currentInput = "C") : (currentInput = currentInput)
  switch (currentInput) {
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
      previousInput = null
      currentInput = null
      invalidOperation = false
      currentScreenResult.innerText = 0
      previousScreenResult.innerText = ""
      previousScreenOperation.innerText = ""
      break

    case "Backspace": // for keyboard
    case "←":
      currentScreenResult.innerText = currentScreenResult.innerText.substring(0, currentScreenResult.innerText.length - 1)
      if (currentScreenResult.innerText.length === 0) {
        currentScreenResult.innerText = 0
      }
      break

    case ".": // for keyboard
    case ",":
      if (!currentScreenResult.innerText.includes(".")) {
        currentScreenResult.innerText = currentScreenResult.innerText + "."
      }
      break

    default:
      // default section is only for number inputs
      if (!isNaN(currentInput) && currentScreenResult.innerText.length < 12 /* 12 is max input length */) {
        if (currentScreenResult.innerText === "0") {
          currentScreenResult.innerText = currentInput
        } else {
          currentScreenResult.innerText += currentInput
        }
      }
  }
}
