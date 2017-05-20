import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { connect } from "react-redux";
import {
  getCatalogs,
  createCatalogs,
  verifyDropboxCatalog,
  updateCatalog,
  importCatalog,
  newCatalog,
  getCatalog,
} from '../../actions/actCatalog';

@connect((store) => {
  return {
    albums: store.catalog.get('albums'),
    catalog: store.catalog.get('catalog'),
    catalogs: store.catalog.get('catalogs'),
    loading: store.catalog.get('loading'),
  };
})
class NewCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.handleCatalogTypeChange = this.handleCatalogTypeChange.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleVerifier = this.handleVerifier.bind(this);
    this.handleCatalogChange = this.handleCatalogChange.bind(this);
    this.state = {
      stepIndex: this.props.stepIndex,
      catalog: 1,
      catalogType: 'FlickrCatalog',
      name: 'lak',
      verifier: '',
    };
  }

  handleCatalogTypeChange(event, index, value) {
    this.setState({
      catalogType: value,
    });
  }

  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleVerifier(e) {
    this.setState({
      verifier: e.target.value,
    });
  }

  handleCatalogChange(event, index, value) {
    const { catalogCheckbox, albumCheckbox } = this.state;
    this.setState({
      catalog: value,
    });
  }


  handleNext = () => {
    var {stepIndex} = this.state;
    switch (stepIndex) {
      case 0: {
        //select catalogtype
        this.setState({
          stepIndex: stepIndex + 1,
        })
        break;
      }

      case 1: {
        //set catalog name
        if (!this.state.name) { return }

        this.setState({
          stepIndex: stepIndex + 1,
        })
        break;
      }

      case 2: {
        //select what to sync
        if (!this.state.catalog) { return }

        var payload = {
          name: this.state.name,
          type: this.state.catalogType,
          sync_from_catalog_id: this.state.catalog,
        }

        this.props.dispatch(createCatalogs(payload))
        // this.props.newActions.createCatalog(payload)

        this.setState({
          stepIndex: stepIndex + 1,
        })
        break;
      }

      case 3: {
        //verify
        if (this.state.catalogType == 'DropboxCatalog') {
          if (!this.state.verifier) { return }
          var payload = {
            id: this.props.catalog.get('id'),
            verifier: this.state.verifier,
            type: this.state.catalogType,
          }

          this.props.dispatch(verifyDropboxCatalog(payload))
        } else if (this.state.catalogType == 'FlickrCatalog') {
          if (!this.props.catalog.get('verified', false)) {
            this.props.dispatch(getCatalog({id: this.props.catalog.get('id')}))
            return
           }
        }
        this.setState({
          stepIndex: stepIndex + 1,
        })
        break;
      }

      case 4: {
        const verified = this.props.catalog.getIn(['ext_store_data', 'access_token'], false)
        if (!!verified) {
          console.log('This should delete the catalog');
        }
        this.props.dispatch(getCatalogs())
        this.props.history.push('/catalogs/list');
        this.setState({
          stepIndex: stepIndex + 1,
        })
        break;
      }
    }
  };



  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: {
        return (
          <SelectField
            floatingLabelText="Type"
            value={this.state.catalogType}
            onChange={this.handleCatalogTypeChange}
          >
            <MenuItem value={'DropboxCatalog'} primaryText="Dropbox Catalog" />
            <MenuItem value={'FlickrCatalog'} primaryText="Flickr Catalog" />
            <MenuItem value={'LocalCatalog'} primaryText="Local Catalog" />
          </SelectField>
          );
      }

      case 1: {
        return (
          <TextField
            key="0"
            onChange={this.handleName}
            defaultValue={this.state.name}
            floatingLabelText="Catalog Name"
           />
        );
      }

      case 2: {
        const { catalogCheckbox, albumCheckbox } = this.state;
        return (
          <div>
            <SelectField
              floatingLabelText="Synchronise from catalog"
              value={this.state.catalog}
              onChange={this.handleCatalogChange}>
              {this.props.catalogs.map(cat => {
                return <MenuItem key={cat.get('id')} value={cat.get('id')} primaryText={cat.get('name')} />;
              })}
              </SelectField>
            </div>
        );
      }

      case 3: {
        if (this.props.loading) { return }
        if (this.state.catalogType == 'DropboxCatalog') {
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
                defaultValue={this.state.verifier}
                floatingLabelText="Dropbox verifier code"
               />
           </div>
          );
        } else if (this.state.catalogType == 'FlickrCatalog') {
          return(
            <div>
              <p>
                Goto <a target="_blank" href={this.props.catalog.get('auth_url')}>Flickr</a> to
                authorize access to your Flickr account.
                Press 'Next' when done.
              </p>
            </div>
          )
        }
      }

      case 4: {
        if (this.props.loading) { return }

        const verified = this.props.catalog.get('verified', false)
        if (!!verified) {
          return (
            <p>
              Finished!
              Your catalog was successfully added to Dropbox
            </p>
          )
        } else {
          return (
            <p>
              Morron!
              You fucked up - all your shit will be deleted!!!
            </p>
          )
        }
      }
    }
  }

  renderContent() {
    const { stepIndex } = this.state;

    return (
      <div>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={[0,2,3,4].includes(stepIndex)}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 4 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>

    )
  }

  render() {
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };
    const paperStyle = {
      margin: 20,
      padding: 20,
      display: 'inline-block',
    };
    return (
      <Paper style={paperStyle}>
        <div style={ { width: '100%', margin: 'auto' } }>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select catalog type</StepLabel>
            </Step>
            <Step>
              <StepLabel>Enter name</StepLabel>
            </Step>
            <Step>
              <StepLabel>Approve Dropbox access</StepLabel>
            </Step>
            <Step>
              <StepLabel>Add catalog</StepLabel>
            </Step>
          </Stepper>

          <div>
            {this.renderContent()}
          </div>
        </div>
      </Paper>
    );
  }
}

NewCatalog.defaultProps = {
  stepIndex: 0,
};

export default NewCatalog;
