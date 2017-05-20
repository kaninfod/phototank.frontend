import React from 'react';
import Photos from './photos';

const CatalogPhotos = (props) => {
  console.log(props);
  return (
    <Photos context="catalog" contextId={props.match.params.id}/>
    );
};

export default CatalogPhotos;
