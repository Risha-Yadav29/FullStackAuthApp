import { useEffect, useState } from "react";
import axios from "axios";

function Leaves() {
  const [leaveData, setLeaveData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: ""
  });

  const [leaves, setLeaves] = useState([]);

  const handleChange = (e) => {
    setLeaveData({
      ...leaveData,
      [e.target.name]: e.target.value
    });
  };

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/leaves/my-leaves",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeaves(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  const loadLeaves = async () => {
    await fetchLeaves();
  };

  loadLeaves();
}, []);

  const submitLeave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/leaves",
        leaveData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Leave Request Submitted");

      setLeaveData({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: ""
      });

      fetchLeaves();

    } catch (error) {
      console.error(error);
      alert("Failed To Submit Leave");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Leave Management</h1>

      <input
        type="text"
        name="leave_type"
        placeholder="Leave Type"
        value={leaveData.leave_type}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="date"
        name="start_date"
        value={leaveData.start_date}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="date"
        name="end_date"
        value={leaveData.end_date}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="reason"
        placeholder="Reason"
        value={leaveData.reason}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={submitLeave}>
        Submit Leave
      </button>

      <hr />

      <h2>My Leave Requests</h2>

      {leaves.map((leave) => (
        <div
          key={leave.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h4>{leave.leave_type}</h4>

          <p>
            {leave.start_date?.slice(0,10)}
            {" - "}
            {leave.end_date?.slice(0,10)}
          </p>

          <p>Status: {leave.status}</p>

          <p>{leave.reason}</p>
        </div>
      ))}
    </div>
  );
}

export default Leaves;