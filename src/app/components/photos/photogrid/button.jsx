import React from 'react';
import './button.scss';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const _class = 'icon-toggle-container'.concat(this.props.visible ? ' visible' : '').concat(this.props.selected ? ' selected' : '');
    return (
    <div className={_class}>

      <div className="icon-toggle" onClick={this.props.onClick}>
        {this.props.children}
      </div>
  </div>
  );
  }
}

// <img src="http://codeitdown.com/media/Home_Icon.svg" alt="Home" />
