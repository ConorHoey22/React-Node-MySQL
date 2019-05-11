import React, {Component} from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';



class NavigationComponent extends React.Component
 {
    constructor(props) 
    {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    
    toggle() 
        {
          this.setState({
            isOpen: !this.state.isOpen
          });
        }

    render() 
    {
        return (

          <div className="NavBar">
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">SportsPromo</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/About">About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="">Leagues</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/">Teams</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/Register">Register</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/Login">Login</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
        </div>

 
      );
    }
  }

  
export default NavigationComponent;