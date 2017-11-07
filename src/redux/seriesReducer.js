import * as types from './actions.js';

export default (state={}, action={}) => {
  switch(action.type) {
    case types.SERIES_GET_SUCCESS:
    case types.SINGLESERIES_GET_SUCCESS:
    case types.CHARACTER_SERIES_GET_SUCCESS:
    case types.CREATOR_SERIES_GET_SUCCESS:
      const { entities: {results} } = action.normalisedResults;
      if (results) {
        return { ...state, ...results };
      }
      return state;
    default:
      return state;
  }
}
