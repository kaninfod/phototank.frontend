import React from 'react';
import { Header } from './header.jsx';

class Bucketgrid extends React.Component {
  constructor(props) {
    super(props);

  }


  _renderPhotos() {
    return this.props.data.bucket.map(bucketPhoto =>
      <img
        onClick={() => this.props.widgetHandlers.REMOVE(bucketPhoto.get('id'))}
        class="responsive-img"
        key={bucketPhoto.get('id')}
        src={bucketPhoto.get('url_tm').concat('?token=', sessionStorage.jwt)}/>
    );
  }

  render() {

    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Photos in Bucket"/>
        <div className="pt-widget content">
          <div className="pt-bucket-grid">
            { this._renderPhotos() }
          </div>
        </div>
      </div>
    );
  }
}

export default Bucketgrid;
