import AppConstants from '../constants/constants';

var headers = new Headers({
  'Authorization': sessionStorage.jwt,
});

export function loadTags(photoId) {
  var url = '/api/photos/get_tag_list?photo_id='.concat(photoId);
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'FETCH_TAGS', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_TAGS', payload: err });
      });
  };
}

export function tagInput(tagInput) {
  if (tagInput.length < 2) {
    return { type: 'TAG_INPUT_VALUE', payload: tagInput };
  } else {
    var url = '/api/photos/get_tag_list?term='.concat(tagInput);
    return function (dispatch) {
      var request = new Request(url, { headers: headers, method: 'GET' });
      fetch(request)
        .then(response => {
          dispatch({ type: 'TAG_INPUT', payload: response.json() });
        })
        .catch((err) => {
          dispatch({ type: 'TAG_INPUT_ERROR', payload: err });
        })
        .then(() => {
          dispatch({ type: 'TAG_INPUT_VALUE', payload: tagInput });
        });
    };
  }
}

export function selectSuggestion(payload) {
  if (payload.selectedSuggestion) {
    return {
      type: 'SELECT_SUGGESTION_SET',
      payload,
    };
  } else {
    return { type: 'SELECT_SUGGESTION_UNSET' };
  }

  return newState;
}

export function addTag(payload) {
  var url = '/api/photos/'.concat(payload.photoId, '/addtag?name=', payload.name);
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'ADD_TAG', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_TAG', payload: err });
      });
  };
}

export function removeTag(payload) {
  var url = '/api/photos/'.concat(payload.photoId, '/removetag?name=', payload.name);
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'REMOVE_TAG', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'REMOVE_TAG', payload: err });
      });
  };

}
