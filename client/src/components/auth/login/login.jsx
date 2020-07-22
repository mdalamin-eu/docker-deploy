import React,{Component} from 'react'
import axios from 'axios';
import {withRouter} from "react-router-dom"
import {authenticate, isAuth} from '../../utlis/auth'

import '../../App.css'

class  loginForm extends Component  {
    state = {
        email:'',
        password:''
    }
    handleemailInput = (e) => {
        this.setState({...this.state, email:e.target.value })
      }
  
      handlepasswordInput = (e) => {
          this.setState({...this.state, password:e.target.value })
      }

      componentDidMount(){
          if(isAuth()&& isAuth().loggedin){
              this.props.history.push('/')
          }
      }

    handleSubmit = (event) => {
 event.preventDefault()
 const{email,password} =this.state

 axios.post(`api/v1/user/login`,{email,password})
 .then(respons=>{
     authenticate(respons,()=> isAuth() && isAuth().loggedin ? this.props.history.push('/'):'');
     
 })
    }

  

   render() {
       return(
           <div className="App">
               <form onSubmit={this.handleSubmit}>
               <input name ='email' type="email" value={this.state.email} onChange={this.handleemailInput} placeholder="enter your email" className="emailInput"/>
      <input name ='password' type="password" value={this.state.password} onChange={this.handlepasswordInput} placeholder="enter your password" className="passwordInput"/>
      <input type="submit" value="Submit" />
     
      {JSON.stringify(isAuth())}
               </form>
 
           </div>
       )
   }
}

export default  withRouter(loginForm);
