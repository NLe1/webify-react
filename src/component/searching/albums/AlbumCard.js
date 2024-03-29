import React, { Component } from "react";
import { BrowserRouter as router } from "react-router-dom";
import { Link } from "react-router-dom";
import isEmpty from "../../../utils/is-empty";

export default class AlbumCard extends Component {
  reloadRoute = id => {
    router.push({ pathname: "/empty" });
    router.replace({ pathname: `/dashboard/albums/${id}` });
  };
  render() {
    const { album } = this.props;
    return (
      <Link to={`/dashboard/albums/${album.id}`} style={{ textDecoration: "none", color: "black" }}>
        <div className="card mr-2 mt-0" style={{ width: "18rem" }}>
          <img
            src={
              !isEmpty(album.images)
                ? album.images[0].url
                : "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
            }
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title my-2">{album.name}</h5>
            <p className="card-text">RELEASE DAY {album.release_date}</p>
            <div className="card-footer text-muted">{album.total_tracks + " TRACKS"}</div>
          </div>
        </div>
      </Link>
    );
  }
}
