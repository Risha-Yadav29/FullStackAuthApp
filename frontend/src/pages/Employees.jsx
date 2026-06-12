import { useState } from "react";
import axios from "axios";

function Employees() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    departmentId: ""
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const createEmployee = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://fullstackauthapp-backend.onrender.com/api/employees",
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Employee Created Successfully");

      setEmployee({
        name: "",
        email: "",
        departmentId: ""
      });

    } catch (error) {
      console.error(error);

      alert("Failed To Create Employee");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Employee Management System</h1>

      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={employee.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Employee Email"
        value={employee.email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="departmentId"
        placeholder="Department ID"
        value={employee.departmentId}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={createEmployee}>
        Create Employee
      </button>
    </div>
  );
}

export default Employees;