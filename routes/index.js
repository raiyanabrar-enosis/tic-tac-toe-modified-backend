import Router from "express";

import HomeController from "../controllers/HomeController.js";
import GameController from "../controllers/GameController.js";

const routes = Router();

// --------------------- API START --------------------------

routes.get("/", HomeController.home);

routes.get("/game/new", GameController.newGame);
routes.get("/game/remove", GameController.removeGame);
routes.post("/game/name", GameController.setName);
routes.post("/game/move/create", GameController.addMove);

// ----------------- API END --------------------

export default routes;
