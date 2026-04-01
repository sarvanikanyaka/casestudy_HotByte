import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {

  const nav = useNavigate();
  const { cartCount } = useContext(CartContext);

  return (
    <div style={{
      background: "linear-gradient(90deg,#5f2cff,#8a2be2)",
      color: "white",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>

      {/* Logo */}
      <h2 style={{ cursor: "pointer" }} onClick={() => nav("/")}>
        HotByte 🍲
      </h2>

      {/* Right Side */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

        {/* Orders */}
        <span
          onClick={() => nav("/orders")}
          style={{ cursor: "pointer" }}
        >
          Orders 📦
        </span>

        {/* Cart */}
        <span
          onClick={() => nav("/cart")}
          style={{ cursor: "pointer", fontSize: "18px" }}
        >
          🛒 {cartCount}
        </span>

      </div>

    </div>
  );
}

export default Navbar;