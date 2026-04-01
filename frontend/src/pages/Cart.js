import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {

  const { cart, clearCart, loadCart } = useContext(CartContext);
  const nav = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

const removeItem = async (id) => {
  try {
    await API.delete(`/cart/remove/${id}`);
    await loadCart(); 
    console.log("Item removed successfully");
  } catch (err) {
    console.error("Error removing item:", err.response?.data || err.message);
    alert("Could not remove item. Check console for details.");
  }
};

  const updateQty = async (id, type) => {
    const item = cart.find(i => i.cartItemId === id);
    if (!item) return;

    let newQty = item.quantity;

    if (type === "dec" && newQty === 1) return;
    if (type === "inc") newQty++;
    if (type === "dec") newQty--;

    try {
      await API.put(`/cart/update?cartItemId=${id}&quantity=${newQty}`);
      await loadCart();
    } catch (err) {
      console.log(err);
    }
  };

 
  const total = cart.reduce(
    (sum, i) => sum + (i.menu?.price || 0) * i.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px"
      }}>

        <h2 style={{ textAlign: "center" }}>Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>No items in cart</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.cartItemId} style={{
                background: "white",
                margin: "15px auto",
                padding: "15px",
                borderRadius: "10px",
                maxWidth: "500px"
              }}>

                <h3>{item.menu?.itemName || "Item"}</h3>
                <p>Price: ₹{item.menu?.price || 0}</p>

               
                <p>
                  Subtotal: ₹{(item.menu?.price || 0) * item.quantity}
                </p>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>

                  <div>
                    <button
                      onClick={() => updateQty(item.cartItemId, "dec")}
                      style={{ marginRight: "5px" }}
                    >
                      -
                    </button>

                    <span style={{ margin: "0 10px" }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQty(item.cartItemId, "inc")}
                      style={{ marginLeft: "5px" }}
                    >
                      +
                    </button>
                  </div>

                
                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

            {/* ✅ TOTAL */}
            <h3 style={{ textAlign: "center" }}>Total: ₹{total}</h3>

            <div style={{ textAlign: "center" }}>

           
              <button
                disabled={cart.length === 0}
                onClick={() => nav("/checkout")}
                style={btnStyle}
              >
                Proceed to Checkout
              </button>

              <br /><br />

             
              <button
                onClick={clearCart}
                style={clearStyle}
              >
                Clear Cart 🗑️
              </button>

            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;

const btnStyle = {
  padding: "10px 20px",
  background: "#ff5722",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const clearStyle = {
  padding: "10px 20px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};