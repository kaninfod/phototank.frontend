import React from 'react';
import createReactClass from 'create-react-class';
import './card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { connect } from "react-redux";

import { fetchCatalogs, fetchCatalog, createCatalog, verifyCatalog } from '../../redux/catalog';



@connect((store) => {
  return {
    albums: store.catalog.get('albums'),
    catalog: store.nCatalog.get('catalog'),
    catalogs: store.nCatalog.get('catalogs'),
    loading: store.catalog.get('loading'),
  };
})
export default class NewCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.authorize = ['DropboxCatalog', 'FlickrCatalog']
    this.handleChangeCatalogname = this.handleChangeCatalogname.bind(this);
    this.handleCatalogChange = this.handleCatalogChange.bind(this);
    this.handleCatalogTypeChange = this.handleCatalogTypeChange.bind(this);
    this.handleClickProgress = this.handleClickProgress.bind(this);
    this.handleVerifier = this.handleVerifier.bind(this);

    this.state = {
      name: '',
      catalogType: null,
      catalog: 1,
      authorizeOpen: false,
      actionButtonLabel: 'Save',
      actionButtonState: true,
      progressToStepTwo: false,
      verifier: null,
    };
  }

  componentWillMount() {
    if (this.props.match.params.id != null) {
      this.props.dispatch(fetchCatalogs(this.props.match.params.id));
    }
    this.props.dispatch(fetchCatalogs());
  }

  handleChangeCatalogname(event) {
    const errorName = 'At least give the album a name'
    this.setState({
      errorName: null,
      name: event.target.value,
      actionButtonState: !(event.target.value && this.state.catalogType && this.state.catalog),
    });
  };

  handleCatalogChange(event, index, value) {

    this.setState({
      catalog: value,
      actionButtonState: !(this.state.name && this.state.catalogType && value),
    });
  }

  handleCatalogTypeChange(event, index, value) {
    this.setState({
      catalogType: value,
      actionButtonLabel: this.actionButtonLabel(value).label,
      actionButtonState: !(this.state.name && value && this.state.catalog)
    });
  }

  handleVerifier(verifier) {
    this.setState({ verifier: verifier });
  }

  handleClickProgress() {
    if (!this.state.progressToStepTwo) {
      console.log('me savy now');

      this.props.dispatch(createCatalog({
        name: this.state.name,
        type: this.state.catalogType,
        sync_from_catalog: this.state.catalog,
      }))

      this.setState({
        progressToStepTwo: true,
        actionButtonLabel: 'Save',
      })

    } else if (this.authorize.includes(this.state.catalogType)) {
      console.log('me closy now');
      if (this.state.catalogType == 'DropboxCatalog') {
        this.props.dispatch(verifyCatalog({
          id: this.props.catalog.get('id'),
          verifier: this.state.verifier,
        }))
      }
    } else if (!this.authorize.includes(this.state.catalogType)) {
      console.log('me savy now');
      // const verified = this.props.catalog.getIn(['ext_store_data', 'access_token'], false)
      // if (!!verified) {
      //   console.log('This should delete the catalog');
      // }
      // this.props.dispatch(fetchCatalogs())
      // this.props.history.push('/catalogs/list');

    }

  }

  actionButtonLabel(catalogType) {
    if (this.authorize.includes(catalogType)) {
      return {label: 'Next' }
    } else {
      return {label: 'Save' }
    }
  }

  render() {
    return (
      <Paper zDepth={3} className="dialogue">

        <StepOne
          nameValue={this.state.name}
          nameOnChange={this.handleChangeCatalogname}
          catalogType={this.state.catalogType}
          catalogTypeOnChange={this.handleCatalogTypeChange}
          catalogValue={this.state.catalog}
          catalogOnChange={this.handleCatalogChange}
          catalogs={this.props.catalogs}
          show={!this.state.progressToStepTwo}
          />

        <StepTwoFlicker
          catalogType={this.state.catalogType}
          catalog={this.props.catalog}
          show={this.state.progressToStepTwo}
          />

        <StepTwoDropbox
          catalogType={this.state.catalogType}
          catalog={this.props.catalog}
          show={this.state.progressToStepTwo}
          verifier={this.state.verifier}
          verifierHandler={this.handleVerifier}
          />

        <div className="actions">
          <RaisedButton
            label={this.state.actionButtonLabel}
            onClick={this.handleClickProgress}
            disabled={this.state.actionButtonState}
            />
          <RaisedButton label="Cancel"/>
        </div>

      </Paper>

    )
  }
}

const StepOne = createReactClass({
  render () {
    if (!this.props.show) { return null }
    return (
      <div>
        <TextField
          value={this.props.nameValue}
          onChange={this.props.nameOnChange}
          floatingLabelText="Catalog Name"
        />

        <SelectField
          floatingLabelText="Type"
          value={this.props.catalogType}
          onChange={this.props.catalogTypeOnChange}
        >
          <MenuItem value={null} primaryText="Select..." />
          <MenuItem value={'DropboxCatalog'} primaryText="Dropbox Catalog" />
          <MenuItem value={'FlickrCatalog'} primaryText="Flickr Catalog" />
          <MenuItem value={'LocalCatalog'} primaryText="Local Catalog" />
        </SelectField>

        <SelectField
          floatingLabelText="Synchronise from catalog"
          value={this.props.catalogValue}
          onChange={this.props.catalogOnChange}>
          {this.props.catalogs.map(cat => {
            return <MenuItem key={cat.get('id')} value={cat.get('id')} primaryText={cat.get('name')} />;
          })}
          </SelectField>
      </div>
    )
  }
})

const StepTwoFlicker = createReactClass({
  render () {
    if (!(this.props.show && this.props.catalogType == 'FlickrCatalog')) { return null }
    return (
      <div>
        <p>
          Goto <a target="_blank" href={this.props.catalog.get('auth_url')}>Flickr</a> to
          authorize access to your Flickr account.
          Press 'Next' when done.
        </p>
      </div>
    )
  }
})

const StepTwoDropbox = createReactClass({

  handleVerifier(e) {
    this.props.verifierHandler(e.target.value);
  },

  render () {
    if (!(this.props.show && this.props.catalogType == 'DropboxCatalog')) { return null }
    return (
      <div>
        <p>
          Goto <a target="_blank" href={this.props.catalog.get('auth_url')}>Dropbox</a> to
          authorize access to your Dropbox account.
          Enter the verifier code below:
        </p>
        <TextField
          key="1"
          onChange={this.handleVerifier}
          defaultValue={this.props.verifier}
          floatingLabelText="Dropbox verifier code"
         />
      </div>
    )
  }
})
