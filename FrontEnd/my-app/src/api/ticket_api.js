import axios from "axios";

const API_BASE_URL = "http://localhost:8713";

/* ================= TICKET ================= */

export const fetchTickets = (page = 0, size = 30) =>
  axios.get(`${API_BASE_URL}/ticket/all`, {
    params: { page, size }
  });

export const fetchTicketById = (id) =>
  axios.get(`${API_BASE_URL}/ticket`, {
    params: { id }
  });

export const updateTicket = (id, payload) =>
  axios.put(
    `${API_BASE_URL}/ticket/edit`,
    payload,
    {
      params: { id },
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

/* ================= MESSAGE ================= */

export const fetchMessagesByTicketId = (id) =>
  axios.get(`${API_BASE_URL}/all`, {
    params: { id }
  });

export const updateMessage = (id, payload) =>
  axios.put(
    `${API_BASE_URL}/ticket/message/edit`, // ⭐ FIX ENDPOINT
    payload,
    {
      params: { id },
      headers: {
        "Content-Type": "application/json"
      }
    }
  );