export const API_BASE = `https://cors-anywhere.herokuapp.com/https://tiny-list.herokuapp.com/apis/api/v1`;
async function _fetchAPI(method, path, options = {}) {
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  // Extract the special opts
  // const token = options.token || cachedToken();

  const fetchOpts = {
    method,
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer-when-downgrade', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
    ...options,
  };

  if (fetchOpts.body && typeof fetchOpts.body === 'object') {
    fetchOpts.body = JSON.stringify(fetchOpts.body);
  }

  // if (token) {
  //     // Add the auth token
  //     fetchOpts.headers['X-AccessToken'] = token;
  // }

  let response = null;
  try {
    response = await fetch(`${API_BASE}${path}`, fetchOpts);
    //response = await fetch(`${API_BASE}${path}`, fetchOpts);

    if (response.ok) {
      let payload = true;
      try {
        payload = response.status !== 204 ? await response.json() : true;
      } catch (e) {
      } finally {
        return { data: payload };
      }
    } else {
      let responseError = true;
      try {
        responseError = await response.json();
      } catch (e) {
      } finally {
        return { error: responseError };
      }
    }
  } catch (err) {
    response = response || {
      error: { message: err.message, stack: err.stack },
    };
  }

  try {
    const json = await response.json();
    return { error: response.error || json || true };
  } finally {
    return { error: response.error || true };
  }
}

export async function getAPI(path, options) {
  return await _fetchAPI('GET', path, options);
}

export async function postAPI(path, body, options) {
  return await _fetchAPI('POST', path, { body, ...options });
}

export async function putAPI(path, body, options) {
  return await _fetchAPI('PUT', path, { body, ...options });
}

export async function deleteAPI(path, body, options) {
  return await _fetchAPI('DELETE', path, { body, ...options });
}
