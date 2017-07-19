import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import createReactClass from 'create-react-class';
import './app.scss';
import Login from './login';
import { logout } from '../redux/auth'
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

const styles = { example: { position: 'fixed', top: 0, }, };

@connect((store) => {
  return {
    loggedIn: store.nAuth.get('loggedIn'),
    user:     store.nAuth.get('user'),
    token:    store.nPhoto.get('token'),
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

  render() {
    const redirectURL = this.props.history.location.pathname;
    let children = null;
    if (!sessionStorage.jwt) {
      children = <Login redirectURL={redirectURL}/>; // this.props.history.push('/login');
    } else {
      children = this.props.children;
    }

    return (
      <div>
        <div className="pt-appbar">
          <AppBar
            title="Phototank"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onTouchTap={this.handleTouchTap}
          >
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
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

        {children}
      </div>
    );
  }
}

export default withRouter(App);
