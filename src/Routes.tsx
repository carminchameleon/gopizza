import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Board from "component/board/Board";
import Login from "component/login/Login";
import Map from "component/map/Map";
import System from "component/system/System";
import GlobalStyles from "styles/GlobalStyle"


class Routes extends React.Component {
    render() {
      return (
        <Router>
          <Switch>
            <Route exact path="/board" component={Board} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/system" component={System} />
          </Switch>
        </Router>
      );
    }
  }
  
  export default Routes;