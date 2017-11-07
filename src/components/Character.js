import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCharacter,
  getCharacterSeries,
  getCharacterComics
} from '../redux/actions.js';
import * as selectors from '../redux/selectors.js';
import { generateThumbnailSrc } from '../utils.js';
import SmallMediaPreview from './SmallMediaPreview.js';
import LargeMediaPreview from './LargeMediaPreview.js';
import MediaPreviewContainer from './MediaPreviewContainer.js';
import MediaPreviewList from './MediaPreviewList.js';
import Slat from './Slat.js';
import PaginationButton from './PaginationButton.js';
import PaginationCount from './PaginationCount.js';
import Loading from './Loading.js';

const mapStateToProps = (state, props) => {
  const { match: {params: {id}} } = props;
  return {
    character: selectors.getCharacter(state, id),
    series: selectors.getCharacterSeries(state, id),
    comics: selectors.getCharacterComics(state, id),
    comicPagination: selectors.getPagination(state, 'characterComics', id),
    creatorPagination: selectors.getPagination(state, 'characterCreators', id),
    seriesPagination: selectors.getPagination(state, 'characterSeries', id)
  }
};

const mapDispatchToProps = {
  getCharacter,
  getCharacterSeries,
  getCharacterComics
};

class Character extends Component {

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

  loadComics = () => {
    const { character, comicPagination, getCharacterComics } = this.props;
    getCharacterComics(character.id, {offset: comicPagination.nextOffset});
  };

  render() {
    const { character, series=[], comics=[], comicPagination={}, seriesPagination={} } = this.props;

    if (!character) return <Loading/>

    const imageSrc = generateThumbnailSrc(character.thumbnail.path, 'detail', '', character.thumbnail.extension );
    const { name, description } = character;
    return (
      <div className="Page bg_darkGrey">
        <Slat>
          <div className="TitleLayout"><h1>{name}</h1></div>
        </Slat>
        <Slat className="bg_darkGreyGradient">
          <div className="DetailView">
            <div className="DetailView_cover">
              <img src={imageSrc}/>
            </div>
            <div className="DetailView_info bg_darkGrey">
              <div className="SubSection">
                <h2>Description</h2>
                <p>{description || 'No description provided'}</p>
              </div>
              <div className="SubSection">
                <h2>Series that include this character:</h2>
                <MediaPreviewContainer>
                  <MediaPreviewList
                    list={series}
                    pagination={seriesPagination}
                    mapItemToTitle={item => item.title}
                    mapItemToLink={item => `/series/${item.id}`}
                  />
                </MediaPreviewContainer>
              </div>
            </div>
          </div>
        </Slat>
        <Slat className="bg_darkestGrey">
          <div className="ComicView">
            <div className="SubSection">
              <h2>Comics that include this character: (<PaginationCount pagination={comicPagination}/>)</h2>
              <MediaPreviewContainer>
                <MediaPreviewList
                  list={comics}
                  pagination={comicPagination}
                  mapItemToTitle={item => item.title}
                  mapItemToLink={item => `/comics/${item.id}`}
                  size="large"
                />
              </MediaPreviewContainer>
            </div>
            <div className="SubSection">
              <PaginationButton
                type="button"
                className="bg_lightGrey"
                onClick={this.loadComics}
                pagination={comicPagination}>
                Load More (<PaginationCount pagination={comicPagination}/>)
              </PaginationButton>
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
)(Character);
