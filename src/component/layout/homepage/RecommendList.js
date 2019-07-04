import React, { Component } from "react";
import { connect } from "react-redux";

import { getRecommendation } from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";
import RecommendationCards from "../RecommendationCards";

class RecommendList extends Component {
  state = {
    keys: []
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      !this.props.api.isLoading &&
      this.props.api.userTopTracks.length > 0 &&
      this.props.api.userTopArtists.length > 0 &&
      this.props.api.recommendationLists.length === 0 &&
      (prevProps.api.userTopTracks.length === 0 || prevProps.api.userTopArtists.length === 0)
    ) {
      const { userTopTracks, userTopArtists } = this.props.api;
      //generate random seeds for recommendation list
      const seedArtists = [];
      const seedTracks = [];
      for (var i = 0; i < 2; i++) {
        let rand = this.getRandomInt(20);
        seedTracks.push(userTopTracks[rand].id);
        await this.setState({
          keys: [...this.state.keys, userTopTracks[rand].name]
        });
        rand = this.getRandomInt(20);
        seedArtists.push(userTopArtists[rand].id);
        await this.setState({
          keys: [...this.state.keys, userTopArtists[rand].name]
        });
      }
      await this.props.getRecommendation(
        this.state.keys,
        seedArtists,
        seedTracks,
        this.props.auth.user ? this.props.auth.user.country : "US"
      );
    }
  }

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    const { recommendationLists } = this.props.api;
    return (
      <div>
        {!isEmpty(recommendationLists)
          ? recommendationLists.map(list => <RecommendationCards key={list.keywords} list={list} />)
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api,
  auth: state.api
});

export default connect(
  mapStateToProps,
  { getRecommendation }
)(RecommendList);
