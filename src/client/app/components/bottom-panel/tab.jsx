import React from 'react'

const Tab = (props) => {
  const data = props.data;
  return (

    <div
      class={'pt-panel-tab ' + (data.active ? 'active' : '')}
      data-panelid={data.id}
      onClick={props.clickHandler}>
        {data.id}
      </div>
  );
};

export default Tab;
