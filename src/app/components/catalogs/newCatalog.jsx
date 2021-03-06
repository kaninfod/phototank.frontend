import React from 'react';
// import createReactClass from 'create-react-class';
import styles from '../../stylesheets/card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { fetchCatalogs, fetchCatalog, createCatalog, verifyCatalog } from '../../redux/catalog';

@connect((store) => {
  return {
    albums: store.nAlbum.get('albums'),
    catalog: store.nCatalog.get('catalog'),
    catalogs: store.nCatalog.get('catalogs'),
  };
})

class NewCatalog extends React.Component {
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
      catalogValue: null,
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

  actionButtonLabel(catalogType) {
    if (this.authorize.includes(catalogType)) {
      return {label: 'Next' }
    } else {
      return {label: 'Save' }
    }
  }

  handleVerifier(verifier) {
    this.setState({ verifier: verifier });
  }

  handleClickProgress() {
    // Step 1 form is correct and next/ok is pressed
    if (!this.state.progressToStepTwo) {

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

      this.props.dispatch(fetchCatalog(this.props.catalog.get('id')))

    } else if (!this.authorize.includes(this.state.catalogType)) {
      console.log('local');

    }

  }

  render() {

    const { history } = this.props;
    // if (!this.props.catalog.size) { return null }
    if (this.props.catalog.get('access_token')) {
      this.props.dispatch({ type: 'CLEAR_CATALOG' })
      history.push('/catalogs/list');
    }

    return (

      <Paper zDepth={3} className={styles.dialogue}>

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

        <StepTwo
          catalogType={this.state.catalogType}
          catalog={this.props.catalog}
          show={this.state.progressToStepTwo}
          />



        <div className={styles.actions}>
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

export default withRouter(NewCatalog);


// const StepOne = createReactClass({
class StepOne extends React.Component {  
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
          onChange={this.props.catalogTypeOnChange}>

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
}

// const StepTwo = createReactClass({
function StepTwo(props) {
    if (!(props.show )) { return null }
    return (
      <div>
        <p>
          Goto <a target="_blank" href={props.catalog.get('auth_url')}>Flickr</a> to
          authorize access to your Flickr account.
          Press 'Next' when done.
        </p>
      </div>
    )
}
