import React from "react";

const TodoItem = ({ details, onDelete, onEdit, onComplete }) => {
  const isDone = details.status === "Done";
  const statusClass = isDone ? "done" : "ongoing";

  return (
    <div className={`todo-item ${statusClass}`}>
      <div className="badge">
        <i>{details.status}</i>
      </div>

      <h3 className="details-text">{details.name}</h3>

      <div className="btn-container">
        <button className="btn" type="button" onClick={onDelete}>
          <i className="fa fa-trash-o" />
        </button>

        <button className="btn" type="button" onClick={onEdit}>
          <i className="fa fa-pencil" />
        </button>

        {!isDone && (
          <button className="btn black" type="button" onClick={onComplete}>
            <i className="fa fa-check" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
