import express from "express";
import cors from "cors";
import { MONGODB, PORT_BACK } from "./utils/config";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import flightDiariesRoutes from "./routes/flightDiariesRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch(() => {
    console.error("Couldn't connect to MongoDB");
  });

app.get("/api/ping", (_req, res) => {
  console.info("Someone pinged here");
  res.send("Pong");
});
app.use("/api/login", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/diaries", flightDiariesRoutes);

app.listen(PORT_BACK, () => {
  console.info(`Server running on port ${PORT_BACK}`);
});
