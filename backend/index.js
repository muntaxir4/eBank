import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {
  MONGO_DB_URL,
  MONGO_DB_COLLECTION,
  SERVER_PORT,
} from "./.moon.config.js";

import auth from "./routes/auth.js";
import user from "./routes/user.js";

const app = express();
const PORT = SERVER_PORT;

//connect to database
mongoose.connect(MONGO_DB_URL + "/" + MONGO_DB_COLLECTION);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(cors());

app.use("/auth", auth);
app.use("/user", user);

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
