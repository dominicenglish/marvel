import { normalize, schema } from 'normalizr';

import {
  CHARACTERS_GET_SUCCESS
} from './actions.js';

const collection = new schema.Entity('collection');
const collectionSchema = [ collection ];

export default (state={}, action={}) => {
  switch(action.type) {
    case CHARACTERS_GET_SUCCESS:
      const { response: { data: { results } } } = action;
      if (results) {
        const { entities: {collection} } = normalize(results, collectionSchema);
        return { ...state, ...collection };
      }
      return state;
    default:
      return state;
  }
}
