import EditableDateTime from "./EditableDateTime";
import "./TicketTable.css";

/* ================= DATE FORMATTER ================= */
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

/* ================= COMPONENT ================= */
const TicketDetail = ({ ticket, onChange, onSave, isDirty }) => {

  if (!ticket) {
    return <div className="card">No ticket selected</div>;
  }

  console.log("📦 Ticket detail:", ticket);

  return (
    <div className="card">
      <h2>Ticket Detail</h2>

      {/* ================= READ ONLY ================= */}
      <div className="excel-wrapper">
        <div className="excel-table">

          <Field label="ID" value={ticket.id} />
          <Field label="Ticket Number" value={ticket.ticketNumber} />

          <Field label="Company" value={ticket.partner?.name ?? "-"} />
          <Field label="PIC ID" value={ticket.user?.employee?.name ?? ticket.picName ?? "-"} />
          <Field label="Product" value={ticket.product?.name ?? "-"} />
          <Field label="Priority" value={ticket.priority?.name ?? "-"} />

          <Field label="SLA ID" value={ticket.slaId} />
          <Field label="Target Response Time" value={ticket.responseTime} />
          <Field label="Target Resolution Time" value={ticket.resolutionTime} />
          <Field label="Countdown Condition" value={ticket.countdownCondition} />

          <Field label="Create Date" value={formatDateTime(ticket.createDate)} />
          <Field label="Close Time" value={formatDateTime(ticket.closeTime)} />
          <Field label="Close Date" value={ticket.closeDate} />
          <Field label="Response To Close (Total Response Time)" value={ticket.responseToClose} />

          <Field label="Start Res (No GMT)" value={formatDateTime(ticket.startResolutionTimeNoGmt)} />
          <Field label="End Res (No GMT)" value={formatDateTime(ticket.endResolutionTimeNoGmt)} />

        </div>
      </div>

      <hr />

      {/* ================= EDIT SECTION ================= */}
      <h2>Edit Ticket</h2>

      <div className="edit-section">

        <div className="edit-table">

          {/* 🔥 IMPORTANT — RAW VALUE FOR SAVE */}
          <EditableDateTime
            label="Create Date Time"
            value={ticket.createDateTime}
            onChange={(v) => onChange("createDateTime", v)}
          />

          <EditableDateTime
            label="First Respon Time"
            value={ticket.startResolutionTime}
            onChange={(v) => onChange("startResolutionTime", v)}
          />

          <EditableDateTime
            label="End Resolution Time"
            value={ticket.endResolutionTime}
            onChange={(v) => onChange("endResolutionTime", v)}
          />

        </div>

        <div className="edit-actions">
          <button
            className="btn-save"
            disabled={!isDirty}
            onClick={onSave}
          >
             Save
          </button>
        </div>

      </div>
    </div>
  );
};

/* ================= FIELD COMPONENT ================= */
const Field = ({ label, value }) => (
  <div className="field">
    <label>{label}</label>
    <input value={value ?? "-"} disabled />
  </div>
);

export default TicketDetail;