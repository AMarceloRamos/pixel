import { Request, Response } from "express";
import User from "../models/userModel";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";

// Obtener los usuarios

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch {
    res.status(500).json({ msg: "Error al obtener los usuarios" });
  }
};


// 🧾 REGISTER
export const register = async (
  req: Request,
  res: Response
) => {
  try {
    let { email, password, userName } = req.body;

    // CAPITALIZAR NOMBRE
    userName =
      userName.charAt(0).toUpperCase() +
      userName.slice(1).toLowerCase();

    // VALIDAR USUARIO
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        msg: "Usuario ya existe",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // CREAR USUARIO
    const user = new User({
      email,
      password: hashedPassword,
      userName,
    });

    await user.save();

    // 📩 EMAIL BIENVENIDA
    await sendEmail(
      email,
      "Bienvenido a Pixel Dev 🚀",
      `
      <div style="
        background:#1f1b2e;
        padding:40px;
        font-family:Arial,sans-serif;
        color:white;
      ">

        <div style="
          max-width:650px;
          margin:auto;
          background:#2b2440;
          border-radius:24px;
          overflow:hidden;
          border:1px solid rgba(255,255,255,0.08);
        ">

          <!-- HEADER -->
          <div style="
            background:linear-gradient(90deg,#8176AF,#03dffc);
            padding:35px;
            text-align:center;
          ">
            <h1 style="
              margin:0;
              font-size:34px;
              color:white;
              letter-spacing:2px;
            ">
              PIXEL DEV
            </h1>

            <p style="
              margin-top:10px;
              color:#e5e7eb;
              font-size:15px;
            ">
              Desarrollo web moderno y experiencias digitales
            </p>
          </div>

          <!-- CONTENT -->
          <div style="padding:45px;">

            <h2 style="
              color:#03dffc;
              margin-top:0;
              font-size:30px;
            ">
              Bienvenido ${userName} 👋
            </h2>

            <p style="
              color:#d1d5db;
              line-height:1.9;
              font-size:17px;
            ">
              Tu cuenta ha sido creada exitosamente en
              <strong style="color:white;">
                Pixel Dev
              </strong>.
            </p>

            <!-- STATS -->
            <div style="
              margin-top:35px;
              display:flex;
              gap:15px;
              flex-wrap:wrap;
            ">

              <div style="
                flex:1;
                min-width:150px;
                background:#1f1b2e;
                padding:20px;
                border-radius:18px;
                border:1px solid rgba(255,255,255,0.08);
              ">
                <p style="
                  margin:0;
                  color:#9ca3af;
                  font-size:13px;
                ">
                  Estado
                </p>

                <h3 style="
                  margin-top:10px;
                  color:#03dffc;
                  font-size:24px;
                ">
                  Activa
                </h3>
              </div>

              <div style="
                flex:1;
                min-width:150px;
                background:#1f1b2e;
                padding:20px;
                border-radius:18px;
                border:1px solid rgba(255,255,255,0.08);
              ">
                <p style="
                  margin:0;
                  color:#9ca3af;
                  font-size:13px;
                ">
                  Seguridad
                </p>

                <h3 style="
                  margin-top:10px;
                  color:#22c55e;
                  font-size:24px;
                ">
                  100%
                </h3>
              </div>

            </div>

            <!-- GRAFICA -->
            <div style="
              margin-top:45px;
              background:#1f1b2e;
              padding:25px;
              border-radius:20px;
              border:1px solid rgba(255,255,255,0.08);
            ">

              <p style="
                margin-top:0;
                color:#03dffc;
                font-weight:bold;
                margin-bottom:20px;
              ">
                Tu experiencia comienza aquí 🚀
              </p>

              <div style="
                display:flex;
                align-items:flex-end;
                gap:14px;
                height:180px;
              ">

                <div style="
                  flex:1;
                  background:linear-gradient(to top,#8176AF,#03dffc);
                  height:40%;
                  border-radius:12px 12px 0 0;
                "></div>

                <div style="
                  flex:1;
                  background:linear-gradient(to top,#8176AF,#03dffc);
                  height:65%;
                  border-radius:12px 12px 0 0;
                "></div>

                <div style="
                  flex:1;
                  background:linear-gradient(to top,#8176AF,#03dffc);
                  height:85%;
                  border-radius:12px 12px 0 0;
                "></div>

                <div style="
                  flex:1;
                  background:linear-gradient(to top,#8176AF,#03dffc);
                  height:100%;
                  border-radius:12px 12px 0 0;
                "></div>

              </div>

            </div>

            <!-- BUTTON -->
            <div style="
              text-align:center;
              margin-top:45px;
            ">

              <a
                href="http://localhost:5173"
                style="
                  display:inline-block;
                  padding:16px 30px;
                  border-radius:14px;
                  background:linear-gradient(90deg,#8176AF,#03dffc);
                  color:white;
                  text-decoration:none;
                  font-weight:bold;
                  font-size:15px;
                "
              >
                Ir a Pixel Dev
              </a>

            </div>

          </div>

          <!-- FOOTER -->
          <div style="
            background:#181420;
            padding:22px;
            text-align:center;
          ">

            <p style="
              margin:0;
              color:#6b7280;
              font-size:13px;
            ">
              © 2026 Pixel Dev — Todos los derechos reservados
            </p>

          </div>

        </div>
      </div>
      `
    );

    return res.json({
      msg: "Usuario creado correctamente",
    });

  } catch (error: any) {
    console.error("ERROR REGISTER:", error);

    return res.status(500).json({
      msg: error.message,
    });
  }
};

// 🔑 LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Usuario no existe" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
      console.log(req.body);
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        userName:user.userName,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ msg: "Error en login" });
  }
};

// 🔹 solicitar recuperación
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    //debug
    console.log("EMAIL:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS ? "OK" : "NO");
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Usuario no existe" });

    // token seguro
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    //tiempo expiracion token 
    user.resetTokenExpire = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    await user.save();

    const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      "Recuperar contraseña",
      `
        <h2>Recuperación de contraseña</h2>
        <p>Haz clic en el siguiente enlace:</p>
        <a href="${url}">${url}</a>
        <p>Este enlace expira en 15 minutos</p>
      `,
    );

    res.json({ msg: "Correo enviado" });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};

// 🔹 resetear contraseña
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Token inválido o expirado" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // limpiar token
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error del servidor" });
  }
};
