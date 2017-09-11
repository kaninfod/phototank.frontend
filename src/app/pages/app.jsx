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

@connect((store) => {
  return {
    user:         store.nAuth.get('user'),
    loggedIn:     store.nAuth.get('loggedIn'),
    hideAppbar:   store.ui.get('hideAppbar'),
    loadStatus:   store.app.get('loadingStates'),
  };
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleShowSearchPanel = this.handleShowSearchPanel.bind(this);
    this.state = {
      open: false,
      showSearchPanel: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(validateToken())
  }

  handleLogout() {
    this.props.dispatch(logout())
    this.handleCloseLeftMenu()
  }

  handleTouchTap(event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleShowSearchPanel() {
    this.setState({
      showSearchPanel: !this.state.showSearchPanel,
    })
  }


  render() {
    const children = validateAuth(this.props)
    const _showAppBar = (!this.props.hideAppbar && this.props.loggedIn)
    const showLoading = !this.props.loadStatus.every(v => !v);

    return (
      <div id="app" className={styles.app}>

        <AppBarTop
          closeMenu="{this.handleCloseLeftMenu}"
          handleLogout={this.handleLogout}
          showSearchPanel={this.handleShowSearchPanel}
          showLoading={showLoading}
          show={_showAppBar}
        />

        <RightDrawer
          open={this.state.showSearchPanel}
          handleShowSearchPanel={this.handleShowSearchPanel}
          />

        <div className={styles.contents}>
          {children}
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
//
function AppBarTop(props) {
  if (!props.show) { return null }
  return (
    <div className={styles.appbar}>
      <AppBar
        title="Phototank"
        style={{ position: "fixed", top: 0, left: 0 }}
        iconElementLeft={
          <LeftMenu closeMenu={props.closeMenu} handleLogout={props.handleLogout} />
        }
        iconElementRight={
          <RightMenu
            showLoading={props.showLoading}
            showSearchPanel={props.showSearchPanel}
            />
        }
        />
    </div>
  )
}

function RightDrawer(props) {
  return (
    <Drawer
      docked={false}
      width={300}
      openSecondary={true}
      open={props.open}
      onRequestChange={props.handleShowSearchPanel}
       >
    </Drawer>
  )
}

function RightMenu(props) {
  return (
    <div>
      <IconButton onTouchTap={props.showSearchPanel}>
        <i class={styles.materialIcons}>shopping_basket</i>
      </IconButton>

      <IconButton onTouchTap={props.showSearchPanel}>
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
