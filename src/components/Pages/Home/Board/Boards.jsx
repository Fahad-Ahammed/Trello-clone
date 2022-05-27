import React from "react";
import { Link } from "react-router-dom";
import "./Boards.css";
export default function Boards({ boards, fun }) {
  return (
    <div className="main">
      <h1 className="boards-header">Your Boards</h1>
      <div className="boardContainer">
        {boards.map((item, index) => {
          let style = {
            backgroundColor: item.prefs.backgroundColor,
            backgroundImage: `url(${item.prefs.backgroundImage})`,
          };
          return (
            <Link
              to={`/${item.id}`}
              style={style}
              className="boards"
              key={item.id}
            >
              <h1>{item.name}</h1>
            </Link>
          );
        })}
        <div onClick={fun} className="boards">
          <h4>create new board</h4>
        </div>
      </div>
    </div>
  );
}
