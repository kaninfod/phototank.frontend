import '../styles/card.scss';
import '../styles/bucket';
import React from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import { getButtons } from './bucket-button.props';
import { Buttons, Bucketgrid, Rotate, Albums, Comments, Tag } from '../widgets';

const components = {
  INFO:   Bucketgrid,
  ROTATE:   Rotate,
  ALBUMS:   Albums,
  COMMENTS: Comments,
  TAG:      Tag,
  DELETE:   'Delete',
  LIKE:     'Like',
};

export default class BucketDialog extends React.Component {
  constructor(props) {
    super(props);

    this.setWidget = this.setWidget.bind(this);
    this.state = {
      show: false,
      selectedWidget: 'INFO',
      photos: [],
      albums: [],
      currentUser: [],
      taglist: [],
    };
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      show: nextProps.show,
      photos: nextProps.photos,
      albums: nextProps.albums,
      currentUser: nextProps.currentUser,
      taglist: nextProps.taglist,
    });
  }

  setWidget(widget) {
    this.setState({ selectedWidget: widget.target.dataset.widget, });
  }

  render() {
    if (!this.state.show) { return null; };

    const WidgetType = components[this.state.selectedWidget];
    const localWidgetActions = {
      SETWIDGET:  this.setWidget,
    };

    const actions = Object.assign(localWidgetActions, this.props.bucketActions);
    const buttons = getButtons(actions);

    if (!['INFO'].includes(this.state.selectedWidget)) {
      buttons.vert = [];
    }

    return (
      <Draggable handle=".header">
        <div className="pt-card upper-right show">
            <WidgetType data={dataProvider(this.state)} widgetHandlers={actions}/>
            <Buttons buttons={buttons}
              widget={this.state.selectedWidget}
              widgetHandlers={actions}/>
        </div>
     </Draggable>
   );
  }
}

function dataProvider(state) {
  switch (state.selectedWidget) {

    case 'INFO': {
      return {
        bucket: state.photos,
      };
    }

    case 'ALBUMS': {
      return {
        albums: state.albums,
      };
    }

    case 'COMMENTS': {
      return {
        comments: [],
        currentUser: state.currentUser,
      };
    };

    case 'TAG': {
      return {
        tags: [],
        taglist: state.taglist,
      };
    }
  }
}
