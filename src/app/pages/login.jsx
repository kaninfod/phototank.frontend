import React from 'react';
import { connect } from "react-redux";
import { logout, login } from '../redux/auth'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './login.scss';

@connect((store) => {
  return {
    auth: store.nAuth.get('user'),
  };
})
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.state = {
      email: "admin@mail.com",
      password: "123"
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.token) {
      this.props.history.push('/albums/list');
    }
  }

  handleLogout() {
    this.props.dispatch(logout())
  }

  handleLogin() {
    this.props.dispatch(login({
      email: this.state.email,
      password: this.state.password,
      redirectURL: this.props.redirectURL
    }))
  }

  emailChanged(event) {
    this.setState(
      { email: event.target.value}
    )
  }

  passwordChanged(event) {

    this.setState(
      { password: event.target.value}
    )  }

  render() {
    return (

      <div class={styles.login_dialog}>
        <TextField
          floatingLabelText="Email address"
          value={this.state.email}
          onChange={this.emailChanged}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          value={this.state.password}
          onChange={this.passwordChanged}
        />
      <div className={styles.login_button}>
          <RaisedButton
            label="Login"
            labelPosition="before"
            onClick={this.handleLogin}
            primary={true}
          />
        </div>
      </div>

    )
  }
}
