import React from 'react';
import './styles';
import PhotoInfo from '../widgets/photoInfo';
import BucketInfo from '../widgets/bucketInfo';
import { likePhoto } from '../../redux/photo';
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

  _panelClassName() {
    const openState = (this.state.open ? 'open' : '');
    return 'panel'.concat(' ', openState, ' ', this.state.size);
  }

  render () {
    const Widget = widgets[this.state.widget];

    return (
    <div id="panel" className={this._panelClassName()}>
      <div className="title" >
        <p> {this.state.title} </p>
        <span onClick={this._hidePanel.bind(this)}> > </span>
      </div>
      <div className="content">
        <Widget
          widgetData={this.dataProvider()} />
      </div>
    </div>);
  }

  dataProvider() {
    switch (this.state.widget) {
      case 'PHOTO_INFO': {
        return {
          photo: this.props.photo,
          taglist: this.props.taglist,
          albums: this.props.albums,
          actions: {
            photoLike: this.photoLike.bind(this),
            photoComment: this.photoLike.bind(this),
            photoTag: this.photoLike.bind(this),
            photoRotate: this.photoLike.bind(this),
            photoDelete: this.photoLike.bind(this),
            photoAlbumAdd: this.photoLike.bind(this),
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
            bucketAlbumAdd: this.photoLike.bind(this),
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




}

export default Panel;
