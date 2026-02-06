import {  useEffect, useState } from "react";
import {
  fetchTicketById,
  fetchMessagesByTicketId,
  updateTicket,
  fetchTickets
} from "../api/ticket_api";

import SearchBar from "../components/SearchBar";
import TicketDetail from "../components/TicketTable";
import TicketMessageTable from "../components/TicketMessageTable";

const TicketPage = () => {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [editedTicket, setEditedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  const [ticketList, setTicketList] = useState([]); 


  useEffect(() => {
    const loadTickets = async () => {
      try {
        const res = await fetchTickets();
        setTicketList(res.data.content);
      } catch (err) {
        console.error(err);
      }
    };
         console.log("ticketList:", ticketList, Array.isArray(ticketList));
    loadTickets();
 

  }, []);


  const loadTicketData = async () => {
    const id = Number(ticketId);
    if (!id) return alert("Ticket ID tidak valid");

    try {
      const ticketRes = await fetchTicketById(id);
      const messageRes = await fetchMessagesByTicketId(id);

      setTicket(ticketRes.data);
      setEditedTicket(ticketRes.data); // 🔥 clone untuk edit
      setMessages(messageRes.data);
      setIsDirty(false);
      

    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data ticket");
    }
  };

  // Editable field handler
  const handleFieldChange = (field, value) => {
    setEditedTicket((prev) => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      await updateTicket(editedTicket);
      setTicket(editedTicket);
      setIsDirty(false);
      alert("✅ Data berhasil disimpan");
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan data");
    }
  };



  return (
    <div className="container">
      <div className="section">
        <SearchBar
          value={ticketId}
          onChange={setTicketId}
          onSearch={loadTicketData}
          tickets={ticketList}
          
        />
      </div>

      <div className="section">
        <TicketDetail
          ticket={editedTicket}
          onChange={handleFieldChange}
          onSave={handleSave}
          isDirty={isDirty}
        />
      </div>

      <div className="section">
        <TicketMessageTable messages={messages} />
      </div>
    </div>
  );
};

export default TicketPage;
