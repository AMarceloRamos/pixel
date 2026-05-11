import type { Request, Response } from "express";
import ProjectModel from "../models/projectModel";
// import cloudinary from "../config/cloudinary";

// Obtener los proyectos

export const getProject = async (req: Request , res: Response) =>{
    try{
    const project = await ProjectModel.find();
    
    res.json(project);
    }catch{
        res.status(500).json( { msg: "Error al obtener los projectos"});
    }
};

// // ** Crear proyecto ** 

// export const createProject = async (req: Request, res: Response) => {
//   try {
//     const { titulo, descripcion, tecnologias, fecha, url } = req.body;

//     let imageUrl;

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "proyectos",
//         format: "webp", // 🔥 aquí lo fuerzas
//         quality: "auto"
//       });

//       imageUrl = result.secure_url;
//     }

//     const project = new ProjectModel({
//       titulo,
//       descripcion,
//       tecnologias: tecnologias ? JSON.parse(tecnologias) : [],
//       fecha,
//       imagen: imageUrl,
//       url,
//     });

//     await project.save();
//     res.json(project);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Error al crear proyecto" });
//   }
// };

//  // ** Actualizar proyectos ** 

// export const updateProject = async (req: any, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { titulo, descripcion, tecnologias, fecha, url } = req.body;

//     let imageUrl;

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "proyectos",
//         format: "webp", // 🔥 también aquí
//         quality: "auto"
//       });

//       imageUrl = result.secure_url;
//     }

//     const updated = await ProjectModel.findByIdAndUpdate(
//       id,
//       {
//         titulo,
//         descripcion,
//         tecnologias: JSON.parse(tecnologias),
//         fecha,
//         ...(imageUrl && { imagen: imageUrl }),
//         url,
//       },
//       { new: true }
//     );

//     res.json(updated);

//   } catch (error) {
//     res.status(500).json({ msg: "Error update" });
//   }
// };

// // ** Eliminar Proyecto **

// export const deleteProject = async (req: Request , res: Response )=>{
//   try{
//     const {id} = req.params;
    
//     const project = await ProjectModel.findById(id);

//     if(!project){
//       return res.status(404).json({ msg: "No encontrado"});
//     }

//     // Eliminar imagen
//     if((project as any).public_id){
//       await cloudinary.uploader.destroy((project as any).publid_id);
//     }

//     await project.deleteOne();

//     res.json({ msg: "Proyecto eliminado"});

//   }catch{
//       res.status(500).json({ msg:"Error al eliminar"});
//   }
// };
