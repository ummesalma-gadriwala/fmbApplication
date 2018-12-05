import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class Login extends Component<any, any> {
  constructor(props:any) {
    super(props)
    this.state = {
      username:'',
      firstLevelAuthenticationAnswer:''
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
  render() {
    return (
      <div className="row">
        <div className ="col-12">
           <FormGroup>
              <Label for="username">ITS Number :</Label>
              <Input type="number" required  maxLength = {8} name="username" id="username" placeholder="11111111" value = { this.state.username } onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="postalCode">Postal Code</Label>
              <Input  name="firstLevelAuthenticationAnswer" id="postalCode" required  maxLength = {6}  placeholder="A1A2A3" value = { this.state.firstLevelAuthenticationAnswer } onChange={this.handleInputChange} />
            </FormGroup>
            <Button color="primary" size="lg" block>Submit</Button>
          </div>
      </div>  
    )
  }
}
