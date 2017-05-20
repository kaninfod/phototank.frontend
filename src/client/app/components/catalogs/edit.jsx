import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import '../../stylesheets/form';

const EditCatalog = (props) => {
  return (
      <div class="row">
        <form class="col s12">

            <TextField
              defaultValue={props.catalog.get('name')}
              floatingLabelText="Catalog Name"
             />
           <br/>
            <SelectField
              floatingLabelText="Catalog type"
              value={props.catalog.get('type')}
              onChange={props.typeChange}>
              <MenuItem value={1} primaryText="Master" />
              <MenuItem value="DropboxCatalog" primaryText="Dropbox" />
              <MenuItem value={3} primaryText="Flickr" />
              <MenuItem value={4} primaryText="Local" />
            </SelectField>
            <br/>
            <SelectField
              floatingLabelText="Sync from catalog"
              value={props.catalog.get('type')}
              onChange={props.typeChange}>
              {props.catalogs.map(cat => {
                if (cat.get('id') != props.catalog.get('id'))
                return <MenuItem key={cat.get('id')} value={cat.get('id')} primaryText={cat.get('name')} />
              })}
            </SelectField>
            <br/>
              <SelectField
                floatingLabelText="Sync from album"
                value={props.catalog.get('type')}
                onChange={props.typeChange}>
                {props.catalogs.map(cat => {
                  if (cat.get('id') != props.catalog.get('id'))
                  return <MenuItem key={cat.get('id')} value={cat.get('id')} primaryText={cat.get('name')} />
                })}
              </SelectField>

        </form>
      </div>


  );
}

export default EditCatalog
