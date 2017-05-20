import React from 'react';
import { connect } from "react-redux";
import Grid from '../../components/photogrid/grid';
import PhotoCard from '../../components/card/photo';
import Bucket from '../../components/card/bucket';
import BottomPanel from '../../components/bottom-panel';
import Zoombox from '../../components/photogrid/zoombox';
import { selectPhoto } from '../../actions/actBucket';
import { loadPhotos,
  clickPhoto,
  deletePhoto,
  getPhotos,
  getCountries,
  resetGrid } from '../../actions/actGrid'

@connect((store) => {
  return {
    selectedPhoto: store.grid.get('selectedPhoto'),
    loading: store.grid.get('loading'),
    lastPage: store.grid.getIn(['pagination', 'last_page']),
    page: store.grid.getIn(['pagination', 'next_page']),
    photos: store.grid.get('photos'),
    countries: store.grid.get('countries').toJS(),
    photosBucket: store.bucket.getIn(['data', 'bucket']).toJS(),
  };
})
class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.hideBucket           = this.hideBucket.bind(this);
    this.removeBucketPhoto    = this.removeBucketPhoto.bind(this);
    this.changeSearchParams   = this.changeSearchParams.bind(this)
    this.handleInfiniteScroll = this.handleInfiniteScroll.bind(this);
    this.handleClick          = this.handleClick.bind(this);
    this.handleDelete         = this.handleDelete.bind(this);
    this.handleSelect         = this.handleSelect.bind(this);
    this.showZoombox          = this.showZoombox.bind(this);
    this.hideZoombox          = this.hideZoombox.bind(this);
    this.updateGrid = false;
    this.state = {
      hidden: true,
      zoomboxOpen: false,
      zoomboxIndex: 0,
      searchParams: {
        startdate: new Date(),
        country: 'All',
        direction: false,
        like: false,
        tags: [],
      },
    };
  };

  componentWillMount() {
    console.log('PROPS: ',this.props);
    this.props.dispatch(getCountries());
    this.props.dispatch(getPhotos({
      context: this.props.context,
      contextId: this.props.contextId,
      searchParams: this.state.searchParams,
      page: 1,
    }));
  }

  componentWillUpdate(nextProps, nextState) {

    if (this.updateGrid) {
      this.updateGrid = false;
      this.props.dispatch(getPhotos({
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

  removeBucketPhoto(e) {
      this.props.dispatch(selectPhoto(e.target.dataset.photoid))
  }

  handleInfiniteScroll() {
    this.props.dispatch(getPhotos({
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

  handleSelect(photoId) {
    this.props.dispatch(selectPhoto(photoId))
  }

  handleDelete(photoId) {
    this.props.dispatch(deletePhoto(photoId))
  }

  handleClick(photoId) {
    this.props.dispatch(clickPhoto(photoId))
  }

  showZoombox(photoId) {
    var index = this.props.photos.findIndex(obj => {
      return obj.get('id') === photoId;
    });
    this.setState({ zoomPhotoId: photoId, zoomboxOpen: true, zoomboxIndex: index });
  }

  hideZoombox() {
    this.setState({ zoomboxOpen: false });
  }
  render () {
    var searchParams = this.state.searchParams

    const photoActions = {
      DELETE: this.handleDelete,
      SELECT: this.handleSelect,
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
            onRemovePhoto={this.removeBucketPhoto}/>
          <BottomPanel
            photos={this.props.photosBucket}
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
