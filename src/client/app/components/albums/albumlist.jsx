import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Album from './album';
import './card';
import { fetchAlbums } from '../../redux/album';

@connect((store) => {
  return {
    albums: store.nAlbum.get('albums'),
  };
})
class AlbumList extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchAlbums());
  }

  render() {

    const menuActions = {

    }

    return (
      <div>
        <Link to="/albums/new">
          <FloatingActionButton
            class="fab">
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <List albums={ this.props.albums } menuActions={menuActions}/>
      </div>
    );
  }
}

function List(props) {
  return (
    <div>
      {props.albums.map(album => {
        return <Album
          id={album.get('id')}
          key={album.get('id')}
          album={album}
          />
          }
        )
      }
    </div>
  );
}

export default AlbumList;
