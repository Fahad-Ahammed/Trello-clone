import React, { Component } from "react";
import CheckItem from "../CheckItem/CheckItem";
import "./CheckList.css";

import ChecklistCreate from "./ChecklistCreate/ChecklistCreate";

export default class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkList: [],
      addnewChecklist: false,
      newChecklistTitleName: "",
    };
  }
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/cards/${this.props.cardId}/checklists?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((checklist) => this.setState({ checkList: checklist }))
      .catch((err) => console.error(err));
  }

  addnewChecklistHandle = () => {
    this.setState({
      addnewChecklist: !this.state.addnewChecklist,
      newChecklistTitleName: "",
    });
  };
  addnewchecklistTitle = (event) => {
    this.setState({ newChecklistTitleName: event.target.value });
  };
  postNewChecklist = () => {
    if (this.state.newChecklistTitleName !== "") {
      fetch(
        `https://api.trello.com/1/cards/${this.props.cardId}/checklists?name=${this.state.newChecklistTitleName}&key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((newChecklist) =>
          this.setState({ checkList: [...this.state.checkList, newChecklist] })
        )
        .catch((err) => console.error(err));
      this.setState({ addnewChecklist: !this.state.addnewChecklist });
    }
  };
  deleteChecklist = (id) => {
    fetch(
      `https://api.trello.com/1/checklists/${id}?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: "DELETE",
      }
    )
      .then(() =>
        this.setState({
          checkList: this.state.checkList.filter((checklist) => {
            return checklist.id !== id;
          }),
        })
      )
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="checklist-overlay">
        <div className="checklist-wrapper">
          <div className="checklist-header">
            <i className="fas fa-credit-card"></i>
            <div className="checklist-title-wrapper">
              <h1 className="checklist-card-title">{this.props.cardName}</h1>
              <h5 className="checklist-list-name">
                in list {this.props.listName}
              </h5>
            </div>
            <i onClick={this.props.closeChecklist} className="fas fa-times"></i>
          </div>
          <div className="checklist-content-wrapper">
            {this.state.checkList.map((cl, index) => {
              return (
                <div key={index} className="checklists-container">
                  <div className="checklists">
                    <i className="fas fa-tasks"></i>
                    <span className="checklist-name">{cl.name}</span>
                    <button
                      onClick={() => this.deleteChecklist(cl.id)}
                      className="checklist-delete-btn"
                    >
                      Delete
                    </button>
                  </div>

                  <CheckItem cardId={this.props.cardId} checklistId={cl.id} />
                </div>
              );
            })}
          </div>
          {this.state.addnewChecklist ? (
            <ChecklistCreate
              postNewChecklist={this.postNewChecklist}
              addnewchecklistTitle={this.addnewchecklistTitle}
              addnewChecklistHandle={this.addnewChecklistHandle}
            />
          ) : (
            <div className="add-checklist">
              <button
                onClick={this.addnewChecklistHandle}
                className="add-checklist-btn"
              >
                + Add checklist
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
