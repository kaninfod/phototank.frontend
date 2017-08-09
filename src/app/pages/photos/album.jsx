import React from 'react';
import Photos from './photos';

const AlbumPhotos = (props) => (
  <Photos context="album" contextId={props.match.params.id}/>
);

export default AlbumPhotos;
