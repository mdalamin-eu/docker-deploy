import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from '../components/login/'
import Menu from '../components/Home/menu'
class App extends Component {
  render() {
    return (
      <Router>
        <Menu/>
         <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    )
  }
}
export default  App
