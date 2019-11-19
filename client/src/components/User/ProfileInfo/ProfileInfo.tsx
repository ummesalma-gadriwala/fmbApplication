import React, { Component } from "react";

import  requireAuth from '../../../requireAuth';
import { connect } from "react-redux";
import * as profileAction from "../../../reducers/profileAction";
import { IAppState } from '../../../type/Type'
import PersonIcon from '@material-ui/icons/Person';
import Spinner from "./../../Spinner/Spinner";
import FormValidator from "../../../util/FormValidator";

import {
  Paper,
  CssBaseline,
  Avatar,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  
} from "@material-ui/core";
import withStyles from "./../../Common/materialUIWithStyle";
import "./ProfileInfo.css";


class ProfileInfo extends Component<any, any> {
  
  profileValidator: FormValidator;

  constructor(props: any) {
    super(props);

    this.profileValidator = new FormValidator([
      {
        field: "postalCode",
        method: "matches",
        args: [/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/], // args is an optional array of arguements that will be passed to the validation method
        validWhen: true,
        message: "That is not a valid Postal code."
      },
      {
        field: "firstName",
        method: "isEmpty",
        validWhen: false,
        message: "Please enter your First Name."
      },
      {
        field: "lastName",
        method: "isEmpty",
        validWhen: false,
        message: "Please enter your First Name."
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "Please enter valid Email Address."
      },
      {
        field: "streetNumber",
        method: "isEmpty",
        validWhen: false,
        message: "Please enter your Street Number."
      },
      {
        field: "streetName",
        method: "isEmpty",
        validWhen: false,
        message: "Please enter your Street Name."
      },
      {
        field: "city",
        method: "isEmpty",
        validWhen: false,
        message: "Please enter your City."
      },


      
    ]);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  };

  handleInputChange(event: any) {
    console.log(event.target) 
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event: any) {
    const validation = this.profileValidator.validate(this.state);
    //console.log(this.context);
    this.setState({ validation });
    event.preventDefault();
    if (validation.isValid) {
      this.setState({ isInProgres: true });
      this.props.updateUserProfile({
        username : this.props.username,
        mobileNumber : this.state.mobileNumber,
        primaryAddress : {
            unitNumber : this.state.unitNumber,
            streetNumber : this.state.streetNumber,
            streetName : this.state.streetName,
            postalCode : this.state.postalCode,
            city : this.state.city,
            province : this.state.province,
            country : this.state.country
        },
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        email : this.state.email
      },
      () => this.props.nextStep(),
      () => this.setState({ isInProgres: false }));
    }
  }

  back = (e: any) => {
    e.preventDefault();
    this.props.prevStep();
  };

  componentDidMount() {
    this.setState({
      firstName:"",
      lastName:"",
      mobileNumber: "",
      email:"",
      streetName:'' ,
      streetNumber:'',
      unitNumber:'' ,
      postalCode:'' ,
      city: '' ,
      isInProgres: false ,
      validation: this.profileValidator.valid(),
    });
    this.props.getUserProfile(this.props.username);
  }

  componentDidUpdate(prevProps:any) {
    if(this.props.profile != prevProps.profile && this.props.profile.primaryAdress ==null) {
      this.setState({
        firstName:this.props.profile.firstName,
        lastName:this.props.profile.lastName,
        mobileNumber: this.props.profile.mobileNumber,
        email:this.props.profile.email ? this.props.profile.email :'',
        streetName:  this.props.profile.primaryAddress.streetName ? this.props.profile.primaryAddress.streetName : "" ,
        streetNumber:  this.props.profile.primaryAddress.streetNumber ?  this.props.profile.primaryAddress.streetNumber : "",
        unitNumber:  this.props.profile.primaryAddress.unitNumber ? this.props.profile.primaryAddress.unitNumber : "" ,
        postalCode: this.props.profile.primaryAddress.postalCode ? this.props.profile.primaryAddress.postalCode : "" ,
        city:  this.props.profile.primaryAddress.city ? this.props.profile.primaryAddress.city : "", 
        province:  this.props.profile.primaryAddress.province ? this.props.profile.primaryAddress.province : "",
        country:  this.props.profile.primaryAddress.country ? this.props.profile.primaryAddress.country : "",
    
      });
    }
  };

  render() {
    this.state && this.profileValidator.validate(this.state);
    const classes: any = withStyles;
    return (
       <div>
       { this.state !=null && 
        <Spinner active={this.state.isInProgres}>
        <div className="container-main row">
          <Paper className="UserProfile-paper col-sm-12  col-lg-5">
            <CssBaseline />
            <Grid container justify="space-evenly" alignItems="center">
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Typography
                className="col-sm-12 col-lg-12"
                component="h1"
                variant="h5"
                align="center"
              >
                Profile
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required  fullWidth >
                  <InputLabel htmlFor="firstName"> First Name :</InputLabel>
                  <Input
                    type="text"
                    required
                    autoFocus
                    name="firstName"
                    id="firstName"
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                    error={this.state.validation.firstName.isInvalid}
                  />
                  <FormHelperText>{this.state.validation.firstName.message}</FormHelperText>
                  </FormControl>
                  <FormControl margin="normal" required  fullWidth >
                  <InputLabel htmlFor="lastName">Last Name:</InputLabel>
                  <Input
                    type="text"
                    required
                    autoFocus
                    name="lastName"
                    id="lastName"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                    error={this.state.validation.lastName.isInvalid}
                  />
                <FormHelperText>{this.state.validation.lastName.message}</FormHelperText>
                </FormControl>
                
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="mobileNumber">Mobile :</InputLabel>
                  <Input
                    type="text"
                    autoFocus
                    name="mobileNumber"
                    id="mobileNumber"
                    placeholder="11111111"
                    value={this.state.mobileNumber}
                    onChange={this.handleInputChange}
                    
                  />
                  <FormHelperText />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="Email">Email</InputLabel>
                  <Input
                    required
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    error={this.state.validation.email.isInvalid}
                  />
                 <FormHelperText>{this.state.validation.email.message}</FormHelperText>
                </FormControl>

                <Typography
                  className="col-sm-12 col-lg-12"
                  component="h1"
                  variant="h5"
                  align="center"
                >
                  Address
                </Typography>

                <FormControl
                  margin="normal"
                  className="col-xs-6 col-sm-2 col-lg-2"
                  required
                >
                  <InputLabel htmlFor="streetNumber">Street No</InputLabel>
                  <Input
                    type="text"
                    id="primaryAddress.streetNumber"
                    name="streetNumber"
                    placeholder="Please enter your street Number"
                    value={this.state.streetNumber}
                    onChange={this.handleInputChange}
                    error={this.state.validation.streetNumber.isInvalid}
                  />
                  <FormHelperText>{this.state.validation.streetNumber.message}</FormHelperText>
                </FormControl> 

                <FormControl
                  margin="normal"
                  className="col-xs-6 col-sm-2  col-lg-2"
                  required
                >
                  <InputLabel htmlFor="unitNumber">Unit No</InputLabel>
                  <Input
                    id="primaryAddress.unitNumber"
                    placeholder="Please enter your unit Number"
                    name="unitNumber"
                    value={this.state.unitNumber}
                    onChange={this.handleInputChange}
                  />
                  <FormHelperText>Unit No</FormHelperText>
                </FormControl>

                <FormControl
                margin="normal"
                className="col-xs-12 col-sm-6  col-lg-6  "
                required
              >
                <InputLabel htmlFor="streetName">Street Name</InputLabel>
                <Input
                  id="streetName"
                  name= "streetName"
                  placeholder="Please enter your street name"
                  value={this.state.streetName}
                  onChange={this.handleInputChange}
                  error={this.state.validation.streetName.isInvalid}
                />
                <FormHelperText>{this.state.validation.streetName.message}</FormHelperText>
              </FormControl>

              <FormControl
                margin="normal"
                className="col-xs-12 col-sm-6  col-lg-6  "
                required
              >
                <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
                <Input
                  id="postalCode"
                  name= "postalCode"
                  placeholder="Please enter your postal code"
                  value={this.state.postalCode}
                  onChange={this.handleInputChange}
                  error={this.state.validation.postalCode.isInvalid}
                />
                <FormHelperText>{this.state.validation.postalCode.message}</FormHelperText>
              </FormControl>

              <FormControl
                margin="normal"
                className="col-xs-6 col-sm-5  col-lg-5"
                required
                fullWidth
              >
                <InputLabel htmlFor="city">City</InputLabel>
                <Input 
                   id="city" 
                   placeholder="Enter city" 
                   value={this.state.city}
                  onChange={this.handleInputChange}
                  error={this.state.validation.city.isInvalid}
                 />
                <FormHelperText>{this.state.validation.city.message}</FormHelperText>
              </FormControl>
              <FormControl className="col-xs-6 col-sm-5  col-lg-5">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Next
                </Button>
              </FormControl>
              </form>
            </Grid> 
          </Paper>
        </div>
        </Spinner>
       }
      </div>
    );
  }
}


const mapStateToProps = (state: IAppState) => {
  return Object.assign({}, state, {
    username : state.authentication.decodedToken.username,
    profile: state.profile
    
  });
};

export default requireAuth( connect(mapStateToProps,profileAction) (ProfileInfo));

