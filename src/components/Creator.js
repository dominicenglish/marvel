import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getCreator,
  getCreatorSeries,
  getCreatorComics
} from '../redux/actions.js';
import * as selectors from '../redux/selectors.js';
import { generateThumbnailSrc } from '../utils.js';
import MediaPreviewContainer from './MediaPreviewContainer.js';
import MediaPreviewList from './MediaPreviewList.js';
import Slat from './Slat.js';
import PaginationButton from './PaginationButton.js';
import PaginationCount from './PaginationCount.js';
import Loading from './Loading.js';

const mapStateToProps = (state, props) => {
  const { match: {params: {id}} } = props;
  return {
    creator: selectors.getCreator(state, id),
    series: selectors.getCreatorSeries(state, id),
    comics: selectors.getCreatorComics(state, id),
    comicPagination: selectors.getPagination(state, 'creatorComics', id),
    seriesPagination: selectors.getPagination(state, 'creatorSeries', id)
  }
};

const mapDispatchToProps = {
  getCreator,
  getCreatorSeries,
  getCreatorComics
};

class Creator extends Component {

  componentWillMount() {
    const {
      match: {params: {id}},
      getCreator,
      getCreatorSeries,
      getCreatorComics
    } = this.props;

    getCreator(id);
    getCreatorSeries(id);
    getCreatorComics(id);
  }

  loadComics = () => {
    const { creator, comicPagination, getCreatorComics } = this.props;
    getCreatorComics(creator.id, {offset: comicPagination.nextOffset});
  };

  render() {
    const {
      creator,
      series=[],
      comics=[],
      comicPagination={},
      seriesPagination={}
    } = this.props;

    if (!creator) return <Loading/>

    const { path, extension } = creator.thumbnail;
    const imageSrc = generateThumbnailSrc(path, 'detail', '', extension);
    const { fullName, description } = creator;
    return (
      <div className="Page bg_darkGrey">
        <Slat>
          <div className="TitleLayout"><h1>{fullName}</h1></div>
        </Slat>
        <Slat className="bg_darkGreyGradient">
          <div className="DetailView">
            <div className="DetailView_cover">
              <img src={imageSrc}/>
            </div>
            <div className="DetailView_info bg_darkGrey">
              <div className="SubSection">
                <h2>Series this creator worked on:</h2>
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
              <h2>Comics this creator worked on: (<PaginationCount pagination={comicPagination}/>)</h2>
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
)(Creator);
