const pool = require("../config/db");

const createLeaveRequest = async (req, res) => {
  try {
    const {
      leave_type,
      start_date,
      end_date,
      reason
    } = req.body;

    const employee_id = req.user.id;

    const leave = await pool.query(
      `INSERT INTO leave_requests
      (employee_id, leave_type, start_date, end_date, reason)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason
      ]
    );

    res.status(201).json(leave.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await pool.query(
      `SELECT *
       FROM leave_requests
       WHERE employee_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json(leaves.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await pool.query(
      `SELECT
        leave_requests.*,
        users.name,
        users.email
      FROM leave_requests
      JOIN users
      ON leave_requests.employee_id = users.id
      ORDER BY leave_requests.created_at DESC`
    );

    res.json(leaves.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const managerApprove = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await pool.query(
      `UPDATE leave_requests
       SET manager_status = 'Approved'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    await pool.query(
      `INSERT INTO approval_history
      (leave_id, approved_by, action)
      VALUES ($1,$2,$3)`,
      [
        id,
        req.user.id,
        "Manager Approved"
      ]
    );

    res.json(leave.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const managerReject = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await pool.query(
      `UPDATE leave_requests
       SET manager_status = 'Rejected',
           status = 'Rejected'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    await pool.query(
      `INSERT INTO approval_history
      (leave_id, approved_by, action)
      VALUES ($1,$2,$3)`,
      [
        id,
        req.user.id,
        "Manager Rejected"
      ]
    );

    res.json(leave.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const hrApprove = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await pool.query(
      `UPDATE leave_requests
       SET hr_status = 'Approved',
           status = 'Approved'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    await pool.query(
      `INSERT INTO approval_history
      (leave_id, approved_by, action)
      VALUES ($1,$2,$3)`,
      [
        id,
        req.user.id,
        "HR Approved"
      ]
    );

    res.json(leave.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const hrReject = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await pool.query(
      `UPDATE leave_requests
       SET hr_status = 'Rejected',
           status = 'Rejected'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    await pool.query(
      `INSERT INTO approval_history
      (leave_id, approved_by, action)
      VALUES ($1,$2,$3)`,
      [
        id,
        req.user.id,
        "HR Rejected"
      ]
    );

    res.json(leave.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {

    const totalLeaves = await pool.query(`
      SELECT COUNT(*) FROM leave_requests
      WHERE employee_id = $1
    `, [req.user.id]);

    const pendingLeaves = await pool.query(`
      SELECT COUNT(*) FROM leave_requests
      WHERE employee_id = $1
      AND status = 'Pending'
    `, [req.user.id]);

    const approvedLeaves = await pool.query(`
      SELECT COUNT(*) FROM leave_requests
      WHERE employee_id = $1
      AND status = 'Approved'
    `, [req.user.id]);

    res.json({
      totalLeaves: totalLeaves.rows[0].count,
      pendingLeaves: pendingLeaves.rows[0].count,
      approvedLeaves: approvedLeaves.rows[0].count
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getDashboardStats,
  createLeaveRequest,
  getMyLeaves,
  getAllLeaves,
  managerApprove,
  managerReject,
  hrApprove,
  hrReject
};