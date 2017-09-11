import React from 'react';
import { getFacet } from '../../../redux/photo';
import styles from './photodetail.scss';

export function InfoWidget(props) {

  const _data = props.photo;
  const _location = getFacet('LocationFacet', _data).getIn([0, 'location']);

  return (
    <div className={styles.info}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.cell}>Date:</div>
          <div className={styles.cell}> {_data.get('date_taken_formatted')} </div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>Camera:</div>
          <div className={styles.cell}>{_data.get('make').concat(' ', _data.get('model'))}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>Country:</div>
          <div className={styles.cell}>{_location.get('country_name')}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>City:</div>
          <div className={styles.cell}>{_location.get('city_name')}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>Adderss:</div>
          <div className={styles.cell}>{_location.get('address')}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.cell}>Id:</div>
          <div className={styles.cell}>{_data.get('id')}</div>
        </div>
      </div>
    </div>
  );
}
