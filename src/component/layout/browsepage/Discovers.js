import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import NewReleases from "../../layout/homepage/NewReleases";
import { GridLoader } from "react-spinners";
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
          {!isEmpty(newReleaseLists) ? <NewReleases /> : <GridLoader color={"green"} />}
          {!isEmpty(userRelatedArtists) ? (
            userRelatedArtists.map(list => <RecommendationCards key={list.keywords} list={list} />)
          ) : (
            <GridLoader color={"green"} />
          )}
          {!isEmpty(userRelatedTracks) ? (
            userRelatedTracks.map(list => <RecommendationCards key={list.keywords} list={list} />)
          ) : (
            <GridLoader color={"green"} />
          )}
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
