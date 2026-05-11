import { Schema, model, Document } from "mongoose";

export interface IHero extends Document {
  name: string;
  title: string;
  description: string;
  image: string;
  roles: string[];
}

const HeroSchema = new Schema<IHero>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default model<IHero>("Dato", HeroSchema);