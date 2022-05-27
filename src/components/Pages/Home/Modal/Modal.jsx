import React from "react";
import "./Modal.css";
export default function Modal({
  modalInputHandle,
  modalButtonHandle,
  modalClose,
}) {
  return (
    <div className="modal-overlay ">
      <div className="modal-box">
        <div className="modal-title">
          <input
            className="modal-input"
            type="text"
            placeholder="Add board tilte"
            onChange={modalInputHandle}
          />
          <span onClick={modalClose}>X</span>
        </div>
        <button onClick={modalButtonHandle} className=" close modal-btn ">
          create board
        </button>
      </div>
    </div>
  );
}
