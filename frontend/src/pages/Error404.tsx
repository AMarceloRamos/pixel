import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";

type Star = {
  id: number;
  left: string;
  top: string;
  size: string;
  duration: string;
};

type Meteor = {
  id: number;
  top: string;
};

export default function NotFound() {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  // STARS
  useEffect(() => {
    const newStars: Star[] = Array.from({
      length: 120,
    }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
    }));

    setStars(newStars);
  }, []);

  // METEORS
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();

      setMeteors((prev) => [
        ...prev,
        {
          id,
          top: `${Math.random() * 70}%`,
        },
      ]);

      setTimeout(() => {
        setMeteors((prev) =>
          prev.filter((m) => m.id !== id)
        );
      }, 2000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // SPACE EFFECT
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        document.body.style.background = `hsl(${
          Math.random() * 360
        },50%,12%)`;

        setTimeout(() => {
          document.body.style.background = "";
        }, 400);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () =>
      document.removeEventListener(
        "keydown",
        handleKey
      );
  }, []);

  return (
    <>
      {/* MAIN */}
      <main className="relative min-h-screen overflow-hidden bg-[#0d0b14]">

        {/* HEADER */}
        <Header />

        {/* BACKGROUND */}
        <div className="absolute inset-0">

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f1b2e] via-[#0d0b14] to-black"></div>

          {/* GLOW */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#03dffc]/10 blur-3xl"></div>

          {/* STARS */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white opacity-70 animate-pulse"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDuration: star.duration,
              }}
            />
          ))}

          {/* METEORS */}
          {meteors.map((meteor) => (
            <div
              key={meteor.id}
              className="absolute h-[2px] w-[180px] rotate-[-25deg] bg-gradient-to-r from-white to-transparent animate-pulse"
              style={{
                top: meteor.top,
                left: "100%",
              }}
            />
          ))}
        </div>

        {/* CONTENT */}
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center mt-20">

          {/* UFO */}
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="w-40 h-40"
                viewBox="0 0 100 100"
              >
                <ellipse
                  cx="50"
                  cy="40"
                  rx="30"
                  ry="10"
                  fill="#03dffc"
                />

                <circle
                  cx="50"
                  cy="35"
                  r="20"
                  fill="#8176AF"
                />

                <ellipse
                  cx="50"
                  cy="30"
                  rx="10"
                  ry="5"
                  fill="#ffffff"
                />

                <path
                  d="M40 40 L30 80 L70 80 L60 40"
                  fill="rgba(3,223,252,0.18)"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-black text-white"
          >
            4
            <span className="inline-block text-[#03dffc] animate-spin">
              0
            </span>
            4
          </motion.h1>

          {/* TEXT */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-3xl md:text-5xl font-bold text-white"
          >
            Lost In Space
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed"
          >
            The page you're looking for has drifted into
            another galaxy. Maybe it never existed... or
            maybe aliens took it 👽
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex flex-col sm:flex-row gap-5"
          >
            <a
              href="/"
              className="rounded-2xl bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] px-8 py-4 font-bold uppercase tracking-wide text-[#1f1b2e] transition-all duration-300 hover:scale-105"
            >
              Return Home
            </a>

            <button
              onClick={() => window.history.back()}
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              Go Back
            </button>
          </motion.div>

          {/* HINT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
            className="mt-12"
          >
            <p className="text-sm tracking-[4px] uppercase text-gray-500">
              Press SPACE 🚀
            </p>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}