import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} from "../controllers/userControllers";

const userRoutes = express.Router();

// CRUD de Users
userRoutes.get("/", getAllUsers); // GET /api/users
userRoutes.get("/:id", getUserById); // GET /api/users/:id
userRoutes.post("/", createUser); // POST /api/users
userRoutes.delete("/:id", deleteUser); // DELETE /api/users/:id

export default userRoutes;
