import React from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';



class Albums extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Albums;
