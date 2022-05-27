import React from "react";
import Homepage from "../Pages/Home/Homepage/Homepage";

import { Route, Switch } from "react-router";
import ListPage from "../Pages/List/ListPage";
import Header from "../Header/Header";

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/:id" component={ListPage} />
      </Switch>
    </>
  );
}
