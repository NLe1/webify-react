import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { searchSongs, searchPlaylists, searchArtists, searchAlbums } from "../../actions/apiActions";

class SearchBar extends Component {
  state = {
    q: ""
  };

  onChange = e => {
    this.setState({ q: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.searchSongs(this.state.q);
    this.props.searchPlaylists(this.state.q);
    this.props.searchArtists(this.state.q);
    this.props.searchAlbums(this.state.q);

    this.props.history.push("/dashboard/search");
  };

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <input
            className="form-control mr-sm-2 ml-lg-4"
            type="text"
            placeholder="Search for songs ... "
            value={this.state.q}
            onChange={this.onChange}
          />
          <button className="btn btn-success mr-sm-2" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { searchSongs, searchPlaylists, searchArtists, searchAlbums }
)(withRouter(SearchBar));
