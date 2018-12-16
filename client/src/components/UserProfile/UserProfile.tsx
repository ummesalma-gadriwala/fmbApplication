import React, { Component } from 'react';
import requireAuth from '../../requireAuth';
import Spinner from '../Spinner/Spinner';
import { Paper, CssBaseline, Avatar, Grid, Typography, FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import withStyles from '../Common/materialUIWithStyle';
import './UserProfile.css'

class UserProfile extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const classes: any = withStyles;
        return (
            <Spinner active={false}>
                <div className="container-main row">
                    <Paper className="UserProfile-paper col-sm-12  col-lg-5">
                        <CssBaseline />
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Remy Sharp" src="/static/images/person.jpg" className={classes.bigAvatar} />
                        </Grid>
                        <Typography component="h1" variant="h5" align="center">
                            Profile
                    </Typography>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">ITS Number :</InputLabel>
                            <Input
                                type="number" required
                                autoFocus
                                inputProps={{ max: 9999999 }}
                                name="username"
                                id="username"
                                placeholder="11111111"
                                value="40405050"
                                disabled
                            />
                            <FormHelperText></FormHelperText>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="postalCode">Address</InputLabel>
                            <Input
                                id="postalCode"
                                placeholder="Please enter your address"
                                value=""

                            />
                            <FormHelperText>Postal Code</FormHelperText>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="postalCode">Postal Code:</InputLabel>
                            <Input
                                required name="firstLevelAuthenticationAnswer"
                                id="postalCode"
                                placeholder="A1A2A3"
                                value=""

                            />
                            <FormHelperText>Postal Code:</FormHelperText>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="phoneNo">Phone Number</InputLabel>
                            <Input
                                id="phoneNo"
                                placeholder="555-555-55555"
                                value=""

                            />
                            <FormHelperText>Phone Number:</FormHelperText>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="postalCode">Email</InputLabel>
                            <Input
                                required name="firstLevelAuthenticationAnswer"
                                id="email"
                                placeholder="Email"
                                value=""

                            />
                            <FormHelperText>Email:</FormHelperText>
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Save Changes
            </Button>
                    </Paper>
                </div>
            </Spinner>

        )
    }
}

export default (UserProfile)