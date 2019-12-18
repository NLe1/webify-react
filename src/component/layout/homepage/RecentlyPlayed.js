import React, { Component } from "react";
import { connect } from "react-redux";

class RecentlyPlayed extends Component {
  render() {
    const { userRecentlyPlayed } = this.props.api;
    return (
      <div>
        <h6 className="mt-4  pb-0 mb-0" style={{ fontWeight: "bold" }}>
          Recently Played
        </h6>
        <hr style={{ borderColor: "white" }} />
        <div
          className=" d-flex flex-row"
          style={{
            overflowX: "scroll"
          }}
        >
          {userRecentlyPlayed
            ? userRecentlyPlayed.map(({ track, played_at }, index) => (
                <a
                  key={played_at}
                  href={track.external_urls.spotify}
                  style={{ textDecoration: "none", color: "black", marginBottom: "0px" }}
                >
                  <div className="card mr-2 mt-0" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={
                        track.album.images
                          ? track.album.images[0].url
                          : "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
                      }
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="card-title">{track.name} </h5>
                      <p className="card-text">
                        {track.artists
                          .map(artist => {
                            return artist.name;
                          })
                          .join(",")}
                      </p>
                      <div className="card-footer text-muted">{track.popularity}% POPULAR</div>
                    </div>
                  </div>
                </a>
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api
});

export default connect(mapStateToProps)(RecentlyPlayed);
