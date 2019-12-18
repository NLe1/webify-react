import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getRelatedTracks, getRelatedArtists } from "../../../actions/apiActions";

import ArtistCarousel from "../../searching/artists/ArtistCarousel";
import SongCarousel from "../../searching/songs/SongCarousel";
import isEmpty from "../../../utils/is-empty";

class TopArtistsAndTracks extends Component {
  componentDidMount() {
    if (isEmpty(this.props.api.userTopArtists) || isEmpty(this.props.api.userTopTracks)) {
      this.props.history.push("/dashboard/browse");
    }
    this.props.getRelatedTracks(this.props.api.userTopTracks.slice(0, 5).map(obj => obj.id));
    this.props.getRelatedArtists(this.props.api.userTopArtists.slice(0, 5).map(obj => obj.id));
  }
  render() {
    const { userTopTracks, userTopArtists } = this.props.api;
    return (
      <div className="container">
        <h1 className="display-4" style={{ fontWeight: "bold" }}>
          BROWSE
        </h1>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/genres" className="text-success">
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
            Discovers
          </Link>
        </h5>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/newArtistsAndTracks" style={{ color: "#d1cdcd" }}>
            Top Artists And Tracks
          </Link>
        </h5>
        <h6 className="mt-4  pb-0 mb-0" style={{ fontWeight: "bold" }}>
          Top Artists
        </h6>
        <div className="row"></div>
        <hr className="mb-1 mt-1" style={{ borderColor: "white" }} />
        {!isEmpty(userTopArtists) ? (
          <ArtistCarousel artists={userTopArtists} />
        ) : (
          <h1 className="display-4 m-4" style={{ fontWeight: "bold" }}>
            Loading...
          </h1>
        )}
        <h6 className="mt-4  pb-0 mb-0" style={{ fontWeight: "bold" }}>
          Top Tracks
        </h6>
        <hr className="mb-1 mt-1" style={{ borderColor: "white" }} />
        {!isEmpty(userTopArtists) ? (
          <SongCarousel songs={userTopTracks} />
        ) : (
          <h1 className="display-4 m-4" style={{ fontWeight: "bold" }}>
            Loading...
          </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api
});

export default connect(mapStateToProps, { getRelatedTracks, getRelatedArtists })(
  withRouter(TopArtistsAndTracks)
);
