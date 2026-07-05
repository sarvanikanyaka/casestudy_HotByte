import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getUserId = () => localStorage.getItem("userId") || 1;

  const addToCart = async (menuId) => {
    const currentUserId = getUserId();
    try {
      await API.post(`/cart/add/${currentUserId}?menuId=${menuId}&qty=1`);
      await loadCart();
      alert("Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  const loadCart = async () => {
    const currentUserId = getUserId();
    try {
      const res = await API.get(`/cart/user/${currentUserId}`);
      const data = res.data || [];

      setCart(data);

      const total = data.reduce((sum, i) => sum + i.quantity, 0);
      setCartCount(total);

    } catch (err) {
      console.log(err);
      setCart([]);
      setCartCount(0);
    }
  };

 const clearCart = async () => {
  const currentUserId = getUserId();
  try {
    
    await API.delete(`/cart/clear/${currentUserId}`); 
    setCart([]);
    setCartCount(0);
    
    console.log("Cart cleared successfully!");
  } catch (err) {
    console.error("Failed to clear cart:", err);
  }
};

const removeItem = async (id) => {
  try {
  
    await API.delete(`/cart/remove/${id}`); 
    await loadCart(); 
  } catch (err) {
    console.error("Error removing item:", err);
  }
};

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      loadCart,
      clearCart,
      addToCart,
      removeItem
    }}>
      {children}
    </CartContext.Provider>
  );
};