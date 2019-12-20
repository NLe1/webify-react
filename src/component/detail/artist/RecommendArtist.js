import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { GridLoader } from "react-spinners";

import { authenticateUser, logoutUser } from "../../../actions/authActions";
import { getArtist, getArtistAlbum, getAlbum, getRecommendArtist } from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";
class RecommendArtist extends Component {
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
  }

  componentWillUpdate() {
    const { currentArtist } = this.props.api.currentArtist;
    if (isEmpty(currentArtist)) {
      let arr = this.props.history.location.pathname.split("/");
      let id = arr[arr.length - 2];
      this.props.history.push(`/dashboard/artists/${id}`);
    }
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  clickHandle = () => {
    this.props.getArtist();
    this.props.getAlbum();
    this.props.getArtistAlbum();
    this.props.getRecommendArtist();
    this.setState({ loading: true });
  };

  render() {
    const { relatedArtists } = this.props.api.currentArtist;
    return (
      <div className="container">
        <h5 style={{ fontWeight: "bold" }}>
          {" "}
          Discover more artists--based on what fans play on Spotify.
        </h5>
        <div className="row">
          {!this.state.loading ? (
            relatedArtists.map(artist => (
              <Fragment>
                <div className="container col mb-4 pb-4 d-flex justify-content-center">
                  <Link
                    onClick={this.clickHandle}
                    style={{ color: "white" }}
                    to={`/dashboard/artists/${artist.id}`}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "200px",
                        height: "200px",
                        overflow: "hidden",
                        borderRadius: "50%"
                      }}
                    >
                      <img
                        style={{
                          width: "auto",
                          height: "100%"
                          // marginLeft: "-50px"
                        }}
                        src={artist.images[0].url}
                      />
                    </div>
                    <div className="d-flex justify-content-center">{artist.name}</div>
                  </Link>
                </div>
              </Fragment>
            ))
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

export default connect(mapStateToProps, {
  authenticateUser,
  getArtist,
  getArtistAlbum,
  logoutUser,
  getAlbum,
  getRecommendArtist
})(withRouter(RecommendArtist));
