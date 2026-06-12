import { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert(res.data.message);

      window.location.href = "/login";

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Signup</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <br />
      <br />

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

      <button onClick={handleSignup}>
        Signup
      </button>

      <br />
      <br />

      <a href="/login">
        Go To Login
      </a>
    </div>
  );
}

export default Signup;