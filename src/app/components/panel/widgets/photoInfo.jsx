import React from 'react';
import './photoInfo.scss';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { getFacet } from '../../../redux/photo';

export default class PhotoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (!this.props.widgetData.photo) { return null; };

    const _data = this.props.widgetData.photo;
    return (
      <div className="photo-info">


        <div className="photo">
          <img src={_data.get('url_md').concat('?token=', sessionStorage.jwt)} />
        </div>

        <div className="widgets">
          <CommentWidget widgetData={this.props.widgetData} />
          <InfoWidget widgetData={this.props.widgetData} />
          <TagWidget widgetData={this.props.widgetData} />
          <AlbumWidget widgetData={this.props.widgetData} />
        </div>

      </div>
    );

  }
}

class CommentWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    const _data = this.props.widgetData.photo;
    const _comments = getFacet('Comment', _data);
    this.state = {
      showAllComments: false,
      data: _data,
      commets: _comments,
      commentCount: _comments.size,
      commentToggleState: 'keyboard_arrow_up',
      commentText: '',
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ commentCount: getFacet('Comment', nextProps.widgetData.photo).size, });
  }

  toggleComments() {
    let _chevronState = false;
    if (this.state.commentToggleState == 'keyboard_arrow_down') {
      _chevronState = 'keyboard_arrow_up';
    } else {
      _chevronState = 'keyboard_arrow_down';
    }

    this.setState({
      showAllComments: !this.state.showAllComments,
      commentToggleState: _chevronState,
    });
  }

  handleAddComment(e) {
    if (e.keyCode == 13) {
      this.props.widgetData.actions.photoComment({
        photoId: this.props.widgetData.photo.get('id'),
        comment: this.state.commentText,
      });

      this.setState({ commentText: '' });
    }
  }

  handleChangeComment(e, newValue) {
    this.setState({ commentText: newValue, });
  }

  _getComments() {
    const _data = getFacet('Comment', this.props.widgetData.photo);
    if (this.state.showAllComments) {
      return _data.slice().reverse();
    } else {
      return _data.size == 0 ? _data : [_data.get(_data.size - 1)];
    };
  }

  _renderComments() {
    return this._getComments().map(c =>
      <div className="comment" key={c.get('id')}>
        <img src={c.getIn(['user', 'avatar']).concat('?token=', sessionStorage.jwt)} />
        <p id="comment-user"> {c.getIn(['user', 'email'])} </p>
        <p id="comment-date"> {c.get('created')} </p>
        <p id="comment-text"> {c.get('name')} </p>
      </div>
    );
  }

  render () {
    return (
      <div className="comments">
        <TextField
          onKeyDown={this.handleAddComment}
          hintText="Add a comment..."
          value={this.state.commentText}
          onChange={this.handleChangeComment}
        />
        <div class="toggle-comments" onClick={ this.toggleComments }>
          <div>
            {this.state.commentCount} comments
            <i class="material-icons">{ this.state.commentToggleState }</i>
          </div>
        </div>
        {this._renderComments()}
      </div>
    );
  }
}

export class InfoWidget extends React.Component {
  render () {
    const _data = this.props.widgetData.photo;
    return (
      <div className="info">
        <div className="table">
          <div className="row">
            <div className="cell">Date:</div>
            <div className="cell"> {_data.get('date_taken_formatted')} </div>
          </div>

          <div className="row">
            <div className="cell">Camera:</div>
            <div className="cell">{_data.get('make').concat(' ', _data.get('model'))}</div>
          </div>

          <div className="row">
            <div className="cell">Country:</div>
            <div className="cell">{_data.getIn(['location', 'country_name'])}</div>
          </div>

          <div className="row">
            <div className="cell">City:</div>
            <div className="cell">{_data.getIn(['location', 'city_name'])}</div>
          </div>

          <div className="row">
            <div className="cell">Adderss:</div>
            <div className="cell">{_data.getIn(['location', 'address'])}</div>
          </div>

          <div className="row">
            <div className="cell">Id:</div>
            <div className="cell">{_data.get('id')}</div>
          </div>
        </div>
      </div>
    );
  }
}

class TagWidget extends React.Component {
  constructor(props) {
    super(props);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleTagSearchText = this.handleTagSearchText.bind(this);

    this.state = {
      albumSearchText: '',
      tagSearchText: '',
    };
  }

  renderChip(data) {
    const styles = { margin: 4, };
    return (
     <Chip style={styles} key={data.key} onRequestDelete={() => this.removeTag(data)} >
       {data.label}
     </Chip>
   );
  }

  addTag(tag, index) {
    const _name = index == -1 ? tag : tag.name;
    const payload = { photoId: this.props.widgetData.photo.get('id'), name: _name, };
    this.props.widgetData.actions.photoAddTag(payload);

    this.setState({ tagSearchText: '' });
  }

  removeTag(tag) {
    const payload = { photoId: this.props.widgetData.photo.get('id'), tagId: tag.key, };
    this.props.widgetData.actions.photoRemoveTag(payload);
  }

  handleTagSearchText(searchText) {
    this.setState({ tagSearchText: searchText });
  }

  render () {
    const taglist = this.props.widgetData.taglist.toJS();
    const _data = this.props.widgetData.photo;
    const photoTags = getFacet('Tag', _data).map(tag =>
     (this.renderChip({ label: tag.get('name'), key: tag.get('id') }))
    );

    const dataSourceConfig = { text: 'name', value: 'id' };

    return (
      <div className="tags">
        <AutoComplete
            hintText="Add tag"
            filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
            dataSource={taglist}
            dataSourceConfig={dataSourceConfig}
            onNewRequest={this.addTag}
            searchText={this.state.tagSearchText}
            onUpdateInput={this.handleTagSearchText}
          />
        <div className="tag-container">
          {photoTags}
        </div>
       </div>

    );
  }
}

class AlbumWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleAlbumSelected = this.handleAlbumSelected.bind(this);
    this.handleAlbumSearchText = this.handleAlbumSearchText.bind(this);

    this.state = {
      albumSearchText: '',
    };
  }

  handleAlbumSearchText(searchText) {
    this.setState({ albumSearchText: searchText });
  }

  handleAlbumSelected(chosenRequest, index) {
    const payload = { albumId: chosenRequest.id, photoId: this.props.widgetData.photo.get('id') };
    this.props.widgetData.actions.photoAlbumAdd(payload);
    this.setState({ albumSearchText: '' });
  }

  render () {
    const _data = this.props.widgetData.photo;
    const albums = this.props.widgetData.albums.toJS();
    const dataSourceConfig = { text: 'name', value: 'id' };

    return (
      <div className="add-to-album">
        <AutoComplete
             hintText="Add to album..."
             filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
             dataSource={albums}
             dataSourceConfig={dataSourceConfig}
             onNewRequest={this.handleAlbumSelected}
             searchText={this.state.albumSearchText}
             onUpdateInput={this.handleAlbumSearchText}
             targetOrigin={{ horizontal: 'left', vertical: 'bottom', }}
             anchorOrigin={{ horizontal: 'left', vertical: 'bottom', }}
             maxSearchResults={5}
           />
      </div>
    );
  }
}
