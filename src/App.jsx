import { useState, useEffect, useRef } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import PropTypes from "prop-types";
import FilterMenu from "./components/FilterMenu";

TodoItem.propTypes = {
  details: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

function findItemOnArray(arr, itemId) {
  return arr.find((el) => el.id === itemId);
}

function App() {
  const [todos, setTodos] = useState([
    { id: 0, name: "Code In React", status: "Done" },
    { id: 1, name: "Sleep, then Repeat", status: "Ongoing" },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editingItemId, setEditingItemId] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const DEFAULT_STATUS = "Ongoing";

  const inputRef = useRef();

  const filteredList = !selectedFilter
    ? todos
    : todos.filter((todo) => todo.status === selectedFilter);

  useEffect(() => {
    // this will make the input in focus
    if (editingItemId !== "") {
      inputRef.current.focus();
    }
  }, [editingItemId]);

  const handleSave = () => {
    if (newTodo === "") return;

    const itemToEdit = findItemOnArray(todos, editingItemId);
    if (itemToEdit) {
      // Editing existing item
      itemToEdit.name = newTodo;
    } else {
      // Creating a new item
      const maxId = Math.max(...todos.map((todo) => todo.id), 0);
      setTodos([
        ...todos,
        { name: newTodo, id: maxId + 1, status: DEFAULT_STATUS },
      ]);
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
    const itemToComplete = findItemOnArray(todos, item.id);
    itemToComplete.status = "Done";

    setTodos([...todos]);
  };

  const assignFilter = (updatedFilter) => {
    setSelectedFilter(updatedFilter);
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
          ref={inputRef} // Ref for focusing the input field
        />
        <button type="submit" onClick={handleSave}>
          Save
        </button>
      </div>

      <FilterMenu onValueChange={assignFilter} selected={selectedFilter} />

      <div className="lists">
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <TodoItem
              key={item.id}
              details={item}
              onDelete={() => handleDelete(item)}
              onEdit={() => handleEdit(item)}
              onComplete={() => handleCompleted(item)}
            />
          ))
        ) : (
          <h4>No {selectedFilter} tasks!</h4>
        )}
      </div>
    </div>
  );
}

export default App;
