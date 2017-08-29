import React from 'react';
import LazyLoad from 'react-lazy-load';
import Button from './button';
import Zoom from './ic_zoom.svg';
import More from './ic_menu.svg';
import Delete from './ic_delete.svg';
import Check from './ic_check_circle.svg';
import Like from './ic_thumb_up.svg';
import { browserHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.state = {
      buttonState: 'hide',
    };
  }

  handleHover(e) {
    var overlayButton = $(this.refs.widget).find('.overlay-button:not(.overlay-processing)');
    if (e.type == 'mouseenter') {
      overlayButton.addClass('overlay-show');
    } else {
      overlayButton.removeClass('overlay-show');
    }
  }

  handleSelect(e) {
    this.props.actions.TOGGLE(this.props.photo.get('id'));
  }

  handleLike(e) {
    this.props.actions.LIKE(this.props.photo.get('id'));
  }

  handleZoom(e) {
    this.props.actions.ZOOM(this.props.photo.get('id'));
  }

  handleDelete(e) {
    this.props.actions.DELETE(this.props.photo.get('id'));
  }

  handleClick(e) {
    this.props.actions.CLICK(this.props.photo.get('id'));
  }

  clickPhoto(e) {
    this.setState({ buttonState: 'show' });
  }

  handleShowMore(e) {
    // browserHistory.push('/albums/list');
    // this.props.actions.SHOWMORE(this.props.photo.get('id'));
  }

  _buttonClass(bucket) {
    const _isBucket = bucket && this.props.actions.FACETS('Bucket', this.props.photo.get('id'));
    const _isSelected = this.props.selected;
    return _isBucket || _isSelected;
  }

  _bucketState() {
    return this.props.actions.FACETS('Bucket', this.props.photo.get('id')) ? true : false;
  }

  _likeState() {
    return this.props.actions.FACETS('Like', this.props.photo.get('id')) ? true : false;
  }

  _photoUrl() {

    return this.props.photo.get('url_tm').concat('?token=', sessionStorage.jwt);
  }

  render() {
    const props = this.props;
    const photo = props.photo;
    return (

        <div
          className={'hoverable photo-widget z-depth-1 '}
          id={photo.get('id')} ref="widget"
          onClick={this.clickPhoto.bind(this)} >

              <LazyLoad offsetVertical={300} height={125}>
                <img
                  id={photo.get('id')}
                  onClick={this.handleClick}
                  src= {this._photoUrl()} />
              </LazyLoad>

              <div className="date">{photo.get('date_taken_formatted')}</div>

              <div className='button-container'>

                <Button selected={this._bucketState()} visible={this.props.selected} onClick={this.handleSelect} >
                  <Check/>
                </Button>

                <Button visible={this.props.selected} onClick={this.handleZoom} >
                  <Zoom/>
                </Button>

                <Button selected={this._likeState()} visible={this.props.selected} onClick={this.handleLike} >
                  <Like/>
                </Button>

                <Button visible={this.props.selected} onClick={this.handleDelete} >
                  <Delete/>
                </Button>

                <Link to={'/photos/'.concat(photo.get('id'))}>
                  <Button
                    visible={this.props.selected}  >
                    <More/>
                  </Button>
              </Link>
            </div>

        </div>

      );
  }
}
