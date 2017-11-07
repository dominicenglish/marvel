import * as queryString from 'query-string';

export const  FETCH                   = 'FETCH',
              FETCH_SUCCESS           = 'FETCH_SUCCESS',
              FETCH_FAIL              = 'FETCH_FAIL',
              CHARACTERS_GET          = 'CHARACTERS_GET',
              CHARACTERS_GET_SUCCESS  = 'CHARACTERS_GET_SUCCESS',
              CHARACTERS_GET_FAIL     = 'CHARACTERS_GET_FAIL',
              CHARACTER_COMICS_GET  = 'CHARACTER_COMICS_GET',
              CHARACTER_COMICS_GET_SUCCESS  = 'CHARACTER_COMICS_GET_SUCCESS',
              CHARACTER_COMICS_GET_FAIL     = 'CHARACTER_COMICS_GET_FAIL',
              CHARACTER_SERIES_GET  = 'CHARACTER_SERIES_GET',
              CHARACTER_SERIES_GET_SUCCESS  = 'CHARACTER_SERIES_GET_SUCCESS',
              CHARACTER_SERIES_GET_FAIL     = 'CHARACTER_SERIES_GET_FAIL',
              COMICS_GET              = 'COMICS_GET',
              COMICS_GET_SUCCESS      = 'COMICS_GET_SUCCESS',
              COMICS_GET_FAIL         = 'COMICS_GET_FAIL',
              COMIC_GET               = 'COMIC_GET',
              COMIC_GET_SUCCESS       = 'COMIC_GET_SUCCESS',
              COMIC_GET_FAIL          = 'COMIC_GET_FAIL',
              COMIC_CHARACTERS_GET               = 'COMIC_CHARACTERS_GET',
              COMIC_CHARACTERS_GET_SUCCESS       = 'COMIC_CHARACTERS_GET_SUCCESS',
              COMIC_CHARACTERS_GET_FAIL          = 'COMIC_CHARACTERS_GET_FAIL',
              COMIC_CREATORS_GET               = 'COMIC_CREATORS_GET',
              COMIC_CREATORS_GET_SUCCESS       = 'COMIC_CREATORS_GET_SUCCESS',
              COMIC_CREATORS_GET_FAIL          = 'COMIC_CREATORS_GET_FAIL',
              CREATORS_GET    = 'CREATORS_GET',
              CREATORS_GET_SUCCESS    = 'CREATORS_GET_SUCCESS',
              CREATORS_GET_FAIL       = 'CREATORS_GET_FAIL',
              CREATOR_GET    = 'CREATOR_GET',
              CREATOR_GET_SUCCESS    = 'CREATOR_GET_SUCCESS',
              CREATOR_GET_FAIL       = 'CREATOR_GET_FAIL',
              CREATOR_COMICS_GET  = 'CREATOR_COMICS_GET',
              CREATOR_COMICS_GET_SUCCESS  = 'CREATOR_COMICS_GET_SUCCESS',
              CREATOR_COMICS_GET_FAIL     = 'CREATOR_COMICS_GET_FAIL',
              CREATOR_SERIES_GET  = 'CREATOR_SERIES_GET',
              CREATOR_SERIES_GET_SUCCESS  = 'CREATOR_SERIES_GET_SUCCESS',
              CREATOR_SERIES_GET_FAIL     = 'CREATOR_SERIES_GET_FAIL',
              SERIES_GET              = 'SERIES_GET',
              SERIES_GET_SUCCESS    = 'SERIES_GET_SUCCESS',
              SERIES_GET_FAIL       = 'SERIES_GET_FAIL',
              SINGLESERIES_GET              = 'SINGLESERIES_GET',
              SINGLESERIES_GET_SUCCESS    = 'SINGLESERIES_GET_SUCCESS',
              SINGLESERIES_GET_FAIL       = 'SINGLESERIES_GET_FAIL',
              SINGLESERIES_CHARACTERS_GET = 'SINGLESERIES_CHARACTERS_GET',
              SINGLESERIES_CHARACTERS_GET_SUCCESS = 'SINGLESERIES_CHARACTERS_GET_SUCCESS',
              SINGLESERIES_CHARACTERS_GET_FAIL = 'SINGLESERIES_CHARACTERS_GET_FAIL',
              SINGLESERIES_CREATORS_GET = 'SINGLESERIES_CREATORS_GET',
              SINGLESERIES_CREATORS_GET_SUCCESS = 'SINGLESERIES_CREATORS_GET_SUCCESS',
              SINGLESERIES_CREATORS_GET_FAIL = 'SINGLESERIES_CREATORS_GET_FAIL',
              SINGLESERIES_COMICS_GET = 'SINGLESERIES_COMICS_GET',
              SINGLESERIES_COMICS_GET_SUCCESS = 'SINGLESERIES_COMICS_GET_SUCCESS',
              SINGLESERIES_COMICS_GET_FAIL = 'SINGLESERIES_COMICS_GET_FAIL',
              COMIC_SEARCH = 'COMIC_SEARCH',
              COMIC_SEARCH_SUCCESS = 'COMIC_SEARCH_SUCCESS',
              COMIC_SEARCH_FAIL = 'COMIC_SEARCH_FAIL',
              SEARCH_VALUE_SET = 'SEARCH_VALUE_SET',
              SEARCH_FILTER_SET = 'SEARCH_FILTER_SET'
              ;

export const fetchData = (path, successAction, failAction) => {
  return {type: FETCH, path, successAction, failAction};
}

export const getCharacters = params => {
  return {
    type: FETCH,
    types: [CHARACTERS_GET, CHARACTERS_GET_SUCCESS, CHARACTERS_GET_FAIL],
    resource: 'characters',
    params
  };
}

export const getCharacter = (id, params={}) => {
  return {
    type: FETCH,
    types: [CHARACTERS_GET, CHARACTERS_GET_SUCCESS, CHARACTERS_GET_FAIL],
    resource: 'characters',
    id,
    params
  };
}

export const getCharacterSeries = (id, params={contains: 'comic', limit: 40}) => {
  return {
    type: FETCH,
    types: [CHARACTER_SERIES_GET, CHARACTER_SERIES_GET_SUCCESS, CHARACTER_SERIES_GET_FAIL],
    resource: 'characters',
    subresource: 'series',
    id,
    params
  };
}

export const getCharacterComics = (id, params={}) => {
  params = { noVariants: true, limit: 20, offset: 0, ...params };
  return {
    type: FETCH,
    types: [CHARACTER_COMICS_GET, CHARACTER_COMICS_GET_SUCCESS, CHARACTER_COMICS_GET_FAIL],
    resource: 'characters',
    subresource: 'comics',
    id,
    params
  };
}

export const getSeries = (params={contains: 'comic'}) => {
  return {
    type: FETCH,
    types: [SERIES_GET, SERIES_GET_SUCCESS, SERIES_GET_FAIL],
    resource: 'series',
    params
  };
}

export const getSingleSeries = id => {
  return {
    type: FETCH,
    types: [SINGLESERIES_GET, SINGLESERIES_GET_SUCCESS, SINGLESERIES_GET_FAIL],
    resource: 'series',
    id
  };
}

export const getSingleSeriesCharacters = (id, params={}) => {
  return {
    type: FETCH,
    types: [SINGLESERIES_CHARACTERS_GET, SINGLESERIES_CHARACTERS_GET_SUCCESS, SINGLESERIES_CHARACTERS_GET_FAIL],
    resource: 'series',
    subresource: 'characters',
    id,
    params
  };
}

export const getSingleSeriesCreators = (id, params={}) => {
  return {
    type: FETCH,
    types: [SINGLESERIES_CREATORS_GET, SINGLESERIES_CREATORS_GET_SUCCESS, SINGLESERIES_CREATORS_GET_FAIL],
    resource: 'series',
    subresource: 'creators',
    id,
    params
  };
}

export const getSingleSeriesComics = (id, params={noVariants: true}) => {
  return {
    type: FETCH,
    types: [SINGLESERIES_COMICS_GET, SINGLESERIES_COMICS_GET_SUCCESS, SINGLESERIES_COMICS_GET_FAIL],
    resource: 'series',
    subresource: 'comics',
    id,
    params
  };
}

export const getComics = (params={noVariants: true}) => {
  return {
    type: FETCH,
    types: [COMICS_GET, COMICS_GET_SUCCESS, COMICS_GET_FAIL],
    resource: 'comics',
    params
  };
}

export const getComic = id => {
  return {
    type: FETCH,
    types: [COMIC_GET, COMIC_GET_SUCCESS, COMIC_GET_FAIL],
    resource: 'comics',
    id
  };
}

export const getComicCharacters = id => {
  return {
    type: FETCH,
    types: [COMIC_CHARACTERS_GET, COMIC_CHARACTERS_GET_SUCCESS, COMIC_CHARACTERS_GET_FAIL],
    resource: 'comics',
    subresource: 'characters',
    id
  };
}

export const getComicCreators = id => {
  return {
    type: FETCH,
    types: [COMIC_CREATORS_GET, COMIC_CREATORS_GET_SUCCESS, COMIC_CREATORS_GET_FAIL],
    resource: 'comics',
    subresource: 'creators',
    id
  };
}

export const getCreators = (params={}) => {
  return {
    type: FETCH,
    types: [CREATORS_GET, CREATORS_GET_SUCCESS, CREATORS_GET_FAIL],
    resource: 'creators',
    params
  };
}

export const getCreator = (id, params={}) => {
  return {
    type: FETCH,
    types: [CREATORS_GET, CREATORS_GET_SUCCESS, CREATORS_GET_FAIL],
    resource: 'creators',
    id,
    params
  };
}

export const getCreatorSeries = (id, params={contains: 'comic', limit: 40}) => {
  return {
    type: FETCH,
    types: [CREATOR_SERIES_GET, CREATOR_SERIES_GET_SUCCESS, CREATOR_SERIES_GET_FAIL],
    resource: 'creators',
    subresource: 'series',
    id,
    params
  };
}

export const getCreatorComics = (id, params={}) => {
  params = { noVariants: true, limit: 20, offset: 0, orderBy: '-onsaleDate', ...params };
  return {
    type: FETCH,
    types: [CREATOR_COMICS_GET, CREATOR_COMICS_GET_SUCCESS, CREATOR_COMICS_GET_FAIL],
    resource: 'creators',
    subresource: 'comics',
    id,
    params
  };
}

export const setCurrentSearch = (searchString) => {
  return {
    type: SEARCH_VALUE_SET,
    searchString
  };
}

export const setCurrentSearchFilter = (filter) => {
  return {
    type: SEARCH_FILTER_SET,
    filter
  };
}

export const performSearch = (searchString, filter) => {
  switch (filter) {
    case 'comics':
      return getComics({titleStartsWith: searchString});
    case 'characters':
      return getCharacters({nameStartsWith: searchString});
    case 'creators':
      return getCreators({nameStartsWith: searchString});
  }
}
