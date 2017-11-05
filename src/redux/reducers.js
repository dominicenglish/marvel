import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import * as queryString from 'query-string';

import {
  CHARACTERS_GET_SUCCESS,
  CHARACTER_COMICS_GET_SUCCESS,
  COMICS_GET_SUCCESS,
  COMIC_GET_SUCCESS,
  CREATORS_GET_SUCCESS,
  SERIES_GET_SUCCESS
} from './actions.js';
import characterData from '../characterData.js';
import { combineArraysWithOffset } from '../utils.js';

import paginationReducer from './paginationReducer.js';
import characterReducer from './characterReducer.js';

const character = new schema.Entity('characters');
const comic = new schema.Entity('comics');
const creator = new schema.Entity('creators');
const series = new schema.Entity('series');
const charactersSchema = [ character ];
const comicsSchema = [ comic ];
const creatorsSchema = [ creator ];
const seriesSchema = [ series ];
const normalised = normalize(characterData, charactersSchema);

// const defaultCharacterState = {
//   characters: normalised.entities.characters,
//   characterIds: normalised.result,
//   comicIds: {}
// }
// const characterReducer = (state = defaultCharacterState, action = {}) => {
//   switch(action.type) {
//
//     case CHARACTER_COMICS_GET_SUCCESS:
//       const { response, id, params: {offset} } = action;
//       if (response) {
//         const { result: comicIds } = normalize(response.data.results, charactersSchema);
//         const newComicList = combineArraysWithOffset(
//           [ ...(state.comicIds[id] || []) ],
//           comicIds,
//           offset
//         );
//
//         return {
//           ...state,
//           comicIds: { [id]: newComicList},
//           nextPaginationOffset: { [id]: newComicList.length }
//         };
//       }
//       return state;
//     default:
//       return state;
//   }
// };
//
// const characters = (state={}, action={}) => {
//   switch(action.type) {
//     case CHARACTERS_GET_SUCCESS:
//       if (action.response) {
//         const { entities: {characters} } = normalize(action.response.data.results, charactersSchema);
//         return { ...state, ...characters };
//       }
//       return state;
//     default:
//       return state;
//   }
// }






// const comicIds = (state={}, action={}) => {
//   switch(action.type) {
//     case CHARACTER_COMICS_GET_SUCCESS:
//       const current = characterComicIds(state[action.id], action);
//       return { ...state, [action.id]: current };
//
//     default:
//       return state;
//   }
// }

// const comicIds = (state=[], action={}) => {
//   switch(action.type) {
//     case CHARACTER_COMICS_GET_SUCCESS:
//       const { response, id, params: {offset} } = action;
//       if (response) {
//         const { result: {comicIds: newComicIds} } = normalize(response.data.results, charactersSchema);
//         const newComicList = combineArraysWithOffset(
//           state,
//           newComicIds,
//           offset
//         );
//         return newComicList;
//
//         // return {
//         //   ...state,
//         //   comicIds: { [id]: newComicList},
//         //   nextPaginationOffset: { [id]: newComicList.length }
//         // };
//       }
//       return state;
//     default:
//       return state;
//   }
// }
//
// const comicOffset = (state=0, action={}) => {
//   switch(action.type) {
//     case CHARACTER_COMICS_GET_SUCCESS:
//       const { response, id, params: {offset} } = action;
//       if (response) {
//         const { result: {comicIds: newComicIds} } = normalize(response.data.results, charactersSchema);
//         return [...state, ...newcomicIds];
//
//         // return {
//         //   ...state,
//         //   comicIds: { [id]: newComicList},
//         //   nextPaginationOffset: { [id]: newComicList.length }
//         // };
//       }
//       return state;
//     default:
//       return state;
//   }
// }



const defaultComicState = {comics: {}, comicIds: []};
const comicReducer = (state = defaultComicState, action = {}) => {
  switch(action.type) {
    case COMICS_GET_SUCCESS:
    case CHARACTER_COMICS_GET_SUCCESS:
      if (action.response) {
        const {entities: {comics}, result: comicIds} = normalize(action.response.data.results, comicsSchema);
        return {
          ...state,
          comics: { ...state.comics, ...comics },
          comicIds: comicIds
        };
      }
      return state;
    case COMIC_GET_SUCCESS:
      if (action.response) {
        const {entities: {comics}, result: comicIds} = normalize(action.response.data.results, comicsSchema);
        return {
          ...state,
          comics: { ...state.comics, ...comics },
          comicIds: state.comicIds
        };
      }
      return state;
    default:
      return state;
  }
}

const defaultCreatorState = {creators: {}, creatorIds: []};
const creatorReducer = (state = defaultCreatorState, action = {}) => {
  switch(action.type) {
    case CREATORS_GET_SUCCESS:
      if (action.response) {
        const {entities: {creators}, result: creatorIds} = normalize(action.response.data.results, creatorsSchema);
        return {
          ...state,
          creators: { ...state.creators, ...creators },
          creatorIds: creatorIds
        };
      }
      return state;
    default:
      return state;
  }
}

const defaultSeriesState = {series: {}, seriesIds: []};
const seriesReducer = (state = defaultSeriesState, action = {}) => {
  switch(action.type) {
    case SERIES_GET_SUCCESS:
      if (action.response) {
        const {entities: {series}, result: seriesIds} = normalize(action.response.data.results, seriesSchema);
        return {
          ...state,
          series: { ...state.series, ...series },
          seriesIds: seriesIds
        };
      }
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  comicData: comicReducer,
  creatorData: creatorReducer,
  seriesData: seriesReducer,
  pagination: paginationReducer,
  characters: characterReducer
});
