import BoardController from "./BoardController.js";

export default class LogicController {
	constructor(N, multiplayer) {
		this.move = 1;
		this.steps = [];
		this.isMultiplayer = multiplayer;
		this.isFilled = false;
		this.boardSize = N;
		this.currentGame = null;
	}

	newGame() {
		this.boardSize = this.boardSize;
		this.currentGame = new BoardController(this.boardSize);

		return this.currentGame.getBoard();
	}

	getCurrentGameBoard() {
		return this.currentGame.getBoard();
	}

	checkFilled() {
		return this.isFilled;
	}

	setFilled() {
		this.isFilled = true;
	}

	getSteps() {
		return this.steps;
	}

	addStep(step) {
		this.steps.push(step);
	}

	addMove(move, player) {
		const moveData = this.currentGame.addMove(move, player);
		this.turnComplete(this.currentGame.getBoard(), move, player);

		return moveData;
	}

	turnComplete(board, boardindex, turn) {
		const newStep = {
			move: this.move,
			player: turn,
			position: boardindex,
			boardstate: JSON.parse(JSON.stringify(board)),
		};

		this.addStep(newStep);
	}
}
