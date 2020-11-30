import React from "react";
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home";
import Game from "./pages/Game";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/game/:gameId" component={Game}></Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
