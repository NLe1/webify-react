import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import CategoriesCard from "./CategoriesCard";
import isEmpty from "../../../utils/is-empty";

class Genres extends Component {
  componentDidMount() {
    if (isEmpty(this.props.api.categoriesLists)) {
      this.props.history.push("/dashboard/browse");
    }
  }
  render() {
    const { categoriesLists } = this.props.api;
    return (
      <div className="container">
        {/* <h1 className="display-4" style={{ fontWeight: "bold" }}>
          BROWSE
        </h1>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/genres" className="text-success">
            Genres
          </Link>
        </h5>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/charts" style={{ color: "#d1cdcd" }}>
            Charts
          </Link>
        </h5>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/discovers" style={{ color: "#d1cdcd" }}>
            Discovers
          </Link>
        </h5>
        <h5 className="mr-4  pb-0 mb-0 d-inline ">
          <Link to="/dashboard/browse/newArtistsAndTracks" style={{ color: "#d1cdcd" }}>
            Top Artists And Tracks
          </Link>
        </h5> */}
        <h6 className="mt-4  pb-0 mb-0" style={{ fontWeight: "bold" }}>
          Genres & Moods
        </h6>
        <hr className="mb-1 mt-1" style={{ borderColor: "white" }} />

        <div className="row">
          {!isEmpty(categoriesLists) ? (
            categoriesLists.map(category => <CategoriesCard key={category.id} category={category} />)
          ) : (
            <GridLoader color={"green"} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api
});

export default connect(mapStateToProps)(withRouter(Genres));
