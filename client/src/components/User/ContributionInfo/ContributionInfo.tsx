import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';

export default class ContributionInfo extends React.Component<any, any> {
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
    return (
      <div>
        Contribution Info
        <FormControl margin="dense" className="col-xs-6 col-sm-5  col-lg-5">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.back}
          >
            Back
          </Button>
        </FormControl>
        <FormControl margin="dense" className="col-xs-6 col-sm-5  col-lg-5">
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
      </div>
    );
  }
}
