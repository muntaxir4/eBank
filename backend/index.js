import express from "express";
import root from "./app.js";

import { SERVER_PORT } from "./.moon.config.js";

const app = express();
const PORT = SERVER_PORT;

app.use("/api/v2", root);

app.get("/", (req, res) => {
  res.send("Choose an API version");
});

app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
