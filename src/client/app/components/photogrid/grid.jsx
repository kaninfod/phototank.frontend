import React from 'react';
import '../../stylesheets/grid';
import Widget from './widget';
import lazyload from 'jquery-lazyload';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.loading = true;
    this.state = {

    };
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', function (event) {
        this.handleScroll(event);
      }.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    window.addEventListener('scroll', function (event) {
        this.handleScroll(event);
      }.bind(this));
    $('.lazy').lazyload();
  }

  handleScroll(event) {
    try {
      var scrollPosition = $('.loadMore').offset().top
                            - ($(window).height()
                            + $(window).scrollTop()
                            + this.props.offset);
      if (scrollPosition < 0 && this.loading && !this.props.lastPage) {
        this.loading = false;
        this.props.photoActions.SCROLL();
      }
    }

    catch (err) {
      console.log(err);
    }
  }

  render() {
    const props = this.props;
    return (
      <div className="photos-component">
        <div className="row photogrid" onScroll={this.handleScroll}>
          {props.photos.map(photo => {
            return <Widget
              key={photo.get('id')}
              photo={photo}
              actions={props.photoActions}/>;
              }
            )
          }
        </div>
        <div className="row loadMore"></div>
        <div>
          { props.children }
        </div>
        {this.loading = props.loading}
      </div>
    );
  }
}

Grid.defaultProps = {
  photos: [],
  offset: 600,

};
