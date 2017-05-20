import React from 'react';
import { Header } from './header.jsx';

export default class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      PhotoCard: this.props.data,
    };
  }

  handleChange(e) {
    this.setState({ albumId: e.target.value });
  }

  handleClick() {
    if (this.state.albumId) {
      this.props.widgetHandlers.ALBUMS(this.state.albumId);
    }
  }

  render() {
    var albums = this.props.data.albums.map((a) => {
      return album(a, this.handleChange);
    });
    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Add photo to album"/>
        <div className="pt-widget content">
          <div className="pt-albums">
            <ul onChange={this.handleChange}>
              {albums}
            </ul>
            <a className='waves-effect waves-teal btn-flat right'
              onClick={this.handleClick}>Add photo</a>
          </div>
        </div>
      </div>
    );
  }
};

var album = function (album, handleChange) {

  return (
    <li key={album.id}>
      <input id={album.id} value={album.id} name="album" type="radio"></input>
      <label htmlFor={album.id}>{album.name}</label>
    </li>
  );
};
