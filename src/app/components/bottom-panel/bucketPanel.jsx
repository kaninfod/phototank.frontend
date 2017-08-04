import React from 'react';
import BucketThumb from '../card/widgets/bucket-thumb';

const BucketPanel = (props) => {
  var photos = props.photos.map(bucketPhoto =>
     BucketThumb({ bucketPhoto: bucketPhoto, onRemovePhoto: props.onRemovePhoto })
  );

  return (
    <div>
      <div class="pt-bucket-tools">
        <a className={ 'btn-floating waves-effect waves-light pt-button' }
          onClick={props.onShowBucket}>
          <i className="material-icons">
            info
          </i>
        </a>
        <div class="pt-button" onClick={props.onShowBucket}/>
      </div>

      <div class="pt-bucket-photos" >
        <div class="pt-bucket-photos-container" >
          {photos}
        </div>
      </div>
    </div>
  );
};

export default BucketPanel;
