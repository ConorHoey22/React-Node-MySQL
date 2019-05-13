import React, {Component} from 'react';

class LoginComponent extends React.Component {
  
  constructor() {
    super();

    this.state = {
      email:'',
      password:'',
     
      
      };
      
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Submit handling
  handleSubmit(event) {
    event.preventDefault();

    const data = { email:this.state.email, password:this.state.password}

    //Fetch API Post method
      fetch('/api/login', { method: 'POST', 
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

        <label htmlFor="password">Enter your password</label>

        <input id="password" 
        type="password" 
        onChange={this.handlePasswordChange}
        onBlur={this.validatePassword}
        className={`form-control ${this.state.passwordError ? 'is-invalid' : ''}`} required/>
        <div className='invalid-feedback'>{this.state.passwordError}</div>

        <br></br>
        <button>Login</button>
        <br></br>
      </form>
                   


    );
  }
}


export default LoginComponent;