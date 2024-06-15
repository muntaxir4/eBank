import express from "express";
import cors from "cors";

import auth from "./routes/auth.js";
import user from "./routes/user.js";

import { SERVER_PORT } from "../.moon.config.mjs";

const app = express();
const PORT = SERVER_PORT;

app.use(cors());

app.use("/auth", auth);
app.use("/user", user);

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started at http://localhost:${PORT}`);
});
