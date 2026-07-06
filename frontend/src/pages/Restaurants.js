import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("ALL");
  const nav = useNavigate();

  useEffect(() => {
    API.get("/restaurants")
      .then((res) => {
        setRestaurants(res.data || []);
      })
      .catch((err) => console.log("Failed to fetch restaurants", err));
  }, []);

  const cuisines = ["ALL", "Pizza", "Burgers", "Biryani", "Desserts", "Italian", "Fast Food"];

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.cuisineType && r.cuisineType.toLowerCase().includes(search.toLowerCase()));

    const matchCuisine =
      filterCuisine === "ALL" ||
      (r.cuisineType && r.cuisineType.toLowerCase().includes(filterCuisine.toLowerCase()));

    return matchSearch && matchCuisine;
  });

  return (
    <>
      <Navbar />

      <div className="main-layout animate-fade-in">
        {/* Banner Section */}
        <div style={{
          background: "linear-gradient(135deg, #ff782b 0%, #ff5722 100%)",
          borderRadius: "var(--border-radius-md)",
          padding: "40px 30px",
          color: "white",
          marginBottom: "30px",
          boxShadow: "0 10px 25px rgba(255, 87, 34, 0.15)"
        }}>
          <h1 style={{ color: "white", fontSize: "36px", marginBottom: "8px" }}>Discover Best Food & Drinks</h1>
          <p style={{ opacity: 0.9, fontSize: "16px" }}>Choose from top-rated restaurants delivering right to your doorstep!</p>
        </div>

        {/* Search and Filters */}
        <div className="search-wrapper">
          <svg className="search-icon-svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            className="search-input"
            placeholder="Search for restaurants, cuisines, or dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cuisine Filter Tags */}
        <div className="filter-container">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setFilterCuisine(cuisine)}
              className={`filter-tag ${filterCuisine === cuisine ? "active" : ""}`}
            >
              {cuisine}
            </button>
          ))}
        </div>

        {/* Restaurants Grid */}
        <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>Trending Restaurants Near You</h2>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#666" }}>
            No restaurants match your search 😢
          </div>
        ) : (
          <div className="restaurant-grid">
            {filtered.map((restaurant) => (
              <div
                key={restaurant.restaurantId}
                className="premium-card restaurant-card animate-slide-up"
                onClick={() => nav(`/restaurant/${restaurant.restaurantId}`)}
              >
                <div className="restaurant-img-container">
                  <img
                    className="restaurant-img"
                    src={restaurant.imageUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500"}
                    alt={restaurant.name}
                  />
                  <div className="rating-badge">
                    ★ {restaurant.rating ? restaurant.rating.toFixed(1) : "4.0"}
                  </div>
                </div>

                <div className="card-details">
                  <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>{restaurant.name}</h3>
                  <div className="cuisine-tags">{restaurant.cuisineType || "Fast Food"}</div>

                  <div className="card-footer">
                    <span>📍 {restaurant.location.split(",")[0]}</span>
                    <span style={{ color: "hsl(var(--primary))", fontWeight: "bold" }}>30-40 mins</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Restaurants;
