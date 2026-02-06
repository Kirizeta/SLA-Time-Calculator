import React, { useEffect } from "react";
import "./SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  onSearch,
  tickets = []
}) => {

  // ✅ console log isi tickets
  useEffect(() => {
    console.log("ISI TICKETS:", tickets);
    if (Array.isArray(tickets)) {
      tickets.forEach((t, i) =>
        console.log(`Ticket ${i}:`, t)
      );
    }
  }, [tickets]);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    onChange(selectedId);
    if (selectedId) onSearch(selectedId);
  };

  return (
    <div className="search-container">
        
      <div className="search-box">
           
        <select value={value} onChange={handleSelect}>
          <option value="">-- Pilih Ticket --</option>

        {Array.isArray(tickets) &&
         [...tickets] // 🔥 clone biar tidak mutasi state
           .sort((a, b) => b.id - a.id) // DESC
           .map((t) => (
             <option key={t.id} value={t.id}>
               {t.id} - {t.ticket_number || t.ticketNumber}
             </option>
           ))}

        </select>

        <input
          placeholder="Masukkan Ticket ID"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button onClick={() => onSearch()}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
