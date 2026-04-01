import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const userId = 1;

  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = async (menuId) => {
    try {
      await API.post(`/cart/add/1?menuId=${menuId}&qty=1`);
      await loadCart();
      alert("Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  const loadCart = async () => {
    try {
      const res = await API.get(`/cart/user/${userId}`);
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
  try {
    
    await API.delete(`/cart/clear/${userId}`); 
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