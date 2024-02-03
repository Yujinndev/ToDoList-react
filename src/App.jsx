import { useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [newIndex, setNewIndex] = useState("");
  const [lists, setLists] = useState([
    { id: 0, name: "Create Pseudocode", status: "Done" },
    { id: 1, name: "Translate into Flowchart", status: "Ongoing" },
  ]);

  const handleCreate = () => {
    if (newTodo === "") return;

    // to check the index if its exists
    const isItemExisting = lists.find((list) => {
      return list.id === newIndex;
    });

    if (isItemExisting) {
      isItemExisting.name = newTodo;
    } else {
      const maxId = Math.max(...lists.map((todo) => todo.id), 0);
      setLists([...lists, { name: newTodo, id: maxId + 1, status: "Ongoing" }]);
    }

    setNewTodo("");
    setNewIndex("");
  };

  const handleDelete = (item) => {
    const newLists = lists.filter((list) => list.id !== item.id);
    setLists(newLists);
  };

  const handleEdit = (item) => {
    setNewTodo(item.name);
    setNewIndex(item.id);
  };

  return (
    <>
      <div className="form-container">
        <input
          className="form-input"
          type="text"
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input type="hidden" placeholder="For Update" value={newIndex} />
        <button type="submit" onClick={handleCreate}>
          Save
        </button>
      </div>

      <div className="lists">
        {lists.map((item, index) => {
          return (
            <TodoItem
              key={index}
              details={item}
              onDelete={() => handleDelete(item)}
              onEdit={() => handleEdit(item)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
