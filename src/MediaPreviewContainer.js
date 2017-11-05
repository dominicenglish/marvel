import React from 'react';

export default ({children, className=''}) => (
  <div className={`MediaPreviewContainer ${className}`}>
    {children}
  </div>
);
