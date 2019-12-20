import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { GridLoader } from "react-spinners";

import { authenticateUser, logoutUser } from "../../../actions/authActions";
import { getRelatedArtists, getRelatedTracks } from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";

class BrowsePage extends Component {
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
    if (!isEmpty(this.props.api.categoriesLists)) {
      this.props.history.push("/dashboard/browse/genres");
    } else {
      this.props.history.push("/dashboard");
    }
  }
  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <Fragment>
        {this.state.loading ? (
          <GridLoader color={"green"} />
        ) : (
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
              <Link to="/dashboard/browse/discovers" style={{ color: "#d1cdcd" }}>
                Discover
              </Link>
            </h5>
            <h5 className="mr-4  pb-0 mb-0 d-inline ">
              <Link to="/dashboard/browse/newArtistsAndTracks" style={{ color: "#d1cdcd" }}>
                Top Artists And Tracks
              </Link>
            </h5>
            {/* <hr style={{ borderColor: "white" }} /> */}
          </div>
        )}
      </Fragment>
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
  logoutUser,
  getRelatedArtists,
  getRelatedTracks
})(withRouter(BrowsePage));
