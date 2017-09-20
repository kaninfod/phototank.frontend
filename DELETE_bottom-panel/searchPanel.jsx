import React from 'react';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const searchPanel = (props) => {
  const countries = props.countries.map(country => {
    return (<MenuItem value={country.id} key={country.id} primaryText={country.name} />);
  });

  return (
    <div class="pt-bucket-tools row">
      <div class="col l4">
        <DatePicker
          hintText="Start date"
          onChange={props.changeDate}
          value={props.searchParams.startdate}
          />
        <div class="switch">
          <label>
            Backwards
            <input id="direction" type="checkbox"
              checked={props.searchParams.direction}
              onChange={props.toggleDirection}/>
            <span class="lever"></span>
            Forwards
          </label>
        </div>

        <div class="switch">
          <label>
            Show only liked
            <input id="" type="checkbox"
              checked={props.searchParams.like}
              onChange={props.toggleLikedOnly}/>
            <span class="lever"></span>
          </label>
        </div>
      </div>
      <div class="col l4">
        <SelectField
          floatingLabelText="Country"
          value={props.searchParams.country}
          onChange={props.changeCountry}>
          {countries}
        </SelectField>
        <div class="input-field col s12">
        </div>
      </div>
    </div>
  )
}

export default searchPanel;
