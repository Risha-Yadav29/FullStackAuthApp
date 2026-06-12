const pool = require("../config/db");

const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      departmentId
    } = req.body;

    const employee = await pool.query(
      `INSERT INTO "Employee"
      (name,email,"departmentId")
      VALUES($1,$2,$3)
      RETURNING *`,
      [name, email, departmentId]
    );

    res.status(201).json(employee.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await pool.query(
      `SELECT * FROM "Employee"
       ORDER BY id ASC`
    );

    res.json(employees.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      departmentId
    } = req.body;

    const employee = await pool.query(
      `UPDATE "Employee"
       SET name=$1,
           email=$2,
           "departmentId"=$3
       WHERE id=$4
       RETURNING *`,
      [name, email, departmentId, id]
    );

    res.json(employee.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM "Employee"
       WHERE id=$1`,
      [id]
    );

    res.json({
      message: "Employee Deleted"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};