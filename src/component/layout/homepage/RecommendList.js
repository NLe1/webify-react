import React, { Component } from "react";
import { connect } from "react-redux";
import { getRelatedArtists, getRelatedTracks } from "../../../actions/apiActions";
import isEmpty from "../../../utils/is-empty";
import getRandom from "../../../utils/getRandom";
import RecommendationCards from "../RecommendationCards";

class RecommendList extends Component {
  state = {
    keys: []
  };

  componentWillReceiveProps() {
    if (
      !isEmpty(this.props.api.userTopTracks) &&
      !isEmpty(this.props.api.userTopArtists) &&
      isEmpty(this.props.api.userTopArtists) &&
      isEmpty(this.props.api.userTopTracks)
    ) {
      const { userTopTracks, userTopArtists } = this.props.api;
      //generate random seeds for recommendation list
      if (!isEmpty(userTopTracks)) {
        console.log(userTopTracks.slice(0, 5).map(artist => artist.id));
        for (let i = 0; i < 5; i++) {
          let index = getRandom();
          this.props.getRelatedTracks([userTopTracks[index].name], [userTopTracks[index].id]);
        }
      }
      if (!isEmpty(userTopArtists)) {
        for (let i = 0; i < 5; i++) {
          let index = getRandom();
          this.props.getRelatedArtists([userTopArtists[index].name], [userTopArtists[index].id]);
        }
      }
    }
  }

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    const { userRelatedArtists, userRelatedTracks } = this.props.api;
    return (
      <div>
        {!isEmpty(userRelatedArtists)
          ? userRelatedArtists.map(list => (
              <RecommendationCards key={list.results[getRandom(list.results.length)].id} list={list} />
            ))
          : null}
        {!isEmpty(userRelatedTracks)
          ? userRelatedTracks.map(list => (
              <RecommendationCards key={list.results[getRandom(list.results.length)].id} list={list} />
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api,
  auth: state.api
});

export default connect(mapStateToProps, { getRelatedArtists, getRelatedTracks })(RecommendList);
