import React, { Component } from 'react';

import {Route, Redirect, Switch, Link, HashRouter, withRouter} from 'react-router-dom';
import '../../styling/header/header.css';
import '../../index.css';

class ButtonAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      time: 15
    };
  }

  componentWillMount(){
    this.props.removeErrors();
  }

  render(){

    var rightContent;

    
    if (!this.props.currentUser.id) {
      rightContent = (
        <div className="rightNavBar">
          <div className="navlink">
            <Link className="navBarLink" to={"/signup"}  onClick={()=>this.props.removeErrors()}>Signup</Link>
          </div>

          <div className="navlink">
            <Link className="navBarLink" to={"/login"} onClick={()=>this.props.removeErrors()}>Login</Link>
          </div>

          <div className="navlink">
            <Link className="navBarLink" to={"/map"} onClick={()=>this.props.login({email:'garbocheng93@gmail.com', password: '123456'})}>Demo</Link>
          </div>

        </div>
      );
      
    } else {
      rightContent = (
        <div className="rightNavBar">
            <div className="greeting">
              Hello {this.props.name}!
            </div>
            <div className="navlink">
              <Link className="navBarLink" to="/" onClick={()=> this.props.logout()}>Log Out</Link>

            </div>

          </div>
        );
    }

    return (
      <div className="appbar">
              <div className="leftNavBar">

                <div className="navlink"> 
                  <Link className="navBarLink" to={"/map"} onClick={()=>this.props.removeErrors()}>Roamy</Link>
                </div>

              </div>

                {rightContent}
        </div>
    )
  }
}
          
 
      export default ButtonAppBar;
