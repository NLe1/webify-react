import React, { Component } from "react";
import { connect } from "react-redux";
import { GridLoader } from "react-spinners";

import {
  getFeaturedPlaylists,
  getUserTopTracks,
  getUserTopArtists,
  getRecentlyPlayed,
  getCategories,
  getNewReleases,
  getUserSavedTracks,
  getUserSavedAlbums,
  getCharts,
  getUserFollowedArtists,
  getRelatedArtists,
  getRelatedTracks
} from "../../../actions/apiActions";
import { authenticateUser, logoutUser } from "../../../actions/authActions";
import FeatureList from "./FeatureList";
// import RecommendList from "./RecommendList";
import RecentlyPlayed from "./RecentlyPlayed";
import NewReleases from "./NewReleases";
import isEmpty from "../../../utils/is-empty";
import getRandom from "../../../utils/getRandom";

class Homepage extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    } else {
      this.props.history.push("/");
    }
    const {
      userTopTracks,
      userTopArtists,
      featuredPlaylists,
      userRecentlyPlayed,
      categoriesLists,
      newReleaseLists,
      userSavedTracks,
      userSavedAlbums,
      userFollowedArtists,
      charts
    } = this.props.api;
    if (isEmpty(userTopTracks)) {
      this.props.getUserTopTracks();
    }
    if (isEmpty(userTopArtists)) {
      this.props.getUserTopArtists();
    }
    if (isEmpty(featuredPlaylists)) {
      this.props.getFeaturedPlaylists(this.props.auth.user ? this.props.auth.user.country : "US");
    }
    if (isEmpty(userRecentlyPlayed)) {
      this.props.getRecentlyPlayed();
    }
    if (isEmpty(categoriesLists)) {
      this.props.getCategories(this.props.auth.user ? this.props.auth.user.country : "US");
    }
    if (isEmpty(newReleaseLists)) {
      this.props.getNewReleases(this.props.auth.user ? this.props.auth.user.country : "US");
    }
    if (isEmpty(userSavedTracks)) {
      this.props.getUserSavedTracks();
    }
    if (isEmpty(userSavedAlbums)) {
      this.props.getUserSavedAlbums();
    }
    if (isEmpty(userFollowedArtists)) {
      this.props.getUserFollowedArtists();
    }
    if (isEmpty(charts.featuredCharts) || isEmpty(charts.topCharts) || isEmpty(charts.viralCharts)) {
      this.props.getCharts();
    }
  }

  componentWillUpdate() {
    if (this.props.auth.access_token === null) {
      this.props.history.push("/");
    }
    if (!isEmpty(this.props.errors.error)) {
      if (this.props.errors.error.status === "401" || this.props.errors.error.status == 401) {
        this.props.logoutUser();
      }
    }
    const {
      userRelatedArtists,
      userRelatedTracks,
      userFollowedArtists,
      userSavedTracks,
      isLoading
    } = this.props.api;
    if (
      !isEmpty(userFollowedArtists) &&
      !isEmpty(userSavedTracks) &&
      isEmpty(userRelatedArtists) &&
      isEmpty(userRelatedTracks) &&
      !isLoading
    ) {
      let index = getRandom();
      this.props.getRelatedArtists([userFollowedArtists[index].name], [userFollowedArtists[index].id]);
      index = getRandom();
      this.props.getRelatedTracks(
        [userSavedTracks[index].track.name],
        [userSavedTracks[index].track.id]
      );
    }
  }

  render() {
    const { userRecentlyPlayed, newReleaseLists, featuredPlaylists } = this.props.api;
    return (
      <div className="container">
        <h1 className="display-4" style={{ fontWeight: "bold" }}>
          Home
        </h1>
        {!isEmpty(userRecentlyPlayed) ? <RecentlyPlayed /> : <GridLoader color={"green"} />}
        {!isEmpty(newReleaseLists) ? <NewReleases /> : <GridLoader color={"green"} />}
        {!isEmpty(featuredPlaylists) ? <FeatureList /> : <GridLoader color={"green"} />}
        {/* {!isEmpty(userRelatedArtists) && !isEmpty(userRelatedTracks) ? (
          <RecommendList />
        ) : (
          <GridLoader color={"green"} />
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  api: state.api,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getFeaturedPlaylists,
  getUserTopTracks,
  getUserTopArtists,
  getRecentlyPlayed,
  getCategories,
  authenticateUser,
  logoutUser,
  getNewReleases,
  getUserSavedTracks,
  getUserSavedAlbums,
  getCharts,
  getUserFollowedArtists,
  getRelatedArtists,
  getRelatedTracks
})(Homepage);
