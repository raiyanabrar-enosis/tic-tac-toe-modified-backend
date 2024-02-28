import LogicController from "./LogicController.js";

let game = [];

export default class GameController {
	static async newGame(req, res) {
		const boardSize = req.query.boardsize;
		const isMultiplayer = req.query.multiplayer == "true" ? true : false; // Convert the string value to boolean

		if (isMultiplayer) {
			const multiplayerGames = game.filter(
				(g) => g.instance.isMultiplayer === true
			);

			let currentGame;
			let currentBoard;

			if (multiplayerGames.length) {
				for (let i = 0; i < multiplayerGames.length; i++) {
					const cGame = multiplayerGames[i];

					if (!cGame.instance.checkFilled()) {
						currentGame = multiplayerGames[i];
						currentBoard = currentGame.instance.getCurrentGameBoard();
						currentGame.instance.setFilled();
						break;
					}

					// No available games found, so make one
					if (i == multiplayerGames.length - 1) {
						currentGame = GameController.setupSinglePlayerGame(
							boardSize,
							isMultiplayer
						);
						currentBoard = currentGame.instance.newGame();
						break;
					}
				}
			} else {
				currentGame = GameController.setupSinglePlayerGame(
					boardSize,
					isMultiplayer
				);
				currentBoard = currentGame.instance.newGame();
			}

			res.status(200).send({
				message: "Game joined",
				data: {
					id: currentGame.id,
					board: currentGame.instance.getCurrentGameBoard(),
					start: currentGame.instance.checkFilled(),
				},
			});
		} else {
			const newGame = GameController.setupSinglePlayerGame(
				boardSize,
				isMultiplayer
			);

			res.status(200).send({
				message: "Game created",
				data: {
					id: newGame.id,
					board: newGame.instance.newGame(),
				},
			});
		}
	}

	static async addMove(req, res) {
		const move = req.body.move;
		const id = req.body.id;
		const player = req.body.player;

		const gameInstance = game.find((g) => g.id == id);
		const moveData = gameInstance.instance.addMove(move, player);

		res.status(200).send({ message: "Move created", data: moveData });
	}

	static async getSteps(req, res) {
		const id = req.body.id;
		const gameInstance = game.find((g) => g.id == id);

		res
			.status(200)
			.send({ message: "Success", data: gameInstance?.instance.getSteps() });
	}

	static async removeGame(req, res) {
		const id = req.query.id;

		game = game.filter((g) => g.id != id);

		res.status(200).send({ message: "Success" });
	}

	static setupSinglePlayerGame(boardSize, isMultiplayer) {
		const curgame = new LogicController(boardSize, isMultiplayer);
		const newgame = {
			id: Date.now(),
			instance: curgame,
		};
		game.push(newgame);

		return newgame;
	}
}
