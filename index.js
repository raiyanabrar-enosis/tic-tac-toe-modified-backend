import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import models, { connectDb } from "./utils/mongo.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

connectDb().then(async () => {
	app.listen(port, (e) => {
		if (e) {
			return console.error("An error occurred ", e);
		}
		console.log("Server listening on port: ", port);
	});
});

// WEBSOCKETS ---------------
import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 6969 });

wss.on("connection", function connection(ws, req) {
	const ip = req.socket.remoteAddress;
	ws.on("error", console.error);

	ws.on("message", function message(data, isBinary) {
		wss.clients.forEach(function each(client) {
			if (ws != client && client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});
});

export default app;
