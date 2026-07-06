import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function OrderTracking() {
  const steps = ["PENDING", "PROCESSING", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];
  const [status, setStatus] = useState(0);
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const nav = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role === "ROLE_ADMIN";

  useEffect(() => {
    API.get(`/api/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        const backendStatus = res.data.orderStatus || "PENDING";
        const index = steps.indexOf(backendStatus);
        if (index !== -1) setStatus(index);
      })
      .catch((err) => console.log(err));
  }, [orderId]);

  const updateStatusOnBackend = (newStatusStr, newIndex) => {
    API.put(`/api/admin/orders/${orderId}?status=${newStatusStr}`)
      .then(() => {
        setStatus(newIndex);
      })
      .catch((err) => console.log(err));
  };

  const handleNext = () => {
    if (status < steps.length - 1) {
      const nextIndex = status + 1;
      const nextStatusStr = steps[nextIndex];
      updateStatusOnBackend(nextStatusStr, nextIndex);
    }
  };

  const markDelivered = () => {
    updateStatusOnBackend("DELIVERED", steps.length - 1);
  };

  // Convert status codes to readable text
  const getReadableStatus = (s) => {
    switch (s) {
      case "PENDING": return "Order Received";
      case "PROCESSING": return "Confirmed by Kitchen";
      case "PREPARING": return "Preparing your Food";
      case "OUT_FOR_DELIVERY": return "Out for Delivery";
      case "DELIVERED": return "Delivered 🎉";
      default: return s;
    }
  };

  return (
    <>
      <Navbar />

      <div className="main-layout animate-fade-in">
        <button 
          onClick={() => nav("/orders")} 
          style={{
            background: "none",
            border: "none",
            color: "hsl(var(--primary))",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ← Back to Orders
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "30px" }}>
          
          {/* Left Column: Tracking Steps */}
          <div className="premium-card" style={{ padding: "30px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>Live Order Tracking</h2>
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "30px" }}>
              Order ID: <span style={{ fontWeight: "700", color: "#111" }}>#{orderId}</span>
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {steps.map((step, index) => {
                const isActive = index === status;
                const isCompleted = index < status;
                
                return (
                  <div key={index} style={{ display: "flex", gap: "25px" }}>
                    
                    {/* Circle and Connecting Line Container */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div 
                        style={{
                          height: "24px",
                          width: "24px",
                          borderRadius: "50%",
                          background: isActive 
                            ? "hsl(var(--primary))" 
                            : isCompleted 
                              ? "hsl(var(--accent))" 
                              : "#e2e8f0",
                          border: isActive ? "5px solid rgba(252, 128, 25, 0.25)" : "none",
                          boxShadow: isActive ? "0 0 12px rgba(252, 128, 25, 0.6)" : "none",
                          zIndex: 2,
                          transition: "all 0.5s ease"
                        }}
                      ></div>
                      
                      {index !== steps.length - 1 && (
                        <div 
                          style={{
                            height: "55px",
                            width: "3px",
                            background: isCompleted 
                              ? "hsl(var(--accent))" 
                              : "#e2e8f0",
                            margin: "-2px 0",
                            zIndex: 1,
                            transition: "all 0.5s ease"
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Step Information */}
                    <div style={{ paddingTop: "2px" }}>
                      <h4 style={{ 
                        fontSize: "16px", 
                        color: isActive 
                          ? "hsl(var(--primary))" 
                          : isCompleted 
                            ? "hsl(var(--text-dark))" 
                            : "#94a3b8",
                        fontWeight: isActive ? "800" : "600"
                      }}>
                        {getReadableStatus(step)}
                      </h4>
                      <p style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                        {step === "PENDING" && "We have received your order."}
                        {step === "PROCESSING" && "The restaurant has accepted and confirmed your order."}
                        {step === "PREPARING" && "Our chef is preparing your fresh meal."}
                        {step === "OUT_FOR_DELIVERY" && "Our delivery partner is on the way to your address."}
                        {step === "DELIVERED" && "Enjoy your delicious hot meal!"}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Admin Management Dashboard Tools */}
            {isAdmin && (
              <div style={{ marginTop: "30px", borderTop: "1.5px solid #eee", paddingTop: "20px" }}>
                <h4 style={{ fontSize: "15px", marginBottom: "15px" }}>Admin Control (Update Status)</h4>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    disabled={status === steps.length - 1}
                    onClick={handleNext}
                    className="btn-primary"
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: status === steps.length - 1 ? "#ccc" : "hsl(var(--primary))",
                      boxShadow: "none",
                      cursor: status === steps.length - 1 ? "not-allowed" : "pointer"
                    }}
                  >
                    Next Status
                  </button>
                  <button
                    disabled={status === steps.length - 1}
                    onClick={markDelivered}
                    className="btn-primary"
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: status === steps.length - 1 ? "#ccc" : "hsl(var(--accent))",
                      boxShadow: "none",
                      cursor: status === steps.length - 1 ? "not-allowed" : "pointer"
                    }}
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Map Simulation */}
          <div className="premium-card" style={{ padding: "30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>Delivery Details</h3>
              
              {/* Map Illustration Box */}
              <div style={{
                height: "220px",
                background: "#e2e8f0",
                borderRadius: "var(--border-radius-md)",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #cbd5e1",
                marginBottom: "20px"
              }}>
                {/* Styled Vector Map Grid mockup */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px), radial-gradient(#cbd5e1 1.5px, #e2e8f0 1.5px)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 10px 10px",
                  opacity: 0.5
                }}></div>

                {/* Simulated Roads */}
                <div style={{ position: "absolute", width: "4px", height: "100%", left: "40%", background: "#fff", zIndex: 1 }}></div>
                <div style={{ position: "absolute", width: "100%", height: "4px", top: "50%", background: "#fff", zIndex: 1 }}></div>
                <div style={{ position: "absolute", width: "100%", height: "4px", top: "25%", left: "20%", background: "#fff", transform: "rotate(15deg)", zIndex: 1 }}></div>

                {/* Animated Pulsing Pin */}
                {status === 3 && (
                  <div style={{
                    position: "absolute",
                    left: "38%",
                    top: "35%",
                    zIndex: 10,
                    animation: "pulse 1.5s infinite"
                  }}>
                    <span style={{ fontSize: "28px" }}>🛵</span>
                  </div>
                )}
                
                {/* Delivery Pin */}
                <div style={{ position: "absolute", right: "25%", bottom: "25%", zIndex: 10 }}>
                  <span style={{ fontSize: "24px" }}>🏠</span>
                </div>

                <div style={{ position: "absolute", left: "15%", top: "15%", zIndex: 10 }}>
                  <span style={{ fontSize: "24px" }}>🏢</span>
                </div>

                <div style={{ zIndex: 5, background: "rgba(255,255,255,0.9)", padding: "10px 15px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  {status === 4 ? "Delivered!" : status === 3 ? "Rider is heading to you!" : "Food is preparing..."}
                </div>
              </div>
            </div>

            {/* Rider Information card */}
            {status >= 3 && status < 4 ? (
              <div style={{
                background: "#f8fafc",
                borderRadius: "var(--border-radius-sm)",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1.5px solid #e2e8f0"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    fontSize: "32px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}>👨🏻‍✈️</div>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "700" }}>Rajesh Kumar</h4>
                    <p style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>Honda Activa (MH-12-AB-3456)</p>
                  </div>
                </div>
                <a 
                  href="tel:9876543210" 
                  style={{
                    background: "hsl(var(--primary))",
                    color: "white",
                    padding: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    boxShadow: "0 4px 10px rgba(252, 128, 25, 0.2)"
                  }}
                >
                  📞
                </a>
              </div>
            ) : status === 4 ? (
              <div style={{
                background: "#f0fdf4",
                borderRadius: "var(--border-radius-sm)",
                padding: "16px",
                textAlign: "center",
                border: "1.5px solid #bbf7d0",
                color: "#166534",
                fontWeight: "600"
              }}>
                ✅ Delivery Completed at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            ) : (
              <div style={{
                background: "#f8fafc",
                borderRadius: "var(--border-radius-sm)",
                padding: "16px",
                textAlign: "center",
                border: "1.5px solid #e2e8f0",
                color: "#64748b",
                fontSize: "13px"
              }}>
                ⏳ Rider details will be shared once order is out for delivery.
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default OrderTracking;