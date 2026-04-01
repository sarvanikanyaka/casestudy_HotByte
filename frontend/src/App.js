import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";
import Orders from "./pages/orders";
import AdminDashboard from "./pages/AdminDashboard";
import { CartProvider } from "./context/CartContext";

// 🔐 Protected Route
function AdminRoute({ children }) {
 const role = localStorage.getItem("role");
 return role === "ROLE_ADMIN" ? children : <Navigate to="/" />;
}

function App() {
 return (
  <CartProvider>
   <BrowserRouter>
    <Routes>

     {/* Public */}
     <Route path="/" element={<Login />} />
     <Route path="/register" element={<Register />} />

     {/* User */}
     <Route path="/home" element={<Menu />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/checkout" element={<Checkout />} />
     <Route path="/tracking" element={<Tracking />} />
     <Route path="/orders" element={<Orders />} />

     {/* Admin 🔥 */}
     <Route path="/admin" element={
      <AdminRoute>
       <AdminDashboard />
      </AdminRoute>
     } />

    </Routes>
   </BrowserRouter>
  </CartProvider>
 );
}

export default App;