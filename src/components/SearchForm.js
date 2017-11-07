import React from 'react';

export default ({ onSearch }) => {
  let input;
  const onSubmit = e => {
    onSearch(input.value);
    e.preventDefault();
  }
  return (
    <div className="Search">
      <form onSubmit={onSubmit}>
        <input ref={node => input = node}/>
        <button type="button" onClick={onSubmit}>Search</button>
      </form>
    </div>
  )
}
