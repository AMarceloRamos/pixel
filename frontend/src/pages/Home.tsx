import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { useNavigate, Link } from "react-router-dom";

const HeroSection = () => {

  // const navigate = useNavigate();
  return (
    <>
      {/* MAIN */}
      <main className="relative overflow-hidden bg-[#1f1b2e] min-h-screen">

        {/* HEADER */}
        <Header />

        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dcya6gygz/image/upload/v1778039396/pixelEmprendiendo_tddprw.png"
            className="w-full h-full object-cover"
            alt="Background"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* GLOW */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#03dffc]/10 to-transparent"></div>
        </div>

     {/* CONTENT */}
<section className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8  mt-20">

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center max-w-4xl mx-auto"
  >
    
    {/* LABEL */}
    <span className="uppercase tracking-[6px] text-[#03dffc] text-sm font-semibold">
      Pixel Dev Studio
    </span>

    {/* TITLE */}
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-10 text-3xl md:text-5xl lg:text-5xl font-black leading-[1.1] text-white"
    >
      Construyendo Mundos

      <span className="block text-[#C0B7E8]">
        Digitales Modernos
      </span>
    </motion.h1>

    {/* DESCRIPTION */}
    {/* <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
    >
      Creamos experiencias web modernas, interfaces futuristas
      y soluciones digitales enfocadas en diseño y rendimiento.
    </motion.p> */}

    {/* STATS */}
    <div className="flex items-center justify-center flex-wrap gap-12 mt-20">

      <div>
        <h3 className="text-3xl font-black text-[#03dffc]">
          +20
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          Projects Completed
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-black text-[#ff03fc]">
          +4
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          Years Experience
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-black text-[#fcff03]">
          100%
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          Client Satisfaction
        </p>
      </div>

    </div>

  </motion.div>
</section>
      </main>


      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default HeroSection;