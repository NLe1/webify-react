import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
import isEmpty from "../../../utils/is-empty";

class CategoriesCard extends Component {
  render() {
    const { category } = this.props;
    return (
      <Fragment>
        {!isEmpty(category) ? (
          <div className="my-3 col-lg-3 col-md-4 col-sm-6">
            <Link to={`/dashboard/browse/genres/${category.id}`} style={{ color: "white" }}>
              <div className="card">
                <img className="card-img" src={category.icons[0].url} alt="" />
                <div className="card-img-overlay">
                  <div className="text-center text-light">{category.name}</div>
                </div>
              </div>
            </Link>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default CategoriesCard;
