import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  login,
  updateUser,
} from "../controllers/user-controller.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", addUser);

userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
export default userRouter;
