import * as types from './actions.js';

export default (state={}, action={}) => {
  switch(action.type) {
    case types.CHARACTERS_GET_SUCCESS:
    case types.COMIC_CHARACTERS_GET_SUCCESS:
    case types.SINGLESERIES_CHARACTERS_GET_SUCCESS:
      const { entities: {results} } = action.normalisedResults;
      if (results) {
        return { ...state, ...results };
      }
      return state;
    default:
      return state;
  }
}
