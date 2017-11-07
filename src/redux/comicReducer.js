import * as types from './actions.js';

export default (state={}, action={}) => {
  switch(action.type) {
    case types.COMICS_GET_SUCCESS:
    case types.COMIC_GET_SUCCESS:
    case types.CHARACTER_COMICS_GET_SUCCESS:
    case types.SINGLESERIES_COMICS_GET_SUCCESS:
    case types.CREATOR_COMICS_GET_SUCCESS:
      const { entities: {results} } = action.normalisedResults;
      if (results) {
        return { ...state, ...results };
      }
      return state;
    default:
      return state;
  }
}
