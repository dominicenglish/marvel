import * as queryString from 'query-string';
import { normalize, schema, arrayOf } from 'normalizr';

const endpoint = 'https://gateway.marvel.com:443/v1/public';
const apiKey = '4a774e5516f38b3e92843d5b4babcd45';

const results = new schema.Entity('results');
const resultsSchema = [ results ];


export const Schemas = {
  RESULTS: resultsSchema
}

export const buildPath = (resource, params={}, id, subresource) => {
  if (!resource) throw new Error('Expected a resource');
  const query = queryString.stringify(params);
  let path = `/${resource}`;
  if (id) {
    path += `/${id}`;
  }
  if (subresource) {
    path += `/${subresource}`;
  }
  path += `?${query}`;
  return path;
}

export const query = path => {
  return fetch(`${endpoint}${path}&apikey=${apiKey}`)
    .then(response => response.json());
}
