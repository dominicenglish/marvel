import { normalize, schema } from 'normalizr';

import {
  CHARACTER_COMICS_GET_SUCCESS,
  CHARACTER_SERIES_GET_SUCCESS
} from './actions.js';

const collection = new schema.Entity('collection');
const collectionSchema = [ collection ];

export default  (state={}, action={}) => {
  switch(action.type) {
    case CHARACTER_COMICS_GET_SUCCESS:
    case CHARACTER_SERIES_GET_SUCCESS:
      return {
        ...state,
        characters: charactersPagination(state.characters, action)
      };

    default:
      return state;
  }
}

const charactersPagination = (state={}, action={}) => {
  switch(action.type) {
    case CHARACTER_COMICS_GET_SUCCESS:
    case CHARACTER_SERIES_GET_SUCCESS:
      const { id } = action;
      if (id) {
        return {...state, [id]: characterPagination(state[id], action)}
      }
      return state;
    default:
      return state;
  }
}

const characterPagination = (state={}, action={}) => {
  switch(action.type) {
    case CHARACTER_COMICS_GET_SUCCESS:
      return {
        ...state,
        comics: characterComicsPagination(state.comics, action)
      };
    case CHARACTER_SERIES_GET_SUCCESS:
      return {
        ...state,
        series: characterSeriesPagination(state.series, action)
      };
    default:
      return state;
  }
}

const characterComicsPagination = (state={}, action={}) => {
  switch(action.type) {
    case CHARACTER_COMICS_GET_SUCCESS:
      const { response, id, params: {offset} } = action;
      if (response) {
        const { result: comicIds } = normalize(response.data.results, collection);
        const ids = [...state.ids, ...comicIds];
        return { ids, nextOffset: ids.length };
      }
      return state;
    default:
      return state;
  }
}

const characterSeriesPagination = (state={}, action={}) => {
  switch(action.type) {
    case CHARACTER_SERIES_GET_SUCCESS:
      const { response, id, params: {offset} } = action;
      if (response) {
        const { result: seriesIds } = normalize(response.data.results, collection);
        const ids = [...state.ids, ...seriesIds];
        return { ids, nextOffset: ids.length };
      }
      return state;
    default:
      return state;
  }
}
