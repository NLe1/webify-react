import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { authenticateUser } from "../../../../actions/authActions";
import { getCategoriesDetail } from "../../../../actions/apiActions";
import isEmpty from "../../../../utils/is-empty";
import CategoryCard from "./CategoryCard";

class CategoryPage extends Component {
  state = {
    category: {},
    playlists: []
  };

  constructor(props) {
    super(props);
    if (localStorage.getItem("jwtToken")) {
      console.log("authenticating...");
      this.props.authenticateUser(localStorage.getItem("jwtToken"));
    }
    if (!isEmpty(this.props.errors)) {
      this.props.logoutUser();
    }
  }

  async componentDidMount() {
    const category_id = this.props.history.location.pathname.split("/").pop();
    const { playlists, category } = this.props.api.categoriesDetails;
    if (isEmpty(playlists) && isEmpty(category)) {
      await this.props.getCategoriesDetail(category_id);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { playlists, category } = await this.props.api.categoriesDetails;

    // console.log(Object.keys(playlists));
    // console.log(playlists.length);
    setTimeout(() => {
      if (!isEmpty(playlists) && isEmpty(this.state.playlists)) {
        // console.log("updateed");
        this.setState({ playlists });
      }
      if (!isEmpty(category) && isEmpty(prevState.category)) {
        this.setState({ category });
      }
    }, 600);
  }

  componentWillUnmount() {
    this.props.getCategoriesDetail(null);
  }

  render() {
    const { category, playlists } = this.state;
    const { isLoading } = this.props.api;
    return (
      <div>
        {!isEmpty(category) && !isLoading ? (
          <div>
            <h1 className="display-4 m-4" style={{ fontWeight: "bold" }}>
              {category.name}
            </h1>
            <h5 className="mt-4 ml-4 pl-2 ml-4 pb-0 mb-0">Popular playlists</h5>
            <hr style={{ marginLeft: "40px", borderColor: "white" }} />
            <div className="mx-3 px-3">
              <div className="row">
                {playlists && !isLoading
                  ? playlists.map(playlist => <CategoryCard key={playlist.id} playlist={playlist} />)
                  : null}
              </div>
            </div>
          </div>
        ) : (
          <h1 className="display-4 m-4" style={{ fontWeight: "bold" }}>
            Loading...
          </h1>
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

export default connect(
  mapStateToProps,
  { authenticateUser, getCategoriesDetail }
)(withRouter(CategoryPage));
