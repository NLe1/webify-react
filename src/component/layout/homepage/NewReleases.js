import React, { Component } from "react";
import { connect } from "react-redux";

class NewRealeases extends Component {
  render() {
    const { newReleaseLists } = this.props.api;
    return (
      <div>
        <h6 className="mt-4  pb-0 mb-0" style={{ fontWeight: "bold" }}>
          New albums & singles
        </h6>
        <hr style={{ borderColor: "white" }} />
        <div
          className=" d-flex flex-row"
          style={{
            overflowX: "scroll"
          }}
        >
          {newReleaseLists
            ? newReleaseLists.map(item => (
                <a
                  key={item.id}
                  href={item.external_urls.spotify}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="card mr-2 mt-0" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={
                        item.images
                          ? item.images[0].url
                          : "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
                      }
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="card-title"> {item.name}</h5>
                      <p className="card-text"> {item.artists.map(artist => artist.name).join(", ")}</p>
                      <p className="card-text">Release: {item.release_date}</p>
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

export default connect(mapStateToProps)(NewRealeases);
