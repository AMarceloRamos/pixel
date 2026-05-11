import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import { API } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Project {
  _id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  url?: string;
  tecnologias?: string[];
}

export default function GalleryProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 📌 Obtener proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 📌 Modal
  const closeGallery = () => setSelected(null);

  const nextImage = () => {
    if (selected === null) return;

    setSelected((prev) =>
      prev === projects.length - 1 ? 0 : (prev ?? 0) + 1
    );
  };

  const prevImage = () => {
    if (selected === null) return;

    setSelected((prev) =>
      prev === 0 ? projects.length - 1 : (prev ?? 0) - 1
    );
  };

  // 📌 Teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selected === null) return;

      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, projects]);

  return (
    <>
      {/* HEADER */}
      <div className="bg-[#18122B]">
        <Header />
      </div>

      <main className="relative overflow-hidden bg-[#18122B] min-h-screen text-white">

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden ">
          <div className="absolute w-[500px] h-[500px] bg-[#8176AF]/20 blur-[120px] rounded-full top-[-150px] left-[-100px]" />

          <div className="absolute w-[500px] h-[500px] bg-cyan-400/10 blur-[120px] rounded-full bottom-[-150px] right-[-100px]" />
        </div>

        {/* HERO */}
        <section className="relative z-10 px-6 pt-28 pb-20 mt-10">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-5xl mx-auto text-center"
          >

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">

              <Sparkles className="w-4 h-4 text-[#C0B7E8]" />

              <span className="text-sm text-[#C0B7E8] tracking-wider uppercase">
                Portfolio
              </span>

            </div>

            <h1 className="text-5xl md:text-5xl font-black leading-tight">

              <span className="text-white">
                Proyectos
              </span>

              <br />

              <span className="bg-gradient-to-r from-[#8176AF] via-[#C0B7E8] to-cyan-300 text-transparent bg-clip-text">
                Creativos & Modernos
              </span>

            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto mt-8 text-ms leading-relaxed">
              Una colección de experiencias digitales desarrolladas con
              tecnologías modernas, animaciones fluidas y diseños enfocados en
              la experiencia visual.
            </p>

          </motion.div>

        </section>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center items-center py-40">
            <div className="w-16 h-16 border-4 border-[#8176AF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* GRID */}
        {!loading && (
          <section className="relative z-10 px-6 pb-28">

            <div className="max-w-7xl mx-auto">

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 ">
                  {/* GLOW */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-[#03dffc]/20 blur-3xl"></div>

                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="group bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl"
                  >

                    <div
                      onClick={() => setSelected(index)}
                      className="
                        relative
                        overflow-hidden
                        rounded-[30px]
                        bg-white/5
                        border
                        border-white/10
                        backdrop-blur-xl
                        cursor-pointer
                        
                      "
                    >

                      {/* IMAGE */}
                      <div className="overflow-hidden bg-[#03dffc]/20 ">

                        <img
                          src={project.imagen}
                          alt={project.titulo}
                          className="
                            w-full
                            h-[420px]
                            object-cover
                            transition
                            duration-700
                            group-hover:scale-110
                          "
                        />

                      </div>

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#18122B] via-black/20 to-transparent" />

                      {/* GLOW */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-t from-[#8176AF]/20 to-transparent" />

                      {/* CONTENT */}
                      <div className="absolute bottom-0 p-7 w-full">

                        <div className="flex items-center justify-between mb-4">

                          <span className="
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            bg-white/10
                            border
                            border-white/10
                            text-[#C0B7E8]
                          ">
                            Proyecto
                          </span>

                          <div className="
                            w-10
                            h-10
                            rounded-full
                            bg-white/10
                            flex
                            items-center
                            justify-center
                            backdrop-blur-md
                          ">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>

                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3">
                          {project.titulo}
                        </h2>

                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                          {project.descripcion}
                        </p>

                      </div>

                    </div>

                  </motion.div>
                ))}

              </div>

            </div>

          </section>
        )}

        {/* MODAL */}
        <AnimatePresence>

          {selected !== null && projects[selected] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                z-50
                bg-black/90
                backdrop-blur-md
                flex
                items-center
                justify-center
                p-4
              "
              onClick={closeGallery}
            >

              {/* CLOSE */}
              <button
                onClick={closeGallery}
                className="
                  absolute
                  top-6
                  right-6
                  z-50
                  w-12
                  h-12
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* PREV */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="
                  absolute
                  left-5
                  md:left-10
                  z-50
                  w-14
                  h-14
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>

              {/* NEXT */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="
                  absolute
                  right-5
                  md:right-10
                  z-50
                  w-14
                  h-14
                  rounded-full
                  bg-white/10
                  hover:bg-white/20
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>

              {/* CARD */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
                className="
                  max-w-6xl
                  w-full
                  overflow-hidden
                  rounded-[32px]
                  bg-[#211B36]
                  border
                  border-white/10
                  shadow-2xl
                "
              >

                <div className="grid lg:grid-cols-2">

                  {/* IMAGE */}
                  <div className="relative h-full">

                    <img
                      src={projects[selected].imagen}
                      alt={projects[selected].titulo}
                      className="
                        w-full
                        h-[300px]
                        lg:h-[700px]
                        object-cover
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#211B36] to-transparent lg:hidden" />

                  </div>

                  {/* CONTENT */}
                  <div className="p-8 lg:p-14 flex flex-col justify-center">

                    <span className="
                      w-fit
                      px-4
                      py-2
                      rounded-full
                      bg-[#8176AF]/20
                      text-[#C0B7E8]
                      text-sm
                      mb-6
                    ">
                      Proyecto destacado
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                      {projects[selected].titulo}
                    </h2>

                    <p className="text-gray-300 mt-8 leading-relaxed text-lg">
                      {projects[selected].descripcion}
                    </p>

                    {/* TECH */}
                    <div className="flex flex-wrap gap-3 mt-10">

                      {projects[selected].tecnologias?.map((tech, i) => (
                        <span
                          key={i}
                          className="
                            px-4
                            py-2
                            rounded-full
                            bg-white/5
                            border
                            border-white/10
                            text-sm
                            text-gray-300
                          "
                        >
                          {tech}
                        </span>
                      ))}

                    </div>

                    {/* BUTTON */}
                    {projects[selected].url && (
                      <a
                        href={projects[selected].url}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          mt-10
                          w-fit
                          px-7
                          py-4
                          rounded-2xl
                          bg-gradient-to-r
                          from-[#8176AF]
                          to-[#C0B7E8]
                          text-[#18122B]
                          font-bold
                          flex
                          items-center
                          gap-3
                          hover:scale-105
                          transition
                        "
                      >
                        Ver proyecto
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}

                  </div>

                </div>

              </motion.div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      <Footer />
    </>
  );
}