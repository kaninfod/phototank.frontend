import React from 'react';
import ConfirmDelete from '../confirmDelete'
import { connect } from "react-redux";
import { getPhoto } from '../../../redux/photo';
import { InfoWidget } from './infowidget';
import { CommentWidget } from './commentwidget';
import { PhotoWidget } from './photowidget';
import { PhotoActions } from './photoactions';

import {
  deletePhoto,
  fetchPhoto,
  fetchTaglist,
  likePhoto,
  addTagPhoto,
  removeTagPhoto,
  commentPhoto,
  rotatePhoto,
  photoAlbumAdd } from '../../../redux/photo';
import { fetchAlbums, } from '../../../redux/album';
import { withRouter } from 'react-router-dom';
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
    this.photoLike = this.photoLike.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.photoDelete = this.photoDelete.bind(this)
    this.state = {
      photoId: this.props.match.params.id,
      photo: this.props.photo,
      confirmDeleteOpen: false,
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

  confirmDelete() {
    this.setState({ confirmDeleteOpen: true, });
  }

  photoDelete() {
    this.props.dispatch(deletePhoto(this.props.photo.get('id')))
    this.props.history.push('/photos');
  }

  photoLike() {
    this.props.dispatch(likePhoto(this.props.photo.get('id')))
  }

  photoAlbumAdd(albumId) {
    const payload = { albumId: albumId, photoId: this.props.photo.get('id') };
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
        [styles.portrait]: this.props.photo.get('portrait'),
        [styles.landscape]: !this.props.photo.get('portrait'),
      })

      const actions = {
        handleLike: this.photoLike,
        handleAddTag: this.photoAddTag,
        handleRemoveTag: this.photoRemoveTag,
        handleRotate: this.photoRotate,
        handleAlbumAdd: this.photoAlbumAdd,
        handleDelete: this.confirmDelete,
      }

    return (
      <div className={_class}>

        <PhotoWidget photo={this.props.photo}/>

        <InfoWidget photo={this.props.photo} />

        <CommentWidget
          photo={this.props.photo}
          photoAddComment={this.photoAddComment} />

        <PhotoActions
          photo={this.props.photo}
          actions={actions}
          taglist={this.props.taglist}
          albums={this.props.albums}
          />

          <ConfirmDelete
            open={this.state.confirmDeleteOpen}
            id={this.props.photo.get('id')}
            handleDelete={this.photoDelete} />

      </div>
    );
  }
}
//
export default PhotoDetail;
