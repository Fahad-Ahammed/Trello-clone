import React from "react";
import "./CreateCheckItem.css";
export default function CreateCheckItem({addNewCheckItemHandle,newCheckItemName,postNewCheckItem}) {
  return (
    <div className="checkitem-create">
      <input
        onChange={newCheckItemName}
        type="text"
        placeholder="Add an item"
        className="checkitem-input"
      />

      <div className="checkitem-btns">
        <button onClick={postNewCheckItem} className="checkitem-add-btn">Add</button>
        <i onClick={addNewCheckItemHandle} className="fas fa-times"></i>
      </div>
    </div>
  );
}
