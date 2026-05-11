import { Router }  from "express";
import { createContact , getContact, replyMessage} from "../controllers/contactController";

const router = Router();

router.post("/", createContact);
router.get("/", getContact);
router.post("/reply/:id", replyMessage);

export default router;