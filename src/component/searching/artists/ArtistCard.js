import React, { Component } from "react";

import isEmpty from "../../../utils/is-empty";

export default class ArtistCard extends Component {
  render() {
    const { artist } = this.props;
    return (
      <a href={artist.external_urls.spotify} style={{ textDecoration: "none", color: "black" }}>
        <div className="card mr-2 mt-0" style={{ width: "18rem" }}>
          <img
            src={
              !isEmpty(artist.images)
                ? artist.images[0].url
                : "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
            }
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title" style={{ margin: "0px" }}>
              {artist.name}
            </h5>
            <p className="card-text">Genres: {artist.genres.join(",")}</p>
            <div className="card-footer text-muted">{artist.followers.total} FOLLOWERS</div>
          </div>
        </div>
      </a>
    );
  }
}
