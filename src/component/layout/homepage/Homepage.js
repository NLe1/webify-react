import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getFeaturedPlaylists,
  getUserTopTracks,
  getUserTopArtists,
  getRecentlyPlayed,
  getCategories,
  getNewReleases
} from "../../../actions/apiActions";
import { authenticateUser, logoutUser } from "../../../actions/authActions";
import FeatureList from "./FeatureList";
import RecommendList from "./RecommendList";
import RecentlyPlayed from "./RecentlyPlayed";
import NewReleases from "./NewReleases";
import isEmpty from "../../../utils/is-empty";

class Homepage extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    } else {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.props.getUserTopTracks();
    this.props.getUserTopArtists();
    this.props.getFeaturedPlaylists(this.props.auth.user ? this.props.auth.user.country : "US");
    this.props.getRecentlyPlayed();
    this.props.getCategories(this.props.auth.user ? this.props.auth.user.country : "US");
    this.props.getNewReleases(this.props.auth.user ? this.props.auth.user.country : "US");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.access_token === null) {
      this.props.history.push("/");
    }
    if (!isEmpty(this.props.errors)) {
      this.props.logoutUser();
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4" style={{ fontWeight: "bold" }}>
          Home
        </h1>
        <RecentlyPlayed />
        <FeatureList />
        <RecommendList />
        <NewReleases />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  api: state.api,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getFeaturedPlaylists,
    getUserTopTracks,
    getUserTopArtists,
    getRecentlyPlayed,
    getCategories,
    authenticateUser,
    logoutUser,
    getNewReleases
  }
)(Homepage);
