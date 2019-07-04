import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import NewReleases from "../../layout/homepage/NewReleases";

import isEmpty from "../../../utils/is-empty";
import { getRelatedArtists, getRecommendation } from "../../../actions/apiActions";
import RecommendationCards from "../RecommendationCards";

class Discovers extends Component {
  constructor(props) {
    super(props);
    const { userFollowedArtists, newReleaseLists, userSavedTracks, userSavedAlbums } = this.props.api;
    if (
      isEmpty(userFollowedArtists) &&
      isEmpty(newReleaseLists) &&
      isEmpty(userSavedAlbums) &&
      isEmpty(userSavedTracks)
    ) {
      this.props.history.push("/dashboard/browse");
    } else {
      //get random user followed artists
      for (let i = 0; i < 3; i++) {
        let rand = this.getRandomInt(userFollowedArtists.length);
        this.props.getRecommendation([userFollowedArtists[rand].name], [userFollowedArtists[rand].id]);
      }
      //get random user saved tracks
      for (let i = 0; i < 2; i++) {
        let rand = this.getRandomInt(userFollowedArtists.length);
        this.props.getRecommendation(
          [userSavedTracks[rand].track.name],
          [],
          [userSavedTracks[rand].track.id]
        );
      }
    }
  }

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    const { recommendationLists, newReleaseLists } = this.props.api;
    return (
      <div>
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
            <Link to="/dashboard/browse/discovers" className="text-success">
              Discovers
            </Link>
          </h5>
          {!isEmpty(newReleaseLists) ? <NewReleases /> : null}
          {!isEmpty(recommendationLists)
            ? recommendationLists.map(list => <RecommendationCards key={list.keywords} list={list} />)
            : null}
        </div>
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
  { getRelatedArtists, getRecommendation }
)(withRouter(Discovers));
