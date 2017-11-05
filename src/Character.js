import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCharacter,
  getCharacterSeries,
  getCharacterComics
} from './redux/actions.js';
import { generateThumbnailSrc, getIdFromResourceURI } from './utils.js';
import SmallMediaPreview from './SmallMediaPreview.js';
import LargeMediaPreview from './LargeMediaPreview.js';
import MediaPreviewContainer from './MediaPreviewContainer.js';
import Slat from './Slat.js';
import Loading from './Loading.js';

const mapStateToProps = state => ({
  allSeries: state.seriesData.series,
  allComics: state.comicData.comics,
  allCharacters: state.characters,
  charactersPagination: state.pagination.characters
});

const mapDispatchToProps = {
  getCharacter,
  getCharacterSeries,
  getCharacterComics
};

class CharacterContainer extends Component {

  componentWillMount() {
    const {
      match: {params: {id}},
      getCharacter,
      getCharacterSeries,
      getCharacterComics
    } = this.props;

    getCharacter(id);
    getCharacterSeries(id);
    getCharacterComics(id);
  }

  onLoadComics = () => {
    const {
      match: {params: {id}},
      getCharacterComics,
      charactersPagination
    } = this.props;
    const { comics: { nextOffset } } = charactersPagination[id];
    getCharacterComics(id, {offset: nextOffset});
  }

  render() {
    const {
      allSeries={},
      allCharacters={},
      allComics={},
      match: {params: {id}},
      charactersPagination={}
    } = this.props;
    const character = allCharacters[id];
    const characterPagination = charactersPagination[id];
    if (character && characterPagination) {
      const { series: { ids: seriesIds }, comics: { ids: comicIds } } = characterPagination;
      const series = seriesIds.map(id => allSeries[id]);
      const comics = comicIds.map(comicId => allComics[comicId]);
      return <Character character={character} series={series} comics={comics} onLoadComics={this.onLoadComics}/>
    } else {
      return <Loading/>
    }
  }
}

const Character = ({character, series, comics, onLoadComics}) => {
  const imageSrc = generateThumbnailSrc(character.thumbnail.path, 'detail', '', character.thumbnail.extension );
  const seriesRows = series.map(singleSeries => {
    if (singleSeries) {
      const thumbnailSrc = generateThumbnailSrc(singleSeries.thumbnail.path, 'standard','large', singleSeries.thumbnail.extension);
      return (<SmallMediaPreview
        title={singleSeries.title}
        imageSrc={thumbnailSrc}
        key={singleSeries.id}
        linkTo={`/series/${singleSeries.id}`}/>);
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

  const loadComics = () => {
    onLoadComics();
  };

  const { name, description } = character;
  return (
    <div className="Page">
      <Slat>
        <div className=" DetailView">
          <div className=" DetailView_cover">
            <img src={imageSrc}/>
          </div>
          <div className="DetailView_info">
            <h1>{name}</h1>
            <div className="SubSection">
              <h2>Description</h2>
              <p>{description || 'No description provided'}</p>
            </div>
            <div className="SubSection">
              <h2>Series that include this character:</h2>
              <MediaPreviewContainer>{seriesRows}</MediaPreviewContainer>
            </div>
          </div>
        </div>
      </Slat>
      <Slat className="darkBackground">
        <div className="SubSection">
          <h2>Comics that include this character:</h2>
          <MediaPreviewContainer>{comicRows}</MediaPreviewContainer>
          <button type="button" onClick={loadComics}>Load More</button>
        </div>
      </Slat>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterContainer);
