import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, IndexRoute, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import store from './store';

import SearchPhotos from './pages/photos/search';

import App from './pages/app';
import Home from './pages/home';

import Catalogs from './pages/catalogs';

import CatalogList from './components/catalogs/cataloglist';
import NewCatalog from './components/catalogs/new';
import CatalogPhotos from './pages/photos/catalog';

import Albums from './pages/albums';

import Photos from './pages/photos';
import PhotoCard from './components/card/photo';
import Bucket from './components/card/bucket';
import Login from './pages/login';

injectTapEventPlugin();
const app = document.getElementById('app');
const history = createBrowserHistory();

render(

  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter history={history}>
        <div>

          <Route path="/login" component={Login} />
          <App>

            <Route path="/albums" component={Albums}/>

            <Photos>
              <Route path="/photos" component={SearchPhotos}/>
            </Photos>

            <Catalogs>
              <Route path="/catalogs/list" component={CatalogList}/>
              <Route path="/catalogs/new" component={NewCatalog}/>
              <Route path="/catalogs/:id/photos/" component={CatalogPhotos}/>
              <Route path="/catalogs/:id/photos/:photoId/card" component={PhotoCard}/>
            </Catalogs>

          </App>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>, app);