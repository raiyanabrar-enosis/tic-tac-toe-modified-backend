import Router from "express";

import HomeController from "../controllers/HomeController.js";
import DbController from "../controllers/DbController.js";
import GameController from "../controllers/GameController.js";

const routes = Router();

// --------------------- API START --------------------------

routes.get("/", HomeController.home);
routes.post("/game/save", DbController.newGame);

routes.post("/game/steps", GameController.getSteps);

routes.get("/game/new", GameController.newGame);
routes.get("/game/remove", GameController.removeGame);
routes.post("/game/move/create", GameController.addMove);

// ----------------- API END --------------------

export default routes;
