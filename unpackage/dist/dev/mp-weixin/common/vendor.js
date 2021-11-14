(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"July_fair","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!*********************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/utils/api.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.chooseImage = exports.uploadFile = exports.myRequest = void 0;var BASE_URL = 'http://120.24.48.171:8081';
var myRequest = function myRequest(option) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: BASE_URL + option.url,
      method: option.method || "GET",
      data: option.data || {},
      header: option.header || { 'Content-Type': 'application/json' },
      success: function success(res) {
        if (res.data.status !== 0) {
          return uni.showToast({
            icon: 'error',
            title: "获取数据失败" });

        }
        resolve(res);
      },
      fail: function fail(err) {
        uni.showToast({
          icon: 'error',
          title: "请求接口失败" });

        reject(err);
      } });

  });
};exports.myRequest = myRequest;

var uploadFile = function uploadFile(option) {
  return new Promise(function (resolve, reject) {
    uni.uploadFile({
      url: BASE_URL + option.url,
      method: option.method || "POST",
      filePath: option.tempFilePaths[0],
      name: 'file', //后台接收字段名
      success: function success(res) {
        if (res.statusCode == 200) {
          console.log('上传成功', res);
        } else
        {
          console.log('上传失败', res);
        }
        resolve(res);
      },
      fail: function fail(err) {
        console.log('请求失败', err);
        reject(err);
      } });

  });
};exports.uploadFile = uploadFile;

var chooseImage = function chooseImage() {
  return new Promise(function (resolve, reject) {
    uni.chooseImage({
      count: 1, //上传图片的数量，默认是9
      // sizeType: ['original', 'compressed'], 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: function success(res) {
        console.log('请求成功', res);
        resolve(res);
      },
      fail: function fail(err) {
        console.log('请求失败', err);
        reject(err);
      } });

  });
};exports.chooseImage = chooseImage;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!****************************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/utils/formatDate.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatTime = exports.formatDate = void 0;var formatDate = function formatDate(date) {var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  //格式化日期
  var d = new Date(date);
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  if (parseInt(minute) < 10) minute = "0" + minute;
  if (type == 3) {
    return year + '年' + month + "月" + day + "日 ";
  }
  return year + '年' + month + "月" + day + "日 " + hour + ":" + minute;
};exports.formatDate = formatDate;

var formatTime = function formatTime(date) {
  //格式化时间
  var d = new Date(date);
  var day = '' + d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  if (parseInt(minute) < 10) minute = "0" + minute;
  return day + "天" + hour + "小时";
};exports.formatTime = formatTime;

/***/ }),

/***/ 14:
/*!*****************************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/polyfill/polyfill.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 *
 * Api polyfill
 * 2021-03-06
 * 因小程序转换到uniapp，再运行到各平台时，总有这样那样的api，没法支持，
 * 现根据uniapp文档对各平台的支持度，或实现，或调用success来抹平各平台的差异，
 * 让代码能正常运行，下一步再解决这些api的兼容问题。
 *
 * code by 375890534@qq.com
 */
var base64Binary = __webpack_require__(/*! ./base64Binary */ 15);

/**
                                               * 获取guid
                                               */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
    v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

/**
   * 检查api是否未实现，没实现返回true
   * @param {Object} api
   */
function isApiNotImplemented(api) {
  return uni[api] === undefined ||  true && uni[api].toString().indexOf("is not yet implemented") > -1;
}

/**
   * 条件编译
   */
function platformPolyfill() {





}


/**
   * 登录相关api polyfill
   */
function loginPolyfill() {
  if (isApiNotImplemented("login")) {
    uni.login = function (options) {
      console.warn("api: uni.login 登录 在当前平台不支持，【关键流程函数】 回调成功");
      options.success && options.success({
        code: guid(),
        errMsg: "login:ok" });

    };
  }

  if (isApiNotImplemented("checkSession")) {
    uni.checkSession = function (options) {
      console.warn("api: uni.checkSession 检查登录状态是否过期 在当前平台不支持，【关键流程函数】 回调成功");
      options.success && options.success();
    };
  }

  if (isApiNotImplemented("getUserInfo")) {
    uni.getUserInfo = function (options) {
      console.warn("api: uni.getUserInfo 获取用户信息 在当前平台不支持，【关键流程函数】回调成功");
      options.success && options.success({
        userInfo: "" });

    };
  }
}

/**
   * 地图相关
   */
function mapPolyfill() {
  if (isApiNotImplemented("chooseLocation")) {
    uni.chooseLocation = function (options) {
      console.warn("api: uni.chooseLocation 打开地图选择位置 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("openLocation")) {
    uni.openLocation = function (object) {
      console.warn("api: uni.openLocation 使用应用内置地图查看位置 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("createMapContext")) {
    uni.createMapContext = function (mapId) {
      console.warn("api: uni.createMapContext 创建并返回 map 上下文 mapContext 对象 在当前平台不支持，返回空");
      return {
        $getAppMap: null,
        getCenterLocation: function getCenterLocation(options) {
          options.fail && options.fail();
        },
        moveToLocation: function moveToLocation(options) {
          options.fail && options.fail();
        },
        translateMarker: function translateMarker(options) {
          options.fail && options.fail();
        },
        includePoints: function includePoints(options) {},
        getRegion: function getRegion(options) {
          options.fail && options.fail();
        },
        getScale: function getScale(options) {
          options.fail && options.fail();
        } };

    };
  }
}

/**
   * 字符编码
   */
function base64Polyfill() {
  //将 Base64 字符串转成 ArrayBuffer 对象
  if (isApiNotImplemented("base64ToArrayBuffer")) {
    uni.base64ToArrayBuffer = function (base64) {
      return base64Binary.base64ToArrayBuffer(base64);
    };
  }

  //将 ArrayBuffer 对象转成 Base64 字符串
  if (isApiNotImplemented("arrayBufferToBase64")) {
    uni.arrayBufferToBase64 = function (buffer) {
      return base64Binary.arrayBufferToBase64(buffer);
    };
  }
}


/**
   * 媒体相关
   */
function mediaPolyfill() {
  if (isApiNotImplemented("saveImageToPhotosAlbum")) {
    uni.saveImageToPhotosAlbum = function (options) {
      console.warn("api: uni.saveImageToPhotosAlbum 保存图片到系统相册 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("compressImage")) {
    uni.compressImage = function (object) {
      console.warn("api: uni.compressImage 压缩图片接口 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("chooseMessageFile")) {
    //从微信聊天会话中选择文件。
    uni.chooseMessageFile = function (object) {
      console.warn("api: uni.chooseMessageFile 从微信聊天会话中选择文件。 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("getRecorderManager")) {
    //获取全局唯一的录音管理器 recorderManager
    uni.getRecorderManager = function (object) {
      console.warn("api: uni.getRecorderManager 获取全局唯一的录音管理器 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("getBackgroundAudioManager")) {
    //获取全局唯一的背景音频管理器 backgroundAudioManager
    uni.getBackgroundAudioManager = function (object) {
      console.warn("api: uni.getBackgroundAudioManager 获取全局唯一的背景音频管理器 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("chooseMedia")) {
    // 拍摄或从手机相册中选择图片或视频
    uni.chooseMedia = function (object) {
      console.warn("api: uni.chooseMedia 拍摄或从手机相册中选择图片或视频 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("saveVideoToPhotosAlbum")) {
    // 保存视频到系统相册
    uni.saveVideoToPhotosAlbum = function (object) {
      console.warn("api: uni.saveVideoToPhotosAlbum 保存视频到系统相册 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("getVideoInfo")) {
    // 获取视频详细信息
    uni.getVideoInfo = function (object) {
      console.warn("api: uni.getVideoInfo 获取视频详细信息 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("compressVideo")) {
    // 压缩视频接口
    uni.compressVideo = function (object) {
      console.warn("api: uni.compressVideo 压缩视频接口 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }


  if (isApiNotImplemented("openVideoEditor")) {
    // 打开视频编辑器
    uni.openVideoEditor = function (object) {
      console.warn("api: uni.openVideoEditor 打开视频编辑器 在当前平台不支持，回调失败");
      options.fail && options.fail();
    };
  }
}

/**
   * 设备
   */
function devicePolyfill() {
  if (isApiNotImplemented("canIUse")) {
    // 判断应用的 API，回调，参数，组件等是否在当前版本可用。
    // h5时，恒返回true
    uni.canIUse = function (object) {
      console.warn("api: uni.canIUse 判断API在当前平台是否可用 返回true");
      return true;
    };
  }

  //微信小程序
  if (isApiNotImplemented("startDeviceMotionListening")) {
    // 开始监听设备方向的变化
    uni.startDeviceMotionListening = function (options) {
      console.warn("api: uni.startDeviceMotionListening 开始监听设备方向的变化 在当前平台不支持");
      options.success && options.success();
    };
  }

  if (isApiNotImplemented("onMemoryWarning")) {
    // 监听内存不足告警事件。
    uni.onMemoryWarning = function (callback) {
      console.warn("监听内存不足告警事件，仅支持微信小程序、支付宝小程序、百度小程序、QQ小程序，当前平台不支持，已注释");
    };
  }

  if (isApiNotImplemented("offNetworkStatusChange")) {
    // 取消监听网络状态变化
    uni.offNetworkStatusChange = function (callback) {};
  }
  if (isApiNotImplemented("offAccelerometerChange")) {
    // 取消监听加速度数据。
    uni.offAccelerometerChange = function (callback) {};
  }
  if (isApiNotImplemented("startAccelerometer")) {
    // 开始监听加速度数据。
    uni.startAccelerometer = function (callback) {
      console.warn("api: uni.startAccelerometer 开始监听加速度数据 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("offCompassChange")) {
    // 取消监听罗盘数据
    uni.offCompassChange = function (callback) {
      console.warn("api: uni.offCompassChange 取消监听罗盘数据 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("startCompass")) {
    // 开始监听罗盘数据
    uni.startCompass = function (callback) {
      console.warn("api: uni.startCompass 开始监听罗盘数据 在当前平台不支持");
    };
  }


  if (isApiNotImplemented("onGyroscopeChange")) {
    // 监听陀螺仪数据变化事件
    uni.onGyroscopeChange = function (callback) {
      console.warn("api: uni.onGyroscopeChange 监听陀螺仪数据变化事件 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("startGyroscope")) {
    // 开始监听陀螺仪数据
    uni.startGyroscope = function (callback) {
      console.warn("api: uni.startGyroscope 监听陀螺仪数据变化事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("stopGyroscope")) {
    // 停止监听陀螺仪数据
    uni.stopGyroscope = function (callback) {
      console.warn("api: uni.stopGyroscope 停止监听陀螺仪数据 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("scanCode")) {
    // 调起客户端扫码界面，扫码成功后返回对应的结果
    uni.scanCode = function (callback) {
      console.warn("api: uni.scanCode 扫描二维码 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("setClipboardData")) {
    // 设置系统剪贴板的内容
    uni.setClipboardData = function (callback) {
      console.warn("api: uni.setClipboardData 设置系统剪贴板的内容 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getClipboardData")) {
    // 获取系统剪贴板内容
    uni.getClipboardData = function (callback) {
      console.warn("api: uni.getClipboardData 获取系统剪贴板内容 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("setScreenBrightness")) {
    // 设置屏幕亮度
    uni.setScreenBrightness = function (callback) {
      console.warn("api: uni.setScreenBrightness 设置屏幕亮度 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getScreenBrightness")) {
    // 获取屏幕亮度
    uni.getScreenBrightness = function (callback) {
      console.warn("api: uni.getScreenBrightness 获取屏幕亮度 在当前平台不支持");
    };
  }

  if (isApiNotImplemented("setKeepScreenOn")) {
    // 设置是否保持常亮状态
    uni.setKeepScreenOn = function (callback) {
      console.warn("api: uni.setKeepScreenOn 设置是否保持常亮状态 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onUserCaptureScreen")) {
    // 监听用户主动截屏事件
    uni.onUserCaptureScreen = function (callback) {
      console.warn("api: uni.onUserCaptureScreen 监听用户主动截屏事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("addPhoneContact")) {
    // 添加联系人
    uni.addPhoneContact = function (callback) {
      console.warn("api: uni.addPhoneContact 添加联系人 在当前平台不支持");
    };
  }
}

/**
   * 界面相关
   */
function uiPolyfill() {
  if (isApiNotImplemented("hideNavigationBarLoading")) {
    // 在当前页面隐藏导航条加载动画
    uni.hideNavigationBarLoading = function (options) {
      console.warn("api: uni.hideNavigationBarLoading 在当前页面隐藏导航条加载动画 在当前平台不支持，回调成功");
      options.success && options.success();
    };
  }
  if (isApiNotImplemented("hideHomeButton")) {
    // 隐藏返回首页按钮
    uni.hideHomeButton = function (options) {
      console.warn("api: uni.hideHomeButton 隐藏返回首页按钮 在当前平台不支持，回调成功");
      options.success && options.success();
    };
  }

  if (isApiNotImplemented("setTabBarItem")) {
    // 动态设置 tabBar 某一项的内容
    uni.setTabBarItem = function (options) {
      console.warn("api: uni.setTabBarItem 动态设置 tabBar 某一项的内容 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("setTabBarStyle")) {
    // 动态设置 tabBar 的整体样式
    uni.setTabBarStyle = function (options) {
      console.warn("api: uni.setTabBarStyle 动态设置 tabBar 的整体样式 在当前平台不支持，回调成功");
      options.success && options.success();
    };
  }

  if (isApiNotImplemented("hideTabBar")) {
    // 隐藏 tabBar
    uni.hideTabBar = function (options) {
      console.warn("api: uni.hideTabBar 隐藏 tabBar 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }


  if (isApiNotImplemented("showTabBar")) {
    // 显示 tabBar
    uni.showTabBar = function (options) {
      console.warn("api: uni.showTabBar 显示 tabBar 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("setTabBarBadge")) {
    // 为 tabBar 某一项的右上角添加文本
    uni.setTabBarBadge = function (options) {
      console.warn("api: uni.setTabBarBadge 为 tabBar 某一项的右上角添加文本 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("removeTabBarBadge")) {
    // 移除 tabBar 某一项右上角的文本
    uni.removeTabBarBadge = function (options) {
      console.warn("api: uni.removeTabBarBadge 移除 tabBar 某一项右上角的文本 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("showTabBarRedDot")) {
    // 显示 tabBar 某一项的右上角的红点
    uni.showTabBarRedDot = function (options) {
      console.warn("api: uni.showTabBarRedDot 显示 tabBar 某一项的右上角的红点 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("hideTabBarRedDot")) {
    // 隐藏 tabBar 某一项的右上角的红点
    uni.hideTabBarRedDot = function (options) {
      console.warn("api: uni.hideTabBarRedDot 隐藏 tabBar 某一项的右上角的红点 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  ///////////////////////////////
  if (isApiNotImplemented("setBackgroundColor")) {
    // 动态设置窗口的背景色
    uni.setBackgroundColor = function (options) {
      console.warn("api: uni.setBackgroundColor 动态设置窗口的背景色 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("setBackgroundTextStyle")) {
    // 动态设置下拉背景字体、loading 图的样式
    uni.setBackgroundTextStyle = function (options) {
      console.warn("api: uni.setBackgroundTextStyle 动态设置下拉背景字体、loading 图的样式 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("onWindowResize")) {
    // 监听窗口尺寸变化事件
    uni.onWindowResize = function (callback) {
      console.warn("api: uni.onWindowResize 监听窗口尺寸变化事件 在当前平台不支持，执行失败");
      callback && callback();
    };
  }
  if (isApiNotImplemented("offWindowResize")) {
    // 取消监听窗口尺寸变化事件
    uni.offWindowResize = function (callback) {
      console.warn("api: uni.offWindowResize 取消监听窗口尺寸变化事件 在当前平台不支持，执行失败");
      callback && callback();
    };
  }
  if (isApiNotImplemented("loadFontFace")) {
    // 动态加载网络字体
    uni.loadFontFace = function (options) {
      console.warn("api: uni.loadFontFace 动态加载网络字体 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getMenuButtonBoundingClientRect")) {
    // 微信胶囊按钮布局信息
    uni.getMenuButtonBoundingClientRect = function () {
      console.warn("api: uni.getMenuButtonBoundingClientRect 微信胶囊按钮布局信息 在当前平台不支持，执行失败");
    };
  }
}
/**
   * file
   */
function filePolyfill() {
  if (isApiNotImplemented("saveFile")) {
    // 保存文件到本地
    uni.saveFile = function (options) {
      console.warn("api: uni.saveFile 保存文件到本地 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getSavedFileList")) {
    // 获取本地已保存的文件列表
    uni.getSavedFileList = function (options) {
      console.warn("api: uni.getSavedFileList 获取本地已保存的文件列表 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getSavedFileInfo")) {
    // 获取本地文件的文件信息
    uni.getSavedFileInfo = function (options) {
      console.warn("api: uni.getSavedFileInfo 获取本地文件的文件信息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("removeSavedFile")) {
    // 删除本地存储的文件
    uni.removeSavedFile = function (options) {
      console.warn("api: uni.removeSavedFile 删除本地存储的文件 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getFileInfo")) {
    // 获取文件信息
    uni.getFileInfo = function (options) {
      console.warn("api: uni.getFileInfo 获取文件信息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("openDocument")) {
    // 新开页面打开文档
    uni.openDocument = function (options) {
      console.warn("api: uni.openDocument 新开页面打开文档 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getFileSystemManager")) {
    // 获取全局唯一的文件管理器
    uni.getFileSystemManager = function () {
      console.warn("api: uni.getFileSystemManager 获取全局唯一的文件管理器 在当前平台不支持，执行失败");
    };
  }
}

/**
   * canvas
   */
function canvasPolyfill() {
  if (isApiNotImplemented("createOffscreenCanvas")) {
    // 创建离屏 canvas 实例
    uni.createOffscreenCanvas = function () {
      console.warn("api: uni.createOffscreenCanvas 创建离屏 canvas 实例 在当前平台不支持，执行失败");
    };
  }

  if (isApiNotImplemented("canvasToTempFilePath")) {
    // 把当前画布指定区域的内容导出生成指定大小的图片
    uni.canvasToTempFilePath = function () {
      console.warn("api: uni.canvasToTempFilePath 把当前画布指定区域的内容导出生成指定大小的图片 在当前平台不支持，执行失败");
    };
  }
}

/**
   * Ad广告
   */
function adPolyfill() {
  if (isApiNotImplemented("createRewardedVideoAd")) {
    // 激励视频广告
    uni.createRewardedVideoAd = function () {
      console.warn("api: uni.createRewardedVideoAd 激励视频广告 在当前平台不支持，执行失败");
      return {
        show: function show() {},
        onLoad: function onLoad() {},
        offLoad: function offLoad() {},
        load: function load() {},
        onError: function onError() {},
        offError: function offError() {},
        onClose: function onClose() {},
        offClose: function offClose() {} };

    };
  }
  if (isApiNotImplemented("createInterstitialAd")) {
    // 插屏广告组件
    uni.createInterstitialAd = function () {
      console.warn("api: uni.createInterstitialAd 插屏广告组件 在当前平台不支持，执行失败");
    };
  }
}

/**
   * 第三方
   */
function pluginsPolyfill() {
  if (isApiNotImplemented("getProvider")) {
    // 获取服务供应商
    uni.getProvider = function (options) {
      console.warn("api: uni.getProvider 获取服务供应商 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("showShareMenu")) {
    // 小程序的原生菜单中显示分享按钮
    uni.showShareMenu = function (options) {
      console.warn("api: uni.showShareMenu 小程序的原生菜单中显示分享按钮 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("hideShareMenu")) {
    // 小程序的原生菜单中显示分享按钮
    uni.hideShareMenu = function (options) {
      console.warn("api: uni.hideShareMenu 小程序的原生菜单中隐藏分享按钮 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("requestPayment")) {
    // 支付
    uni.requestPayment = function (options) {
      console.error("api: uni.requestPayment 支付 在当前平台不支持(需自行参考文档封装)，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("createWorker")) {
    // 创建一个 Worker 线程
    uni.createWorker = function () {
      console.error("api: uni.createWorker 创建一个 Worker 线程 在当前平台不支持，执行失败");
    };
  }
}

/**
   * 其他
   */
function otherPolyfill() {
  if (isApiNotImplemented("authorize")) {
    // 提前向用户发起授权请求
    uni.authorize = function (options) {
      console.warn("api: uni.authorize 提前向用户发起授权请求 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("openSetting")) {
    // 调起客户端小程序设置界面
    uni.openSetting = function (options) {
      console.warn("api: uni.openSetting 调起客户端小程序设置界面 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }

  if (isApiNotImplemented("getSetting")) {
    // 获取用户的当前设置
    uni.getSetting = function (options) {
      console.warn("api: uni.getSetting 获取用户的当前设置 在当前平台不支持，【关键流程函数】回调成功");
      options.success && options.success({
        authSetting: {
          scope: {
            userInfo: false } } });



    };
  }

  if (isApiNotImplemented("chooseAddress")) {
    // 获取用户收货地址
    uni.chooseAddress = function (options) {
      console.warn("api: uni.chooseAddress 获取用户收货地址 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("chooseInvoiceTitle")) {
    // 选择用户的发票抬头
    uni.chooseInvoiceTitle = function (options) {
      console.warn("api: uni.chooseInvoiceTitle 选择用户的发票抬头 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("navigateToMiniProgram")) {
    // 打开另一个小程序
    uni.navigateToMiniProgram = function (options) {
      console.warn("api: uni.navigateToMiniProgram 打开另一个小程序 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("navigateBackMiniProgram")) {
    // 跳转回上一个小程序
    uni.navigateBackMiniProgram = function (options) {
      console.warn("api: uni.navigateBackMiniProgram 跳转回上一个小程序 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getAccountInfoSync")) {
    // 获取当前帐号信息
    uni.getAccountInfoSync = function (options) {
      console.warn("api: uni.getAccountInfoSync 获取当前帐号信息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getAccountInfoSync")) {
    // 获取当前帐号信息
    uni.getAccountInfoSync = function (options) {
      console.warn("api: uni.getAccountInfoSync 获取当前帐号信息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("requestSubscribeMessage")) {
    // 订阅消息
    uni.requestSubscribeMessage = function (options) {
      console.warn("api: uni.requestSubscribeMessage 订阅消息 在当前平台不支持，执行失败");
      options.fail && options.fail();
    };
  }
  if (isApiNotImplemented("getUpdateManager")) {
    // 管理小程序更新
    uni.getUpdateManager = function (options) {
      console.error("api: uni.getUpdateManager 管理小程序更新 在当前平台不支持，执行失败");
    };
  }
  if (isApiNotImplemented("setEnableDebug")) {
    // 设置是否打开调试开关
    uni.setEnableDebug = function (options) {
      console.error("api: uni.setEnableDebug 设置是否打开调试开关 在当前平台不支持，执行失败");
    };
  }
  if (isApiNotImplemented("getExtConfig")) {
    // 获取第三方平台自定义的数据字段
    uni.getExtConfig = function (options) {
      console.error("api: uni.getExtConfig 获取第三方平台自定义的数据字段 在当前平台不支持，执行失败");
    };
  }
  if (isApiNotImplemented("getExtConfigSync")) {
    // uni.getExtConfig 的同步版本
    uni.getExtConfigSync = function (options) {
      console.error("api: uni.getExtConfigSync uni.getExtConfig 的同步版本 在当前平台不支持，执行失败");
    };
  }
}

/**
   * 认证
   */
function soterAuthPolyfill() {
  if (isApiNotImplemented("startSoterAuthentication")) {
    // 开始 SOTER 生物认证
    uni.startSoterAuthentication = function (options) {
      console.warn("api: uni.startSoterAuthentication 开始 SOTER 生物认证 在当前平台不支持");
      options.success && options.success();
    };
  }
  if (isApiNotImplemented("checkIsSupportSoterAuthentication")) {
    // 获取本机支持的 SOTER 生物认证方式
    uni.checkIsSupportSoterAuthentication = function (options) {
      console.warn("api: uni.checkIsSupportSoterAuthentication 开获取本机支持的 SOTER 生物认证方式 在当前平台不支持");
      options.success && options.success();
    };
  }
  if (isApiNotImplemented("checkIsSoterEnrolledInDevice")) {
    // 获取设备内是否录入如指纹等生物信息的接口
    uni.checkIsSoterEnrolledInDevice = function (options) {
      console.warn("api: uni.checkIsSoterEnrolledInDevice 获取设备内是否录入如指纹等生物信息的接口 在当前平台不支持");
      options.success && options.success();
    };
  }
}

/**
   * nfc
   */
function nfcPolyfill() {
  //微信小程序
  if (isApiNotImplemented("startHCE")) {
    // 初始化 NFC 模块
    uni.startHCE = function (options) {
      console.warn("api: uni.startHCE 初始化 NFC 模块 在当前平台不支持");
      options.success && options.success();
    };
  }
}

/**
   * 电量
   */
function batteryPolyfill() {
  //微信小程序
  if (isApiNotImplemented("getBatteryInfo")) {
    // 获取设备电量
    uni.getBatteryInfo = function (options) {
      console.warn("api: uni.getBatteryInfo 获取设备电量 在当前平台不支持");
      options.success && options.success();
    };
  }
  //微信小程序
  if (isApiNotImplemented("getBatteryInfoSync")) {
    // 同步获取设备电量
    uni.getBatteryInfoSync = function (options) {
      console.warn("api: uni.getBatteryInfoSync 同步获取设备电量 在当前平台不支持");
    };
  }
}

/**
   * wifi
   */
function wifiPolyfill() {
  //微信小程序
  if (isApiNotImplemented("startWifi")) {
    // 初始化 Wi-Fi 模块
    uni.startWifi = function (options) {
      console.warn("api: uni.startWifi 初始化 Wi-Fi 模块 在当前平台不支持");
      options.success && options.success();
    };
  }
  //字节跳动
  if (isApiNotImplemented("getConnectedWifi")) {
    // 获取设备当前所连的 WiFi 信息
    uni.getConnectedWifi = function (options) {
      console.warn("api: uni.getConnectedWifi 初获取设备当前所连的 WiFi 信息 在当前平台不支持");
      options.success && options.success();
    };
  }
}

/**
   * 蓝牙
   */
function bluetoothPolyfill() {
  //蓝牙
  if (isApiNotImplemented("openBluetoothAdapter")) {
    // 初始化蓝牙模块
    uni.openBluetoothAdapter = function (object) {
      console.warn("api: uni.openBluetoothAdapter 初始化蓝牙模块 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("startBluetoothDevicesDiscovery")) {
    // 开始搜寻附近的蓝牙外围设备
    uni.startBluetoothDevicesDiscovery = function (callback) {
      console.warn("api: uni.startBluetoothDevicesDiscovery 开始搜寻附近的蓝牙外围设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onBluetoothDeviceFound")) {
    // 监听寻找到新设备的事件
    uni.onBluetoothDeviceFound = function (callback) {
      console.warn("api: uni.onBluetoothDeviceFound 监听寻找到新设备的事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("stopBluetoothDevicesDiscovery")) {
    // 停止搜寻附近的蓝牙外围设备
    uni.stopBluetoothDevicesDiscovery = function (callback) {
      console.warn("api: uni.stopBluetoothDevicesDiscovery 停止搜寻附近的蓝牙外围设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onBluetoothAdapterStateChange")) {
    // 监听蓝牙适配器状态变化事件
    uni.onBluetoothAdapterStateChange = function (callback) {
      console.warn("api: uni.onBluetoothAdapterStateChange 监听蓝牙适配器状态变化事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getConnectedBluetoothDevices")) {
    // 根据 uuid 获取处于已连接状态的设备
    uni.getConnectedBluetoothDevices = function (callback) {
      console.warn("api: uni.getConnectedBluetoothDevices 根据 uuid 获取处于已连接状态的设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBluetoothDevices")) {
    // 获取在蓝牙模块生效期间所有已发现的蓝牙设备
    uni.getBluetoothDevices = function (callback) {
      console.warn("api: uni.getBluetoothDevices 获取在蓝牙模块生效期间所有已发现的蓝牙设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBluetoothAdapterState")) {
    // 获取本机蓝牙适配器状态
    uni.getBluetoothAdapterState = function (callback) {
      console.warn("api: uni.getBluetoothAdapterState 获取本机蓝牙适配器状态 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("closeBluetoothAdapter")) {
    // 关闭蓝牙模块
    uni.closeBluetoothAdapter = function (callback) {
      console.warn("api: uni.closeBluetoothAdapter 关闭蓝牙模块 在当前平台不支持");
    };
  }
}

/**
   * 低功耗蓝牙
   */
function blePolyfill() {
  if (isApiNotImplemented("setBLEMTU")) {
    // 设置蓝牙最大传输单元
    uni.setBLEMTU = function (callback) {
      console.warn("api: uni.setBLEMTU 设置蓝牙最大传输单元 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("readBLECharacteristicValue")) {
    // 读取低功耗蓝牙设备的特征值的二进制数据值
    uni.readBLECharacteristicValue = function (callback) {
      console.warn("api: uni.readBLECharacteristicValue 读取低功耗蓝牙设备的特征值的二进制数据值 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onBLEConnectionStateChange")) {
    // 关闭蓝牙模块
    uni.onBLEConnectionStateChange = function (callback) {
      console.warn("api: uni.onBLEConnectionStateChange 监听低功耗蓝牙连接状态的改变事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("notifyBLECharacteristicValueChange")) {
    // 启用低功耗蓝牙设备特征值变化时的 notify 功能
    uni.notifyBLECharacteristicValueChange = function (callback) {
      console.warn("api: uni.notifyBLECharacteristicValueChange 启用低功耗蓝牙设备特征值变化时的 notify 功能 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBLEDeviceServices")) {
    // 获取蓝牙设备所有服务
    uni.getBLEDeviceServices = function (callback) {
      console.warn("api: uni.getBLEDeviceServices 获取蓝牙设备所有服务 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBLEDeviceRSSI")) {
    // 获取蓝牙设备的信号强度
    uni.getBLEDeviceRSSI = function (callback) {
      console.warn("api: uni.getBLEDeviceRSSI 获取蓝牙设备的信号强度 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("createBLEConnection")) {
    // 连接低功耗蓝牙设备
    uni.createBLEConnection = function (callback) {
      console.warn("api: uni.createBLEConnection 连接低功耗蓝牙设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("closeBLEConnection")) {
    // 断开与低功耗蓝牙设备的连接
    uni.closeBLEConnection = function (callback) {
      console.warn("api: uni.closeBLEConnection 断开与低功耗蓝牙设备的连接 在当前平台不支持");
    };
  }
}

/**
   * iBeacon
   */
function iBeaconPolyfill() {
  if (isApiNotImplemented("onBeaconServiceChange")) {
    // 监听 iBeacon 服务状态变化事件
    uni.onBeaconServiceChange = function (callback) {
      console.warn("api: uni.onBeaconServiceChange 监听 iBeacon 服务状态变化事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("onBeaconUpdate")) {
    // 监听 iBeacon 设备更新事件
    uni.onBeaconUpdate = function (callback) {
      console.warn("api: uni.onBeaconUpdate 监听 iBeacon 设备更新事件 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("getBeacons")) {
    // 获取所有已搜索到的 iBeacon 设备
    uni.getBeacons = function (callback) {
      console.warn("api: uni.getBeacons 获取所有已搜索到的 iBeacon 设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("startBeaconDiscovery")) {
    // 开始搜索附近的 iBeacon 设备
    uni.startBeaconDiscovery = function (callback) {
      console.warn("api: uni.startBeaconDiscovery 开始搜索附近的 iBeacon 设备 在当前平台不支持");
    };
  }
  if (isApiNotImplemented("stopBeaconDiscovery")) {
    // 停止搜索附近的 iBeacon 设备
    uni.stopBeaconDiscovery = function (callback) {
      console.warn("api: uni.stopBeaconDiscovery 停止搜索附近的 iBeacon 设备 在当前平台不支持");
    };
  }
}

/**
  * uni.navigateTo 和 uni.redirectTo 不能直接跳转tabbar里面的页面，拦截fail，并当它为tabbar页面时，直接调用uni.switchTab()
  */
function routerPolyfill() {
  var routerApiFailEventHandle = function routerApiFailEventHandle(res, options) {
    if (res.errMsg.indexOf('tabbar page') > -1) {
      console.error('res.errMsg' + res.errMsg);
      var apiName = res.errMsg.match(/not\s(\w+)\sa/)[1];
      console.log(apiName);
      var url = options.url;
      if (url) {
        var queryString = url.split('?')[1];
        if (queryString) {
          console.error(apiName + " 的参数将被忽略：" + queryString);
        }
        uni.switchTab({
          url: url });

      }
    }
  };

  var routerApiHandle = function routerApiHandle(oriLogFunc) {
    return function (options) {
      try {
        if (options.fail) {
          options.fail = function fail(failFun) {
            return function (res) {
              routerApiFailEventHandle(res, options);
              failFun(res);
            };
          }(options.fail);
        } else {
          options.fail = function (res) {
            routerApiFailEventHandle(res, options);
          };
        }
        oriLogFunc.call(oriLogFunc, options);
      } catch (e) {
        console.error('uni.navigateTo or uni.redirectTo error', e);
      }
    };
  };

  uni.navigateTo = routerApiHandle(uni.navigateTo);
  uni.redirectTo = routerApiHandle(uni.redirectTo);
}

var isInit = false;
/**
                     * polyfill 入口
                     */
function init() {
  if (isInit) return;
  isInit = true;

  console.log("Api polyfill start");
  //条件编译
  platformPolyfill();
  //登录
  loginPolyfill();
  //base64
  base64Polyfill();
  //地图
  mapPolyfill();
  //设备
  devicePolyfill();

  //媒体相关
  mediaPolyfill();

  //蓝牙
  bluetoothPolyfill();
  //低功耗蓝牙
  blePolyfill();
  //iBeacon
  iBeaconPolyfill();
  //wifi
  wifiPolyfill();
  //电量信息
  batteryPolyfill();
  //nfc
  nfcPolyfill();
  //auth
  soterAuthPolyfill();

  //ui
  uiPolyfill();
  //file
  filePolyfill();
  //canvas
  canvasPolyfill();
  //ad
  adPolyfill();
  //plugins
  pluginsPolyfill();
  //other
  otherPolyfill();

  //router
  routerPolyfill();
}


module.exports = {
  init: init };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!*********************************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/polyfill/base64Binary.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 借鉴自：https://github.com/dankogai/js-base64/blob/main/base64.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 因uniapp没有引用window，也无法使用Buffer，因此直接使用polyfill
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */

var b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64chs = _toConsumableArray(b64ch);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var b64tab = function (a) {
  var tab = {};
  a.forEach(function (c, i) {return tab[c] = i;});
  return tab;
}(b64chs);
var _fromCC = String.fromCharCode.bind(String);

/**
                                                 * polyfill version of `btoa`
                                                 */
var btoaPolyfill = function btoaPolyfill(bin) {
  // console.log('polyfilled');
  var u32,c0,c1,c2,asc = '';
  var pad = bin.length % 3;
  for (var i = 0; i < bin.length;) {
    if ((c0 = bin.charCodeAt(i++)) > 255 ||
    (c1 = bin.charCodeAt(i++)) > 255 ||
    (c2 = bin.charCodeAt(i++)) > 255)
    throw new TypeError('invalid character found');
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] +
    b64chs[u32 >> 12 & 63] +
    b64chs[u32 >> 6 & 63] +
    b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};

/**
    * polyfill version of `atob`
    */
var atobPolyfill = function atobPolyfill(asc) {
  // console.log('polyfilled');
  asc = asc.replace(/\s+/g, '');
  if (!b64re.test(asc))
  throw new TypeError('malformed base64.');
  asc += '=='.slice(2 - (asc.length & 3));
  var u24,bin = '',r1,r2;
  for (var i = 0; i < asc.length;) {
    u24 = b64tab[asc.charAt(i++)] << 18 |
    b64tab[asc.charAt(i++)] << 12 |
    (r1 = b64tab[asc.charAt(i++)]) << 6 | (
    r2 = b64tab[asc.charAt(i++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) :
    r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) :
    _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};

//base64转ArrayBuffer
function base64ToArrayBuffer(base64) {
  var binaryStr = atobPolyfill(base64);
  var byteLength = binaryStr.length;
  var bytes = new Uint8Array(byteLength);
  for (var i = 0; i < byteLength; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

//ArrayBuffer转base64
function arrayBufferToBase64(buffer) {
  var binaryStr = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binaryStr += String.fromCharCode(bytes[i]);
  }
  return btoaPolyfill(binaryStr);
}

module.exports = {
  base64ToArrayBuffer: base64ToArrayBuffer,
  arrayBufferToBase64: arrayBufferToBase64 };

/***/ }),

/***/ 16:
/*!***************************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/polyfill/mixins.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 如果你想删除本文件，请先确认它使用的范围，感谢合作~
                                                                                                      *
                                                                                                      * auth: 375890534@qq.com
                                                                                                      */var _default =
{
  methods: {
    //转义符换成普通字符
    escape2Html: function escape2Html(str) {
      if (!str) return str;
      var arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"' };

      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
      });
    },
    //普通字符转换成转义符
    html2Escape: function html2Escape(sHtml) {
      if (!sHtml) return sHtml;
      return sHtml.replace(/[<>&"]/g, function (c) {
        return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;' }[
        c];
      });
    },
    //setData polyfill 勿删!!!   (用于转换后的uniapp的项目能直接使用this.setData()函数)
    setData: function setData(obj, callback) {
      var that = this;
      var handleData = function handleData(tepData, tepKey, afterKey) {
        var tepData2 = tepData;
        tepKey = tepKey.split('.');
        tepKey.forEach(function (item) {
          if (tepData[item] === null || tepData[item] === undefined) {
            var reg = /^[0-9]+$/;
            tepData[item] = reg.test(afterKey) ? [] : {};
            tepData2 = tepData[item];
          } else {
            tepData2 = tepData[item];
          }
        });
        return tepData2;
      };
      var isFn = function isFn(value) {
        return typeof value == 'function' || false;
      };
      Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        key = key.replace(/\]/g, '').replace(/\[/g, '.');
        var front, after;
        var index_after = key.lastIndexOf('.');
        if (index_after != -1) {
          after = key.slice(index_after + 1);
          front = handleData(that, key.slice(0, index_after), after);
        } else {
          after = key;
          front = that;
        }
        if (front.$data && front.$data[after] === undefined) {
          Object.defineProperty(front, after, {
            get: function get() {
              return front.$data[after];
            },
            set: function set(newValue) {
              front.$data[after] = newValue;
              that.hasOwnProperty("$forceUpdate") && that.$forceUpdate();
            },
            enumerable: true,
            configurable: true });

          front[after] = val;
        } else {
          that.$set(front, after, val);
        }
      });
      // this.$forceUpdate();
      isFn(callback) && this.$nextTick(callback);
    } } };exports.default = _default;

/***/ }),

/***/ 197:
/*!**************************************************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/components/region-picker/region-picker.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var zones_tree = [{ "id": "1", "name": "北京市", "code": "110000", "children": [{ "id": "1", "name": "市辖区", "code": "110100", "children": [{ "id": "1", "name": "东城区", "code": "110101" }, { "id": "2", "name": "西城区", "code": "110102" }, { "id": "3", "name": "朝阳区", "code": "110105" }, { "id": "4", "name": "丰台区", "code": "110106" }, { "id": "5", "name": "石景山区", "code": "110107" }, { "id": "6", "name": "海淀区", "code": "110108" }, { "id": "7", "name": "门头沟区", "code": "110109" }, { "id": "8", "name": "房山区", "code": "110111" }, { "id": "9", "name": "通州区", "code": "110112" }, { "id": "10", "name": "顺义区", "code": "110113" }, { "id": "11", "name": "昌平区", "code": "110114" }, { "id": "12", "name": "大兴区", "code": "110115" }, { "id": "13", "name": "怀柔区", "code": "110116" }, { "id": "14", "name": "平谷区", "code": "110117" }, { "id": "15", "name": "密云区", "code": "110118" }, { "id": "16", "name": "延庆区", "code": "110119" }] }] }, { "id": "2", "name": "天津市", "code": "120000", "children": [{ "id": "2", "name": "市辖区", "code": "120100", "children": [{ "id": "17", "name": "和平区", "code": "120101" }, { "id": "18", "name": "河东区", "code": "120102" }, { "id": "19", "name": "河西区", "code": "120103" }, { "id": "20", "name": "南开区", "code": "120104" }, { "id": "21", "name": "河北区", "code": "120105" }, { "id": "22", "name": "红桥区", "code": "120106" }, { "id": "23", "name": "东丽区", "code": "120110" }, { "id": "24", "name": "西青区", "code": "120111" }, { "id": "25", "name": "津南区", "code": "120112" }, { "id": "26", "name": "北辰区", "code": "120113" }, { "id": "27", "name": "武清区", "code": "120114" }, { "id": "28", "name": "宝坻区", "code": "120115" }, { "id": "29", "name": "滨海新区", "code": "120116" }, { "id": "30", "name": "宁河区", "code": "120117" }, { "id": "31", "name": "静海区", "code": "120118" }, { "id": "32", "name": "蓟州区", "code": "120119" }] }] }, { "id": "3", "name": "河北省", "code": "130000", "children": [{ "id": "3", "name": "石家庄市", "code": "130100", "children": [{ "id": "33", "name": "市辖区", "code": "130101" }, { "id": "34", "name": "长安区", "code": "130102" }, { "id": "35", "name": "桥西区", "code": "130104" }, { "id": "36", "name": "新华区", "code": "130105" }, { "id": "37", "name": "井陉矿区", "code": "130107" }, { "id": "38", "name": "裕华区", "code": "130108" }, { "id": "39", "name": "藁城区", "code": "130109" }, { "id": "40", "name": "鹿泉区", "code": "130110" }, { "id": "41", "name": "栾城区", "code": "130111" }, { "id": "42", "name": "井陉县", "code": "130121" }, { "id": "43", "name": "正定县", "code": "130123" }, { "id": "44", "name": "行唐县", "code": "130125" }, { "id": "45", "name": "灵寿县", "code": "130126" }, { "id": "46", "name": "高邑县", "code": "130127" }, { "id": "47", "name": "深泽县", "code": "130128" }, { "id": "48", "name": "赞皇县", "code": "130129" }, { "id": "49", "name": "无极县", "code": "130130" }, { "id": "50", "name": "平山县", "code": "130131" }, { "id": "51", "name": "元氏县", "code": "130132" }, { "id": "52", "name": "赵县", "code": "130133" }, { "id": "53", "name": "晋州市", "code": "130183" }, { "id": "54", "name": "新乐市", "code": "130184" }] }, { "id": "4", "name": "唐山市", "code": "130200", "children": [{ "id": "55", "name": "市辖区", "code": "130201" }, { "id": "56", "name": "路南区", "code": "130202" }, { "id": "57", "name": "路北区", "code": "130203" }, { "id": "58", "name": "古冶区", "code": "130204" }, { "id": "59", "name": "开平区", "code": "130205" }, { "id": "60", "name": "丰南区", "code": "130207" }, { "id": "61", "name": "丰润区", "code": "130208" }, { "id": "62", "name": "曹妃甸区", "code": "130209" }, { "id": "63", "name": "滦县", "code": "130223" }, { "id": "64", "name": "滦南县", "code": "130224" }, { "id": "65", "name": "乐亭县", "code": "130225" }, { "id": "66", "name": "迁西县", "code": "130227" }, { "id": "67", "name": "玉田县", "code": "130229" }, { "id": "68", "name": "遵化市", "code": "130281" }, { "id": "69", "name": "迁安市", "code": "130283" }] }, { "id": "5", "name": "秦皇岛市", "code": "130300", "children": [{ "id": "70", "name": "市辖区", "code": "130301" }, { "id": "71", "name": "海港区", "code": "130302" }, { "id": "72", "name": "山海关区", "code": "130303" }, { "id": "73", "name": "北戴河区", "code": "130304" }, { "id": "74", "name": "抚宁区", "code": "130306" }, { "id": "75", "name": "青龙满族自治县", "code": "130321" }, { "id": "76", "name": "昌黎县", "code": "130322" }, { "id": "77", "name": "卢龙县", "code": "130324" }] }, { "id": "6", "name": "邯郸市", "code": "130400", "children": [{ "id": "78", "name": "市辖区", "code": "130401" }, { "id": "79", "name": "邯山区", "code": "130402" }, { "id": "80", "name": "丛台区", "code": "130403" }, { "id": "81", "name": "复兴区", "code": "130404" }, { "id": "82", "name": "峰峰矿区", "code": "130406" }, { "id": "83", "name": "邯郸县", "code": "130421" }, { "id": "84", "name": "临漳县", "code": "130423" }, { "id": "85", "name": "成安县", "code": "130424" }, { "id": "86", "name": "大名县", "code": "130425" }, { "id": "87", "name": "涉县", "code": "130426" }, { "id": "88", "name": "磁县", "code": "130427" }, { "id": "89", "name": "肥乡县", "code": "130428" }, { "id": "90", "name": "永年县", "code": "130429" }, { "id": "91", "name": "邱县", "code": "130430" }, { "id": "92", "name": "鸡泽县", "code": "130431" }, { "id": "93", "name": "广平县", "code": "130432" }, { "id": "94", "name": "馆陶县", "code": "130433" }, { "id": "95", "name": "魏县", "code": "130434" }, { "id": "96", "name": "曲周县", "code": "130435" }, { "id": "97", "name": "武安市", "code": "130481" }] }, { "id": "7", "name": "邢台市", "code": "130500", "children": [{ "id": "98", "name": "市辖区", "code": "130501" }, { "id": "99", "name": "桥东区", "code": "130502" }, { "id": "100", "name": "桥西区", "code": "130503" }, { "id": "101", "name": "邢台县", "code": "130521" }, { "id": "102", "name": "临城县", "code": "130522" }, { "id": "103", "name": "内丘县", "code": "130523" }, { "id": "104", "name": "柏乡县", "code": "130524" }, { "id": "105", "name": "隆尧县", "code": "130525" }, { "id": "106", "name": "任县", "code": "130526" }, { "id": "107", "name": "南和县", "code": "130527" }, { "id": "108", "name": "宁晋县", "code": "130528" }, { "id": "109", "name": "巨鹿县", "code": "130529" }, { "id": "110", "name": "新河县", "code": "130530" }, { "id": "111", "name": "广宗县", "code": "130531" }, { "id": "112", "name": "平乡县", "code": "130532" }, { "id": "113", "name": "威县", "code": "130533" }, { "id": "114", "name": "清河县", "code": "130534" }, { "id": "115", "name": "临西县", "code": "130535" }, { "id": "116", "name": "南宫市", "code": "130581" }, { "id": "117", "name": "沙河市", "code": "130582" }] }, { "id": "8", "name": "保定市", "code": "130600", "children": [{ "id": "118", "name": "市辖区", "code": "130601" }, { "id": "119", "name": "竞秀区", "code": "130602" }, { "id": "120", "name": "莲池区", "code": "130606" }, { "id": "121", "name": "满城区", "code": "130607" }, { "id": "122", "name": "清苑区", "code": "130608" }, { "id": "123", "name": "徐水区", "code": "130609" }, { "id": "124", "name": "涞水县", "code": "130623" }, { "id": "125", "name": "阜平县", "code": "130624" }, { "id": "126", "name": "定兴县", "code": "130626" }, { "id": "127", "name": "唐县", "code": "130627" }, { "id": "128", "name": "高阳县", "code": "130628" }, { "id": "129", "name": "容城县", "code": "130629" }, { "id": "130", "name": "涞源县", "code": "130630" }, { "id": "131", "name": "望都县", "code": "130631" }, { "id": "132", "name": "安新县", "code": "130632" }, { "id": "133", "name": "易县", "code": "130633" }, { "id": "134", "name": "曲阳县", "code": "130634" }, { "id": "135", "name": "蠡县", "code": "130635" }, { "id": "136", "name": "顺平县", "code": "130636" }, { "id": "137", "name": "博野县", "code": "130637" }, { "id": "138", "name": "雄县", "code": "130638" }, { "id": "139", "name": "涿州市", "code": "130681" }, { "id": "140", "name": "安国市", "code": "130683" }, { "id": "141", "name": "高碑店市", "code": "130684" }] }, { "id": "9", "name": "张家口市", "code": "130700", "children": [{ "id": "142", "name": "市辖区", "code": "130701" }, { "id": "143", "name": "桥东区", "code": "130702" }, { "id": "144", "name": "桥西区", "code": "130703" }, { "id": "145", "name": "宣化区", "code": "130705" }, { "id": "146", "name": "下花园区", "code": "130706" }, { "id": "147", "name": "万全区", "code": "130708" }, { "id": "148", "name": "崇礼区", "code": "130709" }, { "id": "149", "name": "张北县", "code": "130722" }, { "id": "150", "name": "康保县", "code": "130723" }, { "id": "151", "name": "沽源县", "code": "130724" }, { "id": "152", "name": "尚义县", "code": "130725" }, { "id": "153", "name": "蔚县", "code": "130726" }, { "id": "154", "name": "阳原县", "code": "130727" }, { "id": "155", "name": "怀安县", "code": "130728" }, { "id": "156", "name": "怀来县", "code": "130730" }, { "id": "157", "name": "涿鹿县", "code": "130731" }, { "id": "158", "name": "赤城县", "code": "130732" }] }, { "id": "10", "name": "承德市", "code": "130800", "children": [{ "id": "159", "name": "市辖区", "code": "130801" }, { "id": "160", "name": "双桥区", "code": "130802" }, { "id": "161", "name": "双滦区", "code": "130803" }, { "id": "162", "name": "鹰手营子矿区", "code": "130804" }, { "id": "163", "name": "承德县", "code": "130821" }, { "id": "164", "name": "兴隆县", "code": "130822" }, { "id": "165", "name": "平泉县", "code": "130823" }, { "id": "166", "name": "滦平县", "code": "130824" }, { "id": "167", "name": "隆化县", "code": "130825" }, { "id": "168", "name": "丰宁满族自治县", "code": "130826" }, { "id": "169", "name": "宽城满族自治县", "code": "130827" }, { "id": "170", "name": "围场满族蒙古族自治县", "code": "130828" }] }, { "id": "11", "name": "沧州市", "code": "130900", "children": [{ "id": "171", "name": "市辖区", "code": "130901" }, { "id": "172", "name": "新华区", "code": "130902" }, { "id": "173", "name": "运河区", "code": "130903" }, { "id": "174", "name": "沧县", "code": "130921" }, { "id": "175", "name": "青县", "code": "130922" }, { "id": "176", "name": "东光县", "code": "130923" }, { "id": "177", "name": "海兴县", "code": "130924" }, { "id": "178", "name": "盐山县", "code": "130925" }, { "id": "179", "name": "肃宁县", "code": "130926" }, { "id": "180", "name": "南皮县", "code": "130927" }, { "id": "181", "name": "吴桥县", "code": "130928" }, { "id": "182", "name": "献县", "code": "130929" }, { "id": "183", "name": "孟村回族自治县", "code": "130930" }, { "id": "184", "name": "泊头市", "code": "130981" }, { "id": "185", "name": "任丘市", "code": "130982" }, { "id": "186", "name": "黄骅市", "code": "130983" }, { "id": "187", "name": "河间市", "code": "130984" }] }, { "id": "12", "name": "廊坊市", "code": "131000", "children": [{ "id": "188", "name": "市辖区", "code": "131001" }, { "id": "189", "name": "安次区", "code": "131002" }, { "id": "190", "name": "广阳区", "code": "131003" }, { "id": "191", "name": "固安县", "code": "131022" }, { "id": "192", "name": "永清县", "code": "131023" }, { "id": "193", "name": "香河县", "code": "131024" }, { "id": "194", "name": "大城县", "code": "131025" }, { "id": "195", "name": "文安县", "code": "131026" }, { "id": "196", "name": "大厂回族自治县", "code": "131028" }, { "id": "197", "name": "霸州市", "code": "131081" }, { "id": "198", "name": "三河市", "code": "131082" }] }, { "id": "13", "name": "衡水市", "code": "131100", "children": [{ "id": "199", "name": "市辖区", "code": "131101" }, { "id": "200", "name": "桃城区", "code": "131102" }, { "id": "201", "name": "冀州区", "code": "131103" }, { "id": "202", "name": "枣强县", "code": "131121" }, { "id": "203", "name": "武邑县", "code": "131122" }, { "id": "204", "name": "武强县", "code": "131123" }, { "id": "205", "name": "饶阳县", "code": "131124" }, { "id": "206", "name": "安平县", "code": "131125" }, { "id": "207", "name": "故城县", "code": "131126" }, { "id": "208", "name": "景县", "code": "131127" }, { "id": "209", "name": "阜城县", "code": "131128" }, { "id": "210", "name": "深州市", "code": "131182" }] }, { "id": "14", "name": "省直辖县级行政区划", "code": "139000", "children": [{ "id": "211", "name": "定州市", "code": "139001" }, { "id": "212", "name": "辛集市", "code": "139002" }] }] }, { "id": "4", "name": "山西省", "code": "140000", "children": [{ "id": "15", "name": "太原市", "code": "140100", "children": [{ "id": "213", "name": "市辖区", "code": "140101" }, { "id": "214", "name": "小店区", "code": "140105" }, { "id": "215", "name": "迎泽区", "code": "140106" }, { "id": "216", "name": "杏花岭区", "code": "140107" }, { "id": "217", "name": "尖草坪区", "code": "140108" }, { "id": "218", "name": "万柏林区", "code": "140109" }, { "id": "219", "name": "晋源区", "code": "140110" }, { "id": "220", "name": "清徐县", "code": "140121" }, { "id": "221", "name": "阳曲县", "code": "140122" }, { "id": "222", "name": "娄烦县", "code": "140123" }, { "id": "223", "name": "古交市", "code": "140181" }] }, { "id": "16", "name": "大同市", "code": "140200", "children": [{ "id": "224", "name": "市辖区", "code": "140201" }, { "id": "225", "name": "城区", "code": "140202" }, { "id": "226", "name": "矿区", "code": "140203" }, { "id": "227", "name": "南郊区", "code": "140211" }, { "id": "228", "name": "新荣区", "code": "140212" }, { "id": "229", "name": "阳高县", "code": "140221" }, { "id": "230", "name": "天镇县", "code": "140222" }, { "id": "231", "name": "广灵县", "code": "140223" }, { "id": "232", "name": "灵丘县", "code": "140224" }, { "id": "233", "name": "浑源县", "code": "140225" }, { "id": "234", "name": "左云县", "code": "140226" }, { "id": "235", "name": "大同县", "code": "140227" }] }, { "id": "17", "name": "阳泉市", "code": "140300", "children": [{ "id": "236", "name": "市辖区", "code": "140301" }, { "id": "237", "name": "城区", "code": "140302" }, { "id": "238", "name": "矿区", "code": "140303" }, { "id": "239", "name": "郊区", "code": "140311" }, { "id": "240", "name": "平定县", "code": "140321" }, { "id": "241", "name": "盂县", "code": "140322" }] }, { "id": "18", "name": "长治市", "code": "140400", "children": [{ "id": "242", "name": "市辖区", "code": "140401" }, { "id": "243", "name": "城区", "code": "140402" }, { "id": "244", "name": "郊区", "code": "140411" }, { "id": "245", "name": "长治县", "code": "140421" }, { "id": "246", "name": "襄垣县", "code": "140423" }, { "id": "247", "name": "屯留县", "code": "140424" }, { "id": "248", "name": "平顺县", "code": "140425" }, { "id": "249", "name": "黎城县", "code": "140426" }, { "id": "250", "name": "壶关县", "code": "140427" }, { "id": "251", "name": "长子县", "code": "140428" }, { "id": "252", "name": "武乡县", "code": "140429" }, { "id": "253", "name": "沁县", "code": "140430" }, { "id": "254", "name": "沁源县", "code": "140431" }, { "id": "255", "name": "潞城市", "code": "140481" }] }, { "id": "19", "name": "晋城市", "code": "140500", "children": [{ "id": "256", "name": "市辖区", "code": "140501" }, { "id": "257", "name": "城区", "code": "140502" }, { "id": "258", "name": "沁水县", "code": "140521" }, { "id": "259", "name": "阳城县", "code": "140522" }, { "id": "260", "name": "陵川县", "code": "140524" }, { "id": "261", "name": "泽州县", "code": "140525" }, { "id": "262", "name": "高平市", "code": "140581" }] }, { "id": "20", "name": "朔州市", "code": "140600", "children": [{ "id": "263", "name": "市辖区", "code": "140601" }, { "id": "264", "name": "朔城区", "code": "140602" }, { "id": "265", "name": "平鲁区", "code": "140603" }, { "id": "266", "name": "山阴县", "code": "140621" }, { "id": "267", "name": "应县", "code": "140622" }, { "id": "268", "name": "右玉县", "code": "140623" }, { "id": "269", "name": "怀仁县", "code": "140624" }] }, { "id": "21", "name": "晋中市", "code": "140700", "children": [{ "id": "270", "name": "市辖区", "code": "140701" }, { "id": "271", "name": "榆次区", "code": "140702" }, { "id": "272", "name": "榆社县", "code": "140721" }, { "id": "273", "name": "左权县", "code": "140722" }, { "id": "274", "name": "和顺县", "code": "140723" }, { "id": "275", "name": "昔阳县", "code": "140724" }, { "id": "276", "name": "寿阳县", "code": "140725" }, { "id": "277", "name": "太谷县", "code": "140726" }, { "id": "278", "name": "祁县", "code": "140727" }, { "id": "279", "name": "平遥县", "code": "140728" }, { "id": "280", "name": "灵石县", "code": "140729" }, { "id": "281", "name": "介休市", "code": "140781" }] }, { "id": "22", "name": "运城市", "code": "140800", "children": [{ "id": "282", "name": "市辖区", "code": "140801" }, { "id": "283", "name": "盐湖区", "code": "140802" }, { "id": "284", "name": "临猗县", "code": "140821" }, { "id": "285", "name": "万荣县", "code": "140822" }, { "id": "286", "name": "闻喜县", "code": "140823" }, { "id": "287", "name": "稷山县", "code": "140824" }, { "id": "288", "name": "新绛县", "code": "140825" }, { "id": "289", "name": "绛县", "code": "140826" }, { "id": "290", "name": "垣曲县", "code": "140827" }, { "id": "291", "name": "夏县", "code": "140828" }, { "id": "292", "name": "平陆县", "code": "140829" }, { "id": "293", "name": "芮城县", "code": "140830" }, { "id": "294", "name": "永济市", "code": "140881" }, { "id": "295", "name": "河津市", "code": "140882" }] }, { "id": "23", "name": "忻州市", "code": "140900", "children": [{ "id": "296", "name": "市辖区", "code": "140901" }, { "id": "297", "name": "忻府区", "code": "140902" }, { "id": "298", "name": "定襄县", "code": "140921" }, { "id": "299", "name": "五台县", "code": "140922" }, { "id": "300", "name": "代县", "code": "140923" }, { "id": "301", "name": "繁峙县", "code": "140924" }, { "id": "302", "name": "宁武县", "code": "140925" }, { "id": "303", "name": "静乐县", "code": "140926" }, { "id": "304", "name": "神池县", "code": "140927" }, { "id": "305", "name": "五寨县", "code": "140928" }, { "id": "306", "name": "岢岚县", "code": "140929" }, { "id": "307", "name": "河曲县", "code": "140930" }, { "id": "308", "name": "保德县", "code": "140931" }, { "id": "309", "name": "偏关县", "code": "140932" }, { "id": "310", "name": "原平市", "code": "140981" }] }, { "id": "24", "name": "临汾市", "code": "141000", "children": [{ "id": "311", "name": "市辖区", "code": "141001" }, { "id": "312", "name": "尧都区", "code": "141002" }, { "id": "313", "name": "曲沃县", "code": "141021" }, { "id": "314", "name": "翼城县", "code": "141022" }, { "id": "315", "name": "襄汾县", "code": "141023" }, { "id": "316", "name": "洪洞县", "code": "141024" }, { "id": "317", "name": "古县", "code": "141025" }, { "id": "318", "name": "安泽县", "code": "141026" }, { "id": "319", "name": "浮山县", "code": "141027" }, { "id": "320", "name": "吉县", "code": "141028" }, { "id": "321", "name": "乡宁县", "code": "141029" }, { "id": "322", "name": "大宁县", "code": "141030" }, { "id": "323", "name": "隰县", "code": "141031" }, { "id": "324", "name": "永和县", "code": "141032" }, { "id": "325", "name": "蒲县", "code": "141033" }, { "id": "326", "name": "汾西县", "code": "141034" }, { "id": "327", "name": "侯马市", "code": "141081" }, { "id": "328", "name": "霍州市", "code": "141082" }] }, { "id": "25", "name": "吕梁市", "code": "141100", "children": [{ "id": "329", "name": "市辖区", "code": "141101" }, { "id": "330", "name": "离石区", "code": "141102" }, { "id": "331", "name": "文水县", "code": "141121" }, { "id": "332", "name": "交城县", "code": "141122" }, { "id": "333", "name": "兴县", "code": "141123" }, { "id": "334", "name": "临县", "code": "141124" }, { "id": "335", "name": "柳林县", "code": "141125" }, { "id": "336", "name": "石楼县", "code": "141126" }, { "id": "337", "name": "岚县", "code": "141127" }, { "id": "338", "name": "方山县", "code": "141128" }, { "id": "339", "name": "中阳县", "code": "141129" }, { "id": "340", "name": "交口县", "code": "141130" }, { "id": "341", "name": "孝义市", "code": "141181" }, { "id": "342", "name": "汾阳市", "code": "141182" }] }] }, { "id": "5", "name": "内蒙古自治区", "code": "150000", "children": [{ "id": "26", "name": "呼和浩特市", "code": "150100", "children": [{ "id": "343", "name": "市辖区", "code": "150101" }, { "id": "344", "name": "新城区", "code": "150102" }, { "id": "345", "name": "回民区", "code": "150103" }, { "id": "346", "name": "玉泉区", "code": "150104" }, { "id": "347", "name": "赛罕区", "code": "150105" }, { "id": "348", "name": "土默特左旗", "code": "150121" }, { "id": "349", "name": "托克托县", "code": "150122" }, { "id": "350", "name": "和林格尔县", "code": "150123" }, { "id": "351", "name": "清水河县", "code": "150124" }, { "id": "352", "name": "武川县", "code": "150125" }] }, { "id": "27", "name": "包头市", "code": "150200", "children": [{ "id": "353", "name": "市辖区", "code": "150201" }, { "id": "354", "name": "东河区", "code": "150202" }, { "id": "355", "name": "昆都仑区", "code": "150203" }, { "id": "356", "name": "青山区", "code": "150204" }, { "id": "357", "name": "石拐区", "code": "150205" }, { "id": "358", "name": "白云鄂博矿区", "code": "150206" }, { "id": "359", "name": "九原区", "code": "150207" }, { "id": "360", "name": "土默特右旗", "code": "150221" }, { "id": "361", "name": "固阳县", "code": "150222" }, { "id": "362", "name": "达尔罕茂明安联合旗", "code": "150223" }] }, { "id": "28", "name": "乌海市", "code": "150300", "children": [{ "id": "363", "name": "市辖区", "code": "150301" }, { "id": "364", "name": "海勃湾区", "code": "150302" }, { "id": "365", "name": "海南区", "code": "150303" }, { "id": "366", "name": "乌达区", "code": "150304" }] }, { "id": "29", "name": "赤峰市", "code": "150400", "children": [{ "id": "367", "name": "市辖区", "code": "150401" }, { "id": "368", "name": "红山区", "code": "150402" }, { "id": "369", "name": "元宝山区", "code": "150403" }, { "id": "370", "name": "松山区", "code": "150404" }, { "id": "371", "name": "阿鲁科尔沁旗", "code": "150421" }, { "id": "372", "name": "巴林左旗", "code": "150422" }, { "id": "373", "name": "巴林右旗", "code": "150423" }, { "id": "374", "name": "林西县", "code": "150424" }, { "id": "375", "name": "克什克腾旗", "code": "150425" }, { "id": "376", "name": "翁牛特旗", "code": "150426" }, { "id": "377", "name": "喀喇沁旗", "code": "150428" }, { "id": "378", "name": "宁城县", "code": "150429" }, { "id": "379", "name": "敖汉旗", "code": "150430" }] }, { "id": "30", "name": "通辽市", "code": "150500", "children": [{ "id": "380", "name": "市辖区", "code": "150501" }, { "id": "381", "name": "科尔沁区", "code": "150502" }, { "id": "382", "name": "科尔沁左翼中旗", "code": "150521" }, { "id": "383", "name": "科尔沁左翼后旗", "code": "150522" }, { "id": "384", "name": "开鲁县", "code": "150523" }, { "id": "385", "name": "库伦旗", "code": "150524" }, { "id": "386", "name": "奈曼旗", "code": "150525" }, { "id": "387", "name": "扎鲁特旗", "code": "150526" }, { "id": "388", "name": "霍林郭勒市", "code": "150581" }] }, { "id": "31", "name": "鄂尔多斯市", "code": "150600", "children": [{ "id": "389", "name": "市辖区", "code": "150601" }, { "id": "390", "name": "东胜区", "code": "150602" }, { "id": "391", "name": "康巴什区", "code": "150603" }, { "id": "392", "name": "达拉特旗", "code": "150621" }, { "id": "393", "name": "准格尔旗", "code": "150622" }, { "id": "394", "name": "鄂托克前旗", "code": "150623" }, { "id": "395", "name": "鄂托克旗", "code": "150624" }, { "id": "396", "name": "杭锦旗", "code": "150625" }, { "id": "397", "name": "乌审旗", "code": "150626" }, { "id": "398", "name": "伊金霍洛旗", "code": "150627" }] }, { "id": "32", "name": "呼伦贝尔市", "code": "150700", "children": [{ "id": "399", "name": "市辖区", "code": "150701" }, { "id": "400", "name": "海拉尔区", "code": "150702" }, { "id": "401", "name": "扎赉诺尔区", "code": "150703" }, { "id": "402", "name": "阿荣旗", "code": "150721" }, { "id": "403", "name": "莫力达瓦达斡尔族自治旗", "code": "150722" }, { "id": "404", "name": "鄂伦春自治旗", "code": "150723" }, { "id": "405", "name": "鄂温克族自治旗", "code": "150724" }, { "id": "406", "name": "陈巴尔虎旗", "code": "150725" }, { "id": "407", "name": "新巴尔虎左旗", "code": "150726" }, { "id": "408", "name": "新巴尔虎右旗", "code": "150727" }, { "id": "409", "name": "满洲里市", "code": "150781" }, { "id": "410", "name": "牙克石市", "code": "150782" }, { "id": "411", "name": "扎兰屯市", "code": "150783" }, { "id": "412", "name": "额尔古纳市", "code": "150784" }, { "id": "413", "name": "根河市", "code": "150785" }] }, { "id": "33", "name": "巴彦淖尔市", "code": "150800", "children": [{ "id": "414", "name": "市辖区", "code": "150801" }, { "id": "415", "name": "临河区", "code": "150802" }, { "id": "416", "name": "五原县", "code": "150821" }, { "id": "417", "name": "磴口县", "code": "150822" }, { "id": "418", "name": "乌拉特前旗", "code": "150823" }, { "id": "419", "name": "乌拉特中旗", "code": "150824" }, { "id": "420", "name": "乌拉特后旗", "code": "150825" }, { "id": "421", "name": "杭锦后旗", "code": "150826" }] }, { "id": "34", "name": "乌兰察布市", "code": "150900", "children": [{ "id": "422", "name": "市辖区", "code": "150901" }, { "id": "423", "name": "集宁区", "code": "150902" }, { "id": "424", "name": "卓资县", "code": "150921" }, { "id": "425", "name": "化德县", "code": "150922" }, { "id": "426", "name": "商都县", "code": "150923" }, { "id": "427", "name": "兴和县", "code": "150924" }, { "id": "428", "name": "凉城县", "code": "150925" }, { "id": "429", "name": "察哈尔右翼前旗", "code": "150926" }, { "id": "430", "name": "察哈尔右翼中旗", "code": "150927" }, { "id": "431", "name": "察哈尔右翼后旗", "code": "150928" }, { "id": "432", "name": "四子王旗", "code": "150929" }, { "id": "433", "name": "丰镇市", "code": "150981" }] }, { "id": "35", "name": "兴安盟", "code": "152200", "children": [{ "id": "434", "name": "乌兰浩特市", "code": "152201" }, { "id": "435", "name": "阿尔山市", "code": "152202" }, { "id": "436", "name": "科尔沁右翼前旗", "code": "152221" }, { "id": "437", "name": "科尔沁右翼中旗", "code": "152222" }, { "id": "438", "name": "扎赉特旗", "code": "152223" }, { "id": "439", "name": "突泉县", "code": "152224" }] }, { "id": "36", "name": "锡林郭勒盟", "code": "152500", "children": [{ "id": "440", "name": "二连浩特市", "code": "152501" }, { "id": "441", "name": "锡林浩特市", "code": "152502" }, { "id": "442", "name": "阿巴嘎旗", "code": "152522" }, { "id": "443", "name": "苏尼特左旗", "code": "152523" }, { "id": "444", "name": "苏尼特右旗", "code": "152524" }, { "id": "445", "name": "东乌珠穆沁旗", "code": "152525" }, { "id": "446", "name": "西乌珠穆沁旗", "code": "152526" }, { "id": "447", "name": "太仆寺旗", "code": "152527" }, { "id": "448", "name": "镶黄旗", "code": "152528" }, { "id": "449", "name": "正镶白旗", "code": "152529" }, { "id": "450", "name": "正蓝旗", "code": "152530" }, { "id": "451", "name": "多伦县", "code": "152531" }] }, { "id": "37", "name": "阿拉善盟", "code": "152900", "children": [{ "id": "452", "name": "阿拉善左旗", "code": "152921" }, { "id": "453", "name": "阿拉善右旗", "code": "152922" }, { "id": "454", "name": "额济纳旗", "code": "152923" }] }] }, { "id": "6", "name": "辽宁省", "code": "210000", "children": [{ "id": "38", "name": "沈阳市", "code": "210100", "children": [{ "id": "455", "name": "市辖区", "code": "210101" }, { "id": "456", "name": "和平区", "code": "210102" }, { "id": "457", "name": "沈河区", "code": "210103" }, { "id": "458", "name": "大东区", "code": "210104" }, { "id": "459", "name": "皇姑区", "code": "210105" }, { "id": "460", "name": "铁西区", "code": "210106" }, { "id": "461", "name": "苏家屯区", "code": "210111" }, { "id": "462", "name": "浑南区", "code": "210112" }, { "id": "463", "name": "沈北新区", "code": "210113" }, { "id": "464", "name": "于洪区", "code": "210114" }, { "id": "465", "name": "辽中区", "code": "210115" }, { "id": "466", "name": "康平县", "code": "210123" }, { "id": "467", "name": "法库县", "code": "210124" }, { "id": "468", "name": "新民市", "code": "210181" }] }, { "id": "39", "name": "大连市", "code": "210200", "children": [{ "id": "469", "name": "市辖区", "code": "210201" }, { "id": "470", "name": "中山区", "code": "210202" }, { "id": "471", "name": "西岗区", "code": "210203" }, { "id": "472", "name": "沙河口区", "code": "210204" }, { "id": "473", "name": "甘井子区", "code": "210211" }, { "id": "474", "name": "旅顺口区", "code": "210212" }, { "id": "475", "name": "金州区", "code": "210213" }, { "id": "476", "name": "普兰店区", "code": "210214" }, { "id": "477", "name": "长海县", "code": "210224" }, { "id": "478", "name": "瓦房店市", "code": "210281" }, { "id": "479", "name": "庄河市", "code": "210283" }] }, { "id": "40", "name": "鞍山市", "code": "210300", "children": [{ "id": "480", "name": "市辖区", "code": "210301" }, { "id": "481", "name": "铁东区", "code": "210302" }, { "id": "482", "name": "铁西区", "code": "210303" }, { "id": "483", "name": "立山区", "code": "210304" }, { "id": "484", "name": "千山区", "code": "210311" }, { "id": "485", "name": "台安县", "code": "210321" }, { "id": "486", "name": "岫岩满族自治县", "code": "210323" }, { "id": "487", "name": "海城市", "code": "210381" }] }, { "id": "41", "name": "抚顺市", "code": "210400", "children": [{ "id": "488", "name": "市辖区", "code": "210401" }, { "id": "489", "name": "新抚区", "code": "210402" }, { "id": "490", "name": "东洲区", "code": "210403" }, { "id": "491", "name": "望花区", "code": "210404" }, { "id": "492", "name": "顺城区", "code": "210411" }, { "id": "493", "name": "抚顺县", "code": "210421" }, { "id": "494", "name": "新宾满族自治县", "code": "210422" }, { "id": "495", "name": "清原满族自治县", "code": "210423" }] }, { "id": "42", "name": "本溪市", "code": "210500", "children": [{ "id": "496", "name": "市辖区", "code": "210501" }, { "id": "497", "name": "平山区", "code": "210502" }, { "id": "498", "name": "溪湖区", "code": "210503" }, { "id": "499", "name": "明山区", "code": "210504" }, { "id": "500", "name": "南芬区", "code": "210505" }, { "id": "501", "name": "本溪满族自治县", "code": "210521" }, { "id": "502", "name": "桓仁满族自治县", "code": "210522" }] }, { "id": "43", "name": "丹东市", "code": "210600", "children": [{ "id": "503", "name": "市辖区", "code": "210601" }, { "id": "504", "name": "元宝区", "code": "210602" }, { "id": "505", "name": "振兴区", "code": "210603" }, { "id": "506", "name": "振安区", "code": "210604" }, { "id": "507", "name": "宽甸满族自治县", "code": "210624" }, { "id": "508", "name": "东港市", "code": "210681" }, { "id": "509", "name": "凤城市", "code": "210682" }] }, { "id": "44", "name": "锦州市", "code": "210700", "children": [{ "id": "510", "name": "市辖区", "code": "210701" }, { "id": "511", "name": "古塔区", "code": "210702" }, { "id": "512", "name": "凌河区", "code": "210703" }, { "id": "513", "name": "太和区", "code": "210711" }, { "id": "514", "name": "黑山县", "code": "210726" }, { "id": "515", "name": "义县", "code": "210727" }, { "id": "516", "name": "凌海市", "code": "210781" }, { "id": "517", "name": "北镇市", "code": "210782" }] }, { "id": "45", "name": "营口市", "code": "210800", "children": [{ "id": "518", "name": "市辖区", "code": "210801" }, { "id": "519", "name": "站前区", "code": "210802" }, { "id": "520", "name": "西市区", "code": "210803" }, { "id": "521", "name": "鲅鱼圈区", "code": "210804" }, { "id": "522", "name": "老边区", "code": "210811" }, { "id": "523", "name": "盖州市", "code": "210881" }, { "id": "524", "name": "大石桥市", "code": "210882" }] }, { "id": "46", "name": "阜新市", "code": "210900", "children": [{ "id": "525", "name": "市辖区", "code": "210901" }, { "id": "526", "name": "海州区", "code": "210902" }, { "id": "527", "name": "新邱区", "code": "210903" }, { "id": "528", "name": "太平区", "code": "210904" }, { "id": "529", "name": "清河门区", "code": "210905" }, { "id": "530", "name": "细河区", "code": "210911" }, { "id": "531", "name": "阜新蒙古族自治县", "code": "210921" }, { "id": "532", "name": "彰武县", "code": "210922" }] }, { "id": "47", "name": "辽阳市", "code": "211000", "children": [{ "id": "533", "name": "市辖区", "code": "211001" }, { "id": "534", "name": "白塔区", "code": "211002" }, { "id": "535", "name": "文圣区", "code": "211003" }, { "id": "536", "name": "宏伟区", "code": "211004" }, { "id": "537", "name": "弓长岭区", "code": "211005" }, { "id": "538", "name": "太子河区", "code": "211011" }, { "id": "539", "name": "辽阳县", "code": "211021" }, { "id": "540", "name": "灯塔市", "code": "211081" }] }, { "id": "48", "name": "盘锦市", "code": "211100", "children": [{ "id": "541", "name": "市辖区", "code": "211101" }, { "id": "542", "name": "双台子区", "code": "211102" }, { "id": "543", "name": "兴隆台区", "code": "211103" }, { "id": "544", "name": "大洼区", "code": "211104" }, { "id": "545", "name": "盘山县", "code": "211122" }] }, { "id": "49", "name": "铁岭市", "code": "211200", "children": [{ "id": "546", "name": "市辖区", "code": "211201" }, { "id": "547", "name": "银州区", "code": "211202" }, { "id": "548", "name": "清河区", "code": "211204" }, { "id": "549", "name": "铁岭县", "code": "211221" }, { "id": "550", "name": "西丰县", "code": "211223" }, { "id": "551", "name": "昌图县", "code": "211224" }, { "id": "552", "name": "调兵山市", "code": "211281" }, { "id": "553", "name": "开原市", "code": "211282" }] }, { "id": "50", "name": "朝阳市", "code": "211300", "children": [{ "id": "554", "name": "市辖区", "code": "211301" }, { "id": "555", "name": "双塔区", "code": "211302" }, { "id": "556", "name": "龙城区", "code": "211303" }, { "id": "557", "name": "朝阳县", "code": "211321" }, { "id": "558", "name": "建平县", "code": "211322" }, { "id": "559", "name": "喀喇沁左翼蒙古族自治县", "code": "211324" }, { "id": "560", "name": "北票市", "code": "211381" }, { "id": "561", "name": "凌源市", "code": "211382" }] }, { "id": "51", "name": "葫芦岛市", "code": "211400", "children": [{ "id": "562", "name": "市辖区", "code": "211401" }, { "id": "563", "name": "连山区", "code": "211402" }, { "id": "564", "name": "龙港区", "code": "211403" }, { "id": "565", "name": "南票区", "code": "211404" }, { "id": "566", "name": "绥中县", "code": "211421" }, { "id": "567", "name": "建昌县", "code": "211422" }, { "id": "568", "name": "兴城市", "code": "211481" }] }] }, { "id": "7", "name": "吉林省", "code": "220000", "children": [{ "id": "52", "name": "长春市", "code": "220100", "children": [{ "id": "569", "name": "市辖区", "code": "220101" }, { "id": "570", "name": "南关区", "code": "220102" }, { "id": "571", "name": "宽城区", "code": "220103" }, { "id": "572", "name": "朝阳区", "code": "220104" }, { "id": "573", "name": "二道区", "code": "220105" }, { "id": "574", "name": "绿园区", "code": "220106" }, { "id": "575", "name": "双阳区", "code": "220112" }, { "id": "576", "name": "九台区", "code": "220113" }, { "id": "577", "name": "农安县", "code": "220122" }, { "id": "578", "name": "榆树市", "code": "220182" }, { "id": "579", "name": "德惠市", "code": "220183" }] }, { "id": "53", "name": "吉林市", "code": "220200", "children": [{ "id": "580", "name": "市辖区", "code": "220201" }, { "id": "581", "name": "昌邑区", "code": "220202" }, { "id": "582", "name": "龙潭区", "code": "220203" }, { "id": "583", "name": "船营区", "code": "220204" }, { "id": "584", "name": "丰满区", "code": "220211" }, { "id": "585", "name": "永吉县", "code": "220221" }, { "id": "586", "name": "蛟河市", "code": "220281" }, { "id": "587", "name": "桦甸市", "code": "220282" }, { "id": "588", "name": "舒兰市", "code": "220283" }, { "id": "589", "name": "磐石市", "code": "220284" }] }, { "id": "54", "name": "四平市", "code": "220300", "children": [{ "id": "590", "name": "市辖区", "code": "220301" }, { "id": "591", "name": "铁西区", "code": "220302" }, { "id": "592", "name": "铁东区", "code": "220303" }, { "id": "593", "name": "梨树县", "code": "220322" }, { "id": "594", "name": "伊通满族自治县", "code": "220323" }, { "id": "595", "name": "公主岭市", "code": "220381" }, { "id": "596", "name": "双辽市", "code": "220382" }] }, { "id": "55", "name": "辽源市", "code": "220400", "children": [{ "id": "597", "name": "市辖区", "code": "220401" }, { "id": "598", "name": "龙山区", "code": "220402" }, { "id": "599", "name": "西安区", "code": "220403" }, { "id": "600", "name": "东丰县", "code": "220421" }, { "id": "601", "name": "东辽县", "code": "220422" }] }, { "id": "56", "name": "通化市", "code": "220500", "children": [{ "id": "602", "name": "市辖区", "code": "220501" }, { "id": "603", "name": "东昌区", "code": "220502" }, { "id": "604", "name": "二道江区", "code": "220503" }, { "id": "605", "name": "通化县", "code": "220521" }, { "id": "606", "name": "辉南县", "code": "220523" }, { "id": "607", "name": "柳河县", "code": "220524" }, { "id": "608", "name": "梅河口市", "code": "220581" }, { "id": "609", "name": "集安市", "code": "220582" }] }, { "id": "57", "name": "白山市", "code": "220600", "children": [{ "id": "610", "name": "市辖区", "code": "220601" }, { "id": "611", "name": "浑江区", "code": "220602" }, { "id": "612", "name": "江源区", "code": "220605" }, { "id": "613", "name": "抚松县", "code": "220621" }, { "id": "614", "name": "靖宇县", "code": "220622" }, { "id": "615", "name": "长白朝鲜族自治县", "code": "220623" }, { "id": "616", "name": "临江市", "code": "220681" }] }, { "id": "58", "name": "松原市", "code": "220700", "children": [{ "id": "617", "name": "市辖区", "code": "220701" }, { "id": "618", "name": "宁江区", "code": "220702" }, { "id": "619", "name": "前郭尔罗斯蒙古族自治县", "code": "220721" }, { "id": "620", "name": "长岭县", "code": "220722" }, { "id": "621", "name": "乾安县", "code": "220723" }, { "id": "622", "name": "扶余市", "code": "220781" }] }, { "id": "59", "name": "白城市", "code": "220800", "children": [{ "id": "623", "name": "市辖区", "code": "220801" }, { "id": "624", "name": "洮北区", "code": "220802" }, { "id": "625", "name": "镇赉县", "code": "220821" }, { "id": "626", "name": "通榆县", "code": "220822" }, { "id": "627", "name": "洮南市", "code": "220881" }, { "id": "628", "name": "大安市", "code": "220882" }] }, { "id": "60", "name": "延边朝鲜族自治州", "code": "222400", "children": [{ "id": "629", "name": "延吉市", "code": "222401" }, { "id": "630", "name": "图们市", "code": "222402" }, { "id": "631", "name": "敦化市", "code": "222403" }, { "id": "632", "name": "珲春市", "code": "222404" }, { "id": "633", "name": "龙井市", "code": "222405" }, { "id": "634", "name": "和龙市", "code": "222406" }, { "id": "635", "name": "汪清县", "code": "222424" }, { "id": "636", "name": "安图县", "code": "222426" }] }] }, { "id": "8", "name": "黑龙江省", "code": "230000", "children": [{ "id": "61", "name": "哈尔滨市", "code": "230100", "children": [{ "id": "637", "name": "市辖区", "code": "230101" }, { "id": "638", "name": "道里区", "code": "230102" }, { "id": "639", "name": "南岗区", "code": "230103" }, { "id": "640", "name": "道外区", "code": "230104" }, { "id": "641", "name": "平房区", "code": "230108" }, { "id": "642", "name": "松北区", "code": "230109" }, { "id": "643", "name": "香坊区", "code": "230110" }, { "id": "644", "name": "呼兰区", "code": "230111" }, { "id": "645", "name": "阿城区", "code": "230112" }, { "id": "646", "name": "双城区", "code": "230113" }, { "id": "647", "name": "依兰县", "code": "230123" }, { "id": "648", "name": "方正县", "code": "230124" }, { "id": "649", "name": "宾县", "code": "230125" }, { "id": "650", "name": "巴彦县", "code": "230126" }, { "id": "651", "name": "木兰县", "code": "230127" }, { "id": "652", "name": "通河县", "code": "230128" }, { "id": "653", "name": "延寿县", "code": "230129" }, { "id": "654", "name": "尚志市", "code": "230183" }, { "id": "655", "name": "五常市", "code": "230184" }] }, { "id": "62", "name": "齐齐哈尔市", "code": "230200", "children": [{ "id": "656", "name": "市辖区", "code": "230201" }, { "id": "657", "name": "龙沙区", "code": "230202" }, { "id": "658", "name": "建华区", "code": "230203" }, { "id": "659", "name": "铁锋区", "code": "230204" }, { "id": "660", "name": "昂昂溪区", "code": "230205" }, { "id": "661", "name": "富拉尔基区", "code": "230206" }, { "id": "662", "name": "碾子山区", "code": "230207" }, { "id": "663", "name": "梅里斯达斡尔族区", "code": "230208" }, { "id": "664", "name": "龙江县", "code": "230221" }, { "id": "665", "name": "依安县", "code": "230223" }, { "id": "666", "name": "泰来县", "code": "230224" }, { "id": "667", "name": "甘南县", "code": "230225" }, { "id": "668", "name": "富裕县", "code": "230227" }, { "id": "669", "name": "克山县", "code": "230229" }, { "id": "670", "name": "克东县", "code": "230230" }, { "id": "671", "name": "拜泉县", "code": "230231" }, { "id": "672", "name": "讷河市", "code": "230281" }] }, { "id": "63", "name": "鸡西市", "code": "230300", "children": [{ "id": "673", "name": "市辖区", "code": "230301" }, { "id": "674", "name": "鸡冠区", "code": "230302" }, { "id": "675", "name": "恒山区", "code": "230303" }, { "id": "676", "name": "滴道区", "code": "230304" }, { "id": "677", "name": "梨树区", "code": "230305" }, { "id": "678", "name": "城子河区", "code": "230306" }, { "id": "679", "name": "麻山区", "code": "230307" }, { "id": "680", "name": "鸡东县", "code": "230321" }, { "id": "681", "name": "虎林市", "code": "230381" }, { "id": "682", "name": "密山市", "code": "230382" }] }, { "id": "64", "name": "鹤岗市", "code": "230400", "children": [{ "id": "683", "name": "市辖区", "code": "230401" }, { "id": "684", "name": "向阳区", "code": "230402" }, { "id": "685", "name": "工农区", "code": "230403" }, { "id": "686", "name": "南山区", "code": "230404" }, { "id": "687", "name": "兴安区", "code": "230405" }, { "id": "688", "name": "东山区", "code": "230406" }, { "id": "689", "name": "兴山区", "code": "230407" }, { "id": "690", "name": "萝北县", "code": "230421" }, { "id": "691", "name": "绥滨县", "code": "230422" }] }, { "id": "65", "name": "双鸭山市", "code": "230500", "children": [{ "id": "692", "name": "市辖区", "code": "230501" }, { "id": "693", "name": "尖山区", "code": "230502" }, { "id": "694", "name": "岭东区", "code": "230503" }, { "id": "695", "name": "四方台区", "code": "230505" }, { "id": "696", "name": "宝山区", "code": "230506" }, { "id": "697", "name": "集贤县", "code": "230521" }, { "id": "698", "name": "友谊县", "code": "230522" }, { "id": "699", "name": "宝清县", "code": "230523" }, { "id": "700", "name": "饶河县", "code": "230524" }] }, { "id": "66", "name": "大庆市", "code": "230600", "children": [{ "id": "701", "name": "市辖区", "code": "230601" }, { "id": "702", "name": "萨尔图区", "code": "230602" }, { "id": "703", "name": "龙凤区", "code": "230603" }, { "id": "704", "name": "让胡路区", "code": "230604" }, { "id": "705", "name": "红岗区", "code": "230605" }, { "id": "706", "name": "大同区", "code": "230606" }, { "id": "707", "name": "肇州县", "code": "230621" }, { "id": "708", "name": "肇源县", "code": "230622" }, { "id": "709", "name": "林甸县", "code": "230623" }, { "id": "710", "name": "杜尔伯特蒙古族自治县", "code": "230624" }] }, { "id": "67", "name": "伊春市", "code": "230700", "children": [{ "id": "711", "name": "市辖区", "code": "230701" }, { "id": "712", "name": "伊春区", "code": "230702" }, { "id": "713", "name": "南岔区", "code": "230703" }, { "id": "714", "name": "友好区", "code": "230704" }, { "id": "715", "name": "西林区", "code": "230705" }, { "id": "716", "name": "翠峦区", "code": "230706" }, { "id": "717", "name": "新青区", "code": "230707" }, { "id": "718", "name": "美溪区", "code": "230708" }, { "id": "719", "name": "金山屯区", "code": "230709" }, { "id": "720", "name": "五营区", "code": "230710" }, { "id": "721", "name": "乌马河区", "code": "230711" }, { "id": "722", "name": "汤旺河区", "code": "230712" }, { "id": "723", "name": "带岭区", "code": "230713" }, { "id": "724", "name": "乌伊岭区", "code": "230714" }, { "id": "725", "name": "红星区", "code": "230715" }, { "id": "726", "name": "上甘岭区", "code": "230716" }, { "id": "727", "name": "嘉荫县", "code": "230722" }, { "id": "728", "name": "铁力市", "code": "230781" }] }, { "id": "68", "name": "佳木斯市", "code": "230800", "children": [{ "id": "729", "name": "市辖区", "code": "230801" }, { "id": "730", "name": "向阳区", "code": "230803" }, { "id": "731", "name": "前进区", "code": "230804" }, { "id": "732", "name": "东风区", "code": "230805" }, { "id": "733", "name": "郊区", "code": "230811" }, { "id": "734", "name": "桦南县", "code": "230822" }, { "id": "735", "name": "桦川县", "code": "230826" }, { "id": "736", "name": "汤原县", "code": "230828" }, { "id": "737", "name": "同江市", "code": "230881" }, { "id": "738", "name": "富锦市", "code": "230882" }, { "id": "739", "name": "抚远市", "code": "230883" }] }, { "id": "69", "name": "七台河市", "code": "230900", "children": [{ "id": "740", "name": "市辖区", "code": "230901" }, { "id": "741", "name": "新兴区", "code": "230902" }, { "id": "742", "name": "桃山区", "code": "230903" }, { "id": "743", "name": "茄子河区", "code": "230904" }, { "id": "744", "name": "勃利县", "code": "230921" }] }, { "id": "70", "name": "牡丹江市", "code": "231000", "children": [{ "id": "745", "name": "市辖区", "code": "231001" }, { "id": "746", "name": "东安区", "code": "231002" }, { "id": "747", "name": "阳明区", "code": "231003" }, { "id": "748", "name": "爱民区", "code": "231004" }, { "id": "749", "name": "西安区", "code": "231005" }, { "id": "750", "name": "林口县", "code": "231025" }, { "id": "751", "name": "绥芬河市", "code": "231081" }, { "id": "752", "name": "海林市", "code": "231083" }, { "id": "753", "name": "宁安市", "code": "231084" }, { "id": "754", "name": "穆棱市", "code": "231085" }, { "id": "755", "name": "东宁市", "code": "231086" }] }, { "id": "71", "name": "黑河市", "code": "231100", "children": [{ "id": "756", "name": "市辖区", "code": "231101" }, { "id": "757", "name": "爱辉区", "code": "231102" }, { "id": "758", "name": "嫩江县", "code": "231121" }, { "id": "759", "name": "逊克县", "code": "231123" }, { "id": "760", "name": "孙吴县", "code": "231124" }, { "id": "761", "name": "北安市", "code": "231181" }, { "id": "762", "name": "五大连池市", "code": "231182" }] }, { "id": "72", "name": "绥化市", "code": "231200", "children": [{ "id": "763", "name": "市辖区", "code": "231201" }, { "id": "764", "name": "北林区", "code": "231202" }, { "id": "765", "name": "望奎县", "code": "231221" }, { "id": "766", "name": "兰西县", "code": "231222" }, { "id": "767", "name": "青冈县", "code": "231223" }, { "id": "768", "name": "庆安县", "code": "231224" }, { "id": "769", "name": "明水县", "code": "231225" }, { "id": "770", "name": "绥棱县", "code": "231226" }, { "id": "771", "name": "安达市", "code": "231281" }, { "id": "772", "name": "肇东市", "code": "231282" }, { "id": "773", "name": "海伦市", "code": "231283" }] }, { "id": "73", "name": "大兴安岭地区", "code": "232700", "children": [{ "id": "774", "name": "呼玛县", "code": "232721" }, { "id": "775", "name": "塔河县", "code": "232722" }, { "id": "776", "name": "漠河县", "code": "232723" }] }] }, { "id": "9", "name": "上海市", "code": "310000", "children": [{ "id": "74", "name": "市辖区", "code": "310100", "children": [{ "id": "777", "name": "黄浦区", "code": "310101" }, { "id": "778", "name": "徐汇区", "code": "310104" }, { "id": "779", "name": "长宁区", "code": "310105" }, { "id": "780", "name": "静安区", "code": "310106" }, { "id": "781", "name": "普陀区", "code": "310107" }, { "id": "782", "name": "虹口区", "code": "310109" }, { "id": "783", "name": "杨浦区", "code": "310110" }, { "id": "784", "name": "闵行区", "code": "310112" }, { "id": "785", "name": "宝山区", "code": "310113" }, { "id": "786", "name": "嘉定区", "code": "310114" }, { "id": "787", "name": "浦东新区", "code": "310115" }, { "id": "788", "name": "金山区", "code": "310116" }, { "id": "789", "name": "松江区", "code": "310117" }, { "id": "790", "name": "青浦区", "code": "310118" }, { "id": "791", "name": "奉贤区", "code": "310120" }, { "id": "792", "name": "崇明区", "code": "310151" }] }] }, { "id": "10", "name": "江苏省", "code": "320000", "children": [{ "id": "75", "name": "南京市", "code": "320100", "children": [{ "id": "793", "name": "市辖区", "code": "320101" }, { "id": "794", "name": "玄武区", "code": "320102" }, { "id": "795", "name": "秦淮区", "code": "320104" }, { "id": "796", "name": "建邺区", "code": "320105" }, { "id": "797", "name": "鼓楼区", "code": "320106" }, { "id": "798", "name": "浦口区", "code": "320111" }, { "id": "799", "name": "栖霞区", "code": "320113" }, { "id": "800", "name": "雨花台区", "code": "320114" }, { "id": "801", "name": "江宁区", "code": "320115" }, { "id": "802", "name": "六合区", "code": "320116" }, { "id": "803", "name": "溧水区", "code": "320117" }, { "id": "804", "name": "高淳区", "code": "320118" }] }, { "id": "76", "name": "无锡市", "code": "320200", "children": [{ "id": "805", "name": "市辖区", "code": "320201" }, { "id": "806", "name": "锡山区", "code": "320205" }, { "id": "807", "name": "惠山区", "code": "320206" }, { "id": "808", "name": "滨湖区", "code": "320211" }, { "id": "809", "name": "梁溪区", "code": "320213" }, { "id": "810", "name": "新吴区", "code": "320214" }, { "id": "811", "name": "江阴市", "code": "320281" }, { "id": "812", "name": "宜兴市", "code": "320282" }] }, { "id": "77", "name": "徐州市", "code": "320300", "children": [{ "id": "813", "name": "市辖区", "code": "320301" }, { "id": "814", "name": "鼓楼区", "code": "320302" }, { "id": "815", "name": "云龙区", "code": "320303" }, { "id": "816", "name": "贾汪区", "code": "320305" }, { "id": "817", "name": "泉山区", "code": "320311" }, { "id": "818", "name": "铜山区", "code": "320312" }, { "id": "819", "name": "丰县", "code": "320321" }, { "id": "820", "name": "沛县", "code": "320322" }, { "id": "821", "name": "睢宁县", "code": "320324" }, { "id": "822", "name": "新沂市", "code": "320381" }, { "id": "823", "name": "邳州市", "code": "320382" }] }, { "id": "78", "name": "常州市", "code": "320400", "children": [{ "id": "824", "name": "市辖区", "code": "320401" }, { "id": "825", "name": "天宁区", "code": "320402" }, { "id": "826", "name": "钟楼区", "code": "320404" }, { "id": "827", "name": "新北区", "code": "320411" }, { "id": "828", "name": "武进区", "code": "320412" }, { "id": "829", "name": "金坛区", "code": "320413" }, { "id": "830", "name": "溧阳市", "code": "320481" }] }, { "id": "79", "name": "苏州市", "code": "320500", "children": [{ "id": "831", "name": "市辖区", "code": "320501" }, { "id": "832", "name": "虎丘区", "code": "320505" }, { "id": "833", "name": "吴中区", "code": "320506" }, { "id": "834", "name": "相城区", "code": "320507" }, { "id": "835", "name": "姑苏区", "code": "320508" }, { "id": "836", "name": "吴江区", "code": "320509" }, { "id": "837", "name": "常熟市", "code": "320581" }, { "id": "838", "name": "张家港市", "code": "320582" }, { "id": "839", "name": "昆山市", "code": "320583" }, { "id": "840", "name": "太仓市", "code": "320585" }] }, { "id": "80", "name": "南通市", "code": "320600", "children": [{ "id": "841", "name": "市辖区", "code": "320601" }, { "id": "842", "name": "崇川区", "code": "320602" }, { "id": "843", "name": "港闸区", "code": "320611" }, { "id": "844", "name": "通州区", "code": "320612" }, { "id": "845", "name": "海安县", "code": "320621" }, { "id": "846", "name": "如东县", "code": "320623" }, { "id": "847", "name": "启东市", "code": "320681" }, { "id": "848", "name": "如皋市", "code": "320682" }, { "id": "849", "name": "海门市", "code": "320684" }] }, { "id": "81", "name": "连云港市", "code": "320700", "children": [{ "id": "850", "name": "市辖区", "code": "320701" }, { "id": "851", "name": "连云区", "code": "320703" }, { "id": "852", "name": "海州区", "code": "320706" }, { "id": "853", "name": "赣榆区", "code": "320707" }, { "id": "854", "name": "东海县", "code": "320722" }, { "id": "855", "name": "灌云县", "code": "320723" }, { "id": "856", "name": "灌南县", "code": "320724" }] }, { "id": "82", "name": "淮安市", "code": "320800", "children": [{ "id": "857", "name": "市辖区", "code": "320801" }, { "id": "858", "name": "淮安区", "code": "320803" }, { "id": "859", "name": "淮阴区", "code": "320804" }, { "id": "860", "name": "清江浦区", "code": "320812" }, { "id": "861", "name": "洪泽区", "code": "320813" }, { "id": "862", "name": "涟水县", "code": "320826" }, { "id": "863", "name": "盱眙县", "code": "320830" }, { "id": "864", "name": "金湖县", "code": "320831" }] }, { "id": "83", "name": "盐城市", "code": "320900", "children": [{ "id": "865", "name": "市辖区", "code": "320901" }, { "id": "866", "name": "亭湖区", "code": "320902" }, { "id": "867", "name": "盐都区", "code": "320903" }, { "id": "868", "name": "大丰区", "code": "320904" }, { "id": "869", "name": "响水县", "code": "320921" }, { "id": "870", "name": "滨海县", "code": "320922" }, { "id": "871", "name": "阜宁县", "code": "320923" }, { "id": "872", "name": "射阳县", "code": "320924" }, { "id": "873", "name": "建湖县", "code": "320925" }, { "id": "874", "name": "东台市", "code": "320981" }] }, { "id": "84", "name": "扬州市", "code": "321000", "children": [{ "id": "875", "name": "市辖区", "code": "321001" }, { "id": "876", "name": "广陵区", "code": "321002" }, { "id": "877", "name": "邗江区", "code": "321003" }, { "id": "878", "name": "江都区", "code": "321012" }, { "id": "879", "name": "宝应县", "code": "321023" }, { "id": "880", "name": "仪征市", "code": "321081" }, { "id": "881", "name": "高邮市", "code": "321084" }] }, { "id": "85", "name": "镇江市", "code": "321100", "children": [{ "id": "882", "name": "市辖区", "code": "321101" }, { "id": "883", "name": "京口区", "code": "321102" }, { "id": "884", "name": "润州区", "code": "321111" }, { "id": "885", "name": "丹徒区", "code": "321112" }, { "id": "886", "name": "丹阳市", "code": "321181" }, { "id": "887", "name": "扬中市", "code": "321182" }, { "id": "888", "name": "句容市", "code": "321183" }] }, { "id": "86", "name": "泰州市", "code": "321200", "children": [{ "id": "889", "name": "市辖区", "code": "321201" }, { "id": "890", "name": "海陵区", "code": "321202" }, { "id": "891", "name": "高港区", "code": "321203" }, { "id": "892", "name": "姜堰区", "code": "321204" }, { "id": "893", "name": "兴化市", "code": "321281" }, { "id": "894", "name": "靖江市", "code": "321282" }, { "id": "895", "name": "泰兴市", "code": "321283" }] }, { "id": "87", "name": "宿迁市", "code": "321300", "children": [{ "id": "896", "name": "市辖区", "code": "321301" }, { "id": "897", "name": "宿城区", "code": "321302" }, { "id": "898", "name": "宿豫区", "code": "321311" }, { "id": "899", "name": "沭阳县", "code": "321322" }, { "id": "900", "name": "泗阳县", "code": "321323" }, { "id": "901", "name": "泗洪县", "code": "321324" }] }] }, { "id": "11", "name": "浙江省", "code": "330000", "children": [{ "id": "88", "name": "杭州市", "code": "330100", "children": [{ "id": "902", "name": "市辖区", "code": "330101" }, { "id": "903", "name": "上城区", "code": "330102" }, { "id": "904", "name": "下城区", "code": "330103" }, { "id": "905", "name": "江干区", "code": "330104" }, { "id": "906", "name": "拱墅区", "code": "330105" }, { "id": "907", "name": "西湖区", "code": "330106" }, { "id": "908", "name": "滨江区", "code": "330108" }, { "id": "909", "name": "萧山区", "code": "330109" }, { "id": "910", "name": "余杭区", "code": "330110" }, { "id": "911", "name": "富阳区", "code": "330111" }, { "id": "912", "name": "桐庐县", "code": "330122" }, { "id": "913", "name": "淳安县", "code": "330127" }, { "id": "914", "name": "建德市", "code": "330182" }, { "id": "915", "name": "临安市", "code": "330185" }] }, { "id": "89", "name": "宁波市", "code": "330200", "children": [{ "id": "916", "name": "市辖区", "code": "330201" }, { "id": "917", "name": "海曙区", "code": "330203" }, { "id": "918", "name": "江东区", "code": "330204" }, { "id": "919", "name": "江北区", "code": "330205" }, { "id": "920", "name": "北仑区", "code": "330206" }, { "id": "921", "name": "镇海区", "code": "330211" }, { "id": "922", "name": "鄞州区", "code": "330212" }, { "id": "923", "name": "象山县", "code": "330225" }, { "id": "924", "name": "宁海县", "code": "330226" }, { "id": "925", "name": "余姚市", "code": "330281" }, { "id": "926", "name": "慈溪市", "code": "330282" }, { "id": "927", "name": "奉化市", "code": "330283" }] }, { "id": "90", "name": "温州市", "code": "330300", "children": [{ "id": "928", "name": "市辖区", "code": "330301" }, { "id": "929", "name": "鹿城区", "code": "330302" }, { "id": "930", "name": "龙湾区", "code": "330303" }, { "id": "931", "name": "瓯海区", "code": "330304" }, { "id": "932", "name": "洞头区", "code": "330305" }, { "id": "933", "name": "永嘉县", "code": "330324" }, { "id": "934", "name": "平阳县", "code": "330326" }, { "id": "935", "name": "苍南县", "code": "330327" }, { "id": "936", "name": "文成县", "code": "330328" }, { "id": "937", "name": "泰顺县", "code": "330329" }, { "id": "938", "name": "瑞安市", "code": "330381" }, { "id": "939", "name": "乐清市", "code": "330382" }] }, { "id": "91", "name": "嘉兴市", "code": "330400", "children": [{ "id": "940", "name": "市辖区", "code": "330401" }, { "id": "941", "name": "南湖区", "code": "330402" }, { "id": "942", "name": "秀洲区", "code": "330411" }, { "id": "943", "name": "嘉善县", "code": "330421" }, { "id": "944", "name": "海盐县", "code": "330424" }, { "id": "945", "name": "海宁市", "code": "330481" }, { "id": "946", "name": "平湖市", "code": "330482" }, { "id": "947", "name": "桐乡市", "code": "330483" }] }, { "id": "92", "name": "湖州市", "code": "330500", "children": [{ "id": "948", "name": "市辖区", "code": "330501" }, { "id": "949", "name": "吴兴区", "code": "330502" }, { "id": "950", "name": "南浔区", "code": "330503" }, { "id": "951", "name": "德清县", "code": "330521" }, { "id": "952", "name": "长兴县", "code": "330522" }, { "id": "953", "name": "安吉县", "code": "330523" }] }, { "id": "93", "name": "绍兴市", "code": "330600", "children": [{ "id": "954", "name": "市辖区", "code": "330601" }, { "id": "955", "name": "越城区", "code": "330602" }, { "id": "956", "name": "柯桥区", "code": "330603" }, { "id": "957", "name": "上虞区", "code": "330604" }, { "id": "958", "name": "新昌县", "code": "330624" }, { "id": "959", "name": "诸暨市", "code": "330681" }, { "id": "960", "name": "嵊州市", "code": "330683" }] }, { "id": "94", "name": "金华市", "code": "330700", "children": [{ "id": "961", "name": "市辖区", "code": "330701" }, { "id": "962", "name": "婺城区", "code": "330702" }, { "id": "963", "name": "金东区", "code": "330703" }, { "id": "964", "name": "武义县", "code": "330723" }, { "id": "965", "name": "浦江县", "code": "330726" }, { "id": "966", "name": "磐安县", "code": "330727" }, { "id": "967", "name": "兰溪市", "code": "330781" }, { "id": "968", "name": "义乌市", "code": "330782" }, { "id": "969", "name": "东阳市", "code": "330783" }, { "id": "970", "name": "永康市", "code": "330784" }] }, { "id": "95", "name": "衢州市", "code": "330800", "children": [{ "id": "971", "name": "市辖区", "code": "330801" }, { "id": "972", "name": "柯城区", "code": "330802" }, { "id": "973", "name": "衢江区", "code": "330803" }, { "id": "974", "name": "常山县", "code": "330822" }, { "id": "975", "name": "开化县", "code": "330824" }, { "id": "976", "name": "龙游县", "code": "330825" }, { "id": "977", "name": "江山市", "code": "330881" }] }, { "id": "96", "name": "舟山市", "code": "330900", "children": [{ "id": "978", "name": "市辖区", "code": "330901" }, { "id": "979", "name": "定海区", "code": "330902" }, { "id": "980", "name": "普陀区", "code": "330903" }, { "id": "981", "name": "岱山县", "code": "330921" }, { "id": "982", "name": "嵊泗县", "code": "330922" }] }, { "id": "97", "name": "台州市", "code": "331000", "children": [{ "id": "983", "name": "市辖区", "code": "331001" }, { "id": "984", "name": "椒江区", "code": "331002" }, { "id": "985", "name": "黄岩区", "code": "331003" }, { "id": "986", "name": "路桥区", "code": "331004" }, { "id": "987", "name": "玉环县", "code": "331021" }, { "id": "988", "name": "三门县", "code": "331022" }, { "id": "989", "name": "天台县", "code": "331023" }, { "id": "990", "name": "仙居县", "code": "331024" }, { "id": "991", "name": "温岭市", "code": "331081" }, { "id": "992", "name": "临海市", "code": "331082" }] }, { "id": "98", "name": "丽水市", "code": "331100", "children": [{ "id": "993", "name": "市辖区", "code": "331101" }, { "id": "994", "name": "莲都区", "code": "331102" }, { "id": "995", "name": "青田县", "code": "331121" }, { "id": "996", "name": "缙云县", "code": "331122" }, { "id": "997", "name": "遂昌县", "code": "331123" }, { "id": "998", "name": "松阳县", "code": "331124" }, { "id": "999", "name": "云和县", "code": "331125" }, { "id": "1000", "name": "庆元县", "code": "331126" }, { "id": "1001", "name": "景宁畲族自治县", "code": "331127" }, { "id": "1002", "name": "龙泉市", "code": "331181" }] }] }, { "id": "12", "name": "安徽省", "code": "340000", "children": [{ "id": "99", "name": "合肥市", "code": "340100", "children": [{ "id": "1003", "name": "市辖区", "code": "340101" }, { "id": "1004", "name": "瑶海区", "code": "340102" }, { "id": "1005", "name": "庐阳区", "code": "340103" }, { "id": "1006", "name": "蜀山区", "code": "340104" }, { "id": "1007", "name": "包河区", "code": "340111" }, { "id": "1008", "name": "长丰县", "code": "340121" }, { "id": "1009", "name": "肥东县", "code": "340122" }, { "id": "1010", "name": "肥西县", "code": "340123" }, { "id": "1011", "name": "庐江县", "code": "340124" }, { "id": "1012", "name": "巢湖市", "code": "340181" }] }, { "id": "100", "name": "芜湖市", "code": "340200", "children": [{ "id": "1013", "name": "市辖区", "code": "340201" }, { "id": "1014", "name": "镜湖区", "code": "340202" }, { "id": "1015", "name": "弋江区", "code": "340203" }, { "id": "1016", "name": "鸠江区", "code": "340207" }, { "id": "1017", "name": "三山区", "code": "340208" }, { "id": "1018", "name": "芜湖县", "code": "340221" }, { "id": "1019", "name": "繁昌县", "code": "340222" }, { "id": "1020", "name": "南陵县", "code": "340223" }, { "id": "1021", "name": "无为县", "code": "340225" }] }, { "id": "101", "name": "蚌埠市", "code": "340300", "children": [{ "id": "1022", "name": "市辖区", "code": "340301" }, { "id": "1023", "name": "龙子湖区", "code": "340302" }, { "id": "1024", "name": "蚌山区", "code": "340303" }, { "id": "1025", "name": "禹会区", "code": "340304" }, { "id": "1026", "name": "淮上区", "code": "340311" }, { "id": "1027", "name": "怀远县", "code": "340321" }, { "id": "1028", "name": "五河县", "code": "340322" }, { "id": "1029", "name": "固镇县", "code": "340323" }] }, { "id": "102", "name": "淮南市", "code": "340400", "children": [{ "id": "1030", "name": "市辖区", "code": "340401" }, { "id": "1031", "name": "大通区", "code": "340402" }, { "id": "1032", "name": "田家庵区", "code": "340403" }, { "id": "1033", "name": "谢家集区", "code": "340404" }, { "id": "1034", "name": "八公山区", "code": "340405" }, { "id": "1035", "name": "潘集区", "code": "340406" }, { "id": "1036", "name": "凤台县", "code": "340421" }, { "id": "1037", "name": "寿县", "code": "340422" }] }, { "id": "103", "name": "马鞍山市", "code": "340500", "children": [{ "id": "1038", "name": "市辖区", "code": "340501" }, { "id": "1039", "name": "花山区", "code": "340503" }, { "id": "1040", "name": "雨山区", "code": "340504" }, { "id": "1041", "name": "博望区", "code": "340506" }, { "id": "1042", "name": "当涂县", "code": "340521" }, { "id": "1043", "name": "含山县", "code": "340522" }, { "id": "1044", "name": "和县", "code": "340523" }] }, { "id": "104", "name": "淮北市", "code": "340600", "children": [{ "id": "1045", "name": "市辖区", "code": "340601" }, { "id": "1046", "name": "杜集区", "code": "340602" }, { "id": "1047", "name": "相山区", "code": "340603" }, { "id": "1048", "name": "烈山区", "code": "340604" }, { "id": "1049", "name": "濉溪县", "code": "340621" }] }, { "id": "105", "name": "铜陵市", "code": "340700", "children": [{ "id": "1050", "name": "市辖区", "code": "340701" }, { "id": "1051", "name": "铜官区", "code": "340705" }, { "id": "1052", "name": "义安区", "code": "340706" }, { "id": "1053", "name": "郊区", "code": "340711" }, { "id": "1054", "name": "枞阳县", "code": "340722" }] }, { "id": "106", "name": "安庆市", "code": "340800", "children": [{ "id": "1055", "name": "市辖区", "code": "340801" }, { "id": "1056", "name": "迎江区", "code": "340802" }, { "id": "1057", "name": "大观区", "code": "340803" }, { "id": "1058", "name": "宜秀区", "code": "340811" }, { "id": "1059", "name": "怀宁县", "code": "340822" }, { "id": "1060", "name": "潜山县", "code": "340824" }, { "id": "1061", "name": "太湖县", "code": "340825" }, { "id": "1062", "name": "宿松县", "code": "340826" }, { "id": "1063", "name": "望江县", "code": "340827" }, { "id": "1064", "name": "岳西县", "code": "340828" }, { "id": "1065", "name": "桐城市", "code": "340881" }] }, { "id": "107", "name": "黄山市", "code": "341000", "children": [{ "id": "1066", "name": "市辖区", "code": "341001" }, { "id": "1067", "name": "屯溪区", "code": "341002" }, { "id": "1068", "name": "黄山区", "code": "341003" }, { "id": "1069", "name": "徽州区", "code": "341004" }, { "id": "1070", "name": "歙县", "code": "341021" }, { "id": "1071", "name": "休宁县", "code": "341022" }, { "id": "1072", "name": "黟县", "code": "341023" }, { "id": "1073", "name": "祁门县", "code": "341024" }] }, { "id": "108", "name": "滁州市", "code": "341100", "children": [{ "id": "1074", "name": "市辖区", "code": "341101" }, { "id": "1075", "name": "琅琊区", "code": "341102" }, { "id": "1076", "name": "南谯区", "code": "341103" }, { "id": "1077", "name": "来安县", "code": "341122" }, { "id": "1078", "name": "全椒县", "code": "341124" }, { "id": "1079", "name": "定远县", "code": "341125" }, { "id": "1080", "name": "凤阳县", "code": "341126" }, { "id": "1081", "name": "天长市", "code": "341181" }, { "id": "1082", "name": "明光市", "code": "341182" }] }, { "id": "109", "name": "阜阳市", "code": "341200", "children": [{ "id": "1083", "name": "市辖区", "code": "341201" }, { "id": "1084", "name": "颍州区", "code": "341202" }, { "id": "1085", "name": "颍东区", "code": "341203" }, { "id": "1086", "name": "颍泉区", "code": "341204" }, { "id": "1087", "name": "临泉县", "code": "341221" }, { "id": "1088", "name": "太和县", "code": "341222" }, { "id": "1089", "name": "阜南县", "code": "341225" }, { "id": "1090", "name": "颍上县", "code": "341226" }, { "id": "1091", "name": "界首市", "code": "341282" }] }, { "id": "110", "name": "宿州市", "code": "341300", "children": [{ "id": "1092", "name": "市辖区", "code": "341301" }, { "id": "1093", "name": "埇桥区", "code": "341302" }, { "id": "1094", "name": "砀山县", "code": "341321" }, { "id": "1095", "name": "萧县", "code": "341322" }, { "id": "1096", "name": "灵璧县", "code": "341323" }, { "id": "1097", "name": "泗县", "code": "341324" }] }, { "id": "111", "name": "六安市", "code": "341500", "children": [{ "id": "1098", "name": "市辖区", "code": "341501" }, { "id": "1099", "name": "金安区", "code": "341502" }, { "id": "1100", "name": "裕安区", "code": "341503" }, { "id": "1101", "name": "叶集区", "code": "341504" }, { "id": "1102", "name": "霍邱县", "code": "341522" }, { "id": "1103", "name": "舒城县", "code": "341523" }, { "id": "1104", "name": "金寨县", "code": "341524" }, { "id": "1105", "name": "霍山县", "code": "341525" }] }, { "id": "112", "name": "亳州市", "code": "341600", "children": [{ "id": "1106", "name": "市辖区", "code": "341601" }, { "id": "1107", "name": "谯城区", "code": "341602" }, { "id": "1108", "name": "涡阳县", "code": "341621" }, { "id": "1109", "name": "蒙城县", "code": "341622" }, { "id": "1110", "name": "利辛县", "code": "341623" }] }, { "id": "113", "name": "池州市", "code": "341700", "children": [{ "id": "1111", "name": "市辖区", "code": "341701" }, { "id": "1112", "name": "贵池区", "code": "341702" }, { "id": "1113", "name": "东至县", "code": "341721" }, { "id": "1114", "name": "石台县", "code": "341722" }, { "id": "1115", "name": "青阳县", "code": "341723" }] }, { "id": "114", "name": "宣城市", "code": "341800", "children": [{ "id": "1116", "name": "市辖区", "code": "341801" }, { "id": "1117", "name": "宣州区", "code": "341802" }, { "id": "1118", "name": "郎溪县", "code": "341821" }, { "id": "1119", "name": "广德县", "code": "341822" }, { "id": "1120", "name": "泾县", "code": "341823" }, { "id": "1121", "name": "绩溪县", "code": "341824" }, { "id": "1122", "name": "旌德县", "code": "341825" }, { "id": "1123", "name": "宁国市", "code": "341881" }] }] }, { "id": "13", "name": "福建省", "code": "350000", "children": [{ "id": "115", "name": "福州市", "code": "350100", "children": [{ "id": "1124", "name": "市辖区", "code": "350101" }, { "id": "1125", "name": "鼓楼区", "code": "350102" }, { "id": "1126", "name": "台江区", "code": "350103" }, { "id": "1127", "name": "仓山区", "code": "350104" }, { "id": "1128", "name": "马尾区", "code": "350105" }, { "id": "1129", "name": "晋安区", "code": "350111" }, { "id": "1130", "name": "闽侯县", "code": "350121" }, { "id": "1131", "name": "连江县", "code": "350122" }, { "id": "1132", "name": "罗源县", "code": "350123" }, { "id": "1133", "name": "闽清县", "code": "350124" }, { "id": "1134", "name": "永泰县", "code": "350125" }, { "id": "1135", "name": "平潭县", "code": "350128" }, { "id": "1136", "name": "福清市", "code": "350181" }, { "id": "1137", "name": "长乐市", "code": "350182" }] }, { "id": "116", "name": "厦门市", "code": "350200", "children": [{ "id": "1138", "name": "市辖区", "code": "350201" }, { "id": "1139", "name": "思明区", "code": "350203" }, { "id": "1140", "name": "海沧区", "code": "350205" }, { "id": "1141", "name": "湖里区", "code": "350206" }, { "id": "1142", "name": "集美区", "code": "350211" }, { "id": "1143", "name": "同安区", "code": "350212" }, { "id": "1144", "name": "翔安区", "code": "350213" }] }, { "id": "117", "name": "莆田市", "code": "350300", "children": [{ "id": "1145", "name": "市辖区", "code": "350301" }, { "id": "1146", "name": "城厢区", "code": "350302" }, { "id": "1147", "name": "涵江区", "code": "350303" }, { "id": "1148", "name": "荔城区", "code": "350304" }, { "id": "1149", "name": "秀屿区", "code": "350305" }, { "id": "1150", "name": "仙游县", "code": "350322" }] }, { "id": "118", "name": "三明市", "code": "350400", "children": [{ "id": "1151", "name": "市辖区", "code": "350401" }, { "id": "1152", "name": "梅列区", "code": "350402" }, { "id": "1153", "name": "三元区", "code": "350403" }, { "id": "1154", "name": "明溪县", "code": "350421" }, { "id": "1155", "name": "清流县", "code": "350423" }, { "id": "1156", "name": "宁化县", "code": "350424" }, { "id": "1157", "name": "大田县", "code": "350425" }, { "id": "1158", "name": "尤溪县", "code": "350426" }, { "id": "1159", "name": "沙县", "code": "350427" }, { "id": "1160", "name": "将乐县", "code": "350428" }, { "id": "1161", "name": "泰宁县", "code": "350429" }, { "id": "1162", "name": "建宁县", "code": "350430" }, { "id": "1163", "name": "永安市", "code": "350481" }] }, { "id": "119", "name": "泉州市", "code": "350500", "children": [{ "id": "1164", "name": "市辖区", "code": "350501" }, { "id": "1165", "name": "鲤城区", "code": "350502" }, { "id": "1166", "name": "丰泽区", "code": "350503" }, { "id": "1167", "name": "洛江区", "code": "350504" }, { "id": "1168", "name": "泉港区", "code": "350505" }, { "id": "1169", "name": "惠安县", "code": "350521" }, { "id": "1170", "name": "安溪县", "code": "350524" }, { "id": "1171", "name": "永春县", "code": "350525" }, { "id": "1172", "name": "德化县", "code": "350526" }, { "id": "1173", "name": "金门县", "code": "350527" }, { "id": "1174", "name": "石狮市", "code": "350581" }, { "id": "1175", "name": "晋江市", "code": "350582" }, { "id": "1176", "name": "南安市", "code": "350583" }] }, { "id": "120", "name": "漳州市", "code": "350600", "children": [{ "id": "1177", "name": "市辖区", "code": "350601" }, { "id": "1178", "name": "芗城区", "code": "350602" }, { "id": "1179", "name": "龙文区", "code": "350603" }, { "id": "1180", "name": "云霄县", "code": "350622" }, { "id": "1181", "name": "漳浦县", "code": "350623" }, { "id": "1182", "name": "诏安县", "code": "350624" }, { "id": "1183", "name": "长泰县", "code": "350625" }, { "id": "1184", "name": "东山县", "code": "350626" }, { "id": "1185", "name": "南靖县", "code": "350627" }, { "id": "1186", "name": "平和县", "code": "350628" }, { "id": "1187", "name": "华安县", "code": "350629" }, { "id": "1188", "name": "龙海市", "code": "350681" }] }, { "id": "121", "name": "南平市", "code": "350700", "children": [{ "id": "1189", "name": "市辖区", "code": "350701" }, { "id": "1190", "name": "延平区", "code": "350702" }, { "id": "1191", "name": "建阳区", "code": "350703" }, { "id": "1192", "name": "顺昌县", "code": "350721" }, { "id": "1193", "name": "浦城县", "code": "350722" }, { "id": "1194", "name": "光泽县", "code": "350723" }, { "id": "1195", "name": "松溪县", "code": "350724" }, { "id": "1196", "name": "政和县", "code": "350725" }, { "id": "1197", "name": "邵武市", "code": "350781" }, { "id": "1198", "name": "武夷山市", "code": "350782" }, { "id": "1199", "name": "建瓯市", "code": "350783" }] }, { "id": "122", "name": "龙岩市", "code": "350800", "children": [{ "id": "1200", "name": "市辖区", "code": "350801" }, { "id": "1201", "name": "新罗区", "code": "350802" }, { "id": "1202", "name": "永定区", "code": "350803" }, { "id": "1203", "name": "长汀县", "code": "350821" }, { "id": "1204", "name": "上杭县", "code": "350823" }, { "id": "1205", "name": "武平县", "code": "350824" }, { "id": "1206", "name": "连城县", "code": "350825" }, { "id": "1207", "name": "漳平市", "code": "350881" }] }, { "id": "123", "name": "宁德市", "code": "350900", "children": [{ "id": "1208", "name": "市辖区", "code": "350901" }, { "id": "1209", "name": "蕉城区", "code": "350902" }, { "id": "1210", "name": "霞浦县", "code": "350921" }, { "id": "1211", "name": "古田县", "code": "350922" }, { "id": "1212", "name": "屏南县", "code": "350923" }, { "id": "1213", "name": "寿宁县", "code": "350924" }, { "id": "1214", "name": "周宁县", "code": "350925" }, { "id": "1215", "name": "柘荣县", "code": "350926" }, { "id": "1216", "name": "福安市", "code": "350981" }, { "id": "1217", "name": "福鼎市", "code": "350982" }] }] }, { "id": "14", "name": "江西省", "code": "360000", "children": [{ "id": "124", "name": "南昌市", "code": "360100", "children": [{ "id": "1218", "name": "市辖区", "code": "360101" }, { "id": "1219", "name": "东湖区", "code": "360102" }, { "id": "1220", "name": "西湖区", "code": "360103" }, { "id": "1221", "name": "青云谱区", "code": "360104" }, { "id": "1222", "name": "湾里区", "code": "360105" }, { "id": "1223", "name": "青山湖区", "code": "360111" }, { "id": "1224", "name": "新建区", "code": "360112" }, { "id": "1225", "name": "南昌县", "code": "360121" }, { "id": "1226", "name": "安义县", "code": "360123" }, { "id": "1227", "name": "进贤县", "code": "360124" }] }, { "id": "125", "name": "景德镇市", "code": "360200", "children": [{ "id": "1228", "name": "市辖区", "code": "360201" }, { "id": "1229", "name": "昌江区", "code": "360202" }, { "id": "1230", "name": "珠山区", "code": "360203" }, { "id": "1231", "name": "浮梁县", "code": "360222" }, { "id": "1232", "name": "乐平市", "code": "360281" }] }, { "id": "126", "name": "萍乡市", "code": "360300", "children": [{ "id": "1233", "name": "市辖区", "code": "360301" }, { "id": "1234", "name": "安源区", "code": "360302" }, { "id": "1235", "name": "湘东区", "code": "360313" }, { "id": "1236", "name": "莲花县", "code": "360321" }, { "id": "1237", "name": "上栗县", "code": "360322" }, { "id": "1238", "name": "芦溪县", "code": "360323" }] }, { "id": "127", "name": "九江市", "code": "360400", "children": [{ "id": "1239", "name": "市辖区", "code": "360401" }, { "id": "1240", "name": "濂溪区", "code": "360402" }, { "id": "1241", "name": "浔阳区", "code": "360403" }, { "id": "1242", "name": "九江县", "code": "360421" }, { "id": "1243", "name": "武宁县", "code": "360423" }, { "id": "1244", "name": "修水县", "code": "360424" }, { "id": "1245", "name": "永修县", "code": "360425" }, { "id": "1246", "name": "德安县", "code": "360426" }, { "id": "1247", "name": "都昌县", "code": "360428" }, { "id": "1248", "name": "湖口县", "code": "360429" }, { "id": "1249", "name": "彭泽县", "code": "360430" }, { "id": "1250", "name": "瑞昌市", "code": "360481" }, { "id": "1251", "name": "共青城市", "code": "360482" }, { "id": "1252", "name": "庐山市", "code": "360483" }] }, { "id": "128", "name": "新余市", "code": "360500", "children": [{ "id": "1253", "name": "市辖区", "code": "360501" }, { "id": "1254", "name": "渝水区", "code": "360502" }, { "id": "1255", "name": "分宜县", "code": "360521" }] }, { "id": "129", "name": "鹰潭市", "code": "360600", "children": [{ "id": "1256", "name": "市辖区", "code": "360601" }, { "id": "1257", "name": "月湖区", "code": "360602" }, { "id": "1258", "name": "余江县", "code": "360622" }, { "id": "1259", "name": "贵溪市", "code": "360681" }] }, { "id": "130", "name": "赣州市", "code": "360700", "children": [{ "id": "1260", "name": "市辖区", "code": "360701" }, { "id": "1261", "name": "章贡区", "code": "360702" }, { "id": "1262", "name": "南康区", "code": "360703" }, { "id": "1263", "name": "赣县", "code": "360721" }, { "id": "1264", "name": "信丰县", "code": "360722" }, { "id": "1265", "name": "大余县", "code": "360723" }, { "id": "1266", "name": "上犹县", "code": "360724" }, { "id": "1267", "name": "崇义县", "code": "360725" }, { "id": "1268", "name": "安远县", "code": "360726" }, { "id": "1269", "name": "龙南县", "code": "360727" }, { "id": "1270", "name": "定南县", "code": "360728" }, { "id": "1271", "name": "全南县", "code": "360729" }, { "id": "1272", "name": "宁都县", "code": "360730" }, { "id": "1273", "name": "于都县", "code": "360731" }, { "id": "1274", "name": "兴国县", "code": "360732" }, { "id": "1275", "name": "会昌县", "code": "360733" }, { "id": "1276", "name": "寻乌县", "code": "360734" }, { "id": "1277", "name": "石城县", "code": "360735" }, { "id": "1278", "name": "瑞金市", "code": "360781" }] }, { "id": "131", "name": "吉安市", "code": "360800", "children": [{ "id": "1279", "name": "市辖区", "code": "360801" }, { "id": "1280", "name": "吉州区", "code": "360802" }, { "id": "1281", "name": "青原区", "code": "360803" }, { "id": "1282", "name": "吉安县", "code": "360821" }, { "id": "1283", "name": "吉水县", "code": "360822" }, { "id": "1284", "name": "峡江县", "code": "360823" }, { "id": "1285", "name": "新干县", "code": "360824" }, { "id": "1286", "name": "永丰县", "code": "360825" }, { "id": "1287", "name": "泰和县", "code": "360826" }, { "id": "1288", "name": "遂川县", "code": "360827" }, { "id": "1289", "name": "万安县", "code": "360828" }, { "id": "1290", "name": "安福县", "code": "360829" }, { "id": "1291", "name": "永新县", "code": "360830" }, { "id": "1292", "name": "井冈山市", "code": "360881" }] }, { "id": "132", "name": "宜春市", "code": "360900", "children": [{ "id": "1293", "name": "市辖区", "code": "360901" }, { "id": "1294", "name": "袁州区", "code": "360902" }, { "id": "1295", "name": "奉新县", "code": "360921" }, { "id": "1296", "name": "万载县", "code": "360922" }, { "id": "1297", "name": "上高县", "code": "360923" }, { "id": "1298", "name": "宜丰县", "code": "360924" }, { "id": "1299", "name": "靖安县", "code": "360925" }, { "id": "1300", "name": "铜鼓县", "code": "360926" }, { "id": "1301", "name": "丰城市", "code": "360981" }, { "id": "1302", "name": "樟树市", "code": "360982" }, { "id": "1303", "name": "高安市", "code": "360983" }] }, { "id": "133", "name": "抚州市", "code": "361000", "children": [{ "id": "1304", "name": "市辖区", "code": "361001" }, { "id": "1305", "name": "临川区", "code": "361002" }, { "id": "1306", "name": "南城县", "code": "361021" }, { "id": "1307", "name": "黎川县", "code": "361022" }, { "id": "1308", "name": "南丰县", "code": "361023" }, { "id": "1309", "name": "崇仁县", "code": "361024" }, { "id": "1310", "name": "乐安县", "code": "361025" }, { "id": "1311", "name": "宜黄县", "code": "361026" }, { "id": "1312", "name": "金溪县", "code": "361027" }, { "id": "1313", "name": "资溪县", "code": "361028" }, { "id": "1314", "name": "东乡县", "code": "361029" }, { "id": "1315", "name": "广昌县", "code": "361030" }] }, { "id": "134", "name": "上饶市", "code": "361100", "children": [{ "id": "1316", "name": "市辖区", "code": "361101" }, { "id": "1317", "name": "信州区", "code": "361102" }, { "id": "1318", "name": "广丰区", "code": "361103" }, { "id": "1319", "name": "上饶县", "code": "361121" }, { "id": "1320", "name": "玉山县", "code": "361123" }, { "id": "1321", "name": "铅山县", "code": "361124" }, { "id": "1322", "name": "横峰县", "code": "361125" }, { "id": "1323", "name": "弋阳县", "code": "361126" }, { "id": "1324", "name": "余干县", "code": "361127" }, { "id": "1325", "name": "鄱阳县", "code": "361128" }, { "id": "1326", "name": "万年县", "code": "361129" }, { "id": "1327", "name": "婺源县", "code": "361130" }, { "id": "1328", "name": "德兴市", "code": "361181" }] }] }, { "id": "15", "name": "山东省", "code": "370000", "children": [{ "id": "135", "name": "济南市", "code": "370100", "children": [{ "id": "1329", "name": "市辖区", "code": "370101" }, { "id": "1330", "name": "历下区", "code": "370102" }, { "id": "1331", "name": "市中区", "code": "370103" }, { "id": "1332", "name": "槐荫区", "code": "370104" }, { "id": "1333", "name": "天桥区", "code": "370105" }, { "id": "1334", "name": "历城区", "code": "370112" }, { "id": "1335", "name": "长清区", "code": "370113" }, { "id": "1336", "name": "平阴县", "code": "370124" }, { "id": "1337", "name": "济阳县", "code": "370125" }, { "id": "1338", "name": "商河县", "code": "370126" }, { "id": "1339", "name": "章丘市", "code": "370181" }] }, { "id": "136", "name": "青岛市", "code": "370200", "children": [{ "id": "1340", "name": "市辖区", "code": "370201" }, { "id": "1341", "name": "市南区", "code": "370202" }, { "id": "1342", "name": "市北区", "code": "370203" }, { "id": "1343", "name": "黄岛区", "code": "370211" }, { "id": "1344", "name": "崂山区", "code": "370212" }, { "id": "1345", "name": "李沧区", "code": "370213" }, { "id": "1346", "name": "城阳区", "code": "370214" }, { "id": "1347", "name": "胶州市", "code": "370281" }, { "id": "1348", "name": "即墨市", "code": "370282" }, { "id": "1349", "name": "平度市", "code": "370283" }, { "id": "1350", "name": "莱西市", "code": "370285" }] }, { "id": "137", "name": "淄博市", "code": "370300", "children": [{ "id": "1351", "name": "市辖区", "code": "370301" }, { "id": "1352", "name": "淄川区", "code": "370302" }, { "id": "1353", "name": "张店区", "code": "370303" }, { "id": "1354", "name": "博山区", "code": "370304" }, { "id": "1355", "name": "临淄区", "code": "370305" }, { "id": "1356", "name": "周村区", "code": "370306" }, { "id": "1357", "name": "桓台县", "code": "370321" }, { "id": "1358", "name": "高青县", "code": "370322" }, { "id": "1359", "name": "沂源县", "code": "370323" }] }, { "id": "138", "name": "枣庄市", "code": "370400", "children": [{ "id": "1360", "name": "市辖区", "code": "370401" }, { "id": "1361", "name": "市中区", "code": "370402" }, { "id": "1362", "name": "薛城区", "code": "370403" }, { "id": "1363", "name": "峄城区", "code": "370404" }, { "id": "1364", "name": "台儿庄区", "code": "370405" }, { "id": "1365", "name": "山亭区", "code": "370406" }, { "id": "1366", "name": "滕州市", "code": "370481" }] }, { "id": "139", "name": "东营市", "code": "370500", "children": [{ "id": "1367", "name": "市辖区", "code": "370501" }, { "id": "1368", "name": "东营区", "code": "370502" }, { "id": "1369", "name": "河口区", "code": "370503" }, { "id": "1370", "name": "垦利区", "code": "370505" }, { "id": "1371", "name": "利津县", "code": "370522" }, { "id": "1372", "name": "广饶县", "code": "370523" }] }, { "id": "140", "name": "烟台市", "code": "370600", "children": [{ "id": "1373", "name": "市辖区", "code": "370601" }, { "id": "1374", "name": "芝罘区", "code": "370602" }, { "id": "1375", "name": "福山区", "code": "370611" }, { "id": "1376", "name": "牟平区", "code": "370612" }, { "id": "1377", "name": "莱山区", "code": "370613" }, { "id": "1378", "name": "长岛县", "code": "370634" }, { "id": "1379", "name": "龙口市", "code": "370681" }, { "id": "1380", "name": "莱阳市", "code": "370682" }, { "id": "1381", "name": "莱州市", "code": "370683" }, { "id": "1382", "name": "蓬莱市", "code": "370684" }, { "id": "1383", "name": "招远市", "code": "370685" }, { "id": "1384", "name": "栖霞市", "code": "370686" }, { "id": "1385", "name": "海阳市", "code": "370687" }] }, { "id": "141", "name": "潍坊市", "code": "370700", "children": [{ "id": "1386", "name": "市辖区", "code": "370701" }, { "id": "1387", "name": "潍城区", "code": "370702" }, { "id": "1388", "name": "寒亭区", "code": "370703" }, { "id": "1389", "name": "坊子区", "code": "370704" }, { "id": "1390", "name": "奎文区", "code": "370705" }, { "id": "1391", "name": "临朐县", "code": "370724" }, { "id": "1392", "name": "昌乐县", "code": "370725" }, { "id": "1393", "name": "青州市", "code": "370781" }, { "id": "1394", "name": "诸城市", "code": "370782" }, { "id": "1395", "name": "寿光市", "code": "370783" }, { "id": "1396", "name": "安丘市", "code": "370784" }, { "id": "1397", "name": "高密市", "code": "370785" }, { "id": "1398", "name": "昌邑市", "code": "370786" }] }, { "id": "142", "name": "济宁市", "code": "370800", "children": [{ "id": "1399", "name": "市辖区", "code": "370801" }, { "id": "1400", "name": "任城区", "code": "370811" }, { "id": "1401", "name": "兖州区", "code": "370812" }, { "id": "1402", "name": "微山县", "code": "370826" }, { "id": "1403", "name": "鱼台县", "code": "370827" }, { "id": "1404", "name": "金乡县", "code": "370828" }, { "id": "1405", "name": "嘉祥县", "code": "370829" }, { "id": "1406", "name": "汶上县", "code": "370830" }, { "id": "1407", "name": "泗水县", "code": "370831" }, { "id": "1408", "name": "梁山县", "code": "370832" }, { "id": "1409", "name": "曲阜市", "code": "370881" }, { "id": "1410", "name": "邹城市", "code": "370883" }] }, { "id": "143", "name": "泰安市", "code": "370900", "children": [{ "id": "1411", "name": "市辖区", "code": "370901" }, { "id": "1412", "name": "泰山区", "code": "370902" }, { "id": "1413", "name": "岱岳区", "code": "370911" }, { "id": "1414", "name": "宁阳县", "code": "370921" }, { "id": "1415", "name": "东平县", "code": "370923" }, { "id": "1416", "name": "新泰市", "code": "370982" }, { "id": "1417", "name": "肥城市", "code": "370983" }] }, { "id": "144", "name": "威海市", "code": "371000", "children": [{ "id": "1418", "name": "市辖区", "code": "371001" }, { "id": "1419", "name": "环翠区", "code": "371002" }, { "id": "1420", "name": "文登区", "code": "371003" }, { "id": "1421", "name": "荣成市", "code": "371082" }, { "id": "1422", "name": "乳山市", "code": "371083" }] }, { "id": "145", "name": "日照市", "code": "371100", "children": [{ "id": "1423", "name": "市辖区", "code": "371101" }, { "id": "1424", "name": "东港区", "code": "371102" }, { "id": "1425", "name": "岚山区", "code": "371103" }, { "id": "1426", "name": "五莲县", "code": "371121" }, { "id": "1427", "name": "莒县", "code": "371122" }] }, { "id": "146", "name": "莱芜市", "code": "371200", "children": [{ "id": "1428", "name": "市辖区", "code": "371201" }, { "id": "1429", "name": "莱城区", "code": "371202" }, { "id": "1430", "name": "钢城区", "code": "371203" }] }, { "id": "147", "name": "临沂市", "code": "371300", "children": [{ "id": "1431", "name": "市辖区", "code": "371301" }, { "id": "1432", "name": "兰山区", "code": "371302" }, { "id": "1433", "name": "罗庄区", "code": "371311" }, { "id": "1434", "name": "河东区", "code": "371312" }, { "id": "1435", "name": "沂南县", "code": "371321" }, { "id": "1436", "name": "郯城县", "code": "371322" }, { "id": "1437", "name": "沂水县", "code": "371323" }, { "id": "1438", "name": "兰陵县", "code": "371324" }, { "id": "1439", "name": "费县", "code": "371325" }, { "id": "1440", "name": "平邑县", "code": "371326" }, { "id": "1441", "name": "莒南县", "code": "371327" }, { "id": "1442", "name": "蒙阴县", "code": "371328" }, { "id": "1443", "name": "临沭县", "code": "371329" }] }, { "id": "148", "name": "德州市", "code": "371400", "children": [{ "id": "1444", "name": "市辖区", "code": "371401" }, { "id": "1445", "name": "德城区", "code": "371402" }, { "id": "1446", "name": "陵城区", "code": "371403" }, { "id": "1447", "name": "宁津县", "code": "371422" }, { "id": "1448", "name": "庆云县", "code": "371423" }, { "id": "1449", "name": "临邑县", "code": "371424" }, { "id": "1450", "name": "齐河县", "code": "371425" }, { "id": "1451", "name": "平原县", "code": "371426" }, { "id": "1452", "name": "夏津县", "code": "371427" }, { "id": "1453", "name": "武城县", "code": "371428" }, { "id": "1454", "name": "乐陵市", "code": "371481" }, { "id": "1455", "name": "禹城市", "code": "371482" }] }, { "id": "149", "name": "聊城市", "code": "371500", "children": [{ "id": "1456", "name": "市辖区", "code": "371501" }, { "id": "1457", "name": "东昌府区", "code": "371502" }, { "id": "1458", "name": "阳谷县", "code": "371521" }, { "id": "1459", "name": "莘县", "code": "371522" }, { "id": "1460", "name": "茌平县", "code": "371523" }, { "id": "1461", "name": "东阿县", "code": "371524" }, { "id": "1462", "name": "冠县", "code": "371525" }, { "id": "1463", "name": "高唐县", "code": "371526" }, { "id": "1464", "name": "临清市", "code": "371581" }] }, { "id": "150", "name": "滨州市", "code": "371600", "children": [{ "id": "1465", "name": "市辖区", "code": "371601" }, { "id": "1466", "name": "滨城区", "code": "371602" }, { "id": "1467", "name": "沾化区", "code": "371603" }, { "id": "1468", "name": "惠民县", "code": "371621" }, { "id": "1469", "name": "阳信县", "code": "371622" }, { "id": "1470", "name": "无棣县", "code": "371623" }, { "id": "1471", "name": "博兴县", "code": "371625" }, { "id": "1472", "name": "邹平县", "code": "371626" }] }, { "id": "151", "name": "菏泽市", "code": "371700", "children": [{ "id": "1473", "name": "市辖区", "code": "371701" }, { "id": "1474", "name": "牡丹区", "code": "371702" }, { "id": "1475", "name": "定陶区", "code": "371703" }, { "id": "1476", "name": "曹县", "code": "371721" }, { "id": "1477", "name": "单县", "code": "371722" }, { "id": "1478", "name": "成武县", "code": "371723" }, { "id": "1479", "name": "巨野县", "code": "371724" }, { "id": "1480", "name": "郓城县", "code": "371725" }, { "id": "1481", "name": "鄄城县", "code": "371726" }, { "id": "1482", "name": "东明县", "code": "371728" }] }] }, { "id": "16", "name": "河南省", "code": "410000", "children": [{ "id": "152", "name": "郑州市", "code": "410100", "children": [{ "id": "1483", "name": "市辖区", "code": "410101" }, { "id": "1484", "name": "中原区", "code": "410102" }, { "id": "1485", "name": "二七区", "code": "410103" }, { "id": "1486", "name": "管城回族区", "code": "410104" }, { "id": "1487", "name": "金水区", "code": "410105" }, { "id": "1488", "name": "上街区", "code": "410106" }, { "id": "1489", "name": "惠济区", "code": "410108" }, { "id": "1490", "name": "中牟县", "code": "410122" }, { "id": "1491", "name": "巩义市", "code": "410181" }, { "id": "1492", "name": "荥阳市", "code": "410182" }, { "id": "1493", "name": "新密市", "code": "410183" }, { "id": "1494", "name": "新郑市", "code": "410184" }, { "id": "1495", "name": "登封市", "code": "410185" }] }, { "id": "153", "name": "开封市", "code": "410200", "children": [{ "id": "1496", "name": "市辖区", "code": "410201" }, { "id": "1497", "name": "龙亭区", "code": "410202" }, { "id": "1498", "name": "顺河回族区", "code": "410203" }, { "id": "1499", "name": "鼓楼区", "code": "410204" }, { "id": "1500", "name": "禹王台区", "code": "410205" }, { "id": "1501", "name": "金明区", "code": "410211" }, { "id": "1502", "name": "祥符区", "code": "410212" }, { "id": "1503", "name": "杞县", "code": "410221" }, { "id": "1504", "name": "通许县", "code": "410222" }, { "id": "1505", "name": "尉氏县", "code": "410223" }, { "id": "1506", "name": "兰考县", "code": "410225" }] }, { "id": "154", "name": "洛阳市", "code": "410300", "children": [{ "id": "1507", "name": "市辖区", "code": "410301" }, { "id": "1508", "name": "老城区", "code": "410302" }, { "id": "1509", "name": "西工区", "code": "410303" }, { "id": "1510", "name": "瀍河回族区", "code": "410304" }, { "id": "1511", "name": "涧西区", "code": "410305" }, { "id": "1512", "name": "吉利区", "code": "410306" }, { "id": "1513", "name": "洛龙区", "code": "410311" }, { "id": "1514", "name": "孟津县", "code": "410322" }, { "id": "1515", "name": "新安县", "code": "410323" }, { "id": "1516", "name": "栾川县", "code": "410324" }, { "id": "1517", "name": "嵩县", "code": "410325" }, { "id": "1518", "name": "汝阳县", "code": "410326" }, { "id": "1519", "name": "宜阳县", "code": "410327" }, { "id": "1520", "name": "洛宁县", "code": "410328" }, { "id": "1521", "name": "伊川县", "code": "410329" }, { "id": "1522", "name": "偃师市", "code": "410381" }] }, { "id": "155", "name": "平顶山市", "code": "410400", "children": [{ "id": "1523", "name": "市辖区", "code": "410401" }, { "id": "1524", "name": "新华区", "code": "410402" }, { "id": "1525", "name": "卫东区", "code": "410403" }, { "id": "1526", "name": "石龙区", "code": "410404" }, { "id": "1527", "name": "湛河区", "code": "410411" }, { "id": "1528", "name": "宝丰县", "code": "410421" }, { "id": "1529", "name": "叶县", "code": "410422" }, { "id": "1530", "name": "鲁山县", "code": "410423" }, { "id": "1531", "name": "郏县", "code": "410425" }, { "id": "1532", "name": "舞钢市", "code": "410481" }, { "id": "1533", "name": "汝州市", "code": "410482" }] }, { "id": "156", "name": "安阳市", "code": "410500", "children": [{ "id": "1534", "name": "市辖区", "code": "410501" }, { "id": "1535", "name": "文峰区", "code": "410502" }, { "id": "1536", "name": "北关区", "code": "410503" }, { "id": "1537", "name": "殷都区", "code": "410505" }, { "id": "1538", "name": "龙安区", "code": "410506" }, { "id": "1539", "name": "安阳县", "code": "410522" }, { "id": "1540", "name": "汤阴县", "code": "410523" }, { "id": "1541", "name": "滑县", "code": "410526" }, { "id": "1542", "name": "内黄县", "code": "410527" }, { "id": "1543", "name": "林州市", "code": "410581" }] }, { "id": "157", "name": "鹤壁市", "code": "410600", "children": [{ "id": "1544", "name": "市辖区", "code": "410601" }, { "id": "1545", "name": "鹤山区", "code": "410602" }, { "id": "1546", "name": "山城区", "code": "410603" }, { "id": "1547", "name": "淇滨区", "code": "410611" }, { "id": "1548", "name": "浚县", "code": "410621" }, { "id": "1549", "name": "淇县", "code": "410622" }] }, { "id": "158", "name": "新乡市", "code": "410700", "children": [{ "id": "1550", "name": "市辖区", "code": "410701" }, { "id": "1551", "name": "红旗区", "code": "410702" }, { "id": "1552", "name": "卫滨区", "code": "410703" }, { "id": "1553", "name": "凤泉区", "code": "410704" }, { "id": "1554", "name": "牧野区", "code": "410711" }, { "id": "1555", "name": "新乡县", "code": "410721" }, { "id": "1556", "name": "获嘉县", "code": "410724" }, { "id": "1557", "name": "原阳县", "code": "410725" }, { "id": "1558", "name": "延津县", "code": "410726" }, { "id": "1559", "name": "封丘县", "code": "410727" }, { "id": "1560", "name": "长垣县", "code": "410728" }, { "id": "1561", "name": "卫辉市", "code": "410781" }, { "id": "1562", "name": "辉县市", "code": "410782" }] }, { "id": "159", "name": "焦作市", "code": "410800", "children": [{ "id": "1563", "name": "市辖区", "code": "410801" }, { "id": "1564", "name": "解放区", "code": "410802" }, { "id": "1565", "name": "中站区", "code": "410803" }, { "id": "1566", "name": "马村区", "code": "410804" }, { "id": "1567", "name": "山阳区", "code": "410811" }, { "id": "1568", "name": "修武县", "code": "410821" }, { "id": "1569", "name": "博爱县", "code": "410822" }, { "id": "1570", "name": "武陟县", "code": "410823" }, { "id": "1571", "name": "温县", "code": "410825" }, { "id": "1572", "name": "沁阳市", "code": "410882" }, { "id": "1573", "name": "孟州市", "code": "410883" }] }, { "id": "160", "name": "濮阳市", "code": "410900", "children": [{ "id": "1574", "name": "市辖区", "code": "410901" }, { "id": "1575", "name": "华龙区", "code": "410902" }, { "id": "1576", "name": "清丰县", "code": "410922" }, { "id": "1577", "name": "南乐县", "code": "410923" }, { "id": "1578", "name": "范县", "code": "410926" }, { "id": "1579", "name": "台前县", "code": "410927" }, { "id": "1580", "name": "濮阳县", "code": "410928" }] }, { "id": "161", "name": "许昌市", "code": "411000", "children": [{ "id": "1581", "name": "市辖区", "code": "411001" }, { "id": "1582", "name": "魏都区", "code": "411002" }, { "id": "1583", "name": "许昌县", "code": "411023" }, { "id": "1584", "name": "鄢陵县", "code": "411024" }, { "id": "1585", "name": "襄城县", "code": "411025" }, { "id": "1586", "name": "禹州市", "code": "411081" }, { "id": "1587", "name": "长葛市", "code": "411082" }] }, { "id": "162", "name": "漯河市", "code": "411100", "children": [{ "id": "1588", "name": "市辖区", "code": "411101" }, { "id": "1589", "name": "源汇区", "code": "411102" }, { "id": "1590", "name": "郾城区", "code": "411103" }, { "id": "1591", "name": "召陵区", "code": "411104" }, { "id": "1592", "name": "舞阳县", "code": "411121" }, { "id": "1593", "name": "临颍县", "code": "411122" }] }, { "id": "163", "name": "三门峡市", "code": "411200", "children": [{ "id": "1594", "name": "市辖区", "code": "411201" }, { "id": "1595", "name": "湖滨区", "code": "411202" }, { "id": "1596", "name": "陕州区", "code": "411203" }, { "id": "1597", "name": "渑池县", "code": "411221" }, { "id": "1598", "name": "卢氏县", "code": "411224" }, { "id": "1599", "name": "义马市", "code": "411281" }, { "id": "1600", "name": "灵宝市", "code": "411282" }] }, { "id": "164", "name": "南阳市", "code": "411300", "children": [{ "id": "1601", "name": "市辖区", "code": "411301" }, { "id": "1602", "name": "宛城区", "code": "411302" }, { "id": "1603", "name": "卧龙区", "code": "411303" }, { "id": "1604", "name": "南召县", "code": "411321" }, { "id": "1605", "name": "方城县", "code": "411322" }, { "id": "1606", "name": "西峡县", "code": "411323" }, { "id": "1607", "name": "镇平县", "code": "411324" }, { "id": "1608", "name": "内乡县", "code": "411325" }, { "id": "1609", "name": "淅川县", "code": "411326" }, { "id": "1610", "name": "社旗县", "code": "411327" }, { "id": "1611", "name": "唐河县", "code": "411328" }, { "id": "1612", "name": "新野县", "code": "411329" }, { "id": "1613", "name": "桐柏县", "code": "411330" }, { "id": "1614", "name": "邓州市", "code": "411381" }] }, { "id": "165", "name": "商丘市", "code": "411400", "children": [{ "id": "1615", "name": "市辖区", "code": "411401" }, { "id": "1616", "name": "梁园区", "code": "411402" }, { "id": "1617", "name": "睢阳区", "code": "411403" }, { "id": "1618", "name": "民权县", "code": "411421" }, { "id": "1619", "name": "睢县", "code": "411422" }, { "id": "1620", "name": "宁陵县", "code": "411423" }, { "id": "1621", "name": "柘城县", "code": "411424" }, { "id": "1622", "name": "虞城县", "code": "411425" }, { "id": "1623", "name": "夏邑县", "code": "411426" }, { "id": "1624", "name": "永城市", "code": "411481" }] }, { "id": "166", "name": "信阳市", "code": "411500", "children": [{ "id": "1625", "name": "市辖区", "code": "411501" }, { "id": "1626", "name": "浉河区", "code": "411502" }, { "id": "1627", "name": "平桥区", "code": "411503" }, { "id": "1628", "name": "罗山县", "code": "411521" }, { "id": "1629", "name": "光山县", "code": "411522" }, { "id": "1630", "name": "新县", "code": "411523" }, { "id": "1631", "name": "商城县", "code": "411524" }, { "id": "1632", "name": "固始县", "code": "411525" }, { "id": "1633", "name": "潢川县", "code": "411526" }, { "id": "1634", "name": "淮滨县", "code": "411527" }, { "id": "1635", "name": "息县", "code": "411528" }] }, { "id": "167", "name": "周口市", "code": "411600", "children": [{ "id": "1636", "name": "市辖区", "code": "411601" }, { "id": "1637", "name": "川汇区", "code": "411602" }, { "id": "1638", "name": "扶沟县", "code": "411621" }, { "id": "1639", "name": "西华县", "code": "411622" }, { "id": "1640", "name": "商水县", "code": "411623" }, { "id": "1641", "name": "沈丘县", "code": "411624" }, { "id": "1642", "name": "郸城县", "code": "411625" }, { "id": "1643", "name": "淮阳县", "code": "411626" }, { "id": "1644", "name": "太康县", "code": "411627" }, { "id": "1645", "name": "鹿邑县", "code": "411628" }, { "id": "1646", "name": "项城市", "code": "411681" }] }, { "id": "168", "name": "驻马店市", "code": "411700", "children": [{ "id": "1647", "name": "市辖区", "code": "411701" }, { "id": "1648", "name": "驿城区", "code": "411702" }, { "id": "1649", "name": "西平县", "code": "411721" }, { "id": "1650", "name": "上蔡县", "code": "411722" }, { "id": "1651", "name": "平舆县", "code": "411723" }, { "id": "1652", "name": "正阳县", "code": "411724" }, { "id": "1653", "name": "确山县", "code": "411725" }, { "id": "1654", "name": "泌阳县", "code": "411726" }, { "id": "1655", "name": "汝南县", "code": "411727" }, { "id": "1656", "name": "遂平县", "code": "411728" }, { "id": "1657", "name": "新蔡县", "code": "411729" }] }, { "id": "169", "name": "省直辖县级行政区划", "code": "419000", "children": [{ "id": "1658", "name": "济源市", "code": "419001" }] }] }, { "id": "17", "name": "湖北省", "code": "420000", "children": [{ "id": "170", "name": "武汉市", "code": "420100", "children": [{ "id": "1659", "name": "市辖区", "code": "420101" }, { "id": "1660", "name": "江岸区", "code": "420102" }, { "id": "1661", "name": "江汉区", "code": "420103" }, { "id": "1662", "name": "硚口区", "code": "420104" }, { "id": "1663", "name": "汉阳区", "code": "420105" }, { "id": "1664", "name": "武昌区", "code": "420106" }, { "id": "1665", "name": "青山区", "code": "420107" }, { "id": "1666", "name": "洪山区", "code": "420111" }, { "id": "1667", "name": "东西湖区", "code": "420112" }, { "id": "1668", "name": "汉南区", "code": "420113" }, { "id": "1669", "name": "蔡甸区", "code": "420114" }, { "id": "1670", "name": "江夏区", "code": "420115" }, { "id": "1671", "name": "黄陂区", "code": "420116" }, { "id": "1672", "name": "新洲区", "code": "420117" }] }, { "id": "171", "name": "黄石市", "code": "420200", "children": [{ "id": "1673", "name": "市辖区", "code": "420201" }, { "id": "1674", "name": "黄石港区", "code": "420202" }, { "id": "1675", "name": "西塞山区", "code": "420203" }, { "id": "1676", "name": "下陆区", "code": "420204" }, { "id": "1677", "name": "铁山区", "code": "420205" }, { "id": "1678", "name": "阳新县", "code": "420222" }, { "id": "1679", "name": "大冶市", "code": "420281" }] }, { "id": "172", "name": "十堰市", "code": "420300", "children": [{ "id": "1680", "name": "市辖区", "code": "420301" }, { "id": "1681", "name": "茅箭区", "code": "420302" }, { "id": "1682", "name": "张湾区", "code": "420303" }, { "id": "1683", "name": "郧阳区", "code": "420304" }, { "id": "1684", "name": "郧西县", "code": "420322" }, { "id": "1685", "name": "竹山县", "code": "420323" }, { "id": "1686", "name": "竹溪县", "code": "420324" }, { "id": "1687", "name": "房县", "code": "420325" }, { "id": "1688", "name": "丹江口市", "code": "420381" }] }, { "id": "173", "name": "宜昌市", "code": "420500", "children": [{ "id": "1689", "name": "市辖区", "code": "420501" }, { "id": "1690", "name": "西陵区", "code": "420502" }, { "id": "1691", "name": "伍家岗区", "code": "420503" }, { "id": "1692", "name": "点军区", "code": "420504" }, { "id": "1693", "name": "猇亭区", "code": "420505" }, { "id": "1694", "name": "夷陵区", "code": "420506" }, { "id": "1695", "name": "远安县", "code": "420525" }, { "id": "1696", "name": "兴山县", "code": "420526" }, { "id": "1697", "name": "秭归县", "code": "420527" }, { "id": "1698", "name": "长阳土家族自治县", "code": "420528" }, { "id": "1699", "name": "五峰土家族自治县", "code": "420529" }, { "id": "1700", "name": "宜都市", "code": "420581" }, { "id": "1701", "name": "当阳市", "code": "420582" }, { "id": "1702", "name": "枝江市", "code": "420583" }] }, { "id": "174", "name": "襄阳市", "code": "420600", "children": [{ "id": "1703", "name": "市辖区", "code": "420601" }, { "id": "1704", "name": "襄城区", "code": "420602" }, { "id": "1705", "name": "樊城区", "code": "420606" }, { "id": "1706", "name": "襄州区", "code": "420607" }, { "id": "1707", "name": "南漳县", "code": "420624" }, { "id": "1708", "name": "谷城县", "code": "420625" }, { "id": "1709", "name": "保康县", "code": "420626" }, { "id": "1710", "name": "老河口市", "code": "420682" }, { "id": "1711", "name": "枣阳市", "code": "420683" }, { "id": "1712", "name": "宜城市", "code": "420684" }] }, { "id": "175", "name": "鄂州市", "code": "420700", "children": [{ "id": "1713", "name": "市辖区", "code": "420701" }, { "id": "1714", "name": "梁子湖区", "code": "420702" }, { "id": "1715", "name": "华容区", "code": "420703" }, { "id": "1716", "name": "鄂城区", "code": "420704" }] }, { "id": "176", "name": "荆门市", "code": "420800", "children": [{ "id": "1717", "name": "市辖区", "code": "420801" }, { "id": "1718", "name": "东宝区", "code": "420802" }, { "id": "1719", "name": "掇刀区", "code": "420804" }, { "id": "1720", "name": "京山县", "code": "420821" }, { "id": "1721", "name": "沙洋县", "code": "420822" }, { "id": "1722", "name": "钟祥市", "code": "420881" }] }, { "id": "177", "name": "孝感市", "code": "420900", "children": [{ "id": "1723", "name": "市辖区", "code": "420901" }, { "id": "1724", "name": "孝南区", "code": "420902" }, { "id": "1725", "name": "孝昌县", "code": "420921" }, { "id": "1726", "name": "大悟县", "code": "420922" }, { "id": "1727", "name": "云梦县", "code": "420923" }, { "id": "1728", "name": "应城市", "code": "420981" }, { "id": "1729", "name": "安陆市", "code": "420982" }, { "id": "1730", "name": "汉川市", "code": "420984" }] }, { "id": "178", "name": "荆州市", "code": "421000", "children": [{ "id": "1731", "name": "市辖区", "code": "421001" }, { "id": "1732", "name": "沙市区", "code": "421002" }, { "id": "1733", "name": "荆州区", "code": "421003" }, { "id": "1734", "name": "公安县", "code": "421022" }, { "id": "1735", "name": "监利县", "code": "421023" }, { "id": "1736", "name": "江陵县", "code": "421024" }, { "id": "1737", "name": "石首市", "code": "421081" }, { "id": "1738", "name": "洪湖市", "code": "421083" }, { "id": "1739", "name": "松滋市", "code": "421087" }] }, { "id": "179", "name": "黄冈市", "code": "421100", "children": [{ "id": "1740", "name": "市辖区", "code": "421101" }, { "id": "1741", "name": "黄州区", "code": "421102" }, { "id": "1742", "name": "团风县", "code": "421121" }, { "id": "1743", "name": "红安县", "code": "421122" }, { "id": "1744", "name": "罗田县", "code": "421123" }, { "id": "1745", "name": "英山县", "code": "421124" }, { "id": "1746", "name": "浠水县", "code": "421125" }, { "id": "1747", "name": "蕲春县", "code": "421126" }, { "id": "1748", "name": "黄梅县", "code": "421127" }, { "id": "1749", "name": "麻城市", "code": "421181" }, { "id": "1750", "name": "武穴市", "code": "421182" }] }, { "id": "180", "name": "咸宁市", "code": "421200", "children": [{ "id": "1751", "name": "市辖区", "code": "421201" }, { "id": "1752", "name": "咸安区", "code": "421202" }, { "id": "1753", "name": "嘉鱼县", "code": "421221" }, { "id": "1754", "name": "通城县", "code": "421222" }, { "id": "1755", "name": "崇阳县", "code": "421223" }, { "id": "1756", "name": "通山县", "code": "421224" }, { "id": "1757", "name": "赤壁市", "code": "421281" }] }, { "id": "181", "name": "随州市", "code": "421300", "children": [{ "id": "1758", "name": "市辖区", "code": "421301" }, { "id": "1759", "name": "曾都区", "code": "421303" }, { "id": "1760", "name": "随县", "code": "421321" }, { "id": "1761", "name": "广水市", "code": "421381" }] }, { "id": "182", "name": "恩施土家族苗族自治州", "code": "422800", "children": [{ "id": "1762", "name": "恩施市", "code": "422801" }, { "id": "1763", "name": "利川市", "code": "422802" }, { "id": "1764", "name": "建始县", "code": "422822" }, { "id": "1765", "name": "巴东县", "code": "422823" }, { "id": "1766", "name": "宣恩县", "code": "422825" }, { "id": "1767", "name": "咸丰县", "code": "422826" }, { "id": "1768", "name": "来凤县", "code": "422827" }, { "id": "1769", "name": "鹤峰县", "code": "422828" }] }, { "id": "183", "name": "省直辖县级行政区划", "code": "429000", "children": [{ "id": "1770", "name": "仙桃市", "code": "429004" }, { "id": "1771", "name": "潜江市", "code": "429005" }, { "id": "1772", "name": "天门市", "code": "429006" }, { "id": "1773", "name": "神农架林区", "code": "429021" }] }] }, { "id": "18", "name": "湖南省", "code": "430000", "children": [{ "id": "184", "name": "长沙市", "code": "430100", "children": [{ "id": "1774", "name": "市辖区", "code": "430101" }, { "id": "1775", "name": "芙蓉区", "code": "430102" }, { "id": "1776", "name": "天心区", "code": "430103" }, { "id": "1777", "name": "岳麓区", "code": "430104" }, { "id": "1778", "name": "开福区", "code": "430105" }, { "id": "1779", "name": "雨花区", "code": "430111" }, { "id": "1780", "name": "望城区", "code": "430112" }, { "id": "1781", "name": "长沙县", "code": "430121" }, { "id": "1782", "name": "宁乡县", "code": "430124" }, { "id": "1783", "name": "浏阳市", "code": "430181" }] }, { "id": "185", "name": "株洲市", "code": "430200", "children": [{ "id": "1784", "name": "市辖区", "code": "430201" }, { "id": "1785", "name": "荷塘区", "code": "430202" }, { "id": "1786", "name": "芦淞区", "code": "430203" }, { "id": "1787", "name": "石峰区", "code": "430204" }, { "id": "1788", "name": "天元区", "code": "430211" }, { "id": "1789", "name": "株洲县", "code": "430221" }, { "id": "1790", "name": "攸县", "code": "430223" }, { "id": "1791", "name": "茶陵县", "code": "430224" }, { "id": "1792", "name": "炎陵县", "code": "430225" }, { "id": "1793", "name": "醴陵市", "code": "430281" }] }, { "id": "186", "name": "湘潭市", "code": "430300", "children": [{ "id": "1794", "name": "市辖区", "code": "430301" }, { "id": "1795", "name": "雨湖区", "code": "430302" }, { "id": "1796", "name": "岳塘区", "code": "430304" }, { "id": "1797", "name": "湘潭县", "code": "430321" }, { "id": "1798", "name": "湘乡市", "code": "430381" }, { "id": "1799", "name": "韶山市", "code": "430382" }] }, { "id": "187", "name": "衡阳市", "code": "430400", "children": [{ "id": "1800", "name": "市辖区", "code": "430401" }, { "id": "1801", "name": "珠晖区", "code": "430405" }, { "id": "1802", "name": "雁峰区", "code": "430406" }, { "id": "1803", "name": "石鼓区", "code": "430407" }, { "id": "1804", "name": "蒸湘区", "code": "430408" }, { "id": "1805", "name": "南岳区", "code": "430412" }, { "id": "1806", "name": "衡阳县", "code": "430421" }, { "id": "1807", "name": "衡南县", "code": "430422" }, { "id": "1808", "name": "衡山县", "code": "430423" }, { "id": "1809", "name": "衡东县", "code": "430424" }, { "id": "1810", "name": "祁东县", "code": "430426" }, { "id": "1811", "name": "耒阳市", "code": "430481" }, { "id": "1812", "name": "常宁市", "code": "430482" }] }, { "id": "188", "name": "邵阳市", "code": "430500", "children": [{ "id": "1813", "name": "市辖区", "code": "430501" }, { "id": "1814", "name": "双清区", "code": "430502" }, { "id": "1815", "name": "大祥区", "code": "430503" }, { "id": "1816", "name": "北塔区", "code": "430511" }, { "id": "1817", "name": "邵东县", "code": "430521" }, { "id": "1818", "name": "新邵县", "code": "430522" }, { "id": "1819", "name": "邵阳县", "code": "430523" }, { "id": "1820", "name": "隆回县", "code": "430524" }, { "id": "1821", "name": "洞口县", "code": "430525" }, { "id": "1822", "name": "绥宁县", "code": "430527" }, { "id": "1823", "name": "新宁县", "code": "430528" }, { "id": "1824", "name": "城步苗族自治县", "code": "430529" }, { "id": "1825", "name": "武冈市", "code": "430581" }] }, { "id": "189", "name": "岳阳市", "code": "430600", "children": [{ "id": "1826", "name": "市辖区", "code": "430601" }, { "id": "1827", "name": "岳阳楼区", "code": "430602" }, { "id": "1828", "name": "云溪区", "code": "430603" }, { "id": "1829", "name": "君山区", "code": "430611" }, { "id": "1830", "name": "岳阳县", "code": "430621" }, { "id": "1831", "name": "华容县", "code": "430623" }, { "id": "1832", "name": "湘阴县", "code": "430624" }, { "id": "1833", "name": "平江县", "code": "430626" }, { "id": "1834", "name": "汨罗市", "code": "430681" }, { "id": "1835", "name": "临湘市", "code": "430682" }] }, { "id": "190", "name": "常德市", "code": "430700", "children": [{ "id": "1836", "name": "市辖区", "code": "430701" }, { "id": "1837", "name": "武陵区", "code": "430702" }, { "id": "1838", "name": "鼎城区", "code": "430703" }, { "id": "1839", "name": "安乡县", "code": "430721" }, { "id": "1840", "name": "汉寿县", "code": "430722" }, { "id": "1841", "name": "澧县", "code": "430723" }, { "id": "1842", "name": "临澧县", "code": "430724" }, { "id": "1843", "name": "桃源县", "code": "430725" }, { "id": "1844", "name": "石门县", "code": "430726" }, { "id": "1845", "name": "津市市", "code": "430781" }] }, { "id": "191", "name": "张家界市", "code": "430800", "children": [{ "id": "1846", "name": "市辖区", "code": "430801" }, { "id": "1847", "name": "永定区", "code": "430802" }, { "id": "1848", "name": "武陵源区", "code": "430811" }, { "id": "1849", "name": "慈利县", "code": "430821" }, { "id": "1850", "name": "桑植县", "code": "430822" }] }, { "id": "192", "name": "益阳市", "code": "430900", "children": [{ "id": "1851", "name": "市辖区", "code": "430901" }, { "id": "1852", "name": "资阳区", "code": "430902" }, { "id": "1853", "name": "赫山区", "code": "430903" }, { "id": "1854", "name": "南县", "code": "430921" }, { "id": "1855", "name": "桃江县", "code": "430922" }, { "id": "1856", "name": "安化县", "code": "430923" }, { "id": "1857", "name": "沅江市", "code": "430981" }] }, { "id": "193", "name": "郴州市", "code": "431000", "children": [{ "id": "1858", "name": "市辖区", "code": "431001" }, { "id": "1859", "name": "北湖区", "code": "431002" }, { "id": "1860", "name": "苏仙区", "code": "431003" }, { "id": "1861", "name": "桂阳县", "code": "431021" }, { "id": "1862", "name": "宜章县", "code": "431022" }, { "id": "1863", "name": "永兴县", "code": "431023" }, { "id": "1864", "name": "嘉禾县", "code": "431024" }, { "id": "1865", "name": "临武县", "code": "431025" }, { "id": "1866", "name": "汝城县", "code": "431026" }, { "id": "1867", "name": "桂东县", "code": "431027" }, { "id": "1868", "name": "安仁县", "code": "431028" }, { "id": "1869", "name": "资兴市", "code": "431081" }] }, { "id": "194", "name": "永州市", "code": "431100", "children": [{ "id": "1870", "name": "市辖区", "code": "431101" }, { "id": "1871", "name": "零陵区", "code": "431102" }, { "id": "1872", "name": "冷水滩区", "code": "431103" }, { "id": "1873", "name": "祁阳县", "code": "431121" }, { "id": "1874", "name": "东安县", "code": "431122" }, { "id": "1875", "name": "双牌县", "code": "431123" }, { "id": "1876", "name": "道县", "code": "431124" }, { "id": "1877", "name": "江永县", "code": "431125" }, { "id": "1878", "name": "宁远县", "code": "431126" }, { "id": "1879", "name": "蓝山县", "code": "431127" }, { "id": "1880", "name": "新田县", "code": "431128" }, { "id": "1881", "name": "江华瑶族自治县", "code": "431129" }] }, { "id": "195", "name": "怀化市", "code": "431200", "children": [{ "id": "1882", "name": "市辖区", "code": "431201" }, { "id": "1883", "name": "鹤城区", "code": "431202" }, { "id": "1884", "name": "中方县", "code": "431221" }, { "id": "1885", "name": "沅陵县", "code": "431222" }, { "id": "1886", "name": "辰溪县", "code": "431223" }, { "id": "1887", "name": "溆浦县", "code": "431224" }, { "id": "1888", "name": "会同县", "code": "431225" }, { "id": "1889", "name": "麻阳苗族自治县", "code": "431226" }, { "id": "1890", "name": "新晃侗族自治县", "code": "431227" }, { "id": "1891", "name": "芷江侗族自治县", "code": "431228" }, { "id": "1892", "name": "靖州苗族侗族自治县", "code": "431229" }, { "id": "1893", "name": "通道侗族自治县", "code": "431230" }, { "id": "1894", "name": "洪江市", "code": "431281" }] }, { "id": "196", "name": "娄底市", "code": "431300", "children": [{ "id": "1895", "name": "市辖区", "code": "431301" }, { "id": "1896", "name": "娄星区", "code": "431302" }, { "id": "1897", "name": "双峰县", "code": "431321" }, { "id": "1898", "name": "新化县", "code": "431322" }, { "id": "1899", "name": "冷水江市", "code": "431381" }, { "id": "1900", "name": "涟源市", "code": "431382" }] }, { "id": "197", "name": "湘西土家族苗族自治州", "code": "433100", "children": [{ "id": "1901", "name": "吉首市", "code": "433101" }, { "id": "1902", "name": "泸溪县", "code": "433122" }, { "id": "1903", "name": "凤凰县", "code": "433123" }, { "id": "1904", "name": "花垣县", "code": "433124" }, { "id": "1905", "name": "保靖县", "code": "433125" }, { "id": "1906", "name": "古丈县", "code": "433126" }, { "id": "1907", "name": "永顺县", "code": "433127" }, { "id": "1908", "name": "龙山县", "code": "433130" }] }] }, { "id": "19", "name": "广东省", "code": "440000", "children": [{ "id": "198", "name": "广州市", "code": "440100", "children": [{ "id": "1909", "name": "市辖区", "code": "440101" }, { "id": "1910", "name": "荔湾区", "code": "440103" }, { "id": "1911", "name": "越秀区", "code": "440104" }, { "id": "1912", "name": "海珠区", "code": "440105" }, { "id": "1913", "name": "天河区", "code": "440106" }, { "id": "1914", "name": "白云区", "code": "440111" }, { "id": "1915", "name": "黄埔区", "code": "440112" }, { "id": "1916", "name": "番禺区", "code": "440113" }, { "id": "1917", "name": "花都区", "code": "440114" }, { "id": "1918", "name": "南沙区", "code": "440115" }, { "id": "1919", "name": "从化区", "code": "440117" }, { "id": "1920", "name": "增城区", "code": "440118" }] }, { "id": "199", "name": "韶关市", "code": "440200", "children": [{ "id": "1921", "name": "市辖区", "code": "440201" }, { "id": "1922", "name": "武江区", "code": "440203" }, { "id": "1923", "name": "浈江区", "code": "440204" }, { "id": "1924", "name": "曲江区", "code": "440205" }, { "id": "1925", "name": "始兴县", "code": "440222" }, { "id": "1926", "name": "仁化县", "code": "440224" }, { "id": "1927", "name": "翁源县", "code": "440229" }, { "id": "1928", "name": "乳源瑶族自治县", "code": "440232" }, { "id": "1929", "name": "新丰县", "code": "440233" }, { "id": "1930", "name": "乐昌市", "code": "440281" }, { "id": "1931", "name": "南雄市", "code": "440282" }] }, { "id": "200", "name": "深圳市", "code": "440300", "children": [{ "id": "1932", "name": "市辖区", "code": "440301" }, { "id": "1933", "name": "罗湖区", "code": "440303" }, { "id": "1934", "name": "福田区", "code": "440304" }, { "id": "1935", "name": "南山区", "code": "440305" }, { "id": "1936", "name": "宝安区", "code": "440306" }, { "id": "1937", "name": "龙岗区", "code": "440307" }, { "id": "1938", "name": "盐田区", "code": "440308" }] }, { "id": "201", "name": "珠海市", "code": "440400", "children": [{ "id": "1939", "name": "市辖区", "code": "440401" }, { "id": "1940", "name": "香洲区", "code": "440402" }, { "id": "1941", "name": "斗门区", "code": "440403" }, { "id": "1942", "name": "金湾区", "code": "440404" }] }, { "id": "202", "name": "汕头市", "code": "440500", "children": [{ "id": "1943", "name": "市辖区", "code": "440501" }, { "id": "1944", "name": "龙湖区", "code": "440507" }, { "id": "1945", "name": "金平区", "code": "440511" }, { "id": "1946", "name": "濠江区", "code": "440512" }, { "id": "1947", "name": "潮阳区", "code": "440513" }, { "id": "1948", "name": "潮南区", "code": "440514" }, { "id": "1949", "name": "澄海区", "code": "440515" }, { "id": "1950", "name": "南澳县", "code": "440523" }] }, { "id": "203", "name": "佛山市", "code": "440600", "children": [{ "id": "1951", "name": "市辖区", "code": "440601" }, { "id": "1952", "name": "禅城区", "code": "440604" }, { "id": "1953", "name": "南海区", "code": "440605" }, { "id": "1954", "name": "顺德区", "code": "440606" }, { "id": "1955", "name": "三水区", "code": "440607" }, { "id": "1956", "name": "高明区", "code": "440608" }] }, { "id": "204", "name": "江门市", "code": "440700", "children": [{ "id": "1957", "name": "市辖区", "code": "440701" }, { "id": "1958", "name": "蓬江区", "code": "440703" }, { "id": "1959", "name": "江海区", "code": "440704" }, { "id": "1960", "name": "新会区", "code": "440705" }, { "id": "1961", "name": "台山市", "code": "440781" }, { "id": "1962", "name": "开平市", "code": "440783" }, { "id": "1963", "name": "鹤山市", "code": "440784" }, { "id": "1964", "name": "恩平市", "code": "440785" }] }, { "id": "205", "name": "湛江市", "code": "440800", "children": [{ "id": "1965", "name": "市辖区", "code": "440801" }, { "id": "1966", "name": "赤坎区", "code": "440802" }, { "id": "1967", "name": "霞山区", "code": "440803" }, { "id": "1968", "name": "坡头区", "code": "440804" }, { "id": "1969", "name": "麻章区", "code": "440811" }, { "id": "1970", "name": "遂溪县", "code": "440823" }, { "id": "1971", "name": "徐闻县", "code": "440825" }, { "id": "1972", "name": "廉江市", "code": "440881" }, { "id": "1973", "name": "雷州市", "code": "440882" }, { "id": "1974", "name": "吴川市", "code": "440883" }] }, { "id": "206", "name": "茂名市", "code": "440900", "children": [{ "id": "1975", "name": "市辖区", "code": "440901" }, { "id": "1976", "name": "茂南区", "code": "440902" }, { "id": "1977", "name": "电白区", "code": "440904" }, { "id": "1978", "name": "高州市", "code": "440981" }, { "id": "1979", "name": "化州市", "code": "440982" }, { "id": "1980", "name": "信宜市", "code": "440983" }] }, { "id": "207", "name": "肇庆市", "code": "441200", "children": [{ "id": "1981", "name": "市辖区", "code": "441201" }, { "id": "1982", "name": "端州区", "code": "441202" }, { "id": "1983", "name": "鼎湖区", "code": "441203" }, { "id": "1984", "name": "高要区", "code": "441204" }, { "id": "1985", "name": "广宁县", "code": "441223" }, { "id": "1986", "name": "怀集县", "code": "441224" }, { "id": "1987", "name": "封开县", "code": "441225" }, { "id": "1988", "name": "德庆县", "code": "441226" }, { "id": "1989", "name": "四会市", "code": "441284" }] }, { "id": "208", "name": "惠州市", "code": "441300", "children": [{ "id": "1990", "name": "市辖区", "code": "441301" }, { "id": "1991", "name": "惠城区", "code": "441302" }, { "id": "1992", "name": "惠阳区", "code": "441303" }, { "id": "1993", "name": "博罗县", "code": "441322" }, { "id": "1994", "name": "惠东县", "code": "441323" }, { "id": "1995", "name": "龙门县", "code": "441324" }] }, { "id": "209", "name": "梅州市", "code": "441400", "children": [{ "id": "1996", "name": "市辖区", "code": "441401" }, { "id": "1997", "name": "梅江区", "code": "441402" }, { "id": "1998", "name": "梅县区", "code": "441403" }, { "id": "1999", "name": "大埔县", "code": "441422" }, { "id": "2000", "name": "丰顺县", "code": "441423" }, { "id": "2001", "name": "五华县", "code": "441424" }, { "id": "2002", "name": "平远县", "code": "441426" }, { "id": "2003", "name": "蕉岭县", "code": "441427" }, { "id": "2004", "name": "兴宁市", "code": "441481" }] }, { "id": "210", "name": "汕尾市", "code": "441500", "children": [{ "id": "2005", "name": "市辖区", "code": "441501" }, { "id": "2006", "name": "城区", "code": "441502" }, { "id": "2007", "name": "海丰县", "code": "441521" }, { "id": "2008", "name": "陆河县", "code": "441523" }, { "id": "2009", "name": "陆丰市", "code": "441581" }] }, { "id": "211", "name": "河源市", "code": "441600", "children": [{ "id": "2010", "name": "市辖区", "code": "441601" }, { "id": "2011", "name": "源城区", "code": "441602" }, { "id": "2012", "name": "紫金县", "code": "441621" }, { "id": "2013", "name": "龙川县", "code": "441622" }, { "id": "2014", "name": "连平县", "code": "441623" }, { "id": "2015", "name": "和平县", "code": "441624" }, { "id": "2016", "name": "东源县", "code": "441625" }] }, { "id": "212", "name": "阳江市", "code": "441700", "children": [{ "id": "2017", "name": "市辖区", "code": "441701" }, { "id": "2018", "name": "江城区", "code": "441702" }, { "id": "2019", "name": "阳东区", "code": "441704" }, { "id": "2020", "name": "阳西县", "code": "441721" }, { "id": "2021", "name": "阳春市", "code": "441781" }] }, { "id": "213", "name": "清远市", "code": "441800", "children": [{ "id": "2022", "name": "市辖区", "code": "441801" }, { "id": "2023", "name": "清城区", "code": "441802" }, { "id": "2024", "name": "清新区", "code": "441803" }, { "id": "2025", "name": "佛冈县", "code": "441821" }, { "id": "2026", "name": "阳山县", "code": "441823" }, { "id": "2027", "name": "连山壮族瑶族自治县", "code": "441825" }, { "id": "2028", "name": "连南瑶族自治县", "code": "441826" }, { "id": "2029", "name": "英德市", "code": "441881" }, { "id": "2030", "name": "连州市", "code": "441882" }] }, { "id": "214", "name": "东莞市", "code": "441900", "children": [{ "id": "9004", "name": "莞城街道", "code": "441900006" }, { "id": "9003", "name": "万江街道", "code": "441900005" }, { "id": "9002", "name": "南城街道", "code": "441900004" }, { "id": "9001", "name": "东城街道", "code": "441900003" }, { "id": "9005", "name": "石碣镇", "code": "441900101" }, { "id": "9006", "name": "石龙镇", "code": "441900102" }, { "id": "9007", "name": "茶山镇", "code": "441900103" }, { "id": "9008", "name": "石排镇", "code": "441900104" }, { "id": "9009", "name": "企石镇", "code": "441900105" }, { "id": "9010", "name": "横沥镇", "code": "441900106" }, { "id": "9011", "name": "桥头镇", "code": "441900107" }, { "id": "9012", "name": "谢岗镇", "code": "441900108" }, { "id": "9013", "name": "东坑镇", "code": "441900109" }, { "id": "9014", "name": "常平镇", "code": "441900110" }, { "id": "9015", "name": "寮步镇", "code": "441900111" }, { "id": "9016", "name": "樟木头镇", "code": "441900112" }, { "id": "9017", "name": "大朗镇", "code": "441900113" }, { "id": "9018", "name": "黄江镇", "code": "441900114" }, { "id": "9019", "name": "清溪镇", "code": "441900115" }, { "id": "9020", "name": "塘厦镇", "code": "441900116" }, { "id": "9021", "name": "凤岗镇", "code": "441900117" }, { "id": "9022", "name": "大岭山镇", "code": "441900118" }, { "id": "9023", "name": "长安镇", "code": "441900119" }, { "id": "9024", "name": "虎门镇", "code": "441900121" }, { "id": "9025", "name": "厚街镇", "code": "441900122" }, { "id": "9026", "name": "沙田镇", "code": "441900123" }, { "id": "9027", "name": "道滘镇", "code": "441900124" }, { "id": "9028", "name": "洪梅镇", "code": "441900125" }, { "id": "9029", "name": "麻涌镇", "code": "441900126" }, { "id": "9030", "name": "望牛墩镇", "code": "441900127" }, { "id": "9031", "name": "中堂镇", "code": "441900128" }, { "id": "9032", "name": "高埗镇", "code": "441900129" }, { "id": "9033", "name": "松山湖管委会", "code": "441900401" }, { "id": "9034", "name": "东莞港", "code": "441900402" }, { "id": "9035", "name": "东莞生态园", "code": "441900403" }] }, { "id": "215", "name": "中山市", "code": "442000", "children": [{ "id": "9101", "name": "石岐区街道", "code": "442000001" }, { "id": "9102", "name": "东区街道", "code": "442000002" }, { "id": "9103", "name": "火炬开发区街道", "code": "442000003" }, { "id": "9104", "name": "西区街道", "code": "442000004" }, { "id": "9105", "name": "南区街道", "code": "442000005" }, { "id": "9106", "name": "五桂山街道", "code": "442000006" }, { "id": "9107", "name": "小榄镇", "code": "442000100" }, { "id": "9108", "name": "黄圃镇", "code": "442000101" }, { "id": "9109", "name": "民众镇", "code": "442000102" }, { "id": "9110", "name": "东凤镇", "code": "442000103" }, { "id": "9111", "name": "东升镇", "code": "442000104" }, { "id": "9112", "name": "古镇镇", "code": "442000105" }, { "id": "9113", "name": "沙溪镇", "code": "442000106" }, { "id": "9114", "name": "坦洲镇", "code": "442000107" }, { "id": "9115", "name": "港口镇", "code": "442000108" }, { "id": "9116", "name": "三角镇", "code": "442000109" }, { "id": "9117", "name": "横栏镇", "code": "442000110" }, { "id": "9118", "name": "南头镇", "code": "442000111" }, { "id": "9119", "name": "阜沙镇", "code": "442000112" }, { "id": "9120", "name": "南朗镇", "code": "442000113" }, { "id": "9121", "name": "三乡镇", "code": "442000114" }, { "id": "9122", "name": "板芙镇", "code": "442000115" }, { "id": "9123", "name": "大涌镇", "code": "442000116" }, { "id": "9124", "name": "神湾镇", "code": "442000117" }] }, { "id": "216", "name": "潮州市", "code": "445100", "children": [{ "id": "2031", "name": "市辖区", "code": "445101" }, { "id": "2032", "name": "湘桥区", "code": "445102" }, { "id": "2033", "name": "潮安区", "code": "445103" }, { "id": "2034", "name": "饶平县", "code": "445122" }] }, { "id": "217", "name": "揭阳市", "code": "445200", "children": [{ "id": "2035", "name": "市辖区", "code": "445201" }, { "id": "2036", "name": "榕城区", "code": "445202" }, { "id": "2037", "name": "揭东区", "code": "445203" }, { "id": "2038", "name": "揭西县", "code": "445222" }, { "id": "2039", "name": "惠来县", "code": "445224" }, { "id": "2040", "name": "普宁市", "code": "445281" }] }, { "id": "218", "name": "云浮市", "code": "445300", "children": [{ "id": "2041", "name": "市辖区", "code": "445301" }, { "id": "2042", "name": "云城区", "code": "445302" }, { "id": "2043", "name": "云安区", "code": "445303" }, { "id": "2044", "name": "新兴县", "code": "445321" }, { "id": "2045", "name": "郁南县", "code": "445322" }, { "id": "2046", "name": "罗定市", "code": "445381" }] }] }, { "id": "20", "name": "广西壮族自治区", "code": "450000", "children": [{ "id": "219", "name": "南宁市", "code": "450100", "children": [{ "id": "2047", "name": "市辖区", "code": "450101" }, { "id": "2048", "name": "兴宁区", "code": "450102" }, { "id": "2049", "name": "青秀区", "code": "450103" }, { "id": "2050", "name": "江南区", "code": "450105" }, { "id": "2051", "name": "西乡塘区", "code": "450107" }, { "id": "2052", "name": "良庆区", "code": "450108" }, { "id": "2053", "name": "邕宁区", "code": "450109" }, { "id": "2054", "name": "武鸣区", "code": "450110" }, { "id": "2055", "name": "隆安县", "code": "450123" }, { "id": "2056", "name": "马山县", "code": "450124" }, { "id": "2057", "name": "上林县", "code": "450125" }, { "id": "2058", "name": "宾阳县", "code": "450126" }, { "id": "2059", "name": "横县", "code": "450127" }] }, { "id": "220", "name": "柳州市", "code": "450200", "children": [{ "id": "2060", "name": "市辖区", "code": "450201" }, { "id": "2061", "name": "城中区", "code": "450202" }, { "id": "2062", "name": "鱼峰区", "code": "450203" }, { "id": "2063", "name": "柳南区", "code": "450204" }, { "id": "2064", "name": "柳北区", "code": "450205" }, { "id": "2065", "name": "柳江区", "code": "450206" }, { "id": "2066", "name": "柳城县", "code": "450222" }, { "id": "2067", "name": "鹿寨县", "code": "450223" }, { "id": "2068", "name": "融安县", "code": "450224" }, { "id": "2069", "name": "融水苗族自治县", "code": "450225" }, { "id": "2070", "name": "三江侗族自治县", "code": "450226" }] }, { "id": "221", "name": "桂林市", "code": "450300", "children": [{ "id": "2071", "name": "市辖区", "code": "450301" }, { "id": "2072", "name": "秀峰区", "code": "450302" }, { "id": "2073", "name": "叠彩区", "code": "450303" }, { "id": "2074", "name": "象山区", "code": "450304" }, { "id": "2075", "name": "七星区", "code": "450305" }, { "id": "2076", "name": "雁山区", "code": "450311" }, { "id": "2077", "name": "临桂区", "code": "450312" }, { "id": "2078", "name": "阳朔县", "code": "450321" }, { "id": "2079", "name": "灵川县", "code": "450323" }, { "id": "2080", "name": "全州县", "code": "450324" }, { "id": "2081", "name": "兴安县", "code": "450325" }, { "id": "2082", "name": "永福县", "code": "450326" }, { "id": "2083", "name": "灌阳县", "code": "450327" }, { "id": "2084", "name": "龙胜各族自治县", "code": "450328" }, { "id": "2085", "name": "资源县", "code": "450329" }, { "id": "2086", "name": "平乐县", "code": "450330" }, { "id": "2087", "name": "荔浦县", "code": "450331" }, { "id": "2088", "name": "恭城瑶族自治县", "code": "450332" }] }, { "id": "222", "name": "梧州市", "code": "450400", "children": [{ "id": "2089", "name": "市辖区", "code": "450401" }, { "id": "2090", "name": "万秀区", "code": "450403" }, { "id": "2091", "name": "长洲区", "code": "450405" }, { "id": "2092", "name": "龙圩区", "code": "450406" }, { "id": "2093", "name": "苍梧县", "code": "450421" }, { "id": "2094", "name": "藤县", "code": "450422" }, { "id": "2095", "name": "蒙山县", "code": "450423" }, { "id": "2096", "name": "岑溪市", "code": "450481" }] }, { "id": "223", "name": "北海市", "code": "450500", "children": [{ "id": "2097", "name": "市辖区", "code": "450501" }, { "id": "2098", "name": "海城区", "code": "450502" }, { "id": "2099", "name": "银海区", "code": "450503" }, { "id": "2100", "name": "铁山港区", "code": "450512" }, { "id": "2101", "name": "合浦县", "code": "450521" }] }, { "id": "224", "name": "防城港市", "code": "450600", "children": [{ "id": "2102", "name": "市辖区", "code": "450601" }, { "id": "2103", "name": "港口区", "code": "450602" }, { "id": "2104", "name": "防城区", "code": "450603" }, { "id": "2105", "name": "上思县", "code": "450621" }, { "id": "2106", "name": "东兴市", "code": "450681" }] }, { "id": "225", "name": "钦州市", "code": "450700", "children": [{ "id": "2107", "name": "市辖区", "code": "450701" }, { "id": "2108", "name": "钦南区", "code": "450702" }, { "id": "2109", "name": "钦北区", "code": "450703" }, { "id": "2110", "name": "灵山县", "code": "450721" }, { "id": "2111", "name": "浦北县", "code": "450722" }] }, { "id": "226", "name": "贵港市", "code": "450800", "children": [{ "id": "2112", "name": "市辖区", "code": "450801" }, { "id": "2113", "name": "港北区", "code": "450802" }, { "id": "2114", "name": "港南区", "code": "450803" }, { "id": "2115", "name": "覃塘区", "code": "450804" }, { "id": "2116", "name": "平南县", "code": "450821" }, { "id": "2117", "name": "桂平市", "code": "450881" }] }, { "id": "227", "name": "玉林市", "code": "450900", "children": [{ "id": "2118", "name": "市辖区", "code": "450901" }, { "id": "2119", "name": "玉州区", "code": "450902" }, { "id": "2120", "name": "福绵区", "code": "450903" }, { "id": "2121", "name": "容县", "code": "450921" }, { "id": "2122", "name": "陆川县", "code": "450922" }, { "id": "2123", "name": "博白县", "code": "450923" }, { "id": "2124", "name": "兴业县", "code": "450924" }, { "id": "2125", "name": "北流市", "code": "450981" }] }, { "id": "228", "name": "百色市", "code": "451000", "children": [{ "id": "2126", "name": "市辖区", "code": "451001" }, { "id": "2127", "name": "右江区", "code": "451002" }, { "id": "2128", "name": "田阳县", "code": "451021" }, { "id": "2129", "name": "田东县", "code": "451022" }, { "id": "2130", "name": "平果县", "code": "451023" }, { "id": "2131", "name": "德保县", "code": "451024" }, { "id": "2132", "name": "那坡县", "code": "451026" }, { "id": "2133", "name": "凌云县", "code": "451027" }, { "id": "2134", "name": "乐业县", "code": "451028" }, { "id": "2135", "name": "田林县", "code": "451029" }, { "id": "2136", "name": "西林县", "code": "451030" }, { "id": "2137", "name": "隆林各族自治县", "code": "451031" }, { "id": "2138", "name": "靖西市", "code": "451081" }] }, { "id": "229", "name": "贺州市", "code": "451100", "children": [{ "id": "2139", "name": "市辖区", "code": "451101" }, { "id": "2140", "name": "八步区", "code": "451102" }, { "id": "2141", "name": "平桂区", "code": "451103" }, { "id": "2142", "name": "昭平县", "code": "451121" }, { "id": "2143", "name": "钟山县", "code": "451122" }, { "id": "2144", "name": "富川瑶族自治县", "code": "451123" }] }, { "id": "230", "name": "河池市", "code": "451200", "children": [{ "id": "2145", "name": "市辖区", "code": "451201" }, { "id": "2146", "name": "金城江区", "code": "451202" }, { "id": "2147", "name": "南丹县", "code": "451221" }, { "id": "2148", "name": "天峨县", "code": "451222" }, { "id": "2149", "name": "凤山县", "code": "451223" }, { "id": "2150", "name": "东兰县", "code": "451224" }, { "id": "2151", "name": "罗城仫佬族自治县", "code": "451225" }, { "id": "2152", "name": "环江毛南族自治县", "code": "451226" }, { "id": "2153", "name": "巴马瑶族自治县", "code": "451227" }, { "id": "2154", "name": "都安瑶族自治县", "code": "451228" }, { "id": "2155", "name": "大化瑶族自治县", "code": "451229" }, { "id": "2156", "name": "宜州市", "code": "451281" }] }, { "id": "231", "name": "来宾市", "code": "451300", "children": [{ "id": "2157", "name": "市辖区", "code": "451301" }, { "id": "2158", "name": "兴宾区", "code": "451302" }, { "id": "2159", "name": "忻城县", "code": "451321" }, { "id": "2160", "name": "象州县", "code": "451322" }, { "id": "2161", "name": "武宣县", "code": "451323" }, { "id": "2162", "name": "金秀瑶族自治县", "code": "451324" }, { "id": "2163", "name": "合山市", "code": "451381" }] }, { "id": "232", "name": "崇左市", "code": "451400", "children": [{ "id": "2164", "name": "市辖区", "code": "451401" }, { "id": "2165", "name": "江州区", "code": "451402" }, { "id": "2166", "name": "扶绥县", "code": "451421" }, { "id": "2167", "name": "宁明县", "code": "451422" }, { "id": "2168", "name": "龙州县", "code": "451423" }, { "id": "2169", "name": "大新县", "code": "451424" }, { "id": "2170", "name": "天等县", "code": "451425" }, { "id": "2171", "name": "凭祥市", "code": "451481" }] }] }, { "id": "21", "name": "海南省", "code": "460000", "children": [{ "id": "233", "name": "海口市", "code": "460100", "children": [{ "id": "2172", "name": "市辖区", "code": "460101" }, { "id": "2173", "name": "秀英区", "code": "460105" }, { "id": "2174", "name": "龙华区", "code": "460106" }, { "id": "2175", "name": "琼山区", "code": "460107" }, { "id": "2176", "name": "美兰区", "code": "460108" }] }, { "id": "234", "name": "三亚市", "code": "460200", "children": [{ "id": "2177", "name": "市辖区", "code": "460201" }, { "id": "2178", "name": "海棠区", "code": "460202" }, { "id": "2179", "name": "吉阳区", "code": "460203" }, { "id": "2180", "name": "天涯区", "code": "460204" }, { "id": "2181", "name": "崖州区", "code": "460205" }] }, { "id": "235", "name": "三沙市", "code": "460300", "children": [{ "id": "9201", "name": "西沙群岛", "code": "460321" }, { "id": "9202", "name": "南沙群岛", "code": "460322" }, { "id": "9203", "name": "中沙群岛的岛礁及其海域", "code": "460323" }] }, { "id": "236", "name": "儋州市", "code": "460400", "children": [{ "id": "9301", "name": "那大镇", "code": "460400100" }, { "id": "9302", "name": "和庆镇", "code": "460400101" }, { "id": "9303", "name": "南丰镇", "code": "460400102" }, { "id": "9304", "name": "大成镇", "code": "460400103" }, { "id": "9305", "name": "雅星镇", "code": "460400104" }, { "id": "9306", "name": "兰洋镇", "code": "460400105" }, { "id": "9307", "name": "光村镇", "code": "460400106" }, { "id": "9308", "name": "木棠镇", "code": "460400107" }, { "id": "9309", "name": "海头镇", "code": "460400108" }, { "id": "9310", "name": "峨蔓镇", "code": "460400109" }, { "id": "9311", "name": "王五镇", "code": "460400111" }, { "id": "9312", "name": "白马井镇", "code": "460400112" }, { "id": "9313", "name": "中和镇", "code": "460400113" }, { "id": "9314", "name": "排浦镇", "code": "460400114" }, { "id": "9315", "name": "东成镇", "code": "460400115" }, { "id": "9316", "name": "新州镇", "code": "460400116" }, { "id": "9317", "name": "洋浦经济开发区", "code": "460400499" }, { "id": "9318", "name": "华南热作学院", "code": "460400500" }] }, { "id": "237", "name": "省直辖县级行政区划", "code": "469000", "children": [{ "id": "2182", "name": "五指山市", "code": "469001" }, { "id": "2183", "name": "琼海市", "code": "469002" }, { "id": "2184", "name": "文昌市", "code": "469005" }, { "id": "2185", "name": "万宁市", "code": "469006" }, { "id": "2186", "name": "东方市", "code": "469007" }, { "id": "2187", "name": "定安县", "code": "469021" }, { "id": "2188", "name": "屯昌县", "code": "469022" }, { "id": "2189", "name": "澄迈县", "code": "469023" }, { "id": "2190", "name": "临高县", "code": "469024" }, { "id": "2191", "name": "白沙黎族自治县", "code": "469025" }, { "id": "2192", "name": "昌江黎族自治县", "code": "469026" }, { "id": "2193", "name": "乐东黎族自治县", "code": "469027" }, { "id": "2194", "name": "陵水黎族自治县", "code": "469028" }, { "id": "2195", "name": "保亭黎族苗族自治县", "code": "469029" }, { "id": "2196", "name": "琼中黎族苗族自治县", "code": "469030" }] }] }, { "id": "22", "name": "重庆市", "code": "500000", "children": [{ "id": "238", "name": "市辖区", "code": "500100", "children": [{ "id": "2197", "name": "万州区", "code": "500101" }, { "id": "2198", "name": "涪陵区", "code": "500102" }, { "id": "2199", "name": "渝中区", "code": "500103" }, { "id": "2200", "name": "大渡口区", "code": "500104" }, { "id": "2201", "name": "江北区", "code": "500105" }, { "id": "2202", "name": "沙坪坝区", "code": "500106" }, { "id": "2203", "name": "九龙坡区", "code": "500107" }, { "id": "2204", "name": "南岸区", "code": "500108" }, { "id": "2205", "name": "北碚区", "code": "500109" }, { "id": "2206", "name": "綦江区", "code": "500110" }, { "id": "2207", "name": "大足区", "code": "500111" }, { "id": "2208", "name": "渝北区", "code": "500112" }, { "id": "2209", "name": "巴南区", "code": "500113" }, { "id": "2210", "name": "黔江区", "code": "500114" }, { "id": "2211", "name": "长寿区", "code": "500115" }, { "id": "2212", "name": "江津区", "code": "500116" }, { "id": "2213", "name": "合川区", "code": "500117" }, { "id": "2214", "name": "永川区", "code": "500118" }, { "id": "2215", "name": "南川区", "code": "500119" }, { "id": "2216", "name": "璧山区", "code": "500120" }, { "id": "2217", "name": "铜梁区", "code": "500151" }, { "id": "2218", "name": "潼南区", "code": "500152" }, { "id": "2219", "name": "荣昌区", "code": "500153" }, { "id": "2220", "name": "开州区", "code": "500154" }] }, { "id": "239", "name": "县", "code": "500200", "children": [{ "id": "2221", "name": "梁平县", "code": "500228" }, { "id": "2222", "name": "城口县", "code": "500229" }, { "id": "2223", "name": "丰都县", "code": "500230" }, { "id": "2224", "name": "垫江县", "code": "500231" }, { "id": "2225", "name": "武隆县", "code": "500232" }, { "id": "2226", "name": "忠县", "code": "500233" }, { "id": "2227", "name": "云阳县", "code": "500235" }, { "id": "2228", "name": "奉节县", "code": "500236" }, { "id": "2229", "name": "巫山县", "code": "500237" }, { "id": "2230", "name": "巫溪县", "code": "500238" }, { "id": "2231", "name": "石柱土家族自治县", "code": "500240" }, { "id": "2232", "name": "秀山土家族苗族自治县", "code": "500241" }, { "id": "2233", "name": "酉阳土家族苗族自治县", "code": "500242" }, { "id": "2234", "name": "彭水苗族土家族自治县", "code": "500243" }] }] }, { "id": "23", "name": "四川省", "code": "510000", "children": [{ "id": "240", "name": "成都市", "code": "510100", "children": [{ "id": "2235", "name": "市辖区", "code": "510101" }, { "id": "2236", "name": "锦江区", "code": "510104" }, { "id": "2237", "name": "青羊区", "code": "510105" }, { "id": "2238", "name": "金牛区", "code": "510106" }, { "id": "2239", "name": "武侯区", "code": "510107" }, { "id": "2240", "name": "成华区", "code": "510108" }, { "id": "2241", "name": "龙泉驿区", "code": "510112" }, { "id": "2242", "name": "青白江区", "code": "510113" }, { "id": "2243", "name": "新都区", "code": "510114" }, { "id": "2244", "name": "温江区", "code": "510115" }, { "id": "2245", "name": "双流区", "code": "510116" }, { "id": "2246", "name": "金堂县", "code": "510121" }, { "id": "2247", "name": "郫县", "code": "510124" }, { "id": "2248", "name": "大邑县", "code": "510129" }, { "id": "2249", "name": "蒲江县", "code": "510131" }, { "id": "2250", "name": "新津县", "code": "510132" }, { "id": "2251", "name": "都江堰市", "code": "510181" }, { "id": "2252", "name": "彭州市", "code": "510182" }, { "id": "2253", "name": "邛崃市", "code": "510183" }, { "id": "2254", "name": "崇州市", "code": "510184" }, { "id": "2255", "name": "简阳市", "code": "510185" }] }, { "id": "241", "name": "自贡市", "code": "510300", "children": [{ "id": "2256", "name": "市辖区", "code": "510301" }, { "id": "2257", "name": "自流井区", "code": "510302" }, { "id": "2258", "name": "贡井区", "code": "510303" }, { "id": "2259", "name": "大安区", "code": "510304" }, { "id": "2260", "name": "沿滩区", "code": "510311" }, { "id": "2261", "name": "荣县", "code": "510321" }, { "id": "2262", "name": "富顺县", "code": "510322" }] }, { "id": "242", "name": "攀枝花市", "code": "510400", "children": [{ "id": "2263", "name": "市辖区", "code": "510401" }, { "id": "2264", "name": "东区", "code": "510402" }, { "id": "2265", "name": "西区", "code": "510403" }, { "id": "2266", "name": "仁和区", "code": "510411" }, { "id": "2267", "name": "米易县", "code": "510421" }, { "id": "2268", "name": "盐边县", "code": "510422" }] }, { "id": "243", "name": "泸州市", "code": "510500", "children": [{ "id": "2269", "name": "市辖区", "code": "510501" }, { "id": "2270", "name": "江阳区", "code": "510502" }, { "id": "2271", "name": "纳溪区", "code": "510503" }, { "id": "2272", "name": "龙马潭区", "code": "510504" }, { "id": "2273", "name": "泸县", "code": "510521" }, { "id": "2274", "name": "合江县", "code": "510522" }, { "id": "2275", "name": "叙永县", "code": "510524" }, { "id": "2276", "name": "古蔺县", "code": "510525" }] }, { "id": "244", "name": "德阳市", "code": "510600", "children": [{ "id": "2277", "name": "市辖区", "code": "510601" }, { "id": "2278", "name": "旌阳区", "code": "510603" }, { "id": "2279", "name": "中江县", "code": "510623" }, { "id": "2280", "name": "罗江县", "code": "510626" }, { "id": "2281", "name": "广汉市", "code": "510681" }, { "id": "2282", "name": "什邡市", "code": "510682" }, { "id": "2283", "name": "绵竹市", "code": "510683" }] }, { "id": "245", "name": "绵阳市", "code": "510700", "children": [{ "id": "2284", "name": "市辖区", "code": "510701" }, { "id": "2285", "name": "涪城区", "code": "510703" }, { "id": "2286", "name": "游仙区", "code": "510704" }, { "id": "2287", "name": "安州区", "code": "510705" }, { "id": "2288", "name": "三台县", "code": "510722" }, { "id": "2289", "name": "盐亭县", "code": "510723" }, { "id": "2290", "name": "梓潼县", "code": "510725" }, { "id": "2291", "name": "北川羌族自治县", "code": "510726" }, { "id": "2292", "name": "平武县", "code": "510727" }, { "id": "2293", "name": "江油市", "code": "510781" }] }, { "id": "246", "name": "广元市", "code": "510800", "children": [{ "id": "2294", "name": "市辖区", "code": "510801" }, { "id": "2295", "name": "利州区", "code": "510802" }, { "id": "2296", "name": "昭化区", "code": "510811" }, { "id": "2297", "name": "朝天区", "code": "510812" }, { "id": "2298", "name": "旺苍县", "code": "510821" }, { "id": "2299", "name": "青川县", "code": "510822" }, { "id": "2300", "name": "剑阁县", "code": "510823" }, { "id": "2301", "name": "苍溪县", "code": "510824" }] }, { "id": "247", "name": "遂宁市", "code": "510900", "children": [{ "id": "2302", "name": "市辖区", "code": "510901" }, { "id": "2303", "name": "船山区", "code": "510903" }, { "id": "2304", "name": "安居区", "code": "510904" }, { "id": "2305", "name": "蓬溪县", "code": "510921" }, { "id": "2306", "name": "射洪县", "code": "510922" }, { "id": "2307", "name": "大英县", "code": "510923" }] }, { "id": "248", "name": "内江市", "code": "511000", "children": [{ "id": "2308", "name": "市辖区", "code": "511001" }, { "id": "2309", "name": "市中区", "code": "511002" }, { "id": "2310", "name": "东兴区", "code": "511011" }, { "id": "2311", "name": "威远县", "code": "511024" }, { "id": "2312", "name": "资中县", "code": "511025" }, { "id": "2313", "name": "隆昌县", "code": "511028" }] }, { "id": "249", "name": "乐山市", "code": "511100", "children": [{ "id": "2314", "name": "市辖区", "code": "511101" }, { "id": "2315", "name": "市中区", "code": "511102" }, { "id": "2316", "name": "沙湾区", "code": "511111" }, { "id": "2317", "name": "五通桥区", "code": "511112" }, { "id": "2318", "name": "金口河区", "code": "511113" }, { "id": "2319", "name": "犍为县", "code": "511123" }, { "id": "2320", "name": "井研县", "code": "511124" }, { "id": "2321", "name": "夹江县", "code": "511126" }, { "id": "2322", "name": "沐川县", "code": "511129" }, { "id": "2323", "name": "峨边彝族自治县", "code": "511132" }, { "id": "2324", "name": "马边彝族自治县", "code": "511133" }, { "id": "2325", "name": "峨眉山市", "code": "511181" }] }, { "id": "250", "name": "南充市", "code": "511300", "children": [{ "id": "2326", "name": "市辖区", "code": "511301" }, { "id": "2327", "name": "顺庆区", "code": "511302" }, { "id": "2328", "name": "高坪区", "code": "511303" }, { "id": "2329", "name": "嘉陵区", "code": "511304" }, { "id": "2330", "name": "南部县", "code": "511321" }, { "id": "2331", "name": "营山县", "code": "511322" }, { "id": "2332", "name": "蓬安县", "code": "511323" }, { "id": "2333", "name": "仪陇县", "code": "511324" }, { "id": "2334", "name": "西充县", "code": "511325" }, { "id": "2335", "name": "阆中市", "code": "511381" }] }, { "id": "251", "name": "眉山市", "code": "511400", "children": [{ "id": "2336", "name": "市辖区", "code": "511401" }, { "id": "2337", "name": "东坡区", "code": "511402" }, { "id": "2338", "name": "彭山区", "code": "511403" }, { "id": "2339", "name": "仁寿县", "code": "511421" }, { "id": "2340", "name": "洪雅县", "code": "511423" }, { "id": "2341", "name": "丹棱县", "code": "511424" }, { "id": "2342", "name": "青神县", "code": "511425" }] }, { "id": "252", "name": "宜宾市", "code": "511500", "children": [{ "id": "2343", "name": "市辖区", "code": "511501" }, { "id": "2344", "name": "翠屏区", "code": "511502" }, { "id": "2345", "name": "南溪区", "code": "511503" }, { "id": "2346", "name": "宜宾县", "code": "511521" }, { "id": "2347", "name": "江安县", "code": "511523" }, { "id": "2348", "name": "长宁县", "code": "511524" }, { "id": "2349", "name": "高县", "code": "511525" }, { "id": "2350", "name": "珙县", "code": "511526" }, { "id": "2351", "name": "筠连县", "code": "511527" }, { "id": "2352", "name": "兴文县", "code": "511528" }, { "id": "2353", "name": "屏山县", "code": "511529" }] }, { "id": "253", "name": "广安市", "code": "511600", "children": [{ "id": "2354", "name": "市辖区", "code": "511601" }, { "id": "2355", "name": "广安区", "code": "511602" }, { "id": "2356", "name": "前锋区", "code": "511603" }, { "id": "2357", "name": "岳池县", "code": "511621" }, { "id": "2358", "name": "武胜县", "code": "511622" }, { "id": "2359", "name": "邻水县", "code": "511623" }, { "id": "2360", "name": "华蓥市", "code": "511681" }] }, { "id": "254", "name": "达州市", "code": "511700", "children": [{ "id": "2361", "name": "市辖区", "code": "511701" }, { "id": "2362", "name": "通川区", "code": "511702" }, { "id": "2363", "name": "达川区", "code": "511703" }, { "id": "2364", "name": "宣汉县", "code": "511722" }, { "id": "2365", "name": "开江县", "code": "511723" }, { "id": "2366", "name": "大竹县", "code": "511724" }, { "id": "2367", "name": "渠县", "code": "511725" }, { "id": "2368", "name": "万源市", "code": "511781" }] }, { "id": "255", "name": "雅安市", "code": "511800", "children": [{ "id": "2369", "name": "市辖区", "code": "511801" }, { "id": "2370", "name": "雨城区", "code": "511802" }, { "id": "2371", "name": "名山区", "code": "511803" }, { "id": "2372", "name": "荥经县", "code": "511822" }, { "id": "2373", "name": "汉源县", "code": "511823" }, { "id": "2374", "name": "石棉县", "code": "511824" }, { "id": "2375", "name": "天全县", "code": "511825" }, { "id": "2376", "name": "芦山县", "code": "511826" }, { "id": "2377", "name": "宝兴县", "code": "511827" }] }, { "id": "256", "name": "巴中市", "code": "511900", "children": [{ "id": "2378", "name": "市辖区", "code": "511901" }, { "id": "2379", "name": "巴州区", "code": "511902" }, { "id": "2380", "name": "恩阳区", "code": "511903" }, { "id": "2381", "name": "通江县", "code": "511921" }, { "id": "2382", "name": "南江县", "code": "511922" }, { "id": "2383", "name": "平昌县", "code": "511923" }] }, { "id": "257", "name": "资阳市", "code": "512000", "children": [{ "id": "2384", "name": "市辖区", "code": "512001" }, { "id": "2385", "name": "雁江区", "code": "512002" }, { "id": "2386", "name": "安岳县", "code": "512021" }, { "id": "2387", "name": "乐至县", "code": "512022" }] }, { "id": "258", "name": "阿坝藏族羌族自治州", "code": "513200", "children": [{ "id": "2388", "name": "马尔康市", "code": "513201" }, { "id": "2389", "name": "汶川县", "code": "513221" }, { "id": "2390", "name": "理县", "code": "513222" }, { "id": "2391", "name": "茂县", "code": "513223" }, { "id": "2392", "name": "松潘县", "code": "513224" }, { "id": "2393", "name": "九寨沟县", "code": "513225" }, { "id": "2394", "name": "金川县", "code": "513226" }, { "id": "2395", "name": "小金县", "code": "513227" }, { "id": "2396", "name": "黑水县", "code": "513228" }, { "id": "2397", "name": "壤塘县", "code": "513230" }, { "id": "2398", "name": "阿坝县", "code": "513231" }, { "id": "2399", "name": "若尔盖县", "code": "513232" }, { "id": "2400", "name": "红原县", "code": "513233" }] }, { "id": "259", "name": "甘孜藏族自治州", "code": "513300", "children": [{ "id": "2401", "name": "康定市", "code": "513301" }, { "id": "2402", "name": "泸定县", "code": "513322" }, { "id": "2403", "name": "丹巴县", "code": "513323" }, { "id": "2404", "name": "九龙县", "code": "513324" }, { "id": "2405", "name": "雅江县", "code": "513325" }, { "id": "2406", "name": "道孚县", "code": "513326" }, { "id": "2407", "name": "炉霍县", "code": "513327" }, { "id": "2408", "name": "甘孜县", "code": "513328" }, { "id": "2409", "name": "新龙县", "code": "513329" }, { "id": "2410", "name": "德格县", "code": "513330" }, { "id": "2411", "name": "白玉县", "code": "513331" }, { "id": "2412", "name": "石渠县", "code": "513332" }, { "id": "2413", "name": "色达县", "code": "513333" }, { "id": "2414", "name": "理塘县", "code": "513334" }, { "id": "2415", "name": "巴塘县", "code": "513335" }, { "id": "2416", "name": "乡城县", "code": "513336" }, { "id": "2417", "name": "稻城县", "code": "513337" }, { "id": "2418", "name": "得荣县", "code": "513338" }] }, { "id": "260", "name": "凉山彝族自治州", "code": "513400", "children": [{ "id": "2419", "name": "西昌市", "code": "513401" }, { "id": "2420", "name": "木里藏族自治县", "code": "513422" }, { "id": "2421", "name": "盐源县", "code": "513423" }, { "id": "2422", "name": "德昌县", "code": "513424" }, { "id": "2423", "name": "会理县", "code": "513425" }, { "id": "2424", "name": "会东县", "code": "513426" }, { "id": "2425", "name": "宁南县", "code": "513427" }, { "id": "2426", "name": "普格县", "code": "513428" }, { "id": "2427", "name": "布拖县", "code": "513429" }, { "id": "2428", "name": "金阳县", "code": "513430" }, { "id": "2429", "name": "昭觉县", "code": "513431" }, { "id": "2430", "name": "喜德县", "code": "513432" }, { "id": "2431", "name": "冕宁县", "code": "513433" }, { "id": "2432", "name": "越西县", "code": "513434" }, { "id": "2433", "name": "甘洛县", "code": "513435" }, { "id": "2434", "name": "美姑县", "code": "513436" }, { "id": "2435", "name": "雷波县", "code": "513437" }] }] }, { "id": "24", "name": "贵州省", "code": "520000", "children": [{ "id": "261", "name": "贵阳市", "code": "520100", "children": [{ "id": "2436", "name": "市辖区", "code": "520101" }, { "id": "2437", "name": "南明区", "code": "520102" }, { "id": "2438", "name": "云岩区", "code": "520103" }, { "id": "2439", "name": "花溪区", "code": "520111" }, { "id": "2440", "name": "乌当区", "code": "520112" }, { "id": "2441", "name": "白云区", "code": "520113" }, { "id": "2442", "name": "观山湖区", "code": "520115" }, { "id": "2443", "name": "开阳县", "code": "520121" }, { "id": "2444", "name": "息烽县", "code": "520122" }, { "id": "2445", "name": "修文县", "code": "520123" }, { "id": "2446", "name": "清镇市", "code": "520181" }] }, { "id": "262", "name": "六盘水市", "code": "520200", "children": [{ "id": "2447", "name": "钟山区", "code": "520201" }, { "id": "2448", "name": "六枝特区", "code": "520203" }, { "id": "2449", "name": "水城县", "code": "520221" }, { "id": "2450", "name": "盘县", "code": "520222" }] }, { "id": "263", "name": "遵义市", "code": "520300", "children": [{ "id": "2451", "name": "市辖区", "code": "520301" }, { "id": "2452", "name": "红花岗区", "code": "520302" }, { "id": "2453", "name": "汇川区", "code": "520303" }, { "id": "2454", "name": "播州区", "code": "520304" }, { "id": "2455", "name": "桐梓县", "code": "520322" }, { "id": "2456", "name": "绥阳县", "code": "520323" }, { "id": "2457", "name": "正安县", "code": "520324" }, { "id": "2458", "name": "道真仡佬族苗族自治县", "code": "520325" }, { "id": "2459", "name": "务川仡佬族苗族自治县", "code": "520326" }, { "id": "2460", "name": "凤冈县", "code": "520327" }, { "id": "2461", "name": "湄潭县", "code": "520328" }, { "id": "2462", "name": "余庆县", "code": "520329" }, { "id": "2463", "name": "习水县", "code": "520330" }, { "id": "2464", "name": "赤水市", "code": "520381" }, { "id": "2465", "name": "仁怀市", "code": "520382" }] }, { "id": "264", "name": "安顺市", "code": "520400", "children": [{ "id": "2466", "name": "市辖区", "code": "520401" }, { "id": "2467", "name": "西秀区", "code": "520402" }, { "id": "2468", "name": "平坝区", "code": "520403" }, { "id": "2469", "name": "普定县", "code": "520422" }, { "id": "2470", "name": "镇宁布依族苗族自治县", "code": "520423" }, { "id": "2471", "name": "关岭布依族苗族自治县", "code": "520424" }, { "id": "2472", "name": "紫云苗族布依族自治县", "code": "520425" }] }, { "id": "265", "name": "毕节市", "code": "520500", "children": [{ "id": "2473", "name": "市辖区", "code": "520501" }, { "id": "2474", "name": "七星关区", "code": "520502" }, { "id": "2475", "name": "大方县", "code": "520521" }, { "id": "2476", "name": "黔西县", "code": "520522" }, { "id": "2477", "name": "金沙县", "code": "520523" }, { "id": "2478", "name": "织金县", "code": "520524" }, { "id": "2479", "name": "纳雍县", "code": "520525" }, { "id": "2480", "name": "威宁彝族回族苗族自治县", "code": "520526" }, { "id": "2481", "name": "赫章县", "code": "520527" }] }, { "id": "266", "name": "铜仁市", "code": "520600", "children": [{ "id": "2482", "name": "市辖区", "code": "520601" }, { "id": "2483", "name": "碧江区", "code": "520602" }, { "id": "2484", "name": "万山区", "code": "520603" }, { "id": "2485", "name": "江口县", "code": "520621" }, { "id": "2486", "name": "玉屏侗族自治县", "code": "520622" }, { "id": "2487", "name": "石阡县", "code": "520623" }, { "id": "2488", "name": "思南县", "code": "520624" }, { "id": "2489", "name": "印江土家族苗族自治县", "code": "520625" }, { "id": "2490", "name": "德江县", "code": "520626" }, { "id": "2491", "name": "沿河土家族自治县", "code": "520627" }, { "id": "2492", "name": "松桃苗族自治县", "code": "520628" }] }, { "id": "267", "name": "黔西南布依族苗族自治州", "code": "522300", "children": [{ "id": "2493", "name": "兴义市", "code": "522301" }, { "id": "2494", "name": "兴仁县", "code": "522322" }, { "id": "2495", "name": "普安县", "code": "522323" }, { "id": "2496", "name": "晴隆县", "code": "522324" }, { "id": "2497", "name": "贞丰县", "code": "522325" }, { "id": "2498", "name": "望谟县", "code": "522326" }, { "id": "2499", "name": "册亨县", "code": "522327" }, { "id": "2500", "name": "安龙县", "code": "522328" }] }, { "id": "268", "name": "黔东南苗族侗族自治州", "code": "522600", "children": [{ "id": "2501", "name": "凯里市", "code": "522601" }, { "id": "2502", "name": "黄平县", "code": "522622" }, { "id": "2503", "name": "施秉县", "code": "522623" }, { "id": "2504", "name": "三穗县", "code": "522624" }, { "id": "2505", "name": "镇远县", "code": "522625" }, { "id": "2506", "name": "岑巩县", "code": "522626" }, { "id": "2507", "name": "天柱县", "code": "522627" }, { "id": "2508", "name": "锦屏县", "code": "522628" }, { "id": "2509", "name": "剑河县", "code": "522629" }, { "id": "2510", "name": "台江县", "code": "522630" }, { "id": "2511", "name": "黎平县", "code": "522631" }, { "id": "2512", "name": "榕江县", "code": "522632" }, { "id": "2513", "name": "从江县", "code": "522633" }, { "id": "2514", "name": "雷山县", "code": "522634" }, { "id": "2515", "name": "麻江县", "code": "522635" }, { "id": "2516", "name": "丹寨县", "code": "522636" }] }, { "id": "269", "name": "黔南布依族苗族自治州", "code": "522700", "children": [{ "id": "2517", "name": "都匀市", "code": "522701" }, { "id": "2518", "name": "福泉市", "code": "522702" }, { "id": "2519", "name": "荔波县", "code": "522722" }, { "id": "2520", "name": "贵定县", "code": "522723" }, { "id": "2521", "name": "瓮安县", "code": "522725" }, { "id": "2522", "name": "独山县", "code": "522726" }, { "id": "2523", "name": "平塘县", "code": "522727" }, { "id": "2524", "name": "罗甸县", "code": "522728" }, { "id": "2525", "name": "长顺县", "code": "522729" }, { "id": "2526", "name": "龙里县", "code": "522730" }, { "id": "2527", "name": "惠水县", "code": "522731" }, { "id": "2528", "name": "三都水族自治县", "code": "522732" }] }] }, { "id": "25", "name": "云南省", "code": "530000", "children": [{ "id": "270", "name": "昆明市", "code": "530100", "children": [{ "id": "2529", "name": "市辖区", "code": "530101" }, { "id": "2530", "name": "五华区", "code": "530102" }, { "id": "2531", "name": "盘龙区", "code": "530103" }, { "id": "2532", "name": "官渡区", "code": "530111" }, { "id": "2533", "name": "西山区", "code": "530112" }, { "id": "2534", "name": "东川区", "code": "530113" }, { "id": "2535", "name": "呈贡区", "code": "530114" }, { "id": "2536", "name": "晋宁县", "code": "530122" }, { "id": "2537", "name": "富民县", "code": "530124" }, { "id": "2538", "name": "宜良县", "code": "530125" }, { "id": "2539", "name": "石林彝族自治县", "code": "530126" }, { "id": "2540", "name": "嵩明县", "code": "530127" }, { "id": "2541", "name": "禄劝彝族苗族自治县", "code": "530128" }, { "id": "2542", "name": "寻甸回族彝族自治县", "code": "530129" }, { "id": "2543", "name": "安宁市", "code": "530181" }] }, { "id": "271", "name": "曲靖市", "code": "530300", "children": [{ "id": "2544", "name": "市辖区", "code": "530301" }, { "id": "2545", "name": "麒麟区", "code": "530302" }, { "id": "2546", "name": "沾益区", "code": "530303" }, { "id": "2547", "name": "马龙县", "code": "530321" }, { "id": "2548", "name": "陆良县", "code": "530322" }, { "id": "2549", "name": "师宗县", "code": "530323" }, { "id": "2550", "name": "罗平县", "code": "530324" }, { "id": "2551", "name": "富源县", "code": "530325" }, { "id": "2552", "name": "会泽县", "code": "530326" }, { "id": "2553", "name": "宣威市", "code": "530381" }] }, { "id": "272", "name": "玉溪市", "code": "530400", "children": [{ "id": "2554", "name": "市辖区", "code": "530401" }, { "id": "2555", "name": "红塔区", "code": "530402" }, { "id": "2556", "name": "江川区", "code": "530403" }, { "id": "2557", "name": "澄江县", "code": "530422" }, { "id": "2558", "name": "通海县", "code": "530423" }, { "id": "2559", "name": "华宁县", "code": "530424" }, { "id": "2560", "name": "易门县", "code": "530425" }, { "id": "2561", "name": "峨山彝族自治县", "code": "530426" }, { "id": "2562", "name": "新平彝族傣族自治县", "code": "530427" }, { "id": "2563", "name": "元江哈尼族彝族傣族自治县", "code": "530428" }] }, { "id": "273", "name": "保山市", "code": "530500", "children": [{ "id": "2564", "name": "市辖区", "code": "530501" }, { "id": "2565", "name": "隆阳区", "code": "530502" }, { "id": "2566", "name": "施甸县", "code": "530521" }, { "id": "2567", "name": "龙陵县", "code": "530523" }, { "id": "2568", "name": "昌宁县", "code": "530524" }, { "id": "2569", "name": "腾冲市", "code": "530581" }] }, { "id": "274", "name": "昭通市", "code": "530600", "children": [{ "id": "2570", "name": "市辖区", "code": "530601" }, { "id": "2571", "name": "昭阳区", "code": "530602" }, { "id": "2572", "name": "鲁甸县", "code": "530621" }, { "id": "2573", "name": "巧家县", "code": "530622" }, { "id": "2574", "name": "盐津县", "code": "530623" }, { "id": "2575", "name": "大关县", "code": "530624" }, { "id": "2576", "name": "永善县", "code": "530625" }, { "id": "2577", "name": "绥江县", "code": "530626" }, { "id": "2578", "name": "镇雄县", "code": "530627" }, { "id": "2579", "name": "彝良县", "code": "530628" }, { "id": "2580", "name": "威信县", "code": "530629" }, { "id": "2581", "name": "水富县", "code": "530630" }] }, { "id": "275", "name": "丽江市", "code": "530700", "children": [{ "id": "2582", "name": "市辖区", "code": "530701" }, { "id": "2583", "name": "古城区", "code": "530702" }, { "id": "2584", "name": "玉龙纳西族自治县", "code": "530721" }, { "id": "2585", "name": "永胜县", "code": "530722" }, { "id": "2586", "name": "华坪县", "code": "530723" }, { "id": "2587", "name": "宁蒗彝族自治县", "code": "530724" }] }, { "id": "276", "name": "普洱市", "code": "530800", "children": [{ "id": "2588", "name": "市辖区", "code": "530801" }, { "id": "2589", "name": "思茅区", "code": "530802" }, { "id": "2590", "name": "宁洱哈尼族彝族自治县", "code": "530821" }, { "id": "2591", "name": "墨江哈尼族自治县", "code": "530822" }, { "id": "2592", "name": "景东彝族自治县", "code": "530823" }, { "id": "2593", "name": "景谷傣族彝族自治县", "code": "530824" }, { "id": "2594", "name": "镇沅彝族哈尼族拉祜族自治县", "code": "530825" }, { "id": "2595", "name": "江城哈尼族彝族自治县", "code": "530826" }, { "id": "2596", "name": "孟连傣族拉祜族佤族自治县", "code": "530827" }, { "id": "2597", "name": "澜沧拉祜族自治县", "code": "530828" }, { "id": "2598", "name": "西盟佤族自治县", "code": "530829" }] }, { "id": "277", "name": "临沧市", "code": "530900", "children": [{ "id": "2599", "name": "市辖区", "code": "530901" }, { "id": "2600", "name": "临翔区", "code": "530902" }, { "id": "2601", "name": "凤庆县", "code": "530921" }, { "id": "2602", "name": "云县", "code": "530922" }, { "id": "2603", "name": "永德县", "code": "530923" }, { "id": "2604", "name": "镇康县", "code": "530924" }, { "id": "2605", "name": "双江拉祜族佤族布朗族傣族自治县", "code": "530925" }, { "id": "2606", "name": "耿马傣族佤族自治县", "code": "530926" }, { "id": "2607", "name": "沧源佤族自治县", "code": "530927" }] }, { "id": "278", "name": "楚雄彝族自治州", "code": "532300", "children": [{ "id": "2608", "name": "楚雄市", "code": "532301" }, { "id": "2609", "name": "双柏县", "code": "532322" }, { "id": "2610", "name": "牟定县", "code": "532323" }, { "id": "2611", "name": "南华县", "code": "532324" }, { "id": "2612", "name": "姚安县", "code": "532325" }, { "id": "2613", "name": "大姚县", "code": "532326" }, { "id": "2614", "name": "永仁县", "code": "532327" }, { "id": "2615", "name": "元谋县", "code": "532328" }, { "id": "2616", "name": "武定县", "code": "532329" }, { "id": "2617", "name": "禄丰县", "code": "532331" }] }, { "id": "279", "name": "红河哈尼族彝族自治州", "code": "532500", "children": [{ "id": "2618", "name": "个旧市", "code": "532501" }, { "id": "2619", "name": "开远市", "code": "532502" }, { "id": "2620", "name": "蒙自市", "code": "532503" }, { "id": "2621", "name": "弥勒市", "code": "532504" }, { "id": "2622", "name": "屏边苗族自治县", "code": "532523" }, { "id": "2623", "name": "建水县", "code": "532524" }, { "id": "2624", "name": "石屏县", "code": "532525" }, { "id": "2625", "name": "泸西县", "code": "532527" }, { "id": "2626", "name": "元阳县", "code": "532528" }, { "id": "2627", "name": "红河县", "code": "532529" }, { "id": "2628", "name": "金平苗族瑶族傣族自治县", "code": "532530" }, { "id": "2629", "name": "绿春县", "code": "532531" }, { "id": "2630", "name": "河口瑶族自治县", "code": "532532" }] }, { "id": "280", "name": "文山壮族苗族自治州", "code": "532600", "children": [{ "id": "2631", "name": "文山市", "code": "532601" }, { "id": "2632", "name": "砚山县", "code": "532622" }, { "id": "2633", "name": "西畴县", "code": "532623" }, { "id": "2634", "name": "麻栗坡县", "code": "532624" }, { "id": "2635", "name": "马关县", "code": "532625" }, { "id": "2636", "name": "丘北县", "code": "532626" }, { "id": "2637", "name": "广南县", "code": "532627" }, { "id": "2638", "name": "富宁县", "code": "532628" }] }, { "id": "281", "name": "西双版纳傣族自治州", "code": "532800", "children": [{ "id": "2639", "name": "景洪市", "code": "532801" }, { "id": "2640", "name": "勐海县", "code": "532822" }, { "id": "2641", "name": "勐腊县", "code": "532823" }] }, { "id": "282", "name": "大理白族自治州", "code": "532900", "children": [{ "id": "2642", "name": "大理市", "code": "532901" }, { "id": "2643", "name": "漾濞彝族自治县", "code": "532922" }, { "id": "2644", "name": "祥云县", "code": "532923" }, { "id": "2645", "name": "宾川县", "code": "532924" }, { "id": "2646", "name": "弥渡县", "code": "532925" }, { "id": "2647", "name": "南涧彝族自治县", "code": "532926" }, { "id": "2648", "name": "巍山彝族回族自治县", "code": "532927" }, { "id": "2649", "name": "永平县", "code": "532928" }, { "id": "2650", "name": "云龙县", "code": "532929" }, { "id": "2651", "name": "洱源县", "code": "532930" }, { "id": "2652", "name": "剑川县", "code": "532931" }, { "id": "2653", "name": "鹤庆县", "code": "532932" }] }, { "id": "283", "name": "德宏傣族景颇族自治州", "code": "533100", "children": [{ "id": "2654", "name": "瑞丽市", "code": "533102" }, { "id": "2655", "name": "芒市", "code": "533103" }, { "id": "2656", "name": "梁河县", "code": "533122" }, { "id": "2657", "name": "盈江县", "code": "533123" }, { "id": "2658", "name": "陇川县", "code": "533124" }] }, { "id": "284", "name": "怒江傈僳族自治州", "code": "533300", "children": [{ "id": "2659", "name": "泸水市", "code": "533301" }, { "id": "2660", "name": "福贡县", "code": "533323" }, { "id": "2661", "name": "贡山独龙族怒族自治县", "code": "533324" }, { "id": "2662", "name": "兰坪白族普米族自治县", "code": "533325" }] }, { "id": "285", "name": "迪庆藏族自治州", "code": "533400", "children": [{ "id": "2663", "name": "香格里拉市", "code": "533401" }, { "id": "2664", "name": "德钦县", "code": "533422" }, { "id": "2665", "name": "维西傈僳族自治县", "code": "533423" }] }] }, { "id": "26", "name": "西藏自治区", "code": "540000", "children": [{ "id": "286", "name": "拉萨市", "code": "540100", "children": [{ "id": "2666", "name": "市辖区", "code": "540101" }, { "id": "2667", "name": "城关区", "code": "540102" }, { "id": "2668", "name": "堆龙德庆区", "code": "540103" }, { "id": "2669", "name": "林周县", "code": "540121" }, { "id": "2670", "name": "当雄县", "code": "540122" }, { "id": "2671", "name": "尼木县", "code": "540123" }, { "id": "2672", "name": "曲水县", "code": "540124" }, { "id": "2673", "name": "达孜县", "code": "540126" }, { "id": "2674", "name": "墨竹工卡县", "code": "540127" }] }, { "id": "287", "name": "日喀则市", "code": "540200", "children": [{ "id": "2675", "name": "桑珠孜区", "code": "540202" }, { "id": "2676", "name": "南木林县", "code": "540221" }, { "id": "2677", "name": "江孜县", "code": "540222" }, { "id": "2678", "name": "定日县", "code": "540223" }, { "id": "2679", "name": "萨迦县", "code": "540224" }, { "id": "2680", "name": "拉孜县", "code": "540225" }, { "id": "2681", "name": "昂仁县", "code": "540226" }, { "id": "2682", "name": "谢通门县", "code": "540227" }, { "id": "2683", "name": "白朗县", "code": "540228" }, { "id": "2684", "name": "仁布县", "code": "540229" }, { "id": "2685", "name": "康马县", "code": "540230" }, { "id": "2686", "name": "定结县", "code": "540231" }, { "id": "2687", "name": "仲巴县", "code": "540232" }, { "id": "2688", "name": "亚东县", "code": "540233" }, { "id": "2689", "name": "吉隆县", "code": "540234" }, { "id": "2690", "name": "聂拉木县", "code": "540235" }, { "id": "2691", "name": "萨嘎县", "code": "540236" }, { "id": "2692", "name": "岗巴县", "code": "540237" }] }, { "id": "288", "name": "昌都市", "code": "540300", "children": [{ "id": "2693", "name": "卡若区", "code": "540302" }, { "id": "2694", "name": "江达县", "code": "540321" }, { "id": "2695", "name": "贡觉县", "code": "540322" }, { "id": "2696", "name": "类乌齐县", "code": "540323" }, { "id": "2697", "name": "丁青县", "code": "540324" }, { "id": "2698", "name": "察雅县", "code": "540325" }, { "id": "2699", "name": "八宿县", "code": "540326" }, { "id": "2700", "name": "左贡县", "code": "540327" }, { "id": "2701", "name": "芒康县", "code": "540328" }, { "id": "2702", "name": "洛隆县", "code": "540329" }, { "id": "2703", "name": "边坝县", "code": "540330" }] }, { "id": "289", "name": "林芝市", "code": "540400", "children": [{ "id": "2704", "name": "巴宜区", "code": "540402" }, { "id": "2705", "name": "工布江达县", "code": "540421" }, { "id": "2706", "name": "米林县", "code": "540422" }, { "id": "2707", "name": "墨脱县", "code": "540423" }, { "id": "2708", "name": "波密县", "code": "540424" }, { "id": "2709", "name": "察隅县", "code": "540425" }, { "id": "2710", "name": "朗县", "code": "540426" }] }, { "id": "290", "name": "山南市", "code": "540500", "children": [{ "id": "2711", "name": "市辖区", "code": "540501" }, { "id": "2712", "name": "乃东区", "code": "540502" }, { "id": "2713", "name": "扎囊县", "code": "540521" }, { "id": "2714", "name": "贡嘎县", "code": "540522" }, { "id": "2715", "name": "桑日县", "code": "540523" }, { "id": "2716", "name": "琼结县", "code": "540524" }, { "id": "2717", "name": "曲松县", "code": "540525" }, { "id": "2718", "name": "措美县", "code": "540526" }, { "id": "2719", "name": "洛扎县", "code": "540527" }, { "id": "2720", "name": "加查县", "code": "540528" }, { "id": "2721", "name": "隆子县", "code": "540529" }, { "id": "2722", "name": "错那县", "code": "540530" }, { "id": "2723", "name": "浪卡子县", "code": "540531" }] }, { "id": "291", "name": "那曲地区", "code": "542400", "children": [{ "id": "2724", "name": "那曲县", "code": "542421" }, { "id": "2725", "name": "嘉黎县", "code": "542422" }, { "id": "2726", "name": "比如县", "code": "542423" }, { "id": "2727", "name": "聂荣县", "code": "542424" }, { "id": "2728", "name": "安多县", "code": "542425" }, { "id": "2729", "name": "申扎县", "code": "542426" }, { "id": "2730", "name": "索县", "code": "542427" }, { "id": "2731", "name": "班戈县", "code": "542428" }, { "id": "2732", "name": "巴青县", "code": "542429" }, { "id": "2733", "name": "尼玛县", "code": "542430" }, { "id": "2734", "name": "双湖县", "code": "542431" }] }, { "id": "292", "name": "阿里地区", "code": "542500", "children": [{ "id": "2735", "name": "普兰县", "code": "542521" }, { "id": "2736", "name": "札达县", "code": "542522" }, { "id": "2737", "name": "噶尔县", "code": "542523" }, { "id": "2738", "name": "日土县", "code": "542524" }, { "id": "2739", "name": "革吉县", "code": "542525" }, { "id": "2740", "name": "改则县", "code": "542526" }, { "id": "2741", "name": "措勤县", "code": "542527" }] }] }, { "id": "27", "name": "陕西省", "code": "610000", "children": [{ "id": "293", "name": "西安市", "code": "610100", "children": [{ "id": "2742", "name": "市辖区", "code": "610101" }, { "id": "2743", "name": "新城区", "code": "610102" }, { "id": "2744", "name": "碑林区", "code": "610103" }, { "id": "2745", "name": "莲湖区", "code": "610104" }, { "id": "2746", "name": "灞桥区", "code": "610111" }, { "id": "2747", "name": "未央区", "code": "610112" }, { "id": "2748", "name": "雁塔区", "code": "610113" }, { "id": "2749", "name": "阎良区", "code": "610114" }, { "id": "2750", "name": "临潼区", "code": "610115" }, { "id": "2751", "name": "长安区", "code": "610116" }, { "id": "2752", "name": "高陵区", "code": "610117" }, { "id": "2753", "name": "蓝田县", "code": "610122" }, { "id": "2754", "name": "周至县", "code": "610124" }, { "id": "2755", "name": "户县", "code": "610125" }] }, { "id": "294", "name": "铜川市", "code": "610200", "children": [{ "id": "2756", "name": "市辖区", "code": "610201" }, { "id": "2757", "name": "王益区", "code": "610202" }, { "id": "2758", "name": "印台区", "code": "610203" }, { "id": "2759", "name": "耀州区", "code": "610204" }, { "id": "2760", "name": "宜君县", "code": "610222" }] }, { "id": "295", "name": "宝鸡市", "code": "610300", "children": [{ "id": "2761", "name": "市辖区", "code": "610301" }, { "id": "2762", "name": "渭滨区", "code": "610302" }, { "id": "2763", "name": "金台区", "code": "610303" }, { "id": "2764", "name": "陈仓区", "code": "610304" }, { "id": "2765", "name": "凤翔县", "code": "610322" }, { "id": "2766", "name": "岐山县", "code": "610323" }, { "id": "2767", "name": "扶风县", "code": "610324" }, { "id": "2768", "name": "眉县", "code": "610326" }, { "id": "2769", "name": "陇县", "code": "610327" }, { "id": "2770", "name": "千阳县", "code": "610328" }, { "id": "2771", "name": "麟游县", "code": "610329" }, { "id": "2772", "name": "凤县", "code": "610330" }, { "id": "2773", "name": "太白县", "code": "610331" }] }, { "id": "296", "name": "咸阳市", "code": "610400", "children": [{ "id": "2774", "name": "市辖区", "code": "610401" }, { "id": "2775", "name": "秦都区", "code": "610402" }, { "id": "2776", "name": "杨陵区", "code": "610403" }, { "id": "2777", "name": "渭城区", "code": "610404" }, { "id": "2778", "name": "三原县", "code": "610422" }, { "id": "2779", "name": "泾阳县", "code": "610423" }, { "id": "2780", "name": "乾县", "code": "610424" }, { "id": "2781", "name": "礼泉县", "code": "610425" }, { "id": "2782", "name": "永寿县", "code": "610426" }, { "id": "2783", "name": "彬县", "code": "610427" }, { "id": "2784", "name": "长武县", "code": "610428" }, { "id": "2785", "name": "旬邑县", "code": "610429" }, { "id": "2786", "name": "淳化县", "code": "610430" }, { "id": "2787", "name": "武功县", "code": "610431" }, { "id": "2788", "name": "兴平市", "code": "610481" }] }, { "id": "297", "name": "渭南市", "code": "610500", "children": [{ "id": "2789", "name": "市辖区", "code": "610501" }, { "id": "2790", "name": "临渭区", "code": "610502" }, { "id": "2791", "name": "华州区", "code": "610503" }, { "id": "2792", "name": "潼关县", "code": "610522" }, { "id": "2793", "name": "大荔县", "code": "610523" }, { "id": "2794", "name": "合阳县", "code": "610524" }, { "id": "2795", "name": "澄城县", "code": "610525" }, { "id": "2796", "name": "蒲城县", "code": "610526" }, { "id": "2797", "name": "白水县", "code": "610527" }, { "id": "2798", "name": "富平县", "code": "610528" }, { "id": "2799", "name": "韩城市", "code": "610581" }, { "id": "2800", "name": "华阴市", "code": "610582" }] }, { "id": "298", "name": "延安市", "code": "610600", "children": [{ "id": "2801", "name": "市辖区", "code": "610601" }, { "id": "2802", "name": "宝塔区", "code": "610602" }, { "id": "2803", "name": "安塞区", "code": "610603" }, { "id": "2804", "name": "延长县", "code": "610621" }, { "id": "2805", "name": "延川县", "code": "610622" }, { "id": "2806", "name": "子长县", "code": "610623" }, { "id": "2807", "name": "志丹县", "code": "610625" }, { "id": "2808", "name": "吴起县", "code": "610626" }, { "id": "2809", "name": "甘泉县", "code": "610627" }, { "id": "2810", "name": "富县", "code": "610628" }, { "id": "2811", "name": "洛川县", "code": "610629" }, { "id": "2812", "name": "宜川县", "code": "610630" }, { "id": "2813", "name": "黄龙县", "code": "610631" }, { "id": "2814", "name": "黄陵县", "code": "610632" }] }, { "id": "299", "name": "汉中市", "code": "610700", "children": [{ "id": "2815", "name": "市辖区", "code": "610701" }, { "id": "2816", "name": "汉台区", "code": "610702" }, { "id": "2817", "name": "南郑县", "code": "610721" }, { "id": "2818", "name": "城固县", "code": "610722" }, { "id": "2819", "name": "洋县", "code": "610723" }, { "id": "2820", "name": "西乡县", "code": "610724" }, { "id": "2821", "name": "勉县", "code": "610725" }, { "id": "2822", "name": "宁强县", "code": "610726" }, { "id": "2823", "name": "略阳县", "code": "610727" }, { "id": "2824", "name": "镇巴县", "code": "610728" }, { "id": "2825", "name": "留坝县", "code": "610729" }, { "id": "2826", "name": "佛坪县", "code": "610730" }] }, { "id": "300", "name": "榆林市", "code": "610800", "children": [{ "id": "2827", "name": "市辖区", "code": "610801" }, { "id": "2828", "name": "榆阳区", "code": "610802" }, { "id": "2829", "name": "横山区", "code": "610803" }, { "id": "2830", "name": "神木县", "code": "610821" }, { "id": "2831", "name": "府谷县", "code": "610822" }, { "id": "2832", "name": "靖边县", "code": "610824" }, { "id": "2833", "name": "定边县", "code": "610825" }, { "id": "2834", "name": "绥德县", "code": "610826" }, { "id": "2835", "name": "米脂县", "code": "610827" }, { "id": "2836", "name": "佳县", "code": "610828" }, { "id": "2837", "name": "吴堡县", "code": "610829" }, { "id": "2838", "name": "清涧县", "code": "610830" }, { "id": "2839", "name": "子洲县", "code": "610831" }] }, { "id": "301", "name": "安康市", "code": "610900", "children": [{ "id": "2840", "name": "市辖区", "code": "610901" }, { "id": "2841", "name": "汉滨区", "code": "610902" }, { "id": "2842", "name": "汉阴县", "code": "610921" }, { "id": "2843", "name": "石泉县", "code": "610922" }, { "id": "2844", "name": "宁陕县", "code": "610923" }, { "id": "2845", "name": "紫阳县", "code": "610924" }, { "id": "2846", "name": "岚皋县", "code": "610925" }, { "id": "2847", "name": "平利县", "code": "610926" }, { "id": "2848", "name": "镇坪县", "code": "610927" }, { "id": "2849", "name": "旬阳县", "code": "610928" }, { "id": "2850", "name": "白河县", "code": "610929" }] }, { "id": "302", "name": "商洛市", "code": "611000", "children": [{ "id": "2851", "name": "市辖区", "code": "611001" }, { "id": "2852", "name": "商州区", "code": "611002" }, { "id": "2853", "name": "洛南县", "code": "611021" }, { "id": "2854", "name": "丹凤县", "code": "611022" }, { "id": "2855", "name": "商南县", "code": "611023" }, { "id": "2856", "name": "山阳县", "code": "611024" }, { "id": "2857", "name": "镇安县", "code": "611025" }, { "id": "2858", "name": "柞水县", "code": "611026" }] }] }, { "id": "28", "name": "甘肃省", "code": "620000", "children": [{ "id": "303", "name": "兰州市", "code": "620100", "children": [{ "id": "2859", "name": "市辖区", "code": "620101" }, { "id": "2860", "name": "城关区", "code": "620102" }, { "id": "2861", "name": "七里河区", "code": "620103" }, { "id": "2862", "name": "西固区", "code": "620104" }, { "id": "2863", "name": "安宁区", "code": "620105" }, { "id": "2864", "name": "红古区", "code": "620111" }, { "id": "2865", "name": "永登县", "code": "620121" }, { "id": "2866", "name": "皋兰县", "code": "620122" }, { "id": "2867", "name": "榆中县", "code": "620123" }] }, { "id": "304", "name": "嘉峪关市", "code": "620200", "children": [{ "id": "2868", "name": "市辖区", "code": "620201" }] }, { "id": "305", "name": "金昌市", "code": "620300", "children": [{ "id": "2869", "name": "市辖区", "code": "620301" }, { "id": "2870", "name": "金川区", "code": "620302" }, { "id": "2871", "name": "永昌县", "code": "620321" }] }, { "id": "306", "name": "白银市", "code": "620400", "children": [{ "id": "2872", "name": "市辖区", "code": "620401" }, { "id": "2873", "name": "白银区", "code": "620402" }, { "id": "2874", "name": "平川区", "code": "620403" }, { "id": "2875", "name": "靖远县", "code": "620421" }, { "id": "2876", "name": "会宁县", "code": "620422" }, { "id": "2877", "name": "景泰县", "code": "620423" }] }, { "id": "307", "name": "天水市", "code": "620500", "children": [{ "id": "2878", "name": "市辖区", "code": "620501" }, { "id": "2879", "name": "秦州区", "code": "620502" }, { "id": "2880", "name": "麦积区", "code": "620503" }, { "id": "2881", "name": "清水县", "code": "620521" }, { "id": "2882", "name": "秦安县", "code": "620522" }, { "id": "2883", "name": "甘谷县", "code": "620523" }, { "id": "2884", "name": "武山县", "code": "620524" }, { "id": "2885", "name": "张家川回族自治县", "code": "620525" }] }, { "id": "308", "name": "武威市", "code": "620600", "children": [{ "id": "2886", "name": "市辖区", "code": "620601" }, { "id": "2887", "name": "凉州区", "code": "620602" }, { "id": "2888", "name": "民勤县", "code": "620621" }, { "id": "2889", "name": "古浪县", "code": "620622" }, { "id": "2890", "name": "天祝藏族自治县", "code": "620623" }] }, { "id": "309", "name": "张掖市", "code": "620700", "children": [{ "id": "2891", "name": "市辖区", "code": "620701" }, { "id": "2892", "name": "甘州区", "code": "620702" }, { "id": "2893", "name": "肃南裕固族自治县", "code": "620721" }, { "id": "2894", "name": "民乐县", "code": "620722" }, { "id": "2895", "name": "临泽县", "code": "620723" }, { "id": "2896", "name": "高台县", "code": "620724" }, { "id": "2897", "name": "山丹县", "code": "620725" }] }, { "id": "310", "name": "平凉市", "code": "620800", "children": [{ "id": "2898", "name": "市辖区", "code": "620801" }, { "id": "2899", "name": "崆峒区", "code": "620802" }, { "id": "2900", "name": "泾川县", "code": "620821" }, { "id": "2901", "name": "灵台县", "code": "620822" }, { "id": "2902", "name": "崇信县", "code": "620823" }, { "id": "2903", "name": "华亭县", "code": "620824" }, { "id": "2904", "name": "庄浪县", "code": "620825" }, { "id": "2905", "name": "静宁县", "code": "620826" }] }, { "id": "311", "name": "酒泉市", "code": "620900", "children": [{ "id": "2906", "name": "市辖区", "code": "620901" }, { "id": "2907", "name": "肃州区", "code": "620902" }, { "id": "2908", "name": "金塔县", "code": "620921" }, { "id": "2909", "name": "瓜州县", "code": "620922" }, { "id": "2910", "name": "肃北蒙古族自治县", "code": "620923" }, { "id": "2911", "name": "阿克塞哈萨克族自治县", "code": "620924" }, { "id": "2912", "name": "玉门市", "code": "620981" }, { "id": "2913", "name": "敦煌市", "code": "620982" }] }, { "id": "312", "name": "庆阳市", "code": "621000", "children": [{ "id": "2914", "name": "市辖区", "code": "621001" }, { "id": "2915", "name": "西峰区", "code": "621002" }, { "id": "2916", "name": "庆城县", "code": "621021" }, { "id": "2917", "name": "环县", "code": "621022" }, { "id": "2918", "name": "华池县", "code": "621023" }, { "id": "2919", "name": "合水县", "code": "621024" }, { "id": "2920", "name": "正宁县", "code": "621025" }, { "id": "2921", "name": "宁县", "code": "621026" }, { "id": "2922", "name": "镇原县", "code": "621027" }] }, { "id": "313", "name": "定西市", "code": "621100", "children": [{ "id": "2923", "name": "市辖区", "code": "621101" }, { "id": "2924", "name": "安定区", "code": "621102" }, { "id": "2925", "name": "通渭县", "code": "621121" }, { "id": "2926", "name": "陇西县", "code": "621122" }, { "id": "2927", "name": "渭源县", "code": "621123" }, { "id": "2928", "name": "临洮县", "code": "621124" }, { "id": "2929", "name": "漳县", "code": "621125" }, { "id": "2930", "name": "岷县", "code": "621126" }] }, { "id": "314", "name": "陇南市", "code": "621200", "children": [{ "id": "2931", "name": "市辖区", "code": "621201" }, { "id": "2932", "name": "武都区", "code": "621202" }, { "id": "2933", "name": "成县", "code": "621221" }, { "id": "2934", "name": "文县", "code": "621222" }, { "id": "2935", "name": "宕昌县", "code": "621223" }, { "id": "2936", "name": "康县", "code": "621224" }, { "id": "2937", "name": "西和县", "code": "621225" }, { "id": "2938", "name": "礼县", "code": "621226" }, { "id": "2939", "name": "徽县", "code": "621227" }, { "id": "2940", "name": "两当县", "code": "621228" }] }, { "id": "315", "name": "临夏回族自治州", "code": "622900", "children": [{ "id": "2941", "name": "临夏市", "code": "622901" }, { "id": "2942", "name": "临夏县", "code": "622921" }, { "id": "2943", "name": "康乐县", "code": "622922" }, { "id": "2944", "name": "永靖县", "code": "622923" }, { "id": "2945", "name": "广河县", "code": "622924" }, { "id": "2946", "name": "和政县", "code": "622925" }, { "id": "2947", "name": "东乡族自治县", "code": "622926" }, { "id": "2948", "name": "积石山保安族东乡族撒拉族自治县", "code": "622927" }] }, { "id": "316", "name": "甘南藏族自治州", "code": "623000", "children": [{ "id": "2949", "name": "合作市", "code": "623001" }, { "id": "2950", "name": "临潭县", "code": "623021" }, { "id": "2951", "name": "卓尼县", "code": "623022" }, { "id": "2952", "name": "舟曲县", "code": "623023" }, { "id": "2953", "name": "迭部县", "code": "623024" }, { "id": "2954", "name": "玛曲县", "code": "623025" }, { "id": "2955", "name": "碌曲县", "code": "623026" }, { "id": "2956", "name": "夏河县", "code": "623027" }] }] }, { "id": "29", "name": "青海省", "code": "630000", "children": [{ "id": "317", "name": "西宁市", "code": "630100", "children": [{ "id": "2957", "name": "市辖区", "code": "630101" }, { "id": "2958", "name": "城东区", "code": "630102" }, { "id": "2959", "name": "城中区", "code": "630103" }, { "id": "2960", "name": "城西区", "code": "630104" }, { "id": "2961", "name": "城北区", "code": "630105" }, { "id": "2962", "name": "大通回族土族自治县", "code": "630121" }, { "id": "2963", "name": "湟中县", "code": "630122" }, { "id": "2964", "name": "湟源县", "code": "630123" }] }, { "id": "318", "name": "海东市", "code": "630200", "children": [{ "id": "2965", "name": "乐都区", "code": "630202" }, { "id": "2966", "name": "平安区", "code": "630203" }, { "id": "2967", "name": "民和回族土族自治县", "code": "630222" }, { "id": "2968", "name": "互助土族自治县", "code": "630223" }, { "id": "2969", "name": "化隆回族自治县", "code": "630224" }, { "id": "2970", "name": "循化撒拉族自治县", "code": "630225" }] }, { "id": "319", "name": "海北藏族自治州", "code": "632200", "children": [{ "id": "2971", "name": "门源回族自治县", "code": "632221" }, { "id": "2972", "name": "祁连县", "code": "632222" }, { "id": "2973", "name": "海晏县", "code": "632223" }, { "id": "2974", "name": "刚察县", "code": "632224" }] }, { "id": "320", "name": "黄南藏族自治州", "code": "632300", "children": [{ "id": "2975", "name": "同仁县", "code": "632321" }, { "id": "2976", "name": "尖扎县", "code": "632322" }, { "id": "2977", "name": "泽库县", "code": "632323" }, { "id": "2978", "name": "河南蒙古族自治县", "code": "632324" }] }, { "id": "321", "name": "海南藏族自治州", "code": "632500", "children": [{ "id": "2979", "name": "共和县", "code": "632521" }, { "id": "2980", "name": "同德县", "code": "632522" }, { "id": "2981", "name": "贵德县", "code": "632523" }, { "id": "2982", "name": "兴海县", "code": "632524" }, { "id": "2983", "name": "贵南县", "code": "632525" }] }, { "id": "322", "name": "果洛藏族自治州", "code": "632600", "children": [{ "id": "2984", "name": "玛沁县", "code": "632621" }, { "id": "2985", "name": "班玛县", "code": "632622" }, { "id": "2986", "name": "甘德县", "code": "632623" }, { "id": "2987", "name": "达日县", "code": "632624" }, { "id": "2988", "name": "久治县", "code": "632625" }, { "id": "2989", "name": "玛多县", "code": "632626" }] }, { "id": "323", "name": "玉树藏族自治州", "code": "632700", "children": [{ "id": "2990", "name": "玉树市", "code": "632701" }, { "id": "2991", "name": "杂多县", "code": "632722" }, { "id": "2992", "name": "称多县", "code": "632723" }, { "id": "2993", "name": "治多县", "code": "632724" }, { "id": "2994", "name": "囊谦县", "code": "632725" }, { "id": "2995", "name": "曲麻莱县", "code": "632726" }] }, { "id": "324", "name": "海西蒙古族藏族自治州", "code": "632800", "children": [{ "id": "2996", "name": "格尔木市", "code": "632801" }, { "id": "2997", "name": "德令哈市", "code": "632802" }, { "id": "2998", "name": "乌兰县", "code": "632821" }, { "id": "2999", "name": "都兰县", "code": "632822" }, { "id": "3000", "name": "天峻县", "code": "632823" }] }] }, { "id": "30", "name": "宁夏回族自治区", "code": "640000", "children": [{ "id": "325", "name": "银川市", "code": "640100", "children": [{ "id": "3001", "name": "市辖区", "code": "640101" }, { "id": "3002", "name": "兴庆区", "code": "640104" }, { "id": "3003", "name": "西夏区", "code": "640105" }, { "id": "3004", "name": "金凤区", "code": "640106" }, { "id": "3005", "name": "永宁县", "code": "640121" }, { "id": "3006", "name": "贺兰县", "code": "640122" }, { "id": "3007", "name": "灵武市", "code": "640181" }] }, { "id": "326", "name": "石嘴山市", "code": "640200", "children": [{ "id": "3008", "name": "市辖区", "code": "640201" }, { "id": "3009", "name": "大武口区", "code": "640202" }, { "id": "3010", "name": "惠农区", "code": "640205" }, { "id": "3011", "name": "平罗县", "code": "640221" }] }, { "id": "327", "name": "吴忠市", "code": "640300", "children": [{ "id": "3012", "name": "市辖区", "code": "640301" }, { "id": "3013", "name": "利通区", "code": "640302" }, { "id": "3014", "name": "红寺堡区", "code": "640303" }, { "id": "3015", "name": "盐池县", "code": "640323" }, { "id": "3016", "name": "同心县", "code": "640324" }, { "id": "3017", "name": "青铜峡市", "code": "640381" }] }, { "id": "328", "name": "固原市", "code": "640400", "children": [{ "id": "3018", "name": "市辖区", "code": "640401" }, { "id": "3019", "name": "原州区", "code": "640402" }, { "id": "3020", "name": "西吉县", "code": "640422" }, { "id": "3021", "name": "隆德县", "code": "640423" }, { "id": "3022", "name": "泾源县", "code": "640424" }, { "id": "3023", "name": "彭阳县", "code": "640425" }] }, { "id": "329", "name": "中卫市", "code": "640500", "children": [{ "id": "3024", "name": "市辖区", "code": "640501" }, { "id": "3025", "name": "沙坡头区", "code": "640502" }, { "id": "3026", "name": "中宁县", "code": "640521" }, { "id": "3027", "name": "海原县", "code": "640522" }] }] }, { "id": "31", "name": "新疆维吾尔自治区", "code": "650000", "children": [{ "id": "330", "name": "乌鲁木齐市", "code": "650100", "children": [{ "id": "3028", "name": "市辖区", "code": "650101" }, { "id": "3029", "name": "天山区", "code": "650102" }, { "id": "3030", "name": "沙依巴克区", "code": "650103" }, { "id": "3031", "name": "新市区", "code": "650104" }, { "id": "3032", "name": "水磨沟区", "code": "650105" }, { "id": "3033", "name": "头屯河区", "code": "650106" }, { "id": "3034", "name": "达坂城区", "code": "650107" }, { "id": "3035", "name": "米东区", "code": "650109" }, { "id": "3036", "name": "乌鲁木齐县", "code": "650121" }] }, { "id": "331", "name": "克拉玛依市", "code": "650200", "children": [{ "id": "3037", "name": "市辖区", "code": "650201" }, { "id": "3038", "name": "独山子区", "code": "650202" }, { "id": "3039", "name": "克拉玛依区", "code": "650203" }, { "id": "3040", "name": "白碱滩区", "code": "650204" }, { "id": "3041", "name": "乌尔禾区", "code": "650205" }] }, { "id": "332", "name": "吐鲁番市", "code": "650400", "children": [{ "id": "3042", "name": "高昌区", "code": "650402" }, { "id": "3043", "name": "鄯善县", "code": "650421" }, { "id": "3044", "name": "托克逊县", "code": "650422" }] }, { "id": "333", "name": "哈密市", "code": "650500", "children": [{ "id": "3045", "name": "伊州区", "code": "650502" }, { "id": "3046", "name": "巴里坤哈萨克自治县", "code": "650521" }, { "id": "3047", "name": "伊吾县", "code": "650522" }] }, { "id": "334", "name": "昌吉回族自治州", "code": "652300", "children": [{ "id": "3048", "name": "昌吉市", "code": "652301" }, { "id": "3049", "name": "阜康市", "code": "652302" }, { "id": "3050", "name": "呼图壁县", "code": "652323" }, { "id": "3051", "name": "玛纳斯县", "code": "652324" }, { "id": "3052", "name": "奇台县", "code": "652325" }, { "id": "3053", "name": "吉木萨尔县", "code": "652327" }, { "id": "3054", "name": "木垒哈萨克自治县", "code": "652328" }] }, { "id": "335", "name": "博尔塔拉蒙古自治州", "code": "652700", "children": [{ "id": "3055", "name": "博乐市", "code": "652701" }, { "id": "3056", "name": "阿拉山口市", "code": "652702" }, { "id": "3057", "name": "精河县", "code": "652722" }, { "id": "3058", "name": "温泉县", "code": "652723" }] }, { "id": "336", "name": "巴音郭楞蒙古自治州", "code": "652800", "children": [{ "id": "3059", "name": "库尔勒市", "code": "652801" }, { "id": "3060", "name": "轮台县", "code": "652822" }, { "id": "3061", "name": "尉犁县", "code": "652823" }, { "id": "3062", "name": "若羌县", "code": "652824" }, { "id": "3063", "name": "且末县", "code": "652825" }, { "id": "3064", "name": "焉耆回族自治县", "code": "652826" }, { "id": "3065", "name": "和静县", "code": "652827" }, { "id": "3066", "name": "和硕县", "code": "652828" }, { "id": "3067", "name": "博湖县", "code": "652829" }] }, { "id": "337", "name": "阿克苏地区", "code": "652900", "children": [{ "id": "3068", "name": "阿克苏市", "code": "652901" }, { "id": "3069", "name": "温宿县", "code": "652922" }, { "id": "3070", "name": "库车县", "code": "652923" }, { "id": "3071", "name": "沙雅县", "code": "652924" }, { "id": "3072", "name": "新和县", "code": "652925" }, { "id": "3073", "name": "拜城县", "code": "652926" }, { "id": "3074", "name": "乌什县", "code": "652927" }, { "id": "3075", "name": "阿瓦提县", "code": "652928" }, { "id": "3076", "name": "柯坪县", "code": "652929" }] }, { "id": "338", "name": "克孜勒苏柯尔克孜自治州", "code": "653000", "children": [{ "id": "3077", "name": "阿图什市", "code": "653001" }, { "id": "3078", "name": "阿克陶县", "code": "653022" }, { "id": "3079", "name": "阿合奇县", "code": "653023" }, { "id": "3080", "name": "乌恰县", "code": "653024" }] }, { "id": "339", "name": "喀什地区", "code": "653100", "children": [{ "id": "3081", "name": "喀什市", "code": "653101" }, { "id": "3082", "name": "疏附县", "code": "653121" }, { "id": "3083", "name": "疏勒县", "code": "653122" }, { "id": "3084", "name": "英吉沙县", "code": "653123" }, { "id": "3085", "name": "泽普县", "code": "653124" }, { "id": "3086", "name": "莎车县", "code": "653125" }, { "id": "3087", "name": "叶城县", "code": "653126" }, { "id": "3088", "name": "麦盖提县", "code": "653127" }, { "id": "3089", "name": "岳普湖县", "code": "653128" }, { "id": "3090", "name": "伽师县", "code": "653129" }, { "id": "3091", "name": "巴楚县", "code": "653130" }, { "id": "3092", "name": "塔什库尔干塔吉克自治县", "code": "653131" }] }, { "id": "340", "name": "和田地区", "code": "653200", "children": [{ "id": "3093", "name": "和田市", "code": "653201" }, { "id": "3094", "name": "和田县", "code": "653221" }, { "id": "3095", "name": "墨玉县", "code": "653222" }, { "id": "3096", "name": "皮山县", "code": "653223" }, { "id": "3097", "name": "洛浦县", "code": "653224" }, { "id": "3098", "name": "策勒县", "code": "653225" }, { "id": "3099", "name": "于田县", "code": "653226" }, { "id": "3100", "name": "民丰县", "code": "653227" }] }, { "id": "341", "name": "伊犁哈萨克自治州", "code": "654000", "children": [{ "id": "3101", "name": "伊宁市", "code": "654002" }, { "id": "3102", "name": "奎屯市", "code": "654003" }, { "id": "3103", "name": "霍尔果斯市", "code": "654004" }, { "id": "3104", "name": "伊宁县", "code": "654021" }, { "id": "3105", "name": "察布查尔锡伯自治县", "code": "654022" }, { "id": "3106", "name": "霍城县", "code": "654023" }, { "id": "3107", "name": "巩留县", "code": "654024" }, { "id": "3108", "name": "新源县", "code": "654025" }, { "id": "3109", "name": "昭苏县", "code": "654026" }, { "id": "3110", "name": "特克斯县", "code": "654027" }, { "id": "3111", "name": "尼勒克县", "code": "654028" }] }, { "id": "342", "name": "塔城地区", "code": "654200", "children": [{ "id": "3112", "name": "塔城市", "code": "654201" }, { "id": "3113", "name": "乌苏市", "code": "654202" }, { "id": "3114", "name": "额敏县", "code": "654221" }, { "id": "3115", "name": "沙湾县", "code": "654223" }, { "id": "3116", "name": "托里县", "code": "654224" }, { "id": "3117", "name": "裕民县", "code": "654225" }, { "id": "3118", "name": "和布克赛尔蒙古自治县", "code": "654226" }] }, { "id": "343", "name": "阿勒泰地区", "code": "654300", "children": [{ "id": "3119", "name": "阿勒泰市", "code": "654301" }, { "id": "3120", "name": "布尔津县", "code": "654321" }, { "id": "3121", "name": "富蕴县", "code": "654322" }, { "id": "3122", "name": "福海县", "code": "654323" }, { "id": "3123", "name": "哈巴河县", "code": "654324" }, { "id": "3124", "name": "青河县", "code": "654325" }, { "id": "3125", "name": "吉木乃县", "code": "654326" }] }, { "id": "344", "name": "自治区直辖县级行政区划", "code": "659000", "children": [{ "id": "3126", "name": "石河子市", "code": "659001" }, { "id": "3127", "name": "阿拉尔市", "code": "659002" }, { "id": "3128", "name": "图木舒克市", "code": "659003" }, { "id": "3129", "name": "五家渠市", "code": "659004" }, { "id": "3130", "name": "铁门关市", "code": "659006" }] }] }, { "id": "32", "name": "台湾省", "code": "710000", "children": [{ "id": "345", "name": "台湾", "code": "710000", "children": [{ "id": "3131", "name": "台湾", "code": "710000" }] }] }, { "id": "33", "name": "香港特别行政区", "code": "810000", "children": [{ "id": "346", "name": "香港", "code": "810000", "children": [{ "id": "3132", "name": "香港", "code": "810000" }] }] }, { "id": "34", "name": "澳门特别行政区", "code": "820000", "children": [{ "id": "347", "name": "澳门", "code": "820000", "children": [{ "id": "3133", "name": "澳门", "code": "820000" }] }] }];
module.exports = {
  zones_tree: zones_tree };

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"July_fair","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"July_fair","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"July_fair","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"July_fair","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 212:
/*!**************************************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/components/uni-popup/popup.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 213));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 213:
/*!****************************************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/components/uni-popup/message.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 31);

/***/ }),

/***/ 31:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 32);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 32:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') !== -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


var ignoreVueI18n = true;
function watchAppLocale(appVm, i18n) {
  appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
    i18n.setLocale(newLocale);
  });
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    locale =
    typeof uni !== 'undefined' && uni.getLocale && uni.getLocale() ||
    LOCALE_EN;
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      watchAppLocale(appVm, i18n);
      if (!appVm.$t || !appVm.$i18n || ignoreVueI18n) {
        // if (!locale) {
        //   i18n.setLocale(getDefaultLocale())
        // }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          // 触发响应式
          appVm.$locale;
          return i18n.t(key, values);
        };
      } else
      {
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/pages.json ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 63:
/*!**********************************************************!*\
  !*** D:/ZStudy/3_1/七月/July_fair/July_fair/utils/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return "".concat([year, month, day].map(formatNumber).join('/'), " ").concat([hour, minute, second].map(formatNumber).join(':'));
};

var formatHour = function formatHour(date) {
  var hour = date.getHours();
  return "".concat([hour].map(formatNumber));
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0".concat(n);
};

module.exports = {
  formatTime: formatTime,
  formatHour: formatHour };

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map