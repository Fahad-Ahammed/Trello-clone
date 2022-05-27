import React, { Component } from "react";
import Boards from "../Board/Boards";
import Modal from "../Modal/Modal";
import "./Homepage.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      boardDetails: [],
      modalMenu: false,
      boardTitle: "",
    };
  }
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/members/me/boards?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`
    )
      .then((response) => response.json())
      .then((response) =>
        response.map((board) =>
          this.setState({ boardDetails: [...this.state.boardDetails, board] })
        )
      );
  }
  modaldisplay = () => {
    this.setState({ modalMenu: !this.state.modalMenu,
      boardTitle:''
    });
  };
  modalClose = (event) => {  
  this.setState({ modalMenu: !this.state.modalMenu });
  };
  modalInputHandle = (event) => {
    this.setState({ boardTitle: event.target.value });
  };
  modalButtonHandle = () => {
    const { boardTitle, boardDetails } = this.state;
    if (this.state.boardTitle !== "") {
      this.setState({ modalMenu: !this.state.modalMenu });
      fetch(
        `https://api.trello.com/1/boards/?name=${boardTitle}&key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            boardDetails: [...boardDetails, response],
          });
        })
        .catch((err) => console.error(err));
    }
  };

  render() {
    const { boardDetails, modalMenu } = this.state;
    return (
      <div>
        {modalMenu && (
          <Modal
            modalClose={this.modalClose}
            modalButtonHandle={this.modalButtonHandle}
            modalInputHandle={this.modalInputHandle}
          />
        )}
        <Boards fun={this.modaldisplay} boards={boardDetails} />
      </div>
    );
  }
}

export default App;
