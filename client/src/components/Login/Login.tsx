import React, { Component } from 'react';
//import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as authenticationAction from '../../reducers/authenticationAction';
import FormValidator from '../../util/FormValidator';
import Spinner  from '../Spinner/Spinner';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import  withStyles from './materialUIWithStyle';
import FormHelperText from '@material-ui/core/FormHelperText'
import Paper from '@material-ui/core/Paper';
import './Login.css'

class Login extends Component<any, any> {

  loginValidator: FormValidator ; 

  constructor(props:any) {
    super(props)
    this.loginValidator = new FormValidator([
      { 
        field: 'username', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Please enter your ITS Number.' 
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
        message: 'Pleave enter your Postal code.'
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
    const classes: any = withStyles;
    this.loginValidator.validate(this.state) ; 
    return (
      <Spinner active = { this.state.isInProgres}>
        <div className="Login row">
          <Paper className ="Login-paper col-sm-12  col-lg-5">
          <CssBaseline />
            <div className= "Login-avatarContainer">
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">ITS Number :</InputLabel>
              <Input 
                type="number" required 
                autoComplete="username" autoFocus
                inputProps={{ max: 9999999 }}  
                name="username"
                id="username"
                placeholder="11111111" 
                value = { this.state.username } 
                onChange={this.handleInputChange}
                error={this.state.validation.username.isInvalid}
                      
              />
              <FormHelperText>{this.state.validation.username.message}</FormHelperText>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="postalCode">Postal Code:</InputLabel>
              <Input 
                required   name="firstLevelAuthenticationAnswer" 
                id="postalCode"
                placeholder="A1A2A3"
                value = { this.state.firstLevelAuthenticationAnswer }
                onChange={this.handleInputChange}
                error={this.state.validation.firstLevelAuthenticationAnswer.isInvalid}
              />
              <FormHelperText>{this.state.validation.firstLevelAuthenticationAnswer.message}</FormHelperText>
            </FormControl>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick = { this.signIn} 
            >
              Sign in
            </Button>
            {/* <FormGroup>
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
              <Button onClick = { this.signIn} color="primary" size="lg" block>Submit</Button> */}
          </Paper>
        </div>
      </Spinner>   
    )
  }
}
export default connect(null, authenticationAction)(Login);
  