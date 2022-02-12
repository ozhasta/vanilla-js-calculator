"use strict"
const currentScreenEl = document.querySelector("#current-screen")
const previousScreenEl = document.querySelector("#previous-screen")
const previousScreenOperandEl = document.querySelector("#previous-screen-operand")
const btnContainer = document.querySelector(".btn-container")
let currentInput, previousInput, invalidOperation

// add event listener to btn-container only and check if clicked element is a button
btnContainer.addEventListener("click", (e) => {
  const btn = e.target
  if (btn.classList.contains("calc-btn")) {
    currentInput = btn.dataset.operator
    handleInput()
  }
})

// add event listener for keyboard
document.addEventListener(
  "keydown",
  (e) => {
    currentInput = e.key
    handleInput()
  },
  false
)

function handleInput() {
  currentInput = currentInput === "*" ? "x" : currentInput
  currentInput = currentInput === "/" ? "÷" : currentInput
  currentInput = invalidOperation ? "Delete" : currentInput
  switch (currentInput) {
    case "x":
    case "÷":
    case "-":
    case "+":
      equals()
      chainOperation()
      break

    case "Enter":
    case "=":
      equals()
      break

    case "Escape":
    case "Delete":
      previousInput = null
      currentInput = null
      invalidOperation = false
      currentScreenEl.innerText = 0
      previousScreenEl.innerText = ""
      previousScreenOperandEl.innerText = ""
      break

    case "Backspace":
      currentScreenEl.innerText = currentScreenEl.innerText.substring(
        0,
        currentScreenEl.innerText.length - 1
      )
      if (currentScreenEl.innerText.length === 0) currentScreenEl.innerText = 0
      break

    case ".":
    case ",":
      if (!currentScreenEl.innerText.includes(".")) {
        currentScreenEl.innerText += currentScreenEl.innerText ? "." : "0."
      }
      break

    default:
      // default section is only for number inputs / 12 is max input length
      if (isNaN(currentInput) || currentScreenEl.innerText.length >= 12) return
      if (currentScreenEl.innerText === "0") {
        currentScreenEl.innerText = currentInput
        return
      }
      currentScreenEl.innerText += currentInput
  }
}

// todo simplyfy this if stetement look for ?? ?. operator
function equals() {
  if (
    previousScreenEl.innerText &&
    currentScreenEl.innerText &&
    previousInput &&
    currentScreenEl.innerText !== "."
  ) {
    // num1 or num2 can be 0 (falsy) so don't use them inside if statement
    let num1 = parseFloat(previousScreenEl.innerText)
    let num2 = parseFloat(currentScreenEl.innerText)
    let result
    switch (previousInput) {
      case "+":
        result = num1 + num2
        break
      case "-":
        result = num1 - num2
        break
      case "x":
        result = num1 * num2
        break
      case "÷":
        result = num1 / num2
        break
    }
    result = parseFloat(result.toFixed(8))
    if (isNaN(result)) {
      currentScreenEl.innerText = "Invalid operation"
      invalidOperation = true
    } else {
      currentScreenEl.innerText = result
    }
    previousScreenEl.innerText = ""
    previousScreenOperandEl.innerText = ""
  }
}

function chainOperation() {
  // the dot(".") character shouldn't be a stand-alone input
  if (currentScreenEl.innerText === ".") return

  // if previous screen contains number and current screen is empty
  if (previousScreenEl.innerText && !currentScreenEl.innerText) {
    previousInput = currentInput
    previousScreenOperandEl.innerText = currentInput
  } else if (!invalidOperation) {
    previousInput = currentInput
    previousScreenOperandEl.innerText = currentInput
    previousScreenEl.innerText = currentScreenEl.innerText
    currentScreenEl.innerText = ""
  }
}
