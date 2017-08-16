import React from 'react';
import Waypoint from './waypoint';
import './grid.scss';
import Widget from './widget';
import lazyload from 'jquery-lazyload';

export default class Grid extends React.Component {

  _renderPhotos() {
    return this.props.photos.map(photo =>
      <Widget
        key={photo.get('id')}
        photo={photo}
        actions={this.props.photoActions}/>
    );
  }

  render() {
    const props = this.props;
    return (

      <div>
        <Waypoint className="row photogrid"
          onWindowScroll={this.props.photoActions.SCROLL}
          offset={600}
          loading={this.props.loading}
          loadMore={!this.props.lastPage}>

          { this._renderPhotos() }

        </Waypoint>

        <div>
          { props.children }
        </div>

      </div>
    );
  }
}
