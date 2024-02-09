import React, { useEffect, useState, useRef } from "react";
import Checkbox from "../components/ui/Checkbox";
import "../App.css";

export default function FilterMenu({ onValueChange, selected }) {
  const [options, setOptions] = useState([
    { id: 0, name: "Done", isChecked: false },
    { id: 1, name: "Ongoing", isChecked: false },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // for closing the menu if the user click outside the menu
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // for persisting the checkbox values
  useEffect(() => {
    const initialSelected = options.find((item) => item.name === selected);

    if (initialSelected) {
      let updatedFilter = updateOptionsArr(initialSelected);
      setOptions(updatedFilter);
    }
  }, [selected]);

  // reusable function to update the filter arr
  const updateOptionsArr = (selected) => {
    let newArr = options.map((item) => ({
      ...item,
      isChecked: item.id === selected.id ? !item.isChecked : false,
    }));

    return newArr;
  };

  const changeItemValue = (selectedItem) => {
    let updatedFilter = updateOptionsArr(selectedItem);
    setOptions(updateOptionsArr);

    const checkedItem = updatedFilter.find((item) => item.isChecked);
    onValueChange(checkedItem ? checkedItem.name : null);
  };

  const FILTER_STYLE =
    selected !== null ? (selected === "Done" ? "done" : "ongoing") : "";

  return (
    <div ref={menuRef} className="filter-container">
      <button
        className={`dropdown-btn btn ${FILTER_STYLE}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? (
          <i className="fa fa-filter" />
        ) : (
          <i className="fa fa-angle-up" />
        )}
      </button>

      {isOpen && (
        <div className="menu">
          {options.map((el) => (
            <Checkbox
              key={el.name}
              label={el.name}
              value={el.isChecked}
              onChange={() => changeItemValue(el)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
