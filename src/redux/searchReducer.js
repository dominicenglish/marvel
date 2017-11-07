import * as types from './actions.js';

export default (state={}, action={}) => {
  switch(action.type) {
    case types.SEARCH_VALUE_SET:
      return { ...state, value: action.searchString };
    case types.SEARCH_FILTER_SET:
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}
