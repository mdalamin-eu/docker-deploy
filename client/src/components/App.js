import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from '../components/auth/login/'
import Menu from '../components/Home/menu'
import Register from '../components/auth/register/'
class App extends Component {
  render() {
    return (
      <Router>
        <div className= "App">
        <Menu/>
         <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path= "/register" component={Register}/>

            
          
        </Switch>
        </div>
      </Router>
    )
  }
}
export default  App
