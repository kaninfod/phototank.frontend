import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchCatalogs, importCatalog } from '../../redux/catalog';
import './card';
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
    this.importToCatalog = this.importToCatalog.bind(this);
    this.getCatalogs = this.getCatalogs.bind(this);
    this.state = {

    };
  }

  componentWillMount() {
    this.props.dispatch(fetchCatalogs());
  }

  importToCatalog(catalog) {
    this.props.dispatch(importCatalog({id: catalog.get('id')}))
  }

  getCatalogs() {
    this.props.dispatch(fetchCatalogs())
  }

  render() {

    const menuActions = {
      importToCatalog: this.importToCatalog,
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
          />
          }
        )
      }
    </div>
  );
}

export default CatalogList;
