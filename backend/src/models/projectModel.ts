// import mongoose from "mongoose";
import type { Document }  from "mongoose";
import { Schema, model } from "mongoose";
 
export interface IProject extends Document {
    titulo : string;
    descripcion : string;
    tecnologias : string[];
    fecha : string ;
    imagen : string;
    activo : boolean;
    url: string;
}

const ProjectSchema = new Schema<IProject>(
    {
        titulo : { type: String, required: true},
        descripcion : { type: String },
        tecnologias : [{ type : String}], 
        fecha : { type:String},
        imagen : { type: String},
        activo : { type : Boolean, default: true},
        url: { type: String},
    }, 
    { timestamps: true}
);

export default model<IProject>("Proyectos", ProjectSchema);

