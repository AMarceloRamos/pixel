// models/Contact.ts
import { Schema, model, Document, Date } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
  response: string;
responded: boolean;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  response: {
    type: String, 
  },
  responded: {
    type: Boolean, 
    default: false
  }
},
 {
    timestamps: true,
  });

export default model<IContact>("Contactos", ContactSchema);