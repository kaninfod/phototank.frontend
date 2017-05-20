import React from 'react';

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
  }

  handleHover(e) {
    var overlayButton = $(this.refs.widget).find('.overlay-button:not(.overlay-processing)');
    if (e.type == 'mouseenter')
      overlayButton.addClass('overlay-show');
    else
      overlayButton.removeClass('overlay-show');
  }

  handleSelect(e) {
    this.props.actions.SELECT(this.props.photo.get('id'));
  }

  handleZoom(e) {
    this.props.actions.ZOOM(this.props.photo.get('id'));
  }

  handleDelete(e) {
    this.props.actions.DELETE(this.props.photo.get('id'));
  }

  handleClick(e) {

    this.props.actions.CLICK(this.props.photo.get('id'));
  }

  render() {
    const props = this.props;
    const photo = props.photo;
    return (

        <div
          id={photo.get('id')} className="hoverable photo-widget z-depth-1" ref="widget"
          onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
          <div className="photo-widget-content"></div>
            <div className="photo-widget-header">

              <img
                className="lazy" id={photo.get('id')} onClick={this.handleClick}
                data-original={photo.get('url').concat('?token=', sessionStorage.jwt)}/>

              <div className={'overlay-button overlay-select ' +
                (photo.get('bucket') ? 'selected' : '')}
                onClick={this.handleSelect} ref="select" >
                    <i className="material-icons">check</i>
              </div>

              <div className="overlay-button overlay-zoom selected"
                onClick={this.handleZoom} >
                    <i className="material-icons">zoom_out_map</i>
              </div>

              <div className="overlay-button overlay-delete selected"
                onClick={this.handleDelete} ref="delete" >
                    <i className="material-icons">delete_forever</i>
              </div>

            </div>
            <div className="photo-widget-date">{photo.get('date_taken')}</div>
        </div>

      );
  }
}

Widget.defaultProps = {

};
