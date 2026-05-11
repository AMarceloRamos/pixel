// models/User.ts
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  userName :string;
  role: "admin" | "user";
  resetToken?: string;
  resetTokenExpire?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true, // 🔥 importante
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    userName:{
      type:String,
    
    },

    role: {
      type: String,
      enum: ["admin", "user"], // 🔥 restringe valores
      default: "user",
    },

    resetToken: {
      type: String,
    },

    resetTokenExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("Users", UserSchema);