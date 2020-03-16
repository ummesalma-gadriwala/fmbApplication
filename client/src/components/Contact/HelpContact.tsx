import React, {useEffect} from 'react';
import {getContactInfo} from '../../reducers/contentAction';
import { connect } from 'react-redux';
import { AppState, LabelValue } from '../../type/Type';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import './HelpContact.css';


const HelpContact = (props) => {
  useEffect(() =>{
    if(!props.helpContacts){  
      props.getContactInfo(()=> {console.log('Error Fetching Contact')});
    }
  },[props.helpContacts])
   return (
     <div>
       
      { props.helpContacts && 
          props.helpContacts.map((contactInfo:LabelValue, index) => 
              <Card  key = {index} className="Card-container Dashboard-container HelpContacts-container">
                 <CardContent>
                  <React.Fragment>
                  <Typography>
                    <div className="HelpContacts-details">
                      <span >
                        <strong>{contactInfo.messageLabel }</strong>  
                      </span>
                      <span >
                      { contactInfo.messageValue.split("|")[0] }  
                      </span>
                      <span >
                      <WhatsAppIcon fontSize="small" />  
                      { contactInfo.messageValue.split("|")[1] }  
                      </span>
                    </div>

                  </Typography>
                </React.Fragment>
                </CardContent>
              </Card>  
          ) 

       }
     </div>  
  )
}

const mapStateToProps = (state: AppState) => {
  return ( {
    helpContacts : state.content && state.content.helpContacts
  });
};


export default  connect(mapStateToProps, {getContactInfo})(HelpContact)



