import React, { Component } from "react";

import isEmpty from "../../../utils/is-empty";

export default class PlaylistCard extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <a href={playlist.external_urls.spotify} style={{ textDecoration: "none", color: "black" }}>
        <div className="card mr-2 mt-0" style={{ width: "18rem" }}>
          <img
            src={
              !isEmpty(playlist.images)
                ? playlist.images[0].url
                : "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
            }
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title my-2">{playlist.name}</h5>
            <div className="card-footer text-muted">{playlist.tracks.total + " TRACKS"}</div>
          </div>
        </div>
      </a>
    );
  }
}
