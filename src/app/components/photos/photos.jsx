import React from 'react';
import { connect } from "react-redux";
import Grid from './photogrid/grid';
import SearchPanel from './photogrid/searchpanel';
import Zoombox from './photogrid/zoombox';
import { fetchCities, fetchCountries } from '../../redux/location';
import {
  togglePhotosBucket,
  fetchPhotos,
  deletePhoto,
  fetchBucket ,
  fetchTaglist,
  likePhoto,
} from '../../redux/photo';
import { fetchAlbums, addPhotoAlbum, addBucketAlbum } from '../../redux/album';

@connect((store) => {
  return {
    lastPage:        store.nPhoto.getIn(['pagination', 'last_page']),
    page:            store.nPhoto.getIn(['pagination', 'next_page']),
    photos:          store.nPhoto.get('photos'),
    bucket:          store.nPhoto.get('bucket'),
    taglist:         store.nPhoto.get('taglist'),
    countries:       store.nLocation.get('countries').toJS(),
    albums:          store.nAlbum.get('albums'),
    currentUser:     store.nAuth.get('user'),
    initialLoad:     store.app.get('initialLoad'),
    loading:         store.app.getIn(['loadingStates', 'photoGrid']),
    showSearchPanel: store.ui.get('showSearchPanel'),
    selectedPhoto:   store.ui.get('selectedPhoto'),
  };
})
class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.changeSearchParams    = this.changeSearchParams.bind(this)
    this.hideZoombox           = this.hideZoombox.bind(this);
    this.updateGrid            = false;
    this.state = {
      zoomboxOpen: false,
      zoomboxIndex: 0,
      searchParams: {
        startdate: new Date(),
        country: -1,
        direction: false,
        like: false,
        tags: [],
        photosPerPage:150,
      },
    };
  };

  componentWillMount() {
    this.props.dispatch(fetchPhotos({
      context: this.props.context,
      contextId: this.props.contextId,
      searchParams: this.state.searchParams,
      page: 1,
    }));
  }

  componentWillUpdate(nextProps, nextState){
    if (this.updateGrid) {
      this.updateGrid = false;
      this.props.dispatch(fetchBucket());
      this.props.dispatch(fetchPhotos({
        noCache: true,
        context: this.props.context,
        contextId: this.props.contextId,
        searchParams: this.state.searchParams,
        page: 1,
      }))
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.initialLoad && nextProps.photos.size > 0) {
      this.props.dispatch({type: 'TOGGLE_INITIAL_LOAD'});
      this.props.dispatch(fetchBucket());
      this.props.dispatch(fetchTaglist())
      this.props.dispatch(fetchAlbums())
      this.props.dispatch(fetchCountries());
      this.props.dispatch(fetchCities());
    }
  }

  handleClick(photoId) {
    this.props.dispatch({
      type: 'SELECT_PHOTO',
      photoId: photoId
    })
  }

  handleInfiniteScroll() {
    this.props.dispatch(fetchPhotos({
      noCache: true,
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

  showZoombox(photoId) {
    var index = this.props.photos.findIndex(obj =>  obj.get('id') === photoId );
    this.setState({ zoomPhotoId: photoId, zoomboxOpen: true, zoomboxIndex: index });
  }

  hideZoombox() {
    this.props.dispatch({ type: 'HIDE_APPBAR', status: false });
    this.setState({ zoomboxOpen: false });
  }

  toggleSearchPanel() {
    this.props.dispatch({type: 'TOGGLE_SEARCHPANEL'});
  }

  render () {
    var searchParams = this.state.searchParams

    const photoActions = {
      DELETE:     this.deletePhoto.bind(this),
      TOGGLE:     this.toggleBucketPhoto.bind(this),
      CLICK:      this.handleClick.bind(this),
      ZOOM:       this.showZoombox.bind(this),
      SCROLL:     this.handleInfiniteScroll.bind(this),
      LIKE:       this.likePhoto.bind(this),
    }

    return (
      <div>
        <Grid
          searchParams={searchParams}
          photos={this.props.photos}
          lastPage={this.props.lastPage}
          loading={this.props.loading}
          photoActions={photoActions}
          selectedPhoto={this.props.selectedPhoto}
        >

          <SearchPanel
            show={this.props.showSearchPanel}
            toggleVisibility={this.toggleSearchPanel.bind(this)}
            searchParams={this.state.searchParams}
            changeSearchParams={this.changeSearchParams}
            countries={this.props.countries}
            />

          <Zoombox
            {...this.props}
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

  /**
   *        DISPATCH FUNCTIONS
   *  Dispatch functions for single photos
   **/
    //Photo
    toggleBucketPhoto(photoId, state) {
      this.props.dispatch(togglePhotosBucket(photoId))
      const payload = {
        type: 'SHOW_MESSAGE',
        message: state ? 'You selected a photo' : 'You unselected a photo',
        timeout: 1500,
      }
      this.props.dispatch(payload)
    }

    likePhoto(photoId, state) {
      this.props.dispatch(likePhoto(photoId))
      const payload = {
        type: 'SHOW_MESSAGE',
        message: state ? 'You liked a photo' : 'You unliked a photo',
        timeout: 1500, }
      this.props.dispatch(payload)
    }

    deletePhoto(photo) {
      const id = typeof photo == 'number' ? photo : this.props.photo.get('id')
      this.props.dispatch(deletePhoto(id))
    }
}


export default Photos;
