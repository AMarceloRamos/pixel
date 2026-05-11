import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

type RegisterForm = {
  email: string;
  password: string;
  userName: string;
  confirmPassword: string;
};

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    userName: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✏️ Inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Submit
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", {
        email: form.email,
        password: form.password,
        userName: form.userName,
      });

      alert("Cuenta creada correctamente");

      navigate("/login");

    // } catch (error) {
    //   console.log(error);
    //   alert("Error al registrar");
    // } finally {
    //   setLoading(false);
    // }

    } catch (error: any) {
  console.error(error.response?.data);
  alert(error.response?.data?.msg);
}
  };

  return (
    <>
      {/* NAV */}
      <div className="bg-[#302c42]">
        <Header />
      </div>

      <main className="min-h-screen bg-[#1f1b2e] relative overflow-hidden flex items-center justify-center px-4 py-20">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#8176AF]/30 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#C0B7E8]/20 rounded-full blur-3xl" />

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
          }}
          className="relative z-10 w-full max-w-lg"
        >

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">

            {/* HEADER */}
            <div className="text-center mb-8">

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="
                  w-20 h-20
                  mx-auto
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#8176AF]
                  to-[#C0B7E8]
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-[#8176AF]/30
                "
              >
                <ShieldCheck className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mt-6">
                Crear Cuenta
              </h1>

              <p className="text-gray-400 mt-3 text-sm">
                Únete a Pixel Dev y comienza a gestionar tu espacio
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Correo electrónico
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C0B7E8]" />

                  <input
                    type="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      bg-[#2b2440]
                      border border-white/10
                      rounded-2xl
                      py-4
                      pl-12
                      pr-4
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      focus:border-[#C0B7E8]
                      transition
                    "
                  />

                </div>

              </div>

              {/* USERNAME */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Nombre de usuario
                </label>

                <div className="relative">

                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C0B7E8]" />

                  <input
                    type="text"
                    name="userName"
                    placeholder="Tu nombre"
                    value={form.userName}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      bg-[#2b2440]
                      border border-white/10
                      rounded-2xl
                      py-4
                      pl-12
                      pr-4
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      focus:border-[#C0B7E8]
                      transition
                    "
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Contraseña
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C0B7E8]" />

                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      bg-[#2b2440]
                      border border-white/10
                      rounded-2xl
                      py-4
                      pl-12
                      pr-4
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      focus:border-[#C0B7E8]
                      transition
                    "
                  />

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Confirmar contraseña
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C0B7E8]" />

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      bg-[#2b2440]
                      border border-white/10
                      rounded-2xl
                      py-4
                      pl-12
                      pr-4
                      text-white
                      placeholder:text-gray-500
                      outline-none
                      focus:border-[#C0B7E8]
                      transition
                    "
                  />

                </div>

              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-gradient-to-r
                  from-[#8176AF]
                  to-[#C0B7E8]
                  hover:opacity-90
                  text-[#1f1b2e]
                  font-bold
                  py-4
                  rounded-2xl
                  transition
                  shadow-lg
                  shadow-[#8176AF]/30
                "
              >
                {loading ? (
                  "Creando cuenta..."
                ) : (
                  <>
                    Registrarse
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center">

              <p className="text-sm text-gray-400">
                ¿Ya tienes cuenta?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="
                    text-[#C0B7E8]
                    hover:text-white
                    transition
                    cursor-pointer
                    font-semibold
                  "
                >
                  Inicia sesión
                </span>
              </p>

              <p
                onClick={() => navigate("/")}
                className="
                  mt-3
                  text-sm
                  text-gray-500
                  hover:text-white
                  transition
                  cursor-pointer
                "
              >
                ← Volver al inicio
              </p>

            </div>

          </div>

        </motion.div>
      </main>
      <Footer/>
    </>
  );
}