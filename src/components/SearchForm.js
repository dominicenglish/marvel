import React from 'react';

export default ({ onSearch }) => {
  let input;
  const onSubmit = e => {
    e.preventDefault();
    onSearch(input.value);
  }
  return (
    <div className="Search">
      <form onSubmit={onSubmit}>
        <input ref={node => input = node}/>
        <button type="submit">Search</button>
      </form>
    </div>
  )
}
