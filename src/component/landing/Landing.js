import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { authenticateUser } from "../../actions/authActions";

class Landing extends Component {
  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  //get params from
  componentDidMount() {
    if (localStorage.getItem("jwtToken")) {
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
      this.props.history.push("/dashboard");
    } else {
      const { access_token } = this.getHashParams();
      this.props.authenticateUser(access_token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.access_token) {
      nextProps.history.push("/dashboard");
    }
  }

  render() {
    return <div className="App" />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  params: ownProps.match
});

export default connect(
  mapStateToProps,
  { authenticateUser }
)(withRouter(Landing));
