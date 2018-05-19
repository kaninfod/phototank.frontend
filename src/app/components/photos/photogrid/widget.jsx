
import React from 'react';
import LazyLoad from 'react-lazy-load';
import ConfirmDelete from '../confirmDelete'
import cx from 'classnames';
import { browserHistory } from 'react-router-dom';
import {
  Link,BrowserRouter as Router, Route
} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import { getFacet } from '../../../redux/photo';
import styles from './widget.scss'

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 'hide',
      confirmDeleteOpen: false,
    };
  }

  handleSelect = (e) =>  {
    this.props.actions.TOGGLE(this.props.photo.get('id'), !this._bucketState());
  }

  handleLike = (e) => {
    this.props.actions.LIKE(this.props.photo.get('id'), !this._likeState());
  }

  handleZoom = (e) => {
    this.props.actions.ZOOM(this.props.photo.get('id'));
  }

  handleDelete = (e) => {
    this.setState({ confirmDeleteOpen: true, });
    //this.props.actions.DELETE(this.props.photo.get('id'));
  }

  handleClick = (e) => {
    // console.log('kaj', this.props);
    // this.props.history.push('/mypath')
    this.props.actions.CLICK(this.props.photo.get('id'));
  }

  // clickPhoto(e) {
  //   this.setState({ buttonState: 'show' });
  // }

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
          // onClick={this.clickPhoto.bind(this)} 
        >

            <ConfirmDelete
              open={this.state.confirmDeleteOpen}
              id={photo.get('id')}
              handleDelete={this.props.actions.DELETE} />

            <Link to={'/photos/view/'.concat(photo.get('id'))}>
              <LazyLoad offset={800} height={125}>
                <img
                  id={photo.get('id')}
                  onClick={this.handleClick}
                  src= {this._photoUrl()} />
              </LazyLoad>

              <div className={styles.date}>{photo.get('date_taken_formatted')}</div>
            </Link>

            <div className={styles.buttonContainer}>

              <RoundButton selected={this._bucketState()} visible={props.selected} onClick={this.handleSelect} >
                done
              </RoundButton>

              <RoundButton visible={props.selected} onClick={this.handleZoom} >
                zoom_in
              </RoundButton>

              <RoundButton selected={this._likeState()} visible={props.selected} onClick={this.handleLike} >
                thumb_up
              </RoundButton>

              {/* <RoundButton visible={props.selected} onClick={this.handleDelete} >
                delete
              </RoundButton> */}

              {/* <Link to={'/photos/view/'.concat(photo.get('id'))}>
                <RoundButton
                  visible={props.selected}  >
                  menu
                </RoundButton>
              </Link> */}

              {/* <RoundButton visible={props.selected}  >
                share
              </RoundButton> */}

              <RoundButton nohover={true} visible={photo.get('status') == 6}  >
                update
              </RoundButton>
            </div>

        </div>

      );
  }
}

function RoundButton(props) {
  let _class = cx(styles.iconToggleContainer,
                { [styles.visible]: props.visible,
                  [styles.selected]: props.selected,
                  [styles.hover]: !props.nohover, });
  return (
    <div className={_class}>
      <div className={styles.iconToggle} onClick={props.onClick}>
        <i class={cx(styles.materialIcons, styles.md18)}>
          {props.children}
        </i>
      </div>
    </div>
  );
}