import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Mensajes from "../../components/Mensajes";
import Proyectos from "../../components/projectTable";
import { API } from "../../services/api";
import type { Project } from "../../types/typeProject";


import {
  MessageSquare,
  ShieldCheck,
  FolderDot,
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();


  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // 👇 contenido dinámico
  const [activePage, setActivePage] =
    useState("Dashboard");

  // 🔒 proteger ruta
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard color="skyblue"size={18} />,
    },
    {
      name: "Mensajes",
      icon: <MessageSquare color="red" size={18} />,
      count: Mensajes.length, // 👈 cantidad dinámica
    },
    {
      name: "Proyectos",
      icon: <FolderDot color="yellow" size={18} />,
    },
    {
      name: "Analytics",
      icon: <BarChart3 color="purple" size={18} />,
    },
    {
      name: "Configuración",
      icon: <Settings size={18} color="orange" />,
    },
  ];

  // 👇 render dinámico
  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <div>
            <h1 className="text-4xl font-black mb-4">
              Dashboard
            </h1>

            <p className="text-gray-400">
              Bienvenido al panel administrativo.
            </p>
          </div>
        );

      case "Mensajes":
        return (
          <div>
            <Mensajes />
          </div>
        );

      case "Proyectos":
        return (
          <div>
            <Proyectos
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        );

      case "Analytics":
        return (
          <div>
            <h1 className="text-4xl font-black mb-4">
              Analytics
            </h1>

            <p className="text-gray-400">
              Estadísticas y métricas.
            </p>
          </div>
        );

      case "Configuración":
        return (
          <div>
            <h1 className="text-4xl font-black mb-4">
              Configuración
            </h1>

            <p className="text-gray-400">
              Ajustes del sistema.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const [projects, setProjects] = useState<Project[]>([]);
const handleEdit = (project: Project) => {
  console.log(project);
};

const handleDelete = async (id?: string) => {
  if (!id) return;

  try {
    await API.delete(`/projects/${id}`);

    setProjects((prev) =>
      prev.filter((p) => p._id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};

const loadProjects = async () => {
  try {
    const res = await API.get("/projects");
    setProjects(res.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadProjects();
}, []);


  return (
    <>
      {/* NAV */}
      <div className=" bg-[#18122B]">
        <Header />
      </div>

      <div className="flex min-h-screen  bg-[#18122B] text-white overflow-hidden">
        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:relative z-50
            top-0 left-0 h-screen
            w-[280px]
            bg-[#151221]
            border-r border-white/10
            transition-transform duration-300
            ${sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* TOP */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-widest bg-gradient-to-r from-[#8176AF] to-[#03dffc] bg-clip-text text-transparent">
              PIXEL.DEV
            </h2>

            <button
              className="lg:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <X />
            </button>
          </div>

          {/* MENU */}
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 5 }}
                onClick={() => {
                  setActivePage(item.name);
                  setSidebarOpen(false);
                }}
                className={`
        w-full
        flex
        items-center
        justify-between
        px-4
        py-3
        rounded-2xl
        transition
        ${activePage === item.name
                    ? "bg-[#8176AF] text-white"
                    : "hover:bg-white/5 text-gray-300 hover:text-white"
                  }
      `}
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>

                {/* BADGE */}
                {item.count !== undefined && (
                  <span
                    className="
            min-w-[24px]
            h-6
            px-2
            flex
            items-center
            justify-center
            rounded-full
            bg-[#C0B7E8]
            text-[#1f1b2e]
            text-xs
            font-bold
          "
                  >
                    {item.count}
                  </span>
                )}
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* OVERLAY MOBILE */}
        {sidebarOpen && (
          <div
            onClick={() =>
              setSidebarOpen(false)
            }
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}

        {/* MAIN */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <header className="sticky top-0 z-30 bg-[#1f1b2e]/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden"
                onClick={() =>
                  setSidebarOpen(!sidebarOpen)
                }
              >
                <Menu />
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto mt-12">
            <motion.div
              key={activePage}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
                backdrop-blur-xl
                shadow-2xl
              "
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}