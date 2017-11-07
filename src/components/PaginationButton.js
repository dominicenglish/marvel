import React from 'react';

import Button from './Button.js';

export default ({ pagination: {ids=[], totalCount=0}={}, children, ...rest }) => {
  if (ids.length === totalCount) return null;
  return <Button {...rest}>{children}</Button>
};
