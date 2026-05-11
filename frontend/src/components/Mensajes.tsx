import { useEffect, useState } from "react";
import { API } from "../services/api";
import type { Contact } from "../types/typeMenssage";
import { motion } from "framer-motion";
import {
  Loader2
} from "lucide-react";

export default function Mensajes() {
  const [mensajes, setMensajes] = useState<
    Contact[]
  >([]);

  const [loading, setLoading] = useState(true);
  // 📥 cargar mensajes
  const loadMensajes = async () => {
    try {
      const res = await API.get("/contact");

      setMensajes(res.data);
    } catch (error) {
      console.error(
        "Error cargando mensajes:",
        error
      );

      setMensajes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMensajes();
  }, []);

  // 🗑️ eliminar
  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este mensaje?"))
      return;

    try {
      await API.delete(`/contact/${id}`);

      setMensajes((prev) =>
        prev.filter((m) => m._id !== id)
      );
    } catch (error) {
      console.error(
        "Error eliminando:",
        error
      );
    }
  };

  // 📩 responder
  const handleReply = async (
    id: string,
    response: string
  ) => {
    try {
      const { data } = await API.post(
        `/contact/reply/${id}`,
        { response }
      );

      setMensajes((prev) =>
        prev.map((m) =>
          m._id === id
            ? { ...m, responded: true }
            : m
        )
      );

      alert(data.msg);
    } catch (error) {
      console.error(
        "Error respondiendo:",
        error
      );

      alert("Error al responder ❌");
    }
  };

  return (
    <>
    
          {/* CONTENT */}
          <main className="flex-1 p-6 md:p-1 overflow-y-auto">
          

          {/* TABLE */}
<motion.section
  initial={{
    opacity: 0,
    y: 40,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  className="
    bg-[#151221]
    border border-white/10
    rounded-3xl
    backdrop-blur-xl
    shadow-2xl
    overflow-hidden
  "
>
  {/* HEADER */}
  <div className="flex items-center justify-between p-6 border-b border-white/10">
    <div>
      <h2 className="text-2xl font-bold text-white">
        Bandeja de entrada
      </h2>

      <p className="text-gray-400 text-sm mt-1">
        Administra mensajes recibidos desde el
        portafolio.
      </p>
    </div>

    <div className="px-4 py-2 rounded-2xl bg-[#8176AF]/20 border border-[#8176AF]/20 text-[#C0B7E8] text-sm font-semibold">
      {mensajes.length} mensajes
    </div>
  </div>

  {/* CONTENT */}
  {loading ? (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-10 h-10 animate-spin text-[#C0B7E8]" />

      <p className="text-gray-400 mt-4">
        Cargando mensajes...
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* HEAD */}
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
              Nombre
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
              Email
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
              Mensaje
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
              Estado
            </th>

            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">
              Acciones
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {mensajes.map((m, index) => (
            <motion.tr
              key={m._id}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.03,
              }}
              className="
                border-b
                border-white/5
                hover:bg-white/5
                transition
              "
            >
              {/* NAME */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-xl bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] flex items-center justify-center font-bold text-sm">
                    {m.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      {m.name}
                    </p>
                  </div>
                </div>
              </td>

              {/* EMAIL */}
              <td className="px-6 py-5 text-gray-300">
                {m.email}
              </td>

              {/* MESSAGE */}
              <td className="px-6 py-5 text-gray-400 max-w-[350px] truncate">
                {m.message}
              </td>

              {/* STATUS */}
              <td className="px-6 py-5">
                {m.responded ? (
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                    Respondido
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold">
                    Pendiente
                  </span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() =>
                      handleReply(
                        m._id,
                        "Gracias por contactarte 🙌"
                      )
                    }
                    className="
                      px-3
                      py-1
                      rounded-xl
                      bg-[#8176AF]
                      hover:bg-[#9287c5]
                      text-sm
                      font-semibold
                      transition
                    "
                  >
                    Responder
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(m._id)
                    }
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500/100
                      hover:bg-red-500/50
                      text-white-400
                      text-5x1
                      font-semibold
                      transition
                    "
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</motion.section>
          </main>
    </>
  );
}
