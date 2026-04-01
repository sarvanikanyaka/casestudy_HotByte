import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = 1;

  useEffect(() => {
    API.get(`/api/orders/user/${userId}`)
      .then(res => {
        setOrders(res.data || []);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <h2 style={{ textAlign: "center", margin: "20px" }}>
        My Orders 📦
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet</p>
      ) : (
        orders.map(order => {

          const status = order.orderStatus || "PENDING";

          const date = order.orderDate
            ? new Date(order.orderDate).toLocaleString("en-IN")
            : "N/A";

          return (
            <div
              key={order.orderId}
              style={{
                border: "1px solid #ddd",
                margin: "15px auto",
                padding: "15px",
                borderRadius: "10px",
                maxWidth: "400px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}
            >
              <h3>Order ID: {order.orderId}</h3>

              <p style={{
                fontWeight: "bold",
                color:
                  status === "DELIVERED"
                    ? "green"
                    : status === "CANCELLED"
                    ? "red"
                    : "orange"
              }}>
                Status: {status}
              </p>

              <p style={{ fontSize: "14px", color: "#555" }}>
                Date: {date}
              </p>

            </div>
          );
        })
      )}
    </>
  );
}

export default Orders;