import { useEffect, useState } from "react";
import axios from "axios";

function LeaveApprovals() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/leaves/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeaves(res.data);

    } catch (error) {
      console.log(error);
    }
  };

 useEffect(() => {
  const loadLeaves = async () => {
    await fetchLeaves();
  };

  loadLeaves();
}, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Leave Approvals</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Manager</th>
            <th>HR</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.name}</td>
              <td>{leave.leave_type}</td>
              <td>{leave.status}</td>
              <td>{leave.manager_status}</td>
              <td>{leave.hr_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveApprovals;