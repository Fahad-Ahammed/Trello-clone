import React, { Component } from "react";
import List from "./List/List";


export default class ListPage extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      createListPopUp: true,
      listTitleName: "",
      checklist: true,
      backgroundColor: "",
      backgroundImage: "",
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    fetch(
      `https://api.trello.com/1/boards/${id}/lists?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`
    )
      .then((response) => response.json())
      .then((response) => {
        response.map((list) =>
          this.setState({ list: [...this.state.list, list] })
        );
      })
      .catch((err) => console.log(err));
    fetch(
      `https://api.trello.com/1/boards/${id}?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((board) =>
        this.setState({
          backgroundColor: board.prefs.backgroundColor,
          backgroundImage: board.prefs.backgroundImage,
        })
      )
      .catch((err) => console.error(err));
  }

  listCreateButtonHandle = () => {
    if (this.state.listTitleName !== "") {
      fetch(
        `https://api.trello.com/1/lists?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}&name=${this.state.listTitleName}&idBoard=${this.props.match.params.id}&pos=bottom`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((newList) =>
          this.setState({ list: [...this.state.list, newList] })
        )
        .catch((err) => console.error(err));

      this.setState({ createListPopUp: !this.state.createListPopUp });
    }
  };
  listDelete = (id) => {
    fetch(
      `https://api.trello.com/1/lists/${id}?key=${process.env.REACT_APP_API_KEY}&token=${process.env.REACT_APP_API_TOKEN}&closed=true`,
      {
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .then(() => {
        this.setState({
          list: this.state.list.filter((list) => {
            return list.id !== id;
          }),
        });
      })
      .catch((err) => console.error(err));
  };
  listButtonHandleOpen = () => {
    this.setState({
      createListPopUp: !this.state.createListPopUp,
      listTitleName: "",
    });
  };

  listTitleHandleChange = (event) => {
    this.setState({
      listTitleName: event.target.value,
    });
  };

  render() {
    return (
      <>
        <List
          cardcreation={this.cardcreation}
          listDelete={this.listDelete}
          listButtonHandleOpen={this.listButtonHandleOpen}
          listTitleHandleChange={this.listTitleHandleChange}
          createListPopUp={this.state.createListPopUp}
          lists={this.state.list}
          listCreateButtonHandle={this.listCreateButtonHandle}
          backgroundImage={`url(${this.state.backgroundImage})`}
          backgroundColor={this.state.backgroundColor}
        ></List>
      </>
    );
  }
}
