import React, { Component } from "react";
import CardCreate from "../CardCreate/CardCreate";
import CheckList from "../CheckList/CheckList";

import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [],
      cardCreateDropDown: true,
      cardName: "",
      checklist: false,
      cardId: "",
      checklistTitle: "",
    };
  }
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/lists/${this.props.listId}/cards?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ card: response });
      })
      .catch((err) => console.error(err));
  }

  deleteCard = (id) => {
    fetch(
      `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((text) =>
        this.setState({
          card: this.state.card.filter((card) => {
            return card.id !== id;
          }),
        })
      )
      .catch((err) => console.error(err));
  };

  cardCreatHandle = () => {
    this.setState({
      cardCreateDropDown: !this.state.cardCreateDropDown,
      cardName: "",
    });
  };

  cardNameHandle = (event) => {
    this.setState({ cardName: event.target.value });
  };

  cardAdding = () => {
    if (this.state.cardName !== "") {
      fetch(
        `https://api.trello.com/1/cards?idList=${this.props.listId}&name=${this.state.cardName}&key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((newCard) =>
          this.setState({ card: [...this.state.card, newCard] })
        )
        .catch((err) => console.error(err));
      this.setState({ cardCreateDropDown: !this.state.cardCreateDropDown });
    }
  };
  getChecklist = (id, name) => {
    this.setState({
      checklist: !this.state.checklist,
      checklistTitle: name,
      cardId: id,
    });
  };

  closeChecklist = () => {
    this.setState({ checklist: !this.state.checklist });
  };

  render() {
    return (
      <div className="card-wrapper">
        <div className="card-container">
          {this.state.card.map((card) => {
            return (
              <div
                key={card.id}
                className="card"
                onClick={() => this.getChecklist(card.id, card.name)}
              >
                <p>{card.name}</p>
                <i
                  onClick={(event) => {
                    event.stopPropagation();
                    this.deleteCard(card.id);
                  }}
                  className="fa fa-trash"
                  aria-hidden="true"
                ></i>
              </div>
            );
          })}
        </div>
        {this.state.cardCreateDropDown ? (
          <button onClick={this.cardCreatHandle} className="card-add-btn">
            + Add a card
          </button>
        ) : (
          <CardCreate
            cardAdding={this.cardAdding}
            cardNameHandle={this.cardNameHandle}
            cardCreatHandle={this.cardCreatHandle}
          />
        )}
        {this.state.checklist && (
          <CheckList
            closeChecklist={this.closeChecklist}
            listName={this.props.listName}
            cardName={this.state.checklistTitle}
            cardId={this.state.cardId}
          />
        )}
      </div>
    );
  }
}
// <Card listId={list.id}/>
