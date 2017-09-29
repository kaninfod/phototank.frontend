import React from 'react';
import styles from './photodetail.scss';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { getFacet } from '../../../redux/photo';
import { TagWidget } from './tagwidget';
import { TagInput } from './tagwidget';
import { AlbumWidget } from './albumwidget';
import { RotateWidget } from './rotatewidget';
import { ShareWidget } from './sharewidget';

export class PhotoActions extends React.Component {
  constructor(props) {
    super(props);
    this.likeState = this.likeState.bind(this);
    this.handleActionButton = this.handleActionButton.bind(this);
    this.state = {
      showTagInput: false,
      showAlbumInput: false,
      showRotateInput: false,
      showShareInput: false,
    };
  }

  likeState() {
    if (!this.props.bucketMode) {
      return !!getFacet('LikeFacet', this.props.photo);
    }
  }

  handleActionButton(event) {
    const _action = event.currentTarget.dataset.action;
    this.setState({
      showShareInput:  _action == 'share'  ? true : false,
      showAlbumInput:  _action == 'album'  ? true : false,
      showTagInput:    _action == 'tag'    ? true : false,
      showRotateInput: _action == 'rotate' ? true : false,
    });
  }

  render () {
    return (
      <div className={styles.actions}>
        <div class={styles.title}>Actions</div>
        <div class={styles.widgetContainer}>
          <ActionButtons
            {...this.props}
            likeState={this.likeState}
            handleActionButton={this.handleActionButton}
            />
          <div className={styles.actionContainer}>

            <AlbumWidget
              {...this.props}
              show={this.state.showAlbumInput}
              />

            <RotateWidget
              {...this.props}
              show={this.state.showRotateInput}/>

            <TagInput
              {...this.props}
              show={this.state.showTagInput}
              />

            <ShareWidget
              {...this.props}
              show={this.state.showShareInput}
              />

            <TagWidget
              {...this.props}
              />

          </div>
        </div>
      </div>
    );
  }
}

function ActionButtons(props) {
  const _active = { color: 'green' };
  const _inactive = { color: '#9ea7aa' };
  const _like = props.likeState() ? _active : _inactive;

  const _actionButtonsData = [
    {
      tooltip: 'Like photo',
      style: _like,
      action: props.actions.handleLike,
      icon: 'thumb_up',
    },
    {
      tooltip: 'Unlike photo',
      style: _like,
      action: props.actions.handleUnlike,
      icon: 'thumb_down',
      hide: !props.bucketMode,
    },
    {
      tooltip: 'Tag photo',
      action: props.handleActionButton,
      icon: 'local_offer',
      dataAction: 'tag',
    },
    {
      tooltip: 'Add to album',
      action: props.handleActionButton,
      icon: 'photo_album',
      dataAction: 'album',
    },
    {
      tooltip: 'Rotate photo',
      action: props.handleActionButton,
      icon: 'rotate_right',
      dataAction: 'rotate',
    },
    {
      tooltip: 'Share photo',
      action: props.handleActionButton,
      icon: 'share',
      dataAction: 'share',
    },
    {
      tooltip: 'Clear bucket',
      action: props.actions.handleClear,
      icon: 'remove_shopping_cart',
      hide: !props.bucketMode,
    },
  ];

  const _actionButtons = _actionButtonsData.map(actionButton =>
    ActionButton(actionButton)
  );

  return (
    <div className={styles.actionButtons}>
      {_actionButtons}
    </div>

  );
}

function ActionButton(props) {
  if (props.hide) { props.style = { display: 'none' }; };

  return (
    <div key={props.tooltip}>
      <IconButton
        tooltip={props.tooltip}
        tooltipPosition="top-left"
        style={props.style || null}
        data-action={props.dataAction || null}
        onClick={props.action}>
        <i class={styles.materialIcons}>{props.icon}</i>
      </IconButton>
    </div>
  );
}
