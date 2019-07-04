import React, { Component } from "react";

export default class PlaylistCard extends Component {
  render() {
    const { featuredPlaylists } = this.props;
    return (
      <div
        className="d-flex flex-row"
        style={{
          overflowX: "scroll"
        }}
      >
        {featuredPlaylists
          ? featuredPlaylists.map((playlist, index) => (
              <a
                key={playlist.id}
                href={playlist.external_urls.spotify}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="card mr-2 mt-0" style={{ width: "18rem" }}>
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
                    <h5 className="card-title">Spotify Discover {index + 1} </h5>
                    <p className="card-text">{playlist.name}</p>
                    {playlist.followers ? (
                      <div className="card-footer text-muted">{playlist.followers.total} FOLLOWERS</div>
                    ) : null}
                  </div>
                </div>
              </a>
            ))
          : null}
      </div>
    );
  }
}
