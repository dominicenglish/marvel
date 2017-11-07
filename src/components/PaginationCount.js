import React from 'react';

export default ({ pagination: {ids=[], nextOffset, totalCount} }) => {
  if (!ids.length) return null;
  return <span>{nextOffset} out of {totalCount}</span>
}
