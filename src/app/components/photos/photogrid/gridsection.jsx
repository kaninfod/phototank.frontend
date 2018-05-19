import React from 'react';
import uniqid from 'uniqid';
import cx from 'classnames';
import styles from './grid.scss';
import Widget from './widget';

const GridSection = ({ props }) => {
    return (
      <div key={uniqid()} className={styles.photogridSection}>
        <div
          className={styles.gridHeading}
          onClick={props.toggleVisibility}
          id={props.id}
        >
  
          <i class={styles.materialIcons}>
            {props.visible ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
          </i>
  
          {dateString(new Date(props.sectionPhotos.first().get('date_taken_formatted')))}
        </div>
  
        <div className={cx(styles.photogrid, { [styles.hide]: props.visible })} >
          {props.visible ? null : props.sectionPhotos.map(photo =>
            <Widget 
              key={photo.get('id')} 
              selected={parseInt(photo.get('id')) == props.photoProps.selectedPhoto}
              photo={photo}
              actions={props.photoProps.photoActions}
            />
          )}
        </div>
      </div>
    )
  }
  
  const dateString = (date) => {
    return String(monthName(date.getMonth())).concat(", ", date.getYear() + 1900)
  }
  
  const monthName = (num) => {
    var months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December',
        ];
    return num >= 0 && num < 12 ? months[num] : null;
  }

  export default GridSection