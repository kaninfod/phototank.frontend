import '../styles/card.scss';
import '../../../stylesheets/bucket';
import React from 'react';
import { connect } from 'react-redux'
import AppConstants from '../../../constants/constants';
import Draggable, { DraggableCore } from 'react-draggable';
import { getButtons } from './bucket-button.props';
import { Buttons, Bucketgrid, Rotate, Albums, Comments, Tag } from '../widgets';
import { addCommentToPhotosInBucket,
  rotatePhotosInBucket,
  likePhotosInBucket,
  addBucketToAlbum,
  loadBucket,
  loadAlbums,
  setWidget } from '../../../actions/actBucket';


const components = {
  BUCKETGRID:   Bucketgrid,
  ROTATE:   Rotate,
  ALBUMS:   Albums,
  COMMENTS: Comments,
  TAG:      Tag,
  DELETE:   'Delete',
  LIKE:     'Like'
};

@connect((store) => {
  return {
    selectedWidget: store.bucket.get('selectedWidget'),
    data: store.bucket.get('data').toJS(),
  };
})
export default class Bucket extends React.Component {
  constructor(props) {
    super(props);
    this.handleWidget = this.handleWidget.bind(this);
    this.addToAlbum = this.addToAlbum.bind(this);
    this.rotatePhotos = this.rotatePhotos.bind(this);
    this.addComment = this.addComment.bind(this);
    this.likePhotos = this.likePhotos.bind(this);
    // this.hide = this.hide.bind(this);
    this.state = {
      hidden: this.props.hidden,
    };
  };

  componentWillMount() {
    this.props.dispatch(loadBucket());
  }

  deletePhotos() {}

  likePhotos() {
    this.props.dispatch(likePhotosInBucket());
  }

  likeState() { }

  rotatePhotos(degrees) {
    this.props.dispatch(rotatePhotosInBucket(degrees))
  }

  addToAlbum(albumId) {
    this.props.dispatch(addBucketToAlbum(albumId));
  }

  addComment(comment) {
    this.props.dispatch(addCommentToPhotosInBucket(comment));
  }

  handleWidget(e) {
    var action = e.target.dataset.widget
    if (action == 'DELETE') {
      // AppActions.deleteCardPhoto({
      //   photoId: this.state.photocard.photo.id
      // });
    } else if (action == 'LIKE') {
      this.props.dispatch(likePhotosInBucket());
    } else {
      this.props.dispatch(setWidget(action))
    }
  }

  render() {

    if (this.props.hidden) { return null}
    const props = this.props
    const buttons = getButtons({ likeState: this.likeState() });
    const WidgetType = components[props.selectedWidget];
    const widgetHandlers = {
      ROTATE:   this.rotatePhotos,
      ALBUMS:   this.addToAlbum,
      COMMENTS: this.addComment,
      HIDE:     this.props.onHideBucket,
      REMOVE_FROM_BUCKET: this.props.onRemovePhoto
    };

    if (!['BUCKETGRID'].includes(props.selectedWidget)) {
      buttons.vert = []
    }

    return (
      <Draggable handle=".header">
        <div className="pt-card upper-right show">
            <WidgetType data={this.props.data} widgetHandlers={widgetHandlers}/>
            <Buttons buttons={buttons}
              widget={this.props.selectedWidget}
              handleWidget={this.handleWidget}/>
          </div>
     </Draggable>
   );
  }
}
