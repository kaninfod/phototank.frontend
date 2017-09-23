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
    this.handleTagInputState = this.handleTagInputState.bind(this);
    this.handleAlbumInputState = this.handleAlbumInputState.bind(this);
    this.handleRotateInputState = this.handleRotateInputState.bind(this);
    this.handleShareInputState = this.handleShareInputState.bind(this);
    this.state = {
      showTagInput: false,
      showAlbumInput: false,
      showRotateInput: false,
      showShareInput: false,
    };
  }

  likeState() {
    return !!getFacet('LikeFacet', this.props.photo);
  }

  handleTagInputState() {
    this.setState({
      showRotateInput: false,
      showAlbumInput: false,
      showTagInput: !this.state.showTagInput,
      showShareInput: false,
    });

  }

  handleAlbumInputState() {
    this.setState({
      showRotateInput: false,
      showAlbumInput: !this.state.showAlbumInput,
      showTagInput: false,
      showShareInput: false,
    });
  }

  handleRotateInputState() {
    this.setState({
      showRotateInput: !this.state.showRotateInput,
      showAlbumInput: false,
      showTagInput: false,
      showShareInput: false,
    });
  }

  handleShareInputState() {
    this.setState({
      showShareInput: !this.state.showShareInput,
      showAlbumInput: false,
      showTagInput: false,
      showRotateInput: false,
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
            handleTagInputState={this.handleTagInputState}
            handleAlbumInputState={this.handleAlbumInputState}
            handleRotateInputState={this.handleRotateInputState}
            handleShareInputState={this.handleShareInputState}
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

  return (
    <div className={styles.actionButtons}>

      <IconButton
        tooltip="Like photo"
        tooltipPosition="top-left"
        style={_like}
        onClick={props.actions.handleLike}>
        <i class={styles.materialIcons}>thumb_up</i>
      </IconButton>

      <IconButton
        tooltip="Tag photo"
        tooltipPosition="top-left"
        onClick={props.handleTagInputState}>
        <i class={styles.materialIcons}>local_offer</i>
      </IconButton>

      <IconButton
        tooltip="Add to album"
        tooltipPosition="top-left"
        onClick={props.handleAlbumInputState}>
        <i class={styles.materialIcons}>photo_album</i>
      </IconButton>

      <IconButton
        tooltip="Rotate photo"
        tooltipPosition="top-left"
        onClick={props.handleRotateInputState}>
        <i class={styles.materialIcons}>rotate_right</i>
      </IconButton>

      <IconButton
        tooltip="Share photo"
        tooltipPosition="top-left"
        onClick={props.handleShareInputState}>>
        <i class={styles.materialIcons}>share</i>
      </IconButton>

      <IconButton
        tooltip="Delete photo"
        tooltipPosition="top-left"
        onClick={props.actions.handleDelete}>
        <i class={styles.materialIcons}>delete</i>
      </IconButton>
    </div>

  )
}
