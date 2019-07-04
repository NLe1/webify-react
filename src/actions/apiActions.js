import axios from "axios";

import {
  GET_SONGS,
  GET_PLAYLISTS,
  GET_ALBUMS,
  GET_ARTISTS,
  GET_USER_PLAYLISTS,
  GET_FEATURED_PLAYLISTS,
  GET_USER_TOP_TRACKS,
  GET_USER_TOP_ARTISTS,
  GET_CATEGORIES,
  GET_NEW_RELEASES,
  GET_RECOMMENDATIONS,
  GET_USER_FOLLOWED_ARTISTS,
  GET_USER_SAVED_TRACKS,
  GET_USER_SAVED_ALBUMS,
  GET_ERRORS,
  SET_LOADING,
  GET_RECENTLY_PLAYED,
  GET_CATEGORIES_DETAIL,
  GET_CHARTS,
  GET_RELATED_ARTISTS
} from "../actions/types";
import isEmpty from "../utils/is-empty";

const baseURL = "https://api.spotify.com/v1";

const countries =
  "dz,ad,ar,au,bh,be,bo,br,bg,ca,cl,co,cr,cy,dk,de,ec,eg,sv,es,ee,fi,fr,gt,hn,hk,is,id,ie,il,it,jo,kw,lv,lb,li,lt,lu,hu,my,mt,ma,mc,mx,nl,nz,ni,no,om,ps,pa,py,pe,ph,pl,pt,qa,do,ro,sa,ch,sg,sk,za,se,th,tn,tr,us,ae,gb,uy,vn,at,cz,gr,tw,jp";

export const setLoading = () => dispatch => {
  dispatch({ type: SET_LOADING });
};

export const searchSongs = q => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${baseURL}/search/?q=${q}&type=track`)
    .then(res => {
      dispatch({
        type: GET_SONGS,
        payload: res.data.tracks.items
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const searchArtists = q => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${baseURL}/search/?q=${q}&type=artist`)
    .then(res => {
      dispatch({
        type: GET_ARTISTS,
        payload: res.data.artists.items
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const searchAlbums = q => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${baseURL}/search/?q=${q}&type=album`)
    .then(res => {
      dispatch({
        type: GET_ALBUMS,
        payload: res.data.albums.items
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const searchPlaylists = q => dispatch => {
  dispatch(setLoading());

  axios
    .get(`${baseURL}/search/?q=${q}&type=playlist`)
    .then(res => {
      dispatch({
        type: GET_PLAYLISTS,
        payload: res.data.playlists.items
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getUserPlaylists = () => dispatch => {
  dispatch(setLoading());

  axios
    .get(`${baseURL}/me/playlists?limit=50`)
    .then(res => {
      dispatch({
        type: GET_USER_PLAYLISTS,
        payload: res.data.items
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getFeaturedPlaylists = (country = "US") => async dispatch => {
  dispatch(setLoading());

  await axios
    .get(`${baseURL}/browse/featured-playlists?country=${country}&limit=50`)
    .then(res => {
      let newRes = [];
      res.data.playlists.items.forEach(
        async item =>
          await axios
            .get(`${baseURL}/playlists/${item.id}`)
            .then(async res => {
              await newRes.push(res.data);
            })
            .catch(err => console.log(err))
      );

      dispatch({
        type: GET_FEATURED_PLAYLISTS,
        payload: newRes
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getUserTopTracks = () => dispatch => {
  dispatch(setLoading());

  axios
    .get(`${baseURL}/me/top/tracks`)
    .then(res => {
      dispatch({
        type: GET_USER_TOP_TRACKS,
        payload: res.data.items
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getUserTopArtists = () => dispatch => {
  dispatch(setLoading());

  axios
    .get(`${baseURL}/me/top/tracks`)
    .then(res => {
      dispatch({
        type: GET_USER_TOP_ARTISTS,
        payload: res.data.items
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getRecommendation = (
  keywords,
  seedArtists = [],
  seedTracks = [],
  country = "US"
) => async dispatch => {
  dispatch(setLoading());
  let url = "";
  if (!isEmpty(seedArtists)) {
    url += `seed_artists=${seedArtists.join(",")}`;
  }
  if (url.length > 0) url += "&";
  if (!isEmpty(seedTracks)) {
    url += `seed_tracks=${seedTracks.join(",")}`;
  }
  url += `&market=${country}`;
  await axios
    .get(`${baseURL}/recommendations?${url}`)
    .then(async res => {
      await dispatch({
        type: GET_RECOMMENDATIONS,
        payload: {
          keywords,
          results: res.data.tracks
        }
      });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err });
    });
};

export const getRecentlyPlayed = () => dispatch => {
  dispatch(setLoading());

  axios.get(`${baseURL}/me/player/recently-played`).then(res => {
    dispatch({
      type: GET_RECENTLY_PLAYED,
      payload: res.data.items
    });
  });
};

export const getCategories = (country = "US") => dispatch => {
  dispatch(setLoading());

  axios
    .get(`${baseURL}/browse/categories?country=${country}&limit=50`)
    .then(res => {
      // res.data.categories.items.forEach(item => {
      //   dispatch(getCategoriesDetail(item.id, item));
      // });
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data.categories.items
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

//get playlists from category_id
export const getCategoriesDetail = category_id => async dispatch => {
  dispatch(setLoading());
  if (category_id === null) {
    dispatch({
      type: GET_CATEGORIES_DETAIL,
      payload: {
        playlists: [],
        category: {}
      }
    });
    return;
  }
  var newRes = {
    playlists: [],
    category: {}
  };
  await axios
    .get(`${baseURL}/browse/categories/${category_id}/playlists`)
    .then(async res => {
      await res.data.playlists.items.forEach(
        async item =>
          await axios
            .get(`${baseURL}/playlists/${item.id}`)
            .then(async res => {
              await newRes["playlists"].push(res.data);
            })
            .catch(err => console.log(err))
      );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
  await axios
    .get(`${baseURL}/browse/categories/${category_id}`)
    .then(async res => {
      newRes["category"] = await res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
  dispatch({
    type: GET_CATEGORIES_DETAIL,
    payload: newRes
  });
};

export const getNewReleases = (country = "US") => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${baseURL}/browse/new-releases?country=${country}`)
    .then(res =>
      dispatch({
        type: GET_NEW_RELEASES,
        payload: res.data.albums.items
      })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const getUserSavedTracks = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${baseURL}/me/tracks`)
    .then(res => {
      dispatch({ type: GET_USER_SAVED_TRACKS, payload: res.data.items });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const getUserSavedAlbums = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${baseURL}/me/albums`)
    .then(res => {
      dispatch({ type: GET_USER_SAVED_ALBUMS, payload: res.data.items });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const getUserFollowedArtists = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`${baseURL}/me/following?type=artist`)
    .then(res => {
      dispatch({ type: GET_USER_FOLLOWED_ARTISTS, payload: res.data.artists.items });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const getCharts = () => async dispatch => {
  dispatch(setLoading());

  let chart = {
    topCharts: [],
    viralCharts: []
  };

  let topChartKeys = [];
  let viralChartsKeys = [];

  await countries.split(",").forEach(async country => {
    await axios
      .get(`${baseURL}/browse/categories/toplists/playlists?country=${country}`)
      .then(async res => {
        await res.data.playlists.items.forEach(async item => {
          //check if it is Top 50 category
          if (item.name.includes("Top 50") && !topChartKeys.includes(item.name)) {
            //get a full playlists
            // await axios
            //   .get(`${baseURL}/playlists/${item.id}`)
            //   .then(res => chart.topCharts.push(res.data))
            //   .catch(err => console.log(err));
            chart.topCharts.push(item);
            topChartKeys.push(item.name);
          }
          //check if it is Viral 50
          if (item.name.includes("Viral 50") && !viralChartsKeys.includes(item.name)) {
            // await axios
            //   .get(`${baseURL}/playlists/${item.id}`)
            //   .then(res => chart.viralCharts.push(res.data))
            //   .catch(err => console.log(err));
            chart.viralCharts.push(item);
            viralChartsKeys.push(item.name);
          }
        });
      })
      .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
  });
  dispatch({
    type: GET_CHARTS,
    payload: chart
  });
};

export const getRelatedArtists = id => dispatch => {
  dispatch(setLoading());

  axios
    .get(`${baseURL}/artists/${id}/related-artists`)
    .then(res => dispatch({ type: GET_RELATED_ARTISTS, payload: res.data.artists }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};
