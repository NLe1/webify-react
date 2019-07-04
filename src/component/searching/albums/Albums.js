import React, { Component } from "react";

import AlbumCard from "./AlbumCard";

class Albums extends Component {
  state = {
    albums: []
  };
  componentDidMount() {
    this.setState({ albums: this.props.albums });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.albums !== this.props.albums) {
      this.setState({ albums: this.props.albums });
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
        {this.state.albums.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    );
  }
}

export default Albums;
