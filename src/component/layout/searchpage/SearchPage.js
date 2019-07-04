import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Songs from "../../searching/songs/Songs";
import Playlists from "../../searching/playlists/Playlists";
import Artists from "../../searching/artists/Artists";
import Albums from "../../searching/albums/Albums";
import isEmpty from "../../../utils/is-empty";

class SearchPage extends Component {
  render() {
    const { songs, playlists, artists, albums } = this.props.api;
    return (
      <div className="container">
        <h1 className="display-4" style={{ fontWeight: "bold" }}>
          Search
        </h1>
        {isEmpty(this.props.api.songs) ? (
          <h1 className="display-4 my-4" style={{ fontWeight: "bold" }}>
            Please enter keywords
          </h1>
        ) : null}
        {!isEmpty(artists) ? (
          <Fragment>
            <h5 className="mt-4 pb-0 mb-0">Artists</h5>
            <hr style={{ borderColor: "white" }} />
            <Artists artists={artists} />
          </Fragment>
        ) : null}
        {!isEmpty(songs) ? (
          <Fragment>
            <h5 className="mt-4 pb-0 mb-0">Songs</h5>
            <hr style={{ borderColor: "white" }} />
            <Songs songs={songs} />
          </Fragment>
        ) : null}
        {!isEmpty(albums) ? (
          <Fragment>
            <h5 className="mt-4 pb-0 mb-0">Albums</h5>
            <hr style={{ borderColor: "white" }} />
            <Albums albums={albums} />
          </Fragment>
        ) : null}
        {!isEmpty(playlists) ? (
          <Fragment>
            <h5 className="mt-4 pb-0 mb-0">Playlists</h5>
            <hr style={{ borderColor: "white" }} />
            <Playlists playlists={playlists} />
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(SearchPage));
