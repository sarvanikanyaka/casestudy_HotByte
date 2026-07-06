import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Checkout() {
  const { cart, clearCart, loadCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("COD");

  // Payment Simulator Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [paymentStep, setPaymentStep] = useState("input"); // input, processing, success

  const itemsTotal = cart.reduce((sum, i) => sum + i.menu.price * i.quantity, 0);
  const deliveryFee = itemsTotal > 0 ? 40 : 0;
  const gstTax = Math.round(itemsTotal * 0.05); // 5% GST
  const grandTotal = itemsTotal + deliveryFee + gstTax;

  useEffect(() => {
    loadCart();
  }, []);

  const handlePlaceOrderClick = () => {
    if (!address || !phone) {
      alert("Please fill in your Delivery Address and Phone Number!");
      return;
    }
    if (payment === "CARD") {
      setShowPaymentModal(true);
    } else {
      executeOrderPlacement();
    }
  };

  const executeOrderPlacement = async () => {
    const currentUserId = parseInt(localStorage.getItem("userId")) || 1;
    try {
      const res = await API.post("/api/orders/place", {
        user: { userId: currentUserId },
        totalAmount: grandTotal,
        address,
        phone,
        paymentMethod: payment
      });

      await clearCart();
      
      if (res.data && res.data.orderId) {
        navigate(`/tracking/${res.data.orderId}`);
      } else {
        navigate("/orders");
      }
    } catch (err) {
      console.log(err.response?.data);
      alert("Order placement failed ❌");
    }
  };

  const handleSimulatedPaymentSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length < 16 || cardExpiry.length < 5 || cardCvv.length < 3 || !cardName) {
      alert("Please enter valid card details!");
      return;
    }

    setPaymentStep("processing");

    // Phase 1: Contacting bank
    setTimeout(() => {
      // Phase 2: Processing transaction
      setTimeout(() => {
        setPaymentStep("success");
        // Phase 3: Place order & Redirect
        setTimeout(() => {
          setShowPaymentModal(false);
          setPaymentStep("input");
          executeOrderPlacement();
        }, 1500);
      }, 1500);
    }, 1500);
  };

  // Card formatting
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").substring(0, 16);
    setCardNumber(val);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 2) {
      val = val.substring(0, 2) + "/" + val.substring(2, 4);
    }
    setCardExpiry(val.substring(0, 5));
  };

  return (
    <>
      <Navbar />

      <div className="main-layout animate-fade-in">
        <h2 style={{ fontSize: "28px", marginBottom: "25px" }}>Checkout 🧾</h2>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "64px", marginBottom: "15px" }}>🛒</div>
            <h3 style={{ marginBottom: "10px" }}>Your cart is empty!</h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>Add items to your cart before checking out.</p>
            <button onClick={() => navigate("/home")} className="btn-primary" style={{ padding: "12px 24px" }}>
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="checkout-layout">
            
            {/* Left side: Delivery Details */}
            <div className="premium-card" style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h3 style={{ fontSize: "20px", borderBottom: "1.5px solid #eee", paddingBottom: "10px" }}>Delivery Details</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600" }}>Delivery Address</label>
                <input
                  className="premium-input"
                  placeholder="Street name, Building name, Flat No., Area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600" }}>Phone Number</label>
                <input
                  className="premium-input"
                  placeholder="10-digit mobile number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600" }}>Payment Option</label>
                <select
                  className="premium-input"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  style={{ appearance: "none", cursor: "pointer", background: "white url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23333\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>') no-repeat right 16px center/16px" }}
                >
                  <option value="COD">💵 Cash on Delivery (COD)</option>
                  <option value="CARD">💳 Credit / Debit Card (Interactive Simulator)</option>
                </select>
              </div>

              <button 
                onClick={handlePlaceOrderClick} 
                className="btn-primary" 
                style={{ width: "100%", padding: "16px", borderRadius: "10px", marginTop: "10px", fontSize: "16px" }}
              >
                Place Order (₹{grandTotal})
              </button>
            </div>

            {/* Right side: Order Summary */}
            <div className="premium-card" style={{ padding: "30px", height: "fit-content" }}>
              <h3 style={{ fontSize: "20px", borderBottom: "1.5px solid #eee", paddingBottom: "10px", marginBottom: "15px" }}>Order Summary</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
                {cart.map((item) => (
                  <div key={item.cartItemId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "14px" }}>{item.menu.itemName}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>Qty: {item.quantity} x ₹{item.menu.price}</div>
                    </div>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>₹{item.menu.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* Bill Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1.5px dashed #ddd", paddingTop: "15px", fontSize: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}>
                  <span>Items Total</span>
                  <span>₹{itemsTotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}>
                  <span>Delivery Partner Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}>
                  <span>Taxes & Charges (5% GST)</span>
                  <span>₹{gstTax}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "18px", borderTop: "1.5px solid #eee", paddingTop: "12px", marginTop: "5px" }}>
                  <span>To Pay</span>
                  <span style={{ color: "hsl(var(--primary))" }}>₹{grandTotal}</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Realistic Interactive Payment Simulator Overlay */}
      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-card-box">
            
            {paymentStep === "input" && (
              <form onSubmit={handleSimulatedPaymentSubmit}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "20px" }}>Secure Payment</h3>
                  <button 
                    type="button" 
                    onClick={() => setShowPaymentModal(false)}
                    style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#666" }}
                  >
                    ×
                  </button>
                </div>

                {/* Virtual Card Preview Graphic */}
                <div className="credit-card-preview">
                  <div style={{ fontSize: "12px", opacity: 0.8, textTransform: "uppercase", letterSpacing: "2px" }}>HotByte Pay</div>
                  <div style={{ fontSize: "20px", marginTop: "25px", letterSpacing: "3px" }}>
                    {cardNumber.padEnd(16, "•").replace(/(.{4})/g, "$1 ")}
                  </div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px" }}>
                    <div>
                      <div style={{ fontSize: "8px", opacity: 0.6, textTransform: "uppercase" }}>Card Holder</div>
                      <div style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>{cardName || "YOUR NAME"}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "8px", opacity: 0.6, textTransform: "uppercase" }}>Expires</div>
                      <div style={{ fontSize: "11px" }}>{cardExpiry || "MM/YY"}</div>
                    </div>
                  </div>
                </div>

                {/* Card Inputs */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", fontWeight: "600" }}>Card Number</label>
                    <input
                      className="premium-input"
                      style={{ padding: "10px" }}
                      placeholder="16-digit card number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "12px", fontWeight: "600" }}>Cardholder Name</label>
                    <input
                      className="premium-input"
                      style={{ padding: "10px" }}
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "600" }}>Expiry Date</label>
                      <input
                        className="premium-input"
                        style={{ padding: "10px" }}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        required
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "600" }}>CVV</label>
                      <input
                        className="premium-input"
                        style={{ padding: "10px" }}
                        placeholder="123"
                        type="password"
                        maxLength="3"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: "100%", padding: "14px", borderRadius: "8px", marginTop: "24px" }}
                >
                  Pay ₹{grandTotal}
                </button>
              </form>
            )}

            {paymentStep === "processing" && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div className="spinner"></div>
                <h3 style={{ marginTop: "20px", fontSize: "18px" }}>Securing connection...</h3>
                <p style={{ color: "#666", fontSize: "14px", marginTop: "5px" }}>Processing your transaction safely.</p>
              </div>
            )}

            {paymentStep === "success" && (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div className="success-checkmark">
                  <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                  </div>
                </div>
                <h3 style={{ marginTop: "20px", fontSize: "20px", color: "#4CAF50" }}>Payment Successful!</h3>
                <p style={{ color: "#666", fontSize: "14px", marginTop: "5px" }}>Placing your order...</p>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;