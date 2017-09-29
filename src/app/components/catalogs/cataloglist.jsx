import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchCatalogs, importCatalog, deleteCatalog } from '../../redux/catalog';
import styles from '../../stylesheets/card';
import Catalog from './catalog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

@connect((store) => {
  return {
    catalogs: store.nCatalog.get('catalogs'),
  };
})
class CatalogList extends React.Component {
  constructor(props) {

    super(props);
    this.deleteCatalog = this.deleteCatalog.bind(this);
    this.importToCatalog = this.importToCatalog.bind(this);
    this.getCatalogs = this.getCatalogs.bind(this);
    this.state = {

    };
  }

  componentWillMount() {
    this.props.dispatch(fetchCatalogs());

  }

  importToCatalog(catalog) {
    this.props.dispatch(importCatalog(catalog.get('id')))
  }

  getCatalogs() {
    this.props.dispatch(fetchCatalogs())
  }

  deleteCatalog(catalogId) {
    this.props.dispatch(deleteCatalog(catalogId));
  }

  render() {
    const menuActions = {
      importToCatalog: this.importToCatalog,
      deleteCatalog: this.deleteCatalog,
    }

    return (
      <div>
        <Link to="/catalogs/new">
          <FloatingActionButton
            class={styles.fab}>
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
      {props.catalogs.valueSeq().map(catalog => {
        return <Catalog
          id={catalog.get('id')}
          key={catalog.get('id')}
          catalog={catalog}
          importToCatalog={props.menuActions.importToCatalog}
          delete={props.menuActions.deleteCatalog}
          />
          }
        )
      }
    </div>
  );
}

export default CatalogList;
