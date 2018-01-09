
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(57);
var emptyObject = __webpack_require__(88);
var invariant = __webpack_require__(37);
var warning = __webpack_require__(38);
var emptyFunction = __webpack_require__(31);
var checkPropTypes = __webpack_require__(58);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function PureComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

function AsyncComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = AsyncComponent;
// Avoid an extra prototype jump for these methods.
_assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_CALL_TYPE:
          case REACT_RETURN_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

{
  var currentlyValidatingElement = null;

  var propTypesMisspellWarningShown = false;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };

  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!VALID_FRAGMENT_PROPS.has(key)) {
        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  // Legacy hook TODO: Warn if this is accessed
  validatedFactory.type = type;

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  Component: Component,
  PureComponent: PureComponent,
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}


/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(31);
var invariant = __webpack_require__(37);
var warning = __webpack_require__(38);
var assign = __webpack_require__(57);

var ReactPropTypesSecret = __webpack_require__(70);
var checkPropTypes = __webpack_require__(58);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = __webpack_require__(127);
}


/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return injectGlobal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return wrapWithTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStyleSheet", function() { return ServerStyleSheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetManager", function() { return StyleSheetManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_is_plain_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stylis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics__);






/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate$2(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate$2;

var hyphenate = hyphenate_1;

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

//      
var objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).filter(function (key) {
    var chunk = obj[key];
    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
  }).map(function (key) {
    if (__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(obj[key])) return objToCss(obj[key], key);
    return hyphenateStyleName_1(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') {
      return ruleSet;
    }
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) {
      return [].concat(ruleSet, flatten(chunk, executionContext));
    }

    /* Handle other components */
    if (chunk.hasOwnProperty('styledComponentId')) {
      // $FlowFixMe not sure how to make this pass
      return [].concat(ruleSet, ['.' + chunk.styledComponentId]);
    }

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk);
    }

    /* Handle objects */
    return ruleSet.concat(
    // $FlowFixMe have to add %checks somehow to isPlainObject
    __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

//      
var stylis = new __WEBPACK_IMPORTED_MODULE_1_stylis___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true
});

var stringifyRules = function stringifyRules(rules, selector, prefix) {
  var flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments

  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

  return stylis(prefix || !selector ? '' : selector, cssStr);
};

//      
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var charsLength = chars.length;

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
var generateAlphabeticName = function generateAlphabeticName(code) {
  var name = '';
  var x = void 0;

  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = chars[x % charsLength] + name;
  }

  return chars[x % charsLength] + name;
};

//      


var interleave = (function (strings, interpolations) {
  return interpolations.reduce(function (array, interp, i) {
    return array.concat(interp, strings[i + 1]);
  }, [strings[0]]);
});

//      
var css = (function (strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  return flatten(interleave(strings, interpolations));
});

//      
var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s+(\S+)\s+\*\//gm;

var extractCompsFromCSS = (function (maybeCSS) {
  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
  var existingComponents = [];
  css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
    existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
    return match;
  });
  return existingComponents.map(function (_ref, i) {
    var componentId = _ref.componentId,
        matchIndex = _ref.matchIndex;

    var nextComp = existingComponents[i + 1];
    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
    return { componentId: componentId, cssFromDOM: cssFromDOM };
  });
});

//      
/* eslint-disable camelcase, no-undef */

var getNonce = (function () {
                                     return  true ? __webpack_require__.nc : null;
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

//      
/* eslint-disable no-underscore-dangle */
/*
 * Browser Style Sheet with Rehydration
 *
 * <style data-styled-components="x y z"
 *        data-styled-components-is-local="true">
 *   /· sc-component-id: a ·/
 *   .sc-a { ... }
 *   .x { ... }
 *   /· sc-component-id: b ·/
 *   .sc-b { ... }
 *   .y { ... }
 *   .z { ... }
 * </style>
 *
 * Note: replace · with * in the above snippet.
 * */
var COMPONENTS_PER_TAG = 40;

var BrowserTag = function () {
  function BrowserTag(el, isLocal) {
    var existingSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    classCallCheck(this, BrowserTag);

    this.el = el;
    this.isLocal = isLocal;
    this.ready = false;

    var extractedComps = extractCompsFromCSS(existingSource);

    this.size = extractedComps.length;
    this.components = extractedComps.reduce(function (acc, obj) {
      acc[obj.componentId] = obj; // eslint-disable-line no-param-reassign
      return acc;
    }, {});
  }

  BrowserTag.prototype.isFull = function isFull() {
    return this.size >= COMPONENTS_PER_TAG;
  };

  BrowserTag.prototype.addComponent = function addComponent(componentId) {
    if (!this.ready) this.replaceElement();
    if ("development" !== 'production' && this.components[componentId]) {
      throw new Error('Trying to add Component \'' + componentId + '\' twice!');
    }

    var comp = { componentId: componentId, textNode: document.createTextNode('') };
    this.el.appendChild(comp.textNode);

    this.size += 1;
    this.components[componentId] = comp;
  };

  BrowserTag.prototype.inject = function inject(componentId, css, name) {
    if (!this.ready) this.replaceElement();
    var comp = this.components[componentId];

    if ("development" !== 'production' && !comp) {
      throw new Error('Must add a new component before you can inject css into it');
    }
    if (comp.textNode.data === '') {
      comp.textNode.appendData('\n/* sc-component-id: ' + componentId + ' */\n');
    }

    comp.textNode.appendData(css);
    if (name) {
      var existingNames = this.el.getAttribute(SC_ATTR);
      this.el.setAttribute(SC_ATTR, existingNames ? existingNames + ' ' + name : name);
    }

    var nonce = getNonce();

    if (nonce) {
      this.el.setAttribute('nonce', nonce);
    }
  };

  BrowserTag.prototype.toHTML = function toHTML() {
    return this.el.outerHTML;
  };

  BrowserTag.prototype.toReactElement = function toReactElement() {
    throw new Error("BrowserTag doesn't implement toReactElement!");
  };

  BrowserTag.prototype.clone = function clone() {
    throw new Error('BrowserTag cannot be cloned!');
  };

  /* Because we care about source order, before we can inject anything we need to
   * create a text node for each component and replace the existing CSS. */


  BrowserTag.prototype.replaceElement = function replaceElement() {
    var _this = this;

    this.ready = true;
    // We have nothing to inject. Use the current el.
    if (this.size === 0) return;

    // Build up our replacement style tag
    var newEl = this.el.cloneNode();
    newEl.appendChild(document.createTextNode('\n'));

    Object.keys(this.components).forEach(function (key) {
      var comp = _this.components[key];

      // eslint-disable-next-line no-param-reassign
      comp.textNode = document.createTextNode(comp.cssFromDOM);
      newEl.appendChild(comp.textNode);
    });

    if (!this.el.parentNode) {
      throw new Error("Trying to replace an element that wasn't mounted!");
    }

    // The ol' switcheroo
    this.el.parentNode.replaceChild(newEl, this.el);
    this.el = newEl;
  };

  return BrowserTag;
}();

/* Factory function to separate DOM operations from logical ones*/


var BrowserStyleSheet = {
  create: function create() {
    var tags = [];
    var names = {};

    /* Construct existing state from DOM */
    var nodes = document.querySelectorAll('[' + SC_ATTR + ']');
    var nodesLength = nodes.length;

    for (var i = 0; i < nodesLength; i += 1) {
      var el = nodes[i];

      tags.push(new BrowserTag(el, el.getAttribute(LOCAL_ATTR) === 'true', el.innerHTML));

      var attr = el.getAttribute(SC_ATTR);
      if (attr) {
        attr.trim().split(/\s+/).forEach(function (name) {
          names[name] = true;
        });
      }
    }

    /* Factory for making more tags */
    var tagConstructor = function tagConstructor(isLocal) {
      var el = document.createElement('style');
      el.type = 'text/css';
      el.setAttribute(SC_ATTR, '');
      el.setAttribute(LOCAL_ATTR, isLocal ? 'true' : 'false');
      if (!document.head) throw new Error('Missing document <head>');
      document.head.appendChild(el);
      return new BrowserTag(el, isLocal);
    };

    return new StyleSheet(tagConstructor, tags, names);
  }
};

//      
var SC_ATTR = 'data-styled-components';
var LOCAL_ATTR = 'data-styled-components-is-local';
var CONTEXT_KEY = '__styled-components-stylesheet__';

/* eslint-disable flowtype/object-type-delimiter */

/* eslint-enable flowtype/object-type-delimiter */

var instance = null;
// eslint-disable-next-line no-use-before-define
var clones = [];

var StyleSheet = function () {
  function StyleSheet(tagConstructor) {
    var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var names = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, StyleSheet);
    this.hashes = {};
    this.deferredInjections = {};
    this.stylesCacheable = typeof document !== 'undefined';

    this.tagConstructor = tagConstructor;
    this.tags = tags;
    this.names = names;
    this.constructComponentTagMap();
  }

  // helper for `ComponentStyle` to know when it cache static styles.
  // staticly styled-component can not safely cache styles on the server
  // without all `ComponentStyle` instances saving a reference to the
  // the styleSheet instance they last rendered with,
  // or listening to creation / reset events. otherwise you might create
  // a component with one stylesheet and render it another api response
  // with another, losing styles on from your server-side render.


  StyleSheet.prototype.constructComponentTagMap = function constructComponentTagMap() {
    var _this = this;

    this.componentTags = {};

    this.tags.forEach(function (tag) {
      Object.keys(tag.components).forEach(function (componentId) {
        _this.componentTags[componentId] = tag;
      });
    });
  };

  /* Best level of caching—get the name from the hash straight away. */


  StyleSheet.prototype.getName = function getName(hash) {
    return this.hashes[hash.toString()];
  };

  /* Second level of caching—if the name is already in the dom, don't
   * inject anything and record the hash for getName next time. */


  StyleSheet.prototype.alreadyInjected = function alreadyInjected(hash, name) {
    if (!this.names[name]) return false;

    this.hashes[hash.toString()] = name;
    return true;
  };

  /* Third type of caching—don't inject components' componentId twice. */


  StyleSheet.prototype.hasInjectedComponent = function hasInjectedComponent(componentId) {
    return !!this.componentTags[componentId];
  };

  StyleSheet.prototype.deferredInject = function deferredInject(componentId, isLocal, css) {
    if (this === instance) {
      clones.forEach(function (clone) {
        clone.deferredInject(componentId, isLocal, css);
      });
    }

    this.getOrCreateTag(componentId, isLocal);
    this.deferredInjections[componentId] = css;
  };

  StyleSheet.prototype.inject = function inject(componentId, isLocal, css, hash, name) {
    if (this === instance) {
      clones.forEach(function (clone) {
        clone.inject(componentId, isLocal, css);
      });
    }

    var tag = this.getOrCreateTag(componentId, isLocal);

    var deferredInjection = this.deferredInjections[componentId];
    if (deferredInjection) {
      tag.inject(componentId, deferredInjection);
      delete this.deferredInjections[componentId];
    }

    tag.inject(componentId, css, name);

    if (hash && name) {
      this.hashes[hash.toString()] = name;
    }
  };

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map(function (tag) {
      return tag.toHTML();
    }).join('');
  };

  StyleSheet.prototype.toReactElements = function toReactElements() {
    return this.tags.map(function (tag, i) {
      return tag.toReactElement('sc-' + i);
    });
  };

  StyleSheet.prototype.getOrCreateTag = function getOrCreateTag(componentId, isLocal) {
    var existingTag = this.componentTags[componentId];
    if (existingTag) {
      return existingTag;
    }

    var lastTag = this.tags[this.tags.length - 1];
    var componentTag = !lastTag || lastTag.isFull() || lastTag.isLocal !== isLocal ? this.createNewTag(isLocal) : lastTag;
    this.componentTags[componentId] = componentTag;
    componentTag.addComponent(componentId);
    return componentTag;
  };

  StyleSheet.prototype.createNewTag = function createNewTag(isLocal) {
    var newTag = this.tagConstructor(isLocal);
    this.tags.push(newTag);
    return newTag;
  };

  StyleSheet.reset = function reset(isServer) {
    instance = StyleSheet.create(isServer);
  };

  /* We can make isServer totally implicit once Jest 20 drops and we
   * can change environment on a per-test basis. */


  StyleSheet.create = function create() {
    var isServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : typeof document === 'undefined';

    return (isServer ? ServerStyleSheet : BrowserStyleSheet).create();
  };

  StyleSheet.clone = function clone(oldSheet) {
    var newSheet = new StyleSheet(oldSheet.tagConstructor, oldSheet.tags.map(function (tag) {
      return tag.clone();
    }), _extends({}, oldSheet.names));

    newSheet.hashes = _extends({}, oldSheet.hashes);
    newSheet.deferredInjections = _extends({}, oldSheet.deferredInjections);
    clones.push(newSheet);

    return newSheet;
  };

  createClass(StyleSheet, null, [{
    key: 'instance',
    get: function get$$1() {
      return instance || (instance = StyleSheet.create());
    }
  }]);
  return StyleSheet;
}();

var _StyleSheetManager$ch;

//      
var StyleSheetManager = function (_Component) {
  inherits(StyleSheetManager, _Component);

  function StyleSheetManager() {
    classCallCheck(this, StyleSheetManager);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StyleSheetManager.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[CONTEXT_KEY] = this.props.sheet, _ref;
  };

  StyleSheetManager.prototype.render = function render() {
    /* eslint-disable react/prop-types */
    // Flow v0.43.1 will report an error accessing the `children` property,
    // but v0.47.0 will not. It is necessary to use a type cast instead of
    // a "fixme" comment to satisfy both Flow versions.
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(this.props.children);
  };

  return StyleSheetManager;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

StyleSheetManager.childContextTypes = (_StyleSheetManager$ch = {}, _StyleSheetManager$ch[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(ServerStyleSheet)]).isRequired, _StyleSheetManager$ch);

StyleSheetManager.propTypes = {
  sheet: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(ServerStyleSheet)]).isRequired
};

//      
/* eslint-disable no-underscore-dangle */
var ServerTag = function () {
  function ServerTag(isLocal) {
    classCallCheck(this, ServerTag);

    this.isLocal = isLocal;
    this.components = {};
    this.size = 0;
    this.names = [];
  }

  ServerTag.prototype.isFull = function isFull() {
    return false;
  };

  ServerTag.prototype.addComponent = function addComponent(componentId) {
    if ("development" !== 'production' && this.components[componentId]) {
      throw new Error('Trying to add Component \'' + componentId + '\' twice!');
    }
    this.components[componentId] = { componentId: componentId, css: '' };
    this.size += 1;
  };

  ServerTag.prototype.concatenateCSS = function concatenateCSS() {
    var _this = this;

    return Object.keys(this.components).reduce(function (styles, k) {
      return styles + _this.components[k].css;
    }, '');
  };

  ServerTag.prototype.inject = function inject(componentId, css, name) {
    var comp = this.components[componentId];

    if ("development" !== 'production' && !comp) {
      throw new Error('Must add a new component before you can inject css into it');
    }
    if (comp.css === '') comp.css = '/* sc-component-id: ' + componentId + ' */\n';

    comp.css += css.replace(/\n*$/, '\n');

    if (name) this.names.push(name);
  };

  ServerTag.prototype.toHTML = function toHTML() {
    var attrs = ['type="text/css"', SC_ATTR + '="' + this.names.join(' ') + '"', LOCAL_ATTR + '="' + (this.isLocal ? 'true' : 'false') + '"'];

    var nonce = getNonce();

    if (nonce) {
      attrs.push('nonce="' + nonce + '"');
    }

    return '<style ' + attrs.join(' ') + '>' + this.concatenateCSS() + '</style>';
  };

  ServerTag.prototype.toReactElement = function toReactElement(key) {
    var _attrs;

    var attrs = (_attrs = {}, _attrs[SC_ATTR] = this.names.join(' '), _attrs[LOCAL_ATTR] = this.isLocal.toString(), _attrs);

    var nonce = getNonce();

    if (nonce) {
      attrs.nonce = nonce;
    }

    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('style', _extends({
      key: key,
      type: 'text/css'
    }, attrs, {
      dangerouslySetInnerHTML: { __html: this.concatenateCSS() }
    }));
  };

  ServerTag.prototype.clone = function clone() {
    var _this2 = this;

    var copy = new ServerTag(this.isLocal);
    copy.names = [].concat(this.names);
    copy.size = this.size;
    copy.components = Object.keys(this.components).reduce(function (acc, key) {
      acc[key] = _extends({}, _this2.components[key]); // eslint-disable-line no-param-reassign
      return acc;
    }, {});

    return copy;
  };

  return ServerTag;
}();

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet);

    this.instance = StyleSheet.clone(StyleSheet.instance);
  }

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.closed) {
      throw new Error("Can't collect styles once you've called getStyleTags!");
    }
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      StyleSheetManager,
      { sheet: this.instance },
      children
    );
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    if (!this.closed) {
      clones.splice(clones.indexOf(this.instance), 1);
      this.closed = true;
    }

    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    if (!this.closed) {
      clones.splice(clones.indexOf(this.instance), 1);
      this.closed = true;
    }

    return this.instance.toReactElements();
  };

  ServerStyleSheet.create = function create() {
    return new StyleSheet(function (isLocal) {
      return new ServerTag(isLocal);
    });
  };

  return ServerStyleSheet;
}();

//      

var LIMIT = 200;

var createWarnTooManyClasses = (function (displayName) {
  var generatedClasses = {};
  var warningSeen = false;

  return function (className) {
    if (!warningSeen) {
      generatedClasses[className] = true;
      if (Object.keys(generatedClasses).length >= LIMIT) {
        // Unable to find latestRule in test environment.
        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
        warningSeen = true;
        generatedClasses = {};
      }
    }
  };
});

//      
/* eslint-disable max-len */
/**
 * Trying to avoid the unknown-prop errors on styled components by filtering by
 * React's attribute whitelist.
 *
 * To regenerate this regex:
 *
 * 1. `npm i -g regexgen` (https://github.com/devongovett/regexgen)
 * 2. Run `regexgen` with the list of space-separated words below as input
 * 3. Surround the emitted regex with this: `/^(GENERATED_REGEX)$/` -- this will ensure a full string match
 *    and no false positives from partials
 **/
/*
children dangerouslySetInnerHTML key ref autoFocus defaultValue valueLink defaultChecked checkedLink innerHTML suppressContentEditableWarning onFocusIn onFocusOut className onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onReset onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onAnimationStart onAnimationEnd onAnimationIteration onTransitionEnd onCopyCapture onCutCapture onPasteCapture onCompositionEndCapture onCompositionStartCapture onCompositionUpdateCapture onKeyDownCapture onKeyPressCapture onKeyUpCapture onFocusCapture onBlurCapture onChangeCapture onInputCapture onSubmitCapture onResetCapture onClickCapture onContextMenuCapture onDoubleClickCapture onDragCapture onDragEndCapture onDragEnterCapture onDragExitCapture onDragLeaveCapture onDragOverCapture onDragStartCapture onDropCapture onMouseDownCapture onMouseEnterCapture onMouseLeaveCapture onMouseMoveCapture onMouseOutCapture onMouseOverCapture onMouseUpCapture onSelectCapture onTouchCancelCapture onTouchEndCapture onTouchMoveCapture onTouchStartCapture onScrollCapture onWheelCapture onAbortCapture onCanPlayCapture onCanPlayThroughCapture onDurationChangeCapture onEmptiedCapture onEncryptedCapture onEndedCapture onErrorCapture onLoadedDataCapture onLoadedMetadataCapture onLoadStartCapture onPauseCapture onPlayCapture onPlayingCapture onProgressCapture onRateChangeCapture onSeekedCapture onSeekingCapture onStalledCapture onSuspendCapture onTimeUpdateCapture onVolumeChangeCapture onWaitingCapture onLoadCapture onAnimationStartCapture onAnimationEndCapture onAnimationIterationCapture onTransitionEndCapture accept acceptCharset accessKey action allowFullScreen allowTransparency alt as async autoComplete autoPlay capture cellPadding cellSpacing charSet challenge checked cite classID className cols colSpan content contentEditable contextMenu controls coords crossOrigin data dateTime default defer dir disabled download draggable encType form formAction formEncType formMethod formNoValidate formTarget frameBorder headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media mediaGroup method min minLength multiple muted name nonce noValidate open optimum pattern placeholder playsInline poster preload profile radioGroup readOnly referrerPolicy rel required reversed role rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step style summary tabIndex target title type useMap value width wmode wrap about datatype inlist prefix property resource typeof vocab autoCapitalize autoCorrect autoSave color itemProp itemScope itemType itemID itemRef results security unselectable accentHeight accumulate additive alignmentBaseline allowReorder alphabetic amplitude arabicForm ascent attributeName attributeType autoReverse azimuth baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight clip clipPath clipRule clipPathUnits colorInterpolation colorInterpolationFilters colorProfile colorRendering contentScriptType contentStyleType cursor cx cy d decelerate descent diffuseConstant direction display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground end exponent externalResourcesRequired fill fillOpacity fillRule filter filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor limitingConeAngle local markerEnd markerMid markerStart markerHeight markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode numOctaves offset opacity operator order orient orientation origin overflow overlinePosition overlineThickness paintOrder panose1 pathLength patternContentUnits patternTransform patternUnits pointerEvents points pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate rx ry scale seed shapeRendering slope spacing specularConstant specularExponent speed spreadMethod startOffset stdDeviation stemh stemv stitchTiles stopColor stopOpacity strikethroughPosition strikethroughThickness string stroke strokeDasharray strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor textDecoration textRendering textLength to transform u1 u2 underlinePosition underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic vHanging vIdeographic vMathematical values vectorEffect version vertAdvY vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing writingMode x xHeight x1 x2 xChannelSelector xlinkActuate xlinkArcrole xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlBase xmlns xmlnsXlink xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
*/
/* eslint-enable max-len */

var ATTRIBUTE_REGEX = /^((?:s(?:uppressContentEditableWarn|croll|pac)|(?:shape|image|text)Render|(?:letter|word)Spac|vHang|hang)ing|(?:on(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur)Captur|alignmentBaselin|(?:limitingConeAng|xlink(?:(?:Arcr|R)o|Tit)|s(?:urfaceSca|ty|ca)|unselectab|baseProfi|fontSty|(?:focus|dragg)ab|multip|profi|tit)l|d(?:ominantBaselin|efaultValu)|a(?:uto(?:Capitaliz|Revers|Sav)|dditiv)|(?:(?:formNoValid|xlinkActu|noValid|accumul|rot)a|autoComple|decelera)t|(?:(?:attribute|item)T|datat)yp|(?:attribute|glyph)Nam|playsInlin|(?:formE|e)ncTyp|(?:writing|input|edge)Mod|(?:xlinkTy|itemSco|keyTy|slo)p|(?:amplitu|mo)d|(?:xmlSpa|non)c|fillRul|(?:dateTi|na)m|r(?:esourc|ol)|xmlBas|wmod)e|(?:glyphOrientationHorizont|loc)al|(?:externalResourcesRequir|select|revers|mut)ed|c(?:o(?:lorInterpolationFilter|ntrol|ord)s|o(?:lor(?:Interpolation)?|ntent)|(?:ontentS(?:cript|tyle)Typ|o(?:ntentEditab|lorProfi)l|l(?:assNam|ipRul)|a(?:lcMod|ptur)|it)e|olorRendering|l(?:ipPathUnits|assID)|o(?:ntextMenu|ls)|h(?:eckedLink|a(?:llenge|rSet)|ildren|ecked)|ell(?:Spac|Padd)ing|(?:rossOrigi|olSpa)n|apHeight|lip(?:Path)?|ursor|[xy])|glyphOrientationVertical|d(?:angerouslySetInnerHTML|efaultChecked|ownload|isabled|isplay|[xy])|(?:s(?:trikethroughThickn|eaml)es|(?:und|ov)erlineThicknes|r(?:equiredExtension|adiu)|(?:requiredFeatur|tableValu|stitchTil|numOctav|filterR)e|key(?:(?:Splin|Tim)e|Param)|autoFocu|header|bia)s|(?:(?:st(?:rikethroughPosi|dDevia)|(?:und|ov)erlinePosi|(?:textDecor|elev)a|orienta)tio|(?:strokeLinejo|orig)i|formActio|zoomAndPa|onFocusI|directio|(?:vers|act)io|rowSpa|begi|ico)n|o(?:n(?:AnimationIteration|C(?:o(?:mposition(?:Update|Start|End)|ntextMenu|py)|anPlayThrough|anPlay|hange|lick|ut)|(?:(?:Duration|Volume|Rate)Chang|(?:MouseLea|(?:Touch|Mouse)Mo|DragLea)v|Paus)e|Loaded(?:Metad|D)ata|(?:Animation|Touch|Load|Drag)Start|(?:(?:T(?:ransition|ouch)|Animation)E|Suspe)nd|DoubleClick|(?:TouchCanc|Whe)el|(?:Mouse(?:Ent|Ov)e|Drag(?:Ent|Ov)e|Erro)r|TimeUpdate|(?:E(?:n(?:crypt|d)|mpti)|S(?:tall|eek))ed|MouseDown|P(?:rogress|laying)|(?:MouseOu|DragExi|S(?:elec|ubmi)|Rese|Inpu)t|KeyPress|DragEnd|Key(?:Down|Up)|(?:Wait|Seek)ing|(?:MouseU|Dro)p|Scroll|Paste|Focus|Abort|Drag|Play|Load|Blur)|rient)|p(?:reserveA(?:spectRatio|lpha)|ointsAt[X-Z]|anose1)|(?:patternContent|ma(?:sk(?:Content)?|rker)|primitive|gradient|pattern|filter)Units|(?:gradientT|patternT|t)ransform|(?:(?:allowTranspar|baseFrequ)enc|re(?:ferrerPolic|adOnl)|(?:(?:st(?:roke|op)O|floodO|fillO|o)pac|integr|secur)it|visibilit|fontFamil|accessKe|propert|summar)y|(?:strokeMiterlimi|(?:specularConsta|repeatCou|fontVaria)n|(?:(?:specularE|e)xpon|renderingInt|asc)en|d(?:iffuseConsta|esce)n|(?:fontSizeAdju|lengthAdju|manife)s|baselineShif|vectorEffec|(?:(?:mar(?:ker|gin)|x)H|accentH|fontW)eigh|a(?:utoCorrec|bou)|markerStar|onFocusOu|in(?:tercep|lis)|restar|forma|heigh|lis)t|(?:(?:st(?:rokeDasho|artO)|o)ffs|acceptChars|formTarg|viewTarg|srcS)et|(?:(?:enableBackgrou|markerE)n|s(?:p(?:readMetho|ee)|ee)|formMetho|m(?:arkerMi|etho)|preloa|kin)d|k(?:ernel(?:UnitLength|Matrix)|[1-4])|(?:[xy]ChannelSelect|lightingCol|textAnch|floodCol|stopCol|operat|htmlF)or|(?:allowFullScre|hidd)en|strokeDasharray|systemLanguage|(?:strokeLineca|itemPro|useMa|wra|loo)p|v(?:Mathematical|ert(?:Origin[XY]|AdvY)|alues|ocab)|(?:pointerEve|keyPoi)nts|unicodeRange|(?:(?:allowReord|placehold|frameBord|paintOrd|post|ord)e|repeatDu|d(?:efe|u))r|mathematical|(?:vI|i)deographic|h(?:oriz(?:Origin|Adv)X|ttpEquiv)|u(?:nicodeBidi|[12])|(?:fontStretc|hig)h|(?:(?:mar(?:ker|gin)W|strokeW)id|azimu)th|vAlphabetic|mediaGroup|spellCheck|(?:unitsPerE|optimu|fro)m|r(?:adioGroup|e(?:sults|f[XY]|l)|ows|[xy])|(?:xmlnsXl|valueL)ink|a(?:rabicForm|l(?:phabetic|t)|sync)|pathLength|(?:text|m(?:in|ax))Length|innerHTML|xlinkShow|(?:xlinkHr|glyphR)ef|r(?:e(?:quired|sult|f))?|o(?:verflow|pen)|(?:tabInde|(?:sand|b)bo|viewBo)x|(?:(?:href|xml|src)La|kerni)ng|f(?:o(?:ntSize|rm)|il(?:ter|l))|autoPlay|unicode|p(?:attern|oints)|t(?:arget[XY]|o)|i(?:temRef|n2|s)|divisor|d(?:efault|ata|ir)?|srcDoc|s(?:coped|te(?:m[hv]|p)|pan)|(?:width|size)s|(?:stri|la)ng|prefix|itemID|s(?:t(?:roke|art)|hape|cope|rc)|a(?:ccept|s)|t(?:arget|ype)|typeof|width|value|x(?:mlns)?|label|m(?:edia|a(?:sk|x)|in)|size|href|k(?:ey)?|end|low|x[12]|i[dn]|y[12]|g[12]|by|f[xy]|[yz])$/;

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var validAttr = (function (name) {
  return ATTRIBUTE_REGEX.test(name) || isCustomAttribute(name.toLowerCase());
});

//      


function isTag(target) /* : %checks */{
  return typeof target === 'string';
}

//      


function isStyledComponent(target) /* : %checks */{
  return typeof target === 'function' && typeof target.styledComponentId === 'string';
}

//      

/* eslint-disable no-undef */
function getComponentName(target) {
  return target.displayName || target.name || 'Component';
}

//      


var determineTheme = (function (props, fallbackTheme, defaultProps) {
  // Props should take precedence over ThemeProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  /* eslint-disable react/prop-types */
  var isDefaultTheme = defaultProps && props.theme === defaultProps.theme;
  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme;
  /* eslint-enable */

  return theme;
});

//      
var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
var dashesAtEnds = /(^-|-$)/g;

/**
 * TODO: Explore using CSS.escape when it becomes more available
 * in evergreen browsers.
 */
function escape(str) {
  return str
  // Replace all possible CSS selectors
  .replace(escapeRegex, '-')

  // Remove extraneous hyphens at the start and end
  .replace(dashesAtEnds, '');
}

//      
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialState) {
  var listeners = {};
  var id = 0;
  var state = initialState;

  function publish(nextState) {
    state = nextState;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in listeners) {
      var listener = listeners[key];
      if (listener === undefined) {
        // eslint-disable-next-line no-continue
        continue;
      }

      listener(state);
    }
  }

  function subscribe(listener) {
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    listener(state);
    return currentId;
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined;
  }

  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
};

//      
// Helper to call a given function, only once
var once = (function (cb) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      cb();
    }
  };
});

var _ThemeProvider$childC;
var _ThemeProvider$contex;

//      
/* globals React$Element */
// NOTE: DO NOT CHANGE, changing this is a semver major change!
var CHANNEL = '__styled-components__';
var CHANNEL_NEXT = CHANNEL + 'next__';

var CONTEXT_CHANNEL_SHAPE = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.shape({
  getTheme: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func,
  subscribe: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func,
  unsubscribe: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
});

var warnChannelDeprecated = void 0;
if (true) {
  warnChannelDeprecated = once(function () {
    // eslint-disable-next-line no-console
    console.error('Warning: Usage of `context.' + CHANNEL + '` as a function is deprecated. It will be replaced with the object on `.context.' + CHANNEL_NEXT + '` in a future version.');
  });
}

var isFunction = function isFunction(test) {
  return typeof test === 'function';
};

/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, _Component.call(this));

    _this.unsubscribeToOuterId = -1;

    _this.getTheme = _this.getTheme.bind(_this);
    return _this;
  }

  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    var outerContext = this.context[CHANNEL_NEXT];
    if (outerContext !== undefined) {
      this.unsubscribeToOuterId = outerContext.subscribe(function (theme) {
        _this2.outerTheme = theme;
      });
    }
    this.broadcast = createBroadcast(this.getTheme());
  };

  ThemeProvider.prototype.getChildContext = function getChildContext() {
    var _this3 = this,
        _babelHelpers$extends;

    return _extends({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL_NEXT] = {
      getTheme: this.getTheme,
      subscribe: this.broadcast.subscribe,
      unsubscribe: this.broadcast.unsubscribe
    }, _babelHelpers$extends[CHANNEL] = function (subscriber) {
      if (true) {
        warnChannelDeprecated();
      }

      // Patch the old `subscribe` provide via `CHANNEL` for older clients.
      var unsubscribeId = _this3.broadcast.subscribe(subscriber);
      return function () {
        return _this3.broadcast.unsubscribe(unsubscribeId);
      };
    }, _babelHelpers$extends));
  };

  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.broadcast.publish(this.getTheme(nextProps.theme));
    }
  };

  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribeToOuterId !== -1) {
      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeToOuterId);
    }
  };

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
    var theme = passedTheme || this.props.theme;
    if (isFunction(theme)) {
      var mergedTheme = theme(this.outerTheme);
      if ("development" !== 'production' && !__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(mergedTheme)) {
        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
      }
      return mergedTheme;
    }
    if (!__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(theme)) {
      throw new Error('[ThemeProvider] Please make your theme prop a plain object');
    }
    return _extends({}, this.outerTheme, theme);
  };

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) {
      return null;
    }
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(this.props.children);
  };

  return ThemeProvider;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

ThemeProvider.childContextTypes = (_ThemeProvider$childC = {}, _ThemeProvider$childC[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _ThemeProvider$childC[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$childC);
ThemeProvider.contextTypes = (_ThemeProvider$contex = {}, _ThemeProvider$contex[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$contex);

//      

// HACK for generating all static styles without needing to allocate
// an empty execution context every single time...
var STATIC_EXECUTION_CONTEXT = {};

var _StyledComponent = (function (ComponentStyle, constructWithOptions) {
  var identifiers = {};

  /* We depend on components having unique IDs */
  var generateId = function generateId(_displayName, parentComponentId) {
    var displayName = typeof _displayName !== 'string' ? 'sc' : escape(_displayName);

    var componentId = void 0;

    /**
     * only fall back to hashing the component injection order if
     * a proper displayName isn't provided by the babel plugin
     */
    if (!_displayName) {
      var nr = (identifiers[displayName] || 0) + 1;
      identifiers[displayName] = nr;

      componentId = displayName + '-' + ComponentStyle.generateName(displayName + nr);
    } else {
      componentId = displayName + '-' + ComponentStyle.generateName(displayName);
    }

    return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId;
  };

  var BaseStyledComponent = function (_Component) {
    inherits(BaseStyledComponent, _Component);

    function BaseStyledComponent() {
      var _temp, _this, _ret;

      classCallCheck(this, BaseStyledComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
        theme: null,
        generatedClassName: ''
      }, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    BaseStyledComponent.prototype.unsubscribeFromContext = function unsubscribeFromContext() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
      var attrs = this.constructor.attrs;

      var context = _extends({}, props, { theme: theme });
      if (attrs === undefined) {
        return context;
      }

      this.attrs = Object.keys(attrs).reduce(function (acc, key) {
        var attr = attrs[key];
        // eslint-disable-next-line no-param-reassign
        acc[key] = typeof attr === 'function' ? attr(context) : attr;
        return acc;
      }, {});

      return _extends({}, context, this.attrs);
    };

    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
      var _constructor = this.constructor,
          attrs = _constructor.attrs,
          componentStyle = _constructor.componentStyle,
          warnTooManyClasses = _constructor.warnTooManyClasses;

      var styleSheet = this.context[CONTEXT_KEY] || StyleSheet.instance;

      // staticaly styled-components don't need to build an execution context object,
      // and shouldn't be increasing the number of class names
      if (componentStyle.isStatic && attrs === undefined) {
        return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, styleSheet);
      } else {
        var executionContext = this.buildExecutionContext(theme, props);
        var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

        if ("development" !== 'production' && warnTooManyClasses !== undefined) {
          warnTooManyClasses(className);
        }

        return className;
      }
    };

    BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var componentStyle = this.constructor.componentStyle;

      var styledContext = this.context[CHANNEL_NEXT];

      // If this is a staticaly-styled component, we don't need to the theme
      // to generate or build styles.
      if (componentStyle.isStatic) {
        var generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, this.props);
        this.setState({ generatedClassName: generatedClassName });
        // If there is a theme in the context, subscribe to the event emitter. This
        // is necessary due to pure components blocking context updates, this circumvents
        // that by updating when an event is emitted
      } else if (styledContext !== undefined) {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          // This will be called once immediately
          var theme = determineTheme(_this2.props, nextTheme, _this2.constructor.defaultProps);
          var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);

          _this2.setState({ theme: theme, generatedClassName: generatedClassName });
        });
      } else {
        // eslint-disable-next-line react/prop-types
        var theme = this.props.theme || {};
        var _generatedClassName = this.generateAndInjectStyles(theme, this.props);
        this.setState({ theme: theme, generatedClassName: _generatedClassName });
      }
    };

    BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      // If this is a staticaly-styled component, we don't need to listen to
      // props changes to update styles
      var componentStyle = this.constructor.componentStyle;

      if (componentStyle.isStatic) {
        return;
      }

      this.setState(function (oldState) {
        var theme = determineTheme(nextProps, oldState.theme, _this3.constructor.defaultProps);
        var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

        return { theme: theme, generatedClassName: generatedClassName };
      });
    };

    BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribeFromContext();
    };

    BaseStyledComponent.prototype.render = function render() {
      var _this4 = this;

      // eslint-disable-next-line react/prop-types
      var innerRef = this.props.innerRef;
      var generatedClassName = this.state.generatedClassName;
      var _constructor2 = this.constructor,
          styledComponentId = _constructor2.styledComponentId,
          target = _constructor2.target;


      var isTargetTag = isTag(target);

      var className = [
      // eslint-disable-next-line react/prop-types
      this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

      var baseProps = _extends({}, this.attrs, {
        className: className
      });

      if (isStyledComponent(target)) {
        baseProps.innerRef = innerRef;
      } else {
        baseProps.ref = innerRef;
      }

      var propsForElement = Object.keys(this.props).reduce(function (acc, propName) {
        // Don't pass through non HTML tags through to HTML elements
        // always omit innerRef
        if (propName !== 'innerRef' && propName !== 'className' && (!isTargetTag || validAttr(propName))) {
          // eslint-disable-next-line no-param-reassign
          acc[propName] = _this4.props[propName];
        }

        return acc;
      }, baseProps);

      return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(target, propsForElement);
    };

    return BaseStyledComponent;
  }(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

  var createStyledComponent = function createStyledComponent(target, options, rules) {
    var _StyledComponent$cont;

    var _options$displayName = options.displayName,
        displayName = _options$displayName === undefined ? isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')' : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
        _options$ParentCompon = options.ParentComponent,
        ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
        extendingRules = options.rules,
        attrs = options.attrs;


    var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + '-' + options.componentId : componentId;

    var componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), attrs, styledComponentId);

    var StyledComponent = function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent);

      function StyledComponent() {
        classCallCheck(this, StyledComponent);
        return possibleConstructorReturn(this, _ParentComponent.apply(this, arguments));
      }

      StyledComponent.withComponent = function withComponent(tag) {
        var previousComponentId = options.componentId,
            optionsToCopy = objectWithoutProperties(options, ['componentId']);


        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape(getComponentName(tag)));

        var newOptions = _extends({}, optionsToCopy, {
          componentId: newComponentId,
          ParentComponent: StyledComponent
        });

        return createStyledComponent(tag, newOptions, rules);
      };

      createClass(StyledComponent, null, [{
        key: 'extend',
        get: function get$$1() {
          var rulesFromOptions = options.rules,
              parentComponentId = options.componentId,
              optionsToCopy = objectWithoutProperties(options, ['rules', 'componentId']);


          var newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules);

          var newOptions = _extends({}, optionsToCopy, {
            rules: newRules,
            parentComponentId: parentComponentId,
            ParentComponent: StyledComponent
          });

          return constructWithOptions(createStyledComponent, target, newOptions);
        }
      }]);
      return StyledComponent;
    }(ParentComponent);

    StyledComponent.contextTypes = (_StyledComponent$cont = {}, _StyledComponent$cont[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _StyledComponent$cont[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _StyledComponent$cont[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(ServerStyleSheet)]), _StyledComponent$cont);
    StyledComponent.displayName = displayName;
    StyledComponent.styledComponentId = styledComponentId;
    StyledComponent.attrs = attrs;
    StyledComponent.componentStyle = componentStyle;
    StyledComponent.target = target;


    if (true) {
      StyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
    }

    return StyledComponent;
  };

  return createStyledComponent;
});

// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

//      
var isStaticRules = function isStaticRules(rules, attrs) {
  for (var i = 0; i < rules.length; i += 1) {
    var rule = rules[i];

    // recursive case
    if (Array.isArray(rule) && !isStaticRules(rule)) {
      return false;
    } else if (typeof rule === 'function' && !isStyledComponent(rule)) {
      // functions are allowed to be static if they're just being
      // used to get the classname of a nested styled copmonent
      return false;
    }
  }

  if (attrs !== undefined) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in attrs) {
      var value = attrs[key];
      if (typeof value === 'function') {
        return false;
      }
    }
  }

  return true;
};

var isHRMEnabled = typeof module !== 'undefined' && module.hot && "development" !== 'production';

/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
var _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
  var ComponentStyle = function () {
    function ComponentStyle(rules, attrs, componentId) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      this.isStatic = !isHRMEnabled && isStaticRules(rules, attrs);
      this.componentId = componentId;
      if (!StyleSheet.instance.hasInjectedComponent(this.componentId)) {
        var placeholder =  true ? '.' + componentId + ' {}' : '';
        StyleSheet.instance.deferredInject(componentId, true, placeholder);
      }
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */


    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      var isStatic = this.isStatic,
          lastClassName = this.lastClassName;

      if (isStatic && lastClassName !== undefined) {
        return lastClassName;
      }

      var flatCSS = flatten(this.rules, executionContext);
      var hash = doHash(this.componentId + flatCSS.join(''));

      var existingName = styleSheet.getName(hash);
      if (existingName !== undefined) {
        if (styleSheet.stylesCacheable) {
          this.lastClassName = existingName;
        }
        return existingName;
      }

      var name = nameGenerator(hash);
      if (styleSheet.stylesCacheable) {
        this.lastClassName = existingName;
      }
      if (styleSheet.alreadyInjected(hash, name)) {
        return name;
      }

      var css = '\n' + stringifyRules(flatCSS, '.' + name);
      // NOTE: this can only be set when we inject the class-name.
      // For some reason, presumably due to how css is stringifyRules behaves in
      // differently between client and server, styles break.
      styleSheet.inject(this.componentId, true, css, hash, name);
      return name;
    };

    ComponentStyle.generateName = function generateName(str) {
      return nameGenerator(doHash(str));
    };

    return ComponentStyle;
  }();

  return ComponentStyle;
});

//      
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

//      

var _styled = (function (styledComponent, constructWithOptions) {
  var styled = function styled(tag) {
    return constructWithOptions(styledComponent, tag);
  };

  // Shorthands for all valid HTML Elements
  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  return styled;
});

//      
var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

var _keyframes = (function (nameGenerator, stringifyRules, css) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = doHash(replaceWhitespace(JSON.stringify(rules)));

    var existingName = StyleSheet.instance.getName(hash);
    if (existingName) return existingName;

    var name = nameGenerator(hash);
    if (StyleSheet.instance.alreadyInjected(hash, name)) return name;

    var generatedCSS = stringifyRules(rules, name, '@keyframes');
    StyleSheet.instance.inject('sc-keyframes-' + name, true, generatedCSS, hash, name);
    return name;
  };
});

//      
var _injectGlobal = (function (stringifyRules, css) {
  var injectGlobal = function injectGlobal(strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = doHash(JSON.stringify(rules));

    var componentId = 'sc-global-' + hash;
    if (StyleSheet.instance.hasInjectedComponent(componentId)) return;

    StyleSheet.instance.inject(componentId, false, stringifyRules(rules));
  };

  return injectGlobal;
});

//      


var _constructWithOptions = (function (css) {
  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if ("development" !== 'production' && typeof tag !== 'string' && typeof tag !== 'function') {
      // $FlowInvalidInputTest
      throw new Error('Cannot create styled-component for component: ' + tag);
    }

    /* This is callable directly as a template function */
    var templateFunction = function templateFunction(strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return componentConstructor(tag, options, css.apply(undefined, [strings].concat(interpolations)));
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || {}, attrs)
      }));
    };

    return templateFunction;
  };

  return constructWithOptions;
});

//      
/* globals ReactClass */

var wrapWithTheme = function wrapWithTheme(Component$$1) {
  var _WithTheme$contextTyp;

  var componentName = Component$$1.displayName || Component$$1.name || 'Component';

  var shouldSetInnerRef = isStyledComponent(Component$$1) ||
  // NOTE: We can't pass a ref to a stateless functional component
  typeof Component$$1 === 'function' && !(Component$$1.prototype && 'isReactComponent' in Component$$1.prototype);

  var WithTheme = function (_React$Component) {
    inherits(WithTheme, _React$Component);

    function WithTheme() {
      var _temp, _this, _ret;

      classCallCheck(this, WithTheme);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


    WithTheme.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var defaultProps = this.constructor.defaultProps;

      var styledContext = this.context[CHANNEL_NEXT];
      var themeProp = determineTheme(this.props, undefined, defaultProps);
      if (styledContext === undefined && themeProp === undefined && "development" !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps');
      } else if (styledContext === undefined && themeProp !== undefined) {
        this.setState({ theme: themeProp });
      } else {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          var theme = determineTheme(_this2.props, nextTheme, defaultProps);
          _this2.setState({ theme: theme });
        });
      }
    };

    WithTheme.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var defaultProps = this.constructor.defaultProps;

      this.setState(function (oldState) {
        var theme = determineTheme(nextProps, oldState.theme, defaultProps);

        return { theme: theme };
      });
    };

    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    WithTheme.prototype.render = function render() {
      // eslint-disable-next-line react/prop-types
      var innerRef = this.props.innerRef;
      var theme = this.state.theme;


      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Component$$1, _extends({
        theme: theme
      }, this.props, {
        innerRef: shouldSetInnerRef ? innerRef : undefined,
        ref: shouldSetInnerRef ? undefined : innerRef
      }));
    };

    return WithTheme;
  }(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

  WithTheme.displayName = 'WithTheme(' + componentName + ')';
  WithTheme.styledComponentId = 'withTheme';
  WithTheme.contextTypes = (_WithTheme$contextTyp = {}, _WithTheme$contextTyp[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _WithTheme$contextTyp[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _WithTheme$contextTyp);


  return __WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics___default()(WithTheme, Component$$1);
};

//      

/* Import singletons */
/* Import singleton constructors */
/* Import components */
/* Import Higher Order Components */
/* Instantiate singletons */
var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);
var constructWithOptions = _constructWithOptions(css);
var StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions);

/* Instantiate exported singletons */
var keyframes = _keyframes(generateAlphabeticName, stringifyRules, css);
var injectGlobal = _injectGlobal(stringifyRules, css);
var styled = _styled(StyledComponent, constructWithOptions);

/* harmony default export */ __webpack_exports__["default"] = (styled);


/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BASE_FONT_SIZE = exports.BASE_FONT_SIZE = 25;
var BASE_MOBILE_FONT_SIZE = exports.BASE_MOBILE_FONT_SIZE = 20;
var rem = exports.rem = function rem(size) {
  return size / BASE_FONT_SIZE + "rem";
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3JlbS5qcyJdLCJuYW1lcyI6WyJCQVNFX0ZPTlRfU0laRSIsIkJBU0VfTU9CSUxFX0ZPTlRfU0laRSIsInJlbSIsInNpemUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sSUFBTSwwQ0FBaUIsQUFBdkIsQUFDUDtBQUFPLElBQU0sd0RBQXdCLEFBQTlCLEFBQ1A7QUFBTyxJQUFNLG9CQUFNLFNBQU4sQUFBTSxVQUFBO1NBQVcsT0FBTyxBQUFsQixpQkFBQTtBQUFaIiwiZmlsZSI6InJlbS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/utils/rem.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/utils/rem.js"); } } })();

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(31);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(397);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

/*
 *          __        ___
 *    _____/ /___  __/ (_)____
 *   / ___/ __/ / / / / / ___/
 *  (__  ) /_/ /_/ / / (__  )
 * /____/\__/\__, /_/_/____/
 *          /____/
 *
 * light - weight css preprocessor @licence MIT
 */
(function (factory) {/* eslint-disable */
	 true ? (module['exports'] = factory(null)) :
		typeof define === 'function' && define['amd'] ? define(factory(null)) :
			(window['stylis'] = factory(null))
}(/** @param {*=} options */function factory (options) {/* eslint-disable */

	'use strict'

	/**
	 * Notes
	 *
	 * The ['<method name>'] pattern is used to support closure compiler
	 * the jsdoc signatures are also used to the same effect
	 *
	 * ----
	 *
	 * int + int + int === n4 [faster]
	 *
	 * vs
	 *
	 * int === n1 && int === n2 && int === n3
	 *
	 * ----
	 *
	 * switch (int) { case ints...} [faster]
	 *
	 * vs
	 *
	 * if (int == 1 && int === 2 ...)
	 *
	 * ----
	 *
	 * The (first*n1 + second*n2 + third*n3) format used in the property parser
	 * is a simple way to hash the sequence of characters
	 * taking into account the index they occur in
	 * since any number of 3 character sequences could produce duplicates.
	 *
	 * On the other hand sequences that are directly tied to the index of the character
	 * resolve a far more accurate measure, it's also faster
	 * to evaluate one condition in a switch statement
	 * than three in an if statement regardless of the added math.
	 *
	 * This allows the vendor prefixer to be both small and fast.
	 */

	var nullptn = /^\0+/g /* matches leading null characters */
	var formatptn = /[\0\r\f]/g /* matches new line, null and formfeed characters */
	var colonptn = /: */g /* splits animation rules */
	var cursorptn = /zoo|gra/ /* assert cursor varient */
	var transformptn = /([,: ])(transform)/g /* vendor prefix transform, older webkit */
	var animationptn = /,+\s*(?![^(]*[)])/g /* splits multiple shorthand notation animations */
	var propertiesptn = / +\s*(?![^(]*[)])/g /* animation properties */
	var elementptn = / *[\0] */g /* selector elements */
	var selectorptn = /,\r+?/g /* splits selectors */
	var andptn = /([\t\r\n ])*\f?&/g /* match & */
	var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g /* matches :global(.*) */
	var invalidptn = /\W+/g /* removes invalid characters from keyframes */
	var keyframeptn = /@(k\w+)\s*(\S*)\s*/ /* matches @keyframes $1 */
	var plcholdrptn = /::(place)/g /* match ::placeholder varient */
	var readonlyptn = /:(read-only)/g /* match :read-only varient */
	var beforeptn = /\s+(?=[{\];=:>])/g /* matches \s before ] ; = : */
	var afterptn = /([[}=:>])\s+/g /* matches \s after characters [ } = : */
	var tailptn = /(\{[^{]+?);(?=\})/g /* matches tail semi-colons ;} */
	var whiteptn = /\s{2,}/g /* matches repeating whitespace */
	var pseudoptn = /([^\(])(:+) */g /* pseudo element */
	var writingptn = /[svh]\w+-[tblr]{2}/ /* match writing mode property values */
	var gradientptn = /([\w-]+t\()/g /* match *gradient property */
	var supportsptn = /\(\s*(.*)\s*\)/g /* match supports (groups) */
	var propertyptn = /([^]*?);/g /* match properties leading semicolon */
	var selfptn = /-self|flex-/g /* match flex- and -self in align-self: flex-*; */
	var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/ /* extrats :readonly or :placholder from selector */
	var trimptn = /[ \t]+$/ /* match tail whitspace */

	/* vendors */
	var webkit = '-webkit-'
	var moz = '-moz-'
	var ms = '-ms-'

	/* character codes */
	var SEMICOLON = 59 /* ; */
	var CLOSEBRACES = 125 /* } */
	var OPENBRACES = 123 /* { */
	var OPENPARENTHESES = 40 /* ( */
	var CLOSEPARENTHESES = 41 /* ) */
	var OPENBRACKET = 91 /* [ */
	var CLOSEBRACKET = 93 /* ] */
	var NEWLINE = 10 /* \n */
	var CARRIAGE = 13 /* \r */
	var TAB = 9 /* \t */
	var AT = 64 /* @ */
	var SPACE = 32 /*   */
	var AND = 38 /* & */
	var DASH = 45 /* - */
	var UNDERSCORE = 95 /* _ */
	var STAR = 42 /* * */
	var COMMA = 44 /* , */
	var COLON = 58 /* : */
	var SINGLEQUOTE = 39 /* ' */
	var DOUBLEQUOTE = 34 /* " */
	var FOWARDSLASH = 47 /* / */
	var GREATERTHAN = 62 /* > */
	var PLUS = 43 /* + */
	var TILDE = 126 /* ~ */
	var NULL = 0 /* \0 */
	var FORMFEED = 12 /* \f */
	var VERTICALTAB = 11 /* \v */

	/* special identifiers */
	var KEYFRAME = 107 /* k */
	var MEDIA = 109 /* m */
	var SUPPORTS = 115 /* s */
	var PLACEHOLDER = 112 /* p */
	var READONLY = 111 /* o */
	var IMPORT = 169 /* <at>i */
	var CHARSET = 163 /* <at>c */
	var DOCUMENT = 100 /* <at>d */
	var PAGE = 112 /* <at>p */

	var column = 1 /* current column */
	var line = 1 /* current line numebr */
	var pattern = 0 /* :pattern */

	var cascade = 1 /* #id h1 h2 vs h1#id h2#id  */
	var prefix = 1 /* vendor prefix */
	var escape = 1 /* escape :global() pattern */
	var compress = 0 /* compress output */
	var semicolon = 0 /* no/semicolon option */
	var preserve = 0 /* preserve empty selectors */

	/* empty reference */
	var array = []

	/* plugins */
	var plugins = []
	var plugged = 0
	var should = null

	/* plugin context */
	var POSTS = -2
	var PREPS = -1
	var UNKWN = 0
	var PROPS = 1
	var BLCKS = 2
	var ATRUL = 3

	/* plugin newline context */
	var unkwn = 0

	/* keyframe animation */
	var keyed = 1
	var key = ''

	/* selector namespace */
	var nscopealt = ''
	var nscope = ''

	/**
	 * Compile
	 *
	 * @param {Array<string>} parent
	 * @param {Array<string>} current
	 * @param {string} body
	 * @param {number} id
	 * @param {number} depth
	 * @return {string}
	 */
	function compile (parent, current, body, id, depth) {
		var bracket = 0 /* brackets [] */
		var comment = 0 /* comments /* // or /* */
		var parentheses = 0 /* functions () */
		var quote = 0 /* quotes '', "" */

		var first = 0 /* first character code */
		var second = 0 /* second character code */
		var code = 0 /* current character code */
		var tail = 0 /* previous character code */
		var trail = 0 /* character before previous code */
		var peak = 0 /* previous non-whitespace code */

		var counter = 0 /* count sequence termination */
		var context = 0 /* track current context */
		var atrule = 0 /* track @at-rule context */
		var pseudo = 0 /* track pseudo token index */
		var caret = 0 /* current character index */
		var format = 0 /* control character formating context */
		var insert = 0 /* auto semicolon insertion */
		var invert = 0 /* inverted selector pattern */
		var length = 0 /* generic length address */
		var eof = body.length /* end of file(length) */
		var eol = eof - 1 /* end of file(characters) */

		var char = '' /* current character */
		var chars = '' /* current buffer of characters */
		var child = '' /* next buffer of characters */
		var out = '' /* compiled body */
		var children = '' /* compiled children */
		var flat = '' /* compiled leafs */
		var selector /* generic selector address */
		var result /* generic address */

		// ...build body
		while (caret < eof) {
			code = body.charCodeAt(caret)

			// eof varient
			if (caret === eol) {
				// last character + noop context, add synthetic padding for noop context to terminate
				if (comment + quote + parentheses + bracket !== 0) {
					if (comment !== 0) {
						code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH
					}

					quote = parentheses = bracket = 0
					eof++
					eol++
				}
			}

			if (comment + quote + parentheses + bracket === 0) {
				// eof varient
				if (caret === eol) {
					if (format > 0) {
						chars = chars.replace(formatptn, '')
					}

					if (chars.trim().length > 0) {
						switch (code) {
							case SPACE:
							case TAB:
							case SEMICOLON:
							case CARRIAGE:
							case NEWLINE: {
								break
							}
							default: {
								chars += body.charAt(caret)
							}
						}

						code = SEMICOLON
					}
				}

				// auto semicolon insertion
				if (insert === 1) {
					switch (code) {
						// false flags
						case OPENBRACES:
						case CLOSEBRACES:
						case SEMICOLON:
						case DOUBLEQUOTE:
						case SINGLEQUOTE:
						case OPENPARENTHESES:
						case CLOSEPARENTHESES:
						case COMMA: {
							insert = 0
						}
						// ignore
						case TAB:
						case CARRIAGE:
						case NEWLINE:
						case SPACE: {
							break
						}
						// valid
						default: {
							insert = 0
							length = caret
							first = code
							caret--
							code = SEMICOLON

							while (length < eof) {
								switch (body.charCodeAt(++length)) {
									case NEWLINE:
									case CARRIAGE:
									case SEMICOLON: {
										caret++
										code = first
									}
									case COLON:
									case OPENBRACES: {
										length = eof
									}
								}
							}
						}
					}
				}

				// token varient
				switch (code) {
					case OPENBRACES: {
						chars = chars.trim()
						first = chars.charCodeAt(0)
						counter = 1
						length = ++caret

						while (caret < eof) {
							code = body.charCodeAt(caret)

							switch (code) {
								case OPENBRACES: {
									counter++
									break
								}
								case CLOSEBRACES: {
									counter--
									break
								}
							}

							if (counter === 0) {
								break
							}

							caret++
						}

						child = body.substring(length, caret)

						if (first === NULL) {
							first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0)
						}

						switch (first) {
							// @at-rule
							case AT: {
								if (format > 0) {
									chars = chars.replace(formatptn, '')
								}

								second = chars.charCodeAt(1)

								switch (second) {
									case DOCUMENT:
									case MEDIA:
									case SUPPORTS:
									case DASH: {
										selector = current
										break
									}
									default: {
										selector = array
									}
								}

								child = compile(current, selector, child, second, depth+1)
								length = child.length

								// preserve empty @at-rule
								if (preserve > 0 && length === 0) {
									length = chars.length
								}

								// execute plugins, @at-rule context
								if (plugged > 0) {
									selector = select(array, chars, invert)
									result = proxy(ATRUL, child, selector, current, line, column, length, second, depth)
									chars = selector.join('')

									if (result !== void 0) {
										if ((length = (child = result.trim()).length) === 0) {
											second = 0
											child = ''
										}
									}
								}

								if (length > 0) {
									switch (second) {
										case SUPPORTS: {
											chars = chars.replace(supportsptn, supports)
										}
										case DOCUMENT:
										case MEDIA:
										case DASH: {
											child = chars + '{' + child + '}'
											break
										}
										case KEYFRAME: {
											chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''))
											child = chars + '{' + child + '}'

											if (prefix === 1 || (prefix === 2 && vendor('@'+child, 3))) {
												child = '@' + webkit + child + '@' + child
											} else {
												child = '@' + child
											}
											break
										}
										default: {
											child = chars + child

											if (id === PAGE) {
												child = (out += child, '')
											}
										}
									}
								} else {
									child = ''
								}

								break
							}
							// selector
							default: {
								child = compile(current, select(current, chars, invert), child, id, depth+1)
							}
						}

						children += child

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						atrule = 0
						chars = ''
						child = ''
						code = body.charCodeAt(++caret)
						break
					}
					case CLOSEBRACES:
					case SEMICOLON: {
						chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim()

						if ((length = chars.length) > 1) {
							// monkey-patch missing colon
							if (pseudo === 0) {
								first = chars.charCodeAt(0)

								// first character is a letter or dash, buffer has a space character
								if ((first === DASH || first > 96 && first < 123)) {
									length = (chars = chars.replace(' ', ':')).length
								}
							}

							// execute plugins, property context
							if (plugged > 0) {
								if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth)) !== void 0) {
									if ((length = (chars = result.trim()).length) === 0) {
										chars = '\0\0'
									}
								}
							}

							first = chars.charCodeAt(0)
							second = chars.charCodeAt(1)

							switch (first + second) {
								case NULL: {
									break
								}
								case IMPORT:
								case CHARSET: {
									flat += chars + body.charAt(caret)
									break
								}
								default: {
									if (chars.charCodeAt(length-1) === COLON)
										break

									out += property(chars, first, second, chars.charCodeAt(2))
								}
							}
						}

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						chars = ''
						code = body.charCodeAt(++caret)
						break
					}
				}
			}

			// parse characters
			switch (code) {
				case CARRIAGE:
				case NEWLINE: {
					// auto insert semicolon
					if (comment + quote + parentheses + bracket + semicolon === 0) {
						// valid non-whitespace characters that
						// may precede a newline
						switch (peak) {
							case CLOSEPARENTHESES:
							case SINGLEQUOTE:
							case DOUBLEQUOTE:
							case AT:
							case TILDE:
							case GREATERTHAN:
							case STAR:
							case PLUS:
							case FOWARDSLASH:
							case DASH:
							case COLON:
							case COMMA:
							case SEMICOLON:
							case OPENBRACES:
							case CLOSEBRACES: {
								break
							}
							default: {
								// current buffer has a colon
								if (pseudo > 0) {
									insert = 1
								}
							}
						}
					}

					// terminate line comment
					if (comment === FOWARDSLASH) {
						comment = 0
					} else if (cascade + context === 0) {
						format = 1
						chars += '\0'
					}

					// execute plugins, newline context
					if (plugged * unkwn > 0) {
						proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth)
					}

					// next line, reset column position
					column = 1
					line++
					break
				}
				case SEMICOLON:
				case CLOSEBRACES: {
					if (comment + quote + parentheses + bracket === 0) {
						column++
						break
					}
				}
				default: {
					// increment column position
					column++

					// current character
					char = body.charAt(caret)

					// remove comments, escape functions, strings, attributes and prepare selectors
					switch (code) {
						case TAB:
						case SPACE: {
							if (quote + bracket + comment === 0) {
								switch (tail) {
									case COMMA:
									case COLON:
									case TAB:
									case SPACE: {
										char = ''
										break
									}
									default: {
										if (code !== SPACE) {
											char = ' '
										}
									}
								}
							}
							break
						}
						// escape breaking control characters
						case NULL: {
							char = '\\0'
							break
						}
						case FORMFEED: {
							char = '\\f'
							break
						}
						case VERTICALTAB: {
							char = '\\v'
							break
						}
						// &
						case AND: {
							// inverted selector pattern i.e html &
							if (quote + comment + bracket === 0 && cascade > 0) {
								invert = 1
								format = 1
								char = '\f' + char
							}
							break
						}
						// ::p<l>aceholder, l
						// :read-on<l>y, l
						case 108: {
							if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
								switch (caret - pseudo) {
									// ::placeholder
									case 2: {
										if (tail === PLACEHOLDER && body.charCodeAt(caret-3) === COLON) {
											pattern = tail
										}
									}
									// :read-only
									case 8: {
										if (trail === READONLY) {
											pattern = trail
										}
									}
								}
							}
							break
						}
						// :<pattern>
						case COLON: {
							if (quote + comment + bracket === 0) {
								pseudo = caret
							}
							break
						}
						// selectors
						case COMMA: {
							if (comment + parentheses + quote + bracket === 0) {
								format = 1
								char += '\r'
							}
							break
						}
						// quotes
						case DOUBLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
							}
							break
						}
						case SINGLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
							}
							break
						}
						// attributes
						case OPENBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket++
							}
							break
						}
						case CLOSEBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket--
							}
							break
						}
						// functions
						case CLOSEPARENTHESES: {
							if (quote + comment + bracket === 0) {
								parentheses--
							}
							break
						}
						case OPENPARENTHESES: {
							if (quote + comment + bracket === 0) {
								if (context === 0) {
									switch (tail*2 + trail*3) {
										// :matches
										case 533: {
											break
										}
										// :global, :not, :nth-child etc...
										default: {
											counter = 0
											context = 1
										}
									}
								}

								parentheses++
							}
							break
						}
						case AT: {
							if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
								atrule = 1
							}
							break
						}
						// block/line comments
						case STAR:
						case FOWARDSLASH: {
							if (quote + bracket + parentheses > 0) {
								break
							}

							switch (comment) {
								// initialize line/block comment context
								case 0: {
									switch (code*2 + body.charCodeAt(caret+1)*3) {
										// //
										case 235: {
											comment = FOWARDSLASH
											break
										}
										// /*
										case 220: {
											length = caret
											comment = STAR
											break
										}
									}
									break
								}
								// end block comment context
								case STAR: {
									if (code === FOWARDSLASH && tail === STAR) {
										// /*<!> ... */, !
										if (body.charCodeAt(length+2) === 33) {
											out += body.substring(length, caret+1)
										}
										char = ''
										comment = 0
									}
								}
							}
						}
					}

					// ignore comment blocks
					if (comment === 0) {
						// aggressive isolation mode, divide each individual selector
						// including selectors in :not function but excluding selectors in :global function
						if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
							switch (code) {
								case COMMA:
								case TILDE:
								case GREATERTHAN:
								case PLUS:
								case CLOSEPARENTHESES:
								case OPENPARENTHESES: {
									if (context === 0) {
										// outside of an isolated context i.e nth-child(<...>)
										switch (tail) {
											case TAB:
											case SPACE:
											case NEWLINE:
											case CARRIAGE: {
												char = char + '\0'
												break
											}
											default: {
												char = '\0' + char + (code === COMMA ? '' : '\0')
											}
										}
										format = 1
									} else {
										// within an isolated context, sleep untill it's terminated
										switch (code) {
											case OPENPARENTHESES: {
												context = ++counter
												break
											}
											case CLOSEPARENTHESES: {
												if ((context = --counter) === 0) {
													format = 1
													char += '\0'
												}
												break
											}
										}
									}
									break
								}
								case TAB:
								case SPACE: {
									switch (tail) {
										case NULL:
										case OPENBRACES:
										case CLOSEBRACES:
										case SEMICOLON:
										case COMMA:
										case FORMFEED:
										case TAB:
										case SPACE:
										case NEWLINE:
										case CARRIAGE: {
											break
										}
										default: {
											// ignore in isolated contexts
											if (context === 0) {
												format = 1
												char += '\0'
											}
										}
									}
								}
							}
						}

						// concat buffer of characters
						chars += char

						// previous non-whitespace character code
						if (code !== SPACE && code !== TAB) {
							peak = code
						}
					}
				}
			}

			// tail character codes
			trail = tail
			tail = code

			// visit every character
			caret++
		}

		length = out.length

		// preserve empty selector
 		if (preserve > 0) {
 			if (length === 0 && children.length === 0 && (current[0].length === 0) === false) {
 				if (id !== MEDIA || (current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0])) {
					length = current.join(',').length + 2
 				}
 			}
		}

		if (length > 0) {
			// cascade isolation mode?
			selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current

			// execute plugins, block context
			if (plugged > 0) {
				result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth)

				if (result !== void 0 && (out = result).length === 0) {
					return flat + out + children
				}
			}

			out = selector.join(',') + '{' + out + '}'

			if (prefix*pattern !== 0) {
				if (prefix === 2 && !vendor(out, 2))
					pattern = 0

				switch (pattern) {
					// ::read-only
					case READONLY: {
						out = out.replace(readonlyptn, ':'+moz+'$1')+out
						break
					}
					// ::placeholder
					case PLACEHOLDER: {
						out = (
							out.replace(plcholdrptn, '::' + webkit + 'input-$1') +
							out.replace(plcholdrptn, '::' + moz + '$1') +
							out.replace(plcholdrptn, ':' + ms + 'input-$1') + out
						)
						break
					}
				}

				pattern = 0
			}
		}

		return flat + out + children
	}

	/**
	 * Select
	 *
	 * @param {Array<string>} parent
	 * @param {string} current
	 * @param {number} invert
	 * @return {Array<string>}
	 */
	function select (parent, current, invert) {
		var selectors = current.trim().split(selectorptn)
		var out = selectors

		var length = selectors.length
		var l = parent.length

		switch (l) {
			// 0-1 parent selectors
			case 0:
			case 1: {
				for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
					out[i] = scope(selector, out[i], invert, l).trim()
				}
				break
			}
			// >2 parent selectors, nested
			default: {
				for (var i = 0, j = 0, out = []; i < length; ++i) {
					for (var k = 0; k < l; ++k) {
						out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim()
					}
				}
			}
		}

		return out
	}

	/**
	 * Scope
	 *
	 * @param {string} parent
	 * @param {string} current
	 * @param {number} invert
	 * @param {number} level
	 * @return {string}
	 */
	function scope (parent, current, invert, level) {
		var selector = current
		var code = selector.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (selector = selector.trim()).charCodeAt(0)
		}

		switch (code) {
			// &
			case AND: {
				switch (cascade + level) {
					case 0:
					case 1: {
						if (parent.trim().length === 0) {
							break
						}
					}
					default: {
						return selector.replace(andptn, '$1'+parent.trim())
					}
				}
				break
			}
			// :
			case COLON: {
				switch (selector.charCodeAt(1)) {
					// g in :global
					case 103: {
						if (escape > 0 && cascade > 0) {
							return selector.replace(escapeptn, '$1').replace(andptn, '$1'+nscope)
						}
						break
					}
					default: {
						// :hover
						return parent.trim() + selector
					}
				}
			}
			default: {
				// html &
				if (invert*cascade > 0 && selector.indexOf('\f') > 0) {
					return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1')+parent.trim())
				}
			}
		}

		return parent + selector
	}

	/**
	 * Property
	 *
	 * @param {string} input
	 * @param {number} first
	 * @param {number} second
	 * @param {number} third
	 * @return {string}
	 */
	function property (input, first, second, third) {
		var index = 0
		var out = input + ';'
		var hash = (first*2) + (second*3) + (third*4)
		var cache

		// animation: a, n, i characters
		if (hash === 944) {
			return animation(out)
		} else if (prefix === 0 || (prefix === 2 && !vendor(out, 1))) {
			return out
		}

		// vendor prefix
		switch (hash) {
			// text-decoration/text-size-adjust: t, e, x
			case 1015: {
				// text-size-adjust, -
				return out.charCodeAt(9) === DASH ? webkit + out + out : out
			}
			// filter/fill f, i, l
			case 951: {
				// filter, t
				return out.charCodeAt(3) === 116 ? webkit + out + out : out
			}
			// color/column, c, o, l
			case 963: {
				// column, n
				return out.charCodeAt(5) === 110 ? webkit + out + out : out
			}
			// box-decoration-break, b, o, x
			case 1009: {
				if (out.charCodeAt(4) !== 100) {
					break
				}
			}
			// mask, m, a, s
			// clip-path, c, l, i
			case 969:
			case 942: {
				return webkit + out + out
			}
			// appearance: a, p, p
			case 978: {
				return webkit + out + moz + out + out
			}
			// hyphens: h, y, p
			// user-select: u, s, e
			case 1019:
			case 983: {
				return webkit + out + moz + out + ms + out + out
			}
			// background/backface-visibility, b, a, c
			case 883: {
				// backface-visibility, -
				return out.charCodeAt(8) === DASH ? webkit + out + out : out
			}
			// flex: f, l, e
			case 932: {
				if (out.charCodeAt(4) === DASH) {
					switch (out.charCodeAt(5)) {
						// flex-grow, g
						case 103: {
							return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out
						}
						// flex-shrink, s
						case 115: {
							return webkit + out + ms + out.replace('shrink', 'negative') + out
						}
						// flex-basis, b
						case 98: {
							return webkit + out + ms + out.replace('basis', 'preferred-size') + out
						}
					}
				}

				return webkit + out + ms + out + out
			}
			// order: o, r, d
			case 964: {
				return webkit + out + ms + 'flex' + '-' + out + out
			}
			// justify-items/justify-content, j, u, s
			case 1023: {
				// justify-content, c
				if (out.charCodeAt(8) !== 99) {
					break
				}

				cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify')
				return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out
			}
			// cursor, c, u, r
			case 1005: {
				return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out
			}
			// writing-mode, w, r, i
			case 1000: {
				cache = out.substring(13).trim()
				index = cache.indexOf('-') + 1

				switch (cache.charCodeAt(0)+cache.charCodeAt(index)) {
					// vertical-lr
					case 226: {
						cache = out.replace(writingptn, 'tb')
						break
					}
					// vertical-rl
					case 232: {
						cache = out.replace(writingptn, 'tb-rl')
						break
					}
					// horizontal-tb
					case 220: {
						cache = out.replace(writingptn, 'lr')
						break
					}
					default: {
						return out
					}
				}

				return webkit + out + ms + cache + out
			}
			// position: sticky
			case 1017: {
				if (out.indexOf('sticky', 9) === -1) {
					return out
				}
			}
			// display(flex/inline-flex/inline-box): d, i, s
			case 975: {
				index = (out = input).length - 10
				cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim()

				switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7)|0)) {
					// inline-
					case 203: {
						// inline-box
						if (cache.charCodeAt(8) < 111) {
							break
						}
					}
					// inline-box/sticky
					case 115: {
						out = out.replace(cache, webkit+cache)+';'+out
						break
					}
					// inline-flex
					// flex
					case 207:
					case 102: {
						out = (
							out.replace(cache, webkit+(hash > 102 ? 'inline-' : '')+'box')+';'+
							out.replace(cache, webkit+cache)+';'+
							out.replace(cache, ms+cache+'box')+';'+
							out
						)
					}
				}

				return out + ';'
			}
			// align-items, align-center, align-self: a, l, i, -
			case 938: {
				if (out.charCodeAt(5) === DASH) {
					switch (out.charCodeAt(6)) {
						// align-items, i
						case 105: {
							cache = out.replace('-items', '')
							return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out
						}
						// align-self, s
						case 115: {
							return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out
						}
						// align-content
						default: {
							return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '') + out
						}
					}
				}
				break
			}
			// width: min-content / width: max-content
			case 953: {
				if ((index = out.indexOf('-content', 9)) > 0) {
					// width: min-content / width: max-content
					if (out.charCodeAt(index - 3) === 109 && out.charCodeAt(index - 4) !== 45) {
						cache = out.substring(index - 3)
						return 'width:' + webkit + cache + 'width:' + moz + cache + 'width:' + cache
					}
				}
				break
			}
			// transform, transition: t, r, a
			case 962: {
				out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out

				// transitions
				if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
					return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out
				}

				break
			}
		}

		return out
	}

	var i = 0

	/**
	 * Vendor
	 *
	 * @param {string} content
	 * @param {number} context
	 * @return {boolean}
	 */
	function vendor (content, context) {
		var index = content.indexOf(context === 1 ? ':' : '{')
		var key = content.substring(0, context !== 3 ? index : 10)
		var value = content.substring(index + 1, content.length - 1)

		return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context)
	}

	/**
	 * Supports
	 *
	 * @param {string} match
	 * @param {string} group
	 * @return {string}
	 */
	function supports (match, group) {
		var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2))

		return out !== group+';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '('+group+')'
	}

	/**
	 * Animation
	 *
	 * @param {string} input
	 * @return {string}
	 */
	function animation (input) {
		var length = input.length
		var index = input.indexOf(':', 9) + 1
		var declare = input.substring(0, index).trim()
		var out = input.substring(index, length-1).trim()

		switch (input.charCodeAt(9)*keyed) {
			case 0: {
				break
			}
			// animation-*, -
			case DASH: {
				// animation-name, n
				if (input.charCodeAt(10) !== 110) {
					break
				}
			}
			// animation/animation-name
			default: {
				// split in case of multiple animations
				var list = out.split((out = '', animationptn))

				for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
					var value = list[i]
					var items = value.split(propertiesptn)

					while (value = items[index]) {
						var peak = value.charCodeAt(0)

						if (keyed === 1 && (
							// letters
							(peak > AT && peak < 90) || (peak > 96 && peak < 123) || peak === UNDERSCORE ||
							// dash but not in sequence i.e --
							(peak === DASH && value.charCodeAt(1) !== DASH)
						)) {
							// not a number/function
							switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
								case 1: {
									switch (value) {
										// not a valid reserved keyword
										case 'infinite': case 'alternate': case 'backwards': case 'running':
										case 'normal': case 'forwards': case 'both': case 'none': case 'linear':
										case 'ease': case 'ease-in': case 'ease-out': case 'ease-in-out':
										case 'paused': case 'reverse': case 'alternate-reverse': case 'inherit':
										case 'initial': case 'unset': case 'step-start': case 'step-end': {
											break
										}
										default: {
											value += key
										}
									}
								}
							}
						}

						items[index++] = value
					}

					out += (i === 0 ? '' : ',') + items.join(' ')
				}
			}
		}

		out = declare + out + ';'

		if (prefix === 1 || (prefix === 2 && vendor(out, 1)))
			return webkit + out + out

		return out
	}

	/**
	 * Isolate
	 *
	 * @param {Array<string>} current
	 */
	function isolate (current) {
		for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
			// split individual elements in a selector i.e h1 h2 === [h1, h2]
			var elements = current[i].split(elementptn)
			var out = ''

			for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
				// empty element
				if ((size = (element = elements[j]).length) === 0 && l > 1) {
					continue
				}

				tail = out.charCodeAt(out.length-1)
				code = element.charCodeAt(0)
				padding = ''

				if (j !== 0) {
					// determine if we need padding
					switch (tail) {
						case STAR:
						case TILDE:
						case GREATERTHAN:
						case PLUS:
						case SPACE:
						case OPENPARENTHESES:  {
							break
						}
						default: {
							padding = ' '
						}
					}
				}

				switch (code) {
					case AND: {
						element = padding + nscopealt
					}
					case TILDE:
					case GREATERTHAN:
					case PLUS:
					case SPACE:
					case CLOSEPARENTHESES:
					case OPENPARENTHESES: {
						break
					}
					case OPENBRACKET: {
						element = padding + element + nscopealt
						break
					}
					case COLON: {
						switch (element.charCodeAt(1)*2 + element.charCodeAt(2)*3) {
							// :global
							case 530: {
								if (escape > 0) {
									element = padding + element.substring(8, size - 1)
									break
								}
							}
							// :hover, :nth-child(), ...
							default: {
								if (j < 1 || elements[j-1].length < 1) {
									element = padding + nscopealt + element
								}
							}
						}
						break
					}
					case COMMA: {
						padding = ''
					}
					default: {
						if (size > 1 && element.indexOf(':') > 0) {
							element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2')
						} else {
							element = padding + element + nscopealt
						}
					}
				}

				out += element
			}

			selector[i] = out.replace(formatptn, '').trim()
		}

		return selector
	}

	/**
	 * Proxy
	 *
	 * @param {number} context
	 * @param {string} content
	 * @param {Array<string>} selectors
	 * @param {Array<string>} parents
	 * @param {number} line
	 * @param {number} column
	 * @param {number} length
	 * @param {number} id
	 * @param {number} depth
	 * @return {(string|void|*)}
	 */
	function proxy (context, content, selectors, parents, line, column, length, id, depth) {
		for (var i = 0, out = content, next; i < plugged; ++i) {
			switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth)) {
				case void 0:
				case false:
				case true:
				case null: {
					break
				}
				default: {
					out = next
				}
			}
		}

		switch (out) {
			case void 0:
			case false:
			case true:
			case null:
			case content: {
				break
			}
			default: {
				return out
			}
		}
	}

	/**
	 * Minify
	 *
	 * @param {(string|*)} output
	 * @return {string}
	 */
	function minify (output) {
		return output
			.replace(formatptn, '')
			.replace(beforeptn, '')
			.replace(afterptn, '$1')
			.replace(tailptn, '$1')
			.replace(whiteptn, ' ')
	}

	/**
	 * Use
	 *
	 * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
	 */
	function use (plugin) {
		switch (plugin) {
			case void 0:
			case null: {
				plugged = plugins.length = 0
				break
			}
			default: {
				switch (plugin.constructor) {
					case Array: {
						for (var i = 0, length = plugin.length; i < length; ++i) {
							use(plugin[i])
						}
						break
					}
					case Function: {
						plugins[plugged++] = plugin
						break
					}
					case Boolean: {
						unkwn = !!plugin|0
					}
				}
			}
 		}

 		return use
	}

	/**
	 * Set
	 *
	 * @param {*} options
	 */
	function set (options) {
		for (var name in options) {
			var value = options[name]
			switch (name) {
				case 'keyframe': keyed = value|0; break
				case 'global': escape = value|0; break
				case 'cascade': cascade = value|0; break
				case 'compress': compress = value|0; break
				case 'semicolon': semicolon = value|0; break
				case 'preserve': preserve = value|0; break
				case 'prefix':
					should = null

					if (!value) {
						prefix = 0
					} else if (typeof value !== 'function') {
						prefix = 1
					} else {
						prefix = 2
						should = value
					}
			}
		}

		return set
	}

	/**
	 * Stylis
	 *
	 * @param {string} selector
	 * @param {string} input
	 * @return {*}
	 */
	function stylis (selector, input) {
		if (this !== void 0 && this.constructor === stylis) {
			return factory(selector)
		}

		// setup
		var ns = selector
		var code = ns.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (ns = ns.trim()).charCodeAt(0)
		}

		// keyframe/animation namespace
		if (keyed > 0) {
			key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-')
		}

		// reset, used to assert if a plugin is moneky-patching the return value
		code = 1

		// cascade/isolate
		if (cascade === 1) {
			nscope = ns
		} else {
			nscopealt = ns
		}

		var selectors = [nscope]
		var result

		// execute plugins, pre-process context
		if (plugged > 0) {
			result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0)

			if (result !== void 0 && typeof result === 'string') {
				input = result
			}
		}

		// build
		var output = compile(array, selectors, input, 0, 0)

		// execute plugins, post-process context
		if (plugged > 0) {
			result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0)

			// bypass minification
			if (result !== void 0 && typeof(output = result) !== 'string') {
				code = 0
			}
		}

		// reset
		key = ''
		nscope = ''
		nscopealt = ''
		pattern = 0
		line = 1
		column = 1

		return compress*code === 0 ? output : minify(output)
	}

	stylis['use'] = use
	stylis['set'] = set

	if (options !== void 0) {
		set(options)
	}

	return stylis
}));


/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};


/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.phone = exports.mobile = undefined;

var _styledComponents = __webpack_require__(191);

var _Container = __webpack_require__(401);

var mobile = exports.mobile = function mobile(inner) {
  return (0, _styledComponents.css)(['@media (max-width:', 'px){', ';}'], _Container.WIDE_WIDTH, inner);
};

var phone = exports.phone = function phone(inner) {
  return (0, _styledComponents.css)(['@media (max-width:', 'px){', ';}'], _Container.NORMAL_WIDTH, inner);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL21lZGlhLmpzIl0sIm5hbWVzIjpbImNzcyIsIldJREVfV0lEVEgiLCJOT1JNQUxfV0lEVEgiLCJtb2JpbGUiLCJpbm5lciIsInBob25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsQUFBUyxBQUFUOztBQUVBLEFBQVMsQUFBVCxBQUFxQixBQUFyQixBQUF5QyxBQUF6QyxBQUVBOztBQUFPLElBQU0sMEJBQVMsU0FBVCxBQUFTLGNBQUE7U0FBUyxBQUFULDBEQUNDLEFBREQsOEJBRWhCLEFBRmdCO0FBQWYsQUFNUDs7QUFBTyxJQUFNLHdCQUFRLFNBQVIsQUFBUSxhQUFBO1NBQVMsQUFBVCwwREFDRSxBQURGLGdDQUVmLEFBRmU7QUFBZCIsImZpbGUiOiJtZWRpYS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/utils/media.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/utils/media.js"); } } })();

/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIDE_PADDINGS = exports.NORMAL_WIDTH = exports.WIDE_WIDTH = undefined;

var _styledComponents = __webpack_require__(191);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _rem = __webpack_require__(224);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WIDE_WIDTH = exports.WIDE_WIDTH = 1200;
var NORMAL_WIDTH = exports.NORMAL_WIDTH = 900;
var SIDE_PADDINGS = exports.SIDE_PADDINGS = 25;

var Container = _styledComponents2.default.div.withConfig({
  displayName: 'Container',
  componentId: 'ljtdv5-0'
})(['max-width:', ';margin:0 auto;padding:0 ', 'px;box-sizing:content-box;'], function (p) {
  return p.wide ? (0, _rem.rem)(WIDE_WIDTH) : (0, _rem.rem)(NORMAL_WIDTH);
}, SIDE_PADDINGS);

exports.default = Container;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ29udGFpbmVyLmpzIl0sIm5hbWVzIjpbInN0eWxlZCIsInJlbSIsIldJREVfV0lEVEgiLCJOT1JNQUxfV0lEVEgiLCJTSURFX1BBRERJTkdTIiwiQ29udGFpbmVyIiwiZGl2IiwicCIsIndpZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBRVAsQUFBUyxBQUFXLEFBRXBCOzs7O0FBQU8sSUFBTSxrQ0FBTixBQUFtQixBQUMxQjtBQUFPLElBQU0sc0NBQU4sQUFBcUIsQUFDNUI7QUFBTyxJQUFNLHdDQUFOLEFBQXNCOztBQUU3QixJQUFNLHVDQUFBLEFBQW1CO2VBQW5CO2VBQUE7QUFBQSxDQUFZLDZFQUNILGFBQUE7U0FBTSxFQUFBLEFBQUUsT0FBTyxjQUFULEFBQVMsQUFBSSxjQUFjLGNBQWpDLEFBQWlDLEFBQUk7QUFEOUMsR0FBTixBQUFNLEFBR1MsQUFJZjs7a0JBQUEsQUFBZSIsImZpbGUiOiJDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/components/Container.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/components/Container.js"); } } })();

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slack = exports.Triangle = exports.Rect = exports.Circle = exports.LogoType = exports.CornerHandle = undefined;

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/mohammad/Documents/dev/there/there-website/components/Svgs.js";
var CornerHandle = exports.CornerHandle = function CornerHandle() {
  return _react2.default.createElement("svg", { width: "112", height: "52", viewBox: "0 0 112 52", __source: {
      fileName: _jsxFileName,
      lineNumber: 2
    }
  }, _react2.default.createElement("path", {
    fill: "#EDEDED",
    fillRule: "evenodd",
    d: "M104.5 44.5V0h7v51.5H0v-7h104.5z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    }
  }));
};

var LogoType = exports.LogoType = function LogoType() {
  return _react2.default.createElement("svg", { width: "192", height: "54", viewBox: "0 0 192 54", __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement("path", {
    fill: "#474747",
    fillRule: "evenodd",
    d: "M44.6 53c-2.8 0-4.2-.8-4.2-2.3V2.2C40.4.7 41.8 0 44.6 0h2c2.7 0 4.1.7 4.1 2.2v18.2a14 14 0 0 1 4.3-3.5 12 12 0 0 1 5.6-1.3c3.6 0 6.2 1 8 2.8 1.7 1.8 2.6 4.7 2.6 8.6v23.7c0 1.5-1.4 2.2-4.2 2.2h-2c-2.8 0-4.2-.7-4.2-2.2V28.5c0-2.9-1.5-4.4-4.5-4.4a5 5 0 0 0-3.3 1.3c-1 .8-1.7 1.7-2.3 2.8v22.5c0 1.5-1.4 2.2-4.2 2.2h-2zm-27.2 0c-2.8 0-4.2-.8-4.2-2.3V12.9H2.1c-.7 0-1.3-.2-1.6-.8-.3-.5-.5-1.4-.5-2.7V7.3C0 6 .2 5.2.5 4.6c.3-.5.9-.8 1.6-.8h33.1c.8 0 1.3.3 1.6.8.3.6.5 1.5.5 2.7v2.1c0 1.3-.2 2.2-.5 2.7-.3.6-.8.8-1.6.8H24.1v37.8c0 1.5-1.4 2.2-4.2 2.2h-2.5zm63.3-4.6c3 3.3 7.6 5 13.7 5A29.2 29.2 0 0 0 105 51c1.4-.8 2.1-1.7 2.1-2.8 0-.5-.2-1.1-.6-2-.4-.8-.8-1.6-1.5-2.3-.5-.7-1-1-1.5-1l-1.5.5a42 42 0 0 1-3.4 1.2c-1 .3-2.3.4-3.6.4-2.4 0-4.3-.5-5.6-1.6-1.4-1.1-2.2-3-2.4-5.7h17.8c.5 0 1.2-.5 2.1-1.6 1-1.1 1.5-2 1.5-2.5 0-5.4-1.2-9.7-3.7-13-2.4-3.4-6.2-5-11.4-5-5.3 0-9.5 1.4-12.5 4.5s-4.5 8-4.5 14.5c0 5.9 1.5 10.4 4.5 13.7zM97 25.8c.8 1.2 1.2 3 1.2 5H87c.7-4.6 2.8-7 6.3-7 1.7 0 3 .7 3.8 2zm20.4 27.1c-2.8 0-4.2-.7-4.2-2.2V28.5a39 39 0 0 0-.6-8.4c-.2-.7-.2-1.2-.2-1.5 0-.7 1-1.3 2.8-1.7 1.9-.3 3.6-.5 5-.5.9 0 1.4.3 1.8 1l.7 2 .3 1.5c.9-1.6 2-2.9 3-3.8a7 7 0 0 1 4.6-1.5c1.5 0 2.6.4 3.1 1.2a4 4 0 0 1 1 2.6c0 1-.3 2.2-.7 3.7-.4 1.4-1 2.2-1.5 2.2L131 25l-1.8-.3c-1.3 0-2.4.4-3.4 1.1a9 9 0 0 0-2.2 2.4v22.5c0 1.5-1.4 2.2-4.2 2.2h-2zm22.4-4.5c3 3.3 7.7 5 13.8 5A29.2 29.2 0 0 0 164 51c1.5-.8 2.2-1.7 2.2-2.8 0-.5-.2-1.1-.6-2-.4-.8-.9-1.6-1.5-2.3-.5-.7-1-1-1.5-1l-1.6.5-3.3 1.2c-1.1.3-2.3.4-3.6.4-2.4 0-4.3-.5-5.7-1.6-1.3-1.1-2.1-3-2.3-5.7h17.8c.5 0 1.2-.5 2.1-1.6 1-1.1 1.5-2 1.5-2.5 0-5.4-1.3-9.7-3.7-13-2.5-3.4-6.3-5-11.4-5-5.4 0-9.5 1.4-12.6 4.5-3 3.1-4.5 8-4.5 14.5 0 5.9 1.5 10.4 4.5 13.7zm16.3-22.6c.9 1.2 1.3 3 1.3 5h-11.3c.7-4.6 2.8-7 6.3-7 1.6 0 2.9.7 3.7 2zm28.5-12c.2.2.4.3.7.3h.4c.3 0 .5 0 .7-.3l2-3.5c0-.3.2-.5.3-.6v6.6c0 .3.4.5 1 .5h.5c.6 0 1-.2 1-.5V6.1c0-.4-.4-.6-1-.6h-.9c-.5 0-.8.2-1 .5l-2.7 4.7-.1.3-.2-.3-2.6-4.7c-.2-.3-.5-.5-1-.5h-.9c-.6 0-1 .2-1 .6v10.2c0 .3.4.5 1 .5h.5c.6 0 1-.2 1-.5V9.7l.3.6 2 3.5zm-11 2.5c0 .3.3.5 1 .5h.5c.7 0 1-.2 1-.5V7.7h2.5c.2 0 .3 0 .4-.2l.1-.6v-.5l-.1-.6c0-.2-.2-.2-.4-.2H171c-.1 0-.2 0-.3.2l-.1.6v1.1l.4.2h2.6v8.6z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }));
};

var Circle = exports.Circle = function Circle() {
  return _react2.default.createElement("svg", { width: "45", height: "45", viewBox: "0 0 45 45", __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, _react2.default.createElement("path", {
    fill: "#78EFFF",
    d: "M45 22.5a22.5 22.5 0 1 1-45 0 22.5 22.5 0 0 1 45 0z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }));
};

var Rect = exports.Rect = function Rect() {
  return _react2.default.createElement("svg", { width: "22", height: "44", __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, _react2.default.createElement("path", { fill: "#FAEA5A", d: "M0 0h22v44H0V0z", __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }));
};

var Triangle = exports.Triangle = function Triangle() {
  return _react2.default.createElement("svg", { width: "52", height: "45", __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }, _react2.default.createElement("path", { fill: "#FFBD70", d: "M30 0l26 45H4L30 0z", __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    }
  }));
};

var Slack = exports.Slack = function Slack() {
  return _react2.default.createElement("svg", { width: "66", height: "66", __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    }
  }, _react2.default.createElement("path", {
    fill: "#2D333A",
    transform: "rotate(-18.5 106.5 -68.2)",
    d: "M9.3 0H0v9h9.3V0z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  }), _react2.default.createElement("path", {
    fill: "#2D333A",
    d: "M63.2 24C56.4 1.1 46.6-4 24 2.7 1.2 9.6-4 19.4 2.8 42 9.6 64.8 19.4 70 42 63.2 64.8 56.4 70 46.6 63.2 24zM51.8 38.5l-4.3 1.5 1.5 4.4c.6 1.8-.4 3.7-2.2 4.3a3.5 3.5 0 0 1-4.3-2.2L41 42.3l-8.8 3 1.5 4.4c.6 1.8-.4 3.8-2.2 4.3a3.5 3.5 0 0 1-4.3-2.2l-1.5-4.3-4.3 1.4a3.5 3.5 0 0 1-4.3-2.2c-.6-1.8.4-3.7 2.2-4.3l4.3-1.4-2.9-8.5-4.3 1.4a3.5 3.5 0 0 1-4.3-2.2c-.6-1.8.4-3.7 2.2-4.3l4.2-1.4-1.4-4.5a3.4 3.4 0 0 1 6.5-2.1l1.4 4.4 8.8-3-1.4-4.4a3.4 3.4 0 0 1 6.5-2.1l1.4 4.4 4.3-1.4a3.4 3.4 0 0 1 2.2 6.5L42.5 25l2.8 8.5 4.3-1.4a3.4 3.4 0 0 1 2.2 6.4z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3Zncy5qcyJdLCJuYW1lcyI6WyJDb3JuZXJIYW5kbGUiLCJMb2dvVHlwZSIsIkNpcmNsZSIsIlJlY3QiLCJUcmlhbmdsZSIsIlNsYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7QUFBTyxJQUFNLHNDQUFlLFNBQWYsQUFBZSxlQUFBO3lCQUMxQixjQUFBLFNBQUssT0FBTCxBQUFXLE9BQU0sUUFBakIsQUFBd0IsTUFBSyxTQUE3QixBQUFxQztnQkFBckM7a0JBQUEsQUFDRTtBQURGO0dBQUE7VUFDRSxBQUNPLEFBQ0w7Y0FGRixBQUVXLEFBQ1Q7T0FIRixBQUdJOztnQkFISjtrQkFGd0IsQUFDMUIsQUFDRTtBQUFBO0FBQ0U7QUFIQyxBQVVQOztBQUFPLElBQU0sOEJBQVcsU0FBWCxBQUFXLFdBQUE7eUJBQ3RCLGNBQUEsU0FBSyxPQUFMLEFBQVcsT0FBTSxRQUFqQixBQUF3QixNQUFLLFNBQTdCLEFBQXFDO2dCQUFyQztrQkFBQSxBQUNFO0FBREY7R0FBQTtVQUNFLEFBQ08sQUFDTDtjQUZGLEFBRVcsQUFDVDtPQUhGLEFBR0k7O2dCQUhKO2tCQUZvQixBQUN0QixBQUNFO0FBQUE7QUFDRTtBQUhDLEFBVVA7O0FBQU8sSUFBTSwwQkFBUyxTQUFULEFBQVMsU0FBQTt5QkFDcEIsY0FBQSxTQUFLLE9BQUwsQUFBVyxNQUFLLFFBQWhCLEFBQXVCLE1BQUssU0FBNUIsQUFBb0M7Z0JBQXBDO2tCQUFBLEFBQ0U7QUFERjtHQUFBO1VBQ0UsQUFDTyxBQUNMO09BRkYsQUFFSTs7Z0JBRko7a0JBRmtCLEFBQ3BCLEFBQ0U7QUFBQTtBQUNFO0FBSEMsQUFTUDs7QUFBTyxJQUFNLHNCQUFPLFNBQVAsQUFBTyxPQUFBO3lCQUNsQixjQUFBLFNBQUssT0FBTCxBQUFXLE1BQUssUUFBaEIsQUFBdUI7Z0JBQXZCO2tCQUFBLEFBQ0U7QUFERjtHQUFBLDBDQUNRLE1BQU4sQUFBVyxXQUFVLEdBQXJCLEFBQXVCO2dCQUF2QjtrQkFGZ0IsQUFDbEIsQUFDRTtBQUFBOztBQUZHLEFBTVA7O0FBQU8sSUFBTSw4QkFBVyxTQUFYLEFBQVcsV0FBQTt5QkFDdEIsY0FBQSxTQUFLLE9BQUwsQUFBVyxNQUFLLFFBQWhCLEFBQXVCO2dCQUF2QjtrQkFBQSxBQUNFO0FBREY7R0FBQSwwQ0FDUSxNQUFOLEFBQVcsV0FBVSxHQUFyQixBQUF1QjtnQkFBdkI7a0JBRm9CLEFBQ3RCLEFBQ0U7QUFBQTs7QUFGRyxBQU1QOztBQUFPLElBQU0sd0JBQVEsU0FBUixBQUFRLFFBQUE7eUJBQ25CLGNBQUEsU0FBSyxPQUFMLEFBQVcsTUFBSyxRQUFoQixBQUF1QjtnQkFBdkI7a0JBQUEsQUFDRTtBQURGO0dBQUE7VUFDRSxBQUNPLEFBQ0w7ZUFGRixBQUVZLEFBQ1Y7T0FIRixBQUdJOztnQkFISjtrQkFERixBQUNFLEFBS0E7QUFMQTtBQUNFO1VBSUYsQUFDTyxBQUNMO09BRkYsQUFFSTs7Z0JBRko7a0JBUGlCLEFBQ25CLEFBTUU7QUFBQTtBQUNFO0FBUkMiLCJmaWxlIjoiU3Zncy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/components/Svgs.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/components/Svgs.js"); } } })();

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(408);


/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(191);

var _theme = __webpack_require__(409);

var _theme2 = _interopRequireDefault(_theme);

var _Hero = __webpack_require__(410);

var _Hero2 = _interopRequireDefault(_Hero);

var _Quote = __webpack_require__(414);

var _Quote2 = _interopRequireDefault(_Quote);

var _Features = __webpack_require__(415);

var _Features2 = _interopRequireDefault(_Features);

var _IsItReady = __webpack_require__(417);

var _IsItReady2 = _interopRequireDefault(_IsItReady);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/pages/index.js?entry';

exports.default = function () {
  return _react2.default.createElement(_styledComponents.ThemeProvider, { theme: _theme2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement(_Hero2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), _react2.default.createElement(_Quote2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement(_Features2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }), _react2.default.createElement(_IsItReady2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  })));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlRoZW1lUHJvdmlkZXIiLCJ0aGVtZSIsIkhlcm8iLCJRdW90ZSIsIkZlYXR1cmVzIiwiSXNJdFJlYWR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBUzs7QUFFVCxBQUFPLEFBQVc7Ozs7QUFDbEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBVzs7OztBQUNsQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFlLEFBRXRCOzs7Ozs7OztrQkFBZSxZQUFBO3lCQUNiLEFBQUMsaURBQUQsQUFBZSxBQUFPO2dCQUF0QjtrQkFBQSxBQUNFO0FBREY7R0FBQSxrQkFDRSxjQUFBOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRSxBQUFDOztnQkFBRDtrQkFERixBQUNFLEFBQ0E7QUFEQTtBQUFBLHNCQUNBLEFBQUM7O2dCQUFEO2tCQUZGLEFBRUUsQUFDQTtBQURBO0FBQUEsc0JBQ0EsQUFBQzs7Z0JBQUQ7a0JBSEYsQUFHRSxBQUNBO0FBREE7QUFBQSxzQkFDQSxBQUFDOztnQkFBRDtrQkFOUyxBQUNiLEFBQ0UsQUFJRTtBQUFBO0FBQUE7QUFOTiIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/pages/index.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(85)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  colors: {
    greyText: '#777',
    mutedText: '#B3B3B3',
    darkText: '#444',
    lightGreen: '#DDE8D8',
    green: '#44C285'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3RoZW1lLmpzIl0sIm5hbWVzIjpbImNvbG9ycyIsImdyZXlUZXh0IiwibXV0ZWRUZXh0IiwiZGFya1RleHQiLCJsaWdodEdyZWVuIiwiZ3JlZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Y0FDVSxBQUNJLEFBQ1Y7ZUFGTSxBQUVLLEFBQ1g7Y0FITSxBQUdJLEFBQ1Y7Z0JBSk0sQUFJTSxBQUNaO1dBTkosQUFBZSxBQUNMLEFBS0M7QUFMRCxBQUNOO0FBRlcsQUFDYiIsImZpbGUiOiJ0aGVtZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/utils/theme.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/utils/theme.js"); } } })();

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(191);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _polished = __webpack_require__(411);

var _media = __webpack_require__(400);

var _Container = __webpack_require__(401);

var _AppScreenshot = __webpack_require__(412);

var _AppScreenshot2 = _interopRequireDefault(_AppScreenshot);

var _Svgs = __webpack_require__(406);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/sections/Hero.js';


var Hero = function Hero() {
  return _react2.default.createElement(Wrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(ContentWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement(Photo, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, _react2.default.createElement(_AppScreenshot2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  })), _react2.default.createElement(Texts, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  })));
};

exports.default = Hero;


var Texts = function Texts() {
  return _react2.default.createElement(TextsWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, _react2.default.createElement(IconImage, { src: '/static/there-icon.svg', alt: 'There\u2122 app', __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }), _react2.default.createElement(LogoTypeWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement(_Svgs.LogoType, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  })), _react2.default.createElement(Description, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    }
  }, 'Your friends & teammates\' time? Ah, There!'), _react2.default.createElement(DownloadSection, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, _react2.default.createElement(DownloadButton, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, 'Download'), _react2.default.createElement(DownloadNotes, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, 'Available for macOS, other platforms soon!')));
};

var Wrapper = _styledComponents2.default.header.withConfig({
  displayName: 'Hero__Wrapper',
  componentId: 'prn8p6-0'
})(['display:grid;grid-template-columns:1fr minmax(auto,', 'px) 1fr;padding-top:70px;', ';'], _Container.WIDE_WIDTH, (0, _media.phone)((0, _styledComponents.css)(['grid-template-columns:1fr;'])));

var ContentWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__ContentWrapper',
  componentId: 'prn8p6-1'
})(['grid-column:1 / 3;display:flex;', ';'], (0, _media.phone)((0, _styledComponents.css)(['grid-column:1;flex-direction:column;'])));

var Photo = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__Photo',
  componentId: 'prn8p6-2'
})(['flex:0 1 auto;display:flex;flex-direction:row-reverse;overflow:hidden;padding-right:80px;padding-bottom:30px;padding-top:10px;', ';', ';'], (0, _media.mobile)((0, _styledComponents.css)(['padding-right:50px;'])), (0, _media.phone)((0, _styledComponents.css)(['order:2;padding:15px 0;margin-top:90px;'])));

var TextsWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__TextsWrapper',
  componentId: 'prn8p6-3'
})(['flex:1 0 320px;padding-top:80px;', ';', ';'], (0, _media.mobile)((0, _styledComponents.css)(['padding-top:40px;padding-right:40px;'])), (0, _media.phone)((0, _styledComponents.css)(['padding-top:0;padding-right:40px;padding-left:', 'px;'], _Container.SIDE_PADDINGS)));

var IconImage = _styledComponents2.default.img.withConfig({
  displayName: 'Hero__IconImage',
  componentId: 'prn8p6-4'
})(['display:block;']);

var LogoTypeWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__LogoTypeWrapper',
  componentId: 'prn8p6-5'
})(['margin-top:40px;', ';'], (0, _media.phone)((0, _styledComponents.css)(['margin-top:30px;'])));

var Description = _styledComponents2.default.p.withConfig({
  displayName: 'Hero__Description',
  componentId: 'prn8p6-6'
})(['margin:25px 0 0 0;color:', ';', ';'], function (p) {
  return p.theme.colors.greyText;
}, (0, _media.phone)((0, _styledComponents.css)(['margin:20px 0 0 0;'])));

var DownloadSection = _styledComponents2.default.div.withConfig({
  displayName: 'Hero__DownloadSection',
  componentId: 'prn8p6-7'
})(['margin-top:70px;display:flex;align-items:center;', ';'], (0, _media.phone)((0, _styledComponents.css)(['margin-top:50px;'])));

var DownloadButton = _styledComponents2.default.button.withConfig({
  displayName: 'Hero__DownloadButton',
  componentId: 'prn8p6-8'
})(['flex:0 0 auto;padding:10px 17px;font-size:20px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;background:', ';color:', ';border:none;&:hover{background:', ';}'], function (p) {
  return p.theme.colors.lightGreen;
}, function (p) {
  return p.theme.colors.green;
}, function (p) {
  return (0, _polished.darken)(0.1, p.theme.colors.lightGreen);
});

var DownloadNotes = _styledComponents2.default.p.withConfig({
  displayName: 'Hero__DownloadNotes',
  componentId: 'prn8p6-9'
})(['font-size:14px;margin:0 0 0 10px;color:', ';'], function (p) {
  return p.theme.colors.mutedText;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3Rpb25zL0hlcm8uanMiXSwibmFtZXMiOlsic3R5bGVkIiwiY3NzIiwiZGFya2VuIiwibW9iaWxlIiwicGhvbmUiLCJXSURFX1dJRFRIIiwiU0lERV9QQURESU5HUyIsIkFwcFNjcmVlbnNob3QiLCJMb2dvVHlwZSIsIkhlcm8iLCJUZXh0cyIsIldyYXBwZXIiLCJoZWFkZXIiLCJDb250ZW50V3JhcHBlciIsImRpdiIsIlBob3RvIiwiVGV4dHNXcmFwcGVyIiwiSWNvbkltYWdlIiwiaW1nIiwiTG9nb1R5cGVXcmFwcGVyIiwiRGVzY3JpcHRpb24iLCJwIiwidGhlbWUiLCJjb2xvcnMiLCJncmV5VGV4dCIsIkRvd25sb2FkU2VjdGlvbiIsIkRvd25sb2FkQnV0dG9uIiwiYnV0dG9uIiwibGlnaHRHcmVlbiIsImdyZWVuIiwiRG93bmxvYWROb3RlcyIsIm11dGVkVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFTOztBQUVULEFBQVMsQUFBUSxBQUFhOztBQUM5QixBQUFTLEFBQVksQUFBcUI7O0FBQzFDLEFBQU8sQUFBbUI7Ozs7QUFDMUIsQUFBUyxBQUFnQjs7Ozs7OztBQUV6QixJQUFNLE9BQU8sU0FBUCxBQUFPLE9BQUE7eUJBQ1YsY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRyxjQUFEOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRyxjQUFEOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRSxBQUFDOztnQkFBRDtrQkFGSixBQUNFLEFBQ0UsQUFFRjtBQUZFO0FBQUEscUNBRUYsQUFBQzs7Z0JBQUQ7a0JBTk8sQUFDWCxBQUNFLEFBSUU7QUFBQTtBQUFBO0FBTk4sQUFXQTs7a0JBQUEsQUFBZTs7O0FBRWYsSUFBTSxRQUFRLFNBQVIsQUFBUSxRQUFBO3lCQUNYLGNBQUQ7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsZ0NBQ0UsQUFBQyxhQUFVLEtBQVgsQUFBZSwwQkFBeUIsS0FBeEMsQUFBNEM7Z0JBQTVDO2tCQURGLEFBQ0UsQUFDQTtBQURBO3NCQUNDLGNBQUQ7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLHFCQUNFLEFBQUM7O2dCQUFEO2tCQUhKLEFBRUUsQUFDRSxBQUVGO0FBRkU7QUFBQSx1QkFFRCxjQUFEOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FMRixBQUtFLEFBQ0EsZ0VBQUMsY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0csY0FBRDs7Z0JBQUE7a0JBQUE7QUFBQTtBQUFBLEtBREYsQUFDRSxBQUNBLDZCQUFDLGNBQUQ7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQVRRLEFBQ1osQUFNRSxBQUVFO0FBVE47O0FBY0EsSUFBTSxxQ0FBQSxBQUFpQjtlQUFqQjtlQUFBO0FBQUEsQ0FBVSx1RkFBVixBQUVzQyw2QkFJeEMsa0JBQUEsQUFBTSw0QkFOVixBQUFNOztBQVdOLElBQU0sNENBQUEsQUFBd0I7ZUFBeEI7ZUFBQTtBQUFBLENBQWlCLDRDQUluQixrQkFBQSxBQUFNLDRCQUpWLEFBQU07O0FBVU4sSUFBTSxtQ0FBQSxBQUFlO2VBQWY7ZUFBQTtBQUFBLENBQVEsZ0pBV1YsbUJBQUEsQUFBTyw0QkFYTCwwQkFlRixrQkFBQSxBQUFNLDRCQWZWLEFBQU07O0FBc0JOLElBQU0sMENBQUEsQUFBc0I7ZUFBdEI7ZUFBQTtBQUFBLENBQWUsa0RBSWpCLG1CQUFBLEFBQU8sNEJBSkwsMkNBU0Ysa0JBQUEsQUFBTSw4RUFUVixBQUFNLEFBU0YsQUFHZ0I7O0FBSXBCLElBQU0sdUNBQUEsQUFBbUI7ZUFBbkI7ZUFBQTtBQUFBLENBQVksR0FBbEI7O0FBSUEsSUFBTSw2Q0FBQSxBQUF5QjtlQUF6QjtlQUFBO0FBQUEsQ0FBa0IsNkJBR3BCLGtCQUFBLEFBQU0sNEJBSFYsQUFBTTs7QUFRTixJQUFNLHlDQUFBLEFBQXFCO2VBQXJCO2VBQUE7QUFBQSxDQUFjLDBDQUVULGFBQUE7U0FBSyxFQUFBLEFBQUUsTUFBRixBQUFRLE9BQWIsQUFBb0I7QUFGekIsR0FJRixrQkFBQSxBQUFNLDRCQUpWLEFBQU07O0FBU04sSUFBTSw2Q0FBQSxBQUF5QjtlQUF6QjtlQUFBO0FBQUEsQ0FBa0IsNkRBTXBCLGtCQUFBLEFBQU0sNEJBTlYsQUFBTTs7QUFXTixJQUFNLDRDQUFBLEFBQXdCO2VBQXhCO2VBQUE7QUFBQSxDQUFpQixxTEFTUCxhQUFBO1NBQUssRUFBQSxBQUFFLE1BQUYsQUFBUSxPQUFiLEFBQW9CO0FBVDlCLEdBVUssYUFBQTtTQUFLLEVBQUEsQUFBRSxNQUFGLEFBQVEsT0FBYixBQUFvQjtBQVZ6QixHQWNZLGFBQUE7U0FBSyxzQkFBQSxBQUFPLEtBQUssRUFBQSxBQUFFLE1BQUYsQUFBUSxPQUF6QixBQUFLLEFBQTJCO0FBZGxELEFBQU07O0FBa0JOLElBQU0sMkNBQUEsQUFBdUI7ZUFBdkI7ZUFBQTtBQUFBLENBQWdCLG9EQUdYLGFBQUE7U0FBSyxFQUFBLEFBQUUsTUFBRixBQUFRLE9BQWIsQUFBb0I7QUFIL0IsQUFBTSIsImZpbGUiOiJIZXJvLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tb2hhbW1hZC9Eb2N1bWVudHMvZGV2L3RoZXJlL3RoZXJlLXdlYnNpdGUifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/sections/Hero.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/sections/Hero.js"); } } })();

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustHue", function() { return curriedAdjustHue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animation", function() { return animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundImages", function() { return backgroundImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgrounds", function() { return backgrounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderColor", function() { return borderColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderRadius", function() { return borderRadius; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderStyle", function() { return borderStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderWidth", function() { return borderWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buttons", function() { return buttons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearFix", function() { return clearFix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "complement", function() { return complement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darken", function() { return curriedDarken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "desaturate", function() { return curriedDesaturate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directionalProperty", function() { return directionalProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ellipsis", function() { return ellipsis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "em", function() { return em; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontFace", function() { return fontFace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLuminance", function() { return getLuminance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grayscale", function() { return grayscale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideText", function() { return hideText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideVisually", function() { return hideVisually; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hiDPI", function() { return hiDPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return hsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsla", function() { return hsla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lighten", function() { return curriedLighten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "margin", function() { return margin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mix", function() { return curriedMix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modularScale", function() { return modularScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opacify", function() { return curriedOpacify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "padding", function() { return padding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseToHsl", function() { return parseToHsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseToRgb", function() { return parseToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placeholder", function() { return placeholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "position", function() { return position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radialGradient", function() { return radialGradient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readableColor", function() { return curriedReadableColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rem", function() { return rem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retinaImage", function() { return retinaImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgba", function() { return rgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saturate", function() { return curriedSaturate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selection", function() { return selection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHue", function() { return curriedSetHue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLightness", function() { return curriedSetLightness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSaturation", function() { return curriedSetSaturation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shade", function() { return curriedShade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "size", function() { return size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripUnit", function() { return stripUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textInputs", function() { return textInputs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timingFunctions", function() { return timingFunctions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tint", function() { return curriedTint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toColorString", function() { return toColorString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitions", function() { return transitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transparentize", function() { return curriedTransparentize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triangle", function() { return triangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wordWrap", function() { return wordWrap; });
//      

// @private
function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//      
var positionMap = ['Top', 'Right', 'Bottom', 'Left'];

function generateProperty(property, position) {
  if (!property) return position.toLowerCase();
  var splitProperty = property.split('-');
  if (splitProperty.length > 1) {
    splitProperty.splice(1, 0, position);
    return splitProperty.reduce(function (acc, val) {
      return '' + acc + capitalizeString(val);
    });
  }
  var joinedProperty = property.replace(/([a-z])([A-Z])/g, '$1' + position + '$2');
  return property === joinedProperty ? '' + property + position : joinedProperty;
}

function generateStyles(property, valuesWithDefaults) {
  var styles = {};
  for (var i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
      styles[generateProperty(property, positionMap[i])] = valuesWithDefaults[i];
    }
  }
  return styles;
}

/**
 * A helper that enables shorthand for direction based properties. It accepts a property (hyphenated or camelCased) and up to four values that map to top, right, bottom, and left, respectively. You can optionally pass an empty string to get only the directional values as properties. You can also optionally pass a null argument for a directional value to ignore it.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...directionalProperty('padding', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${directionalProperty('padding', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */

function directionalProperty(property) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  //  prettier-ignore
  var firstValue = values[0],
      _values$ = values[1],
      secondValue = _values$ === undefined ? firstValue : _values$,
      _values$2 = values[2],
      thirdValue = _values$2 === undefined ? firstValue : _values$2,
      _values$3 = values[3],
      fourthValue = _values$3 === undefined ? secondValue : _values$3;

  var valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  return generateStyles(property, valuesWithDefaults);
}

//      

/**
 * Check if a string ends with something
 * @private
 */
var endsWith = function (string, suffix) {
  return string.substr(-suffix.length) === suffix;
};

//      

/**
 * Strip the unit from a given CSS value, returning just the number. (or the original value if an invalid string was passed)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': stripUnit('100px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${stripUnit('100px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100
 * }
 */

function stripUnit(value) {
  var unitlessValue = parseFloat(value);
  if (isNaN(unitlessValue)) return value;
  return unitlessValue;
}

//      

/**
 * Factory function that creates pixel-to-x converters
 * @private
 */
var pxtoFactory = function pxtoFactory(to) {
  return function (pxval) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '16px';

    var newPxval = pxval;
    var newBase = base;
    if (typeof pxval === 'string') {
      if (!endsWith(pxval, 'px')) {
        throw new Error('Expected a string ending in "px" or a number passed as the first argument to ' + to + '(), got "' + pxval + '" instead.');
      }
      newPxval = stripUnit(pxval);
    }

    if (typeof base === 'string') {
      if (!endsWith(base, 'px')) {
        throw new Error('Expected a string ending in "px" or a number passed as the second argument to ' + to + '(), got "' + base + '" instead.');
      }
      newBase = stripUnit(base);
    }

    if (typeof newPxval === 'string') {
      throw new Error('Passed invalid pixel value ("' + pxval + '") to ' + to + '(), please pass a value like "12px" or 12.');
    }

    if (typeof newBase === 'string') {
      throw new Error('Passed invalid base value ("' + base + '") to ' + to + '(), please pass a value like "12px" or 12.');
    }

    return '' + newPxval / newBase + to;
  };
};

//      
/**
 * Convert pixel value to ems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': em('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${em('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1em'
 * }
 */

var em = /*#__PURE__*/pxtoFactory('em');

//      

var ratioNames = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4
};

/** */

/**
 * Establish consistent measurements and spacial relationships throughout your projects by incrementing up or down a defined scale. We provide a list of commonly used scales as pre-defined variables, see below.
 * @example
 * // Styles as object usage
 * const styles = {
 *    // Increment two steps up the default scale
 *   'fontSize': modularScale(2)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *    // Increment two steps up the default scale
 *   fontSize: ${modularScale(2)}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'fontSize': '1.77689em'
 * }
 */
function modularScale(steps) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1em';
  var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'perfectFourth';

  if (typeof steps !== 'number') {
    throw new Error('Please provide a number of steps to the modularScale helper.');
  }
  if (typeof ratio === 'string' && !ratioNames[ratio]) {
    throw new Error('Please pass a number or one of the predefined scales to the modularScale helper as the ratio.');
  }

  var realBase = typeof base === 'string' ? stripUnit(base) : base;
  var realRatio = typeof ratio === 'string' ? ratioNames[ratio] : ratio;

  if (typeof realBase === 'string') {
    throw new Error('Invalid value passed as base to modularScale, expected number or em string but got "' + base + '"');
  }

  return realBase * Math.pow(realRatio, steps) + 'em';
}

//      

/**
 * Convert pixel value to rems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': rem('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${rem('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1rem'
 * }
 */

var rem = /*#__PURE__*/pxtoFactory('rem');

//      

/**
 * CSS to contain a float (credit to CSSMojo).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...clearFix(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${clearFix()}
 * `
 *
 * // CSS as JS Output
 *
 * '&::after': {
 *   'clear': 'both',
 *   'content': '""',
 *   'display': 'table'
 * }
 */

function clearFix() {
  var _ref;

  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '&';

  var pseudoSelector = parent + '::after';
  return _ref = {}, _ref[pseudoSelector] = {
    clear: 'both',
    content: '""',
    display: 'table'
  }, _ref;
}

//      

/**
 * CSS to represent truncated text with an ellipsis.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...ellipsis('250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${ellipsis('250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'display': 'inline-block',
 *   'maxWidth': '250px',
 *   'overflow': 'hidden',
 *   'textOverflow': 'ellipsis',
 *   'whiteSpace': 'nowrap',
 *   'wordWrap': 'normal'
 * }
 */

function ellipsis() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '100%';

  return {
    display: 'inline-block',
    maxWidth: width,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'normal'
  };
}

//      

/** */

function generateFileReferences(fontFilePath, fileFormats) {
  var fileFontReferences = fileFormats.map(function (format) {
    return 'url("' + fontFilePath + '.' + format + '")';
  });
  return fileFontReferences.join(', ');
}

function generateLocalReferences(localFonts) {
  var localFontReferences = localFonts.map(function (font) {
    return 'local("' + font + '")';
  });
  return localFontReferences.join(', ');
}

function generateSources(fontFilePath, localFonts, fileFormats) {
  var fontReferences = [];
  if (localFonts) fontReferences.push(generateLocalReferences(localFonts));
  if (fontFilePath) {
    fontReferences.push(generateFileReferences(fontFilePath, fileFormats));
  }
  return fontReferences.join(', ');
}

/**
 * CSS for a @font-face declaration.
 *
 * @example
 * // Styles as object basic usage
 * const styles = {
 *    ...fontFace({
 *      'fontFamily': 'Sans-Pro'
 *      'fontFilePath': 'path/to/file'
 *    })
 * }
 *
 * // styled-components basic usage
 * injectGlobal`${
 *   fontFace({
 *     'fontFamily': 'Sans-Pro'
 *     'fontFilePath': 'path/to/file'
 *   }
 * )}`
 *
 * // CSS as JS Output
 *
 * '@font-face': {
 *   'fontFamily': 'Sans-Pro',
 *   'src': 'url("path/to/file.eot"), url("path/to/file.woff2"), url("path/to/file.woff"), url("path/to/file.ttf"), url("path/to/file.svg")',
 * }
 */

function fontFace(_ref) {
  var fontFamily = _ref.fontFamily,
      fontFilePath = _ref.fontFilePath,
      fontStretch = _ref.fontStretch,
      fontStyle = _ref.fontStyle,
      fontVariant = _ref.fontVariant,
      fontWeight = _ref.fontWeight,
      _ref$fileFormats = _ref.fileFormats,
      fileFormats = _ref$fileFormats === undefined ? ['eot', 'woff2', 'woff', 'ttf', 'svg'] : _ref$fileFormats,
      localFonts = _ref.localFonts,
      unicodeRange = _ref.unicodeRange;

  // Error Handling
  if (!fontFamily) throw new Error('fontFace expects a name of a font-family.');
  if (!fontFilePath && !localFonts) {
    throw new Error('fontFace expects either the path to the font file(s) or a name of a local copy.');
  }
  if (localFonts && !Array.isArray(localFonts)) {
    throw new Error('fontFace expects localFonts to be an array.');
  }
  if (!Array.isArray(fileFormats)) {
    throw new Error('fontFace expects fileFormats to be an array.');
  }

  var fontFaceDeclaration = {
    '@font-face': {
      fontFamily: fontFamily,
      src: generateSources(fontFilePath, localFonts, fileFormats),
      unicodeRange: unicodeRange,
      fontStretch: fontStretch,
      fontStyle: fontStyle,
      fontVariant: fontVariant,
      fontWeight: fontWeight
    }
  };

  // Removes undefined fields for cleaner css object.
  return JSON.parse(JSON.stringify(fontFaceDeclaration));
}

//      

/**
 * CSS to hide text to show a background image in a SEO-friendly way.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'backgroundImage': 'url(logo.png)',
 *   ...hideText(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   backgroundImage: url(logo.png);
 *   ${hideText()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'backgroundImage': 'url(logo.png)',
 *   'textIndent': '101%',
 *   'overflow': 'hidden',
 *   'whiteSpace': 'nowrap',
 * }
 */

function hideText() {
  return {
    textIndent: '101%',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
}

//      

/**
 * CSS to hide content visually but remain accessible to screen readers.
 * from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/9a176f57af1cfe8ec70300da4621fb9b07e5fa31/src/css/main.css#L121)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...hideVisually(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hideVisually()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'border': '0',
 *   'clip': 'rect(0 0 0 0)',
 *   'clipPath': 'inset(50%)',
 *   'height': '1px',
 *   'margin': '-1px',
 *   'overflow': 'hidden',
 *   'padding': '0',
 *   'position': 'absolute',
 *   'whiteSpace': 'nowrap',
 *   'width': '1px',
 * }
 */

function hideVisually() {
  return {
    border: '0',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  };
}

//      

/**
 * Generates a media query to target HiDPI devices.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  [hiDPI(1.5)]: {
 *    width: 200px;
 *  }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hiDPI(1.5)} {
 *     width: 200px;
 *   }
 * `
 *
 * // CSS as JS Output
 *
 * '@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
 *  only screen and (min--moz-device-pixel-ratio: 1.5),
 *  only screen and (-o-min-device-pixel-ratio: 1.5/1),
 *  only screen and (min-resolution: 144dpi),
 *  only screen and (min-resolution: 1.5dppx)': {
 *   'width': '200px',
 * }
 */

function hiDPI() {
  var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.3;

  return "\n    @media only screen and (-webkit-min-device-pixel-ratio: " + ratio + "),\n    only screen and (min--moz-device-pixel-ratio: " + ratio + "),\n    only screen and (-o-min-device-pixel-ratio: " + ratio + "/1),\n    only screen and (min-resolution: " + Math.round(ratio * 96) + "dpi),\n    only screen and (min-resolution: " + ratio + "dppx)\n  ";
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



























var taggedTemplateLiteralLoose = function (strings, raw) {
  strings.raw = raw;
  return strings;
};

var _opinionatedRules;
var _abbrTitle;
var _unopinionatedRules;

//      
var opinionatedRules = (_opinionatedRules = {
  html: {
    fontFamily: 'sans-serif'
  },

  body: {
    margin: '0'
  }

}, _opinionatedRules['a:active,\n  a:hover'] = {
  outlineWidth: '0'
}, _opinionatedRules['button,\n  input,\n  optgroup,\n  select,\n  textarea'] = {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  lineHeight: '1.15'
}, _opinionatedRules);

var unopinionatedRules = (_unopinionatedRules = {
  html: {
    lineHeight: '1.15',
    textSizeAdjust: '100%'
  }

}, _unopinionatedRules['article,\n  aside,\n  footer,\n  header,\n  nav,\n  section'] = {
  display: 'block'
}, _unopinionatedRules.h1 = {
  fontSize: '2em',
  margin: '0.67em 0'
}, _unopinionatedRules['figcaption,\n  figure,\n  main'] = {
  display: 'block'
}, _unopinionatedRules.figure = {
  margin: '1em 40px'
}, _unopinionatedRules.hr = {
  boxSizing: 'content-box',
  height: '0',
  overflow: 'visible'
}, _unopinionatedRules.pre = {
  fontFamily: 'monospace, monospace',
  fontSize: '1em'
}, _unopinionatedRules.a = {
  'background-color': 'transparent',
  '-webkit-text-decoration-skip': 'objects'
}, _unopinionatedRules['abbr[title]'] = (_abbrTitle = {
  borderBottom: 'none',
  textDecoration: 'underline'
}, _abbrTitle['textDecoration'] = 'underline dotted', _abbrTitle), _unopinionatedRules['b,\n  strong'] = {
  fontWeight: 'inherit'
}, _unopinionatedRules['code,\n  kbd,\n  samp'] = {
  fontFamily: 'monospace, monospace',
  fontSize: '1em'
}, _unopinionatedRules.dfn = {
  fontStyle: 'italic'
}, _unopinionatedRules.mark = {
  backgroundColor: '#ff0',
  color: '#000'
}, _unopinionatedRules.small = {
  fontSize: '80%'
}, _unopinionatedRules['sub,\n  sup'] = {
  fontSize: '75%',
  lineHeight: '0',
  position: 'relative',
  verticalAlign: 'baseline'
}, _unopinionatedRules.sub = {
  bottom: '-0.25em'
}, _unopinionatedRules.sup = {
  top: '-0.5em'
}, _unopinionatedRules['audio,\n  video'] = {
  display: 'inline-block'
}, _unopinionatedRules['audio:not([controls])'] = {
  display: 'none',
  height: '0'
}, _unopinionatedRules.img = {
  borderStyle: 'none'
}, _unopinionatedRules['svg:not(:root)'] = {
  overflow: 'hidden'
}, _unopinionatedRules['button,\n  input,\n  optgroup,\n  select,\n  textarea'] = {
  margin: '0'
}, _unopinionatedRules['button,\n  input'] = {
  overflow: 'visible'
}, _unopinionatedRules['button,\n  select'] = {
  textTransform: 'none'
}, _unopinionatedRules['button,\n  html [type="button"],\n  [type="reset"],\n  [type="submit"]'] = {
  '-webkit-appearance': 'button'
}, _unopinionatedRules['button::-moz-focus-inner,\n  [type="button"]::-moz-focus-inner,\n  [type="reset"]::-moz-focus-inner,\n  [type="submit"]::-moz-focus-inner'] = {
  borderStyle: 'none',
  padding: '0'
}, _unopinionatedRules['button:-moz-focusring,\n  [type="button"]:-moz-focusring,\n  [type="reset"]:-moz-focusring,\n  [type="submit"]:-moz-focusring'] = {
  outline: '1px dotted ButtonText'
}, _unopinionatedRules.fieldset = {
  border: '1px solid #c0c0c0',
  margin: '0 2px',
  padding: '0.35em 0.625em 0.75em'
}, _unopinionatedRules.legend = {
  boxSizing: 'border-box',
  color: 'inherit',
  display: 'table',
  maxWidth: '100%',
  padding: '0',
  whiteSpace: 'normal'
}, _unopinionatedRules.progress = {
  display: 'inline-block',
  verticalAlign: 'baseline'
}, _unopinionatedRules.textarea = {
  overflow: 'auto'
}, _unopinionatedRules['[type="checkbox"],\n  [type="radio"]'] = {
  boxSizing: 'border-box',
  padding: '0'
}, _unopinionatedRules['[type="number"]::-webkit-inner-spin-button,\n  [type="number"]::-webkit-outer-spin-button'] = {
  height: 'auto'
}, _unopinionatedRules['[type="search"]'] = {
  '-webkit-appearance': 'textfield',
  outlineOffset: '-2px'
}, _unopinionatedRules['[type="search"]::-webkit-search-cancel-button,\n  [type="search"]::-webkit-search-decoration'] = {
  '-webkit-appearance': 'none'
}, _unopinionatedRules['::-webkit-file-upload-button'] = {
  '-webkit-appearance': 'button',
  font: 'inherit'
}, _unopinionatedRules['details,\n  menu'] = {
  display: 'block'
}, _unopinionatedRules.summary = {
  display: 'list-item'
}, _unopinionatedRules.canvas = {
  display: 'inline-block'
}, _unopinionatedRules.template = {
  display: 'none'
}, _unopinionatedRules['[hidden]'] = {
  display: 'none'
}, _unopinionatedRules);

function mergeRules(baseRules, additionalRules) {
  var mergedRules = _extends({}, baseRules);
  Object.keys(additionalRules).forEach(function (key) {
    if (mergedRules[key]) {
      mergedRules[key] = _extends({}, mergedRules[key], additionalRules[key]);
    } else {
      mergedRules[key] = _extends({}, additionalRules[key]);
    }
  });
  return mergedRules;
}

/**
 * CSS to normalize abnormalities across browsers (normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...normalize(),
 * }
 *
 * // styled-components usage
 * injectGlobal`${normalize()}`
 *
 * // CSS as JS Output
 *
 * html {
 *   fontFamily: 'sans-serif',
 *   lineHeight: 1.15,
 *   textSizeAdjust: 100%,
 * } ...
 */
function normalize(excludeOpinionated) {
  if (excludeOpinionated) return unopinionatedRules;
  return mergeRules(unopinionatedRules, opinionatedRules);
}

//      

/**
 * CSS to style the placeholder pseudo-element.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...placeholder({'color': 'blue'})
 * }
 *
 * // styled-components usage
 * const div = styled.input`
 *    ${placeholder({'color': 'blue'})}
 * `
 *
 * // CSS as JS Output
 *
 * 'input': {
 *   '&:-moz-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&:-ms-input-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&::-moz-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&::-webkit-input-placeholder': {
 *     'color': 'blue',
 *   },
 * },
 */

function placeholder(styles) {
  var _ref;

  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';

  return _ref = {}, _ref[parent + '::-webkit-input-placeholder'] = _extends({}, styles), _ref[parent + ':-moz-placeholder'] = _extends({}, styles), _ref[parent + '::-moz-placeholder'] = _extends({}, styles), _ref[parent + ':-ms-input-placeholder'] = _extends({}, styles), _ref;
}

var _templateObject = /*#__PURE__*/ taggedTemplateLiteralLoose(['radial-gradient(', '', '', '', ')'], ['radial-gradient(', '', '', '', ')']);

//      

/** */

function parseFallback(colorStops) {
  return colorStops[0].split(' ')[0];
}

function constructGradientValue(literals) {
  var template = '';
  for (var i = 0; i < literals.length; i += 1) {
    template += literals[i];
    // Adds leading coma if properties preceed color-stops
    if (i === 3 && (arguments.length <= i + 1 ? undefined : arguments[i + 1]) && ((arguments.length <= 1 ? undefined : arguments[1]) || (arguments.length <= 2 ? undefined : arguments[2]) || (arguments.length <= 3 ? undefined : arguments[3]))) {
      template = template.slice(0, -1);
      template += ', ' + (arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      // No trailing space if color-stops is the only param provided
    } else if (i === 3 && (arguments.length <= i + 1 ? undefined : arguments[i + 1]) && !(arguments.length <= 1 ? undefined : arguments[1]) && !(arguments.length <= 2 ? undefined : arguments[2]) && !(arguments.length <= 3 ? undefined : arguments[3])) {
      template += '' + (arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      // Only adds substitution if it is defined
    } else if (arguments.length <= i + 1 ? undefined : arguments[i + 1]) {
      template += (arguments.length <= i + 1 ? undefined : arguments[i + 1]) + ' ';
    }
  }
  return template.trim();
}

/**
 * CSS for declaring a radial gradient, including a fallback background-color. The fallback is either the first color-stop or an explicitly passed fallback color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })}
 *`
 *
 * // CSS as JS Output
 *
 * div: {
 *   'backgroundColor': '#00FFFF',
 *   'backgroundImage': 'radial-gradient(center ellipse farthest-corner at 45px 45px, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%)',
 * }
 */

function radialGradient(_ref) {
  var colorStops = _ref.colorStops,
      extent = _ref.extent,
      fallback = _ref.fallback,
      position = _ref.position,
      shape = _ref.shape;

  if (!colorStops || colorStops.length < 2) {
    throw new Error('radialGradient requries at least 2 color-stops to properly render.');
  }
  return {
    backgroundColor: fallback || parseFallback(colorStops),
    backgroundImage: constructGradientValue(_templateObject, position, shape, extent, colorStops.join(', '))
  };
}

//      

/**
 * A helper to generate a retina background image and non-retina
 * background image. The retina background image will output to a HiDPI media query. The mixin uses
 * a _2x.png filename suffix by default.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  ...retinaImage('my-img')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${retinaImage('my-img')}
 * `
 *
 * // CSS as JS Output
 * div {
 *   backgroundImage: 'url(my-img.png)',
 *   '@media only screen and (-webkit-min-device-pixel-ratio: 1.3),
 *    only screen and (min--moz-device-pixel-ratio: 1.3),
 *    only screen and (-o-min-device-pixel-ratio: 1.3/1),
 *    only screen and (min-resolution: 144dpi),
 *    only screen and (min-resolution: 1.5dppx)': {
 *     backgroundImage: 'url(my-img_2x.png)',
 *   }
 * }
 */
function retinaImage(filename, backgroundSize) {
  var extension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'png';

  var _ref;

  var retinaFilename = arguments[3];
  var retinaSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '_2x';

  if (!filename) {
    throw new Error('Please supply a filename to retinaImage() as the first argument.');
  }
  // Replace the dot at the beginning of the passed extension if one exists
  var ext = extension.replace(/^\./, '');
  var rFilename = retinaFilename ? retinaFilename + '.' + ext : '' + filename + retinaSuffix + '.' + ext;

  return _ref = {
    backgroundImage: 'url(' + filename + '.' + ext + ')'
  }, _ref[hiDPI()] = {
    backgroundImage: 'url(' + rFilename + ')',
    backgroundSize: backgroundSize
  }, _ref;
}

//      

/**
 * CSS to style the selection pseudo-element.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...selection({
 *     'backgroundColor': 'blue'
 *   }, 'section')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${selection({'backgroundColor': 'blue'}, 'section')}
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'section::-moz-selection': {
 *     'backgroundColor':'blue',
 *   },
 *   'section::selection': {
 *     'backgroundColor': 'blue',
 *   }
 * }
 */

function selection(styles) {
  var _ref;

  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return _ref = {}, _ref[parent + '::-moz-selection'] = _extends({}, styles), _ref[parent + '::selection'] = _extends({}, styles), _ref;
}

//      

/* eslint-disable key-spacing */
var functionsMap = {
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeInCirc: 'cubic-bezier(0.600,  0.040, 0.980, 0.335)',
  easeInCubic: 'cubic-bezier(0.550,  0.055, 0.675, 0.190)',
  easeInExpo: 'cubic-bezier(0.950,  0.050, 0.795, 0.035)',
  easeInQuad: 'cubic-bezier(0.550,  0.085, 0.680, 0.530)',
  easeInQuart: 'cubic-bezier(0.895,  0.030, 0.685, 0.220)',
  easeInQuint: 'cubic-bezier(0.755,  0.050, 0.855, 0.060)',
  easeInSine: 'cubic-bezier(0.470,  0.000, 0.745, 0.715)',

  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeOutCubic: 'cubic-bezier(0.215,  0.610, 0.355, 1.000)',
  easeOutCirc: 'cubic-bezier(0.075,  0.820, 0.165, 1.000)',
  easeOutExpo: 'cubic-bezier(0.190,  1.000, 0.220, 1.000)',
  easeOutQuad: 'cubic-bezier(0.250,  0.460, 0.450, 0.940)',
  easeOutQuart: 'cubic-bezier(0.165,  0.840, 0.440, 1.000)',
  easeOutQuint: 'cubic-bezier(0.230,  1.000, 0.320, 1.000)',
  easeOutSine: 'cubic-bezier(0.390,  0.575, 0.565, 1.000)',

  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
  easeInOutCirc: 'cubic-bezier(0.785,  0.135, 0.150, 0.860)',
  easeInOutCubic: 'cubic-bezier(0.645,  0.045, 0.355, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000,  0.000, 0.000, 1.000)',
  easeInOutQuad: 'cubic-bezier(0.455,  0.030, 0.515, 0.955)',
  easeInOutQuart: 'cubic-bezier(0.770,  0.000, 0.175, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860,  0.000, 0.070, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445,  0.050, 0.550, 0.950)'
};
/* eslint-enable key-spacing */

/** */

/**
 * String to represent common easing functions as demonstrated here: (github.com/jaukia/easie).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'transitionTimingFunction': timingFunctions('easeInQuad')
 * }
 *
 * // styled-components usage
 *  const div = styled.div`
 *   transitionTimingFunction: ${timingFunctions('easeInQuad')};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'transitionTimingFunction': 'cubic-bezier(0.550,  0.085, 0.680, 0.530)',
 * }
 */

function timingFunctions(timingFunction) {
  return functionsMap[timingFunction];
}

//      

/** */

var getBorderWidth = function getBorderWidth(pointingDirection, height, width) {
  switch (pointingDirection) {
    case 'top':
      return '0 ' + width / 2 + 'px ' + height + 'px ' + width / 2 + 'px';
    case 'left':
      return height / 2 + 'px ' + width + 'px ' + height / 2 + 'px 0';
    case 'bottom':
      return height + 'px ' + width / 2 + 'px 0 ' + width / 2 + 'px';
    case 'right':
      return height / 2 + 'px 0 ' + height / 2 + 'px ' + width + 'px';

    default:
      throw new Error("Passed invalid argument to triangle, please pass correct poitingDirection e.g. 'right'.");
  }
};

// needed for border-color
var reverseDirection = {
  left: 'Right',
  right: 'Left',
  top: 'Bottom',
  bottom: 'Top'
};

/**
 * CSS to represent triangle with any pointing direction with an optional background color. Accepts number or px values for height and width.
 *
 * @example
 * // Styles as object usage
 *
 * const styles = {
 *   ...triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })
 * }
 *
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })}
 *
 *
 * // CSS as JS Output
 *
 * div: {
 *  'borderColor': 'transparent',
 *  'borderLeftColor': 'red !important',
 *  'borderStyle': 'solid',
 *  'borderWidth': '50px 0 50px 100px',
 *  'height': '0',
 *  'width': '0',
 * }
 */

function triangle(_ref) {
  var _ref2;

  var pointingDirection = _ref.pointingDirection,
      height = _ref.height,
      width = _ref.width,
      foregroundColor = _ref.foregroundColor,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === undefined ? 'transparent' : _ref$backgroundColor;

  var unitlessHeight = parseFloat(height);
  var unitlessWidth = parseFloat(width);
  if (isNaN(unitlessHeight) || isNaN(unitlessWidth)) {
    throw new Error('Passed an invalid value to `height` or `width`. Please provide a pixel based unit');
  }

  return _ref2 = {
    borderColor: backgroundColor,
    width: '0',
    height: '0',
    borderWidth: getBorderWidth(pointingDirection, unitlessHeight, unitlessWidth),
    borderStyle: 'solid'
  }, _ref2['border' + reverseDirection[pointingDirection] + 'Color'] = foregroundColor + ' !important', _ref2;
}

//      

/**
 * Provides an easy way to change the `wordWrap` property.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...wordWrap('break-word')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${wordWrap('break-word')}
 * `
 *
 * // CSS as JS Output
 *
 * const styles = {
 *   overflowWrap: 'break-word',
 *   wordWrap: 'break-word',
 *   wordBreak: 'break-all',
 * }
 */

function wordWrap() {
  var wrap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'break-word';

  var wordBreak = wrap === 'break-word' ? 'break-all' : wrap;
  return {
    overflowWrap: wrap,
    wordWrap: wrap,
    wordBreak: wordBreak
  };
}

//      


function colorToInt(color) {
  return Math.round(color * 255);
}

function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}

function hslToRgb(hue, saturation, lightness) {
  var convert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : convertToInt;

  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  }

  // formular from https://en.wikipedia.org/wiki/HSL_and_HSV
  var huePrime = hue % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));

  var red = 0;
  var green = 0;
  var blue = 0;

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }

  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}

//      
var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
};

/**
 * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
 * @private
 */
function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? '#' + namedColorMap[normalizedColorName] : color;
}

//      
var hexRegex = /^#[a-fA-F0-9]{6}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;
var hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
var hslaRegex = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;

/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = 'rgb(255, 0, 0)';
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = 'hsla(210, 10%, 40%, 0.75)';
 */
function parseToRgb(color) {
  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  var normalizedColor = nameToHex(color);
  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt('' + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt('' + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt('' + normalizedColor[5] + normalizedColor[6], 16)
    };
  }
  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt('' + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt('' + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt('' + normalizedColor[3] + normalizedColor[3], 16)
    };
  }
  var rgbMatched = rgbRegex.exec(normalizedColor);
  if (rgbMatched) {
    return {
      red: parseInt('' + rgbMatched[1], 10),
      green: parseInt('' + rgbMatched[2], 10),
      blue: parseInt('' + rgbMatched[3], 10)
    };
  }
  var rgbaMatched = rgbaRegex.exec(normalizedColor);
  if (rgbaMatched) {
    return {
      red: parseInt('' + rgbaMatched[1], 10),
      green: parseInt('' + rgbaMatched[2], 10),
      blue: parseInt('' + rgbaMatched[3], 10),
      alpha: parseFloat('' + rgbaMatched[4])
    };
  }
  var hslMatched = hslRegex.exec(normalizedColor);
  if (hslMatched) {
    var hue = parseInt('' + hslMatched[1], 10);
    var saturation = parseInt('' + hslMatched[2], 10) / 100;
    var lightness = parseInt('' + hslMatched[3], 10) / 100;
    var rgbColorString = 'rgb(' + hslToRgb(hue, saturation, lightness) + ')';
    var hslRgbMatched = rgbRegex.exec(rgbColorString);
    return {
      red: parseInt('' + hslRgbMatched[1], 10),
      green: parseInt('' + hslRgbMatched[2], 10),
      blue: parseInt('' + hslRgbMatched[3], 10)
    };
  }
  var hslaMatched = hslaRegex.exec(normalizedColor);
  if (hslaMatched) {
    var _hue = parseInt('' + hslaMatched[1], 10);
    var _saturation = parseInt('' + hslaMatched[2], 10) / 100;
    var _lightness = parseInt('' + hslaMatched[3], 10) / 100;
    var _rgbColorString = 'rgb(' + hslToRgb(_hue, _saturation, _lightness) + ')';
    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
    return {
      red: parseInt('' + _hslRgbMatched[1], 10),
      green: parseInt('' + _hslRgbMatched[2], 10),
      blue: parseInt('' + _hslRgbMatched[3], 10),
      alpha: parseFloat('' + hslaMatched[4])
    };
  }
  throw new Error("Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.");
}

//      


function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;

  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;

  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return { hue: 0, saturation: 0, lightness: lightness, alpha: color.alpha };
    } else {
      return { hue: 0, saturation: 0, lightness: lightness };
    }
  }

  var hue = void 0;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }

  hue *= 60;
  if (color.alpha !== undefined) {
    return { hue: hue, saturation: saturation, lightness: lightness, alpha: color.alpha };
  }
  return { hue: hue, saturation: saturation, lightness: lightness };
}

//      

/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = 'rgb(255, 0, 0)';
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = 'hsla(210, 10%, 40%, 0.75)';
 */
function parseToHsl(color) {
  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}

//      

/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */
var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }
  return value;
};

//      
function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

//      

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */
function rgb(value, green, blue) {
  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue('#' + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue('#' + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }

  throw new Error('Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).');
}

//      

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 *   background: rgba('#ffffff', 0.4),
 *   background: rgba('black', 0.7),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 *   background: ${rgba('#ffffff', 0.4)};
 *   background: ${rgba('black', 0.7)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 *   background: "rgba(255,255,255,0.4)";
 *   background: "rgba(0,0,0,0.7)";
 * }
 */
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
    var rgbValue = parseToRgb(firstValue);
    return 'rgba(' + rgbValue.red + ',' + rgbValue.green + ',' + rgbValue.blue + ',' + secondValue + ')';
  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : 'rgba(' + firstValue + ',' + secondValue + ',' + thirdValue + ',' + fourthValue + ')';
  } else if ((typeof firstValue === 'undefined' ? 'undefined' : _typeof(firstValue)) === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : 'rgba(' + firstValue.red + ',' + firstValue.green + ',' + firstValue.blue + ',' + firstValue.alpha + ')';
  }

  throw new Error('Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).');
}

//      
function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}

function convertToHex(red, green, blue) {
  return reduceHexValue('#' + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}

function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}

//      

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */
function hsl(value, saturation, lightness) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }

  throw new Error('Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).');
}

//      

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */
function hsla(value, saturation, lightness, alpha) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : 'rgba(' + hslToRgb(value, saturation, lightness) + ',' + alpha + ')';
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : 'rgba(' + hslToRgb(value.hue, value.saturation, value.lightness) + ',' + value.alpha + ')';
  }

  throw new Error('Passed invalid arguments to hsla, please pass multiple numbers e.g. hsl(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).');
}

//      
var isRgb = function isRgb(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isRgba = function isRgba(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
};

var isHsl = function isHsl(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isHsla = function isHsla(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
};

var errMsg = 'Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.';

/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */

function toColorString(color) {
  if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) !== 'object') throw new Error(errMsg);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);

  throw new Error(errMsg);
}

//      

// Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js


// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-redeclare


function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
}

// eslint-disable-next-line no-redeclare
function curry(f) {
  // eslint-disable-line no-redeclare
  return curried(f, f.length, []);
}

//      

/**
 * Changes the hue of the color. Hue is a number between 0 to 360. The first
 * argument for adjustHue is the amount of degrees the color is rotated along
 * the color wheel.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: adjustHue(180, '#448'),
 *   background: adjustHue(180, 'rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${adjustHue(180, '#448')};
 *   background: ${adjustHue(180, 'rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#888844";
 *   background: "rgba(136,136,68,0.7)";
 * }
 */
function adjustHue(degree, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    hue: (hslColor.hue + degree) % 360
  }));
}

var curriedAdjustHue = /*#__PURE__*/curry(adjustHue);

//      

/**
 * Returns the complement of the provided color. This is identical to adjustHue(180, <color>).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: complement('#448'),
 *   background: complement('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${complement('#448')};
 *   background: ${complement('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#884";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */
function complement(color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    hue: (hslColor.hue + 180) % 360
  }));
}

//      

function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}

//      

/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken(0.2, 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken(0.2, 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */
function darken(amount, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - amount)
  }));
}

var curriedDarken = /*#__PURE__*/curry(darken);

//      

/**
 * Decreases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the desaturate function is the amount by how much the color
 * intensity should be decreased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: desaturate(0.2, '#CCCD64'),
 *   background: desaturate(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${desaturate(0.2, '#CCCD64')};
 *   background: ${desaturate(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#b8b979";
 *   background: "rgba(184,185,121,0.7)";
 * }
 */
function desaturate(amount, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation - amount)
  }));
}

var curriedDesaturate = /*#__PURE__*/curry(desaturate);

//      
/**
 * Returns a number (float) representing the luminance of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff',
 *   background: getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)',
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff'};
 *   background: ${getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)'};
 *
 * // CSS in JS Output
 *
 * div {
 *   background: "#CCCD64";
 *   background: "rgba(58, 133, 255, 1)";
 * }
 */
function getLuminance(color) {
  var rgbColor = parseToRgb(color);

  var _Object$keys$map = Object.keys(rgbColor).map(function (key) {
    var channel = rgbColor[key] / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  }),
      r = _Object$keys$map[0],
      g = _Object$keys$map[1],
      b = _Object$keys$map[2];

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

//      

/**
 * Converts the color to a grayscale, by reducing its saturation to 0.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: grayscale('#CCCD64'),
 *   background: grayscale('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${grayscale('#CCCD64')};
 *   background: ${grayscale('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#999";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */
function grayscale(color) {
  return toColorString(_extends({}, parseToHsl(color), {
    saturation: 0
  }));
}

//      

/**
 * Inverts the red, green and blue values of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: invert('#CCCD64'),
 *   background: invert('rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${invert('#CCCD64')};
 *   background: ${invert('rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#33329b";
 *   background: "rgba(154,155,50,0.7)";
 * }
 */
function invert(color) {
  // parse color string to rgb
  var value = parseToRgb(color);
  return toColorString(_extends({}, value, {
    red: 255 - value.red,
    green: 255 - value.green,
    blue: 255 - value.blue
  }));
}

//      

/**
 * Returns a string value for the lightened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: lighten(0.2, '#CCCD64'),
 *   background: lighten(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${lighten(0.2, '#FFCD64')};
 *   background: ${lighten(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e5e6b1";
 *   background: "rgba(229,230,177,0.7)";
 * }
 */
function lighten(amount, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + amount)
  }));
}

var curriedLighten = /*#__PURE__*/curry(lighten);

//      

/**
 * Mixes two colors together by calculating the average of each of the RGB components.
 *
 * By default the weight is 0.5 meaning that half of the first color and half the second
 * color should be used. Optionally the weight can be modified by providing a number
 * as the first argument. 0.25 means that a quarter of the first color and three quarters
 * of the second color should be used.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: mix(0.5, '#f00', '#00f')
 *   background: mix(0.25, '#f00', '#00f')
 *   background: mix(0.5, 'rgba(255, 0, 0, 0.5)', '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${mix(0.5, '#f00', '#00f')};
 *   background: ${mix(0.25, '#f00', '#00f')};
 *   background: ${mix(0.5, 'rgba(255, 0, 0, 0.5)', '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#7f007f";
 *   background: "#3f00bf";
 *   background: "rgba(63, 0, 191, 0.75)";
 * }
 */
function mix() {
  var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
  var color = arguments[1];
  var otherColor = arguments[2];

  var parsedColor1 = parseToRgb(color);
  var color1 = _extends({}, parsedColor1, {
    alpha: typeof parsedColor1.alpha === 'number' ? parsedColor1.alpha : 1
  });

  var parsedColor2 = parseToRgb(otherColor);
  var color2 = _extends({}, parsedColor2, {
    alpha: typeof parsedColor2.alpha === 'number' ? parsedColor2.alpha : 1
  });

  // The formular is copied from the original Sass implementation:
  // http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method
  var alphaDelta = color1.alpha - color2.alpha;
  var x = weight * 2 - 1;
  var y = x * alphaDelta === -1 ? x : x + alphaDelta;
  var z = 1 + x * alphaDelta;
  var weight1 = (y / z + 1) / 2.0;
  var weight2 = 1 - weight1;

  var mixedColor = {
    red: Math.floor(color1.red * weight1 + color2.red * weight2),
    green: Math.floor(color1.green * weight1 + color2.green * weight2),
    blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
    alpha: color1.alpha + (color2.alpha - color1.alpha) * (weight / 1.0)
  };

  return rgba(mixedColor);
}

var curriedMix = /*#__PURE__*/curry(mix);

//      
/**
 * Increases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: opacify(0.1, 'rgba(255, 255, 255, 0.9)');
 *   background: opacify(0.2, 'hsla(0, 0%, 100%, 0.5)'),
 *   background: opacify(0.5, 'rgba(255, 0, 0, 0.2)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${opacify(0.1, 'rgba(255, 255, 255, 0.9)')};
 *   background: ${opacify(0.2, 'hsla(0, 0%, 100%, 0.5)')},
 *   background: ${opacify(0.5, 'rgba(255, 0, 0, 0.2)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#fff";
 *   background: "rgba(255,255,255,0.7)";
 *   background: "rgba(255,0,0,0.7)";
 * }
 */
function opacify(amount, color) {
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 + amount * 100) / 100)
  });
  return rgba(colorWithAlpha);
}

var curriedOpacify = /*#__PURE__*/curry(opacify);

//      
/**
 * Selects black or white for best contrast depending on the luminosity of the given color.
 * Follows W3C specs for readability at https://www.w3.org/TR/WCAG20-TECHS/G18.html
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   color: readableColor('#000'),
 *   color: readableColor('papayawhip'),
 *   color: readableColor('rgb(255,0,0)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   color: ${readableColor('#000')};
 *   color: ${readableColor('papayawhip')};
 *   color: ${readableColor('rgb(255,0,0)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   color: "#fff";
 *   color: "#fff";
 *   color: "#000";
 * }
 */

function readableColor(color) {
  return getLuminance(color) > 0.179 ? '#000' : '#fff';
}

var curriedReadableColor = /*#__PURE__*/curry(readableColor);

//      

/**
 * Increases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the saturate function is the amount by how much the color
 * intensity should be increased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: saturate(0.2, '#CCCD64'),
 *   background: saturate(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${saturate(0.2, '#FFCD64')};
 *   background: ${saturate(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e0e250";
 *   background: "rgba(224,226,80,0.7)";
 * }
 */
function saturate(amount, color) {
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation + amount)
  }));
}

var curriedSaturate = /*#__PURE__*/curry(saturate);

//      

/**
 * Sets the hue of a color to the provided value. The hue range can be
 * from 0 and 359.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setHue(42, '#CCCD64'),
 *   background: setHue(244, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setHue(42, '#CCCD64')};
 *   background: ${setHue(244, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#cdae64";
 *   background: "rgba(107,100,205,0.7)";
 * }
 */
function setHue(hue, color) {
  return toColorString(_extends({}, parseToHsl(color), {
    hue: hue
  }));
}

var curriedSetHue = /*#__PURE__*/curry(setHue);

//      

/**
 * Sets the lightness of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setLightness(0.2, '#CCCD64'),
 *   background: setLightness(0.75, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setLightness(0.2, '#CCCD64')};
 *   background: ${setLightness(0.75, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#4d4d19";
 *   background: "rgba(223,224,159,0.7)";
 * }
 */
function setLightness(lightness, color) {
  return toColorString(_extends({}, parseToHsl(color), {
    lightness: lightness
  }));
}

var curriedSetLightness = /*#__PURE__*/curry(setLightness);

//      

/**
 * Sets the saturation of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setSaturation(0.2, '#CCCD64'),
 *   background: setSaturation(0.75, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setSaturation(0.2, '#CCCD64')};
 *   background: ${setSaturation(0.75, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#adad84";
 *   background: "rgba(228,229,76,0.7)";
 * }
 */
function setSaturation(saturation, color) {
  return toColorString(_extends({}, parseToHsl(color), {
    saturation: saturation
  }));
}

var curriedSetSaturation = /*#__PURE__*/curry(setSaturation);

//      

/**
 * Shades a color by mixing it with black. `shade` can produce
 * hue shifts, where as `darken` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: shade(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${shade(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#00003f";
 * }
 */

function shade(percentage, color) {
  if (typeof percentage !== 'number' || percentage > 1 || percentage < -1) {
    throw new Error('Passed an incorrect argument to shade, please pass a percentage less than or equal to 1 and larger than or equal to -1.');
  }
  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  return curriedMix(percentage, color, 'rgb(0, 0, 0)');
}

var curriedShade = /*#__PURE__*/curry(shade);

//      

/**
 * Tints a color by mixing it with white. `tint` can produce
 * hue shifts, where as `lighten` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: tint(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${tint(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#bfbfff";
 * }
 */

function tint(percentage, color) {
  if (typeof percentage !== 'number' || percentage > 1 || percentage < -1) {
    throw new Error('Passed an incorrect argument to tint, please pass a percentage less than or equal to 1 and larger than or equal to -1.');
  }
  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  return curriedMix(percentage, color, 'rgb(255, 255, 255)');
}

var curriedTint = /*#__PURE__*/curry(tint);

//      
/**
 * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: transparentize(0.1, '#fff');
 *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
 *   background: transparentize(0.5, 'rgba(255, 0, 0, 0.8)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${transparentize(0.1, '#fff')};
 *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')},
 *   background: ${transparentize(0.5, 'rgba(255, 0, 0, 0.8)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,255,255,0.9)";
 *   background: "rgba(255,255,255,0.8)";
 *   background: "rgba(255,0,0,0.3)";
 * }
 */
function transparentize(amount, color) {
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 - amount * 100) / 100)
  });
  return rgba(colorWithAlpha);
}

var curriedTransparentize = /*#__PURE__*/curry(transparentize);

//      

/** */

/**
 * Shorthand for easily setting the animation property. Allows either multiple arrays with animations
 * or a single animation spread over the arguments.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out, colorchange 2s'
 * }
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation('rotate', '1s', 'ease-in-out')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation('rotate', '1s', 'ease-in-out')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out'
 * }
 */
function animation() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Allow single or multiple animations passed
  var multiMode = Array.isArray(args[0]);
  if (!multiMode && args.length > 8) {
    throw new Error('The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation');
  }
  var code = args.map(function (arg) {
    if (multiMode && !Array.isArray(arg) || !multiMode && Array.isArray(arg)) {
      throw new Error("To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')");
    }
    if (Array.isArray(arg) && arg.length > 8) {
      throw new Error('The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation');
    }

    return Array.isArray(arg) ? arg.join(' ') : arg;
  }).join(', ');

  return {
    animation: code
  };
}

//      

/**
 * Shorthand that accepts any number of backgroundImage values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgroundImages('url("/image/background.jpg")', 'linear-gradient(red, green)')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${backgroundImages('url("/image/background.jpg")', 'linear-gradient(red, green)')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'backgroundImage': 'url("/image/background.jpg"), linear-gradient(red, green)'
 * }
 */

function backgroundImages() {
  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    backgroundImage: properties.join(', ')
  };
}

//      

/**
 * Shorthand that accepts any number of background values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'background': 'url("/image/background.jpg"), linear-gradient(red, green), center no-repeat'
 * }
 */
function backgrounds() {
  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    background: properties.join(', ')
  };
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderColor('red', 'green', 'blue', 'yellow')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderColor('red', 'green', 'blue', 'yellow')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopColor': 'red',
 *   'borderRightColor': 'green',
 *   'borderBottomColor': 'blue',
 *   'borderLeftColor': 'yellow'
 * }
 */

function borderColor() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['borderColor'].concat(values));
}

//      
/**
 * Shorthand that accepts a value for side and a value for radius and applies the radius value to both corners of the side.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderRadius('top', '5px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderRadius('top', '5px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopRightRadius': '5px',
 *   'borderTopLeftRadius': '5px',
 * }
 */

function borderRadius(side, radius) {
  var uppercaseSide = capitalizeString(side);
  if (!radius && radius !== 0) {
    throw new Error('borderRadius expects a radius value as a string or number as the second argument.');
  }
  if (uppercaseSide === 'Top' || uppercaseSide === 'Bottom') {
    var _ref;

    return _ref = {}, _ref['border' + uppercaseSide + 'RightRadius'] = radius, _ref['border' + uppercaseSide + 'LeftRadius'] = radius, _ref;
  }

  if (uppercaseSide === 'Left' || uppercaseSide === 'Right') {
    var _ref2;

    return _ref2 = {}, _ref2['borderTop' + uppercaseSide + 'Radius'] = radius, _ref2['borderBottom' + uppercaseSide + 'Radius'] = radius, _ref2;
  }

  throw new Error('borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.');
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderStyle('solid', 'dashed', 'dotted', 'double')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderStyle('solid', 'dashed', 'dotted', 'double')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopStyle': 'solid',
 *   'borderRightStyle': 'dashed',
 *   'borderBottomStyle': 'dotted',
 *   'borderLeftStyle': 'double'
 * }
 */

function borderStyle() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['borderStyle'].concat(values));
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderWidth('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderWidth('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopWidth': '12px',
 *   'borderRightWidth': '24px',
 *   'borderBottomWidth': '36px',
 *   'borderLeftWidth': '48px'
 * }
 */
function borderWidth() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['borderWidth'].concat(values));
}

//      


function generateSelectors(template, state) {
  var stateSuffix = state ? ':' + state : '';
  return template(stateSuffix);
}

/**
 * Function helper that adds an array of states to a template of selectors. Used in textInputs and buttons.
 * @private
 */
function statefulSelectors(states, template, stateMap) {
  if (!template) throw new Error('You must provide a template to this method.');
  if (states.length === 0) return generateSelectors(template, null);
  var selectors = [];
  for (var i = 0; i < states.length; i += 1) {
    if (stateMap && stateMap.indexOf(states[i]) < 0) {
      throw new Error('You passed an unsupported selector state to this method.');
    }
    selectors.push(generateSelectors(template, states[i]));
  }
  selectors = selectors.join(',');
  return selectors;
}

//      
var stateMap = [undefined, null, 'active', 'focus', 'hover'];

function template(state) {
  return 'button' + state + ',\n  input[type="button"]' + state + ',\n  input[type="reset"]' + state + ',\n  input[type="submit"]' + state;
}

/**
 * Populates selectors that target all buttons. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [buttons('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${buttons('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'button:active,
 *  'input[type="button"]:active,
 *  'input[type=\"reset\"]:active,
 *  'input[type=\"submit\"]:active: {
 *   'border': 'none'
 * }
 */

function buttons() {
  for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }

  return statefulSelectors(states, template, stateMap);
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...margin('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${margin('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'marginTop': '12px',
 *   'marginRight': '24px',
 *   'marginBottom': '36px',
 *   'marginLeft': '48px'
 * }
 */

function margin() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['margin'].concat(values));
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...padding('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${padding('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */

function padding() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty.apply(undefined, ['padding'].concat(values));
}

//      
var positionMap$1 = ['absolute', 'fixed', 'relative', 'static', 'sticky'];

/**
 * Shorthand accepts up to five values, including null to skip a value, and maps them to their respective directions. The first value can optionally be a position keyword.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...position('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${position('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'top': '12px',
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 *
 * // Styles as object usage
 * const styles = {
 *   ...position('absolute', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${position('absolute', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'position': 'absolute',
 *   'top': '12px',
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 */

function position(positionKeyword) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  if (positionMap$1.indexOf(positionKeyword) >= 0) {
    return _extends({
      position: positionKeyword
    }, directionalProperty.apply(undefined, [''].concat(values)));
  } else {
    var firstValue = positionKeyword; // in this case position is actually the first value
    return directionalProperty.apply(undefined, ['', firstValue].concat(values));
  }
}

//      

/**
 * Shorthand to set the height and width properties in a single statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...size('300px', '250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${size('300px', '250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'height': '300px',
 *   'width': '250px',
 * }
 */

function size(height) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : height;

  return {
    height: height,
    width: width
  };
}

//      
var stateMap$1 = [undefined, null, 'active', 'focus', 'hover'];

function template$1(state) {
  return 'input[type="color"]' + state + ',\n    input[type="date"]' + state + ',\n    input[type="datetime"]' + state + ',\n    input[type="datetime-local"]' + state + ',\n    input[type="email"]' + state + ',\n    input[type="month"]' + state + ',\n    input[type="number"]' + state + ',\n    input[type="password"]' + state + ',\n    input[type="search"]' + state + ',\n    input[type="tel"]' + state + ',\n    input[type="text"]' + state + ',\n    input[type="time"]' + state + ',\n    input[type="url"]' + state + ',\n    input[type="week"]' + state + ',\n    input:not([type])' + state + ',\n    textarea' + state;
}

/**
 * Populates selectors that target all text inputs. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [textInputs('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${textInputs('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'input[type="color"]:active,
 *  input[type="date"]:active,
 *  input[type="datetime"]:active,
 *  input[type="datetime-local"]:active,
 *  input[type="email"]:active,
 *  input[type="month"]:active,
 *  input[type="number"]:active,
 *  input[type="password"]:active,
 *  input[type="search"]:active,
 *  input[type="tel"]:active,
 *  input[type="text"]:active,
 *  input[type="time"]:active,
 *  input[type="url"]:active,
 *  input[type="week"]:active,
 *  input:not([type]):active,
 *  textarea:active': {
 *   'border': 'none'
 * }
 */

function textInputs() {
  for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }

  return statefulSelectors(states, template$1, stateMap$1);
}

//      

/**
 * Shorthand that accepts any number of transition values as parameters for creating a single transition statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...transitions('opacity 1.0s ease-in 0s', 'width 2.0s ease-in 2s')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${transitions('opacity 1.0s ease-in 0s', 'width 2.0s ease-in 2s')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'transition': 'opacity 1.0s ease-in 0s, width 2.0s ease-in 2s'
 * }
 */

function transitions() {
  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    transition: properties.join(', ')
  };
}

//      
// Helpers
// Mixins
// Color
// Shorthands




/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(191);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _media = __webpack_require__(400);

var _retinaImage = __webpack_require__(413);

var _Svgs = __webpack_require__(406);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/components/AppScreenshot.js';


var AppScreenshot = function AppScreenshot() {
  return _react2.default.createElement(Wrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement(HandleWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement(_Svgs.CornerHandle, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  })));
};

exports.default = AppScreenshot;


var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'AppScreenshot__Wrapper',
  componentId: 's6co25q-0'
})(['width:1022px;height:595px;position:relative;box-shadow:0px 6px 13px rgba(0,0,0,0.2);background-color:#e8e8e8;background-size:cover;background-position:top right;', ';', ';'], (0, _retinaImage.retinaImage)('/static/app-screenshot', 'jpg'), (0, _media.phone)((0, _styledComponents.css)(['height:320px;width:100%;background-image:url(/static/app-screenshot-mobile@2x.jpg);background-position:top center;background-size:cover;box-shadow:0 0 0 15px #f0f0f0;'])));

var HandleWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'AppScreenshot__HandleWrapper',
  componentId: 's6co25q-1'
})(['position:absolute;bottom:0;right:0;transform:translate(30px,35px);', ';'], (0, _media.phone)((0, _styledComponents.css)(['display:none;'])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQXBwU2NyZWVuc2hvdC5qcyJdLCJuYW1lcyI6WyJzdHlsZWQiLCJjc3MiLCJwaG9uZSIsInJldGluYUltYWdlIiwiQ29ybmVySGFuZGxlIiwiQXBwU2NyZWVuc2hvdCIsIldyYXBwZXIiLCJkaXYiLCJIYW5kbGVXcmFwcGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFVOzs7O0FBRWpCLEFBQVMsQUFBYTs7QUFDdEIsQUFBUyxBQUFtQjs7QUFDNUIsQUFBUyxBQUFvQjs7Ozs7OztBQUU3QixJQUFNLGdCQUFnQixTQUFoQixBQUFnQixnQkFBQTt5QkFDbkIsY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRyxjQUFEOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRSxBQUFDOztnQkFBRDtrQkFIZ0IsQUFDcEIsQUFDRSxBQUNFO0FBQUE7QUFBQTtBQUhOLEFBUUE7O2tCQUFBLEFBQWU7OztBQUVmLElBQU0scUNBQUEsQUFBaUI7ZUFBakI7ZUFBQTtBQUFBLENBQVUsbUxBV1osOEJBQUEsQUFBWSwwQkFYVixBQVdGLEFBQXNDLFFBRXRDLGtCQUFBLEFBQU0sNEJBYlYsQUFBTTs7QUF1Qk4sSUFBTSwyQ0FBQSxBQUF1QjtlQUF2QjtlQUFBO0FBQUEsQ0FBZ0IsK0VBT2xCLGtCQUFBLEFBQU0sNEJBUFYsQUFBTSIsImZpbGUiOiJBcHBTY3JlZW5zaG90LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tb2hhbW1hZC9Eb2N1bWVudHMvZGV2L3RoZXJlL3RoZXJlLXdlYnNpdGUifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/components/AppScreenshot.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/components/AppScreenshot.js"); } } })();

/***/ }),

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retinaImage = undefined;

var _styledComponents = __webpack_require__(191);

var retinaImage = exports.retinaImage = function retinaImage(url, ext) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '@2x';
  return (0, _styledComponents.css)(['background-image:url(', ');@media only screen and (-webkit-min-device-pixel-ratio:1.3),not all,not all,only screen and (min-resolution:125dpi),only screen and (min-resolution:1.3dppx){background-image:url(', ');}'], url + '.' + ext, url + suffix + '.' + ext);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3JldGluYUltYWdlLmpzIl0sIm5hbWVzIjpbImNzcyIsInJldGluYUltYWdlIiwidXJsIiwiZXh0Iiwic3VmZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsQUFBUyxBQUFULEFBRUE7O0FBQU8sSUFBTSxvQ0FBYyxTQUFkLEFBQWMsWUFBQyxBQUFELEtBQU0sQUFBTixLQUFBO01BQVcsQUFBWCw2RUFBb0IsQUFBcEI7U0FBOEIsQUFBOUIscVBBQ0QsTUFBTSxBQUFOLE1BQVksQUFEWCxLQVFDLE1BQU0sQUFBTixTQUFlLEFBQWYsTUFBcUIsQUFSdEI7QUFBcEIiLCJmaWxlIjoicmV0aW5hSW1hZ2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/utils/retinaImage.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/utils/retinaImage.js"); } } })();

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(191);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _media = __webpack_require__(400);

var _Container = __webpack_require__(401);

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/sections/Quote.js';


var Quote = function Quote() {
  return _react2.default.createElement(Wrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement(_Container2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement(Emoji, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, '\uD83D\uDC9D'), _react2.default.createElement(Bq, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(Text, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, 'As a remote engineer and open sourcer, It was super hard to keep track of my friends timezones. I want to share my practical solution w/ you too!'), _react2.default.createElement(Who, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, 'Mo Rajabi - Maker of There\u2122'))));
};

exports.default = Quote;


var Wrapper = _styledComponents2.default.section.withConfig({
  displayName: 'Quote__Wrapper',
  componentId: 's1110yda-0'
})(['margin-top:120px;text-align:center;', ';'], (0, _media.phone)((0, _styledComponents.css)(['margin-top:80px;'])));

var Bq = _styledComponents2.default.blockquote.withConfig({
  displayName: 'Quote__Bq',
  componentId: 's1110yda-1'
})(['margin:0;']);

var Emoji = _styledComponents2.default.p.withConfig({
  displayName: 'Quote__Emoji',
  componentId: 's1110yda-2'
})(['font-size:35px;margin:0;', ';'], (0, _media.phone)((0, _styledComponents.css)(['font-size:30px;'])));

var Text = _styledComponents2.default.p.withConfig({
  displayName: 'Quote__Text',
  componentId: 's1110yda-3'
})(['font-size:35px;letter-spacing:-1px;margin:30px 0 0 0;color:', ';', ';'], function (p) {
  return p.theme.colors.darkText;
}, (0, _media.phone)((0, _styledComponents.css)(['font-size:22px;'])));

var Who = _styledComponents2.default.p.withConfig({
  displayName: 'Quote__Who',
  componentId: 's1110yda-4'
})(['margin:16px 0 0 0;color:', ';', ';'], function (p) {
  return p.theme.colors.mutedText;
}, (0, _media.phone)((0, _styledComponents.css)(['font-size:18px;'])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3Rpb25zL1F1b3RlLmpzIl0sIm5hbWVzIjpbInN0eWxlZCIsImNzcyIsInBob25lIiwiQ29udGFpbmVyIiwiUXVvdGUiLCJXcmFwcGVyIiwic2VjdGlvbiIsIkJxIiwiYmxvY2txdW90ZSIsIkVtb2ppIiwicCIsIlRleHQiLCJ0aGVtZSIsImNvbG9ycyIsImRhcmtUZXh0IiwiV2hvIiwibXV0ZWRUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFVOzs7O0FBRWpCLEFBQVMsQUFBYTs7QUFDdEIsQUFBTyxBQUFlOzs7Ozs7Ozs7QUFFdEIsSUFBTSxRQUFRLFNBQVIsQUFBUSxRQUFBO3lCQUNYLGNBQUQ7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0UsQUFBQzs7Z0JBQUQ7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0csY0FBRDs7Z0JBQUE7a0JBQUE7QUFBQTtBQUFBLEtBREYsQUFDRSxBQUNBLGlDQUFDLGNBQUQ7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLHFCQUNHLGNBQUQ7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQURGLEFBQ0UsQUFLQSxzS0FBQyxjQUFEOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FWTSxBQUNaLEFBQ0UsQUFFRSxBQU1FO0FBVlIsQUFnQkE7O2tCQUFBLEFBQWU7OztBQUVmLElBQU0scUNBQUEsQUFBaUI7ZUFBakI7ZUFBQTtBQUFBLENBQVUsZ0RBSVosa0JBQUEsQUFBTSw0QkFKVixBQUFNOztBQVNOLElBQU0sZ0NBQUEsQUFBWTtlQUFaO2VBQUE7QUFBQSxDQUFLLEdBQVg7O0FBSUEsSUFBTSxtQ0FBQSxBQUFlO2VBQWY7ZUFBQTtBQUFBLENBQVEscUNBSVYsa0JBQUEsQUFBTSw0QkFKVixBQUFNOztBQVNOLElBQU0sa0NBQUEsQUFBYztlQUFkO2VBQUE7QUFBQSxDQUFPLDZFQUlGLGFBQUE7U0FBSyxFQUFBLEFBQUUsTUFBRixBQUFRLE9BQWIsQUFBb0I7QUFKekIsR0FNRixrQkFBQSxBQUFNLDRCQU5WLEFBQU07O0FBV04sSUFBTSxpQ0FBQSxBQUFhO2VBQWI7ZUFBQTtBQUFBLENBQU0sMENBRUQsYUFBQTtTQUFLLEVBQUEsQUFBRSxNQUFGLEFBQVEsT0FBYixBQUFvQjtBQUZ6QixHQUlGLGtCQUFBLEFBQU0sNEJBSlYsQUFBTSIsImZpbGUiOiJRdW90ZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/sections/Quote.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/sections/Quote.js"); } } })();

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(191);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _media = __webpack_require__(400);

var _Container = __webpack_require__(401);

var _Container2 = _interopRequireDefault(_Container);

var _FeatureItem = __webpack_require__(416);

var _FeatureItem2 = _interopRequireDefault(_FeatureItem);

var _Svgs = __webpack_require__(406);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/sections/Features.js';


var Features = function Features() {
  return _react2.default.createElement(Wrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement(_Container2.default, { wide: true, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(GridWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement(_FeatureItem2.default, {
    title: 'People first design',
    desc: 'City, country, timezone comes after the people',
    renderIcon: function renderIcon() {
      return _react2.default.createElement(_Svgs.Circle, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      });
    },
    iconTop: -6,
    iconLeft: -14,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), _react2.default.createElement(_FeatureItem2.default, {
    title: 'Pin for quick access',
    desc: 'Frequently interacting w/ a few ones? Pin \u2018em!',
    renderIcon: function renderIcon() {
      return _react2.default.createElement(_Svgs.Rect, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      });
    },
    iconTop: -10,
    iconLeft: -9,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }), _react2.default.createElement(_FeatureItem2.default, {
    title: 'Built for efficiency',
    desc: 'Every piece of UI is placed w/ user in mind',
    renderIcon: function renderIcon() {
      return _react2.default.createElement(_Svgs.Triangle, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      });
    },
    iconTop: -12,
    iconLeft: -25,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }), _react2.default.createElement(SlackBox, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }))));
};

exports.default = Features;


var SlackBox = function SlackBox() {
  return _react2.default.createElement(SlackWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    }
  }, _react2.default.createElement(SlackIconWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    }
  }, _react2.default.createElement(_Svgs.Slack, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    }
  })), _react2.default.createElement(SlackFeatureItemWrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    }
  }, _react2.default.createElement(_FeatureItem2.default, {
    title: 'Slack team support',
    desc: 'Import your whole team from Slack with 1-click',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    }
  })));
};

var Wrapper = _styledComponents2.default.section.withConfig({
  displayName: 'Features__Wrapper',
  componentId: 'uesv8i-0'
})(['margin-top:170px;', ';'], (0, _media.phone)((0, _styledComponents.css)(['margin-top:110px;'])));

var GridWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Features__GridWrapper',
  componentId: 'uesv8i-1'
})(['display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:auto 1fr;grid-column-gap:100px;grid-row-gap:40px;', ';'], (0, _media.phone)((0, _styledComponents.css)(['grid-template-columns:1fr;'])));

var SlackIconWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Features__SlackIconWrapper',
  componentId: 'uesv8i-2'
})(['', ';'], (0, _media.phone)((0, _styledComponents.css)(['grid-column:3;padding-left:20px;'])));

var SlackFeatureItemWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Features__SlackFeatureItemWrapper',
  componentId: 'uesv8i-3'
})(['grid-column:2;grid-row:1;']);

var SlackWrapper = _styledComponents2.default.div.withConfig({
  displayName: 'Features__SlackWrapper',
  componentId: 'uesv8i-4'
})(['width:100%;grid-column:1 / 4;padding:30px 37px;background:#f0f0f0;text-align:center;', ';'], (0, _media.phone)((0, _styledComponents.css)(['grid-column:1;padding:22px 25px;text-align:right;display:inline-grid;grid-template-columns:1fr auto;grid-template-rows:auto;'])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3Rpb25zL0ZlYXR1cmVzLmpzIl0sIm5hbWVzIjpbInN0eWxlZCIsImNzcyIsInBob25lIiwiQ29udGFpbmVyIiwiRmVhdHVyZUl0ZW0iLCJDaXJjbGUiLCJSZWN0IiwiVHJpYW5nbGUiLCJTbGFjayIsIlNsYWNrSWNvbiIsIkZlYXR1cmVzIiwiU2xhY2tCb3giLCJXcmFwcGVyIiwic2VjdGlvbiIsIkdyaWRXcmFwcGVyIiwiZGl2IiwiU2xhY2tJY29uV3JhcHBlciIsIlNsYWNrRmVhdHVyZUl0ZW1XcmFwcGVyIiwiU2xhY2tXcmFwcGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFVOzs7O0FBRWpCLEFBQVMsQUFBYTs7QUFDdEIsQUFBTyxBQUFlOzs7O0FBQ3RCLEFBQU8sQUFBaUI7Ozs7QUFDeEIsQUFBUyxBQUFRLEFBQU0sQUFBVSxBQUFTLEFBQWlCOzs7Ozs7O0FBRTNELElBQU0sV0FBVyxTQUFYLEFBQVcsV0FBQTt5QkFDZCxjQUFEOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxHQUFBLGtCQUNFLEFBQUMscUNBQVUsTUFBWDtnQkFBQTtrQkFBQSxBQUNFO0FBREY7cUJBQ0csY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsQUFBQztXQUFELEFBQ1EsQUFDTjtVQUZGLEFBRU8sQUFDTDtnQkFBWSxzQkFBQTs2QkFBTSxBQUFDOztvQkFBRDtzQkFBTixBQUFNO0FBQUE7QUFBQSxPQUFBO0FBSHBCLEFBSUU7YUFBUyxDQUpYLEFBSVksQUFDVjtjQUFVLENBTFosQUFLYTs7Z0JBTGI7a0JBREYsQUFDRSxBQU9BO0FBUEE7QUFDRSxzQkFNRixBQUFDO1dBQUQsQUFDUSxBQUNOO1VBRkYsQUFFTyxBQUNMO2dCQUFZLHNCQUFBOzZCQUFNLEFBQUM7O29CQUFEO3NCQUFOLEFBQU07QUFBQTtBQUFBLE9BQUE7QUFIcEIsQUFJRTthQUFTLENBSlgsQUFJWSxBQUNWO2NBQVUsQ0FMWixBQUthOztnQkFMYjtrQkFSRixBQVFFLEFBT0E7QUFQQTtBQUNFLHNCQU1GLEFBQUM7V0FBRCxBQUNRLEFBQ047VUFGRixBQUVPLEFBQ0w7Z0JBQVksc0JBQUE7NkJBQU0sQUFBQzs7b0JBQUQ7c0JBQU4sQUFBTTtBQUFBO0FBQUEsT0FBQTtBQUhwQixBQUlFO2FBQVMsQ0FKWCxBQUlZLEFBQ1Y7Y0FBVSxDQUxaLEFBS2E7O2dCQUxiO2tCQWZGLEFBZUUsQUFPQTtBQVBBO0FBQ0Usb0NBTUYsQUFBQzs7Z0JBQUQ7a0JBekJTLEFBQ2YsQUFDRSxBQUNFLEFBc0JFO0FBQUE7QUFBQTtBQXpCUixBQStCQTs7a0JBQUEsQUFBZTs7O0FBRWYsSUFBTSxXQUFXLFNBQVgsQUFBVyxXQUFBO3lCQUNkLGNBQUQ7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0csY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsQUFBQzs7Z0JBQUQ7a0JBRkosQUFDRSxBQUNFLEFBRUY7QUFGRTtBQUFBLHVCQUVELGNBQUQ7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLHFCQUNFLEFBQUM7V0FBRCxBQUNRLEFBQ047VUFGRixBQUVPOztnQkFGUDtrQkFOVyxBQUNmLEFBSUUsQUFDRTtBQUFBO0FBQ0U7QUFQUjs7QUFjQSxJQUFNLHFDQUFBLEFBQWlCO2VBQWpCO2VBQUE7QUFBQSxDQUFVLDhCQUdaLGtCQUFBLEFBQU0sNEJBSFYsQUFBTTs7QUFRTixJQUFNLHlDQUFBLEFBQXFCO2VBQXJCO2VBQUE7QUFBQSxDQUFjLGdJQU9oQixrQkFBQSxBQUFNLDRCQVBWLEFBQU07O0FBWU4sSUFBTSw4Q0FBQSxBQUEwQjtlQUExQjtlQUFBO0FBQUEsQ0FBbUIsYUFDckIsa0JBQUEsQUFBTSw0QkFEVixBQUFNOztBQU9OLElBQU0scURBQUEsQUFBaUM7ZUFBakM7ZUFBQTtBQUFBLENBQTBCLEdBQWhDOztBQUtBLElBQU0sMENBQUEsQUFBc0I7ZUFBdEI7ZUFBQTtBQUFBLENBQWUsaUdBT2pCLGtCQUFBLEFBQU0sNEJBUFYsQUFBTSIsImZpbGUiOiJGZWF0dXJlcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/sections/Features.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/sections/Features.js"); } } })();

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(191);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _media = __webpack_require__(400);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/components/FeatureItem.js';


var FeatureItem = function FeatureItem(props) {
  var _props$iconTop = props.iconTop,
      iconTop = _props$iconTop === undefined ? 0 : _props$iconTop,
      _props$iconLeft = props.iconLeft,
      iconLeft = _props$iconLeft === undefined ? 0 : _props$iconLeft,
      _props$renderIcon = props.renderIcon,
      renderIcon = _props$renderIcon === undefined ? function () {
    return _react2.default.createElement('div', {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    });
  } : _props$renderIcon,
      title = props.title,
      desc = props.desc;

  return _react2.default.createElement(Wrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, _react2.default.createElement(Title, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, _react2.default.createElement(Icon, { top: iconTop, left: iconLeft, __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, renderIcon()), _react2.default.createElement(TitleText, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, title)), _react2.default.createElement(Description, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, desc));
};

exports.default = FeatureItem;


var Wrapper = _styledComponents2.default.div.withConfig({
  displayName: 'FeatureItem__Wrapper',
  componentId: 's8f9ui6-0'
})(['position:relative;']);

var Icon = _styledComponents2.default.div.withConfig({
  displayName: 'FeatureItem__Icon',
  componentId: 's8f9ui6-1'
})(['position:absolute;top:', 'px;left:', 'px;', ';'], function (p) {
  return String(p.top) || '0';
}, function (p) {
  return String(p.left) || '0';
}, (0, _media.phone)((0, _styledComponents.css)(['transform:scale(0.93);transform-origin:top center;'])));

var Title = _styledComponents2.default.h3.withConfig({
  displayName: 'FeatureItem__Title',
  componentId: 's8f9ui6-2'
})(['position:relative;margin:0;font-family:\'Playfair Display\',sans-serif;font-weight:700;font-size:35px;letter-spacing:-1px;', ';'], (0, _media.phone)((0, _styledComponents.css)(['font-size:25px;'])));

var TitleText = _styledComponents2.default.span.withConfig({
  displayName: 'FeatureItem__TitleText',
  componentId: 's8f9ui6-3'
})(['position:relative;z-index:3;']);

var Description = _styledComponents2.default.p.withConfig({
  displayName: 'FeatureItem__Description',
  componentId: 's8f9ui6-4'
})(['margin:9px 0 0 0;line-height:1.3;letter-spacing:-0.8px;color:', ';'], function (p) {
  return p.theme.colors.greyText;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvRmVhdHVyZUl0ZW0uanMiXSwibmFtZXMiOlsic3R5bGVkIiwiY3NzIiwicGhvbmUiLCJGZWF0dXJlSXRlbSIsInByb3BzIiwiaWNvblRvcCIsImljb25MZWZ0IiwicmVuZGVySWNvbiIsInRpdGxlIiwiZGVzYyIsIldyYXBwZXIiLCJkaXYiLCJJY29uIiwiU3RyaW5nIiwicCIsInRvcCIsImxlZnQiLCJUaXRsZSIsImgzIiwiVGl0bGVUZXh0Iiwic3BhbiIsIkRlc2NyaXB0aW9uIiwidGhlbWUiLCJjb2xvcnMiLCJncmV5VGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBVTs7OztBQUVqQixBQUFTLEFBQWE7Ozs7Ozs7QUFFdEIsSUFBTSxjQUFjLFNBQWQsQUFBYyxtQkFBUzt1QkFBQSxBQU92QixNQVB1QixBQUV6QjtNQUZ5QixBQUV6Qix5Q0FGeUIsQUFFZixJQUZlO3dCQUFBLEFBT3ZCLE1BUHVCLEFBR3pCO01BSHlCLEFBR3pCLDJDQUh5QixBQUdkLElBSGM7MEJBQUEsQUFPdkIsTUFQdUIsQUFJekI7TUFKeUIsQUFJekIsK0NBQWEsWUFBQTs7O2tCQUFNO29CQUFOLEFBQU07QUFBQTtBQUFBLEtBQUE7QUFKTSxNQUFBO01BQUEsQUFLekIsUUFMeUIsQUFPdkIsTUFQdUIsQUFLekI7TUFMeUIsQUFNekIsT0FOeUIsQUFPdkIsTUFQdUIsQUFNekIsQUFFRjs7eUJBQ0csY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRyxjQUFEOztnQkFBQTtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRyxjQUFELFFBQU0sS0FBTixBQUFXLFNBQVMsTUFBcEIsQUFBMEI7Z0JBQTFCO2tCQUFBLEFBQ0c7QUFESDtLQURGLEFBQ0UsQUFHQSwrQkFBQyxjQUFEOztnQkFBQTtrQkFBQSxBQUFZO0FBQVo7QUFBQSxLQUxKLEFBQ0UsQUFJRSxBQUVGLHlCQUFDLGNBQUQ7O2dCQUFBO2tCQUFBLEFBQWM7QUFBZDtBQUFBLEtBUkosQUFDRSxBQU9FLEFBR0w7QUFuQkQsQUFxQkE7O2tCQUFBLEFBQWU7OztBQUVmLElBQU0scUNBQUEsQUFBaUI7ZUFBakI7ZUFBQTtBQUFBLENBQVUsR0FBaEI7O0FBSUEsSUFBTSxrQ0FBQSxBQUFjO2VBQWQ7ZUFBQTtBQUFBLENBQU8sc0RBRUosYUFBQTtTQUFLLE9BQU8sRUFBUCxBQUFTLFFBQWQsQUFBc0I7QUFGekIsR0FHSSxhQUFBO1NBQUssT0FBTyxFQUFQLEFBQVMsU0FBZCxBQUF1QjtBQUgzQixHQUtGLGtCQUFBLEFBQU0sNEJBTFYsQUFBTTs7QUFXTixJQUFNLG1DQUFBLEFBQWU7ZUFBZjtlQUFBO0FBQUEsQ0FBUSx1SUFTVixrQkFBQSxBQUFNLDRCQVRWLEFBQU07O0FBY04sSUFBTSx1Q0FBQSxBQUFtQjtlQUFuQjtlQUFBO0FBQUEsQ0FBWSxHQUFsQjs7QUFLQSxJQUFNLHlDQUFBLEFBQXFCO2VBQXJCO2VBQUE7QUFBQSxDQUFjLDBFQUlULGFBQUE7U0FBSyxFQUFBLEFBQUUsTUFBRixBQUFRLE9BQWIsQUFBb0I7QUFKL0IsQUFBTSIsImZpbGUiOiJGZWF0dXJlSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/components/FeatureItem.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/components/FeatureItem.js"); } } })();

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(191);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _media = __webpack_require__(400);

var _Container = __webpack_require__(401);

var _Container2 = _interopRequireDefault(_Container);

var _SectionHeading = __webpack_require__(418);

var _SectionHeading2 = _interopRequireDefault(_SectionHeading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/sections/IsItReady.js';


var IsItReady = function IsItReady() {
  return _react2.default.createElement(Wrapper, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement(_Container2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement(_SectionHeading2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, 'Is it ready?'), _react2.default.createElement(Text, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement('p', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, 'I\u2019m working hard to ship the macOS app at later January, after that I\u2019ll start working on other desktop platforms and a mobile app. \uD83D\uDCAA'), _react2.default.createElement('p', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, 'If you like There\u2122, you can subscribe to the mailing list now!'))));
};

exports.default = IsItReady;


var Wrapper = _styledComponents2.default.aside.withConfig({
  displayName: 'IsItReady__Wrapper',
  componentId: 's1wlwcce-0'
})(['margin-top:130px;']);

var Text = _styledComponents2.default.div.withConfig({
  displayName: 'IsItReady__Text',
  componentId: 's1wlwcce-1'
})(['p{margin:13px 0 0 0;color:', ';&:first-child{margin-top:0;}}'], function (p) {
  return p.theme.colors.greyText;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlY3Rpb25zL0lzSXRSZWFkeS5qcyJdLCJuYW1lcyI6WyJzdHlsZWQiLCJjc3MiLCJwaG9uZSIsIkNvbnRhaW5lciIsIlNlY3Rpb25IZWFkaW5nIiwiSXNJdFJlYWR5IiwiV3JhcHBlciIsImFzaWRlIiwiVGV4dCIsImRpdiIsInAiLCJ0aGVtZSIsImNvbG9ycyIsImdyZXlUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFVOzs7O0FBRWpCLEFBQVMsQUFBYTs7QUFDdEIsQUFBTyxBQUFlOzs7O0FBQ3RCLEFBQU8sQUFBb0I7Ozs7Ozs7OztBQUUzQixJQUFNLFlBQVksU0FBWixBQUFZLFlBQUE7eUJBQ2YsY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRSxBQUFDOztnQkFBRDtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRSxBQUFDOztnQkFBRDtrQkFBQTtBQUFBO0FBQUEsS0FERixBQUNFLEFBQ0EsaUNBQUMsY0FBRDs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsY0FBQTs7Z0JBQUE7a0JBQUE7QUFBQTtBQUFBLEtBREYsQUFDRSxBQUlBLCtLQUFBLGNBQUE7O2dCQUFBO2tCQUFBO0FBQUE7QUFBQSxLQVRVLEFBQ2hCLEFBQ0UsQUFFRSxBQUtFO0FBVFIsQUFlQTs7a0JBQUEsQUFBZTs7O0FBRWYsSUFBTSxxQ0FBQSxBQUFpQjtlQUFqQjtlQUFBO0FBQUEsQ0FBVSxHQUFoQjs7QUFJQSxJQUFNLGtDQUFBLEFBQWM7ZUFBZDtlQUFBO0FBQUEsQ0FBTyxvRUFHQSxhQUFBO1NBQUssRUFBQSxBQUFFLE1BQUYsQUFBUSxPQUFiLEFBQW9CO0FBSGpDLEFBQU0iLCJmaWxlIjoiSXNJdFJlYWR5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tb2hhbW1hZC9Eb2N1bWVudHMvZGV2L3RoZXJlL3RoZXJlLXdlYnNpdGUifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/sections/IsItReady.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/sections/IsItReady.js"); } } })();

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = __webpack_require__(191);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Heading = _styledComponents2.default.h2.withConfig({
  displayName: 'SectionHeading__Heading',
  componentId: 's10rgaqv-0'
})(['margin:0;padding:0 0 20px 0;font-family:Playfair Display;font-weight:bold;font-size:65px;letter-spacing:-0.5px;color:', ';'], function (p) {
  return p.theme.colors.darkText;
});

exports.default = Heading;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU2VjdGlvbkhlYWRpbmcuanMiXSwibmFtZXMiOlsic3R5bGVkIiwiSGVhZGluZyIsImgyIiwicCIsInRoZW1lIiwiY29sb3JzIiwiZGFya1RleHQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7OztBQUVQLElBQU0scUNBQUEsQUFBaUI7ZUFBakI7ZUFBQTtBQUFBLENBQVUsa0lBU0wsYUFBQTtTQUFLLEVBQUEsQUFBRSxNQUFGLEFBQVEsT0FBYixBQUFvQjtBQVQvQixBQUFNLEFBWU47O2tCQUFBLEFBQWUiLCJmaWxlIjoiU2VjdGlvbkhlYWRpbmcuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/components/SectionHeading.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/components/SectionHeading.js"); } } })();

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(128)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  var invariant = __webpack_require__(37);
  var warning = __webpack_require__(38);
  var ReactPropTypesSecret = __webpack_require__(70);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(100);
exports.encode = exports.stringify = __webpack_require__(101);


/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ })

},[407]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzPzNkOGRkMDUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanM/M2Q4ZGQwNSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzPzNkOGRkMDUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanM/M2Q4ZGQwNSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanM/M2Q4ZGQwNSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGVkLWNvbXBvbmVudHMvZGlzdC9zdHlsZWQtY29tcG9uZW50cy5lcy5qcz8zZDhkZDA1Iiwid2VicGFjazovLy8uL3V0aWxzL3JlbS5qcz8zZDhkZDA1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzPzNkOGRkMDUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qcz8zZDhkZDA1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzPzNkOGRkMDUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLXBsYWluLW9iamVjdC9pbmRleC5qcz8zZDhkZDA1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc29iamVjdC9pbmRleC5qcz8zZDhkZDA1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsaXMvc3R5bGlzLmpzPzNkOGRkMDUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlZC1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9pbmRleC5qcz8zZDhkZDA1Iiwid2VicGFjazovLy8uL3V0aWxzL21lZGlhLmpzPzNkOGRkMDUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Db250YWluZXIuanM/M2Q4ZGQwNSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1N2Z3MuanM/M2Q4ZGQwNSIsIndlYnBhY2s6Ly8vLi9wYWdlcz8zZDhkZDA1Iiwid2VicGFjazovLy8uL3V0aWxzL3RoZW1lLmpzPzNkOGRkMDUiLCJ3ZWJwYWNrOi8vLy4vc2VjdGlvbnMvSGVyby5qcz81YzYyNzhhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb2xpc2hlZC9kaXN0L3BvbGlzaGVkLmVzLmpzPzVjNjI3OGEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHBTY3JlZW5zaG90LmpzPzVjNjI3OGEiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcmV0aW5hSW1hZ2UuanM/NWM2Mjc4YSIsIndlYnBhY2s6Ly8vLi9zZWN0aW9ucy9RdW90ZS5qcz81YzYyNzhhIiwid2VicGFjazovLy8uL3NlY3Rpb25zL0ZlYXR1cmVzLmpzPzVjNjI3OGEiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9GZWF0dXJlSXRlbS5qcz81YzYyNzhhIiwid2VicGFjazovLy8uL3NlY3Rpb25zL0lzSXRSZWFkeS5qcz81YzYyNzhhIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvU2VjdGlvbkhlYWRpbmcuanM/NWM2Mjc4YSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcz81YzYyNzhhIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzPzVjNjI3OGEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanM/NWM2Mjc4YSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanM/NWM2Mjc4YSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzPzVjNjI3OGEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5T2JqZWN0LmpzPzVjNjI3OGEiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChvYmpba10sIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbmZ1bmN0aW9uIG1hcCAoeHMsIGYpIHtcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmVzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjIuMFxuICogcmVhY3QuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMnKTtcblxuLy8gVE9ETzogdGhpcyBpcyBzcGVjaWFsIGJlY2F1c2UgaXQgZ2V0cyBpbXBvcnRlZCBkdXJpbmcgYnVpbGQuXG5cbnZhciBSZWFjdFZlcnNpb24gPSAnMTYuMi4wJztcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFsnZm9yJ107XG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2xbJ2ZvciddKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfQ0FMTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sWydmb3InXSgncmVhY3QuY2FsbCcpIDogMHhlYWM4O1xudmFyIFJFQUNUX1JFVFVSTl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sWydmb3InXSgncmVhY3QucmV0dXJuJykgOiAweGVhYzk7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2xbJ2ZvciddKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sWydmb3InXSgncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcblxudmFyIE1BWUJFX0lURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgaWYgKG1heWJlSXRlcmFibGUgPT09IG51bGwgfHwgdHlwZW9mIG1heWJlSXRlcmFibGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuICBpZiAodHlwZW9mIG1heWJlSXRlcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbWF5YmVJdGVyYXRvcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBXQVJOSU5HOiBETyBOT1QgbWFudWFsbHkgcmVxdWlyZSB0aGlzIG1vZHVsZS5cbiAqIFRoaXMgaXMgYSByZXBsYWNlbWVudCBmb3IgYGludmFyaWFudCguLi4pYCB1c2VkIGJ5IHRoZSBlcnJvciBjb2RlIHN5c3RlbVxuICogYW5kIHdpbGwgX29ubHlfIGJlIHJlcXVpcmVkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGJhYmVsIHBhc3MuXG4gKiBJdCBhbHdheXMgdGhyb3dzLlxuICovXG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nJDEgPSBsb3dQcmlvcml0eVdhcm5pbmc7XG5cbnZhciBkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnQgPSB7fTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29uc3RydWN0b3IgJiYgKGNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IGNvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJztcbiAgICB2YXIgd2FybmluZ0tleSA9IGNvbXBvbmVudE5hbWUgKyAnLicgKyBjYWxsZXJOYW1lO1xuICAgIGlmIChkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnRbd2FybmluZ0tleV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuXFxuXFxuUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbXBvbmVudE5hbWUpO1xuICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGNhbGxlck5hbWUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IE5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5cbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLCBjYWxsYmFjaywgJ2ZvcmNlVXBkYXRlJyk7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xue1xuICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gIH07XG4gIHZhciBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgaW5mbykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICBpZiAoZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSkge1xuICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgLy8gRHVwbGljYXRlZCBmcm9tIENvbXBvbmVudC5cbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG52YXIgcHVyZUNvbXBvbmVudFByb3RvdHlwZSA9IFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5wdXJlQ29tcG9uZW50UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUHVyZUNvbXBvbmVudDtcbi8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuX2Fzc2lnbihwdXJlQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG5mdW5jdGlvbiBBc3luY0NvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAvLyBEdXBsaWNhdGVkIGZyb20gQ29tcG9uZW50LlxuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxudmFyIGFzeW5jQ29tcG9uZW50UHJvdG90eXBlID0gQXN5bmNDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5hc3luY0NvbXBvbmVudFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFzeW5jQ29tcG9uZW50O1xuLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5fYXNzaWduKGFzeW5jQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcbmFzeW5jQ29tcG9uZW50UHJvdG90eXBlLnVuc3RhYmxlX2lzQXN5bmNSZWFjdENvbXBvbmVudCA9IHRydWU7XG5hc3luY0NvbXBvbmVudFByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xufTtcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG59O1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xuXG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd247XG52YXIgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRLZXkoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICB3YXJuaW5nKGZhbHNlLCAnJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgd2FybmluZyhmYWxzZSwgJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ1JlZi5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3JlZicsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBubyBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93IHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcblxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcblxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0pO1xuICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNlbGZcbiAgICB9KTtcbiAgICAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBzb3VyY2VcbiAgICB9KTtcbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY3JlYXRlZWxlbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIHByb3BzID0ge307XG5cbiAgdmFyIGtleSA9IG51bGw7XG4gIHZhciByZWYgPSBudWxsO1xuICB2YXIgc2VsZiA9IG51bGw7XG4gIHZhciBzb3VyY2UgPSBudWxsO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAge1xuICAgICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZShjaGlsZEFycmF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAge1xuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBSZWFjdEVsZW1lbnRzIG9mIGEgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY3JlYXRlZmFjdG9yeVxuICovXG5cblxuZnVuY3Rpb24gY2xvbmVBbmRSZXBsYWNlS2V5KG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjbG9uZWVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY2xvbmVFbGVtZW50KGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcbiAgdmFyIHByb3BzID0gX2Fzc2lnbih7fSwgZWxlbWVudC5wcm9wcyk7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmO1xuICAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cbiAgdmFyIHNvdXJjZSA9IGVsZW1lbnQuX3NvdXJjZTtcblxuICAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG4gIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2lzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIHZhbGlkIGNvbXBvbmVudC5cbiAqIEBmaW5hbFxuICovXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cblxudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSB7fTtcblxue1xuICAvLyBDb21wb25lbnQgdGhhdCBpcyBiZWluZyB3b3JrZWQgb25cbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2sgPSBudWxsO1xuXG4gIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW1wbCA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0Q3VycmVudFN0YWNrO1xuICAgIGlmIChpbXBsKSB7XG4gICAgICByZXR1cm4gaW1wbCgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbn1cblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlKGtleSkge1xuICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPSc6ICc9MCcsXG4gICAgJzonOiAnPTInXG4gIH07XG4gIHZhciBlc2NhcGVkU3RyaW5nID0gKCcnICsga2V5KS5yZXBsYWNlKGVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xuXG4gIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xufVxuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbn1cblxudmFyIFBPT0xfU0laRSA9IDEwO1xudmFyIHRyYXZlcnNlQ29udGV4dFBvb2wgPSBbXTtcbmZ1bmN0aW9uIGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChtYXBSZXN1bHQsIGtleVByZWZpeCwgbWFwRnVuY3Rpb24sIG1hcENvbnRleHQpIHtcbiAgaWYgKHRyYXZlcnNlQ29udGV4dFBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IHRyYXZlcnNlQ29udGV4dFBvb2wucG9wKCk7XG4gICAgdHJhdmVyc2VDb250ZXh0LnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgICB0cmF2ZXJzZUNvbnRleHQua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICAgIHRyYXZlcnNlQ29udGV4dC5mdW5jID0gbWFwRnVuY3Rpb247XG4gICAgdHJhdmVyc2VDb250ZXh0LmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICAgIHRyYXZlcnNlQ29udGV4dC5jb3VudCA9IDA7XG4gICAgcmV0dXJuIHRyYXZlcnNlQ29udGV4dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0OiBtYXBSZXN1bHQsXG4gICAgICBrZXlQcmVmaXg6IGtleVByZWZpeCxcbiAgICAgIGZ1bmM6IG1hcEZ1bmN0aW9uLFxuICAgICAgY29udGV4dDogbWFwQ29udGV4dCxcbiAgICAgIGNvdW50OiAwXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCkge1xuICB0cmF2ZXJzZUNvbnRleHQucmVzdWx0ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmtleVByZWZpeCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5mdW5jID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmNvbnRleHQgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuY291bnQgPSAwO1xuICBpZiAodHJhdmVyc2VDb250ZXh0UG9vbC5sZW5ndGggPCBQT09MX1NJWkUpIHtcbiAgICB0cmF2ZXJzZUNvbnRleHRQb29sLnB1c2godHJhdmVyc2VDb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICB2YXIgaW52b2tlQ2FsbGJhY2sgPSBmYWxzZTtcblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHN3aXRjaCAoY2hpbGRyZW4uJCR0eXBlb2YpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NBTExfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1JFVFVSTl9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW52b2tlQ2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQ7XG4gIHZhciBuZXh0TmFtZTtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB7XG4gICAgICAgIC8vIFdhcm4gYWJvdXQgdXNpbmcgTWFwcyBhcyBjaGlsZHJlblxuICAgICAgICBpZiAoaXRlcmF0b3JGbiA9PT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICAgIHdhcm5pbmcoZGlkV2FybkFib3V0TWFwcywgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgdW5zdXBwb3J0ZWQgYW5kIHdpbGwgbGlrZWx5IHlpZWxkICcgKyAndW5leHBlY3RlZCByZXN1bHRzLiBDb252ZXJ0IGl0IHRvIGEgc2VxdWVuY2UvaXRlcmFibGUgb2Yga2V5ZWQgJyArICdSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKSk7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGNoaWxkcmVuKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIGlpID0gMDtcbiAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpaSsrKTtcbiAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICB7XG4gICAgICAgIGFkZGVuZHVtID0gJyBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5ICcgKyAnaW5zdGVhZC4nICsgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSAnJyArIGNoaWxkcmVuO1xuICAgICAgaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50ICE9PSBudWxsICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBlc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChudWxsLCBudWxsLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQsXG4gICAgICBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXgsXG4gICAgICBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKGlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLmNvdW50XG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsLCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLnRvYXJyYXlcbiAqL1xuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ub25seVxuICpcbiAqIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHNcbiAqIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZSBwdXJwb3NlIG9mIHRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHRvXG4gKiBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZSBvZiBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IGNoaWxkcmVuIENoaWxkIGNvbGxlY3Rpb24gc3RydWN0dXJlLlxuICogQHJldHVybiB7UmVhY3RFbGVtZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0RWxlbWVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbnZhciBkZXNjcmliZUNvbXBvbmVudEZyYW1lID0gZnVuY3Rpb24gKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHJldHVybiAnXFxuICAgIGluICcgKyAobmFtZSB8fCAnVW5rbm93bicpICsgKHNvdXJjZSA/ICcgKGF0ICcgKyBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKScgOiBvd25lck5hbWUgPyAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKScgOiAnJyk7XG59O1xuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKGZpYmVyKSB7XG4gIHZhciB0eXBlID0gZmliZXIudHlwZTtcblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFJlYWN0RWxlbWVudFZhbGlkYXRvciBwcm92aWRlcyBhIHdyYXBwZXIgYXJvdW5kIGEgZWxlbWVudCBmYWN0b3J5XG4gKiB3aGljaCB2YWxpZGF0ZXMgdGhlIHByb3BzIHBhc3NlZCB0byB0aGUgZWxlbWVudC4gVGhpcyBpcyBpbnRlbmRlZCB0byBiZVxuICogdXNlZCBvbmx5IGluIERFViBhbmQgY291bGQgYmUgcmVwbGFjZWQgYnkgYSBzdGF0aWMgdHlwZSBjaGVja2VyIGZvciBsYW5ndWFnZXNcbiAqIHRoYXQgc3VwcG9ydCBpdC5cbiAqL1xuXG57XG4gIHZhciBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG5cbiAgdmFyIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gZmFsc2U7XG5cbiAgdmFyIGdldERpc3BsYXlOYW1lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyNlbXB0eSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJyN0ZXh0JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC50eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgICByZXR1cm4gJ1JlYWN0LkZyYWdtZW50JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVsZW1lbnQudHlwZS5kaXNwbGF5TmFtZSB8fCBlbGVtZW50LnR5cGUubmFtZSB8fCAnVW5rbm93bic7XG4gICAgfVxuICB9O1xuXG4gIHZhciBnZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFjayA9ICcnO1xuICAgIGlmIChjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXREaXNwbGF5TmFtZShjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCk7XG4gICAgICB2YXIgb3duZXIgPSBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudC5fb3duZXI7XG4gICAgICBzdGFjayArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIGdldENvbXBvbmVudE5hbWUob3duZXIpKTtcbiAgICB9XG4gICAgc3RhY2sgKz0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCkgfHwgJyc7XG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xuXG4gIHZhciBWQUxJRF9GUkFHTUVOVF9QUk9QUyA9IG5ldyBNYXAoW1snY2hpbGRyZW4nLCB0cnVlXSwgWydrZXknLCB0cnVlXV0pO1xufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oZWxlbWVudFByb3BzKSB7XG4gIGlmIChlbGVtZW50UHJvcHMgIT09IG51bGwgJiYgZWxlbWVudFByb3BzICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudFByb3BzLl9fc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudFByb3BzLl9fc291cmNlO1xuICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgdmFyIGxpbmVOdW1iZXIgPSBzb3VyY2UubGluZU51bWJlcjtcbiAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgdmFyIGNoaWxkT3duZXIgPSAnJztcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZ2V0Q29tcG9uZW50TmFtZShlbGVtZW50Ll9vd25lcikgKyAnLic7XG4gIH1cblxuICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IGVsZW1lbnQ7XG4gIHtcbiAgICB3YXJuaW5nKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhbiBhcnJheSBvciBpdGVyYXRvciBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4lcycsIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8sIGNoaWxkT3duZXIsIGdldFN0YWNrQWRkZW5kdW0oKSk7XG4gIH1cbiAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBudWxsO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogd2l0aCB2YWxpZCBrZXkgcHJvcGVydHkuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZSBTdGF0aWNhbGx5IHBhc3NlZCBjaGlsZCBvZiBhbnkgdHlwZS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDaGlsZEtleXMobm9kZSwgcGFyZW50VHlwZSkge1xuICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEVudHJ5IGl0ZXJhdG9ycyB1c2VkIHRvIHByb3ZpZGUgaW1wbGljaXQga2V5cyxcbiAgICAgIC8vIGJ1dCBub3cgd2UgcHJpbnQgYSBzZXBhcmF0ZSB3YXJuaW5nIGZvciB0aGVtIGxhdGVyLlxuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG4gIHZhciBwcm9wVHlwZXMgPSBjb21wb25lbnRDbGFzcy5wcm9wVHlwZXM7XG4gIGlmIChwcm9wVHlwZXMpIHtcbiAgICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgY2hlY2tQcm9wVHlwZXMocHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIGdldFN0YWNrQWRkZW5kdW0pO1xuICAgIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gbnVsbDtcbiAgfSBlbHNlIGlmIChjb21wb25lbnRDbGFzcy5Qcm9wVHlwZXMgIT09IHVuZGVmaW5lZCAmJiAhcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24pIHtcbiAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgd2FybmluZyhmYWxzZSwgJ0NvbXBvbmVudCAlcyBkZWNsYXJlZCBgUHJvcFR5cGVzYCBpbnN0ZWFkIG9mIGBwcm9wVHlwZXNgLiBEaWQgeW91IG1pc3NwZWxsIHRoZSBwcm9wZXJ0eSBhc3NpZ25tZW50PycsIG5hbWUgfHwgJ1Vua25vd24nKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHdhcm5pbmcoY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpO1xuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYSBmcmFnbWVudCwgdmFsaWRhdGUgdGhhdCBpdCBjYW4gb25seSBiZSBwcm92aWRlZCB3aXRoIGZyYWdtZW50IHByb3BzXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZnJhZ21lbnRcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVGcmFnbWVudFByb3BzKGZyYWdtZW50KSB7XG4gIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZnJhZ21lbnQ7XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gT2JqZWN0LmtleXMoZnJhZ21lbnQucHJvcHMpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGtleSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICBpZiAoIVZBTElEX0ZSQUdNRU5UX1BST1BTLmhhcyhrZXkpKSB7XG4gICAgICAgIHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJXMnLCBrZXksIGdldFN0YWNrQWRkZW5kdW0oKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yWydyZXR1cm4nXSkge1xuICAgICAgICBfaXRlcmF0b3JbJ3JldHVybiddKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXR0cmlidXRlIGByZWZgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuJXMnLCBnZXRTdGFja0FkZGVuZHVtKCkpO1xuICB9XG5cbiAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciB2YWxpZFR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHR5cGUgPT09ICdzeW1ib2wnIHx8IHR5cGVvZiB0eXBlID09PSAnbnVtYmVyJztcbiAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArIFwiaXQncyBkZWZpbmVkIGluLCBvciB5b3UgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBuYW1lZCBpbXBvcnRzLlwiO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0ocHJvcHMpO1xuICAgIGlmIChzb3VyY2VJbmZvKSB7XG4gICAgICBpbmZvICs9IHNvdXJjZUluZm87XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm8gKz0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG4gICAgfVxuXG4gICAgaW5mbyArPSBnZXRTdGFja0FkZGVuZHVtKCkgfHwgJyc7XG5cbiAgICB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlID09IG51bGwgPyB0eXBlIDogdHlwZW9mIHR5cGUsIGluZm8pO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICBpZiAodmFsaWRUeXBlKSB7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3ltYm9sJyAmJiB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgdmFsaWRhdGVGcmFnbWVudFByb3BzKGVsZW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZhY3RvcnlXaXRoVmFsaWRhdGlvbih0eXBlKSB7XG4gIHZhciB2YWxpZGF0ZWRGYWN0b3J5ID0gY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uLmJpbmQobnVsbCwgdHlwZSk7XG4gIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuXG4gIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB2YWxpZGF0ZWRGYWN0b3J5O1xufVxuXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbihlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBjbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gIH1cbiAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gIHJldHVybiBuZXdFbGVtZW50O1xufVxuXG52YXIgUmVhY3QgPSB7XG4gIENoaWxkcmVuOiB7XG4gICAgbWFwOiBtYXBDaGlsZHJlbixcbiAgICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gICAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gICAgdG9BcnJheTogdG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBDb21wb25lbnQ6IENvbXBvbmVudCxcbiAgUHVyZUNvbXBvbmVudDogUHVyZUNvbXBvbmVudCxcbiAgdW5zdGFibGVfQXN5bmNDb21wb25lbnQ6IEFzeW5jQ29tcG9uZW50LFxuXG4gIEZyYWdtZW50OiBSRUFDVF9GUkFHTUVOVF9UWVBFLFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbixcbiAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbixcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uLFxuICBpc1ZhbGlkRWxlbWVudDogaXNWYWxpZEVsZW1lbnQsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uLFxuXG4gIF9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEOiB7XG4gICAgUmVhY3RDdXJyZW50T3duZXI6IFJlYWN0Q3VycmVudE93bmVyLFxuICAgIC8vIFVzZWQgYnkgcmVuZGVyZXJzIHRvIGF2b2lkIGJ1bmRsaW5nIG9iamVjdC1hc3NpZ24gdHdpY2UgaW4gVU1EIGJ1bmRsZXM6XG4gICAgYXNzaWduOiBfYXNzaWduXG4gIH1cbn07XG5cbntcbiAgX2Fzc2lnbihSZWFjdC5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCwge1xuICAgIC8vIFRoZXNlIHNob3VsZCBub3QgYmUgaW5jbHVkZWQgaW4gcHJvZHVjdGlvbi5cbiAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lOiBSZWFjdERlYnVnQ3VycmVudEZyYW1lLFxuICAgIC8vIFNoaW0gZm9yIFJlYWN0IERPTSAxNi4wLjAgd2hpY2ggc3RpbGwgZGVzdHJ1Y3R1cmVkIChidXQgbm90IHVzZWQpIHRoaXMuXG4gICAgLy8gVE9ETzogcmVtb3ZlIGluIFJlYWN0IDE3LjAuXG4gICAgUmVhY3RDb21wb25lbnRUcmVlSG9vazoge31cbiAgfSk7XG59XG5cblxuXG52YXIgUmVhY3QkMiA9IE9iamVjdC5mcmVlemUoe1xuXHRkZWZhdWx0OiBSZWFjdFxufSk7XG5cbnZhciBSZWFjdCQzID0gKCBSZWFjdCQyICYmIFJlYWN0ICkgfHwgUmVhY3QkMjtcblxuLy8gVE9ETzogZGVjaWRlIG9uIHRoZSB0b3AtbGV2ZWwgZXhwb3J0IGZvcm0uXG4vLyBUaGlzIGlzIGhhY2t5IGJ1dCBtYWtlcyBpdCB3b3JrIHdpdGggYm90aCBSb2xsdXAgYW5kIEplc3QuXG52YXIgcmVhY3QgPSBSZWFjdCQzWydkZWZhdWx0J10gPyBSZWFjdCQzWydkZWZhdWx0J10gOiBSZWFjdCQzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlYWN0O1xuICB9KSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJXNgIHByb3Agb24gYCVzYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLicsXG4gICAgICAgICAgICAgIHByb3BGdWxsTmFtZSxcbiAgICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICVzIGF0IGluZGV4ICVzLicsXG4gICAgICAgICAgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpLFxuICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qc1xuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSIsImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2lzLXBsYWluLW9iamVjdCc7XG5pbXBvcnQgU3R5bGlzIGZyb20gJ3N0eWxpcyc7XG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBob2lzdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG52YXIgX3VwcGVyY2FzZVBhdHRlcm4gPSAvKFtBLVpdKS9nO1xuXG4vKipcbiAqIEh5cGhlbmF0ZXMgYSBjYW1lbGNhc2VkIHN0cmluZywgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGh5cGhlbmF0ZSgnYmFja2dyb3VuZENvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmQtY29sb3JcIlxuICpcbiAqIEZvciBDU1Mgc3R5bGUgbmFtZXMsIHVzZSBgaHlwaGVuYXRlU3R5bGVOYW1lYCBpbnN0ZWFkIHdoaWNoIHdvcmtzIHByb3Blcmx5XG4gKiB3aXRoIGFsbCB2ZW5kb3IgcHJlZml4ZXMsIGluY2x1ZGluZyBgbXNgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gaHlwaGVuYXRlJDIoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShfdXBwZXJjYXNlUGF0dGVybiwgJy0kMScpLnRvTG93ZXJDYXNlKCk7XG59XG5cbnZhciBoeXBoZW5hdGVfMSA9IGh5cGhlbmF0ZSQyO1xuXG52YXIgaHlwaGVuYXRlID0gaHlwaGVuYXRlXzE7XG5cbnZhciBtc1BhdHRlcm4gPSAvXm1zLS87XG5cbi8qKlxuICogSHlwaGVuYXRlcyBhIGNhbWVsY2FzZWQgQ1NTIHByb3BlcnR5IG5hbWUsIGZvciBleGFtcGxlOlxuICpcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ2JhY2tncm91bmRDb2xvcicpXG4gKiAgIDwgXCJiYWNrZ3JvdW5kLWNvbG9yXCJcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ01velRyYW5zaXRpb24nKVxuICogICA8IFwiLW1vei10cmFuc2l0aW9uXCJcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ21zVHJhbnNpdGlvbicpXG4gKiAgIDwgXCItbXMtdHJhbnNpdGlvblwiXG4gKlxuICogQXMgTW9kZXJuaXpyIHN1Z2dlc3RzIChodHRwOi8vbW9kZXJuaXpyLmNvbS9kb2NzLyNwcmVmaXhlZCksIGFuIGBtc2AgcHJlZml4XG4gKiBpcyBjb252ZXJ0ZWQgdG8gYC1tcy1gLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gaHlwaGVuYXRlU3R5bGVOYW1lKHN0cmluZykge1xuICByZXR1cm4gaHlwaGVuYXRlKHN0cmluZykucmVwbGFjZShtc1BhdHRlcm4sICctbXMtJyk7XG59XG5cbnZhciBoeXBoZW5hdGVTdHlsZU5hbWVfMSA9IGh5cGhlbmF0ZVN0eWxlTmFtZTtcblxuLy8gICAgICBcbnZhciBvYmpUb0NzcyA9IGZ1bmN0aW9uIG9ialRvQ3NzKG9iaiwgcHJldktleSkge1xuICB2YXIgY3NzID0gT2JqZWN0LmtleXMob2JqKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBjaHVuayA9IG9ialtrZXldO1xuICAgIHJldHVybiBjaHVuayAhPT0gdW5kZWZpbmVkICYmIGNodW5rICE9PSBudWxsICYmIGNodW5rICE9PSBmYWxzZSAmJiBjaHVuayAhPT0gJyc7XG4gIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3Qob2JqW2tleV0pKSByZXR1cm4gb2JqVG9Dc3Mob2JqW2tleV0sIGtleSk7XG4gICAgcmV0dXJuIGh5cGhlbmF0ZVN0eWxlTmFtZV8xKGtleSkgKyAnOiAnICsgb2JqW2tleV0gKyAnOyc7XG4gIH0pLmpvaW4oJyAnKTtcbiAgcmV0dXJuIHByZXZLZXkgPyBwcmV2S2V5ICsgJyB7XFxuICAnICsgY3NzICsgJ1xcbn0nIDogY3NzO1xufTtcblxudmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiBmbGF0dGVuKGNodW5rcywgZXhlY3V0aW9uQ29udGV4dCkge1xuICByZXR1cm4gY2h1bmtzLnJlZHVjZShmdW5jdGlvbiAocnVsZVNldCwgY2h1bmspIHtcbiAgICAvKiBSZW1vdmUgZmFsc2V5IHZhbHVlcyAqL1xuICAgIGlmIChjaHVuayA9PT0gdW5kZWZpbmVkIHx8IGNodW5rID09PSBudWxsIHx8IGNodW5rID09PSBmYWxzZSB8fCBjaHVuayA9PT0gJycpIHtcbiAgICAgIHJldHVybiBydWxlU2V0O1xuICAgIH1cbiAgICAvKiBGbGF0dGVuIHJ1bGVTZXQgKi9cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaHVuaykpIHtcbiAgICAgIHJldHVybiBbXS5jb25jYXQocnVsZVNldCwgZmxhdHRlbihjaHVuaywgZXhlY3V0aW9uQ29udGV4dCkpO1xuICAgIH1cblxuICAgIC8qIEhhbmRsZSBvdGhlciBjb21wb25lbnRzICovXG4gICAgaWYgKGNodW5rLmhhc093blByb3BlcnR5KCdzdHlsZWRDb21wb25lbnRJZCcpKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lIG5vdCBzdXJlIGhvdyB0byBtYWtlIHRoaXMgcGFzc1xuICAgICAgcmV0dXJuIFtdLmNvbmNhdChydWxlU2V0LCBbJy4nICsgY2h1bmsuc3R5bGVkQ29tcG9uZW50SWRdKTtcbiAgICB9XG5cbiAgICAvKiBFaXRoZXIgZXhlY3V0ZSBvciBkZWZlciB0aGUgZnVuY3Rpb24gKi9cbiAgICBpZiAodHlwZW9mIGNodW5rID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gZXhlY3V0aW9uQ29udGV4dCA/IHJ1bGVTZXQuY29uY2F0LmFwcGx5KHJ1bGVTZXQsIGZsYXR0ZW4oW2NodW5rKGV4ZWN1dGlvbkNvbnRleHQpXSwgZXhlY3V0aW9uQ29udGV4dCkpIDogcnVsZVNldC5jb25jYXQoY2h1bmspO1xuICAgIH1cblxuICAgIC8qIEhhbmRsZSBvYmplY3RzICovXG4gICAgcmV0dXJuIHJ1bGVTZXQuY29uY2F0KFxuICAgIC8vICRGbG93Rml4TWUgaGF2ZSB0byBhZGQgJWNoZWNrcyBzb21laG93IHRvIGlzUGxhaW5PYmplY3RcbiAgICBpc1BsYWluT2JqZWN0KGNodW5rKSA/IG9ialRvQ3NzKGNodW5rKSA6IGNodW5rLnRvU3RyaW5nKCkpO1xuICB9LCBbXSk7XG59O1xuXG4vLyAgICAgIFxudmFyIHN0eWxpcyA9IG5ldyBTdHlsaXMoe1xuICBnbG9iYWw6IGZhbHNlLFxuICBjYXNjYWRlOiB0cnVlLFxuICBrZXlmcmFtZTogZmFsc2UsXG4gIHByZWZpeDogdHJ1ZSxcbiAgY29tcHJlc3M6IGZhbHNlLFxuICBzZW1pY29sb246IHRydWVcbn0pO1xuXG52YXIgc3RyaW5naWZ5UnVsZXMgPSBmdW5jdGlvbiBzdHJpbmdpZnlSdWxlcyhydWxlcywgc2VsZWN0b3IsIHByZWZpeCkge1xuICB2YXIgZmxhdENTUyA9IHJ1bGVzLmpvaW4oJycpLnJlcGxhY2UoL15cXHMqXFwvXFwvLiokL2dtLCAnJyk7IC8vIHJlcGxhY2UgSlMgY29tbWVudHNcblxuICB2YXIgY3NzU3RyID0gc2VsZWN0b3IgJiYgcHJlZml4ID8gcHJlZml4ICsgJyAnICsgc2VsZWN0b3IgKyAnIHsgJyArIGZsYXRDU1MgKyAnIH0nIDogZmxhdENTUztcblxuICByZXR1cm4gc3R5bGlzKHByZWZpeCB8fCAhc2VsZWN0b3IgPyAnJyA6IHNlbGVjdG9yLCBjc3NTdHIpO1xufTtcblxuLy8gICAgICBcbnZhciBjaGFycyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJy5zcGxpdCgnJyk7XG52YXIgY2hhcnNMZW5ndGggPSBjaGFycy5sZW5ndGg7XG5cbi8qIFNvbWUgaGlnaCBudW1iZXIsIHVzdWFsbHkgOS1kaWdpdCBiYXNlLTEwLiBNYXAgaXQgdG8gYmFzZS3wn5iOICovXG52YXIgZ2VuZXJhdGVBbHBoYWJldGljTmFtZSA9IGZ1bmN0aW9uIGdlbmVyYXRlQWxwaGFiZXRpY05hbWUoY29kZSkge1xuICB2YXIgbmFtZSA9ICcnO1xuICB2YXIgeCA9IHZvaWQgMDtcblxuICBmb3IgKHggPSBjb2RlOyB4ID4gY2hhcnNMZW5ndGg7IHggPSBNYXRoLmZsb29yKHggLyBjaGFyc0xlbmd0aCkpIHtcbiAgICBuYW1lID0gY2hhcnNbeCAlIGNoYXJzTGVuZ3RoXSArIG5hbWU7XG4gIH1cblxuICByZXR1cm4gY2hhcnNbeCAlIGNoYXJzTGVuZ3RoXSArIG5hbWU7XG59O1xuXG4vLyAgICAgIFxuXG5cbnZhciBpbnRlcmxlYXZlID0gKGZ1bmN0aW9uIChzdHJpbmdzLCBpbnRlcnBvbGF0aW9ucykge1xuICByZXR1cm4gaW50ZXJwb2xhdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChhcnJheSwgaW50ZXJwLCBpKSB7XG4gICAgcmV0dXJuIGFycmF5LmNvbmNhdChpbnRlcnAsIHN0cmluZ3NbaSArIDFdKTtcbiAgfSwgW3N0cmluZ3NbMF1dKTtcbn0pO1xuXG4vLyAgICAgIFxudmFyIGNzcyA9IChmdW5jdGlvbiAoc3RyaW5ncykge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgaW50ZXJwb2xhdGlvbnMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgaW50ZXJwb2xhdGlvbnNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZsYXR0ZW4oaW50ZXJsZWF2ZShzdHJpbmdzLCBpbnRlcnBvbGF0aW9ucykpO1xufSk7XG5cbi8vICAgICAgXG52YXIgU0NfQ09NUE9ORU5UX0lEID0gL15bXlxcU1xcbl0qP1xcL1xcKiBzYy1jb21wb25lbnQtaWQ6XFxzKyhcXFMrKVxccytcXCpcXC8vZ207XG5cbnZhciBleHRyYWN0Q29tcHNGcm9tQ1NTID0gKGZ1bmN0aW9uIChtYXliZUNTUykge1xuICB2YXIgY3NzID0gJycgKyAobWF5YmVDU1MgfHwgJycpOyAvLyBEZWZpbml0ZWx5IGEgc3RyaW5nLCBhbmQgYSBjbG9uZVxuICB2YXIgZXhpc3RpbmdDb21wb25lbnRzID0gW107XG4gIGNzcy5yZXBsYWNlKFNDX0NPTVBPTkVOVF9JRCwgZnVuY3Rpb24gKG1hdGNoLCBjb21wb25lbnRJZCwgbWF0Y2hJbmRleCkge1xuICAgIGV4aXN0aW5nQ29tcG9uZW50cy5wdXNoKHsgY29tcG9uZW50SWQ6IGNvbXBvbmVudElkLCBtYXRjaEluZGV4OiBtYXRjaEluZGV4IH0pO1xuICAgIHJldHVybiBtYXRjaDtcbiAgfSk7XG4gIHJldHVybiBleGlzdGluZ0NvbXBvbmVudHMubWFwKGZ1bmN0aW9uIChfcmVmLCBpKSB7XG4gICAgdmFyIGNvbXBvbmVudElkID0gX3JlZi5jb21wb25lbnRJZCxcbiAgICAgICAgbWF0Y2hJbmRleCA9IF9yZWYubWF0Y2hJbmRleDtcblxuICAgIHZhciBuZXh0Q29tcCA9IGV4aXN0aW5nQ29tcG9uZW50c1tpICsgMV07XG4gICAgdmFyIGNzc0Zyb21ET00gPSBuZXh0Q29tcCA/IGNzcy5zbGljZShtYXRjaEluZGV4LCBuZXh0Q29tcC5tYXRjaEluZGV4KSA6IGNzcy5zbGljZShtYXRjaEluZGV4KTtcbiAgICByZXR1cm4geyBjb21wb25lbnRJZDogY29tcG9uZW50SWQsIGNzc0Zyb21ET006IGNzc0Zyb21ET00gfTtcbiAgfSk7XG59KTtcblxuLy8gICAgICBcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSwgbm8tdW5kZWYgKi9cblxudmFyIGdldE5vbmNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbn0pO1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cblxuXG5cblxuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuXG5cblxuXG5cblxuXG52YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG4vLyAgICAgIFxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbi8qXG4gKiBCcm93c2VyIFN0eWxlIFNoZWV0IHdpdGggUmVoeWRyYXRpb25cbiAqXG4gKiA8c3R5bGUgZGF0YS1zdHlsZWQtY29tcG9uZW50cz1cInggeSB6XCJcbiAqICAgICAgICBkYXRhLXN0eWxlZC1jb21wb25lbnRzLWlzLWxvY2FsPVwidHJ1ZVwiPlxuICogICAvwrcgc2MtY29tcG9uZW50LWlkOiBhIMK3L1xuICogICAuc2MtYSB7IC4uLiB9XG4gKiAgIC54IHsgLi4uIH1cbiAqICAgL8K3IHNjLWNvbXBvbmVudC1pZDogYiDCty9cbiAqICAgLnNjLWIgeyAuLi4gfVxuICogICAueSB7IC4uLiB9XG4gKiAgIC56IHsgLi4uIH1cbiAqIDwvc3R5bGU+XG4gKlxuICogTm90ZTogcmVwbGFjZSDCtyB3aXRoICogaW4gdGhlIGFib3ZlIHNuaXBwZXQuXG4gKiAqL1xudmFyIENPTVBPTkVOVFNfUEVSX1RBRyA9IDQwO1xuXG52YXIgQnJvd3NlclRhZyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQnJvd3NlclRhZyhlbCwgaXNMb2NhbCkge1xuICAgIHZhciBleGlzdGluZ1NvdXJjZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJyc7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQnJvd3NlclRhZyk7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5pc0xvY2FsID0gaXNMb2NhbDtcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG5cbiAgICB2YXIgZXh0cmFjdGVkQ29tcHMgPSBleHRyYWN0Q29tcHNGcm9tQ1NTKGV4aXN0aW5nU291cmNlKTtcblxuICAgIHRoaXMuc2l6ZSA9IGV4dHJhY3RlZENvbXBzLmxlbmd0aDtcbiAgICB0aGlzLmNvbXBvbmVudHMgPSBleHRyYWN0ZWRDb21wcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgb2JqKSB7XG4gICAgICBhY2Nbb2JqLmNvbXBvbmVudElkXSA9IG9iajsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICBCcm93c2VyVGFnLnByb3RvdHlwZS5pc0Z1bGwgPSBmdW5jdGlvbiBpc0Z1bGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA+PSBDT01QT05FTlRTX1BFUl9UQUc7XG4gIH07XG5cbiAgQnJvd3NlclRhZy5wcm90b3R5cGUuYWRkQ29tcG9uZW50ID0gZnVuY3Rpb24gYWRkQ29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gICAgaWYgKCF0aGlzLnJlYWR5KSB0aGlzLnJlcGxhY2VFbGVtZW50KCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy5jb21wb25lbnRzW2NvbXBvbmVudElkXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gYWRkIENvbXBvbmVudCBcXCcnICsgY29tcG9uZW50SWQgKyAnXFwnIHR3aWNlIScpO1xuICAgIH1cblxuICAgIHZhciBjb21wID0geyBjb21wb25lbnRJZDogY29tcG9uZW50SWQsIHRleHROb2RlOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykgfTtcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGNvbXAudGV4dE5vZGUpO1xuXG4gICAgdGhpcy5zaXplICs9IDE7XG4gICAgdGhpcy5jb21wb25lbnRzW2NvbXBvbmVudElkXSA9IGNvbXA7XG4gIH07XG5cbiAgQnJvd3NlclRhZy5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gaW5qZWN0KGNvbXBvbmVudElkLCBjc3MsIG5hbWUpIHtcbiAgICBpZiAoIXRoaXMucmVhZHkpIHRoaXMucmVwbGFjZUVsZW1lbnQoKTtcbiAgICB2YXIgY29tcCA9IHRoaXMuY29tcG9uZW50c1tjb21wb25lbnRJZF07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhY29tcCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGFkZCBhIG5ldyBjb21wb25lbnQgYmVmb3JlIHlvdSBjYW4gaW5qZWN0IGNzcyBpbnRvIGl0Jyk7XG4gICAgfVxuICAgIGlmIChjb21wLnRleHROb2RlLmRhdGEgPT09ICcnKSB7XG4gICAgICBjb21wLnRleHROb2RlLmFwcGVuZERhdGEoJ1xcbi8qIHNjLWNvbXBvbmVudC1pZDogJyArIGNvbXBvbmVudElkICsgJyAqL1xcbicpO1xuICAgIH1cblxuICAgIGNvbXAudGV4dE5vZGUuYXBwZW5kRGF0YShjc3MpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICB2YXIgZXhpc3RpbmdOYW1lcyA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKFNDX0FUVFIpO1xuICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoU0NfQVRUUiwgZXhpc3RpbmdOYW1lcyA/IGV4aXN0aW5nTmFtZXMgKyAnICcgKyBuYW1lIDogbmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgIH1cbiAgfTtcblxuICBCcm93c2VyVGFnLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbiB0b0hUTUwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWwub3V0ZXJIVE1MO1xuICB9O1xuXG4gIEJyb3dzZXJUYWcucHJvdG90eXBlLnRvUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gdG9SZWFjdEVsZW1lbnQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQnJvd3NlclRhZyBkb2Vzbid0IGltcGxlbWVudCB0b1JlYWN0RWxlbWVudCFcIik7XG4gIH07XG5cbiAgQnJvd3NlclRhZy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXJUYWcgY2Fubm90IGJlIGNsb25lZCEnKTtcbiAgfTtcblxuICAvKiBCZWNhdXNlIHdlIGNhcmUgYWJvdXQgc291cmNlIG9yZGVyLCBiZWZvcmUgd2UgY2FuIGluamVjdCBhbnl0aGluZyB3ZSBuZWVkIHRvXG4gICAqIGNyZWF0ZSBhIHRleHQgbm9kZSBmb3IgZWFjaCBjb21wb25lbnQgYW5kIHJlcGxhY2UgdGhlIGV4aXN0aW5nIENTUy4gKi9cblxuXG4gIEJyb3dzZXJUYWcucHJvdG90eXBlLnJlcGxhY2VFbGVtZW50ID0gZnVuY3Rpb24gcmVwbGFjZUVsZW1lbnQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgIC8vIFdlIGhhdmUgbm90aGluZyB0byBpbmplY3QuIFVzZSB0aGUgY3VycmVudCBlbC5cbiAgICBpZiAodGhpcy5zaXplID09PSAwKSByZXR1cm47XG5cbiAgICAvLyBCdWlsZCB1cCBvdXIgcmVwbGFjZW1lbnQgc3R5bGUgdGFnXG4gICAgdmFyIG5ld0VsID0gdGhpcy5lbC5jbG9uZU5vZGUoKTtcbiAgICBuZXdFbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnXFxuJykpO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBjb21wID0gX3RoaXMuY29tcG9uZW50c1trZXldO1xuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGNvbXAudGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb21wLmNzc0Zyb21ET00pO1xuICAgICAgbmV3RWwuYXBwZW5kQ2hpbGQoY29tcC50ZXh0Tm9kZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuZWwucGFyZW50Tm9kZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJ5aW5nIHRvIHJlcGxhY2UgYW4gZWxlbWVudCB0aGF0IHdhc24ndCBtb3VudGVkIVwiKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgb2wnIHN3aXRjaGVyb29cbiAgICB0aGlzLmVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsLCB0aGlzLmVsKTtcbiAgICB0aGlzLmVsID0gbmV3RWw7XG4gIH07XG5cbiAgcmV0dXJuIEJyb3dzZXJUYWc7XG59KCk7XG5cbi8qIEZhY3RvcnkgZnVuY3Rpb24gdG8gc2VwYXJhdGUgRE9NIG9wZXJhdGlvbnMgZnJvbSBsb2dpY2FsIG9uZXMqL1xuXG5cbnZhciBCcm93c2VyU3R5bGVTaGVldCA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIHRhZ3MgPSBbXTtcbiAgICB2YXIgbmFtZXMgPSB7fTtcblxuICAgIC8qIENvbnN0cnVjdCBleGlzdGluZyBzdGF0ZSBmcm9tIERPTSAqL1xuICAgIHZhciBub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgU0NfQVRUUiArICddJyk7XG4gICAgdmFyIG5vZGVzTGVuZ3RoID0gbm9kZXMubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlc0xlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZWwgPSBub2Rlc1tpXTtcblxuICAgICAgdGFncy5wdXNoKG5ldyBCcm93c2VyVGFnKGVsLCBlbC5nZXRBdHRyaWJ1dGUoTE9DQUxfQVRUUikgPT09ICd0cnVlJywgZWwuaW5uZXJIVE1MKSk7XG5cbiAgICAgIHZhciBhdHRyID0gZWwuZ2V0QXR0cmlidXRlKFNDX0FUVFIpO1xuICAgICAgaWYgKGF0dHIpIHtcbiAgICAgICAgYXR0ci50cmltKCkuc3BsaXQoL1xccysvKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgbmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBGYWN0b3J5IGZvciBtYWtpbmcgbW9yZSB0YWdzICovXG4gICAgdmFyIHRhZ0NvbnN0cnVjdG9yID0gZnVuY3Rpb24gdGFnQ29uc3RydWN0b3IoaXNMb2NhbCkge1xuICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGVsLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFNDX0FUVFIsICcnKTtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShMT0NBTF9BVFRSLCBpc0xvY2FsID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICBpZiAoIWRvY3VtZW50LmhlYWQpIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkb2N1bWVudCA8aGVhZD4nKTtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgcmV0dXJuIG5ldyBCcm93c2VyVGFnKGVsLCBpc0xvY2FsKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBTdHlsZVNoZWV0KHRhZ0NvbnN0cnVjdG9yLCB0YWdzLCBuYW1lcyk7XG4gIH1cbn07XG5cbi8vICAgICAgXG52YXIgU0NfQVRUUiA9ICdkYXRhLXN0eWxlZC1jb21wb25lbnRzJztcbnZhciBMT0NBTF9BVFRSID0gJ2RhdGEtc3R5bGVkLWNvbXBvbmVudHMtaXMtbG9jYWwnO1xudmFyIENPTlRFWFRfS0VZID0gJ19fc3R5bGVkLWNvbXBvbmVudHMtc3R5bGVzaGVldF9fJztcblxuLyogZXNsaW50LWRpc2FibGUgZmxvd3R5cGUvb2JqZWN0LXR5cGUtZGVsaW1pdGVyICovXG5cbi8qIGVzbGludC1lbmFibGUgZmxvd3R5cGUvb2JqZWN0LXR5cGUtZGVsaW1pdGVyICovXG5cbnZhciBpbnN0YW5jZSA9IG51bGw7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbnZhciBjbG9uZXMgPSBbXTtcblxudmFyIFN0eWxlU2hlZXQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0eWxlU2hlZXQodGFnQ29uc3RydWN0b3IpIHtcbiAgICB2YXIgdGFncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogW107XG4gICAgdmFyIG5hbWVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTdHlsZVNoZWV0KTtcbiAgICB0aGlzLmhhc2hlcyA9IHt9O1xuICAgIHRoaXMuZGVmZXJyZWRJbmplY3Rpb25zID0ge307XG4gICAgdGhpcy5zdHlsZXNDYWNoZWFibGUgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgdGhpcy50YWdDb25zdHJ1Y3RvciA9IHRhZ0NvbnN0cnVjdG9yO1xuICAgIHRoaXMudGFncyA9IHRhZ3M7XG4gICAgdGhpcy5uYW1lcyA9IG5hbWVzO1xuICAgIHRoaXMuY29uc3RydWN0Q29tcG9uZW50VGFnTWFwKCk7XG4gIH1cblxuICAvLyBoZWxwZXIgZm9yIGBDb21wb25lbnRTdHlsZWAgdG8ga25vdyB3aGVuIGl0IGNhY2hlIHN0YXRpYyBzdHlsZXMuXG4gIC8vIHN0YXRpY2x5IHN0eWxlZC1jb21wb25lbnQgY2FuIG5vdCBzYWZlbHkgY2FjaGUgc3R5bGVzIG9uIHRoZSBzZXJ2ZXJcbiAgLy8gd2l0aG91dCBhbGwgYENvbXBvbmVudFN0eWxlYCBpbnN0YW5jZXMgc2F2aW5nIGEgcmVmZXJlbmNlIHRvIHRoZVxuICAvLyB0aGUgc3R5bGVTaGVldCBpbnN0YW5jZSB0aGV5IGxhc3QgcmVuZGVyZWQgd2l0aCxcbiAgLy8gb3IgbGlzdGVuaW5nIHRvIGNyZWF0aW9uIC8gcmVzZXQgZXZlbnRzLiBvdGhlcndpc2UgeW91IG1pZ2h0IGNyZWF0ZVxuICAvLyBhIGNvbXBvbmVudCB3aXRoIG9uZSBzdHlsZXNoZWV0IGFuZCByZW5kZXIgaXQgYW5vdGhlciBhcGkgcmVzcG9uc2VcbiAgLy8gd2l0aCBhbm90aGVyLCBsb3Npbmcgc3R5bGVzIG9uIGZyb20geW91ciBzZXJ2ZXItc2lkZSByZW5kZXIuXG5cblxuICBTdHlsZVNoZWV0LnByb3RvdHlwZS5jb25zdHJ1Y3RDb21wb25lbnRUYWdNYXAgPSBmdW5jdGlvbiBjb25zdHJ1Y3RDb21wb25lbnRUYWdNYXAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuY29tcG9uZW50VGFncyA9IHt9O1xuXG4gICAgdGhpcy50YWdzLmZvckVhY2goZnVuY3Rpb24gKHRhZykge1xuICAgICAgT2JqZWN0LmtleXModGFnLmNvbXBvbmVudHMpLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudElkKSB7XG4gICAgICAgIF90aGlzLmNvbXBvbmVudFRhZ3NbY29tcG9uZW50SWRdID0gdGFnO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyogQmVzdCBsZXZlbCBvZiBjYWNoaW5n4oCUZ2V0IHRoZSBuYW1lIGZyb20gdGhlIGhhc2ggc3RyYWlnaHQgYXdheS4gKi9cblxuXG4gIFN0eWxlU2hlZXQucHJvdG90eXBlLmdldE5hbWUgPSBmdW5jdGlvbiBnZXROYW1lKGhhc2gpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNoZXNbaGFzaC50b1N0cmluZygpXTtcbiAgfTtcblxuICAvKiBTZWNvbmQgbGV2ZWwgb2YgY2FjaGluZ+KAlGlmIHRoZSBuYW1lIGlzIGFscmVhZHkgaW4gdGhlIGRvbSwgZG9uJ3RcbiAgICogaW5qZWN0IGFueXRoaW5nIGFuZCByZWNvcmQgdGhlIGhhc2ggZm9yIGdldE5hbWUgbmV4dCB0aW1lLiAqL1xuXG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUuYWxyZWFkeUluamVjdGVkID0gZnVuY3Rpb24gYWxyZWFkeUluamVjdGVkKGhhc2gsIG5hbWUpIHtcbiAgICBpZiAoIXRoaXMubmFtZXNbbmFtZV0pIHJldHVybiBmYWxzZTtcblxuICAgIHRoaXMuaGFzaGVzW2hhc2gudG9TdHJpbmcoKV0gPSBuYW1lO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qIFRoaXJkIHR5cGUgb2YgY2FjaGluZ+KAlGRvbid0IGluamVjdCBjb21wb25lbnRzJyBjb21wb25lbnRJZCB0d2ljZS4gKi9cblxuXG4gIFN0eWxlU2hlZXQucHJvdG90eXBlLmhhc0luamVjdGVkQ29tcG9uZW50ID0gZnVuY3Rpb24gaGFzSW5qZWN0ZWRDb21wb25lbnQoY29tcG9uZW50SWQpIHtcbiAgICByZXR1cm4gISF0aGlzLmNvbXBvbmVudFRhZ3NbY29tcG9uZW50SWRdO1xuICB9O1xuXG4gIFN0eWxlU2hlZXQucHJvdG90eXBlLmRlZmVycmVkSW5qZWN0ID0gZnVuY3Rpb24gZGVmZXJyZWRJbmplY3QoY29tcG9uZW50SWQsIGlzTG9jYWwsIGNzcykge1xuICAgIGlmICh0aGlzID09PSBpbnN0YW5jZSkge1xuICAgICAgY2xvbmVzLmZvckVhY2goZnVuY3Rpb24gKGNsb25lKSB7XG4gICAgICAgIGNsb25lLmRlZmVycmVkSW5qZWN0KGNvbXBvbmVudElkLCBpc0xvY2FsLCBjc3MpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRPckNyZWF0ZVRhZyhjb21wb25lbnRJZCwgaXNMb2NhbCk7XG4gICAgdGhpcy5kZWZlcnJlZEluamVjdGlvbnNbY29tcG9uZW50SWRdID0gY3NzO1xuICB9O1xuXG4gIFN0eWxlU2hlZXQucHJvdG90eXBlLmluamVjdCA9IGZ1bmN0aW9uIGluamVjdChjb21wb25lbnRJZCwgaXNMb2NhbCwgY3NzLCBoYXNoLCBuYW1lKSB7XG4gICAgaWYgKHRoaXMgPT09IGluc3RhbmNlKSB7XG4gICAgICBjbG9uZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgY2xvbmUuaW5qZWN0KGNvbXBvbmVudElkLCBpc0xvY2FsLCBjc3MpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHRhZyA9IHRoaXMuZ2V0T3JDcmVhdGVUYWcoY29tcG9uZW50SWQsIGlzTG9jYWwpO1xuXG4gICAgdmFyIGRlZmVycmVkSW5qZWN0aW9uID0gdGhpcy5kZWZlcnJlZEluamVjdGlvbnNbY29tcG9uZW50SWRdO1xuICAgIGlmIChkZWZlcnJlZEluamVjdGlvbikge1xuICAgICAgdGFnLmluamVjdChjb21wb25lbnRJZCwgZGVmZXJyZWRJbmplY3Rpb24pO1xuICAgICAgZGVsZXRlIHRoaXMuZGVmZXJyZWRJbmplY3Rpb25zW2NvbXBvbmVudElkXTtcbiAgICB9XG5cbiAgICB0YWcuaW5qZWN0KGNvbXBvbmVudElkLCBjc3MsIG5hbWUpO1xuXG4gICAgaWYgKGhhc2ggJiYgbmFtZSkge1xuICAgICAgdGhpcy5oYXNoZXNbaGFzaC50b1N0cmluZygpXSA9IG5hbWU7XG4gICAgfVxuICB9O1xuXG4gIFN0eWxlU2hlZXQucHJvdG90eXBlLnRvSFRNTCA9IGZ1bmN0aW9uIHRvSFRNTCgpIHtcbiAgICByZXR1cm4gdGhpcy50YWdzLm1hcChmdW5jdGlvbiAodGFnKSB7XG4gICAgICByZXR1cm4gdGFnLnRvSFRNTCgpO1xuICAgIH0pLmpvaW4oJycpO1xuICB9O1xuXG4gIFN0eWxlU2hlZXQucHJvdG90eXBlLnRvUmVhY3RFbGVtZW50cyA9IGZ1bmN0aW9uIHRvUmVhY3RFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy50YWdzLm1hcChmdW5jdGlvbiAodGFnLCBpKSB7XG4gICAgICByZXR1cm4gdGFnLnRvUmVhY3RFbGVtZW50KCdzYy0nICsgaSk7XG4gICAgfSk7XG4gIH07XG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUuZ2V0T3JDcmVhdGVUYWcgPSBmdW5jdGlvbiBnZXRPckNyZWF0ZVRhZyhjb21wb25lbnRJZCwgaXNMb2NhbCkge1xuICAgIHZhciBleGlzdGluZ1RhZyA9IHRoaXMuY29tcG9uZW50VGFnc1tjb21wb25lbnRJZF07XG4gICAgaWYgKGV4aXN0aW5nVGFnKSB7XG4gICAgICByZXR1cm4gZXhpc3RpbmdUYWc7XG4gICAgfVxuXG4gICAgdmFyIGxhc3RUYWcgPSB0aGlzLnRhZ3NbdGhpcy50YWdzLmxlbmd0aCAtIDFdO1xuICAgIHZhciBjb21wb25lbnRUYWcgPSAhbGFzdFRhZyB8fCBsYXN0VGFnLmlzRnVsbCgpIHx8IGxhc3RUYWcuaXNMb2NhbCAhPT0gaXNMb2NhbCA/IHRoaXMuY3JlYXRlTmV3VGFnKGlzTG9jYWwpIDogbGFzdFRhZztcbiAgICB0aGlzLmNvbXBvbmVudFRhZ3NbY29tcG9uZW50SWRdID0gY29tcG9uZW50VGFnO1xuICAgIGNvbXBvbmVudFRhZy5hZGRDb21wb25lbnQoY29tcG9uZW50SWQpO1xuICAgIHJldHVybiBjb21wb25lbnRUYWc7XG4gIH07XG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUuY3JlYXRlTmV3VGFnID0gZnVuY3Rpb24gY3JlYXRlTmV3VGFnKGlzTG9jYWwpIHtcbiAgICB2YXIgbmV3VGFnID0gdGhpcy50YWdDb25zdHJ1Y3Rvcihpc0xvY2FsKTtcbiAgICB0aGlzLnRhZ3MucHVzaChuZXdUYWcpO1xuICAgIHJldHVybiBuZXdUYWc7XG4gIH07XG5cbiAgU3R5bGVTaGVldC5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KGlzU2VydmVyKSB7XG4gICAgaW5zdGFuY2UgPSBTdHlsZVNoZWV0LmNyZWF0ZShpc1NlcnZlcik7XG4gIH07XG5cbiAgLyogV2UgY2FuIG1ha2UgaXNTZXJ2ZXIgdG90YWxseSBpbXBsaWNpdCBvbmNlIEplc3QgMjAgZHJvcHMgYW5kIHdlXG4gICAqIGNhbiBjaGFuZ2UgZW52aXJvbm1lbnQgb24gYSBwZXItdGVzdCBiYXNpcy4gKi9cblxuXG4gIFN0eWxlU2hlZXQuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBpc1NlcnZlciA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJztcblxuICAgIHJldHVybiAoaXNTZXJ2ZXIgPyBTZXJ2ZXJTdHlsZVNoZWV0IDogQnJvd3NlclN0eWxlU2hlZXQpLmNyZWF0ZSgpO1xuICB9O1xuXG4gIFN0eWxlU2hlZXQuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZShvbGRTaGVldCkge1xuICAgIHZhciBuZXdTaGVldCA9IG5ldyBTdHlsZVNoZWV0KG9sZFNoZWV0LnRhZ0NvbnN0cnVjdG9yLCBvbGRTaGVldC50YWdzLm1hcChmdW5jdGlvbiAodGFnKSB7XG4gICAgICByZXR1cm4gdGFnLmNsb25lKCk7XG4gICAgfSksIF9leHRlbmRzKHt9LCBvbGRTaGVldC5uYW1lcykpO1xuXG4gICAgbmV3U2hlZXQuaGFzaGVzID0gX2V4dGVuZHMoe30sIG9sZFNoZWV0Lmhhc2hlcyk7XG4gICAgbmV3U2hlZXQuZGVmZXJyZWRJbmplY3Rpb25zID0gX2V4dGVuZHMoe30sIG9sZFNoZWV0LmRlZmVycmVkSW5qZWN0aW9ucyk7XG4gICAgY2xvbmVzLnB1c2gobmV3U2hlZXQpO1xuXG4gICAgcmV0dXJuIG5ld1NoZWV0O1xuICB9O1xuXG4gIGNyZWF0ZUNsYXNzKFN0eWxlU2hlZXQsIG51bGwsIFt7XG4gICAga2V5OiAnaW5zdGFuY2UnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgcmV0dXJuIGluc3RhbmNlIHx8IChpbnN0YW5jZSA9IFN0eWxlU2hlZXQuY3JlYXRlKCkpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3R5bGVTaGVldDtcbn0oKTtcblxudmFyIF9TdHlsZVNoZWV0TWFuYWdlciRjaDtcblxuLy8gICAgICBcbnZhciBTdHlsZVNoZWV0TWFuYWdlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGluaGVyaXRzKFN0eWxlU2hlZXRNYW5hZ2VyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTdHlsZVNoZWV0TWFuYWdlcigpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTdHlsZVNoZWV0TWFuYWdlcik7XG4gICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIFN0eWxlU2hlZXRNYW5hZ2VyLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICByZXR1cm4gX3JlZiA9IHt9LCBfcmVmW0NPTlRFWFRfS0VZXSA9IHRoaXMucHJvcHMuc2hlZXQsIF9yZWY7XG4gIH07XG5cbiAgU3R5bGVTaGVldE1hbmFnZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4gICAgLy8gRmxvdyB2MC40My4xIHdpbGwgcmVwb3J0IGFuIGVycm9yIGFjY2Vzc2luZyB0aGUgYGNoaWxkcmVuYCBwcm9wZXJ0eSxcbiAgICAvLyBidXQgdjAuNDcuMCB3aWxsIG5vdC4gSXQgaXMgbmVjZXNzYXJ5IHRvIHVzZSBhIHR5cGUgY2FzdCBpbnN0ZWFkIG9mXG4gICAgLy8gYSBcImZpeG1lXCIgY29tbWVudCB0byBzYXRpc2Z5IGJvdGggRmxvdyB2ZXJzaW9ucy5cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfTtcblxuICByZXR1cm4gU3R5bGVTaGVldE1hbmFnZXI7XG59KENvbXBvbmVudCk7XG5cblN0eWxlU2hlZXRNYW5hZ2VyLmNoaWxkQ29udGV4dFR5cGVzID0gKF9TdHlsZVNoZWV0TWFuYWdlciRjaCA9IHt9LCBfU3R5bGVTaGVldE1hbmFnZXIkY2hbQ09OVEVYVF9LRVldID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmluc3RhbmNlT2YoU3R5bGVTaGVldCksIFByb3BUeXBlcy5pbnN0YW5jZU9mKFNlcnZlclN0eWxlU2hlZXQpXSkuaXNSZXF1aXJlZCwgX1N0eWxlU2hlZXRNYW5hZ2VyJGNoKTtcblxuU3R5bGVTaGVldE1hbmFnZXIucHJvcFR5cGVzID0ge1xuICBzaGVldDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmluc3RhbmNlT2YoU3R5bGVTaGVldCksIFByb3BUeXBlcy5pbnN0YW5jZU9mKFNlcnZlclN0eWxlU2hlZXQpXSkuaXNSZXF1aXJlZFxufTtcblxuLy8gICAgICBcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG52YXIgU2VydmVyVGFnID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTZXJ2ZXJUYWcoaXNMb2NhbCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFNlcnZlclRhZyk7XG5cbiAgICB0aGlzLmlzTG9jYWwgPSBpc0xvY2FsO1xuICAgIHRoaXMuY29tcG9uZW50cyA9IHt9O1xuICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgdGhpcy5uYW1lcyA9IFtdO1xuICB9XG5cbiAgU2VydmVyVGFnLnByb3RvdHlwZS5pc0Z1bGwgPSBmdW5jdGlvbiBpc0Z1bGwoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIFNlcnZlclRhZy5wcm90b3R5cGUuYWRkQ29tcG9uZW50ID0gZnVuY3Rpb24gYWRkQ29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdGhpcy5jb21wb25lbnRzW2NvbXBvbmVudElkXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcnlpbmcgdG8gYWRkIENvbXBvbmVudCBcXCcnICsgY29tcG9uZW50SWQgKyAnXFwnIHR3aWNlIScpO1xuICAgIH1cbiAgICB0aGlzLmNvbXBvbmVudHNbY29tcG9uZW50SWRdID0geyBjb21wb25lbnRJZDogY29tcG9uZW50SWQsIGNzczogJycgfTtcbiAgICB0aGlzLnNpemUgKz0gMTtcbiAgfTtcblxuICBTZXJ2ZXJUYWcucHJvdG90eXBlLmNvbmNhdGVuYXRlQ1NTID0gZnVuY3Rpb24gY29uY2F0ZW5hdGVDU1MoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpLnJlZHVjZShmdW5jdGlvbiAoc3R5bGVzLCBrKSB7XG4gICAgICByZXR1cm4gc3R5bGVzICsgX3RoaXMuY29tcG9uZW50c1trXS5jc3M7XG4gICAgfSwgJycpO1xuICB9O1xuXG4gIFNlcnZlclRhZy5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gaW5qZWN0KGNvbXBvbmVudElkLCBjc3MsIG5hbWUpIHtcbiAgICB2YXIgY29tcCA9IHRoaXMuY29tcG9uZW50c1tjb21wb25lbnRJZF07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhY29tcCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGFkZCBhIG5ldyBjb21wb25lbnQgYmVmb3JlIHlvdSBjYW4gaW5qZWN0IGNzcyBpbnRvIGl0Jyk7XG4gICAgfVxuICAgIGlmIChjb21wLmNzcyA9PT0gJycpIGNvbXAuY3NzID0gJy8qIHNjLWNvbXBvbmVudC1pZDogJyArIGNvbXBvbmVudElkICsgJyAqL1xcbic7XG5cbiAgICBjb21wLmNzcyArPSBjc3MucmVwbGFjZSgvXFxuKiQvLCAnXFxuJyk7XG5cbiAgICBpZiAobmFtZSkgdGhpcy5uYW1lcy5wdXNoKG5hbWUpO1xuICB9O1xuXG4gIFNlcnZlclRhZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24gdG9IVE1MKCkge1xuICAgIHZhciBhdHRycyA9IFsndHlwZT1cInRleHQvY3NzXCInLCBTQ19BVFRSICsgJz1cIicgKyB0aGlzLm5hbWVzLmpvaW4oJyAnKSArICdcIicsIExPQ0FMX0FUVFIgKyAnPVwiJyArICh0aGlzLmlzTG9jYWwgPyAndHJ1ZScgOiAnZmFsc2UnKSArICdcIiddO1xuXG4gICAgdmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cnMucHVzaCgnbm9uY2U9XCInICsgbm9uY2UgKyAnXCInKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJzxzdHlsZSAnICsgYXR0cnMuam9pbignICcpICsgJz4nICsgdGhpcy5jb25jYXRlbmF0ZUNTUygpICsgJzwvc3R5bGU+JztcbiAgfTtcblxuICBTZXJ2ZXJUYWcucHJvdG90eXBlLnRvUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gdG9SZWFjdEVsZW1lbnQoa2V5KSB7XG4gICAgdmFyIF9hdHRycztcblxuICAgIHZhciBhdHRycyA9IChfYXR0cnMgPSB7fSwgX2F0dHJzW1NDX0FUVFJdID0gdGhpcy5uYW1lcy5qb2luKCcgJyksIF9hdHRyc1tMT0NBTF9BVFRSXSA9IHRoaXMuaXNMb2NhbC50b1N0cmluZygpLCBfYXR0cnMpO1xuXG4gICAgdmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cnMubm9uY2UgPSBub25jZTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3R5bGUnLCBfZXh0ZW5kcyh7XG4gICAgICBrZXk6IGtleSxcbiAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICB9LCBhdHRycywge1xuICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHsgX19odG1sOiB0aGlzLmNvbmNhdGVuYXRlQ1NTKCkgfVxuICAgIH0pKTtcbiAgfTtcblxuICBTZXJ2ZXJUYWcucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgY29weSA9IG5ldyBTZXJ2ZXJUYWcodGhpcy5pc0xvY2FsKTtcbiAgICBjb3B5Lm5hbWVzID0gW10uY29uY2F0KHRoaXMubmFtZXMpO1xuICAgIGNvcHkuc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICBjb3B5LmNvbXBvbmVudHMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgIGFjY1trZXldID0gX2V4dGVuZHMoe30sIF90aGlzMi5jb21wb25lbnRzW2tleV0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiBjb3B5O1xuICB9O1xuXG4gIHJldHVybiBTZXJ2ZXJUYWc7XG59KCk7XG5cbnZhciBTZXJ2ZXJTdHlsZVNoZWV0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTZXJ2ZXJTdHlsZVNoZWV0KCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFNlcnZlclN0eWxlU2hlZXQpO1xuXG4gICAgdGhpcy5pbnN0YW5jZSA9IFN0eWxlU2hlZXQuY2xvbmUoU3R5bGVTaGVldC5pbnN0YW5jZSk7XG4gIH1cblxuICBTZXJ2ZXJTdHlsZVNoZWV0LnByb3RvdHlwZS5jb2xsZWN0U3R5bGVzID0gZnVuY3Rpb24gY29sbGVjdFN0eWxlcyhjaGlsZHJlbikge1xuICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgY29sbGVjdCBzdHlsZXMgb25jZSB5b3UndmUgY2FsbGVkIGdldFN0eWxlVGFncyFcIik7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgU3R5bGVTaGVldE1hbmFnZXIsXG4gICAgICB7IHNoZWV0OiB0aGlzLmluc3RhbmNlIH0sXG4gICAgICBjaGlsZHJlblxuICAgICk7XG4gIH07XG5cbiAgU2VydmVyU3R5bGVTaGVldC5wcm90b3R5cGUuZ2V0U3R5bGVUYWdzID0gZnVuY3Rpb24gZ2V0U3R5bGVUYWdzKCkge1xuICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgIGNsb25lcy5zcGxpY2UoY2xvbmVzLmluZGV4T2YodGhpcy5pbnN0YW5jZSksIDEpO1xuICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlLnRvSFRNTCgpO1xuICB9O1xuXG4gIFNlcnZlclN0eWxlU2hlZXQucHJvdG90eXBlLmdldFN0eWxlRWxlbWVudCA9IGZ1bmN0aW9uIGdldFN0eWxlRWxlbWVudCgpIHtcbiAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICBjbG9uZXMuc3BsaWNlKGNsb25lcy5pbmRleE9mKHRoaXMuaW5zdGFuY2UpLCAxKTtcbiAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZS50b1JlYWN0RWxlbWVudHMoKTtcbiAgfTtcblxuICBTZXJ2ZXJTdHlsZVNoZWV0LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFN0eWxlU2hlZXQoZnVuY3Rpb24gKGlzTG9jYWwpIHtcbiAgICAgIHJldHVybiBuZXcgU2VydmVyVGFnKGlzTG9jYWwpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBTZXJ2ZXJTdHlsZVNoZWV0O1xufSgpO1xuXG4vLyAgICAgIFxuXG52YXIgTElNSVQgPSAyMDA7XG5cbnZhciBjcmVhdGVXYXJuVG9vTWFueUNsYXNzZXMgPSAoZnVuY3Rpb24gKGRpc3BsYXlOYW1lKSB7XG4gIHZhciBnZW5lcmF0ZWRDbGFzc2VzID0ge307XG4gIHZhciB3YXJuaW5nU2VlbiA9IGZhbHNlO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgaWYgKCF3YXJuaW5nU2Vlbikge1xuICAgICAgZ2VuZXJhdGVkQ2xhc3Nlc1tjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhnZW5lcmF0ZWRDbGFzc2VzKS5sZW5ndGggPj0gTElNSVQpIHtcbiAgICAgICAgLy8gVW5hYmxlIHRvIGZpbmQgbGF0ZXN0UnVsZSBpbiB0ZXN0IGVudmlyb25tZW50LlxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlLCBwcmVmZXItdGVtcGxhdGUgKi9cbiAgICAgICAgY29uc29sZS53YXJuKCdPdmVyICcgKyBMSU1JVCArICcgY2xhc3NlcyB3ZXJlIGdlbmVyYXRlZCBmb3IgY29tcG9uZW50ICcgKyBkaXNwbGF5TmFtZSArICcuIFxcbicgKyAnQ29uc2lkZXIgdXNpbmcgdGhlIGF0dHJzIG1ldGhvZCwgdG9nZXRoZXIgd2l0aCBhIHN0eWxlIG9iamVjdCBmb3IgZnJlcXVlbnRseSBjaGFuZ2VkIHN0eWxlcy5cXG4nICsgJ0V4YW1wbGU6XFxuJyArICcgIGNvbnN0IENvbXBvbmVudCA9IHN0eWxlZC5kaXYuYXR0cnMoe1xcbicgKyAnICAgIHN0eWxlOiAoeyBiYWNrZ3JvdW5kIH0pID0+ICh7XFxuJyArICcgICAgICBiYWNrZ3JvdW5kLFxcbicgKyAnICAgIH0pLFxcbicgKyAnICB9KWB3aWR0aDogMTAwJTtgXFxuXFxuJyArICcgIDxDb21wb25lbnQgLz4nKTtcbiAgICAgICAgd2FybmluZ1NlZW4gPSB0cnVlO1xuICAgICAgICBnZW5lcmF0ZWRDbGFzc2VzID0ge307XG4gICAgICB9XG4gICAgfVxuICB9O1xufSk7XG5cbi8vICAgICAgXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4vKipcbiAqIFRyeWluZyB0byBhdm9pZCB0aGUgdW5rbm93bi1wcm9wIGVycm9ycyBvbiBzdHlsZWQgY29tcG9uZW50cyBieSBmaWx0ZXJpbmcgYnlcbiAqIFJlYWN0J3MgYXR0cmlidXRlIHdoaXRlbGlzdC5cbiAqXG4gKiBUbyByZWdlbmVyYXRlIHRoaXMgcmVnZXg6XG4gKlxuICogMS4gYG5wbSBpIC1nIHJlZ2V4Z2VuYCAoaHR0cHM6Ly9naXRodWIuY29tL2Rldm9uZ292ZXR0L3JlZ2V4Z2VuKVxuICogMi4gUnVuIGByZWdleGdlbmAgd2l0aCB0aGUgbGlzdCBvZiBzcGFjZS1zZXBhcmF0ZWQgd29yZHMgYmVsb3cgYXMgaW5wdXRcbiAqIDMuIFN1cnJvdW5kIHRoZSBlbWl0dGVkIHJlZ2V4IHdpdGggdGhpczogYC9eKEdFTkVSQVRFRF9SRUdFWCkkL2AgLS0gdGhpcyB3aWxsIGVuc3VyZSBhIGZ1bGwgc3RyaW5nIG1hdGNoXG4gKiAgICBhbmQgbm8gZmFsc2UgcG9zaXRpdmVzIGZyb20gcGFydGlhbHNcbiAqKi9cbi8qXG5jaGlsZHJlbiBkYW5nZXJvdXNseVNldElubmVySFRNTCBrZXkgcmVmIGF1dG9Gb2N1cyBkZWZhdWx0VmFsdWUgdmFsdWVMaW5rIGRlZmF1bHRDaGVja2VkIGNoZWNrZWRMaW5rIGlubmVySFRNTCBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmcgb25Gb2N1c0luIG9uRm9jdXNPdXQgY2xhc3NOYW1lIG9uQ29weSBvbkN1dCBvblBhc3RlIG9uQ29tcG9zaXRpb25FbmQgb25Db21wb3NpdGlvblN0YXJ0IG9uQ29tcG9zaXRpb25VcGRhdGUgb25LZXlEb3duIG9uS2V5UHJlc3Mgb25LZXlVcCBvbkZvY3VzIG9uQmx1ciBvbkNoYW5nZSBvbklucHV0IG9uU3VibWl0IG9uUmVzZXQgb25DbGljayBvbkNvbnRleHRNZW51IG9uRG91YmxlQ2xpY2sgb25EcmFnIG9uRHJhZ0VuZCBvbkRyYWdFbnRlciBvbkRyYWdFeGl0IG9uRHJhZ0xlYXZlIG9uRHJhZ092ZXIgb25EcmFnU3RhcnQgb25Ecm9wIG9uTW91c2VEb3duIG9uTW91c2VFbnRlciBvbk1vdXNlTGVhdmUgb25Nb3VzZU1vdmUgb25Nb3VzZU91dCBvbk1vdXNlT3ZlciBvbk1vdXNlVXAgb25TZWxlY3Qgb25Ub3VjaENhbmNlbCBvblRvdWNoRW5kIG9uVG91Y2hNb3ZlIG9uVG91Y2hTdGFydCBvblNjcm9sbCBvbldoZWVsIG9uQWJvcnQgb25DYW5QbGF5IG9uQ2FuUGxheVRocm91Z2ggb25EdXJhdGlvbkNoYW5nZSBvbkVtcHRpZWQgb25FbmNyeXB0ZWQgb25FbmRlZCBvbkVycm9yIG9uTG9hZGVkRGF0YSBvbkxvYWRlZE1ldGFkYXRhIG9uTG9hZFN0YXJ0IG9uUGF1c2Ugb25QbGF5IG9uUGxheWluZyBvblByb2dyZXNzIG9uUmF0ZUNoYW5nZSBvblNlZWtlZCBvblNlZWtpbmcgb25TdGFsbGVkIG9uU3VzcGVuZCBvblRpbWVVcGRhdGUgb25Wb2x1bWVDaGFuZ2Ugb25XYWl0aW5nIG9uTG9hZCBvbkFuaW1hdGlvblN0YXJ0IG9uQW5pbWF0aW9uRW5kIG9uQW5pbWF0aW9uSXRlcmF0aW9uIG9uVHJhbnNpdGlvbkVuZCBvbkNvcHlDYXB0dXJlIG9uQ3V0Q2FwdHVyZSBvblBhc3RlQ2FwdHVyZSBvbkNvbXBvc2l0aW9uRW5kQ2FwdHVyZSBvbkNvbXBvc2l0aW9uU3RhcnRDYXB0dXJlIG9uQ29tcG9zaXRpb25VcGRhdGVDYXB0dXJlIG9uS2V5RG93bkNhcHR1cmUgb25LZXlQcmVzc0NhcHR1cmUgb25LZXlVcENhcHR1cmUgb25Gb2N1c0NhcHR1cmUgb25CbHVyQ2FwdHVyZSBvbkNoYW5nZUNhcHR1cmUgb25JbnB1dENhcHR1cmUgb25TdWJtaXRDYXB0dXJlIG9uUmVzZXRDYXB0dXJlIG9uQ2xpY2tDYXB0dXJlIG9uQ29udGV4dE1lbnVDYXB0dXJlIG9uRG91YmxlQ2xpY2tDYXB0dXJlIG9uRHJhZ0NhcHR1cmUgb25EcmFnRW5kQ2FwdHVyZSBvbkRyYWdFbnRlckNhcHR1cmUgb25EcmFnRXhpdENhcHR1cmUgb25EcmFnTGVhdmVDYXB0dXJlIG9uRHJhZ092ZXJDYXB0dXJlIG9uRHJhZ1N0YXJ0Q2FwdHVyZSBvbkRyb3BDYXB0dXJlIG9uTW91c2VEb3duQ2FwdHVyZSBvbk1vdXNlRW50ZXJDYXB0dXJlIG9uTW91c2VMZWF2ZUNhcHR1cmUgb25Nb3VzZU1vdmVDYXB0dXJlIG9uTW91c2VPdXRDYXB0dXJlIG9uTW91c2VPdmVyQ2FwdHVyZSBvbk1vdXNlVXBDYXB0dXJlIG9uU2VsZWN0Q2FwdHVyZSBvblRvdWNoQ2FuY2VsQ2FwdHVyZSBvblRvdWNoRW5kQ2FwdHVyZSBvblRvdWNoTW92ZUNhcHR1cmUgb25Ub3VjaFN0YXJ0Q2FwdHVyZSBvblNjcm9sbENhcHR1cmUgb25XaGVlbENhcHR1cmUgb25BYm9ydENhcHR1cmUgb25DYW5QbGF5Q2FwdHVyZSBvbkNhblBsYXlUaHJvdWdoQ2FwdHVyZSBvbkR1cmF0aW9uQ2hhbmdlQ2FwdHVyZSBvbkVtcHRpZWRDYXB0dXJlIG9uRW5jcnlwdGVkQ2FwdHVyZSBvbkVuZGVkQ2FwdHVyZSBvbkVycm9yQ2FwdHVyZSBvbkxvYWRlZERhdGFDYXB0dXJlIG9uTG9hZGVkTWV0YWRhdGFDYXB0dXJlIG9uTG9hZFN0YXJ0Q2FwdHVyZSBvblBhdXNlQ2FwdHVyZSBvblBsYXlDYXB0dXJlIG9uUGxheWluZ0NhcHR1cmUgb25Qcm9ncmVzc0NhcHR1cmUgb25SYXRlQ2hhbmdlQ2FwdHVyZSBvblNlZWtlZENhcHR1cmUgb25TZWVraW5nQ2FwdHVyZSBvblN0YWxsZWRDYXB0dXJlIG9uU3VzcGVuZENhcHR1cmUgb25UaW1lVXBkYXRlQ2FwdHVyZSBvblZvbHVtZUNoYW5nZUNhcHR1cmUgb25XYWl0aW5nQ2FwdHVyZSBvbkxvYWRDYXB0dXJlIG9uQW5pbWF0aW9uU3RhcnRDYXB0dXJlIG9uQW5pbWF0aW9uRW5kQ2FwdHVyZSBvbkFuaW1hdGlvbkl0ZXJhdGlvbkNhcHR1cmUgb25UcmFuc2l0aW9uRW5kQ2FwdHVyZSBhY2NlcHQgYWNjZXB0Q2hhcnNldCBhY2Nlc3NLZXkgYWN0aW9uIGFsbG93RnVsbFNjcmVlbiBhbGxvd1RyYW5zcGFyZW5jeSBhbHQgYXMgYXN5bmMgYXV0b0NvbXBsZXRlIGF1dG9QbGF5IGNhcHR1cmUgY2VsbFBhZGRpbmcgY2VsbFNwYWNpbmcgY2hhclNldCBjaGFsbGVuZ2UgY2hlY2tlZCBjaXRlIGNsYXNzSUQgY2xhc3NOYW1lIGNvbHMgY29sU3BhbiBjb250ZW50IGNvbnRlbnRFZGl0YWJsZSBjb250ZXh0TWVudSBjb250cm9scyBjb29yZHMgY3Jvc3NPcmlnaW4gZGF0YSBkYXRlVGltZSBkZWZhdWx0IGRlZmVyIGRpciBkaXNhYmxlZCBkb3dubG9hZCBkcmFnZ2FibGUgZW5jVHlwZSBmb3JtIGZvcm1BY3Rpb24gZm9ybUVuY1R5cGUgZm9ybU1ldGhvZCBmb3JtTm9WYWxpZGF0ZSBmb3JtVGFyZ2V0IGZyYW1lQm9yZGVyIGhlYWRlcnMgaGVpZ2h0IGhpZGRlbiBoaWdoIGhyZWYgaHJlZkxhbmcgaHRtbEZvciBodHRwRXF1aXYgaWNvbiBpZCBpbnB1dE1vZGUgaW50ZWdyaXR5IGlzIGtleVBhcmFtcyBrZXlUeXBlIGtpbmQgbGFiZWwgbGFuZyBsaXN0IGxvb3AgbG93IG1hbmlmZXN0IG1hcmdpbkhlaWdodCBtYXJnaW5XaWR0aCBtYXggbWF4TGVuZ3RoIG1lZGlhIG1lZGlhR3JvdXAgbWV0aG9kIG1pbiBtaW5MZW5ndGggbXVsdGlwbGUgbXV0ZWQgbmFtZSBub25jZSBub1ZhbGlkYXRlIG9wZW4gb3B0aW11bSBwYXR0ZXJuIHBsYWNlaG9sZGVyIHBsYXlzSW5saW5lIHBvc3RlciBwcmVsb2FkIHByb2ZpbGUgcmFkaW9Hcm91cCByZWFkT25seSByZWZlcnJlclBvbGljeSByZWwgcmVxdWlyZWQgcmV2ZXJzZWQgcm9sZSByb3dzIHJvd1NwYW4gc2FuZGJveCBzY29wZSBzY29wZWQgc2Nyb2xsaW5nIHNlYW1sZXNzIHNlbGVjdGVkIHNoYXBlIHNpemUgc2l6ZXMgc3BhbiBzcGVsbENoZWNrIHNyYyBzcmNEb2Mgc3JjTGFuZyBzcmNTZXQgc3RhcnQgc3RlcCBzdHlsZSBzdW1tYXJ5IHRhYkluZGV4IHRhcmdldCB0aXRsZSB0eXBlIHVzZU1hcCB2YWx1ZSB3aWR0aCB3bW9kZSB3cmFwIGFib3V0IGRhdGF0eXBlIGlubGlzdCBwcmVmaXggcHJvcGVydHkgcmVzb3VyY2UgdHlwZW9mIHZvY2FiIGF1dG9DYXBpdGFsaXplIGF1dG9Db3JyZWN0IGF1dG9TYXZlIGNvbG9yIGl0ZW1Qcm9wIGl0ZW1TY29wZSBpdGVtVHlwZSBpdGVtSUQgaXRlbVJlZiByZXN1bHRzIHNlY3VyaXR5IHVuc2VsZWN0YWJsZSBhY2NlbnRIZWlnaHQgYWNjdW11bGF0ZSBhZGRpdGl2ZSBhbGlnbm1lbnRCYXNlbGluZSBhbGxvd1Jlb3JkZXIgYWxwaGFiZXRpYyBhbXBsaXR1ZGUgYXJhYmljRm9ybSBhc2NlbnQgYXR0cmlidXRlTmFtZSBhdHRyaWJ1dGVUeXBlIGF1dG9SZXZlcnNlIGF6aW11dGggYmFzZUZyZXF1ZW5jeSBiYXNlUHJvZmlsZSBiYXNlbGluZVNoaWZ0IGJib3ggYmVnaW4gYmlhcyBieSBjYWxjTW9kZSBjYXBIZWlnaHQgY2xpcCBjbGlwUGF0aCBjbGlwUnVsZSBjbGlwUGF0aFVuaXRzIGNvbG9ySW50ZXJwb2xhdGlvbiBjb2xvckludGVycG9sYXRpb25GaWx0ZXJzIGNvbG9yUHJvZmlsZSBjb2xvclJlbmRlcmluZyBjb250ZW50U2NyaXB0VHlwZSBjb250ZW50U3R5bGVUeXBlIGN1cnNvciBjeCBjeSBkIGRlY2VsZXJhdGUgZGVzY2VudCBkaWZmdXNlQ29uc3RhbnQgZGlyZWN0aW9uIGRpc3BsYXkgZGl2aXNvciBkb21pbmFudEJhc2VsaW5lIGR1ciBkeCBkeSBlZGdlTW9kZSBlbGV2YXRpb24gZW5hYmxlQmFja2dyb3VuZCBlbmQgZXhwb25lbnQgZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZCBmaWxsIGZpbGxPcGFjaXR5IGZpbGxSdWxlIGZpbHRlciBmaWx0ZXJSZXMgZmlsdGVyVW5pdHMgZmxvb2RDb2xvciBmbG9vZE9wYWNpdHkgZm9jdXNhYmxlIGZvbnRGYW1pbHkgZm9udFNpemUgZm9udFNpemVBZGp1c3QgZm9udFN0cmV0Y2ggZm9udFN0eWxlIGZvbnRWYXJpYW50IGZvbnRXZWlnaHQgZm9ybWF0IGZyb20gZnggZnkgZzEgZzIgZ2x5cGhOYW1lIGdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsIGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbCBnbHlwaFJlZiBncmFkaWVudFRyYW5zZm9ybSBncmFkaWVudFVuaXRzIGhhbmdpbmcgaG9yaXpBZHZYIGhvcml6T3JpZ2luWCBpZGVvZ3JhcGhpYyBpbWFnZVJlbmRlcmluZyBpbiBpbjIgaW50ZXJjZXB0IGsgazEgazIgazMgazQga2VybmVsTWF0cml4IGtlcm5lbFVuaXRMZW5ndGgga2VybmluZyBrZXlQb2ludHMga2V5U3BsaW5lcyBrZXlUaW1lcyBsZW5ndGhBZGp1c3QgbGV0dGVyU3BhY2luZyBsaWdodGluZ0NvbG9yIGxpbWl0aW5nQ29uZUFuZ2xlIGxvY2FsIG1hcmtlckVuZCBtYXJrZXJNaWQgbWFya2VyU3RhcnQgbWFya2VySGVpZ2h0IG1hcmtlclVuaXRzIG1hcmtlcldpZHRoIG1hc2sgbWFza0NvbnRlbnRVbml0cyBtYXNrVW5pdHMgbWF0aGVtYXRpY2FsIG1vZGUgbnVtT2N0YXZlcyBvZmZzZXQgb3BhY2l0eSBvcGVyYXRvciBvcmRlciBvcmllbnQgb3JpZW50YXRpb24gb3JpZ2luIG92ZXJmbG93IG92ZXJsaW5lUG9zaXRpb24gb3ZlcmxpbmVUaGlja25lc3MgcGFpbnRPcmRlciBwYW5vc2UxIHBhdGhMZW5ndGggcGF0dGVybkNvbnRlbnRVbml0cyBwYXR0ZXJuVHJhbnNmb3JtIHBhdHRlcm5Vbml0cyBwb2ludGVyRXZlbnRzIHBvaW50cyBwb2ludHNBdFggcG9pbnRzQXRZIHBvaW50c0F0WiBwcmVzZXJ2ZUFscGhhIHByZXNlcnZlQXNwZWN0UmF0aW8gcHJpbWl0aXZlVW5pdHMgciByYWRpdXMgcmVmWCByZWZZIHJlbmRlcmluZ0ludGVudCByZXBlYXRDb3VudCByZXBlYXREdXIgcmVxdWlyZWRFeHRlbnNpb25zIHJlcXVpcmVkRmVhdHVyZXMgcmVzdGFydCByZXN1bHQgcm90YXRlIHJ4IHJ5IHNjYWxlIHNlZWQgc2hhcGVSZW5kZXJpbmcgc2xvcGUgc3BhY2luZyBzcGVjdWxhckNvbnN0YW50IHNwZWN1bGFyRXhwb25lbnQgc3BlZWQgc3ByZWFkTWV0aG9kIHN0YXJ0T2Zmc2V0IHN0ZERldmlhdGlvbiBzdGVtaCBzdGVtdiBzdGl0Y2hUaWxlcyBzdG9wQ29sb3Igc3RvcE9wYWNpdHkgc3RyaWtldGhyb3VnaFBvc2l0aW9uIHN0cmlrZXRocm91Z2hUaGlja25lc3Mgc3RyaW5nIHN0cm9rZSBzdHJva2VEYXNoYXJyYXkgc3Ryb2tlRGFzaG9mZnNldCBzdHJva2VMaW5lY2FwIHN0cm9rZUxpbmVqb2luIHN0cm9rZU1pdGVybGltaXQgc3Ryb2tlT3BhY2l0eSBzdHJva2VXaWR0aCBzdXJmYWNlU2NhbGUgc3lzdGVtTGFuZ3VhZ2UgdGFibGVWYWx1ZXMgdGFyZ2V0WCB0YXJnZXRZIHRleHRBbmNob3IgdGV4dERlY29yYXRpb24gdGV4dFJlbmRlcmluZyB0ZXh0TGVuZ3RoIHRvIHRyYW5zZm9ybSB1MSB1MiB1bmRlcmxpbmVQb3NpdGlvbiB1bmRlcmxpbmVUaGlja25lc3MgdW5pY29kZSB1bmljb2RlQmlkaSB1bmljb2RlUmFuZ2UgdW5pdHNQZXJFbSB2QWxwaGFiZXRpYyB2SGFuZ2luZyB2SWRlb2dyYXBoaWMgdk1hdGhlbWF0aWNhbCB2YWx1ZXMgdmVjdG9yRWZmZWN0IHZlcnNpb24gdmVydEFkdlkgdmVydE9yaWdpblggdmVydE9yaWdpblkgdmlld0JveCB2aWV3VGFyZ2V0IHZpc2liaWxpdHkgd2lkdGhzIHdvcmRTcGFjaW5nIHdyaXRpbmdNb2RlIHggeEhlaWdodCB4MSB4MiB4Q2hhbm5lbFNlbGVjdG9yIHhsaW5rQWN0dWF0ZSB4bGlua0FyY3JvbGUgeGxpbmtIcmVmIHhsaW5rUm9sZSB4bGlua1Nob3cgeGxpbmtUaXRsZSB4bGlua1R5cGUgeG1sQmFzZSB4bWxucyB4bWxuc1hsaW5rIHhtbExhbmcgeG1sU3BhY2UgeSB5MSB5MiB5Q2hhbm5lbFNlbGVjdG9yIHogem9vbUFuZFBhblxuKi9cbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG52YXIgQVRUUklCVVRFX1JFR0VYID0gL14oKD86cyg/OnVwcHJlc3NDb250ZW50RWRpdGFibGVXYXJufGNyb2xsfHBhYyl8KD86c2hhcGV8aW1hZ2V8dGV4dClSZW5kZXJ8KD86bGV0dGVyfHdvcmQpU3BhY3x2SGFuZ3xoYW5nKWluZ3woPzpvbig/OkFuaW1hdGlvbkl0ZXJhdGlvbnxDKD86byg/Om1wb3NpdGlvbig/OlVwZGF0ZXxTdGFydHxFbmQpfG50ZXh0TWVudXxweSl8YW5QbGF5VGhyb3VnaHxhblBsYXl8aGFuZ2V8bGlja3x1dCl8KD86KD86RHVyYXRpb258Vm9sdW1lfFJhdGUpQ2hhbmd8KD86TW91c2VMZWF8KD86VG91Y2h8TW91c2UpTW98RHJhZ0xlYSl2fFBhdXMpZXxMb2FkZWQoPzpNZXRhZHxEKWF0YXwoPzpBbmltYXRpb258VG91Y2h8TG9hZHxEcmFnKVN0YXJ0fCg/Oig/OlQoPzpyYW5zaXRpb258b3VjaCl8QW5pbWF0aW9uKUV8U3VzcGUpbmR8RG91YmxlQ2xpY2t8KD86VG91Y2hDYW5jfFdoZSllbHwoPzpNb3VzZSg/OkVudHxPdillfERyYWcoPzpFbnR8T3YpZXxFcnJvKXJ8VGltZVVwZGF0ZXwoPzpFKD86big/OmNyeXB0fGQpfG1wdGkpfFMoPzp0YWxsfGVlaykpZWR8TW91c2VEb3dufFAoPzpyb2dyZXNzfGxheWluZyl8KD86TW91c2VPdXxEcmFnRXhpfFMoPzplbGVjfHVibWkpfFJlc2V8SW5wdSl0fEtleVByZXNzfERyYWdFbmR8S2V5KD86RG93bnxVcCl8KD86V2FpdHxTZWVrKWluZ3woPzpNb3VzZVV8RHJvKXB8U2Nyb2xsfFBhc3RlfEZvY3VzfEFib3J0fERyYWd8UGxheXxMb2FkfEJsdXIpQ2FwdHVyfGFsaWdubWVudEJhc2VsaW58KD86bGltaXRpbmdDb25lQW5nfHhsaW5rKD86KD86QXJjcnxSKW98VGl0KXxzKD86dXJmYWNlU2NhfHR5fGNhKXx1bnNlbGVjdGFifGJhc2VQcm9maXxmb250U3R5fCg/OmZvY3VzfGRyYWdnKWFifG11bHRpcHxwcm9maXx0aXQpbHxkKD86b21pbmFudEJhc2VsaW58ZWZhdWx0VmFsdSl8YSg/OnV0byg/OkNhcGl0YWxpenxSZXZlcnN8U2F2KXxkZGl0aXYpfCg/Oig/OmZvcm1Ob1ZhbGlkfHhsaW5rQWN0dXxub1ZhbGlkfGFjY3VtdWx8cm90KWF8YXV0b0NvbXBsZXxkZWNlbGVyYSl0fCg/Oig/OmF0dHJpYnV0ZXxpdGVtKVR8ZGF0YXQpeXB8KD86YXR0cmlidXRlfGdseXBoKU5hbXxwbGF5c0lubGlufCg/OmZvcm1FfGUpbmNUeXB8KD86d3JpdGluZ3xpbnB1dHxlZGdlKU1vZHwoPzp4bGlua1R5fGl0ZW1TY298a2V5VHl8c2xvKXB8KD86YW1wbGl0dXxtbylkfCg/OnhtbFNwYXxub24pY3xmaWxsUnVsfCg/OmRhdGVUaXxuYSltfHIoPzplc291cmN8b2wpfHhtbEJhc3x3bW9kKWV8KD86Z2x5cGhPcmllbnRhdGlvbkhvcml6b250fGxvYylhbHwoPzpleHRlcm5hbFJlc291cmNlc1JlcXVpcnxzZWxlY3R8cmV2ZXJzfG11dCllZHxjKD86byg/OmxvckludGVycG9sYXRpb25GaWx0ZXJ8bnRyb2x8b3JkKXN8byg/Omxvcig/OkludGVycG9sYXRpb24pP3xudGVudCl8KD86b250ZW50Uyg/OmNyaXB0fHR5bGUpVHlwfG8oPzpudGVudEVkaXRhYnxsb3JQcm9maSlsfGwoPzphc3NOYW18aXBSdWwpfGEoPzpsY01vZHxwdHVyKXxpdCllfG9sb3JSZW5kZXJpbmd8bCg/OmlwUGF0aFVuaXRzfGFzc0lEKXxvKD86bnRleHRNZW51fGxzKXxoKD86ZWNrZWRMaW5rfGEoPzpsbGVuZ2V8clNldCl8aWxkcmVufGVja2VkKXxlbGwoPzpTcGFjfFBhZGQpaW5nfCg/OnJvc3NPcmlnaXxvbFNwYSlufGFwSGVpZ2h0fGxpcCg/OlBhdGgpP3x1cnNvcnxbeHldKXxnbHlwaE9yaWVudGF0aW9uVmVydGljYWx8ZCg/OmFuZ2Vyb3VzbHlTZXRJbm5lckhUTUx8ZWZhdWx0Q2hlY2tlZHxvd25sb2FkfGlzYWJsZWR8aXNwbGF5fFt4eV0pfCg/OnMoPzp0cmlrZXRocm91Z2hUaGlja258ZWFtbCllc3woPzp1bmR8b3YpZXJsaW5lVGhpY2tuZXN8cig/OmVxdWlyZWRFeHRlbnNpb258YWRpdSl8KD86cmVxdWlyZWRGZWF0dXJ8dGFibGVWYWx1fHN0aXRjaFRpbHxudW1PY3RhdnxmaWx0ZXJSKWV8a2V5KD86KD86U3BsaW58VGltKWV8UGFyYW0pfGF1dG9Gb2N1fGhlYWRlcnxiaWEpc3woPzooPzpzdCg/OnJpa2V0aHJvdWdoUG9zaXxkRGV2aWEpfCg/OnVuZHxvdillcmxpbmVQb3NpfCg/OnRleHREZWNvcnxlbGV2KWF8b3JpZW50YSl0aW98KD86c3Ryb2tlTGluZWpvfG9yaWcpaXxmb3JtQWN0aW98em9vbUFuZFBhfG9uRm9jdXNJfGRpcmVjdGlvfCg/OnZlcnN8YWN0KWlvfHJvd1NwYXxiZWdpfGljbylufG8oPzpuKD86QW5pbWF0aW9uSXRlcmF0aW9ufEMoPzpvKD86bXBvc2l0aW9uKD86VXBkYXRlfFN0YXJ0fEVuZCl8bnRleHRNZW51fHB5KXxhblBsYXlUaHJvdWdofGFuUGxheXxoYW5nZXxsaWNrfHV0KXwoPzooPzpEdXJhdGlvbnxWb2x1bWV8UmF0ZSlDaGFuZ3woPzpNb3VzZUxlYXwoPzpUb3VjaHxNb3VzZSlNb3xEcmFnTGVhKXZ8UGF1cyllfExvYWRlZCg/Ok1ldGFkfEQpYXRhfCg/OkFuaW1hdGlvbnxUb3VjaHxMb2FkfERyYWcpU3RhcnR8KD86KD86VCg/OnJhbnNpdGlvbnxvdWNoKXxBbmltYXRpb24pRXxTdXNwZSluZHxEb3VibGVDbGlja3woPzpUb3VjaENhbmN8V2hlKWVsfCg/Ok1vdXNlKD86RW50fE92KWV8RHJhZyg/OkVudHxPdillfEVycm8pcnxUaW1lVXBkYXRlfCg/OkUoPzpuKD86Y3J5cHR8ZCl8bXB0aSl8Uyg/OnRhbGx8ZWVrKSllZHxNb3VzZURvd258UCg/OnJvZ3Jlc3N8bGF5aW5nKXwoPzpNb3VzZU91fERyYWdFeGl8Uyg/OmVsZWN8dWJtaSl8UmVzZXxJbnB1KXR8S2V5UHJlc3N8RHJhZ0VuZHxLZXkoPzpEb3dufFVwKXwoPzpXYWl0fFNlZWspaW5nfCg/Ok1vdXNlVXxEcm8pcHxTY3JvbGx8UGFzdGV8Rm9jdXN8QWJvcnR8RHJhZ3xQbGF5fExvYWR8Qmx1cil8cmllbnQpfHAoPzpyZXNlcnZlQSg/OnNwZWN0UmF0aW98bHBoYSl8b2ludHNBdFtYLVpdfGFub3NlMSl8KD86cGF0dGVybkNvbnRlbnR8bWEoPzpzayg/OkNvbnRlbnQpP3xya2VyKXxwcmltaXRpdmV8Z3JhZGllbnR8cGF0dGVybnxmaWx0ZXIpVW5pdHN8KD86Z3JhZGllbnRUfHBhdHRlcm5UfHQpcmFuc2Zvcm18KD86KD86YWxsb3dUcmFuc3BhcnxiYXNlRnJlcXUpZW5jfHJlKD86ZmVycmVyUG9saWN8YWRPbmwpfCg/Oig/OnN0KD86cm9rZXxvcClPfGZsb29kT3xmaWxsT3xvKXBhY3xpbnRlZ3J8c2VjdXIpaXR8dmlzaWJpbGl0fGZvbnRGYW1pbHxhY2Nlc3NLZXxwcm9wZXJ0fHN1bW1hcil5fCg/OnN0cm9rZU1pdGVybGltaXwoPzpzcGVjdWxhckNvbnN0YXxyZXBlYXRDb3V8Zm9udFZhcmlhKW58KD86KD86c3BlY3VsYXJFfGUpeHBvbnxyZW5kZXJpbmdJbnR8YXNjKWVufGQoPzppZmZ1c2VDb25zdGF8ZXNjZSlufCg/OmZvbnRTaXplQWRqdXxsZW5ndGhBZGp1fG1hbmlmZSlzfGJhc2VsaW5lU2hpZnx2ZWN0b3JFZmZlY3woPzooPzptYXIoPzprZXJ8Z2luKXx4KUh8YWNjZW50SHxmb250VyllaWdofGEoPzp1dG9Db3JyZWN8Ym91KXxtYXJrZXJTdGFyfG9uRm9jdXNPdXxpbig/OnRlcmNlcHxsaXMpfHJlc3Rhcnxmb3JtYXxoZWlnaHxsaXMpdHwoPzooPzpzdCg/OnJva2VEYXNob3xhcnRPKXxvKWZmc3xhY2NlcHRDaGFyc3xmb3JtVGFyZ3x2aWV3VGFyZ3xzcmNTKWV0fCg/Oig/OmVuYWJsZUJhY2tncm91fG1hcmtlckUpbnxzKD86cCg/OnJlYWRNZXRob3xlZSl8ZWUpfGZvcm1NZXRob3xtKD86YXJrZXJNaXxldGhvKXxwcmVsb2F8a2luKWR8ayg/OmVybmVsKD86VW5pdExlbmd0aHxNYXRyaXgpfFsxLTRdKXwoPzpbeHldQ2hhbm5lbFNlbGVjdHxsaWdodGluZ0NvbHx0ZXh0QW5jaHxmbG9vZENvbHxzdG9wQ29sfG9wZXJhdHxodG1sRilvcnwoPzphbGxvd0Z1bGxTY3JlfGhpZGQpZW58c3Ryb2tlRGFzaGFycmF5fHN5c3RlbUxhbmd1YWdlfCg/OnN0cm9rZUxpbmVjYXxpdGVtUHJvfHVzZU1hfHdyYXxsb28pcHx2KD86TWF0aGVtYXRpY2FsfGVydCg/Ok9yaWdpbltYWV18QWR2WSl8YWx1ZXN8b2NhYil8KD86cG9pbnRlckV2ZXxrZXlQb2kpbnRzfHVuaWNvZGVSYW5nZXwoPzooPzphbGxvd1Jlb3JkfHBsYWNlaG9sZHxmcmFtZUJvcmR8cGFpbnRPcmR8cG9zdHxvcmQpZXxyZXBlYXREdXxkKD86ZWZlfHUpKXJ8bWF0aGVtYXRpY2FsfCg/OnZJfGkpZGVvZ3JhcGhpY3xoKD86b3Jpeig/Ok9yaWdpbnxBZHYpWHx0dHBFcXVpdil8dSg/Om5pY29kZUJpZGl8WzEyXSl8KD86Zm9udFN0cmV0Y3xoaWcpaHwoPzooPzptYXIoPzprZXJ8Z2luKVd8c3Ryb2tlVylpZHxhemltdSl0aHx2QWxwaGFiZXRpY3xtZWRpYUdyb3VwfHNwZWxsQ2hlY2t8KD86dW5pdHNQZXJFfG9wdGltdXxmcm8pbXxyKD86YWRpb0dyb3VwfGUoPzpzdWx0c3xmW1hZXXxsKXxvd3N8W3h5XSl8KD86eG1sbnNYbHx2YWx1ZUwpaW5rfGEoPzpyYWJpY0Zvcm18bCg/OnBoYWJldGljfHQpfHN5bmMpfHBhdGhMZW5ndGh8KD86dGV4dHxtKD86aW58YXgpKUxlbmd0aHxpbm5lckhUTUx8eGxpbmtTaG93fCg/OnhsaW5rSHJ8Z2x5cGhSKWVmfHIoPzplKD86cXVpcmVkfHN1bHR8ZikpP3xvKD86dmVyZmxvd3xwZW4pfCg/OnRhYkluZGV8KD86c2FuZHxiKWJvfHZpZXdCbyl4fCg/Oig/OmhyZWZ8eG1sfHNyYylMYXxrZXJuaSluZ3xmKD86byg/Om50U2l6ZXxybSl8aWwoPzp0ZXJ8bCkpfGF1dG9QbGF5fHVuaWNvZGV8cCg/OmF0dGVybnxvaW50cyl8dCg/OmFyZ2V0W1hZXXxvKXxpKD86dGVtUmVmfG4yfHMpfGRpdmlzb3J8ZCg/OmVmYXVsdHxhdGF8aXIpP3xzcmNEb2N8cyg/OmNvcGVkfHRlKD86bVtodl18cCl8cGFuKXwoPzp3aWR0aHxzaXplKXN8KD86c3RyaXxsYSluZ3xwcmVmaXh8aXRlbUlEfHMoPzp0KD86cm9rZXxhcnQpfGhhcGV8Y29wZXxyYyl8YSg/OmNjZXB0fHMpfHQoPzphcmdldHx5cGUpfHR5cGVvZnx3aWR0aHx2YWx1ZXx4KD86bWxucyk/fGxhYmVsfG0oPzplZGlhfGEoPzpza3x4KXxpbil8c2l6ZXxocmVmfGsoPzpleSk/fGVuZHxsb3d8eFsxMl18aVtkbl18eVsxMl18Z1sxMl18Ynl8Zlt4eV18W3l6XSkkLztcblxuLyogRnJvbSBET01Qcm9wZXJ0eSAqL1xudmFyIEFUVFJJQlVURV9OQU1FX1NUQVJUX0NIQVIgPSAnOkEtWl9hLXpcXFxcdTAwQzAtXFxcXHUwMEQ2XFxcXHUwMEQ4LVxcXFx1MDBGNlxcXFx1MDBGOC1cXFxcdTAyRkZcXFxcdTAzNzAtXFxcXHUwMzdEXFxcXHUwMzdGLVxcXFx1MUZGRlxcXFx1MjAwQy1cXFxcdTIwMERcXFxcdTIwNzAtXFxcXHUyMThGXFxcXHUyQzAwLVxcXFx1MkZFRlxcXFx1MzAwMS1cXFxcdUQ3RkZcXFxcdUY5MDAtXFxcXHVGRENGXFxcXHVGREYwLVxcXFx1RkZGRCc7XG52YXIgQVRUUklCVVRFX05BTUVfQ0hBUiA9IEFUVFJJQlVURV9OQU1FX1NUQVJUX0NIQVIgKyAnXFxcXC0uMC05XFxcXHUwMEI3XFxcXHUwMzAwLVxcXFx1MDM2RlxcXFx1MjAzRi1cXFxcdTIwNDAnO1xudmFyIGlzQ3VzdG9tQXR0cmlidXRlID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0LmJpbmQobmV3IFJlZ0V4cCgnXihkYXRhfGFyaWEpLVsnICsgQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKSk7XG5cbnZhciB2YWxpZEF0dHIgPSAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIEFUVFJJQlVURV9SRUdFWC50ZXN0KG5hbWUpIHx8IGlzQ3VzdG9tQXR0cmlidXRlKG5hbWUudG9Mb3dlckNhc2UoKSk7XG59KTtcblxuLy8gICAgICBcblxuXG5mdW5jdGlvbiBpc1RhZyh0YXJnZXQpIC8qIDogJWNoZWNrcyAqL3tcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnO1xufVxuXG4vLyAgICAgIFxuXG5cbmZ1bmN0aW9uIGlzU3R5bGVkQ29tcG9uZW50KHRhcmdldCkgLyogOiAlY2hlY2tzICove1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdGFyZ2V0LnN0eWxlZENvbXBvbmVudElkID09PSAnc3RyaW5nJztcbn1cblxuLy8gICAgICBcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUodGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQuZGlzcGxheU5hbWUgfHwgdGFyZ2V0Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG59XG5cbi8vICAgICAgXG5cblxudmFyIGRldGVybWluZVRoZW1lID0gKGZ1bmN0aW9uIChwcm9wcywgZmFsbGJhY2tUaGVtZSwgZGVmYXVsdFByb3BzKSB7XG4gIC8vIFByb3BzIHNob3VsZCB0YWtlIHByZWNlZGVuY2Ugb3ZlciBUaGVtZVByb3ZpZGVyLCB3aGljaCBzaG91bGQgdGFrZSBwcmVjZWRlbmNlIG92ZXJcbiAgLy8gZGVmYXVsdFByb3BzLCBidXQgUmVhY3QgYXV0b21hdGljYWxseSBwdXRzIGRlZmF1bHRQcm9wcyBvbiBwcm9wcy5cblxuICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4gIHZhciBpc0RlZmF1bHRUaGVtZSA9IGRlZmF1bHRQcm9wcyAmJiBwcm9wcy50aGVtZSA9PT0gZGVmYXVsdFByb3BzLnRoZW1lO1xuICB2YXIgdGhlbWUgPSBwcm9wcy50aGVtZSAmJiAhaXNEZWZhdWx0VGhlbWUgPyBwcm9wcy50aGVtZSA6IGZhbGxiYWNrVGhlbWU7XG4gIC8qIGVzbGludC1lbmFibGUgKi9cblxuICByZXR1cm4gdGhlbWU7XG59KTtcblxuLy8gICAgICBcbnZhciBlc2NhcGVSZWdleCA9IC9bW1xcXS4jKiQ+PCt+PXxeOigpLFwiJ2AtXSsvZztcbnZhciBkYXNoZXNBdEVuZHMgPSAvKF4tfC0kKS9nO1xuXG4vKipcbiAqIFRPRE86IEV4cGxvcmUgdXNpbmcgQ1NTLmVzY2FwZSB3aGVuIGl0IGJlY29tZXMgbW9yZSBhdmFpbGFibGVcbiAqIGluIGV2ZXJncmVlbiBicm93c2Vycy5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHN0cikge1xuICByZXR1cm4gc3RyXG4gIC8vIFJlcGxhY2UgYWxsIHBvc3NpYmxlIENTUyBzZWxlY3RvcnNcbiAgLnJlcGxhY2UoZXNjYXBlUmVnZXgsICctJylcblxuICAvLyBSZW1vdmUgZXh0cmFuZW91cyBoeXBoZW5zIGF0IHRoZSBzdGFydCBhbmQgZW5kXG4gIC5yZXBsYWNlKGRhc2hlc0F0RW5kcywgJycpO1xufVxuXG4vLyAgICAgIFxuLyoqXG4gKiBDcmVhdGVzIGEgYnJvYWRjYXN0IHRoYXQgY2FuIGJlIGxpc3RlbmVkIHRvLCBpLmUuIHNpbXBsZSBldmVudCBlbWl0dGVyXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9yZWFjdC1icm9hZGNhc3RcbiAqL1xuXG52YXIgY3JlYXRlQnJvYWRjYXN0ID0gZnVuY3Rpb24gY3JlYXRlQnJvYWRjYXN0KGluaXRpYWxTdGF0ZSkge1xuICB2YXIgbGlzdGVuZXJzID0ge307XG4gIHZhciBpZCA9IDA7XG4gIHZhciBzdGF0ZSA9IGluaXRpYWxTdGF0ZTtcblxuICBmdW5jdGlvbiBwdWJsaXNoKG5leHRTdGF0ZSkge1xuICAgIHN0YXRlID0gbmV4dFN0YXRlO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGd1YXJkLWZvci1pbiwgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBmb3IgKHZhciBrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNba2V5XTtcbiAgICAgIGlmIChsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXIoc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIHZhciBjdXJyZW50SWQgPSBpZDtcbiAgICBsaXN0ZW5lcnNbY3VycmVudElkXSA9IGxpc3RlbmVyO1xuICAgIGlkICs9IDE7XG4gICAgbGlzdGVuZXIoc3RhdGUpO1xuICAgIHJldHVybiBjdXJyZW50SWQ7XG4gIH1cblxuICBmdW5jdGlvbiB1bnN1YnNjcmliZSh1bnN1YklEKSB7XG4gICAgbGlzdGVuZXJzW3Vuc3ViSURdID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHsgcHVibGlzaDogcHVibGlzaCwgc3Vic2NyaWJlOiBzdWJzY3JpYmUsIHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xufTtcblxuLy8gICAgICBcbi8vIEhlbHBlciB0byBjYWxsIGEgZ2l2ZW4gZnVuY3Rpb24sIG9ubHkgb25jZVxudmFyIG9uY2UgPSAoZnVuY3Rpb24gKGNiKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgY2IoKTtcbiAgICB9XG4gIH07XG59KTtcblxudmFyIF9UaGVtZVByb3ZpZGVyJGNoaWxkQztcbnZhciBfVGhlbWVQcm92aWRlciRjb250ZXg7XG5cbi8vICAgICAgXG4vKiBnbG9iYWxzIFJlYWN0JEVsZW1lbnQgKi9cbi8vIE5PVEU6IERPIE5PVCBDSEFOR0UsIGNoYW5naW5nIHRoaXMgaXMgYSBzZW12ZXIgbWFqb3IgY2hhbmdlIVxudmFyIENIQU5ORUwgPSAnX19zdHlsZWQtY29tcG9uZW50c19fJztcbnZhciBDSEFOTkVMX05FWFQgPSBDSEFOTkVMICsgJ25leHRfXyc7XG5cbnZhciBDT05URVhUX0NIQU5ORUxfU0hBUEUgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICBnZXRUaGVtZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHVuc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuY1xufSk7XG5cbnZhciB3YXJuQ2hhbm5lbERlcHJlY2F0ZWQgPSB2b2lkIDA7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuQ2hhbm5lbERlcHJlY2F0ZWQgPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUuZXJyb3IoJ1dhcm5pbmc6IFVzYWdlIG9mIGBjb250ZXh0LicgKyBDSEFOTkVMICsgJ2AgYXMgYSBmdW5jdGlvbiBpcyBkZXByZWNhdGVkLiBJdCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIG9iamVjdCBvbiBgLmNvbnRleHQuJyArIENIQU5ORUxfTkVYVCArICdgIGluIGEgZnV0dXJlIHZlcnNpb24uJyk7XG4gIH0pO1xufVxuXG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIGlzRnVuY3Rpb24odGVzdCkge1xuICByZXR1cm4gdHlwZW9mIHRlc3QgPT09ICdmdW5jdGlvbic7XG59O1xuXG4vKipcbiAqIFByb3ZpZGUgYSB0aGVtZSB0byBhbiBlbnRpcmUgcmVhY3QgY29tcG9uZW50IHRyZWUgdmlhIGNvbnRleHQgYW5kIGV2ZW50IGxpc3RlbmVycyAoaGF2ZSB0byBkb1xuICogYm90aCBjb250ZXh0IGFuZCBldmVudCBlbWl0dGVyIGFzIHB1cmUgY29tcG9uZW50cyBibG9jayBjb250ZXh0IHVwZGF0ZXMpXG4gKi9cblxudmFyIFRoZW1lUHJvdmlkZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhUaGVtZVByb3ZpZGVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBUaGVtZVByb3ZpZGVyKCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFRoZW1lUHJvdmlkZXIpO1xuXG4gICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwodGhpcykpO1xuXG4gICAgX3RoaXMudW5zdWJzY3JpYmVUb091dGVySWQgPSAtMTtcblxuICAgIF90aGlzLmdldFRoZW1lID0gX3RoaXMuZ2V0VGhlbWUuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgVGhlbWVQcm92aWRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBUaGVtZVByb3ZpZGVyIHdyYXBwZXIgYW55d2hlcmUgYXJvdW5kIHRoaXMgdGhlbWUgcHJvdmlkZXIsIG1lcmdlIHRoaXMgdGhlbWVcbiAgICAvLyB3aXRoIHRoZSBvdXRlciB0aGVtZVxuICAgIHZhciBvdXRlckNvbnRleHQgPSB0aGlzLmNvbnRleHRbQ0hBTk5FTF9ORVhUXTtcbiAgICBpZiAob3V0ZXJDb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVUb091dGVySWQgPSBvdXRlckNvbnRleHQuc3Vic2NyaWJlKGZ1bmN0aW9uICh0aGVtZSkge1xuICAgICAgICBfdGhpczIub3V0ZXJUaGVtZSA9IHRoZW1lO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuYnJvYWRjYXN0ID0gY3JlYXRlQnJvYWRjYXN0KHRoaXMuZ2V0VGhlbWUoKSk7XG4gIH07XG5cbiAgVGhlbWVQcm92aWRlci5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzLFxuICAgICAgICBfYmFiZWxIZWxwZXJzJGV4dGVuZHM7XG5cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIHRoaXMuY29udGV4dCwgKF9iYWJlbEhlbHBlcnMkZXh0ZW5kcyA9IHt9LCBfYmFiZWxIZWxwZXJzJGV4dGVuZHNbQ0hBTk5FTF9ORVhUXSA9IHtcbiAgICAgIGdldFRoZW1lOiB0aGlzLmdldFRoZW1lLFxuICAgICAgc3Vic2NyaWJlOiB0aGlzLmJyb2FkY2FzdC5zdWJzY3JpYmUsXG4gICAgICB1bnN1YnNjcmliZTogdGhpcy5icm9hZGNhc3QudW5zdWJzY3JpYmVcbiAgICB9LCBfYmFiZWxIZWxwZXJzJGV4dGVuZHNbQ0hBTk5FTF0gPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgd2FybkNoYW5uZWxEZXByZWNhdGVkKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFBhdGNoIHRoZSBvbGQgYHN1YnNjcmliZWAgcHJvdmlkZSB2aWEgYENIQU5ORUxgIGZvciBvbGRlciBjbGllbnRzLlxuICAgICAgdmFyIHVuc3Vic2NyaWJlSWQgPSBfdGhpczMuYnJvYWRjYXN0LnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczMuYnJvYWRjYXN0LnVuc3Vic2NyaWJlKHVuc3Vic2NyaWJlSWQpO1xuICAgICAgfTtcbiAgICB9LCBfYmFiZWxIZWxwZXJzJGV4dGVuZHMpKTtcbiAgfTtcblxuICBUaGVtZVByb3ZpZGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy50aGVtZSAhPT0gbmV4dFByb3BzLnRoZW1lKSB7XG4gICAgICB0aGlzLmJyb2FkY2FzdC5wdWJsaXNoKHRoaXMuZ2V0VGhlbWUobmV4dFByb3BzLnRoZW1lKSk7XG4gICAgfVxuICB9O1xuXG4gIFRoZW1lUHJvdmlkZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMudW5zdWJzY3JpYmVUb091dGVySWQgIT09IC0xKSB7XG4gICAgICB0aGlzLmNvbnRleHRbQ0hBTk5FTF9ORVhUXS51bnN1YnNjcmliZSh0aGlzLnVuc3Vic2NyaWJlVG9PdXRlcklkKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gR2V0IHRoZSB0aGVtZSBmcm9tIHRoZSBwcm9wcywgc3VwcG9ydGluZyBib3RoIChvdXRlclRoZW1lKSA9PiB7fSBhcyB3ZWxsIGFzIG9iamVjdCBub3RhdGlvblxuXG5cbiAgVGhlbWVQcm92aWRlci5wcm90b3R5cGUuZ2V0VGhlbWUgPSBmdW5jdGlvbiBnZXRUaGVtZShwYXNzZWRUaGVtZSkge1xuICAgIHZhciB0aGVtZSA9IHBhc3NlZFRoZW1lIHx8IHRoaXMucHJvcHMudGhlbWU7XG4gICAgaWYgKGlzRnVuY3Rpb24odGhlbWUpKSB7XG4gICAgICB2YXIgbWVyZ2VkVGhlbWUgPSB0aGVtZSh0aGlzLm91dGVyVGhlbWUpO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIWlzUGxhaW5PYmplY3QobWVyZ2VkVGhlbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW1RoZW1lUHJvdmlkZXJdIFBsZWFzZSByZXR1cm4gYW4gb2JqZWN0IGZyb20geW91ciB0aGVtZSBmdW5jdGlvbiwgaS5lLiB0aGVtZT17KCkgPT4gKHt9KX0hJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVyZ2VkVGhlbWU7XG4gICAgfVxuICAgIGlmICghaXNQbGFpbk9iamVjdCh0aGVtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW1RoZW1lUHJvdmlkZXJdIFBsZWFzZSBtYWtlIHlvdXIgdGhlbWUgcHJvcCBhIHBsYWluIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIHRoaXMub3V0ZXJUaGVtZSwgdGhlbWUpO1xuICB9O1xuXG4gIFRoZW1lUHJvdmlkZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfTtcblxuICByZXR1cm4gVGhlbWVQcm92aWRlcjtcbn0oQ29tcG9uZW50KTtcblxuVGhlbWVQcm92aWRlci5jaGlsZENvbnRleHRUeXBlcyA9IChfVGhlbWVQcm92aWRlciRjaGlsZEMgPSB7fSwgX1RoZW1lUHJvdmlkZXIkY2hpbGRDW0NIQU5ORUxdID0gUHJvcFR5cGVzLmZ1bmMsIF9UaGVtZVByb3ZpZGVyJGNoaWxkQ1tDSEFOTkVMX05FWFRdID0gQ09OVEVYVF9DSEFOTkVMX1NIQVBFLCBfVGhlbWVQcm92aWRlciRjaGlsZEMpO1xuVGhlbWVQcm92aWRlci5jb250ZXh0VHlwZXMgPSAoX1RoZW1lUHJvdmlkZXIkY29udGV4ID0ge30sIF9UaGVtZVByb3ZpZGVyJGNvbnRleFtDSEFOTkVMX05FWFRdID0gQ09OVEVYVF9DSEFOTkVMX1NIQVBFLCBfVGhlbWVQcm92aWRlciRjb250ZXgpO1xuXG4vLyAgICAgIFxuXG4vLyBIQUNLIGZvciBnZW5lcmF0aW5nIGFsbCBzdGF0aWMgc3R5bGVzIHdpdGhvdXQgbmVlZGluZyB0byBhbGxvY2F0ZVxuLy8gYW4gZW1wdHkgZXhlY3V0aW9uIGNvbnRleHQgZXZlcnkgc2luZ2xlIHRpbWUuLi5cbnZhciBTVEFUSUNfRVhFQ1VUSU9OX0NPTlRFWFQgPSB7fTtcblxudmFyIF9TdHlsZWRDb21wb25lbnQgPSAoZnVuY3Rpb24gKENvbXBvbmVudFN0eWxlLCBjb25zdHJ1Y3RXaXRoT3B0aW9ucykge1xuICB2YXIgaWRlbnRpZmllcnMgPSB7fTtcblxuICAvKiBXZSBkZXBlbmQgb24gY29tcG9uZW50cyBoYXZpbmcgdW5pcXVlIElEcyAqL1xuICB2YXIgZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uIGdlbmVyYXRlSWQoX2Rpc3BsYXlOYW1lLCBwYXJlbnRDb21wb25lbnRJZCkge1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiBfZGlzcGxheU5hbWUgIT09ICdzdHJpbmcnID8gJ3NjJyA6IGVzY2FwZShfZGlzcGxheU5hbWUpO1xuXG4gICAgdmFyIGNvbXBvbmVudElkID0gdm9pZCAwO1xuXG4gICAgLyoqXG4gICAgICogb25seSBmYWxsIGJhY2sgdG8gaGFzaGluZyB0aGUgY29tcG9uZW50IGluamVjdGlvbiBvcmRlciBpZlxuICAgICAqIGEgcHJvcGVyIGRpc3BsYXlOYW1lIGlzbid0IHByb3ZpZGVkIGJ5IHRoZSBiYWJlbCBwbHVnaW5cbiAgICAgKi9cbiAgICBpZiAoIV9kaXNwbGF5TmFtZSkge1xuICAgICAgdmFyIG5yID0gKGlkZW50aWZpZXJzW2Rpc3BsYXlOYW1lXSB8fCAwKSArIDE7XG4gICAgICBpZGVudGlmaWVyc1tkaXNwbGF5TmFtZV0gPSBucjtcblxuICAgICAgY29tcG9uZW50SWQgPSBkaXNwbGF5TmFtZSArICctJyArIENvbXBvbmVudFN0eWxlLmdlbmVyYXRlTmFtZShkaXNwbGF5TmFtZSArIG5yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50SWQgPSBkaXNwbGF5TmFtZSArICctJyArIENvbXBvbmVudFN0eWxlLmdlbmVyYXRlTmFtZShkaXNwbGF5TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudENvbXBvbmVudElkICE9PSB1bmRlZmluZWQgPyBwYXJlbnRDb21wb25lbnRJZCArICctJyArIGNvbXBvbmVudElkIDogY29tcG9uZW50SWQ7XG4gIH07XG5cbiAgdmFyIEJhc2VTdHlsZWRDb21wb25lbnQgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGluaGVyaXRzKEJhc2VTdHlsZWRDb21wb25lbnQsIF9Db21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gQmFzZVN0eWxlZENvbXBvbmVudCgpIHtcbiAgICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEJhc2VTdHlsZWRDb21wb25lbnQpO1xuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsLmFwcGx5KF9Db21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5hdHRycyA9IHt9LCBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgdGhlbWU6IG51bGwsXG4gICAgICAgIGdlbmVyYXRlZENsYXNzTmFtZTogJydcbiAgICAgIH0sIF90aGlzLnVuc3Vic2NyaWJlSWQgPSAtMSwgX3RlbXApLCBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgICB9XG5cbiAgICBCYXNlU3R5bGVkQ29tcG9uZW50LnByb3RvdHlwZS51bnN1YnNjcmliZUZyb21Db250ZXh0ID0gZnVuY3Rpb24gdW5zdWJzY3JpYmVGcm9tQ29udGV4dCgpIHtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlSWQgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuY29udGV4dFtDSEFOTkVMX05FWFRdLnVuc3Vic2NyaWJlKHRoaXMudW5zdWJzY3JpYmVJZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEJhc2VTdHlsZWRDb21wb25lbnQucHJvdG90eXBlLmJ1aWxkRXhlY3V0aW9uQ29udGV4dCA9IGZ1bmN0aW9uIGJ1aWxkRXhlY3V0aW9uQ29udGV4dCh0aGVtZSwgcHJvcHMpIHtcbiAgICAgIHZhciBhdHRycyA9IHRoaXMuY29uc3RydWN0b3IuYXR0cnM7XG5cbiAgICAgIHZhciBjb250ZXh0ID0gX2V4dGVuZHMoe30sIHByb3BzLCB7IHRoZW1lOiB0aGVtZSB9KTtcbiAgICAgIGlmIChhdHRycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgfVxuXG4gICAgICB0aGlzLmF0dHJzID0gT2JqZWN0LmtleXMoYXR0cnMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIGF0dHIgPSBhdHRyc1trZXldO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgYWNjW2tleV0gPSB0eXBlb2YgYXR0ciA9PT0gJ2Z1bmN0aW9uJyA/IGF0dHIoY29udGV4dCkgOiBhdHRyO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIGNvbnRleHQsIHRoaXMuYXR0cnMpO1xuICAgIH07XG5cbiAgICBCYXNlU3R5bGVkQ29tcG9uZW50LnByb3RvdHlwZS5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyA9IGZ1bmN0aW9uIGdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKHRoZW1lLCBwcm9wcykge1xuICAgICAgdmFyIF9jb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3IsXG4gICAgICAgICAgYXR0cnMgPSBfY29uc3RydWN0b3IuYXR0cnMsXG4gICAgICAgICAgY29tcG9uZW50U3R5bGUgPSBfY29uc3RydWN0b3IuY29tcG9uZW50U3R5bGUsXG4gICAgICAgICAgd2FyblRvb01hbnlDbGFzc2VzID0gX2NvbnN0cnVjdG9yLndhcm5Ub29NYW55Q2xhc3NlcztcblxuICAgICAgdmFyIHN0eWxlU2hlZXQgPSB0aGlzLmNvbnRleHRbQ09OVEVYVF9LRVldIHx8IFN0eWxlU2hlZXQuaW5zdGFuY2U7XG5cbiAgICAgIC8vIHN0YXRpY2FseSBzdHlsZWQtY29tcG9uZW50cyBkb24ndCBuZWVkIHRvIGJ1aWxkIGFuIGV4ZWN1dGlvbiBjb250ZXh0IG9iamVjdCxcbiAgICAgIC8vIGFuZCBzaG91bGRuJ3QgYmUgaW5jcmVhc2luZyB0aGUgbnVtYmVyIG9mIGNsYXNzIG5hbWVzXG4gICAgICBpZiAoY29tcG9uZW50U3R5bGUuaXNTdGF0aWMgJiYgYXR0cnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50U3R5bGUuZ2VuZXJhdGVBbmRJbmplY3RTdHlsZXMoU1RBVElDX0VYRUNVVElPTl9DT05URVhULCBzdHlsZVNoZWV0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBleGVjdXRpb25Db250ZXh0ID0gdGhpcy5idWlsZEV4ZWN1dGlvbkNvbnRleHQodGhlbWUsIHByb3BzKTtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGNvbXBvbmVudFN0eWxlLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKGV4ZWN1dGlvbkNvbnRleHQsIHN0eWxlU2hlZXQpO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm5Ub29NYW55Q2xhc3NlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgd2FyblRvb01hbnlDbGFzc2VzKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBCYXNlU3R5bGVkQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGNvbXBvbmVudFN0eWxlID0gdGhpcy5jb25zdHJ1Y3Rvci5jb21wb25lbnRTdHlsZTtcblxuICAgICAgdmFyIHN0eWxlZENvbnRleHQgPSB0aGlzLmNvbnRleHRbQ0hBTk5FTF9ORVhUXTtcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHN0YXRpY2FseS1zdHlsZWQgY29tcG9uZW50LCB3ZSBkb24ndCBuZWVkIHRvIHRoZSB0aGVtZVxuICAgICAgLy8gdG8gZ2VuZXJhdGUgb3IgYnVpbGQgc3R5bGVzLlxuICAgICAgaWYgKGNvbXBvbmVudFN0eWxlLmlzU3RhdGljKSB7XG4gICAgICAgIHZhciBnZW5lcmF0ZWRDbGFzc05hbWUgPSB0aGlzLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKFNUQVRJQ19FWEVDVVRJT05fQ09OVEVYVCwgdGhpcy5wcm9wcyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBnZW5lcmF0ZWRDbGFzc05hbWU6IGdlbmVyYXRlZENsYXNzTmFtZSB9KTtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSB0aGVtZSBpbiB0aGUgY29udGV4dCwgc3Vic2NyaWJlIHRvIHRoZSBldmVudCBlbWl0dGVyLiBUaGlzXG4gICAgICAgIC8vIGlzIG5lY2Vzc2FyeSBkdWUgdG8gcHVyZSBjb21wb25lbnRzIGJsb2NraW5nIGNvbnRleHQgdXBkYXRlcywgdGhpcyBjaXJjdW12ZW50c1xuICAgICAgICAvLyB0aGF0IGJ5IHVwZGF0aW5nIHdoZW4gYW4gZXZlbnQgaXMgZW1pdHRlZFxuICAgICAgfSBlbHNlIGlmIChzdHlsZWRDb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHN1YnNjcmliZSA9IHN0eWxlZENvbnRleHQuc3Vic2NyaWJlO1xuXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVJZCA9IHN1YnNjcmliZShmdW5jdGlvbiAobmV4dFRoZW1lKSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIGJlIGNhbGxlZCBvbmNlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgdmFyIHRoZW1lID0gZGV0ZXJtaW5lVGhlbWUoX3RoaXMyLnByb3BzLCBuZXh0VGhlbWUsIF90aGlzMi5jb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMpO1xuICAgICAgICAgIHZhciBnZW5lcmF0ZWRDbGFzc05hbWUgPSBfdGhpczIuZ2VuZXJhdGVBbmRJbmplY3RTdHlsZXModGhlbWUsIF90aGlzMi5wcm9wcyk7XG5cbiAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoeyB0aGVtZTogdGhlbWUsIGdlbmVyYXRlZENsYXNzTmFtZTogZ2VuZXJhdGVkQ2xhc3NOYW1lIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9wcm9wLXR5cGVzXG4gICAgICAgIHZhciB0aGVtZSA9IHRoaXMucHJvcHMudGhlbWUgfHwge307XG4gICAgICAgIHZhciBfZ2VuZXJhdGVkQ2xhc3NOYW1lID0gdGhpcy5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyh0aGVtZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0aGVtZTogdGhlbWUsIGdlbmVyYXRlZENsYXNzTmFtZTogX2dlbmVyYXRlZENsYXNzTmFtZSB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQmFzZVN0eWxlZENvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHN0YXRpY2FseS1zdHlsZWQgY29tcG9uZW50LCB3ZSBkb24ndCBuZWVkIHRvIGxpc3RlbiB0b1xuICAgICAgLy8gcHJvcHMgY2hhbmdlcyB0byB1cGRhdGUgc3R5bGVzXG4gICAgICB2YXIgY29tcG9uZW50U3R5bGUgPSB0aGlzLmNvbnN0cnVjdG9yLmNvbXBvbmVudFN0eWxlO1xuXG4gICAgICBpZiAoY29tcG9uZW50U3R5bGUuaXNTdGF0aWMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uIChvbGRTdGF0ZSkge1xuICAgICAgICB2YXIgdGhlbWUgPSBkZXRlcm1pbmVUaGVtZShuZXh0UHJvcHMsIG9sZFN0YXRlLnRoZW1lLCBfdGhpczMuY29uc3RydWN0b3IuZGVmYXVsdFByb3BzKTtcbiAgICAgICAgdmFyIGdlbmVyYXRlZENsYXNzTmFtZSA9IF90aGlzMy5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyh0aGVtZSwgbmV4dFByb3BzKTtcblxuICAgICAgICByZXR1cm4geyB0aGVtZTogdGhlbWUsIGdlbmVyYXRlZENsYXNzTmFtZTogZ2VuZXJhdGVkQ2xhc3NOYW1lIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgQmFzZVN0eWxlZENvbXBvbmVudC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVGcm9tQ29udGV4dCgpO1xuICAgIH07XG5cbiAgICBCYXNlU3R5bGVkQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L3Byb3AtdHlwZXNcbiAgICAgIHZhciBpbm5lclJlZiA9IHRoaXMucHJvcHMuaW5uZXJSZWY7XG4gICAgICB2YXIgZ2VuZXJhdGVkQ2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5nZW5lcmF0ZWRDbGFzc05hbWU7XG4gICAgICB2YXIgX2NvbnN0cnVjdG9yMiA9IHRoaXMuY29uc3RydWN0b3IsXG4gICAgICAgICAgc3R5bGVkQ29tcG9uZW50SWQgPSBfY29uc3RydWN0b3IyLnN0eWxlZENvbXBvbmVudElkLFxuICAgICAgICAgIHRhcmdldCA9IF9jb25zdHJ1Y3RvcjIudGFyZ2V0O1xuXG5cbiAgICAgIHZhciBpc1RhcmdldFRhZyA9IGlzVGFnKHRhcmdldCk7XG5cbiAgICAgIHZhciBjbGFzc05hbWUgPSBbXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvcHJvcC10eXBlc1xuICAgICAgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHN0eWxlZENvbXBvbmVudElkLCB0aGlzLmF0dHJzLmNsYXNzTmFtZSwgZ2VuZXJhdGVkQ2xhc3NOYW1lXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpO1xuXG4gICAgICB2YXIgYmFzZVByb3BzID0gX2V4dGVuZHMoe30sIHRoaXMuYXR0cnMsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaXNTdHlsZWRDb21wb25lbnQodGFyZ2V0KSkge1xuICAgICAgICBiYXNlUHJvcHMuaW5uZXJSZWYgPSBpbm5lclJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhc2VQcm9wcy5yZWYgPSBpbm5lclJlZjtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb3BzRm9yRWxlbWVudCA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wTmFtZSkge1xuICAgICAgICAvLyBEb24ndCBwYXNzIHRocm91Z2ggbm9uIEhUTUwgdGFncyB0aHJvdWdoIHRvIEhUTUwgZWxlbWVudHNcbiAgICAgICAgLy8gYWx3YXlzIG9taXQgaW5uZXJSZWZcbiAgICAgICAgaWYgKHByb3BOYW1lICE9PSAnaW5uZXJSZWYnICYmIHByb3BOYW1lICE9PSAnY2xhc3NOYW1lJyAmJiAoIWlzVGFyZ2V0VGFnIHx8IHZhbGlkQXR0cihwcm9wTmFtZSkpKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgYWNjW3Byb3BOYW1lXSA9IF90aGlzNC5wcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwgYmFzZVByb3BzKTtcblxuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodGFyZ2V0LCBwcm9wc0ZvckVsZW1lbnQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQmFzZVN0eWxlZENvbXBvbmVudDtcbiAgfShDb21wb25lbnQpO1xuXG4gIHZhciBjcmVhdGVTdHlsZWRDb21wb25lbnQgPSBmdW5jdGlvbiBjcmVhdGVTdHlsZWRDb21wb25lbnQodGFyZ2V0LCBvcHRpb25zLCBydWxlcykge1xuICAgIHZhciBfU3R5bGVkQ29tcG9uZW50JGNvbnQ7XG5cbiAgICB2YXIgX29wdGlvbnMkZGlzcGxheU5hbWUgPSBvcHRpb25zLmRpc3BsYXlOYW1lLFxuICAgICAgICBkaXNwbGF5TmFtZSA9IF9vcHRpb25zJGRpc3BsYXlOYW1lID09PSB1bmRlZmluZWQgPyBpc1RhZyh0YXJnZXQpID8gJ3N0eWxlZC4nICsgdGFyZ2V0IDogJ1N0eWxlZCgnICsgZ2V0Q29tcG9uZW50TmFtZSh0YXJnZXQpICsgJyknIDogX29wdGlvbnMkZGlzcGxheU5hbWUsXG4gICAgICAgIF9vcHRpb25zJGNvbXBvbmVudElkID0gb3B0aW9ucy5jb21wb25lbnRJZCxcbiAgICAgICAgY29tcG9uZW50SWQgPSBfb3B0aW9ucyRjb21wb25lbnRJZCA9PT0gdW5kZWZpbmVkID8gZ2VuZXJhdGVJZChvcHRpb25zLmRpc3BsYXlOYW1lLCBvcHRpb25zLnBhcmVudENvbXBvbmVudElkKSA6IF9vcHRpb25zJGNvbXBvbmVudElkLFxuICAgICAgICBfb3B0aW9ucyRQYXJlbnRDb21wb24gPSBvcHRpb25zLlBhcmVudENvbXBvbmVudCxcbiAgICAgICAgUGFyZW50Q29tcG9uZW50ID0gX29wdGlvbnMkUGFyZW50Q29tcG9uID09PSB1bmRlZmluZWQgPyBCYXNlU3R5bGVkQ29tcG9uZW50IDogX29wdGlvbnMkUGFyZW50Q29tcG9uLFxuICAgICAgICBleHRlbmRpbmdSdWxlcyA9IG9wdGlvbnMucnVsZXMsXG4gICAgICAgIGF0dHJzID0gb3B0aW9ucy5hdHRycztcblxuXG4gICAgdmFyIHN0eWxlZENvbXBvbmVudElkID0gb3B0aW9ucy5kaXNwbGF5TmFtZSAmJiBvcHRpb25zLmNvbXBvbmVudElkID8gZXNjYXBlKG9wdGlvbnMuZGlzcGxheU5hbWUpICsgJy0nICsgb3B0aW9ucy5jb21wb25lbnRJZCA6IGNvbXBvbmVudElkO1xuXG4gICAgdmFyIGNvbXBvbmVudFN0eWxlID0gbmV3IENvbXBvbmVudFN0eWxlKGV4dGVuZGluZ1J1bGVzID09PSB1bmRlZmluZWQgPyBydWxlcyA6IGV4dGVuZGluZ1J1bGVzLmNvbmNhdChydWxlcyksIGF0dHJzLCBzdHlsZWRDb21wb25lbnRJZCk7XG5cbiAgICB2YXIgU3R5bGVkQ29tcG9uZW50ID0gZnVuY3Rpb24gKF9QYXJlbnRDb21wb25lbnQpIHtcbiAgICAgIGluaGVyaXRzKFN0eWxlZENvbXBvbmVudCwgX1BhcmVudENvbXBvbmVudCk7XG5cbiAgICAgIGZ1bmN0aW9uIFN0eWxlZENvbXBvbmVudCgpIHtcbiAgICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU3R5bGVkQ29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1BhcmVudENvbXBvbmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgIH1cblxuICAgICAgU3R5bGVkQ29tcG9uZW50LndpdGhDb21wb25lbnQgPSBmdW5jdGlvbiB3aXRoQ29tcG9uZW50KHRhZykge1xuICAgICAgICB2YXIgcHJldmlvdXNDb21wb25lbnRJZCA9IG9wdGlvbnMuY29tcG9uZW50SWQsXG4gICAgICAgICAgICBvcHRpb25zVG9Db3B5ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob3B0aW9ucywgWydjb21wb25lbnRJZCddKTtcblxuXG4gICAgICAgIHZhciBuZXdDb21wb25lbnRJZCA9IHByZXZpb3VzQ29tcG9uZW50SWQgJiYgcHJldmlvdXNDb21wb25lbnRJZCArICctJyArIChpc1RhZyh0YWcpID8gdGFnIDogZXNjYXBlKGdldENvbXBvbmVudE5hbWUodGFnKSkpO1xuXG4gICAgICAgIHZhciBuZXdPcHRpb25zID0gX2V4dGVuZHMoe30sIG9wdGlvbnNUb0NvcHksIHtcbiAgICAgICAgICBjb21wb25lbnRJZDogbmV3Q29tcG9uZW50SWQsXG4gICAgICAgICAgUGFyZW50Q29tcG9uZW50OiBTdHlsZWRDb21wb25lbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZVN0eWxlZENvbXBvbmVudCh0YWcsIG5ld09wdGlvbnMsIHJ1bGVzKTtcbiAgICAgIH07XG5cbiAgICAgIGNyZWF0ZUNsYXNzKFN0eWxlZENvbXBvbmVudCwgbnVsbCwgW3tcbiAgICAgICAga2V5OiAnZXh0ZW5kJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgICAgdmFyIHJ1bGVzRnJvbU9wdGlvbnMgPSBvcHRpb25zLnJ1bGVzLFxuICAgICAgICAgICAgICBwYXJlbnRDb21wb25lbnRJZCA9IG9wdGlvbnMuY29tcG9uZW50SWQsXG4gICAgICAgICAgICAgIG9wdGlvbnNUb0NvcHkgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhvcHRpb25zLCBbJ3J1bGVzJywgJ2NvbXBvbmVudElkJ10pO1xuXG5cbiAgICAgICAgICB2YXIgbmV3UnVsZXMgPSBydWxlc0Zyb21PcHRpb25zID09PSB1bmRlZmluZWQgPyBydWxlcyA6IHJ1bGVzRnJvbU9wdGlvbnMuY29uY2F0KHJ1bGVzKTtcblxuICAgICAgICAgIHZhciBuZXdPcHRpb25zID0gX2V4dGVuZHMoe30sIG9wdGlvbnNUb0NvcHksIHtcbiAgICAgICAgICAgIHJ1bGVzOiBuZXdSdWxlcyxcbiAgICAgICAgICAgIHBhcmVudENvbXBvbmVudElkOiBwYXJlbnRDb21wb25lbnRJZCxcbiAgICAgICAgICAgIFBhcmVudENvbXBvbmVudDogU3R5bGVkQ29tcG9uZW50XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gY29uc3RydWN0V2l0aE9wdGlvbnMoY3JlYXRlU3R5bGVkQ29tcG9uZW50LCB0YXJnZXQsIG5ld09wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XSk7XG4gICAgICByZXR1cm4gU3R5bGVkQ29tcG9uZW50O1xuICAgIH0oUGFyZW50Q29tcG9uZW50KTtcblxuICAgIFN0eWxlZENvbXBvbmVudC5jb250ZXh0VHlwZXMgPSAoX1N0eWxlZENvbXBvbmVudCRjb250ID0ge30sIF9TdHlsZWRDb21wb25lbnQkY29udFtDSEFOTkVMXSA9IFByb3BUeXBlcy5mdW5jLCBfU3R5bGVkQ29tcG9uZW50JGNvbnRbQ0hBTk5FTF9ORVhUXSA9IENPTlRFWFRfQ0hBTk5FTF9TSEFQRSwgX1N0eWxlZENvbXBvbmVudCRjb250W0NPTlRFWFRfS0VZXSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5pbnN0YW5jZU9mKFN0eWxlU2hlZXQpLCBQcm9wVHlwZXMuaW5zdGFuY2VPZihTZXJ2ZXJTdHlsZVNoZWV0KV0pLCBfU3R5bGVkQ29tcG9uZW50JGNvbnQpO1xuICAgIFN0eWxlZENvbXBvbmVudC5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICAgIFN0eWxlZENvbXBvbmVudC5zdHlsZWRDb21wb25lbnRJZCA9IHN0eWxlZENvbXBvbmVudElkO1xuICAgIFN0eWxlZENvbXBvbmVudC5hdHRycyA9IGF0dHJzO1xuICAgIFN0eWxlZENvbXBvbmVudC5jb21wb25lbnRTdHlsZSA9IGNvbXBvbmVudFN0eWxlO1xuICAgIFN0eWxlZENvbXBvbmVudC50YXJnZXQgPSB0YXJnZXQ7XG5cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBTdHlsZWRDb21wb25lbnQud2FyblRvb01hbnlDbGFzc2VzID0gY3JlYXRlV2FyblRvb01hbnlDbGFzc2VzKGRpc3BsYXlOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gU3R5bGVkQ29tcG9uZW50O1xuICB9O1xuXG4gIHJldHVybiBjcmVhdGVTdHlsZWRDb21wb25lbnQ7XG59KTtcblxuLy8gbXVybXVyaGFzaDIgdmlhIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3JheWNtb3JnYW4vNTg4NDIzXG5cbmZ1bmN0aW9uIGRvSGFzaChzdHIsIHNlZWQpIHtcbiAgdmFyIG0gPSAweDViZDFlOTk1O1xuICB2YXIgciA9IDI0O1xuICB2YXIgaCA9IHNlZWQgXiBzdHIubGVuZ3RoO1xuICB2YXIgbGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgdmFyIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgd2hpbGUgKGxlbmd0aCA+PSA0KSB7XG4gICAgdmFyIGsgPSBVSW50MzIoc3RyLCBjdXJyZW50SW5kZXgpO1xuXG4gICAgayA9IFVtdWwzMihrLCBtKTtcbiAgICBrIF49IGsgPj4+IHI7XG4gICAgayA9IFVtdWwzMihrLCBtKTtcblxuICAgIGggPSBVbXVsMzIoaCwgbSk7XG4gICAgaCBePSBrO1xuXG4gICAgY3VycmVudEluZGV4ICs9IDQ7XG4gICAgbGVuZ3RoIC09IDQ7XG4gIH1cblxuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMzpcbiAgICAgIGggXj0gVUludDE2KHN0ciwgY3VycmVudEluZGV4KTtcbiAgICAgIGggXj0gc3RyLmNoYXJDb2RlQXQoY3VycmVudEluZGV4ICsgMikgPDwgMTY7XG4gICAgICBoID0gVW11bDMyKGgsIG0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDI6XG4gICAgICBoIF49IFVJbnQxNihzdHIsIGN1cnJlbnRJbmRleCk7XG4gICAgICBoID0gVW11bDMyKGgsIG0pO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDE6XG4gICAgICBoIF49IHN0ci5jaGFyQ29kZUF0KGN1cnJlbnRJbmRleCk7XG4gICAgICBoID0gVW11bDMyKGgsIG0pO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBoIF49IGggPj4+IDEzO1xuICBoID0gVW11bDMyKGgsIG0pO1xuICBoIF49IGggPj4+IDE1O1xuXG4gIHJldHVybiBoID4+PiAwO1xufVxuXG5mdW5jdGlvbiBVSW50MzIoc3RyLCBwb3MpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQ29kZUF0KHBvcysrKSArIChzdHIuY2hhckNvZGVBdChwb3MrKykgPDwgOCkgKyAoc3RyLmNoYXJDb2RlQXQocG9zKyspIDw8IDE2KSArIChzdHIuY2hhckNvZGVBdChwb3MpIDw8IDI0KTtcbn1cblxuZnVuY3Rpb24gVUludDE2KHN0ciwgcG9zKSB7XG4gIHJldHVybiBzdHIuY2hhckNvZGVBdChwb3MrKykgKyAoc3RyLmNoYXJDb2RlQXQocG9zKyspIDw8IDgpO1xufVxuXG5mdW5jdGlvbiBVbXVsMzIobiwgbSkge1xuICBuID0gbiB8IDA7XG4gIG0gPSBtIHwgMDtcbiAgdmFyIG5sbyA9IG4gJiAweGZmZmY7XG4gIHZhciBuaGkgPSBuID4+PiAxNjtcbiAgdmFyIHJlcyA9IG5sbyAqIG0gKyAoKG5oaSAqIG0gJiAweGZmZmYpIDw8IDE2KSB8IDA7XG4gIHJldHVybiByZXM7XG59XG5cbi8vICAgICAgXG52YXIgaXNTdGF0aWNSdWxlcyA9IGZ1bmN0aW9uIGlzU3RhdGljUnVsZXMocnVsZXMsIGF0dHJzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB2YXIgcnVsZSA9IHJ1bGVzW2ldO1xuXG4gICAgLy8gcmVjdXJzaXZlIGNhc2VcbiAgICBpZiAoQXJyYXkuaXNBcnJheShydWxlKSAmJiAhaXNTdGF0aWNSdWxlcyhydWxlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJ1bGUgPT09ICdmdW5jdGlvbicgJiYgIWlzU3R5bGVkQ29tcG9uZW50KHJ1bGUpKSB7XG4gICAgICAvLyBmdW5jdGlvbnMgYXJlIGFsbG93ZWQgdG8gYmUgc3RhdGljIGlmIHRoZXkncmUganVzdCBiZWluZ1xuICAgICAgLy8gdXNlZCB0byBnZXQgdGhlIGNsYXNzbmFtZSBvZiBhIG5lc3RlZCBzdHlsZWQgY29wbW9uZW50XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKGF0dHJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ3VhcmQtZm9yLWluLCBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAodmFyIGtleSBpbiBhdHRycykge1xuICAgICAgdmFyIHZhbHVlID0gYXR0cnNba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxudmFyIGlzSFJNRW5hYmxlZCA9IHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5ob3QgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxuLypcbiBDb21wb25lbnRTdHlsZSBpcyBhbGwgdGhlIENTUy1zcGVjaWZpYyBzdHVmZiwgbm90XG4gdGhlIFJlYWN0LXNwZWNpZmljIHN0dWZmLlxuICovXG52YXIgX0NvbXBvbmVudFN0eWxlID0gKGZ1bmN0aW9uIChuYW1lR2VuZXJhdG9yLCBmbGF0dGVuLCBzdHJpbmdpZnlSdWxlcykge1xuICB2YXIgQ29tcG9uZW50U3R5bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50U3R5bGUocnVsZXMsIGF0dHJzLCBjb21wb25lbnRJZCkge1xuICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29tcG9uZW50U3R5bGUpO1xuXG4gICAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XG4gICAgICB0aGlzLmlzU3RhdGljID0gIWlzSFJNRW5hYmxlZCAmJiBpc1N0YXRpY1J1bGVzKHJ1bGVzLCBhdHRycyk7XG4gICAgICB0aGlzLmNvbXBvbmVudElkID0gY29tcG9uZW50SWQ7XG4gICAgICBpZiAoIVN0eWxlU2hlZXQuaW5zdGFuY2UuaGFzSW5qZWN0ZWRDb21wb25lbnQodGhpcy5jb21wb25lbnRJZCkpIHtcbiAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICcuJyArIGNvbXBvbmVudElkICsgJyB7fScgOiAnJztcbiAgICAgICAgU3R5bGVTaGVldC5pbnN0YW5jZS5kZWZlcnJlZEluamVjdChjb21wb25lbnRJZCwgdHJ1ZSwgcGxhY2Vob2xkZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogRmxhdHRlbnMgYSBydWxlIHNldCBpbnRvIHZhbGlkIENTU1xuICAgICAqIEhhc2hlcyBpdCwgd3JhcHMgdGhlIHdob2xlIGNodW5rIGluIGEgLmhhc2gxMjM0IHt9XG4gICAgICogUmV0dXJucyB0aGUgaGFzaCB0byBiZSBpbmplY3RlZCBvbiByZW5kZXIoKVxuICAgICAqICovXG5cblxuICAgIENvbXBvbmVudFN0eWxlLnByb3RvdHlwZS5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyA9IGZ1bmN0aW9uIGdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKGV4ZWN1dGlvbkNvbnRleHQsIHN0eWxlU2hlZXQpIHtcbiAgICAgIHZhciBpc1N0YXRpYyA9IHRoaXMuaXNTdGF0aWMsXG4gICAgICAgICAgbGFzdENsYXNzTmFtZSA9IHRoaXMubGFzdENsYXNzTmFtZTtcblxuICAgICAgaWYgKGlzU3RhdGljICYmIGxhc3RDbGFzc05hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGFzdENsYXNzTmFtZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZsYXRDU1MgPSBmbGF0dGVuKHRoaXMucnVsZXMsIGV4ZWN1dGlvbkNvbnRleHQpO1xuICAgICAgdmFyIGhhc2ggPSBkb0hhc2godGhpcy5jb21wb25lbnRJZCArIGZsYXRDU1Muam9pbignJykpO1xuXG4gICAgICB2YXIgZXhpc3RpbmdOYW1lID0gc3R5bGVTaGVldC5nZXROYW1lKGhhc2gpO1xuICAgICAgaWYgKGV4aXN0aW5nTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChzdHlsZVNoZWV0LnN0eWxlc0NhY2hlYWJsZSkge1xuICAgICAgICAgIHRoaXMubGFzdENsYXNzTmFtZSA9IGV4aXN0aW5nTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXhpc3RpbmdOYW1lO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmFtZSA9IG5hbWVHZW5lcmF0b3IoaGFzaCk7XG4gICAgICBpZiAoc3R5bGVTaGVldC5zdHlsZXNDYWNoZWFibGUpIHtcbiAgICAgICAgdGhpcy5sYXN0Q2xhc3NOYW1lID0gZXhpc3RpbmdOYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHN0eWxlU2hlZXQuYWxyZWFkeUluamVjdGVkKGhhc2gsIG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3NzID0gJ1xcbicgKyBzdHJpbmdpZnlSdWxlcyhmbGF0Q1NTLCAnLicgKyBuYW1lKTtcbiAgICAgIC8vIE5PVEU6IHRoaXMgY2FuIG9ubHkgYmUgc2V0IHdoZW4gd2UgaW5qZWN0IHRoZSBjbGFzcy1uYW1lLlxuICAgICAgLy8gRm9yIHNvbWUgcmVhc29uLCBwcmVzdW1hYmx5IGR1ZSB0byBob3cgY3NzIGlzIHN0cmluZ2lmeVJ1bGVzIGJlaGF2ZXMgaW5cbiAgICAgIC8vIGRpZmZlcmVudGx5IGJldHdlZW4gY2xpZW50IGFuZCBzZXJ2ZXIsIHN0eWxlcyBicmVhay5cbiAgICAgIHN0eWxlU2hlZXQuaW5qZWN0KHRoaXMuY29tcG9uZW50SWQsIHRydWUsIGNzcywgaGFzaCwgbmFtZSk7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9O1xuXG4gICAgQ29tcG9uZW50U3R5bGUuZ2VuZXJhdGVOYW1lID0gZnVuY3Rpb24gZ2VuZXJhdGVOYW1lKHN0cikge1xuICAgICAgcmV0dXJuIG5hbWVHZW5lcmF0b3IoZG9IYXNoKHN0cikpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ29tcG9uZW50U3R5bGU7XG4gIH0oKTtcblxuICByZXR1cm4gQ29tcG9uZW50U3R5bGU7XG59KTtcblxuLy8gICAgICBcbi8vIFRoYW5rcyB0byBSZWFjdERPTUZhY3RvcmllcyBmb3IgdGhpcyBoYW5keSBsaXN0IVxuXG52YXIgZG9tRWxlbWVudHMgPSBbJ2EnLCAnYWJicicsICdhZGRyZXNzJywgJ2FyZWEnLCAnYXJ0aWNsZScsICdhc2lkZScsICdhdWRpbycsICdiJywgJ2Jhc2UnLCAnYmRpJywgJ2JkbycsICdiaWcnLCAnYmxvY2txdW90ZScsICdib2R5JywgJ2JyJywgJ2J1dHRvbicsICdjYW52YXMnLCAnY2FwdGlvbicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2RhdGEnLCAnZGF0YWxpc3QnLCAnZGQnLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpYWxvZycsICdkaXYnLCAnZGwnLCAnZHQnLCAnZW0nLCAnZW1iZWQnLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLCAnaScsICdpZnJhbWUnLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdrYmQnLCAna2V5Z2VuJywgJ2xhYmVsJywgJ2xlZ2VuZCcsICdsaScsICdsaW5rJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGEnLCAnbWV0ZXInLCAnbmF2JywgJ25vc2NyaXB0JywgJ29iamVjdCcsICdvbCcsICdvcHRncm91cCcsICdvcHRpb24nLCAnb3V0cHV0JywgJ3AnLCAncGFyYW0nLCAncGljdHVyZScsICdwcmUnLCAncHJvZ3Jlc3MnLCAncScsICdycCcsICdydCcsICdydWJ5JywgJ3MnLCAnc2FtcCcsICdzY3JpcHQnLCAnc2VjdGlvbicsICdzZWxlY3QnLCAnc21hbGwnLCAnc291cmNlJywgJ3NwYW4nLCAnc3Ryb25nJywgJ3N0eWxlJywgJ3N1YicsICdzdW1tYXJ5JywgJ3N1cCcsICd0YWJsZScsICd0Ym9keScsICd0ZCcsICd0ZXh0YXJlYScsICd0Zm9vdCcsICd0aCcsICd0aGVhZCcsICd0aW1lJywgJ3RpdGxlJywgJ3RyJywgJ3RyYWNrJywgJ3UnLCAndWwnLCAndmFyJywgJ3ZpZGVvJywgJ3dicicsXG5cbi8vIFNWR1xuJ2NpcmNsZScsICdjbGlwUGF0aCcsICdkZWZzJywgJ2VsbGlwc2UnLCAnZycsICdpbWFnZScsICdsaW5lJywgJ2xpbmVhckdyYWRpZW50JywgJ21hc2snLCAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsR3JhZGllbnQnLCAncmVjdCcsICdzdG9wJywgJ3N2ZycsICd0ZXh0JywgJ3RzcGFuJ107XG5cbi8vICAgICAgXG5cbnZhciBfc3R5bGVkID0gKGZ1bmN0aW9uIChzdHlsZWRDb21wb25lbnQsIGNvbnN0cnVjdFdpdGhPcHRpb25zKSB7XG4gIHZhciBzdHlsZWQgPSBmdW5jdGlvbiBzdHlsZWQodGFnKSB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdFdpdGhPcHRpb25zKHN0eWxlZENvbXBvbmVudCwgdGFnKTtcbiAgfTtcblxuICAvLyBTaG9ydGhhbmRzIGZvciBhbGwgdmFsaWQgSFRNTCBFbGVtZW50c1xuICBkb21FbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkb21FbGVtZW50KSB7XG4gICAgc3R5bGVkW2RvbUVsZW1lbnRdID0gc3R5bGVkKGRvbUVsZW1lbnQpO1xuICB9KTtcblxuICByZXR1cm4gc3R5bGVkO1xufSk7XG5cbi8vICAgICAgXG52YXIgcmVwbGFjZVdoaXRlc3BhY2UgPSBmdW5jdGlvbiByZXBsYWNlV2hpdGVzcGFjZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHN8XFxcXG4vZywgJycpO1xufTtcblxudmFyIF9rZXlmcmFtZXMgPSAoZnVuY3Rpb24gKG5hbWVHZW5lcmF0b3IsIHN0cmluZ2lmeVJ1bGVzLCBjc3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmdzKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGludGVycG9sYXRpb25zID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgaW50ZXJwb2xhdGlvbnNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBydWxlcyA9IGNzcy5hcHBseSh1bmRlZmluZWQsIFtzdHJpbmdzXS5jb25jYXQoaW50ZXJwb2xhdGlvbnMpKTtcbiAgICB2YXIgaGFzaCA9IGRvSGFzaChyZXBsYWNlV2hpdGVzcGFjZShKU09OLnN0cmluZ2lmeShydWxlcykpKTtcblxuICAgIHZhciBleGlzdGluZ05hbWUgPSBTdHlsZVNoZWV0Lmluc3RhbmNlLmdldE5hbWUoaGFzaCk7XG4gICAgaWYgKGV4aXN0aW5nTmFtZSkgcmV0dXJuIGV4aXN0aW5nTmFtZTtcblxuICAgIHZhciBuYW1lID0gbmFtZUdlbmVyYXRvcihoYXNoKTtcbiAgICBpZiAoU3R5bGVTaGVldC5pbnN0YW5jZS5hbHJlYWR5SW5qZWN0ZWQoaGFzaCwgbmFtZSkpIHJldHVybiBuYW1lO1xuXG4gICAgdmFyIGdlbmVyYXRlZENTUyA9IHN0cmluZ2lmeVJ1bGVzKHJ1bGVzLCBuYW1lLCAnQGtleWZyYW1lcycpO1xuICAgIFN0eWxlU2hlZXQuaW5zdGFuY2UuaW5qZWN0KCdzYy1rZXlmcmFtZXMtJyArIG5hbWUsIHRydWUsIGdlbmVyYXRlZENTUywgaGFzaCwgbmFtZSk7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG59KTtcblxuLy8gICAgICBcbnZhciBfaW5qZWN0R2xvYmFsID0gKGZ1bmN0aW9uIChzdHJpbmdpZnlSdWxlcywgY3NzKSB7XG4gIHZhciBpbmplY3RHbG9iYWwgPSBmdW5jdGlvbiBpbmplY3RHbG9iYWwoc3RyaW5ncykge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBpbnRlcnBvbGF0aW9ucyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGludGVycG9sYXRpb25zW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgcnVsZXMgPSBjc3MuYXBwbHkodW5kZWZpbmVkLCBbc3RyaW5nc10uY29uY2F0KGludGVycG9sYXRpb25zKSk7XG4gICAgdmFyIGhhc2ggPSBkb0hhc2goSlNPTi5zdHJpbmdpZnkocnVsZXMpKTtcblxuICAgIHZhciBjb21wb25lbnRJZCA9ICdzYy1nbG9iYWwtJyArIGhhc2g7XG4gICAgaWYgKFN0eWxlU2hlZXQuaW5zdGFuY2UuaGFzSW5qZWN0ZWRDb21wb25lbnQoY29tcG9uZW50SWQpKSByZXR1cm47XG5cbiAgICBTdHlsZVNoZWV0Lmluc3RhbmNlLmluamVjdChjb21wb25lbnRJZCwgZmFsc2UsIHN0cmluZ2lmeVJ1bGVzKHJ1bGVzKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluamVjdEdsb2JhbDtcbn0pO1xuXG4vLyAgICAgIFxuXG5cbnZhciBfY29uc3RydWN0V2l0aE9wdGlvbnMgPSAoZnVuY3Rpb24gKGNzcykge1xuICB2YXIgY29uc3RydWN0V2l0aE9wdGlvbnMgPSBmdW5jdGlvbiBjb25zdHJ1Y3RXaXRoT3B0aW9ucyhjb21wb25lbnRDb25zdHJ1Y3RvciwgdGFnKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIHRhZyAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHRhZyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gJEZsb3dJbnZhbGlkSW5wdXRUZXN0XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgc3R5bGVkLWNvbXBvbmVudCBmb3IgY29tcG9uZW50OiAnICsgdGFnKTtcbiAgICB9XG5cbiAgICAvKiBUaGlzIGlzIGNhbGxhYmxlIGRpcmVjdGx5IGFzIGEgdGVtcGxhdGUgZnVuY3Rpb24gKi9cbiAgICB2YXIgdGVtcGxhdGVGdW5jdGlvbiA9IGZ1bmN0aW9uIHRlbXBsYXRlRnVuY3Rpb24oc3RyaW5ncykge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGludGVycG9sYXRpb25zID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBpbnRlcnBvbGF0aW9uc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb21wb25lbnRDb25zdHJ1Y3Rvcih0YWcsIG9wdGlvbnMsIGNzcy5hcHBseSh1bmRlZmluZWQsIFtzdHJpbmdzXS5jb25jYXQoaW50ZXJwb2xhdGlvbnMpKSk7XG4gICAgfTtcblxuICAgIC8qIElmIGNvbmZpZyBtZXRob2RzIGFyZSBjYWxsZWQsIHdyYXAgdXAgYSBuZXcgdGVtcGxhdGUgZnVuY3Rpb24gYW5kIG1lcmdlIG9wdGlvbnMgKi9cbiAgICB0ZW1wbGF0ZUZ1bmN0aW9uLndpdGhDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc3RydWN0V2l0aE9wdGlvbnMoY29tcG9uZW50Q29uc3RydWN0b3IsIHRhZywgX2V4dGVuZHMoe30sIG9wdGlvbnMsIGNvbmZpZykpO1xuICAgIH07XG4gICAgdGVtcGxhdGVGdW5jdGlvbi5hdHRycyA9IGZ1bmN0aW9uIChhdHRycykge1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdFdpdGhPcHRpb25zKGNvbXBvbmVudENvbnN0cnVjdG9yLCB0YWcsIF9leHRlbmRzKHt9LCBvcHRpb25zLCB7XG4gICAgICAgIGF0dHJzOiBfZXh0ZW5kcyh7fSwgb3B0aW9ucy5hdHRycyB8fCB7fSwgYXR0cnMpXG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZUZ1bmN0aW9uO1xuICB9O1xuXG4gIHJldHVybiBjb25zdHJ1Y3RXaXRoT3B0aW9ucztcbn0pO1xuXG4vLyAgICAgIFxuLyogZ2xvYmFscyBSZWFjdENsYXNzICovXG5cbnZhciB3cmFwV2l0aFRoZW1lID0gZnVuY3Rpb24gd3JhcFdpdGhUaGVtZShDb21wb25lbnQkJDEpIHtcbiAgdmFyIF9XaXRoVGhlbWUkY29udGV4dFR5cDtcblxuICB2YXIgY29tcG9uZW50TmFtZSA9IENvbXBvbmVudCQkMS5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQkJDEubmFtZSB8fCAnQ29tcG9uZW50JztcblxuICB2YXIgc2hvdWxkU2V0SW5uZXJSZWYgPSBpc1N0eWxlZENvbXBvbmVudChDb21wb25lbnQkJDEpIHx8XG4gIC8vIE5PVEU6IFdlIGNhbid0IHBhc3MgYSByZWYgdG8gYSBzdGF0ZWxlc3MgZnVuY3Rpb25hbCBjb21wb25lbnRcbiAgdHlwZW9mIENvbXBvbmVudCQkMSA9PT0gJ2Z1bmN0aW9uJyAmJiAhKENvbXBvbmVudCQkMS5wcm90b3R5cGUgJiYgJ2lzUmVhY3RDb21wb25lbnQnIGluIENvbXBvbmVudCQkMS5wcm90b3R5cGUpO1xuXG4gIHZhciBXaXRoVGhlbWUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgIGluaGVyaXRzKFdpdGhUaGVtZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBXaXRoVGhlbWUoKSB7XG4gICAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBXaXRoVGhlbWUpO1xuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5zdGF0ZSA9IHt9LCBfdGhpcy51bnN1YnNjcmliZUlkID0gLTEsIF90ZW1wKSwgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gICAgfVxuXG4gICAgLy8gTk9URTogVGhpcyBpcyBzbyB0aGF0IGlzU3R5bGVkQ29tcG9uZW50IHBhc3NlcyBmb3IgdGhlIGlubmVyUmVmIHVud3JhcHBpbmdcblxuXG4gICAgV2l0aFRoZW1lLnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGRlZmF1bHRQcm9wcyA9IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdFByb3BzO1xuXG4gICAgICB2YXIgc3R5bGVkQ29udGV4dCA9IHRoaXMuY29udGV4dFtDSEFOTkVMX05FWFRdO1xuICAgICAgdmFyIHRoZW1lUHJvcCA9IGRldGVybWluZVRoZW1lKHRoaXMucHJvcHMsIHVuZGVmaW5lZCwgZGVmYXVsdFByb3BzKTtcbiAgICAgIGlmIChzdHlsZWRDb250ZXh0ID09PSB1bmRlZmluZWQgJiYgdGhlbWVQcm9wID09PSB1bmRlZmluZWQgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oJ1t3aXRoVGhlbWVdIFlvdSBhcmUgbm90IHVzaW5nIGEgVGhlbWVQcm92aWRlciBub3IgcGFzc2luZyBhIHRoZW1lIHByb3Agb3IgYSB0aGVtZSBpbiBkZWZhdWx0UHJvcHMnKTtcbiAgICAgIH0gZWxzZSBpZiAoc3R5bGVkQ29udGV4dCA9PT0gdW5kZWZpbmVkICYmIHRoZW1lUHJvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0aGVtZTogdGhlbWVQcm9wIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHN1YnNjcmliZSA9IHN0eWxlZENvbnRleHQuc3Vic2NyaWJlO1xuXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVJZCA9IHN1YnNjcmliZShmdW5jdGlvbiAobmV4dFRoZW1lKSB7XG4gICAgICAgICAgdmFyIHRoZW1lID0gZGV0ZXJtaW5lVGhlbWUoX3RoaXMyLnByb3BzLCBuZXh0VGhlbWUsIGRlZmF1bHRQcm9wcyk7XG4gICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHsgdGhlbWU6IHRoZW1lIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgV2l0aFRoZW1lLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcztcblxuICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAob2xkU3RhdGUpIHtcbiAgICAgICAgdmFyIHRoZW1lID0gZGV0ZXJtaW5lVGhlbWUobmV4dFByb3BzLCBvbGRTdGF0ZS50aGVtZSwgZGVmYXVsdFByb3BzKTtcblxuICAgICAgICByZXR1cm4geyB0aGVtZTogdGhlbWUgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBXaXRoVGhlbWUucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZUlkICE9PSAtMSkge1xuICAgICAgICB0aGlzLmNvbnRleHRbQ0hBTk5FTF9ORVhUXS51bnN1YnNjcmliZSh0aGlzLnVuc3Vic2NyaWJlSWQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBXaXRoVGhlbWUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9wcm9wLXR5cGVzXG4gICAgICB2YXIgaW5uZXJSZWYgPSB0aGlzLnByb3BzLmlubmVyUmVmO1xuICAgICAgdmFyIHRoZW1lID0gdGhpcy5zdGF0ZS50aGVtZTtcblxuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQkJDEsIF9leHRlbmRzKHtcbiAgICAgICAgdGhlbWU6IHRoZW1lXG4gICAgICB9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgIGlubmVyUmVmOiBzaG91bGRTZXRJbm5lclJlZiA/IGlubmVyUmVmIDogdW5kZWZpbmVkLFxuICAgICAgICByZWY6IHNob3VsZFNldElubmVyUmVmID8gdW5kZWZpbmVkIDogaW5uZXJSZWZcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFdpdGhUaGVtZTtcbiAgfShSZWFjdC5Db21wb25lbnQpO1xuXG4gIFdpdGhUaGVtZS5kaXNwbGF5TmFtZSA9ICdXaXRoVGhlbWUoJyArIGNvbXBvbmVudE5hbWUgKyAnKSc7XG4gIFdpdGhUaGVtZS5zdHlsZWRDb21wb25lbnRJZCA9ICd3aXRoVGhlbWUnO1xuICBXaXRoVGhlbWUuY29udGV4dFR5cGVzID0gKF9XaXRoVGhlbWUkY29udGV4dFR5cCA9IHt9LCBfV2l0aFRoZW1lJGNvbnRleHRUeXBbQ0hBTk5FTF0gPSBQcm9wVHlwZXMuZnVuYywgX1dpdGhUaGVtZSRjb250ZXh0VHlwW0NIQU5ORUxfTkVYVF0gPSBDT05URVhUX0NIQU5ORUxfU0hBUEUsIF9XaXRoVGhlbWUkY29udGV4dFR5cCk7XG5cblxuICByZXR1cm4gaG9pc3RTdGF0aWNzKFdpdGhUaGVtZSwgQ29tcG9uZW50JCQxKTtcbn07XG5cbi8vICAgICAgXG5cbi8qIEltcG9ydCBzaW5nbGV0b25zICovXG4vKiBJbXBvcnQgc2luZ2xldG9uIGNvbnN0cnVjdG9ycyAqL1xuLyogSW1wb3J0IGNvbXBvbmVudHMgKi9cbi8qIEltcG9ydCBIaWdoZXIgT3JkZXIgQ29tcG9uZW50cyAqL1xuLyogSW5zdGFudGlhdGUgc2luZ2xldG9ucyAqL1xudmFyIENvbXBvbmVudFN0eWxlID0gX0NvbXBvbmVudFN0eWxlKGdlbmVyYXRlQWxwaGFiZXRpY05hbWUsIGZsYXR0ZW4sIHN0cmluZ2lmeVJ1bGVzKTtcbnZhciBjb25zdHJ1Y3RXaXRoT3B0aW9ucyA9IF9jb25zdHJ1Y3RXaXRoT3B0aW9ucyhjc3MpO1xudmFyIFN0eWxlZENvbXBvbmVudCA9IF9TdHlsZWRDb21wb25lbnQoQ29tcG9uZW50U3R5bGUsIGNvbnN0cnVjdFdpdGhPcHRpb25zKTtcblxuLyogSW5zdGFudGlhdGUgZXhwb3J0ZWQgc2luZ2xldG9ucyAqL1xudmFyIGtleWZyYW1lcyA9IF9rZXlmcmFtZXMoZ2VuZXJhdGVBbHBoYWJldGljTmFtZSwgc3RyaW5naWZ5UnVsZXMsIGNzcyk7XG52YXIgaW5qZWN0R2xvYmFsID0gX2luamVjdEdsb2JhbChzdHJpbmdpZnlSdWxlcywgY3NzKTtcbnZhciBzdHlsZWQgPSBfc3R5bGVkKFN0eWxlZENvbXBvbmVudCwgY29uc3RydWN0V2l0aE9wdGlvbnMpO1xuXG5leHBvcnQgeyBjc3MsIGtleWZyYW1lcywgaW5qZWN0R2xvYmFsLCBUaGVtZVByb3ZpZGVyLCB3cmFwV2l0aFRoZW1lIGFzIHdpdGhUaGVtZSwgU2VydmVyU3R5bGVTaGVldCwgU3R5bGVTaGVldE1hbmFnZXIgfTtleHBvcnQgZGVmYXVsdCBzdHlsZWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZWQtY29tcG9uZW50cy9kaXN0L3N0eWxlZC1jb21wb25lbnRzLmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDUiLCJleHBvcnQgY29uc3QgQkFTRV9GT05UX1NJWkUgPSAyNVxuZXhwb3J0IGNvbnN0IEJBU0VfTU9CSUxFX0ZPTlRfU0laRSA9IDIwXG5leHBvcnQgY29uc3QgcmVtID0gc2l6ZSA9PiBgJHtzaXplIC8gQkFTRV9GT05UX1NJWkV9cmVtYFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcmVtLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIvKiFcbiAqIGlzLXBsYWluLW9iamVjdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXMtcGxhaW4tb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE3LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzb2JqZWN0Jyk7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0T2JqZWN0KG8pIHtcbiAgcmV0dXJuIGlzT2JqZWN0KG8pID09PSB0cnVlXG4gICAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG8pIHtcbiAgdmFyIGN0b3IscHJvdDtcblxuICBpZiAoaXNPYmplY3RPYmplY3QobykgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgaGFzIG1vZGlmaWVkIGNvbnN0cnVjdG9yXG4gIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuICBpZiAodHlwZW9mIGN0b3IgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiBoYXMgbW9kaWZpZWQgcHJvdG90eXBlXG4gIHByb3QgPSBjdG9yLnByb3RvdHlwZTtcbiAgaWYgKGlzT2JqZWN0T2JqZWN0KHByb3QpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIGNvbnN0cnVjdG9yIGRvZXMgbm90IGhhdmUgYW4gT2JqZWN0LXNwZWNpZmljIG1ldGhvZFxuICBpZiAocHJvdC5oYXNPd25Qcm9wZXJ0eSgnaXNQcm90b3R5cGVPZicpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIE1vc3QgbGlrZWx5IGEgcGxhaW4gT2JqZWN0XG4gIHJldHVybiB0cnVlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzLXBsYWluLW9iamVjdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSA1IiwiLyohXG4gKiBpc29iamVjdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXNvYmplY3Q+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTcsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkodmFsKSA9PT0gZmFsc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaXNvYmplY3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgNSIsIi8qXG4gKiAgICAgICAgICBfXyAgICAgICAgX19fXG4gKiAgICBfX19fXy8gL19fXyAgX18vIChfKV9fX19cbiAqICAgLyBfX18vIF9fLyAvIC8gLyAvIC8gX19fL1xuICogIChfXyAgKSAvXy8gL18vIC8gLyAoX18gIClcbiAqIC9fX19fL1xcX18vXFxfXywgL18vXy9fX19fL1xuICogICAgICAgICAgL19fX18vXG4gKlxuICogbGlnaHQgLSB3ZWlnaHQgY3NzIHByZXByb2Nlc3NvciBAbGljZW5jZSBNSVRcbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7LyogZXNsaW50LWRpc2FibGUgKi9cblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gKG1vZHVsZVsnZXhwb3J0cyddID0gZmFjdG9yeShudWxsKSkgOlxuXHRcdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSA/IGRlZmluZShmYWN0b3J5KG51bGwpKSA6XG5cdFx0XHQod2luZG93WydzdHlsaXMnXSA9IGZhY3RvcnkobnVsbCkpXG59KC8qKiBAcGFyYW0geyo9fSBvcHRpb25zICovZnVuY3Rpb24gZmFjdG9yeSAob3B0aW9ucykgey8qIGVzbGludC1kaXNhYmxlICovXG5cblx0J3VzZSBzdHJpY3QnXG5cblx0LyoqXG5cdCAqIE5vdGVzXG5cdCAqXG5cdCAqIFRoZSBbJzxtZXRob2QgbmFtZT4nXSBwYXR0ZXJuIGlzIHVzZWQgdG8gc3VwcG9ydCBjbG9zdXJlIGNvbXBpbGVyXG5cdCAqIHRoZSBqc2RvYyBzaWduYXR1cmVzIGFyZSBhbHNvIHVzZWQgdG8gdGhlIHNhbWUgZWZmZWN0XG5cdCAqXG5cdCAqIC0tLS1cblx0ICpcblx0ICogaW50ICsgaW50ICsgaW50ID09PSBuNCBbZmFzdGVyXVxuXHQgKlxuXHQgKiB2c1xuXHQgKlxuXHQgKiBpbnQgPT09IG4xICYmIGludCA9PT0gbjIgJiYgaW50ID09PSBuM1xuXHQgKlxuXHQgKiAtLS0tXG5cdCAqXG5cdCAqIHN3aXRjaCAoaW50KSB7IGNhc2UgaW50cy4uLn0gW2Zhc3Rlcl1cblx0ICpcblx0ICogdnNcblx0ICpcblx0ICogaWYgKGludCA9PSAxICYmIGludCA9PT0gMiAuLi4pXG5cdCAqXG5cdCAqIC0tLS1cblx0ICpcblx0ICogVGhlIChmaXJzdCpuMSArIHNlY29uZCpuMiArIHRoaXJkKm4zKSBmb3JtYXQgdXNlZCBpbiB0aGUgcHJvcGVydHkgcGFyc2VyXG5cdCAqIGlzIGEgc2ltcGxlIHdheSB0byBoYXNoIHRoZSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzXG5cdCAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIGluZGV4IHRoZXkgb2NjdXIgaW5cblx0ICogc2luY2UgYW55IG51bWJlciBvZiAzIGNoYXJhY3RlciBzZXF1ZW5jZXMgY291bGQgcHJvZHVjZSBkdXBsaWNhdGVzLlxuXHQgKlxuXHQgKiBPbiB0aGUgb3RoZXIgaGFuZCBzZXF1ZW5jZXMgdGhhdCBhcmUgZGlyZWN0bHkgdGllZCB0byB0aGUgaW5kZXggb2YgdGhlIGNoYXJhY3RlclxuXHQgKiByZXNvbHZlIGEgZmFyIG1vcmUgYWNjdXJhdGUgbWVhc3VyZSwgaXQncyBhbHNvIGZhc3RlclxuXHQgKiB0byBldmFsdWF0ZSBvbmUgY29uZGl0aW9uIGluIGEgc3dpdGNoIHN0YXRlbWVudFxuXHQgKiB0aGFuIHRocmVlIGluIGFuIGlmIHN0YXRlbWVudCByZWdhcmRsZXNzIG9mIHRoZSBhZGRlZCBtYXRoLlxuXHQgKlxuXHQgKiBUaGlzIGFsbG93cyB0aGUgdmVuZG9yIHByZWZpeGVyIHRvIGJlIGJvdGggc21hbGwgYW5kIGZhc3QuXG5cdCAqL1xuXG5cdHZhciBudWxscHRuID0gL15cXDArL2cgLyogbWF0Y2hlcyBsZWFkaW5nIG51bGwgY2hhcmFjdGVycyAqL1xuXHR2YXIgZm9ybWF0cHRuID0gL1tcXDBcXHJcXGZdL2cgLyogbWF0Y2hlcyBuZXcgbGluZSwgbnVsbCBhbmQgZm9ybWZlZWQgY2hhcmFjdGVycyAqL1xuXHR2YXIgY29sb25wdG4gPSAvOiAqL2cgLyogc3BsaXRzIGFuaW1hdGlvbiBydWxlcyAqL1xuXHR2YXIgY3Vyc29ycHRuID0gL3pvb3xncmEvIC8qIGFzc2VydCBjdXJzb3IgdmFyaWVudCAqL1xuXHR2YXIgdHJhbnNmb3JtcHRuID0gLyhbLDogXSkodHJhbnNmb3JtKS9nIC8qIHZlbmRvciBwcmVmaXggdHJhbnNmb3JtLCBvbGRlciB3ZWJraXQgKi9cblx0dmFyIGFuaW1hdGlvbnB0biA9IC8sK1xccyooPyFbXihdKlspXSkvZyAvKiBzcGxpdHMgbXVsdGlwbGUgc2hvcnRoYW5kIG5vdGF0aW9uIGFuaW1hdGlvbnMgKi9cblx0dmFyIHByb3BlcnRpZXNwdG4gPSAvICtcXHMqKD8hW14oXSpbKV0pL2cgLyogYW5pbWF0aW9uIHByb3BlcnRpZXMgKi9cblx0dmFyIGVsZW1lbnRwdG4gPSAvICpbXFwwXSAqL2cgLyogc2VsZWN0b3IgZWxlbWVudHMgKi9cblx0dmFyIHNlbGVjdG9ycHRuID0gLyxcXHIrPy9nIC8qIHNwbGl0cyBzZWxlY3RvcnMgKi9cblx0dmFyIGFuZHB0biA9IC8oW1xcdFxcclxcbiBdKSpcXGY/Ji9nIC8qIG1hdGNoICYgKi9cblx0dmFyIGVzY2FwZXB0biA9IC86Z2xvYmFsXFwoKCg/OlteXFwoXFwpXFxbXFxdXSp8XFxbLipcXF18XFwoW15cXChcXCldKlxcKSkqKVxcKS9nIC8qIG1hdGNoZXMgOmdsb2JhbCguKikgKi9cblx0dmFyIGludmFsaWRwdG4gPSAvXFxXKy9nIC8qIHJlbW92ZXMgaW52YWxpZCBjaGFyYWN0ZXJzIGZyb20ga2V5ZnJhbWVzICovXG5cdHZhciBrZXlmcmFtZXB0biA9IC9AKGtcXHcrKVxccyooXFxTKilcXHMqLyAvKiBtYXRjaGVzIEBrZXlmcmFtZXMgJDEgKi9cblx0dmFyIHBsY2hvbGRycHRuID0gLzo6KHBsYWNlKS9nIC8qIG1hdGNoIDo6cGxhY2Vob2xkZXIgdmFyaWVudCAqL1xuXHR2YXIgcmVhZG9ubHlwdG4gPSAvOihyZWFkLW9ubHkpL2cgLyogbWF0Y2ggOnJlYWQtb25seSB2YXJpZW50ICovXG5cdHZhciBiZWZvcmVwdG4gPSAvXFxzKyg/PVt7XFxdOz06Pl0pL2cgLyogbWF0Y2hlcyBcXHMgYmVmb3JlIF0gOyA9IDogKi9cblx0dmFyIGFmdGVycHRuID0gLyhbW309Oj5dKVxccysvZyAvKiBtYXRjaGVzIFxccyBhZnRlciBjaGFyYWN0ZXJzIFsgfSA9IDogKi9cblx0dmFyIHRhaWxwdG4gPSAvKFxce1tee10rPyk7KD89XFx9KS9nIC8qIG1hdGNoZXMgdGFpbCBzZW1pLWNvbG9ucyA7fSAqL1xuXHR2YXIgd2hpdGVwdG4gPSAvXFxzezIsfS9nIC8qIG1hdGNoZXMgcmVwZWF0aW5nIHdoaXRlc3BhY2UgKi9cblx0dmFyIHBzZXVkb3B0biA9IC8oW15cXChdKSg6KykgKi9nIC8qIHBzZXVkbyBlbGVtZW50ICovXG5cdHZhciB3cml0aW5ncHRuID0gL1tzdmhdXFx3Ky1bdGJscl17Mn0vIC8qIG1hdGNoIHdyaXRpbmcgbW9kZSBwcm9wZXJ0eSB2YWx1ZXMgKi9cblx0dmFyIGdyYWRpZW50cHRuID0gLyhbXFx3LV0rdFxcKCkvZyAvKiBtYXRjaCAqZ3JhZGllbnQgcHJvcGVydHkgKi9cblx0dmFyIHN1cHBvcnRzcHRuID0gL1xcKFxccyooLiopXFxzKlxcKS9nIC8qIG1hdGNoIHN1cHBvcnRzIChncm91cHMpICovXG5cdHZhciBwcm9wZXJ0eXB0biA9IC8oW15dKj8pOy9nIC8qIG1hdGNoIHByb3BlcnRpZXMgbGVhZGluZyBzZW1pY29sb24gKi9cblx0dmFyIHNlbGZwdG4gPSAvLXNlbGZ8ZmxleC0vZyAvKiBtYXRjaCBmbGV4LSBhbmQgLXNlbGYgaW4gYWxpZ24tc2VsZjogZmxleC0qOyAqL1xuXHR2YXIgcHNldWRvZm10ID0gL1teXSo/KDpbcnBdW2VsXWFbXFx3LV0rKVteXSovIC8qIGV4dHJhdHMgOnJlYWRvbmx5IG9yIDpwbGFjaG9sZGVyIGZyb20gc2VsZWN0b3IgKi9cblx0dmFyIHRyaW1wdG4gPSAvWyBcXHRdKyQvIC8qIG1hdGNoIHRhaWwgd2hpdHNwYWNlICovXG5cblx0LyogdmVuZG9ycyAqL1xuXHR2YXIgd2Via2l0ID0gJy13ZWJraXQtJ1xuXHR2YXIgbW96ID0gJy1tb3otJ1xuXHR2YXIgbXMgPSAnLW1zLSdcblxuXHQvKiBjaGFyYWN0ZXIgY29kZXMgKi9cblx0dmFyIFNFTUlDT0xPTiA9IDU5IC8qIDsgKi9cblx0dmFyIENMT1NFQlJBQ0VTID0gMTI1IC8qIH0gKi9cblx0dmFyIE9QRU5CUkFDRVMgPSAxMjMgLyogeyAqL1xuXHR2YXIgT1BFTlBBUkVOVEhFU0VTID0gNDAgLyogKCAqL1xuXHR2YXIgQ0xPU0VQQVJFTlRIRVNFUyA9IDQxIC8qICkgKi9cblx0dmFyIE9QRU5CUkFDS0VUID0gOTEgLyogWyAqL1xuXHR2YXIgQ0xPU0VCUkFDS0VUID0gOTMgLyogXSAqL1xuXHR2YXIgTkVXTElORSA9IDEwIC8qIFxcbiAqL1xuXHR2YXIgQ0FSUklBR0UgPSAxMyAvKiBcXHIgKi9cblx0dmFyIFRBQiA9IDkgLyogXFx0ICovXG5cdHZhciBBVCA9IDY0IC8qIEAgKi9cblx0dmFyIFNQQUNFID0gMzIgLyogICAqL1xuXHR2YXIgQU5EID0gMzggLyogJiAqL1xuXHR2YXIgREFTSCA9IDQ1IC8qIC0gKi9cblx0dmFyIFVOREVSU0NPUkUgPSA5NSAvKiBfICovXG5cdHZhciBTVEFSID0gNDIgLyogKiAqL1xuXHR2YXIgQ09NTUEgPSA0NCAvKiAsICovXG5cdHZhciBDT0xPTiA9IDU4IC8qIDogKi9cblx0dmFyIFNJTkdMRVFVT1RFID0gMzkgLyogJyAqL1xuXHR2YXIgRE9VQkxFUVVPVEUgPSAzNCAvKiBcIiAqL1xuXHR2YXIgRk9XQVJEU0xBU0ggPSA0NyAvKiAvICovXG5cdHZhciBHUkVBVEVSVEhBTiA9IDYyIC8qID4gKi9cblx0dmFyIFBMVVMgPSA0MyAvKiArICovXG5cdHZhciBUSUxERSA9IDEyNiAvKiB+ICovXG5cdHZhciBOVUxMID0gMCAvKiBcXDAgKi9cblx0dmFyIEZPUk1GRUVEID0gMTIgLyogXFxmICovXG5cdHZhciBWRVJUSUNBTFRBQiA9IDExIC8qIFxcdiAqL1xuXG5cdC8qIHNwZWNpYWwgaWRlbnRpZmllcnMgKi9cblx0dmFyIEtFWUZSQU1FID0gMTA3IC8qIGsgKi9cblx0dmFyIE1FRElBID0gMTA5IC8qIG0gKi9cblx0dmFyIFNVUFBPUlRTID0gMTE1IC8qIHMgKi9cblx0dmFyIFBMQUNFSE9MREVSID0gMTEyIC8qIHAgKi9cblx0dmFyIFJFQURPTkxZID0gMTExIC8qIG8gKi9cblx0dmFyIElNUE9SVCA9IDE2OSAvKiA8YXQ+aSAqL1xuXHR2YXIgQ0hBUlNFVCA9IDE2MyAvKiA8YXQ+YyAqL1xuXHR2YXIgRE9DVU1FTlQgPSAxMDAgLyogPGF0PmQgKi9cblx0dmFyIFBBR0UgPSAxMTIgLyogPGF0PnAgKi9cblxuXHR2YXIgY29sdW1uID0gMSAvKiBjdXJyZW50IGNvbHVtbiAqL1xuXHR2YXIgbGluZSA9IDEgLyogY3VycmVudCBsaW5lIG51bWViciAqL1xuXHR2YXIgcGF0dGVybiA9IDAgLyogOnBhdHRlcm4gKi9cblxuXHR2YXIgY2FzY2FkZSA9IDEgLyogI2lkIGgxIGgyIHZzIGgxI2lkIGgyI2lkICAqL1xuXHR2YXIgcHJlZml4ID0gMSAvKiB2ZW5kb3IgcHJlZml4ICovXG5cdHZhciBlc2NhcGUgPSAxIC8qIGVzY2FwZSA6Z2xvYmFsKCkgcGF0dGVybiAqL1xuXHR2YXIgY29tcHJlc3MgPSAwIC8qIGNvbXByZXNzIG91dHB1dCAqL1xuXHR2YXIgc2VtaWNvbG9uID0gMCAvKiBuby9zZW1pY29sb24gb3B0aW9uICovXG5cdHZhciBwcmVzZXJ2ZSA9IDAgLyogcHJlc2VydmUgZW1wdHkgc2VsZWN0b3JzICovXG5cblx0LyogZW1wdHkgcmVmZXJlbmNlICovXG5cdHZhciBhcnJheSA9IFtdXG5cblx0LyogcGx1Z2lucyAqL1xuXHR2YXIgcGx1Z2lucyA9IFtdXG5cdHZhciBwbHVnZ2VkID0gMFxuXHR2YXIgc2hvdWxkID0gbnVsbFxuXG5cdC8qIHBsdWdpbiBjb250ZXh0ICovXG5cdHZhciBQT1NUUyA9IC0yXG5cdHZhciBQUkVQUyA9IC0xXG5cdHZhciBVTktXTiA9IDBcblx0dmFyIFBST1BTID0gMVxuXHR2YXIgQkxDS1MgPSAyXG5cdHZhciBBVFJVTCA9IDNcblxuXHQvKiBwbHVnaW4gbmV3bGluZSBjb250ZXh0ICovXG5cdHZhciB1bmt3biA9IDBcblxuXHQvKiBrZXlmcmFtZSBhbmltYXRpb24gKi9cblx0dmFyIGtleWVkID0gMVxuXHR2YXIga2V5ID0gJydcblxuXHQvKiBzZWxlY3RvciBuYW1lc3BhY2UgKi9cblx0dmFyIG5zY29wZWFsdCA9ICcnXG5cdHZhciBuc2NvcGUgPSAnJ1xuXG5cdC8qKlxuXHQgKiBDb21waWxlXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gcGFyZW50XG5cdCAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gY3VycmVudFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxuXHQgKiBAcGFyYW0ge251bWJlcn0gaWRcblx0ICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIGNvbXBpbGUgKHBhcmVudCwgY3VycmVudCwgYm9keSwgaWQsIGRlcHRoKSB7XG5cdFx0dmFyIGJyYWNrZXQgPSAwIC8qIGJyYWNrZXRzIFtdICovXG5cdFx0dmFyIGNvbW1lbnQgPSAwIC8qIGNvbW1lbnRzIC8qIC8vIG9yIC8qICovXG5cdFx0dmFyIHBhcmVudGhlc2VzID0gMCAvKiBmdW5jdGlvbnMgKCkgKi9cblx0XHR2YXIgcXVvdGUgPSAwIC8qIHF1b3RlcyAnJywgXCJcIiAqL1xuXG5cdFx0dmFyIGZpcnN0ID0gMCAvKiBmaXJzdCBjaGFyYWN0ZXIgY29kZSAqL1xuXHRcdHZhciBzZWNvbmQgPSAwIC8qIHNlY29uZCBjaGFyYWN0ZXIgY29kZSAqL1xuXHRcdHZhciBjb2RlID0gMCAvKiBjdXJyZW50IGNoYXJhY3RlciBjb2RlICovXG5cdFx0dmFyIHRhaWwgPSAwIC8qIHByZXZpb3VzIGNoYXJhY3RlciBjb2RlICovXG5cdFx0dmFyIHRyYWlsID0gMCAvKiBjaGFyYWN0ZXIgYmVmb3JlIHByZXZpb3VzIGNvZGUgKi9cblx0XHR2YXIgcGVhayA9IDAgLyogcHJldmlvdXMgbm9uLXdoaXRlc3BhY2UgY29kZSAqL1xuXG5cdFx0dmFyIGNvdW50ZXIgPSAwIC8qIGNvdW50IHNlcXVlbmNlIHRlcm1pbmF0aW9uICovXG5cdFx0dmFyIGNvbnRleHQgPSAwIC8qIHRyYWNrIGN1cnJlbnQgY29udGV4dCAqL1xuXHRcdHZhciBhdHJ1bGUgPSAwIC8qIHRyYWNrIEBhdC1ydWxlIGNvbnRleHQgKi9cblx0XHR2YXIgcHNldWRvID0gMCAvKiB0cmFjayBwc2V1ZG8gdG9rZW4gaW5kZXggKi9cblx0XHR2YXIgY2FyZXQgPSAwIC8qIGN1cnJlbnQgY2hhcmFjdGVyIGluZGV4ICovXG5cdFx0dmFyIGZvcm1hdCA9IDAgLyogY29udHJvbCBjaGFyYWN0ZXIgZm9ybWF0aW5nIGNvbnRleHQgKi9cblx0XHR2YXIgaW5zZXJ0ID0gMCAvKiBhdXRvIHNlbWljb2xvbiBpbnNlcnRpb24gKi9cblx0XHR2YXIgaW52ZXJ0ID0gMCAvKiBpbnZlcnRlZCBzZWxlY3RvciBwYXR0ZXJuICovXG5cdFx0dmFyIGxlbmd0aCA9IDAgLyogZ2VuZXJpYyBsZW5ndGggYWRkcmVzcyAqL1xuXHRcdHZhciBlb2YgPSBib2R5Lmxlbmd0aCAvKiBlbmQgb2YgZmlsZShsZW5ndGgpICovXG5cdFx0dmFyIGVvbCA9IGVvZiAtIDEgLyogZW5kIG9mIGZpbGUoY2hhcmFjdGVycykgKi9cblxuXHRcdHZhciBjaGFyID0gJycgLyogY3VycmVudCBjaGFyYWN0ZXIgKi9cblx0XHR2YXIgY2hhcnMgPSAnJyAvKiBjdXJyZW50IGJ1ZmZlciBvZiBjaGFyYWN0ZXJzICovXG5cdFx0dmFyIGNoaWxkID0gJycgLyogbmV4dCBidWZmZXIgb2YgY2hhcmFjdGVycyAqL1xuXHRcdHZhciBvdXQgPSAnJyAvKiBjb21waWxlZCBib2R5ICovXG5cdFx0dmFyIGNoaWxkcmVuID0gJycgLyogY29tcGlsZWQgY2hpbGRyZW4gKi9cblx0XHR2YXIgZmxhdCA9ICcnIC8qIGNvbXBpbGVkIGxlYWZzICovXG5cdFx0dmFyIHNlbGVjdG9yIC8qIGdlbmVyaWMgc2VsZWN0b3IgYWRkcmVzcyAqL1xuXHRcdHZhciByZXN1bHQgLyogZ2VuZXJpYyBhZGRyZXNzICovXG5cblx0XHQvLyAuLi5idWlsZCBib2R5XG5cdFx0d2hpbGUgKGNhcmV0IDwgZW9mKSB7XG5cdFx0XHRjb2RlID0gYm9keS5jaGFyQ29kZUF0KGNhcmV0KVxuXG5cdFx0XHQvLyBlb2YgdmFyaWVudFxuXHRcdFx0aWYgKGNhcmV0ID09PSBlb2wpIHtcblx0XHRcdFx0Ly8gbGFzdCBjaGFyYWN0ZXIgKyBub29wIGNvbnRleHQsIGFkZCBzeW50aGV0aWMgcGFkZGluZyBmb3Igbm9vcCBjb250ZXh0IHRvIHRlcm1pbmF0ZVxuXHRcdFx0XHRpZiAoY29tbWVudCArIHF1b3RlICsgcGFyZW50aGVzZXMgKyBicmFja2V0ICE9PSAwKSB7XG5cdFx0XHRcdFx0aWYgKGNvbW1lbnQgIT09IDApIHtcblx0XHRcdFx0XHRcdGNvZGUgPSBjb21tZW50ID09PSBGT1dBUkRTTEFTSCA/IE5FV0xJTkUgOiBGT1dBUkRTTEFTSFxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHF1b3RlID0gcGFyZW50aGVzZXMgPSBicmFja2V0ID0gMFxuXHRcdFx0XHRcdGVvZisrXG5cdFx0XHRcdFx0ZW9sKytcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY29tbWVudCArIHF1b3RlICsgcGFyZW50aGVzZXMgKyBicmFja2V0ID09PSAwKSB7XG5cdFx0XHRcdC8vIGVvZiB2YXJpZW50XG5cdFx0XHRcdGlmIChjYXJldCA9PT0gZW9sKSB7XG5cdFx0XHRcdFx0aWYgKGZvcm1hdCA+IDApIHtcblx0XHRcdFx0XHRcdGNoYXJzID0gY2hhcnMucmVwbGFjZShmb3JtYXRwdG4sICcnKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChjaGFycy50cmltKCkubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChjb2RlKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgU1BBQ0U6XG5cdFx0XHRcdFx0XHRcdGNhc2UgVEFCOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFNFTUlDT0xPTjpcblx0XHRcdFx0XHRcdFx0Y2FzZSBDQVJSSUFHRTpcblx0XHRcdFx0XHRcdFx0Y2FzZSBORVdMSU5FOiB7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2hhcnMgKz0gYm9keS5jaGFyQXQoY2FyZXQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y29kZSA9IFNFTUlDT0xPTlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGF1dG8gc2VtaWNvbG9uIGluc2VydGlvblxuXHRcdFx0XHRpZiAoaW5zZXJ0ID09PSAxKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChjb2RlKSB7XG5cdFx0XHRcdFx0XHQvLyBmYWxzZSBmbGFnc1xuXHRcdFx0XHRcdFx0Y2FzZSBPUEVOQlJBQ0VTOlxuXHRcdFx0XHRcdFx0Y2FzZSBDTE9TRUJSQUNFUzpcblx0XHRcdFx0XHRcdGNhc2UgU0VNSUNPTE9OOlxuXHRcdFx0XHRcdFx0Y2FzZSBET1VCTEVRVU9URTpcblx0XHRcdFx0XHRcdGNhc2UgU0lOR0xFUVVPVEU6XG5cdFx0XHRcdFx0XHRjYXNlIE9QRU5QQVJFTlRIRVNFUzpcblx0XHRcdFx0XHRcdGNhc2UgQ0xPU0VQQVJFTlRIRVNFUzpcblx0XHRcdFx0XHRcdGNhc2UgQ09NTUE6IHtcblx0XHRcdFx0XHRcdFx0aW5zZXJ0ID0gMFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gaWdub3JlXG5cdFx0XHRcdFx0XHRjYXNlIFRBQjpcblx0XHRcdFx0XHRcdGNhc2UgQ0FSUklBR0U6XG5cdFx0XHRcdFx0XHRjYXNlIE5FV0xJTkU6XG5cdFx0XHRcdFx0XHRjYXNlIFNQQUNFOiB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyB2YWxpZFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRpbnNlcnQgPSAwXG5cdFx0XHRcdFx0XHRcdGxlbmd0aCA9IGNhcmV0XG5cdFx0XHRcdFx0XHRcdGZpcnN0ID0gY29kZVxuXHRcdFx0XHRcdFx0XHRjYXJldC0tXG5cdFx0XHRcdFx0XHRcdGNvZGUgPSBTRU1JQ09MT05cblxuXHRcdFx0XHRcdFx0XHR3aGlsZSAobGVuZ3RoIDwgZW9mKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChib2R5LmNoYXJDb2RlQXQoKytsZW5ndGgpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIE5FV0xJTkU6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIENBUlJJQUdFOlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBTRU1JQ09MT046IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FyZXQrK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb2RlID0gZmlyc3Rcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ09MT046XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIE9QRU5CUkFDRVM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGVuZ3RoID0gZW9mXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gdG9rZW4gdmFyaWVudFxuXHRcdFx0XHRzd2l0Y2ggKGNvZGUpIHtcblx0XHRcdFx0XHRjYXNlIE9QRU5CUkFDRVM6IHtcblx0XHRcdFx0XHRcdGNoYXJzID0gY2hhcnMudHJpbSgpXG5cdFx0XHRcdFx0XHRmaXJzdCA9IGNoYXJzLmNoYXJDb2RlQXQoMClcblx0XHRcdFx0XHRcdGNvdW50ZXIgPSAxXG5cdFx0XHRcdFx0XHRsZW5ndGggPSArK2NhcmV0XG5cblx0XHRcdFx0XHRcdHdoaWxlIChjYXJldCA8IGVvZikge1xuXHRcdFx0XHRcdFx0XHRjb2RlID0gYm9keS5jaGFyQ29kZUF0KGNhcmV0KVxuXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoY29kZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgT1BFTkJSQUNFUzoge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y291bnRlcisrXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRjYXNlIENMT1NFQlJBQ0VTOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb3VudGVyLS1cblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGNvdW50ZXIgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y2FyZXQrK1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjaGlsZCA9IGJvZHkuc3Vic3RyaW5nKGxlbmd0aCwgY2FyZXQpXG5cblx0XHRcdFx0XHRcdGlmIChmaXJzdCA9PT0gTlVMTCkge1xuXHRcdFx0XHRcdFx0XHRmaXJzdCA9IChjaGFycyA9IGNoYXJzLnJlcGxhY2UobnVsbHB0biwgJycpLnRyaW0oKSkuY2hhckNvZGVBdCgwKVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzd2l0Y2ggKGZpcnN0KSB7XG5cdFx0XHRcdFx0XHRcdC8vIEBhdC1ydWxlXG5cdFx0XHRcdFx0XHRcdGNhc2UgQVQ6IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZm9ybWF0ID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhcnMgPSBjaGFycy5yZXBsYWNlKGZvcm1hdHB0biwgJycpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0c2Vjb25kID0gY2hhcnMuY2hhckNvZGVBdCgxKVxuXG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChzZWNvbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgRE9DVU1FTlQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIE1FRElBOlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBTVVBQT1JUUzpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgREFTSDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RvciA9IGN1cnJlbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0b3IgPSBhcnJheVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gY29tcGlsZShjdXJyZW50LCBzZWxlY3RvciwgY2hpbGQsIHNlY29uZCwgZGVwdGgrMSlcblx0XHRcdFx0XHRcdFx0XHRsZW5ndGggPSBjaGlsZC5sZW5ndGhcblxuXHRcdFx0XHRcdFx0XHRcdC8vIHByZXNlcnZlIGVtcHR5IEBhdC1ydWxlXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHByZXNlcnZlID4gMCAmJiBsZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxlbmd0aCA9IGNoYXJzLmxlbmd0aFxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdC8vIGV4ZWN1dGUgcGx1Z2lucywgQGF0LXJ1bGUgY29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdGlmIChwbHVnZ2VkID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0b3IgPSBzZWxlY3QoYXJyYXksIGNoYXJzLCBpbnZlcnQpXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBwcm94eShBVFJVTCwgY2hpbGQsIHNlbGVjdG9yLCBjdXJyZW50LCBsaW5lLCBjb2x1bW4sIGxlbmd0aCwgc2Vjb25kLCBkZXB0aClcblx0XHRcdFx0XHRcdFx0XHRcdGNoYXJzID0gc2VsZWN0b3Iuam9pbignJylcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdCAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgobGVuZ3RoID0gKGNoaWxkID0gcmVzdWx0LnRyaW0oKSkubGVuZ3RoKSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlY29uZCA9IDBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGlsZCA9ICcnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAobGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChzZWNvbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBTVVBQT1JUUzoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoYXJzID0gY2hhcnMucmVwbGFjZShzdXBwb3J0c3B0biwgc3VwcG9ydHMpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBET0NVTUVOVDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBNRURJQTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBEQVNIOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hpbGQgPSBjaGFycyArICd7JyArIGNoaWxkICsgJ30nXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIEtFWUZSQU1FOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhcnMgPSBjaGFycy5yZXBsYWNlKGtleWZyYW1lcHRuLCAnJDEgJDInICsgKGtleWVkID4gMCA/IGtleSA6ICcnKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGlsZCA9IGNoYXJzICsgJ3snICsgY2hpbGQgKyAnfSdcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChwcmVmaXggPT09IDEgfHwgKHByZWZpeCA9PT0gMiAmJiB2ZW5kb3IoJ0AnK2NoaWxkLCAzKSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gJ0AnICsgd2Via2l0ICsgY2hpbGQgKyAnQCcgKyBjaGlsZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGlsZCA9ICdAJyArIGNoaWxkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gY2hhcnMgKyBjaGlsZFxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlkID09PSBQQUdFKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGlsZCA9IChvdXQgKz0gY2hpbGQsICcnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjaGlsZCA9ICcnXG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQvLyBzZWxlY3RvclxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQgPSBjb21waWxlKGN1cnJlbnQsIHNlbGVjdChjdXJyZW50LCBjaGFycywgaW52ZXJ0KSwgY2hpbGQsIGlkLCBkZXB0aCsxKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNoaWxkcmVuICs9IGNoaWxkXG5cblx0XHRcdFx0XHRcdC8vIHJlc2V0XG5cdFx0XHRcdFx0XHRjb250ZXh0ID0gMFxuXHRcdFx0XHRcdFx0aW5zZXJ0ID0gMFxuXHRcdFx0XHRcdFx0cHNldWRvID0gMFxuXHRcdFx0XHRcdFx0Zm9ybWF0ID0gMFxuXHRcdFx0XHRcdFx0aW52ZXJ0ID0gMFxuXHRcdFx0XHRcdFx0YXRydWxlID0gMFxuXHRcdFx0XHRcdFx0Y2hhcnMgPSAnJ1xuXHRcdFx0XHRcdFx0Y2hpbGQgPSAnJ1xuXHRcdFx0XHRcdFx0Y29kZSA9IGJvZHkuY2hhckNvZGVBdCgrK2NhcmV0KVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FzZSBDTE9TRUJSQUNFUzpcblx0XHRcdFx0XHRjYXNlIFNFTUlDT0xPTjoge1xuXHRcdFx0XHRcdFx0Y2hhcnMgPSAoZm9ybWF0ID4gMCA/IGNoYXJzLnJlcGxhY2UoZm9ybWF0cHRuLCAnJykgOiBjaGFycykudHJpbSgpXG5cblx0XHRcdFx0XHRcdGlmICgobGVuZ3RoID0gY2hhcnMubGVuZ3RoKSA+IDEpIHtcblx0XHRcdFx0XHRcdFx0Ly8gbW9ua2V5LXBhdGNoIG1pc3NpbmcgY29sb25cblx0XHRcdFx0XHRcdFx0aWYgKHBzZXVkbyA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGZpcnN0ID0gY2hhcnMuY2hhckNvZGVBdCgwKVxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZmlyc3QgY2hhcmFjdGVyIGlzIGEgbGV0dGVyIG9yIGRhc2gsIGJ1ZmZlciBoYXMgYSBzcGFjZSBjaGFyYWN0ZXJcblx0XHRcdFx0XHRcdFx0XHRpZiAoKGZpcnN0ID09PSBEQVNIIHx8IGZpcnN0ID4gOTYgJiYgZmlyc3QgPCAxMjMpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZW5ndGggPSAoY2hhcnMgPSBjaGFycy5yZXBsYWNlKCcgJywgJzonKSkubGVuZ3RoXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gZXhlY3V0ZSBwbHVnaW5zLCBwcm9wZXJ0eSBjb250ZXh0XG5cdFx0XHRcdFx0XHRcdGlmIChwbHVnZ2VkID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICgocmVzdWx0ID0gcHJveHkoUFJPUFMsIGNoYXJzLCBjdXJyZW50LCBwYXJlbnQsIGxpbmUsIGNvbHVtbiwgb3V0Lmxlbmd0aCwgaWQsIGRlcHRoKSkgIT09IHZvaWQgMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKChsZW5ndGggPSAoY2hhcnMgPSByZXN1bHQudHJpbSgpKS5sZW5ndGgpID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYXJzID0gJ1xcMFxcMCdcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRmaXJzdCA9IGNoYXJzLmNoYXJDb2RlQXQoMClcblx0XHRcdFx0XHRcdFx0c2Vjb25kID0gY2hhcnMuY2hhckNvZGVBdCgxKVxuXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoZmlyc3QgKyBzZWNvbmQpIHtcblx0XHRcdFx0XHRcdFx0XHRjYXNlIE5VTEw6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgSU1QT1JUOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0hBUlNFVDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmxhdCArPSBjaGFycyArIGJvZHkuY2hhckF0KGNhcmV0KVxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNoYXJzLmNoYXJDb2RlQXQobGVuZ3RoLTEpID09PSBDT0xPTilcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRcdFx0XHRcdFx0b3V0ICs9IHByb3BlcnR5KGNoYXJzLCBmaXJzdCwgc2Vjb25kLCBjaGFycy5jaGFyQ29kZUF0KDIpKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyByZXNldFxuXHRcdFx0XHRcdFx0Y29udGV4dCA9IDBcblx0XHRcdFx0XHRcdGluc2VydCA9IDBcblx0XHRcdFx0XHRcdHBzZXVkbyA9IDBcblx0XHRcdFx0XHRcdGZvcm1hdCA9IDBcblx0XHRcdFx0XHRcdGludmVydCA9IDBcblx0XHRcdFx0XHRcdGNoYXJzID0gJydcblx0XHRcdFx0XHRcdGNvZGUgPSBib2R5LmNoYXJDb2RlQXQoKytjYXJldClcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHBhcnNlIGNoYXJhY3RlcnNcblx0XHRcdHN3aXRjaCAoY29kZSkge1xuXHRcdFx0XHRjYXNlIENBUlJJQUdFOlxuXHRcdFx0XHRjYXNlIE5FV0xJTkU6IHtcblx0XHRcdFx0XHQvLyBhdXRvIGluc2VydCBzZW1pY29sb25cblx0XHRcdFx0XHRpZiAoY29tbWVudCArIHF1b3RlICsgcGFyZW50aGVzZXMgKyBicmFja2V0ICsgc2VtaWNvbG9uID09PSAwKSB7XG5cdFx0XHRcdFx0XHQvLyB2YWxpZCBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHRoYXRcblx0XHRcdFx0XHRcdC8vIG1heSBwcmVjZWRlIGEgbmV3bGluZVxuXHRcdFx0XHRcdFx0c3dpdGNoIChwZWFrKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgQ0xPU0VQQVJFTlRIRVNFUzpcblx0XHRcdFx0XHRcdFx0Y2FzZSBTSU5HTEVRVU9URTpcblx0XHRcdFx0XHRcdFx0Y2FzZSBET1VCTEVRVU9URTpcblx0XHRcdFx0XHRcdFx0Y2FzZSBBVDpcblx0XHRcdFx0XHRcdFx0Y2FzZSBUSUxERTpcblx0XHRcdFx0XHRcdFx0Y2FzZSBHUkVBVEVSVEhBTjpcblx0XHRcdFx0XHRcdFx0Y2FzZSBTVEFSOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFBMVVM6XG5cdFx0XHRcdFx0XHRcdGNhc2UgRk9XQVJEU0xBU0g6XG5cdFx0XHRcdFx0XHRcdGNhc2UgREFTSDpcblx0XHRcdFx0XHRcdFx0Y2FzZSBDT0xPTjpcblx0XHRcdFx0XHRcdFx0Y2FzZSBDT01NQTpcblx0XHRcdFx0XHRcdFx0Y2FzZSBTRU1JQ09MT046XG5cdFx0XHRcdFx0XHRcdGNhc2UgT1BFTkJSQUNFUzpcblx0XHRcdFx0XHRcdFx0Y2FzZSBDTE9TRUJSQUNFUzoge1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGN1cnJlbnQgYnVmZmVyIGhhcyBhIGNvbG9uXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHBzZXVkbyA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGluc2VydCA9IDFcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyB0ZXJtaW5hdGUgbGluZSBjb21tZW50XG5cdFx0XHRcdFx0aWYgKGNvbW1lbnQgPT09IEZPV0FSRFNMQVNIKSB7XG5cdFx0XHRcdFx0XHRjb21tZW50ID0gMFxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoY2FzY2FkZSArIGNvbnRleHQgPT09IDApIHtcblx0XHRcdFx0XHRcdGZvcm1hdCA9IDFcblx0XHRcdFx0XHRcdGNoYXJzICs9ICdcXDAnXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gZXhlY3V0ZSBwbHVnaW5zLCBuZXdsaW5lIGNvbnRleHRcblx0XHRcdFx0XHRpZiAocGx1Z2dlZCAqIHVua3duID4gMCkge1xuXHRcdFx0XHRcdFx0cHJveHkoVU5LV04sIGNoYXJzLCBjdXJyZW50LCBwYXJlbnQsIGxpbmUsIGNvbHVtbiwgb3V0Lmxlbmd0aCwgaWQsIGRlcHRoKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIG5leHQgbGluZSwgcmVzZXQgY29sdW1uIHBvc2l0aW9uXG5cdFx0XHRcdFx0Y29sdW1uID0gMVxuXHRcdFx0XHRcdGxpbmUrK1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBTRU1JQ09MT046XG5cdFx0XHRcdGNhc2UgQ0xPU0VCUkFDRVM6IHtcblx0XHRcdFx0XHRpZiAoY29tbWVudCArIHF1b3RlICsgcGFyZW50aGVzZXMgKyBicmFja2V0ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRjb2x1bW4rK1xuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdC8vIGluY3JlbWVudCBjb2x1bW4gcG9zaXRpb25cblx0XHRcdFx0XHRjb2x1bW4rK1xuXG5cdFx0XHRcdFx0Ly8gY3VycmVudCBjaGFyYWN0ZXJcblx0XHRcdFx0XHRjaGFyID0gYm9keS5jaGFyQXQoY2FyZXQpXG5cblx0XHRcdFx0XHQvLyByZW1vdmUgY29tbWVudHMsIGVzY2FwZSBmdW5jdGlvbnMsIHN0cmluZ3MsIGF0dHJpYnV0ZXMgYW5kIHByZXBhcmUgc2VsZWN0b3JzXG5cdFx0XHRcdFx0c3dpdGNoIChjb2RlKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFRBQjpcblx0XHRcdFx0XHRcdGNhc2UgU1BBQ0U6IHtcblx0XHRcdFx0XHRcdFx0aWYgKHF1b3RlICsgYnJhY2tldCArIGNvbW1lbnQgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHRhaWwpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ09NTUE6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIENPTE9OOlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBUQUI6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFNQQUNFOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYXIgPSAnJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoY29kZSAhPT0gU1BBQ0UpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFyID0gJyAnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIGVzY2FwZSBicmVha2luZyBjb250cm9sIGNoYXJhY3RlcnNcblx0XHRcdFx0XHRcdGNhc2UgTlVMTDoge1xuXHRcdFx0XHRcdFx0XHRjaGFyID0gJ1xcXFwwJ1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBGT1JNRkVFRDoge1xuXHRcdFx0XHRcdFx0XHRjaGFyID0gJ1xcXFxmJ1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBWRVJUSUNBTFRBQjoge1xuXHRcdFx0XHRcdFx0XHRjaGFyID0gJ1xcXFx2J1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gJlxuXHRcdFx0XHRcdFx0Y2FzZSBBTkQ6IHtcblx0XHRcdFx0XHRcdFx0Ly8gaW52ZXJ0ZWQgc2VsZWN0b3IgcGF0dGVybiBpLmUgaHRtbCAmXG5cdFx0XHRcdFx0XHRcdGlmIChxdW90ZSArIGNvbW1lbnQgKyBicmFja2V0ID09PSAwICYmIGNhc2NhZGUgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0aW52ZXJ0ID0gMVxuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdCA9IDFcblx0XHRcdFx0XHRcdFx0XHRjaGFyID0gJ1xcZicgKyBjaGFyXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIDo6cDxsPmFjZWhvbGRlciwgbFxuXHRcdFx0XHRcdFx0Ly8gOnJlYWQtb248bD55LCBsXG5cdFx0XHRcdFx0XHRjYXNlIDEwODoge1xuXHRcdFx0XHRcdFx0XHRpZiAocXVvdGUgKyBjb21tZW50ICsgYnJhY2tldCArIHBhdHRlcm4gPT09IDAgJiYgcHNldWRvID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoY2FyZXQgLSBwc2V1ZG8pIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIDo6cGxhY2Vob2xkZXJcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodGFpbCA9PT0gUExBQ0VIT0xERVIgJiYgYm9keS5jaGFyQ29kZUF0KGNhcmV0LTMpID09PSBDT0xPTikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBhdHRlcm4gPSB0YWlsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdC8vIDpyZWFkLW9ubHlcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgODoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodHJhaWwgPT09IFJFQURPTkxZKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGF0dGVybiA9IHRyYWlsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIDo8cGF0dGVybj5cblx0XHRcdFx0XHRcdGNhc2UgQ09MT046IHtcblx0XHRcdFx0XHRcdFx0aWYgKHF1b3RlICsgY29tbWVudCArIGJyYWNrZXQgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRwc2V1ZG8gPSBjYXJldFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBzZWxlY3RvcnNcblx0XHRcdFx0XHRcdGNhc2UgQ09NTUE6IHtcblx0XHRcdFx0XHRcdFx0aWYgKGNvbW1lbnQgKyBwYXJlbnRoZXNlcyArIHF1b3RlICsgYnJhY2tldCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGZvcm1hdCA9IDFcblx0XHRcdFx0XHRcdFx0XHRjaGFyICs9ICdcXHInXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHF1b3Rlc1xuXHRcdFx0XHRcdFx0Y2FzZSBET1VCTEVRVU9URToge1xuXHRcdFx0XHRcdFx0XHRpZiAoY29tbWVudCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHF1b3RlID0gcXVvdGUgPT09IGNvZGUgPyAwIDogKHF1b3RlID09PSAwID8gY29kZSA6IHF1b3RlKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlIFNJTkdMRVFVT1RFOiB7XG5cdFx0XHRcdFx0XHRcdGlmIChjb21tZW50ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0cXVvdGUgPSBxdW90ZSA9PT0gY29kZSA/IDAgOiAocXVvdGUgPT09IDAgPyBjb2RlIDogcXVvdGUpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIGF0dHJpYnV0ZXNcblx0XHRcdFx0XHRcdGNhc2UgT1BFTkJSQUNLRVQ6IHtcblx0XHRcdFx0XHRcdFx0aWYgKHF1b3RlICsgY29tbWVudCArIHBhcmVudGhlc2VzID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnJhY2tldCsrXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgQ0xPU0VCUkFDS0VUOiB7XG5cdFx0XHRcdFx0XHRcdGlmIChxdW90ZSArIGNvbW1lbnQgKyBwYXJlbnRoZXNlcyA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGJyYWNrZXQtLVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBmdW5jdGlvbnNcblx0XHRcdFx0XHRcdGNhc2UgQ0xPU0VQQVJFTlRIRVNFUzoge1xuXHRcdFx0XHRcdFx0XHRpZiAocXVvdGUgKyBjb21tZW50ICsgYnJhY2tldCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHBhcmVudGhlc2VzLS1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBPUEVOUEFSRU5USEVTRVM6IHtcblx0XHRcdFx0XHRcdFx0aWYgKHF1b3RlICsgY29tbWVudCArIGJyYWNrZXQgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29udGV4dCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoICh0YWlsKjIgKyB0cmFpbCozKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIDptYXRjaGVzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgNTMzOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyA6Z2xvYmFsLCA6bm90LCA6bnRoLWNoaWxkIGV0Yy4uLlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y291bnRlciA9IDBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0ID0gMVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50aGVzZXMrK1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlIEFUOiB7XG5cdFx0XHRcdFx0XHRcdGlmIChjb21tZW50ICsgcGFyZW50aGVzZXMgKyBxdW90ZSArIGJyYWNrZXQgKyBwc2V1ZG8gKyBhdHJ1bGUgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRhdHJ1bGUgPSAxXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIGJsb2NrL2xpbmUgY29tbWVudHNcblx0XHRcdFx0XHRcdGNhc2UgU1RBUjpcblx0XHRcdFx0XHRcdGNhc2UgRk9XQVJEU0xBU0g6IHtcblx0XHRcdFx0XHRcdFx0aWYgKHF1b3RlICsgYnJhY2tldCArIHBhcmVudGhlc2VzID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGNvbW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBpbml0aWFsaXplIGxpbmUvYmxvY2sgY29tbWVudCBjb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAwOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGNvZGUqMiArIGJvZHkuY2hhckNvZGVBdChjYXJldCsxKSozKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIC8vXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMjM1OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29tbWVudCA9IEZPV0FSRFNMQVNIXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDIyMDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxlbmd0aCA9IGNhcmV0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29tbWVudCA9IFNUQVJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvLyBlbmQgYmxvY2sgY29tbWVudCBjb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBTVEFSOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY29kZSA9PT0gRk9XQVJEU0xBU0ggJiYgdGFpbCA9PT0gU1RBUikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAvKjwhPiAuLi4gKi8sICFcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGJvZHkuY2hhckNvZGVBdChsZW5ndGgrMikgPT09IDMzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3V0ICs9IGJvZHkuc3Vic3RyaW5nKGxlbmd0aCwgY2FyZXQrMSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFyID0gJydcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29tbWVudCA9IDBcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBpZ25vcmUgY29tbWVudCBibG9ja3Ncblx0XHRcdFx0XHRpZiAoY29tbWVudCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0Ly8gYWdncmVzc2l2ZSBpc29sYXRpb24gbW9kZSwgZGl2aWRlIGVhY2ggaW5kaXZpZHVhbCBzZWxlY3RvclxuXHRcdFx0XHRcdFx0Ly8gaW5jbHVkaW5nIHNlbGVjdG9ycyBpbiA6bm90IGZ1bmN0aW9uIGJ1dCBleGNsdWRpbmcgc2VsZWN0b3JzIGluIDpnbG9iYWwgZnVuY3Rpb25cblx0XHRcdFx0XHRcdGlmIChjYXNjYWRlICsgcXVvdGUgKyBicmFja2V0ICsgYXRydWxlID09PSAwICYmIGlkICE9PSBLRVlGUkFNRSAmJiBjb2RlICE9PSBTRU1JQ09MT04pIHtcblx0XHRcdFx0XHRcdFx0c3dpdGNoIChjb2RlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBDT01NQTpcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFRJTERFOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgR1JFQVRFUlRIQU46XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBQTFVTOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0xPU0VQQVJFTlRIRVNFUzpcblx0XHRcdFx0XHRcdFx0XHRjYXNlIE9QRU5QQVJFTlRIRVNFUzoge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNvbnRleHQgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gb3V0c2lkZSBvZiBhbiBpc29sYXRlZCBjb250ZXh0IGkuZSBudGgtY2hpbGQoPC4uLj4pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAodGFpbCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgVEFCOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgU1BBQ0U6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBORVdMSU5FOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0FSUklBR0U6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoYXIgPSBjaGFyICsgJ1xcMCdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoYXIgPSAnXFwwJyArIGNoYXIgKyAoY29kZSA9PT0gQ09NTUEgPyAnJyA6ICdcXDAnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb3JtYXQgPSAxXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyB3aXRoaW4gYW4gaXNvbGF0ZWQgY29udGV4dCwgc2xlZXAgdW50aWxsIGl0J3MgdGVybWluYXRlZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGNvZGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIE9QRU5QQVJFTlRIRVNFUzoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udGV4dCA9ICsrY291bnRlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBDTE9TRVBBUkVOVEhFU0VTOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoKGNvbnRleHQgPSAtLWNvdW50ZXIpID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZvcm1hdCA9IDFcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhciArPSAnXFwwJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgVEFCOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgU1BBQ0U6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAodGFpbCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIE5VTEw6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgT1BFTkJSQUNFUzpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBDTE9TRUJSQUNFUzpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBTRU1JQ09MT046XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ09NTUE6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgRk9STUZFRUQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgVEFCOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFNQQUNFOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIE5FV0xJTkU6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0FSUklBR0U6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBpZ25vcmUgaW4gaXNvbGF0ZWQgY29udGV4dHNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoY29udGV4dCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gMVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhciArPSAnXFwwJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBjb25jYXQgYnVmZmVyIG9mIGNoYXJhY3RlcnNcblx0XHRcdFx0XHRcdGNoYXJzICs9IGNoYXJcblxuXHRcdFx0XHRcdFx0Ly8gcHJldmlvdXMgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyIGNvZGVcblx0XHRcdFx0XHRcdGlmIChjb2RlICE9PSBTUEFDRSAmJiBjb2RlICE9PSBUQUIpIHtcblx0XHRcdFx0XHRcdFx0cGVhayA9IGNvZGVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gdGFpbCBjaGFyYWN0ZXIgY29kZXNcblx0XHRcdHRyYWlsID0gdGFpbFxuXHRcdFx0dGFpbCA9IGNvZGVcblxuXHRcdFx0Ly8gdmlzaXQgZXZlcnkgY2hhcmFjdGVyXG5cdFx0XHRjYXJldCsrXG5cdFx0fVxuXG5cdFx0bGVuZ3RoID0gb3V0Lmxlbmd0aFxuXG5cdFx0Ly8gcHJlc2VydmUgZW1wdHkgc2VsZWN0b3JcbiBcdFx0aWYgKHByZXNlcnZlID4gMCkge1xuIFx0XHRcdGlmIChsZW5ndGggPT09IDAgJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAwICYmIChjdXJyZW50WzBdLmxlbmd0aCA9PT0gMCkgPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRpZiAoaWQgIT09IE1FRElBIHx8IChjdXJyZW50Lmxlbmd0aCA9PT0gMSAmJiAoY2FzY2FkZSA+IDAgPyBuc2NvcGVhbHQgOiBuc2NvcGUpID09PSBjdXJyZW50WzBdKSkge1xuXHRcdFx0XHRcdGxlbmd0aCA9IGN1cnJlbnQuam9pbignLCcpLmxlbmd0aCArIDJcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGxlbmd0aCA+IDApIHtcblx0XHRcdC8vIGNhc2NhZGUgaXNvbGF0aW9uIG1vZGU/XG5cdFx0XHRzZWxlY3RvciA9IGNhc2NhZGUgPT09IDAgJiYgaWQgIT09IEtFWUZSQU1FID8gaXNvbGF0ZShjdXJyZW50KSA6IGN1cnJlbnRcblxuXHRcdFx0Ly8gZXhlY3V0ZSBwbHVnaW5zLCBibG9jayBjb250ZXh0XG5cdFx0XHRpZiAocGx1Z2dlZCA+IDApIHtcblx0XHRcdFx0cmVzdWx0ID0gcHJveHkoQkxDS1MsIG91dCwgc2VsZWN0b3IsIHBhcmVudCwgbGluZSwgY29sdW1uLCBsZW5ndGgsIGlkLCBkZXB0aClcblxuXHRcdFx0XHRpZiAocmVzdWx0ICE9PSB2b2lkIDAgJiYgKG91dCA9IHJlc3VsdCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZsYXQgKyBvdXQgKyBjaGlsZHJlblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG91dCA9IHNlbGVjdG9yLmpvaW4oJywnKSArICd7JyArIG91dCArICd9J1xuXG5cdFx0XHRpZiAocHJlZml4KnBhdHRlcm4gIT09IDApIHtcblx0XHRcdFx0aWYgKHByZWZpeCA9PT0gMiAmJiAhdmVuZG9yKG91dCwgMikpXG5cdFx0XHRcdFx0cGF0dGVybiA9IDBcblxuXHRcdFx0XHRzd2l0Y2ggKHBhdHRlcm4pIHtcblx0XHRcdFx0XHQvLyA6OnJlYWQtb25seVxuXHRcdFx0XHRcdGNhc2UgUkVBRE9OTFk6IHtcblx0XHRcdFx0XHRcdG91dCA9IG91dC5yZXBsYWNlKHJlYWRvbmx5cHRuLCAnOicrbW96KyckMScpK291dFxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gOjpwbGFjZWhvbGRlclxuXHRcdFx0XHRcdGNhc2UgUExBQ0VIT0xERVI6IHtcblx0XHRcdFx0XHRcdG91dCA9IChcblx0XHRcdFx0XHRcdFx0b3V0LnJlcGxhY2UocGxjaG9sZHJwdG4sICc6OicgKyB3ZWJraXQgKyAnaW5wdXQtJDEnKSArXG5cdFx0XHRcdFx0XHRcdG91dC5yZXBsYWNlKHBsY2hvbGRycHRuLCAnOjonICsgbW96ICsgJyQxJykgK1xuXHRcdFx0XHRcdFx0XHRvdXQucmVwbGFjZShwbGNob2xkcnB0biwgJzonICsgbXMgKyAnaW5wdXQtJDEnKSArIG91dFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwYXR0ZXJuID0gMFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmbGF0ICsgb3V0ICsgY2hpbGRyZW5cblx0fVxuXG5cdC8qKlxuXHQgKiBTZWxlY3Rcblx0ICpcblx0ICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBwYXJlbnRcblx0ICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRcblx0ICogQHBhcmFtIHtudW1iZXJ9IGludmVydFxuXHQgKiBAcmV0dXJuIHtBcnJheTxzdHJpbmc+fVxuXHQgKi9cblx0ZnVuY3Rpb24gc2VsZWN0IChwYXJlbnQsIGN1cnJlbnQsIGludmVydCkge1xuXHRcdHZhciBzZWxlY3RvcnMgPSBjdXJyZW50LnRyaW0oKS5zcGxpdChzZWxlY3RvcnB0bilcblx0XHR2YXIgb3V0ID0gc2VsZWN0b3JzXG5cblx0XHR2YXIgbGVuZ3RoID0gc2VsZWN0b3JzLmxlbmd0aFxuXHRcdHZhciBsID0gcGFyZW50Lmxlbmd0aFxuXG5cdFx0c3dpdGNoIChsKSB7XG5cdFx0XHQvLyAwLTEgcGFyZW50IHNlbGVjdG9yc1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0Y2FzZSAxOiB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBzZWxlY3RvciA9IGwgPT09IDAgPyAnJyA6IHBhcmVudFswXSArICcgJzsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0b3V0W2ldID0gc2NvcGUoc2VsZWN0b3IsIG91dFtpXSwgaW52ZXJ0LCBsKS50cmltKClcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdFx0Ly8gPjIgcGFyZW50IHNlbGVjdG9ycywgbmVzdGVkXG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBqID0gMCwgb3V0ID0gW107IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdFx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgbDsgKytrKSB7XG5cdFx0XHRcdFx0XHRvdXRbaisrXSA9IHNjb3BlKHBhcmVudFtrXSArICcgJywgc2VsZWN0b3JzW2ldLCBpbnZlcnQsIGwpLnRyaW0oKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvdXRcblx0fVxuXG5cdC8qKlxuXHQgKiBTY29wZVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBpbnZlcnRcblx0ICogQHBhcmFtIHtudW1iZXJ9IGxldmVsXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIHNjb3BlIChwYXJlbnQsIGN1cnJlbnQsIGludmVydCwgbGV2ZWwpIHtcblx0XHR2YXIgc2VsZWN0b3IgPSBjdXJyZW50XG5cdFx0dmFyIGNvZGUgPSBzZWxlY3Rvci5jaGFyQ29kZUF0KDApXG5cblx0XHQvLyB0cmltIGxlYWRpbmcgd2hpdGVzcGFjZVxuXHRcdGlmIChjb2RlIDwgMzMpIHtcblx0XHRcdGNvZGUgPSAoc2VsZWN0b3IgPSBzZWxlY3Rvci50cmltKCkpLmNoYXJDb2RlQXQoMClcblx0XHR9XG5cblx0XHRzd2l0Y2ggKGNvZGUpIHtcblx0XHRcdC8vICZcblx0XHRcdGNhc2UgQU5EOiB7XG5cdFx0XHRcdHN3aXRjaCAoY2FzY2FkZSArIGxldmVsKSB7XG5cdFx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdGNhc2UgMToge1xuXHRcdFx0XHRcdFx0aWYgKHBhcmVudC50cmltKCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWxlY3Rvci5yZXBsYWNlKGFuZHB0biwgJyQxJytwYXJlbnQudHJpbSgpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdFx0Ly8gOlxuXHRcdFx0Y2FzZSBDT0xPTjoge1xuXHRcdFx0XHRzd2l0Y2ggKHNlbGVjdG9yLmNoYXJDb2RlQXQoMSkpIHtcblx0XHRcdFx0XHQvLyBnIGluIDpnbG9iYWxcblx0XHRcdFx0XHRjYXNlIDEwMzoge1xuXHRcdFx0XHRcdFx0aWYgKGVzY2FwZSA+IDAgJiYgY2FzY2FkZSA+IDApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNlbGVjdG9yLnJlcGxhY2UoZXNjYXBlcHRuLCAnJDEnKS5yZXBsYWNlKGFuZHB0biwgJyQxJytuc2NvcGUpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHQvLyA6aG92ZXJcblx0XHRcdFx0XHRcdHJldHVybiBwYXJlbnQudHJpbSgpICsgc2VsZWN0b3Jcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0Ly8gaHRtbCAmXG5cdFx0XHRcdGlmIChpbnZlcnQqY2FzY2FkZSA+IDAgJiYgc2VsZWN0b3IuaW5kZXhPZignXFxmJykgPiAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGVjdG9yLnJlcGxhY2UoYW5kcHRuLCAocGFyZW50LmNoYXJDb2RlQXQoMCkgPT09IENPTE9OID8gJycgOiAnJDEnKStwYXJlbnQudHJpbSgpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBhcmVudCArIHNlbGVjdG9yXG5cdH1cblxuXHQvKipcblx0ICogUHJvcGVydHlcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlucHV0XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBmaXJzdFxuXHQgKiBAcGFyYW0ge251bWJlcn0gc2Vjb25kXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB0aGlyZFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqL1xuXHRmdW5jdGlvbiBwcm9wZXJ0eSAoaW5wdXQsIGZpcnN0LCBzZWNvbmQsIHRoaXJkKSB7XG5cdFx0dmFyIGluZGV4ID0gMFxuXHRcdHZhciBvdXQgPSBpbnB1dCArICc7J1xuXHRcdHZhciBoYXNoID0gKGZpcnN0KjIpICsgKHNlY29uZCozKSArICh0aGlyZCo0KVxuXHRcdHZhciBjYWNoZVxuXG5cdFx0Ly8gYW5pbWF0aW9uOiBhLCBuLCBpIGNoYXJhY3RlcnNcblx0XHRpZiAoaGFzaCA9PT0gOTQ0KSB7XG5cdFx0XHRyZXR1cm4gYW5pbWF0aW9uKG91dClcblx0XHR9IGVsc2UgaWYgKHByZWZpeCA9PT0gMCB8fCAocHJlZml4ID09PSAyICYmICF2ZW5kb3Iob3V0LCAxKSkpIHtcblx0XHRcdHJldHVybiBvdXRcblx0XHR9XG5cblx0XHQvLyB2ZW5kb3IgcHJlZml4XG5cdFx0c3dpdGNoIChoYXNoKSB7XG5cdFx0XHQvLyB0ZXh0LWRlY29yYXRpb24vdGV4dC1zaXplLWFkanVzdDogdCwgZSwgeFxuXHRcdFx0Y2FzZSAxMDE1OiB7XG5cdFx0XHRcdC8vIHRleHQtc2l6ZS1hZGp1c3QsIC1cblx0XHRcdFx0cmV0dXJuIG91dC5jaGFyQ29kZUF0KDkpID09PSBEQVNIID8gd2Via2l0ICsgb3V0ICsgb3V0IDogb3V0XG5cdFx0XHR9XG5cdFx0XHQvLyBmaWx0ZXIvZmlsbCBmLCBpLCBsXG5cdFx0XHRjYXNlIDk1MToge1xuXHRcdFx0XHQvLyBmaWx0ZXIsIHRcblx0XHRcdFx0cmV0dXJuIG91dC5jaGFyQ29kZUF0KDMpID09PSAxMTYgPyB3ZWJraXQgKyBvdXQgKyBvdXQgOiBvdXRcblx0XHRcdH1cblx0XHRcdC8vIGNvbG9yL2NvbHVtbiwgYywgbywgbFxuXHRcdFx0Y2FzZSA5NjM6IHtcblx0XHRcdFx0Ly8gY29sdW1uLCBuXG5cdFx0XHRcdHJldHVybiBvdXQuY2hhckNvZGVBdCg1KSA9PT0gMTEwID8gd2Via2l0ICsgb3V0ICsgb3V0IDogb3V0XG5cdFx0XHR9XG5cdFx0XHQvLyBib3gtZGVjb3JhdGlvbi1icmVhaywgYiwgbywgeFxuXHRcdFx0Y2FzZSAxMDA5OiB7XG5cdFx0XHRcdGlmIChvdXQuY2hhckNvZGVBdCg0KSAhPT0gMTAwKSB7XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gbWFzaywgbSwgYSwgc1xuXHRcdFx0Ly8gY2xpcC1wYXRoLCBjLCBsLCBpXG5cdFx0XHRjYXNlIDk2OTpcblx0XHRcdGNhc2UgOTQyOiB7XG5cdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBvdXRcblx0XHRcdH1cblx0XHRcdC8vIGFwcGVhcmFuY2U6IGEsIHAsIHBcblx0XHRcdGNhc2UgOTc4OiB7XG5cdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBtb3ogKyBvdXQgKyBvdXRcblx0XHRcdH1cblx0XHRcdC8vIGh5cGhlbnM6IGgsIHksIHBcblx0XHRcdC8vIHVzZXItc2VsZWN0OiB1LCBzLCBlXG5cdFx0XHRjYXNlIDEwMTk6XG5cdFx0XHRjYXNlIDk4Mzoge1xuXHRcdFx0XHRyZXR1cm4gd2Via2l0ICsgb3V0ICsgbW96ICsgb3V0ICsgbXMgKyBvdXQgKyBvdXRcblx0XHRcdH1cblx0XHRcdC8vIGJhY2tncm91bmQvYmFja2ZhY2UtdmlzaWJpbGl0eSwgYiwgYSwgY1xuXHRcdFx0Y2FzZSA4ODM6IHtcblx0XHRcdFx0Ly8gYmFja2ZhY2UtdmlzaWJpbGl0eSwgLVxuXHRcdFx0XHRyZXR1cm4gb3V0LmNoYXJDb2RlQXQoOCkgPT09IERBU0ggPyB3ZWJraXQgKyBvdXQgKyBvdXQgOiBvdXRcblx0XHRcdH1cblx0XHRcdC8vIGZsZXg6IGYsIGwsIGVcblx0XHRcdGNhc2UgOTMyOiB7XG5cdFx0XHRcdGlmIChvdXQuY2hhckNvZGVBdCg0KSA9PT0gREFTSCkge1xuXHRcdFx0XHRcdHN3aXRjaCAob3V0LmNoYXJDb2RlQXQoNSkpIHtcblx0XHRcdFx0XHRcdC8vIGZsZXgtZ3JvdywgZ1xuXHRcdFx0XHRcdFx0Y2FzZSAxMDM6IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHdlYmtpdCArICdib3gtJyArIG91dC5yZXBsYWNlKCctZ3JvdycsICcnKSArIHdlYmtpdCArIG91dCArIG1zICsgb3V0LnJlcGxhY2UoJ2dyb3cnLCAncG9zaXRpdmUnKSArIG91dFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gZmxleC1zaHJpbmssIHNcblx0XHRcdFx0XHRcdGNhc2UgMTE1OiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBtcyArIG91dC5yZXBsYWNlKCdzaHJpbmsnLCAnbmVnYXRpdmUnKSArIG91dFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gZmxleC1iYXNpcywgYlxuXHRcdFx0XHRcdFx0Y2FzZSA5ODoge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2Via2l0ICsgb3V0ICsgbXMgKyBvdXQucmVwbGFjZSgnYmFzaXMnLCAncHJlZmVycmVkLXNpemUnKSArIG91dFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBtcyArIG91dCArIG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gb3JkZXI6IG8sIHIsIGRcblx0XHRcdGNhc2UgOTY0OiB7XG5cdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBtcyArICdmbGV4JyArICctJyArIG91dCArIG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8ganVzdGlmeS1pdGVtcy9qdXN0aWZ5LWNvbnRlbnQsIGosIHUsIHNcblx0XHRcdGNhc2UgMTAyMzoge1xuXHRcdFx0XHQvLyBqdXN0aWZ5LWNvbnRlbnQsIGNcblx0XHRcdFx0aWYgKG91dC5jaGFyQ29kZUF0KDgpICE9PSA5OSkge1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYWNoZSA9IG91dC5zdWJzdHJpbmcob3V0LmluZGV4T2YoJzonLCAxNSkpLnJlcGxhY2UoJ2ZsZXgtJywgJycpLnJlcGxhY2UoJ3NwYWNlLWJldHdlZW4nLCAnanVzdGlmeScpXG5cdFx0XHRcdHJldHVybiB3ZWJraXQgKyAnYm94LXBhY2snICsgY2FjaGUgKyB3ZWJraXQgKyBvdXQgKyBtcyArICdmbGV4LXBhY2snICsgY2FjaGUgKyBvdXRcblx0XHRcdH1cblx0XHRcdC8vIGN1cnNvciwgYywgdSwgclxuXHRcdFx0Y2FzZSAxMDA1OiB7XG5cdFx0XHRcdHJldHVybiBjdXJzb3JwdG4udGVzdChvdXQpID8gb3V0LnJlcGxhY2UoY29sb25wdG4sICc6JyArIHdlYmtpdCkgKyBvdXQucmVwbGFjZShjb2xvbnB0biwgJzonICsgbW96KSArIG91dCA6IG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gd3JpdGluZy1tb2RlLCB3LCByLCBpXG5cdFx0XHRjYXNlIDEwMDA6IHtcblx0XHRcdFx0Y2FjaGUgPSBvdXQuc3Vic3RyaW5nKDEzKS50cmltKClcblx0XHRcdFx0aW5kZXggPSBjYWNoZS5pbmRleE9mKCctJykgKyAxXG5cblx0XHRcdFx0c3dpdGNoIChjYWNoZS5jaGFyQ29kZUF0KDApK2NhY2hlLmNoYXJDb2RlQXQoaW5kZXgpKSB7XG5cdFx0XHRcdFx0Ly8gdmVydGljYWwtbHJcblx0XHRcdFx0XHRjYXNlIDIyNjoge1xuXHRcdFx0XHRcdFx0Y2FjaGUgPSBvdXQucmVwbGFjZSh3cml0aW5ncHRuLCAndGInKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gdmVydGljYWwtcmxcblx0XHRcdFx0XHRjYXNlIDIzMjoge1xuXHRcdFx0XHRcdFx0Y2FjaGUgPSBvdXQucmVwbGFjZSh3cml0aW5ncHRuLCAndGItcmwnKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gaG9yaXpvbnRhbC10YlxuXHRcdFx0XHRcdGNhc2UgMjIwOiB7XG5cdFx0XHRcdFx0XHRjYWNoZSA9IG91dC5yZXBsYWNlKHdyaXRpbmdwdG4sICdscicpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gb3V0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIG1zICsgY2FjaGUgKyBvdXRcblx0XHRcdH1cblx0XHRcdC8vIHBvc2l0aW9uOiBzdGlja3lcblx0XHRcdGNhc2UgMTAxNzoge1xuXHRcdFx0XHRpZiAob3V0LmluZGV4T2YoJ3N0aWNreScsIDkpID09PSAtMSkge1xuXHRcdFx0XHRcdHJldHVybiBvdXRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gZGlzcGxheShmbGV4L2lubGluZS1mbGV4L2lubGluZS1ib3gpOiBkLCBpLCBzXG5cdFx0XHRjYXNlIDk3NToge1xuXHRcdFx0XHRpbmRleCA9IChvdXQgPSBpbnB1dCkubGVuZ3RoIC0gMTBcblx0XHRcdFx0Y2FjaGUgPSAob3V0LmNoYXJDb2RlQXQoaW5kZXgpID09PSAzMyA/IG91dC5zdWJzdHJpbmcoMCwgaW5kZXgpIDogb3V0KS5zdWJzdHJpbmcoaW5wdXQuaW5kZXhPZignOicsIDcpICsgMSkudHJpbSgpXG5cblx0XHRcdFx0c3dpdGNoIChoYXNoID0gY2FjaGUuY2hhckNvZGVBdCgwKSArIChjYWNoZS5jaGFyQ29kZUF0KDcpfDApKSB7XG5cdFx0XHRcdFx0Ly8gaW5saW5lLVxuXHRcdFx0XHRcdGNhc2UgMjAzOiB7XG5cdFx0XHRcdFx0XHQvLyBpbmxpbmUtYm94XG5cdFx0XHRcdFx0XHRpZiAoY2FjaGUuY2hhckNvZGVBdCg4KSA8IDExMSkge1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBpbmxpbmUtYm94L3N0aWNreVxuXHRcdFx0XHRcdGNhc2UgMTE1OiB7XG5cdFx0XHRcdFx0XHRvdXQgPSBvdXQucmVwbGFjZShjYWNoZSwgd2Via2l0K2NhY2hlKSsnOycrb3V0XG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBpbmxpbmUtZmxleFxuXHRcdFx0XHRcdC8vIGZsZXhcblx0XHRcdFx0XHRjYXNlIDIwNzpcblx0XHRcdFx0XHRjYXNlIDEwMjoge1xuXHRcdFx0XHRcdFx0b3V0ID0gKFxuXHRcdFx0XHRcdFx0XHRvdXQucmVwbGFjZShjYWNoZSwgd2Via2l0KyhoYXNoID4gMTAyID8gJ2lubGluZS0nIDogJycpKydib3gnKSsnOycrXG5cdFx0XHRcdFx0XHRcdG91dC5yZXBsYWNlKGNhY2hlLCB3ZWJraXQrY2FjaGUpKyc7Jytcblx0XHRcdFx0XHRcdFx0b3V0LnJlcGxhY2UoY2FjaGUsIG1zK2NhY2hlKydib3gnKSsnOycrXG5cdFx0XHRcdFx0XHRcdG91dFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBvdXQgKyAnOydcblx0XHRcdH1cblx0XHRcdC8vIGFsaWduLWl0ZW1zLCBhbGlnbi1jZW50ZXIsIGFsaWduLXNlbGY6IGEsIGwsIGksIC1cblx0XHRcdGNhc2UgOTM4OiB7XG5cdFx0XHRcdGlmIChvdXQuY2hhckNvZGVBdCg1KSA9PT0gREFTSCkge1xuXHRcdFx0XHRcdHN3aXRjaCAob3V0LmNoYXJDb2RlQXQoNikpIHtcblx0XHRcdFx0XHRcdC8vIGFsaWduLWl0ZW1zLCBpXG5cdFx0XHRcdFx0XHRjYXNlIDEwNToge1xuXHRcdFx0XHRcdFx0XHRjYWNoZSA9IG91dC5yZXBsYWNlKCctaXRlbXMnLCAnJylcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIHdlYmtpdCArICdib3gtJyArIGNhY2hlICsgbXMgKyAnZmxleC0nICsgY2FjaGUgKyBvdXRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIGFsaWduLXNlbGYsIHNcblx0XHRcdFx0XHRcdGNhc2UgMTE1OiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBtcyArICdmbGV4LWl0ZW0tJyArIG91dC5yZXBsYWNlKHNlbGZwdG4sICcnKSArIG91dFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYWxpZ24tY29udGVudFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2Via2l0ICsgb3V0ICsgbXMgKyAnZmxleC1saW5lLXBhY2snICsgb3V0LnJlcGxhY2UoJ2FsaWduLWNvbnRlbnQnLCAnJykgKyBvdXRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHRcdC8vIHdpZHRoOiBtaW4tY29udGVudCAvIHdpZHRoOiBtYXgtY29udGVudFxuXHRcdFx0Y2FzZSA5NTM6IHtcblx0XHRcdFx0aWYgKChpbmRleCA9IG91dC5pbmRleE9mKCctY29udGVudCcsIDkpKSA+IDApIHtcblx0XHRcdFx0XHQvLyB3aWR0aDogbWluLWNvbnRlbnQgLyB3aWR0aDogbWF4LWNvbnRlbnRcblx0XHRcdFx0XHRpZiAob3V0LmNoYXJDb2RlQXQoaW5kZXggLSAzKSA9PT0gMTA5ICYmIG91dC5jaGFyQ29kZUF0KGluZGV4IC0gNCkgIT09IDQ1KSB7XG5cdFx0XHRcdFx0XHRjYWNoZSA9IG91dC5zdWJzdHJpbmcoaW5kZXggLSAzKVxuXHRcdFx0XHRcdFx0cmV0dXJuICd3aWR0aDonICsgd2Via2l0ICsgY2FjaGUgKyAnd2lkdGg6JyArIG1veiArIGNhY2hlICsgJ3dpZHRoOicgKyBjYWNoZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdFx0Ly8gdHJhbnNmb3JtLCB0cmFuc2l0aW9uOiB0LCByLCBhXG5cdFx0XHRjYXNlIDk2Mjoge1xuXHRcdFx0XHRvdXQgPSB3ZWJraXQgKyBvdXQgKyAob3V0LmNoYXJDb2RlQXQoNSkgPT09IDEwMiA/IG1zICsgb3V0IDogJycpICsgb3V0XG5cblx0XHRcdFx0Ly8gdHJhbnNpdGlvbnNcblx0XHRcdFx0aWYgKHNlY29uZCArIHRoaXJkID09PSAyMTEgJiYgb3V0LmNoYXJDb2RlQXQoMTMpID09PSAxMDUgJiYgb3V0LmluZGV4T2YoJ3RyYW5zZm9ybScsIDEwKSA+IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gb3V0LnN1YnN0cmluZygwLCBvdXQuaW5kZXhPZignOycsIDI3KSArIDEpLnJlcGxhY2UodHJhbnNmb3JtcHRuLCAnJDEnICsgd2Via2l0ICsgJyQyJykgKyBvdXRcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cblx0dmFyIGkgPSAwXG5cblx0LyoqXG5cdCAqIFZlbmRvclxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuXHQgKiBAcGFyYW0ge251bWJlcn0gY29udGV4dFxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgKi9cblx0ZnVuY3Rpb24gdmVuZG9yIChjb250ZW50LCBjb250ZXh0KSB7XG5cdFx0dmFyIGluZGV4ID0gY29udGVudC5pbmRleE9mKGNvbnRleHQgPT09IDEgPyAnOicgOiAneycpXG5cdFx0dmFyIGtleSA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIGNvbnRleHQgIT09IDMgPyBpbmRleCA6IDEwKVxuXHRcdHZhciB2YWx1ZSA9IGNvbnRlbnQuc3Vic3RyaW5nKGluZGV4ICsgMSwgY29udGVudC5sZW5ndGggLSAxKVxuXG5cdFx0cmV0dXJuIHNob3VsZChjb250ZXh0ICE9PSAyID8ga2V5IDoga2V5LnJlcGxhY2UocHNldWRvZm10LCAnJDEnKSwgdmFsdWUsIGNvbnRleHQpXG5cdH1cblxuXHQvKipcblx0ICogU3VwcG9ydHNcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBncm91cFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqL1xuXHRmdW5jdGlvbiBzdXBwb3J0cyAobWF0Y2gsIGdyb3VwKSB7XG5cdFx0dmFyIG91dCA9IHByb3BlcnR5KGdyb3VwLCBncm91cC5jaGFyQ29kZUF0KDApLCBncm91cC5jaGFyQ29kZUF0KDEpLCBncm91cC5jaGFyQ29kZUF0KDIpKVxuXG5cdFx0cmV0dXJuIG91dCAhPT0gZ3JvdXArJzsnID8gb3V0LnJlcGxhY2UocHJvcGVydHlwdG4sICcgb3IgKCQxKScpLnN1YnN0cmluZyg0KSA6ICcoJytncm91cCsnKSdcblx0fVxuXG5cdC8qKlxuXHQgKiBBbmltYXRpb25cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlucHV0XG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIGFuaW1hdGlvbiAoaW5wdXQpIHtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoXG5cdFx0dmFyIGluZGV4ID0gaW5wdXQuaW5kZXhPZignOicsIDkpICsgMVxuXHRcdHZhciBkZWNsYXJlID0gaW5wdXQuc3Vic3RyaW5nKDAsIGluZGV4KS50cmltKClcblx0XHR2YXIgb3V0ID0gaW5wdXQuc3Vic3RyaW5nKGluZGV4LCBsZW5ndGgtMSkudHJpbSgpXG5cblx0XHRzd2l0Y2ggKGlucHV0LmNoYXJDb2RlQXQoOSkqa2V5ZWQpIHtcblx0XHRcdGNhc2UgMDoge1xuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdFx0Ly8gYW5pbWF0aW9uLSosIC1cblx0XHRcdGNhc2UgREFTSDoge1xuXHRcdFx0XHQvLyBhbmltYXRpb24tbmFtZSwgblxuXHRcdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdCgxMCkgIT09IDExMCkge1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIGFuaW1hdGlvbi9hbmltYXRpb24tbmFtZVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHQvLyBzcGxpdCBpbiBjYXNlIG9mIG11bHRpcGxlIGFuaW1hdGlvbnNcblx0XHRcdFx0dmFyIGxpc3QgPSBvdXQuc3BsaXQoKG91dCA9ICcnLCBhbmltYXRpb25wdG4pKVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBpbmRleCA9IDAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpbmRleCA9IDAsICsraSkge1xuXHRcdFx0XHRcdHZhciB2YWx1ZSA9IGxpc3RbaV1cblx0XHRcdFx0XHR2YXIgaXRlbXMgPSB2YWx1ZS5zcGxpdChwcm9wZXJ0aWVzcHRuKVxuXG5cdFx0XHRcdFx0d2hpbGUgKHZhbHVlID0gaXRlbXNbaW5kZXhdKSB7XG5cdFx0XHRcdFx0XHR2YXIgcGVhayA9IHZhbHVlLmNoYXJDb2RlQXQoMClcblxuXHRcdFx0XHRcdFx0aWYgKGtleWVkID09PSAxICYmIChcblx0XHRcdFx0XHRcdFx0Ly8gbGV0dGVyc1xuXHRcdFx0XHRcdFx0XHQocGVhayA+IEFUICYmIHBlYWsgPCA5MCkgfHwgKHBlYWsgPiA5NiAmJiBwZWFrIDwgMTIzKSB8fCBwZWFrID09PSBVTkRFUlNDT1JFIHx8XG5cdFx0XHRcdFx0XHRcdC8vIGRhc2ggYnV0IG5vdCBpbiBzZXF1ZW5jZSBpLmUgLS1cblx0XHRcdFx0XHRcdFx0KHBlYWsgPT09IERBU0ggJiYgdmFsdWUuY2hhckNvZGVBdCgxKSAhPT0gREFTSClcblx0XHRcdFx0XHRcdCkpIHtcblx0XHRcdFx0XHRcdFx0Ly8gbm90IGEgbnVtYmVyL2Z1bmN0aW9uXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICsgKHZhbHVlLmluZGV4T2YoJygnKSAhPT0gLTEpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAxOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIG5vdCBhIHZhbGlkIHJlc2VydmVkIGtleXdvcmRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAnaW5maW5pdGUnOiBjYXNlICdhbHRlcm5hdGUnOiBjYXNlICdiYWNrd2FyZHMnOiBjYXNlICdydW5uaW5nJzpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAnbm9ybWFsJzogY2FzZSAnZm9yd2FyZHMnOiBjYXNlICdib3RoJzogY2FzZSAnbm9uZSc6IGNhc2UgJ2xpbmVhcic6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ2Vhc2UnOiBjYXNlICdlYXNlLWluJzogY2FzZSAnZWFzZS1vdXQnOiBjYXNlICdlYXNlLWluLW91dCc6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3BhdXNlZCc6IGNhc2UgJ3JldmVyc2UnOiBjYXNlICdhbHRlcm5hdGUtcmV2ZXJzZSc6IGNhc2UgJ2luaGVyaXQnOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlICdpbml0aWFsJzogY2FzZSAndW5zZXQnOiBjYXNlICdzdGVwLXN0YXJ0JzogY2FzZSAnc3RlcC1lbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgKz0ga2V5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aXRlbXNbaW5kZXgrK10gPSB2YWx1ZVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG91dCArPSAoaSA9PT0gMCA/ICcnIDogJywnKSArIGl0ZW1zLmpvaW4oJyAnKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b3V0ID0gZGVjbGFyZSArIG91dCArICc7J1xuXG5cdFx0aWYgKHByZWZpeCA9PT0gMSB8fCAocHJlZml4ID09PSAyICYmIHZlbmRvcihvdXQsIDEpKSlcblx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBvdXRcblxuXHRcdHJldHVybiBvdXRcblx0fVxuXG5cdC8qKlxuXHQgKiBJc29sYXRlXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gY3VycmVudFxuXHQgKi9cblx0ZnVuY3Rpb24gaXNvbGF0ZSAoY3VycmVudCkge1xuXHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50Lmxlbmd0aCwgc2VsZWN0b3IgPSBBcnJheShsZW5ndGgpLCBwYWRkaW5nLCBlbGVtZW50OyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRcdC8vIHNwbGl0IGluZGl2aWR1YWwgZWxlbWVudHMgaW4gYSBzZWxlY3RvciBpLmUgaDEgaDIgPT09IFtoMSwgaDJdXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBjdXJyZW50W2ldLnNwbGl0KGVsZW1lbnRwdG4pXG5cdFx0XHR2YXIgb3V0ID0gJydcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDAsIHNpemUgPSAwLCB0YWlsID0gMCwgY29kZSA9IDAsIGwgPSBlbGVtZW50cy5sZW5ndGg7IGogPCBsOyArK2opIHtcblx0XHRcdFx0Ly8gZW1wdHkgZWxlbWVudFxuXHRcdFx0XHRpZiAoKHNpemUgPSAoZWxlbWVudCA9IGVsZW1lbnRzW2pdKS5sZW5ndGgpID09PSAwICYmIGwgPiAxKSB7XG5cdFx0XHRcdFx0Y29udGludWVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRhaWwgPSBvdXQuY2hhckNvZGVBdChvdXQubGVuZ3RoLTEpXG5cdFx0XHRcdGNvZGUgPSBlbGVtZW50LmNoYXJDb2RlQXQoMClcblx0XHRcdFx0cGFkZGluZyA9ICcnXG5cblx0XHRcdFx0aWYgKGogIT09IDApIHtcblx0XHRcdFx0XHQvLyBkZXRlcm1pbmUgaWYgd2UgbmVlZCBwYWRkaW5nXG5cdFx0XHRcdFx0c3dpdGNoICh0YWlsKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFNUQVI6XG5cdFx0XHRcdFx0XHRjYXNlIFRJTERFOlxuXHRcdFx0XHRcdFx0Y2FzZSBHUkVBVEVSVEhBTjpcblx0XHRcdFx0XHRcdGNhc2UgUExVUzpcblx0XHRcdFx0XHRcdGNhc2UgU1BBQ0U6XG5cdFx0XHRcdFx0XHRjYXNlIE9QRU5QQVJFTlRIRVNFUzogIHtcblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0cGFkZGluZyA9ICcgJ1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHN3aXRjaCAoY29kZSkge1xuXHRcdFx0XHRcdGNhc2UgQU5EOiB7XG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gcGFkZGluZyArIG5zY29wZWFsdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXNlIFRJTERFOlxuXHRcdFx0XHRcdGNhc2UgR1JFQVRFUlRIQU46XG5cdFx0XHRcdFx0Y2FzZSBQTFVTOlxuXHRcdFx0XHRcdGNhc2UgU1BBQ0U6XG5cdFx0XHRcdFx0Y2FzZSBDTE9TRVBBUkVOVEhFU0VTOlxuXHRcdFx0XHRcdGNhc2UgT1BFTlBBUkVOVEhFU0VTOiB7XG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXNlIE9QRU5CUkFDS0VUOiB7XG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gcGFkZGluZyArIGVsZW1lbnQgKyBuc2NvcGVhbHRcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgQ09MT046IHtcblx0XHRcdFx0XHRcdHN3aXRjaCAoZWxlbWVudC5jaGFyQ29kZUF0KDEpKjIgKyBlbGVtZW50LmNoYXJDb2RlQXQoMikqMykge1xuXHRcdFx0XHRcdFx0XHQvLyA6Z2xvYmFsXG5cdFx0XHRcdFx0XHRcdGNhc2UgNTMwOiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVzY2FwZSA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQgPSBwYWRkaW5nICsgZWxlbWVudC5zdWJzdHJpbmcoOCwgc2l6ZSAtIDEpXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQvLyA6aG92ZXIsIDpudGgtY2hpbGQoKSwgLi4uXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaiA8IDEgfHwgZWxlbWVudHNbai0xXS5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbGVtZW50ID0gcGFkZGluZyArIG5zY29wZWFsdCArIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgQ09NTUE6IHtcblx0XHRcdFx0XHRcdHBhZGRpbmcgPSAnJ1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRpZiAoc2l6ZSA+IDEgJiYgZWxlbWVudC5pbmRleE9mKCc6JykgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQgPSBwYWRkaW5nICsgZWxlbWVudC5yZXBsYWNlKHBzZXVkb3B0biwgJyQxJyArIG5zY29wZWFsdCArICckMicpXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50ID0gcGFkZGluZyArIGVsZW1lbnQgKyBuc2NvcGVhbHRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRvdXQgKz0gZWxlbWVudFxuXHRcdFx0fVxuXG5cdFx0XHRzZWxlY3RvcltpXSA9IG91dC5yZXBsYWNlKGZvcm1hdHB0biwgJycpLnRyaW0oKVxuXHRcdH1cblxuXHRcdHJldHVybiBzZWxlY3RvclxuXHR9XG5cblx0LyoqXG5cdCAqIFByb3h5XG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjb250ZXh0XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG5cdCAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gc2VsZWN0b3JzXG5cdCAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gcGFyZW50c1xuXHQgKiBAcGFyYW0ge251bWJlcn0gbGluZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcblx0ICogQHBhcmFtIHtudW1iZXJ9IGlkXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aFxuXHQgKiBAcmV0dXJuIHsoc3RyaW5nfHZvaWR8Kil9XG5cdCAqL1xuXHRmdW5jdGlvbiBwcm94eSAoY29udGV4dCwgY29udGVudCwgc2VsZWN0b3JzLCBwYXJlbnRzLCBsaW5lLCBjb2x1bW4sIGxlbmd0aCwgaWQsIGRlcHRoKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIG91dCA9IGNvbnRlbnQsIG5leHQ7IGkgPCBwbHVnZ2VkOyArK2kpIHtcblx0XHRcdHN3aXRjaCAobmV4dCA9IHBsdWdpbnNbaV0uY2FsbChzdHlsaXMsIGNvbnRleHQsIG91dCwgc2VsZWN0b3JzLCBwYXJlbnRzLCBsaW5lLCBjb2x1bW4sIGxlbmd0aCwgaWQsIGRlcHRoKSkge1xuXHRcdFx0XHRjYXNlIHZvaWQgMDpcblx0XHRcdFx0Y2FzZSBmYWxzZTpcblx0XHRcdFx0Y2FzZSB0cnVlOlxuXHRcdFx0XHRjYXNlIG51bGw6IHtcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRvdXQgPSBuZXh0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRzd2l0Y2ggKG91dCkge1xuXHRcdFx0Y2FzZSB2b2lkIDA6XG5cdFx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0Y2FzZSB0cnVlOlxuXHRcdFx0Y2FzZSBudWxsOlxuXHRcdFx0Y2FzZSBjb250ZW50OiB7XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdHJldHVybiBvdXRcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTWluaWZ5XG5cdCAqXG5cdCAqIEBwYXJhbSB7KHN0cmluZ3wqKX0gb3V0cHV0XG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIG1pbmlmeSAob3V0cHV0KSB7XG5cdFx0cmV0dXJuIG91dHB1dFxuXHRcdFx0LnJlcGxhY2UoZm9ybWF0cHRuLCAnJylcblx0XHRcdC5yZXBsYWNlKGJlZm9yZXB0biwgJycpXG5cdFx0XHQucmVwbGFjZShhZnRlcnB0biwgJyQxJylcblx0XHRcdC5yZXBsYWNlKHRhaWxwdG4sICckMScpXG5cdFx0XHQucmVwbGFjZSh3aGl0ZXB0biwgJyAnKVxuXHR9XG5cblx0LyoqXG5cdCAqIFVzZVxuXHQgKlxuXHQgKiBAcGFyYW0geyhBcnJheTxmdW5jdGlvbiguLi4/KT58ZnVuY3Rpb24oLi4uPyl8bnVtYmVyfHZvaWQpP30gcGx1Z2luXG5cdCAqL1xuXHRmdW5jdGlvbiB1c2UgKHBsdWdpbikge1xuXHRcdHN3aXRjaCAocGx1Z2luKSB7XG5cdFx0XHRjYXNlIHZvaWQgMDpcblx0XHRcdGNhc2UgbnVsbDoge1xuXHRcdFx0XHRwbHVnZ2VkID0gcGx1Z2lucy5sZW5ndGggPSAwXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdHN3aXRjaCAocGx1Z2luLmNvbnN0cnVjdG9yKSB7XG5cdFx0XHRcdFx0Y2FzZSBBcnJheToge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHBsdWdpbi5sZW5ndGg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdFx0XHRcdFx0XHR1c2UocGx1Z2luW2ldKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FzZSBGdW5jdGlvbjoge1xuXHRcdFx0XHRcdFx0cGx1Z2luc1twbHVnZ2VkKytdID0gcGx1Z2luXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXNlIEJvb2xlYW46IHtcblx0XHRcdFx0XHRcdHVua3duID0gISFwbHVnaW58MFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHVzZVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldFxuXHQgKlxuXHQgKiBAcGFyYW0geyp9IG9wdGlvbnNcblx0ICovXG5cdGZ1bmN0aW9uIHNldCAob3B0aW9ucykge1xuXHRcdGZvciAodmFyIG5hbWUgaW4gb3B0aW9ucykge1xuXHRcdFx0dmFyIHZhbHVlID0gb3B0aW9uc1tuYW1lXVxuXHRcdFx0c3dpdGNoIChuYW1lKSB7XG5cdFx0XHRcdGNhc2UgJ2tleWZyYW1lJzoga2V5ZWQgPSB2YWx1ZXwwOyBicmVha1xuXHRcdFx0XHRjYXNlICdnbG9iYWwnOiBlc2NhcGUgPSB2YWx1ZXwwOyBicmVha1xuXHRcdFx0XHRjYXNlICdjYXNjYWRlJzogY2FzY2FkZSA9IHZhbHVlfDA7IGJyZWFrXG5cdFx0XHRcdGNhc2UgJ2NvbXByZXNzJzogY29tcHJlc3MgPSB2YWx1ZXwwOyBicmVha1xuXHRcdFx0XHRjYXNlICdzZW1pY29sb24nOiBzZW1pY29sb24gPSB2YWx1ZXwwOyBicmVha1xuXHRcdFx0XHRjYXNlICdwcmVzZXJ2ZSc6IHByZXNlcnZlID0gdmFsdWV8MDsgYnJlYWtcblx0XHRcdFx0Y2FzZSAncHJlZml4Jzpcblx0XHRcdFx0XHRzaG91bGQgPSBudWxsXG5cblx0XHRcdFx0XHRpZiAoIXZhbHVlKSB7XG5cdFx0XHRcdFx0XHRwcmVmaXggPSAwXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdHByZWZpeCA9IDFcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cHJlZml4ID0gMlxuXHRcdFx0XHRcdFx0c2hvdWxkID0gdmFsdWVcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldFxuXHR9XG5cblx0LyoqXG5cdCAqIFN0eWxpc1xuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3Jcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlucHV0XG5cdCAqIEByZXR1cm4geyp9XG5cdCAqL1xuXHRmdW5jdGlvbiBzdHlsaXMgKHNlbGVjdG9yLCBpbnB1dCkge1xuXHRcdGlmICh0aGlzICE9PSB2b2lkIDAgJiYgdGhpcy5jb25zdHJ1Y3RvciA9PT0gc3R5bGlzKSB7XG5cdFx0XHRyZXR1cm4gZmFjdG9yeShzZWxlY3Rvcilcblx0XHR9XG5cblx0XHQvLyBzZXR1cFxuXHRcdHZhciBucyA9IHNlbGVjdG9yXG5cdFx0dmFyIGNvZGUgPSBucy5jaGFyQ29kZUF0KDApXG5cblx0XHQvLyB0cmltIGxlYWRpbmcgd2hpdGVzcGFjZVxuXHRcdGlmIChjb2RlIDwgMzMpIHtcblx0XHRcdGNvZGUgPSAobnMgPSBucy50cmltKCkpLmNoYXJDb2RlQXQoMClcblx0XHR9XG5cblx0XHQvLyBrZXlmcmFtZS9hbmltYXRpb24gbmFtZXNwYWNlXG5cdFx0aWYgKGtleWVkID4gMCkge1xuXHRcdFx0a2V5ID0gbnMucmVwbGFjZShpbnZhbGlkcHRuLCBjb2RlID09PSBPUEVOQlJBQ0tFVCA/ICcnIDogJy0nKVxuXHRcdH1cblxuXHRcdC8vIHJlc2V0LCB1c2VkIHRvIGFzc2VydCBpZiBhIHBsdWdpbiBpcyBtb25la3ktcGF0Y2hpbmcgdGhlIHJldHVybiB2YWx1ZVxuXHRcdGNvZGUgPSAxXG5cblx0XHQvLyBjYXNjYWRlL2lzb2xhdGVcblx0XHRpZiAoY2FzY2FkZSA9PT0gMSkge1xuXHRcdFx0bnNjb3BlID0gbnNcblx0XHR9IGVsc2Uge1xuXHRcdFx0bnNjb3BlYWx0ID0gbnNcblx0XHR9XG5cblx0XHR2YXIgc2VsZWN0b3JzID0gW25zY29wZV1cblx0XHR2YXIgcmVzdWx0XG5cblx0XHQvLyBleGVjdXRlIHBsdWdpbnMsIHByZS1wcm9jZXNzIGNvbnRleHRcblx0XHRpZiAocGx1Z2dlZCA+IDApIHtcblx0XHRcdHJlc3VsdCA9IHByb3h5KFBSRVBTLCBpbnB1dCwgc2VsZWN0b3JzLCBzZWxlY3RvcnMsIGxpbmUsIGNvbHVtbiwgMCwgMCwgMClcblxuXHRcdFx0aWYgKHJlc3VsdCAhPT0gdm9pZCAwICYmIHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGlucHV0ID0gcmVzdWx0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gYnVpbGRcblx0XHR2YXIgb3V0cHV0ID0gY29tcGlsZShhcnJheSwgc2VsZWN0b3JzLCBpbnB1dCwgMCwgMClcblxuXHRcdC8vIGV4ZWN1dGUgcGx1Z2lucywgcG9zdC1wcm9jZXNzIGNvbnRleHRcblx0XHRpZiAocGx1Z2dlZCA+IDApIHtcblx0XHRcdHJlc3VsdCA9IHByb3h5KFBPU1RTLCBvdXRwdXQsIHNlbGVjdG9ycywgc2VsZWN0b3JzLCBsaW5lLCBjb2x1bW4sIG91dHB1dC5sZW5ndGgsIDAsIDApXG5cblx0XHRcdC8vIGJ5cGFzcyBtaW5pZmljYXRpb25cblx0XHRcdGlmIChyZXN1bHQgIT09IHZvaWQgMCAmJiB0eXBlb2Yob3V0cHV0ID0gcmVzdWx0KSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Y29kZSA9IDBcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyByZXNldFxuXHRcdGtleSA9ICcnXG5cdFx0bnNjb3BlID0gJydcblx0XHRuc2NvcGVhbHQgPSAnJ1xuXHRcdHBhdHRlcm4gPSAwXG5cdFx0bGluZSA9IDFcblx0XHRjb2x1bW4gPSAxXG5cblx0XHRyZXR1cm4gY29tcHJlc3MqY29kZSA9PT0gMCA/IG91dHB1dCA6IG1pbmlmeShvdXRwdXQpXG5cdH1cblxuXHRzdHlsaXNbJ3VzZSddID0gdXNlXG5cdHN0eWxpc1snc2V0J10gPSBzZXRcblxuXHRpZiAob3B0aW9ucyAhPT0gdm9pZCAwKSB7XG5cdFx0c2V0KG9wdGlvbnMpXG5cdH1cblxuXHRyZXR1cm4gc3R5bGlzXG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsaXMvc3R5bGlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzOThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDUiLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSRUFDVF9TVEFUSUNTID0ge1xuICAgIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIG1peGluczogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgbmFtZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHRydWUsXG4gICAgcHJvdG90eXBlOiB0cnVlLFxuICAgIGNhbGxlcjogdHJ1ZSxcbiAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgYXJpdHk6IHRydWVcbn07XG5cbnZhciBpc0dldE93blByb3BlcnR5U3ltYm9sc0F2YWlsYWJsZSA9IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBjdXN0b21TdGF0aWNzKSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7IC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNHZXRPd25Qcm9wZXJ0eVN5bWJvbHNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoIVJFQUNUX1NUQVRJQ1Nba2V5c1tpXV0gJiYgIUtOT1dOX1NUQVRJQ1Nba2V5c1tpXV0gJiYgKCFjdXN0b21TdGF0aWNzIHx8ICFjdXN0b21TdGF0aWNzW2tleXNbaV1dKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENvbXBvbmVudFtrZXlzW2ldXSA9IHNvdXJjZUNvbXBvbmVudFtrZXlzW2ldXTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZWQtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgNSIsImltcG9ydCB7IGNzcyB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJ1xuXG5pbXBvcnQgeyBXSURFX1dJRFRILCBOT1JNQUxfV0lEVEggfSBmcm9tICcuLi9jb21wb25lbnRzL0NvbnRhaW5lcidcblxuZXhwb3J0IGNvbnN0IG1vYmlsZSA9IGlubmVyID0+IGNzc2BcbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7V0lERV9XSURUSH1weCkge1xuICAgICR7aW5uZXJ9O1xuICB9XG5gXG5cbmV4cG9ydCBjb25zdCBwaG9uZSA9IGlubmVyID0+IGNzc2BcbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7Tk9STUFMX1dJRFRIfXB4KSB7XG4gICAgJHtpbm5lcn07XG4gIH1cbmBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL21lZGlhLmpzIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcblxuaW1wb3J0IHsgcmVtIH0gZnJvbSAnLi4vdXRpbHMvcmVtJ1xuXG5leHBvcnQgY29uc3QgV0lERV9XSURUSCA9IDEyMDBcbmV4cG9ydCBjb25zdCBOT1JNQUxfV0lEVEggPSA5MDBcbmV4cG9ydCBjb25zdCBTSURFX1BBRERJTkdTID0gMjVcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgbWF4LXdpZHRoOiAke3AgPT4gKHAud2lkZSA/IHJlbShXSURFX1dJRFRIKSA6IHJlbShOT1JNQUxfV0lEVEgpKX07XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiAwICR7U0lERV9QQURESU5HU31weDtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG5gXG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9Db250YWluZXIuanMiLCJleHBvcnQgY29uc3QgQ29ybmVySGFuZGxlID0gKCkgPT4gKFxuICA8c3ZnIHdpZHRoPVwiMTEyXCIgaGVpZ2h0PVwiNTJcIiB2aWV3Qm94PVwiMCAwIDExMiA1MlwiPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiI0VERURFRFwiXG4gICAgICBmaWxsUnVsZT1cImV2ZW5vZGRcIlxuICAgICAgZD1cIk0xMDQuNSA0NC41VjBoN3Y1MS41SDB2LTdoMTA0LjV6XCJcbiAgICAvPlxuICA8L3N2Zz5cbilcblxuZXhwb3J0IGNvbnN0IExvZ29UeXBlID0gKCkgPT4gKFxuICA8c3ZnIHdpZHRoPVwiMTkyXCIgaGVpZ2h0PVwiNTRcIiB2aWV3Qm94PVwiMCAwIDE5MiA1NFwiPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiIzQ3NDc0N1wiXG4gICAgICBmaWxsUnVsZT1cImV2ZW5vZGRcIlxuICAgICAgZD1cIk00NC42IDUzYy0yLjggMC00LjItLjgtNC4yLTIuM1YyLjJDNDAuNC43IDQxLjggMCA0NC42IDBoMmMyLjcgMCA0LjEuNyA0LjEgMi4ydjE4LjJhMTQgMTQgMCAwIDEgNC4zLTMuNSAxMiAxMiAwIDAgMSA1LjYtMS4zYzMuNiAwIDYuMiAxIDggMi44IDEuNyAxLjggMi42IDQuNyAyLjYgOC42djIzLjdjMCAxLjUtMS40IDIuMi00LjIgMi4yaC0yYy0yLjggMC00LjItLjctNC4yLTIuMlYyOC41YzAtMi45LTEuNS00LjQtNC41LTQuNGE1IDUgMCAwIDAtMy4zIDEuM2MtMSAuOC0xLjcgMS43LTIuMyAyLjh2MjIuNWMwIDEuNS0xLjQgMi4yLTQuMiAyLjJoLTJ6bS0yNy4yIDBjLTIuOCAwLTQuMi0uOC00LjItMi4zVjEyLjlIMi4xYy0uNyAwLTEuMy0uMi0xLjYtLjgtLjMtLjUtLjUtMS40LS41LTIuN1Y3LjNDMCA2IC4yIDUuMi41IDQuNmMuMy0uNS45LS44IDEuNi0uOGgzMy4xYy44IDAgMS4zLjMgMS42LjguMy42LjUgMS41LjUgMi43djIuMWMwIDEuMy0uMiAyLjItLjUgMi43LS4zLjYtLjguOC0xLjYuOEgyNC4xdjM3LjhjMCAxLjUtMS40IDIuMi00LjIgMi4yaC0yLjV6bTYzLjMtNC42YzMgMy4zIDcuNiA1IDEzLjcgNUEyOS4yIDI5LjIgMCAwIDAgMTA1IDUxYzEuNC0uOCAyLjEtMS43IDIuMS0yLjggMC0uNS0uMi0xLjEtLjYtMi0uNC0uOC0uOC0xLjYtMS41LTIuMy0uNS0uNy0xLTEtMS41LTFsLTEuNS41YTQyIDQyIDAgMCAxLTMuNCAxLjJjLTEgLjMtMi4zLjQtMy42LjQtMi40IDAtNC4zLS41LTUuNi0xLjYtMS40LTEuMS0yLjItMy0yLjQtNS43aDE3LjhjLjUgMCAxLjItLjUgMi4xLTEuNiAxLTEuMSAxLjUtMiAxLjUtMi41IDAtNS40LTEuMi05LjctMy43LTEzLTIuNC0zLjQtNi4yLTUtMTEuNC01LTUuMyAwLTkuNSAxLjQtMTIuNSA0LjVzLTQuNSA4LTQuNSAxNC41YzAgNS45IDEuNSAxMC40IDQuNSAxMy43ek05NyAyNS44Yy44IDEuMiAxLjIgMyAxLjIgNUg4N2MuNy00LjYgMi44LTcgNi4zLTcgMS43IDAgMyAuNyAzLjggMnptMjAuNCAyNy4xYy0yLjggMC00LjItLjctNC4yLTIuMlYyOC41YTM5IDM5IDAgMCAwLS42LTguNGMtLjItLjctLjItMS4yLS4yLTEuNSAwLS43IDEtMS4zIDIuOC0xLjcgMS45LS4zIDMuNi0uNSA1LS41LjkgMCAxLjQuMyAxLjggMWwuNyAyIC4zIDEuNWMuOS0xLjYgMi0yLjkgMy0zLjhhNyA3IDAgMCAxIDQuNi0xLjVjMS41IDAgMi42LjQgMy4xIDEuMmE0IDQgMCAwIDEgMSAyLjZjMCAxLS4zIDIuMi0uNyAzLjctLjQgMS40LTEgMi4yLTEuNSAyLjJMMTMxIDI1bC0xLjgtLjNjLTEuMyAwLTIuNC40LTMuNCAxLjFhOSA5IDAgMCAwLTIuMiAyLjR2MjIuNWMwIDEuNS0xLjQgMi4yLTQuMiAyLjJoLTJ6bTIyLjQtNC41YzMgMy4zIDcuNyA1IDEzLjggNUEyOS4yIDI5LjIgMCAwIDAgMTY0IDUxYzEuNS0uOCAyLjItMS43IDIuMi0yLjggMC0uNS0uMi0xLjEtLjYtMi0uNC0uOC0uOS0xLjYtMS41LTIuMy0uNS0uNy0xLTEtMS41LTFsLTEuNi41LTMuMyAxLjJjLTEuMS4zLTIuMy40LTMuNi40LTIuNCAwLTQuMy0uNS01LjctMS42LTEuMy0xLjEtMi4xLTMtMi4zLTUuN2gxNy44Yy41IDAgMS4yLS41IDIuMS0xLjYgMS0xLjEgMS41LTIgMS41LTIuNSAwLTUuNC0xLjMtOS43LTMuNy0xMy0yLjUtMy40LTYuMy01LTExLjQtNS01LjQgMC05LjUgMS40LTEyLjYgNC41LTMgMy4xLTQuNSA4LTQuNSAxNC41IDAgNS45IDEuNSAxMC40IDQuNSAxMy43em0xNi4zLTIyLjZjLjkgMS4yIDEuMyAzIDEuMyA1aC0xMS4zYy43LTQuNiAyLjgtNyA2LjMtNyAxLjYgMCAyLjkuNyAzLjcgMnptMjguNS0xMmMuMi4yLjQuMy43LjNoLjRjLjMgMCAuNSAwIC43LS4zbDItMy41YzAtLjMuMi0uNS4zLS42djYuNmMwIC4zLjQuNSAxIC41aC41Yy42IDAgMS0uMiAxLS41VjYuMWMwLS40LS40LS42LTEtLjZoLS45Yy0uNSAwLS44LjItMSAuNWwtMi43IDQuNy0uMS4zLS4yLS4zLTIuNi00LjdjLS4yLS4zLS41LS41LTEtLjVoLS45Yy0uNiAwLTEgLjItMSAuNnYxMC4yYzAgLjMuNC41IDEgLjVoLjVjLjYgMCAxLS4yIDEtLjVWOS43bC4zLjYgMiAzLjV6bS0xMSAyLjVjMCAuMy4zLjUgMSAuNWguNWMuNyAwIDEtLjIgMS0uNVY3LjdoMi41Yy4yIDAgLjMgMCAuNC0uMmwuMS0uNnYtLjVsLS4xLS42YzAtLjItLjItLjItLjQtLjJIMTcxYy0uMSAwLS4yIDAtLjMuMmwtLjEuNnYxLjFsLjQuMmgyLjZ2OC42elwiXG4gICAgLz5cbiAgPC9zdmc+XG4pXG5cbmV4cG9ydCBjb25zdCBDaXJjbGUgPSAoKSA9PiAoXG4gIDxzdmcgd2lkdGg9XCI0NVwiIGhlaWdodD1cIjQ1XCIgdmlld0JveD1cIjAgMCA0NSA0NVwiPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiIzc4RUZGRlwiXG4gICAgICBkPVwiTTQ1IDIyLjVhMjIuNSAyMi41IDAgMSAxLTQ1IDAgMjIuNSAyMi41IDAgMCAxIDQ1IDB6XCJcbiAgICAvPlxuICA8L3N2Zz5cbilcblxuZXhwb3J0IGNvbnN0IFJlY3QgPSAoKSA9PiAoXG4gIDxzdmcgd2lkdGg9XCIyMlwiIGhlaWdodD1cIjQ0XCI+XG4gICAgPHBhdGggZmlsbD1cIiNGQUVBNUFcIiBkPVwiTTAgMGgyMnY0NEgwVjB6XCIgLz5cbiAgPC9zdmc+XG4pXG5cbmV4cG9ydCBjb25zdCBUcmlhbmdsZSA9ICgpID0+IChcbiAgPHN2ZyB3aWR0aD1cIjUyXCIgaGVpZ2h0PVwiNDVcIj5cbiAgICA8cGF0aCBmaWxsPVwiI0ZGQkQ3MFwiIGQ9XCJNMzAgMGwyNiA0NUg0TDMwIDB6XCIgLz5cbiAgPC9zdmc+XG4pXG5cbmV4cG9ydCBjb25zdCBTbGFjayA9ICgpID0+IChcbiAgPHN2ZyB3aWR0aD1cIjY2XCIgaGVpZ2h0PVwiNjZcIj5cbiAgICA8cGF0aFxuICAgICAgZmlsbD1cIiMyRDMzM0FcIlxuICAgICAgdHJhbnNmb3JtPVwicm90YXRlKC0xOC41IDEwNi41IC02OC4yKVwiXG4gICAgICBkPVwiTTkuMyAwSDB2OWg5LjNWMHpcIlxuICAgIC8+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjMkQzMzNBXCJcbiAgICAgIGQ9XCJNNjMuMiAyNEM1Ni40IDEuMSA0Ni42LTQgMjQgMi43IDEuMiA5LjYtNCAxOS40IDIuOCA0MiA5LjYgNjQuOCAxOS40IDcwIDQyIDYzLjIgNjQuOCA1Ni40IDcwIDQ2LjYgNjMuMiAyNHpNNTEuOCAzOC41bC00LjMgMS41IDEuNSA0LjRjLjYgMS44LS40IDMuNy0yLjIgNC4zYTMuNSAzLjUgMCAwIDEtNC4zLTIuMkw0MSA0Mi4zbC04LjggMyAxLjUgNC40Yy42IDEuOC0uNCAzLjgtMi4yIDQuM2EzLjUgMy41IDAgMCAxLTQuMy0yLjJsLTEuNS00LjMtNC4zIDEuNGEzLjUgMy41IDAgMCAxLTQuMy0yLjJjLS42LTEuOC40LTMuNyAyLjItNC4zbDQuMy0xLjQtMi45LTguNS00LjMgMS40YTMuNSAzLjUgMCAwIDEtNC4zLTIuMmMtLjYtMS44LjQtMy43IDIuMi00LjNsNC4yLTEuNC0xLjQtNC41YTMuNCAzLjQgMCAwIDEgNi41LTIuMWwxLjQgNC40IDguOC0zLTEuNC00LjRhMy40IDMuNCAwIDAgMSA2LjUtMi4xbDEuNCA0LjQgNC4zLTEuNGEzLjQgMy40IDAgMCAxIDIuMiA2LjVMNDIuNSAyNWwyLjggOC41IDQuMy0xLjRhMy40IDMuNCAwIDAgMSAyLjIgNi40elwiXG4gICAgLz5cbiAgPC9zdmc+XG4pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL1N2Z3MuanMiLCJpbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5cbmltcG9ydCB0aGVtZSBmcm9tICcuLi91dGlscy90aGVtZSdcbmltcG9ydCBIZXJvIGZyb20gJy4uL3NlY3Rpb25zL0hlcm8nXG5pbXBvcnQgUXVvdGUgZnJvbSAnLi4vc2VjdGlvbnMvUXVvdGUnXG5pbXBvcnQgRmVhdHVyZXMgZnJvbSAnLi4vc2VjdGlvbnMvRmVhdHVyZXMnXG5pbXBvcnQgSXNJdFJlYWR5IGZyb20gJy4uL3NlY3Rpb25zL0lzSXRSZWFkeSdcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKFxuICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgIDxkaXY+XG4gICAgICA8SGVybyAvPlxuICAgICAgPFF1b3RlIC8+XG4gICAgICA8RmVhdHVyZXMgLz5cbiAgICAgIDxJc0l0UmVhZHkgLz5cbiAgICA8L2Rpdj5cbiAgPC9UaGVtZVByb3ZpZGVyPlxuKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXM/ZW50cnkiLCJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbG9yczoge1xuICAgIGdyZXlUZXh0OiAnIzc3NycsXG4gICAgbXV0ZWRUZXh0OiAnI0IzQjNCMycsXG4gICAgZGFya1RleHQ6ICcjNDQ0JyxcbiAgICBsaWdodEdyZWVuOiAnI0RERThEOCcsXG4gICAgZ3JlZW46ICcjNDRDMjg1JyxcbiAgfSxcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3RoZW1lLmpzIiwiaW1wb3J0IHN0eWxlZCwgeyBjc3MgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcbmltcG9ydCB7IGRhcmtlbiB9IGZyb20gJ3BvbGlzaGVkJ1xuXG5pbXBvcnQgeyBtb2JpbGUsIHBob25lIH0gZnJvbSAnLi4vdXRpbHMvbWVkaWEnXG5pbXBvcnQgeyBXSURFX1dJRFRILCBTSURFX1BBRERJTkdTIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Db250YWluZXInXG5pbXBvcnQgQXBwU2NyZWVuc2hvdCBmcm9tICcuLi9jb21wb25lbnRzL0FwcFNjcmVlbnNob3QnXG5pbXBvcnQgeyBMb2dvVHlwZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvU3ZncydcblxuY29uc3QgSGVybyA9ICgpID0+IChcbiAgPFdyYXBwZXI+XG4gICAgPENvbnRlbnRXcmFwcGVyPlxuICAgICAgPFBob3RvPlxuICAgICAgICA8QXBwU2NyZWVuc2hvdCAvPlxuICAgICAgPC9QaG90bz5cbiAgICAgIDxUZXh0cyAvPlxuICAgIDwvQ29udGVudFdyYXBwZXI+XG4gIDwvV3JhcHBlcj5cbilcblxuZXhwb3J0IGRlZmF1bHQgSGVyb1xuXG5jb25zdCBUZXh0cyA9ICgpID0+IChcbiAgPFRleHRzV3JhcHBlcj5cbiAgICA8SWNvbkltYWdlIHNyYz1cIi9zdGF0aWMvdGhlcmUtaWNvbi5zdmdcIiBhbHQ9XCJUaGVyZeKEoiBhcHBcIiAvPlxuICAgIDxMb2dvVHlwZVdyYXBwZXI+XG4gICAgICA8TG9nb1R5cGUgLz5cbiAgICA8L0xvZ29UeXBlV3JhcHBlcj5cbiAgICA8RGVzY3JpcHRpb24+WW91ciBmcmllbmRzICYgdGVhbW1hdGVzJyB0aW1lPyBBaCwgVGhlcmUhPC9EZXNjcmlwdGlvbj5cbiAgICA8RG93bmxvYWRTZWN0aW9uPlxuICAgICAgPERvd25sb2FkQnV0dG9uPkRvd25sb2FkPC9Eb3dubG9hZEJ1dHRvbj5cbiAgICAgIDxEb3dubG9hZE5vdGVzPkF2YWlsYWJsZSBmb3IgbWFjT1MsIG90aGVyIHBsYXRmb3JtcyBzb29uITwvRG93bmxvYWROb3Rlcz5cbiAgICA8L0Rvd25sb2FkU2VjdGlvbj5cbiAgPC9UZXh0c1dyYXBwZXI+XG4pXG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuaGVhZGVyYFxuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciBtaW5tYXgoYXV0bywgJHtXSURFX1dJRFRIfXB4KSAxZnI7XG5cbiAgcGFkZGluZy10b3A6IDcwcHg7XG5cbiAgJHtwaG9uZShjc3NgXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIGApfTtcbmBcblxuY29uc3QgQ29udGVudFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBncmlkLWNvbHVtbjogMSAvIDM7XG4gIGRpc3BsYXk6IGZsZXg7XG5cbiAgJHtwaG9uZShjc3NgXG4gICAgZ3JpZC1jb2x1bW46IDE7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYCl9O1xuYFxuXG5jb25zdCBQaG90byA9IHN0eWxlZC5kaXZgXG4gIGZsZXg6IDAgMSBhdXRvO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICBwYWRkaW5nLXJpZ2h0OiA4MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG5cbiAgJHttb2JpbGUoY3NzYFxuICAgIHBhZGRpbmctcmlnaHQ6IDUwcHg7XG4gIGApfTtcblxuICAke3Bob25lKGNzc2BcbiAgICBvcmRlcjogMjtcbiAgICBwYWRkaW5nOiAxNXB4IDA7IC8qIGZvciBncmV5IGJvcmRlcnMgKi9cbiAgICBtYXJnaW4tdG9wOiA5MHB4O1xuICBgKX07XG5gXG5cbmNvbnN0IFRleHRzV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGZsZXg6IDEgMCAzMjBweDtcbiAgcGFkZGluZy10b3A6IDgwcHg7XG5cbiAgJHttb2JpbGUoY3NzYFxuICAgIHBhZGRpbmctdG9wOiA0MHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDQwcHg7XG4gIGApfTtcblxuICAke3Bob25lKGNzc2BcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA0MHB4O1xuICAgIHBhZGRpbmctbGVmdDogJHtTSURFX1BBRERJTkdTfXB4O1xuICBgKX07XG5gXG5cbmNvbnN0IEljb25JbWFnZSA9IHN0eWxlZC5pbWdgXG4gIGRpc3BsYXk6IGJsb2NrO1xuYFxuXG5jb25zdCBMb2dvVHlwZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tdG9wOiA0MHB4O1xuXG4gICR7cGhvbmUoY3NzYFxuICAgIG1hcmdpbi10b3A6IDMwcHg7XG4gIGApfTtcbmBcblxuY29uc3QgRGVzY3JpcHRpb24gPSBzdHlsZWQucGBcbiAgbWFyZ2luOiAyNXB4IDAgMCAwO1xuICBjb2xvcjogJHtwID0+IHAudGhlbWUuY29sb3JzLmdyZXlUZXh0fTtcblxuICAke3Bob25lKGNzc2BcbiAgICBtYXJnaW46IDIwcHggMCAwIDA7XG4gIGApfTtcbmBcblxuY29uc3QgRG93bmxvYWRTZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLXRvcDogNzBweDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICR7cGhvbmUoY3NzYFxuICAgIG1hcmdpbi10b3A6IDUwcHg7XG4gIGApfTtcbmBcblxuY29uc3QgRG93bmxvYWRCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICBmbGV4OiAwIDAgYXV0bztcbiAgcGFkZGluZzogMTBweCAxN3B4O1xuXG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDEuMnB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuXG4gIGJhY2tncm91bmQ6ICR7cCA9PiBwLnRoZW1lLmNvbG9ycy5saWdodEdyZWVufTtcbiAgY29sb3I6ICR7cCA9PiBwLnRoZW1lLmNvbG9ycy5ncmVlbn07XG4gIGJvcmRlcjogbm9uZTtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3AgPT4gZGFya2VuKDAuMSwgcC50aGVtZS5jb2xvcnMubGlnaHRHcmVlbil9O1xuICB9XG5gXG5cbmNvbnN0IERvd25sb2FkTm90ZXMgPSBzdHlsZWQucGBcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW46IDAgMCAwIDEwcHg7XG4gIGNvbG9yOiAke3AgPT4gcC50aGVtZS5jb2xvcnMubXV0ZWRUZXh0fTtcbmBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlY3Rpb25zL0hlcm8uanMiLCIvLyAgICAgIFxuXG4vLyBAcHJpdmF0ZVxuZnVuY3Rpb24gY2FwaXRhbGl6ZVN0cmluZyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbn1cblxuLy8gICAgICBcbnZhciBwb3NpdGlvbk1hcCA9IFsnVG9wJywgJ1JpZ2h0JywgJ0JvdHRvbScsICdMZWZ0J107XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUHJvcGVydHkocHJvcGVydHksIHBvc2l0aW9uKSB7XG4gIGlmICghcHJvcGVydHkpIHJldHVybiBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuICB2YXIgc3BsaXRQcm9wZXJ0eSA9IHByb3BlcnR5LnNwbGl0KCctJyk7XG4gIGlmIChzcGxpdFByb3BlcnR5Lmxlbmd0aCA+IDEpIHtcbiAgICBzcGxpdFByb3BlcnR5LnNwbGljZSgxLCAwLCBwb3NpdGlvbik7XG4gICAgcmV0dXJuIHNwbGl0UHJvcGVydHkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHZhbCkge1xuICAgICAgcmV0dXJuICcnICsgYWNjICsgY2FwaXRhbGl6ZVN0cmluZyh2YWwpO1xuICAgIH0pO1xuICB9XG4gIHZhciBqb2luZWRQcm9wZXJ0eSA9IHByb3BlcnR5LnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMScgKyBwb3NpdGlvbiArICckMicpO1xuICByZXR1cm4gcHJvcGVydHkgPT09IGpvaW5lZFByb3BlcnR5ID8gJycgKyBwcm9wZXJ0eSArIHBvc2l0aW9uIDogam9pbmVkUHJvcGVydHk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU3R5bGVzKHByb3BlcnR5LCB2YWx1ZXNXaXRoRGVmYXVsdHMpIHtcbiAgdmFyIHN0eWxlcyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlc1dpdGhEZWZhdWx0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh2YWx1ZXNXaXRoRGVmYXVsdHNbaV0gfHwgdmFsdWVzV2l0aERlZmF1bHRzW2ldID09PSAwKSB7XG4gICAgICBzdHlsZXNbZ2VuZXJhdGVQcm9wZXJ0eShwcm9wZXJ0eSwgcG9zaXRpb25NYXBbaV0pXSA9IHZhbHVlc1dpdGhEZWZhdWx0c1tpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuLyoqXG4gKiBBIGhlbHBlciB0aGF0IGVuYWJsZXMgc2hvcnRoYW5kIGZvciBkaXJlY3Rpb24gYmFzZWQgcHJvcGVydGllcy4gSXQgYWNjZXB0cyBhIHByb3BlcnR5IChoeXBoZW5hdGVkIG9yIGNhbWVsQ2FzZWQpIGFuZCB1cCB0byBmb3VyIHZhbHVlcyB0aGF0IG1hcCB0byB0b3AsIHJpZ2h0LCBib3R0b20sIGFuZCBsZWZ0LCByZXNwZWN0aXZlbHkuIFlvdSBjYW4gb3B0aW9uYWxseSBwYXNzIGFuIGVtcHR5IHN0cmluZyB0byBnZXQgb25seSB0aGUgZGlyZWN0aW9uYWwgdmFsdWVzIGFzIHByb3BlcnRpZXMuIFlvdSBjYW4gYWxzbyBvcHRpb25hbGx5IHBhc3MgYSBudWxsIGFyZ3VtZW50IGZvciBhIGRpcmVjdGlvbmFsIHZhbHVlIHRvIGlnbm9yZSBpdC5cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLmRpcmVjdGlvbmFsUHJvcGVydHkoJ3BhZGRpbmcnLCAnMTJweCcsICcyNHB4JywgJzM2cHgnLCAnNDhweCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7ZGlyZWN0aW9uYWxQcm9wZXJ0eSgncGFkZGluZycsICcxMnB4JywgJzI0cHgnLCAnMzZweCcsICc0OHB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGRpdiB7XG4gKiAgICdwYWRkaW5nVG9wJzogJzEycHgnLFxuICogICAncGFkZGluZ1JpZ2h0JzogJzI0cHgnLFxuICogICAncGFkZGluZ0JvdHRvbSc6ICczNnB4JyxcbiAqICAgJ3BhZGRpbmdMZWZ0JzogJzQ4cHgnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gZGlyZWN0aW9uYWxQcm9wZXJ0eShwcm9wZXJ0eSkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHZhbHVlc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICAvLyAgcHJldHRpZXItaWdub3JlXG4gIHZhciBmaXJzdFZhbHVlID0gdmFsdWVzWzBdLFxuICAgICAgX3ZhbHVlcyQgPSB2YWx1ZXNbMV0sXG4gICAgICBzZWNvbmRWYWx1ZSA9IF92YWx1ZXMkID09PSB1bmRlZmluZWQgPyBmaXJzdFZhbHVlIDogX3ZhbHVlcyQsXG4gICAgICBfdmFsdWVzJDIgPSB2YWx1ZXNbMl0sXG4gICAgICB0aGlyZFZhbHVlID0gX3ZhbHVlcyQyID09PSB1bmRlZmluZWQgPyBmaXJzdFZhbHVlIDogX3ZhbHVlcyQyLFxuICAgICAgX3ZhbHVlcyQzID0gdmFsdWVzWzNdLFxuICAgICAgZm91cnRoVmFsdWUgPSBfdmFsdWVzJDMgPT09IHVuZGVmaW5lZCA/IHNlY29uZFZhbHVlIDogX3ZhbHVlcyQzO1xuXG4gIHZhciB2YWx1ZXNXaXRoRGVmYXVsdHMgPSBbZmlyc3RWYWx1ZSwgc2Vjb25kVmFsdWUsIHRoaXJkVmFsdWUsIGZvdXJ0aFZhbHVlXTtcbiAgcmV0dXJuIGdlbmVyYXRlU3R5bGVzKHByb3BlcnR5LCB2YWx1ZXNXaXRoRGVmYXVsdHMpO1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIENoZWNrIGlmIGEgc3RyaW5nIGVuZHMgd2l0aCBzb21ldGhpbmdcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBlbmRzV2l0aCA9IGZ1bmN0aW9uIChzdHJpbmcsIHN1ZmZpeCkge1xuICByZXR1cm4gc3RyaW5nLnN1YnN0cigtc3VmZml4Lmxlbmd0aCkgPT09IHN1ZmZpeDtcbn07XG5cbi8vICAgICAgXG5cbi8qKlxuICogU3RyaXAgdGhlIHVuaXQgZnJvbSBhIGdpdmVuIENTUyB2YWx1ZSwgcmV0dXJuaW5nIGp1c3QgdGhlIG51bWJlci4gKG9yIHRoZSBvcmlnaW5hbCB2YWx1ZSBpZiBhbiBpbnZhbGlkIHN0cmluZyB3YXMgcGFzc2VkKVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgICctLWRpbWVuc2lvbic6IHN0cmlwVW5pdCgnMTAwcHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAtLWRpbWVuc2lvbjogJHtzdHJpcFVuaXQoJzEwMHB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICAnLS1kaW1lbnNpb24nOiAxMDBcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBzdHJpcFVuaXQodmFsdWUpIHtcbiAgdmFyIHVuaXRsZXNzVmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgaWYgKGlzTmFOKHVuaXRsZXNzVmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIHJldHVybiB1bml0bGVzc1ZhbHVlO1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHBpeGVsLXRvLXggY29udmVydGVyc1xuICogQHByaXZhdGVcbiAqL1xudmFyIHB4dG9GYWN0b3J5ID0gZnVuY3Rpb24gcHh0b0ZhY3RvcnkodG8pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChweHZhbCkge1xuICAgIHZhciBiYXNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnMTZweCc7XG5cbiAgICB2YXIgbmV3UHh2YWwgPSBweHZhbDtcbiAgICB2YXIgbmV3QmFzZSA9IGJhc2U7XG4gICAgaWYgKHR5cGVvZiBweHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghZW5kc1dpdGgocHh2YWwsICdweCcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgZW5kaW5nIGluIFwicHhcIiBvciBhIG51bWJlciBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvICcgKyB0byArICcoKSwgZ290IFwiJyArIHB4dmFsICsgJ1wiIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgICBuZXdQeHZhbCA9IHN0cmlwVW5pdChweHZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBiYXNlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKCFlbmRzV2l0aChiYXNlLCAncHgnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIGVuZGluZyBpbiBcInB4XCIgb3IgYSBudW1iZXIgcGFzc2VkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gJyArIHRvICsgJygpLCBnb3QgXCInICsgYmFzZSArICdcIiBpbnN0ZWFkLicpO1xuICAgICAgfVxuICAgICAgbmV3QmFzZSA9IHN0cmlwVW5pdChiYXNlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5ld1B4dmFsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgaW52YWxpZCBwaXhlbCB2YWx1ZSAoXCInICsgcHh2YWwgKyAnXCIpIHRvICcgKyB0byArICcoKSwgcGxlYXNlIHBhc3MgYSB2YWx1ZSBsaWtlIFwiMTJweFwiIG9yIDEyLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmV3QmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFzc2VkIGludmFsaWQgYmFzZSB2YWx1ZSAoXCInICsgYmFzZSArICdcIikgdG8gJyArIHRvICsgJygpLCBwbGVhc2UgcGFzcyBhIHZhbHVlIGxpa2UgXCIxMnB4XCIgb3IgMTIuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnICsgbmV3UHh2YWwgLyBuZXdCYXNlICsgdG87XG4gIH07XG59O1xuXG4vLyAgICAgIFxuLyoqXG4gKiBDb252ZXJ0IHBpeGVsIHZhbHVlIHRvIGVtcy4gVGhlIGRlZmF1bHQgYmFzZSB2YWx1ZSBpcyAxNnB4LCBidXQgY2FuIGJlIGNoYW5nZWQgYnkgcGFzc2luZyBhXG4gKiBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHB4dmFsXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtiYXNlPScxNnB4J11cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgICdoZWlnaHQnOiBlbSgnMTZweCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGhlaWdodDogJHtlbSgnMTZweCcpfVxuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqXG4gKiBlbGVtZW50IHtcbiAqICAgJ2hlaWdodCc6ICcxZW0nXG4gKiB9XG4gKi9cblxudmFyIGVtID0gLyojX19QVVJFX18qL3B4dG9GYWN0b3J5KCdlbScpO1xuXG4vLyAgICAgIFxuXG52YXIgcmF0aW9OYW1lcyA9IHtcbiAgbWlub3JTZWNvbmQ6IDEuMDY3LFxuICBtYWpvclNlY29uZDogMS4xMjUsXG4gIG1pbm9yVGhpcmQ6IDEuMixcbiAgbWFqb3JUaGlyZDogMS4yNSxcbiAgcGVyZmVjdEZvdXJ0aDogMS4zMzMsXG4gIGF1Z0ZvdXJ0aDogMS40MTQsXG4gIHBlcmZlY3RGaWZ0aDogMS41LFxuICBtaW5vclNpeHRoOiAxLjYsXG4gIGdvbGRlblNlY3Rpb246IDEuNjE4LFxuICBtYWpvclNpeHRoOiAxLjY2NyxcbiAgbWlub3JTZXZlbnRoOiAxLjc3OCxcbiAgbWFqb3JTZXZlbnRoOiAxLjg3NSxcbiAgb2N0YXZlOiAyLFxuICBtYWpvclRlbnRoOiAyLjUsXG4gIG1ham9yRWxldmVudGg6IDIuNjY3LFxuICBtYWpvclR3ZWxmdGg6IDMsXG4gIGRvdWJsZU9jdGF2ZTogNFxufTtcblxuLyoqICovXG5cbi8qKlxuICogRXN0YWJsaXNoIGNvbnNpc3RlbnQgbWVhc3VyZW1lbnRzIGFuZCBzcGFjaWFsIHJlbGF0aW9uc2hpcHMgdGhyb3VnaG91dCB5b3VyIHByb2plY3RzIGJ5IGluY3JlbWVudGluZyB1cCBvciBkb3duIGEgZGVmaW5lZCBzY2FsZS4gV2UgcHJvdmlkZSBhIGxpc3Qgb2YgY29tbW9ubHkgdXNlZCBzY2FsZXMgYXMgcHJlLWRlZmluZWQgdmFyaWFibGVzLCBzZWUgYmVsb3cuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAgLy8gSW5jcmVtZW50IHR3byBzdGVwcyB1cCB0aGUgZGVmYXVsdCBzY2FsZVxuICogICAnZm9udFNpemUnOiBtb2R1bGFyU2NhbGUoMilcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgIC8vIEluY3JlbWVudCB0d28gc3RlcHMgdXAgdGhlIGRlZmF1bHQgc2NhbGVcbiAqICAgZm9udFNpemU6ICR7bW9kdWxhclNjYWxlKDIpfVxuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqXG4gKiBlbGVtZW50IHtcbiAqICAgJ2ZvbnRTaXplJzogJzEuNzc2ODllbSdcbiAqIH1cbiAqL1xuZnVuY3Rpb24gbW9kdWxhclNjYWxlKHN0ZXBzKSB7XG4gIHZhciBiYXNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnMWVtJztcbiAgdmFyIHJhdGlvID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAncGVyZmVjdEZvdXJ0aCc7XG5cbiAgaWYgKHR5cGVvZiBzdGVwcyAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgbnVtYmVyIG9mIHN0ZXBzIHRvIHRoZSBtb2R1bGFyU2NhbGUgaGVscGVyLicpO1xuICB9XG4gIGlmICh0eXBlb2YgcmF0aW8gPT09ICdzdHJpbmcnICYmICFyYXRpb05hbWVzW3JhdGlvXSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHBhc3MgYSBudW1iZXIgb3Igb25lIG9mIHRoZSBwcmVkZWZpbmVkIHNjYWxlcyB0byB0aGUgbW9kdWxhclNjYWxlIGhlbHBlciBhcyB0aGUgcmF0aW8uJyk7XG4gIH1cblxuICB2YXIgcmVhbEJhc2UgPSB0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZycgPyBzdHJpcFVuaXQoYmFzZSkgOiBiYXNlO1xuICB2YXIgcmVhbFJhdGlvID0gdHlwZW9mIHJhdGlvID09PSAnc3RyaW5nJyA/IHJhdGlvTmFtZXNbcmF0aW9dIDogcmF0aW87XG5cbiAgaWYgKHR5cGVvZiByZWFsQmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgcGFzc2VkIGFzIGJhc2UgdG8gbW9kdWxhclNjYWxlLCBleHBlY3RlZCBudW1iZXIgb3IgZW0gc3RyaW5nIGJ1dCBnb3QgXCInICsgYmFzZSArICdcIicpO1xuICB9XG5cbiAgcmV0dXJuIHJlYWxCYXNlICogTWF0aC5wb3cocmVhbFJhdGlvLCBzdGVwcykgKyAnZW0nO1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIENvbnZlcnQgcGl4ZWwgdmFsdWUgdG8gcmVtcy4gVGhlIGRlZmF1bHQgYmFzZSB2YWx1ZSBpcyAxNnB4LCBidXQgY2FuIGJlIGNoYW5nZWQgYnkgcGFzc2luZyBhXG4gKiBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHB4dmFsXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtiYXNlPScxNnB4J11cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgICdoZWlnaHQnOiByZW0oJzE2cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBoZWlnaHQ6ICR7cmVtKCcxNnB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICAnaGVpZ2h0JzogJzFyZW0nXG4gKiB9XG4gKi9cblxudmFyIHJlbSA9IC8qI19fUFVSRV9fKi9weHRvRmFjdG9yeSgncmVtJyk7XG5cbi8vICAgICAgXG5cbi8qKlxuICogQ1NTIHRvIGNvbnRhaW4gYSBmbG9hdCAoY3JlZGl0IHRvIENTU01vam8pLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgICAuLi5jbGVhckZpeCgpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2NsZWFyRml4KCl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICcmOjphZnRlcic6IHtcbiAqICAgJ2NsZWFyJzogJ2JvdGgnLFxuICogICAnY29udGVudCc6ICdcIlwiJyxcbiAqICAgJ2Rpc3BsYXknOiAndGFibGUnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gY2xlYXJGaXgoKSB7XG4gIHZhciBfcmVmO1xuXG4gIHZhciBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcmJztcblxuICB2YXIgcHNldWRvU2VsZWN0b3IgPSBwYXJlbnQgKyAnOjphZnRlcic7XG4gIHJldHVybiBfcmVmID0ge30sIF9yZWZbcHNldWRvU2VsZWN0b3JdID0ge1xuICAgIGNsZWFyOiAnYm90aCcsXG4gICAgY29udGVudDogJ1wiXCInLFxuICAgIGRpc3BsYXk6ICd0YWJsZSdcbiAgfSwgX3JlZjtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDU1MgdG8gcmVwcmVzZW50IHRydW5jYXRlZCB0ZXh0IHdpdGggYW4gZWxsaXBzaXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4uZWxsaXBzaXMoJzI1MHB4JylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtlbGxpcHNpcygnMjUwcHgnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2OiB7XG4gKiAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXG4gKiAgICdtYXhXaWR0aCc6ICcyNTBweCcsXG4gKiAgICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxuICogICAndGV4dE92ZXJmbG93JzogJ2VsbGlwc2lzJyxcbiAqICAgJ3doaXRlU3BhY2UnOiAnbm93cmFwJyxcbiAqICAgJ3dvcmRXcmFwJzogJ25vcm1hbCdcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBlbGxpcHNpcygpIHtcbiAgdmFyIHdpZHRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnMTAwJSc7XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICBtYXhXaWR0aDogd2lkdGgsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICB3b3JkV3JhcDogJ25vcm1hbCdcbiAgfTtcbn1cblxuLy8gICAgICBcblxuLyoqICovXG5cbmZ1bmN0aW9uIGdlbmVyYXRlRmlsZVJlZmVyZW5jZXMoZm9udEZpbGVQYXRoLCBmaWxlRm9ybWF0cykge1xuICB2YXIgZmlsZUZvbnRSZWZlcmVuY2VzID0gZmlsZUZvcm1hdHMubWFwKGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICByZXR1cm4gJ3VybChcIicgKyBmb250RmlsZVBhdGggKyAnLicgKyBmb3JtYXQgKyAnXCIpJztcbiAgfSk7XG4gIHJldHVybiBmaWxlRm9udFJlZmVyZW5jZXMuam9pbignLCAnKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVMb2NhbFJlZmVyZW5jZXMobG9jYWxGb250cykge1xuICB2YXIgbG9jYWxGb250UmVmZXJlbmNlcyA9IGxvY2FsRm9udHMubWFwKGZ1bmN0aW9uIChmb250KSB7XG4gICAgcmV0dXJuICdsb2NhbChcIicgKyBmb250ICsgJ1wiKSc7XG4gIH0pO1xuICByZXR1cm4gbG9jYWxGb250UmVmZXJlbmNlcy5qb2luKCcsICcpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNvdXJjZXMoZm9udEZpbGVQYXRoLCBsb2NhbEZvbnRzLCBmaWxlRm9ybWF0cykge1xuICB2YXIgZm9udFJlZmVyZW5jZXMgPSBbXTtcbiAgaWYgKGxvY2FsRm9udHMpIGZvbnRSZWZlcmVuY2VzLnB1c2goZ2VuZXJhdGVMb2NhbFJlZmVyZW5jZXMobG9jYWxGb250cykpO1xuICBpZiAoZm9udEZpbGVQYXRoKSB7XG4gICAgZm9udFJlZmVyZW5jZXMucHVzaChnZW5lcmF0ZUZpbGVSZWZlcmVuY2VzKGZvbnRGaWxlUGF0aCwgZmlsZUZvcm1hdHMpKTtcbiAgfVxuICByZXR1cm4gZm9udFJlZmVyZW5jZXMuam9pbignLCAnKTtcbn1cblxuLyoqXG4gKiBDU1MgZm9yIGEgQGZvbnQtZmFjZSBkZWNsYXJhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCBiYXNpYyB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAgLi4uZm9udEZhY2Uoe1xuICogICAgICAnZm9udEZhbWlseSc6ICdTYW5zLVBybydcbiAqICAgICAgJ2ZvbnRGaWxlUGF0aCc6ICdwYXRoL3RvL2ZpbGUnXG4gKiAgICB9KVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIGJhc2ljIHVzYWdlXG4gKiBpbmplY3RHbG9iYWxgJHtcbiAqICAgZm9udEZhY2Uoe1xuICogICAgICdmb250RmFtaWx5JzogJ1NhbnMtUHJvJ1xuICogICAgICdmb250RmlsZVBhdGgnOiAncGF0aC90by9maWxlJ1xuICogICB9XG4gKiApfWBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogJ0Bmb250LWZhY2UnOiB7XG4gKiAgICdmb250RmFtaWx5JzogJ1NhbnMtUHJvJyxcbiAqICAgJ3NyYyc6ICd1cmwoXCJwYXRoL3RvL2ZpbGUuZW90XCIpLCB1cmwoXCJwYXRoL3RvL2ZpbGUud29mZjJcIiksIHVybChcInBhdGgvdG8vZmlsZS53b2ZmXCIpLCB1cmwoXCJwYXRoL3RvL2ZpbGUudHRmXCIpLCB1cmwoXCJwYXRoL3RvL2ZpbGUuc3ZnXCIpJyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBmb250RmFjZShfcmVmKSB7XG4gIHZhciBmb250RmFtaWx5ID0gX3JlZi5mb250RmFtaWx5LFxuICAgICAgZm9udEZpbGVQYXRoID0gX3JlZi5mb250RmlsZVBhdGgsXG4gICAgICBmb250U3RyZXRjaCA9IF9yZWYuZm9udFN0cmV0Y2gsXG4gICAgICBmb250U3R5bGUgPSBfcmVmLmZvbnRTdHlsZSxcbiAgICAgIGZvbnRWYXJpYW50ID0gX3JlZi5mb250VmFyaWFudCxcbiAgICAgIGZvbnRXZWlnaHQgPSBfcmVmLmZvbnRXZWlnaHQsXG4gICAgICBfcmVmJGZpbGVGb3JtYXRzID0gX3JlZi5maWxlRm9ybWF0cyxcbiAgICAgIGZpbGVGb3JtYXRzID0gX3JlZiRmaWxlRm9ybWF0cyA9PT0gdW5kZWZpbmVkID8gWydlb3QnLCAnd29mZjInLCAnd29mZicsICd0dGYnLCAnc3ZnJ10gOiBfcmVmJGZpbGVGb3JtYXRzLFxuICAgICAgbG9jYWxGb250cyA9IF9yZWYubG9jYWxGb250cyxcbiAgICAgIHVuaWNvZGVSYW5nZSA9IF9yZWYudW5pY29kZVJhbmdlO1xuXG4gIC8vIEVycm9yIEhhbmRsaW5nXG4gIGlmICghZm9udEZhbWlseSkgdGhyb3cgbmV3IEVycm9yKCdmb250RmFjZSBleHBlY3RzIGEgbmFtZSBvZiBhIGZvbnQtZmFtaWx5LicpO1xuICBpZiAoIWZvbnRGaWxlUGF0aCAmJiAhbG9jYWxGb250cykge1xuICAgIHRocm93IG5ldyBFcnJvcignZm9udEZhY2UgZXhwZWN0cyBlaXRoZXIgdGhlIHBhdGggdG8gdGhlIGZvbnQgZmlsZShzKSBvciBhIG5hbWUgb2YgYSBsb2NhbCBjb3B5LicpO1xuICB9XG4gIGlmIChsb2NhbEZvbnRzICYmICFBcnJheS5pc0FycmF5KGxvY2FsRm9udHMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmb250RmFjZSBleHBlY3RzIGxvY2FsRm9udHMgdG8gYmUgYW4gYXJyYXkuJyk7XG4gIH1cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZpbGVGb3JtYXRzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZm9udEZhY2UgZXhwZWN0cyBmaWxlRm9ybWF0cyB0byBiZSBhbiBhcnJheS4nKTtcbiAgfVxuXG4gIHZhciBmb250RmFjZURlY2xhcmF0aW9uID0ge1xuICAgICdAZm9udC1mYWNlJzoge1xuICAgICAgZm9udEZhbWlseTogZm9udEZhbWlseSxcbiAgICAgIHNyYzogZ2VuZXJhdGVTb3VyY2VzKGZvbnRGaWxlUGF0aCwgbG9jYWxGb250cywgZmlsZUZvcm1hdHMpLFxuICAgICAgdW5pY29kZVJhbmdlOiB1bmljb2RlUmFuZ2UsXG4gICAgICBmb250U3RyZXRjaDogZm9udFN0cmV0Y2gsXG4gICAgICBmb250U3R5bGU6IGZvbnRTdHlsZSxcbiAgICAgIGZvbnRWYXJpYW50OiBmb250VmFyaWFudCxcbiAgICAgIGZvbnRXZWlnaHQ6IGZvbnRXZWlnaHRcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVtb3ZlcyB1bmRlZmluZWQgZmllbGRzIGZvciBjbGVhbmVyIGNzcyBvYmplY3QuXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZvbnRGYWNlRGVjbGFyYXRpb24pKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDU1MgdG8gaGlkZSB0ZXh0IHRvIHNob3cgYSBiYWNrZ3JvdW5kIGltYWdlIGluIGEgU0VPLWZyaWVuZGx5IHdheS5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAnYmFja2dyb3VuZEltYWdlJzogJ3VybChsb2dvLnBuZyknLFxuICogICAuLi5oaWRlVGV4dCgpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kSW1hZ2U6IHVybChsb2dvLnBuZyk7XG4gKiAgICR7aGlkZVRleHQoKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICdkaXYnOiB7XG4gKiAgICdiYWNrZ3JvdW5kSW1hZ2UnOiAndXJsKGxvZ28ucG5nKScsXG4gKiAgICd0ZXh0SW5kZW50JzogJzEwMSUnLFxuICogICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcbiAqICAgJ3doaXRlU3BhY2UnOiAnbm93cmFwJyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBoaWRlVGV4dCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0SW5kZW50OiAnMTAxJScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnXG4gIH07XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogQ1NTIHRvIGhpZGUgY29udGVudCB2aXN1YWxseSBidXQgcmVtYWluIGFjY2Vzc2libGUgdG8gc2NyZWVuIHJlYWRlcnMuXG4gKiBmcm9tIFtIVE1MNSBCb2lsZXJwbGF0ZV0oaHR0cHM6Ly9naXRodWIuY29tL2g1YnAvaHRtbDUtYm9pbGVycGxhdGUvYmxvYi85YTE3NmY1N2FmMWNmZThlYzcwMzAwZGE0NjIxZmI5YjA3ZTVmYTMxL3NyYy9jc3MvbWFpbi5jc3MjTDEyMSlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5oaWRlVmlzdWFsbHkoKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtoaWRlVmlzdWFsbHkoKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICdkaXYnOiB7XG4gKiAgICdib3JkZXInOiAnMCcsXG4gKiAgICdjbGlwJzogJ3JlY3QoMCAwIDAgMCknLFxuICogICAnY2xpcFBhdGgnOiAnaW5zZXQoNTAlKScsXG4gKiAgICdoZWlnaHQnOiAnMXB4JyxcbiAqICAgJ21hcmdpbic6ICctMXB4JyxcbiAqICAgJ292ZXJmbG93JzogJ2hpZGRlbicsXG4gKiAgICdwYWRkaW5nJzogJzAnLFxuICogICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICogICAnd2hpdGVTcGFjZSc6ICdub3dyYXAnLFxuICogICAnd2lkdGgnOiAnMXB4JyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBoaWRlVmlzdWFsbHkoKSB7XG4gIHJldHVybiB7XG4gICAgYm9yZGVyOiAnMCcsXG4gICAgY2xpcDogJ3JlY3QoMCAwIDAgMCknLFxuICAgIGNsaXBQYXRoOiAnaW5zZXQoNTAlKScsXG4gICAgaGVpZ2h0OiAnMXB4JyxcbiAgICBtYXJnaW46ICctMXB4JyxcbiAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgcGFkZGluZzogJzAnLFxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIHdpZHRoOiAnMXB4J1xuICB9O1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIG1lZGlhIHF1ZXJ5IHRvIHRhcmdldCBIaURQSSBkZXZpY2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgW2hpRFBJKDEuNSldOiB7XG4gKiAgICB3aWR0aDogMjAwcHg7XG4gKiAgfVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2hpRFBJKDEuNSl9IHtcbiAqICAgICB3aWR0aDogMjAwcHg7XG4gKiAgIH1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogJ0BtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMS41KSxcbiAqICBvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMS41KSxcbiAqICBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuNS8xKSxcbiAqICBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxNDRkcGkpLFxuICogIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDEuNWRwcHgpJzoge1xuICogICAnd2lkdGgnOiAnMjAwcHgnLFxuICogfVxuICovXG5cbmZ1bmN0aW9uIGhpRFBJKCkge1xuICB2YXIgcmF0aW8gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDEuMztcblxuICByZXR1cm4gXCJcXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiBcIiArIHJhdGlvICsgXCIpLFxcbiAgICBvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogXCIgKyByYXRpbyArIFwiKSxcXG4gICAgb25seSBzY3JlZW4gYW5kICgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiBcIiArIHJhdGlvICsgXCIvMSksXFxuICAgIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IFwiICsgTWF0aC5yb3VuZChyYXRpbyAqIDk2KSArIFwiZHBpKSxcXG4gICAgb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogXCIgKyByYXRpbyArIFwiZHBweClcXG4gIFwiO1xufVxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UgPSBmdW5jdGlvbiAoc3RyaW5ncywgcmF3KSB7XG4gIHN0cmluZ3MucmF3ID0gcmF3O1xuICByZXR1cm4gc3RyaW5ncztcbn07XG5cbnZhciBfb3BpbmlvbmF0ZWRSdWxlcztcbnZhciBfYWJiclRpdGxlO1xudmFyIF91bm9waW5pb25hdGVkUnVsZXM7XG5cbi8vICAgICAgXG52YXIgb3BpbmlvbmF0ZWRSdWxlcyA9IChfb3BpbmlvbmF0ZWRSdWxlcyA9IHtcbiAgaHRtbDoge1xuICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJ1xuICB9LFxuXG4gIGJvZHk6IHtcbiAgICBtYXJnaW46ICcwJ1xuICB9XG5cbn0sIF9vcGluaW9uYXRlZFJ1bGVzWydhOmFjdGl2ZSxcXG4gIGE6aG92ZXInXSA9IHtcbiAgb3V0bGluZVdpZHRoOiAnMCdcbn0sIF9vcGluaW9uYXRlZFJ1bGVzWydidXR0b24sXFxuICBpbnB1dCxcXG4gIG9wdGdyb3VwLFxcbiAgc2VsZWN0LFxcbiAgdGV4dGFyZWEnXSA9IHtcbiAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxuICBmb250U2l6ZTogJzEwMCUnLFxuICBsaW5lSGVpZ2h0OiAnMS4xNSdcbn0sIF9vcGluaW9uYXRlZFJ1bGVzKTtcblxudmFyIHVub3BpbmlvbmF0ZWRSdWxlcyA9IChfdW5vcGluaW9uYXRlZFJ1bGVzID0ge1xuICBodG1sOiB7XG4gICAgbGluZUhlaWdodDogJzEuMTUnLFxuICAgIHRleHRTaXplQWRqdXN0OiAnMTAwJSdcbiAgfVxuXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydhcnRpY2xlLFxcbiAgYXNpZGUsXFxuICBmb290ZXIsXFxuICBoZWFkZXIsXFxuICBuYXYsXFxuICBzZWN0aW9uJ10gPSB7XG4gIGRpc3BsYXk6ICdibG9jaydcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuaDEgPSB7XG4gIGZvbnRTaXplOiAnMmVtJyxcbiAgbWFyZ2luOiAnMC42N2VtIDAnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydmaWdjYXB0aW9uLFxcbiAgZmlndXJlLFxcbiAgbWFpbiddID0ge1xuICBkaXNwbGF5OiAnYmxvY2snXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmZpZ3VyZSA9IHtcbiAgbWFyZ2luOiAnMWVtIDQwcHgnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmhyID0ge1xuICBib3hTaXppbmc6ICdjb250ZW50LWJveCcsXG4gIGhlaWdodDogJzAnLFxuICBvdmVyZmxvdzogJ3Zpc2libGUnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLnByZSA9IHtcbiAgZm9udEZhbWlseTogJ21vbm9zcGFjZSwgbW9ub3NwYWNlJyxcbiAgZm9udFNpemU6ICcxZW0nXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmEgPSB7XG4gICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3RyYW5zcGFyZW50JyxcbiAgJy13ZWJraXQtdGV4dC1kZWNvcmF0aW9uLXNraXAnOiAnb2JqZWN0cydcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2FiYnJbdGl0bGVdJ10gPSAoX2FiYnJUaXRsZSA9IHtcbiAgYm9yZGVyQm90dG9tOiAnbm9uZScsXG4gIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJ1xufSwgX2FiYnJUaXRsZVsndGV4dERlY29yYXRpb24nXSA9ICd1bmRlcmxpbmUgZG90dGVkJywgX2FiYnJUaXRsZSksIF91bm9waW5pb25hdGVkUnVsZXNbJ2IsXFxuICBzdHJvbmcnXSA9IHtcbiAgZm9udFdlaWdodDogJ2luaGVyaXQnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydjb2RlLFxcbiAga2JkLFxcbiAgc2FtcCddID0ge1xuICBmb250RmFtaWx5OiAnbW9ub3NwYWNlLCBtb25vc3BhY2UnLFxuICBmb250U2l6ZTogJzFlbSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuZGZuID0ge1xuICBmb250U3R5bGU6ICdpdGFsaWMnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLm1hcmsgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogJyNmZjAnLFxuICBjb2xvcjogJyMwMDAnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLnNtYWxsID0ge1xuICBmb250U2l6ZTogJzgwJSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ3N1YixcXG4gIHN1cCddID0ge1xuICBmb250U2l6ZTogJzc1JScsXG4gIGxpbmVIZWlnaHQ6ICcwJyxcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gIHZlcnRpY2FsQWxpZ246ICdiYXNlbGluZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuc3ViID0ge1xuICBib3R0b206ICctMC4yNWVtJ1xufSwgX3Vub3BpbmlvbmF0ZWRSdWxlcy5zdXAgPSB7XG4gIHRvcDogJy0wLjVlbSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2F1ZGlvLFxcbiAgdmlkZW8nXSA9IHtcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2F1ZGlvOm5vdChbY29udHJvbHNdKSddID0ge1xuICBkaXNwbGF5OiAnbm9uZScsXG4gIGhlaWdodDogJzAnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmltZyA9IHtcbiAgYm9yZGVyU3R5bGU6ICdub25lJ1xufSwgX3Vub3BpbmlvbmF0ZWRSdWxlc1snc3ZnOm5vdCg6cm9vdCknXSA9IHtcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydidXR0b24sXFxuICBpbnB1dCxcXG4gIG9wdGdyb3VwLFxcbiAgc2VsZWN0LFxcbiAgdGV4dGFyZWEnXSA9IHtcbiAgbWFyZ2luOiAnMCdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2J1dHRvbixcXG4gIGlucHV0J10gPSB7XG4gIG92ZXJmbG93OiAndmlzaWJsZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2J1dHRvbixcXG4gIHNlbGVjdCddID0ge1xuICB0ZXh0VHJhbnNmb3JtOiAnbm9uZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2J1dHRvbixcXG4gIGh0bWwgW3R5cGU9XCJidXR0b25cIl0sXFxuICBbdHlwZT1cInJlc2V0XCJdLFxcbiAgW3R5cGU9XCJzdWJtaXRcIl0nXSA9IHtcbiAgJy13ZWJraXQtYXBwZWFyYW5jZSc6ICdidXR0b24nXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydidXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuICBbdHlwZT1cImJ1dHRvblwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG4gIFt0eXBlPVwicmVzZXRcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuICBbdHlwZT1cInN1Ym1pdFwiXTo6LW1vei1mb2N1cy1pbm5lciddID0ge1xuICBib3JkZXJTdHlsZTogJ25vbmUnLFxuICBwYWRkaW5nOiAnMCdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2J1dHRvbjotbW96LWZvY3VzcmluZyxcXG4gIFt0eXBlPVwiYnV0dG9uXCJdOi1tb3otZm9jdXNyaW5nLFxcbiAgW3R5cGU9XCJyZXNldFwiXTotbW96LWZvY3VzcmluZyxcXG4gIFt0eXBlPVwic3VibWl0XCJdOi1tb3otZm9jdXNyaW5nJ10gPSB7XG4gIG91dGxpbmU6ICcxcHggZG90dGVkIEJ1dHRvblRleHQnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmZpZWxkc2V0ID0ge1xuICBib3JkZXI6ICcxcHggc29saWQgI2MwYzBjMCcsXG4gIG1hcmdpbjogJzAgMnB4JyxcbiAgcGFkZGluZzogJzAuMzVlbSAwLjYyNWVtIDAuNzVlbSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMubGVnZW5kID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgY29sb3I6ICdpbmhlcml0JyxcbiAgZGlzcGxheTogJ3RhYmxlJyxcbiAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJzAnLFxuICB3aGl0ZVNwYWNlOiAnbm9ybWFsJ1xufSwgX3Vub3BpbmlvbmF0ZWRSdWxlcy5wcm9ncmVzcyA9IHtcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIHZlcnRpY2FsQWxpZ246ICdiYXNlbGluZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMudGV4dGFyZWEgPSB7XG4gIG92ZXJmbG93OiAnYXV0bydcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ1t0eXBlPVwiY2hlY2tib3hcIl0sXFxuICBbdHlwZT1cInJhZGlvXCJdJ10gPSB7XG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICBwYWRkaW5nOiAnMCdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ1t0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcbiAgW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24nXSA9IHtcbiAgaGVpZ2h0OiAnYXV0bydcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ1t0eXBlPVwic2VhcmNoXCJdJ10gPSB7XG4gICctd2Via2l0LWFwcGVhcmFuY2UnOiAndGV4dGZpZWxkJyxcbiAgb3V0bGluZU9mZnNldDogJy0ycHgnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydbdHlwZT1cInNlYXJjaFwiXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcXG4gIFt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uJ10gPSB7XG4gICctd2Via2l0LWFwcGVhcmFuY2UnOiAnbm9uZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJzo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24nXSA9IHtcbiAgJy13ZWJraXQtYXBwZWFyYW5jZSc6ICdidXR0b24nLFxuICBmb250OiAnaW5oZXJpdCdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2RldGFpbHMsXFxuICBtZW51J10gPSB7XG4gIGRpc3BsYXk6ICdibG9jaydcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuc3VtbWFyeSA9IHtcbiAgZGlzcGxheTogJ2xpc3QtaXRlbSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuY2FudmFzID0ge1xuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xufSwgX3Vub3BpbmlvbmF0ZWRSdWxlcy50ZW1wbGF0ZSA9IHtcbiAgZGlzcGxheTogJ25vbmUnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydbaGlkZGVuXSddID0ge1xuICBkaXNwbGF5OiAnbm9uZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMpO1xuXG5mdW5jdGlvbiBtZXJnZVJ1bGVzKGJhc2VSdWxlcywgYWRkaXRpb25hbFJ1bGVzKSB7XG4gIHZhciBtZXJnZWRSdWxlcyA9IF9leHRlbmRzKHt9LCBiYXNlUnVsZXMpO1xuICBPYmplY3Qua2V5cyhhZGRpdGlvbmFsUnVsZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChtZXJnZWRSdWxlc1trZXldKSB7XG4gICAgICBtZXJnZWRSdWxlc1trZXldID0gX2V4dGVuZHMoe30sIG1lcmdlZFJ1bGVzW2tleV0sIGFkZGl0aW9uYWxSdWxlc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VkUnVsZXNba2V5XSA9IF9leHRlbmRzKHt9LCBhZGRpdGlvbmFsUnVsZXNba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG1lcmdlZFJ1bGVzO1xufVxuXG4vKipcbiAqIENTUyB0byBub3JtYWxpemUgYWJub3JtYWxpdGllcyBhY3Jvc3MgYnJvd3NlcnMgKG5vcm1hbGl6ZS5jc3MgdjUuMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcylcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAgLi4ubm9ybWFsaXplKCksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGluamVjdEdsb2JhbGAke25vcm1hbGl6ZSgpfWBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogaHRtbCB7XG4gKiAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcbiAqICAgbGluZUhlaWdodDogMS4xNSxcbiAqICAgdGV4dFNpemVBZGp1c3Q6IDEwMCUsXG4gKiB9IC4uLlxuICovXG5mdW5jdGlvbiBub3JtYWxpemUoZXhjbHVkZU9waW5pb25hdGVkKSB7XG4gIGlmIChleGNsdWRlT3BpbmlvbmF0ZWQpIHJldHVybiB1bm9waW5pb25hdGVkUnVsZXM7XG4gIHJldHVybiBtZXJnZVJ1bGVzKHVub3BpbmlvbmF0ZWRSdWxlcywgb3BpbmlvbmF0ZWRSdWxlcyk7XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogQ1NTIHRvIHN0eWxlIHRoZSBwbGFjZWhvbGRlciBwc2V1ZG8tZWxlbWVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5wbGFjZWhvbGRlcih7J2NvbG9yJzogJ2JsdWUnfSlcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmlucHV0YFxuICogICAgJHtwbGFjZWhvbGRlcih7J2NvbG9yJzogJ2JsdWUnfSl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICdpbnB1dCc6IHtcbiAqICAgJyY6LW1vei1wbGFjZWhvbGRlcic6IHtcbiAqICAgICAnY29sb3InOiAnYmx1ZScsXG4gKiAgIH0sXG4gKiAgICcmOi1tcy1pbnB1dC1wbGFjZWhvbGRlcic6IHtcbiAqICAgICAnY29sb3InOiAnYmx1ZScsXG4gKiAgIH0sXG4gKiAgICcmOjotbW96LXBsYWNlaG9sZGVyJzoge1xuICogICAgICdjb2xvcic6ICdibHVlJyxcbiAqICAgfSxcbiAqICAgJyY6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXInOiB7XG4gKiAgICAgJ2NvbG9yJzogJ2JsdWUnLFxuICogICB9LFxuICogfSxcbiAqL1xuXG5mdW5jdGlvbiBwbGFjZWhvbGRlcihzdHlsZXMpIHtcbiAgdmFyIF9yZWY7XG5cbiAgdmFyIHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyYnO1xuXG4gIHJldHVybiBfcmVmID0ge30sIF9yZWZbcGFyZW50ICsgJzo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciddID0gX2V4dGVuZHMoe30sIHN0eWxlcyksIF9yZWZbcGFyZW50ICsgJzotbW96LXBsYWNlaG9sZGVyJ10gPSBfZXh0ZW5kcyh7fSwgc3R5bGVzKSwgX3JlZltwYXJlbnQgKyAnOjotbW96LXBsYWNlaG9sZGVyJ10gPSBfZXh0ZW5kcyh7fSwgc3R5bGVzKSwgX3JlZltwYXJlbnQgKyAnOi1tcy1pbnB1dC1wbGFjZWhvbGRlciddID0gX2V4dGVuZHMoe30sIHN0eWxlcyksIF9yZWY7XG59XG5cbnZhciBfdGVtcGxhdGVPYmplY3QgPSAvKiNfX1BVUkVfXyovIHRhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlKFsncmFkaWFsLWdyYWRpZW50KCcsICcnLCAnJywgJycsICcpJ10sIFsncmFkaWFsLWdyYWRpZW50KCcsICcnLCAnJywgJycsICcpJ10pO1xuXG4vLyAgICAgIFxuXG4vKiogKi9cblxuZnVuY3Rpb24gcGFyc2VGYWxsYmFjayhjb2xvclN0b3BzKSB7XG4gIHJldHVybiBjb2xvclN0b3BzWzBdLnNwbGl0KCcgJylbMF07XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdEdyYWRpZW50VmFsdWUobGl0ZXJhbHMpIHtcbiAgdmFyIHRlbXBsYXRlID0gJyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGl0ZXJhbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0ZW1wbGF0ZSArPSBsaXRlcmFsc1tpXTtcbiAgICAvLyBBZGRzIGxlYWRpbmcgY29tYSBpZiBwcm9wZXJ0aWVzIHByZWNlZWQgY29sb3Itc3RvcHNcbiAgICBpZiAoaSA9PT0gMyAmJiAoYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV0pICYmICgoYXJndW1lbnRzLmxlbmd0aCA8PSAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzFdKSB8fCAoYXJndW1lbnRzLmxlbmd0aCA8PSAyID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzJdKSB8fCAoYXJndW1lbnRzLmxlbmd0aCA8PSAzID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzNdKSkpIHtcbiAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUuc2xpY2UoMCwgLTEpO1xuICAgICAgdGVtcGxhdGUgKz0gJywgJyArIChhcmd1bWVudHMubGVuZ3RoIDw9IGkgKyAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzW2kgKyAxXSk7XG4gICAgICAvLyBObyB0cmFpbGluZyBzcGFjZSBpZiBjb2xvci1zdG9wcyBpcyB0aGUgb25seSBwYXJhbSBwcm92aWRlZFxuICAgIH0gZWxzZSBpZiAoaSA9PT0gMyAmJiAoYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV0pICYmICEoYXJndW1lbnRzLmxlbmd0aCA8PSAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzFdKSAmJiAhKGFyZ3VtZW50cy5sZW5ndGggPD0gMiA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1syXSkgJiYgIShhcmd1bWVudHMubGVuZ3RoIDw9IDMgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbM10pKSB7XG4gICAgICB0ZW1wbGF0ZSArPSAnJyArIChhcmd1bWVudHMubGVuZ3RoIDw9IGkgKyAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzW2kgKyAxXSk7XG4gICAgICAvLyBPbmx5IGFkZHMgc3Vic3RpdHV0aW9uIGlmIGl0IGlzIGRlZmluZWRcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gaSArIDEgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbaSArIDFdKSB7XG4gICAgICB0ZW1wbGF0ZSArPSAoYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV0pICsgJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGVtcGxhdGUudHJpbSgpO1xufVxuXG4vKipcbiAqIENTUyBmb3IgZGVjbGFyaW5nIGEgcmFkaWFsIGdyYWRpZW50LCBpbmNsdWRpbmcgYSBmYWxsYmFjayBiYWNrZ3JvdW5kLWNvbG9yLiBUaGUgZmFsbGJhY2sgaXMgZWl0aGVyIHRoZSBmaXJzdCBjb2xvci1zdG9wIG9yIGFuIGV4cGxpY2l0bHkgcGFzc2VkIGZhbGxiYWNrIGNvbG9yLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLnJhZGlhbEdyYWRpZW50KHtcbiAqICAgICBjb2xvclN0b3BzOiBbJyMwMEZGRkYgMCUnLCAncmdiYSgwLCAwLCAyNTUsIDApIDUwJScsICcjMDAwMEZGIDk1JSddLFxuICogICAgIGV4dGVudDogJ2ZhcnRoZXN0LWNvcm5lciBhdCA0NXB4IDQ1cHgnLFxuICogICAgIHBvc2l0aW9uOiAnY2VudGVyJyxcbiAqICAgICBzaGFwZTogJ2VsbGlwc2UnLFxuICogICB9KVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3JhZGlhbEdyYWRpZW50KHtcbiAqICAgICBjb2xvclN0b3BzOiBbJyMwMEZGRkYgMCUnLCAncmdiYSgwLCAwLCAyNTUsIDApIDUwJScsICcjMDAwMEZGIDk1JSddLFxuICogICAgIGV4dGVudDogJ2ZhcnRoZXN0LWNvcm5lciBhdCA0NXB4IDQ1cHgnLFxuICogICAgIHBvc2l0aW9uOiAnY2VudGVyJyxcbiAqICAgICBzaGFwZTogJ2VsbGlwc2UnLFxuICogICB9KX1cbiAqYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXY6IHtcbiAqICAgJ2JhY2tncm91bmRDb2xvcic6ICcjMDBGRkZGJyxcbiAqICAgJ2JhY2tncm91bmRJbWFnZSc6ICdyYWRpYWwtZ3JhZGllbnQoY2VudGVyIGVsbGlwc2UgZmFydGhlc3QtY29ybmVyIGF0IDQ1cHggNDVweCwgIzAwRkZGRiAwJSwgcmdiYSgwLCAwLCAyNTUsIDApIDUwJSwgIzAwMDBGRiA5NSUpJyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiByYWRpYWxHcmFkaWVudChfcmVmKSB7XG4gIHZhciBjb2xvclN0b3BzID0gX3JlZi5jb2xvclN0b3BzLFxuICAgICAgZXh0ZW50ID0gX3JlZi5leHRlbnQsXG4gICAgICBmYWxsYmFjayA9IF9yZWYuZmFsbGJhY2ssXG4gICAgICBwb3NpdGlvbiA9IF9yZWYucG9zaXRpb24sXG4gICAgICBzaGFwZSA9IF9yZWYuc2hhcGU7XG5cbiAgaWYgKCFjb2xvclN0b3BzIHx8IGNvbG9yU3RvcHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcigncmFkaWFsR3JhZGllbnQgcmVxdXJpZXMgYXQgbGVhc3QgMiBjb2xvci1zdG9wcyB0byBwcm9wZXJseSByZW5kZXIuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGZhbGxiYWNrIHx8IHBhcnNlRmFsbGJhY2soY29sb3JTdG9wcyksXG4gICAgYmFja2dyb3VuZEltYWdlOiBjb25zdHJ1Y3RHcmFkaWVudFZhbHVlKF90ZW1wbGF0ZU9iamVjdCwgcG9zaXRpb24sIHNoYXBlLCBleHRlbnQsIGNvbG9yU3RvcHMuam9pbignLCAnKSlcbiAgfTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBBIGhlbHBlciB0byBnZW5lcmF0ZSBhIHJldGluYSBiYWNrZ3JvdW5kIGltYWdlIGFuZCBub24tcmV0aW5hXG4gKiBiYWNrZ3JvdW5kIGltYWdlLiBUaGUgcmV0aW5hIGJhY2tncm91bmQgaW1hZ2Ugd2lsbCBvdXRwdXQgdG8gYSBIaURQSSBtZWRpYSBxdWVyeS4gVGhlIG1peGluIHVzZXNcbiAqIGEgXzJ4LnBuZyBmaWxlbmFtZSBzdWZmaXggYnkgZGVmYXVsdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogIC4uLnJldGluYUltYWdlKCdteS1pbWcnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3JldGluYUltYWdlKCdteS1pbWcnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKiBkaXYge1xuICogICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwobXktaW1nLnBuZyknLFxuICogICAnQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpLFxuICogICAgb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMyksXG4gKiAgICBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMy8xKSxcbiAqICAgIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDE0NGRwaSksXG4gKiAgICBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxLjVkcHB4KSc6IHtcbiAqICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwobXktaW1nXzJ4LnBuZyknLFxuICogICB9XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHJldGluYUltYWdlKGZpbGVuYW1lLCBiYWNrZ3JvdW5kU2l6ZSkge1xuICB2YXIgZXh0ZW5zaW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAncG5nJztcblxuICB2YXIgX3JlZjtcblxuICB2YXIgcmV0aW5hRmlsZW5hbWUgPSBhcmd1bWVudHNbM107XG4gIHZhciByZXRpbmFTdWZmaXggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6ICdfMngnO1xuXG4gIGlmICghZmlsZW5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBzdXBwbHkgYSBmaWxlbmFtZSB0byByZXRpbmFJbWFnZSgpIGFzIHRoZSBmaXJzdCBhcmd1bWVudC4nKTtcbiAgfVxuICAvLyBSZXBsYWNlIHRoZSBkb3QgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGFzc2VkIGV4dGVuc2lvbiBpZiBvbmUgZXhpc3RzXG4gIHZhciBleHQgPSBleHRlbnNpb24ucmVwbGFjZSgvXlxcLi8sICcnKTtcbiAgdmFyIHJGaWxlbmFtZSA9IHJldGluYUZpbGVuYW1lID8gcmV0aW5hRmlsZW5hbWUgKyAnLicgKyBleHQgOiAnJyArIGZpbGVuYW1lICsgcmV0aW5hU3VmZml4ICsgJy4nICsgZXh0O1xuXG4gIHJldHVybiBfcmVmID0ge1xuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgZmlsZW5hbWUgKyAnLicgKyBleHQgKyAnKSdcbiAgfSwgX3JlZltoaURQSSgpXSA9IHtcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIHJGaWxlbmFtZSArICcpJyxcbiAgICBiYWNrZ3JvdW5kU2l6ZTogYmFja2dyb3VuZFNpemVcbiAgfSwgX3JlZjtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDU1MgdG8gc3R5bGUgdGhlIHNlbGVjdGlvbiBwc2V1ZG8tZWxlbWVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5zZWxlY3Rpb24oe1xuICogICAgICdiYWNrZ3JvdW5kQ29sb3InOiAnYmx1ZSdcbiAqICAgfSwgJ3NlY3Rpb24nKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3NlbGVjdGlvbih7J2JhY2tncm91bmRDb2xvcic6ICdibHVlJ30sICdzZWN0aW9uJyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICdkaXYnOiB7XG4gKiAgICdzZWN0aW9uOjotbW96LXNlbGVjdGlvbic6IHtcbiAqICAgICAnYmFja2dyb3VuZENvbG9yJzonYmx1ZScsXG4gKiAgIH0sXG4gKiAgICdzZWN0aW9uOjpzZWxlY3Rpb24nOiB7XG4gKiAgICAgJ2JhY2tncm91bmRDb2xvcic6ICdibHVlJyxcbiAqICAgfVxuICogfVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdGlvbihzdHlsZXMpIHtcbiAgdmFyIF9yZWY7XG5cbiAgdmFyIHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG5cbiAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltwYXJlbnQgKyAnOjotbW96LXNlbGVjdGlvbiddID0gX2V4dGVuZHMoe30sIHN0eWxlcyksIF9yZWZbcGFyZW50ICsgJzo6c2VsZWN0aW9uJ10gPSBfZXh0ZW5kcyh7fSwgc3R5bGVzKSwgX3JlZjtcbn1cblxuLy8gICAgICBcblxuLyogZXNsaW50LWRpc2FibGUga2V5LXNwYWNpbmcgKi9cbnZhciBmdW5jdGlvbnNNYXAgPSB7XG4gIGVhc2VJbkJhY2s6ICdjdWJpYy1iZXppZXIoMC42MDAsIC0wLjI4MCwgMC43MzUsIDAuMDQ1KScsXG4gIGVhc2VJbkNpcmM6ICdjdWJpYy1iZXppZXIoMC42MDAsICAwLjA0MCwgMC45ODAsIDAuMzM1KScsXG4gIGVhc2VJbkN1YmljOiAnY3ViaWMtYmV6aWVyKDAuNTUwLCAgMC4wNTUsIDAuNjc1LCAwLjE5MCknLFxuICBlYXNlSW5FeHBvOiAnY3ViaWMtYmV6aWVyKDAuOTUwLCAgMC4wNTAsIDAuNzk1LCAwLjAzNSknLFxuICBlYXNlSW5RdWFkOiAnY3ViaWMtYmV6aWVyKDAuNTUwLCAgMC4wODUsIDAuNjgwLCAwLjUzMCknLFxuICBlYXNlSW5RdWFydDogJ2N1YmljLWJlemllcigwLjg5NSwgIDAuMDMwLCAwLjY4NSwgMC4yMjApJyxcbiAgZWFzZUluUXVpbnQ6ICdjdWJpYy1iZXppZXIoMC43NTUsICAwLjA1MCwgMC44NTUsIDAuMDYwKScsXG4gIGVhc2VJblNpbmU6ICdjdWJpYy1iZXppZXIoMC40NzAsICAwLjAwMCwgMC43NDUsIDAuNzE1KScsXG5cbiAgZWFzZU91dEJhY2s6ICdjdWJpYy1iZXppZXIoMC4xNzUsICAwLjg4NSwgMC4zMjAsIDEuMjc1KScsXG4gIGVhc2VPdXRDdWJpYzogJ2N1YmljLWJlemllcigwLjIxNSwgIDAuNjEwLCAwLjM1NSwgMS4wMDApJyxcbiAgZWFzZU91dENpcmM6ICdjdWJpYy1iZXppZXIoMC4wNzUsICAwLjgyMCwgMC4xNjUsIDEuMDAwKScsXG4gIGVhc2VPdXRFeHBvOiAnY3ViaWMtYmV6aWVyKDAuMTkwLCAgMS4wMDAsIDAuMjIwLCAxLjAwMCknLFxuICBlYXNlT3V0UXVhZDogJ2N1YmljLWJlemllcigwLjI1MCwgIDAuNDYwLCAwLjQ1MCwgMC45NDApJyxcbiAgZWFzZU91dFF1YXJ0OiAnY3ViaWMtYmV6aWVyKDAuMTY1LCAgMC44NDAsIDAuNDQwLCAxLjAwMCknLFxuICBlYXNlT3V0UXVpbnQ6ICdjdWJpYy1iZXppZXIoMC4yMzAsICAxLjAwMCwgMC4zMjAsIDEuMDAwKScsXG4gIGVhc2VPdXRTaW5lOiAnY3ViaWMtYmV6aWVyKDAuMzkwLCAgMC41NzUsIDAuNTY1LCAxLjAwMCknLFxuXG4gIGVhc2VJbk91dEJhY2s6ICdjdWJpYy1iZXppZXIoMC42ODAsIC0wLjU1MCwgMC4yNjUsIDEuNTUwKScsXG4gIGVhc2VJbk91dENpcmM6ICdjdWJpYy1iZXppZXIoMC43ODUsICAwLjEzNSwgMC4xNTAsIDAuODYwKScsXG4gIGVhc2VJbk91dEN1YmljOiAnY3ViaWMtYmV6aWVyKDAuNjQ1LCAgMC4wNDUsIDAuMzU1LCAxLjAwMCknLFxuICBlYXNlSW5PdXRFeHBvOiAnY3ViaWMtYmV6aWVyKDEuMDAwLCAgMC4wMDAsIDAuMDAwLCAxLjAwMCknLFxuICBlYXNlSW5PdXRRdWFkOiAnY3ViaWMtYmV6aWVyKDAuNDU1LCAgMC4wMzAsIDAuNTE1LCAwLjk1NSknLFxuICBlYXNlSW5PdXRRdWFydDogJ2N1YmljLWJlemllcigwLjc3MCwgIDAuMDAwLCAwLjE3NSwgMS4wMDApJyxcbiAgZWFzZUluT3V0UXVpbnQ6ICdjdWJpYy1iZXppZXIoMC44NjAsICAwLjAwMCwgMC4wNzAsIDEuMDAwKScsXG4gIGVhc2VJbk91dFNpbmU6ICdjdWJpYy1iZXppZXIoMC40NDUsICAwLjA1MCwgMC41NTAsIDAuOTUwKSdcbn07XG4vKiBlc2xpbnQtZW5hYmxlIGtleS1zcGFjaW5nICovXG5cbi8qKiAqL1xuXG4vKipcbiAqIFN0cmluZyB0byByZXByZXNlbnQgY29tbW9uIGVhc2luZyBmdW5jdGlvbnMgYXMgZGVtb25zdHJhdGVkIGhlcmU6IChnaXRodWIuY29tL2phdWtpYS9lYXNpZSkuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgJ3RyYW5zaXRpb25UaW1pbmdGdW5jdGlvbic6IHRpbWluZ0Z1bmN0aW9ucygnZWFzZUluUXVhZCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqICBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICB0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246ICR7dGltaW5nRnVuY3Rpb25zKCdlYXNlSW5RdWFkJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiAnZGl2Jzoge1xuICogICAndHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uJzogJ2N1YmljLWJlemllcigwLjU1MCwgIDAuMDg1LCAwLjY4MCwgMC41MzApJyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiB0aW1pbmdGdW5jdGlvbnModGltaW5nRnVuY3Rpb24pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uc01hcFt0aW1pbmdGdW5jdGlvbl07XG59XG5cbi8vICAgICAgXG5cbi8qKiAqL1xuXG52YXIgZ2V0Qm9yZGVyV2lkdGggPSBmdW5jdGlvbiBnZXRCb3JkZXJXaWR0aChwb2ludGluZ0RpcmVjdGlvbiwgaGVpZ2h0LCB3aWR0aCkge1xuICBzd2l0Y2ggKHBvaW50aW5nRGlyZWN0aW9uKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIHJldHVybiAnMCAnICsgd2lkdGggLyAyICsgJ3B4ICcgKyBoZWlnaHQgKyAncHggJyArIHdpZHRoIC8gMiArICdweCc7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gaGVpZ2h0IC8gMiArICdweCAnICsgd2lkdGggKyAncHggJyArIGhlaWdodCAvIDIgKyAncHggMCc7XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHJldHVybiBoZWlnaHQgKyAncHggJyArIHdpZHRoIC8gMiArICdweCAwICcgKyB3aWR0aCAvIDIgKyAncHgnO1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIHJldHVybiBoZWlnaHQgLyAyICsgJ3B4IDAgJyArIGhlaWdodCAvIDIgKyAncHggJyArIHdpZHRoICsgJ3B4JztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXNzZWQgaW52YWxpZCBhcmd1bWVudCB0byB0cmlhbmdsZSwgcGxlYXNlIHBhc3MgY29ycmVjdCBwb2l0aW5nRGlyZWN0aW9uIGUuZy4gJ3JpZ2h0Jy5cIik7XG4gIH1cbn07XG5cbi8vIG5lZWRlZCBmb3IgYm9yZGVyLWNvbG9yXG52YXIgcmV2ZXJzZURpcmVjdGlvbiA9IHtcbiAgbGVmdDogJ1JpZ2h0JyxcbiAgcmlnaHQ6ICdMZWZ0JyxcbiAgdG9wOiAnQm90dG9tJyxcbiAgYm90dG9tOiAnVG9wJ1xufTtcblxuLyoqXG4gKiBDU1MgdG8gcmVwcmVzZW50IHRyaWFuZ2xlIHdpdGggYW55IHBvaW50aW5nIGRpcmVjdGlvbiB3aXRoIGFuIG9wdGlvbmFsIGJhY2tncm91bmQgY29sb3IuIEFjY2VwdHMgbnVtYmVyIG9yIHB4IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICpcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4udHJpYW5nbGUoeyBwb2ludGluZ0RpcmVjdGlvbjogJ3JpZ2h0Jywgd2lkdGg6ICcxMDBweCcsIGhlaWdodDogJzEwMHB4JywgZm9yZWdyb3VuZENvbG9yOiAncmVkJyB9KVxuICogfVxuICpcbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHt0cmlhbmdsZSh7IHBvaW50aW5nRGlyZWN0aW9uOiAncmlnaHQnLCB3aWR0aDogJzEwMHB4JywgaGVpZ2h0OiAnMTAwcHgnLCBmb3JlZ3JvdW5kQ29sb3I6ICdyZWQnIH0pfVxuICpcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2OiB7XG4gKiAgJ2JvcmRlckNvbG9yJzogJ3RyYW5zcGFyZW50JyxcbiAqICAnYm9yZGVyTGVmdENvbG9yJzogJ3JlZCAhaW1wb3J0YW50JyxcbiAqICAnYm9yZGVyU3R5bGUnOiAnc29saWQnLFxuICogICdib3JkZXJXaWR0aCc6ICc1MHB4IDAgNTBweCAxMDBweCcsXG4gKiAgJ2hlaWdodCc6ICcwJyxcbiAqICAnd2lkdGgnOiAnMCcsXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gdHJpYW5nbGUoX3JlZikge1xuICB2YXIgX3JlZjI7XG5cbiAgdmFyIHBvaW50aW5nRGlyZWN0aW9uID0gX3JlZi5wb2ludGluZ0RpcmVjdGlvbixcbiAgICAgIGhlaWdodCA9IF9yZWYuaGVpZ2h0LFxuICAgICAgd2lkdGggPSBfcmVmLndpZHRoLFxuICAgICAgZm9yZWdyb3VuZENvbG9yID0gX3JlZi5mb3JlZ3JvdW5kQ29sb3IsXG4gICAgICBfcmVmJGJhY2tncm91bmRDb2xvciA9IF9yZWYuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYmFja2dyb3VuZENvbG9yID0gX3JlZiRiYWNrZ3JvdW5kQ29sb3IgPT09IHVuZGVmaW5lZCA/ICd0cmFuc3BhcmVudCcgOiBfcmVmJGJhY2tncm91bmRDb2xvcjtcblxuICB2YXIgdW5pdGxlc3NIZWlnaHQgPSBwYXJzZUZsb2F0KGhlaWdodCk7XG4gIHZhciB1bml0bGVzc1dpZHRoID0gcGFyc2VGbG9hdCh3aWR0aCk7XG4gIGlmIChpc05hTih1bml0bGVzc0hlaWdodCkgfHwgaXNOYU4odW5pdGxlc3NXaWR0aCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBhbiBpbnZhbGlkIHZhbHVlIHRvIGBoZWlnaHRgIG9yIGB3aWR0aGAuIFBsZWFzZSBwcm92aWRlIGEgcGl4ZWwgYmFzZWQgdW5pdCcpO1xuICB9XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGJvcmRlckNvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgd2lkdGg6ICcwJyxcbiAgICBoZWlnaHQ6ICcwJyxcbiAgICBib3JkZXJXaWR0aDogZ2V0Qm9yZGVyV2lkdGgocG9pbnRpbmdEaXJlY3Rpb24sIHVuaXRsZXNzSGVpZ2h0LCB1bml0bGVzc1dpZHRoKSxcbiAgICBib3JkZXJTdHlsZTogJ3NvbGlkJ1xuICB9LCBfcmVmMlsnYm9yZGVyJyArIHJldmVyc2VEaXJlY3Rpb25bcG9pbnRpbmdEaXJlY3Rpb25dICsgJ0NvbG9yJ10gPSBmb3JlZ3JvdW5kQ29sb3IgKyAnICFpbXBvcnRhbnQnLCBfcmVmMjtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBQcm92aWRlcyBhbiBlYXN5IHdheSB0byBjaGFuZ2UgdGhlIGB3b3JkV3JhcGAgcHJvcGVydHkuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4ud29yZFdyYXAoJ2JyZWFrLXdvcmQnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3dvcmRXcmFwKCdicmVhay13b3JkJyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgb3ZlcmZsb3dXcmFwOiAnYnJlYWstd29yZCcsXG4gKiAgIHdvcmRXcmFwOiAnYnJlYWstd29yZCcsXG4gKiAgIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gd29yZFdyYXAoKSB7XG4gIHZhciB3cmFwID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnYnJlYWstd29yZCc7XG5cbiAgdmFyIHdvcmRCcmVhayA9IHdyYXAgPT09ICdicmVhay13b3JkJyA/ICdicmVhay1hbGwnIDogd3JhcDtcbiAgcmV0dXJuIHtcbiAgICBvdmVyZmxvd1dyYXA6IHdyYXAsXG4gICAgd29yZFdyYXA6IHdyYXAsXG4gICAgd29yZEJyZWFrOiB3b3JkQnJlYWtcbiAgfTtcbn1cblxuLy8gICAgICBcblxuXG5mdW5jdGlvbiBjb2xvclRvSW50KGNvbG9yKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKGNvbG9yICogMjU1KTtcbn1cblxuZnVuY3Rpb24gY29udmVydFRvSW50KHJlZCwgZ3JlZW4sIGJsdWUpIHtcbiAgcmV0dXJuIGNvbG9yVG9JbnQocmVkKSArIFwiLFwiICsgY29sb3JUb0ludChncmVlbikgKyBcIixcIiArIGNvbG9yVG9JbnQoYmx1ZSk7XG59XG5cbmZ1bmN0aW9uIGhzbFRvUmdiKGh1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzKSB7XG4gIHZhciBjb252ZXJ0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBjb252ZXJ0VG9JbnQ7XG5cbiAgaWYgKHNhdHVyYXRpb24gPT09IDApIHtcbiAgICAvLyBhY2hyb21hdGljXG4gICAgcmV0dXJuIGNvbnZlcnQobGlnaHRuZXNzLCBsaWdodG5lc3MsIGxpZ2h0bmVzcyk7XG4gIH1cblxuICAvLyBmb3JtdWxhciBmcm9tIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9hbmRfSFNWXG4gIHZhciBodWVQcmltZSA9IGh1ZSAlIDM2MCAvIDYwO1xuICB2YXIgY2hyb21hID0gKDEgLSBNYXRoLmFicygyICogbGlnaHRuZXNzIC0gMSkpICogc2F0dXJhdGlvbjtcbiAgdmFyIHNlY29uZENvbXBvbmVudCA9IGNocm9tYSAqICgxIC0gTWF0aC5hYnMoaHVlUHJpbWUgJSAyIC0gMSkpO1xuXG4gIHZhciByZWQgPSAwO1xuICB2YXIgZ3JlZW4gPSAwO1xuICB2YXIgYmx1ZSA9IDA7XG5cbiAgaWYgKGh1ZVByaW1lID49IDAgJiYgaHVlUHJpbWUgPCAxKSB7XG4gICAgcmVkID0gY2hyb21hO1xuICAgIGdyZWVuID0gc2Vjb25kQ29tcG9uZW50O1xuICB9IGVsc2UgaWYgKGh1ZVByaW1lID49IDEgJiYgaHVlUHJpbWUgPCAyKSB7XG4gICAgcmVkID0gc2Vjb25kQ29tcG9uZW50O1xuICAgIGdyZWVuID0gY2hyb21hO1xuICB9IGVsc2UgaWYgKGh1ZVByaW1lID49IDIgJiYgaHVlUHJpbWUgPCAzKSB7XG4gICAgZ3JlZW4gPSBjaHJvbWE7XG4gICAgYmx1ZSA9IHNlY29uZENvbXBvbmVudDtcbiAgfSBlbHNlIGlmIChodWVQcmltZSA+PSAzICYmIGh1ZVByaW1lIDwgNCkge1xuICAgIGdyZWVuID0gc2Vjb25kQ29tcG9uZW50O1xuICAgIGJsdWUgPSBjaHJvbWE7XG4gIH0gZWxzZSBpZiAoaHVlUHJpbWUgPj0gNCAmJiBodWVQcmltZSA8IDUpIHtcbiAgICByZWQgPSBzZWNvbmRDb21wb25lbnQ7XG4gICAgYmx1ZSA9IGNocm9tYTtcbiAgfSBlbHNlIGlmIChodWVQcmltZSA+PSA1ICYmIGh1ZVByaW1lIDwgNikge1xuICAgIHJlZCA9IGNocm9tYTtcbiAgICBibHVlID0gc2Vjb25kQ29tcG9uZW50O1xuICB9XG5cbiAgdmFyIGxpZ2h0bmVzc01vZGlmaWNhdGlvbiA9IGxpZ2h0bmVzcyAtIGNocm9tYSAvIDI7XG4gIHZhciBmaW5hbFJlZCA9IHJlZCArIGxpZ2h0bmVzc01vZGlmaWNhdGlvbjtcbiAgdmFyIGZpbmFsR3JlZW4gPSBncmVlbiArIGxpZ2h0bmVzc01vZGlmaWNhdGlvbjtcbiAgdmFyIGZpbmFsQmx1ZSA9IGJsdWUgKyBsaWdodG5lc3NNb2RpZmljYXRpb247XG4gIHJldHVybiBjb252ZXJ0KGZpbmFsUmVkLCBmaW5hbEdyZWVuLCBmaW5hbEJsdWUpO1xufVxuXG4vLyAgICAgIFxudmFyIG5hbWVkQ29sb3JNYXAgPSB7XG4gIGFsaWNlYmx1ZTogJ2YwZjhmZicsXG4gIGFudGlxdWV3aGl0ZTogJ2ZhZWJkNycsXG4gIGFxdWE6ICcwMGZmZmYnLFxuICBhcXVhbWFyaW5lOiAnN2ZmZmQ0JyxcbiAgYXp1cmU6ICdmMGZmZmYnLFxuICBiZWlnZTogJ2Y1ZjVkYycsXG4gIGJpc3F1ZTogJ2ZmZTRjNCcsXG4gIGJsYWNrOiAnMDAwJyxcbiAgYmxhbmNoZWRhbG1vbmQ6ICdmZmViY2QnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgYmx1ZXZpb2xldDogJzhhMmJlMicsXG4gIGJyb3duOiAnYTUyYTJhJyxcbiAgYnVybHl3b29kOiAnZGViODg3JyxcbiAgY2FkZXRibHVlOiAnNWY5ZWEwJyxcbiAgY2hhcnRyZXVzZTogJzdmZmYwMCcsXG4gIGNob2NvbGF0ZTogJ2QyNjkxZScsXG4gIGNvcmFsOiAnZmY3ZjUwJyxcbiAgY29ybmZsb3dlcmJsdWU6ICc2NDk1ZWQnLFxuICBjb3Juc2lsazogJ2ZmZjhkYycsXG4gIGNyaW1zb246ICdkYzE0M2MnLFxuICBjeWFuOiAnMDBmZmZmJyxcbiAgZGFya2JsdWU6ICcwMDAwOGInLFxuICBkYXJrY3lhbjogJzAwOGI4YicsXG4gIGRhcmtnb2xkZW5yb2Q6ICdiODg2MGInLFxuICBkYXJrZ3JheTogJ2E5YTlhOScsXG4gIGRhcmtncmVlbjogJzAwNjQwMCcsXG4gIGRhcmtncmV5OiAnYTlhOWE5JyxcbiAgZGFya2toYWtpOiAnYmRiNzZiJyxcbiAgZGFya21hZ2VudGE6ICc4YjAwOGInLFxuICBkYXJrb2xpdmVncmVlbjogJzU1NmIyZicsXG4gIGRhcmtvcmFuZ2U6ICdmZjhjMDAnLFxuICBkYXJrb3JjaGlkOiAnOTkzMmNjJyxcbiAgZGFya3JlZDogJzhiMDAwMCcsXG4gIGRhcmtzYWxtb246ICdlOTk2N2EnLFxuICBkYXJrc2VhZ3JlZW46ICc4ZmJjOGYnLFxuICBkYXJrc2xhdGVibHVlOiAnNDgzZDhiJyxcbiAgZGFya3NsYXRlZ3JheTogJzJmNGY0ZicsXG4gIGRhcmtzbGF0ZWdyZXk6ICcyZjRmNGYnLFxuICBkYXJrdHVycXVvaXNlOiAnMDBjZWQxJyxcbiAgZGFya3Zpb2xldDogJzk0MDBkMycsXG4gIGRlZXBwaW5rOiAnZmYxNDkzJyxcbiAgZGVlcHNreWJsdWU6ICcwMGJmZmYnLFxuICBkaW1ncmF5OiAnNjk2OTY5JyxcbiAgZGltZ3JleTogJzY5Njk2OScsXG4gIGRvZGdlcmJsdWU6ICcxZTkwZmYnLFxuICBmaXJlYnJpY2s6ICdiMjIyMjInLFxuICBmbG9yYWx3aGl0ZTogJ2ZmZmFmMCcsXG4gIGZvcmVzdGdyZWVuOiAnMjI4YjIyJyxcbiAgZnVjaHNpYTogJ2ZmMDBmZicsXG4gIGdhaW5zYm9ybzogJ2RjZGNkYycsXG4gIGdob3N0d2hpdGU6ICdmOGY4ZmYnLFxuICBnb2xkOiAnZmZkNzAwJyxcbiAgZ29sZGVucm9kOiAnZGFhNTIwJyxcbiAgZ3JheTogJzgwODA4MCcsXG4gIGdyZWVuOiAnMDA4MDAwJyxcbiAgZ3JlZW55ZWxsb3c6ICdhZGZmMmYnLFxuICBncmV5OiAnODA4MDgwJyxcbiAgaG9uZXlkZXc6ICdmMGZmZjAnLFxuICBob3RwaW5rOiAnZmY2OWI0JyxcbiAgaW5kaWFucmVkOiAnY2Q1YzVjJyxcbiAgaW5kaWdvOiAnNGIwMDgyJyxcbiAgaXZvcnk6ICdmZmZmZjAnLFxuICBraGFraTogJ2YwZTY4YycsXG4gIGxhdmVuZGVyOiAnZTZlNmZhJyxcbiAgbGF2ZW5kZXJibHVzaDogJ2ZmZjBmNScsXG4gIGxhd25ncmVlbjogJzdjZmMwMCcsXG4gIGxlbW9uY2hpZmZvbjogJ2ZmZmFjZCcsXG4gIGxpZ2h0Ymx1ZTogJ2FkZDhlNicsXG4gIGxpZ2h0Y29yYWw6ICdmMDgwODAnLFxuICBsaWdodGN5YW46ICdlMGZmZmYnLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogJ2ZhZmFkMicsXG4gIGxpZ2h0Z3JheTogJ2QzZDNkMycsXG4gIGxpZ2h0Z3JlZW46ICc5MGVlOTAnLFxuICBsaWdodGdyZXk6ICdkM2QzZDMnLFxuICBsaWdodHBpbms6ICdmZmI2YzEnLFxuICBsaWdodHNhbG1vbjogJ2ZmYTA3YScsXG4gIGxpZ2h0c2VhZ3JlZW46ICcyMGIyYWEnLFxuICBsaWdodHNreWJsdWU6ICc4N2NlZmEnLFxuICBsaWdodHNsYXRlZ3JheTogJzc4OScsXG4gIGxpZ2h0c2xhdGVncmV5OiAnNzg5JyxcbiAgbGlnaHRzdGVlbGJsdWU6ICdiMGM0ZGUnLFxuICBsaWdodHllbGxvdzogJ2ZmZmZlMCcsXG4gIGxpbWU6ICcwZjAnLFxuICBsaW1lZ3JlZW46ICczMmNkMzInLFxuICBsaW5lbjogJ2ZhZjBlNicsXG4gIG1hZ2VudGE6ICdmMGYnLFxuICBtYXJvb246ICc4MDAwMDAnLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAnNjZjZGFhJyxcbiAgbWVkaXVtYmx1ZTogJzAwMDBjZCcsXG4gIG1lZGl1bW9yY2hpZDogJ2JhNTVkMycsXG4gIG1lZGl1bXB1cnBsZTogJzkzNzBkYicsXG4gIG1lZGl1bXNlYWdyZWVuOiAnM2NiMzcxJyxcbiAgbWVkaXVtc2xhdGVibHVlOiAnN2I2OGVlJyxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46ICcwMGZhOWEnLFxuICBtZWRpdW10dXJxdW9pc2U6ICc0OGQxY2MnLFxuICBtZWRpdW12aW9sZXRyZWQ6ICdjNzE1ODUnLFxuICBtaWRuaWdodGJsdWU6ICcxOTE5NzAnLFxuICBtaW50Y3JlYW06ICdmNWZmZmEnLFxuICBtaXN0eXJvc2U6ICdmZmU0ZTEnLFxuICBtb2NjYXNpbjogJ2ZmZTRiNScsXG4gIG5hdmFqb3doaXRlOiAnZmZkZWFkJyxcbiAgbmF2eTogJzAwMDA4MCcsXG4gIG9sZGxhY2U6ICdmZGY1ZTYnLFxuICBvbGl2ZTogJzgwODAwMCcsXG4gIG9saXZlZHJhYjogJzZiOGUyMycsXG4gIG9yYW5nZTogJ2ZmYTUwMCcsXG4gIG9yYW5nZXJlZDogJ2ZmNDUwMCcsXG4gIG9yY2hpZDogJ2RhNzBkNicsXG4gIHBhbGVnb2xkZW5yb2Q6ICdlZWU4YWEnLFxuICBwYWxlZ3JlZW46ICc5OGZiOTgnLFxuICBwYWxldHVycXVvaXNlOiAnYWZlZWVlJyxcbiAgcGFsZXZpb2xldHJlZDogJ2RiNzA5MycsXG4gIHBhcGF5YXdoaXA6ICdmZmVmZDUnLFxuICBwZWFjaHB1ZmY6ICdmZmRhYjknLFxuICBwZXJ1OiAnY2Q4NTNmJyxcbiAgcGluazogJ2ZmYzBjYicsXG4gIHBsdW06ICdkZGEwZGQnLFxuICBwb3dkZXJibHVlOiAnYjBlMGU2JyxcbiAgcHVycGxlOiAnODAwMDgwJyxcbiAgcmViZWNjYXB1cnBsZTogJzYzOScsXG4gIHJlZDogJ2YwMCcsXG4gIHJvc3licm93bjogJ2JjOGY4ZicsXG4gIHJveWFsYmx1ZTogJzQxNjllMScsXG4gIHNhZGRsZWJyb3duOiAnOGI0NTEzJyxcbiAgc2FsbW9uOiAnZmE4MDcyJyxcbiAgc2FuZHlicm93bjogJ2Y0YTQ2MCcsXG4gIHNlYWdyZWVuOiAnMmU4YjU3JyxcbiAgc2Vhc2hlbGw6ICdmZmY1ZWUnLFxuICBzaWVubmE6ICdhMDUyMmQnLFxuICBzaWx2ZXI6ICdjMGMwYzAnLFxuICBza3libHVlOiAnODdjZWViJyxcbiAgc2xhdGVibHVlOiAnNmE1YWNkJyxcbiAgc2xhdGVncmF5OiAnNzA4MDkwJyxcbiAgc2xhdGVncmV5OiAnNzA4MDkwJyxcbiAgc25vdzogJ2ZmZmFmYScsXG4gIHNwcmluZ2dyZWVuOiAnMDBmZjdmJyxcbiAgc3RlZWxibHVlOiAnNDY4MmI0JyxcbiAgdGFuOiAnZDJiNDhjJyxcbiAgdGVhbDogJzAwODA4MCcsXG4gIHRoaXN0bGU6ICdkOGJmZDgnLFxuICB0b21hdG86ICdmZjYzNDcnLFxuICB0dXJxdW9pc2U6ICc0MGUwZDAnLFxuICB2aW9sZXQ6ICdlZTgyZWUnLFxuICB3aGVhdDogJ2Y1ZGViMycsXG4gIHdoaXRlOiAnZmZmJyxcbiAgd2hpdGVzbW9rZTogJ2Y1ZjVmNScsXG4gIHllbGxvdzogJ2ZmMCcsXG4gIHllbGxvd2dyZWVuOiAnOWFjZDMyJ1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgYSBDU1MgbmFtZWQgY29sb3IgYW5kIHJldHVybnMgaXRzIGVxdWl2YWxlbnQgaGV4IHZhbHVlLCBvdGhlcndpc2UgcmV0dXJucyB0aGUgb3JpZ2luYWwgY29sb3IuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBuYW1lVG9IZXgoY29sb3IpIHtcbiAgaWYgKHR5cGVvZiBjb2xvciAhPT0gJ3N0cmluZycpIHJldHVybiBjb2xvcjtcbiAgdmFyIG5vcm1hbGl6ZWRDb2xvck5hbWUgPSBjb2xvci50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gbmFtZWRDb2xvck1hcFtub3JtYWxpemVkQ29sb3JOYW1lXSA/ICcjJyArIG5hbWVkQ29sb3JNYXBbbm9ybWFsaXplZENvbG9yTmFtZV0gOiBjb2xvcjtcbn1cblxuLy8gICAgICBcbnZhciBoZXhSZWdleCA9IC9eI1thLWZBLUYwLTldezZ9JC87XG52YXIgcmVkdWNlZEhleFJlZ2V4ID0gL14jW2EtZkEtRjAtOV17M30kLztcbnZhciByZ2JSZWdleCA9IC9ecmdiXFwoXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccypcXCkkLztcbnZhciByZ2JhUmVnZXggPSAvXnJnYmFcXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFstK10/WzAtOV0qWy5dP1swLTldKylcXHMqXFwpJC87XG52YXIgaHNsUmVnZXggPSAvXmhzbFxcKFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KSVcXHMqLFxccyooXFxkezEsM30pJVxccypcXCkkLztcbnZhciBoc2xhUmVnZXggPSAvXmhzbGFcXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSklXFxzKixcXHMqKFxcZHsxLDN9KSVcXHMqLFxccyooWy0rXT9bMC05XSpbLl0/WzAtOV0rKVxccypcXCkkLztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIFJnYkNvbG9yIG9yIFJnYmFDb2xvciBvYmplY3QuIFRoaXMgdXRpbGl0eSBmdW5jdGlvbiBpcyBvbmx5IHVzZWZ1bFxuICogaWYgd2FudCB0byBleHRyYWN0IGEgY29sb3IgY29tcG9uZW50LiBXaXRoIHRoZSBjb2xvciB1dGlsIGB0b0NvbG9yU3RyaW5nYCB5b3VcbiAqIGNhbiBjb252ZXJ0IGEgUmdiQ29sb3Igb3IgUmdiYUNvbG9yIG9iamVjdCBiYWNrIHRvIGEgc3RyaW5nLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBc3NpZ25zIGB7IHJlZDogMjU1LCBncmVlbjogMCwgYmx1ZTogMCB9YCB0byBjb2xvcjFcbiAqIGNvbnN0IGNvbG9yMSA9ICdyZ2IoMjU1LCAwLCAwKSc7XG4gKiAvLyBBc3NpZ25zIGB7IHJlZDogOTIsIGdyZWVuOiAxMDIsIGJsdWU6IDExMiwgYWxwaGE6IDAuNzUgfWAgdG8gY29sb3IyXG4gKiBjb25zdCBjb2xvcjIgPSAnaHNsYSgyMTAsIDEwJSwgNDAlLCAwLjc1KSc7XG4gKi9cbmZ1bmN0aW9uIHBhcnNlVG9SZ2IoY29sb3IpIHtcbiAgaWYgKHR5cGVvZiBjb2xvciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBhbiBpbmNvcnJlY3QgYXJndW1lbnQgdG8gYSBjb2xvciBmdW5jdGlvbiwgcGxlYXNlIHBhc3MgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBjb2xvci4nKTtcbiAgfVxuICB2YXIgbm9ybWFsaXplZENvbG9yID0gbmFtZVRvSGV4KGNvbG9yKTtcbiAgaWYgKG5vcm1hbGl6ZWRDb2xvci5tYXRjaChoZXhSZWdleCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIG5vcm1hbGl6ZWRDb2xvclsxXSArIG5vcm1hbGl6ZWRDb2xvclsyXSwgMTYpLFxuICAgICAgZ3JlZW46IHBhcnNlSW50KCcnICsgbm9ybWFsaXplZENvbG9yWzNdICsgbm9ybWFsaXplZENvbG9yWzRdLCAxNiksXG4gICAgICBibHVlOiBwYXJzZUludCgnJyArIG5vcm1hbGl6ZWRDb2xvcls1XSArIG5vcm1hbGl6ZWRDb2xvcls2XSwgMTYpXG4gICAgfTtcbiAgfVxuICBpZiAobm9ybWFsaXplZENvbG9yLm1hdGNoKHJlZHVjZWRIZXhSZWdleCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIG5vcm1hbGl6ZWRDb2xvclsxXSArIG5vcm1hbGl6ZWRDb2xvclsxXSwgMTYpLFxuICAgICAgZ3JlZW46IHBhcnNlSW50KCcnICsgbm9ybWFsaXplZENvbG9yWzJdICsgbm9ybWFsaXplZENvbG9yWzJdLCAxNiksXG4gICAgICBibHVlOiBwYXJzZUludCgnJyArIG5vcm1hbGl6ZWRDb2xvclszXSArIG5vcm1hbGl6ZWRDb2xvclszXSwgMTYpXG4gICAgfTtcbiAgfVxuICB2YXIgcmdiTWF0Y2hlZCA9IHJnYlJlZ2V4LmV4ZWMobm9ybWFsaXplZENvbG9yKTtcbiAgaWYgKHJnYk1hdGNoZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIHJnYk1hdGNoZWRbMV0sIDEwKSxcbiAgICAgIGdyZWVuOiBwYXJzZUludCgnJyArIHJnYk1hdGNoZWRbMl0sIDEwKSxcbiAgICAgIGJsdWU6IHBhcnNlSW50KCcnICsgcmdiTWF0Y2hlZFszXSwgMTApXG4gICAgfTtcbiAgfVxuICB2YXIgcmdiYU1hdGNoZWQgPSByZ2JhUmVnZXguZXhlYyhub3JtYWxpemVkQ29sb3IpO1xuICBpZiAocmdiYU1hdGNoZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIHJnYmFNYXRjaGVkWzFdLCAxMCksXG4gICAgICBncmVlbjogcGFyc2VJbnQoJycgKyByZ2JhTWF0Y2hlZFsyXSwgMTApLFxuICAgICAgYmx1ZTogcGFyc2VJbnQoJycgKyByZ2JhTWF0Y2hlZFszXSwgMTApLFxuICAgICAgYWxwaGE6IHBhcnNlRmxvYXQoJycgKyByZ2JhTWF0Y2hlZFs0XSlcbiAgICB9O1xuICB9XG4gIHZhciBoc2xNYXRjaGVkID0gaHNsUmVnZXguZXhlYyhub3JtYWxpemVkQ29sb3IpO1xuICBpZiAoaHNsTWF0Y2hlZCkge1xuICAgIHZhciBodWUgPSBwYXJzZUludCgnJyArIGhzbE1hdGNoZWRbMV0sIDEwKTtcbiAgICB2YXIgc2F0dXJhdGlvbiA9IHBhcnNlSW50KCcnICsgaHNsTWF0Y2hlZFsyXSwgMTApIC8gMTAwO1xuICAgIHZhciBsaWdodG5lc3MgPSBwYXJzZUludCgnJyArIGhzbE1hdGNoZWRbM10sIDEwKSAvIDEwMDtcbiAgICB2YXIgcmdiQ29sb3JTdHJpbmcgPSAncmdiKCcgKyBoc2xUb1JnYihodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcykgKyAnKSc7XG4gICAgdmFyIGhzbFJnYk1hdGNoZWQgPSByZ2JSZWdleC5leGVjKHJnYkNvbG9yU3RyaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIGhzbFJnYk1hdGNoZWRbMV0sIDEwKSxcbiAgICAgIGdyZWVuOiBwYXJzZUludCgnJyArIGhzbFJnYk1hdGNoZWRbMl0sIDEwKSxcbiAgICAgIGJsdWU6IHBhcnNlSW50KCcnICsgaHNsUmdiTWF0Y2hlZFszXSwgMTApXG4gICAgfTtcbiAgfVxuICB2YXIgaHNsYU1hdGNoZWQgPSBoc2xhUmVnZXguZXhlYyhub3JtYWxpemVkQ29sb3IpO1xuICBpZiAoaHNsYU1hdGNoZWQpIHtcbiAgICB2YXIgX2h1ZSA9IHBhcnNlSW50KCcnICsgaHNsYU1hdGNoZWRbMV0sIDEwKTtcbiAgICB2YXIgX3NhdHVyYXRpb24gPSBwYXJzZUludCgnJyArIGhzbGFNYXRjaGVkWzJdLCAxMCkgLyAxMDA7XG4gICAgdmFyIF9saWdodG5lc3MgPSBwYXJzZUludCgnJyArIGhzbGFNYXRjaGVkWzNdLCAxMCkgLyAxMDA7XG4gICAgdmFyIF9yZ2JDb2xvclN0cmluZyA9ICdyZ2IoJyArIGhzbFRvUmdiKF9odWUsIF9zYXR1cmF0aW9uLCBfbGlnaHRuZXNzKSArICcpJztcbiAgICB2YXIgX2hzbFJnYk1hdGNoZWQgPSByZ2JSZWdleC5leGVjKF9yZ2JDb2xvclN0cmluZyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZDogcGFyc2VJbnQoJycgKyBfaHNsUmdiTWF0Y2hlZFsxXSwgMTApLFxuICAgICAgZ3JlZW46IHBhcnNlSW50KCcnICsgX2hzbFJnYk1hdGNoZWRbMl0sIDEwKSxcbiAgICAgIGJsdWU6IHBhcnNlSW50KCcnICsgX2hzbFJnYk1hdGNoZWRbM10sIDEwKSxcbiAgICAgIGFscGhhOiBwYXJzZUZsb2F0KCcnICsgaHNsYU1hdGNoZWRbNF0pXG4gICAgfTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBwYXJzZSB0aGUgY29sb3Igc3RyaW5nLiBQbGVhc2UgcHJvdmlkZSB0aGUgY29sb3IgYXMgYSBzdHJpbmcgaW4gaGV4LCByZ2IsIHJnYmEsIGhzbCBvciBoc2xhIG5vdGF0aW9uLlwiKTtcbn1cblxuLy8gICAgICBcblxuXG5mdW5jdGlvbiByZ2JUb0hzbChjb2xvcikge1xuICAvLyBtYWtlIHN1cmUgcmdiIGFyZSBjb250YWluZWQgaW4gYSBzZXQgb2YgWzAsIDI1NV1cbiAgdmFyIHJlZCA9IGNvbG9yLnJlZCAvIDI1NTtcbiAgdmFyIGdyZWVuID0gY29sb3IuZ3JlZW4gLyAyNTU7XG4gIHZhciBibHVlID0gY29sb3IuYmx1ZSAvIDI1NTtcblxuICB2YXIgbWF4ID0gTWF0aC5tYXgocmVkLCBncmVlbiwgYmx1ZSk7XG4gIHZhciBtaW4gPSBNYXRoLm1pbihyZWQsIGdyZWVuLCBibHVlKTtcbiAgdmFyIGxpZ2h0bmVzcyA9IChtYXggKyBtaW4pIC8gMjtcblxuICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAvLyBhY2hyb21hdGljXG4gICAgaWYgKGNvbG9yLmFscGhhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB7IGh1ZTogMCwgc2F0dXJhdGlvbjogMCwgbGlnaHRuZXNzOiBsaWdodG5lc3MsIGFscGhhOiBjb2xvci5hbHBoYSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyBodWU6IDAsIHNhdHVyYXRpb246IDAsIGxpZ2h0bmVzczogbGlnaHRuZXNzIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIGh1ZSA9IHZvaWQgMDtcbiAgdmFyIGRlbHRhID0gbWF4IC0gbWluO1xuICB2YXIgc2F0dXJhdGlvbiA9IGxpZ2h0bmVzcyA+IDAuNSA/IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pIDogZGVsdGEgLyAobWF4ICsgbWluKTtcbiAgc3dpdGNoIChtYXgpIHtcbiAgICBjYXNlIHJlZDpcbiAgICAgIGh1ZSA9IChncmVlbiAtIGJsdWUpIC8gZGVsdGEgKyAoZ3JlZW4gPCBibHVlID8gNiA6IDApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBncmVlbjpcbiAgICAgIGh1ZSA9IChibHVlIC0gcmVkKSAvIGRlbHRhICsgMjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBibHVlIGNhc2VcbiAgICAgIGh1ZSA9IChyZWQgLSBncmVlbikgLyBkZWx0YSArIDQ7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGh1ZSAqPSA2MDtcbiAgaWYgKGNvbG9yLmFscGhhICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4geyBodWU6IGh1ZSwgc2F0dXJhdGlvbjogc2F0dXJhdGlvbiwgbGlnaHRuZXNzOiBsaWdodG5lc3MsIGFscGhhOiBjb2xvci5hbHBoYSB9O1xuICB9XG4gIHJldHVybiB7IGh1ZTogaHVlLCBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uLCBsaWdodG5lc3M6IGxpZ2h0bmVzcyB9O1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIFJldHVybnMgYW4gSHNsQ29sb3Igb3IgSHNsYUNvbG9yIG9iamVjdC4gVGhpcyB1dGlsaXR5IGZ1bmN0aW9uIGlzIG9ubHkgdXNlZnVsXG4gKiBpZiB3YW50IHRvIGV4dHJhY3QgYSBjb2xvciBjb21wb25lbnQuIFdpdGggdGhlIGNvbG9yIHV0aWwgYHRvQ29sb3JTdHJpbmdgIHlvdVxuICogY2FuIGNvbnZlcnQgYSBIc2xDb2xvciBvciBIc2xhQ29sb3Igb2JqZWN0IGJhY2sgdG8gYSBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFzc2lnbnMgYHsgcmVkOiAyNTUsIGdyZWVuOiAwLCBibHVlOiAwIH1gIHRvIGNvbG9yMVxuICogY29uc3QgY29sb3IxID0gJ3JnYigyNTUsIDAsIDApJztcbiAqIC8vIEFzc2lnbnMgYHsgcmVkOiA5MiwgZ3JlZW46IDEwMiwgYmx1ZTogMTEyLCBhbHBoYTogMC43NSB9YCB0byBjb2xvcjJcbiAqIGNvbnN0IGNvbG9yMiA9ICdoc2xhKDIxMCwgMTAlLCA0MCUsIDAuNzUpJztcbiAqL1xuZnVuY3Rpb24gcGFyc2VUb0hzbChjb2xvcikge1xuICAvLyBOb3RlOiBBdCBhIGxhdGVyIHN0YWdlIHdlIGNhbiBvcHRpbWl6ZSB0aGlzIGZ1bmN0aW9uIGFzIHJpZ2h0IG5vdyBhIGhzbFxuICAvLyBjb2xvciB3b3VsZCBiZSBwYXJzZWQgY29udmVydGVkIHRvIHJnYiB2YWx1ZXMgYW5kIGNvbnZlcnRlZCBiYWNrIHRvIGhzbC5cbiAgcmV0dXJuIHJnYlRvSHNsKHBhcnNlVG9SZ2IoY29sb3IpKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZWR1Y2VzIGhleCB2YWx1ZXMgaWYgcG9zc2libGUgZS5nLiAjZmY4ODY2IHRvICNmODZcbiAqIEBwcml2YXRlXG4gKi9cbnZhciByZWR1Y2VIZXhWYWx1ZSA9IGZ1bmN0aW9uIHJlZHVjZUhleFZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZS5sZW5ndGggPT09IDcgJiYgdmFsdWVbMV0gPT09IHZhbHVlWzJdICYmIHZhbHVlWzNdID09PSB2YWx1ZVs0XSAmJiB2YWx1ZVs1XSA9PT0gdmFsdWVbNl0pIHtcbiAgICByZXR1cm4gXCIjXCIgKyB2YWx1ZVsxXSArIHZhbHVlWzNdICsgdmFsdWVbNV07XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuLy8gICAgICBcbmZ1bmN0aW9uIG51bWJlclRvSGV4KHZhbHVlKSB7XG4gIHZhciBoZXggPSB2YWx1ZS50b1N0cmluZygxNik7XG4gIHJldHVybiBoZXgubGVuZ3RoID09PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyB2YWx1ZSBmb3IgdGhlIGNvbG9yLiBUaGUgcmV0dXJuZWQgcmVzdWx0IGlzIHRoZSBzbWFsbGVzdCBwb3NzaWJsZSBoZXggbm90YXRpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogcmdiKDI1NSwgMjA1LCAxMDApLFxuICogICBiYWNrZ3JvdW5kOiByZ2IoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwIH0pLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3JnYigyNTUsIDIwNSwgMTAwKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7cmdiKHsgcmVkOiAyNTUsIGdyZWVuOiAyMDUsIGJsdWU6IDEwMCB9KX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiNmZmNkNjRcIjtcbiAqICAgYmFja2dyb3VuZDogXCIjZmZjZDY0XCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHJnYih2YWx1ZSwgZ3JlZW4sIGJsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGdyZWVuID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYmx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gcmVkdWNlSGV4VmFsdWUoJyMnICsgbnVtYmVyVG9IZXgodmFsdWUpICsgbnVtYmVyVG9IZXgoZ3JlZW4pICsgbnVtYmVyVG9IZXgoYmx1ZSkpO1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnICYmIGdyZWVuID09PSB1bmRlZmluZWQgJiYgYmx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlZHVjZUhleFZhbHVlKCcjJyArIG51bWJlclRvSGV4KHZhbHVlLnJlZCkgKyBudW1iZXJUb0hleCh2YWx1ZS5ncmVlbikgKyBudW1iZXJUb0hleCh2YWx1ZS5ibHVlKSk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBpbnZhbGlkIGFyZ3VtZW50cyB0byByZ2IsIHBsZWFzZSBwYXNzIG11bHRpcGxlIG51bWJlcnMgZS5nLiByZ2IoMjU1LCAyMDUsIDEwMCkgb3IgYW4gb2JqZWN0IGUuZy4gcmdiKHsgcmVkOiAyNTUsIGdyZWVuOiAyMDUsIGJsdWU6IDEwMCB9KS4nKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHZhbHVlIGZvciB0aGUgY29sb3IuIFRoZSByZXR1cm5lZCByZXN1bHQgaXMgdGhlIHNtYWxsZXN0IHBvc3NpYmxlIHJnYmEgb3IgaGV4IG5vdGF0aW9uLlxuICpcbiAqIENhbiBhbHNvIGJlIHVzZWQgdG8gZmFkZSBhIGNvbG9yIGJ5IHBhc3NpbmcgYSBoZXggdmFsdWUgb3IgbmFtZWQgQ1NTIGNvbG9yIGFsb25nIHdpdGggYW4gYWxwaGEgdmFsdWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDIwNSwgMTAwLCAwLjcpLFxuICogICBiYWNrZ3JvdW5kOiByZ2JhKHsgcmVkOiAyNTUsIGdyZWVuOiAyMDUsIGJsdWU6IDEwMCwgYWxwaGE6IDAuNyB9KSxcbiAqICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDIwNSwgMTAwLCAxKSxcbiAqICAgYmFja2dyb3VuZDogcmdiYSgnI2ZmZmZmZicsIDAuNCksXG4gKiAgIGJhY2tncm91bmQ6IHJnYmEoJ2JsYWNrJywgMC43KSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtyZ2JhKDI1NSwgMjA1LCAxMDAsIDAuNyl9O1xuICogICBiYWNrZ3JvdW5kOiAke3JnYmEoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwLCBhbHBoYTogMC43IH0pfTtcbiAqICAgYmFja2dyb3VuZDogJHtyZ2JhKDI1NSwgMjA1LCAxMDAsIDEpfTtcbiAqICAgYmFja2dyb3VuZDogJHtyZ2JhKCcjZmZmZmZmJywgMC40KX07XG4gKiAgIGJhY2tncm91bmQ6ICR7cmdiYSgnYmxhY2snLCAwLjcpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjA1LDEwMCwwLjcpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjA1LDEwMCwwLjcpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2ZmY2Q2NFwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjU1LDI1NSwyNTUsMC40KVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiByZ2JhKGZpcnN0VmFsdWUsIHNlY29uZFZhbHVlLCB0aGlyZFZhbHVlLCBmb3VydGhWYWx1ZSkge1xuICBpZiAodHlwZW9mIGZpcnN0VmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBzZWNvbmRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB2YXIgcmdiVmFsdWUgPSBwYXJzZVRvUmdiKGZpcnN0VmFsdWUpO1xuICAgIHJldHVybiAncmdiYSgnICsgcmdiVmFsdWUucmVkICsgJywnICsgcmdiVmFsdWUuZ3JlZW4gKyAnLCcgKyByZ2JWYWx1ZS5ibHVlICsgJywnICsgc2Vjb25kVmFsdWUgKyAnKSc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0VmFsdWUgPT09ICdudW1iZXInICYmIHR5cGVvZiBzZWNvbmRWYWx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHRoaXJkVmFsdWUgPT09ICdudW1iZXInICYmIHR5cGVvZiBmb3VydGhWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZm91cnRoVmFsdWUgPj0gMSA/IHJnYihmaXJzdFZhbHVlLCBzZWNvbmRWYWx1ZSwgdGhpcmRWYWx1ZSkgOiAncmdiYSgnICsgZmlyc3RWYWx1ZSArICcsJyArIHNlY29uZFZhbHVlICsgJywnICsgdGhpcmRWYWx1ZSArICcsJyArIGZvdXJ0aFZhbHVlICsgJyknO1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgZmlyc3RWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoZmlyc3RWYWx1ZSkpID09PSAnb2JqZWN0JyAmJiBzZWNvbmRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIHRoaXJkVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBmb3VydGhWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZpcnN0VmFsdWUuYWxwaGEgPj0gMSA/IHJnYihmaXJzdFZhbHVlLnJlZCwgZmlyc3RWYWx1ZS5ncmVlbiwgZmlyc3RWYWx1ZS5ibHVlKSA6ICdyZ2JhKCcgKyBmaXJzdFZhbHVlLnJlZCArICcsJyArIGZpcnN0VmFsdWUuZ3JlZW4gKyAnLCcgKyBmaXJzdFZhbHVlLmJsdWUgKyAnLCcgKyBmaXJzdFZhbHVlLmFscGhhICsgJyknO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgaW52YWxpZCBhcmd1bWVudHMgdG8gcmdiYSwgcGxlYXNlIHBhc3MgbXVsdGlwbGUgbnVtYmVycyBlLmcuIHJnYigyNTUsIDIwNSwgMTAwLCAwLjc1KSBvciBhbiBvYmplY3QgZS5nLiByZ2IoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwLCBhbHBoYTogMC43NSB9KS4nKTtcbn1cblxuLy8gICAgICBcbmZ1bmN0aW9uIGNvbG9yVG9IZXgoY29sb3IpIHtcbiAgcmV0dXJuIG51bWJlclRvSGV4KE1hdGgucm91bmQoY29sb3IgKiAyNTUpKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFRvSGV4KHJlZCwgZ3JlZW4sIGJsdWUpIHtcbiAgcmV0dXJuIHJlZHVjZUhleFZhbHVlKCcjJyArIGNvbG9yVG9IZXgocmVkKSArIGNvbG9yVG9IZXgoZ3JlZW4pICsgY29sb3JUb0hleChibHVlKSk7XG59XG5cbmZ1bmN0aW9uIGhzbFRvSGV4KGh1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzKSB7XG4gIHJldHVybiBoc2xUb1JnYihodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcywgY29udmVydFRvSGV4KTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHZhbHVlIGZvciB0aGUgY29sb3IuIFRoZSByZXR1cm5lZCByZXN1bHQgaXMgdGhlIHNtYWxsZXN0IHBvc3NpYmxlIGhleCBub3RhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBiYWNrZ3JvdW5kOiBoc2woMzU5LCAwLjc1LCAwLjQpLFxuICogICBiYWNrZ3JvdW5kOiBoc2woeyBodWU6IDM2MCwgc2F0dXJhdGlvbjogMC43NSwgbGlnaHRuZXNzOiAwLjQgfSksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7aHNsKDM1OSwgMC43NSwgMC40KX07XG4gKiAgIGJhY2tncm91bmQ6ICR7aHNsKHsgaHVlOiAzNjAsIHNhdHVyYXRpb246IDAuNzUsIGxpZ2h0bmVzczogMC40IH0pfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2IzMTkxY1wiO1xuICogICBiYWNrZ3JvdW5kOiBcIiNiMzE5MWNcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gaHNsKHZhbHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHNhdHVyYXRpb24gPT09ICdudW1iZXInICYmIHR5cGVvZiBsaWdodG5lc3MgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGhzbFRvSGV4KHZhbHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpO1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnICYmIHNhdHVyYXRpb24gPT09IHVuZGVmaW5lZCAmJiBsaWdodG5lc3MgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoc2xUb0hleCh2YWx1ZS5odWUsIHZhbHVlLnNhdHVyYXRpb24sIHZhbHVlLmxpZ2h0bmVzcyk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBpbnZhbGlkIGFyZ3VtZW50cyB0byBoc2wsIHBsZWFzZSBwYXNzIG11bHRpcGxlIG51bWJlcnMgZS5nLiBoc2woMzYwLCAwLjc1LCAwLjQpIG9yIGFuIG9iamVjdCBlLmcuIHJnYih7IGh1ZTogMjU1LCBzYXR1cmF0aW9uOiAwLjQsIGxpZ2h0bmVzczogMC43NSB9KS4nKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHZhbHVlIGZvciB0aGUgY29sb3IuIFRoZSByZXR1cm5lZCByZXN1bHQgaXMgdGhlIHNtYWxsZXN0IHBvc3NpYmxlIHJnYmEgb3IgaGV4IG5vdGF0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGhzbGEoMzU5LCAwLjc1LCAwLjQsIDAuNyksXG4gKiAgIGJhY2tncm91bmQ6IGhzbGEoeyBodWU6IDM2MCwgc2F0dXJhdGlvbjogMC43NSwgbGlnaHRuZXNzOiAwLjQsIGFscGhhOiAwLDcgfSksXG4gKiAgIGJhY2tncm91bmQ6IGhzbGEoMzU5LCAwLjc1LCAwLjQsIDEpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke2hzbGEoMzU5LCAwLjc1LCAwLjQsIDAuNyl9O1xuICogICBiYWNrZ3JvdW5kOiAke2hzbGEoeyBodWU6IDM2MCwgc2F0dXJhdGlvbjogMC43NSwgbGlnaHRuZXNzOiAwLjQsIGFscGhhOiAwLDcgfSl9O1xuICogICBiYWNrZ3JvdW5kOiAke2hzbGEoMzU5LCAwLjc1LCAwLjQsIDEpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgxNzksMjUsMjgsMC43KVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMTc5LDI1LDI4LDAuNylcIjtcbiAqICAgYmFja2dyb3VuZDogXCIjYjMxOTFjXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIGhzbGEodmFsdWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcywgYWxwaGEpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHNhdHVyYXRpb24gPT09ICdudW1iZXInICYmIHR5cGVvZiBsaWdodG5lc3MgPT09ICdudW1iZXInICYmIHR5cGVvZiBhbHBoYSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gYWxwaGEgPj0gMSA/IGhzbFRvSGV4KHZhbHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpIDogJ3JnYmEoJyArIGhzbFRvUmdiKHZhbHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpICsgJywnICsgYWxwaGEgKyAnKSc7XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcgJiYgc2F0dXJhdGlvbiA9PT0gdW5kZWZpbmVkICYmIGxpZ2h0bmVzcyA9PT0gdW5kZWZpbmVkICYmIGFscGhhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdmFsdWUuYWxwaGEgPj0gMSA/IGhzbFRvSGV4KHZhbHVlLmh1ZSwgdmFsdWUuc2F0dXJhdGlvbiwgdmFsdWUubGlnaHRuZXNzKSA6ICdyZ2JhKCcgKyBoc2xUb1JnYih2YWx1ZS5odWUsIHZhbHVlLnNhdHVyYXRpb24sIHZhbHVlLmxpZ2h0bmVzcykgKyAnLCcgKyB2YWx1ZS5hbHBoYSArICcpJztcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignUGFzc2VkIGludmFsaWQgYXJndW1lbnRzIHRvIGhzbGEsIHBsZWFzZSBwYXNzIG11bHRpcGxlIG51bWJlcnMgZS5nLiBoc2woMzYwLCAwLjc1LCAwLjQsIDAuNykgb3IgYW4gb2JqZWN0IGUuZy4gcmdiKHsgaHVlOiAyNTUsIHNhdHVyYXRpb246IDAuNCwgbGlnaHRuZXNzOiAwLjc1LCBhbHBoYTogMC43IH0pLicpO1xufVxuXG4vLyAgICAgIFxudmFyIGlzUmdiID0gZnVuY3Rpb24gaXNSZ2IoY29sb3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBjb2xvci5yZWQgPT09ICdudW1iZXInICYmIHR5cGVvZiBjb2xvci5ncmVlbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmJsdWUgPT09ICdudW1iZXInICYmICh0eXBlb2YgY29sb3IuYWxwaGEgIT09ICdudW1iZXInIHx8IHR5cGVvZiBjb2xvci5hbHBoYSA9PT0gJ3VuZGVmaW5lZCcpO1xufTtcblxudmFyIGlzUmdiYSA9IGZ1bmN0aW9uIGlzUmdiYShjb2xvcikge1xuICByZXR1cm4gdHlwZW9mIGNvbG9yLnJlZCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmdyZWVuID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgY29sb3IuYmx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmFscGhhID09PSAnbnVtYmVyJztcbn07XG5cbnZhciBpc0hzbCA9IGZ1bmN0aW9uIGlzSHNsKGNvbG9yKSB7XG4gIHJldHVybiB0eXBlb2YgY29sb3IuaHVlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgY29sb3Iuc2F0dXJhdGlvbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmxpZ2h0bmVzcyA9PT0gJ251bWJlcicgJiYgKHR5cGVvZiBjb2xvci5hbHBoYSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIGNvbG9yLmFscGhhID09PSAndW5kZWZpbmVkJyk7XG59O1xuXG52YXIgaXNIc2xhID0gZnVuY3Rpb24gaXNIc2xhKGNvbG9yKSB7XG4gIHJldHVybiB0eXBlb2YgY29sb3IuaHVlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgY29sb3Iuc2F0dXJhdGlvbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmxpZ2h0bmVzcyA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmFscGhhID09PSAnbnVtYmVyJztcbn07XG5cbnZhciBlcnJNc2cgPSAnUGFzc2VkIGludmFsaWQgYXJndW1lbnQgdG8gdG9Db2xvclN0cmluZywgcGxlYXNlIHBhc3MgYSBSZ2JDb2xvciwgUmdiYUNvbG9yLCBIc2xDb2xvciBvciBIc2xhQ29sb3Igb2JqZWN0Lic7XG5cbi8qKlxuICogQ29udmVydHMgYSBSZ2JDb2xvciwgUmdiYUNvbG9yLCBIc2xDb2xvciBvciBIc2xhQ29sb3Igb2JqZWN0IHRvIGEgY29sb3Igc3RyaW5nLlxuICogVGhpcyB1dGlsIGlzIHVzZWZ1bCBpbiBjYXNlIHlvdSBvbmx5IGtub3cgb24gcnVudGltZSB3aGljaCBjb2xvciBvYmplY3QgaXNcbiAqIHVzZWQuIE90aGVyd2lzZSB3ZSByZWNvbW1lbmQgdG8gcmVseSBvbiBgcmdiYCwgYHJnYmFgLCBgaHNsYCBvciBgaHNsYWAuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogdG9Db2xvclN0cmluZyh7IHJlZDogMjU1LCBncmVlbjogMjA1LCBibHVlOiAxMDAgfSksXG4gKiAgIGJhY2tncm91bmQ6IHRvQ29sb3JTdHJpbmcoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwLCBhbHBoYTogMC43MiB9KSxcbiAqICAgYmFja2dyb3VuZDogdG9Db2xvclN0cmluZyh7IGh1ZTogMjQwLCBzYXR1cmF0aW9uOiAxLCBsaWdodG5lc3M6IDAuNSB9KSxcbiAqICAgYmFja2dyb3VuZDogdG9Db2xvclN0cmluZyh7IGh1ZTogMzYwLCBzYXR1cmF0aW9uOiAwLjc1LCBsaWdodG5lc3M6IDAuNCwgYWxwaGE6IDAuNzIgfSksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7dG9Db2xvclN0cmluZyh7IHJlZDogMjU1LCBncmVlbjogMjA1LCBibHVlOiAxMDAgfSl9O1xuICogICBiYWNrZ3JvdW5kOiAke3RvQ29sb3JTdHJpbmcoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwLCBhbHBoYTogMC43MiB9KX07XG4gKiAgIGJhY2tncm91bmQ6ICR7dG9Db2xvclN0cmluZyh7IGh1ZTogMjQwLCBzYXR1cmF0aW9uOiAxLCBsaWdodG5lc3M6IDAuNSB9KX07XG4gKiAgIGJhY2tncm91bmQ6ICR7dG9Db2xvclN0cmluZyh7IGh1ZTogMzYwLCBzYXR1cmF0aW9uOiAwLjc1LCBsaWdodG5lc3M6IDAuNCwgYWxwaGE6IDAuNzIgfSl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiNmZmNkNjRcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDI1NSwyMDUsMTAwLDAuNzIpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwiIzAwZlwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMTc5LDI1LDI1LDAuNzIpXCI7XG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gdG9Db2xvclN0cmluZyhjb2xvcikge1xuICBpZiAoKHR5cGVvZiBjb2xvciA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoY29sb3IpKSAhPT0gJ29iamVjdCcpIHRocm93IG5ldyBFcnJvcihlcnJNc2cpO1xuICBpZiAoaXNSZ2JhKGNvbG9yKSkgcmV0dXJuIHJnYmEoY29sb3IpO1xuICBpZiAoaXNSZ2IoY29sb3IpKSByZXR1cm4gcmdiKGNvbG9yKTtcbiAgaWYgKGlzSHNsYShjb2xvcikpIHJldHVybiBoc2xhKGNvbG9yKTtcbiAgaWYgKGlzSHNsKGNvbG9yKSkgcmV0dXJuIGhzbChjb2xvcik7XG5cbiAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG59XG5cbi8vICAgICAgXG5cbi8vIFR5cGUgZGVmaW5pdGlvbnMgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2NhbnRpL2Zsb3ctc3RhdGljLWxhbmQvYmxvYi9tYXN0ZXIvc3JjL0Z1bi5qc1xuXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cblxuZnVuY3Rpb24gY3VycmllZChmLCBsZW5ndGgsIGFjYykge1xuICByZXR1cm4gZnVuY3Rpb24gZm4oKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuICAgIHZhciBjb21iaW5lZCA9IGFjYy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIGNvbWJpbmVkLmxlbmd0aCA+PSBsZW5ndGggPyBmLmFwcGx5KHRoaXMsIGNvbWJpbmVkKSA6IGN1cnJpZWQoZiwgbGVuZ3RoLCBjb21iaW5lZCk7XG4gIH07XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcbmZ1bmN0aW9uIGN1cnJ5KGYpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZWRlY2xhcmVcbiAgcmV0dXJuIGN1cnJpZWQoZiwgZi5sZW5ndGgsIFtdKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDaGFuZ2VzIHRoZSBodWUgb2YgdGhlIGNvbG9yLiBIdWUgaXMgYSBudW1iZXIgYmV0d2VlbiAwIHRvIDM2MC4gVGhlIGZpcnN0XG4gKiBhcmd1bWVudCBmb3IgYWRqdXN0SHVlIGlzIHRoZSBhbW91bnQgb2YgZGVncmVlcyB0aGUgY29sb3IgaXMgcm90YXRlZCBhbG9uZ1xuICogdGhlIGNvbG9yIHdoZWVsLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGFkanVzdEh1ZSgxODAsICcjNDQ4JyksXG4gKiAgIGJhY2tncm91bmQ6IGFkanVzdEh1ZSgxODAsICdyZ2JhKDEwMSwxMDAsMjA1LDAuNyknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHthZGp1c3RIdWUoMTgwLCAnIzQ0OCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHthZGp1c3RIdWUoMTgwLCAncmdiYSgxMDEsMTAwLDIwNSwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiM4ODg4NDRcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDEzNiwxMzYsNjgsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBhZGp1c3RIdWUoZGVncmVlLCBjb2xvcikge1xuICB2YXIgaHNsQ29sb3IgPSBwYXJzZVRvSHNsKGNvbG9yKTtcbiAgcmV0dXJuIHRvQ29sb3JTdHJpbmcoX2V4dGVuZHMoe30sIGhzbENvbG9yLCB7XG4gICAgaHVlOiAoaHNsQ29sb3IuaHVlICsgZGVncmVlKSAlIDM2MFxuICB9KSk7XG59XG5cbnZhciBjdXJyaWVkQWRqdXN0SHVlID0gLyojX19QVVJFX18qL2N1cnJ5KGFkanVzdEh1ZSk7XG5cbi8vICAgICAgXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY29tcGxlbWVudCBvZiB0aGUgcHJvdmlkZWQgY29sb3IuIFRoaXMgaXMgaWRlbnRpY2FsIHRvIGFkanVzdEh1ZSgxODAsIDxjb2xvcj4pLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGNvbXBsZW1lbnQoJyM0NDgnKSxcbiAqICAgYmFja2dyb3VuZDogY29tcGxlbWVudCgncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7Y29tcGxlbWVudCgnIzQ0OCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtjb21wbGVtZW50KCdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiIzg4NFwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMTUzLDE1MywxNTMsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBjb21wbGVtZW50KGNvbG9yKSB7XG4gIHZhciBoc2xDb2xvciA9IHBhcnNlVG9Ic2woY29sb3IpO1xuICByZXR1cm4gdG9Db2xvclN0cmluZyhfZXh0ZW5kcyh7fSwgaHNsQ29sb3IsIHtcbiAgICBodWU6IChoc2xDb2xvci5odWUgKyAxODApICUgMzYwXG4gIH0pKTtcbn1cblxuLy8gICAgICBcblxuZnVuY3Rpb24gZ3VhcmQobG93ZXJCb3VuZGFyeSwgdXBwZXJCb3VuZGFyeSwgdmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgubWF4KGxvd2VyQm91bmRhcnksIE1hdGgubWluKHVwcGVyQm91bmRhcnksIHZhbHVlKSk7XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyB2YWx1ZSBmb3IgdGhlIGRhcmtlbmVkIGNvbG9yLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGRhcmtlbigwLjIsICcjRkZDRDY0JyksXG4gKiAgIGJhY2tncm91bmQ6IGRhcmtlbigwLjIsICdyZ2JhKDI1NSwyMDUsMTAwLDAuNyknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtkYXJrZW4oMC4yLCAnI0ZGQ0Q2NCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtkYXJrZW4oMC4yLCAncmdiYSgyNTUsMjA1LDEwMCwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqXG4gKiBlbGVtZW50IHtcbiAqICAgYmFja2dyb3VuZDogXCIjZmZiZDMxXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMTg5LDQ5LDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gZGFya2VuKGFtb3VudCwgY29sb3IpIHtcbiAgdmFyIGhzbENvbG9yID0gcGFyc2VUb0hzbChjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBoc2xDb2xvciwge1xuICAgIGxpZ2h0bmVzczogZ3VhcmQoMCwgMSwgaHNsQ29sb3IubGlnaHRuZXNzIC0gYW1vdW50KVxuICB9KSk7XG59XG5cbnZhciBjdXJyaWVkRGFya2VuID0gLyojX19QVVJFX18qL2N1cnJ5KGRhcmtlbik7XG5cbi8vICAgICAgXG5cbi8qKlxuICogRGVjcmVhc2VzIHRoZSBpbnRlbnNpdHkgb2YgYSBjb2xvci4gSXRzIHJhbmdlIGlzIGJldHdlZW4gMCB0byAxLiBUaGUgZmlyc3RcbiAqIGFyZ3VtZW50IG9mIHRoZSBkZXNhdHVyYXRlIGZ1bmN0aW9uIGlzIHRoZSBhbW91bnQgYnkgaG93IG11Y2ggdGhlIGNvbG9yXG4gKiBpbnRlbnNpdHkgc2hvdWxkIGJlIGRlY3JlYXNlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBiYWNrZ3JvdW5kOiBkZXNhdHVyYXRlKDAuMiwgJyNDQ0NENjQnKSxcbiAqICAgYmFja2dyb3VuZDogZGVzYXR1cmF0ZSgwLjIsICdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtkZXNhdHVyYXRlKDAuMiwgJyNDQ0NENjQnKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7ZGVzYXR1cmF0ZSgwLjIsICdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2I4Yjk3OVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMTg0LDE4NSwxMjEsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBkZXNhdHVyYXRlKGFtb3VudCwgY29sb3IpIHtcbiAgdmFyIGhzbENvbG9yID0gcGFyc2VUb0hzbChjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBoc2xDb2xvciwge1xuICAgIHNhdHVyYXRpb246IGd1YXJkKDAsIDEsIGhzbENvbG9yLnNhdHVyYXRpb24gLSBhbW91bnQpXG4gIH0pKTtcbn1cblxudmFyIGN1cnJpZWREZXNhdHVyYXRlID0gLyojX19QVVJFX18qL2N1cnJ5KGRlc2F0dXJhdGUpO1xuXG4vLyAgICAgIFxuLyoqXG4gKiBSZXR1cm5zIGEgbnVtYmVyIChmbG9hdCkgcmVwcmVzZW50aW5nIHRoZSBsdW1pbmFuY2Ugb2YgYSBjb2xvci5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBiYWNrZ3JvdW5kOiBnZXRMdW1pbmFuY2UoJyNDQ0NENjQnKSA+PSBnZXRMdW1pbmFuY2UoJyMwMDAwZmYnKSA/ICcjQ0NDRDY0JyA6ICcjMDAwMGZmJyxcbiAqICAgYmFja2dyb3VuZDogZ2V0THVtaW5hbmNlKCdyZ2JhKDU4LCAxMzMsIDI1NSwgMSknKSA+PSBnZXRMdW1pbmFuY2UoJ3JnYmEoMjU1LCA1NywgMTQ5LCAxKScpID9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSg1OCwgMTMzLCAyNTUsIDEpJyA6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMjU1LCA1NywgMTQ5LCAxKScsXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7Z2V0THVtaW5hbmNlKCcjQ0NDRDY0JykgPj0gZ2V0THVtaW5hbmNlKCcjMDAwMGZmJykgPyAnI0NDQ0Q2NCcgOiAnIzAwMDBmZid9O1xuICogICBiYWNrZ3JvdW5kOiAke2dldEx1bWluYW5jZSgncmdiYSg1OCwgMTMzLCAyNTUsIDEpJykgPj0gZ2V0THVtaW5hbmNlKCdyZ2JhKDI1NSwgNTcsIDE0OSwgMSknKSA/XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoNTgsIDEzMywgMjU1LCAxKScgOlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDI1NSwgNTcsIDE0OSwgMSknfTtcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgYmFja2dyb3VuZDogXCIjQ0NDRDY0XCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSg1OCwgMTMzLCAyNTUsIDEpXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIGdldEx1bWluYW5jZShjb2xvcikge1xuICB2YXIgcmdiQ29sb3IgPSBwYXJzZVRvUmdiKGNvbG9yKTtcblxuICB2YXIgX09iamVjdCRrZXlzJG1hcCA9IE9iamVjdC5rZXlzKHJnYkNvbG9yKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBjaGFubmVsID0gcmdiQ29sb3Jba2V5XSAvIDI1NTtcbiAgICByZXR1cm4gY2hhbm5lbCA8PSAwLjAzOTI4ID8gY2hhbm5lbCAvIDEyLjkyIDogTWF0aC5wb3coKGNoYW5uZWwgKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgfSksXG4gICAgICByID0gX09iamVjdCRrZXlzJG1hcFswXSxcbiAgICAgIGcgPSBfT2JqZWN0JGtleXMkbWFwWzFdLFxuICAgICAgYiA9IF9PYmplY3Qka2V5cyRtYXBbMl07XG5cbiAgcmV0dXJuIDAuMjEyNiAqIHIgKyAwLjcxNTIgKiBnICsgMC4wNzIyICogYjtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgY29sb3IgdG8gYSBncmF5c2NhbGUsIGJ5IHJlZHVjaW5nIGl0cyBzYXR1cmF0aW9uIHRvIDAuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogZ3JheXNjYWxlKCcjQ0NDRDY0JyksXG4gKiAgIGJhY2tncm91bmQ6IGdyYXlzY2FsZSgncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7Z3JheXNjYWxlKCcjQ0NDRDY0Jyl9O1xuICogICBiYWNrZ3JvdW5kOiAke2dyYXlzY2FsZSgncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiM5OTlcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDE1MywxNTMsMTUzLDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gZ3JheXNjYWxlKGNvbG9yKSB7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBwYXJzZVRvSHNsKGNvbG9yKSwge1xuICAgIHNhdHVyYXRpb246IDBcbiAgfSkpO1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIEludmVydHMgdGhlIHJlZCwgZ3JlZW4gYW5kIGJsdWUgdmFsdWVzIG9mIGEgY29sb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogaW52ZXJ0KCcjQ0NDRDY0JyksXG4gKiAgIGJhY2tncm91bmQ6IGludmVydCgncmdiYSgxMDEsMTAwLDIwNSwwLjcpJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7aW52ZXJ0KCcjQ0NDRDY0Jyl9O1xuICogICBiYWNrZ3JvdW5kOiAke2ludmVydCgncmdiYSgxMDEsMTAwLDIwNSwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqXG4gKiBlbGVtZW50IHtcbiAqICAgYmFja2dyb3VuZDogXCIjMzMzMjliXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgxNTQsMTU1LDUwLDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gaW52ZXJ0KGNvbG9yKSB7XG4gIC8vIHBhcnNlIGNvbG9yIHN0cmluZyB0byByZ2JcbiAgdmFyIHZhbHVlID0gcGFyc2VUb1JnYihjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCB2YWx1ZSwge1xuICAgIHJlZDogMjU1IC0gdmFsdWUucmVkLFxuICAgIGdyZWVuOiAyNTUgLSB2YWx1ZS5ncmVlbixcbiAgICBibHVlOiAyNTUgLSB2YWx1ZS5ibHVlXG4gIH0pKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHZhbHVlIGZvciB0aGUgbGlnaHRlbmVkIGNvbG9yLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGxpZ2h0ZW4oMC4yLCAnI0NDQ0Q2NCcpLFxuICogICBiYWNrZ3JvdW5kOiBsaWdodGVuKDAuMiwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke2xpZ2h0ZW4oMC4yLCAnI0ZGQ0Q2NCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtsaWdodGVuKDAuMiwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2U1ZTZiMVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjI5LDIzMCwxNzcsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBsaWdodGVuKGFtb3VudCwgY29sb3IpIHtcbiAgdmFyIGhzbENvbG9yID0gcGFyc2VUb0hzbChjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBoc2xDb2xvciwge1xuICAgIGxpZ2h0bmVzczogZ3VhcmQoMCwgMSwgaHNsQ29sb3IubGlnaHRuZXNzICsgYW1vdW50KVxuICB9KSk7XG59XG5cbnZhciBjdXJyaWVkTGlnaHRlbiA9IC8qI19fUFVSRV9fKi9jdXJyeShsaWdodGVuKTtcblxuLy8gICAgICBcblxuLyoqXG4gKiBNaXhlcyB0d28gY29sb3JzIHRvZ2V0aGVyIGJ5IGNhbGN1bGF0aW5nIHRoZSBhdmVyYWdlIG9mIGVhY2ggb2YgdGhlIFJHQiBjb21wb25lbnRzLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIHdlaWdodCBpcyAwLjUgbWVhbmluZyB0aGF0IGhhbGYgb2YgdGhlIGZpcnN0IGNvbG9yIGFuZCBoYWxmIHRoZSBzZWNvbmRcbiAqIGNvbG9yIHNob3VsZCBiZSB1c2VkLiBPcHRpb25hbGx5IHRoZSB3ZWlnaHQgY2FuIGJlIG1vZGlmaWVkIGJ5IHByb3ZpZGluZyBhIG51bWJlclxuICogYXMgdGhlIGZpcnN0IGFyZ3VtZW50LiAwLjI1IG1lYW5zIHRoYXQgYSBxdWFydGVyIG9mIHRoZSBmaXJzdCBjb2xvciBhbmQgdGhyZWUgcXVhcnRlcnNcbiAqIG9mIHRoZSBzZWNvbmQgY29sb3Igc2hvdWxkIGJlIHVzZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogbWl4KDAuNSwgJyNmMDAnLCAnIzAwZicpXG4gKiAgIGJhY2tncm91bmQ6IG1peCgwLjI1LCAnI2YwMCcsICcjMDBmJylcbiAqICAgYmFja2dyb3VuZDogbWl4KDAuNSwgJ3JnYmEoMjU1LCAwLCAwLCAwLjUpJywgJyMwMGYnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke21peCgwLjUsICcjZjAwJywgJyMwMGYnKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7bWl4KDAuMjUsICcjZjAwJywgJyMwMGYnKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7bWl4KDAuNSwgJ3JnYmEoMjU1LCAwLCAwLCAwLjUpJywgJyMwMGYnKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiM3ZjAwN2ZcIjtcbiAqICAgYmFja2dyb3VuZDogXCIjM2YwMGJmXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSg2MywgMCwgMTkxLCAwLjc1KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBtaXgoKSB7XG4gIHZhciB3ZWlnaHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDAuNTtcbiAgdmFyIGNvbG9yID0gYXJndW1lbnRzWzFdO1xuICB2YXIgb3RoZXJDb2xvciA9IGFyZ3VtZW50c1syXTtcblxuICB2YXIgcGFyc2VkQ29sb3IxID0gcGFyc2VUb1JnYihjb2xvcik7XG4gIHZhciBjb2xvcjEgPSBfZXh0ZW5kcyh7fSwgcGFyc2VkQ29sb3IxLCB7XG4gICAgYWxwaGE6IHR5cGVvZiBwYXJzZWRDb2xvcjEuYWxwaGEgPT09ICdudW1iZXInID8gcGFyc2VkQ29sb3IxLmFscGhhIDogMVxuICB9KTtcblxuICB2YXIgcGFyc2VkQ29sb3IyID0gcGFyc2VUb1JnYihvdGhlckNvbG9yKTtcbiAgdmFyIGNvbG9yMiA9IF9leHRlbmRzKHt9LCBwYXJzZWRDb2xvcjIsIHtcbiAgICBhbHBoYTogdHlwZW9mIHBhcnNlZENvbG9yMi5hbHBoYSA9PT0gJ251bWJlcicgPyBwYXJzZWRDb2xvcjIuYWxwaGEgOiAxXG4gIH0pO1xuXG4gIC8vIFRoZSBmb3JtdWxhciBpcyBjb3BpZWQgZnJvbSB0aGUgb3JpZ2luYWwgU2FzcyBpbXBsZW1lbnRhdGlvbjpcbiAgLy8gaHR0cDovL3Nhc3MtbGFuZy5jb20vZG9jdW1lbnRhdGlvbi9TYXNzL1NjcmlwdC9GdW5jdGlvbnMuaHRtbCNtaXgtaW5zdGFuY2VfbWV0aG9kXG4gIHZhciBhbHBoYURlbHRhID0gY29sb3IxLmFscGhhIC0gY29sb3IyLmFscGhhO1xuICB2YXIgeCA9IHdlaWdodCAqIDIgLSAxO1xuICB2YXIgeSA9IHggKiBhbHBoYURlbHRhID09PSAtMSA/IHggOiB4ICsgYWxwaGFEZWx0YTtcbiAgdmFyIHogPSAxICsgeCAqIGFscGhhRGVsdGE7XG4gIHZhciB3ZWlnaHQxID0gKHkgLyB6ICsgMSkgLyAyLjA7XG4gIHZhciB3ZWlnaHQyID0gMSAtIHdlaWdodDE7XG5cbiAgdmFyIG1peGVkQ29sb3IgPSB7XG4gICAgcmVkOiBNYXRoLmZsb29yKGNvbG9yMS5yZWQgKiB3ZWlnaHQxICsgY29sb3IyLnJlZCAqIHdlaWdodDIpLFxuICAgIGdyZWVuOiBNYXRoLmZsb29yKGNvbG9yMS5ncmVlbiAqIHdlaWdodDEgKyBjb2xvcjIuZ3JlZW4gKiB3ZWlnaHQyKSxcbiAgICBibHVlOiBNYXRoLmZsb29yKGNvbG9yMS5ibHVlICogd2VpZ2h0MSArIGNvbG9yMi5ibHVlICogd2VpZ2h0MiksXG4gICAgYWxwaGE6IGNvbG9yMS5hbHBoYSArIChjb2xvcjIuYWxwaGEgLSBjb2xvcjEuYWxwaGEpICogKHdlaWdodCAvIDEuMClcbiAgfTtcblxuICByZXR1cm4gcmdiYShtaXhlZENvbG9yKTtcbn1cblxudmFyIGN1cnJpZWRNaXggPSAvKiNfX1BVUkVfXyovY3VycnkobWl4KTtcblxuLy8gICAgICBcbi8qKlxuICogSW5jcmVhc2VzIHRoZSBvcGFjaXR5IG9mIGEgY29sb3IuIEl0cyByYW5nZSBmb3IgdGhlIGFtb3VudCBpcyBiZXR3ZWVuIDAgdG8gMS5cbiAqXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogb3BhY2lmeSgwLjEsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSknKTtcbiAqICAgYmFja2dyb3VuZDogb3BhY2lmeSgwLjIsICdoc2xhKDAsIDAlLCAxMDAlLCAwLjUpJyksXG4gKiAgIGJhY2tncm91bmQ6IG9wYWNpZnkoMC41LCAncmdiYSgyNTUsIDAsIDAsIDAuMiknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtvcGFjaWZ5KDAuMSwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC45KScpfTtcbiAqICAgYmFja2dyb3VuZDogJHtvcGFjaWZ5KDAuMiwgJ2hzbGEoMCwgMCUsIDEwMCUsIDAuNSknKX0sXG4gKiAgIGJhY2tncm91bmQ6ICR7b3BhY2lmeSgwLjUsICdyZ2JhKDI1NSwgMCwgMCwgMC4yKScpfSxcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2ZmZlwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjU1LDI1NSwyNTUsMC43KVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjU1LDAsMCwwLjcpXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIG9wYWNpZnkoYW1vdW50LCBjb2xvcikge1xuICB2YXIgcGFyc2VkQ29sb3IgPSBwYXJzZVRvUmdiKGNvbG9yKTtcbiAgdmFyIGFscGhhID0gdHlwZW9mIHBhcnNlZENvbG9yLmFscGhhID09PSAnbnVtYmVyJyA/IHBhcnNlZENvbG9yLmFscGhhIDogMTtcbiAgdmFyIGNvbG9yV2l0aEFscGhhID0gX2V4dGVuZHMoe30sIHBhcnNlZENvbG9yLCB7XG4gICAgYWxwaGE6IGd1YXJkKDAsIDEsIChhbHBoYSAqIDEwMCArIGFtb3VudCAqIDEwMCkgLyAxMDApXG4gIH0pO1xuICByZXR1cm4gcmdiYShjb2xvcldpdGhBbHBoYSk7XG59XG5cbnZhciBjdXJyaWVkT3BhY2lmeSA9IC8qI19fUFVSRV9fKi9jdXJyeShvcGFjaWZ5KTtcblxuLy8gICAgICBcbi8qKlxuICogU2VsZWN0cyBibGFjayBvciB3aGl0ZSBmb3IgYmVzdCBjb250cmFzdCBkZXBlbmRpbmcgb24gdGhlIGx1bWlub3NpdHkgb2YgdGhlIGdpdmVuIGNvbG9yLlxuICogRm9sbG93cyBXM0Mgc3BlY3MgZm9yIHJlYWRhYmlsaXR5IGF0IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAtVEVDSFMvRzE4Lmh0bWxcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBjb2xvcjogcmVhZGFibGVDb2xvcignIzAwMCcpLFxuICogICBjb2xvcjogcmVhZGFibGVDb2xvcigncGFwYXlhd2hpcCcpLFxuICogICBjb2xvcjogcmVhZGFibGVDb2xvcigncmdiKDI1NSwwLDApJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGNvbG9yOiAke3JlYWRhYmxlQ29sb3IoJyMwMDAnKX07XG4gKiAgIGNvbG9yOiAke3JlYWRhYmxlQ29sb3IoJ3BhcGF5YXdoaXAnKX07XG4gKiAgIGNvbG9yOiAke3JlYWRhYmxlQ29sb3IoJ3JnYigyNTUsMCwwKScpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGNvbG9yOiBcIiNmZmZcIjtcbiAqICAgY29sb3I6IFwiI2ZmZlwiO1xuICogICBjb2xvcjogXCIjMDAwXCI7XG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gcmVhZGFibGVDb2xvcihjb2xvcikge1xuICByZXR1cm4gZ2V0THVtaW5hbmNlKGNvbG9yKSA+IDAuMTc5ID8gJyMwMDAnIDogJyNmZmYnO1xufVxuXG52YXIgY3VycmllZFJlYWRhYmxlQ29sb3IgPSAvKiNfX1BVUkVfXyovY3VycnkocmVhZGFibGVDb2xvcik7XG5cbi8vICAgICAgXG5cbi8qKlxuICogSW5jcmVhc2VzIHRoZSBpbnRlbnNpdHkgb2YgYSBjb2xvci4gSXRzIHJhbmdlIGlzIGJldHdlZW4gMCB0byAxLiBUaGUgZmlyc3RcbiAqIGFyZ3VtZW50IG9mIHRoZSBzYXR1cmF0ZSBmdW5jdGlvbiBpcyB0aGUgYW1vdW50IGJ5IGhvdyBtdWNoIHRoZSBjb2xvclxuICogaW50ZW5zaXR5IHNob3VsZCBiZSBpbmNyZWFzZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogc2F0dXJhdGUoMC4yLCAnI0NDQ0Q2NCcpLFxuICogICBiYWNrZ3JvdW5kOiBzYXR1cmF0ZSgwLjIsICdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtzYXR1cmF0ZSgwLjIsICcjRkZDRDY0Jyl9O1xuICogICBiYWNrZ3JvdW5kOiAke3NhdHVyYXRlKDAuMiwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2UwZTI1MFwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjI0LDIyNiw4MCwwLjcpXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHNhdHVyYXRlKGFtb3VudCwgY29sb3IpIHtcbiAgdmFyIGhzbENvbG9yID0gcGFyc2VUb0hzbChjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBoc2xDb2xvciwge1xuICAgIHNhdHVyYXRpb246IGd1YXJkKDAsIDEsIGhzbENvbG9yLnNhdHVyYXRpb24gKyBhbW91bnQpXG4gIH0pKTtcbn1cblxudmFyIGN1cnJpZWRTYXR1cmF0ZSA9IC8qI19fUFVSRV9fKi9jdXJyeShzYXR1cmF0ZSk7XG5cbi8vICAgICAgXG5cbi8qKlxuICogU2V0cyB0aGUgaHVlIG9mIGEgY29sb3IgdG8gdGhlIHByb3ZpZGVkIHZhbHVlLiBUaGUgaHVlIHJhbmdlIGNhbiBiZVxuICogZnJvbSAwIGFuZCAzNTkuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogc2V0SHVlKDQyLCAnI0NDQ0Q2NCcpLFxuICogICBiYWNrZ3JvdW5kOiBzZXRIdWUoMjQ0LCAncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7c2V0SHVlKDQyLCAnI0NDQ0Q2NCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtzZXRIdWUoMjQ0LCAncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiNjZGFlNjRcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDEwNywxMDAsMjA1LDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gc2V0SHVlKGh1ZSwgY29sb3IpIHtcbiAgcmV0dXJuIHRvQ29sb3JTdHJpbmcoX2V4dGVuZHMoe30sIHBhcnNlVG9Ic2woY29sb3IpLCB7XG4gICAgaHVlOiBodWVcbiAgfSkpO1xufVxuXG52YXIgY3VycmllZFNldEh1ZSA9IC8qI19fUFVSRV9fKi9jdXJyeShzZXRIdWUpO1xuXG4vLyAgICAgIFxuXG4vKipcbiAqIFNldHMgdGhlIGxpZ2h0bmVzcyBvZiBhIGNvbG9yIHRvIHRoZSBwcm92aWRlZCB2YWx1ZS4gVGhlIGxpZ2h0bmVzcyByYW5nZSBjYW4gYmVcbiAqIGZyb20gMCBhbmQgMS5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBiYWNrZ3JvdW5kOiBzZXRMaWdodG5lc3MoMC4yLCAnI0NDQ0Q2NCcpLFxuICogICBiYWNrZ3JvdW5kOiBzZXRMaWdodG5lc3MoMC43NSwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3NldExpZ2h0bmVzcygwLjIsICcjQ0NDRDY0Jyl9O1xuICogICBiYWNrZ3JvdW5kOiAke3NldExpZ2h0bmVzcygwLjc1LCAncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiM0ZDRkMTlcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDIyMywyMjQsMTU5LDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gc2V0TGlnaHRuZXNzKGxpZ2h0bmVzcywgY29sb3IpIHtcbiAgcmV0dXJuIHRvQ29sb3JTdHJpbmcoX2V4dGVuZHMoe30sIHBhcnNlVG9Ic2woY29sb3IpLCB7XG4gICAgbGlnaHRuZXNzOiBsaWdodG5lc3NcbiAgfSkpO1xufVxuXG52YXIgY3VycmllZFNldExpZ2h0bmVzcyA9IC8qI19fUFVSRV9fKi9jdXJyeShzZXRMaWdodG5lc3MpO1xuXG4vLyAgICAgIFxuXG4vKipcbiAqIFNldHMgdGhlIHNhdHVyYXRpb24gb2YgYSBjb2xvciB0byB0aGUgcHJvdmlkZWQgdmFsdWUuIFRoZSBsaWdodG5lc3MgcmFuZ2UgY2FuIGJlXG4gKiBmcm9tIDAgYW5kIDEuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogc2V0U2F0dXJhdGlvbigwLjIsICcjQ0NDRDY0JyksXG4gKiAgIGJhY2tncm91bmQ6IHNldFNhdHVyYXRpb24oMC43NSwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3NldFNhdHVyYXRpb24oMC4yLCAnI0NDQ0Q2NCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtzZXRTYXR1cmF0aW9uKDAuNzUsICdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2FkYWQ4NFwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjI4LDIyOSw3NiwwLjcpXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHNldFNhdHVyYXRpb24oc2F0dXJhdGlvbiwgY29sb3IpIHtcbiAgcmV0dXJuIHRvQ29sb3JTdHJpbmcoX2V4dGVuZHMoe30sIHBhcnNlVG9Ic2woY29sb3IpLCB7XG4gICAgc2F0dXJhdGlvbjogc2F0dXJhdGlvblxuICB9KSk7XG59XG5cbnZhciBjdXJyaWVkU2V0U2F0dXJhdGlvbiA9IC8qI19fUFVSRV9fKi9jdXJyeShzZXRTYXR1cmF0aW9uKTtcblxuLy8gICAgICBcblxuLyoqXG4gKiBTaGFkZXMgYSBjb2xvciBieSBtaXhpbmcgaXQgd2l0aCBibGFjay4gYHNoYWRlYCBjYW4gcHJvZHVjZVxuICogaHVlIHNoaWZ0cywgd2hlcmUgYXMgYGRhcmtlbmAgbWFuaXB1bGF0ZXMgdGhlIGx1bWluYW5jZSBjaGFubmVsIGFuZCB0aGVyZWZvcmVcbiAqIGRvZXNuJ3QgcHJvZHVjZSBodWUgc2hpZnRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IHNoYWRlKDAuMjUsICcjMDBmJylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtzaGFkZSgwLjI1LCAnIzAwZicpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiIzAwMDAzZlwiO1xuICogfVxuICovXG5cbmZ1bmN0aW9uIHNoYWRlKHBlcmNlbnRhZ2UsIGNvbG9yKSB7XG4gIGlmICh0eXBlb2YgcGVyY2VudGFnZSAhPT0gJ251bWJlcicgfHwgcGVyY2VudGFnZSA+IDEgfHwgcGVyY2VudGFnZSA8IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgYW4gaW5jb3JyZWN0IGFyZ3VtZW50IHRvIHNoYWRlLCBwbGVhc2UgcGFzcyBhIHBlcmNlbnRhZ2UgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEgYW5kIGxhcmdlciB0aGFuIG9yIGVxdWFsIHRvIC0xLicpO1xuICB9XG4gIGlmICh0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgYW4gaW5jb3JyZWN0IGFyZ3VtZW50IHRvIGEgY29sb3IgZnVuY3Rpb24sIHBsZWFzZSBwYXNzIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgY29sb3IuJyk7XG4gIH1cbiAgcmV0dXJuIGN1cnJpZWRNaXgocGVyY2VudGFnZSwgY29sb3IsICdyZ2IoMCwgMCwgMCknKTtcbn1cblxudmFyIGN1cnJpZWRTaGFkZSA9IC8qI19fUFVSRV9fKi9jdXJyeShzaGFkZSk7XG5cbi8vICAgICAgXG5cbi8qKlxuICogVGludHMgYSBjb2xvciBieSBtaXhpbmcgaXQgd2l0aCB3aGl0ZS4gYHRpbnRgIGNhbiBwcm9kdWNlXG4gKiBodWUgc2hpZnRzLCB3aGVyZSBhcyBgbGlnaHRlbmAgbWFuaXB1bGF0ZXMgdGhlIGx1bWluYW5jZSBjaGFubmVsIGFuZCB0aGVyZWZvcmVcbiAqIGRvZXNuJ3QgcHJvZHVjZSBodWUgc2hpZnRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IHRpbnQoMC4yNSwgJyMwMGYnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3RpbnQoMC4yNSwgJyMwMGYnKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiNiZmJmZmZcIjtcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiB0aW50KHBlcmNlbnRhZ2UsIGNvbG9yKSB7XG4gIGlmICh0eXBlb2YgcGVyY2VudGFnZSAhPT0gJ251bWJlcicgfHwgcGVyY2VudGFnZSA+IDEgfHwgcGVyY2VudGFnZSA8IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgYW4gaW5jb3JyZWN0IGFyZ3VtZW50IHRvIHRpbnQsIHBsZWFzZSBwYXNzIGEgcGVyY2VudGFnZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSBhbmQgbGFyZ2VyIHRoYW4gb3IgZXF1YWwgdG8gLTEuJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb2xvciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBhbiBpbmNvcnJlY3QgYXJndW1lbnQgdG8gYSBjb2xvciBmdW5jdGlvbiwgcGxlYXNlIHBhc3MgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBjb2xvci4nKTtcbiAgfVxuICByZXR1cm4gY3VycmllZE1peChwZXJjZW50YWdlLCBjb2xvciwgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xufVxuXG52YXIgY3VycmllZFRpbnQgPSAvKiNfX1BVUkVfXyovY3VycnkodGludCk7XG5cbi8vICAgICAgXG4vKipcbiAqIERlY3JlYXNlcyB0aGUgb3BhY2l0eSBvZiBhIGNvbG9yLiBJdHMgcmFuZ2UgZm9yIHRoZSBhbW91bnQgaXMgYmV0d2VlbiAwIHRvIDEuXG4gKlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50aXplKDAuMSwgJyNmZmYnKTtcbiAqICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnRpemUoMC4yLCAnaHNsKDAsIDAlLCAxMDAlKScpLFxuICogICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudGl6ZSgwLjUsICdyZ2JhKDI1NSwgMCwgMCwgMC44KScpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3RyYW5zcGFyZW50aXplKDAuMSwgJyNmZmYnKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7dHJhbnNwYXJlbnRpemUoMC4yLCAnaHNsKDAsIDAlLCAxMDAlKScpfSxcbiAqICAgYmFja2dyb3VuZDogJHt0cmFuc3BhcmVudGl6ZSgwLjUsICdyZ2JhKDI1NSwgMCwgMCwgMC44KScpfSxcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjkpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjgpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMCwwLDAuMylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gdHJhbnNwYXJlbnRpemUoYW1vdW50LCBjb2xvcikge1xuICB2YXIgcGFyc2VkQ29sb3IgPSBwYXJzZVRvUmdiKGNvbG9yKTtcbiAgdmFyIGFscGhhID0gdHlwZW9mIHBhcnNlZENvbG9yLmFscGhhID09PSAnbnVtYmVyJyA/IHBhcnNlZENvbG9yLmFscGhhIDogMTtcbiAgdmFyIGNvbG9yV2l0aEFscGhhID0gX2V4dGVuZHMoe30sIHBhcnNlZENvbG9yLCB7XG4gICAgYWxwaGE6IGd1YXJkKDAsIDEsIChhbHBoYSAqIDEwMCAtIGFtb3VudCAqIDEwMCkgLyAxMDApXG4gIH0pO1xuICByZXR1cm4gcmdiYShjb2xvcldpdGhBbHBoYSk7XG59XG5cbnZhciBjdXJyaWVkVHJhbnNwYXJlbnRpemUgPSAvKiNfX1BVUkVfXyovY3VycnkodHJhbnNwYXJlbnRpemUpO1xuXG4vLyAgICAgIFxuXG4vKiogKi9cblxuLyoqXG4gKiBTaG9ydGhhbmQgZm9yIGVhc2lseSBzZXR0aW5nIHRoZSBhbmltYXRpb24gcHJvcGVydHkuIEFsbG93cyBlaXRoZXIgbXVsdGlwbGUgYXJyYXlzIHdpdGggYW5pbWF0aW9uc1xuICogb3IgYSBzaW5nbGUgYW5pbWF0aW9uIHNwcmVhZCBvdmVyIHRoZSBhcmd1bWVudHMuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5hbmltYXRpb24oWydyb3RhdGUnLCAnMXMnLCAnZWFzZS1pbi1vdXQnXSwgWydjb2xvcmNoYW5nZScsICcycyddKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2FuaW1hdGlvbihbJ3JvdGF0ZScsICcxcycsICdlYXNlLWluLW91dCddLCBbJ2NvbG9yY2hhbmdlJywgJzJzJ10pfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAnYW5pbWF0aW9uJzogJ3JvdGF0ZSAxcyBlYXNlLWluLW91dCwgY29sb3JjaGFuZ2UgMnMnXG4gKiB9XG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5hbmltYXRpb24oJ3JvdGF0ZScsICcxcycsICdlYXNlLWluLW91dCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7YW5pbWF0aW9uKCdyb3RhdGUnLCAnMXMnLCAnZWFzZS1pbi1vdXQnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ2FuaW1hdGlvbic6ICdyb3RhdGUgMXMgZWFzZS1pbi1vdXQnXG4gKiB9XG4gKi9cbmZ1bmN0aW9uIGFuaW1hdGlvbigpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgLy8gQWxsb3cgc2luZ2xlIG9yIG11bHRpcGxlIGFuaW1hdGlvbnMgcGFzc2VkXG4gIHZhciBtdWx0aU1vZGUgPSBBcnJheS5pc0FycmF5KGFyZ3NbMF0pO1xuICBpZiAoIW11bHRpTW9kZSAmJiBhcmdzLmxlbmd0aCA+IDgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhbmltYXRpb24gc2hvcnRoYW5kIG9ubHkgdGFrZXMgOCBhcmd1bWVudHMuIFNlZSB0aGUgc3BlY2lmaWNhdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbjogaHR0cDovL21kbi5pby9hbmltYXRpb24nKTtcbiAgfVxuICB2YXIgY29kZSA9IGFyZ3MubWFwKGZ1bmN0aW9uIChhcmcpIHtcbiAgICBpZiAobXVsdGlNb2RlICYmICFBcnJheS5pc0FycmF5KGFyZykgfHwgIW11bHRpTW9kZSAmJiBBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRvIHBhc3MgbXVsdGlwbGUgYW5pbWF0aW9ucyBwbGVhc2Ugc3VwcGx5IHRoZW0gaW4gYXJyYXlzLCBlLmcuIGFuaW1hdGlvbihbJ3JvdGF0ZScsICcycyddLCBbJ21vdmUnLCAnMXMnXSlcXG5UbyBwYXNzIGEgc2luZ2xlIGFuaW1hdGlvbiBwbGVhc2Ugc3VwcGx5IHRoZW0gaW4gc2ltcGxlIHZhbHVlcywgZS5nLiBhbmltYXRpb24oJ3JvdGF0ZScsICcycycpXCIpO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZy5sZW5ndGggPiA4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhbmltYXRpb24gc2hvcnRoYW5kIGFycmF5cyBjYW4gb25seSBoYXZlIDggZWxlbWVudHMuIFNlZSB0aGUgc3BlY2lmaWNhdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbjogaHR0cDovL21kbi5pby9hbmltYXRpb24nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpID8gYXJnLmpvaW4oJyAnKSA6IGFyZztcbiAgfSkuam9pbignLCAnKTtcblxuICByZXR1cm4ge1xuICAgIGFuaW1hdGlvbjogY29kZVxuICB9O1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIFNob3J0aGFuZCB0aGF0IGFjY2VwdHMgYW55IG51bWJlciBvZiBiYWNrZ3JvdW5kSW1hZ2UgdmFsdWVzIGFzIHBhcmFtZXRlcnMgZm9yIGNyZWF0aW5nIGEgc2luZ2xlIGJhY2tncm91bmQgc3RhdGVtZW50LlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4uYmFja2dyb3VuZEltYWdlcygndXJsKFwiL2ltYWdlL2JhY2tncm91bmQuanBnXCIpJywgJ2xpbmVhci1ncmFkaWVudChyZWQsIGdyZWVuKScpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7YmFja2dyb3VuZEltYWdlcygndXJsKFwiL2ltYWdlL2JhY2tncm91bmQuanBnXCIpJywgJ2xpbmVhci1ncmFkaWVudChyZWQsIGdyZWVuKScpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAnYmFja2dyb3VuZEltYWdlJzogJ3VybChcIi9pbWFnZS9iYWNrZ3JvdW5kLmpwZ1wiKSwgbGluZWFyLWdyYWRpZW50KHJlZCwgZ3JlZW4pJ1xuICogfVxuICovXG5cbmZ1bmN0aW9uIGJhY2tncm91bmRJbWFnZXMoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBwcm9wZXJ0aWVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgcHJvcGVydGllc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZEltYWdlOiBwcm9wZXJ0aWVzLmpvaW4oJywgJylcbiAgfTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBTaG9ydGhhbmQgdGhhdCBhY2NlcHRzIGFueSBudW1iZXIgb2YgYmFja2dyb3VuZCB2YWx1ZXMgYXMgcGFyYW1ldGVycyBmb3IgY3JlYXRpbmcgYSBzaW5nbGUgYmFja2dyb3VuZCBzdGF0ZW1lbnQuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5iYWNrZ3JvdW5kcygndXJsKFwiL2ltYWdlL2JhY2tncm91bmQuanBnXCIpJywgJ2xpbmVhci1ncmFkaWVudChyZWQsIGdyZWVuKScsICdjZW50ZXIgbm8tcmVwZWF0JylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtiYWNrZ3JvdW5kcygndXJsKFwiL2ltYWdlL2JhY2tncm91bmQuanBnXCIpJywgJ2xpbmVhci1ncmFkaWVudChyZWQsIGdyZWVuKScsICdjZW50ZXIgbm8tcmVwZWF0Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGRpdiB7XG4gKiAgICdiYWNrZ3JvdW5kJzogJ3VybChcIi9pbWFnZS9iYWNrZ3JvdW5kLmpwZ1wiKSwgbGluZWFyLWdyYWRpZW50KHJlZCwgZ3JlZW4pLCBjZW50ZXIgbm8tcmVwZWF0J1xuICogfVxuICovXG5mdW5jdGlvbiBiYWNrZ3JvdW5kcygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHByb3BlcnRpZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBwcm9wZXJ0aWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kOiBwcm9wZXJ0aWVzLmpvaW4oJywgJylcbiAgfTtcbn1cblxuLy8gICAgICBcbi8qKlxuICogU2hvcnRoYW5kIHRoYXQgYWNjZXB0cyB1cCB0byBmb3VyIHZhbHVlcywgaW5jbHVkaW5nIG51bGwgdG8gc2tpcCBhIHZhbHVlLCBhbmQgbWFwcyB0aGVtIHRvIHRoZWlyIHJlc3BlY3RpdmUgZGlyZWN0aW9ucy5cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLmJvcmRlckNvbG9yKCdyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICd5ZWxsb3cnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2JvcmRlckNvbG9yKCdyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICd5ZWxsb3cnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ2JvcmRlclRvcENvbG9yJzogJ3JlZCcsXG4gKiAgICdib3JkZXJSaWdodENvbG9yJzogJ2dyZWVuJyxcbiAqICAgJ2JvcmRlckJvdHRvbUNvbG9yJzogJ2JsdWUnLFxuICogICAnYm9yZGVyTGVmdENvbG9yJzogJ3llbGxvdydcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBib3JkZXJDb2xvcigpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHZhbHVlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHZhbHVlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBkaXJlY3Rpb25hbFByb3BlcnR5LmFwcGx5KHVuZGVmaW5lZCwgWydib3JkZXJDb2xvciddLmNvbmNhdCh2YWx1ZXMpKTtcbn1cblxuLy8gICAgICBcbi8qKlxuICogU2hvcnRoYW5kIHRoYXQgYWNjZXB0cyBhIHZhbHVlIGZvciBzaWRlIGFuZCBhIHZhbHVlIGZvciByYWRpdXMgYW5kIGFwcGxpZXMgdGhlIHJhZGl1cyB2YWx1ZSB0byBib3RoIGNvcm5lcnMgb2YgdGhlIHNpZGUuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5ib3JkZXJSYWRpdXMoJ3RvcCcsICc1cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2JvcmRlclJhZGl1cygndG9wJywgJzVweCcpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAnYm9yZGVyVG9wUmlnaHRSYWRpdXMnOiAnNXB4JyxcbiAqICAgJ2JvcmRlclRvcExlZnRSYWRpdXMnOiAnNXB4JyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBib3JkZXJSYWRpdXMoc2lkZSwgcmFkaXVzKSB7XG4gIHZhciB1cHBlcmNhc2VTaWRlID0gY2FwaXRhbGl6ZVN0cmluZyhzaWRlKTtcbiAgaWYgKCFyYWRpdXMgJiYgcmFkaXVzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdib3JkZXJSYWRpdXMgZXhwZWN0cyBhIHJhZGl1cyB2YWx1ZSBhcyBhIHN0cmluZyBvciBudW1iZXIgYXMgdGhlIHNlY29uZCBhcmd1bWVudC4nKTtcbiAgfVxuICBpZiAodXBwZXJjYXNlU2lkZSA9PT0gJ1RvcCcgfHwgdXBwZXJjYXNlU2lkZSA9PT0gJ0JvdHRvbScpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbJ2JvcmRlcicgKyB1cHBlcmNhc2VTaWRlICsgJ1JpZ2h0UmFkaXVzJ10gPSByYWRpdXMsIF9yZWZbJ2JvcmRlcicgKyB1cHBlcmNhc2VTaWRlICsgJ0xlZnRSYWRpdXMnXSA9IHJhZGl1cywgX3JlZjtcbiAgfVxuXG4gIGlmICh1cHBlcmNhc2VTaWRlID09PSAnTGVmdCcgfHwgdXBwZXJjYXNlU2lkZSA9PT0gJ1JpZ2h0Jykge1xuICAgIHZhciBfcmVmMjtcblxuICAgIHJldHVybiBfcmVmMiA9IHt9LCBfcmVmMlsnYm9yZGVyVG9wJyArIHVwcGVyY2FzZVNpZGUgKyAnUmFkaXVzJ10gPSByYWRpdXMsIF9yZWYyWydib3JkZXJCb3R0b20nICsgdXBwZXJjYXNlU2lkZSArICdSYWRpdXMnXSA9IHJhZGl1cywgX3JlZjI7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ2JvcmRlclJhZGl1cyBleHBlY3RzIG9uZSBvZiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiBvciBcInJpZ2h0XCIgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LicpO1xufVxuXG4vLyAgICAgIFxuLyoqXG4gKiBTaG9ydGhhbmQgdGhhdCBhY2NlcHRzIHVwIHRvIGZvdXIgdmFsdWVzLCBpbmNsdWRpbmcgbnVsbCB0byBza2lwIGEgdmFsdWUsIGFuZCBtYXBzIHRoZW0gdG8gdGhlaXIgcmVzcGVjdGl2ZSBkaXJlY3Rpb25zLlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4uYm9yZGVyU3R5bGUoJ3NvbGlkJywgJ2Rhc2hlZCcsICdkb3R0ZWQnLCAnZG91YmxlJylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtib3JkZXJTdHlsZSgnc29saWQnLCAnZGFzaGVkJywgJ2RvdHRlZCcsICdkb3VibGUnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ2JvcmRlclRvcFN0eWxlJzogJ3NvbGlkJyxcbiAqICAgJ2JvcmRlclJpZ2h0U3R5bGUnOiAnZGFzaGVkJyxcbiAqICAgJ2JvcmRlckJvdHRvbVN0eWxlJzogJ2RvdHRlZCcsXG4gKiAgICdib3JkZXJMZWZ0U3R5bGUnOiAnZG91YmxlJ1xuICogfVxuICovXG5cbmZ1bmN0aW9uIGJvcmRlclN0eWxlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsdWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGRpcmVjdGlvbmFsUHJvcGVydHkuYXBwbHkodW5kZWZpbmVkLCBbJ2JvcmRlclN0eWxlJ10uY29uY2F0KHZhbHVlcykpO1xufVxuXG4vLyAgICAgIFxuLyoqXG4gKiBTaG9ydGhhbmQgdGhhdCBhY2NlcHRzIHVwIHRvIGZvdXIgdmFsdWVzLCBpbmNsdWRpbmcgbnVsbCB0byBza2lwIGEgdmFsdWUsIGFuZCBtYXBzIHRoZW0gdG8gdGhlaXIgcmVzcGVjdGl2ZSBkaXJlY3Rpb25zLlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4uYm9yZGVyV2lkdGgoJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2JvcmRlcldpZHRoKCcxMnB4JywgJzI0cHgnLCAnMzZweCcsICc0OHB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGRpdiB7XG4gKiAgICdib3JkZXJUb3BXaWR0aCc6ICcxMnB4JyxcbiAqICAgJ2JvcmRlclJpZ2h0V2lkdGgnOiAnMjRweCcsXG4gKiAgICdib3JkZXJCb3R0b21XaWR0aCc6ICczNnB4JyxcbiAqICAgJ2JvcmRlckxlZnRXaWR0aCc6ICc0OHB4J1xuICogfVxuICovXG5mdW5jdGlvbiBib3JkZXJXaWR0aCgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHZhbHVlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHZhbHVlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBkaXJlY3Rpb25hbFByb3BlcnR5LmFwcGx5KHVuZGVmaW5lZCwgWydib3JkZXJXaWR0aCddLmNvbmNhdCh2YWx1ZXMpKTtcbn1cblxuLy8gICAgICBcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdG9ycyh0ZW1wbGF0ZSwgc3RhdGUpIHtcbiAgdmFyIHN0YXRlU3VmZml4ID0gc3RhdGUgPyAnOicgKyBzdGF0ZSA6ICcnO1xuICByZXR1cm4gdGVtcGxhdGUoc3RhdGVTdWZmaXgpO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIGhlbHBlciB0aGF0IGFkZHMgYW4gYXJyYXkgb2Ygc3RhdGVzIHRvIGEgdGVtcGxhdGUgb2Ygc2VsZWN0b3JzLiBVc2VkIGluIHRleHRJbnB1dHMgYW5kIGJ1dHRvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzdGF0ZWZ1bFNlbGVjdG9ycyhzdGF0ZXMsIHRlbXBsYXRlLCBzdGF0ZU1hcCkge1xuICBpZiAoIXRlbXBsYXRlKSB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYSB0ZW1wbGF0ZSB0byB0aGlzIG1ldGhvZC4nKTtcbiAgaWYgKHN0YXRlcy5sZW5ndGggPT09IDApIHJldHVybiBnZW5lcmF0ZVNlbGVjdG9ycyh0ZW1wbGF0ZSwgbnVsbCk7XG4gIHZhciBzZWxlY3RvcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGF0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoc3RhdGVNYXAgJiYgc3RhdGVNYXAuaW5kZXhPZihzdGF0ZXNbaV0pIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgcGFzc2VkIGFuIHVuc3VwcG9ydGVkIHNlbGVjdG9yIHN0YXRlIHRvIHRoaXMgbWV0aG9kLicpO1xuICAgIH1cbiAgICBzZWxlY3RvcnMucHVzaChnZW5lcmF0ZVNlbGVjdG9ycyh0ZW1wbGF0ZSwgc3RhdGVzW2ldKSk7XG4gIH1cbiAgc2VsZWN0b3JzID0gc2VsZWN0b3JzLmpvaW4oJywnKTtcbiAgcmV0dXJuIHNlbGVjdG9ycztcbn1cblxuLy8gICAgICBcbnZhciBzdGF0ZU1hcCA9IFt1bmRlZmluZWQsIG51bGwsICdhY3RpdmUnLCAnZm9jdXMnLCAnaG92ZXInXTtcblxuZnVuY3Rpb24gdGVtcGxhdGUoc3RhdGUpIHtcbiAgcmV0dXJuICdidXR0b24nICsgc3RhdGUgKyAnLFxcbiAgaW5wdXRbdHlwZT1cImJ1dHRvblwiXScgKyBzdGF0ZSArICcsXFxuICBpbnB1dFt0eXBlPVwicmVzZXRcIl0nICsgc3RhdGUgKyAnLFxcbiAgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScgKyBzdGF0ZTtcbn1cblxuLyoqXG4gKiBQb3B1bGF0ZXMgc2VsZWN0b3JzIHRoYXQgdGFyZ2V0IGFsbCBidXR0b25zLiBZb3UgY2FuIHBhc3Mgb3B0aW9uYWwgc3RhdGVzIHRvIGFwcGVuZCB0byB0aGUgc2VsZWN0b3JzLlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgW2J1dHRvbnMoJ2FjdGl2ZScpXToge1xuICogICAgICdib3JkZXInOiAnbm9uZSdcbiAqICAgfVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICA+ICR7YnV0dG9ucygnYWN0aXZlJyl9IHtcbiAqICAgICBib3JkZXI6IG5vbmU7XG4gKiAgIH1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogICdidXR0b246YWN0aXZlLFxuICogICdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdOmFjdGl2ZSxcbiAqICAnaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXTphY3RpdmUsXG4gKiAgJ2lucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdOmFjdGl2ZToge1xuICogICAnYm9yZGVyJzogJ25vbmUnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gYnV0dG9ucygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHN0YXRlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHN0YXRlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZWZ1bFNlbGVjdG9ycyhzdGF0ZXMsIHRlbXBsYXRlLCBzdGF0ZU1hcCk7XG59XG5cbi8vICAgICAgXG4vKipcbiAqIFNob3J0aGFuZCB0aGF0IGFjY2VwdHMgdXAgdG8gZm91ciB2YWx1ZXMsIGluY2x1ZGluZyBudWxsIHRvIHNraXAgYSB2YWx1ZSwgYW5kIG1hcHMgdGhlbSB0byB0aGVpciByZXNwZWN0aXZlIGRpcmVjdGlvbnMuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5tYXJnaW4oJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke21hcmdpbignMTJweCcsICcyNHB4JywgJzM2cHgnLCAnNDhweCcpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAnbWFyZ2luVG9wJzogJzEycHgnLFxuICogICAnbWFyZ2luUmlnaHQnOiAnMjRweCcsXG4gKiAgICdtYXJnaW5Cb3R0b20nOiAnMzZweCcsXG4gKiAgICdtYXJnaW5MZWZ0JzogJzQ4cHgnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gbWFyZ2luKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsdWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGRpcmVjdGlvbmFsUHJvcGVydHkuYXBwbHkodW5kZWZpbmVkLCBbJ21hcmdpbiddLmNvbmNhdCh2YWx1ZXMpKTtcbn1cblxuLy8gICAgICBcbi8qKlxuICogU2hvcnRoYW5kIHRoYXQgYWNjZXB0cyB1cCB0byBmb3VyIHZhbHVlcywgaW5jbHVkaW5nIG51bGwgdG8gc2tpcCBhIHZhbHVlLCBhbmQgbWFwcyB0aGVtIHRvIHRoZWlyIHJlc3BlY3RpdmUgZGlyZWN0aW9ucy5cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLnBhZGRpbmcoJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3BhZGRpbmcoJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ3BhZGRpbmdUb3AnOiAnMTJweCcsXG4gKiAgICdwYWRkaW5nUmlnaHQnOiAnMjRweCcsXG4gKiAgICdwYWRkaW5nQm90dG9tJzogJzM2cHgnLFxuICogICAncGFkZGluZ0xlZnQnOiAnNDhweCdcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBwYWRkaW5nKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsdWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGRpcmVjdGlvbmFsUHJvcGVydHkuYXBwbHkodW5kZWZpbmVkLCBbJ3BhZGRpbmcnXS5jb25jYXQodmFsdWVzKSk7XG59XG5cbi8vICAgICAgXG52YXIgcG9zaXRpb25NYXAkMSA9IFsnYWJzb2x1dGUnLCAnZml4ZWQnLCAncmVsYXRpdmUnLCAnc3RhdGljJywgJ3N0aWNreSddO1xuXG4vKipcbiAqIFNob3J0aGFuZCBhY2NlcHRzIHVwIHRvIGZpdmUgdmFsdWVzLCBpbmNsdWRpbmcgbnVsbCB0byBza2lwIGEgdmFsdWUsIGFuZCBtYXBzIHRoZW0gdG8gdGhlaXIgcmVzcGVjdGl2ZSBkaXJlY3Rpb25zLiBUaGUgZmlyc3QgdmFsdWUgY2FuIG9wdGlvbmFsbHkgYmUgYSBwb3NpdGlvbiBrZXl3b3JkLlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4ucG9zaXRpb24oJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3Bvc2l0aW9uKCcxMnB4JywgJzI0cHgnLCAnMzZweCcsICc0OHB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGRpdiB7XG4gKiAgICd0b3AnOiAnMTJweCcsXG4gKiAgICdyaWdodCc6ICcyNHB4JyxcbiAqICAgJ2JvdHRvbSc6ICczNnB4JyxcbiAqICAgJ2xlZnQnOiAnNDhweCdcbiAqIH1cbiAqXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLnBvc2l0aW9uKCdhYnNvbHV0ZScsICcxMnB4JywgJzI0cHgnLCAnMzZweCcsICc0OHB4JylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtwb3NpdGlvbignYWJzb2x1dGUnLCAnMTJweCcsICcyNHB4JywgJzM2cHgnLCAnNDhweCcpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICogICAndG9wJzogJzEycHgnLFxuICogICAncmlnaHQnOiAnMjRweCcsXG4gKiAgICdib3R0b20nOiAnMzZweCcsXG4gKiAgICdsZWZ0JzogJzQ4cHgnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gcG9zaXRpb24ocG9zaXRpb25LZXl3b3JkKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZXMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsdWVzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChwb3NpdGlvbk1hcCQxLmluZGV4T2YocG9zaXRpb25LZXl3b3JkKSA+PSAwKSB7XG4gICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbktleXdvcmRcbiAgICB9LCBkaXJlY3Rpb25hbFByb3BlcnR5LmFwcGx5KHVuZGVmaW5lZCwgWycnXS5jb25jYXQodmFsdWVzKSkpO1xuICB9IGVsc2Uge1xuICAgIHZhciBmaXJzdFZhbHVlID0gcG9zaXRpb25LZXl3b3JkOyAvLyBpbiB0aGlzIGNhc2UgcG9zaXRpb24gaXMgYWN0dWFsbHkgdGhlIGZpcnN0IHZhbHVlXG4gICAgcmV0dXJuIGRpcmVjdGlvbmFsUHJvcGVydHkuYXBwbHkodW5kZWZpbmVkLCBbJycsIGZpcnN0VmFsdWVdLmNvbmNhdCh2YWx1ZXMpKTtcbiAgfVxufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIFNob3J0aGFuZCB0byBzZXQgdGhlIGhlaWdodCBhbmQgd2lkdGggcHJvcGVydGllcyBpbiBhIHNpbmdsZSBzdGF0ZW1lbnQuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5zaXplKCczMDBweCcsICcyNTBweCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7c2l6ZSgnMzAwcHgnLCAnMjUwcHgnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ2hlaWdodCc6ICczMDBweCcsXG4gKiAgICd3aWR0aCc6ICcyNTBweCcsXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gc2l6ZShoZWlnaHQpIHtcbiAgdmFyIHdpZHRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBoZWlnaHQ7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB3aWR0aDogd2lkdGhcbiAgfTtcbn1cblxuLy8gICAgICBcbnZhciBzdGF0ZU1hcCQxID0gW3VuZGVmaW5lZCwgbnVsbCwgJ2FjdGl2ZScsICdmb2N1cycsICdob3ZlciddO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZSQxKHN0YXRlKSB7XG4gIHJldHVybiAnaW5wdXRbdHlwZT1cImNvbG9yXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXRbdHlwZT1cImRhdGVcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwiZGF0ZXRpbWVcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwiZW1haWxcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwibW9udGhcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXRbdHlwZT1cInNlYXJjaFwiXScgKyBzdGF0ZSArICcsXFxuICAgIGlucHV0W3R5cGU9XCJ0ZWxcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwidGV4dFwiXScgKyBzdGF0ZSArICcsXFxuICAgIGlucHV0W3R5cGU9XCJ0aW1lXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXRbdHlwZT1cInVybFwiXScgKyBzdGF0ZSArICcsXFxuICAgIGlucHV0W3R5cGU9XCJ3ZWVrXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXQ6bm90KFt0eXBlXSknICsgc3RhdGUgKyAnLFxcbiAgICB0ZXh0YXJlYScgKyBzdGF0ZTtcbn1cblxuLyoqXG4gKiBQb3B1bGF0ZXMgc2VsZWN0b3JzIHRoYXQgdGFyZ2V0IGFsbCB0ZXh0IGlucHV0cy4gWW91IGNhbiBwYXNzIG9wdGlvbmFsIHN0YXRlcyB0byBhcHBlbmQgdG8gdGhlIHNlbGVjdG9ycy5cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIFt0ZXh0SW5wdXRzKCdhY3RpdmUnKV06IHtcbiAqICAgICAnYm9yZGVyJzogJ25vbmUnXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgPiAke3RleHRJbnB1dHMoJ2FjdGl2ZScpfSB7XG4gKiAgICAgYm9yZGVyOiBub25lO1xuICogICB9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqICAnaW5wdXRbdHlwZT1cImNvbG9yXCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwiZGF0ZVwiXTphY3RpdmUsXG4gKiAgaW5wdXRbdHlwZT1cImRhdGV0aW1lXCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIl06YWN0aXZlLFxuICogIGlucHV0W3R5cGU9XCJlbWFpbFwiXTphY3RpdmUsXG4gKiAgaW5wdXRbdHlwZT1cIm1vbnRoXCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl06YWN0aXZlLFxuICogIGlucHV0W3R5cGU9XCJzZWFyY2hcIl06YWN0aXZlLFxuICogIGlucHV0W3R5cGU9XCJ0ZWxcIl06YWN0aXZlLFxuICogIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwidGltZVwiXTphY3RpdmUsXG4gKiAgaW5wdXRbdHlwZT1cInVybFwiXTphY3RpdmUsXG4gKiAgaW5wdXRbdHlwZT1cIndlZWtcIl06YWN0aXZlLFxuICogIGlucHV0Om5vdChbdHlwZV0pOmFjdGl2ZSxcbiAqICB0ZXh0YXJlYTphY3RpdmUnOiB7XG4gKiAgICdib3JkZXInOiAnbm9uZSdcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiB0ZXh0SW5wdXRzKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc3RhdGVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgc3RhdGVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlZnVsU2VsZWN0b3JzKHN0YXRlcywgdGVtcGxhdGUkMSwgc3RhdGVNYXAkMSk7XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogU2hvcnRoYW5kIHRoYXQgYWNjZXB0cyBhbnkgbnVtYmVyIG9mIHRyYW5zaXRpb24gdmFsdWVzIGFzIHBhcmFtZXRlcnMgZm9yIGNyZWF0aW5nIGEgc2luZ2xlIHRyYW5zaXRpb24gc3RhdGVtZW50LlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4udHJhbnNpdGlvbnMoJ29wYWNpdHkgMS4wcyBlYXNlLWluIDBzJywgJ3dpZHRoIDIuMHMgZWFzZS1pbiAycycpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7dHJhbnNpdGlvbnMoJ29wYWNpdHkgMS4wcyBlYXNlLWluIDBzJywgJ3dpZHRoIDIuMHMgZWFzZS1pbiAycycpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAndHJhbnNpdGlvbic6ICdvcGFjaXR5IDEuMHMgZWFzZS1pbiAwcywgd2lkdGggMi4wcyBlYXNlLWluIDJzJ1xuICogfVxuICovXG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25zKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcHJvcGVydGllcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHByb3BlcnRpZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb246IHByb3BlcnRpZXMuam9pbignLCAnKVxuICB9O1xufVxuXG4vLyAgICAgIFxuLy8gSGVscGVyc1xuLy8gTWl4aW5zXG4vLyBDb2xvclxuLy8gU2hvcnRoYW5kc1xuXG5leHBvcnQgeyBjdXJyaWVkQWRqdXN0SHVlIGFzIGFkanVzdEh1ZSwgYW5pbWF0aW9uLCBiYWNrZ3JvdW5kSW1hZ2VzLCBiYWNrZ3JvdW5kcywgYm9yZGVyQ29sb3IsIGJvcmRlclJhZGl1cywgYm9yZGVyU3R5bGUsIGJvcmRlcldpZHRoLCBidXR0b25zLCBjbGVhckZpeCwgY29tcGxlbWVudCwgY3VycmllZERhcmtlbiBhcyBkYXJrZW4sIGN1cnJpZWREZXNhdHVyYXRlIGFzIGRlc2F0dXJhdGUsIGRpcmVjdGlvbmFsUHJvcGVydHksIGVsbGlwc2lzLCBlbSwgZm9udEZhY2UsIGdldEx1bWluYW5jZSwgZ3JheXNjYWxlLCBpbnZlcnQsIGhpZGVUZXh0LCBoaWRlVmlzdWFsbHksIGhpRFBJLCBoc2wsIGhzbGEsIGN1cnJpZWRMaWdodGVuIGFzIGxpZ2h0ZW4sIG1hcmdpbiwgY3VycmllZE1peCBhcyBtaXgsIG1vZHVsYXJTY2FsZSwgbm9ybWFsaXplLCBjdXJyaWVkT3BhY2lmeSBhcyBvcGFjaWZ5LCBwYWRkaW5nLCBwYXJzZVRvSHNsLCBwYXJzZVRvUmdiLCBwbGFjZWhvbGRlciwgcG9zaXRpb24sIHJhZGlhbEdyYWRpZW50LCBjdXJyaWVkUmVhZGFibGVDb2xvciBhcyByZWFkYWJsZUNvbG9yLCByZW0sIHJldGluYUltYWdlLCByZ2IsIHJnYmEsIGN1cnJpZWRTYXR1cmF0ZSBhcyBzYXR1cmF0ZSwgc2VsZWN0aW9uLCBjdXJyaWVkU2V0SHVlIGFzIHNldEh1ZSwgY3VycmllZFNldExpZ2h0bmVzcyBhcyBzZXRMaWdodG5lc3MsIGN1cnJpZWRTZXRTYXR1cmF0aW9uIGFzIHNldFNhdHVyYXRpb24sIGN1cnJpZWRTaGFkZSBhcyBzaGFkZSwgc2l6ZSwgc3RyaXBVbml0LCB0ZXh0SW5wdXRzLCB0aW1pbmdGdW5jdGlvbnMsIGN1cnJpZWRUaW50IGFzIHRpbnQsIHRvQ29sb3JTdHJpbmcsIHRyYW5zaXRpb25zLCBjdXJyaWVkVHJhbnNwYXJlbnRpemUgYXMgdHJhbnNwYXJlbnRpemUsIHRyaWFuZ2xlLCB3b3JkV3JhcCB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcG9saXNoZWQvZGlzdC9wb2xpc2hlZC5lcy5qc1xuLy8gbW9kdWxlIGlkID0gNDExXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsImltcG9ydCBzdHlsZWQsIHsgY3NzIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5cbmltcG9ydCB7IHBob25lIH0gZnJvbSAnLi4vdXRpbHMvbWVkaWEnXG5pbXBvcnQgeyByZXRpbmFJbWFnZSB9IGZyb20gJy4uL3V0aWxzL3JldGluYUltYWdlJ1xuaW1wb3J0IHsgQ29ybmVySGFuZGxlIH0gZnJvbSAnLi9TdmdzJ1xuXG5jb25zdCBBcHBTY3JlZW5zaG90ID0gKCkgPT4gKFxuICA8V3JhcHBlcj5cbiAgICA8SGFuZGxlV3JhcHBlcj5cbiAgICAgIDxDb3JuZXJIYW5kbGUgLz5cbiAgICA8L0hhbmRsZVdyYXBwZXI+XG4gIDwvV3JhcHBlcj5cbilcblxuZXhwb3J0IGRlZmF1bHQgQXBwU2NyZWVuc2hvdFxuXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6IDEwMjJweDtcbiAgaGVpZ2h0OiA1OTVweDtcblxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgYm94LXNoYWRvdzogMHB4IDZweCAxM3B4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlODtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogdG9wIHJpZ2h0O1xuXG4gICR7cmV0aW5hSW1hZ2UoJy9zdGF0aWMvYXBwLXNjcmVlbnNob3QnLCAnanBnJyl9O1xuXG4gICR7cGhvbmUoY3NzYFxuICAgIGhlaWdodDogMzIwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9zdGF0aWMvYXBwLXNjcmVlbnNob3QtbW9iaWxlQDJ4LmpwZyk7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogdG9wIGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDE1cHggI2YwZjBmMDsgLyogY2hhbmdlIFBob3RvIHdyYXBwZXIgdG9vICovXG4gIGApfTtcbmBcblxuY29uc3QgSGFuZGxlV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcblxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMHB4LCAzNXB4KTtcblxuICAke3Bob25lKGNzc2BcbiAgICBkaXNwbGF5OiBub25lO1xuICBgKX07XG5gXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0FwcFNjcmVlbnNob3QuanMiLCJpbXBvcnQgeyBjc3MgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcblxuZXhwb3J0IGNvbnN0IHJldGluYUltYWdlID0gKHVybCwgZXh0LCBzdWZmaXggPSAnQDJ4JykgPT4gY3NzYFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHt1cmwgKyAnLicgKyBleHR9KTtcblxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMyksXG4gICAgbm90IGFsbCxcbiAgICBub3QgYWxsLFxuICAgIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDEyNWRwaSksXG4gICAgb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMS4zZHBweCkge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke3VybCArIHN1ZmZpeCArICcuJyArIGV4dH0pO1xuICB9XG5gXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9yZXRpbmFJbWFnZS5qcyIsImltcG9ydCBzdHlsZWQsIHsgY3NzIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5cbmltcG9ydCB7IHBob25lIH0gZnJvbSAnLi4vdXRpbHMvbWVkaWEnXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4uL2NvbXBvbmVudHMvQ29udGFpbmVyJ1xuXG5jb25zdCBRdW90ZSA9ICgpID0+IChcbiAgPFdyYXBwZXI+XG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDxFbW9qaT7wn5KdPC9FbW9qaT5cbiAgICAgIDxCcT5cbiAgICAgICAgPFRleHQ+XG4gICAgICAgICAgQXMgYSByZW1vdGUgZW5naW5lZXIgYW5kIG9wZW4gc291cmNlciwgSXQgd2FzIHN1cGVyIGhhcmQgdG8ga2VlcCB0cmFja1xuICAgICAgICAgIG9mIG15IGZyaWVuZHMgdGltZXpvbmVzLiBJIHdhbnQgdG8gc2hhcmUgbXkgcHJhY3RpY2FsIHNvbHV0aW9uIHcvIHlvdVxuICAgICAgICAgIHRvbyFcbiAgICAgICAgPC9UZXh0PlxuICAgICAgICA8V2hvPk1vIFJhamFiaSAtIE1ha2VyIG9mIFRoZXJl4oSiPC9XaG8+XG4gICAgICA8L0JxPlxuICAgIDwvQ29udGFpbmVyPlxuICA8L1dyYXBwZXI+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFF1b3RlXG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuc2VjdGlvbmBcbiAgbWFyZ2luLXRvcDogMTIwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAke3Bob25lKGNzc2BcbiAgICBtYXJnaW4tdG9wOiA4MHB4O1xuICBgKX07XG5gXG5cbmNvbnN0IEJxID0gc3R5bGVkLmJsb2NrcXVvdGVgXG4gIG1hcmdpbjogMDtcbmBcblxuY29uc3QgRW1vamkgPSBzdHlsZWQucGBcbiAgZm9udC1zaXplOiAzNXB4O1xuICBtYXJnaW46IDA7XG5cbiAgJHtwaG9uZShjc3NgXG4gICAgZm9udC1zaXplOiAzMHB4O1xuICBgKX07XG5gXG5cbmNvbnN0IFRleHQgPSBzdHlsZWQucGBcbiAgZm9udC1zaXplOiAzNXB4O1xuICBsZXR0ZXItc3BhY2luZzogLTFweDtcbiAgbWFyZ2luOiAzMHB4IDAgMCAwO1xuICBjb2xvcjogJHtwID0+IHAudGhlbWUuY29sb3JzLmRhcmtUZXh0fTtcblxuICAke3Bob25lKGNzc2BcbiAgICBmb250LXNpemU6IDIycHg7XG4gIGApfTtcbmBcblxuY29uc3QgV2hvID0gc3R5bGVkLnBgXG4gIG1hcmdpbjogMTZweCAwIDAgMDtcbiAgY29sb3I6ICR7cCA9PiBwLnRoZW1lLmNvbG9ycy5tdXRlZFRleHR9O1xuXG4gICR7cGhvbmUoY3NzYFxuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgYCl9O1xuYFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VjdGlvbnMvUXVvdGUuanMiLCJpbXBvcnQgc3R5bGVkLCB7IGNzcyB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJ1xuXG5pbXBvcnQgeyBwaG9uZSB9IGZyb20gJy4uL3V0aWxzL21lZGlhJ1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuLi9jb21wb25lbnRzL0NvbnRhaW5lcidcbmltcG9ydCBGZWF0dXJlSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL0ZlYXR1cmVJdGVtJ1xuaW1wb3J0IHsgQ2lyY2xlLCBSZWN0LCBUcmlhbmdsZSwgU2xhY2sgYXMgU2xhY2tJY29uIH0gZnJvbSAnLi4vY29tcG9uZW50cy9TdmdzJ1xuXG5jb25zdCBGZWF0dXJlcyA9ICgpID0+IChcbiAgPFdyYXBwZXI+XG4gICAgPENvbnRhaW5lciB3aWRlPlxuICAgICAgPEdyaWRXcmFwcGVyPlxuICAgICAgICA8RmVhdHVyZUl0ZW1cbiAgICAgICAgICB0aXRsZT1cIlBlb3BsZSBmaXJzdCBkZXNpZ25cIlxuICAgICAgICAgIGRlc2M9XCJDaXR5LCBjb3VudHJ5LCB0aW1lem9uZSBjb21lcyBhZnRlciB0aGUgcGVvcGxlXCJcbiAgICAgICAgICByZW5kZXJJY29uPXsoKSA9PiA8Q2lyY2xlIC8+fVxuICAgICAgICAgIGljb25Ub3A9ey02fVxuICAgICAgICAgIGljb25MZWZ0PXstMTR9XG4gICAgICAgIC8+XG4gICAgICAgIDxGZWF0dXJlSXRlbVxuICAgICAgICAgIHRpdGxlPVwiUGluIGZvciBxdWljayBhY2Nlc3NcIlxuICAgICAgICAgIGRlc2M9XCJGcmVxdWVudGx5IGludGVyYWN0aW5nIHcvIGEgZmV3IG9uZXM/IFBpbiDigJhlbSFcIlxuICAgICAgICAgIHJlbmRlckljb249eygpID0+IDxSZWN0IC8+fVxuICAgICAgICAgIGljb25Ub3A9ey0xMH1cbiAgICAgICAgICBpY29uTGVmdD17LTl9XG4gICAgICAgIC8+XG4gICAgICAgIDxGZWF0dXJlSXRlbVxuICAgICAgICAgIHRpdGxlPVwiQnVpbHQgZm9yIGVmZmljaWVuY3lcIlxuICAgICAgICAgIGRlc2M9XCJFdmVyeSBwaWVjZSBvZiBVSSBpcyBwbGFjZWQgdy8gdXNlciBpbiBtaW5kXCJcbiAgICAgICAgICByZW5kZXJJY29uPXsoKSA9PiA8VHJpYW5nbGUgLz59XG4gICAgICAgICAgaWNvblRvcD17LTEyfVxuICAgICAgICAgIGljb25MZWZ0PXstMjV9XG4gICAgICAgIC8+XG4gICAgICAgIDxTbGFja0JveCAvPlxuICAgICAgPC9HcmlkV3JhcHBlcj5cbiAgICA8L0NvbnRhaW5lcj5cbiAgPC9XcmFwcGVyPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlc1xuXG5jb25zdCBTbGFja0JveCA9ICgpID0+IChcbiAgPFNsYWNrV3JhcHBlcj5cbiAgICA8U2xhY2tJY29uV3JhcHBlcj5cbiAgICAgIDxTbGFja0ljb24gLz5cbiAgICA8L1NsYWNrSWNvbldyYXBwZXI+XG4gICAgPFNsYWNrRmVhdHVyZUl0ZW1XcmFwcGVyPlxuICAgICAgPEZlYXR1cmVJdGVtXG4gICAgICAgIHRpdGxlPVwiU2xhY2sgdGVhbSBzdXBwb3J0XCJcbiAgICAgICAgZGVzYz1cIkltcG9ydCB5b3VyIHdob2xlIHRlYW0gZnJvbSBTbGFjayB3aXRoIDEtY2xpY2tcIlxuICAgICAgLz5cbiAgICA8L1NsYWNrRmVhdHVyZUl0ZW1XcmFwcGVyPlxuICA8L1NsYWNrV3JhcHBlcj5cbilcblxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5zZWN0aW9uYFxuICBtYXJnaW4tdG9wOiAxNzBweDtcblxuICAke3Bob25lKGNzc2BcbiAgICBtYXJnaW4tdG9wOiAxMTBweDtcbiAgYCl9O1xuYFxuXG5jb25zdCBHcmlkV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XG4gIGdyaWQtY29sdW1uLWdhcDogMTAwcHg7XG4gIGdyaWQtcm93LWdhcDogNDBweDtcblxuICAke3Bob25lKGNzc2BcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgYCl9O1xuYFxuXG5jb25zdCBTbGFja0ljb25XcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgJHtwaG9uZShjc3NgXG4gICAgZ3JpZC1jb2x1bW46IDM7XG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xuICBgKX07XG5gXG5cbmNvbnN0IFNsYWNrRmVhdHVyZUl0ZW1XcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZ3JpZC1jb2x1bW46IDI7XG4gIGdyaWQtcm93OiAxO1xuYFxuXG5jb25zdCBTbGFja1dyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICB3aWR0aDogMTAwJTtcbiAgZ3JpZC1jb2x1bW46IDEgLyA0O1xuICBwYWRkaW5nOiAzMHB4IDM3cHg7XG4gIGJhY2tncm91bmQ6ICNmMGYwZjA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAke3Bob25lKGNzc2BcbiAgICBncmlkLWNvbHVtbjogMTtcbiAgICBwYWRkaW5nOiAyMnB4IDI1cHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG5cbiAgICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciBhdXRvO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0bztcbiAgYCl9O1xuYFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VjdGlvbnMvRmVhdHVyZXMuanMiLCJpbXBvcnQgc3R5bGVkLCB7IGNzcyB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJ1xuXG5pbXBvcnQgeyBwaG9uZSB9IGZyb20gJy4uL3V0aWxzL21lZGlhJ1xuXG5jb25zdCBGZWF0dXJlSXRlbSA9IHByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGljb25Ub3AgPSAwLFxuICAgIGljb25MZWZ0ID0gMCxcbiAgICByZW5kZXJJY29uID0gKCkgPT4gPGRpdiAvPixcbiAgICB0aXRsZSxcbiAgICBkZXNjLFxuICB9ID0gcHJvcHNcbiAgcmV0dXJuIChcbiAgICA8V3JhcHBlcj5cbiAgICAgIDxUaXRsZT5cbiAgICAgICAgPEljb24gdG9wPXtpY29uVG9wfSBsZWZ0PXtpY29uTGVmdH0+XG4gICAgICAgICAge3JlbmRlckljb24oKX1cbiAgICAgICAgPC9JY29uPlxuICAgICAgICA8VGl0bGVUZXh0Pnt0aXRsZX08L1RpdGxlVGV4dD5cbiAgICAgIDwvVGl0bGU+XG4gICAgICA8RGVzY3JpcHRpb24+e2Rlc2N9PC9EZXNjcmlwdGlvbj5cbiAgICA8L1dyYXBwZXI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmVhdHVyZUl0ZW1cblxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbmBcblxuY29uc3QgSWNvbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAke3AgPT4gU3RyaW5nKHAudG9wKSB8fCAnMCd9cHg7XG4gIGxlZnQ6ICR7cCA9PiBTdHJpbmcocC5sZWZ0KSB8fCAnMCd9cHg7XG5cbiAgJHtwaG9uZShjc3NgXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjkzKTtcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgY2VudGVyO1xuICBgKX07XG5gXG5cbmNvbnN0IFRpdGxlID0gc3R5bGVkLmgzYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbjogMDtcblxuICBmb250LWZhbWlseTogJ1BsYXlmYWlyIERpc3BsYXknLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNzAwO1xuICBmb250LXNpemU6IDM1cHg7XG4gIGxldHRlci1zcGFjaW5nOiAtMXB4O1xuXG4gICR7cGhvbmUoY3NzYFxuICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgYCl9O1xuYFxuXG5jb25zdCBUaXRsZVRleHQgPSBzdHlsZWQuc3BhbmBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAzO1xuYFxuXG5jb25zdCBEZXNjcmlwdGlvbiA9IHN0eWxlZC5wYFxuICBtYXJnaW46IDlweCAwIDAgMDtcbiAgbGluZS1oZWlnaHQ6IDEuMztcbiAgbGV0dGVyLXNwYWNpbmc6IC0wLjhweDtcbiAgY29sb3I6ICR7cCA9PiBwLnRoZW1lLmNvbG9ycy5ncmV5VGV4dH07XG5gXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0ZlYXR1cmVJdGVtLmpzIiwiaW1wb3J0IHN0eWxlZCwgeyBjc3MgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcblxuaW1wb3J0IHsgcGhvbmUgfSBmcm9tICcuLi91dGlscy9tZWRpYSdcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Db250YWluZXInXG5pbXBvcnQgU2VjdGlvbkhlYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9TZWN0aW9uSGVhZGluZydcblxuY29uc3QgSXNJdFJlYWR5ID0gKCkgPT4gKFxuICA8V3JhcHBlcj5cbiAgICA8Q29udGFpbmVyPlxuICAgICAgPFNlY3Rpb25IZWFkaW5nPklzIGl0IHJlYWR5PzwvU2VjdGlvbkhlYWRpbmc+XG4gICAgICA8VGV4dD5cbiAgICAgICAgPHA+XG4gICAgICAgICAgSeKAmW0gd29ya2luZyBoYXJkIHRvIHNoaXAgdGhlIG1hY09TIGFwcCBhdCBsYXRlciBKYW51YXJ5LCBhZnRlciB0aGF0XG4gICAgICAgICAgSeKAmWxsIHN0YXJ0IHdvcmtpbmcgb24gb3RoZXIgZGVza3RvcCBwbGF0Zm9ybXMgYW5kIGEgbW9iaWxlIGFwcC4g8J+SqlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPklmIHlvdSBsaWtlIFRoZXJl4oSiLCB5b3UgY2FuIHN1YnNjcmliZSB0byB0aGUgbWFpbGluZyBsaXN0IG5vdyE8L3A+XG4gICAgICA8L1RleHQ+XG4gICAgPC9Db250YWluZXI+XG4gIDwvV3JhcHBlcj5cbilcblxuZXhwb3J0IGRlZmF1bHQgSXNJdFJlYWR5XG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuYXNpZGVgXG4gIG1hcmdpbi10b3A6IDEzMHB4O1xuYFxuXG5jb25zdCBUZXh0ID0gc3R5bGVkLmRpdmBcbiAgcCB7XG4gICAgbWFyZ2luOiAxM3B4IDAgMCAwO1xuICAgIGNvbG9yOiAke3AgPT4gcC50aGVtZS5jb2xvcnMuZ3JleVRleHR9O1xuXG4gICAgJjpmaXJzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIH1cbiAgfVxuYFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VjdGlvbnMvSXNJdFJlYWR5LmpzIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcblxuY29uc3QgSGVhZGluZyA9IHN0eWxlZC5oMmBcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwIDAgMjBweCAwO1xuXG4gIGZvbnQtZmFtaWx5OiBQbGF5ZmFpciBEaXNwbGF5O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiA2NXB4O1xuICBsZXR0ZXItc3BhY2luZzogLTAuNXB4O1xuXG4gIGNvbG9yOiAke3AgPT4gcC50aGVtZS5jb2xvcnMuZGFya1RleHR9O1xuYFxuXG5leHBvcnQgZGVmYXVsdCBIZWFkaW5nXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL1NlY3Rpb25IZWFkaW5nLmpzIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiZcbiAgICBTeW1ib2wuZm9yICYmXG4gICAgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpKSB8fFxuICAgIDB4ZWFjNztcblxuICB2YXIgaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIG9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gIH07XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG4gIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGludmFyaWFudCh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAndGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCVzYC4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSk7XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcik7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzUwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDN2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzckRBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3ZrREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQUE7QUFNQTtBQUNBO0FBREE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7Ozs7OztBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUdBO0FBQ0E7QUFBQTs7QUFIQTtBQUFBO0FBQUE7QUFDQTtBQU9BO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFHQTtBQUNBO0FBQUE7O0FBSEE7QUFBQTtBQUFBO0FBQ0E7QUFPQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBR0E7QUFBQTs7QUFGQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7O0FBSUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTs7QUFJQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBR0E7QUFDQTtBQUFBOztBQUhBO0FBS0E7QUFMQTtBQUNBO0FBTUE7QUFBQTs7QUFGQTtBQUFBO0FBQUE7QUFDQTtBQVJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBRUE7QUFDQTs7Ozs7OztBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQU5BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBSkE7QUFEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7O0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUVBO0FBRkE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFFQTtBQUZBO0FBQUE7O0FBRUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFUQTtBQUNBO0FBYUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFTQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBcUJBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFlQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFGQTtBQUNBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUFBO0FBU0E7QUFUQTtBQVVBO0FBVkE7QUFjQTtBQWRBO0FBQ0E7QUFpQkE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUhBOzs7Ozs7Ozs7OztBQ2hKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25oR0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFzQkE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7OztBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7OztBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQVFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUpBO0FBQ0E7QUFVQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEQTtBQUNBOzs7QUFDQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7O0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBR0E7QUFDQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7O0FBTEE7QUFPQTtBQVBBO0FBQ0E7QUFRQTtBQUNBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTs7QUFMQTtBQU9BO0FBUEE7QUFDQTtBQVFBO0FBQ0E7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOztBQUxBO0FBT0E7QUFQQTtBQUNBOztBQU1BO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFFQTtBQUZBO0FBQUE7O0FBRUE7QUFDQTtBQURBO0FBQUE7QUFHQTtBQUFBOztBQUZBO0FBQUE7QUFBQTtBQUNBO0FBUEE7QUFDQTtBQWFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBV0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7OztBQUNBO0FBT0E7QUFMQTtBQUtBO0FBSkE7QUFJQTtBQUhBOzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBS0E7QUFDQTtBQUNBO0FBRUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUZBO0FBR0E7QUFIQTtBQUNBO0FBVUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQWFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBSkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBOzs7QUFDQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUlBO0FBQUE7QUFBQTtBQUFBO0FBTUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBSEE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFTQTtBQUdBO0FBQ0E7QUFEQTs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==
            return { page: comp.default }
          })
        