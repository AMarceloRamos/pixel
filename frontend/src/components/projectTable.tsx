import { motion } from "framer-motion";
import type { Project } from "../types/typeProject";
import {
  Pencil,
  Trash2,
  FolderKanban,
  ExternalLink,
} from "lucide-react";

type Props = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id?: string) => void;
};

const ProjectTable = ({
  projects,
  onEdit,
  onDelete,
}: Props) => {
  return (
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
            Gestión de proyectos
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Administra los proyectos de tu
            portafolio.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-[#8176AF]/20 border border-[#8176AF]/20 text-[#C0B7E8] text-sm font-semibold">
          {projects.length} proyectos
        </div>
      </div>

      {/* EMPTY */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <FolderKanban className="w-14 h-14 text-[#8176AF]" />

          <p className="text-gray-400 mt-4 text-lg">
            No hay proyectos disponibles
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* HEAD */}
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Proyecto
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Tecnologías
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Fecha
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  URL
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  Acciones
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {projects.map((p, index) => (
                <motion.tr
                  key={p._id}
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
                  {/* PROYECTO */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.imagen}
                        alt={p.titulo}
                        className="
                          w-20
                          h-14
                          object-cover
                          rounded-xl
                          border
                          border-white/10
                        "
                      />

                      <div>
                        <p className="font-semibold text-white">
                          {p.titulo}
                        </p>

                        <p className="text-sm text-gray-400 line-clamp-1">
                          {p.descripcion}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* TECNOLOGIAS */}
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {p.tecnologias?.map(
                        (tech, i) => (
                          <span
                            key={i}
                            className="
                              px-3
                              py-1
                              rounded-full
                              bg-[#8176AF]/20
                              text-[#C0B7E8]
                              text-xs
                              font-semibold
                            "
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </td>

                  {/* FECHA */}
                  <td className="px-6 py-5 text-gray-300">
                    {p.fecha}
                  </td>

                  {/* URL */}
                  <td className="px-6 py-5">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-[#C0B7E8]
                        hover:text-white
                        transition
                      "
                    >
                      <ExternalLink size={16} />
                      Ver proyecto
                    </a>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => onEdit(p)}
                        className="
                          flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          bg-[#8176AF]
                          hover:bg-[#9287c5]
                          text-sm
                          font-semibold
                          transition
                        "
                      >
                        <Pencil size={16} />
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          onDelete(p._id)
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          bg-red-500/10
                          hover:bg-red-500/20
                          text-red-400
                          text-sm
                          font-semibold
                          transition
                        "
                      >
                        <Trash2 size={16} />
                        Eliminar
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
  );
};

export default ProjectTable;