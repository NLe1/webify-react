import React, { Component } from "react";

import PlaylistCard from "./PlaylistCard";

class Playlists extends Component {
  state = {
    playlists: []
  };
  componentDidMount() {
    this.setState({ playlists: this.props.playlists });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.playlists !== this.props.playlists) {
      this.setState({ playlists: this.props.playlists });
    }
  }

  render() {
    return (
      <div
        className=" d-flex flex-row"
        style={{
          overflowX: "scroll"
        }}
      >
        {this.state.playlists.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    );
  }
}

export default Playlists;
