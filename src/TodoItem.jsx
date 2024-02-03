function TodoItem({ details, onDelete, onEdit, onComplete }) {
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

      <div className="btn-container">
        <button className="btn" type="button" onClick={onDelete}>
          <i className="fa fa-trash-o" />
        </button>
        <button className="btn" type="button" onClick={onEdit}>
          <i className="fa fa-pencil" />
        </button>

        {details.status !== "Done" && (
          <button className="btn black" type="button" onClick={onComplete}>
            <i className="fa fa-check" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
