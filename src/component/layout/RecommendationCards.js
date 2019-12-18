import React, { Component, Fragment } from "react";

import isEmpty from "../../utils/is-empty";
import getRandom from "../../utils/getRandom";
import { GridLoader } from "react-spinners";

export default class RecommendationCards extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { list } = this.props;
    const keywords = [
      "Suggested for you based on: ",
      "Similar to: ",
      "Because you listened to: ",
      "Because you like: "
    ];
    return this.state.loading ? (
      <GridLoader color={"green"} />
    ) : (
      <Fragment>
        <h6 className="mt-4 pb-0 mb-0" style={{ fontWeight: "bold" }}>
          {keywords[getRandom() % 4]} {list.keywords.join(", ")}
        </h6>
        <hr style={{ borderColor: "white" }} />
        <div
          className="d-flex flex-row"
          style={{
            overflowX: "scroll"
          }}
        >
          {!isEmpty(list)
            ? list.results.map(track => (
                <a
                  key={track.id}
                  href={track.external_urls.spotify}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="card mr-2 mt-0" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={
                        track.album.images[0].url
                          ? track.album.images[0].url
                          : "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
                      }
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="card-title">{track.name} </h5>
                      <p className="card-text">{track.artists.map(artist => artist.name).join(", ")}</p>
                      <div className="card-footer text-muted">{track.popularity}% Popular</div>
                    </div>
                  </div>
                </a>
              ))
            : null}
        </div>
      </Fragment>
    );
  }
}
