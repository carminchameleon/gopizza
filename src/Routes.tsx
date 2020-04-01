import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Board from 'component/board/Board';
import Login from 'component/login';
import Map from 'component/map/Map';
import System from 'component/system/System';
import Completion from 'component/board/Completion';
import SignUp from 'component/signup';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/board" component={Board} />
          <Route exact path="/board/completion" component={Completion} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/system" component={System} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
