
import React from 'react';
import LazyLoad from 'react-lazy-load';
import cx from 'classnames';
import { browserHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import { getFacet } from '../../../redux/photo';

import styles from './widget.scss'

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.handleHover = this.handleHover.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.state = {
      buttonState: 'hide',
    };
  }

  // handleHover(e) {
  //   var overlayButton = $(this.refs.widget).find('.overlay-button:not(.overlay-processing)');
  //   if (e.type == 'mouseenter') {
  //     overlayButton.addClass('overlay-show');
  //   } else {
  //     overlayButton.removeClass('overlay-show');
  //   }
  // }

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

  _buttonClass(bucket) {
    const _isBucket = bucket && this.props.actions.FACETS('Bucket', this.props.photo.get('id'));
    const _isSelected = this.props.selected;
    return _isBucket || _isSelected;
  }

  _bucketState() {
    return getFacet('BucketFacet', this.props.photo) ? true : false;
  }

  _likeState() {
    return getFacet('LikeFacet', this.props.photo) ? true : false;
  }

  _photoUrl() {

    return this.props.photo.get('url_tm').concat('?token=', sessionStorage.jwt);
  }

  render() {
    const props = this.props;
    const photo = props.photo;
    return (

        <div
          className={styles.photoWidget}
          id={photo.get('id')} ref="widget"
          onClick={this.clickPhoto.bind(this)} >

              <LazyLoad offsetVertical={300} height={125}>
                <img
                  id={photo.get('id')}
                  onClick={this.handleClick}
                  src= {this._photoUrl()} />
              </LazyLoad>

              <div className={styles.date}>{photo.get('date_taken_formatted')}</div>

              <div className={styles.buttonContainer}>

                <Button selected={this._bucketState()} visible={this.props.selected} onClick={this.handleSelect} >
                  done
                </Button>

                <Button visible={this.props.selected} onClick={this.handleZoom} >
                  zoom_in
                </Button>

                <Button selected={this._likeState()} visible={this.props.selected} onClick={this.handleLike} >
                  thumb_up
                </Button>

                <Button visible={this.props.selected} onClick={this.handleDelete} >
                  delete
                </Button>

                <Link to={'/photos/'.concat(photo.get('id'))}>
                  <Button
                    visible={this.props.selected}  >
                    menu
                  </Button>
                </Link>

                <Button visible={this.props.selected}  >
                  share
                </Button>
            </div>

        </div>

      );
  }
}

function Button(props) {
  let _class = cx(styles.iconToggleContainer,
                { [styles.visible]: props.visible,
                  [styles.selected]: props.selected, });
  return (
    <div className={_class}>
      <div className={styles.iconToggle} onClick={props.onClick}>
        <i class={[styles.materialIcons, styles.md18].join(' ')}>
          {props.children}
        </i>
      </div>
    </div>
);


}
