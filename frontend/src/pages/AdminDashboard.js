import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sorted = res.data.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );

      setOrders(sorted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.orderId.toString().includes(search);

    const matchStatus =
      statusFilter === "ALL" || o.orderStatus === statusFilter;

    return matchSearch && matchStatus;
  });


  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/orders/status/${id}?status=${status}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
    } catch {
      alert("Update failed ❌");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/orders/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f3f4f6", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Admin Dashboard 👨‍💼
      </h2>

    
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Search by user / order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            flex: 1,
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

    <table
  width="100%"
  style={{
    borderCollapse: "separate",
    borderSpacing: "0 10px",  
    background: "#f3f3f600"
  }}
>
        <thead style={{ background: "#1f2937", color: "white" }}>
          <tr>
            <th style={th}>Order ID</th>
            <th style={th}>User</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No Orders Found
              </td>
            </tr>
          ) : (
            filteredOrders.map((o) => (
              <tr key={o.orderId} style={{ borderBottom: "1px solid #eee" }}>
                <td style={td}>{o.orderId}</td>
                <td style={td}>{o.user?.name}</td>

                <td style={td}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      background:
                        o.orderStatus === "DELIVERED"
                          ? "#dcfce7"
                          : o.orderStatus === "CANCELLED"
                          ? "#fee2e2"
                          : "#fef9c3",
                      color:
                        o.orderStatus === "DELIVERED"
                          ? "green"
                          : o.orderStatus === "CANCELLED"
                          ? "red"
                          : "#b45309"
                    }}
                  >
                    {o.orderStatus}
                  </span>
                </td>

                <td style={td}>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    
                    <button style={btn.view}
                      onClick={() => setSelectedOrder(o)}>
                      View 📦
                    </button>

                    <button style={btn.processing}
                      onClick={() => updateStatus(o.orderId, "PROCESSING")}>
                    </button>

                    <button style={btn.delivered}
                      onClick={() => updateStatus(o.orderId, "DELIVERED")}>
                      🚚
                    </button>

                    <button style={btn.cancel}
                      onClick={() => updateStatus(o.orderId, "CANCELLED")}>
                      ❌
                    </button>

                    <button style={btn.delete}
                      onClick={() => deleteOrder(o.orderId)}>
                      🗑
                    </button>

                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>


      {selectedOrder && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <h3>Order Details 📦</h3>

            <p><b>Order ID:</b> {selectedOrder.orderId}</p>
            <p><b>User:</b> {selectedOrder.user?.name}</p>
            <p><b>Status:</b> {selectedOrder.orderStatus}</p>
            <p>
              <b>Date:</b>{" "}
              {new Date(selectedOrder.orderDate).toLocaleString()}
            </p>

            <button style={btn.close} onClick={() => setSelectedOrder(null)}>
              Close ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



const th = { padding: "12px" };
const td = { padding: "12px", textAlign: "center" };

const btn = {
  view: { background: "#3b83f652", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "5px" },
  processing: { background: "#15fa1984", border: "none", padding: "6px", borderRadius: "5px" },
  delivered: { background: "#8a7587", color: "#fff", border: "none", padding: "6px", borderRadius: "5px" },
  cancel: { background: "#0c7c26af", color: "#fff", border: "none", padding: "6px", borderRadius: "5px" },
  delete: { background: "#dc2626", color: "#fff", border: "none", padding: "6px", borderRadius: "5px" },
  close: { marginTop: "10px", background: "#111", color: "#fff", padding: "8px", border: "none", borderRadius: "5px" }
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalContent = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "350px"
};

export default Admin;