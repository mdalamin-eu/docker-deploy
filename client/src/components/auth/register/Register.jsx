import React, { Component } from 'react'
import ValidationMessage from './validMsg'
import axios from 'axios';
import {isAuth} from '../../utlis/auth'
import { withRouter } from 'react-router-dom';

class Register extends Component {

    state={
        firstname:'',
        lastname:'',lastnameValid:false,
        email:'',emailValid:false,
        password:'',passwordValid:false,
        passwordConfirmation:'', passwordConfirmationValid:false,
        phone:'',phoneValid:false,
        address:'',addressValid:false,
        birthdate:'',birthdateValid:false,
        errorsMsg: {}
    }

    //first name start
    handlefirstnameInput =(e)=>{
        this.setState({...this.state, firstname:e.target.value})
    }
//firstName close
    

                          ///lastname start

        handlelastnameInput=(e)=>{
            this.setState({...this.state, lastname:e.target.value
            },this.validateLastname )
        }

             
            validateLastname = () => {    
                const {lastname} = this.state;
                let errorsMsg = {...this.state.errorsMsg};
                let lastnameValid = true
        
        
                if (lastname.length <3){
                    lastnameValid = false;
                    errorsMsg.lastname= 'Must be lastname at least 3 characers name'
                }
                this.setState({lastnameValid, errorsMsg})
             }
        
                                        //lastName close


        handleemailInput=(e)=>{
            this.setState({...this.state, email:e.target.value},
                this.emalvalidate)
        }

        emalvalidate=()=>{
            const {email}=this.state;
            let emailValid= true;
            let errorsMsg={...this.state.errorsMsg}
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                emailValid=false;
                errorsMsg.email ='Invalid you enterd'
            }
            this.setState({
                emailValid,
                errorsMsg
            })
        }





   
        handlepasswordInput=(e)=> {
            this.setState({...this.state, password:e.target.value},
                this.passwordvalidate)
           
        }

        

        passwordvalidate =()=>{
            const {password}=this.state;
            let passwordValid=true;
            let errorsMsg={...this.state.errorsMgs}
            if(password.length<6){
                passwordValid=false;
                errorsMsg.password='Must be password at least 6 characters'
            }
            else if(!/\d/.test(password)){
                passwordValid=false;
                errorsMsg.password='Password must contain a digit';
            }

            else if(!/[!@#$%^&*]/.test(password)){
                passwordValid=false;
                errorsMsg.password='Password must contain special character:!@#$%^&*';
            }
            this.setState({passwordValid,errorsMsg});
        }


        handlepasswordConfirmationInput=(e)=>{
            this.setState({...this.state, passwordConfirmation:e.target.value},
                this.validatePasswordConfirm)
        }

        validatePasswordConfirm= ()=>{
            const{passwordConfirmation,password}=this.state;
            let passwordConfirmationValid=true;
            let errorsMsg ={...this.state.errorsMsg}

            if(password !== passwordConfirmation){
                passwordConfirmationValid=false;
                errorsMsg.passwordConfirmation='passwords do not match'
            }
            this.setState({passwordConfirmationValid,errorsMsg},this.validateForm);
        }
   


        //Phone start///////////////////////////////////////////
        handlephoneInput=(e)=>{
            this.setState({...this.state, phone:e.target.value},
                this.validatePhone)

        }
       
           validatePhone=()=>{
            const {phone} =this.state;
           let errorsMsg ={...this.state.errorsMsg};
           let phoneValid=true

            if(phone.length <10){
               phoneValid=false;
                errorsMsg.phone='Must be phone number at least 10 characters'
            }

           
            this.setState({phoneValid, errorsMsg})
        }
         

                //Address start

        handleaddressInput=(e)=>{
            this.setState({...this.state, address:e.target.value},
                this.validateAddress)
        }

        validateAddress=()=>{
            const {address} =this.state;
            let errorsMsg ={...this.state.errorsMsg};
            let addressValid=true

            if(address.length <5){
                addressValid=false;
                errorsMsg.address='Must be password at least 5 characters'
            }
            this.setState({addressValid, errorsMsg})
        }

                    //address Close


        handlebirthdateInput=(e)=>{
            this.setState({...this.state, birthdate:e.target.value})
        }

        componentDidMount(){
            if(isAuth() && isAuth().loggedin){
                this.props.history.push('/')
            }
        }

        createAnAccount = (event) => {
            event.preventDefault()
            const {firstname, lastname, email, password, address, phone, birthdate}=this.state

            axios.post(`api/v1/user/add`,{firstname, lastname, email, password, address, phone, birthdate})
            .then(res=>{
                console.log(res);
                console.log(res.data);
            })
               }

                




       
   
    render() {
        return (
            <div className="App">
            <form onSubmit={this.createAnAccount}>
            <header>
            Registration Form
            </header> 
         
            
                <div className='from-group'>
                <small>First name: </small>
                <input name='firstname' type="text" id='firstname' required="true" className='firstnameInput' 
                value={this.state.firstname}  onChange={this.handlefirstnameInput } placeholder="enter your firstname"/>
                </div>



                <div className='from-group'>
                <ValidationMessage valid={this.state.lastnameValid} message={this.state.errorsMsg.lastname}/>
                <small>Last name: </small>
                <input name='lastname' type="text" id='lastname' required="true"  value={this.state.lastname}  onChange={this.handlelastnameInput } placeholder="enter your lastname" className="lastnameInput"/>
                </div>
                 
                 <div className='from-group'>
                 <ValidationMessage valid={this.state.emailValid} message={this.state.errorsMsg.email}/>
                 <small> Email-Id :       </small>
                <input name ='email' type="email" required="true" value={this.state.email} onChange={this.handleemailInput} placeholder="enter your email" className="emailInput"/>
                 </div>

                 <div className='from-group'>
                     <ValidationMessage valid={this.state.passwordValid} message={this.state.errorsMsg.password}/>
                 <small> Password : </small>
                <input name ='password' type="password" required="true" value={this.state.password} onChange={this.handlepasswordInput} placeholder="enter your password" className="passwordInput"/>
                </div>


                <div className='from-group'>
                     <ValidationMessage valid={this.state.passwordConfirmationValid} message={this.state.errorsMsg.passwordConfirmation}/>
             <small>Confirm Password: </small>
                 <input name ='password-confirmation' type="password" required="true" value={this.state.passwordConfirmation} onChange={this.handlepasswordConfirmationInput} placeholder="Please enter confirm password" className="passwordConfirmationInput"/>
                </div>

                <div className='from-group'>
                <ValidationMessage valid={this.state.addressValid} message={this.state.errorsMsg.address}/>
                <small>Address: </small>
                <input name ='address' type="text" required="true" value={this.state.address} onChange={this.handleaddressInput} placeholder="enter your address" className="addressInput"/>
                </div>

                <div className='from-group'>
                    <ValidationMessage valid ={this.state.phoneValid} message={this.state.errorsMsg.phone}/>
                    <small>Phone Number: </small>
                <input name ='phone' type="tel" id="phone" value={this.state.phone} onChange={this.handlephoneInput} placeholder="Enter area code and number" pattern="^[0-9-+\s()]*$" className="phoneInput"/>
                
                </div>

                <div className='from-group'>
                <small>Birthdate: </small>
                <input name ='birthdate' type="date" value={this.state.birthdate} onChange={this.handlebirthdateInput} placeholder="enter your birthdate" className="birthdateInput"/>
                </div>
                <div className='from-group'>
             
                </div>

                <input type="submit" value="Create An Account" />
            </form>
        </div>
    );
}
}
export default  withRouter(Register)