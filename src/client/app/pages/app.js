import React from 'react';
import { withRouter } from 'react-router-dom';
import Login from './login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
    };
  }

  handleLogout() {
    console.log('LOGOUT');
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
        {children}
      </div>
    );
  }
}

export default withRouter(App);
