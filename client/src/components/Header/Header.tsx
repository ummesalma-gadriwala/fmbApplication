import React, { Component } from 'react';
import aeflogo from '../../static/images/aeflogo.png'; // Tell Webpack this JS file uses this image
import fmblogo from '../../static/images/fmblogo.jpg';
import { Link } from 'react-router-dom';
import IconButton  from '@material-ui/core/IconButton';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ClearIcon from '@material-ui/icons/Clear';

import './Header.css';

const HelpContactLink = (props: any) => <Link to="/help-contact" {...props} />;

const HomeLink = (props: any) => <Link to="/dashboard" {...props} />;


interface HeaderState {
  isHelpContactEnabled: boolean;
}
 class Header extends Component<any, HeaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isHelpContactEnabled:false
    };
  }
  render() {
    return (
      <div>
        <div className="HelpContact-container">
          <IconButton 
            component={this.state.isHelpContactEnabled ? HomeLink : HelpContactLink}
            aria-label="help contact"
            onClick = {() => { 
              this.setState({isHelpContactEnabled: !this.state.isHelpContactEnabled});
              }} 
          >  
            <span>
              { !this.state.isHelpContactEnabled  &&  <ContactSupportIcon fontSize="large" /> } 
              { this.state.isHelpContactEnabled  && <ClearIcon fontSize= "large"/> }
            </span>
          </IconButton>
        </div>
        
        <div className="Header-container">
          <div className="Header-imgwrap">
            <img src={aeflogo} alt="Logo" />
          </div>
          <div className="Header-imgwrap">
            <img src={fmblogo} alt="Logo" />
          </div>
        </div>
         
      </div>  
    );
  }
}

export default Header;
