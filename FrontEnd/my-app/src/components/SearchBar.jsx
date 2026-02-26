import React from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

/**
 * SearchBar
 * Ticket search via dropdown or manual ID input.
 */
const SearchBar = ({ value, onChange, onSearch, tickets = [] }) => {
  const uniqueTickets = Array.isArray(tickets)
    ? [...tickets]
        .filter((t, i, arr) => arr.findIndex((x) => x.id === t.id) === i)
        .sort((a, b) => b.id - a.id)
    : [];

  const handleSelect = (e) => {
    const selectedId = e.target.value ? Number(e.target.value) : "";
    onChange(selectedId);
    if (selectedId) onSearch(selectedId);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    onChange(val === "" ? "" : Number(val));
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-wrap items-center gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        {/* Dropdown */}
        <select
          value={value || ""}
          onChange={handleSelect}
          className="flex-1 min-w-[140px] px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
        >
          <option value="">— Pilih Ticket —</option>
          {uniqueTickets.map((t, index) => (
            <option key={`${t.id}-${index}`} value={t.id}>
              {t.id} – {t.ticketNumber || "-"}
            </option>
          ))}
        </select>

        {/* Manual Input */}
        <input
          type="number"
          placeholder="Masukkan Ticket ID"
          value={value || ""}
          onChange={handleInput}
          className="flex-1 min-w-[140px] px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-400"
        />

        {/* Search Button */}
        <button
          onClick={() => value && onSearch(Number(value))}
          disabled={!value}
          className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          <FiSearch size={15} /> Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
