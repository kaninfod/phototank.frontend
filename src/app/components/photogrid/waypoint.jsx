import React from 'react';

var canTrigger = false;

export default class Waypoint extends React.Component {
  propTypes: {
      onWindowScroll: React.PropTypes.func
  }

  componentDidMount() {
    if (this.props.onWindowScroll) window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    if (this.props.onWindowScroll) window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll(event) {
    if (this._waypointPos() < 0 && this.props.loadMore && !canTrigger) {
      if (this.props.onWindowScroll) this.props.onWindowScroll(event);
      canTrigger = true
    }
  }

  _waypointPos() {
    if (this.refs.waypoint) {
      var rec = this.refs.waypoint.getBoundingClientRect();
      return  rec.bottom - window.scrollY - this.props.offset;
    }
  }

  render() {
    return (
      <div className={this.props.className} ref="waypoint">
        { this.props.children }
        {canTrigger = this.props.loading}
      </div>
    );
  }
}
