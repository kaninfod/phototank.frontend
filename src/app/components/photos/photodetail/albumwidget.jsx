import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export class AlbumWidget extends React.Component {
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
    const payload = { albumId: chosenRequest.id, photoId: this.props.photo.get('id') };
    this.props.photoAlbumAdd(payload);
    this.setState({ albumSearchText: '' });
  }

  render () {
    const _data = this.props.photo;
    const albums = this.props.albums.toJS();
    const dataSourceConfig = { text: 'name', value: 'id' };

    return (
      <div className="album">
        <AutoComplete
             fullWidth
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
