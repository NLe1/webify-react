import React, { Component } from "react";
export default class ArtistCarousel extends Component {
  render() {
    const { artists } = this.props;
    return (
      <div id="artistCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {artists
            ? artists.map((artist, index) => (
                <li
                  data-target="#artistCarousel"
                  data-slide-to={index}
                  key={artist.id}
                  className={index === 0 ? "active" : ""}
                ></li>
              ))
            : null}
        </ol>
        <div className="carousel-inner">
          {artists
            ? artists.map((artist, index) => (
                <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={artist.id}>
                  <img
                    src={artist.images[0].url}
                    className="d-center"
                    alt={artist.genres.join(",")}
                    style={{
                      maxHeight: "640px",
                      //   height: "360px",
                      margin: "auto"
                      //   backgroundSize: "cover"
                    }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3 style={{ textShadow: "black 0px 0px 10px" }}>{artist.name}</h3>
                    <h4 style={{ textShadow: "black 0px 0px 10px" }}>
                      {artist.followers.total} followers.
                    </h4>
                  </div>
                </div>
              ))
            : null}
        </div>
        <a className="carousel-control-prev" href="#artistCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#artistCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}
