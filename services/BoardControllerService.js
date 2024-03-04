export default class BoardControllerService {
	constructor(size) {
		this.boardsize = size;
		this.board = this.initBoard(size);
	}

	initBoard = (n) => {
		let board = [];

		for (let col = 0; col < n; col++) {
			let innerboard = [];

			for (let colItem = 0; colItem < n; colItem++) {
				innerboard.push(0);
			}
			board[col] = innerboard;
		}

		return board;
	};

	getBoard = () => {
		return this.board;
	};

	checkRowsMatch = (player) => {
		let isMatching = true;

		for (let column = 0; column < this.boardsize; column++) {
			isMatching = true;
			for (let colItem = 0; colItem < this.boardsize; colItem++) {
				if (player != this.board[column][colItem]) isMatching = false;
			}

			if (isMatching) return true;
		}

		return isMatching;
	};

	checkColumnsMatch = (player) => {
		let isMatching = true;

		for (let column = 0; column < this.boardsize; column++) {
			isMatching = true;
			for (let colItem = 0; colItem < this.boardsize; colItem++) {
				if (player != this.board[colItem][column]) isMatching = false;
			}

			if (isMatching) return true;
		}

		return isMatching;
	};

	checkLeftDiagonalsMatch = (player) => {
		let isMatching = true;

		for (let column = 0; column < this.boardsize; column++) {
			if (player != this.board[column][column]) isMatching = false;
		}

		return isMatching;
	};

	checkRightDiagonalsMatch = (player) => {
		let isMatching = true;

		for (let column = 0; column < this.boardsize; column++) {
			if (player != this.board[column][this.boardsize - column - 1])
				isMatching = false;
		}

		return isMatching;
	};

	checkWinner = (player) => {
		return (
			this.checkRowsMatch(player) ||
			this.checkColumnsMatch(player) ||
			this.checkLeftDiagonalsMatch(player) ||
			this.checkRightDiagonalsMatch(player)
		);
	};

	checkDraw = () => {
		for (let column = 0; column < this.boardsize; column++) {
			for (let colItem = 0; colItem < this.boardsize; colItem++) {
				if (this.board[column][colItem] == 0) return false;
			}
		}
		return true;
	};

	addMove = (move, player) => {
		this.board[move[0]][move[1]] = player;
		const isWinner = this.checkWinner(player);
		const isDraw = !isWinner && this.checkDraw();

		return {
			move: move,
			player: player,
			nextTurn: player == 1 ? 2 : 1,
			boardstate: JSON.parse(JSON.stringify(this.board)),
			isWinner: isWinner,
			isDraw: isDraw,
		};
	};
}
