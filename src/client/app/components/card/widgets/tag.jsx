import React from 'react';
import { Header } from './header';

import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.renderChip = this.renderChip.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
    this.state = {
      searchText: '',
    };
  }

  addTag(tag, index) {
    if (typeof (tag) == 'string') {
      this.props.widgetHandlers.ADDTAG(tag);
    } else {
      this.props.widgetHandlers.ADDTAG(tag.text);
    }

    this.setState({ searchText: '' });
  }

  removeTag(tag) {
    this.props.widgetHandlers.REMOVETAG(tag.label);
  }

  handleSearchText(searchText) {
    this.setState({ searchText: searchText });
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.removeTag(data)}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    if ('bucket' in this.props.data) {
      var photoId = 0;
    } else {
      var photoId = this.props.data.photo.id;
    }

    const taglist = this.props.data.taglist.map(tag =>  ({ text: tag.name, value: tag.id }));
    const tags = this.props.data.photo.tags.map(tag =>  (this.renderChip({ label: tag.name, key: tag.id })));

    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Add tag to photo"/>
        <div className="pt-widget content">
          <div className="pt-tags">
            <AutoComplete
                 hintText="Add tag"
                 filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                 dataSource={taglist}
                 onNewRequest={this.addTag}
                 searchText={this.state.searchText}
                 onUpdateInput={this.handleSearchText}
               />
             {tags}
          </div>
        </div>
      </div>
    );
  }
}
// <PhotoTagger photoId={photoId} tags={this.props.data.tags}/>
