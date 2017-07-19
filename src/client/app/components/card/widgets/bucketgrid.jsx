import React from 'react';
import { Header } from './header.jsx';

class Bucketgrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemovePhoto = this.handleRemovePhoto.bind(this);
  }

  handleRemovePhoto(id) {
    console.log(id);
    this.props.widgetHandlers.REMOVE_FROM_BUCKET(id);
  }

  render() {
    var photos = this.props.data.bucket.map(bucketPhoto => {
      return BucketThumb({ bucketPhoto: bucketPhoto, onRemovePhoto: this.handleRemovePhoto });
    });

    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Photos in Bucket"/>
        <div className="pt-widget content">
          <div className="pt-bucket-grid">
            { photos }
          </div>
        </div>
      </div>
    );
  }
}

export default Bucketgrid;

const BucketThumb = (props) => {
  return (
    <img
      onClick={() => props.onRemovePhoto(props.bucketPhoto.id)}
      class="responsive-img"
      key={props.bucketPhoto.id}
      data-photoid={props.bucketPhoto.id}
      src={props.bucketPhoto.photo_url.concat('?token=', sessionStorage.jwt)}/>
  );
};
