import React, {Component} from 'react';

class RegisterComponent extends React.Component {
  
  constructor() {
    super();

    this.state = {
      username: '',
      email:'',
      password:'',
      location:'',
      
      };
      
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Submit handling
  handleSubmit(event) {
    event.preventDefault();

    const data = { username:this.state.username, email:this.state.email , password:this.state.password  , location:this.state.location}

    //Fetch API Post method
      fetch('/api/createAccount', { method: 'POST', 
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    };


   
   

  //Username - User Form handling
   handleUsernameChange = event => {
    this.setState({
      username: event.target.value}, () => {
        this.validateUsername();
      
    });
  };

  //Username - Input Validation   
  validateUsername = () => {
    const { username } = this.state;
    this.setState({
      usernameError:
        username.length > 3 ? null : 'Your username must be longer than 3 characters'
    });

  }

   //Email - User Form handling
   handleEmailChange = event => {
    this.setState({
      email: event.target.value}, () => {
        this.validateEmail();
      
    });
  };

  //Email - Input Validation   
  validateEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError:
        email.length > 3 ? null : 'Your email address must be longer than 3 characters and contain an @ symbol'
    });

  }

  
  //Password - User Form handling
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value}, () => {
        this.validatePassword();
      
    });
  };

  //Password - Input Validation   
  validatePassword = () => {
    const { password } = this.state;
    this.setState({
      passwordError:
        password.length > 3 ? null : 'Your password must be longer than 3 characters'
    });

  }

  //Email - User Form handling
  handleLocationChange = event => {
    this.setState({
      location: event.target.value}, () => {
        this.validateLocation();
      
    });
  };

  //Email - Input Validation   
  validateLocation = () => {
    const { location } = this.state;
    this.setState({
      locationError:
        location.length > 1 ? null : 'Your  must be longer than 1 characters'
    });

  }





  
  //JSX REGISTRATION FORM 
  render() {
    return (

     <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Enter your username</label>

        <input 
        id="username" 
        className={`form-control ${this.state.usernameError ? 'is-invalid' : ''}`} 
        type="text" 
        onChange={this.handleUsernameChange} 
        onBlur={this.validateUsername} required/>
        <div className='invalid-feedback'>{this.state.usernameError}</div>
        <br></br>

        <label htmlFor="email">Enter your email</label>

        <input id="email" 
         className={`form-control ${this.state.emailError ? 'is-invalid' : ''}`} 
         type="email" 
         onChange={this.handleEmailChange}
         onBlur={this.validateEmail}  required/>
        <div className='invalid-feedback'>{this.state.emailError}</div>
        <br></br>

        <label htmlFor="password">Enter your password</label>

        <input id="password" 
        type="password" 
        onChange={this.handlePasswordChange}
        onBlur={this.validatePassword}
        className={`form-control ${this.state.passwordError ? 'is-invalid' : ''}`} required/>
        <div className='invalid-feedback'>{this.state.passwordError}</div>

        <label htmlFor="location">Enter your location</label>

        <input 
        id="location" 
        className={`form-control ${this.state.locationError ? 'is-invalid' : ''}`} 
        type="text" 
        onChange={this.handleLocationChange} 
        onBlur={this.validateLocation} required/>
        <div className='invalid-feedback'>{this.state.locationError}</div>
        <br></br>


        <br></br>
        <button>Register</button>
        <br></br>
      </form>
                   


    );
  }
}


export default RegisterComponent;