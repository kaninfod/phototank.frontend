import React from 'react';
import styles from './photodetail.scss';
import Toggle from 'material-ui/Toggle';

// export function PhotoWidget(props) {
export class PhotoWidget extends React.Component {
  constructor(props) {
    super(props);
    this.togglePhotoFormat = this.togglePhotoFormat.bind(this);
    this.state = {
      photoFormat: 'fullWidth',
    };
  }

  togglePhotoFormat() {
    this.setState({
      photoFormat: this.state.photoFormat == 'fullWidth' ? 'fullHeight' : 'fullWidth'
    });
  }

  render() {
    return (
      <div className={styles.photo}>
        <div className={styles.overlayToggle}>
          <Toggle onToggle={this.togglePhotoFormat}/>
        </div>
        <img
          className={styles[this.state.photoFormat]}
          src={this.props.photo.get('url_lg').concat('?token=', sessionStorage.jwt)}
          />
      </div>
    );
  }
}
