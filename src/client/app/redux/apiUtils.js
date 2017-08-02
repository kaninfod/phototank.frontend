export const requestTypes = {
  POST:   'POST',
  GET:    'GET',
  DELETE: 'DELETE',
  PUT:    'PUT',
};

export var headers = new Headers({
  'Authorization': sessionStorage.jwt,
  'Content-Type': 'application/json',
});

export function toQueryString(paramsObject) {
  if (!paramsObject) return '';
  return Object
    .keys(paramsObject)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
    .join('&')
  ;
}

export function createRequest(type, url, params) {
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

export function apiHandler(funcPending, funcSuccess, request, dispatch) {
  dispatch(funcPending());
  fetch(request)
  .then(response => responseHandler(response, dispatch))
  .then(data => dispatch(funcSuccess(data)))
  .catch(error => console.log('request failed', error));
}

export function responseHandler(response, dispatch) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status == 401) {
    dispatch(notAuthorized());
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

// Action Creators
export function notAuthorized() {
  return dispatch => {
    dispatch({ type: 'LOG_OUT' });
  };
}
