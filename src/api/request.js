import axios from 'axios'

var request = axios.create({
  baseURL: 'https://localhost:44353',
  withCredentials: true,
})
var requestCache = {};

function requestIntercept() {

  request.interceptors.response.use(function (res) {
    switch (Number(res.status)) {
      // post,put,patch,delete 成功
      case 201:
      case 204:
        return Promise.resolve()
      // get 成功
      case 200:
      default:
        return res.data;
    }
  }, function () {
    let code, message;

    return Promise.reject({
      code,
      message,
    })
  })
}

requestIntercept();

function requestFunc(method) {
  var promise,
    arg = Array.prototype.slice.call(arguments),
    _url = arg[1],
    _delete = () => {
      delete requestCache[_url];
    };

  if (requestCache[_url]) {
    return function () { };
  } else {
    requestCache[_url] = true;
  }
  // 创建请求
  if (typeof method === 'string') {

    if (typeof arg[2] === 'string' || typeof arg[2] === 'number') {
      promise = request[method](`${_url}/${arg[2]}`)
    } else {
      promise = request[method]
        .apply(null, arg.slice(1))
    }
  } else {
    promise = request.apply(null, arg)
  }
  promise.then(_delete, _delete);

  return function (promiseFunc, hasError = true) {
    var _funcPromise

    // 如果有promise处理函数,并且显示 error
    if (promiseFunc) {
      // 触发中间处理函数
      _funcPromise = promiseFunc(promise)

      // 存在则链形加入错误处理
      if (_funcPromise && hasError) {
        _funcPromise.catch(function () {
          // Message.error({
          //   content: message,
          //   duration: 2.5,
          // })
        })
      }
    }

    return _funcPromise || promise
  }
}

export {
  requestFunc,
}
