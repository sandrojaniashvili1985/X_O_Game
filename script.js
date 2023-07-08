const cellElements = document.querySelectorAll("[data-cell]")
const x_class = "x"
const circle_class = "circle"
const container = document.getElementById("board")
const RestartButton = document.getElementById("RestartButton")
let circleTurn 
const data_winning_message = document.querySelector("[data-winning-message]")
const winningMasage = document.getElementById("winningMasage")
const winning_combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()

RestartButton.addEventListener("click", startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMasage.classList.remove("show")
}

function handleClick(e) {
    const cell = e.target // გასარკვევია რა არის
    const currentClass = circleTurn ? circle_class : x_class
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
    // check for win
    // check for draw
    // Switch Turns

}

function endGame(draw) {
    if (draw) {
        data_winning_message.innerHTML = "Draw!"
    } else {
        data_winning_message.innerHTML = `${circleTurn ? "O's" : "X's"} win!`
    }
    winningMasage.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {  // გასარკვევია რას აკეთებს ... წერტილები
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn  
}

function setBoardHoverClass() { 
    container.classList.remove(x_class) // ჩაწერის მერე რო წაიშალოს კლასი 
    container.classList.remove(circle_class)

    if (circleTurn) {
        container.classList.add(circle_class)
    } else {
        container.classList.add(x_class)
    }
}

function checkWin(currentClass){
    return winning_combination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}