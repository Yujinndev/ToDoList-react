function TodoItem({ details, onDelete, onEdit }) {
  return (
    <div
      className={`todo-item + ${
        details.status === "Done" ? "done" : "ongoing"
      }`}
    >
      <div className="badge">
        <i>{details.status}</i>
      </div>

      <div>
        <h3 className="details-text">{details.name}</h3>
      </div>

      <div style={{ display: "flex", gap: 2 }}>
        <button className="btn" type="button" onClick={onDelete}>
          <i className="fa fa-trash-o" />
        </button>
        <button className="btn" type="button" onClick={onEdit}>
          <i className="fa fa-pencil" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
