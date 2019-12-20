import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GridLoader } from "react-spinners";

import { authenticateUser, logoutUser } from "../../../actions/authActions";
import { getAlbum, getArtistAlbum } from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";
import Albums from "../../searching/albums/Albums";

class AlbumPage extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    }
    this.state = { loading: true, rendering: true, hours: null, minutes: null, flag: false };
  }

  componentWillUnmount() {
    //reset current album and artist album to {} and []
    this.props.getAlbum();
    this.props.getArtistAlbum();
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.location.pathname.split("/").pop();
    const id = this.props.location.pathname.split("/").pop();
    if (prevId !== id) {
      this.setState({ loading: true, rendering: true });
      this.props.getAlbum();
      this.props.getArtistAlbum();
    }
    const { currentAlbum, relatedAlbums } = this.props.api.currentAlbum;
    const { loading, rendering, hours, minutes, flag } = this.state;
    const { isLoading } = this.props.api;
    if (!isEmpty(currentAlbum) && hours === null && minutes === null) {
      let duration = this.calculateDuration(currentAlbum);
      this.setState({ hours: Math.floor(duration / 3600) });
      this.setState({ minutes: Math.floor(duration % 60) });
    }

    if (loading && !isLoading && !flag) {
      this.setState({ flag: true });
      const id = this.props.history.location.pathname.split("/").pop();
      this.props.getAlbum(id);
      this.setState({ flag: false });
    }

    if (rendering && !isEmpty(currentAlbum) && !isLoading) {
      currentAlbum[0].artists.forEach(artist => this.props.getArtistAlbum(artist.id, artist.name));

      this.setState({ rendering: false });
    }

    if (!isEmpty(currentAlbum) && !isEmpty(relatedAlbums) && loading) {
      this.setState({ loading: false });
    }
  }

  calculateDuration = currentAlbum => {
    return Math.floor(
      currentAlbum[0].tracks.items.map(item => item.duration_ms).reduce((a, b) => a + b) / 1000
    );
  };

  render() {
    const { currentAlbum, relatedAlbums } = this.props.api.currentAlbum;
    return (
      <div className="m-2 p-2">
        {!this.state.loading ? (
          <Fragment>
            <div className="media">
              <img src={currentAlbum[0].images[1].url} className="mr-3" alt={currentAlbum.name} />
              <div className="media-body">
                <h5 className="mt-4 pt-1">ALBUM</h5>
                <h1 className="mt-0">{currentAlbum.name}</h1>
                <p className="mt-2">
                  By <b>{currentAlbum[0].artists.map(artist => artist.name).join(",")}</b>
                </p>
                <p>
                  {currentAlbum[0].release_date.split("-")[0]} . {currentAlbum[0].tracks.total} songs ,{" "}
                  {this.state.hours === 0 ? "" : this.state.hours + "hours"} {this.state.minutes} minutes
                </p>
              </div>
            </div>
            <table
              className="table mt-4"
              style={{ backgroundColor: "#181818", color: "#d1cdcd", border: "0.1px" }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">&#128336;</th>
                </tr>
              </thead>
              {currentAlbum[0].tracks.items.map((item, index) => (
                <tbody key={index}>
                  <tr onClick={() => (window.location = item.external_urls.spotify)}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      {Math.floor(item.duration_ms / 1000 / 60)}:
                      {Math.floor((item.duration_ms % 60000) / 1000)}
                    </td>
                  </tr>
                </tbody>
                // </a>
              ))}
            </table>
            {!isEmpty(relatedAlbums) ? (
              relatedAlbums.map(artist => (
                <Fragment>
                  <h6 className="mt-4  pb-0 mb-0" style={{ fontWeight: "bold" }}>
                    More by {artist.name}
                  </h6>
                  <hr style={{ borderColor: "white" }} />
                  <Albums albums={artist.album.items} />
                </Fragment>
              ))
            ) : (
              <GridLoader color={"green"} />
            )}
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

export default connect(mapStateToProps, { authenticateUser, getAlbum, logoutUser, getArtistAlbum })(
  withRouter(AlbumPage)
);
