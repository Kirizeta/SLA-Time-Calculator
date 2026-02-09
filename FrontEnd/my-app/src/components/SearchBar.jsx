import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  onSearch,
  tickets = []
}) => {

  // useEffect(() => {
  //   console.log("ISI TICKETS:", tickets);
  // }, [tickets]);

  /* ===== SELECT ===== */
  const handleSelect = (e) => {
    const selectedId = e.target.value
      ? Number(e.target.value)
      : "";

    onChange(selectedId);

    if (selectedId) {
      onSearch(selectedId);
    }
  };

  /* ===== INPUT ===== */
  const handleInput = (e) => {
    const val = e.target.value;

    if (val === "") {
      onChange("");
    } else {
      onChange(Number(val));
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">

        {/* ===== DROPDOWN ===== */}
        <select value={value || ""} onChange={handleSelect}>
          <option value="">-- Pilih Ticket --</option>

          {Array.isArray(tickets) &&
            [...tickets]
              .filter((t, i, arr) =>
                arr.findIndex(x => x.id === t.id) === i
              ) // ⭐ REMOVE DUPLICATE ID
              .sort((a, b) => b.id - a.id)
              .map((t, index) => (
                <option
                  key={`${t.id}-${index}`} // ⭐ FIX DUP KEY
                  value={t.id}
                >
                  {t.id} - {t.ticketNumber || "-"}
                </option>
              ))}
        </select>

        {/* ===== MANUAL INPUT ===== */}
        <input
          placeholder="Masukkan Ticket ID"
          value={value || ""}
          onChange={handleInput}
        />

        {/* ===== SEARCH BUTTON ===== */}
        <button onClick={() => value && onSearch(Number(value))}>
          Search
        </button>

      </div>
    </div>
  );
};

export default SearchBar;
