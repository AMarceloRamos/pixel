import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "./contact/contact.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const revealRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");

try {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );

      if (res.ok) {
        setSuccess("Mensaje enviado correctamente ✅");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setSuccess("Error al enviar ❌");
      }
    } catch (error) {
      setSuccess("Error del servidor ❌");
    }

    setLoading(false);
  };

  // REVEAL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      if (!revealRef.current) return;

      const top =
        revealRef.current.getBoundingClientRect().top;

      const windowHeight = window.innerHeight;

      if (top < windowHeight - 100) {
        setActive(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      {/* MAIN */}
      <main className="relative min-h-screen overflow-hidden bg-[#18122B]">

        {/* HEADER */}
        <Header />

        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#03dffc]/10 to-transparent"></div>
        </div>

        {/* CONTENT */}
        <section className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-8 pt-36 pb-24">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: active ? 1 : 0,
              y: active ? 0 : 40,
            }}
            transition={{ duration: 0.8 }}
            ref={revealRef}
            className="max-w-3xl mx-auto"
          >
            {/* CARD */}
            <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">

              {/* TOP */}
              <div className="p-8 md:p-12 border-b border-white/10">

                <span className="uppercase tracking-[5px] text-[#03dffc] text-sm font-semibold">
                  Contacto
                </span>

                <h1 className="mt-4 text-4xl md:text-5xl font-black text-white">
                  Trabajemos juntos
                </h1>

                <p className="mt-5 text-gray-300 leading-relaxed">
                  ¿Tienes un proyecto en mente o quieres colaborar?

                  Envíame un mensaje y creemos algo
                  increíble juntos.
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-12 space-y-8"
              >
                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-3 text-sm font-medium text-gray-300"
                    >
                      Nombre
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tú nombre"
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#03dffc]"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-3 text-sm font-medium text-gray-300"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="correo@example.com"
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#03dffc]"
                    />
                  </div>
                </div>

                {/* SUBJECT */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-3 text-sm font-medium text-gray-300"
                  >
                    Mótivo
                  </label>

                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="consulta"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#03dffc]"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-3 text-sm font-medium text-gray-300"
                  >
                    Mensaje
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aqui..."
                    className="w-full h-40 resize-none rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-[#03dffc]"
                  />
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] px-6 py-4 font-bold uppercase tracking-wide text-[#1f1b2e] shadow-2xl"
                >
                  {loading
                    ? "Enviando..."
                    : "Enviar mensaje"}
                </motion.button>

                {/* SUCCESS */}
                {success && (
                  <p className="text-center text-sm text-white">
                    {success}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
