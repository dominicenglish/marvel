/**
 * Generate an image source given a format and size
 *
 * portrait_small	50x75px
 * portrait_medium	100x150px
 * portrait_xlarge	150x225px
 * portrait_fantastic	168x252px
 * portrait_uncanny	300x450px
 * portrait_incredible	216x324px
 *
 * standard_small	65x45px
 * standard_medium	100x100px
 * standard_large	140x140px
 * standard_xlarge	200x200px
 * standard_fantastic	250x250px
 * standard_amazing	180x180px
 *
 * landscape_small	120x90px
 * landscape_medium	175x130px
 * landscape_large	190x140px
 * landscape_xlarge	270x200px
 * landscape_amazing	250x156px
 * landscape_incredible	464x261px
 *
 * detail	full image, constrained to 500px wide
 * full-size image	no variant descriptor
 */
export const generateThumbnailSrc = (path, format='portrait', size='small', extension='jpg' ) => {
  const validFormats = ['portrait', 'standard', 'landscape', 'detail', 'full-size'];
  const validSizes = ['small', 'medium', 'large', 'xlarge', 'fantastic', 'uncanny', 'incredible', 'amazing'];
  if (validFormats.indexOf(format) < 0 && format !== '') format = 'portrait';
  if (validSizes.indexOf(size) < 0 && size !== '') size = 'small';
  if (size) size = `_${size}`;
  return `${path}/${format}${size}.${extension}`;
}

/**
 * Get a resource id from the end of a resourceURI field used by
 * the Marvel API. For whatever reason they do not return id values
 * in their collection summaries hence this hacky solution.
 * @param  {string} uri resourceURI returned by Marvel apiKey
 * @return {string}     Last segment of the URI
 */
export const getIdFromResourceURI = uri => {
  const segments = uri.split('/');
  return segments.pop();
}

export const combineArraysWithOffset = (existing, additions, offset) => {
  return additions.reduce((existing, value, index) => {
    existing[offset + index] = value;
    return existing;
  }, existing);
}
