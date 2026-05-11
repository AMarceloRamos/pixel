import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";
import  Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // ✏️ Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      login(res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#302c42]">
        <Header/>
      </div>

      <main className="min-h-screen bg-[#1f1b2e] relative overflow-hidden flex items-center justify-center px-4 py-20">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#8176AF]/30 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#C0B7E8]/20 rounded-full blur-3xl" />

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
          }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">

            {/* HEADER */}
            <div className="text-center mb-8">

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] flex items-center justify-center shadow-lg shadow-[#8176AF]/30"
              >
                <span className="text-3xl font-black text-white">
                  P
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mt-6">
                Bienvenido
              </h1>

              <p className="text-gray-400 mt-3 text-sm">
                Inicia sesión para acceder a tu panel de Pixel Dev
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
                  "Ingresando..."
                ) : (
                  <>
                    Ingresar
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

            </form>

            {/* LINKS */}
            <div className="mt-8 space-y-3 text-center">

              <p className="text-sm text-gray-400">
                ¿No tienes cuenta?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-[#C0B7E8] hover:text-white transition cursor-pointer font-semibold"
                >
                  Crear cuenta
                </span>
              </p>

              <p
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-[#8176AF] hover:text-[#C0B7E8] transition cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </p>

              <p
                onClick={() => navigate("/")}
                className="text-sm text-gray-500 hover:text-white transition cursor-pointer"
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