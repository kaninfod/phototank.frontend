import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox /dist/umd/bundle.min.css';
import React from 'react';

export default class Zoombox extends React.Component {
  constructor(props) {
    super(props);
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
    this.state = {
      photos: this.props.photos,
      isOpen: false,
      index: this.props.index,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index,
    });
  }

  moveNext() {
    this.setState({ index: (this.state.index + 1) % this.props.photos.size });
  }

  movePrev() {
    this.setState({
        index: (this.state.index + this.props.photos.size - 1) % this.props.photos.size,
      });
  }

  render () {
    if (this.props.isOpen) {
      const index = this.state.index;
      const currentPhoto = this.props.photos.get(index);
      const nextPhoto = this.props.photos.get((index + 1) % this.props.photos.size);
      const prevPhoto = this.props.photos.get((index - 1) % this.props.photos.size);

      return (
        <Lightbox
          style="z-index: 2000;"
          mainSrc={currentPhoto.get('url_lg').concat('?token=', sessionStorage.jwt)}
          nextSrc={nextPhoto.get('url_lg').concat('?token=', sessionStorage.jwt)}
          prevSrc={prevPhoto.get('url_lg').concat('?token=', sessionStorage.jwt)}
          nextSrcThumbnail={nextPhoto.get('url_tm').concat('?token=', sessionStorage.jwt)}
          prevSrcThumbnail={prevPhoto.get('url_tm').concat('?token=', sessionStorage.jwt)}

          onCloseRequest={this.props.hideZoombox}
          onMovePrevRequest={this.movePrev}
          onMoveNextRequest={this.moveNext}
          imageTitle={currentPhoto.get('date_taken')}
          />
      );
    } else {
      return null;
    }
  }
}
