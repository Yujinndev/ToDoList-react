function TodoItem({ details, onDelete, onEdit }) {
  return (
    <div className="todo-item">
      <li>
        <em>{details.name}</em>
      </li>

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
