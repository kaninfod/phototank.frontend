import React from 'react';
import { connect } from "react-redux"
import AppConstants from '../../../constants/constants.js'
import Draggable, {DraggableCore} from 'react-draggable';
import {getButtons} from './button.props.js'
import { Buttons, Info, Rotate, Albums, Comments, Tag, Map } from '../widgets'
import '../styles/card.scss'
import {
  addPhotoAlbum,
  // fetchAlbums,
} from '../../../redux/album'
import {
  // fetchPhoto,
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
    photo: store.nPhoto.get('photo'),
    photoData: store.nPhoto.get('photoData'),
    albums: store.nAlbum.get('albums'),
    taglist: store.nPhoto.get('taglist'),
    currentUser: store.nAuth.get('user'),
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

  componentWillReceiveProps(nextProps){
    if (this.props.photo !== nextProps.photo) {
      this.setState({ hidden: false });
    }
  }

  setWidget(widget) {
    this.props.dispatch(setWidget(widget.target.dataset.widget))
  }

  addToAlbum(albumId) {
    var payload = {
      photoId: this.props.photo.get('id'),
      albumId: albumId
    }
    this.props.dispatch(addPhotoAlbum(payload))
  }

  rotatePhoto(rotation) {
    var payload = {
      photoId: this.props.photo.get('id'),
      rotation: rotation
    }
    this.props.dispatch(rotatePhoto(payload))
  }

  addComment(comment) {
    var payload = {
      photoId: this.props.photo.get('id'),
      comment: comment
    }
    this.props.dispatch(commentPhoto(payload))
  }

  addTag(tag) {
    this.props.dispatch(addTagPhoto({photoId: this.props.photo.get('id'), name: tag}))
  }

  removeTag(tagId) {
    this.props.dispatch(removeTagPhoto({photoId: this.props.photo.get('id'), tagId: tagId}))
  }

  deletePhoto() {
    this.props.dispatch(deletePhoto(this.props.photo.get('id')))
    this.hide()
  }

  hide() {
    this.setState({ hidden: !this.state.hidden });
  }

  likePhoto() {
    this.props.dispatch(likePhoto(this.props.photo.get('id')))
  }

  likeState() {
    if (this.props.photo.get('like')) { return "green" } else {return "blue-grey lighten-2"}
  }

  dataProvider() {
    switch (this.props.selectedWidget) {
      case 'INFO': {
        return {
          photo: this.props.photo
        }
      }

      case 'ALBUMS': {
        return {
          albums: this.props.albums
        }
      }

      case 'COMMENTS': {
        return {
          comments: this.props.photo.get('comments'),
          currentUser: this.props.currentUser,
        }
      }
      case 'TAG': {
        return {
          tags: this.props.photo.get('tags'),
          taglist: this.props.taglist,
        }
      }
      case 'MAP': {
        return {
          url: this.props.photo.getIn(['location', 'map_url'])
        }
      }
    }
  }

  render() {
    if (!this.props.photo.size || this.state.hidden) {
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
            data={this.dataProvider()}
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
