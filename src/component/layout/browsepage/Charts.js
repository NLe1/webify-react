import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import isEmpty from "../../../utils/is-empty";
import ChartCards from "./ChartCards";

class Charts extends Component {
  constructor(props) {
    super(props);
    const { charts } = this.props.api;

    if (isEmpty(charts.topCharts) || isEmpty(charts.viralCharts)) {
      this.props.history.push("/dashboard/browse");
    } else {
      charts.featuredCharts = [];
      if (!isEmpty(charts)) {
        for (var i = 0; i < 2; i++) {
          charts.featuredCharts.push(charts.topCharts[i]);
          charts.featuredCharts.push(charts.viralCharts[i]);
        }
      }
    }
  }
  render() {
    const { charts } = this.props.api;
    return (
      <div className="container">
        <div>
          {/* <h1 className="display-4" style={{ fontWeight: "bold" }}>
            BROWSE
          </h1>
          <h5 className="mr-4 pb-0 mb-0 d-inline ">
            <Link to="/dashboard/browse/genres" style={{ color: "#d1cdcd" }}>
              Genres
            </Link>
          </h5>
          <h5 className="mr-4 pb-0 mb-0 d-inline ">
            <Link to="/dashboard/browse/charts" className="text-success">
              Charts
            </Link>
          </h5>
          <h5 className="mr-4 pb-0 mb-0 d-inline ">
            <Link to="/dashboard/browse/discovers" style={{ color: "#d1cdcd" }}>
              Discovers
            </Link>
          </h5>
          <h5 className="mr-4  pb-0 mb-0 d-inline ">
            <Link to="/dashboard/browse/newArtistsAndTracks" style={{ color: "#d1cdcd" }}>
              Top Artists And Tracks
            </Link>
          </h5> */}
          <h6 className="mt-4 pb-0 mb-0" style={{ fontWeight: "bold" }}>
            Featured Charts
          </h6>
          <hr className="mb-1 mt-1" style={{ borderColor: "white" }} />
          {!isEmpty(charts.featuredCharts) ? (
            <ChartCards playlists={charts.featuredCharts} />
          ) : (
            <GridLoader color={"green"} />
          )}
          <div className="row">
            <div className="col">
              <h6 className="d-inline" style={{ fontWeight: "bold" }}>
                Top 50 Charts
              </h6>
              <hr className="mb-1 mt-1" style={{ borderColor: "white" }} />
              {!isEmpty(charts.topCharts) ? <ChartCards playlists={charts.topCharts} /> : null}
            </div>
            <div className="col">
              <h6 className="d-inline" style={{ fontWeight: "bold" }}>
                Viral 50 charts
              </h6>
              <hr className="mb-1 mt-1" style={{ borderColor: "white" }} />
              {!isEmpty(charts.viralCharts) ? (
                <ChartCards playlists={charts.viralCharts} />
              ) : (
                <GridLoader color={"green"} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api,
  errors: state.errors,
  auth: state.errors
});

export default connect(mapStateToProps)(withRouter(Charts));
