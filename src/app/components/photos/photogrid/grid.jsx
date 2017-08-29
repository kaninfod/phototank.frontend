import React from 'react';
import Waypoint from './waypoint';
import './grid.scss';
import Widget from './widget';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoWidgetSize: 'small',
    };
  }

  _renderPhotos() {
    return this.props.photos.map(photo =>
      <Widget
        photoWidgetSize={this.state.photoWidgetSize}
        key={photo.get('id')}
        selected={parseInt(photo.get('id')) == this.props.selectedPhoto}
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
          offset={400}
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
