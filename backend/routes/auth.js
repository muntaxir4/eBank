import { Router, urlencoded } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from ".././.moon.config.js";
import { User, Account } from "../database/Schema.js";

const router = Router();
router.use(urlencoded({ extended: false }));

const userSignupSchema = zod.object({
  firstName: zod.string().min(1),
  lastName: zod.string().min(1),
  email: zod.string().email(),
  password: zod.string().min(5),
});

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = userSignupSchema.parse(
      req.body
    );
    try {
      const { _id: userId } = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      await Account.create({
        userId,
        balance: 100 + Math.floor(Math.random() * 10000),
      });
      const token = jwt.sign(
        { userId, name: lastName + "-" + firstName },
        JWT_SECRET
      );
      return res
        .status(200)
        .json({ message: "User created successfully", token });
    } catch (error) {
      console.log("Signup failed", error);
      return res.status(400).json({ error: "User already exists" });
    }
  } catch (error) {
    console.log("Zod failed at Sign up", error);
    return res.status(400).json({ error });
  }
});

const userLoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5),
});

router.post("/login", async (req, res) => {
  console.log("Login request", req.body);
  try {
    const { email, password } = userLoginSchema.parse(req.body);
    try {
      const {
        _id: userId,
        firstName,
        lastName,
      } = await User.findOne({ email, password });
      if (!userId) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId, name: lastName + "-" + firstName },
        JWT_SECRET
      );
      return res
        .status(200)
        .json({ message: "User Logged in successfully", token });
    } catch (error) {
      console.log("Login failed", error);
      return res.status(500).json({ error: "Server Failed" });
    }
  } catch (error) {
    console.log("Zod failed at Log in", error);
    return res.status(400).json({ error });
  }
});

router.use((error, req, res, next) => {
  console.log("Error in auth route", error);
  res.status(500).json({ error: "Server Error" });
});

export default router;
