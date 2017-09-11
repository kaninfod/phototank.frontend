import React from 'react';
import styles from './photodetail.scss';

export function PhotoWidget(props) {

  return (
    <div className={styles.photo}>

      <img src={props.photo.get('url_lg').concat('?token=', sessionStorage.jwt)}/>
    </div>
  );
}
