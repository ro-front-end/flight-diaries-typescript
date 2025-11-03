import { Request, Response } from "express";
import FlightDiary, { IFlightDiary } from "../models/flightDiary";

type FlightDiaryBody = Omit<IFlightDiary, "_id"> & { user: string };

export const getAllFlightDiaries = async (_req: Request, res: Response) => {
  try {
    const diaries: IFlightDiary[] = await FlightDiary.find({});
    return res.status(200).json(diaries);
  } catch (error: unknown) {
    let message = "Something went wrong.";
    if (error instanceof Error) message += ` Error: ${error.message}`;
    return res.status(500).json({ error: message });
  }
};

export const createFlightDiary = async (
  req: Request<unknown, unknown, FlightDiaryBody>,
  res: Response
) => {
  try {
    const { date, weather, visibility, comment, user } = req.body;

    if (!date || !weather || !visibility || !comment || !user)
      return res.status(400).json({ error: "Missing parameters" });

    const newDiary = new FlightDiary({
      date,
      weather,
      visibility,
      comment,
      user,
    });

    const savedFlightDiary = await newDiary.save();

    return res.status(201).json(savedFlightDiary);
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (error instanceof Error) message += `Error ${error.message}`;
    return res.status(500).json({ error: message });
  }
};

export const deleteFlightDiary = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedFlightDiary = await FlightDiary.findByIdAndDelete(id);

    if (!deletedFlightDiary)
      return res.status(404).json({ error: "Flight diary not found" });

    return res.status(204).end();
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (error instanceof Error) message += `Error ${error.message}`;
    return res.status(500).json({ error: message });
  }
};

export const editFlightDiary = async (
  req: Request<{ id: string }, unknown, FlightDiaryBody>,
  res: Response
) => {
  const id = req.params.id;
  const { date, weather, visibility, comment } = req.body;
  try {
    const editedFlightDiary = await FlightDiary.findByIdAndUpdate(
      id,
      { date, weather, visibility, comment },
      { new: true }
    );

    if (!editedFlightDiary)
      return res.status(404).json({ error: "Flight diary not found" });

    return res.status(200).json(editedFlightDiary);
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (error instanceof Error) message += `Error ${error.message}`;
    return res.status(500).json({ error: message });
  }
};
