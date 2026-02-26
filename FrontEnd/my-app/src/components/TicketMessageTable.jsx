import { useState } from "react";
import "./TicketMassegeTable.css";
import { FiSave, FiMessageSquare } from "react-icons/fi";

/* ===== FORMAT DATE ===== */
const formatTextDate = (val) => {
  if (!val) return "";

  try {
    const d = new Date(val);

    const pad = (n, z = 2) => String(n).padStart(z, "0");

    return (
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds()) +
      "." +
      pad(d.getMilliseconds(), 3)
    );
  } catch {
    return val;
  }
};

const TicketMessageTable = ({ messages = [], onSaveMessage }) => {
  const [editedRows, setEditedRows] = useState({});

  const handleChange = (id, field, value) => {
    setEditedRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const isRowDirty = (msg) => {
    const edited = editedRows[msg.id];
    if (!edited) return false;

    if (
      edited.createDate !== undefined &&
      edited.createDate !== formatTextDate(msg.createDate)
    )
      return true;

    if (
      edited.responseTime !== undefined &&
      edited.responseTime !== msg.responseTime
    )
      return true;

    if (
      edited.resolutionTime !== undefined &&
      edited.resolutionTime !== msg.resolutionTime
    )
      return true;

    return false;
  };

  const handleSave = (msg) => {
    const edited = editedRows[msg.id];
    if (!edited || !onSaveMessage) return;

    const payload = {
      createDate:
        edited.createDate !== undefined
          ? `${edited.createDate.split(" ")[0]}T${edited.createDate.split(" ")[1]}`
          : msg.createDate,

      responseTime: edited.responseTime ?? msg.responseTime,

      resolutionTime: edited.resolutionTime ?? msg.resolutionTime,
    };

    onSaveMessage(msg.id, payload);

    setEditedRows((prev) => {
      const copy = { ...prev };
      delete copy[msg.id];
      return copy;
    });
  };

 return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-6">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
        <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
          <FiMessageSquare size={18} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Ticket Messages</h2>
        <span className="ml-auto text-xs text-slate-400 font-medium">{messages.length} records</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
              {["ID", "Create Date", "Response Time", "Resolution Time", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <FiMessageSquare size={32} className="opacity-30" />
                    <p className="text-sm">No messages found</p>
                  </div>
                </td>
              </tr>
            ) : (
              messages.map((m, index) => {
                const edited = editedRows[m.id] || {};
                const dirty = isRowDirty(m);

                return (
                  <tr
                    key={`${m.id}-${index}`}
                    className="border-b border-slate-50 even:bg-slate-50/60 hover:bg-blue-50/40 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-500 font-semibold">{m.id}</td>

                    <td className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="YYYY-MM-DD HH:mm:ss.SSS"
                        value={edited.createDate ?? formatTextDate(m.createDate)}
                        onChange={(e) => handleChange(m.id, "createDate", e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-300"
                      />
                    </td>

                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.0001"
                        value={edited.responseTime ?? m.responseTime ?? ""}
                        onChange={(e) => handleChange(m.id, "responseTime", Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                    </td>

                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.0001"
                        value={edited.resolutionTime ?? m.resolutionTime ?? ""}
                        onChange={(e) => handleChange(m.id, "resolutionTime", Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                    </td>

                    <td className="px-4 py-2">
                      <button
                        disabled={!dirty}
                        onClick={() => handleSave(m)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          dirty
                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-md hover:-translate-y-0.5"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <FiSave size={12} /> Save
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketMessageTable;
