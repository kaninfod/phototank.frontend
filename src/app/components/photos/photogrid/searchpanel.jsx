import React from 'react';
import styles from './searchpanel.scss';
import Drawer from 'material-ui/Drawer';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import cx from 'classnames';

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  changeDate(e, date) {
    this.props.changeSearchParams('startdate', date);
    this.props.toggleVisibility();
  }

  toggleLikedOnly(e, isInputChecked) {
    this.props.changeSearchParams('like', isInputChecked);
    this.props.toggleVisibility();
  }

  toggleDirection(e, isInputChecked) {
    this.props.changeSearchParams('direction', isInputChecked);
    this.props.toggleVisibility();
  }

  changeCountry(e, key, value) {
    this.props.changeSearchParams('country', value);
    this.props.toggleVisibility();
  }

  render() {
    const checkboxIconStyle = cx(styles.materialIcons, styles.md18);

    return (
      <Drawer
        className={styles.searchPanel}
        docked={false}
        width={300}
        openSecondary={true}
        open={this.props.show}
        onRequestChange={this.props.toggleVisibility}
      >

         <DatePicker
           hintText="Search date"
           onChange={this.changeDate.bind(this)}
           value={this.props.searchParams.startdate}
           />

         <Checkbox
           checkedIcon={<i class={checkboxIconStyle}>arrow_forward</i>}
           uncheckedIcon={<i class={checkboxIconStyle}>arrow_back</i>}
           label="Search backwards from search date"
           style={styles.checkbox}
           checked={this.props.searchParams.direction}
           onCheck={this.toggleDirection.bind(this)}
           />

         <Checkbox
          checkedIcon={<i class={checkboxIconStyle}>done</i>}
          uncheckedIcon={<i class={checkboxIconStyle}>search</i>}
          label="Only show liked photos"
          style={styles.checkbox}
          checked={this.props.searchParams.like}
          onCheck={this.toggleLikedOnly.bind(this)}
        />


       <SelectField
         floatingLabelText="Country"
         value={this.props.searchParams.country}
         onChange={this.changeCountry.bind(this)}>
         {renderCountries(this.props)}
       </SelectField>
      </Drawer>
    );
  }
}

function renderCountries(props) {
  return props.countries.map(country =>
    <MenuItem value={country.id} key={country.id} primaryText={country.name} />
  );
}
