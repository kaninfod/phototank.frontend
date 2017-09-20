import React from 'react';
import { BottomSheet, ExpandableBottomSheet } from 'material-ui-bottom-sheet';
import './panel.scss';
import PhotoInfo from './widgets/photoInfo';
import BucketInfo from './widgets/bucketInfo';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { likePhoto, addTagPhoto, removeTagPhoto, commentPhoto } from '../../redux/photo';
import { addPhotoAlbum } from '../../redux/album';
import { connect } from 'react-redux';

const widgets = {
  PHOTO_INFO: PhotoInfo,
  BUCKET_INFO: BucketInfo,
};

@connect((store) => {
  return {
    catalog:            store.nCatalog.get(),
    catalogs:           store.nCatalog.get('catalogs'),
    album:              store.nAlbum.get(),
    albums:             store.nAlbum.get('albums'),
    photo:              store.nPhoto.get('photo'),
    photos:             store.nPhoto.get('photos'),
    countries:          store.nLocation.get('countries'),
    cities:             store.nLocation.get('cities'),
    bucket:             store.nPhoto.get('bucket'),
    taglist:            store.nPhoto.get('taglist'),
    currentUser:        store.nAuth.get('user'),
  };
})

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this._hidePanel = this._hidePanel.bind(this)
    this.state = {
      open: false,
      size: 'small',
      title: 'My widget',
      widget: 'PHOTO_INFO',
      widgetData: null,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      open: nextProps.panel.get('open'),
      size: nextProps.panel.get('size'),
      title: nextProps.panel.get('title'),
      widget: nextProps.panel.get('widget'),
      widgetData: nextProps.panel.get('widgetData'),
    });
  }

  _hidePanel() {
    this.props.dispatch({ type: 'HIDE_PANEL', status: false, });
  }

  render () {
    const Widget = widgets[this.state.widget];
//
    return (
      <ExpandableBottomSheet onRequestClose={this._hidePanel} open={this.state.open}
        bodyStyle={{'marginTop': '70vh'}}>
          <div className="content">
            <Widget widgetData={this.dataProvider()} />
          </div>
      </ExpandableBottomSheet>
    );
  }

  dataProvider() {
    switch (this.state.widget) {
      case 'PHOTO_INFO': {
        return {
          photo: this.props.photo,
          taglist: this.props.taglist,
          albums: this.props.albums,
          currentUser: this.props.currentUser,
          actions: {
            photoLike: this.photoLike.bind(this),
            photoComment: this.photoAddComment.bind(this),
            photoAddTag: this.photoAddTag.bind(this),
            photoRemoveTag: this.photoRemoveTag.bind(this),
            photoRotate: this.photoLike.bind(this),
            photoDelete: this.photoLike.bind(this),
            photoAlbumAdd: this.photoAlbumAdd.bind(this),
          }
        }
      }

      case 'BUCKET_INFO': {
        return {
          bucket: this.props.bucket,
          taglist: this.props.taglist,
          albums: this.props.albums,
          actions: {
            bucketRemovePhoto: this.photoLike.bind(this),
            bucketLike: this.photoLike.bind(this),
            bucketComment: this.photoLike.bind(this),
            bucketTag: this.photoLike.bind(this),
            bucketRotate: this.photoLike.bind(this),
            bucketDelete: this.photoLike.bind(this),
            bucketAlbumAdd: this.photoAlbumAdd.bind(this),
          }
        }
      }

      case 'PHOTO_INFO': {
        return {
          photo: this.props.photo,
          actions: {
            photoLike:this.photoLike.bind(this)
          }
        }
      }

      default:
    }
  }

  photoLike(photoId) {
    this.props.dispatch(likePhoto(photoId))
  }

  photoAlbumAdd(payload) {
    // const payload = {albumId: albumId, photoId: photoId}
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

}

export default Panel;
