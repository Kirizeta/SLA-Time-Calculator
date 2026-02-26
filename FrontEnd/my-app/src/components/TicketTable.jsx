import EditableDateTime from "./EditableDateTime";
import { FiFileText, FiEdit3, FiSave } from "react-icons/fi";
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
/* ─────────────────────────────────────────
   Read-only Field Row
───────────────────────────────────────── */
const Field = ({ label, value }) => (
  <div className="grid grid-cols-[minmax(180px,220px)_1fr] border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 transition-colors group">
    <span className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50 border-r border-slate-100">
      {label}
    </span>
    <span className="px-4 py-2.5 text-sm text-slate-800 truncate">
      {value ?? "-"}
    </span>
  </div>
);

/* ─────────────────────────────────────────
   Section Header
───────────────────────────────────────── */
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
      <Icon size={18} />
    </div>
    <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
  </div>
);

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
const TicketDetail = ({ ticket, onChange, onSave, isDirty }) => {
  if (!ticket) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 text-center">
        <div className="text-5xl mb-4">🎫</div>
        <p className="text-slate-500 font-medium">Select a ticket to view details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Read-Only Detail Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <SectionHeader icon={FiFileText} title="Ticket Detail" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded-lg border border-blue-100">
              #{ticket.id}
            </span>
            <span className="text-xs font-semibold text-slate-500">{ticket.ticketNumber}</span>
          </div>
        </div>

        <div className="divide-y-0">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-100">
            {/* Left column */}
            <div className="divide-y divide-slate-100">
              <Field label="Company" value={ticket.partner?.name} />
              <Field label="PIC" value={ticket.user?.employee?.name ?? ticket.picName} />
              <Field label="Product" value={ticket.product?.name} />
              <Field label="Priority" value={ticket.priority?.name} />
              <Field label="SLA ID" value={ticket.slaId} />
              <Field label="Countdown Condition" value={ticket.countdownCondition} />
            </div>
            {/* Right column */}
            <div className="divide-y divide-slate-100">
              <Field label="Target Response Time" value={ticket.responseTime} />
              <Field label="Target Resolution Time" value={ticket.resolutionTime} />
              <Field label="Create Date" value={formatDateTime(ticket.createDate)} />
              <Field label="Close Time" value={formatDateTime(ticket.closeTime)} />
              <Field label="Close Date" value={ticket.closeDate} />
              <Field label="Response To Close" value={ticket.responseToClose} />
            </div>
          </div>

          {/* Bottom full-width rows */}
          <div className="border-t border-slate-100 divide-y divide-slate-100">
            <Field label="Start Resolution (No GMT)" value={formatDateTime(ticket.startResolutionTimeNoGmt)} />
            <Field label="End Resolution (No GMT)" value={formatDateTime(ticket.endResolutionTimeNoGmt)} />
          </div>
        </div>
      </div>

      {/* ── Edit Section Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <SectionHeader icon={FiEdit3} title="Edit Ticket Timestamps" />
        </div>

        <div className="p-6">
          <div className="max-w-lg rounded-xl overflow-hidden border border-slate-200">
            <EditableDateTime
              label="Create Date Time"
              value={ticket.createDateTime}
              onChange={(v) => onChange("createDateTime", v)}
            />
            <EditableDateTime
              label="First Response Time"
              value={ticket.startResolutionTime}
              onChange={(v) => onChange("startResolutionTime", v)}
            />
            <EditableDateTime
              label="End Resolution Time"
              value={ticket.endResolutionTime}
              onChange={(v) => onChange("endResolutionTime", v)}
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              disabled={!isDirty}
              onClick={onSave}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                isDirty
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <FiSave size={15} />
              Save Changes
            </button>
            {isDirty && (
              <span className="text-xs text-amber-500 font-medium">● Unsaved changes</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;