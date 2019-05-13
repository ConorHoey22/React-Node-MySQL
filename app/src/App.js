import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
//----------------------Component Imports--------------------------------------
import NavigationComponent from './components/NavigationComponent';
//import WelcomeComponent from './components/WelcomeComponent';
import RegisterComponent from './components/views/RegisterComponent';
import LoginComponent from './components/views/LoginComponent';
//import About from './components/views/About';
//import Dashboard from './components/views/Dashboard';

//-----------------------Router Imports----------------------------------------
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  IndexRoute ,
  Redirect, 

} from 'react-router-dom'


class App extends React.Component
{
  constructor(props) {
    super(props);
  
  }

  





  render() {
      return (
      <div className="App">
        <NavigationComponent/>
        

        <Router>
     
           <Switch>
               {/* <Route exact path="/" component={WelcomeComponent} /> */}
               {/* <Route path="/About" component={About} /> */}
             <Route path="/Login"   component={LoginComponent} />
             <Route path="/Register"  component={RegisterComponent} />
               {/* <Route path="/Dashboard"  component={Dashboard} /> */}
               
           </Switch>
    
      
       </Router>


    
     


        <header className="App-header">
          
       


              


      


    
        </header>

        <p className="App-intro">
   
        </p>


      </div>

    );
  }
}

export default App;
