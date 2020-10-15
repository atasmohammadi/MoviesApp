/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data and headers
 */
export default async function request(url, options) {
  try {
    const response = await fetch(url, options);
    // in case we would have authentication
    // if(response.status === 401) logout();
    if (response.status >= 200 && response.status < 300) {
      const headers = {};
      response.headers.forEach((value, key) => (headers[key] = value));
      const data = await response.json();
      return {
        data,
        headers,
      };
    }
    const error = new Error();
    error.status = response.statusText;
    error.response = response;
    throw error;
  } catch (err) {
    // in case we would have authentication
    // if (err.response.status === 401) logout();
    throw err;
  }
}
