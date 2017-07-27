import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.importToCatalog = this.importToCatalog.bind(this);
    this.state = {
      showEdit: false,
    };
  }

  edit() {
    this.props.openEdit(this.props.catalog);
  }

  importToCatalog() {
    this.props.importToCatalog(this.props.catalog);
  }

  render () {
    return (
      <div class="pt-card-catalog">
        <img src={this.props.catalog.get('cover_url').concat('?token=', sessionStorage.jwt)}></img>
          <div class="title">
            <div class="alignleft">
              <p>{this.props.catalog.get('name')}</p>
              <p>{this.props.catalog.get('type')}</p>
            </div>
            <div class="alignright">
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <MenuItem
                  containerElement={<Link to={'/catalogs/'.concat(this.props.catalog.get('id'), '/photos') }/>}
                  primaryText="View photos" />

                <MenuItem primaryText="Edit" onClick={this.edit}/>
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
