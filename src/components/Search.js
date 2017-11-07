import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setCurrentSearch,
  setCurrentSearchFilter,
  getComics,
  getCharacters,
  getCreators
} from '../redux/actions.js';
import * as selectors from '../redux/selectors.js';
import SearchForm from './SearchForm.js';
import MediaPreviewContainer from './MediaPreviewContainer.js';
import MediaPreviewList from './MediaPreviewList.js';
import Slat from './Slat.js';
import Loading from './Loading.js';

const mapStateToProps = state => ({
  comics: selectors.getSearchComics(state),
  comicsPagination: selectors.getPagination(state, 'comics', state.search),
  characters: selectors.getSearchCharacters(state),
  charactersPagination: selectors.getPagination(state, 'characters', state.search),
  creators: selectors.getSearchCreators(state),
  creatorsPagination: selectors.getPagination(state, 'creators', state.search),
  currentSearch: state.search.value,
  currentSearchFilter: state.search.filter
});

const mapDispatchToProps = {
  setCurrentSearch,
  setCurrentSearchFilter,
  getComics,
  getCharacters,
  getCreators
};

class Comics extends Component {

  onSearch = input => {
    const { setCurrentSearch, getComics, getCharacters, getCreators } = this.props;
    setCurrentSearch(input);
    getComics({titleStartsWith: input});
    getCharacters({nameStartsWith: input});
    getCreators({nameStartsWith: input});
  }

  render() {
    const {
      comics=[],
      characters=[],
      creators=[],
      comicsPagination={},
      charactersPagination={},
      creatorsPagination={}
    } = this.props;

    const searchResults = (comics.length || characters.length || creators.length) ?
      (
      <div className="SearchResults">
        <div className="SubSection">
          <h2>Comic Results:</h2>
          <MediaPreviewContainer>
            <MediaPreviewList
              list={comics}
              pagination={comicsPagination}
              mapItemToTitle={item => item.title}
              mapItemToLink={item => `/comics/${item.id}`}
            />
          </MediaPreviewContainer>
        </div>
        <div className="SubSection">
          <h2>Character Results:</h2>
          <MediaPreviewContainer>
            <MediaPreviewList
              list={characters}
              pagination={charactersPagination}
              mapItemToTitle={item => item.name}
              mapItemToLink={item => `/characters/${item.id}`}
            />
          </MediaPreviewContainer>
        </div>
        <div className="SubSection">
          <h2>Creator Results:</h2>
          <MediaPreviewContainer>
            <MediaPreviewList
              list={creators}
              pagination={creatorsPagination}
              mapItemToTitle={item => item.fullName}
              mapItemToLink={item => `/creators/${item.id}`}
            />
          </MediaPreviewContainer>
        </div>
      </div>
    ) : '';

    return (
      <div className="Page bg_mediumGrey">
        <Slat className="bg_darkGrey padding_20">
          <SearchForm onSearch={this.onSearch}/>
        </Slat>
        <Slat className="padding_20">
          {searchResults}
        </Slat>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comics);
