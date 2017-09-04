import React from 'react';
import { throttle } from 'lodash';
let canTrigger = true;

export default class Waypoint extends React.Component {
  constructor(props) {
    super(props)
    this.handleScroll = _.throttle(this.handleScroll, 800).bind(this)
  }
  propTypes: {
      onWindowScroll: React.PropTypes.func
  }

  componentDidMount() {
    if (this.props.onWindowScroll) window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    if (this.props.onWindowScroll) window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    // console.log(this._waypointPos(), this.props.loading, canTrigger)
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
    // console.log('grid loading', this.props.loading);
    return (
      <div className={this.props.className} ref="waypoint">
        { this.props.children }
        {canTrigger = !this.props.loading}
      </div>
    );
  }
}
