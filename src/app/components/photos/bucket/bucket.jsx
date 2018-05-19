import React from 'react';
import { connect } from "react-redux";
import { fetchAlbums, } from '../../../redux/album';
import { PhotoActions } from '../photodetail/photoactions';
import styles from './bucket.scss';
import cx from 'classnames';
import {
  fetchPhoto,
  fetchBucket,
  clearBucket,
  fetchTaglist,
  likePhoto,
  unlikePhoto,
  addTagPhoto,
  removeTagPhoto,
  commentPhoto,
  rotatePhoto,
  photoAlbumAdd } from '../../../redux/photo';

@connect((store) => {
  return {
    bucket:        store.nPhoto.get('bucket'),
    taglist:       store.nPhoto.get('taglist'),
    albums:        store.nAlbum.get('albums'),
  };
})
class Bucket extends React.Component {
  constructor(props) {
    super(props);
    this.photoAddComment = this.photoAddComment.bind(this)
    this.photoAddTag = this.photoAddTag.bind(this)
    this.photoRemoveTag = this.photoRemoveTag.bind(this)
    this.photoAlbumAdd = this.photoAlbumAdd.bind(this)
    this.photoRotate = this.photoRotate.bind(this)
    this.photoLike = this.photoLike.bind(this)
    this.photoUnlike = this.photoUnlike.bind(this)
    this.photoDelete = this.photoDelete.bind(this)
    this.bucketClear = this.bucketClear.bind(this)
    this.state = {
      // photo: getPhoto(this.props.match.params.id, this.props),
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchBucket())
    this.props.dispatch(fetchTaglist())
    this.props.dispatch(fetchAlbums())
  }

  bucketClear() {
    this.props.dispatch(clearBucket());
    this.props.history.push('/photos');
  }

  photoDelete() {
    this.props.dispatch(deletePhoto(this.props.photo.get('id')))
    this.props.history.push('/photos');
  }

  photoLike() {
    this.props.dispatch(likePhoto('bucket'))
  }

  photoUnlike() {
    this.props.dispatch(unlikePhoto('bucket'))
  }

  photoAddComment(payload) {
    payload.photoId = 'bucket';
    this.props.dispatch(commentPhoto(payload))
  }

  photoAlbumAdd(albumId) {
    const payload = { albumId: albumId, photoId: 'bucket' };
    this.props.dispatch(photoAlbumAdd(payload))
  }

  photoAddTag(payload) {
    payload.photoId = 'bucket';
    this.props.dispatch(addTagPhoto(payload))
  }

  photoRemoveTag(payload) {
    payload.photoId = 'bucket';
    this.props.dispatch(removeTagPhoto(payload))
  }

  photoRotate(payload) {
    payload.photoId = 'bucket';
    console.log(payload);
    this.props.dispatch(rotatePhoto(payload));
  }

  render() {
    if (!(this.props.albums && this.props.bucket && this.props.taglist)) { return null };

    const actions = {
      handleLike: this.photoLike,
      handleUnlike: this.photoUnlike,
      handleAddTag: this.photoAddTag,
      handleRemoveTag: this.photoRemoveTag,
      handleRotate: this.photoRotate,
      handleAlbumAdd: this.photoAlbumAdd,
      handleDelete: this.photoDelete,
      handleClear: this.bucketClear,
    }

    return (
      <div className={styles.bucket}>
        <div className={styles.actions}>

          <PhotoActions
            bucketMode={true}
            photo={this.props.bucket}
            actions={actions}
            taglist={this.props.taglist}
            albums={this.props.albums}
            />

        </div>

        <div className={styles.bucketGrid}>
          {renderBucket(this.props.bucket)}
        </div>

      </div>
    );
  }
}

export default Bucket;

function renderBucket(props) {
  return props.map(photo =>
    <div  key={photo.get('id')}>
      <img src={photo.get('url_tm').concat('?token=', sessionStorage.jwt)} />
    </div>
  )
}
