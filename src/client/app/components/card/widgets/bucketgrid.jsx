import React from 'react';
import { Header } from './header.jsx';
import BucketThumb from './bucket-thumb';


class Bucketgrid extends React.Component {

  render() {
    var photos = this.props.data.bucket.map(bucketPhoto => {
      return BucketThumb({ bucketPhoto: bucketPhoto, onRemovePhoto: this.props.widgetHandlers.REMOVE_FROM_BUCKET });
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
