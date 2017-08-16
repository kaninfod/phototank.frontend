import React from 'react';
import Photos from '../../components/photos/photos';

const CatalogPhotos = (props) => (
  <Photos context="catalog" contextId={props.match.params.id}/>
);

export default CatalogPhotos;
