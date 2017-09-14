import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import styles from './photodetail.scss';

export class RotateWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: 0,
    };
  }

  handleChange(event, key, value) {
    if (value) {
      const payload = { photoId: this._photoId(), degrees: value };
      this.props.photoRotate(payload);
    }
  }

  _photoId() {
    const _photo = this.props.photo;
    return typeof _photo == 'string' ? _photo : _photo.get('id');
  }

  render () {
    return (
      <div className={styles.rotate}>
        <div class={styles.title}>Rotate</div>
        <div class={styles.widgetContainer}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={0} primaryText="Rotate photo..." />
            <MenuItem value={90} primaryText="90" />
            <MenuItem value={180} primaryText="180" />
            <MenuItem value={270} primaryText="270" />
          </DropDownMenu>
        </div>
      </div>
    );
  }
}
