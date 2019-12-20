import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import isEmpty from "../../../utils/is-empty";

class ChartCards extends Component {
  render() {
    const { playlists } = this.props;
    return (
      <Fragment>
        <div className="row">
          {!isEmpty(playlists) ? (
            playlists.map(playlist => (
              <div key={playlist.id} className="my-3 col-lg-3 col-md-4 col-sm-6">
                <Link to={`/dashboard/playlists/${playlist.id}`} alt="">
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
                </Link>
              </div>
            ))
          ) : (
            <GridLoader color={"green"} />
          )}
        </div>
      </Fragment>
    );
  }
}

export default ChartCards;
