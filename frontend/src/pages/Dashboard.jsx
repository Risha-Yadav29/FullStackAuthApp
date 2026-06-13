import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";
import "./Dashboard.css";

function Dashboard() {

  const [activeSection, setActiveSection] = useState("dashboard");
  const [user, setUser] = useState(null);

  const stats = {
    totalLeaves: 12,
    pendingLeaves: 3,
    approvedLeaves: 9
  };

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setUser(data);

    } catch (error) {
      console.log(error);
    }
  };

  fetchProfile();
}, []);

  const pieData = [
    { name: "Present", value: 22 },
    { name: "Absent", value: 3 },
    { name: "Leave", value: 5 }
  ];

  const lineData = [
    { month: "Jan", leaves: 2 },
    { month: "Feb", leaves: 1 },
    { month: "Mar", leaves: 4 },
    { month: "Apr", leaves: 2 },
    { month: "May", leaves: 3 }
  ];

  const departmentData = [
  { department: "HR", employees: 8 },
  { department: "IT", employees: 12 },
  { department: "Finance", employees: 5 }
];

const attendanceData = [
  { month: "Jan", attendance: 88 },
  { month: "Feb", attendance: 91 },
  { month: "Mar", attendance: 93 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 95 }
];

  const COLORS = ["#C084FC", "#E879F9", "#DDD6FE"];

  if (!user) {
  return <h2>Loading...</h2>;
}
  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <h2>iSOFTZone HRMS</h2>
        <p
  style={{
    fontSize: "12px",
    color: "#6b21a8",
    marginTop: "-10px"
  }}
>
  Employee Management Portal
</p>

        <button onClick={() => setActiveSection("dashboard")}>
          Dashboard
        </button>

       <button onClick={() => setActiveSection("employees")}>
  Employees
</button>

<button onClick={() => setActiveSection("leaves")}>
  Leaves
</button>

<button onClick={() => setActiveSection("leaveApprovals")}>
  Leave Approvals
</button>

        <button onClick={() => setActiveSection("attendance")}>
          Attendance
        </button>

        <button onClick={() => setActiveSection("notifications")}>
          Notifications
        </button>

        <button onClick={() => setActiveSection("reports")}>
          Reports
        </button>

        <button onClick={() => setActiveSection("analytics")}>
          Analytics
        </button>

        <button onClick={() => setActiveSection("settings")}>
          Settings
        </button>
      </aside>

      <main className="main-content">

        <div className="topbar">
  <div>
    <h2>Welcome {user.name}</h2>

    <p>
      iSOFTZone Employee Management System
    </p>

    <p>
      Role: {user.role.toUpperCase()}
    </p>
  </div>

  <div
    className="top-icons"
    onClick={() => setActiveSection("notifications")}
    style={{
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "15px"
    }}
  >
    <span>📅 June 2026</span>
    <span>🔔</span>
  </div>
</div>

        {activeSection === "dashboard" && (
          <>
            <div className="cards">

              <div className="card">
                <h3>Total Leaves</h3>
                <h1>{stats.totalLeaves}</h1>
              </div>

              <div className="card">
                <h3>Approved Leaves</h3>
                <h1>{stats.approvedLeaves}</h1>
              </div>

              <div className="card">
                <h3>Pending Leaves</h3>
                <h1>{stats.pendingLeaves}</h1>
              </div>

              <div className="card">
                <h3>Role</h3>
                <h1>{user.role}</h1>
              </div>

            </div>

            <div className="charts">

              <div className="chart-box">
  <h3>Attendance Overview</h3>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      height: "250px"
    }}
  >
    <PieChart width={250} height={250}>
      <Pie
        data={pieData}
        dataKey="value"
        outerRadius={80}
      >
        {pieData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index]}
          />
        ))}
      </Pie>

      <Tooltip />
    </PieChart>

    <div>
      <p>
        <span style={{ color: COLORS[0], fontSize: "20px" }}>
          ●
        </span>{" "}
        Present
      </p>

      <p>
        <span style={{ color: COLORS[1], fontSize: "20px" }}>
          ●
        </span>{" "}
        Absent
      </p>

      <p>
        <span style={{ color: COLORS[2], fontSize: "20px" }}>
          ●
        </span>{" "}
        Leave
      </p>
    </div>
  </div>
</div>

              <div className="chart-box">
                <h3>Leave Trend</h3>

                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="leaves"
                      stroke="#A855F7"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
                           </div>

              <div className="chart-box">
                <h3>Department Distribution</h3>

                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={departmentData}>
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="employees"
                      stroke="#9333EA"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

<div className="chart-box">
  <h3>Monthly Attendance Rate</h3>

  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={attendanceData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />

      <Line
        type="monotone"
        dataKey="attendance"
        stroke="#7E22CE"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

</div>
          </>
              )}

       {activeSection === "employees" && (
  <div className="section-box">
    <h2>Employee Management</h2>

    <table
  width="100%"
  style={{
    textAlign: "left"
  }}
>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>Risha</td>
          <td>HR</td>
        </tr>

        <tr>
          <td>2</td>
          <td>John</td>
          <td>IT</td>
        </tr>

        <tr>
          <td>3</td>
          <td>Sarah</td>
          <td>Finance</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

      {activeSection === "leaves" && (
  <div className="section-box">
    <h2>Leave Requests</h2>

   <table
  width="100%"
  style={{
    textAlign: "left"
  }}
>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Leave Type</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Risha</td>
          <td>Sick Leave</td>
          <td>Pending</td>
        </tr>

        <tr>
          <td>John</td>
          <td>Casual Leave</td>
          <td>Approved</td>
        </tr>

        <tr>
          <td>Sarah</td>
          <td>Annual Leave</td>
          <td>Rejected</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

        {activeSection === "leaveApprovals" && (
  <div className="section-box">
    <h2>Leave Approvals</h2>

    <p>
      <strong>Risha</strong> - Sick Leave
    </p>

    <button
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "10px",
        background: "#22c55e",
        color: "white",
        cursor: "pointer",
        marginRight: "10px"
      }}
    >
      Approve
    </button>

    <button
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "10px",
        background: "#ef4444",
        color: "white",
        cursor: "pointer"
      }}
    >
      Reject
    </button>
  </div>
)}

        {activeSection === "attendance" && (
  <div className="section-box">
    <h2>Attendance</h2>

    <table
  width="100%"
  style={{
    textAlign: "left"
  }}
>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Risha</td>
          <td>Present</td>
        </tr>

        <tr>
          <td>John</td>
          <td>Present</td>
        </tr>

        <tr>
          <td>Sarah</td>
          <td>Absent</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

        {activeSection === "notifications" && (
          <div className="section-box">
            <h2>Notifications</h2>
            <p>🔔 Risha submitted a Sick Leave request</p>
<p>🔔 John's leave request was approved</p>
<p>🔔 Sarah's leave request was rejected</p>
          </div>
        )}

       {activeSection === "reports" && (
  <div className="section-box">
    <h2>Reports</h2>

    <table width="100%">
      <thead>
        <tr>
          <th>Report Name</th>
          <th>Status</th>
          <th>Generated On</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Employee Report</td>
          <td>Generated</td>
          <td>12-Jun-2026</td>
        </tr>

        <tr>
          <td>Attendance Report</td>
          <td>Generated</td>
          <td>12-Jun-2026</td>
        </tr>

        <tr>
          <td>Leave Summary Report</td>
          <td>Generated</td>
          <td>12-Jun-2026</td>
        </tr>

        <tr>
          <td>Department Performance Report</td>
          <td>Generated</td>
          <td>12-Jun-2026</td>
        </tr>
      </tbody>
    </table>

    <br />

    <button
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "10px",
        background: "#a855f7",
        color: "white",
        cursor: "pointer"
      }}
    >
      Generate New Report
    </button>
  </div>
)}

        {activeSection === "analytics" && (
          <div className="section-box">
            <h2>Analytics</h2>
            <p>Total Employees: 25</p>
<p>Attendance Rate: 92%</p>
<p>Approved Leaves: 18</p>
<p>Pending Leaves: 4</p>
          </div>
        )}

       {activeSection === "settings" && (
  <div className="section-box">
    <h2>Settings</h2>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }}
      style={{
        padding: "12px 20px",
        border: "none",
        borderRadius: "10px",
        background: "#a855f7",
        color: "white",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  </div>
)}

      </main>

    </div>
  );
}

export default Dashboard;
