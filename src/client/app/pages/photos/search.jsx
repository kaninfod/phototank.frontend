import React from 'react';
import Photos from './photos';

const SearchPhotos = (props) => {
  console.log(props);
  var context = null;
  if (props.match.url == '/photos') {
    const context = 'search';
  }

  return (
    <Photos context={context} contextId={false}/>
  );
};

export default SearchPhotos;
