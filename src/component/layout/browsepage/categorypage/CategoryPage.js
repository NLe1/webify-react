import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GridLoader } from "react-spinners";

import { authenticateUser, logoutUser } from "../../../../actions/authActions";
import { getCategoriesDetail } from "../../../../actions/apiActions";
import isEmpty from "../../../../utils/is-empty";
import CategoryCard from "./CategoryCard";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    }
    this.state = { loading: true };
    const category_id = this.props.history.location.pathname.split("/").pop();
    this.props.getCategoriesDetail(category_id);
    if (!isEmpty(this.props.errors.error)) {
      if (this.props.errors.error.status === "401" || this.props.errors.error.status == 401) {
        this.props.logoutUser();
      }
    }
  }

  componentWillReceiveProps() {
    const { isLoading } = this.props.api;
    const { category, playlists } = this.props.api.categoriesDetails;
    if (!isEmpty(category) || !isEmpty(playlists)) {
      this.setState({ loading: false });
    } else if (!isLoading) {
      const category_id = this.props.history.location.pathname.split("/").pop();
      this.props.getCategoriesDetail(category_id);
    }
  }

  render() {
    const { category, playlists } = this.props.api.categoriesDetails;
    return (
      <div>
        {!this.state.loading ? (
          <div>
            <h3 className="m-4" style={{ fontWeight: "bold" }}>
              {category.name}
            </h3>
            <h5 className="mt-4 ml-4 pl-2 ml-4 pb-0 mb-0">Popular playlists</h5>
            <hr style={{ marginLeft: "40px", borderColor: "white" }} />
            <div className="mx-3 px-3">
              <div className="row">
                {playlists.map(playlist => (
                  <CategoryCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <GridLoader color={"green"} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { authenticateUser, getCategoriesDetail, logoutUser })(
  withRouter(CategoryPage)
);
