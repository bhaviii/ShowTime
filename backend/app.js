//password:user for DBMS
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
//import cors from "cors";
import cinemaRouter from "./routes/cinema-routes.js";
dotenv.config();
const app = express();
//var cors = require("cors");
//middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/cinema", cinemaRouter);

//app.use(cors({ origin: "http://localhost:3000" }));
mongoose
  .connect(
    `mongodb+srv://user:${process.env.MONGODB_PASSWORD}@cluster0.ohornor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => app.listen(5000, () => console.log("CONNECTED")))
  .catch((e) => console.log("ERROR"));
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
