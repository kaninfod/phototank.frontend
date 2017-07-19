import React from 'react';
import './fab.scss';
import { login, logout } from '../../redux/actAuth'
$
class FAB extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      showMenu: true,
      showFAB: true,
    };
  }

  handleLogout() {
    console.log('LOGOUT');
    this.props.dispatch(logout())
    // this.setState({ showFABChildren: !this.state.showFABChildren });
  }

  render() {
    const main = [
      { color: 'green', icon: 'insert_chart', key: 1, onClick: this.handleLogout },
      { color: 'red',   icon: 'insert_chart', key: 2, onClick: this.handleLogout },
    ];

    const local = [
      { color: 'green', icon: 'insert_chart', key: 3, onClick: this.handleLogout },
      { color: 'red',   icon: 'insert_chart', key: 4, onClick: this.handleLogout },
    ];

    const linkProps = main.concat(local);
    if (this.props.show) { return null }
    return (
      <div class="pt-fab">
        <a
          type="button"
          href="#"
          class="btn-floating btn-large waves-effect waves-light red"
          onClick={this.props.onClick}>
          <i class="material-icons">
            add
          </i>
        </a>

        <Links props={this.state.showMenu ? linkProps : []} />
      </div>
    );
  }
};

const Links = ({ props }) => (
  <ul>
    {props.map(link => (
      <li key={link.key}>
        <a class={ 'btn-floating '.concat(link.color)} onClick={link.onClick}>
          <i class='material-icons'>
            {link.icon}
          </i>
        </a>
      </li>
    ))}
  </ul>
);

export default FAB;
