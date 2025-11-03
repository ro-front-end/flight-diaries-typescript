import express from "express";

import { loginUser } from "../controllers/authcontrollers";

const authRoutes = express.Router();

authRoutes.post("/", loginUser);

export default authRoutes;
