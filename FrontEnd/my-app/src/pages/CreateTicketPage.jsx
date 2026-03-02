import { useState, useEffect } from "react";
import axios from "axios";

function CreateTicketPage() {
  /* ================= STATE ================= */

  const [form, setForm] = useState({
    subject: "",
    partnerId: "",
    priorityId: "",
    productId: "",
    descriptionText: "",
    channel: "Staff",
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
        axios.get("http://localhost:8713/dropdown/customers", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8713/dropdown/products", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8713/dropdown/priorities", {
          withCredentials: true,
        }),
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
      [e.target.name]: e.target.value,
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

      await axios.post("http://localhost:8713/ticket/create", form, {
        withCredentials: true,
      });

      alert("Ticket Created Successfully");

      setForm({
        subject: "",
        partnerId: "",
        priorityId: "",
        productId: "",
        descriptionText: "",
        channel: "Staff",
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
    <div className="p-8 bg-[#f7f7f9] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
        <h2 className="text-xl font-semibold">Create Ticket / New</h2>

        <div className="flex gap-3">
          <button
            className="bg-[#4f6bdc] hover:bg-[#3c55b5] text-white px-5 py-2 rounded-md disabled:opacity-60"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "✓ Save"}
          </button>

          <button
            className="bg-[#6c86e8] text-white px-5 py-2 rounded-md"
            onClick={() => window.location.reload()}
          >
            ✕ Discard
          </button>
        </div>
      </div>

      {/* SUBJECT */}
      <div>
        <label className="block mb-1.5 font-medium">Subject</label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-md"
        />
      </div>

      {/* TWO COLUMN */}
      <div className="flex gap-8 mt-8 max-md:flex-col">
        {/* LEFT SIDE */}
        <div className="flex-1 bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="mb-5 text-[#6c6bbf] font-semibold">Customer Info</h3>

          <label className="block mt-4 text-sm">Customer</label>
          <select
            name="partnerId"
            value={form.partnerId}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="">Select Customer</option>
            {customers.map((cust) => (
              <option key={cust.id} value={cust.id}>
                {cust.name}
              </option>
            ))}
          </select>

          <label className="block mt-4 text-sm">Customer Name</label>
          <input
            type="text"
            name="personName"
            value={form.personName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />

          <label className="block mt-4 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="mb-5 text-[#6c6bbf] font-semibold">Ticket Info</h3>

          <div className="flex justify-between mb-2.5">
            <span>State</span>
            <span className="text-green-600 font-bold">Open</span>
          </div>

          <div className="flex justify-between mb-2.5">
            <span>Channel</span>
            <span>Staff</span>
          </div>

          <label className="block mt-4 text-sm">Priority</label>
          <select
            name="priorityId"
            value={form.priorityId}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="">Select Priority</option>
            {priorities.map((prio) => (
              <option key={prio.id} value={prio.id}>
                {prio.name}
              </option>
            ))}
          </select>

          <label className="block mt-4 text-sm">Product</label>
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
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
      <div className="mt-10">
        <h3 className="mb-3 font-semibold">Description</h3>

        <textarea
          name="descriptionText"
          value={form.descriptionText}
          onChange={handleChange}
          className="w-full h-[220px] p-3 border border-gray-300 rounded-lg resize-y"
        />
      </div>
    </div>
  );
}

export default CreateTicketPage;
