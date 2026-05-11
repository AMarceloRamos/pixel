import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // 🔥 CAMBIO IMPORTANTE
      secure: false, // 🔥 false para 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // evita problemas locales
      },
    });

    await transporter.verify();
    console.log("SMTP listo ✅");

    const info = await transporter.sendMail({
      from: `"Pixel App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Correo enviado:", info.response);
  } catch (error) {
    console.log("❌ ERROR EMAIL:", error);
    throw error;
  }
};