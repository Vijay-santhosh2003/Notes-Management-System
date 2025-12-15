import { useEffect, useState } from "react";

const NoteForm = ({ onAdd, onUpdate, editingNote, cancelEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const submitHandler = () => {
    if (!title || !content) return alert("All fields required");

    editingNote ? onUpdate(title, content) : onAdd(title, content);

    setTitle("");
    setContent("");
  };

  return (
    <div className="card dark-card p-3">
      <h5 className="text-white">
        {editingNote ? "✏️ Edit Note" : "➕ Add Note"}
      </h5>

      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={submitHandler}>
        {editingNote ? "Update Note" : "Add Note"}
      </button>

      {editingNote && (
        <button className="btn btn-secondary w-100 mt-2" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default NoteForm;
