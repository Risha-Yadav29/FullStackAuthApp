
import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
  "linear-gradient(135deg, #E9D5FF, #DDD6FE, #C4B5FD)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
overflow: "hidden",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
  style={{
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "#C084FC",
    top: "-100px",
    left: "-100px",
    opacity: 0.25
  }}
/>

<div
  style={{
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "#A855F7",
    bottom: "-120px",
    right: "-120px",
    opacity: 0.2
  }}
/>
      <div
        style={{
          width: "420px",
         background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(15px)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          color: "#6B21A8"
        }}
      >
       <h1
  style={{
    textAlign: "center",
    fontSize: "38px",
    lineHeight: "1.2",
    marginBottom: "15px",
    color: "#A855F7"
  }}
>
  iSOFTZone HRMS
</h1>
        <p
  style={{
    textAlign: "center",
    opacity: 0.9,
    marginBottom: "30px"
  }}
>
  Employee Management Portal
</p>
<p
  style={{
    textAlign: "center",
    fontSize: "13px",
    color: "#7E22CE",
    marginBottom: "20px"
  }}
>
  Human Resource Management System
</p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "15px",
            boxSizing: "border-box"
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "20px",
            boxSizing: "border-box"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            background: "#A855F7",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#93c5fd"
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
