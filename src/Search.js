import React from 'react';
import { connect } from 'react-redux';
import { getComics } from './redux/actions';

const Search = ({searchValue='', getComics, performSearch}) => {
  let input;
  const onSubmit = e => {
    e.preventDefault();
    performSearch(input.value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={node => input = node}/>
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

const SearchComics = ({ getComics }) => {
  const performSearch = searchString => {
    getComics({'titleStartsWith': searchString});
  }
  return (<Search performSearch={performSearch}/>);
}

export default connect(undefined, { getComics })(SearchComics);
