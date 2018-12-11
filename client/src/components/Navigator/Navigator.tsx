import  React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import authentication from '../../reducers/authentication';

 class Navigator extends Component<any, any> {
  
  constructor(props:any) {
    super(props);

  }

  render() {
    console.log('Props', this.props);
    return (
      this.props.authenticated ?
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/">Dash</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users/">Users</Link>
          </li>
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li> */}
          
        </ul>
      </div>
      </nav>
      : null
     
    );
  }
}

function mapStateToProps(state: any) {
  console.log('authenticated', state);
  return { authenticated:   state.authentication.authenticated };
}

export default connect(mapStateToProps)(Navigator);

