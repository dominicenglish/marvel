import React from 'react';
import { Link } from 'react-router-dom';

export default ({title, imageSrc, className='', linkTo=''}) => (
  <div className={`MediaPreview hoverScale ${className}`}>
    <Link to={linkTo}>
      <img src={imageSrc}/>
      <h3>{title}</h3>
    </Link>
  </div>
);
