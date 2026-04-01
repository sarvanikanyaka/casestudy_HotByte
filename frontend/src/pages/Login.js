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

 return(
  <div className="auth-container">
   <div className="container">

    <h1>HotByte Login</h1>

    {error && <p className="error">{error}</p>}

    <form onSubmit={handleSubmit}>
     <input name="email" placeholder="Email" onChange={handleChange}/>
     <input name="password" type="password" placeholder="Password" onChange={handleChange}/>
     <button type="submit">Login</button>
    </form>

    <a href="/register">Register</a>

   </div>
  </div>
 );
}

export default Login;