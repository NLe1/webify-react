import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { authenticateUser, logoutUser } from "../../../actions/authActions";
import {
  getCategories,
  getCharts,
  getNewReleases,
  getUserSavedTracks,
  getUserSavedAlbums,
  getUserFollowedArtists
} from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";

class BrowsePage extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
      this.props.getCategories();
      this.props.getCharts();
      this.props.getNewReleases(this.props.auth.user ? this.props.auth.user.country : "US");
      this.props.getUserSavedTracks();
      this.props.getUserSavedAlbums();
      this.props.getUserFollowedArtists();
    }
    if (!isEmpty(this.props.errors)) {
      this.props.logoutUser();
    }
  }
  componentDidUpdate() {
    if (!isEmpty(this.props.api.categoriesLists)) {
      this.props.history.push("/dashboard/browse/genres");
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4" style={{ fontWeight: "bold" }}>
          BROWSE
        </h1>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/genres" style={{ color: "#d1cdcd" }}>
            Genres
          </Link>
        </h5>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/charts" style={{ color: "#d1cdcd" }}>
            Charts
          </Link>
        </h5>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/discovers" style={{ color: "#d1cdcd" }}>
            Discover
          </Link>
        </h5>
        <hr style={{ borderColor: "white" }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    authenticateUser,
    getCategories,
    getCharts,
    logoutUser,
    getNewReleases,
    getUserSavedTracks,
    getUserSavedAlbums,
    getUserFollowedArtists
  }
)(withRouter(BrowsePage));
