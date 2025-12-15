const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note-card">
      <h5>{note.title}</h5>
      <p>{note.content}</p>

      <div className="d-flex gap-2">
        <button
          className="btn btn-sm btn-warning w-50"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>

        <button
          className="btn btn-sm btn-danger w-50"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
