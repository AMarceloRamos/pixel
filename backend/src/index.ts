import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import projectRouter from "./routes/projectRoutes";
import authRouter from "./routes/authRoutes";
import heroRouter from "./routes/heroRoutes";
import contactRouter from "./routes/contactRoutes";

dotenv.config();

const app = express();


// 🔧 middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🧪 test
app.get("/", (_req: Request, res: Response) => {
  res.send("Servidor Pixel corriendo 🚀");
});


// 🔗 rutas
app.use("/api/projects", projectRouter);
app.use("/api/auth", authRouter);
app.use("/api/hero", heroRouter);
app.use("/api/contact", contactRouter);

// ❌ 404 (siempre al final)
app.use((_req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});

// 🔌 conexión a Mongo
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI no definida en .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Mongo conectado");
  } catch (error) {
    console.error("❌ Error Mongo:", error);
    process.exit(1);
  }
};

// 🚀 iniciar servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server en http://localhost:${PORT}`);
});