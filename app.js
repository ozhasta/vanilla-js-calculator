const currentScreenResult = document.querySelector("#current-screen-result")
const previousScreenResult = document.querySelector("#previous-screen-result")
const previousScreenOperation = document.querySelector("#previous-screen-operation")
const btns = document.querySelectorAll(".calc-btn")
let currentOperation, previousOperation, result

function operInit() {
  if (currentScreenResult.innerText !== ".") {
    // nokta(".") karakteri tek basina girdi olmasin
    if (!currentScreenResult.innerText && previousScreenResult.innerText) {
      // ust ekran dolu ama alt ekran bos ise
      previousOperation = currentOperation
      previousScreenOperation.innerText = currentOperation
    } else {
      // alt ekran bos ise
      previousOperation = currentOperation
      previousScreenOperation.innerText = currentOperation
      previousScreenResult.innerText = currentScreenResult.innerText
      currentScreenResult.innerText = ""
    }
  }
}

function compute(num1, oper, num2) {
  oper = previousOperation
  // which is same as "return num1 + num2" or "return num1 - num2"
  result = Function("return " + Number(num1) + oper + Number(num2))()
  result = parseFloat(result.toFixed(6))
  // result = result.toLocaleString()
  currentScreenResult.innerText = result
}
//TODO: sonuc max 13 karakter

function equals() {
  // sadece tum girdiler dolu ve gecerli ise hesaplama yapilsin
  if (currentScreenResult.innerText && previousScreenResult.innerText && previousOperation && currentScreenResult.innerText !== ".") {
    compute(Number(previousScreenResult.innerText), previousOperation, Number(currentScreenResult.innerText))
    previousScreenResult.innerText = ""
    previousScreenOperation.innerText = ""
  }
  return
}

// add event listener for clickable buttons
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentOperation = btn.dataset.operator
    handleInput()
  })
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
      currentScreenResult.innerText = currentScreenResult.innerText.substring(0, currentScreenResult.innerText.length - 1)
      break

    case ".": // for keyboard
    case ",":
      if (currentScreenResult.innerText.includes(".")) {
      } else {
        currentScreenResult.innerText = currentScreenResult.innerText + "."
      }
      break

    default:
      // default section is for numbers
      if (!isNaN(currentOperation)) {
        if (currentScreenResult.innerText === "0") {
          currentScreenResult.innerText = currentOperation
        } else {
          if (currentScreenResult.innerText.length === 12) {
            return // dont work with more then 11 characters
          }
          currentScreenResult.innerText += currentOperation
        }
      }
  }
}
