import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Board from 'component/board/Board';
import Login from 'component/login';
import Map from 'component/map/Map';
import System from 'component/system/System';
import Completion from 'component/board/Completion';
import SignUp from 'component/signup';
import AdminPage from 'component/mypage/admin/AdminPage';
import Reward from 'component/mypage/admin/Reward';
import CrewAccount from 'component/mypage/crew/CrewAccount';
import DeleteAccount from 'component/mypage/crew/DeleteAccount';
import ManagerPage from 'component/mypage/manager/ManagerPage';
import ManagerAccount from 'component/mypage/manager/ManagerAccount';

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
          <Route exact path="/admin_page" component={AdminPage} />
          <Route exact path="/reward" component={Reward} />
          <Route exact path="/crew_account" component={CrewAccount} />
          <Route exact path="/delete_account" component={DeleteAccount} />
          <Route exact path="/manager_page" component={ManagerPage} />
          <Route exact path="/manager_account" component={ManagerAccount} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
