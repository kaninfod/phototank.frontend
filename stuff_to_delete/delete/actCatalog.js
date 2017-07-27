import stateTypes from '../constants/stateTypes';
import {
  catalogs,
  catalogsCreate,
  catalogsVerifyDropbox,
  catalogsUpdate,
  catalogsGet,
  catalogsImport
 } from '../api/apiCatalogs';
import store from '../store';

// export function getCatalogs() {
//   return function (dispatch) {
//     return catalogs()
//     .then(response => {
//       dispatch({ type: 'LOAD_CATALOGS_FULFILLED', payload: response });
//     })
//     .catch(error => {
//       throw(error);
//     });
//   };
// }

// export function getCatalog(payload) {
//   return function (dispatch) {
//
//     dispatch({ type: stateTypes.GET_CATALOG_PENDING });
//
//     return catalogsGet(payload)
//     .then(response => {
//       dispatch({ type: stateTypes.GET_CATALOG_FULFILLED, payload: response });
//     })
//     .catch(error => {
//       throw(error);
//     });
//   };
// }

// export function createCatalogs(payload) {
//   return function (dispatch) {
//
//     dispatch({ type: stateTypes.CREATE_CATALOG_PENDING });
//
//     return catalogsCreate(payload)
//     .then(response => {
//       dispatch({ type: 'CREATE_CATALOG_FULFILLED', payload: response });
//     })
//     .catch(error => {
//       throw(error);
//     });
//   };
// }

// export function updateCatalog(payload) {
//   return function (dispatch) {
//
//     dispatch({ type: stateTypes.UPDATE_CATALOG_PENDING });
//
//     return catalogsUpdate(payload)
//     .then(response => {
//       dispatch({ type: stateTypes.UPDATE_CATALOG_FULFILLED, payload: response });
//     })
//     .catch(error => {
//       throw(error);
//     });
//   };
// }

// export function newCatalog() {
//   return {
//     type: stateTypes.NEW_CATALOG,
//   };
// }

// export function verifyDropboxCatalog(payload) {
//   return function (dispatch) {
//
//     dispatch({ type: stateTypes.VERIFY_DROPBOX_PENDING });
//
//     return catalogsVerifyDropbox(payload)
//     .then(response => {
//       dispatch({ type: stateTypes.VERIFY_DROPBOX_FULFILLED, payload: response });
//     })
//     .catch(error => { throw(error); });
//   };
// }

export function importCatalog(payload) {
  return function (dispatch) {
    return catalogsImport(payload.id)
    .then(response => {
      dispatch({ type: 'IMPORT_CATALOG_FULFILLED', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}
