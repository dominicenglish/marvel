import * as queryString from 'query-string';

export const  FETCH                   = 'FETCH',
              FETCH_SUCCESS           = 'FETCH_SUCCESS',
              FETCH_FAIL              = 'FETCH_FAIL',
              CHARACTERS_GET          = 'CHARACTERS_GET',
              CHARACTERS_GET_SUCCESS  = 'CHARACTERS_GET_SUCCESS',
              CHARACTERS_GET_FAIL     = 'CHARACTERS_GET_FAIL',
              CHARACTER_COMICS_GET_SUCCESS  = 'CHARACTER_COMICS_GET_SUCCESS',
              CHARACTER_COMICS_GET_FAIL     = 'CHARACTER_COMICS_GET_FAIL',
              CHARACTER_SERIES_GET_SUCCESS  = 'CHARACTER_SERIES_GET_SUCCESS',
              CHARACTER_SERIES_GET_FAIL     = 'CHARACTER_SERIES_GET_FAIL',
              COMICS_GET              = 'COMICS_GET',
              COMICS_GET_SUCCESS      = 'COMICS_GET_SUCCESS',
              COMICS_GET_FAIL         = 'COMICS_GET_FAIL',
              COMIC_GET               = 'COMIC_GET',
              COMIC_GET_SUCCESS       = 'COMIC_GET_SUCCESS',
              COMIC_GET_FAIL          = 'COMIC_GET_FAIL',
              CREATORS_GET_SUCCESS    = 'CREATORS_GET_SUCCESS',
              CREATORS_GET_FAIL       = 'CREATORS_GET_FAIL',
              SERIES_GET_SUCCESS    = 'SERIES_GET_SUCCESS',
              SERIES_GET_FAIL       = 'SERIES_GET_FAIL'
              ;

export const fetchData = (path, successAction, failAction) => {
  return {type: FETCH, path, successAction, failAction};
}

export const buildPath = (resource, params={}, id, subresource) => {
  if (!resource) throw new Error('Expected a resource');
  const queryString = queryString.stringify(params);
  let path = `/${resource}`;
  if (id) {
    path += `/${id}`;
  }
  if (subresource) {
    path += `/${subresource}`;
  }
  path += `?${queryString}`;
  return path;
}

export newGetCharacter = (id, params={}) => {
  {
    type: FETCH,
    types: [CHARACTERS_GET, CHARACTERS_GET_SUCCESS, CHARACTERS_GET_FAIL],
    path: buildPath('character', params, id),
    schema: Schemas.CHARACTERS,
    id,
    params
  }
}

export const getCharacters = params => {
  const query = queryString.stringify(params);
  const endpoint = '/characters';
  return fetchData(
    `${endpoint}?${query}`,
    { type: CHARACTERS_GET_SUCCESS },
    { type: CHARACTERS_GET_FAIL });
}

export const getCharacter = id => {
  const endpoint = `/characters/${id}`;
  return fetchData(
    `${endpoint}?`,
    { type: CHARACTERS_GET_SUCCESS },
    { type: CHARACTERS_GET_FAIL });
}

export const getCharacterSeries = (id, params={contains: 'comic', limit: 40}) => {
  const query = queryString.stringify(params);
  const endpoint = `/characters/${id}/series`;
  return fetchData(`${endpoint}?${query}`,
  { type: CHARACTER_SERIES_GET_SUCCESS },
  { type: CHARACTER_SERIES_GET_FAIL });
}

export const getCharacterComics = (id, params={}) => {
  params = { noVariants: true, limit: 20, offset: 0, ...params };
  const query = queryString.stringify(params);
  const endpoint = `/characters/${id}/comics`;
  return fetchData(
    `${endpoint}?${query}`,
    { type: CHARACTER_COMICS_GET_SUCCESS, id, params },
    { type: CHARACTER_COMICS_GET_FAIL, id });
}

export const getComics = (params={noVariants: true}) => {
  const query = queryString.stringify(params);
  const endpoint = '/comics';
  return fetchData(`${endpoint}?${query}`, COMICS_GET_SUCCESS, COMICS_GET_FAIL);
}

export const getComic = id => {
  const endpoint = `/comics/${id}`;
  return fetchData(`${endpoint}?`, COMIC_GET_SUCCESS, COMIC_GET_FAIL);
}

export const getComicCharacters = id => {
  const endpoint = `/comics/${id}/characters`;
  return fetchData(`${endpoint}?`, CHARACTER_COMICS_GET_SUCCESS, CHARACTER_COMICS_GET_FAIL);
}

export const getComicCreators = id => {
  const endpoint = `/comics/${id}/creators`;
  return fetchData(`${endpoint}?`, CREATORS_GET_SUCCESS, CREATORS_GET_FAIL);
}

export const getSeries = (params={contains: 'comic'}) => {
  const query = queryString.stringify(params);
  const endpoint = `/series`;
  return fetchData(`${endpoint}?${query}`, SERIES_GET_SUCCESS, SERIES_GET_FAIL);
}

export const getSingleSeries = id => {
  const endpoint = `/series/${id}`;
  return fetchData(`${endpoint}?`, SERIES_GET_SUCCESS, SERIES_GET_FAIL);
}

export const getSingleSeriesCharacters = (id, params={}) => {
  const query = queryString.stringify(params);
  const endpoint = `/series/${id}/characters`;
  return fetchData(`${endpoint}?${query}`, CHARACTERS_GET_SUCCESS, CHARACTERS_GET_FAIL);
}

export const getSingleSeriesCreators = (id, params={}) => {
  const query = queryString.stringify(params);
  const endpoint = `/series/${id}/creators`;
  return fetchData(`${endpoint}?${query}`, CREATORS_GET_SUCCESS, CREATORS_GET_FAIL);
}

export const getSingleSeriesComics = (id, params={noVariants: true}) => {
  const query = queryString.stringify(params);
  const endpoint = `/series/${id}/comics`;
  return fetchData(`${endpoint}?${query}`, COMICS_GET_SUCCESS, COMICS_GET_FAIL);
}
