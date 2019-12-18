import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { SERVER_ERROR, USER_ERROR } from '../../util/constant';
import { RESET_ERROR } from '../../reducers/actionType';

class GlobalErrorHandler extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorMessage: '', infoMessage: '' };
  }

  componentWillMount() {
     this.props.history.listen((location, action) => {
       this.props.dispatch({type: RESET_ERROR, payload:{}})
    });
  }
  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  }

  componentDidUpdate(prevProps) {
    if(this.props.history.pathname !== prevProps.history.pathname) {
      this.setState({ hasError: false });    
    }
  }

  render() {
    return (
      <div>
        {this.state.hasError && (
          // You can render any custom fallback UI
          <Alert color="danger">{this.state.errorMessage}</Alert>
        )}
        {this.props.apiError === SERVER_ERROR && (
          <Alert color="danger">
            Please retry later currently system is down.
          </Alert>
        )}
        { this.props.apiError === USER_ERROR && (
          <Alert color="warning">
            {this.props.errorMessage && this.props.errorMessage}
            {!this.props.errorMessage &&
              'Oops looks like something went wrong, please enter correct information and retry.'}
          </Alert>
        )}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    apiError: state.apiError.type,
    errorMessage: state.apiError.message
  };
};
export default connect(mapStateToProps, null)(withRouter(GlobalErrorHandler));
