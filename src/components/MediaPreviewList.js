import React from 'react';
import Loading from './Loading.js';
import { generateThumbnailSrc } from '../utils.js';
import SmallMediaPreview from './SmallMediaPreview.js';
import LargeMediaPreview from './LargeMediaPreview.js';

export default ({
  children,
  className='',
  list=[],
  pagination={},
  mapItemToTitle,
  mapItemToLink,
  size='small'
}) => {

  if (pagination.isFetching) return <Loading/>

  const thumbnailFormat = size === 'large' ? 'portrait' : 'standard';
  return list.map(item => {
    if (item) {
      const { path, extension } = item.thumbnail;
      const thumbnailSrc = generateThumbnailSrc(path, thumbnailFormat,'large', extension);
      if (size === 'large') {
        return (
          <LargeMediaPreview
            title={mapItemToTitle(item)}
            imageSrc={thumbnailSrc}
            key={item.id}
            linkTo={mapItemToLink(item)}
          />
        );
      }
      return (
        <SmallMediaPreview
          title={mapItemToTitle(item)}
          imageSrc={thumbnailSrc}
          key={item.id}
          linkTo={mapItemToLink(item)}
        />
      );
    }
  });
};
