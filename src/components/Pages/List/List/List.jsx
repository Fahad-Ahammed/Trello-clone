import React from "react";
import Card from "../Card/Card";
import ListCreate from "../ListCreate/ListCreate";
import "./List.css";
export default function List({
  lists,
  backgroundImage,
  listCreateButtonHandle,
  createListPopUp,
  listTitleHandleChange,
  listButtonHandleOpen,
  listDelete,
  backgroundColor,
}) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage,
      }}
      className="list-wrapper"
    >
      {lists.map((list) => {
        return (
          <div key={list.id} className="list-container">
            <div className="list-item">
              <h1 className="list-name">{list.name}</h1>
              <i
                onClick={() => listDelete(list.id)}
                className="fa fa-trash"
                aria-hidden="true"
              ></i>
            </div>
            <Card listName={list.name} listId={list.id} />
          </div>
        );
      })}
      {createListPopUp ? (
        <button onClick={listButtonHandleOpen} className="intial-btn">
          + Add another list
        </button>
      ) : (
        <ListCreate
          listTitleHandleChange={listTitleHandleChange}
          listButtonHandleOpen={listButtonHandleOpen}
          listCreateButtonHandle={listCreateButtonHandle}
        />
      )}
    </div>
  );
}
