import React from 'react';

export default class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="pt-actions">
        <ul className="pt-buttons horz">
          {this.props.buttons.horz.map(Button.bind(this))}
        </ul>
        <ul className="pt-buttons vert">
          {this.props.buttons.vert.map(Button.bind(this))}
        </ul>
      </div>
    );
  }
}

var Button = function (props) {
    return (
      <li key={props.key}>
        <a
          data-tooltip={props.tooltip}
          data-position={props.position}
          className={ 'tooltipped btn-floating waves-effect waves-light ' + props.color }
          onClick={props.handler}
          >
          <i className="material-icons" data-widget={props.widgetContent}>
            {props.icon}
          </i>
        </a>
      </li>
    );
  };
