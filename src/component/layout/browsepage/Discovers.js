import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import NewReleases from "../../layout/homepage/NewReleases";

import isEmpty from "../../../utils/is-empty";
import { getRelatedArtists, getRelatedTracks } from "../../../actions/apiActions";
import RecommendationCards from "../RecommendationCards";

class Discovers extends Component {
  constructor(props) {
    super(props);
    const { userRelatedArtists, userRelatedTracks } = this.props.api;
    if (isEmpty(userRelatedArtists) || isEmpty(userRelatedTracks)) {
      this.props.history.push("/dashboard/browse");
    }
  }

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    const { userRelatedTracks, userRelatedArtists, newReleaseLists } = this.props.api;
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
          <h5 className="mr-4  pb-0 mb-0 d-inline ">
            <Link to="/dashboard/browse/newArtistsAndTracks" style={{ color: "#d1cdcd" }}>
              Top Artists And Tracks
            </Link>
          </h5>
          {!isEmpty(newReleaseLists) ? <NewReleases /> : null}
          {!isEmpty(userRelatedArtists)
            ? userRelatedArtists.map(list => <RecommendationCards key={list.keywords} list={list} />)
            : null}
          {!isEmpty(userRelatedTracks)
            ? userRelatedTracks.map(list => <RecommendationCards key={list.keywords} list={list} />)
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

export default connect(mapStateToProps, { getRelatedArtists, getRelatedTracks })(withRouter(Discovers));
