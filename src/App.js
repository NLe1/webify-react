import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store";
import Landing from "./component/landing/Landing";
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
import PlaylistPage from "./component/detail/playlist/PlaylistPage";
import AlbumPage from "./component/detail/album/AlbumPage";
import ArtistPage from "./component/detail/artist/ArtistPage";
import Overview from "./component/detail/artist/Overview";
import RecommendArtist from "./component/detail/artist/RecommendArtist";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route path="/callback" component={Landing} />
          <Route exact path="/" component={Landing} />
          <div className="row">
            <div className="col-lg-2 d-none d-lg-block" style={{ border: "0px", margin: "0px" }}>
              <Route path="/dashboard" component={Sidebar} />
            </div>
            <div className="col-lg-10">
              <Route exact path="/dashboard/playlists/:id" component={PlaylistPage} />
              <Route path="/dashboard/artists/:id" component={ArtistPage} />
              <Route path="/dashboard/artists/:id/overview" component={Overview} />
              <Route path="/dashboard/artists/:id/recommend" component={RecommendArtist} />
              <Route exact path="/dashboard/albums/:id" component={AlbumPage} />
              <Route exact path="/dashboard" component={Homepage} />
              <Route exact path="/dashboard/search" component={SearchPage} />
              <Route path="/dashboard/browse" component={BrowsePage} />
              <Route exact path="/dashboard/browse/genres" component={Genres} />
              <Route path="/dashboard/browse/discovers" component={Discovers} />
              <Route
                exact
                path="/dashboard/browse/newArtistsAndTracks"
                component={TopArtistsAndTracks}
              />
              <Route exact path="/dashboard/browse/charts" component={Charts} />
              <Route exact path="/dashboard/browse/genres/:id" component={CategoryPage} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
