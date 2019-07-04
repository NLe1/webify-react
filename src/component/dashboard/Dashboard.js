import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { authenticateUser, logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  api: state.api,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, authenticateUser }
)(withRouter(Dashboard));
