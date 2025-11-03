import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import { SECRET } from "../utils/config";
import { Types } from "mongoose";

interface LoginBody {
  identifier: string;
  password: string;
}

interface UserToken {
  id: string;
  username: string;
  email: string;
}

export const loginUser = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response
) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password)
      return res.status(400).json({ error: "Missing parameters" });

    const userById: IUser | null = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!userById)
      return res.status(401).json({ error: "Invalid credentials" });

    const passwordCorrect = await bcrypt.compare(
      password,
      userById.passwordHash
    );

    if (!passwordCorrect)
      return res.status(401).json({ error: "Invalid credentials" });

    const userForToken: UserToken = {
      id: (userById._id as Types.ObjectId).toString(),
      username: userById.username,
      email: userById.email,
    };

    if (!SECRET) {
      return res.status(500).json({ error: "Missing JWT secret" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const token: string = jwt.sign(userForToken, SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      id: userById._id,
      username: userById.username,
      email: userById.email,
    });
  } catch (error: unknown) {
    let message = "Something went wrong.";

    if (error instanceof Error) {
      message += ` Error: ${error.message}`;
    } else if (typeof error === "string") {
      message += ` Error: ${error}`;
    }

    return res.status(500).json({ error: message });
  }
};
