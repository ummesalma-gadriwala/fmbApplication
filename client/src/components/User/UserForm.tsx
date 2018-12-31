import React, { Component } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SubscriptionInfo from "./SubscriptionInfo/SubscriptionInfo";
import ContributionInfo from "./ContributionInfo/ContributionInfo";

export class UserForm extends Component {
  steps = {
    step1: "ProfileInfo",
    step2: "SubscriptionInfo",
    step3: "ContributionInfo"
  };
  state = {
    step: this.steps.step1
  };

  // Proceed to next step
  nextStep = () => {
    this.setState({
      step:
        this.state.step == "ProfileInfo" ? this.steps.step2 : this.steps.step3
    });
  };

  // Go back to prev step
  prevStep = () => {
    this.setState(
      {
        step:
          this.state.step == "ContributionInfo"
            ? this.steps.step2
            : this.steps.step1
      },
      () => {
        console.log(this.state.step);
      }
    );
  };

  render() {
    const { step } = this.state;
    switch (step) {
      case "ProfileInfo":
        return <ProfileInfo nextStep={this.nextStep} />;
      case "SubscriptionInfo":
        return (
          <SubscriptionInfo nextStep={this.nextStep} prevStep={this.prevStep} />
        );
      case "ContributionInfo":
        return (
          <ContributionInfo nextStep={this.nextStep} prevStep={this.prevStep} />
        );
    }
  }
}

export default UserForm;
