import React, { useState } from "react";
import Checkbox from "../components/ui/Checkbox";

function MenuItems({ onFilterChange }) {
  const [filter, setFilter] = useState([
    { id: 0, name: "Done", isChecked: false },
    { id: 1, name: "Ongoing", isChecked: false },
  ]);

  const changeItemValue = (selectedItem) => {
    const updatedFilter = filter.map((item) => ({
      ...item,
      isChecked: item.id === selectedItem.id ? !item.isChecked : false,
    }));

    setFilter(updatedFilter);
    const checkedItem = updatedFilter.find((item) => item.isChecked);
    onFilterChange(checkedItem ? checkedItem.name : null);
  };

  return (
    <div className="menu">
      {filter.map((el) => (
        <Checkbox
          key={el.name}
          label={el.name}
          value={el.isChecked}
          onChange={() => changeItemValue(el)}
        />
      ))}
    </div>
  );
}

export default MenuItems;
