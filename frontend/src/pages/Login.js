import API from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

function Login(){

 const [data,setData]=useState({email:"",password:""});
 const [error,setError]=useState("");
 const nav = useNavigate();

 const handleChange=(e)=>{
  setData({...data,[e.target.name]:e.target.value});
 };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!data.email || !data.password) {
    setError("All fields required");
    return;
  }

  try {
    const res = await API.post("/api/auth/login", data);

   
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("userId", res.data.userId);

    if (res.data.role === "ROLE_ADMIN") {
      nav("/admin");
    } else {
      nav("/home");
    }

  } catch (err) {
    setError("Invalid credentials");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">HotByte</h1>
        <p className="auth-subtitle">Login to discover fresh, delicious meals</p>

        {error && <p className="auth-error">⚠️ {error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>Email Address</label>
            <input 
              name="email" 
              className="premium-input" 
              placeholder="e.g., alex@example.com" 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="auth-input-group">
            <label>Password</label>
            <input 
              name="password" 
              type="password" 
              className="premium-input" 
              placeholder="••••••••" 
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", marginTop: "10px" }}>
            Login & Explore
          </button>
        </form>

        <div className="auth-link-container">
          New to HotByte? <a href="/register">Create an account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;