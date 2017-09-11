import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import { getFacet } from '../../../redux/photo';
import styles from './photodetail.scss';

export class TagWidget extends React.Component {
  constructor(props) {
    super(props);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleTagSearchText = this.handleTagSearchText.bind(this);

    this.state = {
      tagSearchText: '',
    };
  }

  renderChip(data) {
    const styles_ = { margin: 4, };
    return (
     <Chip style={styles_} key={data.key} onRequestDelete={() => this.removeTag(data)} >
       {data.label}
     </Chip>
   );
  }

  addTag(tag, index) {
    const _name = index == -1 ? tag : tag.name;
    const payload = { photoId: this.props.photo.get('id'), name: _name, };
    this.props.photoAddTag(payload);

    this.setState({ tagSearchText: '' });
  }

  removeTag(tag) {
    const payload = { photoId: this.props.photo.get('id'), tagId: tag.key, };
    this.props.photoRemoveTag(payload);
  }

  handleTagSearchText(searchText) {
    this.setState({ tagSearchText: searchText });
  }
//
  render () {
    const taglist = this.props.taglist.toJS();
    const _data = this.props.photo;
    const photoTags = getFacet('TagFacet', _data).map(tag =>
     (this.renderChip({ label: tag.get('name'), key: tag.get('id') }))
    );

    const dataSourceConfig = { text: 'name', value: 'id' };

    return (
      <div className={styles.tags}>
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
        <div className={styles.tagContainer}>
          {photoTags}
        </div>
       </div>

    );
  }
}
