import React from 'react';

const bucketThumb = (props) => (
    <img
      onClick={() => props.onRemovePhoto(props.bucketPhoto.get('id'))}
      class="responsive-img"
      key={props.bucketPhoto.get('id')}
      data-photoid={props.bucketPhoto.get('id')}
      src={props.bucketPhoto.get('url_tm').concat('?token=', sessionStorage.jwt)}
    />
);

export default bucketThumb;
