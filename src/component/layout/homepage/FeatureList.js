import React, { Component } from "react";
import { connect } from "react-redux";

import PlaylistCard from "../PlaylistCard";

class FeatureList extends Component {
  render() {
    const { featuredPlaylists } = this.props.api;
    return (
      <div>
        <h6 className="mt-4  pb-0 mb-0" style={{ fontWeight: "bold" }}>
          Discover Weekly
        </h6>
        <hr style={{ borderColor: "white" }} />
        <PlaylistCard featuredPlaylists={featuredPlaylists} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api
});

export default connect(mapStateToProps)(FeatureList);
