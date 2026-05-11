import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const skills = [
  {
    name: "FRONTEND",
    percent: "80%",
    width: "95%",
    color: "#03dffc",
  },
  {
    name: "BACKEND",
    percent: "65%",
    width: "85%",
    color: "#ff03fc",
  },
  {
    name: "UI/UX DESIGN",
    percent: "70%",
    width: "90%",
    color: "#fcff03",
  },
];

export default function About() {
  return (
    <>
      {/* HEADER */}
      <div className="bg-[#302c42]">
        <Header />
      </div>

      {/* MAIN */}
      <main className="min-h-screen  bg-[#18122B] text-white overflow-hidden">

        {/* HERO */}
        <section className="max-w-[1300px] mx-auto px-4 md:px-8 pt-36 pb-20 mt-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="uppercase tracking-[4px] text-[#03dffc] text-sm font-semibold">
                Acerca de mi
              </span>

              <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
                Hola, soy un
                <span className="text-[#03dffc]"> Full Stack </span>
                Developer
              </h1>

              <p className="mt-6 text-gray-300 leading-relaxed">
                Me apasiona crear aplicaciones web modernas con
                interfaces interactivas, sistemas backend escalables y
                experiencias de usuario optimizadas. Disfruto creando productos
                que combinan diseño, rendimiento y tecnología.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-5 mt-10">

                <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#8F00FF] px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#4C2882]">
                  Follow

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.9}
                    stroke="currentColor"
                    className="w-5 h-5 text-pink-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 9V5a1 1 0 1 1 2 0v4m-2 0V4a1 1 0 1 0-2 0v5m2 0h2m0 0V6a1 1 0 1 1 2 0v5m-8-1V9a1 1 0 1 0-2 0v5.5A4.5 4.5 0 0 0 10.5 19H15a5 5 0 0 0 5-5v-3a1 1 0 1 0-2 0v1"
                    />
                  </svg>
                </button>

                <button className="flex items-center justify-center gap-2 rounded-2xl bg-white text-black px-8 py-4 font-semibold transition-all duration-300 hover:scale-105">
                  Resume

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>

              </div>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative">

                <div className="absolute inset-0 rounded-full bg-[#03dffc]/20 blur-3xl"></div>

                <img
                  src="https://avatars.githubusercontent.com/u/000000?v=4"
                  alt="Profile"
                  className="relative w-72 h-72 md:w-[420px] md:h-[420px] object-cover rounded-full border-8 border-[#03dffc]/30 shadow-2xl"
                />
              </div>
            </motion.div>

          </div>

          {/* SKILLS */}
          <motion.section
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24"
          >
            <div className="flex items-center gap-4 mb-10">

              <div className="w-14 h-[4px] bg-[#03dffc]"></div>

              <h2 className="text-3xl font-bold">
                My Skills
              </h2>
            </div>

            <div className="space-y-8">

              {skills.map((skill, index) => (
                <div key={index}>

                  <div className="flex justify-between mb-3">
                    <span className="font-semibold tracking-wide">
                      {skill.name}
                    </span>

                    <span
                      className="text-sm font-bold"
                      style={{ color: skill.color }}
                    >
                      {skill.percent}
                    </span>
                  </div>

                  <div className="h-6 bg-black border-4 border-black overflow-hidden rounded-md">

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full"
                      style={{
                        backgroundColor: skill.color,
                        backgroundImage:
                          "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.2) 8px, rgba(0,0,0,0.2) 10px)",
                      }}
                    ></motion.div>

                  </div>

                </div>
              ))}

            </div>
          </motion.section>

        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}