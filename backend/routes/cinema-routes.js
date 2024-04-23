import express from "express";
import { addCinema, getAllCinema } from "../controllers/cinema-controller.js";
import Cinema from "../models/Cinema.js";
const cinemaRouter = express.Router();

//cinemaRouter.get("/", getAllUsers);
cinemaRouter.get("/", getAllCinema);
cinemaRouter.post("/add", addCinema);

//cinemaRouter.put("/:id", updateUser);
//cinemaRouter.delete("/:id", deleteUser);
//cinemaRouter.post("/login", login);
export default cinemaRouter;
