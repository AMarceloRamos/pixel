import { motion } from "framer-motion";
import Nav from "../components/Nav";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#18122B] border-t-4 border-black">

      {/* EFECTO PIXEL */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent, transparent 20px, #000 20px, #000 21px)",
        }}
      ></div>

      {/* INFO BAR */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-6 pt-14">
        

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 rounded-[40px] py-6 px-8 bg-gradient-to-r from-[#211E2E] via-[#3A3456] to-[#211E2E]"
        >
          <div className="text-white text-center md:text-left">
            <h2 className="text-xl font-bold">Pay Us a Visit</h2>
            <p className="text-sm mt-2">La Florida, Santiago</p>
          </div>

          <div className="text-white text-center md:text-left">
            <h2 className="text-xl font-bold">Contácto</h2>
            <p className="text-sm mt-2">+(56)987829030</p>
          </div>

          <div className="text-white text-center md:text-left">
            <h2 className="text-xl font-bold">Email</h2>
            <p className="text-sm mt-2">contact@hydra.com</p>
          </div>
        </motion.div>
        
            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8 }}

              className="relative flex justify-center"
            >
              {/* GLOW */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-[#03dffc]/20 blur-3xl"></div>

              {/* IMAGE CONTAINER */}
              <div className="relative p-5 rounded-[40px] bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl mt-20">

        <a href="/ho">
                <motion.img
                  src="https://res.cloudinary.com/dcya6gygz/image/upload/v1778039393/logo_t8j3fm.png"
                  alt="VR"
                  className="relative max-w-[150px] w-full drop-shadow-[0_0_30px_rgba(3,223,252,0.35)]"
                  whileHover={{
                    scale: 1.04,
                    rotate: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                  }}
                />
                </a>
              </div>
            </motion.div>

      </div>

      {/* FOOTER CONTENT */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-8 py-8">
         <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* LOGO */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="flex items-center gap-3"
                >
                    <a href="/" className="pixel-font text-sm sm:text-base tracking-tighter pt-5" style={{color: "#03dffc", fontSize:"18px"}}>
                        PIXEL<span className="text-white dark-text">.DEV</span>
                    </a>
                </motion.div>s
                </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
         

          <p className="text-xs text-white text-center sm:text-left tracking-wider">
            © 2026 PIXEL.DEV // ALL RIGHTS RESERVED
          </p>

             <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-5 flex items-center justify-between">

                {/* NAV */}
                <Nav />

            </div>
        
          {/* BACK TO TOP */}
          {/* <a
            href="/"
            className="group flex items-center gap-2 px-5 py-3 bg-[#03dffc] border-4 border-black transition-all duration-200 hover:-translate-y-1"
            style={{
              boxShadow: "4px 4px 0 #000",
            }}
          >
            <span className="text-xs font-bold text-black tracking-widest">
              BACK TO TOP
            </span>
          </a> */}

        </div>
      </div>
    </footer>
  );
};

export default Footer;