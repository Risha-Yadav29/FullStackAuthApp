import { useState, useEffect } from "react";
import axios from "axios";

function Employees() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    departmentId: ""
  });

  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  const loadEmployees = async () => {
    await fetchEmployees();
  };

  loadEmployees();
}, []);

  const createEmployee = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/employees",
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

      fetchEmployees();
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

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Employee Email"
        value={employee.email}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        name="departmentId"
        placeholder="Department ID"
        value={employee.departmentId}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={createEmployee}>
        Create Employee
      </button>

      <hr />

      <h2>Employees List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department ID</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.departmentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;