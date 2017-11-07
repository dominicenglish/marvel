import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import * as queryString from 'query-string';

import paginationReducer from './paginationReducer.js';
import characterReducer from './characterReducer.js';
import comicReducer from './comicReducer.js';
import creatorReducer from './creatorReducer.js';
import seriesReducer from './seriesReducer.js';
import searchReducer from './searchReducer.js';

export default combineReducers({
  search: searchReducer,
  comics: comicReducer,
  creators: creatorReducer,
  series: seriesReducer,
  characters: characterReducer,
  pagination: paginationReducer
});
