import { NextFunction, Request, Response, Router, urlencoded } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../.moon.config";

//importing prisma client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
      const { id: userId } = await prisma.users.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          accountId: {
            create: {
              balance: 100 + Math.floor(Math.random() * 10000),
            },
          },
        },
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
  // console.log("Login request", req.body);
  try {
    const { email, password } = userLoginSchema.parse(req.body);
    try {
      const user = await prisma.users.findFirst({
        where: {
          email,
          password,
        },
      });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const userId = user?.id;
      const firstName = user?.firstName;
      const lastName = user?.lastName;

      const token = jwt.sign(
        { userId, name: lastName + "-" + firstName },
        JWT_SECRET
      );
      return res
        .status(200)
        .json({ message: "User Logged in successfully", token });
    } catch (error) {
      console.log("Login failed", error);
      return res.status(500).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Zod failed at Log in", error);
    return res.status(400).json({ error });
  }
});

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error in auth route", error);
  res.status(500).json({ error: "Server Error" });
});

export default router;
