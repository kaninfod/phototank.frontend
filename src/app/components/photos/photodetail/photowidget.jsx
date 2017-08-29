import React from 'react';


export function PhotoWidget(props) {

  return (
    <div className="photo">
      <img src={props.photo.get('url_md').concat('?token=', sessionStorage.jwt)}/>
    </div>
  );
}
