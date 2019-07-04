import React, { Component } from "react";

import ArtistCard from "./ArtistCard";

class Artists extends Component {
  state = {
    artists: []
  };
  componentDidMount() {
    this.setState({ artists: this.props.artists });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.artists !== this.props.artists) {
      this.setState({ artists: this.props.artists });
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
        {this.state.artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    );
  }
}

export default Artists;
