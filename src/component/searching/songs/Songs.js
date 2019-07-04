import React, { Component } from "react";

import SongCard from "./SongCard";

class Songs extends Component {
  state = {
    songs: []
  };

  componentDidMount() {
    this.setState({
      songs: this.props.songs
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.songs !== this.props.songs) {
      this.setState({ songs: this.props.songs });
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
        {this.state.songs.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    );
  }
}

export default Songs;
