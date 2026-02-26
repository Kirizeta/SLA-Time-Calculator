import { useState, useEffect } from "react";
import axios from "axios";
import "./CreateTicketPage.css";

function CreateTicketPage() {

  /* ================= STATE ================= */

  const [form, setForm] = useState({
    subject: "",
    partnerId: "",
    priorityId: "",
    productId: "",
    descriptionText: "",
    channel: "Staff"
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const [loading, setLoading] = useState(false);

  /* ================= LOAD DROPDOWN ================= */

  useEffect(() => {
    loadDropdown();
  }, []);

  const loadDropdown = async () => {
    try {
      const [custRes, prodRes, prioRes] = await Promise.all([
        axios.get("http://localhost:8713/dropdown/customers", { withCredentials: true }),
        axios.get("http://localhost:8713/dropdown/products", { withCredentials: true }),
        axios.get("http://localhost:8713/dropdown/priorities", { withCredentials: true }),
      ]);

      setCustomers(custRes.data);
      setProducts(prodRes.data);
      setPriorities(prioRes.data);

    } catch (error) {
      console.error("Dropdown error:", error);
    }
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!form.subject) {
      alert("Subject wajib diisi");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8713/ticket/create",
        form,
        { withCredentials: true }
      );

      alert("Ticket Created Successfully");

      setForm({
        subject: "",
        partnerId: "",
        priorityId: "",
        productId: "",
        descriptionText: "",
        channel: "Staff"
      });

    } catch (error) {
      console.error(error);
      alert("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="create-ticket-wrapper">

      {/* HEADER */}
      <div className="ticket-header">
        <h2>Create Ticket / New</h2>

        <div className="button-group">
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "✓ Save"}
          </button>

          <button
            className="btn-discard"
            onClick={() => window.location.reload()}
          >
            ✕ Discard
          </button>
        </div>
      </div>

      {/* SUBJECT */}
      <div className="form-section">
        <label>Subject</label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />
      </div>

      {/* TWO COLUMN */}
      <div className="two-column">

        {/* LEFT SIDE */}
        <div className="card">
          <h3>Customer Info</h3>

          <label>Customer</label>
          <select
            name="partnerId"
            value={form.partnerId}
            onChange={handleChange}
          >
            <option value="">Select Customer</option>
            {customers.map((cust) => (
              <option key={cust.id} value={cust.id}>
                {cust.name}
              </option>
            ))}
          </select>

                    <label>Customer Name</label>
          <input
            type="text"
            name="personName"
            value={form.personName}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

        </div>

        {/* RIGHT SIDE */}
        <div className="card">
          <h3>Ticket Info</h3>

          <div className="info-row">
            <span>State</span>
            <span className="state-open">Open</span>
          </div>

          <div className="info-row">
            <span>Channel</span>
            <span>Staff</span>
          </div>

          <label>Priority</label>
          <select
            name="priorityId"
            value={form.priorityId}
            onChange={handleChange}
          >
            <option value="">Select Priority</option>
            {priorities.map((prio) => (
              <option key={prio.id} value={prio.id}>
                {prio.name}
              </option>
            ))}
          </select>

          <label>Product</label>
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
          >
            <option value="">Select Product</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="description-section">
        <h3>Description</h3>

        <textarea
          name="descriptionText"
          value={form.descriptionText}
          onChange={handleChange}
        />
      </div>

    </div>
  );
}

export default CreateTicketPage;