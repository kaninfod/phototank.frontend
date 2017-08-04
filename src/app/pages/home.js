import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import Header from '../components/common/header';

@connect((store) => {
  return {

  };
})
class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <Link to={'/photos'}>Photos</Link>
        </h1>
      </div>
    );
  }
}

export default Home;
