import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

function Menu() {
  const { restaurantId } = useParams();
  const nav = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [vegFilter, setVegFilter] = useState("ALL"); // ALL, VEG, NON_VEG
  const [selectedItem, setSelectedItem] = useState(null); // For details modal

  const { addToCart, loadCart } = useContext(CartContext);

  useEffect(() => {
    // 1. Fetch Restaurant Info
    API.get(`/restaurants/${restaurantId}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log("Failed to load restaurant details", err));

    // 2. Fetch Menu Items for this Restaurant
    API.get(`/api/menu/restaurant/${restaurantId}`)
      .then((res) => setMenu(res.data || []))
      .catch((err) => console.log("Failed to load menu", err));
  }, [restaurantId]);

  const getCategories = () => {
    const list = new Set(menu.map((item) => item.category?.categoryName || "Others"));
    return ["ALL", ...Array.from(list)];
  };

  const filtered = menu.filter((item) => {
    const matchSearch = (item.itemName || "").toLowerCase().includes(search.toLowerCase());
    
    const catName = item.category?.categoryName || "Others";
    const matchCategory = categoryFilter === "ALL" || catName === categoryFilter;

    const matchVeg =
      vegFilter === "ALL" ||
      (vegFilter === "VEG" && item.isVeg) ||
      (vegFilter === "NON_VEG" && !item.isVeg);

    return matchSearch && matchCategory && matchVeg;
  });

  return (
    <>
      <Navbar />

      <div className="main-layout animate-fade-in">
        {/* Back Button */}
        <button 
          onClick={() => nav("/home")} 
          style={{
            background: "none",
            border: "none",
            color: "hsl(var(--primary))",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          ← Back to Restaurants
        </button>

        {/* Restaurant Banner */}
        {restaurant && (
          <div style={{
            background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${restaurant.imageUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000"}) no-repeat center center/cover`,
            borderRadius: "var(--border-radius-md)",
            padding: "40px",
            color: "white",
            marginBottom: "30px",
            boxShadow: "var(--card-shadow)"
          }}>
            <h1 style={{ color: "white", fontSize: "36px", marginBottom: "8px" }}>{restaurant.name}</h1>
            <p style={{ opacity: 0.9, fontSize: "16px", marginBottom: "12px" }}>📍 {restaurant.location}</p>
            <div style={{ display: "flex", gap: "20px", fontSize: "14px", fontWeight: "600" }}>
              <span>⭐ {restaurant.rating ? restaurant.rating.toFixed(1) : "4.0"} Rating</span>
              <span>•</span>
              <span>📞 {restaurant.contactNumber}</span>
            </div>
          </div>
        )}

        {/* Search & Food Filter Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px", marginBottom: "25px" }}>
          <div className="search-wrapper" style={{ marginBottom: 0 }}>
            <svg className="search-icon-svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              className="search-input"
              placeholder="Search dishes inside menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", height: "55px" }}>
            <button
              onClick={() => setVegFilter("ALL")}
              style={{
                flex: 1,
                borderRadius: "var(--border-radius-sm)",
                border: "1.5px solid hsl(var(--border-light))",
                background: vegFilter === "ALL" ? "#111" : "white",
                color: vegFilter === "ALL" ? "white" : "#111",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              All Foods
            </button>
            <button
              onClick={() => setVegFilter("VEG")}
              style={{
                flex: 1,
                borderRadius: "var(--border-radius-sm)",
                border: "1.5px solid #2e7d32",
                background: vegFilter === "VEG" ? "#2e7d32" : "white",
                color: vegFilter === "VEG" ? "white" : "#2e7d32",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              🟢 Pure Veg
            </button>
            <button
              onClick={() => setVegFilter("NON_VEG")}
              style={{
                flex: 1,
                borderRadius: "var(--border-radius-sm)",
                border: "1.5px solid #c62828",
                background: vegFilter === "NON_VEG" ? "#c62828" : "white",
                color: vegFilter === "NON_VEG" ? "white" : "#c62828",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              🔴 Non-Veg
            </button>
          </div>
        </div>

        {/* Category Selector Tags */}
        <div className="filter-container">
          {getCategories().map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`filter-tag ${categoryFilter === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <h2 style={{ marginBottom: "20px" }}>Dishes Available</h2>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            No dishes found in this category 😢
          </div>
        ) : (
          <div className="menu-grid">
            {filtered.map((item) => (
              <div key={item.menuId} className="premium-card menu-card animate-slide-up">
                <img
                  className="menu-card-img"
                  src={item.imageUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"}
                  alt={item.itemName}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400";
                  }}
                />

                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <span className={item.isVeg ? "menu-veg-icon" : "menu-nonveg-icon"}></span>
                    <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "hsl(var(--text-muted))" }}>
                      {item.category?.categoryName || "Others"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>{item.itemName}</h3>
                  <p style={{ fontSize: "13px", color: "hsl(var(--text-muted))", marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", height: "36px" }}>
                    {item.description || "Freshly prepared delicious item."}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    <span style={{ fontSize: "20px", fontWeight: "800" }}>₹{item.price}</span>
                    <button
                      onClick={() => setSelectedItem(item)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "hsl(var(--primary))",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: "pointer"
                      }}
                    >
                      Nutritional Info 📊
                    </button>
                  </div>

                  <button
                    onClick={async () => {
                      await addToCart(item.menuId);
                      await loadCart();
                    }}
                    className="btn-primary"
                    style={{ width: "100%", padding: "12px", marginTop: "16px", borderRadius: "8px" }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nutritional Details Modal Popup */}
      {selectedItem && (
        <div className="payment-modal" onClick={() => setSelectedItem(null)}>
          <div className="payment-card-box animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "22px" }}>{selectedItem.itemName}</h3>
              <button 
                onClick={() => setSelectedItem(null)} 
                style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#666" }}
              >
                ×
              </button>
            </div>

            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.itemName}
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px" }}
            />

            <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
              {selectedItem.description}
            </p>

            <h4 style={{ marginBottom: "10px" }}>Nutritional Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", textAlign: "center", marginBottom: "20px" }}>
              <div style={{ background: "#f8f9fa", padding: "10px", borderRadius: "8px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Calories</div>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>{selectedItem.calories || 250} kcal</div>
              </div>
              <div style={{ background: "#f8f9fa", padding: "10px", borderRadius: "8px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Proteins</div>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>{selectedItem.proteins || 8}g</div>
              </div>
              <div style={{ background: "#f8f9fa", padding: "10px", borderRadius: "8px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Fats</div>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>{selectedItem.fats || 10}g</div>
              </div>
              <div style={{ background: "#f8f9fa", padding: "10px", borderRadius: "8px" }}>
                <div style={{ fontSize: "12px", color: "#666" }}>Carbs</div>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>{selectedItem.carbohydrates || 35}g</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
              <span>🔥 Taste Info: <b>{selectedItem.tasteInfo || "Savory"}</b></span>
              <span>⏱️ Cooking Time: <b>{selectedItem.cookingTime || 15} mins</b></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;