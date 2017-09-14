import React from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { getButtons } from './button.props.js';
import { Buttons, Info, Rotate, Albums, Comments, Tag, Map } from '../widgets';
import '../styles/card.scss';

const components = {
  INFO:     Info,
  ROTATE:   Rotate,
  ALBUMS:   Albums,
  COMMENTS: Comments,
  TAG:      Tag,
  MAP:      Map,
  DELETE:   'Delete',
  LIKE:     'Like',
};

class PhotoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.setWidget             = this.setWidget.bind(this);
    this.likeState             = this.likeState.bind(this);

    this.state = {
      photo: [],
      albums: [],
      show: false,
      selectedWidget: 'INFO',
      currentUser: [],
      taglist: [],
      facets: null,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      show: nextProps.show,
      photo: nextProps.photo,
      albums: nextProps.albums,
      currentUser: nextProps.currentUser,
      taglist: nextProps.taglist,
      photoActions: nextProps.photoActions,
    });
  }

  likeState() {
    return !!this.state.photoActions.FACETS('Like') ? 'green' : 'blue-grey lighten-2';
  }

  setWidget(widget) {
    this.setState({ selectedWidget: widget.target.dataset.widget, });
  }

  render() {
    if (!this.state.show) {
      return null;
    }

    const localWidgetActions = {
      LIKESTATE:  this.likeState,
      SETWIDGET:  this.setWidget,
    };

    const actions = Object.assign(localWidgetActions, this.state.photoActions);
    const WidgetType = components[this.state.selectedWidget];
    const buttons = getButtons(actions);

    if (!['INFO', 'MAP'].includes(this.state.selectedWidget)) {
      buttons.vert = [];
    }

    return (

      <Draggable handle=".header" bounds='.photogrid'>
        <div className="pt-card upper-right show">
          <WidgetType
            data={dataProvider(this.state)}
            widgetHandlers={actions}
          />
          <Buttons buttons={buttons}
            widget={this.state.selectedWidget}
            widgetHandlers={actions}
          />
        </div>
     </Draggable>
   );
  }
}

export default PhotoDialog;

function dataProvider(state) {
  switch (state.selectedWidget) {
    case 'INFO': {
      return {
        photo: state.photo,
      };
    }

    case 'ALBUMS': {
      return {
        albums: state.albums,
      };
    }

    case 'COMMENTS': {
      return {
        comments: state.photoActions.FACETS('Comment'),
        currentUser: state.currentUser,
      };
    }

    case 'TAG': {
      return {
        tags: state.photoActions.FACETS('Tag'),
        taglist: state.taglist,
      };
    }

    case 'MAP': {
      return {
        url: state.photo.getIn(['location', 'map_url']),
      };
    }
  }
}
