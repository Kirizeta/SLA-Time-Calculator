import "./EditableDateTime.css";

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
    <div className="edit-row">
      <label>{label}</label>
      <input
        type="text"
        placeholder="YYYY-MM-DD HH:mm:ss.SSS"
        value={toDisplay(value)}
        onChange={(e) => onChange(toISO(e.target.value))}
      />
    </div>
  );
};

export default EditableDateTime;