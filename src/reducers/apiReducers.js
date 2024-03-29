import {
  GET_SONGS,
  GET_PLAYLISTS,
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
  SET_LOADING,
  GET_ALBUMS,
  GET_ARTISTS,
  GET_PLAYLIST,
  GET_RECENTLY_PLAYED,
  GET_CATEGORIES_DETAIL,
  GET_CHARTS,
  GET_ARTIST,
  GET_ARTIST_ALBUM,
  GET_ALBUM,
  GET_RECOMMEND_ARTIST
} from "../actions/types";
import isEmpty from "../utils/is-empty";

const initialState = {
  songs: [],
  playlists: [],
  albums: [],
  artists: [],
  userPlaylists: [],
  featuredPlaylists: [],
  userTopTracks: [],
  userTopArtists: [],
  categoriesLists: [],
  newReleaseLists: [],
  userRelatedArtists: [],
  userRelatedTracks: [],
  userFollowedArtists: [],
  userSavedTracks: [],
  userSavedAlbums: [],
  userRecentlyPlayed: [],
  categoriesDetails: {
    playlists: [],
    category: {}
  },
  currentPlaylist: {},
  currentAlbum: {
    relatedAlbums: [],
    currentAlbum: []
  },
  currentArtist: {
    currentArtist: {},
    relatedArtists: []
  },
  charts: {
    featuredCharts: [],
    topCharts: [],
    viralCharts: []
  },
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SONGS:
      return {
        ...state,
        songs: action.payload,
        isLoading: false
      };
    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
        isLoading: false
      };
    case GET_ALBUMS:
      return {
        ...state,
        albums: action.payload,
        isLoading: false
      };
    case GET_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        isLoading: false
      };
    case GET_RECENTLY_PLAYED:
      return {
        ...state,
        userRecentlyPlayed: action.payload,
        isLoading: false
      };
    case GET_USER_PLAYLISTS:
      return {
        ...state,
        userPlaylists: action.payload,
        isLoading: false
      };
    case GET_FEATURED_PLAYLISTS:
      return {
        ...state,
        featuredPlaylists: action.payload,
        isLoading: false
      };
    case GET_USER_TOP_TRACKS:
      return {
        ...state,
        userTopTracks: action.payload,
        isLoading: false
      };
    case GET_NEW_RELEASES:
      return {
        ...state,
        newReleaseLists: action.payload,
        isLoading: false
      };
    case GET_USER_TOP_ARTISTS:
      return {
        ...state,
        userTopArtists: action.payload,
        isLoading: false
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categoriesLists: action.payload,
        isLoading: false
      };
    case GET_RELATED_ARTISTS:
      return {
        ...state,
        userRelatedArtists: [...state.userRelatedArtists, action.payload],
        isLoading: false
      };
    case GET_RELATED_TRACKS:
      return {
        ...state,
        userRelatedTracks: [...state.userRelatedTracks, action.payload],
        isLoading: false
      };
    case GET_USER_FOLLOWED_ARTISTS:
      return {
        ...state,
        userFollowedArtists: action.payload,
        isLoading: false
      };
    case GET_USER_SAVED_TRACKS:
      return {
        ...state,
        userSavedTracks: action.payload,
        isLoading: false
      };
    case GET_USER_SAVED_ALBUMS:
      return {
        ...state,
        userSavedAlbums: action.payload,
        isLoading: false
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_CATEGORIES_DETAIL:
      return {
        ...state,
        categoriesDetails: action.payload,
        isLoading: false
      };
    case GET_CHARTS:
      return {
        ...state,
        charts: action.payload,
        isLoading: false
      };
    case GET_PLAYLIST:
      return {
        ...state,
        isLoading: false,
        currentPlaylist: action.payload
      };
    case GET_ALBUM:
      return {
        ...state,
        isLoading: false,
        currentAlbum: {
          ...state.currentAlbum,
          currentAlbum: isEmpty(action.payload)
            ? []
            : [...state.currentAlbum.currentAlbum, action.payload]
        }
      };
    case GET_ARTIST_ALBUM:
      return {
        ...state,
        isLoading: false,
        currentAlbum: {
          ...state.currentAlbum,
          relatedAlbums: isEmpty(action.payload)
            ? []
            : [...state.currentAlbum.relatedAlbums, action.payload]
        }
      };
    case GET_ARTIST:
      return {
        ...state,
        isLoading: false,
        currentArtist: {
          ...state.currentArtist,
          currentArtist: isEmpty(action.payload) ? {} : action.payload
        }
      };

    case GET_RECOMMEND_ARTIST:
      return {
        ...state,
        isLoading: false,
        currentArtist: {
          ...state.currentArtist,
          relatedArtists: isEmpty(action.payload) ? [] : action.payload
        }
      };
    default:
      return state;
  }
}
