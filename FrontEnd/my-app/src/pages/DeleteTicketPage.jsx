import { useState } from "react";
import axios from "axios";
import { FiSearch, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import "./DeleteTicketPage.css";

const DetailRow = ({ label, value }) => (
  <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
    <p className="text-sm font-medium text-slate-800 truncate">{value || "—"}</p>
  </div>
);
    const formatDateTime = (value) => {
    if (!value) return "-";

    try {
        const date = new Date(value);

        const pad = (n, z = 2) => String(n).padStart(z, "0");

        return (
        date.getFullYear() + "-" +
        pad(date.getMonth() + 1) + "-" +
        pad(date.getDate()) + " " +
        pad(date.getHours()) + ":" +
        pad(date.getMinutes()) + ":" +
        pad(date.getSeconds()) + "." +
        pad(date.getMilliseconds(), 3)
        );
    } catch {
        return value;
    }
    };
/**
 * DeleteTicketPage
 * Search for a ticket by ID and permanently delete it.
 */
export default function DeleteTicketPage() {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleSearch = async () => {
    if (!ticketId) {
      setError("Please enter a Ticket ID first.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`http://localhost:8713/ticket?id=${ticketId}`, {
        withCredentials: true,
      });
      setTicketData(res.data);
    } catch {
      setTicketData(null);
      setError("Ticket not found. Please check the ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this ticket? This action cannot be undone!"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await axios.delete(`http://localhost:8713/ticket/${ticketId}`, {
        withCredentials: true,
      });
      alert("Ticket deleted successfully.");
      setTicketData(null);
      setTicketId("");
    } catch {
      alert("Failed to delete the ticket. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-6 flex justify-center items-start">
      <div className="w-full max-w-2xl space-y-6">

        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 rounded-2xl text-red-600">
            <FiTrash2 size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Delete Ticket</h1>
            <p className="text-sm text-slate-500">Search and permanently remove a ticket</p>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
            Search Ticket
          </h2>

          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Enter Ticket ID"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all placeholder:text-slate-400"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-xl hover:shadow-md hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSearch size={15} />
              )}
              Search
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              <FiAlertTriangle size={15} className="shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Ticket Detail Card */}
        {ticketData && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-[fadeIn_0.3s_ease]">
            {/* Card header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">{ticketData.ticketNumber}</h2>
                <p className="text-xs text-slate-400">ID: {ticketData.id}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-red-50 text-red-500 border border-red-100 font-semibold rounded-full uppercase tracking-wide">
                {ticketData.stateName}
              </span>
            </div>

            {/* Detail grid */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailRow label="Subject" value={ticketData.subject} />
              <DetailRow label="Partner" value={ticketData.partner?.name} />
              <DetailRow label="Priority" value={ticketData.priority?.name} />
              <DetailRow label="Product" value={ticketData.product?.name} />
              <DetailRow label="Channel" value={ticketData.channel} />
              <DetailRow label="Created By" value={ticketData.picName} />
              <DetailRow label="Created At" value={formatDateTime(ticketData.createDateTime)} />
              <DetailRow label="Description" value={ticketData.descriptionText} />
            </div>

            {/* Warning + Delete */}
            <div className="px-6 pb-6 space-y-4">
              <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
                <FiAlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  This action is <strong>permanent and irreversible</strong>. All associated messages and data will also be deleted.
                </p>
              </div>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
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

        {/* Empty state */}
        {!ticketData && !loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-dashed border-slate-200 p-12 text-center">
            <div className="text-4xl mb-4 opacity-40">🔍</div>
            <p className="text-slate-400 text-sm">Enter a Ticket ID above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}