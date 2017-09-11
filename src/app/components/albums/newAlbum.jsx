import React from 'react';
import { connect } from "react-redux";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './card';
import { fetchCities, fetchCountries } from '../../redux/location'
import { fetchAlbum, createAlbum, updateAlbum } from '../../redux/album'
import {orange500, blue500} from 'material-ui/styles/colors';
const styles = { errorStyle: { color: orange500 } }

@connect((store) => {
  return {
    countries: store.nLocation.get('countries'),
    cities: store.nLocation.get('cities'),
    album: store.nAlbum.get('album')
  };
})
class NewAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeAlbumname = this.handleChangeAlbumname.bind(this);
    this.handleChangeStartdate = this.handleChangeStartdate.bind(this);
    this.handleChangeEnddate = this.handleChangeEnddate.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.state = {
      id: null,
      name: '',
      start_date: null,
      end_date: null,
      make: null,
      model: null,
      country: -1,
      city: -1,
      tags: [],
      like: null,
      finished: false,
      stepIndex: 0,
    };
  }

  componentWillMount() {
    if (this.props.match.params.id != null) {
      this.props.dispatch(fetchAlbum(this.props.match.params.id));
    }
    this.props.dispatch(fetchCountries());
    this.props.dispatch(fetchCities());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.album != this.props.album) {
      const album = nextProps.album
      this.setState({
          start_date: album.get('start_date') == null ? null : new Date(album.get('start_date')),
          end_date: album.get('end_date') == null ? null : new Date(album.get('end_date')),
          id: album.get('id'),
          name: album.get('name'),
          make: null,
          model: null,
          country: Number(album.get('country')),
          city: Number(album.get('city')),
          tags: [],
          like: null,
       });
    }
  }

  handleChangeAlbumname(event) {

    const errorName = 'At least give the album a name'
    this.setState({
      errorName: null,
      name: event.target.value
    });
  };

  handleChangeStartdate(event, date) {
    this.setState({ start_date: date });
  };

  handleChangeEnddate(event, date) {
    this.setState({ end_date: date });
  };

  handleChangeCountry(event, index, value) {
    this.setState({ country: value });
  }

  handleChangeCity(event, index, value) {
    this.setState({ city: value, country: -1  });
  }

  handleClickSave() {
    const album = {
      start_date:     this.state.start_date,
      end_date:       this.state.end_date,
      id:             this.state.id,
      name:           this.state.name,
      make:           this.state.make,
      model:          this.state.model,
      country:        this.state.country,
      city:           this.state.city,
      tags:           this.state.tags,
      like:           this.state.like,
    };
    if (!album.name) {
      this.setState({
        errorName: 'At least give the album a name',
      })
      return
    }

    if (this.state.id != null) {
      this.props.dispatch(updateAlbum(album));
    } else {
      this.props.dispatch(createAlbum(album));
    }
    this.props.history.push('/albums/list');
  }

  _cities() {
    return this.props.cities.map(city => {
      return (<MenuItem value={city.get('id')} key={city.get('id')} primaryText={city.get('name')} />);
    });
  }

  _countries() {
    return this.props.countries.map(country => {
      return (<MenuItem value={country.get('id')} key={country.get('id')} primaryText={country.get('name')} />);
    });
  }

  render() {
    return (
      <div>
        <Paper zDepth={3} className={styles.dialogue}>
          <TextField
            value={this.state.name}
            onChange={this.handleChangeAlbumname}
            floatingLabelText="Album Name"
            errorText={this.state.errorName}
          />
          <DatePicker
            floatingLabelText="Start date"
            hintText="Start date"
            onChange={this.handleChangeStartdate}
            value={this.state.start_date}
          />
          <DatePicker
            floatingLabelText="End date"
            hintText="End date"
            onChange={this.handleChangeEnddate}
            value={this.state.end_date}
          />

        <SelectField
          value={this.state.country}
          floatingLabelText="Country"
          onChange={this.handleChangeCountry} >
            {this._countries()}
          </SelectField>

          <SelectField
            value={this.state.city}
            floatingLabelText="City"
            onChange={this.handleChangeCity} >
              {this._cities()}
          </SelectField>

          <SelectField floatingLabelText="Camera">
            <MenuItem value={1} primaryText="Never" />
          </SelectField>

          <SelectField floatingLabelText="Tag">
            <MenuItem value={1} primaryText="Never" />
          </SelectField>

          <Toggle
            label="Liked"
          />

        <div className={styles.actions}>
          <RaisedButton
            label="Save"
            onClick={this.handleClickSave}
            />
          <RaisedButton
            label="Cancel"
            onClick={() => this.props.history.push('/albums/list')}
          />
        </div>
        </Paper>

      </div>
    );
  }
}

export default NewAlbum;
