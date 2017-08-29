import React from 'react';
import { connect } from "react-redux";
import { getPhoto } from '../../../redux/photo';

import { InfoWidget } from './infowidget';
import { CommentWidget } from './commentwidget';
import { TagWidget } from './tagwidget';
import { AlbumWidget } from './albumwidget';
import { PhotoWidget } from './photowidget';

import { likePhoto, addTagPhoto, removeTagPhoto, commentPhoto } from '../../../redux/photo';
import { addPhotoAlbum } from '../../../redux/album';

import './photodetail.scss';//

@connect((store) => {
  return {
    photos:        store.nPhoto.get('photos'),
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
    this.state = {
      photoId: this.props.match.params.id,
      photo: getPhoto(this.props.match.params.id, this.props),
    };
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
    this.props.dispatch(addPhotoAlbum(payload))
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


  render() {
    if (!this.state.photo) { return null };

    return (
      <div className='photodetail'>

        <PhotoWidget photo={this.state.photo}/>

        <InfoWidget photo={this.state.photo} />

        <CommentWidget
          photo={this.state.photo}
          photoAddComment={this.photoAddComment} />

        <TagWidget photo={this.state.photo}
          photoRemoveTag={this.photoRemoveTag}
          photoAddTag={this.photoAddTag}
          taglist={this.props.taglist}/>


        <AlbumWidget
          photo={this.state.photo}
          albums={this.props.albums}
          photoAlbumAdd={this.photoAlbumAdd} />

      </div>
    );
  }
}

export default PhotoDetail;
