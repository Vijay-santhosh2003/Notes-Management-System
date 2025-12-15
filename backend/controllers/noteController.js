const db = require("../config/db");

exports.createNote = (req, res) => {
  const { title, content, tag } = req.body;

  const sql =
    "INSERT INTO notes (user_id, title, content, tag) VALUES (?, ?, ?, ?)";

  db.query(sql, [req.user.id, title, content, tag], () => {
    res.status(201).json({ message: "Note created successfully" });
  });
};

exports.getNotes = (req, res) => {
  const search = req.query.search || "";
  const sql = `
    SELECT * FROM notes 
    WHERE user_id=? AND (title LIKE ? OR content LIKE ?)
  `;
  db.query(sql, [req.user.id, `%${search}%`, `%${search}%`], (err, result) =>
    res.json(result)
  );
};

exports.updateNote = (req, res) => {
  const { title, content } = req.body;
  db.query(
    "UPDATE notes SET title=?, content=? WHERE id=? AND user_id=?",
    [title, content, req.params.id, req.user.id],
    () => res.json({ message: "Note updated" })
  );
};

exports.deleteNote = (req, res) => {
  db.query(
    "DELETE FROM notes WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    () => res.json({ message: "Note deleted" })
  );
};
