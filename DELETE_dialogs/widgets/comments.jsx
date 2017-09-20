import React from 'react';
import { Header } from './header';
import TextField from 'material-ui/TextField';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
    };
  }

  handleKeyDown(event, newValue) {
    if (event.which == 13 && event.target.value.length > 0) {
      this.props.widgetHandlers.COMMENTS(event.target.value);
      event.target.value = '';
    }
  }

  render() {
    const comments = this.props.data.comments;
    const avatar = this.props.data.currentUser.get('avatar').concat('?token=', sessionStorage.jwt);
    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Add comments to Photo"/>
        <div className="pt-widget content">
          <div className="pt-comments">
            <div className="comment">
              <div className="comment-container">
                <div className="card">
                  <p className="comment-date"></p>
                    <TextField
                      fullWidth={true}
                      floatingLabelText="Comment"
                      onKeyDown={this.handleKeyDown}
                    />
                </div>
                <img className="circle responsive-img" src={avatar}/>
              </div>
            </div>
            {comments.slice().reverse().map(comment.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}

var comment = function (comment) {
  const avatar = comment.getIn(['user', 'avatar']).concat('?token=', sessionStorage.jwt);
  return (
    <div className="comment" key={comment.get('id')}>
      <div className="comment-container">
        <div className="card">
          <p className="comment-date">{comment.get('created')}</p>
          <p>{comment.get('name')}</p>
        </div>
        <img className="circle responsive-img" src={avatar}/>
      </div>
    </div>
  );
};
