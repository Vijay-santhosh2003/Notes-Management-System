const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) return res.status(400).json({ message: "User already exists" });
    res.status(201).json({ message: "User registered successfully" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (!result.length)
        return res.status(401).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({
        token,
        name: result[0].name,
      });
    }
  );
};
