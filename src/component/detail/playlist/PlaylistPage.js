import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GridLoader } from "react-spinners";

import { authenticateUser, logoutUser } from "../../../actions/authActions";
import { getPlaylist } from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";

class PlaylistPage extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    }
    const id = this.props.history.location.pathname.split("/").pop();
    this.props.getPlaylist(id);
    this.state = { loading: true };
  }

  componentWillReceiveProps(prevProps) {
    const { currentPlaylist, isLoading } = this.props.api;
    const { loading } = this.state;
    const id = this.props.location.pathname.split("/").pop();

    if (loading && isEmpty(currentPlaylist) && !isLoading) {
      this.props.getPlaylist(id);
    }
    if (!isEmpty(currentPlaylist)) {
      let duration = this.calculateDuration(currentPlaylist);
      this.setState({ hours: Math.floor(duration / 3600) });
      this.setState({ minutes: Math.floor((duration - this.state.hours * 3600) / 60) });
      this.setState({ loading: false });
    }
  }

  calculateDuration = currentPlaylist => {
    return Math.floor(
      currentPlaylist.tracks.items.map(item => item.track.duration_ms).reduce((a, b) => a + b) / 1000
    );
  };

  render() {
    const { currentPlaylist } = this.props.api;
    if (!this.state.loading && isEmpty(currentPlaylist)) {
      this.setState({ loading: true });
      this.componentWillReceiveProps();
      console.log("dfdf");
    }
    return (
      <div className="m-2 p-2">
        {!this.state.loading ? (
          <Fragment>
            <div className="media">
              <img
                src={currentPlaylist.images[Math.floor(currentPlaylist.images.length / 2)].url}
                className="mr-3"
                alt={currentPlaylist.name}
              />
              <div className="media-body">
                <h5 className="mt-4 pt-1">Playlist</h5>
                <h1 className="mt-0">{currentPlaylist.name}</h1>
                <p>{currentPlaylist.description}</p>
                <p className="mt-2">
                  Created by <b>{currentPlaylist.owner.display_name}</b> . {this.state.hours} hours{" "}
                  {this.state.minutes} minutes
                </p>
              </div>
            </div>
            <table
              className="table mt-4"
              style={{ backgroundColor: "#181818", color: "#d1cdcd", border: "0.1px" }}
            >
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Artist</th>
                  <th scope="col">Album</th>
                  <th scope="col">&#128197;</th>
                  <th scope="col">&#128336;</th>
                </tr>
              </thead>
              {currentPlaylist.tracks.items.map(item => (
                // <a href={} alt={item.track.id}>
                <tbody>
                  <tr onClick={() => (window.location = item.track.external_urls.spotify)}>
                    <th scope="row">{item.track.name}</th>
                    <td>{item.track.artists.map(artist => artist.name).join(",")}</td>
                    <td>{item.track.album.name}</td>
                    <td>{item.track.album.release_date}</td>
                    <td>
                      {Math.floor(item.track.duration_ms / 1000 / 60)}:
                      {Math.floor((item.track.duration_ms % 60000) / 1000)}
                    </td>
                  </tr>
                </tbody>
                // </a>
              ))}
            </table>
          </Fragment>
        ) : (
          <GridLoader color={"green"} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { authenticateUser, getPlaylist, logoutUser })(
  withRouter(PlaylistPage)
);
