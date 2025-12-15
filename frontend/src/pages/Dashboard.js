import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔴 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🔵 FETCH NOTES
  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/api/notes", {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    if (!token) navigate("/");
    fetchNotes();
  }, []);

  // 🟢 ADD NOTE
  const addNote = async (title, content) => {
    await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, content }),
    });
    fetchNotes();
  };

  // 🟡 DELETE NOTE
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setNotes(notes.filter((n) => n.id !== id));
  };

  // 🟣 EDIT NOTE (OPEN FORM)
  const editNote = (note) => {
    setEditingNote(note);
  };

  // 🔵 UPDATE NOTE
  const updateNote = async (title, content) => {
    await fetch(`http://localhost:5000/api/notes/${editingNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, content }),
    });
    setEditingNote(null);
    fetchNotes();
  };

  return (
    <div className="dashboard-bg">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white">📒 My Notes</h3>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* NOTE FORM */}
      <NoteForm
        onAdd={addNote}
        onUpdate={updateNote}
        editingNote={editingNote}
        cancelEdit={() => setEditingNote(null)}
      />

      {/* NOTES LIST */}
      <div className="row mt-4">
        {notes.map((note) => (
          <div className="col-md-4 mb-3" key={note.id}>
            <NoteCard note={note} onDelete={deleteNote} onEdit={editNote} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
