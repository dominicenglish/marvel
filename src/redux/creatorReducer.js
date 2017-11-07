import * as types from './actions.js';

export default (state={}, action={}) => {
  switch(action.type) {
    case types.CREATORS_GET_SUCCESS:
    case types.CREATOR_GET_SUCCESS:
    case types.COMIC_CREATORS_GET_SUCCESS:
    case types.SINGLESERIES_CREATORS_GET_SUCCESS:
      const { entities: {results} } = action.normalisedResults;
      if (results) {
        return { ...state, ...results };
      }
      return state;
    default:
      return state;
  }
}
