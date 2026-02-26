import { useState } from "react";
import axios from "axios";
import "./DeleteTicketPage.css";

export default function DeleteTicketPage() {

  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!ticketId) {
      setError("Masukkan ID dulu");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `http://localhost:8713/ticket?id=${ticketId}`,
        { withCredentials: true }
      );

      setTicketData(res.data);
    } catch {
      setTicketData(null);
      setError("Ticket tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Yakin mau hapus ticket ini? Ini permanent!"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8713/ticket/${ticketId}`,
        { withCredentials: true }
      );

      alert("Ticket berhasil dihapus");
      setTicketData(null);
      setTicketId("");

    } catch {
      alert("Gagal menghapus ticket");
    }
  };


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

  return (
    <div className="delete-container">

      <div className="delete-card">
        <h2>Delete Ticket</h2>

        <div className="search-section">
          <input
            type="number"
            placeholder="Masukkan Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {ticketData && (
          <div className="ticket-detail">

            <div className="detail-grid">
              <div><strong>ID:</strong> {ticketData.id}</div>
              <div><strong>Ticket No:</strong> {ticketData.ticketNumber}</div>
              <div><strong>Subject:</strong> {ticketData.subject}</div>
              <div><strong>Status:</strong> {ticketData.stateName}</div>
              <div><strong>Partner:</strong> {ticketData.partner?.name}</div>
              <div><strong>Priority:</strong> {ticketData.priority?.name}</div>
              <div><strong>Product:</strong> {ticketData.product?.name}</div>
              <div><strong>Channel:</strong> {ticketData.channel}</div>
              <div><strong>Created By:</strong> {ticketData.picName}</div>
              <div><strong>Created At:</strong> {formatDateTime(ticketData.createDateTime)}</div>
              <div><strong>Description:</strong> {ticketData.descriptionText}</div>
            </div>

            <button
              className="btn-danger"
              onClick={handleDelete}
            >
              DELETE PERMANENT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}