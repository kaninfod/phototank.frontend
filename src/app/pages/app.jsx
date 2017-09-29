import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import styles from './app.scss';
import { logout, validateToken } from '../redux/auth'
import Login from './login';
import Drawer from 'material-ui/Drawer';

import Snackbar from 'material-ui/Snackbar';
import Nav from '../components/nav/nav.jsx';

@connect((store) => {
  return {
    loggedIn:     store.nAuth.get('loggedIn'),
    hideAppbar:   store.ui.get('hideAppbar'),
    loadStatus:   store.app.get('loadingStates'),
    bucketCount:  store.nPhoto.get('bucketCount'),
    snackBar:     store.ui.get('snackBar'),

  };
})
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleShowSearchPanel = this.handleShowSearchPanel.bind(this);
    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);

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

  handleCloseSnackBar() {
    this.props.dispatch({ type: 'HIDE_MESSAGE' })
  }


  render() {
    const _children = validateAuth(this.props)
    const _showAppBar = (!this.props.hideAppbar && this.props.loggedIn)
    const _showLoading = !this.props.loadStatus.every(v => !v);
    const _showSearchButton = this.props.location.pathname == '/photos/bucket' ? false : true

    return (
      <div id="app" className={styles.app}>

        <Nav
          show={_showAppBar}
          showSearchButton={_showSearchButton}
          showSearchPanel={this.handleShowSearchPanel}
          showLoading={_showLoading}
          handleLogout={this.handleLogout}
          bucketCount={this.props.bucketCount}
        />

        <div className={styles.contents}>
          {_children}
        </div>

        <Snackbar
          open={this.props.snackBar.get('show')}
          message={this.props.snackBar.get('message')}
          autoHideDuration={this.props.snackBar.get('timeout')}
          onRequestClose={this.handleCloseSnackBar}
        />
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

export default withRouter(App);
