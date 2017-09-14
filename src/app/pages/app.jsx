import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import styles from './app.scss';
import { logout, validateToken } from '../redux/auth'
import Login from './login';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router-dom';
import Badge from 'material-ui/Badge';

@connect((store) => {
  return {
    loggedIn:     store.nAuth.get('loggedIn'),
    hideAppbar:   store.ui.get('hideAppbar'),
    loadStatus:   store.app.get('loadingStates'),
    bucketCount:  store.nPhoto.get('bucketCount'),
  };
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleShowSearchPanel = this.handleShowSearchPanel.bind(this);

    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(validateToken())
  }

  handleLogout() {
    this.props.dispatch(logout())
  }

  handleShowSearchPanel() {
    this.props.dispatch({type: 'TOGGLE_SEARCHPANEL'});
  }


  render() {
    const _children = validateAuth(this.props)
    const _showAppBar = (!this.props.hideAppbar && this.props.loggedIn)
    const _showLoading = !this.props.loadStatus.every(v => !v);
    const _showSearchButton = this.props.location.pathname == '/photos/bucket' ? false : true

    return (
      <div id="app" className={styles.app}>

        <AppBarTop
          closeMenu="{this.handleCloseLeftMenu}"
          handleLogout={this.handleLogout}
          showSearchButton={_showSearchButton}
          showSearchPanel={this.handleShowSearchPanel}
          showLoading={_showLoading}
          show={_showAppBar}
          bucketCount={this.props.bucketCount}
        />

        <div className={styles.contents}>
          {_children}
        </div>

      </div>
    );
  }
}

function validateAuth(props) {
  if (!sessionStorage.jwt) {
    return <Login redirectURL={props.history.location.pathname}/>;
  } else {
    return props.children;
  }
}

function AppBarTop(props) {
  if (!props.show) { return null }
  return (
    <div className={styles.appbar}>
      <AppBar
        title="Phototank"
        style={{ position: "fixed", top: 0, left: 0, backgroundColor: "#6b9b37" }}
        iconElementLeft={
          <LeftMenu closeMenu={props.closeMenu} handleLogout={props.handleLogout} />
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
  )
}

function RightMenu(props) {
  const _badgeClass = {top: -12, right: -12}
  if (!props.bucketCount) { _badgeClass.display = 'none'};

  let _searchButtonStyle = {}
  if (!props.showSearchButton) { _searchButtonStyle .display = 'none'};
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
  )
}

function ProgressIndicator(props) {
  if (!props.show) { return null }
  return (
    <CircularProgress color="white" size={25} thickness={4} />
  )
}

function LeftMenu(props) {
  return (
    <IconMenu
      iconButtonElement={<IconButton><i class={styles.materialIcons}>menu</i></IconButton>}
      width={200}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
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
  )
}

export default withRouter(App);
