import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import SubscriptionInfo from './SubscriptionInfo/SubscriptionInfo';
import Dashboard from '../Dashboard/Dashboard';

export class UserForm extends Component {
  steps = {
    step1: 'ProfileInfo',
    step2: 'SubscriptionInfo',
    step3: 'Dashboard'
  };
  state = {
    step: this.steps.step1
  };

  // Proceed to next step
  nextStep = () => {
    this.setState({
      step:
        this.state.step === 'ProfileInfo' ? this.steps.step2 : this.steps.step3
    });
  };

  // Go back to prev step
  prevStep = () => {
    this.setState({
      step:
        this.state.step === 'Dashboard' ? this.steps.step2 : this.steps.step1
    });
  };

  render() {
    const { step } = this.state;
    switch (step) {
      case 'ProfileInfo':
        return <ProfileInfo nextStep={this.nextStep} />;
      case 'SubscriptionInfo':
        return (
          <SubscriptionInfo nextStep={this.nextStep} prevStep={this.prevStep} />
        );
      case 'Dashboard':
        return <Dashboard />;
    }
  }
}

export default UserForm;
