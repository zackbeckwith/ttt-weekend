/*-------------------------------- Constants --------------------------------*/
const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]


/*---------------------------- Variables (state) ----------------------------*/
let win, lose, tie, turn, winner
let board = []
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('div')
const gameStatus = document.querySelector('h2')

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square){ square.addEventListener("click", handleClick)})

	// 5.2) If the board has a value at the index, immediately return because that square is already taken.

	// 5.3) If winner is not null, immediately return because the game is over.

	// 5.4) Update the board array at the index with the value of turn.

	// 5.5) Change the turn by multiplying turn by -1 (this flips a 1 to -1, and vice-versa).

/*-------------------------------- Functions --------------------------------*/
init ();

function init() { //step 3.2
  board = [null,null,null,null,null,null,null,null,null]
	turn = 1
	winner = null
	render()
}
function render() { //step 3.3
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
	}
}

function playerName() {
	let output;
	if (turn === 1) {
		output = 'Player 2';
	} else if (turn === -1) {
		output = 'Player 1';
	} else {
		output = 'Error in func playerName()';
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

// 5.7) All state has been updated, so render the state to the page (step 3.3).

// 6) Handle a player clicking the replay button:

	// 6.1) Add a replay button to the HTML document

	// 6.2) Store the new replay button element

	// 6.3) Do steps 4.1 (initialize the state variables) and 4.2 (render).