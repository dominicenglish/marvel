import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getSingleSeries,
  getSingleSeriesCharacters,
  getSingleSeriesCreators,
  getSingleSeriesComics
} from '../redux/actions.js';
import * as selectors from '../redux/selectors.js';
import { generateThumbnailSrc } from '../utils.js';
import MediaPreviewList from './MediaPreviewList.js';
import MediaPreviewContainer from './MediaPreviewContainer.js';
import Slat from './Slat.js';
import PaginationButton from './PaginationButton.js';
import PaginationCount from './PaginationCount.js';
import Loading from './Loading.js';

const mapStateToProps = (state, props) => {
  const { match: {params: { id } } } = props;
  return {
    series: selectors.getSingleSeries(state, id),
    characters: selectors.getSingleSeriesCharacters(state, id),
    creators: selectors.getSingleSeriesCreators(state, id),
    comics: selectors.getSingleSeriesComics(state, id),
    characterPagination: selectors.getPagination(state, 'seriesCharacters', id),
    creatorPagination: selectors.getPagination(state, 'seriesCreators', id),
    comicPagination: selectors.getPagination(state, 'seriesComics', id),
  };
};

const mapDispatchToProps = {
  getSingleSeries,
  getSingleSeriesCharacters,
  getSingleSeriesCreators,
  getSingleSeriesComics
};

class SingleSeries extends Component {

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

  loadComics = () => {
    const { series, comicPagination, getSingleSeriesComics } = this.props;
    getSingleSeriesComics(series.id, {offset: comicPagination.nextOffset});
  };

  render() {
    const {
      series,
      characters=[],
      creators=[],
      comics=[],
      characterPagination={},
      creatorPagination={},
      comicPagination={}
    } = this.props;

    if (!series) return <Loading/>

    const { path, extension } = series.thumbnail;
    const imageSrc = generateThumbnailSrc(path, 'detail', '', extension);
    const { title, description, startYear, endYear } = series;
    return (
      <div className="SingleSeries Page bg_darkGrey">
        <Slat>
          <div className="TitleLayout bg_darkGrey"><h1>{title}</h1></div>
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
                <h2>Characters in this series:</h2>
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
                <h2>Creators involved in this series:</h2>
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
        <Slat className="bg_darkestGrey">
          <div className="ComicView">
            <div className="SubSection">
              <h2>Comics in this series (<PaginationCount pagination={comicPagination}/>):</h2>
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
)(SingleSeries);
