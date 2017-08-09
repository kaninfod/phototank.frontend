import React from 'react';
import { connect } from "react-redux";
import Grid from '../../components/photogrid/grid';
import PhotoCard from '../../components/card/photo';
import Bucket from '../../components/card/bucket';
import BottomPanel from '../../components/bottom-panel';
import Zoombox from '../../components/photogrid/zoombox';
import { fetchCities, fetchCountries } from '../../redux/location'
import { fetchPhotos, deletePhoto, fetchBucket } from '../../redux/photo';
import { togglePhotosBucket } from '../../redux/photo';


@connect((store) => {
  return {
    // selectedPhoto: store.nPhoto.get('selectedPhoto'),
    lastPage:      store.nPhoto.getIn(['pagination', 'last_page']),
    page:          store.nPhoto.getIn(['pagination', 'next_page']),
    photos:        store.nPhoto.get('photos'),
    countries:     store.nLocation.get('countries').toJS(),
    bucket:        store.nPhoto.get('bucket'),
    loading:       store.app.getIn(['loadingStates', 'photoGrid']),
  };
})
class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.hideBucket           = this.hideBucket.bind(this);
    this.toggleBucketPhoto    = this.toggleBucketPhoto.bind(this);
    this.changeSearchParams   = this.changeSearchParams.bind(this)
    this.handleInfiniteScroll = this.handleInfiniteScroll.bind(this);
    this.handleClick          = this.handleClick.bind(this);
    this.handleDelete         = this.handleDelete.bind(this);
    this.showZoombox          = this.showZoombox.bind(this);
    this.hideZoombox          = this.hideZoombox.bind(this);
    this.updateGrid = false;
    this.state = {
      hidden: true,
      zoomboxOpen: false,
      zoomboxIndex: 0,
      searchParams: {
        startdate: new Date(),
        country: -1,
        direction: false,
        like: false,
        tags: [],
        photosPerPage:50,
      },
    };
  };

  componentWillMount() {
    this.props.dispatch(fetchCountries());
    this.props.dispatch(fetchBucket());
    this.props.dispatch(fetchPhotos({
      context: this.props.context,
      contextId: this.props.contextId,
      searchParams: this.state.searchParams,
      page: 1,
    }));
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.updateGrid) {
      this.updateGrid = false;
      this.props.dispatch(fetchBucket());
      this.props.dispatch(fetchPhotos({
        context: this.props.context,
        contextId: this.props.contextId,
        searchParams: this.state.searchParams,
        page: 1,
      }))
    }
  }

  hideBucket() {
    this.setState({ hidden: !this.state.hidden });
  }

  toggleBucketPhoto(photoId) {
      this.props.dispatch(togglePhotosBucket(photoId))
  }

  handleInfiniteScroll() {
    this.props.dispatch(fetchPhotos({
      context: this.props.context,
      contextId: this.props.contextId,
      searchParams: this.state.searchParams,
      page: this.props.page,
    }));
  }

  changeSearchParams(key, value) {
    var state = this.state
    state['searchParams'][key] = value
    this.updateGrid = true
    this.setState(state)
  }

  handleDelete(photoId) {
    this.props.dispatch(deletePhoto(photoId))
  }

  handleClick(photo) {
    this.props.dispatch( { type: 'CLICK_PHOTO', payload: photo } )
  }

  showZoombox(photoId) {
    var index = this.props.photos.findIndex(obj =>  obj.get('id') === photoId );
    this.setState({ zoomPhotoId: photoId, zoomboxOpen: true, zoomboxIndex: index });
  }

  hideZoombox() {
    this.setState({ zoomboxOpen: false });
  }
  render () {
    var searchParams = this.state.searchParams

    const photoActions = {
      DELETE: this.handleDelete,
      TOGGLE: this.toggleBucketPhoto,
      CLICK:  this.handleClick ,
      ZOOM:   this.showZoombox,
      SCROLL: this.handleInfiniteScroll,
    }

    return (
      <div>
        <Grid
          searchParams={searchParams}
          photos={this.props.photos}
          lastPage={this.props.lastPage}
          loading={this.props.loading}
          photoActions={photoActions}
        >
          <PhotoCard/>
          <Bucket
            hidden={this.state.hidden}
            onHideBucket={this.hideBucket}
            onRemovePhoto={this.removeBucketPhoto}
          />
          <BottomPanel
            photos={this.props.bucket}
            countries={this.props.countries}
            searchParams={searchParams}
            changeSearchParams={this.changeSearchParams}
            onRemovePhoto={this.removeBucketPhoto}
            onShowBucket={this.hideBucket}
          />
          <Zoombox
            photoId={this.state.zoomPhotoId}
            isOpen={this.state.zoomboxOpen}
            index={this.state.zoomboxIndex}
            photos={this.props.photos}
            hideZoombox={this.hideZoombox}
            />
        </Grid>

      </div>
    );
  }
}

Photos.defaultProps = {
  page: 1,
};

export default Photos;
