import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import styles from './card';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.importToCatalog = this.importToCatalog.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      showEdit: false,
    };
  }

  edit() {
    this.props.openEdit(this.props.catalog);
  }

  delete() {
    this.props.delete(this.props.catalog.get('id'));
  }

  importToCatalog() {
    this.props.importToCatalog(this.props.catalog);
  }

  render () {
    return (
      <div className={styles.ptCardCatalog}>
        <img src={this.props.catalog.get('cover_url').concat('?token=', sessionStorage.jwt)}></img>
          <div className={styles.title}>
            <div className={styles.alignleft}>
              <p>{this.props.catalog.get('name')}</p>
              <p>{this.props.catalog.get('type')}</p>
            </div>
            <div className={styles.alignright}>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <MenuItem
                  containerElement={<Link to={'/catalogs/'.concat(this.props.catalog.get('id'), '/photos') }/>}
                  primaryText="View photos" />

                <MenuItem primaryText="Edit" onClick={this.edit}/>
                <MenuItem primaryText="Delete" onClick={this.delete}/>
                <MenuItem primaryText="Jobs" />
                <MenuItem primaryText="Update" onClick={this.importToCatalog}/>
                <MenuItem primaryText="Stats" />
              </IconMenu>
            </div>
          </div>

      </div>
    );
  }
}

export default Catalog;
