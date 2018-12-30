import  React, { Component } from 'react';
import aeflogo from '../../static/images/aeflogo.bmp'; // Tell Webpack this JS file uses this image
import fmblogo from '../../static/images/fmblogo.png';

import './Header.css';

console.log(aeflogo); // /logo.84287d09.png
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