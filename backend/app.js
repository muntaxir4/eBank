import { Router } from "express";
import cors from "cors";
import mongoose from "mongoose";

import { MONGO_DB_URL, MONGO_DB_COLLECTION } from "./.moon.config.js";

import auth from "./routes/auth.js";
import user from "./routes/user.js";

const root = Router();

//connect to database
mongoose.connect(MONGO_DB_URL + "/" + MONGO_DB_COLLECTION);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

root.use(cors());

root.get("/", (req, res) => {
  res.send("Welcome to eBank API v2.0");
});

root.use("/auth", auth);
root.use("/user", user);

export default root;
