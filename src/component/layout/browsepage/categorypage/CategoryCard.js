import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CategoryCard extends Component {
  render() {
    const { playlist } = this.props;
    return (
      <div className="my-3 col-lg-3 col-md-4 col-sm-6">
        <Link to={`/dashboard/playlists/${playlist.id}`} style={{ color: "white" }}>
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
              <h5 className="card-title" style={{ color: "black" }}>
                {playlist.name.length > 50 ? playlist.name.substring(0, 50) + "..." : playlist.name}
              </h5>
              <p className="card-text" style={{ color: "black" }}>
                {playlist.description.length > 50
                  ? playlist.description.substring(0, 50) + "..."
                  : playlist.description}
              </p>
            </div>
            {/* <div className="card-footer">{playlist.followers.total} FOLLOWERS</div> */}
          </div>
        </Link>
      </div>
    );
  }
}
