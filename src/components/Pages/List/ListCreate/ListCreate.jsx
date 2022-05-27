import React from "react";
import "./ListCreate.css";
export default function ListCreate({
  listCreateButtonHandle,
  listTitleHandleChange,
  listButtonHandleOpen,
}) {
  return (
    <div className="list-create">
      <input
        onChange={listTitleHandleChange}
        className="list-create-input"
        type="text"
        placeholder="Enter list title"
      />
      <div className="list-create-add-list">
        <button onClick={listCreateButtonHandle} className="list-create-btn">
          Add list
        </button>
        <i onClick={listButtonHandleOpen} className="fas fa-times"></i>
      </div>
    </div>
  );
}
