import  React, { Component } from 'react';
import aeflogo from '../../static/images/aeflogo.png'; // Tell Webpack this JS file uses this image
import fmblogo from '../../static/images/fmblogo.jpg';

import './Header.css';

class Header extends Component<any, any> {
  constructor(props: any) {
    super(props)
  } 

 render() {
    return (
            <div className="Header-container" >
              <div className="Header-imgwrap">
                <img src={aeflogo} alt="Logo" />
              </div>
              <div className="Header-imgwrap">  
                <img src={fmblogo} alt="Logo" />
              </div>  
            </div>  
    );
  }
}

export default Header;