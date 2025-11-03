import express from "express";
import {
  getAllFlightDiaries,
  createFlightDiary,
  deleteFlightDiary,
  editFlightDiary,
} from "../controllers/flightDiaryControllers";

const flightDiariesRoutes = express.Router();

flightDiariesRoutes.get("/", getAllFlightDiaries);
flightDiariesRoutes.post("/", createFlightDiary);
flightDiariesRoutes.delete("/:id", deleteFlightDiary);
flightDiariesRoutes.put("/:id", editFlightDiary);

export default flightDiariesRoutes;
