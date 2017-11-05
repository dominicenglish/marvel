import React from 'react';
import { connect } from 'react-redux';
import characters from './characterData.js';
import { getCharacters } from './redux/actions.js';

const mapStateToProps = state => ({
  characters: state.characterData.characters,
  characterIds: state.characterData.characterIds
});

const mapDispatchToProps = dispatch => ({
  onItemClick: id => {
    dispatch(getCharacters());
  }
});

const Characters = props => (
  <div><h1 onClick={props.onItemClick}>Characters</h1><CharacterList {...props}/></div>
)

const CharacterList = props => {
  const list = props.characterIds ? props.characterIds.map(characterId => {
    const character = props.characters[characterId];
    return (
      <div className="preview" key={character.id} onClick={props.onItemClick}>
        <img src={character.thumbnail.path + '/standard_xlarge.' + character.thumbnail.extension} alt={`Portrait of ${character.name}`}/>
        <h3>{character.name}</h3>
      </div>
    );
  }) : [];

  return <div className="list">{list}</div>
}

const CharactersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Characters);

export default CharactersContainer;
