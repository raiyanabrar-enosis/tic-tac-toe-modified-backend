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
		moves: {
			type: Number,
			default: 0,
		},
		steps: {
			type: Array,
			default: [],
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
