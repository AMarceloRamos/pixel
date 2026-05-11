import type { Contact } from "../types/typeMenssage";

type Props = {
  mensajes: Contact[];
  onDelete: (id: string) => void;
  onReply: (
    id: string,
    response: string
  ) => void;
};

export default function Message({
  mensajes,
  onDelete,
  onReply,
}: Props) {
  return (
    <div className="space-y-4">
      {mensajes.map((m) => (
        <div
          key={m._id}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <h3>{m.name}</h3>
          <p>{m.email}</p>
          <p>{m.message}</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => onDelete(m._id)}
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              Eliminar
            </button>

            <button
              onClick={() =>
                onReply(m._id, "Respuesta")
              }
              className="px-4 py-2 bg-[#8176AF] rounded-lg"
            >
              Responder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}