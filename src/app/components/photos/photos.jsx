import React from 'react';
import { connect } from "react-redux";
import Grid         from './photogrid/grid';
import PhotoDialog  from './dialogs/photo';
import BucketDialog from './dialogs/bucket';
import BottomPanel  from './bottom-panel';
import Zoombox      from './photogrid/zoombox';
import { fetchCities, fetchCountries } from '../../redux/location';
import {
  togglePhotosBucket,
  fetchPhotos,
  deletePhoto,
  fetchBucket ,
  fetchTaglist,
  likePhoto,
  rotatePhoto,
  commentPhoto,
  addTagPhoto,
  removeTagPhoto,
  rotateBucketPhotos,
  likePhotosBucket,
} from '../../redux/photo';
import { fetchAlbums, addPhotoAlbum, addBucketAlbum } from '../../redux/album';


@connect((store) => {
  return {
    lastPage:      store.nPhoto.getIn(['pagination', 'last_page']),
    page:          store.nPhoto.getIn(['pagination', 'next_page']),
    photos:        store.nPhoto.get('photos'),
    countries:     store.nLocation.get('countries').toJS(),
    bucket:        store.nPhoto.get('bucket'),
    loading:       store.app.getIn(['loadingStates', 'photoGrid']),
    taglist:       store.nPhoto.get('taglist'),
    albums:        store.nAlbum.get('albums'),
    currentUser:   store.nAuth.get('user'),
  };
})
class Photos extends React.Component {
  constructor(props) {
    super(props);

    this.changeSearchParams    = this.changeSearchParams.bind(this)
    this.hideZoombox           = this.hideZoombox.bind(this);
    // this.toggleBucketPhoto     = this.toggleBucketPhoto.bind(this);
    // this.handleInfiniteScroll  = this.handleInfiniteScroll.bind(this);
    // this.handleClick           = this.handleClick.bind(this);
    // this.deletePhoto           = this.deletePhoto.bind(this);
    // this.showZoombox           = this.showZoombox.bind(this);
    // this.likePhoto             = this.likePhoto.bind(this);
    // this.addToAlbum            = this.addToAlbum.bind(this);
    // this.addTag                = this.addTag.bind(this);
    // this.removeTag             = this.removeTag.bind(this);
    // this.rotatePhoto           = this.rotatePhoto.bind(this);
    // this.addComment            = this.addComment.bind(this);
    // this.toggleDetailsDialogue = this.toggleDetailsDialogue.bind(this)

    this.toggleBucketDialogue  = this.toggleBucketDialogue.bind(this)
    // this.bucketRemovePhoto     = this.bucketRemovePhoto.bind(this)
    // this.bucketDeletePhotos    = this.bucketDeletePhotos.bind(this)
    // this.bucketAddTag          = this.bucketAddTag.bind(this)
    // this.bucketRemoveTag       = this.bucketRemoveTag.bind(this)
    // this.bucketLikePhotos      = this.bucketLikePhotos.bind(this)
    // this.bucketRotatePhotos    = this.bucketRotatePhotos.bind(this)
    // this.bucketAddToAlbum      = this.bucketAddToAlbum.bind(this)
    // this.bucketAddComment      = this.bucketAddComment.bind(this)

    this._getFacet             = this._getFacet.bind(this)

    this.updateGrid            = false;
    this.state = {
      showBucket: false,
      showDetails: false,
      selectedPhoto: null,
      selectedWidget: 'INFO',

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
    this.props.dispatch(fetchPhotos({
      context: this.props.context,
      contextId: this.props.contextId,
      searchParams: this.state.searchParams,
      page: 1,
    }));
    this.props.dispatch(fetchBucket());
    this.props.dispatch(fetchTaglist())
    this.props.dispatch(fetchAlbums())
    this.props.dispatch(fetchCountries());
  }

  componentWillUpdate(nextProps, nextState){
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

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.state.selectedPhoto) {
      this.setState({
        selectedPhoto: this._getPhoto(this.state.selectedPhoto.get('id'), nextProps),
      })
    }
  }

  handleClick(photoId) {
    this.setState({
      selectedPhoto: this._getPhoto(photoId),
      showDetails: true,
      showBucket: false
    })
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

  _getPhoto(photoId, context=this.props) {
    const index = context.photos.findIndex(p => p.get('id') == photoId)
    return context.photos.get(index);
  }

  _getFacet(type, photo=this.state.selectedPhoto) {
    var photo = typeof(photo) == 'number' ? this._getPhoto(photo) : photo
    if (photo) {
      const facets = photo.get('facets', []).filter(f =>
        f.get('type') == type
      )

      if (['Like', 'Bucket'].includes(type)) {
        return facets.get(0, null);
      }
      return facets;
    }
  }

  showZoombox(photoId) {
    var index = this.props.photos.findIndex(obj =>  obj.get('id') === photoId );
    this.setState({ zoomPhotoId: photoId, zoomboxOpen: true, zoomboxIndex: index });
  }

  hideZoombox() {
    this.props.dispatch({ type: 'HIDE_APPBAR', status: false });
    this.setState({ zoomboxOpen: false });
  }

  toggleDetailsDialogue() {
    if (!this.state.showDetails) {
      this.setState({ showDetails: true, showBucket: false });
    } else {
      this.setState({ showDetails: false });
    }
  }

  toggleBucketDialogue() {
    if (!this.state.showBucket) {
      this.setState({ showDetails: false, showBucket: true });
    } else {
      this.setState({ showBucket: false });
    }
  }



  render () {
    var searchParams = this.state.searchParams

    const photoActions = {
      DELETE:     this.deletePhoto.bind(this),
      TOGGLE:     this.toggleBucketPhoto.bind(this),
      CLICK:      this.handleClick.bind(this),
      ZOOM:       this.showZoombox.bind(this),
      SCROLL:     this.handleInfiniteScroll.bind(this),
      ROTATE:     this.rotatePhoto.bind(this),
      ALBUMS:     this.addToAlbum.bind(this),
      COMMENTS:   this.addComment.bind(this),
      ADDTAG:     this.addTag.bind(this),
      REMOVETAG:  this.removeTag.bind(this),
      LIKE:       this.likePhoto.bind(this),
      HIDE:       this.toggleDetailsDialogue.bind(this),
      FACETS:     this._getFacet.bind(this),
    }

    const bucketActions = {
      REMOVE:     this.bucketRemovePhoto.bind(this),
      DELETE:     this.bucketDeletePhotos.bind(this),
      ADDTAG:     this.bucketAddTag.bind(this),
      REMOVETAG:  this.bucketRemoveTag.bind(this),
      LIKE:       this.bucketLikePhotos.bind(this),
      ROTATE:     this.bucketRotatePhotos.bind(this),
      ALBUMS:     this.bucketAddToAlbum.bind(this),
      ADDCOMMENT: this.bucketAddComment.bind(this),
      HIDE:       this.toggleBucketDialogue.bind(this),
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
          <PhotoDialog
            photo={this.state.selectedPhoto}
            photoActions={photoActions}
            show={this.state.showDetails}
            albums={this.props.albums}
            currentUser={this.props.currentUser}
            taglist={this.props.taglist}

          />

          <BucketDialog
            bucketActions={bucketActions}
            show={this.state.showBucket}
            photos={this.props.bucket}
            albums={this.props.albums}
            currentUser={this.props.currentUser}
            taglist={this.props.taglist}
          />

          <BottomPanel
            photos={this.props.bucket}
            countries={this.props.countries}
            searchParams={searchParams}
            changeSearchParams={this.changeSearchParams}
            onRemovePhoto={bucketActions.REMOVE}
            onShowBucket={this.toggleBucketDialogue}
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
   *
   *  Dispatch functions for single photos
   **/
    //Photo
    toggleBucketPhoto(photoId) {
        this.props.dispatch(togglePhotosBucket(photoId))
    }

    addToAlbum(albumId) {
      const payload = {
        photoId: this.state.selectedPhoto.get('id'),
        albumId: albumId
      }
      this.props.dispatch(addPhotoAlbum(payload))
    }

    rotatePhoto(rotation) {
      const payload = {
        photoId: this.state.selectedPhoto.get('id'),
        rotation: rotation
      }
      this.props.dispatch(rotatePhoto(payload))
    }

    addComment(comment) {
      const payload = {
        photoId: this.state.selectedPhoto.get('id'),
        comment: comment
      }
      this.props.dispatch(commentPhoto(payload))
    }

    addTag(tag) {
      const payload = {
        photoId: this.state.selectedPhoto.get('id'),
        name: tag,
      }
      this.props.dispatch(addTagPhoto(payload))
    }

    removeTag(tagId) {
      const payload = {
        photoId: this.state.selectedPhoto.get('id'),
        tagId: tagId,
      }
      this.props.dispatch(removeTagPhoto(payload))
    }

    likePhoto() {
      this.props.dispatch(likePhoto(this.state.selectedPhoto.get('id')))
    }

    deletePhoto(photo) {
      const id = typeof photo == 'number' ? photo : this.state.selectedPhoto.get('id')
      this.props.dispatch(deletePhoto(id))
    }

  /**
   *  Dispatch functions for entire bucket
   **/
    bucketRemovePhoto(id) {
      this.props.dispatch(togglePhotosBucket(id));
    }

    bucketDeletePhotos() {
      console.log('delete photos');
    }

    bucketAddTag(tag) {
      this.props.dispatch(tagPhotosBucket(tag));
    }

    bucketRemoveTag() {
      console.log('remove photos');
    }

    bucketLikePhotos() {
      const photoIds = this.props.bucket.map(p => p.get('id')).toJS()
      this.props.dispatch(likePhotosBucket(photoIds));
    }

    bucketRotatePhotos(degrees) {
      this.props.dispatch(rotateBucketPhotos(degrees))
    }

    bucketAddToAlbum(albumId) {
      this.props.dispatch(addBucketAlbum(albumId));
    }

    bucketAddComment(comment) {
      this.props.dispatch(commentPhotosBucket(comment));
    }
}

Photos.defaultProps = {
  page: 1,
};

export default Photos;
