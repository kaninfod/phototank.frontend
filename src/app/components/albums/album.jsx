import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import styles from '../../stylesheets/card';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div class={styles.ptCard}>
        <img src={this.props.album.get('cover_url').concat('?token=', sessionStorage.jwt)}></img>
          <div class={styles.title}>
            <div class={styles.alignleft}>
              <p>{this.props.album.get('name')}</p>
              <p>{this.props.album.get('size')}</p>
            </div>
            <div class={styles.alignright}>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <MenuItem
                  containerElement={ <Link to={'/albums/'.concat(this.props.album.get('id'), '/photos') }/> }
                  primaryText="View photos" />

                <MenuItem
                  containerElement={ <Link to={'/albums/edit/'.concat(this.props.album.get('id')) }/> }
                  primaryText="Edit" />

                <MenuItem
                  onClick={() => this.props.deleteAlbum(this.props.album.get('id'))}
                  primaryText="Delete" />

                <MenuItem primaryText="Jobs" />
                <MenuItem primaryText="Update" />
                <MenuItem primaryText="Stats" />
              </IconMenu>
            </div>
          </div>

      </div>
    );
  }
}

export default Album;
