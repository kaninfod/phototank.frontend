import React from 'react';
import { likePhoto } from '../../redux/photo';



export default class PhotoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (!this.props.widgetData.photo) { return null; }
    console.log(this.props.widgetData);
    // this.props.widgetData.actions.photoLike(this.props.widgetData.photo.get('id'));
    return <p>Hello, {this.props.widgetData.photo.get('id')}</p>;
  }
}
