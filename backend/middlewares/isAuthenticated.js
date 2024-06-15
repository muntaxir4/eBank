import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../.moon.config.mjs";

function isAuthenticated(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No proper authorization" });
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    req.name = payload.name;
    next();
  } catch (error) {
    console.log("JWT verification failed", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default isAuthenticated;
