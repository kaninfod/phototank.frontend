import React from 'react';


const BucketPanel = (props) => {

  const photos = props.photos.map(bucketPhoto =>
    <img
      onClick={() => props.onRemovePhoto(bucketPhoto.get('id'))}
      class="responsive-img"
      key={bucketPhoto.get('id')}
      src={bucketPhoto.get('url_tm').concat('?token=', sessionStorage.jwt)}/>
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
