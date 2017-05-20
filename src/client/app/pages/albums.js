import React from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import Header from '../components/common/header';

@connect((store) => {
  return {

  };
})
class Albums extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <Link to={'/photos'}>Albums</Link>

        </h1>
      </div>
    );
  }
}

export default Albums;
