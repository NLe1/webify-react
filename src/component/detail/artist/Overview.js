import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { authenticateUser, logoutUser } from "../../../actions/authActions";
import { getArtist, getArtistAlbum, getAlbum } from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";
import { GridLoader } from "react-spinners";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    }
    if (!isEmpty(this.props.errors.error)) {
      if (this.props.errors.error.status === "401" || this.props.errors.error.status == 401) {
        this.props.logoutUser();
      }
    }
    if (isEmpty(this.props.api.currentAlbum.currentAlbum)) {
      this.props.history.push("/dashboard/search");
    }
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { currentAlbum } = this.props.api.currentAlbum;
    return !this.state.loading ? (
      <Fragment>
        {currentAlbum.map(album => (
          <Fragment>
            <div className="media">
              <img
                src={album.images[Math.floor(album.images.length / 2)].url}
                className="mr-3"
                alt={album.name}
                style={{ width: "30%" }}
              />
              <div className="media-body">
                <h5 className="mt-4 pt-1">ALBUM</h5>
                <h1 className="mt-0">{album.name}</h1>
                <p className="mt-2">
                  By <b>{album.artists.map(artist => artist.name).join(",")}</b>
                </p>
                <p>
                  {album.release_date.split("-")[0]} . {album.tracks.total} songs
                </p>
              </div>
            </div>

            <table
              className="table mt-4"
              style={{ backgroundColor: "#181818", color: "white", border: "0.1px" }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">&#128336;</th>
                </tr>
              </thead>
              {album.tracks.items.map((item, index) => (
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
              ))}
            </table>
          </Fragment>
        ))}
      </Fragment>
    ) : (
      <GridLoader color={"green"} />
    );
  }
}
const mapStateToProps = state => ({
  api: state.api,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  authenticateUser,
  getArtist,
  getArtistAlbum,
  logoutUser,
  getAlbum
})(withRouter(Overview));
