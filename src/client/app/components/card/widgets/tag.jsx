import React from 'react';
import { Header } from './header';
import PhotoTagger from '../../tagger/photoTagger';

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if ('bucket' in this.props.data) {
      var photoId = 0
    } else {
      var photoId = this.props.data.photo.id
    }

    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Add tag to photo"/>
        <div className="pt-widget content">
          <div className="pt-tags">
            <PhotoTagger photoId={photoId} tags={this.props.data.tags}/>
          </div>
        </div>
      </div>
    );
  }
}
