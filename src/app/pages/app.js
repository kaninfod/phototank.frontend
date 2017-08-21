import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import createReactClass from 'create-react-class';
import './app.scss';
import Login from './login';
import { logout, login, validateToken } from '../redux/auth'
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import Panel from '../components/panel/panel';

const styles = { example: { position: 'fixed', }, };


@connect((store) => {
  return {
    user:       store.nAuth.get('user'),
    hideAppbar: store.ui.get('hideAppbar'),
    panel:  store.ui.get('panelProps'),
  };
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      open: false,
      panelOpen:false,
    };
  }

  handleLogout() {
    this.props.dispatch(logout())
    this.handleRequestClose()
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  togglePanel() {
    this.props.dispatch({
      type: 'SHOW_PANEL',
      payload: {
        open: !this.props.panel.get('open'),
        size: 'small',
        title: 'from reducer',
        widget: 'PHOTO_INFO',
        widgetData: 'Martin',
      }
    })
  }

  _renderAppbar() {
    return null;
    return (
    <div className='pt-appbar'>
      <AppBar
        title="Phototank"
        iconClassNameRight="muidocs-icon-navigation-expand-more"

        onTouchTap={this.handleTouchTap}>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}>
          <Menu width={200}>
            <MenuItem
              containerElement={<Link to={'/photos'}/>}
              primaryText="Photos"
              onTouchTap={this.handleRequestClose} />
            <MenuItem
              containerElement={<Link to={'/catalogs/list'}/>}
              primaryText="Catalogs"
              onTouchTap={this.handleRequestClose} />
            <MenuItem
              containerElement={<Link to={'/albums/list'}/>}
              primaryText="Albums"
              onTouchTap={this.handleRequestClose} />
            <MenuItem
              primaryText="Logout"
              onTouchTap={this.handleLogout} />
          </Menu>
        </Popover>
      </AppBar>
    </div>
    )
  }

  render() {
    const redirectURL = this.props.history.location.pathname;
    let children = null;
    if (!sessionStorage.jwt) {
      children = <Login redirectURL={redirectURL}/>;
    } else {
      if (!this.props.user.size) {
        this.props.dispatch(validateToken())
      }
      children = this.props.children;
    }

    return (
      <div id='app'>
        { this.props.hideAppbar ? null : this._renderAppbar() }
        <div className="pt-contents">
          {children}
        </div>
        <div onClick={this.togglePanel.bind(this)}>kaj</div>

        <Panel {...this.props} >

          {null}
        </Panel>

      </div>
    );
  }
}

export default withRouter(App);
