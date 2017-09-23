import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import { getFacet } from '../../../redux/photo';
import styles from './photodetail.scss';

export class TagWidget extends React.Component {
  constructor(props) {
    super(props);
    this.removeTag = this.removeTag.bind(this);
  }

  renderChip(data) {
    const styles_ = { margin: 4, };
    return (
     <Chip style={styles_} key={data.key} onRequestDelete={() => this.removeTag(data)} >
       {data.label}
     </Chip>
   );
  }

  removeTag(tag) {
    const payload = { photoId: this.props.photo.get('id'), tagId: tag.key, };
    this.props.actions.handleRemoveTag(payload);
  }

  render () {
    const _data = typeof this.props.photo == 'string' ? [] : this.props.photo;
    const photoTags = getFacet('TagFacet', _data).map(tag =>
     (this.renderChip({ label: tag.get('name'), key: tag.get('id') }))
    );

    return (
      <div className={styles.tags}>
        <div className={styles.tagContainer}>
          {photoTags}
        </div>
      </div>

    );
  }
}

export class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.addTag = this.addTag.bind(this);
    this.handleTagSearchText = this.handleTagSearchText.bind(this);

    this.state = {
      tagSearchText: '',
    };
  }

  addTag(tag, index) {
    const _name = index == -1 ? tag : tag.name;
    const payload = { photoId: this.props.photo.get('id'), name: _name, };
    this.props.actions.handleAddTag(payload);
    this.setState({ tagSearchText: '' });
  }

  handleTagSearchText(searchText) {
    this.setState({ tagSearchText: searchText });
  }

  render() {
    if (!this.props.show) { return null; }

    const taglist = this.props.taglist.toJS();
    const dataSourceConfig = { text: 'name', value: 'id' };
    return (
      <AutoComplete
          fullWidth
          hintText="Add tag"
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          dataSource={taglist}
          dataSourceConfig={dataSourceConfig}
          onNewRequest={this.addTag}
          searchText={this.state.tagSearchText}
          onUpdateInput={this.handleTagSearchText}
        />
    );
  }
}
