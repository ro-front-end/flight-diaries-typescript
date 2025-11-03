import dotenv from "dotenv";
dotenv.config();

export const PORT_BACK = process.env.PORT || 3001;

export const MONGODB = process.env.MONGODB_URI as string;

export const SECRET = process.env.SECRET as string;
