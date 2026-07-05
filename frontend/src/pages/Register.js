import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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

 return(
 <div className="container">
  <h1>Register</h1>

  {msg && <p className="error">{msg}</p>}

  <form onSubmit={handleSubmit}>
   <input name="name" placeholder="Name" onChange={handleChange}/>
   <input name="email" placeholder="Email" onChange={handleChange}/>
   <input name="password" type="password" placeholder="Password" onChange={handleChange}/>
   <input name="confirm" type="password" placeholder="Confirm Password" onChange={handleChange}/>
   <button type="submit">Register</button>
  </form>

  <a href="/">Already have an account? Login</a>
 </div>
 );
}

export default Register;