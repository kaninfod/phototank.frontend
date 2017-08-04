import React from 'react';

const Content = (props) => {
  const data = props.data;
  return (
    <div class={'pt-panel-content ' + (data.active ? 'active' : '')}
      data-contentid={data.id}>
      {props.children}
      </div>

  );
};

export default Content;
