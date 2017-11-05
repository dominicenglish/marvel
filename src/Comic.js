import React, { Component } from 'react';
import { connect } from 'react-redux';
import comics from './comicData.js';
import { getComic, getComicCharacters, getComicCreators } from './redux/actions.js';
import { generateThumbnailSrc, getIdFromResourceURI } from './utils.js';
import Slat from './Slat.js';
import MediaPreviewContainer from './MediaPreviewContainer.js';
import SmallMediaPreview from './SmallMediaPreview.js';

const mapStateToProps = state => ({
  comics: state.comicData.comics,
  characters: state.characters,
  creators: state.creatorData.creators
});

const mapDispatchToProps = { getComic, getComicCharacters, getComicCreators };

class ComicContainer extends Component {

  componentWillMount() {
    const {comics={}, match: {params: {id}}, getComic, getComicCharacters, getComicCreators} = this.props;
    getComic(id);
    getComicCharacters(id);
    getComicCreators(id);
  }

  render() {
    const { comics={}, characters={}, creators={}, match: {params: {id}} } = this.props;
    const comic = comics[id];
    if (comic) {
      const comicCharacters = comic.characters.items.map(characterSummary => {
        const id = getIdFromResourceURI(characterSummary.resourceURI);
        return characters[id];
      });
      const comicCreators = comic.creators.items.map(creatorSummary => {
        const id = getIdFromResourceURI(creatorSummary.resourceURI);
        return creators[id];
      });
      return <Comic comic={comic} characters={comicCharacters} creators={comicCreators}/>
    } else {
      return <div>Loading</div>
    }
  }
}

const Comic = ({comic, characters, creators}) => {
  const imageSrc = generateThumbnailSrc(
    comic.thumbnail.path,
    'detail',
    '',
    comic.thumbnail.extension
  );

  const creatorRows = creators.map(creator => {
    if (creator) {
      const thumbnailSrc = generateThumbnailSrc(creator.thumbnail.path, 'standard','large', creator.thumbnail.extension);
      return (<SmallMediaPreview
        title={`${creator.fullName} - ${creator.role}`}
        imageSrc={thumbnailSrc}
        key={creator.id}
        linkTo={`/creators/${creator.id}`}/>);
    }
  });

  const characterRows = characters.map(character => {
    if (character) {
      const thumbnailSrc = generateThumbnailSrc(character.thumbnail.path, 'standard','large', character.thumbnail.extension);
      return (<SmallMediaPreview
        title={`${character.name}`}
        imageSrc={thumbnailSrc}
        key={character.id}
        linkTo={`/characters/${character.id}`}/>);
    }
  });

  const { title, description } = comic;
  return (
    <div className="Page">
      <Slat>
        <div className=" DetailView">
          <div className=" DetailView_cover">
            <img src={imageSrc}/>
          </div>
          <div className="DetailView_info">
            <h1>{title}</h1>
            <div className="SubSection">
              <h2>Description</h2>
              <p>{description || 'No description provided'}</p>
            </div>
            <div className="SubSection">
              <h2>Series that this comic is from:</h2>
              From {comic.series.name}
              Release Date: {comic.dates[0].date}
            </div>
            <div className="SubSection">
              <h2>Creators of this comic:</h2>
              <MediaPreviewContainer>{creatorRows}</MediaPreviewContainer>
            </div>
            <div className="SubSection">
              <h2>Characters in this comic:</h2>
              <MediaPreviewContainer>{characterRows}</MediaPreviewContainer>
            </div>
          </div>
        </div>
      </Slat>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicContainer);
