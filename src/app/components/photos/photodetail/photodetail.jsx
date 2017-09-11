import React from 'react';
import { connect } from "react-redux";
import { getPhoto } from '../../../redux/photo';

import { InfoWidget } from './infowidget';
import { CommentWidget } from './commentwidget';
import { TagWidget } from './tagwidget';
import { AlbumWidget } from './albumwidget';
import { RotateWidget } from './rotatewidget';
import { PhotoWidget } from './photowidget';

import {
  fetchPhoto,
  fetchTaglist,
  likePhoto,
  addTagPhoto,
  removeTagPhoto,
  commentPhoto,
  rotatePhoto,
  photoAlbumAdd } from '../../../redux/photo';
import { fetchAlbums, } from '../../../redux/album';

import styles from './photodetail.scss';
import cx from 'classnames';


@connect((store) => {
  return {
    photos:        store.nPhoto.get('photos'),
    photo:         store.nPhoto.get('photo'),
    taglist:       store.nPhoto.get('taglist'),
    albums:        store.nAlbum.get('albums'),
  };
})
class PhotoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.photoAddComment = this.photoAddComment.bind(this)
    this.photoAddTag = this.photoAddTag.bind(this)
    this.photoRemoveTag = this.photoRemoveTag.bind(this)
    this.photoAlbumAdd = this.photoAlbumAdd.bind(this)
    this.photoRotate = this.photoRotate.bind(this)
    this.state = {
      photoId: this.props.match.params.id,
      photo: this.props.photo,
      // photo: getPhoto(this.props.match.params.id, this.props),
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchPhoto(this.props.match.params.id))
    this.props.dispatch(fetchTaglist())
    this.props.dispatch(fetchAlbums())
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      photo: getPhoto(this.state.photoId, nextProps),
    })
  }

  photoLike(photoId) {
    this.props.dispatch(likePhoto(photoId))
  }

  photoAlbumAdd(payload) {
    this.props.dispatch(photoAlbumAdd(payload))
  }

  photoAddComment(payload) {
    this.props.dispatch(commentPhoto(payload))
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
    if (!this.props.photo) { return null };

    const _class = cx(styles.photodetail, styles.photodetailGrid, {
        [styles.portrait]: this.props.photo.get('portrait'),  //this.state.photo.get('portrait'),
        [styles.landscape]: !this.props.photo.get('portrait'), //!this.state.photo.get('portrait')
      })
    return (
      <div className={_class}>

        <PhotoWidget photo={this.props.photo}/>


        <InfoWidget photo={this.props.photo} />

        <CommentWidget
          photo={this.props.photo}
          photoAddComment={this.photoAddComment} />

        <TagWidget photo={this.props.photo}
          photoRemoveTag={this.photoRemoveTag}
          photoAddTag={this.photoAddTag}
          taglist={this.props.taglist}/>

        <AlbumWidget
          photo={this.props.photo}
          albums={this.props.albums}
          photoAlbumAdd={this.photoAlbumAdd} />

        <RotateWidget
          photoRotate={this.photoRotate}
          photo={this.props.photo} />

      </div>
    );
  }
}
//
export default PhotoDetail;
