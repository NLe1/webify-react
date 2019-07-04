import React, { Component } from "react";

import isEmpty from "../../../utils/is-empty";

export default class SongCard extends Component {
  render() {
    const { song } = this.props;
    return (
      <a href={song.external_urls.spotify} style={{ textDecoration: "none", color: "black" }}>
        <div className="card mr-2 mt-0" style={{ width: "18rem" }}>
          <img
            src={
              !isEmpty(song.album.images)
                ? song.album.images[0].url
                : "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
            }
            className="card-img"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title my-2">{song.name}</h5>
            <div className="card-footer text-muted ">{song.artists[0].name.toUpperCase()}</div>
          </div>
        </div>
      </a>
    );
  }
}
