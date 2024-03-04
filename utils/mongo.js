import mongoose from "mongoose";

import Game from "../models/games.js";

const connectDb = () => {
	const mongoURI = process.env.MONGO_URI;
	console.log("connecting to " + mongoURI);
	return mongoose.connect(mongoURI);
};

const models = { Game };

export { connectDb };

export default models;
