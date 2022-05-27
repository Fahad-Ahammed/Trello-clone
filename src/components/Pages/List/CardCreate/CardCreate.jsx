import React from "react";
import "./CardCreate.css";
export default function CardCreate({
  cardCreatHandle,
  cardNameHandle,
  cardAdding,
}) {
  return (
    <div className="card-create">
      <input
        onChange={cardNameHandle}
        className="card-create-input"
        type="text"
        placeholder="Enter a title for this card"
      />
      <div className="card-create-add-card">
        <button onClick={cardAdding} className="card-create-btn">
          Add card
        </button>
        <i onClick={cardCreatHandle} className="fas fa-times"></i>
      </div>
    </div>
  );
}
