// import "./EditableDateTime.css";

const EditableDateTime = ({ label, value, onChange }) => {

  // ISO → SLA Display
  const toDisplay = (val) => {
    if (!val) return "";
    try {
      return val.replace("T", " ").substring(0, 23);
    } catch {
      return val;
    }
  };

  // SLA → ISO Save
  const toISO = (val) => {
    if (!val) return val;
    try {
      if (val.includes("T")) return val;
      return val.replace(" ", "T");
    } catch {
      return val;
    }
  };

  return (
  <div className="group grid grid-cols-[minmax(160px,200px)_1fr] border border-slate-200 border-b-0 last:border-b bg-white transition-colors hover:bg-blue-50/30">
      <label className="flex items-center px-4 py-2.5 bg-slate-50 border-r border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label}
      </label>
      <input
        type="text"
        placeholder="YYYY-MM-DD HH:mm:ss.SSS"
        value={toDisplay(value)}
        onChange={(e) => onChange(toISO(e.target.value))}
        className="px-4 py-2.5 text-sm text-slate-800 bg-transparent border-none outline-none focus:bg-blue-50 focus:ring-2 focus:ring-inset focus:ring-blue-400 transition-all placeholder:text-slate-300 w-full"
      />
    </div>
  );
};

export default EditableDateTime;