import { useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [editingItemId, setEditingItemId] = useState("");
  const [todos, setTodos] = useState([
    { id: 0, name: "Code In React", status: "Done" },
    { id: 1, name: "Sleep, then Repeat", status: "Ongoing" },
  ]);

  const findTodoById = (itemId) => {
    return todos.find((todo) => todo.id === itemId);
  };

  const handleSave = () => {
    if (newTodo === "") return;

    const itemToEdit = findTodoById(editingItemId);

    if (itemToEdit) {
      // Editing existing item
      itemToEdit.name = newTodo;
    } else {
      // Creating a new item
      const maxId = Math.max(...todos.map((todo) => todo.id), 0);
      setTodos([...todos, { name: newTodo, id: maxId + 1, status: "Ongoing" }]);
    }

    setNewTodo("");
    setEditingItemId("");
  };

  const handleDelete = (item) => {
    const newTodos = todos.filter((todo) => todo.id !== item.id);
    setTodos(newTodos);
  };

  const handleEdit = (item) => {
    setNewTodo(item.name);
    setEditingItemId(item.id);
  };

  const handleCompleted = (item) => {
    const itemToComplete = findTodoById(item.id);
    itemToComplete.status = "Done";

    setTodos([...todos]);
  };

  return (
    <div>
      <div className="form-container">
        <input
          className="form-input"
          type="text"
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" onClick={handleSave}>
          Save
        </button>
      </div>

      <div className="lists">
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            details={item}
            onDelete={() => handleDelete(item)}
            onEdit={() => handleEdit(item)}
            onComplete={() => handleCompleted(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
