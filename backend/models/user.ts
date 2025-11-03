import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, minlength: 8, required: true },
});
userSchema.set("toJSON", {
  transform: (
    _: unknown,
    ret: Partial<IUser> & { _id?: unknown; __v?: number; passwordHash?: string }
  ) => {
    ret.id = (ret._id as Types.ObjectId).toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
