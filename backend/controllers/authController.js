const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4)",
      [name, email, hashedPassword, "user"]
    );

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "User not found"
      });
    }

  console.log("HASH:", user.rows[0].password);

const validPassword = await bcrypt.compare(
  password,
  user.rows[0].password
);

console.log("VALID:", validPassword);

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user.rows[0].id,
        email: user.rows[0].email,
        role: user.rows[0].role
      },
      "secretkey",
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id,name,email,role FROM users WHERE id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);

  } catch (error) {
    console.error("PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  profile
};