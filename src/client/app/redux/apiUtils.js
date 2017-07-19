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

  if (['POST', 'PUT'].includes(type)) {
    init.body = JSON.stringify(params);
  }

  var request = new Request(url, init);
  return request;
}

export function responseHandler(response, dispatch) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else if (response.status == 401) {
    const error = new Error(response.statusText);
    error.response = response;
    dispatch(notAuthorized());
    throw error;
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
