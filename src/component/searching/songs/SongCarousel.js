import React, { Component } from "react";
export default class SongCarousel extends Component {
  render() {
    const { songs } = this.props;
    return (
      <div id="songCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {songs
            ? songs.map((song, index) => (
                <li
                  data-target="#songCarousel"
                  data-slide-to={index}
                  className={index === 0 ? "active" : ""}
                ></li>
              ))
            : null}
        </ol>
        <div className="carousel-inner">
          {songs
            ? songs.map((song, index) => (
                <div className={index === 0 ? "carousel-item active" : "carousel-item"}>
                  <img
                    src={song.album.images[0].url}
                    className="d-center"
                    alt={song.name}
                    style={{
                      maxHeight: "640px",
                      margin: "auto"
                    }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3 style={{ textShadow: "black 0px 0px 10px" }}>{song.name}</h3>
                    <h4 style={{ textShadow: "black 0px 0px 10px" }}>
                      {song.artists.map(obj => obj.name).join(",")}
                    </h4>
                  </div>
                </div>
              ))
            : null}
        </div>
        <a className="carousel-control-prev" href="#songCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#songCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}
