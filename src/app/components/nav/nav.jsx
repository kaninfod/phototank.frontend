import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Badge from 'material-ui/Badge';
import CircularProgress from 'material-ui/CircularProgress';
import styles from './app.scss';

export default function Nav(props) {
  if (!props.show) { return null; }

  return (
    <div className={styles.appbar}>
      <AppBar
        title="Phototank"
        style={{ position: 'fixed', top: 0, left: 0, backgroundColor: '#6b9b37' }}
        iconElementLeft={
          <LeftMenu
            closeMenu={props.closeMenu}
            handleLogout={props.handleLogout} />
        }
        iconElementRight={
          <RightMenu
            showSearchButton={props.showSearchButton}
            showLoading={props.showLoading}
            showSearchPanel={props.showSearchPanel}
            bucketCount={props.bucketCount}
            />
        }
        />
    </div>
  );
}

function RightMenu(props) {
  const _badgeClass = { top: -12, right: -12 };
  if (!props.bucketCount) { _badgeClass.display = 'none'; };

  let _searchButtonStyle = {};
  if (!props.showSearchButton) { _searchButtonStyle .display = 'none'; };

  return (
    <div>
      <Link to={'/photos/bucket'}>
        <IconButton iconStyle={{ padding: 0 }}>
          <Badge
            badgeContent={props.bucketCount}
            secondary={true}
            badgeStyle={_badgeClass}
            >
            <i class={styles.materialIcons}>shopping_basket</i>
          </Badge>
        </IconButton>
      </Link>

      <IconButton style={_searchButtonStyle} onTouchTap={props.showSearchPanel}>
        <i class={styles.materialIcons}>search</i>
      </IconButton>

      <ProgressIndicator show={props.showLoading} />
    </div>
  );
}

function ProgressIndicator(props) {
  if (!props.show) { return null; }

  return (
    <CircularProgress color="white" size={25} thickness={4} />
  );
}

function LeftMenu(props) {
  return (
    <IconMenu
      iconButtonElement={<IconButton><i class={styles.materialIcons}>menu</i></IconButton>}
      width={200}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
      <MenuItem
        containerElement={<Link to={'/photos'}/>}
        primaryText="Photos"
        />
      <MenuItem
        containerElement={<Link to={'/catalogs/list'}/>}
        primaryText="Catalogs"
        />
      <MenuItem
        containerElement={<Link to={'/albums/list'}/>}
        primaryText="Albums"
        />
      <MenuItem
        primaryText="Logout"
        onTouchTap={props.handleLogout} />
    </IconMenu>
  );
}
