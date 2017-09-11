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
    console.log(key, value);
    if (value) {
      const payload = { photoId: this.props.photo.get('id'), degrees: value };
      this.props.photoRotate(payload);
    }
  }

  render () {
    return (
      <div className={styles.rotate}>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={0} primaryText="Rotate photo..." />
          <MenuItem value={90} primaryText="90" />
          <MenuItem value={180} primaryText="180" />
          <MenuItem value={270} primaryText="270" />
        </DropDownMenu>
      </div>
    );
  }
}
