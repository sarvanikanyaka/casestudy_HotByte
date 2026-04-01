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

  const total = cart.reduce(
    (sum, i) => sum + i.menu.price * i.quantity,
    0
  );

 
const placeOrder = async () => {
  if (!address || !phone) {
    alert("Enter address & phone");
    return;
  }

  try {
    // 1. Place the order
    await API.post("/api/orders/place", {
      user: { userId: 1 }, 
      totalAmount: total,
      address,
      phone,
      paymentMethod: payment
    });

    alert("Order placed successfully 🎉");

    await clearCart(); 
    
    
    navigate("/orders");

  } catch (err) {
    console.log(err.response?.data);
    alert("Order failed ❌");
  }
};

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <h2>Checkout 🧾</h2>

        {cart.length === 0 ? (
          <p>No items</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.cartItemId}>
                <h4>{item.menu.itemName}</h4>
                <p>Qty: {item.quantity}</p>
              </div>
            ))}

            <h3>Total: ₹{total}</h3>

            <input
              placeholder="Enter Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
              placeholder="Enter Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

          
            <select
              value={payment}
              onChange={e => setPayment(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
            </select>

            <button onClick={placeOrder}>
              Place Order ✅
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Checkout;