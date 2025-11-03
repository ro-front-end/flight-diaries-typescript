import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isStrongPassword = (password: string) => password.length >= 8;

interface UserBody {
  username: string;
  email: string;
  password: string;
}

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find({});
    return res.status(200).json(users);
  } catch (error: unknown) {
    let message = "Something went wrong.";
    if (error instanceof Error) message += ` Error: ${error.message}`;
    return res.status(500).json({ error: message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (error: unknown) {
    let message = "Something went wrong.";
    if (error instanceof Error) message += ` Error: ${error.message}`;
    return res.status(500).json({ error: message });
  }
};

export const createUser = async (
  req: Request<unknown, unknown, UserBody>,
  res: Response
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: "Parameters missing" });

    if (!isValidEmail(email))
      return res.status(400).json({ error: "Invalid email" });

    if (!isStrongPassword(password))
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, email, passwordHash });
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error: unknown) {
    let message = "Something went wrong.";
    if (error instanceof Error) message += ` Error: ${error.message}`;
    return res.status(500).json({ error: message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    return res.status(204).end();
  } catch (error: unknown) {
    let message = "Failed to delete user.";
    if (error instanceof Error) message += ` Error: ${error.message}`;
    return res.status(500).json({ error: message });
  }
};
