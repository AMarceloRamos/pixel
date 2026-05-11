import { Router } from "express"
import { getHero } from "../controllers/heroController";

const router = Router()

router.get("/" , getHero);

export default router;