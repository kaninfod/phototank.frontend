import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import {
  newCatalog,
  getCatalogs,
  createCatalogs,
  importCatalog,
} from '../../actions/actCatalog';
import './card';
import Catalog from './catalog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

@connect((store) => {
  return {
    catalogs: store.catalog.get('catalogs'),
    albums: store.catalog.get('albums'),
    catalog: store.catalog.get('catalog'),
    loading: store.catalog.get('loading'),
  };
})
class CatalogList extends React.Component {
  constructor(props) {
    super(props);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.importToCatalog = this.importToCatalog.bind(this);
    this.getCatalogs = this.getCatalogs.bind(this);
    // this.setRenderMode = this.setRenderMode.bind(this);
    this.openNew = this.openNew.bind(this);

    this.state = {
      showNew: false,
      showEdit: false,
      // renderMode: 'list',
    };
  }

  componentWillMount() {
    this.props.dispatch(getCatalogs());
    // this.props.dispatch(loadAlbums());
  }

  importToCatalog(catalog) {
    this.props.dispatch(importCatalog({id: catalog.get('id')}))
  }

  openEdit(catalog) {
    this.setState({ showEdit: true, catalog: catalog })
  }

  closeEdit(e) {
    this.setState({ showEdit: false, catalog: null })
  }

  // setRenderMode(mode) {
  //   this.setState({ renderMode: mode })
  // }

  getCatalogs() {
    this.props.dispatch(getCatalogs())
  }

  openNew() {

    this.props.dispatch(newCatalog())
    // this.setState({ renderMode: 'new' })
  }

  submitEdit() {

  }

  render() {

    const menuActions = {
      importToCatalog: this.importToCatalog,
      openEdit:        this.openEdit,
      submitEdit:      this.submitEdit,
    }

    return (
      <div>
        <Link to="/catalogs/new">
          <FloatingActionButton
            class="fab">
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <List catalogs={this.props.catalogs} menuActions={menuActions}/>
      </div>
    );
  }
}

function List(props) {
  return (
    <div>
      {props.catalogs.map(catalog => {
        return <Catalog
          id={catalog.get('id')}
          key={catalog.get('id')}
          catalog={catalog}
          importToCatalog={props.menuActions.importToCatalog}
          openEdit={props.menuActions.openEdit}
          submitEdit={props.menuActions.submitEdit}
          />
          }
        )
      }
    </div>
  );
}

export default CatalogList;
