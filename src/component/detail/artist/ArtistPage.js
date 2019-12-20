import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { GridLoader } from "react-spinners";

import { authenticateUser, logoutUser } from "../../../actions/authActions";
import { getArtist, getArtistAlbum, getAlbum, getRecommendArtist } from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";

class ArtistPage extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    }
    if (!isEmpty(this.props.errors.error)) {
      if (this.props.errors.error.status === "401" || this.props.errors.error.status == 401) {
        this.props.logoutUser();
      }
    }
    this.state = { loading: true, flag: false };
    this.componentWillReceiveProps();
  }

  componentWillReceiveProps() {
    const id = this.props.history.location.pathname.split("/").pop();
    const { loading, flag } = this.state;
    const { isLoading } = this.props.api;
    const { currentArtist, relatedArtists } = this.props.api.currentArtist;
    const { currentAlbum, relatedAlbums } = this.props.api.currentAlbum;
    if (!flag && isEmpty(currentArtist) && !isLoading) {
      this.setState({ flag: true });
      this.props.getArtist(id);
      this.setState({ flag: false });
    }

    if (!flag && !isEmpty(currentArtist) && isEmpty(relatedArtists) && !isLoading) {
      this.setState({ flag: true });
      this.props.getRecommendArtist(currentArtist.id);
      this.setState({ flag: false });
    }

    if (!flag && !isEmpty(currentArtist) && isEmpty(relatedAlbums) && !isLoading) {
      this.setState({ flag: true });
      this.props.getArtistAlbum(currentArtist.id);
      this.setState({ flag: false });
    }

    if (!flag && !isEmpty(relatedAlbums) && isEmpty(currentAlbum) && !isLoading) {
      this.setState({ flag: true });
      relatedAlbums[0].album.items.forEach(album => this.props.getAlbum(album.id));
      this.setState({ flag: false });
    }
    if (!isEmpty(relatedAlbums) && !isEmpty(currentAlbum) && !isEmpty(currentArtist) && loading) {
      this.setState({ loading: false });
      this.props.history.push(`/dashboard/artists/${currentArtist.id}/overview`);
    }
  }

  componentWillUnmount() {
    this.props.getArtist();
    this.props.getArtistAlbum();
    this.props.getAlbum();
    this.props.getRecommendArtist();
  }

  render() {
    const { loading } = this.state;
    const { currentArtist } = this.props.api.currentArtist;
    if (isEmpty(currentArtist) && !loading) {
      this.setState({ loading: true });
      this.componentWillReceiveProps();
    }
    return !loading && !isEmpty(currentArtist) ? (
      <Fragment>
        <div
          className="jumbotron"
          style={{
            height: "400px",
            boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
            backgroundImage: `url(${currentArtist.images[0].url})`,
            backgroundPosition: "center",
            backgroundSize: "100% auto",
            zIndex: "2",
            position: "relative",
            color: "white",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="container">
            <p
              style={{
                fontSize: "7.5vw",
                fontWeight: "bold"
                // magin: 0,
                // padding: 0
              }}
            >
              {currentArtist.name}
            </p>
            <div className="container row">
              {/* <div>
                <p style={{fontSize: "in"}}>GENRES</p>
                <p>{currentArtist.genres.join(", ")}</p>
              </div> */}
              <div style={{ position: "absolute", right: 40 }}>
                <h6 style={{ fontWeight: "bold" }}> NUMBER FOLLOWERS</h6>
                <p> {currentArtist.followers.total}</p>
              </div>
            </div>

            <div
              className="container"
              style={{ position: "absolute", bottom: 0, marginLeft: 0, paddingLeft: 0 }}
            >
              <h5 className="mr-4  pb-0 mb-0 d-inline">
                <Link to={`/dashboard/artists/${currentArtist.id}/overview`} style={{ color: "white" }}>
                  OVERVIEW
                </Link>
              </h5>
              <h5 className="mr-4  pb-0 mb-0 d-inline ">
                <Link to={`/dashboard/artists/${currentArtist.id}/recommend`} style={{ color: "white" }}>
                  FAN ALSO LIKE
                </Link>
              </h5>
              {/* <h5 className="mr-4  pb-0 mb-0 d-inline ">
                <Link to={`/dashboard/artists/${currentArtist.id}/about`} style={{ color: "white" }}>
                  ABOUT
                </Link>
              </h5> */}
            </div>
          </div>
        </div>
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
  getAlbum,
  getRecommendArtist
})(withRouter(ArtistPage));
