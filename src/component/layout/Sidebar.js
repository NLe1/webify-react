import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { getUserPlaylists } from "../../actions/apiActions";
import { authenticateUser } from "../../actions/authActions";
import isEmpty from "../../utils/is-empty";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    }
    if (!isEmpty(this.props.errors)) {
      this.props.logoutUser();
    }
  }
  componentDidMount() {
    if (isEmpty(this.props.errors)) this.props.getUserPlaylists();
  }

  render() {
    const { userPlaylists } = this.props.api;
    return (
      <div
        className="sidebar-sticky position-fixed p-0 col-2"
        style={{
          backgroundColor: "#050505",
          position: "sticky",
          height: "100vh",
          overflowY: "auto"
        }}
      >
        <ul className="nav flex-column">
          <div className="my-1 mx-2">
            <li className="nav-item d-inline">
              <Link to="/dashboard" style={{ color: "#d1cdcd" }}>
                <span className="fa fa-2x fa-home mr-3" />
                HOME
              </Link>
            </li>
          </div>
          <div className="my-1 mx-2">
            <li className="nav-item">
              <Link to="/dashboard/browse" style={{ color: "#d1cdcd" }}>
                <span className="fa fa-2x fa-podcast mr-3" />
                BROWSE
              </Link>
            </li>
          </div>
          <div className="my-1 mx-2">
            <li className="nav-item">
              <Link to="/dashboard/search" style={{ color: "#d1cdcd" }}>
                <span className="fa fa-2x fa-user mr-3" />
                SEARCH
              </Link>
            </li>
          </div>
        </ul>
        <div>
          <h3 className="p-2">Your Playlists</h3>
          <div className="container mb-3 pb-5">
            {userPlaylists
              ? userPlaylists.map(playlist => (
                  <p key={playlist.id} className=" pb-1">
                    <a
                      href={playlist.external_urls.spotify}
                      style={{ textDecoration: "none", color: "#d1cdcd" }}
                    >
                      {playlist.name}
                    </a>
                  </p>
                ))
              : null}
          </div>
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

export default connect(
  mapStateToProps,
  { getUserPlaylists, authenticateUser }
)(withRouter(Sidebar));
