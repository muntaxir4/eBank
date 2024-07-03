import express from "express";
import root from "./app";

import { SERVER_PORT } from "./.moon.config";

const app = express();
const PORT = SERVER_PORT;

app.use("/api/v2", root);

app.get("/", (req, res) => {
  res.send("Choose an API version");
});

// app
//   .listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
//   .on("error", (error) => console.log(`Error: ${error}`));

export default app;
