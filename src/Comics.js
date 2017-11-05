import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from './Search.js';
import comics from './comicData.js';

const mapStateToProps = state => ({
  comics: state.comicData.comics,
  comicIds: state.comicData.comicIds
});

const Comics = ({comics, comicIds}) => (
  <div>
    <h1>Comics</h1>
    <Search/>
    <ComicList comics={comics} comicIds={comicIds}/>
  </div>
)

const ComicList = ({comics={}, comicIds=[]}) => {
  const list = comicIds ? comicIds.map(comicId => {
    const comic = comics[comicId];
    return (
    <Link to={`/comics/${comic.id}`} key={comic.id}>
      <div className="preview">
          <img src={comic.thumbnail.path + '/standard_xlarge.' + comic.thumbnail.extension} alt={`Portrait of ${comic.name}`}/>
          <h3>{comic.title}</h3>
      </div>
    </Link>
  )}) : [];

  return <div className="list">{list}</div>
}

export default connect(mapStateToProps)(Comics);
