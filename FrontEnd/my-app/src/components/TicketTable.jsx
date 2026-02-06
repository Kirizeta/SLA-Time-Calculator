import EditableDateTime from "./EditableDateTime";
import "./TicketTable.css"

const TicketDetail = ({ ticket, onChange, onSave, isDirty }) => {
  if (!ticket) {
    return <div className="card">No ticket selected</div>;
  }

  console.log("📦 Ticket detail:", ticket); // DEBUG

  return (
    <div className="card">
      <h2>Ticket Detail</h2>

      {/* READ ONLY */}
     <div className="excel-wrapper">
  <div className="excel-table">
    <Field label="ID" value={ticket.id} />
    <Field label="Ticket Number" value={ticket.ticketNumber} />
    <Field label="Partner ID" value={ticket.partnerId} />
    <Field label="Parent Company ID" value={ticket.parentCompanyId} />
    <Field label="Product ID" value={ticket.productId} />
    <Field label="Priority ID" value={ticket.priorityId} />
    <Field label="SLA ID" value={ticket.slaId} />
    <Field label="Response Time" value={ticket.responseTime} />
    <Field label="Resolution Time" value={ticket.resolutionTime} />
    <Field label="Countdown Condition" value={ticket.countdownCondition} />
    <Field label="Create Date" value={ticket.createDate} />
    <Field label="Close Time" value={ticket.closeTime} />
    <Field label="Close Date" value={ticket.closeDate} />
    <Field label="Response To Close" value={ticket.responseToClose} />
    <Field label="Start Res (No GMT)" value={ticket.startResolutionTimeNoGmt} />
    <Field label="End Res (No GMT)" value={ticket.endResolutionTimeNoGmt} />
  </div>
</div>


      <hr />

      {/* EDITABLE */}
      <h2>Edit Ticket</h2>
<div className="edit-section">
  <div className="edit-table">
    <EditableDateTime
      label="Create Date Time"
      value={ticket.createDateTime}
      onChange={(v) => onChange("createDateTime", v)}
    />

    <EditableDateTime
      label="Start Resolution Time"
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
      💾 Save
    </button>
  </div>
</div>
</div>
  );
};

const Field = ({ label, value }) => (
  <div className="field">
    <label>{label}</label>
    <input value={value ?? "-"} disabled />
  </div>
);

export default TicketDetail;
