import React from 'react';

export default ({ children, className='', type='submit', onClick }) => (
  <button type={type} className={`Button ${className}`} onClick={onClick}>
    {children}
  </button>
);
