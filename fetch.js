const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

function queryStringify(data) {
  let result = "?";
  Object.keys(data).map((key, i) => {
    if (i !== Object.keys(data).length - 1) result += `${key}=${data[key]}&`;
    else result += `${key}=${data[key]}`;
  });
  return result;
}

class HTTPTransport {
  get(url, options = {}) {
    const { data } = options;
    const additionalUrl = queryStringify(data);
    return this.request(url + additionalUrl, {
      ...options,
      method: METHODS.GET,
    });
  }

  post(url, options = {}) {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  post(url, options = {}) {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  delete(url, options = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  request(url, options = { method: METHODS.GET }) {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

function fetchWithRetry(url, options) {
  const foo = new HTTPTransport();
  let i = 0;
  const { retries } = options;

  while (i < retries) {
    try {
      return foo.request(url, { ...options });
    } catch (e) {
      i++;
      continue;
    }
  }
  return new Error();
}
