import React from 'react';

export default ({ children, className }) => (
  <div className={`Slat ${className}`}>
    <div className="Slat_inner">
      {children}
    </div>
  </div>
);
