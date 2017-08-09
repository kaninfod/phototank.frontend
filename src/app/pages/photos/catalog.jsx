import React from 'react';
import Photos from './photos';

const CatalogPhotos = (props) => (
  <Photos context="catalog" contextId={props.match.params.id}/>
);

export default CatalogPhotos;
