import fetch from 'dva/fetch';

// function parseJSON(response) {
//   return response.json();
// }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default async function request(url, options) {
  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();

  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}

// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }



// 另外一种处理错误的方法  同后台约定 返回的错误如下
// {
//   status: 'error',
//   message: '',
// }

function parseErrorMessage({ data }) {
  const { status, message } = data;
  if (status === 'error') {
    throw new Error(message); //这个是统一走到onError里
  }
  return { data };
}


