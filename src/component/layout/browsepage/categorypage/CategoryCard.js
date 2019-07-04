import React, { Component } from "react";

export default class CategoryCard extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <div className="my-3 col-lg-3 col-md-4 col-sm-6">
        <a
          href={playlist.external_urls.spotify}
          alt=""
          style={{ color: "black", textDecoration: "none" }}
        >
          <div className="card">
            <img
              className="card-img-top"
              src={
                playlist.images
                  ? playlist.images[0].url
                  : "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
              }
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">{playlist.name}</h5>
              <p className="card-text">
                {playlist.description.length > 100
                  ? playlist.description.substring(0, 100) + "..."
                  : playlist.description}
              </p>
            </div>
            <div className="card-footer">{playlist.followers.total} FOLLOWERS</div>
          </div>
        </a>
      </div>
    );
  }
}
