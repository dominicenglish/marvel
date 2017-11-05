import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

export default ({title, imageSrc, className='', linkTo=''}) => (
  <div data-tip={title} className={`MediaPreview MediaPreview_small ${className}`}>
    <ReactTooltip/>
    <Link to={linkTo}>
      <div className="hoverScale">
        <img src={imageSrc}/>
      </div>
    </Link>
  </div>
);
