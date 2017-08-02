import React from 'react';
import { connect } from "react-redux"
import AppConstants from '../../../constants/constants.js'
import Draggable, {DraggableCore} from 'react-draggable';
import {getButtons} from './button.props.js'
import { Buttons, Info, Rotate, Albums, Comments, Tag, Map } from '../widgets'
import '../styles/card.scss'
import { addPhotoAlbum, fetchAlbums } from '../../../redux/album'
import {
  fetchPhoto,
  rotatePhoto,
  commentPhoto,
  likePhoto,
  addTagPhoto,
  removeTagPhoto,
  deletePhoto,
  fetchTaglist } from '../../../redux/photo';
import { setWidget } from '../../../redux/appState';

const components = {
  INFO:     Info,
  ROTATE:   Rotate,
  ALBUMS:   Albums,
  COMMENTS: Comments,
  TAG:      Tag,
  MAP:      Map,
  DELETE:   'Delete',
  LIKE:     'Like'
};

@connect((store) => {
  return {
    selectedWidget: store.app.get('selectedWidget'),
    photoId: store.app.get('selectedPhoto'),
    photoData: store.nPhoto.get('photoData').toJS(),
    albums: store.nAlbum.get('albums'),
    taglist: store.nPhoto.get('taglist'),
  };
})
export default class PhotoCard extends React.Component {
  constructor(props) {
    super(props);

    this.addComment  = this.addComment.bind(this);
    this.addTag = this.addTag.bind(this);
    this.addToAlbum  = this.addToAlbum.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.hide = this.hide.bind(this);
    this.likePhoto = this.likePhoto.bind(this);
    this.likeState = this.likeState.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.rotatePhoto = this.rotatePhoto.bind(this);
    this.setWidget = this.setWidget.bind(this);
    this.state = {
      hidden: true,
    };
  }

  // componentWillMount() {
  //   if (this.props.photoId) {
  //     console.log('I DID FIRE!!!');
  //     this.props.dispatch(fetchPhoto(this.props.photoId))
  //   }
  // }

  componentWillReceiveProps(nextProps){
    if (this.props.photoId != nextProps.photoId) {
      this.setState({ hidden: false });
      this.props.dispatch(fetchPhoto(nextProps.photoId))
      this.props.dispatch(fetchAlbums())
      this.props.dispatch(fetchTaglist())
    }
  }

  setWidget(widget) {
    this.props.dispatch(setWidget(widget.target.dataset.widget))
  }

  addToAlbum(albumId) {
    var payload = {
      photoId: this.props.photoData.id,
      albumId: albumId
    }
    this.props.dispatch(addPhotoAlbum(payload))
  }

  rotatePhoto(rotation) {
    var payload = {
      photoId: this.props.photoData.id,
      rotation: rotation
    }
    this.props.dispatch(rotatePhoto(payload))
  }

  addComment(comment) {
    var payload = {
      photoId: this.props.photoData.id,
      comment: comment
    }
    this.props.dispatch(commentPhoto(payload))
  }

  addTag(tag) {
    this.props.dispatch(addTagPhoto({photoId: this.props.photoData.id, name: tag}))
  }

  removeTag(tagId) {
    this.props.dispatch(removeTagPhoto({photoId: this.props.photoData.id, tagId: tagId}))
  }

  deletePhoto() {
    this.props.dispatch(deletePhoto(this.props.photoData.id))
    this.hide()
  }

  hide() {
    this.setState({ hidden: !this.state.hidden });
  }

  likePhoto() {
    this.props.dispatch(likePhoto(this.props.photoData.id))
  }

  likeState() {
    if (this.props.photoData.like) { return "green" } else {return "blue-grey lighten-2"}
  }

  render() {

    if (!Object.keys(this.props.photoData).length || this.state.hidden) {
      return null
    }

    const props = this.props
    const WidgetType = components[props.selectedWidget];
    const widgetHandlers = {
      ROTATE:     this.rotatePhoto,
      ALBUMS:     this.addToAlbum,
      COMMENTS:   this.addComment,
      HIDE:       this.hide,
      ADDTAG:     this.addTag,
      REMOVETAG:  this.removeTag,
      DELETE:     this.deletePhoto,
      LIKE:       this.likePhoto,
      LIKESTATE:  this.likeState(),
      SETWIDGET:  this.setWidget,
    }

    const buttons = getButtons(widgetHandlers)

    if (!['INFO', 'MAP'].includes(props.selectedWidget)) {
      buttons.vert = []
    }

    return (
      <Draggable handle=".header">
        <div className="pt-card upper-right show">
          <WidgetType
            data={props.photoData}
            albums={props.albums}
            taglist={props.taglist}
            widgetHandlers={widgetHandlers}
          />
          <Buttons buttons={buttons}
            widget={props.selectedWidget}
            widgetHandlers={this.widgetHandlers}
          />
        </div>
     </Draggable>
    )
  }
}
