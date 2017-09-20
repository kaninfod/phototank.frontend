import React from 'react';
import styles from './photodetail.scss';

export class PhotoActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div className={styles.actions}>
        <div class={styles.title}>Actions</div>
        <div class={styles.widgetContainer}>

        </div>
      </div>
    );
  }
}
