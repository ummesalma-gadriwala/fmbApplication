import React from 'react';
import requireAuth from '../../requireAuth';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './Dashboard.css';
import SectorSubcriberList from '../Operations/CRM/SectorSubcriberList';

const CRMDashboard = props => {
  return (
    <div>
      <div className="Dashboard-container">
        <div className="Dashboard-card-container">
          <Card className="Card-container">
            <CardContent>
              <h6>CRM Dashboard </h6>
            </CardContent>
          </Card>
        </div>
        <div className="Dashboard-card-container">
          <SectorSubcriberList history={props.history} />
        </div>
      </div>
    </div>
  );
};

export default requireAuth(CRMDashboard);
