import React, { Component } from 'react';
import  requireAuth from '../../requireAuth';


class Dashboard extends Component<any, any> {
  constructor(props:any){
    super(props);
  }

  render () {
    return (
      <div>
        <h2>DashBoard</h2>

        <div>
          <div>
            Menu
          </div>
          <div>
            Meal Cancellation
          </div> 
          <div>
            Request Salwaat/Fateha
          </div>
          <div>
            Update Profile
          </div>     
        </div>
      </div>  
    )
  }
}

export default requireAuth(Dashboard)