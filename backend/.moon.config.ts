import dotenv from "dotenv";
dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const MONGO_DB_COLLECTION = process.env.MONGO_DB_COLLECTION;
const SERVER_PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

export { MONGO_DB_URL, MONGO_DB_COLLECTION, SERVER_PORT, JWT_SECRET };
