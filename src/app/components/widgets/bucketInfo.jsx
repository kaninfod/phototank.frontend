import React from 'react';

export default class BucketInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (!this.props.widgetData.bucket) { return null; }

    console.log(this.props.widgetData);
    return <p>Hello, {this.props.widgetData.bucket.getIn([0, 'id'])}</p>;
  }
}
