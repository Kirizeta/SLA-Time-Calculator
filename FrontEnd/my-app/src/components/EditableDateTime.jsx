import "./EditableDateTime.css";

const EditableDateTime = ({ label, value, onChange }) => (
<div className="edit-row">
    <label>{label}</label>
        <input
            type="datetime-local"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
        />
</div>
);


export default EditableDateTime;