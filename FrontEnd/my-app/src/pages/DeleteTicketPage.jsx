import { useEffect, useState } from "react";
import {
  fetchTicketById,
  fetchMessagesByTicketId,
  fetchTickets
} from "../api/ticket_api";
import axios from "axios";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import "./DeleteTicketPage.css";



const DetailRow = ({ label, value }) => (
  <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
      {label}
    </p>
    <p className="text-sm font-medium text-slate-800 truncate">
      {value || "—"}
    </p>
  </div>
);

const formatDateTime = (value) => {
  if (!value) return "-";

  try {
    const date = new Date(value);
    const pad = (n, z = 2) => String(n).padStart(z, "0");

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      " " +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      "." +
      pad(date.getMilliseconds(), 3)
    );
  } catch {
    return value;
  }
};

export default function DeleteTicketPage() {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticketList, setTicketList] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [messages, setMessages] = useState([]);

 /* ===============================
     LOAD TICKET LIST (GLOBAL TABLE)
  =============================== */
  const loadTicketList = async () => {
    try {
      const res = await fetchTickets();
      setTicketList(res.data.content || []);
    } catch (err) {
      console.error(err);
    }
  };

  /* LOAD LIST FIRST TIME */
  useEffect(() => {
    loadTicketList();
  }, []);

  /* ===============================
     LOAD SINGLE TICKET + MESSAGE
  =============================== */
const loadTicketData = async () => {
  if (!ticketId) return;

  try {
    setLoading(true);
    setError("");

    const ticketRes = await fetchTicketById(ticketId);
    const msgRes = await fetchMessagesByTicketId(ticketId);

    setTicketData(ticketRes.data); // ✅ WAJIB
    setMessages(msgRes.data || []);
    setIsDirty(false);

  } catch (err) {
    console.error(err);
    setError("Ticket not found.");
    setTicketData(null);
  } finally {
    setLoading(false);
  }
};
  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!ticketData?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this ticket? This action cannot be undone!"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await axios.delete(
        `http://localhost:8713/ticket/${ticketData.id}`,
        { withCredentials: true }
      );

      alert("Ticket deleted successfully.");

      setTicketData(null);
      setTicketId("");
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete the ticket. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-6 flex justify-center items-start">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 rounded-2xl text-red-600">
            <FiTrash2 size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Delete Ticket
            </h1>
            <p className="text-sm text-slate-500">
              Search and permanently remove a ticket
            </p>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
            Search Ticket
          </h2>


      <SearchBar
        value={ticketId}
        onChange={setTicketId}
        onSearch={loadTicketData}
        tickets={ticketList}
      />

          {error && (
            <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              <FiAlertTriangle size={15} className="shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Ticket Detail */}
        {ticketData && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-[fadeIn_0.3s_ease]">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">
                  {ticketData.ticketNumber}
                </h2>
                <p className="text-xs text-slate-400">
                  ID: {ticketData.id}
                </p>
              </div>
              <span className="text-xs px-3 py-1 bg-red-50 text-red-500 border border-red-100 font-semibold rounded-full uppercase tracking-wide">
                {ticketData.stateName}
              </span>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailRow label="Subject" value={ticketData.subject} />
              <DetailRow label="Partner" value={ticketData.partner?.name} />
              <DetailRow label="Priority" value={ticketData.priority?.name} />
              <DetailRow label="Product" value={ticketData.product?.name} />
              <DetailRow label="Channel" value={ticketData.channel} />
              <DetailRow label="Created By" value={ticketData.picName} />
              <DetailRow
                label="Created At"
                value={formatDateTime(ticketData.createDateTime)}
              />
              <DetailRow
                label="Description"
                value={ticketData.descriptionText}
              />
            </div>

            <div className="px-6 pb-6 space-y-4">
              <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                <FiAlertTriangle
                  size={16}
                  className="text-amber-500 mt-0.5 shrink-0"
                />
                <p className="text-xs text-amber-700 font-medium">
                  This action is <strong>permanent and irreversible</strong>.
                </p>
              </div>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-xl hover:shadow-red-300 hover:-translate-y-0.5 active:scale-[0.98] focus:ring-4 focus:ring-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {deleting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiTrash2 size={16} />
                )}
                {deleting ? "Deleting..." : "DELETE PERMANENTLY"}
              </button>
            </div>
          </div>
        )}

        {/* Empty */}
        {!ticketData && !loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-dashed border-slate-200 p-12 text-center">
            <div className="text-4xl mb-4 opacity-40">🔍</div>
            <p className="text-slate-400 text-sm">
              Enter a Ticket ID above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}