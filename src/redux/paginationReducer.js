import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';

import * as types from './actions.js';

const collection = new schema.Entity('collection');
const collectionSchema = [ collection ];

/**
 * Abstracts the creation of pagination reducers for fetch, success, and fail actions
 *
 * @param  {Array} types            [fetchType, successType, failType] in that order
 * @param  {function} mapActionToId How to access the request id from the action
 * @return {function}               Reducer function
 */
const paginate = ({ types, mapActionToId }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three types');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings');
  }

  const [ requestType, successType, failType ] = types;

  // Generic reducer logic for get success and fail types
  const updatePagination = (state = {
    isFetching: false,
    nextOffset: 0,
    totalCount: undefined,
    ids: []
  }, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        };
      case successType:
        const { normalisedResults: { entities, result } } = action;
        return {
          ...state,
          isFetching: false,
          ids: [...state.ids, ...result],
          nextOffset: state.ids.length + result.length,
          totalCount: action.response.data.total
        }
      case failType:
        return {
          ...state,
          isFetching: false
        }
      default:
        return state;
    }
  }

  return (state = {}, action) => {
    switch (action.type) {
      case requestType:
      case successType:
      case failType:
        const id = mapActionToId(action);
        return {
          ...state,
          [id]: updatePagination(state[id], action)
        }
      default:
        return state
    }
  }
}

export default combineReducers({
  characters: paginate({
    mapActionToId: action => action.initialAction.params.nameStartsWith,
    types: [
      types.CHARACTERS_GET,
      types.CHARACTERS_GET_SUCCESS,
      types.CHARACTERS_GET_FAIL
    ]
  }),
  characterComics: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.CHARACTER_COMICS_GET,
      types.CHARACTER_COMICS_GET_SUCCESS,
      types.CHARACTER_COMICS_GET_FAIL
    ]
  }),
  characterSeries: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.CHARACTER_SERIES_GET,
      types.CHARACTER_SERIES_GET_SUCCESS,
      types.CHARACTER_SERIES_GET_FAIL
    ]
  }),
  comics: paginate({
    mapActionToId: action => action.initialAction.params.titleStartsWith,
    types: [
      types.COMICS_GET,
      types.COMICS_GET_SUCCESS,
      types.COMICS_GET_FAIL
    ]
  }),
  comicCharacters: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.COMIC_CHARACTERS_GET,
      types.COMIC_CHARACTERS_GET_SUCCESS,
      types.COMIC_CHARACTERS_GET_FAIL
    ]
  }),
  comicCreators: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.COMIC_CREATORS_GET,
      types.COMIC_CREATORS_GET_SUCCESS,
      types.COMIC_CREATORS_GET_FAIL
    ]
  }),
  series: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.SERIES_GET,
      types.SERIES_GET_SUCCESS,
      types.SERIES_GET_FAIL
    ]
  }),
  seriesCharacters: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.SINGLESERIES_CHARACTERS_GET,
      types.SINGLESERIES_CHARACTERS_GET_SUCCESS,
      types.SINGLESERIES_CHARACTERS_GET_FAIL
    ]
  }),
  seriesCreators: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.SINGLESERIES_CREATORS_GET,
      types.SINGLESERIES_CREATORS_GET_SUCCESS,
      types.SINGLESERIES_CREATORS_GET_FAIL
    ]
  }),
  seriesComics: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.SINGLESERIES_COMICS_GET,
      types.SINGLESERIES_COMICS_GET_SUCCESS,
      types.SINGLESERIES_COMICS_GET_FAIL
    ]
  }),
  creators: paginate({
    mapActionToId: action => action.initialAction.params.nameStartsWith,
    types: [
      types.CREATORS_GET,
      types.CREATORS_GET_SUCCESS,
      types.CREATORS_GET_FAIL
    ]
  }),
  creatorSeries: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.CREATOR_SERIES_GET,
      types.CREATOR_SERIES_GET_SUCCESS,
      types.CREATOR_SERIES_GET_FAIL
    ]
  }),
  creatorComics: paginate({
    mapActionToId: action => action.initialAction.id,
    types: [
      types.CREATOR_COMICS_GET,
      types.CREATOR_COMICS_GET_SUCCESS,
      types.CREATOR_COMICS_GET_FAIL
    ]
  }),
  comicSearch: paginate({
    mapActionToId: action => action.initialAction.params.titleStartsWith,
    types: [
      types.COMIC_SEARCH,
      types.COMIC_SEARCH_SUCCESS,
      types.COMIC_SEARCH_FAIL
    ]
  })
});
