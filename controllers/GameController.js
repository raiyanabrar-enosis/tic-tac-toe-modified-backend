import LogicController from "./LogicController.js";

let game = [];

export default class GameController {
	static async newGame(req, res) {
		const boardSize = req.params.boardsize;
		const curgame = new LogicController(boardSize);
		const newgame = {
			id: Date.now(),
			instance: curgame,
		};
		game.push(newgame);

		res.status(200).send({
			message: "Game created",
			data: {
				id: newgame.id,
				board: curgame.newGame(),
			},
		});
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
			.send({ message: "Success", data: gameInstance.instance.getSteps() });
	}
}
