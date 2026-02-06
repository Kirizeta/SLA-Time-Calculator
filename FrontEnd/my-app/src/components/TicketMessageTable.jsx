const TicketMessageTable = ({ messages }) => {
  return (
    <div className="card">
      <h2>💬 Ticket Messages</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Content</th> */}
            <th>Create Date</th>
            <th>Response Time</th>
            <th>Resolution Time</th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">
                No messages
              </td>
            </tr>
          ) : (
            messages.map((m) => {
              console.log("💬 Message row:", m); // 👈 DEBUG PER ROW

              return (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  {/* <td>{m.content}</td> */}
                  <td>{m.createDate}</td>
                  <td>{m.responseTime}</td>
                  <td>{m.resolutionTime}</td>
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
