import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
	{
		boardSize: {
			type: Number,
			default: 3,
		},
		winner: {
			type: Number,
			default: 0,
		},
		isMultiplayer: {
			type: Boolean,
			default: false,
		},
		participatedPlayers: {
			type: Array,
			default: ["Player 1", "Player 2"],
		},
		winnerName: {
			type: String,
			default: "",
		},
		moves: {
			type: Number,
			default: 0,
		},
		steps: {
			type: Array,
			default: [],
		},
		endBoardState: {
			type: Array,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true }
);

const Game = mongoose.model("games", gameSchema);

export default Game;
