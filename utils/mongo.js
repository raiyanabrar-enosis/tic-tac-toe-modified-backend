import mongoose from "mongoose";

import Game from "../models/games.js";
import { mongoURI } from "./globals.js";

const connectDb = () => {
	console.log("connecting to " + mongoURI);
	return mongoose.connect(mongoURI);
};

const models = { Game };

export { connectDb };

export default models;
