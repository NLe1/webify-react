import axios from "axios";

import {
  GET_SONGS,
  GET_PLAYLISTS,
  GET_PLAYLIST,
  GET_ALBUMS,
  GET_ARTISTS,
  GET_ARTIST_ALBUM,
  GET_USER_PLAYLISTS,
  GET_FEATURED_PLAYLISTS,
  GET_USER_TOP_TRACKS,
  GET_USER_TOP_ARTISTS,
  GET_CATEGORIES,
  GET_NEW_RELEASES,
  GET_RELATED_ARTISTS,
  GET_RELATED_TRACKS,
  GET_USER_FOLLOWED_ARTISTS,
  GET_USER_SAVED_TRACKS,
  GET_USER_SAVED_ALBUMS,
  GET_ERRORS,
  SET_LOADING,
  GET_RECENTLY_PLAYED,
  GET_CATEGORIES_DETAIL,
  GET_CHARTS,
  GET_ALBUM,
  GET_ARTIST,
  GET_RECOMMEND_ARTIST
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

export const getArtistAlbum = (id, name) => async dispatch => {
  dispatch(setLoading());
  if (id === undefined) {
    dispatch({ type: GET_ARTIST_ALBUM, payload: [] });
  } else {
    await axios
      .get(`${baseURL}/artists/${id}/albums`)
      .then(res =>
        dispatch({
          type: GET_ARTIST_ALBUM,
          payload: {
            name,
            album: res.data
          }
        })
      )
      .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
  }
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
    .get(`${baseURL}/me/top/artists`)
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

//get a playlist based on id
export const getPlaylist = id => dispatch => {
  dispatch(setLoading());
  if (id === undefined) {
    dispatch({ type: GET_PLAYLIST, payload: {} });
  }else{
    axios
    .get(`${baseURL}/playlists/${id}`)
    .then(res => dispatch({ type: GET_PLAYLIST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
  }
 
};

//get an album based on id
export const getAlbum = id => dispatch => {
  dispatch(setLoading());
  if (id === undefined) {
    dispatch({ type: GET_ALBUM, payload: [] });
  } else {
    axios
      .get(`${baseURL}/albums/${id}`)
      .then(res => dispatch({ type: GET_ALBUM, payload: res.data }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
  }
};

//get an artist based on id
export const getArtist = id => dispatch => {
  dispatch(setLoading());
  if (id === undefined) {
    dispatch({ type: GET_ARTIST, payload: {} });
  } else {
    axios
      .get(`${baseURL}/artists/${id}`)
      .then(res => dispatch({ type: GET_ARTIST, payload: res.data }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
  }
};

//get an relatedArtists on current artist id
export const getRecommendArtist = id => dispatch => {
  dispatch(setLoading());
  if (id === undefined) {
    dispatch({ type: GET_RECOMMEND_ARTIST, payload: [] });
  } else {
    axios
      .get(`${baseURL}/artists/${id}/related-artists`)
      .then(res => {
        dispatch({ type: GET_RECOMMEND_ARTIST, payload: res.data.artists });
      })
      .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
  }
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
    .then(res => {
      newRes.playlists = res.data.playlists.items;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
  await axios
    .get(`${baseURL}/browse/categories/${category_id}`)
    .then(res => {
      newRes.category = res.data;
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
            chart.topCharts.push(item);
            topChartKeys.push(item.name);
          }
          //check if it is Viral 50
          if (item.name.includes("Viral 50") && !viralChartsKeys.includes(item.name)) {
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

export const getRelatedArtists = (keywords = [], seedArtists = [], country = "US") => async dispatch => {
  dispatch(setLoading());
  let url = "";
  if (!isEmpty(seedArtists)) {
    url += `seed_artists=${seedArtists.join(",")}`;
  }
  url += `&market=${country}`;
  await axios
    .get(`${baseURL}/recommendations?${url}`)
    .then(async res => {
      await dispatch({
        type: GET_RELATED_ARTISTS,
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

export const getRelatedTracks = (keywords = [], seedTracks = [], country = "US") => async dispatch => {
  dispatch(setLoading());
  let url = "";
  if (!isEmpty(seedTracks)) {
    url += `seed_tracks=${seedTracks.join(",")}`;
  }
  url += `&market=${country}`;
  await axios
    .get(`${baseURL}/recommendations?${url}`)
    .then(async res => {
      await dispatch({
        type: GET_RELATED_TRACKS,
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
