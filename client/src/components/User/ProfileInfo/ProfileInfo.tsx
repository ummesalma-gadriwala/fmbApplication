import React, { Component } from "react";
import Spinner from "./../../Spinner/Spinner";
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
  Button
} from "@material-ui/core";
import withStyles from "./../../Common/materialUIWithStyle";
import "./ProfileInfo.css";

class ProfileInfo extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  continue = (e: any) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e: any) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const classes: any = withStyles;
    return (
      <Spinner active={false}>
        <div className="container-main row">
          <Paper className="UserProfile-paper col-sm-12  col-lg-5">
            <CssBaseline />
            <Grid container justify="space-evenly" alignItems="center">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/person.jpg"
                className={classes.bigAvatar}
              />

              <Typography
                className="col-sm-12 col-lg-12"
                component="h1"
                variant="h5"
                align="center"
              >
                Profile
              </Typography>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Name :</InputLabel>
                <Input
                  type="text"
                  required
                  autoFocus
                  inputProps={{ max: 9999999 }}
                  name="username"
                  id="username"
                  placeholder="11111111"
                  value="40405050"
                  disabled
                />
                <FormHelperText />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Mobile :</InputLabel>
                <Input
                  type="number"
                  required
                  autoFocus
                  inputProps={{ max: 9999999 }}
                  name="mobileNo"
                  id="mobileNo"
                  placeholder="11111111"
                  value="555-555-5555"
                  disabled
                />
                <FormHelperText />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="postalCode">Email</InputLabel>
                <Input
                  required
                  name="firstLevelAuthenticationAnswer"
                  id="email"
                  placeholder="Email"
                  value=""
                />
                <FormHelperText>Email:</FormHelperText>
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
                <InputLabel htmlFor="addressStreetNo">Street No</InputLabel>
                <Input
                  id="addressStreetNo"
                  placeholder="Please enter your street Number"
                  value=""
                />
                <FormHelperText>Street No</FormHelperText>
              </FormControl>

              <FormControl
                margin="normal"
                className="col-xs-6 col-sm-2  col-lg-2"
                required
              >
                <InputLabel htmlFor="addressStreetNo">Unit No</InputLabel>
                <Input
                  id="addressUnitNo"
                  placeholder="Please enter your unit Number"
                  value=""
                />
                <FormHelperText>Unit No</FormHelperText>
              </FormControl>

              <FormControl
                margin="normal"
                className="col-xs-12 col-sm-6  col-lg-6  "
                required
              >
                <InputLabel htmlFor="addressStreetNo">Street Name</InputLabel>
                <Input
                  id="addressStreetName"
                  placeholder="Please enter your street name"
                  value=""
                />
                <FormHelperText>Street Name</FormHelperText>
              </FormControl>

              <FormControl
                margin="normal"
                className="col-xs-6 col-sm-5  col-lg-5"
                required
                fullWidth
              >
                <InputLabel htmlFor="postalCode">Postal Code:</InputLabel>
                <Input
                  required
                  name="firstLevelAuthenticationAnswer"
                  id="postalCode"
                  placeholder="A1A2A3"
                  value=""
                />
                <FormHelperText>Postal Code:</FormHelperText>
              </FormControl>

              <FormControl
                margin="normal"
                className="col-xs-6 col-sm-5  col-lg-5"
                required
                fullWidth
              >
                <InputLabel htmlFor="city">City</InputLabel>
                <Input id="city" placeholder="Enter city" value="" />
                <FormHelperText>City :</FormHelperText>
              </FormControl>

              <FormControl className="col-xs-6 col-sm-5  col-lg-5">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.continue}
                >
                  Next
                </Button>
              </FormControl>
            </Grid>
          </Paper>
        </div>
      </Spinner>
    );
  }
}

export default ProfileInfo;
