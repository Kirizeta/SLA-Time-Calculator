import { useState } from "react";

/* ===== FORMAT DATE ===== */
const formatTextDate = (val) => {
  if (!val) return "";

  try {
    const d = new Date(val);

    const pad = (n, z = 2) => String(n).padStart(z, "0");

    return (
      d.getFullYear() + "-" +
      pad(d.getMonth() + 1) + "-" +
      pad(d.getDate()) + " " +
      pad(d.getHours()) + ":" +
      pad(d.getMinutes()) + ":" +
      pad(d.getSeconds()) + "." +
      pad(d.getMilliseconds(), 3)
    );
  } catch {
    return val;
  }
};



const TicketMessageTable = ({ messages = [], onSaveMessage }) => {

  const [editedRows, setEditedRows] = useState({});

  /* ===== CHANGE ===== */
  const handleChange = (id, field, value) => {
    setEditedRows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  /* ===== SAVE ===== */
  const handleSave = (msg) => {
    const edited = editedRows[msg.id];
    if (!edited || !onSaveMessage) return;

    const payload = {
      createDate: edited.createDate !== undefined ? `${edited.createDate.split(" ")[0]}T${edited.createDate.split(" ")[1]}` : msg.createDate,
      responseTime: edited.responseTime ?? msg.responseTime,
      resolutionTime: edited.resolutionTime ?? msg.resolutionTime
    };

    onSaveMessage(msg.id, payload);
  };

  return (
    <div className="card">
      <h2>Ticket Messages</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Create Date</th>
            <th>Response Time</th>
            <th>Resolution Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="5">No messages</td>
            </tr>
          ) : (
            messages.map((m, index) => {

              const edited = editedRows[m.id] || {};

              return (
                <tr key={`${m.id}-${index}`}>
                  <td>{m.id}</td>

                  {/* CREATE DATE TEXT */}
                  <td>
                    <input
                      type="text"
                      placeholder="YYYY-MM-DD HH:mm:ss.SSS"
                      value={
                        edited.createDate ??
                        formatTextDate(m.createDate)
                      }
                      onChange={(e) =>
                        handleChange(
                          m.id,
                          "createDate",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  {/* RESPONSE */}
                  <td>
                    <input
                      type="number"
                      step="0.0001"
                      value={
                        edited.responseTime ??
                        m.responseTime ??
                        ""
                      }
                      onChange={(e) =>
                        handleChange(
                          m.id,
                          "responseTime",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>

                  {/* RESOLUTION */}
                  <td>
                    <input
                      type="number"
                      step="0.0001"
                      value={
                        edited.resolutionTime ??
                        m.resolutionTime ??
                        ""
                      }
                      onChange={(e) =>
                        handleChange(
                          m.id,
                          "resolutionTime",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>

                  <td>
                    <button onClick={() => handleSave(m)}>
                      Save
                    </button>
                  </td>

                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketMessageTable;