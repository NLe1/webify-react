import React, { Component, Fragment } from "react";

import isEmpty from "../../../utils/is-empty";

class ChartCards extends Component {
  render() {
    const { playlists } = this.props;
    return (
      <Fragment>
        <div className="row">
          {!isEmpty(playlists)
            ? playlists.map(playlist => (
                <div key={playlist.id} className="my-3 col-lg-3 col-md-4 col-sm-6">
                  <a href={playlist.external_urls.spotify} alt="">
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
                    </div>
                  </a>
                </div>
              ))
            : null}
        </div>
      </Fragment>
    );
  }
}

export default ChartCards;
