import React from 'react';
import { connect } from "react-redux";
import { login, logout } from '../../actions/actAuth'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

@connect((store) => {
  return {
    loggedIn: store.auth
  };
})
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }


  logout(event) {
    event.preventDefault();
    this.props.dispatch(logout())
  }


  render() {
    return(
      <div>
        <AppBar
          title="Phototank"
          iconElementRight={this.props.loggedIn ? <LoggedIn logout={this.logout}/> : <LoggedOut />}
          />

      </div>
    )
  }
}
export default Header;

const LoggedOut = (props) => (
  <FlatButton label="Login" />
  )


const LoggedIn = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" onClick={props.logout}>

    </MenuItem>
  </IconMenu>
);
