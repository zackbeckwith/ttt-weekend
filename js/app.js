/*-------------------------------- Constants --------------------------------*/
const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]


/*---------------------------- Variables (state) ----------------------------*/
let win, lose, tie, turn, winner
let board = []
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('div')
const gameStatus = document.querySelector('h2')
const resetButton = document.querySelector('button')

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square){ square.addEventListener("click", handleClick)})

resetButton.addEventListener("click", resetGame)


/*-------------------------------- Functions --------------------------------*/
init ();

function init() {
  board = [null,null,null,null,null,null,null,null,null]
	turn = 1
	winner = null
	render()
}
function render() { 
	getWinner();
	board.forEach((square, index) => {
		if(square === 1) {
			squareEls[index].textContent = 'X'
		} else if(square === -1) {
			squareEls[index].textContent = 'O'
		}else {
			squareEls[index].textContent = null
		}
	})
		if(winner === null){
			gameStatus.textContent = `It's ${turn === 1 ? "Player 1's turn!" : "Player 2's turn!"}`
		} else {gameStatus.textContent = `${winner === 'T' ? "It's a tie!" : "Congrats! " + playerName() + " won!"}`
		resetButton.removeAttribute('hidden')
	}
}

function playerName() {
	let output;
	if (turn === 1) {
		output = 'Player 2';
	} else if (turn === -1) {
		output = 'Player 1';
	}
	return output;
}

function handleClick(evt){
	if(board[+(evt.target.id.replace("sq",''))] !== null){
		return
	} else if(winner !== null){
		return
	} else {
		board[+(evt.target.id.replace("sq",''))] = turn
	}
	turn *= -1
	render()
}

function getWinner() {
	winningCombos.forEach(combo => {
  	if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3){
			winner = turn
		}else if(!board.includes(null)){
			winner = 'T'
		}
	})
}

function resetGame() {
	init();
	resetButton.hidden = true
}