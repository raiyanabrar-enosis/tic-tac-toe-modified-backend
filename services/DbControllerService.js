import Game from "../models/games.js";

export default class DbControllerService {
	static async newGame(body) {
		try {
			const post = await Game.create(body);

			return { message: "Success", data: post._id };
		} catch (error) {
			console.log("error from route", error);
			return { message: "error" };
		}
	}
}
