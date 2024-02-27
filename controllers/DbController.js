import Game from "../models/games.js";

export default class DbController {
	static async newGame(request, response) {
		const body = request.body;

		try {
			const post = await Game.create(body);

			response.status(200).send({ message: "Success", data: post._id });
		} catch (error) {
			console.log("error from route", error);
			response.status(500).send({ message: "error" });
		}
	}
}
