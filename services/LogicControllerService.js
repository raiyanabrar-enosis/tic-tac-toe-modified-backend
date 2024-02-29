import BoardControllerService from "./BoardControllerService.js";
import DbControllerService from "./DbControllerService.js";

export default class LogicControllerService {
	constructor(N, multiplayer) {
		this.move = 1;
		this.steps = [];
		this.currentTurn = 1;
		this.isMultiplayer = multiplayer;
		this.isFilled = false;
		this.boardSize = N;
		this.currentGame = null;
		this.winner = 0;
		this.isGameover = false;
		this.endBoardState = [];
		this.playerNames = ["Player 1", "Player 2"];
	}

	newGame() {
		this.boardSize = this.boardSize;
		this.currentGame = new BoardControllerService(this.boardSize);

		return this.currentGame.getBoard();
	}

	setName(name, playerNo) {
		this.playerNames[playerNo - 1] = name;
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
		this.currentTurn = moveData.nextTurn;
		this.turnComplete(this.currentGame.getBoard(), move, player);

		if (moveData.isDraw || moveData.isWinner)
			return this.handleIfGameEnds(moveData);

		return moveData;
	}

	handleIfGameEnds(moveData) {
		if (moveData.isWinner) {
			this.winner = moveData.player;
		}

		this.isGameover = true;
		this.endBoardState = JSON.parse(JSON.stringify(moveData.boardstate));

		return { ...moveData, winnerData: this.createWinnerData() };
	}

	createWinnerData(winner = this.winner) {
		const winnerData = {
			winner: winner,
			winnerName: winner ? this.playerNames[this.winner - 1] : "None",
			isMultiplayer: this.isMultiplayer,
			steps: this.steps,
			moves: this.move,
			boardSize: this.boardSize,
			participatedPlayers: this.playerNames,
			endBoardState: this.endBoardState,
		};

		DbControllerService.newGame(winnerData);

		return winnerData;
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
