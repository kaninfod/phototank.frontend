export const requestTypes = {
  POST:   'POST',
  GET:    'GET',
  DELETE: 'DELETE',
  PUT:    'PUT',
};

export const apiService = store => next => action => {
  next(action);
  if (action.isAPI) {
    const _actionTypeSuccess = action.type.concat('_SUCCESS');
    const _actionTypeError = action.type.concat('_ERROR');
    const request = createRequest(action.httpVerb, action.url, action.params);
    fetch(request)
    .then(response => responseHandler(response))
    .then(data =>
      store.dispatch({ type: _actionTypeSuccess, payload: data })
    )
    .catch(error =>
      next({ type: _actionTypeError, payload: error })
    );
  }
};

export function createRequest(type, url, params) {
  const token = sessionStorage.jwt;
  const headers = new Headers({
    Authorization: token,
    'Content-Type': 'application/json',
  });
  var init = {
    headers: headers,
    method: type,
  };

  if ([requestTypes.POST, requestTypes.PUT, requestTypes.DELETE].includes(type)) {
    init.body = JSON.stringify(params);
  }

  var request = new Request(url, init);
  return request;
}

export function responseHandler(response, dispatch) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status == 401) {
    // dispatch(notAuthorized());
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function toQueryString(paramsObject) {
  if (!paramsObject) return '';
  return Object
    .keys(paramsObject)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
    .join('&')
  ;
}

// Action Creators
export function notAuthorized() {
  return dispatch => {
    dispatch({ type: 'LOG_OUT' });
  };
}