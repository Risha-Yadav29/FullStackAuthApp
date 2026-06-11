import { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

function Login() {
  const dispatch = useDispatch();

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

      localStorage.setItem(
        "token",
        res.data.token
      );

      dispatch(
        loginSuccess({
          email: formData.email
        })
      );

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
    <div style={{ padding: "30px" }}>
      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>

      <br />
      <br />

      <a href="/signup">
        Go To Signup
      </a>
    </div>
  );
}

export default Login;