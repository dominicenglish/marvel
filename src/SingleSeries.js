import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getSingleSeries,
  getSingleSeriesCharacters,
  getSingleSeriesCreators,
  getSingleSeriesComics
} from './redux/actions.js';
import { generateThumbnailSrc, getIdFromResourceURI } from './utils.js';
import SmallMediaPreview from './SmallMediaPreview.js';
import LargeMediaPreview from './LargeMediaPreview.js';
import MediaPreviewContainer from './MediaPreviewContainer.js';
import Slat from './Slat.js';

const mapStateToProps = state => ({
  allSeries: state.seriesData.series,
  allComics: state.comicData.comics,
  allCharacters: state.characterData.characters,
  allCreators: state.creatorData.creators
});

const mapDispatchToProps = {
  getSingleSeries,
  getSingleSeriesCharacters,
  getSingleSeriesCreators,
  getSingleSeriesComics
};

class SingleSeriesContainer extends Component {

  componentWillMount() {
    const {
      match: {params: {id}},
      getSingleSeries,
      getSingleSeriesCharacters,
      getSingleSeriesCreators,
      getSingleSeriesComics
    } = this.props;

    getSingleSeries(id);
    getSingleSeriesCharacters(id);
    getSingleSeriesCreators(id);
    getSingleSeriesComics(id);
  }

  render() {
    const { allSeries={}, allCharacters={}, allCreators={}, allComics={}, match: {params: {id}} } = this.props;
    const series = allSeries[id];
    if (series) {
      const characters = series.characters.items.map(characterSummary => {
        const id = getIdFromResourceURI(characterSummary.resourceURI);
        return allCharacters[id];
      });
      const creators = series.creators.items.map(creatorSummary => {
        const id = getIdFromResourceURI(creatorSummary.resourceURI);
        return allCreators[id];
      });
      const comics = series.comics.items.map(comicSummary => {
        const id = getIdFromResourceURI(comicSummary.resourceURI);
        return allComics[id];
      });
      return <SingleSeries series={series} characters={characters} creators={creators} comics={comics}/>
    } else {
      return <div>Loading</div>
    }
  }
}

const SingleSeries = ({series, characters, creators, comics}) => {
  const imageSrc = generateThumbnailSrc(series.thumbnail.path, 'detail', '', series.thumbnail.extension );
  const creatorRows = creators.map(creator => {
    if (creator) {
      const thumbnailSrc = generateThumbnailSrc(creator.thumbnail.path, 'standard','large', creator.thumbnail.extension);
      return (<SmallMediaPreview
        title={creator.fullName}
        imageSrc={thumbnailSrc}
        key={creator.id}
        linkTo={`/creators/${creator.id}`}/>);
    }
  });

  const characterRows = characters.map(character => {
    if (character) {
      const thumbnailSrc = generateThumbnailSrc(character.thumbnail.path, 'standard','large', character.thumbnail.extension);
      return (<SmallMediaPreview
        title={character.name}
        imageSrc={thumbnailSrc} key={character.id}
        linkTo={`/characters/${character.id}`}/>);
    }
  });

  const comicRows = comics.map(comic => {
    if (comic) {
      const thumbnailSrc = generateThumbnailSrc(comic.thumbnail.path, 'portrait','large', comic.thumbnail.extension);
      return (<LargeMediaPreview
        title={comic.title}
        imageSrc={thumbnailSrc}
        key={comic.id}
        linkTo={`/comics/${comic.id}`}/>);
    }
  });

  const { title, description, startYear, endYear } = series;
  return (
    <div className="SingleSeries Page">
      <Slat>
        <div className="SingleSeries_overview DetailView">
          <div className="SingleSeries_cover DetailView_cover">
            <img src={imageSrc}/>
          </div>
          <div className="DetailView_info">
            <h1>{title}</h1>
            <div className="SubSection">
              <h2>Description</h2>
              <p>{description || 'No description provided'}</p>
            </div>
            <div className="SubSection">
              <h2>Characters in this series:</h2>
              <MediaPreviewContainer>{characterRows}</MediaPreviewContainer>
            </div>
            <div className="SubSection">
              <h2>Creators involved in this series:</h2>
              <MediaPreviewContainer>{creatorRows}</MediaPreviewContainer>
            </div>
          </div>
        </div>
      </Slat>
      <Slat className="darkBackground">
        <div className="SubSection">
          <h2>Comics in this series:</h2>
          <MediaPreviewContainer>{comicRows}</MediaPreviewContainer>
        </div>
      </Slat>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleSeriesContainer);
