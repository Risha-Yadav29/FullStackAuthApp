import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        const res = await axios.get(
          "https://fullstackauthapp-backend.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("PROFILE:", res.data);

        setUser(res.data);

      } catch (error) {
        console.log("ERROR:", error.response?.data);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>User Dashboard</h1>

      <h3>Welcome {user.name}</h3>

      <p>Email: {user.email}</p>

      <p>Role: {user.role}</p>
    </div>
  );
}

export default Dashboard;