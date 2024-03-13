import LogicControllerService from "../services/LogicControllerService.js";

let game = []; // Stores game instances

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
				// Returns the first available multiplayer game
				for (
					let gameIndex = 0;
					gameIndex < multiplayerGames.length;
					gameIndex++
				) {
					const cGame = multiplayerGames[gameIndex];

					if (!cGame.instance.checkFilled()) {
						currentGame = multiplayerGames[gameIndex];
						currentBoard = currentGame.instance.getCurrentGameBoard();
						currentGame.instance.setFilled();
						break;
					}

					// No available games found, so make one in the end
					if (gameIndex == multiplayerGames.length - 1) {
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

	// Adds current move to the game instance containing the id
	// If game is over, remove the instance
	static async addMove(req, res) {
		const move = req.body.move;
		const id = req.body.id;
		const player = req.body.player;

		const gameInstance = game.find((g) => g.id == id);
		const moveData = gameInstance.instance.addMove(move, player);

		if (moveData.isWinner || moveData.isDraw)
			GameController.removeGame(gameInstance.id);

		console.log(req.body, moveData);

		res.status(200).send({ message: "Move created", data: moveData });
	}

	static async setName(req, res) {
		const id = req.body.id;
		const name = req.body.name;
		const playerNo = req.body.playerNo;

		const iid = setInterval(() => {
			const gameInstance = game.find((g) => g.id == id);
			if (gameInstance) {
				gameInstance.instance.setName(name, playerNo);
				clearInterval(iid);
			}
		}, 200);

		res.status(200).send({
			message: "Success",
			data: name,
		});
	}

	static async removeGame(id) {
		game = game.filter((g) => g.id != id);
	}

	static setupSinglePlayerGame(boardSize, isMultiplayer) {
		const curgame = new LogicControllerService(boardSize, isMultiplayer);
		const newgame = {
			id: Date.now(),
			instance: curgame,
		};
		game.push(newgame);

		return newgame;
	}
}
