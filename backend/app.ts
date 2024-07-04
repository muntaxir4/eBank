import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import auth from "./routes/auth";
import user from "./routes/user";

const root = Router();
const prisma = new PrismaClient();

// Explicitly connect to the database
prisma
  .$connect()
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

root.use(cors());

root.get("/", (req, res) => {
  res.send("Welcome to eBank API v2.0");
});

root.use("/auth", auth);
root.use("/user", user);

export default root;
