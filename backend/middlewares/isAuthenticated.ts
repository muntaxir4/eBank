import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../.moon.config";
import { NextFunction, Request, Response } from "express";

import { AuthRequest } from "./types";

function isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No proper authorization" });
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = payload.userId;
    req.name = payload.name;
    next();
  } catch (error) {
    console.log("JWT verification failed", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default isAuthenticated;
