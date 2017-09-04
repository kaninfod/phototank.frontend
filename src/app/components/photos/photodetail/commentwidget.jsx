import React from 'react';
import TextField from 'material-ui/TextField';
import { getFacet } from '../../../redux/photo';

export class CommentWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    const _data = this.props.photo;
    const _comments = getFacet('CommentFacet', _data);
    this.state = {
      showAllComments: false,
      data: _data,
      comments: _comments,
      commentCount: _comments.size,
      commentToggleState: 'keyboard_arrow_up',
      commentText: '',
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const _data = nextProps.photo;
    const _comments = getFacet('CommentFacet', _data);

    this.setState({
      commentCount: _comments.size,
      comments: _comments,
    });
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
      this.props.photoAddComment({
        photoId: this.props.photo.get('id'),
        comment: this.state.commentText,
      });

      this.setState({ commentText: '' });
    }
  }

  handleChangeComment(e, newValue) {
    this.setState({ commentText: newValue, });
  }

  _getComments() {
    const _data = this.state.comments;
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
          fullWidth
          onKeyDown={this.handleAddComment}
          hintText="Add a comment..."
          value={this.state.commentText}
          onChange={this.handleChangeComment}
        />
      <div className="toggle-comments" onClick={ this.toggleComments }>
          <div>
            {this.state.commentCount} comments
            <i class="material-icons">{ this.state.commentToggleState }</i>
          </div>
        </div>
        <div className="comments-container">
          {this._renderComments()}
        </div>
      </div>
    );
  }
}
