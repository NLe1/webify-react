import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";
import { client_id, redirect_uri } from "../../config/keys";
import { state, scope } from "../../config/api";
import SearchBar from "./SearchBar";

class Navbar extends Component {
  authLinks = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a href="/" className="nav-link">
          Dashboard
        </a>
      </li>
      <SearchBar />
      <li className="nav-item">
        <button className="btn btn-danger" onClick={() => this.props.logoutUser()}>
          Log out
        </button>
      </li>
    </ul>
  );

  guessLinks = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a
          className="btn btn-primary"
          href={`https://accounts.spotify.com/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&state=${state}`}
        >
          Authenticate with Spotify
        </a>
      </li>
    </ul>
  );

  render() {
    return (
      <nav
        className="navbar navbar-expand-md navbar-dark sticky-top fixed-top"
        style={{ backgroundColor: "#050505" }}
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <h3 style={{ color: "#d1cdcd" }}>Weblify</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto" />
            {this.props.auth.access_token ? this.authLinks() : this.guessLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
