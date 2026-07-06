import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../Auth.css";

function Register(){
  const nav = useNavigate();

  const [data,setData]=useState({
   name:"",email:"",password:"",confirm:""
  });

  const [msg,setMsg]=useState("");

  const handleChange=(e)=>{
   setData({...data,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
   e.preventDefault();

   if(data.password.length < 6){
    setMsg("Password must be 6+ characters");
   }
   else if(data.password !== data.confirm){
    setMsg("Passwords do not match");
   }
   else{
    try{
     setMsg("");

     await API.post("/api/users/register", {
       name: data.name,
       email: data.email,
       password: data.password
     });

     alert("Registered Successfully ✅");
     nav("/");

    } catch(err){
     setMsg("Registration failed ❌");
    }
   }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "450px" }}>
        <h1 className="auth-logo">HotByte</h1>
        <p className="auth-subtitle">Join us to order delicious food today</p>

        {msg && <p className="auth-error">⚠️ {msg}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label>Full Name</label>
            <input 
              name="name" 
              className="premium-input" 
              placeholder="e.g., Alex Johnson" 
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Min. 6 characters" 
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Confirm Password</label>
            <input 
              name="confirm" 
              type="password" 
              className="premium-input" 
              placeholder="Re-enter password" 
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", marginTop: "10px" }}>
            Register Now
          </button>
        </form>

        <div className="auth-link-container">
          Already have an account? <a href="/">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default Register;