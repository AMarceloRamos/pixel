import { Router , Request, Response } from "express";
import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary";
import { getProject,
 } from "../controllers/projectController";
import { auth } from "../middleware/auth";
 
const router = Router();

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: async (req, file) =>{
//         return {
//             folder: "projects",
//             format: file.mimetype.split("/")[1],
//             public_id: Date.now() + "-" + file.originalname,
//         }
//     }
// })

// const upload = multer({ storage });

router.get("/",getProject);
// router.post("/", upload.single("imagen"), createProject);
// router.put("/:id", upload.single("imagen"), updateProject);
// router.delete("/.id", deleteProject);
 
export default router;