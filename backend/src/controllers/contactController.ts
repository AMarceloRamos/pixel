// controllers/contactController.ts
import { Request, Response } from "express";
import Contact from "../models/contactModels";
import { sendEmail } from "../utils/sendEmail";

// 📌 GET (obtener el Hero)
export const getContact = async (req: Request, res: Response) => {
  try {
    // normalmente el hero es único

    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener los datos del hero",
      error,
    });
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    let { name, email, message } = req.body;

    // CAPITALIZAR PRIMERA LETRA
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    if (!name || !email || !message) {
      return res.status(400).json({
        msg: "Todos los campos son obligatorios",
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    // EMAIL AL USUARIO
    await sendEmail(
      email,
      "Mensaje recibido | Pixel Dev",
      `
      <div style="
        background:#1f1b2e;
        padding:40px;
        font-family:Arial,sans-serif;
        color:#ffffff;
      ">

        <div style="
          max-width:600px;
          margin:auto;
          background:#2b2440;
          border-radius:20px;
          overflow:hidden;
          border:1px solid rgba(255,255,255,0.08);
        ">

          <!-- HEADER -->
          <div style="
            background:linear-gradient(90deg,#8176AF,#C0B7E8);
            padding:30px;
            text-align:center;
          ">
          
          <h2 class="pixel-font text-sm sm:text-base tracking-tighter" 
          style=color:"#03dffc">
                        PIXEL
          <span style="color=black">
          .DEV
          </span>
          </h2>
          </div>

          <!-- CONTENT -->
          <div style="padding:40px;">

            <h2 style="
              margin-top:0;
              color:#03dffc;
            ">
              Hola ${name},
            </h2>

            <p style="
              color:#d1d5db;
              line-height:1.8;
              font-size:16px;
            ">
              Hemos recibido correctamente tu mensaje.
            </p>

            <p style="
              color:#d1d5db;
              line-height:1.8;
              font-size:16px;
            ">
              Gracias por comunicarte con
              <strong style="color:#ffffff;">
                Pixel Dev
              </strong>.
              Nuestro equipo revisará tu solicitud y te
              responderá a la brevedad posible.
            </p>

            <div style="
              margin-top:30px;
              padding:20px;
              border-radius:14px;
              background:#1f1b2e;
              border:1px solid rgba(255,255,255,0.08);
            ">
              <p style="
                margin:0 0 10px 0;
                color:#03dffc;
                font-weight:bold;
              ">
                Tu mensaje:
              </p>

              <p style="
                margin:0;
                color:#d1d5db;
                line-height:1.8;
              ">
                "${message}"
              </p>
            </div>

            <p style="
              margin-top:35px;
              color:#9ca3af;
              font-size:14px;
            ">
              Este es un mensaje automático de confirmación.
            </p>

          </div>

          <!-- FOOTER -->
          <div style="
            padding:20px;
            text-align:center;
            border-top:1px solid rgba(255,255,255,0.08);
            background:#181420;
          ">
            <p style="
              margin:0;
              color:#6b7280;
              font-size:13px;
            ">
              © 2026 Pixel Dev - Todos los derechos reservados
            </p>
          </div>

        </div>
      </div>
      `,
    );

    return res.status(201).json({
      msg: "Mensaje enviado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

// Responder Mensaje

export const replyMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const message = await Contact.findById(id);

    if (!message) {
      return res.status(404).json({ msg: "Mensaje no encontrado" });
    }

    // guardar respuesta
    message.response = response;
    message.responded = true;

    await message.save();

    // 📩 enviar respuesta al usuario
    await sendEmail(
      message.email,
      "Respuesta a tu mensaje",
      `
      <h2>Hola ${message.name}</h2>
      <p>Gracias por contactarnos.</p>
      <p><strong>Tu mensaje:</strong></p>
      <p>${message.message}</p>

      <hr/>

      <p><strong>Nuestra respuesta:</strong></p>
      <p>${response}</p>
      `,
    );

    res.json({ msg: "Respuesta enviada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al responder" });
  }
};
