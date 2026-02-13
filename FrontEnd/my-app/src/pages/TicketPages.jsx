import { useEffect, useState } from "react";
import {
  fetchTicketById,
  fetchMessagesByTicketId,
  updateTicket,
  fetchTickets,
  updateMessage
} from "../api/ticket_api";

import MainLayout from "../layout/MainLayout";
import SearchBar from "../components/SearchBar";
import TicketDetail from "../components/TicketTable";
import TicketMessageTable from "../components/TicketMessageTable";

const TicketPage = () => {

  const [ticketId, setTicketId] = useState("");
  const [editedTicket, setEditedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  /* ===============================
     LOAD TICKET LIST (GLOBAL TABLE)
  =============================== */
  const loadTicketList = async () => {
    try {
      const res = await fetchTickets();
      setTicketList(res.data.content || []);
    } catch (err) {
      console.error(err);
    }
  };

  /* LOAD LIST FIRST TIME */
  useEffect(() => {
    loadTicketList();
  }, []);

  /* ===============================
     LOAD SINGLE TICKET + MESSAGE
  =============================== */
  const loadTicketData = async () => {
    if (!ticketId) return;

    try {
      const ticketRes = await fetchTicketById(ticketId);
      const msgRes = await fetchMessagesByTicketId(ticketId);

      setEditedTicket(ticketRes.data);
      setMessages(msgRes.data || []);
      setIsDirty(false);

    } catch (err) {
      console.error(err);
    }
  };

  /* ===============================
     EDIT TICKET FIELD
  =============================== */
  const handleFieldChange = (field, value) => {
    setEditedTicket(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };

  /* ===============================
     SAVE TICKET + AUTO REFRESH TABLE
  =============================== */
  const handleSaveTicket = async () => {
    try {
      await updateTicket(editedTicket.id, {
        createDateTime: editedTicket.createDateTime,
        startResolutionTime: editedTicket.startResolutionTime,
        endResolutionTime: editedTicket.endResolutionTime
      });

      /* ⭐ AUTO REFRESH LIST */
      await loadTicketList();

      /* ⭐ OPTIONAL REFRESH DETAIL */
      await loadTicketData();

      alert("Ticket saved");
      setIsDirty(false);

    } catch (err) {
      console.error(err);
    }
  };

  /* ===============================
     SAVE MESSAGE
  =============================== */
  const handleSaveMessage = async (id, payload) => {
    try {
      await updateMessage(id, payload);

      /* OPTIONAL REFRESH MESSAGE LIST */
      await loadTicketData();

      alert("Message saved");

    } catch (err) {
      console.error(err);
    }
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="container">

      <SearchBar
        value={ticketId}
        onChange={setTicketId}
        onSearch={loadTicketData}
        tickets={ticketList}
      />

      <TicketDetail
        ticket={editedTicket}
        onChange={handleFieldChange}
        onSave={handleSaveTicket}
        isDirty={isDirty}
      />

      <TicketMessageTable
        messages={messages}
        onSaveMessage={handleSaveMessage}
      />

    </div>
  );
};

export default TicketPage;
