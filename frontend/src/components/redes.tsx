import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "Twitter",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
        <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6..." />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "/",
    icon: (
      <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
        <circle cx="15" cy="15" r="4" />
        <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10..." />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
        <path d="M22,0H2C0.895,0,0,0.895,0,2v20..." />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SocialIcons() {
  return (
    <div>
      <span className="text-base font-bold tracking-wide text-gray-900">
        Social
      </span>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex items-center mt-1 space-x-5"
      >
        {socialLinks.map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            variants={item}
            whileHover={{
              scale: 1.2,
              rotate: 5,
            }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-purple-400 transition-colors duration-300"
          >
            <motion.div
              whileHover={{
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {social.icon}
            </motion.div>
          </motion.a>
        ))}
      </motion.div>

      <p className="mt-2 text-sm text-gray-500">
        Follow Us on
      </p>
    </div>
  );
}