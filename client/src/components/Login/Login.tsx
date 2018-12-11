import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as authenticationAction from '../../reducers/authenticationAction';
import FormValidator from '../../util/FormValidator';
import { Alert } from 'reactstrap';
import Spinner  from '../Spinner/Spinner';




class Login extends Component<any, any> {

  loginValidator: FormValidator ; 

  constructor(props:any) {
    super(props)
    this.loginValidator = new FormValidator([
      { 
        field: 'username', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'ITS Number is required.' 
      },
      { 
        field: 'username',
        method: 'isInt', 
        validWhen: true, 
        message: 'That is not a valid ITS Number.'
      },
      { 
        field: 'firstLevelAuthenticationAnswer', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Pleave provide a Postal code.'
      },
      // { 
      //   field: 'firstLevelAuthenticationAnswer',
      //   method: 'isAlphanumeric', 
      //   validWhen: true, 
      //   message: 'That is not a valid Postal code..'
      // },
      {
        field: 'firstLevelAuthenticationAnswer', 
        method: 'matches',
        args: [/^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/], // args is an optional array of arguements that will be passed to the validation method
        validWhen: true, 
        message: 'That is not a valid Postal code.'
      }
    ]);

    this.state = {
      username:'',
      firstLevelAuthenticationAnswer:'',
      validation: this.loginValidator.valid(),
      isInProgres: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);

    
  }

  handleInputChange(event:any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  signIn = () => {
    const validation = this.loginValidator.validate(this.state) ; 
    this.setState({validation});
    if(validation.isValid){
      this.setState( { isInProgres: true });
      this.props.signin({username:this.state.username, firstLevelAuthenticationAnswer: this.state.firstLevelAuthenticationAnswer  }, () => {
        this.props.history.push('/dashboard');
        
      },
      () => this.setState( { isInProgres: false }) );
    }
  }

  render() {
    this.loginValidator.validate(this.state) ; 
    return (
      <Spinner active = { this.state.isInProgres}>
        <div className="row">
          <div className ="col-12">
            <FormGroup>
                <div>
                  <Label for="username">ITS Number :</Label>
                  <Input type="number" required  maxLength = {8} name="username" id="username" placeholder="11111111" value = { this.state.username } onChange={this.handleInputChange}/>
                  { this.state.validation.username.isInvalid && <Alert color="danger">{this.state.validation.username.message}</Alert>}
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="postalCode">Postal Code:</Label>
                <Input  name="firstLevelAuthenticationAnswer" id="postalCode" required  maxLength = {6}  placeholder="A1A2A3" value = { this.state.firstLevelAuthenticationAnswer } onChange={this.handleInputChange} />
                { this.state.validation.firstLevelAuthenticationAnswer.isInvalid && <Alert color="danger">{this.state.validation.firstLevelAuthenticationAnswer.message}</Alert>}
              </FormGroup>
              <Button onClick = { this.signIn} color="primary" size="lg" block>Submit</Button>
            </div>
        </div>
      </Spinner>   
    )
  }
}
export default connect(null, authenticationAction)(Login);
  