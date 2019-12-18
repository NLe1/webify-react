import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store";
import Landing from "./component/landing/Landing";
import Dashboard from "./component/dashboard/Dashboard";
import Navbar from "./component/layout/Navbar";
import SearchPage from "./component/layout/searchpage/SearchPage";
import BrowsePage from "./component/layout/browsepage/BrowsePage";
import Sidebar from "./component/layout/Sidebar";
import Homepage from "./component/layout/homepage/Homepage";
import CategoryPage from "./component/layout/browsepage/categorypage/CategoryPage";
import Genres from "./component/layout/browsepage/Genres";
import Discovers from "./component/layout/browsepage/Discovers";
import Charts from "./component/layout/browsepage/Charts";
import TopArtistsAndTracks from "./component/layout/browsepage/TopArtistsAndTracks";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route path="/callback" component={Landing} />
          <Route exact path="/" component={Landing} />
          <Route path="/dashboard" component={Dashboard}>
            <div className="row">
              <div className="col-lg-2 d-none d-lg-block" style={{ border: "0px", margin: "0px" }}>
                <Route path="/dashboard" component={Sidebar} />
              </div>
              <div className="col-lg-10">
                <Route exact path="/dashboard" component={Homepage} />
                <Route exact path="/dashboard/search" component={SearchPage} />
                <Route exact path="/dashboard/browse" component={BrowsePage} />
                <Route exact path="/dashboard/browse/genres" component={Genres} />
                <Route exact path="/dashboard/browse/discovers" component={Discovers} />
                <Route
                  exact
                  path="/dashboard/browse/newArtistsAndTracks"
                  component={TopArtistsAndTracks}
                />
                <Route exact path="/dashboard/browse/charts" component={Charts} />
                <Route exact path="/dashboard/browse/genres/:id" component={CategoryPage} />
              </div>
            </div>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
