import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 w-full z-50"
    >
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
        
        {/* LOGO */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex items-center gap-3"
        >
          <Link
            to="/"
            className="pixel-font tracking-tighter"
            style={{
              color: "#03dffc",
              fontSize: "24px",
            }}
          >
            PIXEL
            <span className="text-white">
              .DEV
            </span>
          </Link>
        </motion.div>

        {/* RIGHT */}
        <div className=" flex items-center justify-between gap-3 md:gap-19">
          <div className=" flex items-center justify-between"></div>
          {/* NAV */}
          <Nav />
          <div/>

        {/* AUTH */}
<div className="flex items-center gap-2 md:gap-3">
  {!user ? (
    <>
      {/* LOGIN */}
      <Link
        to="/login"
        className="rounded-xl border border-white/10 bg-white/10 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
      >
        Login
      </Link>

      {/* REGISTER */}
      <Link
        to="/register"
        className="rounded-xl bg-gradient-to-r from-[#8176AF] to-[#03dffc] px-3 md:px-4 py-2 text-xs md:text-sm font-bold text-white transition hover:scale-105"
      >
        Registro
      </Link>
    </>
  ) : (
    <>
      {/* USER CARD */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 sm:px-3 md:px-4 py-2 backdrop-blur-md"
      >
        {/* AVATAR */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#8176AF] to-[#03dffc] text-xs font-black text-white shadow-lg">
          {user.userName?.charAt(0).toUpperCase()}
        </div>

        {/* INFO */}
        <div className="hidden sm:block">
          <p className="text-[10px] md:text-xs text-gray-400">
            Conectado
          </p>

          <h3 className="text-xs md:text-sm font-bold text-white leading-none">
            {user.userName}
          </h3>

          <span className="text-[10px] md:text-xs font-semibold text-[#03dffc] uppercase">
            {user.role}
          </span>
        </div>
      </motion.div>

      {/* LOGOUT */}
      <button
        onClick={logout}

      >
        <span className="hidden sm:inline text-3xl" title="cerrar sesion ">
           🔒
        </span>

        <span className="sm:hidden text-7x1">
          🔒
        </span>
      </button>
    </>
  )}
</div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;