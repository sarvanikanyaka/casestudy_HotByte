import { useState, useEffect } from "react";
import axios from "axios";

function OrderTracking() {

 const steps =
  ["PROCESSING", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

 const [status, setStatus] = useState(0);
 const [orderId] = useState(1); // 👉 change dynamically if needed


 useEffect(() => {
  axios.get(`http://localhost:8080/api/orders/${orderId}`)
   .then(res => {
    const backendStatus = res.data.status;

    const index = steps.indexOf(backendStatus);
    if (index !== -1) setStatus(index);
   })
   .catch(err => console.log(err));
 }, [orderId]);

 // ▶️ Move to next step (ADMIN use)
 const handleNext = () => {
  if (status < steps.length - 1) {
   const newStatus = steps[status + 1];

   axios.put(`http://localhost:8080/api/admin/orders/${orderId}?status=${newStatus}`)
    .then(() => {
     setStatus(status + 1);
    })
    .catch(err => console.log(err));
  }
 };

 // ✅ Mark delivered directly
 const markDelivered = () => {
  axios.put(`http://localhost:8080/api/admin/orders/${orderId}?status=DELIVERED`)
   .then(() => {
    setStatus(3);
    alert("Order Delivered ✅");
   })
   .catch(err => console.log(err));
 };

 return (
  <div style={{
   background: "#f5f5f5",
   minHeight: "100vh",
   padding: "30px"
  }}>

   <h2 style={{ textAlign: "center" }}>Order Tracking</h2>

   <p style={{ textAlign: "center", color: "#555" }}>
    Current Status: <b>{steps[status]}</b>
   </p>

   <div style={{
    maxWidth: "400px",
    margin: "30px auto",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
   }}>

    {steps.map((step, index) => (
     <div key={index} style={{ display: "flex", alignItems: "center" }}>

      {/* Circle */}
      <div style={{
       height: "20px",
       width: "20px",
       borderRadius: "50%",
       background: index <= status ? "#227aff" : "#ccc"
      }}></div>

      {/* Line */}
      {index !== steps.length - 1 && (
       <div style={{
        height: "40px",
        width: "2px",
        background: index < status ? "#cf22ff" : "#ccc",
        margin: "0 9px"
       }}></div>
      )}

      {/* Text */}
      <p style={{
       marginLeft: "10px",
       fontWeight: index === status ? "bold" : "normal"
      }}>
       {step}
      </p>

     </div>
    ))}

    <div style={{ marginTop: "20px" }}>

     {/* Next Step */}
     <button
      disabled={status === 3}
      onClick={handleNext}
      style={{
       width: "100%",
       padding: "10px",
       background: status === 3 ? "#ccc" : "#ff22d3",
       color: "white",
       border: "none",
       borderRadius: "5px",
       cursor: status === 3 ? "not-allowed" : "pointer",
       marginBottom: "10px"
      }}
     >
      Next Step
     </button>

     {/* Mark Delivered */}
     <button
      disabled={status === 3}
      onClick={markDelivered}
      style={{
       width: "100%",
       padding: "10px",
       background: status === 3 ? "#ccc" : "green",
       color: "white",
       border: "none",
       borderRadius: "5px",
       cursor: status === 3 ? "not-allowed" : "pointer"
      }}
     >
      Mark Delivered
     </button>

    </div>

   </div>

  </div>
 );
}

export default OrderTracking;