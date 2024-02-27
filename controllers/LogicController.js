import BoardController from "./BoardController.js";

export default class LogicController {
	constructor(N) {
		this.move = 1;
		this.steps = [];
		this.boardSize = N;
		this.currentGame = null;
	}

	newGame() {
		this.boardSize = this.boardSize;
		this.currentGame = new BoardController(this.boardSize);

		return this.currentGame.getBoard();
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
