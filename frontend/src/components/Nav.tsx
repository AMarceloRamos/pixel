import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const [open, setOpen] = useState(false);

  // ✅ Hook dentro del componente
  const { user } = useAuth();

  // ✅ Menu dentro del componente
  const menu = [
    { name: "Home", to: "/" },
    { name: "Acerca de mí", to: "/about" },
    { name: "Proyectos", to: "/projects" },
    { name: "Servicios", to: "/services" },
    { name: "Contacto", to: "/howTo" },
    { name: "FAQ", to: "/technologies" },

    // Solo visible para admin
    ...(user?.role === "admin"
      ? [{ name: "Admin", to: "/admin" }]
      : []),
  ];

  return (
    <>
      {/* DESKTOP */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-8">
          {menu.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.08 }}
            >
              <Link
                to={item.to}
                className="uppercase text-sm font-semibold tracking-wide text-white transition duration-300 hover:text-[#C0B7E8]"
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-[100] flex md:hidden flex-col justify-center gap-1.5"
      >
        <span
          className={`block h-[3px] w-7 bg-white transition-all duration-300 ${
            open ? "translate-y-[9px] rotate-45" : ""
          }`}
        />

        <span
          className={`block h-[3px] w-7 bg-white transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />

        <span
          className={`block h-[3px] w-7 bg-white transition-all duration-300 ${
            open ? "-translate-y-[9px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex md:hidden"
          >
            {/* OVERLAY */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* PANEL */}
            <motion.nav
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition={{ duration: 0.35 }}
              className="relative ml-auto flex h-full w-[300px] flex-col bg-[#1f1b2e] border-l border-white/10 p-8 shadow-2xl"
            >
              {/* TOP */}
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-black tracking-widest bg-gradient-to-r from-[#8176AF] to-[#03dffc] bg-clip-text text-transparent">
                  PIXEL.DEV
                </h2>

                <button
                  onClick={() => setOpen(false)}
                  className="text-white text-3xl leading-none hover:text-[#03dffc] transition"
                >
                  ×
                </button>
              </div>

              {/* LINKS */}
              <ul className="flex flex-col gap-6">
                {menu.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="text-lg font-semibold uppercase tracking-wide text-white transition duration-300 hover:text-[#03dffc]"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* FOOTER */}
              <div className="mt-auto pt-10">
                <p className="text-center text-sm text-gray-500">
                  © 2026 PIXEL.DEV
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;