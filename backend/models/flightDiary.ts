import mongoose, { Schema, Document } from "mongoose";

export interface IFlightDiary extends Document {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
  user: mongoose.Types.ObjectId;
}

const flightDiarySchema = new Schema<IFlightDiary>({
  date: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const FlightDiary = mongoose.model<IFlightDiary>(
  "FlightDiary",
  flightDiarySchema
);

export default FlightDiary;
