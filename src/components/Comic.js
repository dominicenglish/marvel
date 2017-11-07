import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getComic, getComicCharacters, getComicCreators } from '../redux/actions.js';
import * as selectors from '../redux/selectors.js';
import { generateThumbnailSrc, getIdFromResourceURI } from '../utils.js';
import Slat from './Slat.js';
import MediaPreviewContainer from './MediaPreviewContainer.js';
import MediaPreviewList from './MediaPreviewList.js';
import SmallMediaPreview from './SmallMediaPreview.js';
import Loading from './Loading.js';

const mapStateToProps = (state, props) => {
  const { match: {params: {id}} } = props;
  return {
    comic: selectors.getComic(state, id),
    characters: selectors.getComicCharacters(state, id),
    creators: selectors.getComicCreators(state, id),
    characterPagination: selectors.getPagination(state, 'comicCharacters', id),
    creatorPagination: selectors.getPagination(state, 'comicCreators', id)
  };
};

const mapDispatchToProps = { getComic, getComicCharacters, getComicCreators };

class Comic extends Component {

  componentWillMount() {
    const { match: {params: {id}}, getComic, getComicCharacters, getComicCreators} = this.props;
    getComic(id);
    getComicCharacters(id);
    getComicCreators(id);
  }

  render() {
    const {comic, characters, creators, characterPagination, creatorPagination} = this.props;

    if (!comic) return <Loading/>

    const { thumbnail: { path, extension } } = comic;
    const imageSrc = generateThumbnailSrc(path, 'detail', '', extension);
    const { title, description } = comic;
    return (
      <div className="Page bg_darkGrey">
        <Slat>
          <div className="TitleLayout bg_darkGrey"><h1>{title}</h1></div>
        </Slat>
        <Slat className="bg_darkGreyGradient">
          <div className=" DetailView">
            <div className=" DetailView_cover">
              <img src={imageSrc}/>
            </div>
            <div className="DetailView_info bg_darkGrey">
              <div className="SubSection">
                <h2>Description</h2>
                <p>{description || 'No description provided'}</p>
              </div>
              <div className="SubSection">
                <h2>Series that this comic is from:</h2>
                <Link to={`/series/${getIdFromResourceURI(comic.series.resourceURI)}`}>{comic.series.name}</Link>
              </div>
              <div className="SubSection">
                <h2>Characters in this comic:</h2>
                <MediaPreviewContainer>
                  <MediaPreviewList
                    list={characters}
                    pagination={characterPagination}
                    mapItemToTitle={item => item.name}
                    mapItemToLink={item => `/characters/${item.id}`}
                  />
                </MediaPreviewContainer>
              </div>
              <div className="SubSection">
                <h2>Creators of this comic:</h2>
                <MediaPreviewContainer>
                  <MediaPreviewList
                    list={creators}
                    pagination={creatorPagination}
                    mapItemToTitle={item => item.fullName}
                    mapItemToLink={item => `/creators/${item.id}`}
                  />
                </MediaPreviewContainer>
              </div>
            </div>
          </div>
        </Slat>
      </div>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comic);
