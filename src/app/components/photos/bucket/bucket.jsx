import React from 'react';
import { connect } from "react-redux";
import { fetchAlbums, } from '../../../redux/album';
// import { fetchBucket, fetchTaglist } from '../../../redux/photo';
import { AlbumWidget } from '../photodetail/albumwidget';
import { TagWidget } from '../photodetail/tagwidget';
import { CommentWidget } from '../photodetail/commentwidget';
import { RotateWidget } from '../photodetail/rotatewidget';
import styles from './bucket.scss';
import cx from 'classnames';
import {
  fetchPhoto,
  fetchBucket,
  fetchTaglist,
  likePhoto,
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

    this.state = {
      // photo: getPhoto(this.props.match.params.id, this.props),
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchBucket())
    this.props.dispatch(fetchTaglist())
    this.props.dispatch(fetchAlbums())
  }

  photoAddComment(payload) {
    this.props.dispatch(commentPhoto(payload))
  }

  photoAlbumAdd(payload) {
    this.props.dispatch(photoAlbumAdd(payload))
  }

  photoAddTag(payload) {
    this.props.dispatch(addTagPhoto(payload))
  }

  photoRemoveTag(payload) {
    this.props.dispatch(removeTagPhoto(payload))
  }

  photoRotate(payload) {
    this.props.dispatch(rotatePhoto(payload));
  }

  render() {
    if (!(this.props.albums && this.props.bucket && this.props.taglist)) { return null };

    return (
      <div className={styles.bucket}>
        <div className={styles.actions}>

          <AlbumWidget
            photoId="bucket"
            albums={this.props.albums}
            photoAlbumAdd={this.photoAlbumAdd.bind(this)} />

          <TagWidget photo="bucket"
            photoRemoveTag={this.photoRemoveTag.bind(this)}
            photoAddTag={this.photoAddTag.bind(this)}
            taglist={this.props.taglist}/>
          <CommentWidget
            photo='bucket'
            photoAddComment={this.photoAddComment.bind(this)} />
          <RotateWidget
            photoRotate={this.photoRotate.bind(this)}
            photo="bucket" />
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
