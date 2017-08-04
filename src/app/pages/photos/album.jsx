import React from 'react';
import Photos from './photos';

const AlbumPhotos = (props) => {
  return (
    <Photos context="album" contextId={props.match.params.id}/>
    );
};

export default AlbumPhotos;
