export default class BoardControllerService {
	constructor(size) {
		this.boardsize = size;
		this.board = this.initBoard(size);
	}

	initBoard = (n) => {
		let board = [];

		for (let i = 0; i < n; i++) {
			let innerboard = [];

			for (let j = 0; j < n; j++) {
				innerboard.push(0);
			}
			board[i] = innerboard;
		}

		return board;
	};

	getBoard = () => {
		return this.board;
	};

	checkRowsMatch = (player) => {
		let isMatching = true;

		for (let i = 0; i < this.boardsize; i++) {
			isMatching = true;
			for (let j = 0; j < this.boardsize; j++) {
				if (player != this.board[i][j]) isMatching = false;
			}

			if (isMatching) return true;
		}

		return isMatching;
	};

	checkColumnsMatch = (player) => {
		let isMatching = true;

		for (let i = 0; i < this.boardsize; i++) {
			isMatching = true;
			for (let j = 0; j < this.boardsize; j++) {
				if (player != this.board[j][i]) isMatching = false;
			}

			if (isMatching) return true;
		}

		return isMatching;
	};

	checkLeftDiagonalsMatch = (player) => {
		let isMatching = true;

		for (let i = 0; i < this.boardsize; i++) {
			if (player != this.board[i][i]) isMatching = false;
		}

		return isMatching;
	};

	checkRightDiagonalsMatch = (player) => {
		let isMatching = true;

		for (let i = 0; i < this.boardsize; i++) {
			if (player != this.board[i][this.boardsize - i - 1]) isMatching = false;
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
		for (let i = 0; i < this.boardsize; i++) {
			for (let j = 0; j < this.boardsize; j++) {
				if (this.board[i][j] == 0) return false;
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
