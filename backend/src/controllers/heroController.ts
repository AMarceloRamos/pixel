
import { Request, Response } from "express";
import HeroModel from "../models/heroModels";

// 📌 GET (obtener el Hero)
export const getHero = async (req: Request, res: Response) => {
  try {
    // normalmente el hero es único
    const hero = await HeroModel.find();
    res.json(hero);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener los datos del hero",
      error,
    });
  }
};


