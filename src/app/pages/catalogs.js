import React from 'react';

class Catalogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Catalogs;
