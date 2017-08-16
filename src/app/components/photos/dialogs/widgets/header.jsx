import React from 'react';
export const Header = (props) => {
  return (
    <div className="pt-widget header handle">
      {props.title}
      <i className="right material-icons close-button" onClick={props.handleClose} >close</i>
    </div>
  );
};
