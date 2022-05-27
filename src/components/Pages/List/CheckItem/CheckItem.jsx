import React, { Component } from "react";
import "./CheckItem.css";
import CreateCheckItem from "./CreateCheckItem/CreateCheckItem";

export default class CheckItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkItems: [],
      addNewCheckItem: false,
      newCheckItemName: "",
      checktest: true,
    };
  }
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/checklists/${this.props.checklistId}/checkItems?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((checkItem) => this.setState({ checkItems: checkItem }))
      .catch((err) => console.error(err));
  }
  addNewCheckItemHandle = () => {
    this.setState({
      addNewCheckItem: !this.state.addNewCheckItem,
      newCheckItemName: "",
    });
  };
  newCheckItemName = (event) => {
    this.setState({ newCheckItemName: event.target.value });
  };
  postNewCheckItem = () => {
    if (this.state.newCheckItemName !== "") {
      fetch(
        `https://api.trello.com/1/checklists/${this.props.checklistId}/checkItems?name=${this.state.newCheckItemName}&key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((newCheckitem) =>
          this.setState({
            checkItems: [...this.state.checkItems, newCheckitem],
            addNewCheckItem: !this.state.addNewCheckItem,
          })
        )
        .catch((err) => console.error(err));
    }
  };
  deleteCheckItem = (id) => {
    fetch(
      `https://api.trello.com/1/checklists/${this.props.checklistId}/checkItems/${id}?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: "DELETE",
      }
    )
      .then(() =>
        this.setState({
          checkItems: this.state.checkItems.filter((checkitem) => {
            return checkitem.id !== id;
          }),
        })
      )
      .catch((err) => console.error(err));
  };

  checkingitem = (id, check) => {
    fetch(
      `https://api.trello.com/1/cards/${this.props.cardId}/checklist/${
        this.props.checklistId
      }/checkItem/${id}?state=${check ? "complete" : "incomplete"}&key=${
        process.env.REACT_APP_API_KEY
      }&token=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: "PUT",
      }
    ).catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="checkitem-wrapper">
        {this.state.checkItems.map((checkitem) => {
          return (
            <div key={checkitem.id} className="checkitem-container">
              <input
                className="checkitem-box"
                type="checkbox"
                onChange={(event) => {
                  this.checkingitem(checkitem.id, event.target.checked);
                }}
                defaultChecked={(checkitem.state === "complete") & true}
              />

              <span className="checkitem-name">{checkitem.name}</span>

              <i
                onClick={() => this.deleteCheckItem(checkitem.id)}
                className="fa fa-trash"
                aria-hidden="true"
              ></i>
            </div>
          );
        })}

        {this.state.addNewCheckItem ? (
          <CreateCheckItem
            postNewCheckItem={this.postNewCheckItem}
            newCheckItemName={this.newCheckItemName}
            addNewCheckItemHandle={this.addNewCheckItemHandle}
          />
        ) : (
          <button
            onClick={this.addNewCheckItemHandle}
            className="checklist-add-item"
          >
            Add an item
          </button>
        )}
      </div>
    );
  }
}
