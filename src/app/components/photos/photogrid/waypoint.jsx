import React from 'react';
import { throttle } from 'lodash';
let canTrigger = true;

export default class Waypoint extends React.Component {
  propTypes: {
      onWindowScroll: React.PropTypes.func
  }

  componentDidMount() {
    const callback = _.throttle(this.handleScroll.bind(this), 500);
    if (this.props.onWindowScroll) window.addEventListener("scroll", callback);
  }

  componentWillUnmount() {
    if (this.props.onWindowScroll) window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll(event) {
    if (this._waypointPos() < 0 && this.props.loadMore && canTrigger) {
      canTrigger = false
      if (this.props.onWindowScroll) {
        this.props.onWindowScroll(event);
      }

    }
  }

  _waypointPos() {
    if (this.refs.waypoint) {
      var rec = this.refs.waypoint.getBoundingClientRect();
      return  rec.bottom - window.outerHeight - this.props.offset;
    }
  }

  render() {
    return (
      <div className={this.props.className} ref="waypoint">
        { this.props.children }
        {canTrigger = true}
      </div>
    );
  }
}
