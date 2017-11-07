import { createSelector } from 'reselect';

const getComics = state => state.comics;
const getSeries = state => state.series;
const getCharacters = state => state.characters;
const getCreators = state => state.creators;

export const getPagination = (state, section, id) => {
  if (state.pagination[section] )
    return state.pagination[section][id];
}


export const getCharacter = (state, id) => {
  return state.characters[id];
};

const getCharacterComicIds = (state, id) => {
  return state.pagination.characterComics[id] ?
    state.pagination.characterComics[id].ids
    : [];
};

const getCharacterSeriesIds = (state, id) => {
  return state.pagination.characterComics[id] ?
    state.pagination.characterSeries[id].ids
    : [];
};

export const getCharacterComics = createSelector(
  [getComics, getCharacterComicIds],
  (comics={}, comicIds=[]) => comicIds.map(id => comics[id])
);

export const getCharacterSeries = createSelector(
  [getSeries, getCharacterSeriesIds],
  (series={}, seriesIds=[]) => seriesIds.map(id => series[id])
);



export const getComic = (state, id) => {
  return state.comics[id];
};

const getComicCharacterIds = (state, id) => {
  return state.pagination.comicCharacters[id] ?
    state.pagination.comicCharacters[id].ids
    : [];
};

const getComicCreatorIds = (state, id) => {
  return state.pagination.comicCreators[id] ?
    state.pagination.comicCreators[id].ids
    : [];
};

export const getComicCharacters = createSelector(
  [getCharacters, getComicCharacterIds],
  (characters={}, characterIds=[]) => characterIds.map(id => characters[id])
);

export const getComicCreators = createSelector(
  [getCreators, getComicCreatorIds],
  (creators={}, creatorIds=[]) => creatorIds.map(id => creators[id])
);



export const getSingleSeries = (state, id) => {
  return state.series[id];
};

const getSingleSeriesCharacterIds = (state, id) => {
  return state.pagination.seriesCharacters[id] ?
    state.pagination.seriesCharacters[id].ids
    : [];
};

const getSingleSeriesCreatorIds = (state, id) => {
  return state.pagination.seriesCreators[id] ?
    state.pagination.seriesCreators[id].ids
    : [];
};

const getSingleSeriesComicIds = (state, id) => {
  return state.pagination.seriesComics[id] ?
    state.pagination.seriesComics[id].ids
    : [];
};

export const getSingleSeriesCharacters = createSelector(
  [getCharacters, getSingleSeriesCharacterIds],
  (characters={}, characterIds=[]) => characterIds.map(id => characters[id])
);

export const getSingleSeriesCreators = createSelector(
  [getCreators, getSingleSeriesCreatorIds],
  (creators={}, creatorIds=[]) => creatorIds.map(id => creators[id])
);

export const getSingleSeriesComics = createSelector(
  [getComics, getSingleSeriesComicIds],
  (comics={}, comicIds=[]) => comicIds.map(id => comics[id])
);




export const getCreator = (state, id) => {
  return state.creators[id];
};

const getCreatorComicIds = (state, id) => {
  return state.pagination.creatorComics[id] ?
    state.pagination.creatorComics[id].ids
    : [];
};

const getCreatorSeriesIds = (state, id) => {
  return state.pagination.creatorComics[id] ?
    state.pagination.creatorSeries[id].ids
    : [];
};

export const getCreatorComics = createSelector(
  [getComics, getCreatorComicIds],
  (comics={}, comicIds=[]) => comicIds.map(id => comics[id])
);

export const getCreatorSeries = createSelector(
  [getSeries, getCreatorSeriesIds],
  (series={}, seriesIds=[]) => seriesIds.map(id => series[id])
);


const getComicIds = (state) => {
  return state.pagination.comics[state.search.value] ?
  state.pagination.comics[state.search.value].ids
  : [];
};

const getCharacterIds = (state) => {
  return state.pagination.characters[state.search.value] ?
  state.pagination.characters[state.search.value].ids
  : [];
};

const getCreatorIds = (state) => {
  return state.pagination.creators[state.search.value] ?
  state.pagination.creators[state.search.value].ids
  : [];
};

export const getSearchComics = createSelector(
  [getComics, getComicIds],
  (comics={}, comicIds=[]) => comicIds.map(id => comics[id])
);

export const getSearchCharacters = createSelector(
  [getCharacters, getCharacterIds],
  (characters={}, characterIds=[]) => characterIds.map(id => characters[id])
);

export const getSearchCreators = createSelector(
  [getCreators, getCreatorIds],
  (creators={}, creatorIds=[]) => creatorIds.map(id => creators[id])
);
