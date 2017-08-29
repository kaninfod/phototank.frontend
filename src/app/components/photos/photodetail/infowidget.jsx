import React from 'react';

export function InfoWidget(props) {

  const _data = props.photo;
  return (
    <div className="info">
      <div className="table">
        <div className="row">
          <div className="cell">Date:</div>
          <div className="cell"> {_data.get('date_taken_formatted')} </div>
        </div>

        <div className="row">
          <div className="cell">Camera:</div>
          <div className="cell">{_data.get('make').concat(' ', _data.get('model'))}</div>
        </div>

        <div className="row">
          <div className="cell">Country:</div>
          <div className="cell">{_data.getIn(['location', 'country_name'])}</div>
        </div>

        <div className="row">
          <div className="cell">City:</div>
          <div className="cell">{_data.getIn(['location', 'city_name'])}</div>
        </div>

        <div className="row">
          <div className="cell">Adderss:</div>
          <div className="cell">{_data.getIn(['location', 'address'])}</div>
        </div>

        <div className="row">
          <div className="cell">Id:</div>
          <div className="cell">{_data.get('id')}</div>
        </div>
      </div>
    </div>
  );
}
