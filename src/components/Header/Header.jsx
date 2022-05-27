import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  return (
    <Link to="/" className="header">
      <i className="fab fa-trello"></i>
      <h1 className="trello">Trello</h1>
    </Link>
  );
}
