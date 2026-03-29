const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", 
  database: "users_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});


// GET users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});


// ADD user
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (err, result) => {
      if (err) return res.send(err);
      res.json({ id: result.insertId, name, email, age });
    }
  );
});


// UPDATE user
app.put("/users/:id", (req, res) => {
  const { name, email, age } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, id],
    (err) => {
      if (err) return res.send(err);
      res.json({ id, name, email, age });
    }
  );
});


// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) return res.send(err);
    res.json({ message: "Deleted" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
