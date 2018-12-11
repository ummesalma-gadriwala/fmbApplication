import React, { Component } from 'react';
import  requireAuth from '../../requireAuth';


class Dashboard extends Component<any, any> {
  constructor(props:any){
    super(props);
  }

  render () {
    return (
      <h2>DashBoard</h2>
    )
  }
}

export default requireAuth(Dashboard)