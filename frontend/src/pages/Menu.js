import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

function Menu() {

  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");

  const { addToCart, loadCart } = useContext(CartContext);

  useEffect(() => {
    API.get("/api/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));
  }, []);

  const getImage = (name) => {
    if (!name) return "https://images.unsplash.com/photo-1504674900247-0877df9cc836";

    const n = name.toLowerCase();

    if (n.includes("pizza")) return "https://images.unsplash.com/photo-1594007654729-407eedc4be65";
    if (n.includes("burger")) return "https://images.unsplash.com/photo-1550547660-d9450f859349";
    if (n.includes("pasta")) return "https://images.unsplash.com/photo-1525755662778-989d0524087e";
    if (n.includes("biryani")) return "https://images.unsplash.com/photo-1589302168068-964664d93dc0";
    if (n.includes("rice")) return "https://images.unsplash.com/photo-1603133872878-684f208fb84b";
    if (n.includes("noodles")) return "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841";
    if (n.includes("paneer")) return "https://images.unsplash.com/photo-1631452180519-c014fe946bc7";
    if (n.includes("chicken")) return "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398";
    if (n === "sandwich")
      return "https://images.unsplash.com/photo-1553909489-cd47e0907980";

    if (n === "momos")
      return "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7";
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836";
  };

  
  const filtered = menu.filter(item =>
    (item.itemName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "1100px", margin: "auto" }}>

       
        <input
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

      
        {filtered.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No items found 😢
          </p>
        )}

     
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>

          {filtered.map(item => (
            <div key={item.menuId} style={{
              background: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>

              <img
                src={item.imageUrl || getImage(item.itemName)}
                alt={item.itemName}
                onError={(e) => {
                  e.target.src = getImage(item.itemName);
                }}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover"
                }}
              />

       
              <div style={{ padding: "10px" }}>
                <h3>{item.itemName}</h3>
                <p>₹{item.price}</p>

              
                <button
                  onClick={async () => {
                    await addToCart(item.menuId); 
                    await loadCart();
                    alert("Added to cart ✅");
                  }}
                  style={{
                    background: "#ff5722",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Add to Cart
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default Menu;