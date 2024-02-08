import React from "react";

function Checkbox({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input type="checkbox" checked={value} onChange={onChange} />
      <label className="checkbox-label">{label}</label>
    </div>
  );
}

export default Checkbox;
