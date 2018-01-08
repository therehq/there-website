
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

/***/ 394:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_is_plain_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stylis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hoist_non_react_statics__ = __webpack_require__(398);
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

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(396);

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

/***/ 396:
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

/***/ 397:
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

/***/ 398:
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

/***/ 399:
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

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  colors: {
    greyText: '#777',
    mutedText: '#B8B8B8',
    lightGreen: '#DDE8D8',
    green: '#44C285'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3RoZW1lLmpzIl0sIm5hbWVzIjpbImNvbG9ycyIsImdyZXlUZXh0IiwibXV0ZWRUZXh0IiwibGlnaHRHcmVlbiIsImdyZWVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O2NBQ1UsQUFDSSxBQUNWO2VBRk0sQUFFSyxBQUNYO2dCQUhNLEFBR00sQUFDWjtXQUxKLEFBQWUsQUFDTCxBQUlDO0FBSkQsQUFDTjtBQUZXLEFBQ2IiLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/utils/theme.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/utils/theme.js"); } } })();

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIDE_PADDINGS = exports.NORMAL_WIDTH = exports.WIDE_WIDTH = undefined;

var _styledComponents = __webpack_require__(394);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _rem = __webpack_require__(399);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WIDE_WIDTH = exports.WIDE_WIDTH = 1200;
var NORMAL_WIDTH = exports.NORMAL_WIDTH = 900;
var SIDE_PADDINGS = exports.SIDE_PADDINGS = 25;

var Container = _styledComponents2.default.div.withConfig({
  displayName: 'Container',
  componentId: 'ljtdv5-0'
})(['width:', ';margin:0 auto;padding:0 ', 'px;box-sizing:content-box;'], function (p) {
  return p.wide ? (0, _rem.rem)(WIDE_WIDTH) : (0, _rem.rem)(NORMAL_WIDTH);
}, SIDE_PADDINGS);

exports.default = Container;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ29udGFpbmVyLmpzIl0sIm5hbWVzIjpbInN0eWxlZCIsInJlbSIsIldJREVfV0lEVEgiLCJOT1JNQUxfV0lEVEgiLCJTSURFX1BBRERJTkdTIiwiQ29udGFpbmVyIiwiZGl2IiwicCIsIndpZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBRVAsQUFBUyxBQUFXLEFBRXBCOzs7O0FBQU8sSUFBTSxrQ0FBTixBQUFtQixBQUMxQjtBQUFPLElBQU0sc0NBQU4sQUFBcUIsQUFDNUI7QUFBTyxJQUFNLHdDQUFOLEFBQXNCOztBQUU3QixJQUFNLHVDQUFBLEFBQW1CO2VBQW5CO2VBQUE7QUFBQSxDQUFZLHlFQUNQLGFBQUE7U0FBTSxFQUFBLEFBQUUsT0FBTyxjQUFULEFBQVMsQUFBSSxjQUFjLGNBQWpDLEFBQWlDLEFBQUk7QUFEMUMsR0FBTixBQUFNLEFBR1MsQUFJZjs7a0JBQUEsQUFBZSIsImZpbGUiOiJDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/components/Container.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/components/Container.js"); } } })();

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogoType = exports.CornerHandle = undefined;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvU3Zncy5qcyJdLCJuYW1lcyI6WyJDb3JuZXJIYW5kbGUiLCJMb2dvVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7O0FBQU8sSUFBTSxzQ0FBZSxTQUFmLEFBQWUsZUFBQTt5QkFDMUIsY0FBQSxTQUFLLE9BQUwsQUFBVyxPQUFNLFFBQWpCLEFBQXdCLE1BQUssU0FBN0IsQUFBcUM7Z0JBQXJDO2tCQUFBLEFBQ0U7QUFERjtHQUFBO1VBQ0UsQUFDTyxBQUNMO2NBRkYsQUFFVyxBQUNUO09BSEYsQUFHSTs7Z0JBSEo7a0JBRndCLEFBQzFCLEFBQ0U7QUFBQTtBQUNFO0FBSEMsQUFVUDs7QUFBTyxJQUFNLDhCQUFXLFNBQVgsQUFBVyxXQUFBO3lCQUN0QixjQUFBLFNBQUssT0FBTCxBQUFXLE9BQU0sUUFBakIsQUFBd0IsTUFBSyxTQUE3QixBQUFxQztnQkFBckM7a0JBQUEsQUFDRTtBQURGO0dBQUE7VUFDRSxBQUNPLEFBQ0w7Y0FGRixBQUVXLEFBQ1Q7T0FIRixBQUdJOztnQkFISjtrQkFGb0IsQUFDdEIsQUFDRTtBQUFBO0FBQ0U7QUFIQyIsImZpbGUiOiJTdmdzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tb2hhbW1hZC9Eb2N1bWVudHMvZGV2L3RoZXJlL3RoZXJlLXdlYnNpdGUifQ==

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

var _styledComponents = __webpack_require__(394);

var _Container = __webpack_require__(405);

var _Container2 = _interopRequireDefault(_Container);

var _Hero = __webpack_require__(409);

var _Hero2 = _interopRequireDefault(_Hero);

var _theme = __webpack_require__(400);

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/mohammad/Documents/dev/there/there-website/pages/index.js?entry';

exports.default = function () {
  return _react2.default.createElement(_styledComponents.ThemeProvider, { theme: _theme2.default, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement(_Hero2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }), _react2.default.createElement(_Container2.default, { key: '2', wide: true, style: { background: 'grey' }, __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, 's')));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlRoZW1lUHJvdmlkZXIiLCJDb250YWluZXIiLCJIZXJvIiwidGhlbWUiLCJiYWNrZ3JvdW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBUzs7QUFFVCxBQUFPLEFBQWU7Ozs7QUFDdEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBVyxBQUVsQjs7Ozs7Ozs7a0JBQWUsWUFBQTt5QkFDYixBQUFDLGlEQUFELEFBQWUsQUFBTztnQkFBdEI7a0JBQUEsQUFDRTtBQURGO0dBQUEsa0JBQ0UsY0FBQTs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsQUFBQzs7Z0JBQUQ7a0JBREYsQUFDRSxBQUNBO0FBREE7QUFBQSxzQkFDQSxBQUFDLHFDQUFVLEtBQVgsQUFBZSxLQUFJLE1BQW5CLEFBQXlCLE1BQU0sT0FBTyxFQUFFLFlBQXhDLEFBQXNDLEFBQWM7Z0JBQXBEO2tCQUFBO0FBQUE7S0FKUyxBQUNiLEFBQ0UsQUFFRTtBQUpOIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tb2hhbW1hZC9Eb2N1bWVudHMvZGV2L3RoZXJlL3RoZXJlLXdlYnNpdGUifQ==

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

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(394);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _polished = __webpack_require__(412);

var _media = __webpack_require__(413);

var _Container = __webpack_require__(405);

var _AppScreenshot = __webpack_require__(410);

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

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(394);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _media = __webpack_require__(413);

var _retinaImage = __webpack_require__(411);

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

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retinaImage = undefined;

var _styledComponents = __webpack_require__(394);

var retinaImage = exports.retinaImage = function retinaImage(url, ext) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '@2x';
  return (0, _styledComponents.css)(['background-image:url(', ');@media only screen and (-webkit-min-device-pixel-ratio:1.3),not all,not all,only screen and (min-resolution:125dpi),only screen and (min-resolution:1.3dppx){background-image:url(', ');}'], url + '.' + ext, url + suffix + '.' + ext);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3JldGluYUltYWdlLmpzIl0sIm5hbWVzIjpbImNzcyIsInJldGluYUltYWdlIiwidXJsIiwiZXh0Iiwic3VmZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsQUFBUyxBQUFULEFBRUE7O0FBQU8sSUFBTSxvQ0FBYyxTQUFkLEFBQWMsWUFBQyxBQUFELEtBQU0sQUFBTixLQUFBO01BQVcsQUFBWCw2RUFBb0IsQUFBcEI7U0FBOEIsQUFBOUIscVBBQ0QsTUFBTSxBQUFOLE1BQVksQUFEWCxLQVFDLE1BQU0sQUFBTixTQUFlLEFBQWYsTUFBcUIsQUFSdEI7QUFBcEIiLCJmaWxlIjoicmV0aW5hSW1hZ2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21vaGFtbWFkL0RvY3VtZW50cy9kZXYvdGhlcmUvdGhlcmUtd2Vic2l0ZSJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/utils/retinaImage.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/utils/retinaImage.js"); } } })();

/***/ }),

/***/ 412:
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

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.phone = exports.mobile = undefined;

var _styledComponents = __webpack_require__(394);

var _Container = __webpack_require__(405);

var mobile = exports.mobile = function mobile(inner) {
  return (0, _styledComponents.css)(['@media (max-width:', 'px){', ';}'], _Container.WIDE_WIDTH, inner);
};

var phone = exports.phone = function phone(inner) {
  return (0, _styledComponents.css)(['@media (max-width:', 'px){', ';}'], _Container.NORMAL_WIDTH, inner);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL21lZGlhLmpzIl0sIm5hbWVzIjpbImNzcyIsIldJREVfV0lEVEgiLCJOT1JNQUxfV0lEVEgiLCJtb2JpbGUiLCJpbm5lciIsInBob25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsQUFBUyxBQUFUOztBQUVBLEFBQVMsQUFBVCxBQUFxQixBQUFyQixBQUF5QyxBQUF6QyxBQUVBOztBQUFPLElBQU0sMEJBQVMsU0FBVCxBQUFTLGNBQUE7U0FBUyxBQUFULDBEQUNDLEFBREQsOEJBRWhCLEFBRmdCO0FBQWYsQUFNUDs7QUFBTyxJQUFNLHdCQUFRLFNBQVIsQUFBUSxhQUFBO1NBQVMsQUFBVCwwREFDRSxBQURGLGdDQUVmLEFBRmU7QUFBZCIsImZpbGUiOiJtZWRpYS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbW9oYW1tYWQvRG9jdW1lbnRzL2Rldi90aGVyZS90aGVyZS13ZWJzaXRlIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/mohammad/Documents/dev/there/there-website/utils/media.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/mohammad/Documents/dev/there/there-website/utils/media.js"); } } })();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzP2ZmODZhZWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanM/ZmY4NmFlYyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzP2ZmODZhZWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanM/ZmY4NmFlYyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanM/ZmY4NmFlYyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcz84NDBlNjA5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanM/ODQwZTYwOSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcz84NDBlNjA5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZWQtY29tcG9uZW50cy9kaXN0L3N0eWxlZC1jb21wb25lbnRzLmVzLmpzPzg0MGU2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLXBsYWluLW9iamVjdC9pbmRleC5qcz84NDBlNjA5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc29iamVjdC9pbmRleC5qcz84NDBlNjA5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsaXMvc3R5bGlzLmpzPzg0MGU2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlZC1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9pbmRleC5qcz84NDBlNjA5Iiwid2VicGFjazovLy8uL3V0aWxzL3JlbS5qcz84NDBlNjA5Iiwid2VicGFjazovLy8uL3V0aWxzL3RoZW1lLmpzPzg0MGU2MDkiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Db250YWluZXIuanM/ODQwZTYwOSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1N2Z3MuanM/ODQwZTYwOSIsIndlYnBhY2s6Ly8vLi9wYWdlcz84NDBlNjA5Iiwid2VicGFjazovLy8uL3NlY3Rpb25zL0hlcm8uanM/ODQwZTYwOSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0FwcFNjcmVlbnNob3QuanM/ODQwZTYwOSIsIndlYnBhY2s6Ly8vLi91dGlscy9yZXRpbmFJbWFnZS5qcz84NDBlNjA5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wb2xpc2hlZC9kaXN0L3BvbGlzaGVkLmVzLmpzPzg0MGU2MDkiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbWVkaWEuanM/ODQwZTYwOSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcz84NDBlNjA5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzPzg0MGU2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanM/ODQwZTYwOSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanM/ODQwZTYwOSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzPzg0MGU2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5T2JqZWN0LmpzPzg0MGU2MDkiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChvYmpba10sIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbmZ1bmN0aW9uIG1hcCAoeHMsIGYpIHtcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmVzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjIuMFxuICogcmVhY3QuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cblxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMnKTtcblxuLy8gVE9ETzogdGhpcyBpcyBzcGVjaWFsIGJlY2F1c2UgaXQgZ2V0cyBpbXBvcnRlZCBkdXJpbmcgYnVpbGQuXG5cbnZhciBSZWFjdFZlcnNpb24gPSAnMTYuMi4wJztcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFsnZm9yJ107XG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2xbJ2ZvciddKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfQ0FMTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sWydmb3InXSgncmVhY3QuY2FsbCcpIDogMHhlYWM4O1xudmFyIFJFQUNUX1JFVFVSTl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sWydmb3InXSgncmVhY3QucmV0dXJuJykgOiAweGVhYzk7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2xbJ2ZvciddKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sWydmb3InXSgncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcblxudmFyIE1BWUJFX0lURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgaWYgKG1heWJlSXRlcmFibGUgPT09IG51bGwgfHwgdHlwZW9mIG1heWJlSXRlcmFibGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuICBpZiAodHlwZW9mIG1heWJlSXRlcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbWF5YmVJdGVyYXRvcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBXQVJOSU5HOiBETyBOT1QgbWFudWFsbHkgcmVxdWlyZSB0aGlzIG1vZHVsZS5cbiAqIFRoaXMgaXMgYSByZXBsYWNlbWVudCBmb3IgYGludmFyaWFudCguLi4pYCB1c2VkIGJ5IHRoZSBlcnJvciBjb2RlIHN5c3RlbVxuICogYW5kIHdpbGwgX29ubHlfIGJlIHJlcXVpcmVkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGJhYmVsIHBhc3MuXG4gKiBJdCBhbHdheXMgdGhyb3dzLlxuICovXG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nJDEgPSBsb3dQcmlvcml0eVdhcm5pbmc7XG5cbnZhciBkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnQgPSB7fTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29uc3RydWN0b3IgJiYgKGNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IGNvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJztcbiAgICB2YXIgd2FybmluZ0tleSA9IGNvbXBvbmVudE5hbWUgKyAnLicgKyBjYWxsZXJOYW1lO1xuICAgIGlmIChkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnRbd2FybmluZ0tleV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuXFxuXFxuUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbXBvbmVudE5hbWUpO1xuICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGNhbGxlck5hbWUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IE5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5cbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLCBjYWxsYmFjaywgJ2ZvcmNlVXBkYXRlJyk7XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xue1xuICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gIH07XG4gIHZhciBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgaW5mbykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICBpZiAoZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSkge1xuICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgLy8gRHVwbGljYXRlZCBmcm9tIENvbXBvbmVudC5cbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG52YXIgcHVyZUNvbXBvbmVudFByb3RvdHlwZSA9IFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5wdXJlQ29tcG9uZW50UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUHVyZUNvbXBvbmVudDtcbi8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuX2Fzc2lnbihwdXJlQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG5mdW5jdGlvbiBBc3luY0NvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAvLyBEdXBsaWNhdGVkIGZyb20gQ29tcG9uZW50LlxuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxudmFyIGFzeW5jQ29tcG9uZW50UHJvdG90eXBlID0gQXN5bmNDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5hc3luY0NvbXBvbmVudFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFzeW5jQ29tcG9uZW50O1xuLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5fYXNzaWduKGFzeW5jQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcbmFzeW5jQ29tcG9uZW50UHJvdG90eXBlLnVuc3RhYmxlX2lzQXN5bmNSZWFjdENvbXBvbmVudCA9IHRydWU7XG5hc3luY0NvbXBvbmVudFByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xufTtcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG59O1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xuXG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd247XG52YXIgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRLZXkoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICB3YXJuaW5nKGZhbHNlLCAnJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgd2FybmluZyhmYWxzZSwgJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ1JlZi5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3JlZicsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBubyBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93IHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcblxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcblxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0pO1xuICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNlbGZcbiAgICB9KTtcbiAgICAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBzb3VyY2VcbiAgICB9KTtcbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY3JlYXRlZWxlbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIHByb3BzID0ge307XG5cbiAgdmFyIGtleSA9IG51bGw7XG4gIHZhciByZWYgPSBudWxsO1xuICB2YXIgc2VsZiA9IG51bGw7XG4gIHZhciBzb3VyY2UgPSBudWxsO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAge1xuICAgICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZShjaGlsZEFycmF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAge1xuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBSZWFjdEVsZW1lbnRzIG9mIGEgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY3JlYXRlZmFjdG9yeVxuICovXG5cblxuZnVuY3Rpb24gY2xvbmVBbmRSZXBsYWNlS2V5KG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjbG9uZWVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY2xvbmVFbGVtZW50KGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcbiAgdmFyIHByb3BzID0gX2Fzc2lnbih7fSwgZWxlbWVudC5wcm9wcyk7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmO1xuICAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cbiAgdmFyIHNvdXJjZSA9IGVsZW1lbnQuX3NvdXJjZTtcblxuICAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG4gIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2lzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIHZhbGlkIGNvbXBvbmVudC5cbiAqIEBmaW5hbFxuICovXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cblxudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSB7fTtcblxue1xuICAvLyBDb21wb25lbnQgdGhhdCBpcyBiZWluZyB3b3JrZWQgb25cbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2sgPSBudWxsO1xuXG4gIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW1wbCA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0Q3VycmVudFN0YWNrO1xuICAgIGlmIChpbXBsKSB7XG4gICAgICByZXR1cm4gaW1wbCgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbn1cblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlKGtleSkge1xuICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPSc6ICc9MCcsXG4gICAgJzonOiAnPTInXG4gIH07XG4gIHZhciBlc2NhcGVkU3RyaW5nID0gKCcnICsga2V5KS5yZXBsYWNlKGVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xuXG4gIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xufVxuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbn1cblxudmFyIFBPT0xfU0laRSA9IDEwO1xudmFyIHRyYXZlcnNlQ29udGV4dFBvb2wgPSBbXTtcbmZ1bmN0aW9uIGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChtYXBSZXN1bHQsIGtleVByZWZpeCwgbWFwRnVuY3Rpb24sIG1hcENvbnRleHQpIHtcbiAgaWYgKHRyYXZlcnNlQ29udGV4dFBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IHRyYXZlcnNlQ29udGV4dFBvb2wucG9wKCk7XG4gICAgdHJhdmVyc2VDb250ZXh0LnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgICB0cmF2ZXJzZUNvbnRleHQua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICAgIHRyYXZlcnNlQ29udGV4dC5mdW5jID0gbWFwRnVuY3Rpb247XG4gICAgdHJhdmVyc2VDb250ZXh0LmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICAgIHRyYXZlcnNlQ29udGV4dC5jb3VudCA9IDA7XG4gICAgcmV0dXJuIHRyYXZlcnNlQ29udGV4dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0OiBtYXBSZXN1bHQsXG4gICAgICBrZXlQcmVmaXg6IGtleVByZWZpeCxcbiAgICAgIGZ1bmM6IG1hcEZ1bmN0aW9uLFxuICAgICAgY29udGV4dDogbWFwQ29udGV4dCxcbiAgICAgIGNvdW50OiAwXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCkge1xuICB0cmF2ZXJzZUNvbnRleHQucmVzdWx0ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmtleVByZWZpeCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5mdW5jID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmNvbnRleHQgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuY291bnQgPSAwO1xuICBpZiAodHJhdmVyc2VDb250ZXh0UG9vbC5sZW5ndGggPCBQT09MX1NJWkUpIHtcbiAgICB0cmF2ZXJzZUNvbnRleHRQb29sLnB1c2godHJhdmVyc2VDb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICB2YXIgaW52b2tlQ2FsbGJhY2sgPSBmYWxzZTtcblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHN3aXRjaCAoY2hpbGRyZW4uJCR0eXBlb2YpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NBTExfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1JFVFVSTl9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW52b2tlQ2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQ7XG4gIHZhciBuZXh0TmFtZTtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB7XG4gICAgICAgIC8vIFdhcm4gYWJvdXQgdXNpbmcgTWFwcyBhcyBjaGlsZHJlblxuICAgICAgICBpZiAoaXRlcmF0b3JGbiA9PT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICAgIHdhcm5pbmcoZGlkV2FybkFib3V0TWFwcywgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgdW5zdXBwb3J0ZWQgYW5kIHdpbGwgbGlrZWx5IHlpZWxkICcgKyAndW5leHBlY3RlZCByZXN1bHRzLiBDb252ZXJ0IGl0IHRvIGEgc2VxdWVuY2UvaXRlcmFibGUgb2Yga2V5ZWQgJyArICdSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKSk7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGNoaWxkcmVuKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIGlpID0gMDtcbiAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpaSsrKTtcbiAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICB7XG4gICAgICAgIGFkZGVuZHVtID0gJyBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5ICcgKyAnaW5zdGVhZC4nICsgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSAnJyArIGNoaWxkcmVuO1xuICAgICAgaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50ICE9PSBudWxsICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBlc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChudWxsLCBudWxsLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQsXG4gICAgICBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXgsXG4gICAgICBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKGlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLmNvdW50XG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsLCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLnRvYXJyYXlcbiAqL1xuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ub25seVxuICpcbiAqIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHNcbiAqIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZSBwdXJwb3NlIG9mIHRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHRvXG4gKiBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZSBvZiBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IGNoaWxkcmVuIENoaWxkIGNvbGxlY3Rpb24gc3RydWN0dXJlLlxuICogQHJldHVybiB7UmVhY3RFbGVtZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0RWxlbWVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbnZhciBkZXNjcmliZUNvbXBvbmVudEZyYW1lID0gZnVuY3Rpb24gKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHJldHVybiAnXFxuICAgIGluICcgKyAobmFtZSB8fCAnVW5rbm93bicpICsgKHNvdXJjZSA/ICcgKGF0ICcgKyBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKScgOiBvd25lck5hbWUgPyAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKScgOiAnJyk7XG59O1xuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKGZpYmVyKSB7XG4gIHZhciB0eXBlID0gZmliZXIudHlwZTtcblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFJlYWN0RWxlbWVudFZhbGlkYXRvciBwcm92aWRlcyBhIHdyYXBwZXIgYXJvdW5kIGEgZWxlbWVudCBmYWN0b3J5XG4gKiB3aGljaCB2YWxpZGF0ZXMgdGhlIHByb3BzIHBhc3NlZCB0byB0aGUgZWxlbWVudC4gVGhpcyBpcyBpbnRlbmRlZCB0byBiZVxuICogdXNlZCBvbmx5IGluIERFViBhbmQgY291bGQgYmUgcmVwbGFjZWQgYnkgYSBzdGF0aWMgdHlwZSBjaGVja2VyIGZvciBsYW5ndWFnZXNcbiAqIHRoYXQgc3VwcG9ydCBpdC5cbiAqL1xuXG57XG4gIHZhciBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG5cbiAgdmFyIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gZmFsc2U7XG5cbiAgdmFyIGdldERpc3BsYXlOYW1lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyNlbXB0eSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJyN0ZXh0JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC50eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgICByZXR1cm4gJ1JlYWN0LkZyYWdtZW50JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVsZW1lbnQudHlwZS5kaXNwbGF5TmFtZSB8fCBlbGVtZW50LnR5cGUubmFtZSB8fCAnVW5rbm93bic7XG4gICAgfVxuICB9O1xuXG4gIHZhciBnZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFjayA9ICcnO1xuICAgIGlmIChjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXREaXNwbGF5TmFtZShjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCk7XG4gICAgICB2YXIgb3duZXIgPSBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudC5fb3duZXI7XG4gICAgICBzdGFjayArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIGdldENvbXBvbmVudE5hbWUob3duZXIpKTtcbiAgICB9XG4gICAgc3RhY2sgKz0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCkgfHwgJyc7XG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xuXG4gIHZhciBWQUxJRF9GUkFHTUVOVF9QUk9QUyA9IG5ldyBNYXAoW1snY2hpbGRyZW4nLCB0cnVlXSwgWydrZXknLCB0cnVlXV0pO1xufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oZWxlbWVudFByb3BzKSB7XG4gIGlmIChlbGVtZW50UHJvcHMgIT09IG51bGwgJiYgZWxlbWVudFByb3BzICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudFByb3BzLl9fc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudFByb3BzLl9fc291cmNlO1xuICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgdmFyIGxpbmVOdW1iZXIgPSBzb3VyY2UubGluZU51bWJlcjtcbiAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgdmFyIGNoaWxkT3duZXIgPSAnJztcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZ2V0Q29tcG9uZW50TmFtZShlbGVtZW50Ll9vd25lcikgKyAnLic7XG4gIH1cblxuICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IGVsZW1lbnQ7XG4gIHtcbiAgICB3YXJuaW5nKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhbiBhcnJheSBvciBpdGVyYXRvciBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4lcycsIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8sIGNoaWxkT3duZXIsIGdldFN0YWNrQWRkZW5kdW0oKSk7XG4gIH1cbiAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBudWxsO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogd2l0aCB2YWxpZCBrZXkgcHJvcGVydHkuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZSBTdGF0aWNhbGx5IHBhc3NlZCBjaGlsZCBvZiBhbnkgdHlwZS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDaGlsZEtleXMobm9kZSwgcGFyZW50VHlwZSkge1xuICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEVudHJ5IGl0ZXJhdG9ycyB1c2VkIHRvIHByb3ZpZGUgaW1wbGljaXQga2V5cyxcbiAgICAgIC8vIGJ1dCBub3cgd2UgcHJpbnQgYSBzZXBhcmF0ZSB3YXJuaW5nIGZvciB0aGVtIGxhdGVyLlxuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG4gIHZhciBwcm9wVHlwZXMgPSBjb21wb25lbnRDbGFzcy5wcm9wVHlwZXM7XG4gIGlmIChwcm9wVHlwZXMpIHtcbiAgICBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgY2hlY2tQcm9wVHlwZXMocHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIGdldFN0YWNrQWRkZW5kdW0pO1xuICAgIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gbnVsbDtcbiAgfSBlbHNlIGlmIChjb21wb25lbnRDbGFzcy5Qcm9wVHlwZXMgIT09IHVuZGVmaW5lZCAmJiAhcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24pIHtcbiAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgd2FybmluZyhmYWxzZSwgJ0NvbXBvbmVudCAlcyBkZWNsYXJlZCBgUHJvcFR5cGVzYCBpbnN0ZWFkIG9mIGBwcm9wVHlwZXNgLiBEaWQgeW91IG1pc3NwZWxsIHRoZSBwcm9wZXJ0eSBhc3NpZ25tZW50PycsIG5hbWUgfHwgJ1Vua25vd24nKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHdhcm5pbmcoY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpO1xuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYSBmcmFnbWVudCwgdmFsaWRhdGUgdGhhdCBpdCBjYW4gb25seSBiZSBwcm92aWRlZCB3aXRoIGZyYWdtZW50IHByb3BzXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZnJhZ21lbnRcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVGcmFnbWVudFByb3BzKGZyYWdtZW50KSB7XG4gIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZnJhZ21lbnQ7XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gT2JqZWN0LmtleXMoZnJhZ21lbnQucHJvcHMpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGtleSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICBpZiAoIVZBTElEX0ZSQUdNRU5UX1BST1BTLmhhcyhrZXkpKSB7XG4gICAgICAgIHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJXMnLCBrZXksIGdldFN0YWNrQWRkZW5kdW0oKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yWydyZXR1cm4nXSkge1xuICAgICAgICBfaXRlcmF0b3JbJ3JldHVybiddKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXR0cmlidXRlIGByZWZgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuJXMnLCBnZXRTdGFja0FkZGVuZHVtKCkpO1xuICB9XG5cbiAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciB2YWxpZFR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHR5cGUgPT09ICdzeW1ib2wnIHx8IHR5cGVvZiB0eXBlID09PSAnbnVtYmVyJztcbiAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArIFwiaXQncyBkZWZpbmVkIGluLCBvciB5b3UgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBuYW1lZCBpbXBvcnRzLlwiO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0ocHJvcHMpO1xuICAgIGlmIChzb3VyY2VJbmZvKSB7XG4gICAgICBpbmZvICs9IHNvdXJjZUluZm87XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm8gKz0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG4gICAgfVxuXG4gICAgaW5mbyArPSBnZXRTdGFja0FkZGVuZHVtKCkgfHwgJyc7XG5cbiAgICB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlID09IG51bGwgPyB0eXBlIDogdHlwZW9mIHR5cGUsIGluZm8pO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICBpZiAodmFsaWRUeXBlKSB7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3ltYm9sJyAmJiB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgdmFsaWRhdGVGcmFnbWVudFByb3BzKGVsZW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZhY3RvcnlXaXRoVmFsaWRhdGlvbih0eXBlKSB7XG4gIHZhciB2YWxpZGF0ZWRGYWN0b3J5ID0gY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uLmJpbmQobnVsbCwgdHlwZSk7XG4gIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuXG4gIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB2YWxpZGF0ZWRGYWN0b3J5O1xufVxuXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbihlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBjbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gIH1cbiAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gIHJldHVybiBuZXdFbGVtZW50O1xufVxuXG52YXIgUmVhY3QgPSB7XG4gIENoaWxkcmVuOiB7XG4gICAgbWFwOiBtYXBDaGlsZHJlbixcbiAgICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gICAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gICAgdG9BcnJheTogdG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBDb21wb25lbnQ6IENvbXBvbmVudCxcbiAgUHVyZUNvbXBvbmVudDogUHVyZUNvbXBvbmVudCxcbiAgdW5zdGFibGVfQXN5bmNDb21wb25lbnQ6IEFzeW5jQ29tcG9uZW50LFxuXG4gIEZyYWdtZW50OiBSRUFDVF9GUkFHTUVOVF9UWVBFLFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbixcbiAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbixcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uLFxuICBpc1ZhbGlkRWxlbWVudDogaXNWYWxpZEVsZW1lbnQsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uLFxuXG4gIF9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEOiB7XG4gICAgUmVhY3RDdXJyZW50T3duZXI6IFJlYWN0Q3VycmVudE93bmVyLFxuICAgIC8vIFVzZWQgYnkgcmVuZGVyZXJzIHRvIGF2b2lkIGJ1bmRsaW5nIG9iamVjdC1hc3NpZ24gdHdpY2UgaW4gVU1EIGJ1bmRsZXM6XG4gICAgYXNzaWduOiBfYXNzaWduXG4gIH1cbn07XG5cbntcbiAgX2Fzc2lnbihSZWFjdC5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCwge1xuICAgIC8vIFRoZXNlIHNob3VsZCBub3QgYmUgaW5jbHVkZWQgaW4gcHJvZHVjdGlvbi5cbiAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lOiBSZWFjdERlYnVnQ3VycmVudEZyYW1lLFxuICAgIC8vIFNoaW0gZm9yIFJlYWN0IERPTSAxNi4wLjAgd2hpY2ggc3RpbGwgZGVzdHJ1Y3R1cmVkIChidXQgbm90IHVzZWQpIHRoaXMuXG4gICAgLy8gVE9ETzogcmVtb3ZlIGluIFJlYWN0IDE3LjAuXG4gICAgUmVhY3RDb21wb25lbnRUcmVlSG9vazoge31cbiAgfSk7XG59XG5cblxuXG52YXIgUmVhY3QkMiA9IE9iamVjdC5mcmVlemUoe1xuXHRkZWZhdWx0OiBSZWFjdFxufSk7XG5cbnZhciBSZWFjdCQzID0gKCBSZWFjdCQyICYmIFJlYWN0ICkgfHwgUmVhY3QkMjtcblxuLy8gVE9ETzogZGVjaWRlIG9uIHRoZSB0b3AtbGV2ZWwgZXhwb3J0IGZvcm0uXG4vLyBUaGlzIGlzIGhhY2t5IGJ1dCBtYWtlcyBpdCB3b3JrIHdpdGggYm90aCBSb2xsdXAgYW5kIEplc3QuXG52YXIgcmVhY3QgPSBSZWFjdCQzWydkZWZhdWx0J10gPyBSZWFjdCQzWydkZWZhdWx0J10gOiBSZWFjdCQzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlYWN0O1xuICB9KSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJXNgIHByb3Agb24gYCVzYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLicsXG4gICAgICAgICAgICAgIHByb3BGdWxsTmFtZSxcbiAgICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICVzIGF0IGluZGV4ICVzLicsXG4gICAgICAgICAgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpLFxuICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qc1xuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnaXMtcGxhaW4tb2JqZWN0JztcbmltcG9ydCBTdHlsaXMgZnJvbSAnc3R5bGlzJztcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGhvaXN0U3RhdGljcyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbnZhciBfdXBwZXJjYXNlUGF0dGVybiA9IC8oW0EtWl0pL2c7XG5cbi8qKlxuICogSHlwaGVuYXRlcyBhIGNhbWVsY2FzZWQgc3RyaW5nLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgID4gaHlwaGVuYXRlKCdiYWNrZ3JvdW5kQ29sb3InKVxuICogICA8IFwiYmFja2dyb3VuZC1jb2xvclwiXG4gKlxuICogRm9yIENTUyBzdHlsZSBuYW1lcywgdXNlIGBoeXBoZW5hdGVTdHlsZU5hbWVgIGluc3RlYWQgd2hpY2ggd29ya3MgcHJvcGVybHlcbiAqIHdpdGggYWxsIHZlbmRvciBwcmVmaXhlcywgaW5jbHVkaW5nIGBtc2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBoeXBoZW5hdGUkMihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF91cHBlcmNhc2VQYXR0ZXJuLCAnLSQxJykudG9Mb3dlckNhc2UoKTtcbn1cblxudmFyIGh5cGhlbmF0ZV8xID0gaHlwaGVuYXRlJDI7XG5cbnZhciBoeXBoZW5hdGUgPSBoeXBoZW5hdGVfMTtcblxudmFyIG1zUGF0dGVybiA9IC9ebXMtLztcblxuLyoqXG4gKiBIeXBoZW5hdGVzIGEgY2FtZWxjYXNlZCBDU1MgcHJvcGVydHkgbmFtZSwgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnYmFja2dyb3VuZENvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmQtY29sb3JcIlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnTW96VHJhbnNpdGlvbicpXG4gKiAgIDwgXCItbW96LXRyYW5zaXRpb25cIlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnbXNUcmFuc2l0aW9uJylcbiAqICAgPCBcIi1tcy10cmFuc2l0aW9uXCJcbiAqXG4gKiBBcyBNb2Rlcm5penIgc3VnZ2VzdHMgKGh0dHA6Ly9tb2Rlcm5penIuY29tL2RvY3MvI3ByZWZpeGVkKSwgYW4gYG1zYCBwcmVmaXhcbiAqIGlzIGNvbnZlcnRlZCB0byBgLW1zLWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBoeXBoZW5hdGVTdHlsZU5hbWUoc3RyaW5nKSB7XG4gIHJldHVybiBoeXBoZW5hdGUoc3RyaW5nKS5yZXBsYWNlKG1zUGF0dGVybiwgJy1tcy0nKTtcbn1cblxudmFyIGh5cGhlbmF0ZVN0eWxlTmFtZV8xID0gaHlwaGVuYXRlU3R5bGVOYW1lO1xuXG4vLyAgICAgIFxudmFyIG9ialRvQ3NzID0gZnVuY3Rpb24gb2JqVG9Dc3Mob2JqLCBwcmV2S2V5KSB7XG4gIHZhciBjc3MgPSBPYmplY3Qua2V5cyhvYmopLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGNodW5rID0gb2JqW2tleV07XG4gICAgcmV0dXJuIGNodW5rICE9PSB1bmRlZmluZWQgJiYgY2h1bmsgIT09IG51bGwgJiYgY2h1bmsgIT09IGZhbHNlICYmIGNodW5rICE9PSAnJztcbiAgfSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChvYmpba2V5XSkpIHJldHVybiBvYmpUb0NzcyhvYmpba2V5XSwga2V5KTtcbiAgICByZXR1cm4gaHlwaGVuYXRlU3R5bGVOYW1lXzEoa2V5KSArICc6ICcgKyBvYmpba2V5XSArICc7JztcbiAgfSkuam9pbignICcpO1xuICByZXR1cm4gcHJldktleSA/IHByZXZLZXkgKyAnIHtcXG4gICcgKyBjc3MgKyAnXFxufScgOiBjc3M7XG59O1xuXG52YXIgZmxhdHRlbiA9IGZ1bmN0aW9uIGZsYXR0ZW4oY2h1bmtzLCBleGVjdXRpb25Db250ZXh0KSB7XG4gIHJldHVybiBjaHVua3MucmVkdWNlKGZ1bmN0aW9uIChydWxlU2V0LCBjaHVuaykge1xuICAgIC8qIFJlbW92ZSBmYWxzZXkgdmFsdWVzICovXG4gICAgaWYgKGNodW5rID09PSB1bmRlZmluZWQgfHwgY2h1bmsgPT09IG51bGwgfHwgY2h1bmsgPT09IGZhbHNlIHx8IGNodW5rID09PSAnJykge1xuICAgICAgcmV0dXJuIHJ1bGVTZXQ7XG4gICAgfVxuICAgIC8qIEZsYXR0ZW4gcnVsZVNldCAqL1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNodW5rKSkge1xuICAgICAgcmV0dXJuIFtdLmNvbmNhdChydWxlU2V0LCBmbGF0dGVuKGNodW5rLCBleGVjdXRpb25Db250ZXh0KSk7XG4gICAgfVxuXG4gICAgLyogSGFuZGxlIG90aGVyIGNvbXBvbmVudHMgKi9cbiAgICBpZiAoY2h1bmsuaGFzT3duUHJvcGVydHkoJ3N0eWxlZENvbXBvbmVudElkJykpIHtcbiAgICAgIC8vICRGbG93Rml4TWUgbm90IHN1cmUgaG93IHRvIG1ha2UgdGhpcyBwYXNzXG4gICAgICByZXR1cm4gW10uY29uY2F0KHJ1bGVTZXQsIFsnLicgKyBjaHVuay5zdHlsZWRDb21wb25lbnRJZF0pO1xuICAgIH1cblxuICAgIC8qIEVpdGhlciBleGVjdXRlIG9yIGRlZmVyIHRoZSBmdW5jdGlvbiAqL1xuICAgIGlmICh0eXBlb2YgY2h1bmsgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBleGVjdXRpb25Db250ZXh0ID8gcnVsZVNldC5jb25jYXQuYXBwbHkocnVsZVNldCwgZmxhdHRlbihbY2h1bmsoZXhlY3V0aW9uQ29udGV4dCldLCBleGVjdXRpb25Db250ZXh0KSkgOiBydWxlU2V0LmNvbmNhdChjaHVuayk7XG4gICAgfVxuXG4gICAgLyogSGFuZGxlIG9iamVjdHMgKi9cbiAgICByZXR1cm4gcnVsZVNldC5jb25jYXQoXG4gICAgLy8gJEZsb3dGaXhNZSBoYXZlIHRvIGFkZCAlY2hlY2tzIHNvbWVob3cgdG8gaXNQbGFpbk9iamVjdFxuICAgIGlzUGxhaW5PYmplY3QoY2h1bmspID8gb2JqVG9Dc3MoY2h1bmspIDogY2h1bmsudG9TdHJpbmcoKSk7XG4gIH0sIFtdKTtcbn07XG5cbi8vICAgICAgXG52YXIgc3R5bGlzID0gbmV3IFN0eWxpcyh7XG4gIGdsb2JhbDogZmFsc2UsXG4gIGNhc2NhZGU6IHRydWUsXG4gIGtleWZyYW1lOiBmYWxzZSxcbiAgcHJlZml4OiB0cnVlLFxuICBjb21wcmVzczogZmFsc2UsXG4gIHNlbWljb2xvbjogdHJ1ZVxufSk7XG5cbnZhciBzdHJpbmdpZnlSdWxlcyA9IGZ1bmN0aW9uIHN0cmluZ2lmeVJ1bGVzKHJ1bGVzLCBzZWxlY3RvciwgcHJlZml4KSB7XG4gIHZhciBmbGF0Q1NTID0gcnVsZXMuam9pbignJykucmVwbGFjZSgvXlxccypcXC9cXC8uKiQvZ20sICcnKTsgLy8gcmVwbGFjZSBKUyBjb21tZW50c1xuXG4gIHZhciBjc3NTdHIgPSBzZWxlY3RvciAmJiBwcmVmaXggPyBwcmVmaXggKyAnICcgKyBzZWxlY3RvciArICcgeyAnICsgZmxhdENTUyArICcgfScgOiBmbGF0Q1NTO1xuXG4gIHJldHVybiBzdHlsaXMocHJlZml4IHx8ICFzZWxlY3RvciA/ICcnIDogc2VsZWN0b3IsIGNzc1N0cik7XG59O1xuXG4vLyAgICAgIFxudmFyIGNoYXJzID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonLnNwbGl0KCcnKTtcbnZhciBjaGFyc0xlbmd0aCA9IGNoYXJzLmxlbmd0aDtcblxuLyogU29tZSBoaWdoIG51bWJlciwgdXN1YWxseSA5LWRpZ2l0IGJhc2UtMTAuIE1hcCBpdCB0byBiYXNlLfCfmI4gKi9cbnZhciBnZW5lcmF0ZUFscGhhYmV0aWNOYW1lID0gZnVuY3Rpb24gZ2VuZXJhdGVBbHBoYWJldGljTmFtZShjb2RlKSB7XG4gIHZhciBuYW1lID0gJyc7XG4gIHZhciB4ID0gdm9pZCAwO1xuXG4gIGZvciAoeCA9IGNvZGU7IHggPiBjaGFyc0xlbmd0aDsgeCA9IE1hdGguZmxvb3IoeCAvIGNoYXJzTGVuZ3RoKSkge1xuICAgIG5hbWUgPSBjaGFyc1t4ICUgY2hhcnNMZW5ndGhdICsgbmFtZTtcbiAgfVxuXG4gIHJldHVybiBjaGFyc1t4ICUgY2hhcnNMZW5ndGhdICsgbmFtZTtcbn07XG5cbi8vICAgICAgXG5cblxudmFyIGludGVybGVhdmUgPSAoZnVuY3Rpb24gKHN0cmluZ3MsIGludGVycG9sYXRpb25zKSB7XG4gIHJldHVybiBpbnRlcnBvbGF0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKGFycmF5LCBpbnRlcnAsIGkpIHtcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KGludGVycCwgc3RyaW5nc1tpICsgMV0pO1xuICB9LCBbc3RyaW5nc1swXV0pO1xufSk7XG5cbi8vICAgICAgXG52YXIgY3NzID0gKGZ1bmN0aW9uIChzdHJpbmdzKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBpbnRlcnBvbGF0aW9ucyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBpbnRlcnBvbGF0aW9uc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZmxhdHRlbihpbnRlcmxlYXZlKHN0cmluZ3MsIGludGVycG9sYXRpb25zKSk7XG59KTtcblxuLy8gICAgICBcbnZhciBTQ19DT01QT05FTlRfSUQgPSAvXlteXFxTXFxuXSo/XFwvXFwqIHNjLWNvbXBvbmVudC1pZDpcXHMrKFxcUyspXFxzK1xcKlxcLy9nbTtcblxudmFyIGV4dHJhY3RDb21wc0Zyb21DU1MgPSAoZnVuY3Rpb24gKG1heWJlQ1NTKSB7XG4gIHZhciBjc3MgPSAnJyArIChtYXliZUNTUyB8fCAnJyk7IC8vIERlZmluaXRlbHkgYSBzdHJpbmcsIGFuZCBhIGNsb25lXG4gIHZhciBleGlzdGluZ0NvbXBvbmVudHMgPSBbXTtcbiAgY3NzLnJlcGxhY2UoU0NfQ09NUE9ORU5UX0lELCBmdW5jdGlvbiAobWF0Y2gsIGNvbXBvbmVudElkLCBtYXRjaEluZGV4KSB7XG4gICAgZXhpc3RpbmdDb21wb25lbnRzLnB1c2goeyBjb21wb25lbnRJZDogY29tcG9uZW50SWQsIG1hdGNoSW5kZXg6IG1hdGNoSW5kZXggfSk7XG4gICAgcmV0dXJuIG1hdGNoO1xuICB9KTtcbiAgcmV0dXJuIGV4aXN0aW5nQ29tcG9uZW50cy5tYXAoZnVuY3Rpb24gKF9yZWYsIGkpIHtcbiAgICB2YXIgY29tcG9uZW50SWQgPSBfcmVmLmNvbXBvbmVudElkLFxuICAgICAgICBtYXRjaEluZGV4ID0gX3JlZi5tYXRjaEluZGV4O1xuXG4gICAgdmFyIG5leHRDb21wID0gZXhpc3RpbmdDb21wb25lbnRzW2kgKyAxXTtcbiAgICB2YXIgY3NzRnJvbURPTSA9IG5leHRDb21wID8gY3NzLnNsaWNlKG1hdGNoSW5kZXgsIG5leHRDb21wLm1hdGNoSW5kZXgpIDogY3NzLnNsaWNlKG1hdGNoSW5kZXgpO1xuICAgIHJldHVybiB7IGNvbXBvbmVudElkOiBjb21wb25lbnRJZCwgY3NzRnJvbURPTTogY3NzRnJvbURPTSB9O1xuICB9KTtcbn0pO1xuXG4vLyAgICAgIFxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlLCBuby11bmRlZiAqL1xuXG52YXIgZ2V0Tm9uY2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xufSk7XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxuXG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG5cblxuXG5cblxuXG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbi8vICAgICAgXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuLypcbiAqIEJyb3dzZXIgU3R5bGUgU2hlZXQgd2l0aCBSZWh5ZHJhdGlvblxuICpcbiAqIDxzdHlsZSBkYXRhLXN0eWxlZC1jb21wb25lbnRzPVwieCB5IHpcIlxuICogICAgICAgIGRhdGEtc3R5bGVkLWNvbXBvbmVudHMtaXMtbG9jYWw9XCJ0cnVlXCI+XG4gKiAgIC/CtyBzYy1jb21wb25lbnQtaWQ6IGEgwrcvXG4gKiAgIC5zYy1hIHsgLi4uIH1cbiAqICAgLnggeyAuLi4gfVxuICogICAvwrcgc2MtY29tcG9uZW50LWlkOiBiIMK3L1xuICogICAuc2MtYiB7IC4uLiB9XG4gKiAgIC55IHsgLi4uIH1cbiAqICAgLnogeyAuLi4gfVxuICogPC9zdHlsZT5cbiAqXG4gKiBOb3RlOiByZXBsYWNlIMK3IHdpdGggKiBpbiB0aGUgYWJvdmUgc25pcHBldC5cbiAqICovXG52YXIgQ09NUE9ORU5UU19QRVJfVEFHID0gNDA7XG5cbnZhciBCcm93c2VyVGFnID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCcm93c2VyVGFnKGVsLCBpc0xvY2FsKSB7XG4gICAgdmFyIGV4aXN0aW5nU291cmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAnJztcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBCcm93c2VyVGFnKTtcblxuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmlzTG9jYWwgPSBpc0xvY2FsO1xuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcblxuICAgIHZhciBleHRyYWN0ZWRDb21wcyA9IGV4dHJhY3RDb21wc0Zyb21DU1MoZXhpc3RpbmdTb3VyY2UpO1xuXG4gICAgdGhpcy5zaXplID0gZXh0cmFjdGVkQ29tcHMubGVuZ3RoO1xuICAgIHRoaXMuY29tcG9uZW50cyA9IGV4dHJhY3RlZENvbXBzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBvYmopIHtcbiAgICAgIGFjY1tvYmouY29tcG9uZW50SWRdID0gb2JqOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIEJyb3dzZXJUYWcucHJvdG90eXBlLmlzRnVsbCA9IGZ1bmN0aW9uIGlzRnVsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID49IENPTVBPTkVOVFNfUEVSX1RBRztcbiAgfTtcblxuICBCcm93c2VyVGFnLnByb3RvdHlwZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbiBhZGRDb21wb25lbnQoY29tcG9uZW50SWQpIHtcbiAgICBpZiAoIXRoaXMucmVhZHkpIHRoaXMucmVwbGFjZUVsZW1lbnQoKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLmNvbXBvbmVudHNbY29tcG9uZW50SWRdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byBhZGQgQ29tcG9uZW50IFxcJycgKyBjb21wb25lbnRJZCArICdcXCcgdHdpY2UhJyk7XG4gICAgfVxuXG4gICAgdmFyIGNvbXAgPSB7IGNvbXBvbmVudElkOiBjb21wb25lbnRJZCwgdGV4dE5vZGU6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSB9O1xuICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoY29tcC50ZXh0Tm9kZSk7XG5cbiAgICB0aGlzLnNpemUgKz0gMTtcbiAgICB0aGlzLmNvbXBvbmVudHNbY29tcG9uZW50SWRdID0gY29tcDtcbiAgfTtcblxuICBCcm93c2VyVGFnLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiBpbmplY3QoY29tcG9uZW50SWQsIGNzcywgbmFtZSkge1xuICAgIGlmICghdGhpcy5yZWFkeSkgdGhpcy5yZXBsYWNlRWxlbWVudCgpO1xuICAgIHZhciBjb21wID0gdGhpcy5jb21wb25lbnRzW2NvbXBvbmVudElkXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFjb21wKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgYWRkIGEgbmV3IGNvbXBvbmVudCBiZWZvcmUgeW91IGNhbiBpbmplY3QgY3NzIGludG8gaXQnKTtcbiAgICB9XG4gICAgaWYgKGNvbXAudGV4dE5vZGUuZGF0YSA9PT0gJycpIHtcbiAgICAgIGNvbXAudGV4dE5vZGUuYXBwZW5kRGF0YSgnXFxuLyogc2MtY29tcG9uZW50LWlkOiAnICsgY29tcG9uZW50SWQgKyAnICovXFxuJyk7XG4gICAgfVxuXG4gICAgY29tcC50ZXh0Tm9kZS5hcHBlbmREYXRhKGNzcyk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHZhciBleGlzdGluZ05hbWVzID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoU0NfQVRUUik7XG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZShTQ19BVFRSLCBleGlzdGluZ05hbWVzID8gZXhpc3RpbmdOYW1lcyArICcgJyArIG5hbWUgOiBuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCBub25jZSk7XG4gICAgfVxuICB9O1xuXG4gIEJyb3dzZXJUYWcucHJvdG90eXBlLnRvSFRNTCA9IGZ1bmN0aW9uIHRvSFRNTCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC5vdXRlckhUTUw7XG4gIH07XG5cbiAgQnJvd3NlclRhZy5wcm90b3R5cGUudG9SZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiB0b1JlYWN0RWxlbWVudCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCcm93c2VyVGFnIGRvZXNuJ3QgaW1wbGVtZW50IHRvUmVhY3RFbGVtZW50IVwiKTtcbiAgfTtcblxuICBCcm93c2VyVGFnLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQnJvd3NlclRhZyBjYW5ub3QgYmUgY2xvbmVkIScpO1xuICB9O1xuXG4gIC8qIEJlY2F1c2Ugd2UgY2FyZSBhYm91dCBzb3VyY2Ugb3JkZXIsIGJlZm9yZSB3ZSBjYW4gaW5qZWN0IGFueXRoaW5nIHdlIG5lZWQgdG9cbiAgICogY3JlYXRlIGEgdGV4dCBub2RlIGZvciBlYWNoIGNvbXBvbmVudCBhbmQgcmVwbGFjZSB0aGUgZXhpc3RpbmcgQ1NTLiAqL1xuXG5cbiAgQnJvd3NlclRhZy5wcm90b3R5cGUucmVwbGFjZUVsZW1lbnQgPSBmdW5jdGlvbiByZXBsYWNlRWxlbWVudCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgLy8gV2UgaGF2ZSBub3RoaW5nIHRvIGluamVjdC4gVXNlIHRoZSBjdXJyZW50IGVsLlxuICAgIGlmICh0aGlzLnNpemUgPT09IDApIHJldHVybjtcblxuICAgIC8vIEJ1aWxkIHVwIG91ciByZXBsYWNlbWVudCBzdHlsZSB0YWdcbiAgICB2YXIgbmV3RWwgPSB0aGlzLmVsLmNsb25lTm9kZSgpO1xuICAgIG5ld0VsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdcXG4nKSk7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIGNvbXAgPSBfdGhpcy5jb21wb25lbnRzW2tleV07XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgY29tcC50ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbXAuY3NzRnJvbURPTSk7XG4gICAgICBuZXdFbC5hcHBlbmRDaGlsZChjb21wLnRleHROb2RlKTtcbiAgICB9KTtcblxuICAgIGlmICghdGhpcy5lbC5wYXJlbnROb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUcnlpbmcgdG8gcmVwbGFjZSBhbiBlbGVtZW50IHRoYXQgd2Fzbid0IG1vdW50ZWQhXCIpO1xuICAgIH1cblxuICAgIC8vIFRoZSBvbCcgc3dpdGNoZXJvb1xuICAgIHRoaXMuZWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3RWwsIHRoaXMuZWwpO1xuICAgIHRoaXMuZWwgPSBuZXdFbDtcbiAgfTtcblxuICByZXR1cm4gQnJvd3NlclRhZztcbn0oKTtcblxuLyogRmFjdG9yeSBmdW5jdGlvbiB0byBzZXBhcmF0ZSBET00gb3BlcmF0aW9ucyBmcm9tIGxvZ2ljYWwgb25lcyovXG5cblxudmFyIEJyb3dzZXJTdHlsZVNoZWV0ID0ge1xuICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICB2YXIgdGFncyA9IFtdO1xuICAgIHZhciBuYW1lcyA9IHt9O1xuXG4gICAgLyogQ29uc3RydWN0IGV4aXN0aW5nIHN0YXRlIGZyb20gRE9NICovXG4gICAgdmFyIG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnWycgKyBTQ19BVFRSICsgJ10nKTtcbiAgICB2YXIgbm9kZXNMZW5ndGggPSBub2Rlcy5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlbCA9IG5vZGVzW2ldO1xuXG4gICAgICB0YWdzLnB1c2gobmV3IEJyb3dzZXJUYWcoZWwsIGVsLmdldEF0dHJpYnV0ZShMT0NBTF9BVFRSKSA9PT0gJ3RydWUnLCBlbC5pbm5lckhUTUwpKTtcblxuICAgICAgdmFyIGF0dHIgPSBlbC5nZXRBdHRyaWJ1dGUoU0NfQVRUUik7XG4gICAgICBpZiAoYXR0cikge1xuICAgICAgICBhdHRyLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICBuYW1lc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIEZhY3RvcnkgZm9yIG1ha2luZyBtb3JlIHRhZ3MgKi9cbiAgICB2YXIgdGFnQ29uc3RydWN0b3IgPSBmdW5jdGlvbiB0YWdDb25zdHJ1Y3Rvcihpc0xvY2FsKSB7XG4gICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgZWwudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoU0NfQVRUUiwgJycpO1xuICAgICAgZWwuc2V0QXR0cmlidXRlKExPQ0FMX0FUVFIsIGlzTG9jYWwgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgIGlmICghZG9jdW1lbnQuaGVhZCkgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRvY3VtZW50IDxoZWFkPicpO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICByZXR1cm4gbmV3IEJyb3dzZXJUYWcoZWwsIGlzTG9jYWwpO1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFN0eWxlU2hlZXQodGFnQ29uc3RydWN0b3IsIHRhZ3MsIG5hbWVzKTtcbiAgfVxufTtcblxuLy8gICAgICBcbnZhciBTQ19BVFRSID0gJ2RhdGEtc3R5bGVkLWNvbXBvbmVudHMnO1xudmFyIExPQ0FMX0FUVFIgPSAnZGF0YS1zdHlsZWQtY29tcG9uZW50cy1pcy1sb2NhbCc7XG52YXIgQ09OVEVYVF9LRVkgPSAnX19zdHlsZWQtY29tcG9uZW50cy1zdHlsZXNoZWV0X18nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBmbG93dHlwZS9vYmplY3QtdHlwZS1kZWxpbWl0ZXIgKi9cblxuLyogZXNsaW50LWVuYWJsZSBmbG93dHlwZS9vYmplY3QtdHlwZS1kZWxpbWl0ZXIgKi9cblxudmFyIGluc3RhbmNlID0gbnVsbDtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxudmFyIGNsb25lcyA9IFtdO1xuXG52YXIgU3R5bGVTaGVldCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3R5bGVTaGVldCh0YWdDb25zdHJ1Y3Rvcikge1xuICAgIHZhciB0YWdzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBbXTtcbiAgICB2YXIgbmFtZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFN0eWxlU2hlZXQpO1xuICAgIHRoaXMuaGFzaGVzID0ge307XG4gICAgdGhpcy5kZWZlcnJlZEluamVjdGlvbnMgPSB7fTtcbiAgICB0aGlzLnN0eWxlc0NhY2hlYWJsZSA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICB0aGlzLnRhZ0NvbnN0cnVjdG9yID0gdGFnQ29uc3RydWN0b3I7XG4gICAgdGhpcy50YWdzID0gdGFncztcbiAgICB0aGlzLm5hbWVzID0gbmFtZXM7XG4gICAgdGhpcy5jb25zdHJ1Y3RDb21wb25lbnRUYWdNYXAoKTtcbiAgfVxuXG4gIC8vIGhlbHBlciBmb3IgYENvbXBvbmVudFN0eWxlYCB0byBrbm93IHdoZW4gaXQgY2FjaGUgc3RhdGljIHN0eWxlcy5cbiAgLy8gc3RhdGljbHkgc3R5bGVkLWNvbXBvbmVudCBjYW4gbm90IHNhZmVseSBjYWNoZSBzdHlsZXMgb24gdGhlIHNlcnZlclxuICAvLyB3aXRob3V0IGFsbCBgQ29tcG9uZW50U3R5bGVgIGluc3RhbmNlcyBzYXZpbmcgYSByZWZlcmVuY2UgdG8gdGhlXG4gIC8vIHRoZSBzdHlsZVNoZWV0IGluc3RhbmNlIHRoZXkgbGFzdCByZW5kZXJlZCB3aXRoLFxuICAvLyBvciBsaXN0ZW5pbmcgdG8gY3JlYXRpb24gLyByZXNldCBldmVudHMuIG90aGVyd2lzZSB5b3UgbWlnaHQgY3JlYXRlXG4gIC8vIGEgY29tcG9uZW50IHdpdGggb25lIHN0eWxlc2hlZXQgYW5kIHJlbmRlciBpdCBhbm90aGVyIGFwaSByZXNwb25zZVxuICAvLyB3aXRoIGFub3RoZXIsIGxvc2luZyBzdHlsZXMgb24gZnJvbSB5b3VyIHNlcnZlci1zaWRlIHJlbmRlci5cblxuXG4gIFN0eWxlU2hlZXQucHJvdG90eXBlLmNvbnN0cnVjdENvbXBvbmVudFRhZ01hcCA9IGZ1bmN0aW9uIGNvbnN0cnVjdENvbXBvbmVudFRhZ01hcCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5jb21wb25lbnRUYWdzID0ge307XG5cbiAgICB0aGlzLnRhZ3MuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG4gICAgICBPYmplY3Qua2V5cyh0YWcuY29tcG9uZW50cykuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50SWQpIHtcbiAgICAgICAgX3RoaXMuY29tcG9uZW50VGFnc1tjb21wb25lbnRJZF0gPSB0YWc7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvKiBCZXN0IGxldmVsIG9mIGNhY2hpbmfigJRnZXQgdGhlIG5hbWUgZnJvbSB0aGUgaGFzaCBzdHJhaWdodCBhd2F5LiAqL1xuXG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uIGdldE5hbWUoaGFzaCkge1xuICAgIHJldHVybiB0aGlzLmhhc2hlc1toYXNoLnRvU3RyaW5nKCldO1xuICB9O1xuXG4gIC8qIFNlY29uZCBsZXZlbCBvZiBjYWNoaW5n4oCUaWYgdGhlIG5hbWUgaXMgYWxyZWFkeSBpbiB0aGUgZG9tLCBkb24ndFxuICAgKiBpbmplY3QgYW55dGhpbmcgYW5kIHJlY29yZCB0aGUgaGFzaCBmb3IgZ2V0TmFtZSBuZXh0IHRpbWUuICovXG5cblxuICBTdHlsZVNoZWV0LnByb3RvdHlwZS5hbHJlYWR5SW5qZWN0ZWQgPSBmdW5jdGlvbiBhbHJlYWR5SW5qZWN0ZWQoaGFzaCwgbmFtZSkge1xuICAgIGlmICghdGhpcy5uYW1lc1tuYW1lXSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5oYXNoZXNbaGFzaC50b1N0cmluZygpXSA9IG5hbWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyogVGhpcmQgdHlwZSBvZiBjYWNoaW5n4oCUZG9uJ3QgaW5qZWN0IGNvbXBvbmVudHMnIGNvbXBvbmVudElkIHR3aWNlLiAqL1xuXG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUuaGFzSW5qZWN0ZWRDb21wb25lbnQgPSBmdW5jdGlvbiBoYXNJbmplY3RlZENvbXBvbmVudChjb21wb25lbnRJZCkge1xuICAgIHJldHVybiAhIXRoaXMuY29tcG9uZW50VGFnc1tjb21wb25lbnRJZF07XG4gIH07XG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUuZGVmZXJyZWRJbmplY3QgPSBmdW5jdGlvbiBkZWZlcnJlZEluamVjdChjb21wb25lbnRJZCwgaXNMb2NhbCwgY3NzKSB7XG4gICAgaWYgKHRoaXMgPT09IGluc3RhbmNlKSB7XG4gICAgICBjbG9uZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xvbmUpIHtcbiAgICAgICAgY2xvbmUuZGVmZXJyZWRJbmplY3QoY29tcG9uZW50SWQsIGlzTG9jYWwsIGNzcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmdldE9yQ3JlYXRlVGFnKGNvbXBvbmVudElkLCBpc0xvY2FsKTtcbiAgICB0aGlzLmRlZmVycmVkSW5qZWN0aW9uc1tjb21wb25lbnRJZF0gPSBjc3M7XG4gIH07XG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gaW5qZWN0KGNvbXBvbmVudElkLCBpc0xvY2FsLCBjc3MsIGhhc2gsIG5hbWUpIHtcbiAgICBpZiAodGhpcyA9PT0gaW5zdGFuY2UpIHtcbiAgICAgIGNsb25lcy5mb3JFYWNoKGZ1bmN0aW9uIChjbG9uZSkge1xuICAgICAgICBjbG9uZS5pbmplY3QoY29tcG9uZW50SWQsIGlzTG9jYWwsIGNzcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgdGFnID0gdGhpcy5nZXRPckNyZWF0ZVRhZyhjb21wb25lbnRJZCwgaXNMb2NhbCk7XG5cbiAgICB2YXIgZGVmZXJyZWRJbmplY3Rpb24gPSB0aGlzLmRlZmVycmVkSW5qZWN0aW9uc1tjb21wb25lbnRJZF07XG4gICAgaWYgKGRlZmVycmVkSW5qZWN0aW9uKSB7XG4gICAgICB0YWcuaW5qZWN0KGNvbXBvbmVudElkLCBkZWZlcnJlZEluamVjdGlvbik7XG4gICAgICBkZWxldGUgdGhpcy5kZWZlcnJlZEluamVjdGlvbnNbY29tcG9uZW50SWRdO1xuICAgIH1cblxuICAgIHRhZy5pbmplY3QoY29tcG9uZW50SWQsIGNzcywgbmFtZSk7XG5cbiAgICBpZiAoaGFzaCAmJiBuYW1lKSB7XG4gICAgICB0aGlzLmhhc2hlc1toYXNoLnRvU3RyaW5nKCldID0gbmFtZTtcbiAgICB9XG4gIH07XG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24gdG9IVE1MKCkge1xuICAgIHJldHVybiB0aGlzLnRhZ3MubWFwKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIHJldHVybiB0YWcudG9IVE1MKCk7XG4gICAgfSkuam9pbignJyk7XG4gIH07XG5cbiAgU3R5bGVTaGVldC5wcm90b3R5cGUudG9SZWFjdEVsZW1lbnRzID0gZnVuY3Rpb24gdG9SZWFjdEVsZW1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLnRhZ3MubWFwKGZ1bmN0aW9uICh0YWcsIGkpIHtcbiAgICAgIHJldHVybiB0YWcudG9SZWFjdEVsZW1lbnQoJ3NjLScgKyBpKTtcbiAgICB9KTtcbiAgfTtcblxuICBTdHlsZVNoZWV0LnByb3RvdHlwZS5nZXRPckNyZWF0ZVRhZyA9IGZ1bmN0aW9uIGdldE9yQ3JlYXRlVGFnKGNvbXBvbmVudElkLCBpc0xvY2FsKSB7XG4gICAgdmFyIGV4aXN0aW5nVGFnID0gdGhpcy5jb21wb25lbnRUYWdzW2NvbXBvbmVudElkXTtcbiAgICBpZiAoZXhpc3RpbmdUYWcpIHtcbiAgICAgIHJldHVybiBleGlzdGluZ1RhZztcbiAgICB9XG5cbiAgICB2YXIgbGFzdFRhZyA9IHRoaXMudGFnc1t0aGlzLnRhZ3MubGVuZ3RoIC0gMV07XG4gICAgdmFyIGNvbXBvbmVudFRhZyA9ICFsYXN0VGFnIHx8IGxhc3RUYWcuaXNGdWxsKCkgfHwgbGFzdFRhZy5pc0xvY2FsICE9PSBpc0xvY2FsID8gdGhpcy5jcmVhdGVOZXdUYWcoaXNMb2NhbCkgOiBsYXN0VGFnO1xuICAgIHRoaXMuY29tcG9uZW50VGFnc1tjb21wb25lbnRJZF0gPSBjb21wb25lbnRUYWc7XG4gICAgY29tcG9uZW50VGFnLmFkZENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gICAgcmV0dXJuIGNvbXBvbmVudFRhZztcbiAgfTtcblxuICBTdHlsZVNoZWV0LnByb3RvdHlwZS5jcmVhdGVOZXdUYWcgPSBmdW5jdGlvbiBjcmVhdGVOZXdUYWcoaXNMb2NhbCkge1xuICAgIHZhciBuZXdUYWcgPSB0aGlzLnRhZ0NvbnN0cnVjdG9yKGlzTG9jYWwpO1xuICAgIHRoaXMudGFncy5wdXNoKG5ld1RhZyk7XG4gICAgcmV0dXJuIG5ld1RhZztcbiAgfTtcblxuICBTdHlsZVNoZWV0LnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoaXNTZXJ2ZXIpIHtcbiAgICBpbnN0YW5jZSA9IFN0eWxlU2hlZXQuY3JlYXRlKGlzU2VydmVyKTtcbiAgfTtcblxuICAvKiBXZSBjYW4gbWFrZSBpc1NlcnZlciB0b3RhbGx5IGltcGxpY2l0IG9uY2UgSmVzdCAyMCBkcm9wcyBhbmQgd2VcbiAgICogY2FuIGNoYW5nZSBlbnZpcm9ubWVudCBvbiBhIHBlci10ZXN0IGJhc2lzLiAqL1xuXG5cbiAgU3R5bGVTaGVldC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIGlzU2VydmVyID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnO1xuXG4gICAgcmV0dXJuIChpc1NlcnZlciA/IFNlcnZlclN0eWxlU2hlZXQgOiBCcm93c2VyU3R5bGVTaGVldCkuY3JlYXRlKCk7XG4gIH07XG5cbiAgU3R5bGVTaGVldC5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKG9sZFNoZWV0KSB7XG4gICAgdmFyIG5ld1NoZWV0ID0gbmV3IFN0eWxlU2hlZXQob2xkU2hlZXQudGFnQ29uc3RydWN0b3IsIG9sZFNoZWV0LnRhZ3MubWFwKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgIHJldHVybiB0YWcuY2xvbmUoKTtcbiAgICB9KSwgX2V4dGVuZHMoe30sIG9sZFNoZWV0Lm5hbWVzKSk7XG5cbiAgICBuZXdTaGVldC5oYXNoZXMgPSBfZXh0ZW5kcyh7fSwgb2xkU2hlZXQuaGFzaGVzKTtcbiAgICBuZXdTaGVldC5kZWZlcnJlZEluamVjdGlvbnMgPSBfZXh0ZW5kcyh7fSwgb2xkU2hlZXQuZGVmZXJyZWRJbmplY3Rpb25zKTtcbiAgICBjbG9uZXMucHVzaChuZXdTaGVldCk7XG5cbiAgICByZXR1cm4gbmV3U2hlZXQ7XG4gIH07XG5cbiAgY3JlYXRlQ2xhc3MoU3R5bGVTaGVldCwgbnVsbCwgW3tcbiAgICBrZXk6ICdpbnN0YW5jZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICByZXR1cm4gaW5zdGFuY2UgfHwgKGluc3RhbmNlID0gU3R5bGVTaGVldC5jcmVhdGUoKSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTdHlsZVNoZWV0O1xufSgpO1xuXG52YXIgX1N0eWxlU2hlZXRNYW5hZ2VyJGNoO1xuXG4vLyAgICAgIFxudmFyIFN0eWxlU2hlZXRNYW5hZ2VyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgaW5oZXJpdHMoU3R5bGVTaGVldE1hbmFnZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFN0eWxlU2hlZXRNYW5hZ2VyKCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFN0eWxlU2hlZXRNYW5hZ2VyKTtcbiAgICByZXR1cm4gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgU3R5bGVTaGVldE1hbmFnZXIucHJvdG90eXBlLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbQ09OVEVYVF9LRVldID0gdGhpcy5wcm9wcy5zaGVldCwgX3JlZjtcbiAgfTtcblxuICBTdHlsZVNoZWV0TWFuYWdlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbiAgICAvLyBGbG93IHYwLjQzLjEgd2lsbCByZXBvcnQgYW4gZXJyb3IgYWNjZXNzaW5nIHRoZSBgY2hpbGRyZW5gIHByb3BlcnR5LFxuICAgIC8vIGJ1dCB2MC40Ny4wIHdpbGwgbm90LiBJdCBpcyBuZWNlc3NhcnkgdG8gdXNlIGEgdHlwZSBjYXN0IGluc3RlYWQgb2ZcbiAgICAvLyBhIFwiZml4bWVcIiBjb21tZW50IHRvIHNhdGlzZnkgYm90aCBGbG93IHZlcnNpb25zLlxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICB9O1xuXG4gIHJldHVybiBTdHlsZVNoZWV0TWFuYWdlcjtcbn0oQ29tcG9uZW50KTtcblxuU3R5bGVTaGVldE1hbmFnZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1N0eWxlU2hlZXRNYW5hZ2VyJGNoID0ge30sIF9TdHlsZVNoZWV0TWFuYWdlciRjaFtDT05URVhUX0tFWV0gPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuaW5zdGFuY2VPZihTdHlsZVNoZWV0KSwgUHJvcFR5cGVzLmluc3RhbmNlT2YoU2VydmVyU3R5bGVTaGVldCldKS5pc1JlcXVpcmVkLCBfU3R5bGVTaGVldE1hbmFnZXIkY2gpO1xuXG5TdHlsZVNoZWV0TWFuYWdlci5wcm9wVHlwZXMgPSB7XG4gIHNoZWV0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuaW5zdGFuY2VPZihTdHlsZVNoZWV0KSwgUHJvcFR5cGVzLmluc3RhbmNlT2YoU2VydmVyU3R5bGVTaGVldCldKS5pc1JlcXVpcmVkXG59O1xuXG4vLyAgICAgIFxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbnZhciBTZXJ2ZXJUYWcgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlcnZlclRhZyhpc0xvY2FsKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU2VydmVyVGFnKTtcblxuICAgIHRoaXMuaXNMb2NhbCA9IGlzTG9jYWw7XG4gICAgdGhpcy5jb21wb25lbnRzID0ge307XG4gICAgdGhpcy5zaXplID0gMDtcbiAgICB0aGlzLm5hbWVzID0gW107XG4gIH1cblxuICBTZXJ2ZXJUYWcucHJvdG90eXBlLmlzRnVsbCA9IGZ1bmN0aW9uIGlzRnVsbCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgU2VydmVyVGFnLnByb3RvdHlwZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbiBhZGRDb21wb25lbnQoY29tcG9uZW50SWQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLmNvbXBvbmVudHNbY29tcG9uZW50SWRdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byBhZGQgQ29tcG9uZW50IFxcJycgKyBjb21wb25lbnRJZCArICdcXCcgdHdpY2UhJyk7XG4gICAgfVxuICAgIHRoaXMuY29tcG9uZW50c1tjb21wb25lbnRJZF0gPSB7IGNvbXBvbmVudElkOiBjb21wb25lbnRJZCwgY3NzOiAnJyB9O1xuICAgIHRoaXMuc2l6ZSArPSAxO1xuICB9O1xuXG4gIFNlcnZlclRhZy5wcm90b3R5cGUuY29uY2F0ZW5hdGVDU1MgPSBmdW5jdGlvbiBjb25jYXRlbmF0ZUNTUygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50cykucmVkdWNlKGZ1bmN0aW9uIChzdHlsZXMsIGspIHtcbiAgICAgIHJldHVybiBzdHlsZXMgKyBfdGhpcy5jb21wb25lbnRzW2tdLmNzcztcbiAgICB9LCAnJyk7XG4gIH07XG5cbiAgU2VydmVyVGFnLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiBpbmplY3QoY29tcG9uZW50SWQsIGNzcywgbmFtZSkge1xuICAgIHZhciBjb21wID0gdGhpcy5jb21wb25lbnRzW2NvbXBvbmVudElkXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFjb21wKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgYWRkIGEgbmV3IGNvbXBvbmVudCBiZWZvcmUgeW91IGNhbiBpbmplY3QgY3NzIGludG8gaXQnKTtcbiAgICB9XG4gICAgaWYgKGNvbXAuY3NzID09PSAnJykgY29tcC5jc3MgPSAnLyogc2MtY29tcG9uZW50LWlkOiAnICsgY29tcG9uZW50SWQgKyAnICovXFxuJztcblxuICAgIGNvbXAuY3NzICs9IGNzcy5yZXBsYWNlKC9cXG4qJC8sICdcXG4nKTtcblxuICAgIGlmIChuYW1lKSB0aGlzLm5hbWVzLnB1c2gobmFtZSk7XG4gIH07XG5cbiAgU2VydmVyVGFnLnByb3RvdHlwZS50b0hUTUwgPSBmdW5jdGlvbiB0b0hUTUwoKSB7XG4gICAgdmFyIGF0dHJzID0gWyd0eXBlPVwidGV4dC9jc3NcIicsIFNDX0FUVFIgKyAnPVwiJyArIHRoaXMubmFtZXMuam9pbignICcpICsgJ1wiJywgTE9DQUxfQVRUUiArICc9XCInICsgKHRoaXMuaXNMb2NhbCA/ICd0cnVlJyA6ICdmYWxzZScpICsgJ1wiJ107XG5cbiAgICB2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRycy5wdXNoKCdub25jZT1cIicgKyBub25jZSArICdcIicpO1xuICAgIH1cblxuICAgIHJldHVybiAnPHN0eWxlICcgKyBhdHRycy5qb2luKCcgJykgKyAnPicgKyB0aGlzLmNvbmNhdGVuYXRlQ1NTKCkgKyAnPC9zdHlsZT4nO1xuICB9O1xuXG4gIFNlcnZlclRhZy5wcm90b3R5cGUudG9SZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiB0b1JlYWN0RWxlbWVudChrZXkpIHtcbiAgICB2YXIgX2F0dHJzO1xuXG4gICAgdmFyIGF0dHJzID0gKF9hdHRycyA9IHt9LCBfYXR0cnNbU0NfQVRUUl0gPSB0aGlzLm5hbWVzLmpvaW4oJyAnKSwgX2F0dHJzW0xPQ0FMX0FUVFJdID0gdGhpcy5pc0xvY2FsLnRvU3RyaW5nKCksIF9hdHRycyk7XG5cbiAgICB2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRycy5ub25jZSA9IG5vbmNlO1xuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdzdHlsZScsIF9leHRlbmRzKHtcbiAgICAgIGtleToga2V5LFxuICAgICAgdHlwZTogJ3RleHQvY3NzJ1xuICAgIH0sIGF0dHJzLCB7XG4gICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IHRoaXMuY29uY2F0ZW5hdGVDU1MoKSB9XG4gICAgfSkpO1xuICB9O1xuXG4gIFNlcnZlclRhZy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBjb3B5ID0gbmV3IFNlcnZlclRhZyh0aGlzLmlzTG9jYWwpO1xuICAgIGNvcHkubmFtZXMgPSBbXS5jb25jYXQodGhpcy5uYW1lcyk7XG4gICAgY29weS5zaXplID0gdGhpcy5zaXplO1xuICAgIGNvcHkuY29tcG9uZW50cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgYWNjW2tleV0gPSBfZXh0ZW5kcyh7fSwgX3RoaXMyLmNvbXBvbmVudHNba2V5XSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIGNvcHk7XG4gIH07XG5cbiAgcmV0dXJuIFNlcnZlclRhZztcbn0oKTtcblxudmFyIFNlcnZlclN0eWxlU2hlZXQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlcnZlclN0eWxlU2hlZXQoKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU2VydmVyU3R5bGVTaGVldCk7XG5cbiAgICB0aGlzLmluc3RhbmNlID0gU3R5bGVTaGVldC5jbG9uZShTdHlsZVNoZWV0Lmluc3RhbmNlKTtcbiAgfVxuXG4gIFNlcnZlclN0eWxlU2hlZXQucHJvdG90eXBlLmNvbGxlY3RTdHlsZXMgPSBmdW5jdGlvbiBjb2xsZWN0U3R5bGVzKGNoaWxkcmVuKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjb2xsZWN0IHN0eWxlcyBvbmNlIHlvdSd2ZSBjYWxsZWQgZ2V0U3R5bGVUYWdzIVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBTdHlsZVNoZWV0TWFuYWdlcixcbiAgICAgIHsgc2hlZXQ6IHRoaXMuaW5zdGFuY2UgfSxcbiAgICAgIGNoaWxkcmVuXG4gICAgKTtcbiAgfTtcblxuICBTZXJ2ZXJTdHlsZVNoZWV0LnByb3RvdHlwZS5nZXRTdHlsZVRhZ3MgPSBmdW5jdGlvbiBnZXRTdHlsZVRhZ3MoKSB7XG4gICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgY2xvbmVzLnNwbGljZShjbG9uZXMuaW5kZXhPZih0aGlzLmluc3RhbmNlKSwgMSk7XG4gICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UudG9IVE1MKCk7XG4gIH07XG5cbiAgU2VydmVyU3R5bGVTaGVldC5wcm90b3R5cGUuZ2V0U3R5bGVFbGVtZW50ID0gZnVuY3Rpb24gZ2V0U3R5bGVFbGVtZW50KCkge1xuICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgIGNsb25lcy5zcGxpY2UoY2xvbmVzLmluZGV4T2YodGhpcy5pbnN0YW5jZSksIDEpO1xuICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlLnRvUmVhY3RFbGVtZW50cygpO1xuICB9O1xuXG4gIFNlcnZlclN0eWxlU2hlZXQuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHJldHVybiBuZXcgU3R5bGVTaGVldChmdW5jdGlvbiAoaXNMb2NhbCkge1xuICAgICAgcmV0dXJuIG5ldyBTZXJ2ZXJUYWcoaXNMb2NhbCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFNlcnZlclN0eWxlU2hlZXQ7XG59KCk7XG5cbi8vICAgICAgXG5cbnZhciBMSU1JVCA9IDIwMDtcblxudmFyIGNyZWF0ZVdhcm5Ub29NYW55Q2xhc3NlcyA9IChmdW5jdGlvbiAoZGlzcGxheU5hbWUpIHtcbiAgdmFyIGdlbmVyYXRlZENsYXNzZXMgPSB7fTtcbiAgdmFyIHdhcm5pbmdTZWVuID0gZmFsc2U7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICBpZiAoIXdhcm5pbmdTZWVuKSB7XG4gICAgICBnZW5lcmF0ZWRDbGFzc2VzW2NsYXNzTmFtZV0gPSB0cnVlO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGdlbmVyYXRlZENsYXNzZXMpLmxlbmd0aCA+PSBMSU1JVCkge1xuICAgICAgICAvLyBVbmFibGUgdG8gZmluZCBsYXRlc3RSdWxlIGluIHRlc3QgZW52aXJvbm1lbnQuXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUsIHByZWZlci10ZW1wbGF0ZSAqL1xuICAgICAgICBjb25zb2xlLndhcm4oJ092ZXIgJyArIExJTUlUICsgJyBjbGFzc2VzIHdlcmUgZ2VuZXJhdGVkIGZvciBjb21wb25lbnQgJyArIGRpc3BsYXlOYW1lICsgJy4gXFxuJyArICdDb25zaWRlciB1c2luZyB0aGUgYXR0cnMgbWV0aG9kLCB0b2dldGhlciB3aXRoIGEgc3R5bGUgb2JqZWN0IGZvciBmcmVxdWVudGx5IGNoYW5nZWQgc3R5bGVzLlxcbicgKyAnRXhhbXBsZTpcXG4nICsgJyAgY29uc3QgQ29tcG9uZW50ID0gc3R5bGVkLmRpdi5hdHRycyh7XFxuJyArICcgICAgc3R5bGU6ICh7IGJhY2tncm91bmQgfSkgPT4gKHtcXG4nICsgJyAgICAgIGJhY2tncm91bmQsXFxuJyArICcgICAgfSksXFxuJyArICcgIH0pYHdpZHRoOiAxMDAlO2BcXG5cXG4nICsgJyAgPENvbXBvbmVudCAvPicpO1xuICAgICAgICB3YXJuaW5nU2VlbiA9IHRydWU7XG4gICAgICAgIGdlbmVyYXRlZENsYXNzZXMgPSB7fTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KTtcblxuLy8gICAgICBcbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8qKlxuICogVHJ5aW5nIHRvIGF2b2lkIHRoZSB1bmtub3duLXByb3AgZXJyb3JzIG9uIHN0eWxlZCBjb21wb25lbnRzIGJ5IGZpbHRlcmluZyBieVxuICogUmVhY3QncyBhdHRyaWJ1dGUgd2hpdGVsaXN0LlxuICpcbiAqIFRvIHJlZ2VuZXJhdGUgdGhpcyByZWdleDpcbiAqXG4gKiAxLiBgbnBtIGkgLWcgcmVnZXhnZW5gIChodHRwczovL2dpdGh1Yi5jb20vZGV2b25nb3ZldHQvcmVnZXhnZW4pXG4gKiAyLiBSdW4gYHJlZ2V4Z2VuYCB3aXRoIHRoZSBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCB3b3JkcyBiZWxvdyBhcyBpbnB1dFxuICogMy4gU3Vycm91bmQgdGhlIGVtaXR0ZWQgcmVnZXggd2l0aCB0aGlzOiBgL14oR0VORVJBVEVEX1JFR0VYKSQvYCAtLSB0aGlzIHdpbGwgZW5zdXJlIGEgZnVsbCBzdHJpbmcgbWF0Y2hcbiAqICAgIGFuZCBubyBmYWxzZSBwb3NpdGl2ZXMgZnJvbSBwYXJ0aWFsc1xuICoqL1xuLypcbmNoaWxkcmVuIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIGtleSByZWYgYXV0b0ZvY3VzIGRlZmF1bHRWYWx1ZSB2YWx1ZUxpbmsgZGVmYXVsdENoZWNrZWQgY2hlY2tlZExpbmsgaW5uZXJIVE1MIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZyBvbkZvY3VzSW4gb25Gb2N1c091dCBjbGFzc05hbWUgb25Db3B5IG9uQ3V0IG9uUGFzdGUgb25Db21wb3NpdGlvbkVuZCBvbkNvbXBvc2l0aW9uU3RhcnQgb25Db21wb3NpdGlvblVwZGF0ZSBvbktleURvd24gb25LZXlQcmVzcyBvbktleVVwIG9uRm9jdXMgb25CbHVyIG9uQ2hhbmdlIG9uSW5wdXQgb25TdWJtaXQgb25SZXNldCBvbkNsaWNrIG9uQ29udGV4dE1lbnUgb25Eb3VibGVDbGljayBvbkRyYWcgb25EcmFnRW5kIG9uRHJhZ0VudGVyIG9uRHJhZ0V4aXQgb25EcmFnTGVhdmUgb25EcmFnT3ZlciBvbkRyYWdTdGFydCBvbkRyb3Agb25Nb3VzZURvd24gb25Nb3VzZUVudGVyIG9uTW91c2VMZWF2ZSBvbk1vdXNlTW92ZSBvbk1vdXNlT3V0IG9uTW91c2VPdmVyIG9uTW91c2VVcCBvblNlbGVjdCBvblRvdWNoQ2FuY2VsIG9uVG91Y2hFbmQgb25Ub3VjaE1vdmUgb25Ub3VjaFN0YXJ0IG9uU2Nyb2xsIG9uV2hlZWwgb25BYm9ydCBvbkNhblBsYXkgb25DYW5QbGF5VGhyb3VnaCBvbkR1cmF0aW9uQ2hhbmdlIG9uRW1wdGllZCBvbkVuY3J5cHRlZCBvbkVuZGVkIG9uRXJyb3Igb25Mb2FkZWREYXRhIG9uTG9hZGVkTWV0YWRhdGEgb25Mb2FkU3RhcnQgb25QYXVzZSBvblBsYXkgb25QbGF5aW5nIG9uUHJvZ3Jlc3Mgb25SYXRlQ2hhbmdlIG9uU2Vla2VkIG9uU2Vla2luZyBvblN0YWxsZWQgb25TdXNwZW5kIG9uVGltZVVwZGF0ZSBvblZvbHVtZUNoYW5nZSBvbldhaXRpbmcgb25Mb2FkIG9uQW5pbWF0aW9uU3RhcnQgb25BbmltYXRpb25FbmQgb25BbmltYXRpb25JdGVyYXRpb24gb25UcmFuc2l0aW9uRW5kIG9uQ29weUNhcHR1cmUgb25DdXRDYXB0dXJlIG9uUGFzdGVDYXB0dXJlIG9uQ29tcG9zaXRpb25FbmRDYXB0dXJlIG9uQ29tcG9zaXRpb25TdGFydENhcHR1cmUgb25Db21wb3NpdGlvblVwZGF0ZUNhcHR1cmUgb25LZXlEb3duQ2FwdHVyZSBvbktleVByZXNzQ2FwdHVyZSBvbktleVVwQ2FwdHVyZSBvbkZvY3VzQ2FwdHVyZSBvbkJsdXJDYXB0dXJlIG9uQ2hhbmdlQ2FwdHVyZSBvbklucHV0Q2FwdHVyZSBvblN1Ym1pdENhcHR1cmUgb25SZXNldENhcHR1cmUgb25DbGlja0NhcHR1cmUgb25Db250ZXh0TWVudUNhcHR1cmUgb25Eb3VibGVDbGlja0NhcHR1cmUgb25EcmFnQ2FwdHVyZSBvbkRyYWdFbmRDYXB0dXJlIG9uRHJhZ0VudGVyQ2FwdHVyZSBvbkRyYWdFeGl0Q2FwdHVyZSBvbkRyYWdMZWF2ZUNhcHR1cmUgb25EcmFnT3ZlckNhcHR1cmUgb25EcmFnU3RhcnRDYXB0dXJlIG9uRHJvcENhcHR1cmUgb25Nb3VzZURvd25DYXB0dXJlIG9uTW91c2VFbnRlckNhcHR1cmUgb25Nb3VzZUxlYXZlQ2FwdHVyZSBvbk1vdXNlTW92ZUNhcHR1cmUgb25Nb3VzZU91dENhcHR1cmUgb25Nb3VzZU92ZXJDYXB0dXJlIG9uTW91c2VVcENhcHR1cmUgb25TZWxlY3RDYXB0dXJlIG9uVG91Y2hDYW5jZWxDYXB0dXJlIG9uVG91Y2hFbmRDYXB0dXJlIG9uVG91Y2hNb3ZlQ2FwdHVyZSBvblRvdWNoU3RhcnRDYXB0dXJlIG9uU2Nyb2xsQ2FwdHVyZSBvbldoZWVsQ2FwdHVyZSBvbkFib3J0Q2FwdHVyZSBvbkNhblBsYXlDYXB0dXJlIG9uQ2FuUGxheVRocm91Z2hDYXB0dXJlIG9uRHVyYXRpb25DaGFuZ2VDYXB0dXJlIG9uRW1wdGllZENhcHR1cmUgb25FbmNyeXB0ZWRDYXB0dXJlIG9uRW5kZWRDYXB0dXJlIG9uRXJyb3JDYXB0dXJlIG9uTG9hZGVkRGF0YUNhcHR1cmUgb25Mb2FkZWRNZXRhZGF0YUNhcHR1cmUgb25Mb2FkU3RhcnRDYXB0dXJlIG9uUGF1c2VDYXB0dXJlIG9uUGxheUNhcHR1cmUgb25QbGF5aW5nQ2FwdHVyZSBvblByb2dyZXNzQ2FwdHVyZSBvblJhdGVDaGFuZ2VDYXB0dXJlIG9uU2Vla2VkQ2FwdHVyZSBvblNlZWtpbmdDYXB0dXJlIG9uU3RhbGxlZENhcHR1cmUgb25TdXNwZW5kQ2FwdHVyZSBvblRpbWVVcGRhdGVDYXB0dXJlIG9uVm9sdW1lQ2hhbmdlQ2FwdHVyZSBvbldhaXRpbmdDYXB0dXJlIG9uTG9hZENhcHR1cmUgb25BbmltYXRpb25TdGFydENhcHR1cmUgb25BbmltYXRpb25FbmRDYXB0dXJlIG9uQW5pbWF0aW9uSXRlcmF0aW9uQ2FwdHVyZSBvblRyYW5zaXRpb25FbmRDYXB0dXJlIGFjY2VwdCBhY2NlcHRDaGFyc2V0IGFjY2Vzc0tleSBhY3Rpb24gYWxsb3dGdWxsU2NyZWVuIGFsbG93VHJhbnNwYXJlbmN5IGFsdCBhcyBhc3luYyBhdXRvQ29tcGxldGUgYXV0b1BsYXkgY2FwdHVyZSBjZWxsUGFkZGluZyBjZWxsU3BhY2luZyBjaGFyU2V0IGNoYWxsZW5nZSBjaGVja2VkIGNpdGUgY2xhc3NJRCBjbGFzc05hbWUgY29scyBjb2xTcGFuIGNvbnRlbnQgY29udGVudEVkaXRhYmxlIGNvbnRleHRNZW51IGNvbnRyb2xzIGNvb3JkcyBjcm9zc09yaWdpbiBkYXRhIGRhdGVUaW1lIGRlZmF1bHQgZGVmZXIgZGlyIGRpc2FibGVkIGRvd25sb2FkIGRyYWdnYWJsZSBlbmNUeXBlIGZvcm0gZm9ybUFjdGlvbiBmb3JtRW5jVHlwZSBmb3JtTWV0aG9kIGZvcm1Ob1ZhbGlkYXRlIGZvcm1UYXJnZXQgZnJhbWVCb3JkZXIgaGVhZGVycyBoZWlnaHQgaGlkZGVuIGhpZ2ggaHJlZiBocmVmTGFuZyBodG1sRm9yIGh0dHBFcXVpdiBpY29uIGlkIGlucHV0TW9kZSBpbnRlZ3JpdHkgaXMga2V5UGFyYW1zIGtleVR5cGUga2luZCBsYWJlbCBsYW5nIGxpc3QgbG9vcCBsb3cgbWFuaWZlc3QgbWFyZ2luSGVpZ2h0IG1hcmdpbldpZHRoIG1heCBtYXhMZW5ndGggbWVkaWEgbWVkaWFHcm91cCBtZXRob2QgbWluIG1pbkxlbmd0aCBtdWx0aXBsZSBtdXRlZCBuYW1lIG5vbmNlIG5vVmFsaWRhdGUgb3BlbiBvcHRpbXVtIHBhdHRlcm4gcGxhY2Vob2xkZXIgcGxheXNJbmxpbmUgcG9zdGVyIHByZWxvYWQgcHJvZmlsZSByYWRpb0dyb3VwIHJlYWRPbmx5IHJlZmVycmVyUG9saWN5IHJlbCByZXF1aXJlZCByZXZlcnNlZCByb2xlIHJvd3Mgcm93U3BhbiBzYW5kYm94IHNjb3BlIHNjb3BlZCBzY3JvbGxpbmcgc2VhbWxlc3Mgc2VsZWN0ZWQgc2hhcGUgc2l6ZSBzaXplcyBzcGFuIHNwZWxsQ2hlY2sgc3JjIHNyY0RvYyBzcmNMYW5nIHNyY1NldCBzdGFydCBzdGVwIHN0eWxlIHN1bW1hcnkgdGFiSW5kZXggdGFyZ2V0IHRpdGxlIHR5cGUgdXNlTWFwIHZhbHVlIHdpZHRoIHdtb2RlIHdyYXAgYWJvdXQgZGF0YXR5cGUgaW5saXN0IHByZWZpeCBwcm9wZXJ0eSByZXNvdXJjZSB0eXBlb2Ygdm9jYWIgYXV0b0NhcGl0YWxpemUgYXV0b0NvcnJlY3QgYXV0b1NhdmUgY29sb3IgaXRlbVByb3AgaXRlbVNjb3BlIGl0ZW1UeXBlIGl0ZW1JRCBpdGVtUmVmIHJlc3VsdHMgc2VjdXJpdHkgdW5zZWxlY3RhYmxlIGFjY2VudEhlaWdodCBhY2N1bXVsYXRlIGFkZGl0aXZlIGFsaWdubWVudEJhc2VsaW5lIGFsbG93UmVvcmRlciBhbHBoYWJldGljIGFtcGxpdHVkZSBhcmFiaWNGb3JtIGFzY2VudCBhdHRyaWJ1dGVOYW1lIGF0dHJpYnV0ZVR5cGUgYXV0b1JldmVyc2UgYXppbXV0aCBiYXNlRnJlcXVlbmN5IGJhc2VQcm9maWxlIGJhc2VsaW5lU2hpZnQgYmJveCBiZWdpbiBiaWFzIGJ5IGNhbGNNb2RlIGNhcEhlaWdodCBjbGlwIGNsaXBQYXRoIGNsaXBSdWxlIGNsaXBQYXRoVW5pdHMgY29sb3JJbnRlcnBvbGF0aW9uIGNvbG9ySW50ZXJwb2xhdGlvbkZpbHRlcnMgY29sb3JQcm9maWxlIGNvbG9yUmVuZGVyaW5nIGNvbnRlbnRTY3JpcHRUeXBlIGNvbnRlbnRTdHlsZVR5cGUgY3Vyc29yIGN4IGN5IGQgZGVjZWxlcmF0ZSBkZXNjZW50IGRpZmZ1c2VDb25zdGFudCBkaXJlY3Rpb24gZGlzcGxheSBkaXZpc29yIGRvbWluYW50QmFzZWxpbmUgZHVyIGR4IGR5IGVkZ2VNb2RlIGVsZXZhdGlvbiBlbmFibGVCYWNrZ3JvdW5kIGVuZCBleHBvbmVudCBleHRlcm5hbFJlc291cmNlc1JlcXVpcmVkIGZpbGwgZmlsbE9wYWNpdHkgZmlsbFJ1bGUgZmlsdGVyIGZpbHRlclJlcyBmaWx0ZXJVbml0cyBmbG9vZENvbG9yIGZsb29kT3BhY2l0eSBmb2N1c2FibGUgZm9udEZhbWlseSBmb250U2l6ZSBmb250U2l6ZUFkanVzdCBmb250U3RyZXRjaCBmb250U3R5bGUgZm9udFZhcmlhbnQgZm9udFdlaWdodCBmb3JtYXQgZnJvbSBmeCBmeSBnMSBnMiBnbHlwaE5hbWUgZ2x5cGhPcmllbnRhdGlvbkhvcml6b250YWwgZ2x5cGhPcmllbnRhdGlvblZlcnRpY2FsIGdseXBoUmVmIGdyYWRpZW50VHJhbnNmb3JtIGdyYWRpZW50VW5pdHMgaGFuZ2luZyBob3JpekFkdlggaG9yaXpPcmlnaW5YIGlkZW9ncmFwaGljIGltYWdlUmVuZGVyaW5nIGluIGluMiBpbnRlcmNlcHQgayBrMSBrMiBrMyBrNCBrZXJuZWxNYXRyaXgga2VybmVsVW5pdExlbmd0aCBrZXJuaW5nIGtleVBvaW50cyBrZXlTcGxpbmVzIGtleVRpbWVzIGxlbmd0aEFkanVzdCBsZXR0ZXJTcGFjaW5nIGxpZ2h0aW5nQ29sb3IgbGltaXRpbmdDb25lQW5nbGUgbG9jYWwgbWFya2VyRW5kIG1hcmtlck1pZCBtYXJrZXJTdGFydCBtYXJrZXJIZWlnaHQgbWFya2VyVW5pdHMgbWFya2VyV2lkdGggbWFzayBtYXNrQ29udGVudFVuaXRzIG1hc2tVbml0cyBtYXRoZW1hdGljYWwgbW9kZSBudW1PY3RhdmVzIG9mZnNldCBvcGFjaXR5IG9wZXJhdG9yIG9yZGVyIG9yaWVudCBvcmllbnRhdGlvbiBvcmlnaW4gb3ZlcmZsb3cgb3ZlcmxpbmVQb3NpdGlvbiBvdmVybGluZVRoaWNrbmVzcyBwYWludE9yZGVyIHBhbm9zZTEgcGF0aExlbmd0aCBwYXR0ZXJuQ29udGVudFVuaXRzIHBhdHRlcm5UcmFuc2Zvcm0gcGF0dGVyblVuaXRzIHBvaW50ZXJFdmVudHMgcG9pbnRzIHBvaW50c0F0WCBwb2ludHNBdFkgcG9pbnRzQXRaIHByZXNlcnZlQWxwaGEgcHJlc2VydmVBc3BlY3RSYXRpbyBwcmltaXRpdmVVbml0cyByIHJhZGl1cyByZWZYIHJlZlkgcmVuZGVyaW5nSW50ZW50IHJlcGVhdENvdW50IHJlcGVhdER1ciByZXF1aXJlZEV4dGVuc2lvbnMgcmVxdWlyZWRGZWF0dXJlcyByZXN0YXJ0IHJlc3VsdCByb3RhdGUgcnggcnkgc2NhbGUgc2VlZCBzaGFwZVJlbmRlcmluZyBzbG9wZSBzcGFjaW5nIHNwZWN1bGFyQ29uc3RhbnQgc3BlY3VsYXJFeHBvbmVudCBzcGVlZCBzcHJlYWRNZXRob2Qgc3RhcnRPZmZzZXQgc3RkRGV2aWF0aW9uIHN0ZW1oIHN0ZW12IHN0aXRjaFRpbGVzIHN0b3BDb2xvciBzdG9wT3BhY2l0eSBzdHJpa2V0aHJvdWdoUG9zaXRpb24gc3RyaWtldGhyb3VnaFRoaWNrbmVzcyBzdHJpbmcgc3Ryb2tlIHN0cm9rZURhc2hhcnJheSBzdHJva2VEYXNob2Zmc2V0IHN0cm9rZUxpbmVjYXAgc3Ryb2tlTGluZWpvaW4gc3Ryb2tlTWl0ZXJsaW1pdCBzdHJva2VPcGFjaXR5IHN0cm9rZVdpZHRoIHN1cmZhY2VTY2FsZSBzeXN0ZW1MYW5ndWFnZSB0YWJsZVZhbHVlcyB0YXJnZXRYIHRhcmdldFkgdGV4dEFuY2hvciB0ZXh0RGVjb3JhdGlvbiB0ZXh0UmVuZGVyaW5nIHRleHRMZW5ndGggdG8gdHJhbnNmb3JtIHUxIHUyIHVuZGVybGluZVBvc2l0aW9uIHVuZGVybGluZVRoaWNrbmVzcyB1bmljb2RlIHVuaWNvZGVCaWRpIHVuaWNvZGVSYW5nZSB1bml0c1BlckVtIHZBbHBoYWJldGljIHZIYW5naW5nIHZJZGVvZ3JhcGhpYyB2TWF0aGVtYXRpY2FsIHZhbHVlcyB2ZWN0b3JFZmZlY3QgdmVyc2lvbiB2ZXJ0QWR2WSB2ZXJ0T3JpZ2luWCB2ZXJ0T3JpZ2luWSB2aWV3Qm94IHZpZXdUYXJnZXQgdmlzaWJpbGl0eSB3aWR0aHMgd29yZFNwYWNpbmcgd3JpdGluZ01vZGUgeCB4SGVpZ2h0IHgxIHgyIHhDaGFubmVsU2VsZWN0b3IgeGxpbmtBY3R1YXRlIHhsaW5rQXJjcm9sZSB4bGlua0hyZWYgeGxpbmtSb2xlIHhsaW5rU2hvdyB4bGlua1RpdGxlIHhsaW5rVHlwZSB4bWxCYXNlIHhtbG5zIHhtbG5zWGxpbmsgeG1sTGFuZyB4bWxTcGFjZSB5IHkxIHkyIHlDaGFubmVsU2VsZWN0b3IgeiB6b29tQW5kUGFuXG4qL1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cbnZhciBBVFRSSUJVVEVfUkVHRVggPSAvXigoPzpzKD86dXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm58Y3JvbGx8cGFjKXwoPzpzaGFwZXxpbWFnZXx0ZXh0KVJlbmRlcnwoPzpsZXR0ZXJ8d29yZClTcGFjfHZIYW5nfGhhbmcpaW5nfCg/Om9uKD86QW5pbWF0aW9uSXRlcmF0aW9ufEMoPzpvKD86bXBvc2l0aW9uKD86VXBkYXRlfFN0YXJ0fEVuZCl8bnRleHRNZW51fHB5KXxhblBsYXlUaHJvdWdofGFuUGxheXxoYW5nZXxsaWNrfHV0KXwoPzooPzpEdXJhdGlvbnxWb2x1bWV8UmF0ZSlDaGFuZ3woPzpNb3VzZUxlYXwoPzpUb3VjaHxNb3VzZSlNb3xEcmFnTGVhKXZ8UGF1cyllfExvYWRlZCg/Ok1ldGFkfEQpYXRhfCg/OkFuaW1hdGlvbnxUb3VjaHxMb2FkfERyYWcpU3RhcnR8KD86KD86VCg/OnJhbnNpdGlvbnxvdWNoKXxBbmltYXRpb24pRXxTdXNwZSluZHxEb3VibGVDbGlja3woPzpUb3VjaENhbmN8V2hlKWVsfCg/Ok1vdXNlKD86RW50fE92KWV8RHJhZyg/OkVudHxPdillfEVycm8pcnxUaW1lVXBkYXRlfCg/OkUoPzpuKD86Y3J5cHR8ZCl8bXB0aSl8Uyg/OnRhbGx8ZWVrKSllZHxNb3VzZURvd258UCg/OnJvZ3Jlc3N8bGF5aW5nKXwoPzpNb3VzZU91fERyYWdFeGl8Uyg/OmVsZWN8dWJtaSl8UmVzZXxJbnB1KXR8S2V5UHJlc3N8RHJhZ0VuZHxLZXkoPzpEb3dufFVwKXwoPzpXYWl0fFNlZWspaW5nfCg/Ok1vdXNlVXxEcm8pcHxTY3JvbGx8UGFzdGV8Rm9jdXN8QWJvcnR8RHJhZ3xQbGF5fExvYWR8Qmx1cilDYXB0dXJ8YWxpZ25tZW50QmFzZWxpbnwoPzpsaW1pdGluZ0NvbmVBbmd8eGxpbmsoPzooPzpBcmNyfFIpb3xUaXQpfHMoPzp1cmZhY2VTY2F8dHl8Y2EpfHVuc2VsZWN0YWJ8YmFzZVByb2ZpfGZvbnRTdHl8KD86Zm9jdXN8ZHJhZ2cpYWJ8bXVsdGlwfHByb2ZpfHRpdClsfGQoPzpvbWluYW50QmFzZWxpbnxlZmF1bHRWYWx1KXxhKD86dXRvKD86Q2FwaXRhbGl6fFJldmVyc3xTYXYpfGRkaXRpdil8KD86KD86Zm9ybU5vVmFsaWR8eGxpbmtBY3R1fG5vVmFsaWR8YWNjdW11bHxyb3QpYXxhdXRvQ29tcGxlfGRlY2VsZXJhKXR8KD86KD86YXR0cmlidXRlfGl0ZW0pVHxkYXRhdCl5cHwoPzphdHRyaWJ1dGV8Z2x5cGgpTmFtfHBsYXlzSW5saW58KD86Zm9ybUV8ZSluY1R5cHwoPzp3cml0aW5nfGlucHV0fGVkZ2UpTW9kfCg/OnhsaW5rVHl8aXRlbVNjb3xrZXlUeXxzbG8pcHwoPzphbXBsaXR1fG1vKWR8KD86eG1sU3BhfG5vbiljfGZpbGxSdWx8KD86ZGF0ZVRpfG5hKW18cig/OmVzb3VyY3xvbCl8eG1sQmFzfHdtb2QpZXwoPzpnbHlwaE9yaWVudGF0aW9uSG9yaXpvbnR8bG9jKWFsfCg/OmV4dGVybmFsUmVzb3VyY2VzUmVxdWlyfHNlbGVjdHxyZXZlcnN8bXV0KWVkfGMoPzpvKD86bG9ySW50ZXJwb2xhdGlvbkZpbHRlcnxudHJvbHxvcmQpc3xvKD86bG9yKD86SW50ZXJwb2xhdGlvbik/fG50ZW50KXwoPzpvbnRlbnRTKD86Y3JpcHR8dHlsZSlUeXB8byg/Om50ZW50RWRpdGFifGxvclByb2ZpKWx8bCg/OmFzc05hbXxpcFJ1bCl8YSg/OmxjTW9kfHB0dXIpfGl0KWV8b2xvclJlbmRlcmluZ3xsKD86aXBQYXRoVW5pdHN8YXNzSUQpfG8oPzpudGV4dE1lbnV8bHMpfGgoPzplY2tlZExpbmt8YSg/OmxsZW5nZXxyU2V0KXxpbGRyZW58ZWNrZWQpfGVsbCg/OlNwYWN8UGFkZClpbmd8KD86cm9zc09yaWdpfG9sU3BhKW58YXBIZWlnaHR8bGlwKD86UGF0aCk/fHVyc29yfFt4eV0pfGdseXBoT3JpZW50YXRpb25WZXJ0aWNhbHxkKD86YW5nZXJvdXNseVNldElubmVySFRNTHxlZmF1bHRDaGVja2VkfG93bmxvYWR8aXNhYmxlZHxpc3BsYXl8W3h5XSl8KD86cyg/OnRyaWtldGhyb3VnaFRoaWNrbnxlYW1sKWVzfCg/OnVuZHxvdillcmxpbmVUaGlja25lc3xyKD86ZXF1aXJlZEV4dGVuc2lvbnxhZGl1KXwoPzpyZXF1aXJlZEZlYXR1cnx0YWJsZVZhbHV8c3RpdGNoVGlsfG51bU9jdGF2fGZpbHRlclIpZXxrZXkoPzooPzpTcGxpbnxUaW0pZXxQYXJhbSl8YXV0b0ZvY3V8aGVhZGVyfGJpYSlzfCg/Oig/OnN0KD86cmlrZXRocm91Z2hQb3NpfGREZXZpYSl8KD86dW5kfG92KWVybGluZVBvc2l8KD86dGV4dERlY29yfGVsZXYpYXxvcmllbnRhKXRpb3woPzpzdHJva2VMaW5lam98b3JpZylpfGZvcm1BY3Rpb3x6b29tQW5kUGF8b25Gb2N1c0l8ZGlyZWN0aW98KD86dmVyc3xhY3QpaW98cm93U3BhfGJlZ2l8aWNvKW58byg/Om4oPzpBbmltYXRpb25JdGVyYXRpb258Qyg/Om8oPzptcG9zaXRpb24oPzpVcGRhdGV8U3RhcnR8RW5kKXxudGV4dE1lbnV8cHkpfGFuUGxheVRocm91Z2h8YW5QbGF5fGhhbmdlfGxpY2t8dXQpfCg/Oig/OkR1cmF0aW9ufFZvbHVtZXxSYXRlKUNoYW5nfCg/Ok1vdXNlTGVhfCg/OlRvdWNofE1vdXNlKU1vfERyYWdMZWEpdnxQYXVzKWV8TG9hZGVkKD86TWV0YWR8RClhdGF8KD86QW5pbWF0aW9ufFRvdWNofExvYWR8RHJhZylTdGFydHwoPzooPzpUKD86cmFuc2l0aW9ufG91Y2gpfEFuaW1hdGlvbilFfFN1c3BlKW5kfERvdWJsZUNsaWNrfCg/OlRvdWNoQ2FuY3xXaGUpZWx8KD86TW91c2UoPzpFbnR8T3YpZXxEcmFnKD86RW50fE92KWV8RXJybylyfFRpbWVVcGRhdGV8KD86RSg/Om4oPzpjcnlwdHxkKXxtcHRpKXxTKD86dGFsbHxlZWspKWVkfE1vdXNlRG93bnxQKD86cm9ncmVzc3xsYXlpbmcpfCg/Ok1vdXNlT3V8RHJhZ0V4aXxTKD86ZWxlY3x1Ym1pKXxSZXNlfElucHUpdHxLZXlQcmVzc3xEcmFnRW5kfEtleSg/OkRvd258VXApfCg/OldhaXR8U2Vlaylpbmd8KD86TW91c2VVfERybylwfFNjcm9sbHxQYXN0ZXxGb2N1c3xBYm9ydHxEcmFnfFBsYXl8TG9hZHxCbHVyKXxyaWVudCl8cCg/OnJlc2VydmVBKD86c3BlY3RSYXRpb3xscGhhKXxvaW50c0F0W1gtWl18YW5vc2UxKXwoPzpwYXR0ZXJuQ29udGVudHxtYSg/OnNrKD86Q29udGVudCk/fHJrZXIpfHByaW1pdGl2ZXxncmFkaWVudHxwYXR0ZXJufGZpbHRlcilVbml0c3woPzpncmFkaWVudFR8cGF0dGVyblR8dClyYW5zZm9ybXwoPzooPzphbGxvd1RyYW5zcGFyfGJhc2VGcmVxdSllbmN8cmUoPzpmZXJyZXJQb2xpY3xhZE9ubCl8KD86KD86c3QoPzpyb2tlfG9wKU98Zmxvb2RPfGZpbGxPfG8pcGFjfGludGVncnxzZWN1cilpdHx2aXNpYmlsaXR8Zm9udEZhbWlsfGFjY2Vzc0tlfHByb3BlcnR8c3VtbWFyKXl8KD86c3Ryb2tlTWl0ZXJsaW1pfCg/OnNwZWN1bGFyQ29uc3RhfHJlcGVhdENvdXxmb250VmFyaWEpbnwoPzooPzpzcGVjdWxhckV8ZSl4cG9ufHJlbmRlcmluZ0ludHxhc2MpZW58ZCg/OmlmZnVzZUNvbnN0YXxlc2NlKW58KD86Zm9udFNpemVBZGp1fGxlbmd0aEFkanV8bWFuaWZlKXN8YmFzZWxpbmVTaGlmfHZlY3RvckVmZmVjfCg/Oig/Om1hcig/OmtlcnxnaW4pfHgpSHxhY2NlbnRIfGZvbnRXKWVpZ2h8YSg/OnV0b0NvcnJlY3xib3UpfG1hcmtlclN0YXJ8b25Gb2N1c091fGluKD86dGVyY2VwfGxpcyl8cmVzdGFyfGZvcm1hfGhlaWdofGxpcyl0fCg/Oig/OnN0KD86cm9rZURhc2hvfGFydE8pfG8pZmZzfGFjY2VwdENoYXJzfGZvcm1UYXJnfHZpZXdUYXJnfHNyY1MpZXR8KD86KD86ZW5hYmxlQmFja2dyb3V8bWFya2VyRSlufHMoPzpwKD86cmVhZE1ldGhvfGVlKXxlZSl8Zm9ybU1ldGhvfG0oPzphcmtlck1pfGV0aG8pfHByZWxvYXxraW4pZHxrKD86ZXJuZWwoPzpVbml0TGVuZ3RofE1hdHJpeCl8WzEtNF0pfCg/Olt4eV1DaGFubmVsU2VsZWN0fGxpZ2h0aW5nQ29sfHRleHRBbmNofGZsb29kQ29sfHN0b3BDb2x8b3BlcmF0fGh0bWxGKW9yfCg/OmFsbG93RnVsbFNjcmV8aGlkZCllbnxzdHJva2VEYXNoYXJyYXl8c3lzdGVtTGFuZ3VhZ2V8KD86c3Ryb2tlTGluZWNhfGl0ZW1Qcm98dXNlTWF8d3JhfGxvbylwfHYoPzpNYXRoZW1hdGljYWx8ZXJ0KD86T3JpZ2luW1hZXXxBZHZZKXxhbHVlc3xvY2FiKXwoPzpwb2ludGVyRXZlfGtleVBvaSludHN8dW5pY29kZVJhbmdlfCg/Oig/OmFsbG93UmVvcmR8cGxhY2Vob2xkfGZyYW1lQm9yZHxwYWludE9yZHxwb3N0fG9yZCllfHJlcGVhdER1fGQoPzplZmV8dSkpcnxtYXRoZW1hdGljYWx8KD86dkl8aSlkZW9ncmFwaGljfGgoPzpvcml6KD86T3JpZ2lufEFkdilYfHR0cEVxdWl2KXx1KD86bmljb2RlQmlkaXxbMTJdKXwoPzpmb250U3RyZXRjfGhpZylofCg/Oig/Om1hcig/OmtlcnxnaW4pV3xzdHJva2VXKWlkfGF6aW11KXRofHZBbHBoYWJldGljfG1lZGlhR3JvdXB8c3BlbGxDaGVja3woPzp1bml0c1BlckV8b3B0aW11fGZybyltfHIoPzphZGlvR3JvdXB8ZSg/OnN1bHRzfGZbWFldfGwpfG93c3xbeHldKXwoPzp4bWxuc1hsfHZhbHVlTClpbmt8YSg/OnJhYmljRm9ybXxsKD86cGhhYmV0aWN8dCl8c3luYyl8cGF0aExlbmd0aHwoPzp0ZXh0fG0oPzppbnxheCkpTGVuZ3RofGlubmVySFRNTHx4bGlua1Nob3d8KD86eGxpbmtIcnxnbHlwaFIpZWZ8cig/OmUoPzpxdWlyZWR8c3VsdHxmKSk/fG8oPzp2ZXJmbG93fHBlbil8KD86dGFiSW5kZXwoPzpzYW5kfGIpYm98dmlld0JvKXh8KD86KD86aHJlZnx4bWx8c3JjKUxhfGtlcm5pKW5nfGYoPzpvKD86bnRTaXplfHJtKXxpbCg/OnRlcnxsKSl8YXV0b1BsYXl8dW5pY29kZXxwKD86YXR0ZXJufG9pbnRzKXx0KD86YXJnZXRbWFldfG8pfGkoPzp0ZW1SZWZ8bjJ8cyl8ZGl2aXNvcnxkKD86ZWZhdWx0fGF0YXxpcik/fHNyY0RvY3xzKD86Y29wZWR8dGUoPzptW2h2XXxwKXxwYW4pfCg/OndpZHRofHNpemUpc3woPzpzdHJpfGxhKW5nfHByZWZpeHxpdGVtSUR8cyg/OnQoPzpyb2tlfGFydCl8aGFwZXxjb3BlfHJjKXxhKD86Y2NlcHR8cyl8dCg/OmFyZ2V0fHlwZSl8dHlwZW9mfHdpZHRofHZhbHVlfHgoPzptbG5zKT98bGFiZWx8bSg/OmVkaWF8YSg/OnNrfHgpfGluKXxzaXplfGhyZWZ8ayg/OmV5KT98ZW5kfGxvd3x4WzEyXXxpW2RuXXx5WzEyXXxnWzEyXXxieXxmW3h5XXxbeXpdKSQvO1xuXG4vKiBGcm9tIERPTVByb3BlcnR5ICovXG52YXIgQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUiA9ICc6QS1aX2EtelxcXFx1MDBDMC1cXFxcdTAwRDZcXFxcdTAwRDgtXFxcXHUwMEY2XFxcXHUwMEY4LVxcXFx1MDJGRlxcXFx1MDM3MC1cXFxcdTAzN0RcXFxcdTAzN0YtXFxcXHUxRkZGXFxcXHUyMDBDLVxcXFx1MjAwRFxcXFx1MjA3MC1cXFxcdTIxOEZcXFxcdTJDMDAtXFxcXHUyRkVGXFxcXHUzMDAxLVxcXFx1RDdGRlxcXFx1RjkwMC1cXFxcdUZEQ0ZcXFxcdUZERjAtXFxcXHVGRkZEJztcbnZhciBBVFRSSUJVVEVfTkFNRV9DSEFSID0gQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUiArICdcXFxcLS4wLTlcXFxcdTAwQjdcXFxcdTAzMDAtXFxcXHUwMzZGXFxcXHUyMDNGLVxcXFx1MjA0MCc7XG52YXIgaXNDdXN0b21BdHRyaWJ1dGUgPSBSZWdFeHAucHJvdG90eXBlLnRlc3QuYmluZChuZXcgUmVnRXhwKCdeKGRhdGF8YXJpYSktWycgKyBBVFRSSUJVVEVfTkFNRV9DSEFSICsgJ10qJCcpKTtcblxudmFyIHZhbGlkQXR0ciA9IChmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gQVRUUklCVVRFX1JFR0VYLnRlc3QobmFtZSkgfHwgaXNDdXN0b21BdHRyaWJ1dGUobmFtZS50b0xvd2VyQ2FzZSgpKTtcbn0pO1xuXG4vLyAgICAgIFxuXG5cbmZ1bmN0aW9uIGlzVGFnKHRhcmdldCkgLyogOiAlY2hlY2tzICove1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZyc7XG59XG5cbi8vICAgICAgXG5cblxuZnVuY3Rpb24gaXNTdHlsZWRDb21wb25lbnQodGFyZ2V0KSAvKiA6ICVjaGVja3MgKi97XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0YXJnZXQuc3R5bGVkQ29tcG9uZW50SWQgPT09ICdzdHJpbmcnO1xufVxuXG4vLyAgICAgIFxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZSh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5kaXNwbGF5TmFtZSB8fCB0YXJnZXQubmFtZSB8fCAnQ29tcG9uZW50Jztcbn1cblxuLy8gICAgICBcblxuXG52YXIgZGV0ZXJtaW5lVGhlbWUgPSAoZnVuY3Rpb24gKHByb3BzLCBmYWxsYmFja1RoZW1lLCBkZWZhdWx0UHJvcHMpIHtcbiAgLy8gUHJvcHMgc2hvdWxkIHRha2UgcHJlY2VkZW5jZSBvdmVyIFRoZW1lUHJvdmlkZXIsIHdoaWNoIHNob3VsZCB0YWtlIHByZWNlZGVuY2Ugb3ZlclxuICAvLyBkZWZhdWx0UHJvcHMsIGJ1dCBSZWFjdCBhdXRvbWF0aWNhbGx5IHB1dHMgZGVmYXVsdFByb3BzIG9uIHByb3BzLlxuXG4gIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbiAgdmFyIGlzRGVmYXVsdFRoZW1lID0gZGVmYXVsdFByb3BzICYmIHByb3BzLnRoZW1lID09PSBkZWZhdWx0UHJvcHMudGhlbWU7XG4gIHZhciB0aGVtZSA9IHByb3BzLnRoZW1lICYmICFpc0RlZmF1bHRUaGVtZSA/IHByb3BzLnRoZW1lIDogZmFsbGJhY2tUaGVtZTtcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIHJldHVybiB0aGVtZTtcbn0pO1xuXG4vLyAgICAgIFxudmFyIGVzY2FwZVJlZ2V4ID0gL1tbXFxdLiMqJD48K349fF46KCksXCInYC1dKy9nO1xudmFyIGRhc2hlc0F0RW5kcyA9IC8oXi18LSQpL2c7XG5cbi8qKlxuICogVE9ETzogRXhwbG9yZSB1c2luZyBDU1MuZXNjYXBlIHdoZW4gaXQgYmVjb21lcyBtb3JlIGF2YWlsYWJsZVxuICogaW4gZXZlcmdyZWVuIGJyb3dzZXJzLlxuICovXG5mdW5jdGlvbiBlc2NhcGUoc3RyKSB7XG4gIHJldHVybiBzdHJcbiAgLy8gUmVwbGFjZSBhbGwgcG9zc2libGUgQ1NTIHNlbGVjdG9yc1xuICAucmVwbGFjZShlc2NhcGVSZWdleCwgJy0nKVxuXG4gIC8vIFJlbW92ZSBleHRyYW5lb3VzIGh5cGhlbnMgYXQgdGhlIHN0YXJ0IGFuZCBlbmRcbiAgLnJlcGxhY2UoZGFzaGVzQXRFbmRzLCAnJyk7XG59XG5cbi8vICAgICAgXG4vKipcbiAqIENyZWF0ZXMgYSBicm9hZGNhc3QgdGhhdCBjYW4gYmUgbGlzdGVuZWQgdG8sIGkuZS4gc2ltcGxlIGV2ZW50IGVtaXR0ZXJcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9SZWFjdFRyYWluaW5nL3JlYWN0LWJyb2FkY2FzdFxuICovXG5cbnZhciBjcmVhdGVCcm9hZGNhc3QgPSBmdW5jdGlvbiBjcmVhdGVCcm9hZGNhc3QoaW5pdGlhbFN0YXRlKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSB7fTtcbiAgdmFyIGlkID0gMDtcbiAgdmFyIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIGZ1bmN0aW9uIHB1Ymxpc2gobmV4dFN0YXRlKSB7XG4gICAgc3RhdGUgPSBuZXh0U3RhdGU7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ3VhcmQtZm9yLWluLCBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAodmFyIGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1trZXldO1xuICAgICAgaWYgKGxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcihzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgdmFyIGN1cnJlbnRJZCA9IGlkO1xuICAgIGxpc3RlbmVyc1tjdXJyZW50SWRdID0gbGlzdGVuZXI7XG4gICAgaWQgKz0gMTtcbiAgICBsaXN0ZW5lcihzdGF0ZSk7XG4gICAgcmV0dXJuIGN1cnJlbnRJZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKHVuc3ViSUQpIHtcbiAgICBsaXN0ZW5lcnNbdW5zdWJJRF0gPSB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4geyBwdWJsaXNoOiBwdWJsaXNoLCBzdWJzY3JpYmU6IHN1YnNjcmliZSwgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG59O1xuXG4vLyAgICAgIFxuLy8gSGVscGVyIHRvIGNhbGwgYSBnaXZlbiBmdW5jdGlvbiwgb25seSBvbmNlXG52YXIgb25jZSA9IChmdW5jdGlvbiAoY2IpIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBjYigpO1xuICAgIH1cbiAgfTtcbn0pO1xuXG52YXIgX1RoZW1lUHJvdmlkZXIkY2hpbGRDO1xudmFyIF9UaGVtZVByb3ZpZGVyJGNvbnRleDtcblxuLy8gICAgICBcbi8qIGdsb2JhbHMgUmVhY3QkRWxlbWVudCAqL1xuLy8gTk9URTogRE8gTk9UIENIQU5HRSwgY2hhbmdpbmcgdGhpcyBpcyBhIHNlbXZlciBtYWpvciBjaGFuZ2UhXG52YXIgQ0hBTk5FTCA9ICdfX3N0eWxlZC1jb21wb25lbnRzX18nO1xudmFyIENIQU5ORUxfTkVYVCA9IENIQU5ORUwgKyAnbmV4dF9fJztcblxudmFyIENPTlRFWFRfQ0hBTk5FTF9TSEFQRSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIGdldFRoZW1lOiBQcm9wVHlwZXMuZnVuYyxcbiAgc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdW5zdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jXG59KTtcblxudmFyIHdhcm5DaGFubmVsRGVwcmVjYXRlZCA9IHZvaWQgMDtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5DaGFubmVsRGVwcmVjYXRlZCA9IG9uY2UoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5lcnJvcignV2FybmluZzogVXNhZ2Ugb2YgYGNvbnRleHQuJyArIENIQU5ORUwgKyAnYCBhcyBhIGZ1bmN0aW9uIGlzIGRlcHJlY2F0ZWQuIEl0IHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgb2JqZWN0IG9uIGAuY29udGV4dC4nICsgQ0hBTk5FTF9ORVhUICsgJ2AgaW4gYSBmdXR1cmUgdmVyc2lvbi4nKTtcbiAgfSk7XG59XG5cbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gaXNGdW5jdGlvbih0ZXN0KSB7XG4gIHJldHVybiB0eXBlb2YgdGVzdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbi8qKlxuICogUHJvdmlkZSBhIHRoZW1lIHRvIGFuIGVudGlyZSByZWFjdCBjb21wb25lbnQgdHJlZSB2aWEgY29udGV4dCBhbmQgZXZlbnQgbGlzdGVuZXJzIChoYXZlIHRvIGRvXG4gKiBib3RoIGNvbnRleHQgYW5kIGV2ZW50IGVtaXR0ZXIgYXMgcHVyZSBjb21wb25lbnRzIGJsb2NrIGNvbnRleHQgdXBkYXRlcylcbiAqL1xuXG52YXIgVGhlbWVQcm92aWRlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGluaGVyaXRzKFRoZW1lUHJvdmlkZXIsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFRoZW1lUHJvdmlkZXIoKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgVGhlbWVQcm92aWRlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzKSk7XG5cbiAgICBfdGhpcy51bnN1YnNjcmliZVRvT3V0ZXJJZCA9IC0xO1xuXG4gICAgX3RoaXMuZ2V0VGhlbWUgPSBfdGhpcy5nZXRUaGVtZS5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBUaGVtZVByb3ZpZGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIFRoZW1lUHJvdmlkZXIgd3JhcHBlciBhbnl3aGVyZSBhcm91bmQgdGhpcyB0aGVtZSBwcm92aWRlciwgbWVyZ2UgdGhpcyB0aGVtZVxuICAgIC8vIHdpdGggdGhlIG91dGVyIHRoZW1lXG4gICAgdmFyIG91dGVyQ29udGV4dCA9IHRoaXMuY29udGV4dFtDSEFOTkVMX05FWFRdO1xuICAgIGlmIChvdXRlckNvbnRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZVRvT3V0ZXJJZCA9IG91dGVyQ29udGV4dC5zdWJzY3JpYmUoZnVuY3Rpb24gKHRoZW1lKSB7XG4gICAgICAgIF90aGlzMi5vdXRlclRoZW1lID0gdGhlbWU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5icm9hZGNhc3QgPSBjcmVhdGVCcm9hZGNhc3QodGhpcy5nZXRUaGVtZSgpKTtcbiAgfTtcblxuICBUaGVtZVByb3ZpZGVyLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXMsXG4gICAgICAgIF9iYWJlbEhlbHBlcnMkZXh0ZW5kcztcblxuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgdGhpcy5jb250ZXh0LCAoX2JhYmVsSGVscGVycyRleHRlbmRzID0ge30sIF9iYWJlbEhlbHBlcnMkZXh0ZW5kc1tDSEFOTkVMX05FWFRdID0ge1xuICAgICAgZ2V0VGhlbWU6IHRoaXMuZ2V0VGhlbWUsXG4gICAgICBzdWJzY3JpYmU6IHRoaXMuYnJvYWRjYXN0LnN1YnNjcmliZSxcbiAgICAgIHVuc3Vic2NyaWJlOiB0aGlzLmJyb2FkY2FzdC51bnN1YnNjcmliZVxuICAgIH0sIF9iYWJlbEhlbHBlcnMkZXh0ZW5kc1tDSEFOTkVMXSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB3YXJuQ2hhbm5lbERlcHJlY2F0ZWQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGF0Y2ggdGhlIG9sZCBgc3Vic2NyaWJlYCBwcm92aWRlIHZpYSBgQ0hBTk5FTGAgZm9yIG9sZGVyIGNsaWVudHMuXG4gICAgICB2YXIgdW5zdWJzY3JpYmVJZCA9IF90aGlzMy5icm9hZGNhc3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMy5icm9hZGNhc3QudW5zdWJzY3JpYmUodW5zdWJzY3JpYmVJZCk7XG4gICAgICB9O1xuICAgIH0sIF9iYWJlbEhlbHBlcnMkZXh0ZW5kcykpO1xuICB9O1xuXG4gIFRoZW1lUHJvdmlkZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnRoZW1lICE9PSBuZXh0UHJvcHMudGhlbWUpIHtcbiAgICAgIHRoaXMuYnJvYWRjYXN0LnB1Ymxpc2godGhpcy5nZXRUaGVtZShuZXh0UHJvcHMudGhlbWUpKTtcbiAgICB9XG4gIH07XG5cbiAgVGhlbWVQcm92aWRlci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy51bnN1YnNjcmliZVRvT3V0ZXJJZCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuY29udGV4dFtDSEFOTkVMX05FWFRdLnVuc3Vic2NyaWJlKHRoaXMudW5zdWJzY3JpYmVUb091dGVySWQpO1xuICAgIH1cbiAgfTtcblxuICAvLyBHZXQgdGhlIHRoZW1lIGZyb20gdGhlIHByb3BzLCBzdXBwb3J0aW5nIGJvdGggKG91dGVyVGhlbWUpID0+IHt9IGFzIHdlbGwgYXMgb2JqZWN0IG5vdGF0aW9uXG5cblxuICBUaGVtZVByb3ZpZGVyLnByb3RvdHlwZS5nZXRUaGVtZSA9IGZ1bmN0aW9uIGdldFRoZW1lKHBhc3NlZFRoZW1lKSB7XG4gICAgdmFyIHRoZW1lID0gcGFzc2VkVGhlbWUgfHwgdGhpcy5wcm9wcy50aGVtZTtcbiAgICBpZiAoaXNGdW5jdGlvbih0aGVtZSkpIHtcbiAgICAgIHZhciBtZXJnZWRUaGVtZSA9IHRoZW1lKHRoaXMub3V0ZXJUaGVtZSk7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhaXNQbGFpbk9iamVjdChtZXJnZWRUaGVtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVGhlbWVQcm92aWRlcl0gUGxlYXNlIHJldHVybiBhbiBvYmplY3QgZnJvbSB5b3VyIHRoZW1lIGZ1bmN0aW9uLCBpLmUuIHRoZW1lPXsoKSA9PiAoe30pfSEnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZXJnZWRUaGVtZTtcbiAgICB9XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KHRoZW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVGhlbWVQcm92aWRlcl0gUGxlYXNlIG1ha2UgeW91ciB0aGVtZSBwcm9wIGEgcGxhaW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgdGhpcy5vdXRlclRoZW1lLCB0aGVtZSk7XG4gIH07XG5cbiAgVGhlbWVQcm92aWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICB9O1xuXG4gIHJldHVybiBUaGVtZVByb3ZpZGVyO1xufShDb21wb25lbnQpO1xuXG5UaGVtZVByb3ZpZGVyLmNoaWxkQ29udGV4dFR5cGVzID0gKF9UaGVtZVByb3ZpZGVyJGNoaWxkQyA9IHt9LCBfVGhlbWVQcm92aWRlciRjaGlsZENbQ0hBTk5FTF0gPSBQcm9wVHlwZXMuZnVuYywgX1RoZW1lUHJvdmlkZXIkY2hpbGRDW0NIQU5ORUxfTkVYVF0gPSBDT05URVhUX0NIQU5ORUxfU0hBUEUsIF9UaGVtZVByb3ZpZGVyJGNoaWxkQyk7XG5UaGVtZVByb3ZpZGVyLmNvbnRleHRUeXBlcyA9IChfVGhlbWVQcm92aWRlciRjb250ZXggPSB7fSwgX1RoZW1lUHJvdmlkZXIkY29udGV4W0NIQU5ORUxfTkVYVF0gPSBDT05URVhUX0NIQU5ORUxfU0hBUEUsIF9UaGVtZVByb3ZpZGVyJGNvbnRleCk7XG5cbi8vICAgICAgXG5cbi8vIEhBQ0sgZm9yIGdlbmVyYXRpbmcgYWxsIHN0YXRpYyBzdHlsZXMgd2l0aG91dCBuZWVkaW5nIHRvIGFsbG9jYXRlXG4vLyBhbiBlbXB0eSBleGVjdXRpb24gY29udGV4dCBldmVyeSBzaW5nbGUgdGltZS4uLlxudmFyIFNUQVRJQ19FWEVDVVRJT05fQ09OVEVYVCA9IHt9O1xuXG52YXIgX1N0eWxlZENvbXBvbmVudCA9IChmdW5jdGlvbiAoQ29tcG9uZW50U3R5bGUsIGNvbnN0cnVjdFdpdGhPcHRpb25zKSB7XG4gIHZhciBpZGVudGlmaWVycyA9IHt9O1xuXG4gIC8qIFdlIGRlcGVuZCBvbiBjb21wb25lbnRzIGhhdmluZyB1bmlxdWUgSURzICovXG4gIHZhciBnZW5lcmF0ZUlkID0gZnVuY3Rpb24gZ2VuZXJhdGVJZChfZGlzcGxheU5hbWUsIHBhcmVudENvbXBvbmVudElkKSB7XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIF9kaXNwbGF5TmFtZSAhPT0gJ3N0cmluZycgPyAnc2MnIDogZXNjYXBlKF9kaXNwbGF5TmFtZSk7XG5cbiAgICB2YXIgY29tcG9uZW50SWQgPSB2b2lkIDA7XG5cbiAgICAvKipcbiAgICAgKiBvbmx5IGZhbGwgYmFjayB0byBoYXNoaW5nIHRoZSBjb21wb25lbnQgaW5qZWN0aW9uIG9yZGVyIGlmXG4gICAgICogYSBwcm9wZXIgZGlzcGxheU5hbWUgaXNuJ3QgcHJvdmlkZWQgYnkgdGhlIGJhYmVsIHBsdWdpblxuICAgICAqL1xuICAgIGlmICghX2Rpc3BsYXlOYW1lKSB7XG4gICAgICB2YXIgbnIgPSAoaWRlbnRpZmllcnNbZGlzcGxheU5hbWVdIHx8IDApICsgMTtcbiAgICAgIGlkZW50aWZpZXJzW2Rpc3BsYXlOYW1lXSA9IG5yO1xuXG4gICAgICBjb21wb25lbnRJZCA9IGRpc3BsYXlOYW1lICsgJy0nICsgQ29tcG9uZW50U3R5bGUuZ2VuZXJhdGVOYW1lKGRpc3BsYXlOYW1lICsgbnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnRJZCA9IGRpc3BsYXlOYW1lICsgJy0nICsgQ29tcG9uZW50U3R5bGUuZ2VuZXJhdGVOYW1lKGRpc3BsYXlOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50Q29tcG9uZW50SWQgIT09IHVuZGVmaW5lZCA/IHBhcmVudENvbXBvbmVudElkICsgJy0nICsgY29tcG9uZW50SWQgOiBjb21wb25lbnRJZDtcbiAgfTtcblxuICB2YXIgQmFzZVN0eWxlZENvbXBvbmVudCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgaW5oZXJpdHMoQmFzZVN0eWxlZENvbXBvbmVudCwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBCYXNlU3R5bGVkQ29tcG9uZW50KCkge1xuICAgICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQmFzZVN0eWxlZENvbXBvbmVudCk7XG5cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwuYXBwbHkoX0NvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLmF0dHJzID0ge30sIF90aGlzLnN0YXRlID0ge1xuICAgICAgICB0aGVtZTogbnVsbCxcbiAgICAgICAgZ2VuZXJhdGVkQ2xhc3NOYW1lOiAnJ1xuICAgICAgfSwgX3RoaXMudW5zdWJzY3JpYmVJZCA9IC0xLCBfdGVtcCksIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICAgIH1cblxuICAgIEJhc2VTdHlsZWRDb21wb25lbnQucHJvdG90eXBlLnVuc3Vic2NyaWJlRnJvbUNvbnRleHQgPSBmdW5jdGlvbiB1bnN1YnNjcmliZUZyb21Db250ZXh0KCkge1xuICAgICAgaWYgKHRoaXMudW5zdWJzY3JpYmVJZCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0W0NIQU5ORUxfTkVYVF0udW5zdWJzY3JpYmUodGhpcy51bnN1YnNjcmliZUlkKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQmFzZVN0eWxlZENvbXBvbmVudC5wcm90b3R5cGUuYnVpbGRFeGVjdXRpb25Db250ZXh0ID0gZnVuY3Rpb24gYnVpbGRFeGVjdXRpb25Db250ZXh0KHRoZW1lLCBwcm9wcykge1xuICAgICAgdmFyIGF0dHJzID0gdGhpcy5jb25zdHJ1Y3Rvci5hdHRycztcblxuICAgICAgdmFyIGNvbnRleHQgPSBfZXh0ZW5kcyh7fSwgcHJvcHMsIHsgdGhlbWU6IHRoZW1lIH0pO1xuICAgICAgaWYgKGF0dHJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXR0cnMgPSBPYmplY3Qua2V5cyhhdHRycykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgYXR0ciA9IGF0dHJzW2tleV07XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBhY2Nba2V5XSA9IHR5cGVvZiBhdHRyID09PSAnZnVuY3Rpb24nID8gYXR0cihjb250ZXh0KSA6IGF0dHI7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgY29udGV4dCwgdGhpcy5hdHRycyk7XG4gICAgfTtcblxuICAgIEJhc2VTdHlsZWRDb21wb25lbnQucHJvdG90eXBlLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzID0gZnVuY3Rpb24gZ2VuZXJhdGVBbmRJbmplY3RTdHlsZXModGhlbWUsIHByb3BzKSB7XG4gICAgICB2YXIgX2NvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcixcbiAgICAgICAgICBhdHRycyA9IF9jb25zdHJ1Y3Rvci5hdHRycyxcbiAgICAgICAgICBjb21wb25lbnRTdHlsZSA9IF9jb25zdHJ1Y3Rvci5jb21wb25lbnRTdHlsZSxcbiAgICAgICAgICB3YXJuVG9vTWFueUNsYXNzZXMgPSBfY29uc3RydWN0b3Iud2FyblRvb01hbnlDbGFzc2VzO1xuXG4gICAgICB2YXIgc3R5bGVTaGVldCA9IHRoaXMuY29udGV4dFtDT05URVhUX0tFWV0gfHwgU3R5bGVTaGVldC5pbnN0YW5jZTtcblxuICAgICAgLy8gc3RhdGljYWx5IHN0eWxlZC1jb21wb25lbnRzIGRvbid0IG5lZWQgdG8gYnVpbGQgYW4gZXhlY3V0aW9uIGNvbnRleHQgb2JqZWN0LFxuICAgICAgLy8gYW5kIHNob3VsZG4ndCBiZSBpbmNyZWFzaW5nIHRoZSBudW1iZXIgb2YgY2xhc3MgbmFtZXNcbiAgICAgIGlmIChjb21wb25lbnRTdHlsZS5pc1N0YXRpYyAmJiBhdHRycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRTdHlsZS5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyhTVEFUSUNfRVhFQ1VUSU9OX0NPTlRFWFQsIHN0eWxlU2hlZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGV4ZWN1dGlvbkNvbnRleHQgPSB0aGlzLmJ1aWxkRXhlY3V0aW9uQ29udGV4dCh0aGVtZSwgcHJvcHMpO1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gY29tcG9uZW50U3R5bGUuZ2VuZXJhdGVBbmRJbmplY3RTdHlsZXMoZXhlY3V0aW9uQ29udGV4dCwgc3R5bGVTaGVldCk7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FyblRvb01hbnlDbGFzc2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB3YXJuVG9vTWFueUNsYXNzZXMoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbGFzc05hbWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEJhc2VTdHlsZWRDb21wb25lbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgY29tcG9uZW50U3R5bGUgPSB0aGlzLmNvbnN0cnVjdG9yLmNvbXBvbmVudFN0eWxlO1xuXG4gICAgICB2YXIgc3R5bGVkQ29udGV4dCA9IHRoaXMuY29udGV4dFtDSEFOTkVMX05FWFRdO1xuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgc3RhdGljYWx5LXN0eWxlZCBjb21wb25lbnQsIHdlIGRvbid0IG5lZWQgdG8gdGhlIHRoZW1lXG4gICAgICAvLyB0byBnZW5lcmF0ZSBvciBidWlsZCBzdHlsZXMuXG4gICAgICBpZiAoY29tcG9uZW50U3R5bGUuaXNTdGF0aWMpIHtcbiAgICAgICAgdmFyIGdlbmVyYXRlZENsYXNzTmFtZSA9IHRoaXMuZ2VuZXJhdGVBbmRJbmplY3RTdHlsZXMoU1RBVElDX0VYRUNVVElPTl9DT05URVhULCB0aGlzLnByb3BzKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGdlbmVyYXRlZENsYXNzTmFtZTogZ2VuZXJhdGVkQ2xhc3NOYW1lIH0pO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHRoZW1lIGluIHRoZSBjb250ZXh0LCBzdWJzY3JpYmUgdG8gdGhlIGV2ZW50IGVtaXR0ZXIuIFRoaXNcbiAgICAgICAgLy8gaXMgbmVjZXNzYXJ5IGR1ZSB0byBwdXJlIGNvbXBvbmVudHMgYmxvY2tpbmcgY29udGV4dCB1cGRhdGVzLCB0aGlzIGNpcmN1bXZlbnRzXG4gICAgICAgIC8vIHRoYXQgYnkgdXBkYXRpbmcgd2hlbiBhbiBldmVudCBpcyBlbWl0dGVkXG4gICAgICB9IGVsc2UgaWYgKHN0eWxlZENvbnRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgc3Vic2NyaWJlID0gc3R5bGVkQ29udGV4dC5zdWJzY3JpYmU7XG5cbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUlkID0gc3Vic2NyaWJlKGZ1bmN0aW9uIChuZXh0VGhlbWUpIHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgYmUgY2FsbGVkIG9uY2UgaW1tZWRpYXRlbHlcbiAgICAgICAgICB2YXIgdGhlbWUgPSBkZXRlcm1pbmVUaGVtZShfdGhpczIucHJvcHMsIG5leHRUaGVtZSwgX3RoaXMyLmNvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyk7XG4gICAgICAgICAgdmFyIGdlbmVyYXRlZENsYXNzTmFtZSA9IF90aGlzMi5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyh0aGVtZSwgX3RoaXMyLnByb3BzKTtcblxuICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7IHRoZW1lOiB0aGVtZSwgZ2VuZXJhdGVkQ2xhc3NOYW1lOiBnZW5lcmF0ZWRDbGFzc05hbWUgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L3Byb3AtdHlwZXNcbiAgICAgICAgdmFyIHRoZW1lID0gdGhpcy5wcm9wcy50aGVtZSB8fCB7fTtcbiAgICAgICAgdmFyIF9nZW5lcmF0ZWRDbGFzc05hbWUgPSB0aGlzLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKHRoZW1lLCB0aGlzLnByb3BzKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRoZW1lOiB0aGVtZSwgZ2VuZXJhdGVkQ2xhc3NOYW1lOiBfZ2VuZXJhdGVkQ2xhc3NOYW1lIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBCYXNlU3R5bGVkQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgc3RhdGljYWx5LXN0eWxlZCBjb21wb25lbnQsIHdlIGRvbid0IG5lZWQgdG8gbGlzdGVuIHRvXG4gICAgICAvLyBwcm9wcyBjaGFuZ2VzIHRvIHVwZGF0ZSBzdHlsZXNcbiAgICAgIHZhciBjb21wb25lbnRTdHlsZSA9IHRoaXMuY29uc3RydWN0b3IuY29tcG9uZW50U3R5bGU7XG5cbiAgICAgIGlmIChjb21wb25lbnRTdHlsZS5pc1N0YXRpYykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKG9sZFN0YXRlKSB7XG4gICAgICAgIHZhciB0aGVtZSA9IGRldGVybWluZVRoZW1lKG5leHRQcm9wcywgb2xkU3RhdGUudGhlbWUsIF90aGlzMy5jb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMpO1xuICAgICAgICB2YXIgZ2VuZXJhdGVkQ2xhc3NOYW1lID0gX3RoaXMzLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKHRoZW1lLCBuZXh0UHJvcHMpO1xuXG4gICAgICAgIHJldHVybiB7IHRoZW1lOiB0aGVtZSwgZ2VuZXJhdGVkQ2xhc3NOYW1lOiBnZW5lcmF0ZWRDbGFzc05hbWUgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBCYXNlU3R5bGVkQ29tcG9uZW50LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZUZyb21Db250ZXh0KCk7XG4gICAgfTtcblxuICAgIEJhc2VTdHlsZWRDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QvcHJvcC10eXBlc1xuICAgICAgdmFyIGlubmVyUmVmID0gdGhpcy5wcm9wcy5pbm5lclJlZjtcbiAgICAgIHZhciBnZW5lcmF0ZWRDbGFzc05hbWUgPSB0aGlzLnN0YXRlLmdlbmVyYXRlZENsYXNzTmFtZTtcbiAgICAgIHZhciBfY29uc3RydWN0b3IyID0gdGhpcy5jb25zdHJ1Y3RvcixcbiAgICAgICAgICBzdHlsZWRDb21wb25lbnRJZCA9IF9jb25zdHJ1Y3RvcjIuc3R5bGVkQ29tcG9uZW50SWQsXG4gICAgICAgICAgdGFyZ2V0ID0gX2NvbnN0cnVjdG9yMi50YXJnZXQ7XG5cblxuICAgICAgdmFyIGlzVGFyZ2V0VGFnID0gaXNUYWcodGFyZ2V0KTtcblxuICAgICAgdmFyIGNsYXNzTmFtZSA9IFtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9wcm9wLXR5cGVzXG4gICAgICB0aGlzLnByb3BzLmNsYXNzTmFtZSwgc3R5bGVkQ29tcG9uZW50SWQsIHRoaXMuYXR0cnMuY2xhc3NOYW1lLCBnZW5lcmF0ZWRDbGFzc05hbWVdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyk7XG5cbiAgICAgIHZhciBiYXNlUHJvcHMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5hdHRycywge1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc1N0eWxlZENvbXBvbmVudCh0YXJnZXQpKSB7XG4gICAgICAgIGJhc2VQcm9wcy5pbm5lclJlZiA9IGlubmVyUmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmFzZVByb3BzLnJlZiA9IGlubmVyUmVmO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvcHNGb3JFbGVtZW50ID0gT2JqZWN0LmtleXModGhpcy5wcm9wcykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3BOYW1lKSB7XG4gICAgICAgIC8vIERvbid0IHBhc3MgdGhyb3VnaCBub24gSFRNTCB0YWdzIHRocm91Z2ggdG8gSFRNTCBlbGVtZW50c1xuICAgICAgICAvLyBhbHdheXMgb21pdCBpbm5lclJlZlxuICAgICAgICBpZiAocHJvcE5hbWUgIT09ICdpbm5lclJlZicgJiYgcHJvcE5hbWUgIT09ICdjbGFzc05hbWUnICYmICghaXNUYXJnZXRUYWcgfHwgdmFsaWRBdHRyKHByb3BOYW1lKSkpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICBhY2NbcHJvcE5hbWVdID0gX3RoaXM0LnByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCBiYXNlUHJvcHMpO1xuXG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0YXJnZXQsIHByb3BzRm9yRWxlbWVudCk7XG4gICAgfTtcblxuICAgIHJldHVybiBCYXNlU3R5bGVkQ29tcG9uZW50O1xuICB9KENvbXBvbmVudCk7XG5cbiAgdmFyIGNyZWF0ZVN0eWxlZENvbXBvbmVudCA9IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlZENvbXBvbmVudCh0YXJnZXQsIG9wdGlvbnMsIHJ1bGVzKSB7XG4gICAgdmFyIF9TdHlsZWRDb21wb25lbnQkY29udDtcblxuICAgIHZhciBfb3B0aW9ucyRkaXNwbGF5TmFtZSA9IG9wdGlvbnMuZGlzcGxheU5hbWUsXG4gICAgICAgIGRpc3BsYXlOYW1lID0gX29wdGlvbnMkZGlzcGxheU5hbWUgPT09IHVuZGVmaW5lZCA/IGlzVGFnKHRhcmdldCkgPyAnc3R5bGVkLicgKyB0YXJnZXQgOiAnU3R5bGVkKCcgKyBnZXRDb21wb25lbnROYW1lKHRhcmdldCkgKyAnKScgOiBfb3B0aW9ucyRkaXNwbGF5TmFtZSxcbiAgICAgICAgX29wdGlvbnMkY29tcG9uZW50SWQgPSBvcHRpb25zLmNvbXBvbmVudElkLFxuICAgICAgICBjb21wb25lbnRJZCA9IF9vcHRpb25zJGNvbXBvbmVudElkID09PSB1bmRlZmluZWQgPyBnZW5lcmF0ZUlkKG9wdGlvbnMuZGlzcGxheU5hbWUsIG9wdGlvbnMucGFyZW50Q29tcG9uZW50SWQpIDogX29wdGlvbnMkY29tcG9uZW50SWQsXG4gICAgICAgIF9vcHRpb25zJFBhcmVudENvbXBvbiA9IG9wdGlvbnMuUGFyZW50Q29tcG9uZW50LFxuICAgICAgICBQYXJlbnRDb21wb25lbnQgPSBfb3B0aW9ucyRQYXJlbnRDb21wb24gPT09IHVuZGVmaW5lZCA/IEJhc2VTdHlsZWRDb21wb25lbnQgOiBfb3B0aW9ucyRQYXJlbnRDb21wb24sXG4gICAgICAgIGV4dGVuZGluZ1J1bGVzID0gb3B0aW9ucy5ydWxlcyxcbiAgICAgICAgYXR0cnMgPSBvcHRpb25zLmF0dHJzO1xuXG5cbiAgICB2YXIgc3R5bGVkQ29tcG9uZW50SWQgPSBvcHRpb25zLmRpc3BsYXlOYW1lICYmIG9wdGlvbnMuY29tcG9uZW50SWQgPyBlc2NhcGUob3B0aW9ucy5kaXNwbGF5TmFtZSkgKyAnLScgKyBvcHRpb25zLmNvbXBvbmVudElkIDogY29tcG9uZW50SWQ7XG5cbiAgICB2YXIgY29tcG9uZW50U3R5bGUgPSBuZXcgQ29tcG9uZW50U3R5bGUoZXh0ZW5kaW5nUnVsZXMgPT09IHVuZGVmaW5lZCA/IHJ1bGVzIDogZXh0ZW5kaW5nUnVsZXMuY29uY2F0KHJ1bGVzKSwgYXR0cnMsIHN0eWxlZENvbXBvbmVudElkKTtcblxuICAgIHZhciBTdHlsZWRDb21wb25lbnQgPSBmdW5jdGlvbiAoX1BhcmVudENvbXBvbmVudCkge1xuICAgICAgaW5oZXJpdHMoU3R5bGVkQ29tcG9uZW50LCBfUGFyZW50Q29tcG9uZW50KTtcblxuICAgICAgZnVuY3Rpb24gU3R5bGVkQ29tcG9uZW50KCkge1xuICAgICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBTdHlsZWRDb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfUGFyZW50Q29tcG9uZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgICAgfVxuXG4gICAgICBTdHlsZWRDb21wb25lbnQud2l0aENvbXBvbmVudCA9IGZ1bmN0aW9uIHdpdGhDb21wb25lbnQodGFnKSB7XG4gICAgICAgIHZhciBwcmV2aW91c0NvbXBvbmVudElkID0gb3B0aW9ucy5jb21wb25lbnRJZCxcbiAgICAgICAgICAgIG9wdGlvbnNUb0NvcHkgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhvcHRpb25zLCBbJ2NvbXBvbmVudElkJ10pO1xuXG5cbiAgICAgICAgdmFyIG5ld0NvbXBvbmVudElkID0gcHJldmlvdXNDb21wb25lbnRJZCAmJiBwcmV2aW91c0NvbXBvbmVudElkICsgJy0nICsgKGlzVGFnKHRhZykgPyB0YWcgOiBlc2NhcGUoZ2V0Q29tcG9uZW50TmFtZSh0YWcpKSk7XG5cbiAgICAgICAgdmFyIG5ld09wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgb3B0aW9uc1RvQ29weSwge1xuICAgICAgICAgIGNvbXBvbmVudElkOiBuZXdDb21wb25lbnRJZCxcbiAgICAgICAgICBQYXJlbnRDb21wb25lbnQ6IFN0eWxlZENvbXBvbmVudFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY3JlYXRlU3R5bGVkQ29tcG9uZW50KHRhZywgbmV3T3B0aW9ucywgcnVsZXMpO1xuICAgICAgfTtcblxuICAgICAgY3JlYXRlQ2xhc3MoU3R5bGVkQ29tcG9uZW50LCBudWxsLCBbe1xuICAgICAgICBrZXk6ICdleHRlbmQnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgICAgICB2YXIgcnVsZXNGcm9tT3B0aW9ucyA9IG9wdGlvbnMucnVsZXMsXG4gICAgICAgICAgICAgIHBhcmVudENvbXBvbmVudElkID0gb3B0aW9ucy5jb21wb25lbnRJZCxcbiAgICAgICAgICAgICAgb3B0aW9uc1RvQ29weSA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9wdGlvbnMsIFsncnVsZXMnLCAnY29tcG9uZW50SWQnXSk7XG5cblxuICAgICAgICAgIHZhciBuZXdSdWxlcyA9IHJ1bGVzRnJvbU9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IHJ1bGVzIDogcnVsZXNGcm9tT3B0aW9ucy5jb25jYXQocnVsZXMpO1xuXG4gICAgICAgICAgdmFyIG5ld09wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgb3B0aW9uc1RvQ29weSwge1xuICAgICAgICAgICAgcnVsZXM6IG5ld1J1bGVzLFxuICAgICAgICAgICAgcGFyZW50Q29tcG9uZW50SWQ6IHBhcmVudENvbXBvbmVudElkLFxuICAgICAgICAgICAgUGFyZW50Q29tcG9uZW50OiBTdHlsZWRDb21wb25lbnRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3RXaXRoT3B0aW9ucyhjcmVhdGVTdHlsZWRDb21wb25lbnQsIHRhcmdldCwgbmV3T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1dKTtcbiAgICAgIHJldHVybiBTdHlsZWRDb21wb25lbnQ7XG4gICAgfShQYXJlbnRDb21wb25lbnQpO1xuXG4gICAgU3R5bGVkQ29tcG9uZW50LmNvbnRleHRUeXBlcyA9IChfU3R5bGVkQ29tcG9uZW50JGNvbnQgPSB7fSwgX1N0eWxlZENvbXBvbmVudCRjb250W0NIQU5ORUxdID0gUHJvcFR5cGVzLmZ1bmMsIF9TdHlsZWRDb21wb25lbnQkY29udFtDSEFOTkVMX05FWFRdID0gQ09OVEVYVF9DSEFOTkVMX1NIQVBFLCBfU3R5bGVkQ29tcG9uZW50JGNvbnRbQ09OVEVYVF9LRVldID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmluc3RhbmNlT2YoU3R5bGVTaGVldCksIFByb3BUeXBlcy5pbnN0YW5jZU9mKFNlcnZlclN0eWxlU2hlZXQpXSksIF9TdHlsZWRDb21wb25lbnQkY29udCk7XG4gICAgU3R5bGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gICAgU3R5bGVkQ29tcG9uZW50LnN0eWxlZENvbXBvbmVudElkID0gc3R5bGVkQ29tcG9uZW50SWQ7XG4gICAgU3R5bGVkQ29tcG9uZW50LmF0dHJzID0gYXR0cnM7XG4gICAgU3R5bGVkQ29tcG9uZW50LmNvbXBvbmVudFN0eWxlID0gY29tcG9uZW50U3R5bGU7XG4gICAgU3R5bGVkQ29tcG9uZW50LnRhcmdldCA9IHRhcmdldDtcblxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFN0eWxlZENvbXBvbmVudC53YXJuVG9vTWFueUNsYXNzZXMgPSBjcmVhdGVXYXJuVG9vTWFueUNsYXNzZXMoZGlzcGxheU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBTdHlsZWRDb21wb25lbnQ7XG4gIH07XG5cbiAgcmV0dXJuIGNyZWF0ZVN0eWxlZENvbXBvbmVudDtcbn0pO1xuXG4vLyBtdXJtdXJoYXNoMiB2aWEgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcmF5Y21vcmdhbi81ODg0MjNcblxuZnVuY3Rpb24gZG9IYXNoKHN0ciwgc2VlZCkge1xuICB2YXIgbSA9IDB4NWJkMWU5OTU7XG4gIHZhciByID0gMjQ7XG4gIHZhciBoID0gc2VlZCBeIHN0ci5sZW5ndGg7XG4gIHZhciBsZW5ndGggPSBzdHIubGVuZ3RoO1xuICB2YXIgY3VycmVudEluZGV4ID0gMDtcblxuICB3aGlsZSAobGVuZ3RoID49IDQpIHtcbiAgICB2YXIgayA9IFVJbnQzMihzdHIsIGN1cnJlbnRJbmRleCk7XG5cbiAgICBrID0gVW11bDMyKGssIG0pO1xuICAgIGsgXj0gayA+Pj4gcjtcbiAgICBrID0gVW11bDMyKGssIG0pO1xuXG4gICAgaCA9IFVtdWwzMihoLCBtKTtcbiAgICBoIF49IGs7XG5cbiAgICBjdXJyZW50SW5kZXggKz0gNDtcbiAgICBsZW5ndGggLT0gNDtcbiAgfVxuXG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAzOlxuICAgICAgaCBePSBVSW50MTYoc3RyLCBjdXJyZW50SW5kZXgpO1xuICAgICAgaCBePSBzdHIuY2hhckNvZGVBdChjdXJyZW50SW5kZXggKyAyKSA8PCAxNjtcbiAgICAgIGggPSBVbXVsMzIoaCwgbSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMjpcbiAgICAgIGggXj0gVUludDE2KHN0ciwgY3VycmVudEluZGV4KTtcbiAgICAgIGggPSBVbXVsMzIoaCwgbSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMTpcbiAgICAgIGggXj0gc3RyLmNoYXJDb2RlQXQoY3VycmVudEluZGV4KTtcbiAgICAgIGggPSBVbXVsMzIoaCwgbSk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGggXj0gaCA+Pj4gMTM7XG4gIGggPSBVbXVsMzIoaCwgbSk7XG4gIGggXj0gaCA+Pj4gMTU7XG5cbiAgcmV0dXJuIGggPj4+IDA7XG59XG5cbmZ1bmN0aW9uIFVJbnQzMihzdHIsIHBvcykge1xuICByZXR1cm4gc3RyLmNoYXJDb2RlQXQocG9zKyspICsgKHN0ci5jaGFyQ29kZUF0KHBvcysrKSA8PCA4KSArIChzdHIuY2hhckNvZGVBdChwb3MrKykgPDwgMTYpICsgKHN0ci5jaGFyQ29kZUF0KHBvcykgPDwgMjQpO1xufVxuXG5mdW5jdGlvbiBVSW50MTYoc3RyLCBwb3MpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQ29kZUF0KHBvcysrKSArIChzdHIuY2hhckNvZGVBdChwb3MrKykgPDwgOCk7XG59XG5cbmZ1bmN0aW9uIFVtdWwzMihuLCBtKSB7XG4gIG4gPSBuIHwgMDtcbiAgbSA9IG0gfCAwO1xuICB2YXIgbmxvID0gbiAmIDB4ZmZmZjtcbiAgdmFyIG5oaSA9IG4gPj4+IDE2O1xuICB2YXIgcmVzID0gbmxvICogbSArICgobmhpICogbSAmIDB4ZmZmZikgPDwgMTYpIHwgMDtcbiAgcmV0dXJuIHJlcztcbn1cblxuLy8gICAgICBcbnZhciBpc1N0YXRpY1J1bGVzID0gZnVuY3Rpb24gaXNTdGF0aWNSdWxlcyhydWxlcywgYXR0cnMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHZhciBydWxlID0gcnVsZXNbaV07XG5cbiAgICAvLyByZWN1cnNpdmUgY2FzZVxuICAgIGlmIChBcnJheS5pc0FycmF5KHJ1bGUpICYmICFpc1N0YXRpY1J1bGVzKHJ1bGUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhaXNTdHlsZWRDb21wb25lbnQocnVsZSkpIHtcbiAgICAgIC8vIGZ1bmN0aW9ucyBhcmUgYWxsb3dlZCB0byBiZSBzdGF0aWMgaWYgdGhleSdyZSBqdXN0IGJlaW5nXG4gICAgICAvLyB1c2VkIHRvIGdldCB0aGUgY2xhc3NuYW1lIG9mIGEgbmVzdGVkIHN0eWxlZCBjb3Btb25lbnRcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXR0cnMgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBndWFyZC1mb3ItaW4sIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgZm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhdHRyc1trZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG52YXIgaXNIUk1FbmFibGVkID0gdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmhvdCAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG4vKlxuIENvbXBvbmVudFN0eWxlIGlzIGFsbCB0aGUgQ1NTLXNwZWNpZmljIHN0dWZmLCBub3RcbiB0aGUgUmVhY3Qtc3BlY2lmaWMgc3R1ZmYuXG4gKi9cbnZhciBfQ29tcG9uZW50U3R5bGUgPSAoZnVuY3Rpb24gKG5hbWVHZW5lcmF0b3IsIGZsYXR0ZW4sIHN0cmluZ2lmeVJ1bGVzKSB7XG4gIHZhciBDb21wb25lbnRTdHlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21wb25lbnRTdHlsZShydWxlcywgYXR0cnMsIGNvbXBvbmVudElkKSB7XG4gICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBDb21wb25lbnRTdHlsZSk7XG5cbiAgICAgIHRoaXMucnVsZXMgPSBydWxlcztcbiAgICAgIHRoaXMuaXNTdGF0aWMgPSAhaXNIUk1FbmFibGVkICYmIGlzU3RhdGljUnVsZXMocnVsZXMsIGF0dHJzKTtcbiAgICAgIHRoaXMuY29tcG9uZW50SWQgPSBjb21wb25lbnRJZDtcbiAgICAgIGlmICghU3R5bGVTaGVldC5pbnN0YW5jZS5oYXNJbmplY3RlZENvbXBvbmVudCh0aGlzLmNvbXBvbmVudElkKSkge1xuICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gJy4nICsgY29tcG9uZW50SWQgKyAnIHt9JyA6ICcnO1xuICAgICAgICBTdHlsZVNoZWV0Lmluc3RhbmNlLmRlZmVycmVkSW5qZWN0KGNvbXBvbmVudElkLCB0cnVlLCBwbGFjZWhvbGRlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBGbGF0dGVucyBhIHJ1bGUgc2V0IGludG8gdmFsaWQgQ1NTXG4gICAgICogSGFzaGVzIGl0LCB3cmFwcyB0aGUgd2hvbGUgY2h1bmsgaW4gYSAuaGFzaDEyMzQge31cbiAgICAgKiBSZXR1cm5zIHRoZSBoYXNoIHRvIGJlIGluamVjdGVkIG9uIHJlbmRlcigpXG4gICAgICogKi9cblxuXG4gICAgQ29tcG9uZW50U3R5bGUucHJvdG90eXBlLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzID0gZnVuY3Rpb24gZ2VuZXJhdGVBbmRJbmplY3RTdHlsZXMoZXhlY3V0aW9uQ29udGV4dCwgc3R5bGVTaGVldCkge1xuICAgICAgdmFyIGlzU3RhdGljID0gdGhpcy5pc1N0YXRpYyxcbiAgICAgICAgICBsYXN0Q2xhc3NOYW1lID0gdGhpcy5sYXN0Q2xhc3NOYW1lO1xuXG4gICAgICBpZiAoaXNTdGF0aWMgJiYgbGFzdENsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsYXN0Q2xhc3NOYW1lO1xuICAgICAgfVxuXG4gICAgICB2YXIgZmxhdENTUyA9IGZsYXR0ZW4odGhpcy5ydWxlcywgZXhlY3V0aW9uQ29udGV4dCk7XG4gICAgICB2YXIgaGFzaCA9IGRvSGFzaCh0aGlzLmNvbXBvbmVudElkICsgZmxhdENTUy5qb2luKCcnKSk7XG5cbiAgICAgIHZhciBleGlzdGluZ05hbWUgPSBzdHlsZVNoZWV0LmdldE5hbWUoaGFzaCk7XG4gICAgICBpZiAoZXhpc3RpbmdOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHN0eWxlU2hlZXQuc3R5bGVzQ2FjaGVhYmxlKSB7XG4gICAgICAgICAgdGhpcy5sYXN0Q2xhc3NOYW1lID0gZXhpc3RpbmdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleGlzdGluZ05hbWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBuYW1lID0gbmFtZUdlbmVyYXRvcihoYXNoKTtcbiAgICAgIGlmIChzdHlsZVNoZWV0LnN0eWxlc0NhY2hlYWJsZSkge1xuICAgICAgICB0aGlzLmxhc3RDbGFzc05hbWUgPSBleGlzdGluZ05hbWU7XG4gICAgICB9XG4gICAgICBpZiAoc3R5bGVTaGVldC5hbHJlYWR5SW5qZWN0ZWQoaGFzaCwgbmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBjc3MgPSAnXFxuJyArIHN0cmluZ2lmeVJ1bGVzKGZsYXRDU1MsICcuJyArIG5hbWUpO1xuICAgICAgLy8gTk9URTogdGhpcyBjYW4gb25seSBiZSBzZXQgd2hlbiB3ZSBpbmplY3QgdGhlIGNsYXNzLW5hbWUuXG4gICAgICAvLyBGb3Igc29tZSByZWFzb24sIHByZXN1bWFibHkgZHVlIHRvIGhvdyBjc3MgaXMgc3RyaW5naWZ5UnVsZXMgYmVoYXZlcyBpblxuICAgICAgLy8gZGlmZmVyZW50bHkgYmV0d2VlbiBjbGllbnQgYW5kIHNlcnZlciwgc3R5bGVzIGJyZWFrLlxuICAgICAgc3R5bGVTaGVldC5pbmplY3QodGhpcy5jb21wb25lbnRJZCwgdHJ1ZSwgY3NzLCBoYXNoLCBuYW1lKTtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG5cbiAgICBDb21wb25lbnRTdHlsZS5nZW5lcmF0ZU5hbWUgPSBmdW5jdGlvbiBnZW5lcmF0ZU5hbWUoc3RyKSB7XG4gICAgICByZXR1cm4gbmFtZUdlbmVyYXRvcihkb0hhc2goc3RyKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBDb21wb25lbnRTdHlsZTtcbiAgfSgpO1xuXG4gIHJldHVybiBDb21wb25lbnRTdHlsZTtcbn0pO1xuXG4vLyAgICAgIFxuLy8gVGhhbmtzIHRvIFJlYWN0RE9NRmFjdG9yaWVzIGZvciB0aGlzIGhhbmR5IGxpc3QhXG5cbnZhciBkb21FbGVtZW50cyA9IFsnYScsICdhYmJyJywgJ2FkZHJlc3MnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJywgJ2InLCAnYmFzZScsICdiZGknLCAnYmRvJywgJ2JpZycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGlhbG9nJywgJ2RpdicsICdkbCcsICdkdCcsICdlbScsICdlbWJlZCcsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2lmcmFtZScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2tiZCcsICdrZXlnZW4nLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ2xpbmsnLCAnbWFpbicsICdtYXAnLCAnbWFyaycsICdtYXJxdWVlJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0YScsICdtZXRlcicsICduYXYnLCAnbm9zY3JpcHQnLCAnb2JqZWN0JywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwYXJhbScsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NjcmlwdCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhbicsICdzdHJvbmcnLCAnc3R5bGUnLCAnc3ViJywgJ3N1bW1hcnknLCAnc3VwJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndGl0bGUnLCAndHInLCAndHJhY2snLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJyxcblxuLy8gU1ZHXG4nY2lyY2xlJywgJ2NsaXBQYXRoJywgJ2RlZnMnLCAnZWxsaXBzZScsICdnJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyR3JhZGllbnQnLCAnbWFzaycsICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxHcmFkaWVudCcsICdyZWN0JywgJ3N0b3AnLCAnc3ZnJywgJ3RleHQnLCAndHNwYW4nXTtcblxuLy8gICAgICBcblxudmFyIF9zdHlsZWQgPSAoZnVuY3Rpb24gKHN0eWxlZENvbXBvbmVudCwgY29uc3RydWN0V2l0aE9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlZCA9IGZ1bmN0aW9uIHN0eWxlZCh0YWcpIHtcbiAgICByZXR1cm4gY29uc3RydWN0V2l0aE9wdGlvbnMoc3R5bGVkQ29tcG9uZW50LCB0YWcpO1xuICB9O1xuXG4gIC8vIFNob3J0aGFuZHMgZm9yIGFsbCB2YWxpZCBIVE1MIEVsZW1lbnRzXG4gIGRvbUVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGRvbUVsZW1lbnQpIHtcbiAgICBzdHlsZWRbZG9tRWxlbWVudF0gPSBzdHlsZWQoZG9tRWxlbWVudCk7XG4gIH0pO1xuXG4gIHJldHVybiBzdHlsZWQ7XG59KTtcblxuLy8gICAgICBcbnZhciByZXBsYWNlV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2VXaGl0ZXNwYWNlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcc3xcXFxcbi9nLCAnJyk7XG59O1xuXG52YXIgX2tleWZyYW1lcyA9IChmdW5jdGlvbiAobmFtZUdlbmVyYXRvciwgc3RyaW5naWZ5UnVsZXMsIGNzcykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZ3MpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgaW50ZXJwb2xhdGlvbnMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBpbnRlcnBvbGF0aW9uc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIHJ1bGVzID0gY3NzLmFwcGx5KHVuZGVmaW5lZCwgW3N0cmluZ3NdLmNvbmNhdChpbnRlcnBvbGF0aW9ucykpO1xuICAgIHZhciBoYXNoID0gZG9IYXNoKHJlcGxhY2VXaGl0ZXNwYWNlKEpTT04uc3RyaW5naWZ5KHJ1bGVzKSkpO1xuXG4gICAgdmFyIGV4aXN0aW5nTmFtZSA9IFN0eWxlU2hlZXQuaW5zdGFuY2UuZ2V0TmFtZShoYXNoKTtcbiAgICBpZiAoZXhpc3RpbmdOYW1lKSByZXR1cm4gZXhpc3RpbmdOYW1lO1xuXG4gICAgdmFyIG5hbWUgPSBuYW1lR2VuZXJhdG9yKGhhc2gpO1xuICAgIGlmIChTdHlsZVNoZWV0Lmluc3RhbmNlLmFscmVhZHlJbmplY3RlZChoYXNoLCBuYW1lKSkgcmV0dXJuIG5hbWU7XG5cbiAgICB2YXIgZ2VuZXJhdGVkQ1NTID0gc3RyaW5naWZ5UnVsZXMocnVsZXMsIG5hbWUsICdAa2V5ZnJhbWVzJyk7XG4gICAgU3R5bGVTaGVldC5pbnN0YW5jZS5pbmplY3QoJ3NjLWtleWZyYW1lcy0nICsgbmFtZSwgdHJ1ZSwgZ2VuZXJhdGVkQ1NTLCBoYXNoLCBuYW1lKTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcbn0pO1xuXG4vLyAgICAgIFxudmFyIF9pbmplY3RHbG9iYWwgPSAoZnVuY3Rpb24gKHN0cmluZ2lmeVJ1bGVzLCBjc3MpIHtcbiAgdmFyIGluamVjdEdsb2JhbCA9IGZ1bmN0aW9uIGluamVjdEdsb2JhbChzdHJpbmdzKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGludGVycG9sYXRpb25zID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgaW50ZXJwb2xhdGlvbnNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBydWxlcyA9IGNzcy5hcHBseSh1bmRlZmluZWQsIFtzdHJpbmdzXS5jb25jYXQoaW50ZXJwb2xhdGlvbnMpKTtcbiAgICB2YXIgaGFzaCA9IGRvSGFzaChKU09OLnN0cmluZ2lmeShydWxlcykpO1xuXG4gICAgdmFyIGNvbXBvbmVudElkID0gJ3NjLWdsb2JhbC0nICsgaGFzaDtcbiAgICBpZiAoU3R5bGVTaGVldC5pbnN0YW5jZS5oYXNJbmplY3RlZENvbXBvbmVudChjb21wb25lbnRJZCkpIHJldHVybjtcblxuICAgIFN0eWxlU2hlZXQuaW5zdGFuY2UuaW5qZWN0KGNvbXBvbmVudElkLCBmYWxzZSwgc3RyaW5naWZ5UnVsZXMocnVsZXMpKTtcbiAgfTtcblxuICByZXR1cm4gaW5qZWN0R2xvYmFsO1xufSk7XG5cbi8vICAgICAgXG5cblxudmFyIF9jb25zdHJ1Y3RXaXRoT3B0aW9ucyA9IChmdW5jdGlvbiAoY3NzKSB7XG4gIHZhciBjb25zdHJ1Y3RXaXRoT3B0aW9ucyA9IGZ1bmN0aW9uIGNvbnN0cnVjdFdpdGhPcHRpb25zKGNvbXBvbmVudENvbnN0cnVjdG9yLCB0YWcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgdGFnICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdGFnICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyAkRmxvd0ludmFsaWRJbnB1dFRlc3RcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNyZWF0ZSBzdHlsZWQtY29tcG9uZW50IGZvciBjb21wb25lbnQ6ICcgKyB0YWcpO1xuICAgIH1cblxuICAgIC8qIFRoaXMgaXMgY2FsbGFibGUgZGlyZWN0bHkgYXMgYSB0ZW1wbGF0ZSBmdW5jdGlvbiAqL1xuICAgIHZhciB0ZW1wbGF0ZUZ1bmN0aW9uID0gZnVuY3Rpb24gdGVtcGxhdGVGdW5jdGlvbihzdHJpbmdzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgaW50ZXJwb2xhdGlvbnMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGludGVycG9sYXRpb25zW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbXBvbmVudENvbnN0cnVjdG9yKHRhZywgb3B0aW9ucywgY3NzLmFwcGx5KHVuZGVmaW5lZCwgW3N0cmluZ3NdLmNvbmNhdChpbnRlcnBvbGF0aW9ucykpKTtcbiAgICB9O1xuXG4gICAgLyogSWYgY29uZmlnIG1ldGhvZHMgYXJlIGNhbGxlZCwgd3JhcCB1cCBhIG5ldyB0ZW1wbGF0ZSBmdW5jdGlvbiBhbmQgbWVyZ2Ugb3B0aW9ucyAqL1xuICAgIHRlbXBsYXRlRnVuY3Rpb24ud2l0aENvbmZpZyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RXaXRoT3B0aW9ucyhjb21wb25lbnRDb25zdHJ1Y3RvciwgdGFnLCBfZXh0ZW5kcyh7fSwgb3B0aW9ucywgY29uZmlnKSk7XG4gICAgfTtcbiAgICB0ZW1wbGF0ZUZ1bmN0aW9uLmF0dHJzID0gZnVuY3Rpb24gKGF0dHJzKSB7XG4gICAgICByZXR1cm4gY29uc3RydWN0V2l0aE9wdGlvbnMoY29tcG9uZW50Q29uc3RydWN0b3IsIHRhZywgX2V4dGVuZHMoe30sIG9wdGlvbnMsIHtcbiAgICAgICAgYXR0cnM6IF9leHRlbmRzKHt9LCBvcHRpb25zLmF0dHJzIHx8IHt9LCBhdHRycylcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlRnVuY3Rpb247XG4gIH07XG5cbiAgcmV0dXJuIGNvbnN0cnVjdFdpdGhPcHRpb25zO1xufSk7XG5cbi8vICAgICAgXG4vKiBnbG9iYWxzIFJlYWN0Q2xhc3MgKi9cblxudmFyIHdyYXBXaXRoVGhlbWUgPSBmdW5jdGlvbiB3cmFwV2l0aFRoZW1lKENvbXBvbmVudCQkMSkge1xuICB2YXIgX1dpdGhUaGVtZSRjb250ZXh0VHlwO1xuXG4gIHZhciBjb21wb25lbnROYW1lID0gQ29tcG9uZW50JCQxLmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudCQkMS5uYW1lIHx8ICdDb21wb25lbnQnO1xuXG4gIHZhciBzaG91bGRTZXRJbm5lclJlZiA9IGlzU3R5bGVkQ29tcG9uZW50KENvbXBvbmVudCQkMSkgfHxcbiAgLy8gTk9URTogV2UgY2FuJ3QgcGFzcyBhIHJlZiB0byBhIHN0YXRlbGVzcyBmdW5jdGlvbmFsIGNvbXBvbmVudFxuICB0eXBlb2YgQ29tcG9uZW50JCQxID09PSAnZnVuY3Rpb24nICYmICEoQ29tcG9uZW50JCQxLnByb3RvdHlwZSAmJiAnaXNSZWFjdENvbXBvbmVudCcgaW4gQ29tcG9uZW50JCQxLnByb3RvdHlwZSk7XG5cbiAgdmFyIFdpdGhUaGVtZSA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgaW5oZXJpdHMoV2l0aFRoZW1lLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFdpdGhUaGVtZSgpIHtcbiAgICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFdpdGhUaGVtZSk7XG5cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfUmVhY3QkQ29tcG9uZW50LmNhbGwuYXBwbHkoX1JlYWN0JENvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLnN0YXRlID0ge30sIF90aGlzLnVuc3Vic2NyaWJlSWQgPSAtMSwgX3RlbXApLCBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgICB9XG5cbiAgICAvLyBOT1RFOiBUaGlzIGlzIHNvIHRoYXQgaXNTdHlsZWRDb21wb25lbnQgcGFzc2VzIGZvciB0aGUgaW5uZXJSZWYgdW53cmFwcGluZ1xuXG5cbiAgICBXaXRoVGhlbWUucHJvdG90eXBlLmNvbXBvbmVudFdpbGxNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgZGVmYXVsdFByb3BzID0gdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHM7XG5cbiAgICAgIHZhciBzdHlsZWRDb250ZXh0ID0gdGhpcy5jb250ZXh0W0NIQU5ORUxfTkVYVF07XG4gICAgICB2YXIgdGhlbWVQcm9wID0gZGV0ZXJtaW5lVGhlbWUodGhpcy5wcm9wcywgdW5kZWZpbmVkLCBkZWZhdWx0UHJvcHMpO1xuICAgICAgaWYgKHN0eWxlZENvbnRleHQgPT09IHVuZGVmaW5lZCAmJiB0aGVtZVByb3AgPT09IHVuZGVmaW5lZCAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybignW3dpdGhUaGVtZV0gWW91IGFyZSBub3QgdXNpbmcgYSBUaGVtZVByb3ZpZGVyIG5vciBwYXNzaW5nIGEgdGhlbWUgcHJvcCBvciBhIHRoZW1lIGluIGRlZmF1bHRQcm9wcycpO1xuICAgICAgfSBlbHNlIGlmIChzdHlsZWRDb250ZXh0ID09PSB1bmRlZmluZWQgJiYgdGhlbWVQcm9wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRoZW1lOiB0aGVtZVByb3AgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc3Vic2NyaWJlID0gc3R5bGVkQ29udGV4dC5zdWJzY3JpYmU7XG5cbiAgICAgICAgdGhpcy51bnN1YnNjcmliZUlkID0gc3Vic2NyaWJlKGZ1bmN0aW9uIChuZXh0VGhlbWUpIHtcbiAgICAgICAgICB2YXIgdGhlbWUgPSBkZXRlcm1pbmVUaGVtZShfdGhpczIucHJvcHMsIG5leHRUaGVtZSwgZGVmYXVsdFByb3BzKTtcbiAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoeyB0aGVtZTogdGhlbWUgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBXaXRoVGhlbWUucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgdmFyIGRlZmF1bHRQcm9wcyA9IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdFByb3BzO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uIChvbGRTdGF0ZSkge1xuICAgICAgICB2YXIgdGhlbWUgPSBkZXRlcm1pbmVUaGVtZShuZXh0UHJvcHMsIG9sZFN0YXRlLnRoZW1lLCBkZWZhdWx0UHJvcHMpO1xuXG4gICAgICAgIHJldHVybiB7IHRoZW1lOiB0aGVtZSB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIFdpdGhUaGVtZS5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlSWQgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuY29udGV4dFtDSEFOTkVMX05FWFRdLnVuc3Vic2NyaWJlKHRoaXMudW5zdWJzY3JpYmVJZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFdpdGhUaGVtZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L3Byb3AtdHlwZXNcbiAgICAgIHZhciBpbm5lclJlZiA9IHRoaXMucHJvcHMuaW5uZXJSZWY7XG4gICAgICB2YXIgdGhlbWUgPSB0aGlzLnN0YXRlLnRoZW1lO1xuXG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCQkMSwgX2V4dGVuZHMoe1xuICAgICAgICB0aGVtZTogdGhlbWVcbiAgICAgIH0sIHRoaXMucHJvcHMsIHtcbiAgICAgICAgaW5uZXJSZWY6IHNob3VsZFNldElubmVyUmVmID8gaW5uZXJSZWYgOiB1bmRlZmluZWQsXG4gICAgICAgIHJlZjogc2hvdWxkU2V0SW5uZXJSZWYgPyB1bmRlZmluZWQgOiBpbm5lclJlZlxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gV2l0aFRoZW1lO1xuICB9KFJlYWN0LkNvbXBvbmVudCk7XG5cbiAgV2l0aFRoZW1lLmRpc3BsYXlOYW1lID0gJ1dpdGhUaGVtZSgnICsgY29tcG9uZW50TmFtZSArICcpJztcbiAgV2l0aFRoZW1lLnN0eWxlZENvbXBvbmVudElkID0gJ3dpdGhUaGVtZSc7XG4gIFdpdGhUaGVtZS5jb250ZXh0VHlwZXMgPSAoX1dpdGhUaGVtZSRjb250ZXh0VHlwID0ge30sIF9XaXRoVGhlbWUkY29udGV4dFR5cFtDSEFOTkVMXSA9IFByb3BUeXBlcy5mdW5jLCBfV2l0aFRoZW1lJGNvbnRleHRUeXBbQ0hBTk5FTF9ORVhUXSA9IENPTlRFWFRfQ0hBTk5FTF9TSEFQRSwgX1dpdGhUaGVtZSRjb250ZXh0VHlwKTtcblxuXG4gIHJldHVybiBob2lzdFN0YXRpY3MoV2l0aFRoZW1lLCBDb21wb25lbnQkJDEpO1xufTtcblxuLy8gICAgICBcblxuLyogSW1wb3J0IHNpbmdsZXRvbnMgKi9cbi8qIEltcG9ydCBzaW5nbGV0b24gY29uc3RydWN0b3JzICovXG4vKiBJbXBvcnQgY29tcG9uZW50cyAqL1xuLyogSW1wb3J0IEhpZ2hlciBPcmRlciBDb21wb25lbnRzICovXG4vKiBJbnN0YW50aWF0ZSBzaW5nbGV0b25zICovXG52YXIgQ29tcG9uZW50U3R5bGUgPSBfQ29tcG9uZW50U3R5bGUoZ2VuZXJhdGVBbHBoYWJldGljTmFtZSwgZmxhdHRlbiwgc3RyaW5naWZ5UnVsZXMpO1xudmFyIGNvbnN0cnVjdFdpdGhPcHRpb25zID0gX2NvbnN0cnVjdFdpdGhPcHRpb25zKGNzcyk7XG52YXIgU3R5bGVkQ29tcG9uZW50ID0gX1N0eWxlZENvbXBvbmVudChDb21wb25lbnRTdHlsZSwgY29uc3RydWN0V2l0aE9wdGlvbnMpO1xuXG4vKiBJbnN0YW50aWF0ZSBleHBvcnRlZCBzaW5nbGV0b25zICovXG52YXIga2V5ZnJhbWVzID0gX2tleWZyYW1lcyhnZW5lcmF0ZUFscGhhYmV0aWNOYW1lLCBzdHJpbmdpZnlSdWxlcywgY3NzKTtcbnZhciBpbmplY3RHbG9iYWwgPSBfaW5qZWN0R2xvYmFsKHN0cmluZ2lmeVJ1bGVzLCBjc3MpO1xudmFyIHN0eWxlZCA9IF9zdHlsZWQoU3R5bGVkQ29tcG9uZW50LCBjb25zdHJ1Y3RXaXRoT3B0aW9ucyk7XG5cbmV4cG9ydCB7IGNzcywga2V5ZnJhbWVzLCBpbmplY3RHbG9iYWwsIFRoZW1lUHJvdmlkZXIsIHdyYXBXaXRoVGhlbWUgYXMgd2l0aFRoZW1lLCBTZXJ2ZXJTdHlsZVNoZWV0LCBTdHlsZVNoZWV0TWFuYWdlciB9O2V4cG9ydCBkZWZhdWx0IHN0eWxlZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlZC1jb21wb25lbnRzL2Rpc3Qvc3R5bGVkLWNvbXBvbmVudHMuZXMuanNcbi8vIG1vZHVsZSBpZCA9IDM5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgNSIsIi8qIVxuICogaXMtcGxhaW4tb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1wbGFpbi1vYmplY3Q+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTcsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnaXNvYmplY3QnKTtcblxuZnVuY3Rpb24gaXNPYmplY3RPYmplY3Qobykge1xuICByZXR1cm4gaXNPYmplY3QobykgPT09IHRydWVcbiAgICAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qobykge1xuICB2YXIgY3Rvcixwcm90O1xuXG4gIGlmIChpc09iamVjdE9iamVjdChvKSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiBoYXMgbW9kaWZpZWQgY29uc3RydWN0b3JcbiAgY3RvciA9IG8uY29uc3RydWN0b3I7XG4gIGlmICh0eXBlb2YgY3RvciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIGhhcyBtb2RpZmllZCBwcm90b3R5cGVcbiAgcHJvdCA9IGN0b3IucHJvdG90eXBlO1xuICBpZiAoaXNPYmplY3RPYmplY3QocHJvdCkgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgY29uc3RydWN0b3IgZG9lcyBub3QgaGF2ZSBhbiBPYmplY3Qtc3BlY2lmaWMgbWV0aG9kXG4gIGlmIChwcm90Lmhhc093blByb3BlcnR5KCdpc1Byb3RvdHlwZU9mJykgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gTW9zdCBsaWtlbHkgYSBwbGFpbiBPYmplY3RcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaXMtcGxhaW4tb2JqZWN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDUiLCIvKiFcbiAqIGlzb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pc29iamVjdD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNywgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheSh2YWwpID09PSBmYWxzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pc29iamVjdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSA1IiwiLypcbiAqICAgICAgICAgIF9fICAgICAgICBfX19cbiAqICAgIF9fX19fLyAvX19fICBfXy8gKF8pX19fX1xuICogICAvIF9fXy8gX18vIC8gLyAvIC8gLyBfX18vXG4gKiAgKF9fICApIC9fLyAvXy8gLyAvIChfXyAgKVxuICogL19fX18vXFxfXy9cXF9fLCAvXy9fL19fX18vXG4gKiAgICAgICAgICAvX19fXy9cbiAqXG4gKiBsaWdodCAtIHdlaWdodCBjc3MgcHJlcHJvY2Vzc29yIEBsaWNlbmNlIE1JVFxuICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHsvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyAobW9kdWxlWydleHBvcnRzJ10gPSBmYWN0b3J5KG51bGwpKSA6XG5cdFx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddID8gZGVmaW5lKGZhY3RvcnkobnVsbCkpIDpcblx0XHRcdCh3aW5kb3dbJ3N0eWxpcyddID0gZmFjdG9yeShudWxsKSlcbn0oLyoqIEBwYXJhbSB7Kj19IG9wdGlvbnMgKi9mdW5jdGlvbiBmYWN0b3J5IChvcHRpb25zKSB7LyogZXNsaW50LWRpc2FibGUgKi9cblxuXHQndXNlIHN0cmljdCdcblxuXHQvKipcblx0ICogTm90ZXNcblx0ICpcblx0ICogVGhlIFsnPG1ldGhvZCBuYW1lPiddIHBhdHRlcm4gaXMgdXNlZCB0byBzdXBwb3J0IGNsb3N1cmUgY29tcGlsZXJcblx0ICogdGhlIGpzZG9jIHNpZ25hdHVyZXMgYXJlIGFsc28gdXNlZCB0byB0aGUgc2FtZSBlZmZlY3Rcblx0ICpcblx0ICogLS0tLVxuXHQgKlxuXHQgKiBpbnQgKyBpbnQgKyBpbnQgPT09IG40IFtmYXN0ZXJdXG5cdCAqXG5cdCAqIHZzXG5cdCAqXG5cdCAqIGludCA9PT0gbjEgJiYgaW50ID09PSBuMiAmJiBpbnQgPT09IG4zXG5cdCAqXG5cdCAqIC0tLS1cblx0ICpcblx0ICogc3dpdGNoIChpbnQpIHsgY2FzZSBpbnRzLi4ufSBbZmFzdGVyXVxuXHQgKlxuXHQgKiB2c1xuXHQgKlxuXHQgKiBpZiAoaW50ID09IDEgJiYgaW50ID09PSAyIC4uLilcblx0ICpcblx0ICogLS0tLVxuXHQgKlxuXHQgKiBUaGUgKGZpcnN0Km4xICsgc2Vjb25kKm4yICsgdGhpcmQqbjMpIGZvcm1hdCB1c2VkIGluIHRoZSBwcm9wZXJ0eSBwYXJzZXJcblx0ICogaXMgYSBzaW1wbGUgd2F5IHRvIGhhc2ggdGhlIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnNcblx0ICogdGFraW5nIGludG8gYWNjb3VudCB0aGUgaW5kZXggdGhleSBvY2N1ciBpblxuXHQgKiBzaW5jZSBhbnkgbnVtYmVyIG9mIDMgY2hhcmFjdGVyIHNlcXVlbmNlcyBjb3VsZCBwcm9kdWNlIGR1cGxpY2F0ZXMuXG5cdCAqXG5cdCAqIE9uIHRoZSBvdGhlciBoYW5kIHNlcXVlbmNlcyB0aGF0IGFyZSBkaXJlY3RseSB0aWVkIHRvIHRoZSBpbmRleCBvZiB0aGUgY2hhcmFjdGVyXG5cdCAqIHJlc29sdmUgYSBmYXIgbW9yZSBhY2N1cmF0ZSBtZWFzdXJlLCBpdCdzIGFsc28gZmFzdGVyXG5cdCAqIHRvIGV2YWx1YXRlIG9uZSBjb25kaXRpb24gaW4gYSBzd2l0Y2ggc3RhdGVtZW50XG5cdCAqIHRoYW4gdGhyZWUgaW4gYW4gaWYgc3RhdGVtZW50IHJlZ2FyZGxlc3Mgb2YgdGhlIGFkZGVkIG1hdGguXG5cdCAqXG5cdCAqIFRoaXMgYWxsb3dzIHRoZSB2ZW5kb3IgcHJlZml4ZXIgdG8gYmUgYm90aCBzbWFsbCBhbmQgZmFzdC5cblx0ICovXG5cblx0dmFyIG51bGxwdG4gPSAvXlxcMCsvZyAvKiBtYXRjaGVzIGxlYWRpbmcgbnVsbCBjaGFyYWN0ZXJzICovXG5cdHZhciBmb3JtYXRwdG4gPSAvW1xcMFxcclxcZl0vZyAvKiBtYXRjaGVzIG5ldyBsaW5lLCBudWxsIGFuZCBmb3JtZmVlZCBjaGFyYWN0ZXJzICovXG5cdHZhciBjb2xvbnB0biA9IC86ICovZyAvKiBzcGxpdHMgYW5pbWF0aW9uIHJ1bGVzICovXG5cdHZhciBjdXJzb3JwdG4gPSAvem9vfGdyYS8gLyogYXNzZXJ0IGN1cnNvciB2YXJpZW50ICovXG5cdHZhciB0cmFuc2Zvcm1wdG4gPSAvKFssOiBdKSh0cmFuc2Zvcm0pL2cgLyogdmVuZG9yIHByZWZpeCB0cmFuc2Zvcm0sIG9sZGVyIHdlYmtpdCAqL1xuXHR2YXIgYW5pbWF0aW9ucHRuID0gLywrXFxzKig/IVteKF0qWyldKS9nIC8qIHNwbGl0cyBtdWx0aXBsZSBzaG9ydGhhbmQgbm90YXRpb24gYW5pbWF0aW9ucyAqL1xuXHR2YXIgcHJvcGVydGllc3B0biA9IC8gK1xccyooPyFbXihdKlspXSkvZyAvKiBhbmltYXRpb24gcHJvcGVydGllcyAqL1xuXHR2YXIgZWxlbWVudHB0biA9IC8gKltcXDBdICovZyAvKiBzZWxlY3RvciBlbGVtZW50cyAqL1xuXHR2YXIgc2VsZWN0b3JwdG4gPSAvLFxccis/L2cgLyogc3BsaXRzIHNlbGVjdG9ycyAqL1xuXHR2YXIgYW5kcHRuID0gLyhbXFx0XFxyXFxuIF0pKlxcZj8mL2cgLyogbWF0Y2ggJiAqL1xuXHR2YXIgZXNjYXBlcHRuID0gLzpnbG9iYWxcXCgoKD86W15cXChcXClcXFtcXF1dKnxcXFsuKlxcXXxcXChbXlxcKFxcKV0qXFwpKSopXFwpL2cgLyogbWF0Y2hlcyA6Z2xvYmFsKC4qKSAqL1xuXHR2YXIgaW52YWxpZHB0biA9IC9cXFcrL2cgLyogcmVtb3ZlcyBpbnZhbGlkIGNoYXJhY3RlcnMgZnJvbSBrZXlmcmFtZXMgKi9cblx0dmFyIGtleWZyYW1lcHRuID0gL0Aoa1xcdyspXFxzKihcXFMqKVxccyovIC8qIG1hdGNoZXMgQGtleWZyYW1lcyAkMSAqL1xuXHR2YXIgcGxjaG9sZHJwdG4gPSAvOjoocGxhY2UpL2cgLyogbWF0Y2ggOjpwbGFjZWhvbGRlciB2YXJpZW50ICovXG5cdHZhciByZWFkb25seXB0biA9IC86KHJlYWQtb25seSkvZyAvKiBtYXRjaCA6cmVhZC1vbmx5IHZhcmllbnQgKi9cblx0dmFyIGJlZm9yZXB0biA9IC9cXHMrKD89W3tcXF07PTo+XSkvZyAvKiBtYXRjaGVzIFxccyBiZWZvcmUgXSA7ID0gOiAqL1xuXHR2YXIgYWZ0ZXJwdG4gPSAvKFtbfT06Pl0pXFxzKy9nIC8qIG1hdGNoZXMgXFxzIGFmdGVyIGNoYXJhY3RlcnMgWyB9ID0gOiAqL1xuXHR2YXIgdGFpbHB0biA9IC8oXFx7W157XSs/KTsoPz1cXH0pL2cgLyogbWF0Y2hlcyB0YWlsIHNlbWktY29sb25zIDt9ICovXG5cdHZhciB3aGl0ZXB0biA9IC9cXHN7Mix9L2cgLyogbWF0Y2hlcyByZXBlYXRpbmcgd2hpdGVzcGFjZSAqL1xuXHR2YXIgcHNldWRvcHRuID0gLyhbXlxcKF0pKDorKSAqL2cgLyogcHNldWRvIGVsZW1lbnQgKi9cblx0dmFyIHdyaXRpbmdwdG4gPSAvW3N2aF1cXHcrLVt0YmxyXXsyfS8gLyogbWF0Y2ggd3JpdGluZyBtb2RlIHByb3BlcnR5IHZhbHVlcyAqL1xuXHR2YXIgZ3JhZGllbnRwdG4gPSAvKFtcXHctXSt0XFwoKS9nIC8qIG1hdGNoICpncmFkaWVudCBwcm9wZXJ0eSAqL1xuXHR2YXIgc3VwcG9ydHNwdG4gPSAvXFwoXFxzKiguKilcXHMqXFwpL2cgLyogbWF0Y2ggc3VwcG9ydHMgKGdyb3VwcykgKi9cblx0dmFyIHByb3BlcnR5cHRuID0gLyhbXl0qPyk7L2cgLyogbWF0Y2ggcHJvcGVydGllcyBsZWFkaW5nIHNlbWljb2xvbiAqL1xuXHR2YXIgc2VsZnB0biA9IC8tc2VsZnxmbGV4LS9nIC8qIG1hdGNoIGZsZXgtIGFuZCAtc2VsZiBpbiBhbGlnbi1zZWxmOiBmbGV4LSo7ICovXG5cdHZhciBwc2V1ZG9mbXQgPSAvW15dKj8oOltycF1bZWxdYVtcXHctXSspW15dKi8gLyogZXh0cmF0cyA6cmVhZG9ubHkgb3IgOnBsYWNob2xkZXIgZnJvbSBzZWxlY3RvciAqL1xuXHR2YXIgdHJpbXB0biA9IC9bIFxcdF0rJC8gLyogbWF0Y2ggdGFpbCB3aGl0c3BhY2UgKi9cblxuXHQvKiB2ZW5kb3JzICovXG5cdHZhciB3ZWJraXQgPSAnLXdlYmtpdC0nXG5cdHZhciBtb3ogPSAnLW1vei0nXG5cdHZhciBtcyA9ICctbXMtJ1xuXG5cdC8qIGNoYXJhY3RlciBjb2RlcyAqL1xuXHR2YXIgU0VNSUNPTE9OID0gNTkgLyogOyAqL1xuXHR2YXIgQ0xPU0VCUkFDRVMgPSAxMjUgLyogfSAqL1xuXHR2YXIgT1BFTkJSQUNFUyA9IDEyMyAvKiB7ICovXG5cdHZhciBPUEVOUEFSRU5USEVTRVMgPSA0MCAvKiAoICovXG5cdHZhciBDTE9TRVBBUkVOVEhFU0VTID0gNDEgLyogKSAqL1xuXHR2YXIgT1BFTkJSQUNLRVQgPSA5MSAvKiBbICovXG5cdHZhciBDTE9TRUJSQUNLRVQgPSA5MyAvKiBdICovXG5cdHZhciBORVdMSU5FID0gMTAgLyogXFxuICovXG5cdHZhciBDQVJSSUFHRSA9IDEzIC8qIFxcciAqL1xuXHR2YXIgVEFCID0gOSAvKiBcXHQgKi9cblx0dmFyIEFUID0gNjQgLyogQCAqL1xuXHR2YXIgU1BBQ0UgPSAzMiAvKiAgICovXG5cdHZhciBBTkQgPSAzOCAvKiAmICovXG5cdHZhciBEQVNIID0gNDUgLyogLSAqL1xuXHR2YXIgVU5ERVJTQ09SRSA9IDk1IC8qIF8gKi9cblx0dmFyIFNUQVIgPSA0MiAvKiAqICovXG5cdHZhciBDT01NQSA9IDQ0IC8qICwgKi9cblx0dmFyIENPTE9OID0gNTggLyogOiAqL1xuXHR2YXIgU0lOR0xFUVVPVEUgPSAzOSAvKiAnICovXG5cdHZhciBET1VCTEVRVU9URSA9IDM0IC8qIFwiICovXG5cdHZhciBGT1dBUkRTTEFTSCA9IDQ3IC8qIC8gKi9cblx0dmFyIEdSRUFURVJUSEFOID0gNjIgLyogPiAqL1xuXHR2YXIgUExVUyA9IDQzIC8qICsgKi9cblx0dmFyIFRJTERFID0gMTI2IC8qIH4gKi9cblx0dmFyIE5VTEwgPSAwIC8qIFxcMCAqL1xuXHR2YXIgRk9STUZFRUQgPSAxMiAvKiBcXGYgKi9cblx0dmFyIFZFUlRJQ0FMVEFCID0gMTEgLyogXFx2ICovXG5cblx0Lyogc3BlY2lhbCBpZGVudGlmaWVycyAqL1xuXHR2YXIgS0VZRlJBTUUgPSAxMDcgLyogayAqL1xuXHR2YXIgTUVESUEgPSAxMDkgLyogbSAqL1xuXHR2YXIgU1VQUE9SVFMgPSAxMTUgLyogcyAqL1xuXHR2YXIgUExBQ0VIT0xERVIgPSAxMTIgLyogcCAqL1xuXHR2YXIgUkVBRE9OTFkgPSAxMTEgLyogbyAqL1xuXHR2YXIgSU1QT1JUID0gMTY5IC8qIDxhdD5pICovXG5cdHZhciBDSEFSU0VUID0gMTYzIC8qIDxhdD5jICovXG5cdHZhciBET0NVTUVOVCA9IDEwMCAvKiA8YXQ+ZCAqL1xuXHR2YXIgUEFHRSA9IDExMiAvKiA8YXQ+cCAqL1xuXG5cdHZhciBjb2x1bW4gPSAxIC8qIGN1cnJlbnQgY29sdW1uICovXG5cdHZhciBsaW5lID0gMSAvKiBjdXJyZW50IGxpbmUgbnVtZWJyICovXG5cdHZhciBwYXR0ZXJuID0gMCAvKiA6cGF0dGVybiAqL1xuXG5cdHZhciBjYXNjYWRlID0gMSAvKiAjaWQgaDEgaDIgdnMgaDEjaWQgaDIjaWQgICovXG5cdHZhciBwcmVmaXggPSAxIC8qIHZlbmRvciBwcmVmaXggKi9cblx0dmFyIGVzY2FwZSA9IDEgLyogZXNjYXBlIDpnbG9iYWwoKSBwYXR0ZXJuICovXG5cdHZhciBjb21wcmVzcyA9IDAgLyogY29tcHJlc3Mgb3V0cHV0ICovXG5cdHZhciBzZW1pY29sb24gPSAwIC8qIG5vL3NlbWljb2xvbiBvcHRpb24gKi9cblx0dmFyIHByZXNlcnZlID0gMCAvKiBwcmVzZXJ2ZSBlbXB0eSBzZWxlY3RvcnMgKi9cblxuXHQvKiBlbXB0eSByZWZlcmVuY2UgKi9cblx0dmFyIGFycmF5ID0gW11cblxuXHQvKiBwbHVnaW5zICovXG5cdHZhciBwbHVnaW5zID0gW11cblx0dmFyIHBsdWdnZWQgPSAwXG5cdHZhciBzaG91bGQgPSBudWxsXG5cblx0LyogcGx1Z2luIGNvbnRleHQgKi9cblx0dmFyIFBPU1RTID0gLTJcblx0dmFyIFBSRVBTID0gLTFcblx0dmFyIFVOS1dOID0gMFxuXHR2YXIgUFJPUFMgPSAxXG5cdHZhciBCTENLUyA9IDJcblx0dmFyIEFUUlVMID0gM1xuXG5cdC8qIHBsdWdpbiBuZXdsaW5lIGNvbnRleHQgKi9cblx0dmFyIHVua3duID0gMFxuXG5cdC8qIGtleWZyYW1lIGFuaW1hdGlvbiAqL1xuXHR2YXIga2V5ZWQgPSAxXG5cdHZhciBrZXkgPSAnJ1xuXG5cdC8qIHNlbGVjdG9yIG5hbWVzcGFjZSAqL1xuXHR2YXIgbnNjb3BlYWx0ID0gJydcblx0dmFyIG5zY29wZSA9ICcnXG5cblx0LyoqXG5cdCAqIENvbXBpbGVcblx0ICpcblx0ICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBwYXJlbnRcblx0ICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBjdXJyZW50XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBib2R5XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVwdGhcblx0ICogQHJldHVybiB7c3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcGlsZSAocGFyZW50LCBjdXJyZW50LCBib2R5LCBpZCwgZGVwdGgpIHtcblx0XHR2YXIgYnJhY2tldCA9IDAgLyogYnJhY2tldHMgW10gKi9cblx0XHR2YXIgY29tbWVudCA9IDAgLyogY29tbWVudHMgLyogLy8gb3IgLyogKi9cblx0XHR2YXIgcGFyZW50aGVzZXMgPSAwIC8qIGZ1bmN0aW9ucyAoKSAqL1xuXHRcdHZhciBxdW90ZSA9IDAgLyogcXVvdGVzICcnLCBcIlwiICovXG5cblx0XHR2YXIgZmlyc3QgPSAwIC8qIGZpcnN0IGNoYXJhY3RlciBjb2RlICovXG5cdFx0dmFyIHNlY29uZCA9IDAgLyogc2Vjb25kIGNoYXJhY3RlciBjb2RlICovXG5cdFx0dmFyIGNvZGUgPSAwIC8qIGN1cnJlbnQgY2hhcmFjdGVyIGNvZGUgKi9cblx0XHR2YXIgdGFpbCA9IDAgLyogcHJldmlvdXMgY2hhcmFjdGVyIGNvZGUgKi9cblx0XHR2YXIgdHJhaWwgPSAwIC8qIGNoYXJhY3RlciBiZWZvcmUgcHJldmlvdXMgY29kZSAqL1xuXHRcdHZhciBwZWFrID0gMCAvKiBwcmV2aW91cyBub24td2hpdGVzcGFjZSBjb2RlICovXG5cblx0XHR2YXIgY291bnRlciA9IDAgLyogY291bnQgc2VxdWVuY2UgdGVybWluYXRpb24gKi9cblx0XHR2YXIgY29udGV4dCA9IDAgLyogdHJhY2sgY3VycmVudCBjb250ZXh0ICovXG5cdFx0dmFyIGF0cnVsZSA9IDAgLyogdHJhY2sgQGF0LXJ1bGUgY29udGV4dCAqL1xuXHRcdHZhciBwc2V1ZG8gPSAwIC8qIHRyYWNrIHBzZXVkbyB0b2tlbiBpbmRleCAqL1xuXHRcdHZhciBjYXJldCA9IDAgLyogY3VycmVudCBjaGFyYWN0ZXIgaW5kZXggKi9cblx0XHR2YXIgZm9ybWF0ID0gMCAvKiBjb250cm9sIGNoYXJhY3RlciBmb3JtYXRpbmcgY29udGV4dCAqL1xuXHRcdHZhciBpbnNlcnQgPSAwIC8qIGF1dG8gc2VtaWNvbG9uIGluc2VydGlvbiAqL1xuXHRcdHZhciBpbnZlcnQgPSAwIC8qIGludmVydGVkIHNlbGVjdG9yIHBhdHRlcm4gKi9cblx0XHR2YXIgbGVuZ3RoID0gMCAvKiBnZW5lcmljIGxlbmd0aCBhZGRyZXNzICovXG5cdFx0dmFyIGVvZiA9IGJvZHkubGVuZ3RoIC8qIGVuZCBvZiBmaWxlKGxlbmd0aCkgKi9cblx0XHR2YXIgZW9sID0gZW9mIC0gMSAvKiBlbmQgb2YgZmlsZShjaGFyYWN0ZXJzKSAqL1xuXG5cdFx0dmFyIGNoYXIgPSAnJyAvKiBjdXJyZW50IGNoYXJhY3RlciAqL1xuXHRcdHZhciBjaGFycyA9ICcnIC8qIGN1cnJlbnQgYnVmZmVyIG9mIGNoYXJhY3RlcnMgKi9cblx0XHR2YXIgY2hpbGQgPSAnJyAvKiBuZXh0IGJ1ZmZlciBvZiBjaGFyYWN0ZXJzICovXG5cdFx0dmFyIG91dCA9ICcnIC8qIGNvbXBpbGVkIGJvZHkgKi9cblx0XHR2YXIgY2hpbGRyZW4gPSAnJyAvKiBjb21waWxlZCBjaGlsZHJlbiAqL1xuXHRcdHZhciBmbGF0ID0gJycgLyogY29tcGlsZWQgbGVhZnMgKi9cblx0XHR2YXIgc2VsZWN0b3IgLyogZ2VuZXJpYyBzZWxlY3RvciBhZGRyZXNzICovXG5cdFx0dmFyIHJlc3VsdCAvKiBnZW5lcmljIGFkZHJlc3MgKi9cblxuXHRcdC8vIC4uLmJ1aWxkIGJvZHlcblx0XHR3aGlsZSAoY2FyZXQgPCBlb2YpIHtcblx0XHRcdGNvZGUgPSBib2R5LmNoYXJDb2RlQXQoY2FyZXQpXG5cblx0XHRcdC8vIGVvZiB2YXJpZW50XG5cdFx0XHRpZiAoY2FyZXQgPT09IGVvbCkge1xuXHRcdFx0XHQvLyBsYXN0IGNoYXJhY3RlciArIG5vb3AgY29udGV4dCwgYWRkIHN5bnRoZXRpYyBwYWRkaW5nIGZvciBub29wIGNvbnRleHQgdG8gdGVybWluYXRlXG5cdFx0XHRcdGlmIChjb21tZW50ICsgcXVvdGUgKyBwYXJlbnRoZXNlcyArIGJyYWNrZXQgIT09IDApIHtcblx0XHRcdFx0XHRpZiAoY29tbWVudCAhPT0gMCkge1xuXHRcdFx0XHRcdFx0Y29kZSA9IGNvbW1lbnQgPT09IEZPV0FSRFNMQVNIID8gTkVXTElORSA6IEZPV0FSRFNMQVNIXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cXVvdGUgPSBwYXJlbnRoZXNlcyA9IGJyYWNrZXQgPSAwXG5cdFx0XHRcdFx0ZW9mKytcblx0XHRcdFx0XHRlb2wrK1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb21tZW50ICsgcXVvdGUgKyBwYXJlbnRoZXNlcyArIGJyYWNrZXQgPT09IDApIHtcblx0XHRcdFx0Ly8gZW9mIHZhcmllbnRcblx0XHRcdFx0aWYgKGNhcmV0ID09PSBlb2wpIHtcblx0XHRcdFx0XHRpZiAoZm9ybWF0ID4gMCkge1xuXHRcdFx0XHRcdFx0Y2hhcnMgPSBjaGFycy5yZXBsYWNlKGZvcm1hdHB0biwgJycpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGNoYXJzLnRyaW0oKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKGNvZGUpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSBTUEFDRTpcblx0XHRcdFx0XHRcdFx0Y2FzZSBUQUI6XG5cdFx0XHRcdFx0XHRcdGNhc2UgU0VNSUNPTE9OOlxuXHRcdFx0XHRcdFx0XHRjYXNlIENBUlJJQUdFOlxuXHRcdFx0XHRcdFx0XHRjYXNlIE5FV0xJTkU6IHtcblx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0XHRjaGFycyArPSBib2R5LmNoYXJBdChjYXJldClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjb2RlID0gU0VNSUNPTE9OXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gYXV0byBzZW1pY29sb24gaW5zZXJ0aW9uXG5cdFx0XHRcdGlmIChpbnNlcnQgPT09IDEpIHtcblx0XHRcdFx0XHRzd2l0Y2ggKGNvZGUpIHtcblx0XHRcdFx0XHRcdC8vIGZhbHNlIGZsYWdzXG5cdFx0XHRcdFx0XHRjYXNlIE9QRU5CUkFDRVM6XG5cdFx0XHRcdFx0XHRjYXNlIENMT1NFQlJBQ0VTOlxuXHRcdFx0XHRcdFx0Y2FzZSBTRU1JQ09MT046XG5cdFx0XHRcdFx0XHRjYXNlIERPVUJMRVFVT1RFOlxuXHRcdFx0XHRcdFx0Y2FzZSBTSU5HTEVRVU9URTpcblx0XHRcdFx0XHRcdGNhc2UgT1BFTlBBUkVOVEhFU0VTOlxuXHRcdFx0XHRcdFx0Y2FzZSBDTE9TRVBBUkVOVEhFU0VTOlxuXHRcdFx0XHRcdFx0Y2FzZSBDT01NQToge1xuXHRcdFx0XHRcdFx0XHRpbnNlcnQgPSAwXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBpZ25vcmVcblx0XHRcdFx0XHRcdGNhc2UgVEFCOlxuXHRcdFx0XHRcdFx0Y2FzZSBDQVJSSUFHRTpcblx0XHRcdFx0XHRcdGNhc2UgTkVXTElORTpcblx0XHRcdFx0XHRcdGNhc2UgU1BBQ0U6IHtcblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHZhbGlkXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdGluc2VydCA9IDBcblx0XHRcdFx0XHRcdFx0bGVuZ3RoID0gY2FyZXRcblx0XHRcdFx0XHRcdFx0Zmlyc3QgPSBjb2RlXG5cdFx0XHRcdFx0XHRcdGNhcmV0LS1cblx0XHRcdFx0XHRcdFx0Y29kZSA9IFNFTUlDT0xPTlxuXG5cdFx0XHRcdFx0XHRcdHdoaWxlIChsZW5ndGggPCBlb2YpIHtcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGJvZHkuY2hhckNvZGVBdCgrK2xlbmd0aCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgTkVXTElORTpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0FSUklBR0U6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFNFTUlDT0xPTjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXJldCsrXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvZGUgPSBmaXJzdFxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBDT0xPTjpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgT1BFTkJSQUNFUzoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsZW5ndGggPSBlb2Zcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyB0b2tlbiB2YXJpZW50XG5cdFx0XHRcdHN3aXRjaCAoY29kZSkge1xuXHRcdFx0XHRcdGNhc2UgT1BFTkJSQUNFUzoge1xuXHRcdFx0XHRcdFx0Y2hhcnMgPSBjaGFycy50cmltKClcblx0XHRcdFx0XHRcdGZpcnN0ID0gY2hhcnMuY2hhckNvZGVBdCgwKVxuXHRcdFx0XHRcdFx0Y291bnRlciA9IDFcblx0XHRcdFx0XHRcdGxlbmd0aCA9ICsrY2FyZXRcblxuXHRcdFx0XHRcdFx0d2hpbGUgKGNhcmV0IDwgZW9mKSB7XG5cdFx0XHRcdFx0XHRcdGNvZGUgPSBib2R5LmNoYXJDb2RlQXQoY2FyZXQpXG5cblx0XHRcdFx0XHRcdFx0c3dpdGNoIChjb2RlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBPUEVOQlJBQ0VTOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb3VudGVyKytcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgQ0xPU0VCUkFDRVM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvdW50ZXItLVxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoY291bnRlciA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRjYXJldCsrXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNoaWxkID0gYm9keS5zdWJzdHJpbmcobGVuZ3RoLCBjYXJldClcblxuXHRcdFx0XHRcdFx0aWYgKGZpcnN0ID09PSBOVUxMKSB7XG5cdFx0XHRcdFx0XHRcdGZpcnN0ID0gKGNoYXJzID0gY2hhcnMucmVwbGFjZShudWxscHRuLCAnJykudHJpbSgpKS5jaGFyQ29kZUF0KDApXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN3aXRjaCAoZmlyc3QpIHtcblx0XHRcdFx0XHRcdFx0Ly8gQGF0LXJ1bGVcblx0XHRcdFx0XHRcdFx0Y2FzZSBBVDoge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChmb3JtYXQgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjaGFycyA9IGNoYXJzLnJlcGxhY2UoZm9ybWF0cHRuLCAnJylcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRzZWNvbmQgPSBjaGFycy5jaGFyQ29kZUF0KDEpXG5cblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHNlY29uZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBET0NVTUVOVDpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgTUVESUE6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFNVUFBPUlRTOlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBEQVNIOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdG9yID0gY3VycmVudFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RvciA9IGFycmF5XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQgPSBjb21waWxlKGN1cnJlbnQsIHNlbGVjdG9yLCBjaGlsZCwgc2Vjb25kLCBkZXB0aCsxKVxuXHRcdFx0XHRcdFx0XHRcdGxlbmd0aCA9IGNoaWxkLmxlbmd0aFxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gcHJlc2VydmUgZW1wdHkgQGF0LXJ1bGVcblx0XHRcdFx0XHRcdFx0XHRpZiAocHJlc2VydmUgPiAwICYmIGxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGVuZ3RoID0gY2hhcnMubGVuZ3RoXG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXhlY3V0ZSBwbHVnaW5zLCBAYXQtcnVsZSBjb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHBsdWdnZWQgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RvciA9IHNlbGVjdChhcnJheSwgY2hhcnMsIGludmVydClcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IHByb3h5KEFUUlVMLCBjaGlsZCwgc2VsZWN0b3IsIGN1cnJlbnQsIGxpbmUsIGNvbHVtbiwgbGVuZ3RoLCBzZWNvbmQsIGRlcHRoKVxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhcnMgPSBzZWxlY3Rvci5qb2luKCcnKVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0ICE9PSB2b2lkIDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKChsZW5ndGggPSAoY2hpbGQgPSByZXN1bHQudHJpbSgpKS5sZW5ndGgpID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2Vjb25kID0gMFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gJydcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGlmIChsZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHNlY29uZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFNVUFBPUlRTOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhcnMgPSBjaGFycy5yZXBsYWNlKHN1cHBvcnRzcHRuLCBzdXBwb3J0cylcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIERPQ1VNRU5UOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIE1FRElBOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIERBU0g6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGlsZCA9IGNoYXJzICsgJ3snICsgY2hpbGQgKyAnfSdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgS0VZRlJBTUU6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFycyA9IGNoYXJzLnJlcGxhY2Uoa2V5ZnJhbWVwdG4sICckMSAkMicgKyAoa2V5ZWQgPiAwID8ga2V5IDogJycpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gY2hhcnMgKyAneycgKyBjaGlsZCArICd9J1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHByZWZpeCA9PT0gMSB8fCAocHJlZml4ID09PSAyICYmIHZlbmRvcignQCcrY2hpbGQsIDMpKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hpbGQgPSAnQCcgKyB3ZWJraXQgKyBjaGlsZCArICdAJyArIGNoaWxkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gJ0AnICsgY2hpbGRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hpbGQgPSBjaGFycyArIGNoaWxkXG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoaWQgPT09IFBBR0UpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gKG91dCArPSBjaGlsZCwgJycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gJydcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8vIHNlbGVjdG9yXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0XHRjaGlsZCA9IGNvbXBpbGUoY3VycmVudCwgc2VsZWN0KGN1cnJlbnQsIGNoYXJzLCBpbnZlcnQpLCBjaGlsZCwgaWQsIGRlcHRoKzEpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y2hpbGRyZW4gKz0gY2hpbGRcblxuXHRcdFx0XHRcdFx0Ly8gcmVzZXRcblx0XHRcdFx0XHRcdGNvbnRleHQgPSAwXG5cdFx0XHRcdFx0XHRpbnNlcnQgPSAwXG5cdFx0XHRcdFx0XHRwc2V1ZG8gPSAwXG5cdFx0XHRcdFx0XHRmb3JtYXQgPSAwXG5cdFx0XHRcdFx0XHRpbnZlcnQgPSAwXG5cdFx0XHRcdFx0XHRhdHJ1bGUgPSAwXG5cdFx0XHRcdFx0XHRjaGFycyA9ICcnXG5cdFx0XHRcdFx0XHRjaGlsZCA9ICcnXG5cdFx0XHRcdFx0XHRjb2RlID0gYm9keS5jaGFyQ29kZUF0KCsrY2FyZXQpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXNlIENMT1NFQlJBQ0VTOlxuXHRcdFx0XHRcdGNhc2UgU0VNSUNPTE9OOiB7XG5cdFx0XHRcdFx0XHRjaGFycyA9IChmb3JtYXQgPiAwID8gY2hhcnMucmVwbGFjZShmb3JtYXRwdG4sICcnKSA6IGNoYXJzKS50cmltKClcblxuXHRcdFx0XHRcdFx0aWYgKChsZW5ndGggPSBjaGFycy5sZW5ndGgpID4gMSkge1xuXHRcdFx0XHRcdFx0XHQvLyBtb25rZXktcGF0Y2ggbWlzc2luZyBjb2xvblxuXHRcdFx0XHRcdFx0XHRpZiAocHNldWRvID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zmlyc3QgPSBjaGFycy5jaGFyQ29kZUF0KDApXG5cblx0XHRcdFx0XHRcdFx0XHQvLyBmaXJzdCBjaGFyYWN0ZXIgaXMgYSBsZXR0ZXIgb3IgZGFzaCwgYnVmZmVyIGhhcyBhIHNwYWNlIGNoYXJhY3RlclxuXHRcdFx0XHRcdFx0XHRcdGlmICgoZmlyc3QgPT09IERBU0ggfHwgZmlyc3QgPiA5NiAmJiBmaXJzdCA8IDEyMykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxlbmd0aCA9IChjaGFycyA9IGNoYXJzLnJlcGxhY2UoJyAnLCAnOicpKS5sZW5ndGhcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBleGVjdXRlIHBsdWdpbnMsIHByb3BlcnR5IGNvbnRleHRcblx0XHRcdFx0XHRcdFx0aWYgKHBsdWdnZWQgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKChyZXN1bHQgPSBwcm94eShQUk9QUywgY2hhcnMsIGN1cnJlbnQsIHBhcmVudCwgbGluZSwgY29sdW1uLCBvdXQubGVuZ3RoLCBpZCwgZGVwdGgpKSAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoKGxlbmd0aCA9IChjaGFycyA9IHJlc3VsdC50cmltKCkpLmxlbmd0aCkgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhcnMgPSAnXFwwXFwwJ1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGZpcnN0ID0gY2hhcnMuY2hhckNvZGVBdCgwKVxuXHRcdFx0XHRcdFx0XHRzZWNvbmQgPSBjaGFycy5jaGFyQ29kZUF0KDEpXG5cblx0XHRcdFx0XHRcdFx0c3dpdGNoIChmaXJzdCArIHNlY29uZCkge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgTlVMTDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBJTVBPUlQ6XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBDSEFSU0VUOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmbGF0ICs9IGNoYXJzICsgYm9keS5jaGFyQXQoY2FyZXQpXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2hhcnMuY2hhckNvZGVBdChsZW5ndGgtMSkgPT09IENPTE9OKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRvdXQgKz0gcHJvcGVydHkoY2hhcnMsIGZpcnN0LCBzZWNvbmQsIGNoYXJzLmNoYXJDb2RlQXQoMikpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIHJlc2V0XG5cdFx0XHRcdFx0XHRjb250ZXh0ID0gMFxuXHRcdFx0XHRcdFx0aW5zZXJ0ID0gMFxuXHRcdFx0XHRcdFx0cHNldWRvID0gMFxuXHRcdFx0XHRcdFx0Zm9ybWF0ID0gMFxuXHRcdFx0XHRcdFx0aW52ZXJ0ID0gMFxuXHRcdFx0XHRcdFx0Y2hhcnMgPSAnJ1xuXHRcdFx0XHRcdFx0Y29kZSA9IGJvZHkuY2hhckNvZGVBdCgrK2NhcmV0KVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcGFyc2UgY2hhcmFjdGVyc1xuXHRcdFx0c3dpdGNoIChjb2RlKSB7XG5cdFx0XHRcdGNhc2UgQ0FSUklBR0U6XG5cdFx0XHRcdGNhc2UgTkVXTElORToge1xuXHRcdFx0XHRcdC8vIGF1dG8gaW5zZXJ0IHNlbWljb2xvblxuXHRcdFx0XHRcdGlmIChjb21tZW50ICsgcXVvdGUgKyBwYXJlbnRoZXNlcyArIGJyYWNrZXQgKyBzZW1pY29sb24gPT09IDApIHtcblx0XHRcdFx0XHRcdC8vIHZhbGlkIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlcnMgdGhhdFxuXHRcdFx0XHRcdFx0Ly8gbWF5IHByZWNlZGUgYSBuZXdsaW5lXG5cdFx0XHRcdFx0XHRzd2l0Y2ggKHBlYWspIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSBDTE9TRVBBUkVOVEhFU0VTOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFNJTkdMRVFVT1RFOlxuXHRcdFx0XHRcdFx0XHRjYXNlIERPVUJMRVFVT1RFOlxuXHRcdFx0XHRcdFx0XHRjYXNlIEFUOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFRJTERFOlxuXHRcdFx0XHRcdFx0XHRjYXNlIEdSRUFURVJUSEFOOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFNUQVI6XG5cdFx0XHRcdFx0XHRcdGNhc2UgUExVUzpcblx0XHRcdFx0XHRcdFx0Y2FzZSBGT1dBUkRTTEFTSDpcblx0XHRcdFx0XHRcdFx0Y2FzZSBEQVNIOlxuXHRcdFx0XHRcdFx0XHRjYXNlIENPTE9OOlxuXHRcdFx0XHRcdFx0XHRjYXNlIENPTU1BOlxuXHRcdFx0XHRcdFx0XHRjYXNlIFNFTUlDT0xPTjpcblx0XHRcdFx0XHRcdFx0Y2FzZSBPUEVOQlJBQ0VTOlxuXHRcdFx0XHRcdFx0XHRjYXNlIENMT1NFQlJBQ0VTOiB7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gY3VycmVudCBidWZmZXIgaGFzIGEgY29sb25cblx0XHRcdFx0XHRcdFx0XHRpZiAocHNldWRvID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aW5zZXJ0ID0gMVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIHRlcm1pbmF0ZSBsaW5lIGNvbW1lbnRcblx0XHRcdFx0XHRpZiAoY29tbWVudCA9PT0gRk9XQVJEU0xBU0gpIHtcblx0XHRcdFx0XHRcdGNvbW1lbnQgPSAwXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjYXNjYWRlICsgY29udGV4dCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0Zm9ybWF0ID0gMVxuXHRcdFx0XHRcdFx0Y2hhcnMgKz0gJ1xcMCdcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBleGVjdXRlIHBsdWdpbnMsIG5ld2xpbmUgY29udGV4dFxuXHRcdFx0XHRcdGlmIChwbHVnZ2VkICogdW5rd24gPiAwKSB7XG5cdFx0XHRcdFx0XHRwcm94eShVTktXTiwgY2hhcnMsIGN1cnJlbnQsIHBhcmVudCwgbGluZSwgY29sdW1uLCBvdXQubGVuZ3RoLCBpZCwgZGVwdGgpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gbmV4dCBsaW5lLCByZXNldCBjb2x1bW4gcG9zaXRpb25cblx0XHRcdFx0XHRjb2x1bW4gPSAxXG5cdFx0XHRcdFx0bGluZSsrXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIFNFTUlDT0xPTjpcblx0XHRcdFx0Y2FzZSBDTE9TRUJSQUNFUzoge1xuXHRcdFx0XHRcdGlmIChjb21tZW50ICsgcXVvdGUgKyBwYXJlbnRoZXNlcyArIGJyYWNrZXQgPT09IDApIHtcblx0XHRcdFx0XHRcdGNvbHVtbisrXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0Ly8gaW5jcmVtZW50IGNvbHVtbiBwb3NpdGlvblxuXHRcdFx0XHRcdGNvbHVtbisrXG5cblx0XHRcdFx0XHQvLyBjdXJyZW50IGNoYXJhY3RlclxuXHRcdFx0XHRcdGNoYXIgPSBib2R5LmNoYXJBdChjYXJldClcblxuXHRcdFx0XHRcdC8vIHJlbW92ZSBjb21tZW50cywgZXNjYXBlIGZ1bmN0aW9ucywgc3RyaW5ncywgYXR0cmlidXRlcyBhbmQgcHJlcGFyZSBzZWxlY3RvcnNcblx0XHRcdFx0XHRzd2l0Y2ggKGNvZGUpIHtcblx0XHRcdFx0XHRcdGNhc2UgVEFCOlxuXHRcdFx0XHRcdFx0Y2FzZSBTUEFDRToge1xuXHRcdFx0XHRcdFx0XHRpZiAocXVvdGUgKyBicmFja2V0ICsgY29tbWVudCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAodGFpbCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBDT01NQTpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgQ09MT046XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFRBQjpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgU1BBQ0U6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhciA9ICcnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChjb2RlICE9PSBTUEFDRSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoYXIgPSAnICdcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gZXNjYXBlIGJyZWFraW5nIGNvbnRyb2wgY2hhcmFjdGVyc1xuXHRcdFx0XHRcdFx0Y2FzZSBOVUxMOiB7XG5cdFx0XHRcdFx0XHRcdGNoYXIgPSAnXFxcXDAnXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlIEZPUk1GRUVEOiB7XG5cdFx0XHRcdFx0XHRcdGNoYXIgPSAnXFxcXGYnXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlIFZFUlRJQ0FMVEFCOiB7XG5cdFx0XHRcdFx0XHRcdGNoYXIgPSAnXFxcXHYnXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyAmXG5cdFx0XHRcdFx0XHRjYXNlIEFORDoge1xuXHRcdFx0XHRcdFx0XHQvLyBpbnZlcnRlZCBzZWxlY3RvciBwYXR0ZXJuIGkuZSBodG1sICZcblx0XHRcdFx0XHRcdFx0aWYgKHF1b3RlICsgY29tbWVudCArIGJyYWNrZXQgPT09IDAgJiYgY2FzY2FkZSA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRpbnZlcnQgPSAxXG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gMVxuXHRcdFx0XHRcdFx0XHRcdGNoYXIgPSAnXFxmJyArIGNoYXJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gOjpwPGw+YWNlaG9sZGVyLCBsXG5cdFx0XHRcdFx0XHQvLyA6cmVhZC1vbjxsPnksIGxcblx0XHRcdFx0XHRcdGNhc2UgMTA4OiB7XG5cdFx0XHRcdFx0XHRcdGlmIChxdW90ZSArIGNvbW1lbnQgKyBicmFja2V0ICsgcGF0dGVybiA9PT0gMCAmJiBwc2V1ZG8gPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChjYXJldCAtIHBzZXVkbykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gOjpwbGFjZWhvbGRlclxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAyOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0YWlsID09PSBQTEFDRUhPTERFUiAmJiBib2R5LmNoYXJDb2RlQXQoY2FyZXQtMykgPT09IENPTE9OKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGF0dGVybiA9IHRhaWxcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gOnJlYWQtb25seVxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSA4OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh0cmFpbCA9PT0gUkVBRE9OTFkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwYXR0ZXJuID0gdHJhaWxcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gOjxwYXR0ZXJuPlxuXHRcdFx0XHRcdFx0Y2FzZSBDT0xPTjoge1xuXHRcdFx0XHRcdFx0XHRpZiAocXVvdGUgKyBjb21tZW50ICsgYnJhY2tldCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHBzZXVkbyA9IGNhcmV0XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHNlbGVjdG9yc1xuXHRcdFx0XHRcdFx0Y2FzZSBDT01NQToge1xuXHRcdFx0XHRcdFx0XHRpZiAoY29tbWVudCArIHBhcmVudGhlc2VzICsgcXVvdGUgKyBicmFja2V0ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gMVxuXHRcdFx0XHRcdFx0XHRcdGNoYXIgKz0gJ1xccidcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gcXVvdGVzXG5cdFx0XHRcdFx0XHRjYXNlIERPVUJMRVFVT1RFOiB7XG5cdFx0XHRcdFx0XHRcdGlmIChjb21tZW50ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0cXVvdGUgPSBxdW90ZSA9PT0gY29kZSA/IDAgOiAocXVvdGUgPT09IDAgPyBjb2RlIDogcXVvdGUpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgU0lOR0xFUVVPVEU6IHtcblx0XHRcdFx0XHRcdFx0aWYgKGNvbW1lbnQgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRxdW90ZSA9IHF1b3RlID09PSBjb2RlID8gMCA6IChxdW90ZSA9PT0gMCA/IGNvZGUgOiBxdW90ZSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYXR0cmlidXRlc1xuXHRcdFx0XHRcdFx0Y2FzZSBPUEVOQlJBQ0tFVDoge1xuXHRcdFx0XHRcdFx0XHRpZiAocXVvdGUgKyBjb21tZW50ICsgcGFyZW50aGVzZXMgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRicmFja2V0Kytcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBDTE9TRUJSQUNLRVQ6IHtcblx0XHRcdFx0XHRcdFx0aWYgKHF1b3RlICsgY29tbWVudCArIHBhcmVudGhlc2VzID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnJhY2tldC0tXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIGZ1bmN0aW9uc1xuXHRcdFx0XHRcdFx0Y2FzZSBDTE9TRVBBUkVOVEhFU0VTOiB7XG5cdFx0XHRcdFx0XHRcdGlmIChxdW90ZSArIGNvbW1lbnQgKyBicmFja2V0ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50aGVzZXMtLVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjYXNlIE9QRU5QQVJFTlRIRVNFUzoge1xuXHRcdFx0XHRcdFx0XHRpZiAocXVvdGUgKyBjb21tZW50ICsgYnJhY2tldCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjb250ZXh0ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKHRhaWwqMiArIHRyYWlsKjMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gOm1hdGNoZXNcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSA1MzM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIDpnbG9iYWwsIDpub3QsIDpudGgtY2hpbGQgZXRjLi4uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb3VudGVyID0gMFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnRleHQgPSAxXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRwYXJlbnRoZXNlcysrXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhc2UgQVQ6IHtcblx0XHRcdFx0XHRcdFx0aWYgKGNvbW1lbnQgKyBwYXJlbnRoZXNlcyArIHF1b3RlICsgYnJhY2tldCArIHBzZXVkbyArIGF0cnVsZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGF0cnVsZSA9IDFcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYmxvY2svbGluZSBjb21tZW50c1xuXHRcdFx0XHRcdFx0Y2FzZSBTVEFSOlxuXHRcdFx0XHRcdFx0Y2FzZSBGT1dBUkRTTEFTSDoge1xuXHRcdFx0XHRcdFx0XHRpZiAocXVvdGUgKyBicmFja2V0ICsgcGFyZW50aGVzZXMgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoY29tbWVudCkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGluaXRpYWxpemUgbGluZS9ibG9jayBjb21tZW50IGNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDA6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoY29kZSoyICsgYm9keS5jaGFyQ29kZUF0KGNhcmV0KzEpKjMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gLy9cblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAyMzU6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb21tZW50ID0gRk9XQVJEU0xBU0hcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMjIwOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGVuZ3RoID0gY2FyZXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb21tZW50ID0gU1RBUlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdC8vIGVuZCBibG9jayBjb21tZW50IGNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFNUQVI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjb2RlID09PSBGT1dBUkRTTEFTSCAmJiB0YWlsID09PSBTVEFSKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIC8qPCE+IC4uLiAqLywgIVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoYm9keS5jaGFyQ29kZUF0KGxlbmd0aCsyKSA9PT0gMzMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvdXQgKz0gYm9keS5zdWJzdHJpbmcobGVuZ3RoLCBjYXJldCsxKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoYXIgPSAnJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb21tZW50ID0gMFxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGlnbm9yZSBjb21tZW50IGJsb2Nrc1xuXHRcdFx0XHRcdGlmIChjb21tZW50ID09PSAwKSB7XG5cdFx0XHRcdFx0XHQvLyBhZ2dyZXNzaXZlIGlzb2xhdGlvbiBtb2RlLCBkaXZpZGUgZWFjaCBpbmRpdmlkdWFsIHNlbGVjdG9yXG5cdFx0XHRcdFx0XHQvLyBpbmNsdWRpbmcgc2VsZWN0b3JzIGluIDpub3QgZnVuY3Rpb24gYnV0IGV4Y2x1ZGluZyBzZWxlY3RvcnMgaW4gOmdsb2JhbCBmdW5jdGlvblxuXHRcdFx0XHRcdFx0aWYgKGNhc2NhZGUgKyBxdW90ZSArIGJyYWNrZXQgKyBhdHJ1bGUgPT09IDAgJiYgaWQgIT09IEtFWUZSQU1FICYmIGNvZGUgIT09IFNFTUlDT0xPTikge1xuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGNvZGUpIHtcblx0XHRcdFx0XHRcdFx0XHRjYXNlIENPTU1BOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgVElMREU6XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBHUkVBVEVSVEhBTjpcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFBMVVM6XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBDTE9TRVBBUkVOVEhFU0VTOlxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgT1BFTlBBUkVOVEhFU0VTOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY29udGV4dCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBvdXRzaWRlIG9mIGFuIGlzb2xhdGVkIGNvbnRleHQgaS5lIG50aC1jaGlsZCg8Li4uPilcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoICh0YWlsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBUQUI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBTUEFDRTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIE5FV0xJTkU6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBDQVJSSUFHRToge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhciA9IGNoYXIgKyAnXFwwJ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hhciA9ICdcXDAnICsgY2hhciArIChjb2RlID09PSBDT01NQSA/ICcnIDogJ1xcMCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvcm1hdCA9IDFcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHdpdGhpbiBhbiBpc29sYXRlZCBjb250ZXh0LCBzbGVlcCB1bnRpbGwgaXQncyB0ZXJtaW5hdGVkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoY29kZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgT1BFTlBBUkVOVEhFU0VTOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0ID0gKytjb3VudGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIENMT1NFUEFSRU5USEVTRVM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgoY29udGV4dCA9IC0tY291bnRlcikgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9ybWF0ID0gMVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFyICs9ICdcXDAnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBUQUI6XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBTUEFDRToge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoICh0YWlsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgTlVMTDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBPUEVOQlJBQ0VTOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIENMT1NFQlJBQ0VTOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFNFTUlDT0xPTjpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBDT01NQTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBGT1JNRkVFRDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBUQUI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgU1BBQ0U6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgTkVXTElORTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSBDQVJSSUFHRToge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGlnbm9yZSBpbiBpc29sYXRlZCBjb250ZXh0c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChjb250ZXh0ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3JtYXQgPSAxXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjaGFyICs9ICdcXDAnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIGNvbmNhdCBidWZmZXIgb2YgY2hhcmFjdGVyc1xuXHRcdFx0XHRcdFx0Y2hhcnMgKz0gY2hhclxuXG5cdFx0XHRcdFx0XHQvLyBwcmV2aW91cyBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXIgY29kZVxuXHRcdFx0XHRcdFx0aWYgKGNvZGUgIT09IFNQQUNFICYmIGNvZGUgIT09IFRBQikge1xuXHRcdFx0XHRcdFx0XHRwZWFrID0gY29kZVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyB0YWlsIGNoYXJhY3RlciBjb2Rlc1xuXHRcdFx0dHJhaWwgPSB0YWlsXG5cdFx0XHR0YWlsID0gY29kZVxuXG5cdFx0XHQvLyB2aXNpdCBldmVyeSBjaGFyYWN0ZXJcblx0XHRcdGNhcmV0Kytcblx0XHR9XG5cblx0XHRsZW5ndGggPSBvdXQubGVuZ3RoXG5cblx0XHQvLyBwcmVzZXJ2ZSBlbXB0eSBzZWxlY3RvclxuIFx0XHRpZiAocHJlc2VydmUgPiAwKSB7XG4gXHRcdFx0aWYgKGxlbmd0aCA9PT0gMCAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgKGN1cnJlbnRbMF0ubGVuZ3RoID09PSAwKSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGlmIChpZCAhPT0gTUVESUEgfHwgKGN1cnJlbnQubGVuZ3RoID09PSAxICYmIChjYXNjYWRlID4gMCA/IG5zY29wZWFsdCA6IG5zY29wZSkgPT09IGN1cnJlbnRbMF0pKSB7XG5cdFx0XHRcdFx0bGVuZ3RoID0gY3VycmVudC5qb2luKCcsJykubGVuZ3RoICsgMlxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAobGVuZ3RoID4gMCkge1xuXHRcdFx0Ly8gY2FzY2FkZSBpc29sYXRpb24gbW9kZT9cblx0XHRcdHNlbGVjdG9yID0gY2FzY2FkZSA9PT0gMCAmJiBpZCAhPT0gS0VZRlJBTUUgPyBpc29sYXRlKGN1cnJlbnQpIDogY3VycmVudFxuXG5cdFx0XHQvLyBleGVjdXRlIHBsdWdpbnMsIGJsb2NrIGNvbnRleHRcblx0XHRcdGlmIChwbHVnZ2VkID4gMCkge1xuXHRcdFx0XHRyZXN1bHQgPSBwcm94eShCTENLUywgb3V0LCBzZWxlY3RvciwgcGFyZW50LCBsaW5lLCBjb2x1bW4sIGxlbmd0aCwgaWQsIGRlcHRoKVxuXG5cdFx0XHRcdGlmIChyZXN1bHQgIT09IHZvaWQgMCAmJiAob3V0ID0gcmVzdWx0KS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmxhdCArIG91dCArIGNoaWxkcmVuXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gc2VsZWN0b3Iuam9pbignLCcpICsgJ3snICsgb3V0ICsgJ30nXG5cblx0XHRcdGlmIChwcmVmaXgqcGF0dGVybiAhPT0gMCkge1xuXHRcdFx0XHRpZiAocHJlZml4ID09PSAyICYmICF2ZW5kb3Iob3V0LCAyKSlcblx0XHRcdFx0XHRwYXR0ZXJuID0gMFxuXG5cdFx0XHRcdHN3aXRjaCAocGF0dGVybikge1xuXHRcdFx0XHRcdC8vIDo6cmVhZC1vbmx5XG5cdFx0XHRcdFx0Y2FzZSBSRUFET05MWToge1xuXHRcdFx0XHRcdFx0b3V0ID0gb3V0LnJlcGxhY2UocmVhZG9ubHlwdG4sICc6Jyttb3orJyQxJykrb3V0XG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyA6OnBsYWNlaG9sZGVyXG5cdFx0XHRcdFx0Y2FzZSBQTEFDRUhPTERFUjoge1xuXHRcdFx0XHRcdFx0b3V0ID0gKFxuXHRcdFx0XHRcdFx0XHRvdXQucmVwbGFjZShwbGNob2xkcnB0biwgJzo6JyArIHdlYmtpdCArICdpbnB1dC0kMScpICtcblx0XHRcdFx0XHRcdFx0b3V0LnJlcGxhY2UocGxjaG9sZHJwdG4sICc6OicgKyBtb3ogKyAnJDEnKSArXG5cdFx0XHRcdFx0XHRcdG91dC5yZXBsYWNlKHBsY2hvbGRycHRuLCAnOicgKyBtcyArICdpbnB1dC0kMScpICsgb3V0XG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBhdHRlcm4gPSAwXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZsYXQgKyBvdXQgKyBjaGlsZHJlblxuXHR9XG5cblx0LyoqXG5cdCAqIFNlbGVjdFxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHBhcmVudFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudFxuXHQgKiBAcGFyYW0ge251bWJlcn0gaW52ZXJ0XG5cdCAqIEByZXR1cm4ge0FycmF5PHN0cmluZz59XG5cdCAqL1xuXHRmdW5jdGlvbiBzZWxlY3QgKHBhcmVudCwgY3VycmVudCwgaW52ZXJ0KSB7XG5cdFx0dmFyIHNlbGVjdG9ycyA9IGN1cnJlbnQudHJpbSgpLnNwbGl0KHNlbGVjdG9ycHRuKVxuXHRcdHZhciBvdXQgPSBzZWxlY3RvcnNcblxuXHRcdHZhciBsZW5ndGggPSBzZWxlY3RvcnMubGVuZ3RoXG5cdFx0dmFyIGwgPSBwYXJlbnQubGVuZ3RoXG5cblx0XHRzd2l0Y2ggKGwpIHtcblx0XHRcdC8vIDAtMSBwYXJlbnQgc2VsZWN0b3JzXG5cdFx0XHRjYXNlIDA6XG5cdFx0XHRjYXNlIDE6IHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIHNlbGVjdG9yID0gbCA9PT0gMCA/ICcnIDogcGFyZW50WzBdICsgJyAnOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0XHRvdXRbaV0gPSBzY29wZShzZWxlY3Rvciwgb3V0W2ldLCBpbnZlcnQsIGwpLnRyaW0oKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHQvLyA+MiBwYXJlbnQgc2VsZWN0b3JzLCBuZXN0ZWRcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGogPSAwLCBvdXQgPSBbXTsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBsOyArK2spIHtcblx0XHRcdFx0XHRcdG91dFtqKytdID0gc2NvcGUocGFyZW50W2tdICsgJyAnLCBzZWxlY3RvcnNbaV0sIGludmVydCwgbCkudHJpbSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cblx0LyoqXG5cdCAqIFNjb3BlXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRcblx0ICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRcblx0ICogQHBhcmFtIHtudW1iZXJ9IGludmVydFxuXHQgKiBAcGFyYW0ge251bWJlcn0gbGV2ZWxcblx0ICogQHJldHVybiB7c3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gc2NvcGUgKHBhcmVudCwgY3VycmVudCwgaW52ZXJ0LCBsZXZlbCkge1xuXHRcdHZhciBzZWxlY3RvciA9IGN1cnJlbnRcblx0XHR2YXIgY29kZSA9IHNlbGVjdG9yLmNoYXJDb2RlQXQoMClcblxuXHRcdC8vIHRyaW0gbGVhZGluZyB3aGl0ZXNwYWNlXG5cdFx0aWYgKGNvZGUgPCAzMykge1xuXHRcdFx0Y29kZSA9IChzZWxlY3RvciA9IHNlbGVjdG9yLnRyaW0oKSkuY2hhckNvZGVBdCgwKVxuXHRcdH1cblxuXHRcdHN3aXRjaCAoY29kZSkge1xuXHRcdFx0Ly8gJlxuXHRcdFx0Y2FzZSBBTkQ6IHtcblx0XHRcdFx0c3dpdGNoIChjYXNjYWRlICsgbGV2ZWwpIHtcblx0XHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0Y2FzZSAxOiB7XG5cdFx0XHRcdFx0XHRpZiAocGFyZW50LnRyaW0oKS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlbGVjdG9yLnJlcGxhY2UoYW5kcHRuLCAnJDEnK3BhcmVudC50cmltKCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHQvLyA6XG5cdFx0XHRjYXNlIENPTE9OOiB7XG5cdFx0XHRcdHN3aXRjaCAoc2VsZWN0b3IuY2hhckNvZGVBdCgxKSkge1xuXHRcdFx0XHRcdC8vIGcgaW4gOmdsb2JhbFxuXHRcdFx0XHRcdGNhc2UgMTAzOiB7XG5cdFx0XHRcdFx0XHRpZiAoZXNjYXBlID4gMCAmJiBjYXNjYWRlID4gMCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2VsZWN0b3IucmVwbGFjZShlc2NhcGVwdG4sICckMScpLnJlcGxhY2UoYW5kcHRuLCAnJDEnK25zY29wZSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdC8vIDpob3ZlclxuXHRcdFx0XHRcdFx0cmV0dXJuIHBhcmVudC50cmltKCkgKyBzZWxlY3RvclxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHQvLyBodG1sICZcblx0XHRcdFx0aWYgKGludmVydCpjYXNjYWRlID4gMCAmJiBzZWxlY3Rvci5pbmRleE9mKCdcXGYnKSA+IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gc2VsZWN0b3IucmVwbGFjZShhbmRwdG4sIChwYXJlbnQuY2hhckNvZGVBdCgwKSA9PT0gQ09MT04gPyAnJyA6ICckMScpK3BhcmVudC50cmltKCkpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcGFyZW50ICsgc2VsZWN0b3Jcblx0fVxuXG5cdC8qKlxuXHQgKiBQcm9wZXJ0eVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRcblx0ICogQHBhcmFtIHtudW1iZXJ9IGZpcnN0XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRcblx0ICogQHBhcmFtIHtudW1iZXJ9IHRoaXJkXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIHByb3BlcnR5IChpbnB1dCwgZmlyc3QsIHNlY29uZCwgdGhpcmQpIHtcblx0XHR2YXIgaW5kZXggPSAwXG5cdFx0dmFyIG91dCA9IGlucHV0ICsgJzsnXG5cdFx0dmFyIGhhc2ggPSAoZmlyc3QqMikgKyAoc2Vjb25kKjMpICsgKHRoaXJkKjQpXG5cdFx0dmFyIGNhY2hlXG5cblx0XHQvLyBhbmltYXRpb246IGEsIG4sIGkgY2hhcmFjdGVyc1xuXHRcdGlmIChoYXNoID09PSA5NDQpIHtcblx0XHRcdHJldHVybiBhbmltYXRpb24ob3V0KVxuXHRcdH0gZWxzZSBpZiAocHJlZml4ID09PSAwIHx8IChwcmVmaXggPT09IDIgJiYgIXZlbmRvcihvdXQsIDEpKSkge1xuXHRcdFx0cmV0dXJuIG91dFxuXHRcdH1cblxuXHRcdC8vIHZlbmRvciBwcmVmaXhcblx0XHRzd2l0Y2ggKGhhc2gpIHtcblx0XHRcdC8vIHRleHQtZGVjb3JhdGlvbi90ZXh0LXNpemUtYWRqdXN0OiB0LCBlLCB4XG5cdFx0XHRjYXNlIDEwMTU6IHtcblx0XHRcdFx0Ly8gdGV4dC1zaXplLWFkanVzdCwgLVxuXHRcdFx0XHRyZXR1cm4gb3V0LmNoYXJDb2RlQXQoOSkgPT09IERBU0ggPyB3ZWJraXQgKyBvdXQgKyBvdXQgOiBvdXRcblx0XHRcdH1cblx0XHRcdC8vIGZpbHRlci9maWxsIGYsIGksIGxcblx0XHRcdGNhc2UgOTUxOiB7XG5cdFx0XHRcdC8vIGZpbHRlciwgdFxuXHRcdFx0XHRyZXR1cm4gb3V0LmNoYXJDb2RlQXQoMykgPT09IDExNiA/IHdlYmtpdCArIG91dCArIG91dCA6IG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gY29sb3IvY29sdW1uLCBjLCBvLCBsXG5cdFx0XHRjYXNlIDk2Mzoge1xuXHRcdFx0XHQvLyBjb2x1bW4sIG5cblx0XHRcdFx0cmV0dXJuIG91dC5jaGFyQ29kZUF0KDUpID09PSAxMTAgPyB3ZWJraXQgKyBvdXQgKyBvdXQgOiBvdXRcblx0XHRcdH1cblx0XHRcdC8vIGJveC1kZWNvcmF0aW9uLWJyZWFrLCBiLCBvLCB4XG5cdFx0XHRjYXNlIDEwMDk6IHtcblx0XHRcdFx0aWYgKG91dC5jaGFyQ29kZUF0KDQpICE9PSAxMDApIHtcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBtYXNrLCBtLCBhLCBzXG5cdFx0XHQvLyBjbGlwLXBhdGgsIGMsIGwsIGlcblx0XHRcdGNhc2UgOTY5OlxuXHRcdFx0Y2FzZSA5NDI6IHtcblx0XHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gYXBwZWFyYW5jZTogYSwgcCwgcFxuXHRcdFx0Y2FzZSA5Nzg6IHtcblx0XHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIG1veiArIG91dCArIG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gaHlwaGVuczogaCwgeSwgcFxuXHRcdFx0Ly8gdXNlci1zZWxlY3Q6IHUsIHMsIGVcblx0XHRcdGNhc2UgMTAxOTpcblx0XHRcdGNhc2UgOTgzOiB7XG5cdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBtb3ogKyBvdXQgKyBtcyArIG91dCArIG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gYmFja2dyb3VuZC9iYWNrZmFjZS12aXNpYmlsaXR5LCBiLCBhLCBjXG5cdFx0XHRjYXNlIDg4Mzoge1xuXHRcdFx0XHQvLyBiYWNrZmFjZS12aXNpYmlsaXR5LCAtXG5cdFx0XHRcdHJldHVybiBvdXQuY2hhckNvZGVBdCg4KSA9PT0gREFTSCA/IHdlYmtpdCArIG91dCArIG91dCA6IG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gZmxleDogZiwgbCwgZVxuXHRcdFx0Y2FzZSA5MzI6IHtcblx0XHRcdFx0aWYgKG91dC5jaGFyQ29kZUF0KDQpID09PSBEQVNIKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChvdXQuY2hhckNvZGVBdCg1KSkge1xuXHRcdFx0XHRcdFx0Ly8gZmxleC1ncm93LCBnXG5cdFx0XHRcdFx0XHRjYXNlIDEwMzoge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2Via2l0ICsgJ2JveC0nICsgb3V0LnJlcGxhY2UoJy1ncm93JywgJycpICsgd2Via2l0ICsgb3V0ICsgbXMgKyBvdXQucmVwbGFjZSgnZ3JvdycsICdwb3NpdGl2ZScpICsgb3V0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBmbGV4LXNocmluaywgc1xuXHRcdFx0XHRcdFx0Y2FzZSAxMTU6IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIG1zICsgb3V0LnJlcGxhY2UoJ3NocmluaycsICduZWdhdGl2ZScpICsgb3V0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBmbGV4LWJhc2lzLCBiXG5cdFx0XHRcdFx0XHRjYXNlIDk4OiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBtcyArIG91dC5yZXBsYWNlKCdiYXNpcycsICdwcmVmZXJyZWQtc2l6ZScpICsgb3V0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIG1zICsgb3V0ICsgb3V0XG5cdFx0XHR9XG5cdFx0XHQvLyBvcmRlcjogbywgciwgZFxuXHRcdFx0Y2FzZSA5NjQ6IHtcblx0XHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIG1zICsgJ2ZsZXgnICsgJy0nICsgb3V0ICsgb3V0XG5cdFx0XHR9XG5cdFx0XHQvLyBqdXN0aWZ5LWl0ZW1zL2p1c3RpZnktY29udGVudCwgaiwgdSwgc1xuXHRcdFx0Y2FzZSAxMDIzOiB7XG5cdFx0XHRcdC8vIGp1c3RpZnktY29udGVudCwgY1xuXHRcdFx0XHRpZiAob3V0LmNoYXJDb2RlQXQoOCkgIT09IDk5KSB7XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhY2hlID0gb3V0LnN1YnN0cmluZyhvdXQuaW5kZXhPZignOicsIDE1KSkucmVwbGFjZSgnZmxleC0nLCAnJykucmVwbGFjZSgnc3BhY2UtYmV0d2VlbicsICdqdXN0aWZ5Jylcblx0XHRcdFx0cmV0dXJuIHdlYmtpdCArICdib3gtcGFjaycgKyBjYWNoZSArIHdlYmtpdCArIG91dCArIG1zICsgJ2ZsZXgtcGFjaycgKyBjYWNoZSArIG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gY3Vyc29yLCBjLCB1LCByXG5cdFx0XHRjYXNlIDEwMDU6IHtcblx0XHRcdFx0cmV0dXJuIGN1cnNvcnB0bi50ZXN0KG91dCkgPyBvdXQucmVwbGFjZShjb2xvbnB0biwgJzonICsgd2Via2l0KSArIG91dC5yZXBsYWNlKGNvbG9ucHRuLCAnOicgKyBtb3opICsgb3V0IDogb3V0XG5cdFx0XHR9XG5cdFx0XHQvLyB3cml0aW5nLW1vZGUsIHcsIHIsIGlcblx0XHRcdGNhc2UgMTAwMDoge1xuXHRcdFx0XHRjYWNoZSA9IG91dC5zdWJzdHJpbmcoMTMpLnRyaW0oKVxuXHRcdFx0XHRpbmRleCA9IGNhY2hlLmluZGV4T2YoJy0nKSArIDFcblxuXHRcdFx0XHRzd2l0Y2ggKGNhY2hlLmNoYXJDb2RlQXQoMCkrY2FjaGUuY2hhckNvZGVBdChpbmRleCkpIHtcblx0XHRcdFx0XHQvLyB2ZXJ0aWNhbC1sclxuXHRcdFx0XHRcdGNhc2UgMjI2OiB7XG5cdFx0XHRcdFx0XHRjYWNoZSA9IG91dC5yZXBsYWNlKHdyaXRpbmdwdG4sICd0YicpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyB2ZXJ0aWNhbC1ybFxuXHRcdFx0XHRcdGNhc2UgMjMyOiB7XG5cdFx0XHRcdFx0XHRjYWNoZSA9IG91dC5yZXBsYWNlKHdyaXRpbmdwdG4sICd0Yi1ybCcpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBob3Jpem9udGFsLXRiXG5cdFx0XHRcdFx0Y2FzZSAyMjA6IHtcblx0XHRcdFx0XHRcdGNhY2hlID0gb3V0LnJlcGxhY2Uod3JpdGluZ3B0biwgJ2xyJylcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdHJldHVybiBvdXRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gd2Via2l0ICsgb3V0ICsgbXMgKyBjYWNoZSArIG91dFxuXHRcdFx0fVxuXHRcdFx0Ly8gcG9zaXRpb246IHN0aWNreVxuXHRcdFx0Y2FzZSAxMDE3OiB7XG5cdFx0XHRcdGlmIChvdXQuaW5kZXhPZignc3RpY2t5JywgOSkgPT09IC0xKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG91dFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBkaXNwbGF5KGZsZXgvaW5saW5lLWZsZXgvaW5saW5lLWJveCk6IGQsIGksIHNcblx0XHRcdGNhc2UgOTc1OiB7XG5cdFx0XHRcdGluZGV4ID0gKG91dCA9IGlucHV0KS5sZW5ndGggLSAxMFxuXHRcdFx0XHRjYWNoZSA9IChvdXQuY2hhckNvZGVBdChpbmRleCkgPT09IDMzID8gb3V0LnN1YnN0cmluZygwLCBpbmRleCkgOiBvdXQpLnN1YnN0cmluZyhpbnB1dC5pbmRleE9mKCc6JywgNykgKyAxKS50cmltKClcblxuXHRcdFx0XHRzd2l0Y2ggKGhhc2ggPSBjYWNoZS5jaGFyQ29kZUF0KDApICsgKGNhY2hlLmNoYXJDb2RlQXQoNyl8MCkpIHtcblx0XHRcdFx0XHQvLyBpbmxpbmUtXG5cdFx0XHRcdFx0Y2FzZSAyMDM6IHtcblx0XHRcdFx0XHRcdC8vIGlubGluZS1ib3hcblx0XHRcdFx0XHRcdGlmIChjYWNoZS5jaGFyQ29kZUF0KDgpIDwgMTExKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGlubGluZS1ib3gvc3RpY2t5XG5cdFx0XHRcdFx0Y2FzZSAxMTU6IHtcblx0XHRcdFx0XHRcdG91dCA9IG91dC5yZXBsYWNlKGNhY2hlLCB3ZWJraXQrY2FjaGUpKyc7JytvdXRcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGlubGluZS1mbGV4XG5cdFx0XHRcdFx0Ly8gZmxleFxuXHRcdFx0XHRcdGNhc2UgMjA3OlxuXHRcdFx0XHRcdGNhc2UgMTAyOiB7XG5cdFx0XHRcdFx0XHRvdXQgPSAoXG5cdFx0XHRcdFx0XHRcdG91dC5yZXBsYWNlKGNhY2hlLCB3ZWJraXQrKGhhc2ggPiAxMDIgPyAnaW5saW5lLScgOiAnJykrJ2JveCcpKyc7Jytcblx0XHRcdFx0XHRcdFx0b3V0LnJlcGxhY2UoY2FjaGUsIHdlYmtpdCtjYWNoZSkrJzsnK1xuXHRcdFx0XHRcdFx0XHRvdXQucmVwbGFjZShjYWNoZSwgbXMrY2FjaGUrJ2JveCcpKyc7Jytcblx0XHRcdFx0XHRcdFx0b3V0XG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG91dCArICc7J1xuXHRcdFx0fVxuXHRcdFx0Ly8gYWxpZ24taXRlbXMsIGFsaWduLWNlbnRlciwgYWxpZ24tc2VsZjogYSwgbCwgaSwgLVxuXHRcdFx0Y2FzZSA5Mzg6IHtcblx0XHRcdFx0aWYgKG91dC5jaGFyQ29kZUF0KDUpID09PSBEQVNIKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChvdXQuY2hhckNvZGVBdCg2KSkge1xuXHRcdFx0XHRcdFx0Ly8gYWxpZ24taXRlbXMsIGlcblx0XHRcdFx0XHRcdGNhc2UgMTA1OiB7XG5cdFx0XHRcdFx0XHRcdGNhY2hlID0gb3V0LnJlcGxhY2UoJy1pdGVtcycsICcnKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2Via2l0ICsgb3V0ICsgd2Via2l0ICsgJ2JveC0nICsgY2FjaGUgKyBtcyArICdmbGV4LScgKyBjYWNoZSArIG91dFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYWxpZ24tc2VsZiwgc1xuXHRcdFx0XHRcdFx0Y2FzZSAxMTU6IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIG1zICsgJ2ZsZXgtaXRlbS0nICsgb3V0LnJlcGxhY2Uoc2VsZnB0biwgJycpICsgb3V0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBhbGlnbi1jb250ZW50XG5cdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB3ZWJraXQgKyBvdXQgKyBtcyArICdmbGV4LWxpbmUtcGFjaycgKyBvdXQucmVwbGFjZSgnYWxpZ24tY29udGVudCcsICcnKSArIG91dFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdFx0Ly8gd2lkdGg6IG1pbi1jb250ZW50IC8gd2lkdGg6IG1heC1jb250ZW50XG5cdFx0XHRjYXNlIDk1Mzoge1xuXHRcdFx0XHRpZiAoKGluZGV4ID0gb3V0LmluZGV4T2YoJy1jb250ZW50JywgOSkpID4gMCkge1xuXHRcdFx0XHRcdC8vIHdpZHRoOiBtaW4tY29udGVudCAvIHdpZHRoOiBtYXgtY29udGVudFxuXHRcdFx0XHRcdGlmIChvdXQuY2hhckNvZGVBdChpbmRleCAtIDMpID09PSAxMDkgJiYgb3V0LmNoYXJDb2RlQXQoaW5kZXggLSA0KSAhPT0gNDUpIHtcblx0XHRcdFx0XHRcdGNhY2hlID0gb3V0LnN1YnN0cmluZyhpbmRleCAtIDMpXG5cdFx0XHRcdFx0XHRyZXR1cm4gJ3dpZHRoOicgKyB3ZWJraXQgKyBjYWNoZSArICd3aWR0aDonICsgbW96ICsgY2FjaGUgKyAnd2lkdGg6JyArIGNhY2hlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHQvLyB0cmFuc2Zvcm0sIHRyYW5zaXRpb246IHQsIHIsIGFcblx0XHRcdGNhc2UgOTYyOiB7XG5cdFx0XHRcdG91dCA9IHdlYmtpdCArIG91dCArIChvdXQuY2hhckNvZGVBdCg1KSA9PT0gMTAyID8gbXMgKyBvdXQgOiAnJykgKyBvdXRcblxuXHRcdFx0XHQvLyB0cmFuc2l0aW9uc1xuXHRcdFx0XHRpZiAoc2Vjb25kICsgdGhpcmQgPT09IDIxMSAmJiBvdXQuY2hhckNvZGVBdCgxMykgPT09IDEwNSAmJiBvdXQuaW5kZXhPZigndHJhbnNmb3JtJywgMTApID4gMCkge1xuXHRcdFx0XHRcdHJldHVybiBvdXQuc3Vic3RyaW5nKDAsIG91dC5pbmRleE9mKCc7JywgMjcpICsgMSkucmVwbGFjZSh0cmFuc2Zvcm1wdG4sICckMScgKyB3ZWJraXQgKyAnJDInKSArIG91dFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0XG5cdH1cblxuXHR2YXIgaSA9IDBcblxuXHQvKipcblx0ICogVmVuZG9yXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjb250ZXh0XG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqL1xuXHRmdW5jdGlvbiB2ZW5kb3IgKGNvbnRlbnQsIGNvbnRleHQpIHtcblx0XHR2YXIgaW5kZXggPSBjb250ZW50LmluZGV4T2YoY29udGV4dCA9PT0gMSA/ICc6JyA6ICd7Jylcblx0XHR2YXIga2V5ID0gY29udGVudC5zdWJzdHJpbmcoMCwgY29udGV4dCAhPT0gMyA/IGluZGV4IDogMTApXG5cdFx0dmFyIHZhbHVlID0gY29udGVudC5zdWJzdHJpbmcoaW5kZXggKyAxLCBjb250ZW50Lmxlbmd0aCAtIDEpXG5cblx0XHRyZXR1cm4gc2hvdWxkKGNvbnRleHQgIT09IDIgPyBrZXkgOiBrZXkucmVwbGFjZShwc2V1ZG9mbXQsICckMScpLCB2YWx1ZSwgY29udGV4dClcblx0fVxuXG5cdC8qKlxuXHQgKiBTdXBwb3J0c1xuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbWF0Y2hcblx0ICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIHN1cHBvcnRzIChtYXRjaCwgZ3JvdXApIHtcblx0XHR2YXIgb3V0ID0gcHJvcGVydHkoZ3JvdXAsIGdyb3VwLmNoYXJDb2RlQXQoMCksIGdyb3VwLmNoYXJDb2RlQXQoMSksIGdyb3VwLmNoYXJDb2RlQXQoMikpXG5cblx0XHRyZXR1cm4gb3V0ICE9PSBncm91cCsnOycgPyBvdXQucmVwbGFjZShwcm9wZXJ0eXB0biwgJyBvciAoJDEpJykuc3Vic3RyaW5nKDQpIDogJygnK2dyb3VwKycpJ1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuaW1hdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRcblx0ICogQHJldHVybiB7c3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gYW5pbWF0aW9uIChpbnB1dCkge1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGhcblx0XHR2YXIgaW5kZXggPSBpbnB1dC5pbmRleE9mKCc6JywgOSkgKyAxXG5cdFx0dmFyIGRlY2xhcmUgPSBpbnB1dC5zdWJzdHJpbmcoMCwgaW5kZXgpLnRyaW0oKVxuXHRcdHZhciBvdXQgPSBpbnB1dC5zdWJzdHJpbmcoaW5kZXgsIGxlbmd0aC0xKS50cmltKClcblxuXHRcdHN3aXRjaCAoaW5wdXQuY2hhckNvZGVBdCg5KSprZXllZCkge1xuXHRcdFx0Y2FzZSAwOiB7XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHQvLyBhbmltYXRpb24tKiwgLVxuXHRcdFx0Y2FzZSBEQVNIOiB7XG5cdFx0XHRcdC8vIGFuaW1hdGlvbi1uYW1lLCBuXG5cdFx0XHRcdGlmIChpbnB1dC5jaGFyQ29kZUF0KDEwKSAhPT0gMTEwKSB7XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gYW5pbWF0aW9uL2FuaW1hdGlvbi1uYW1lXG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdC8vIHNwbGl0IGluIGNhc2Ugb2YgbXVsdGlwbGUgYW5pbWF0aW9uc1xuXHRcdFx0XHR2YXIgbGlzdCA9IG91dC5zcGxpdCgob3V0ID0gJycsIGFuaW1hdGlvbnB0bikpXG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGluZGV4ID0gMCwgbGVuZ3RoID0gbGlzdC5sZW5ndGg7IGkgPCBsZW5ndGg7IGluZGV4ID0gMCwgKytpKSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gbGlzdFtpXVxuXHRcdFx0XHRcdHZhciBpdGVtcyA9IHZhbHVlLnNwbGl0KHByb3BlcnRpZXNwdG4pXG5cblx0XHRcdFx0XHR3aGlsZSAodmFsdWUgPSBpdGVtc1tpbmRleF0pIHtcblx0XHRcdFx0XHRcdHZhciBwZWFrID0gdmFsdWUuY2hhckNvZGVBdCgwKVxuXG5cdFx0XHRcdFx0XHRpZiAoa2V5ZWQgPT09IDEgJiYgKFxuXHRcdFx0XHRcdFx0XHQvLyBsZXR0ZXJzXG5cdFx0XHRcdFx0XHRcdChwZWFrID4gQVQgJiYgcGVhayA8IDkwKSB8fCAocGVhayA+IDk2ICYmIHBlYWsgPCAxMjMpIHx8IHBlYWsgPT09IFVOREVSU0NPUkUgfHxcblx0XHRcdFx0XHRcdFx0Ly8gZGFzaCBidXQgbm90IGluIHNlcXVlbmNlIGkuZSAtLVxuXHRcdFx0XHRcdFx0XHQocGVhayA9PT0gREFTSCAmJiB2YWx1ZS5jaGFyQ29kZUF0KDEpICE9PSBEQVNIKVxuXHRcdFx0XHRcdFx0KSkge1xuXHRcdFx0XHRcdFx0XHQvLyBub3QgYSBudW1iZXIvZnVuY3Rpb25cblx0XHRcdFx0XHRcdFx0c3dpdGNoIChpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgKyAodmFsdWUuaW5kZXhPZignKCcpICE9PSAtMSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAodmFsdWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gbm90IGEgdmFsaWQgcmVzZXJ2ZWQga2V5d29yZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlICdpbmZpbml0ZSc6IGNhc2UgJ2FsdGVybmF0ZSc6IGNhc2UgJ2JhY2t3YXJkcyc6IGNhc2UgJ3J1bm5pbmcnOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXNlICdub3JtYWwnOiBjYXNlICdmb3J3YXJkcyc6IGNhc2UgJ2JvdGgnOiBjYXNlICdub25lJzogY2FzZSAnbGluZWFyJzpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAnZWFzZSc6IGNhc2UgJ2Vhc2UtaW4nOiBjYXNlICdlYXNlLW91dCc6IGNhc2UgJ2Vhc2UtaW4tb3V0Jzpcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAncGF1c2VkJzogY2FzZSAncmV2ZXJzZSc6IGNhc2UgJ2FsdGVybmF0ZS1yZXZlcnNlJzogY2FzZSAnaW5oZXJpdCc6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ2luaXRpYWwnOiBjYXNlICd1bnNldCc6IGNhc2UgJ3N0ZXAtc3RhcnQnOiBjYXNlICdzdGVwLWVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZSArPSBrZXlcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpdGVtc1tpbmRleCsrXSA9IHZhbHVlXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0ICs9IChpID09PSAwID8gJycgOiAnLCcpICsgaXRlbXMuam9pbignICcpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRvdXQgPSBkZWNsYXJlICsgb3V0ICsgJzsnXG5cblx0XHRpZiAocHJlZml4ID09PSAxIHx8IChwcmVmaXggPT09IDIgJiYgdmVuZG9yKG91dCwgMSkpKVxuXHRcdFx0cmV0dXJuIHdlYmtpdCArIG91dCArIG91dFxuXG5cdFx0cmV0dXJuIG91dFxuXHR9XG5cblx0LyoqXG5cdCAqIElzb2xhdGVcblx0ICpcblx0ICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBjdXJyZW50XG5cdCAqL1xuXHRmdW5jdGlvbiBpc29sYXRlIChjdXJyZW50KSB7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnQubGVuZ3RoLCBzZWxlY3RvciA9IEFycmF5KGxlbmd0aCksIHBhZGRpbmcsIGVsZW1lbnQ7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdFx0Ly8gc3BsaXQgaW5kaXZpZHVhbCBlbGVtZW50cyBpbiBhIHNlbGVjdG9yIGkuZSBoMSBoMiA9PT0gW2gxLCBoMl1cblx0XHRcdHZhciBlbGVtZW50cyA9IGN1cnJlbnRbaV0uc3BsaXQoZWxlbWVudHB0bilcblx0XHRcdHZhciBvdXQgPSAnJ1xuXG5cdFx0XHRmb3IgKHZhciBqID0gMCwgc2l6ZSA9IDAsIHRhaWwgPSAwLCBjb2RlID0gMCwgbCA9IGVsZW1lbnRzLmxlbmd0aDsgaiA8IGw7ICsraikge1xuXHRcdFx0XHQvLyBlbXB0eSBlbGVtZW50XG5cdFx0XHRcdGlmICgoc2l6ZSA9IChlbGVtZW50ID0gZWxlbWVudHNbal0pLmxlbmd0aCkgPT09IDAgJiYgbCA+IDEpIHtcblx0XHRcdFx0XHRjb250aW51ZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGFpbCA9IG91dC5jaGFyQ29kZUF0KG91dC5sZW5ndGgtMSlcblx0XHRcdFx0Y29kZSA9IGVsZW1lbnQuY2hhckNvZGVBdCgwKVxuXHRcdFx0XHRwYWRkaW5nID0gJydcblxuXHRcdFx0XHRpZiAoaiAhPT0gMCkge1xuXHRcdFx0XHRcdC8vIGRldGVybWluZSBpZiB3ZSBuZWVkIHBhZGRpbmdcblx0XHRcdFx0XHRzd2l0Y2ggKHRhaWwpIHtcblx0XHRcdFx0XHRcdGNhc2UgU1RBUjpcblx0XHRcdFx0XHRcdGNhc2UgVElMREU6XG5cdFx0XHRcdFx0XHRjYXNlIEdSRUFURVJUSEFOOlxuXHRcdFx0XHRcdFx0Y2FzZSBQTFVTOlxuXHRcdFx0XHRcdFx0Y2FzZSBTUEFDRTpcblx0XHRcdFx0XHRcdGNhc2UgT1BFTlBBUkVOVEhFU0VTOiAge1xuXHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRwYWRkaW5nID0gJyAnXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3dpdGNoIChjb2RlKSB7XG5cdFx0XHRcdFx0Y2FzZSBBTkQ6IHtcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBwYWRkaW5nICsgbnNjb3BlYWx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgVElMREU6XG5cdFx0XHRcdFx0Y2FzZSBHUkVBVEVSVEhBTjpcblx0XHRcdFx0XHRjYXNlIFBMVVM6XG5cdFx0XHRcdFx0Y2FzZSBTUEFDRTpcblx0XHRcdFx0XHRjYXNlIENMT1NFUEFSRU5USEVTRVM6XG5cdFx0XHRcdFx0Y2FzZSBPUEVOUEFSRU5USEVTRVM6IHtcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgT1BFTkJSQUNLRVQ6IHtcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSBwYWRkaW5nICsgZWxlbWVudCArIG5zY29wZWFsdFxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FzZSBDT0xPTjoge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChlbGVtZW50LmNoYXJDb2RlQXQoMSkqMiArIGVsZW1lbnQuY2hhckNvZGVBdCgyKSozKSB7XG5cdFx0XHRcdFx0XHRcdC8vIDpnbG9iYWxcblx0XHRcdFx0XHRcdFx0Y2FzZSA1MzA6IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZXNjYXBlID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudCA9IHBhZGRpbmcgKyBlbGVtZW50LnN1YnN0cmluZyg4LCBzaXplIC0gMSlcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8vIDpob3ZlciwgOm50aC1jaGlsZCgpLCAuLi5cblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChqIDwgMSB8fCBlbGVtZW50c1tqLTFdLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQgPSBwYWRkaW5nICsgbnNjb3BlYWx0ICsgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FzZSBDT01NQToge1xuXHRcdFx0XHRcdFx0cGFkZGluZyA9ICcnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0XHRcdGlmIChzaXplID4gMSAmJiBlbGVtZW50LmluZGV4T2YoJzonKSA+IDApIHtcblx0XHRcdFx0XHRcdFx0ZWxlbWVudCA9IHBhZGRpbmcgKyBlbGVtZW50LnJlcGxhY2UocHNldWRvcHRuLCAnJDEnICsgbnNjb3BlYWx0ICsgJyQyJylcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQgPSBwYWRkaW5nICsgZWxlbWVudCArIG5zY29wZWFsdFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdG91dCArPSBlbGVtZW50XG5cdFx0XHR9XG5cblx0XHRcdHNlbGVjdG9yW2ldID0gb3V0LnJlcGxhY2UoZm9ybWF0cHRuLCAnJykudHJpbSgpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNlbGVjdG9yXG5cdH1cblxuXHQvKipcblx0ICogUHJveHlcblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IGNvbnRleHRcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcblx0ICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBzZWxlY3RvcnNcblx0ICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBwYXJlbnRzXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW5cblx0ICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuXHQgKiBAcGFyYW0ge251bWJlcn0gaWRcblx0ICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoXG5cdCAqIEByZXR1cm4geyhzdHJpbmd8dm9pZHwqKX1cblx0ICovXG5cdGZ1bmN0aW9uIHByb3h5IChjb250ZXh0LCBjb250ZW50LCBzZWxlY3RvcnMsIHBhcmVudHMsIGxpbmUsIGNvbHVtbiwgbGVuZ3RoLCBpZCwgZGVwdGgpIHtcblx0XHRmb3IgKHZhciBpID0gMCwgb3V0ID0gY29udGVudCwgbmV4dDsgaSA8IHBsdWdnZWQ7ICsraSkge1xuXHRcdFx0c3dpdGNoIChuZXh0ID0gcGx1Z2luc1tpXS5jYWxsKHN0eWxpcywgY29udGV4dCwgb3V0LCBzZWxlY3RvcnMsIHBhcmVudHMsIGxpbmUsIGNvbHVtbiwgbGVuZ3RoLCBpZCwgZGVwdGgpKSB7XG5cdFx0XHRcdGNhc2Ugdm9pZCAwOlxuXHRcdFx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0XHRjYXNlIHRydWU6XG5cdFx0XHRcdGNhc2UgbnVsbDoge1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRcdG91dCA9IG5leHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN3aXRjaCAob3V0KSB7XG5cdFx0XHRjYXNlIHZvaWQgMDpcblx0XHRcdGNhc2UgZmFsc2U6XG5cdFx0XHRjYXNlIHRydWU6XG5cdFx0XHRjYXNlIG51bGw6XG5cdFx0XHRjYXNlIGNvbnRlbnQ6IHtcblx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0cmV0dXJuIG91dFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNaW5pZnlcblx0ICpcblx0ICogQHBhcmFtIHsoc3RyaW5nfCopfSBvdXRwdXRcblx0ICogQHJldHVybiB7c3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gbWluaWZ5IChvdXRwdXQpIHtcblx0XHRyZXR1cm4gb3V0cHV0XG5cdFx0XHQucmVwbGFjZShmb3JtYXRwdG4sICcnKVxuXHRcdFx0LnJlcGxhY2UoYmVmb3JlcHRuLCAnJylcblx0XHRcdC5yZXBsYWNlKGFmdGVycHRuLCAnJDEnKVxuXHRcdFx0LnJlcGxhY2UodGFpbHB0biwgJyQxJylcblx0XHRcdC5yZXBsYWNlKHdoaXRlcHRuLCAnICcpXG5cdH1cblxuXHQvKipcblx0ICogVXNlXG5cdCAqXG5cdCAqIEBwYXJhbSB7KEFycmF5PGZ1bmN0aW9uKC4uLj8pPnxmdW5jdGlvbiguLi4/KXxudW1iZXJ8dm9pZCk/fSBwbHVnaW5cblx0ICovXG5cdGZ1bmN0aW9uIHVzZSAocGx1Z2luKSB7XG5cdFx0c3dpdGNoIChwbHVnaW4pIHtcblx0XHRcdGNhc2Ugdm9pZCAwOlxuXHRcdFx0Y2FzZSBudWxsOiB7XG5cdFx0XHRcdHBsdWdnZWQgPSBwbHVnaW5zLmxlbmd0aCA9IDBcblx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0c3dpdGNoIChwbHVnaW4uY29uc3RydWN0b3IpIHtcblx0XHRcdFx0XHRjYXNlIEFycmF5OiB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcGx1Z2luLmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0XHRcdHVzZShwbHVnaW5baV0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXNlIEZ1bmN0aW9uOiB7XG5cdFx0XHRcdFx0XHRwbHVnaW5zW3BsdWdnZWQrK10gPSBwbHVnaW5cblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgQm9vbGVhbjoge1xuXHRcdFx0XHRcdFx0dW5rd24gPSAhIXBsdWdpbnwwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gdXNlXG5cdH1cblxuXHQvKipcblx0ICogU2V0XG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuXHQgKi9cblx0ZnVuY3Rpb24gc2V0IChvcHRpb25zKSB7XG5cdFx0Zm9yICh2YXIgbmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBvcHRpb25zW25hbWVdXG5cdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdFx0Y2FzZSAna2V5ZnJhbWUnOiBrZXllZCA9IHZhbHVlfDA7IGJyZWFrXG5cdFx0XHRcdGNhc2UgJ2dsb2JhbCc6IGVzY2FwZSA9IHZhbHVlfDA7IGJyZWFrXG5cdFx0XHRcdGNhc2UgJ2Nhc2NhZGUnOiBjYXNjYWRlID0gdmFsdWV8MDsgYnJlYWtcblx0XHRcdFx0Y2FzZSAnY29tcHJlc3MnOiBjb21wcmVzcyA9IHZhbHVlfDA7IGJyZWFrXG5cdFx0XHRcdGNhc2UgJ3NlbWljb2xvbic6IHNlbWljb2xvbiA9IHZhbHVlfDA7IGJyZWFrXG5cdFx0XHRcdGNhc2UgJ3ByZXNlcnZlJzogcHJlc2VydmUgPSB2YWx1ZXwwOyBicmVha1xuXHRcdFx0XHRjYXNlICdwcmVmaXgnOlxuXHRcdFx0XHRcdHNob3VsZCA9IG51bGxcblxuXHRcdFx0XHRcdGlmICghdmFsdWUpIHtcblx0XHRcdFx0XHRcdHByZWZpeCA9IDBcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0cHJlZml4ID0gMVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwcmVmaXggPSAyXG5cdFx0XHRcdFx0XHRzaG91bGQgPSB2YWx1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0XG5cdH1cblxuXHQvKipcblx0ICogU3R5bGlzXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRcblx0ICogQHJldHVybiB7Kn1cblx0ICovXG5cdGZ1bmN0aW9uIHN0eWxpcyAoc2VsZWN0b3IsIGlucHV0KSB7XG5cdFx0aWYgKHRoaXMgIT09IHZvaWQgMCAmJiB0aGlzLmNvbnN0cnVjdG9yID09PSBzdHlsaXMpIHtcblx0XHRcdHJldHVybiBmYWN0b3J5KHNlbGVjdG9yKVxuXHRcdH1cblxuXHRcdC8vIHNldHVwXG5cdFx0dmFyIG5zID0gc2VsZWN0b3Jcblx0XHR2YXIgY29kZSA9IG5zLmNoYXJDb2RlQXQoMClcblxuXHRcdC8vIHRyaW0gbGVhZGluZyB3aGl0ZXNwYWNlXG5cdFx0aWYgKGNvZGUgPCAzMykge1xuXHRcdFx0Y29kZSA9IChucyA9IG5zLnRyaW0oKSkuY2hhckNvZGVBdCgwKVxuXHRcdH1cblxuXHRcdC8vIGtleWZyYW1lL2FuaW1hdGlvbiBuYW1lc3BhY2Vcblx0XHRpZiAoa2V5ZWQgPiAwKSB7XG5cdFx0XHRrZXkgPSBucy5yZXBsYWNlKGludmFsaWRwdG4sIGNvZGUgPT09IE9QRU5CUkFDS0VUID8gJycgOiAnLScpXG5cdFx0fVxuXG5cdFx0Ly8gcmVzZXQsIHVzZWQgdG8gYXNzZXJ0IGlmIGEgcGx1Z2luIGlzIG1vbmVreS1wYXRjaGluZyB0aGUgcmV0dXJuIHZhbHVlXG5cdFx0Y29kZSA9IDFcblxuXHRcdC8vIGNhc2NhZGUvaXNvbGF0ZVxuXHRcdGlmIChjYXNjYWRlID09PSAxKSB7XG5cdFx0XHRuc2NvcGUgPSBuc1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuc2NvcGVhbHQgPSBuc1xuXHRcdH1cblxuXHRcdHZhciBzZWxlY3RvcnMgPSBbbnNjb3BlXVxuXHRcdHZhciByZXN1bHRcblxuXHRcdC8vIGV4ZWN1dGUgcGx1Z2lucywgcHJlLXByb2Nlc3MgY29udGV4dFxuXHRcdGlmIChwbHVnZ2VkID4gMCkge1xuXHRcdFx0cmVzdWx0ID0gcHJveHkoUFJFUFMsIGlucHV0LCBzZWxlY3RvcnMsIHNlbGVjdG9ycywgbGluZSwgY29sdW1uLCAwLCAwLCAwKVxuXG5cdFx0XHRpZiAocmVzdWx0ICE9PSB2b2lkIDAgJiYgdHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0aW5wdXQgPSByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBidWlsZFxuXHRcdHZhciBvdXRwdXQgPSBjb21waWxlKGFycmF5LCBzZWxlY3RvcnMsIGlucHV0LCAwLCAwKVxuXG5cdFx0Ly8gZXhlY3V0ZSBwbHVnaW5zLCBwb3N0LXByb2Nlc3MgY29udGV4dFxuXHRcdGlmIChwbHVnZ2VkID4gMCkge1xuXHRcdFx0cmVzdWx0ID0gcHJveHkoUE9TVFMsIG91dHB1dCwgc2VsZWN0b3JzLCBzZWxlY3RvcnMsIGxpbmUsIGNvbHVtbiwgb3V0cHV0Lmxlbmd0aCwgMCwgMClcblxuXHRcdFx0Ly8gYnlwYXNzIG1pbmlmaWNhdGlvblxuXHRcdFx0aWYgKHJlc3VsdCAhPT0gdm9pZCAwICYmIHR5cGVvZihvdXRwdXQgPSByZXN1bHQpICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRjb2RlID0gMFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHJlc2V0XG5cdFx0a2V5ID0gJydcblx0XHRuc2NvcGUgPSAnJ1xuXHRcdG5zY29wZWFsdCA9ICcnXG5cdFx0cGF0dGVybiA9IDBcblx0XHRsaW5lID0gMVxuXHRcdGNvbHVtbiA9IDFcblxuXHRcdHJldHVybiBjb21wcmVzcypjb2RlID09PSAwID8gb3V0cHV0IDogbWluaWZ5KG91dHB1dClcblx0fVxuXG5cdHN0eWxpc1sndXNlJ10gPSB1c2Vcblx0c3R5bGlzWydzZXQnXSA9IHNldFxuXG5cdGlmIChvcHRpb25zICE9PSB2b2lkIDApIHtcblx0XHRzZXQob3B0aW9ucylcblx0fVxuXG5cdHJldHVybiBzdHlsaXNcbn0pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxpcy9zdHlsaXMuanNcbi8vIG1vZHVsZSBpZCA9IDM5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgNSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUsIFlhaG9vISBJbmMuXG4gKiBDb3B5cmlnaHRzIGxpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIExpY2Vuc2UuIFNlZSB0aGUgYWNjb21wYW55aW5nIExJQ0VOU0UgZmlsZSBmb3IgdGVybXMuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJFQUNUX1NUQVRJQ1MgPSB7XG4gICAgY2hpbGRDb250ZXh0VHlwZXM6IHRydWUsXG4gICAgY29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICBnZXREZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgbWl4aW5zOiB0cnVlLFxuICAgIHByb3BUeXBlczogdHJ1ZSxcbiAgICB0eXBlOiB0cnVlXG59O1xuXG52YXIgS05PV05fU1RBVElDUyA9IHtcbiAgICBuYW1lOiB0cnVlLFxuICAgIGxlbmd0aDogdHJ1ZSxcbiAgICBwcm90b3R5cGU6IHRydWUsXG4gICAgY2FsbGVyOiB0cnVlLFxuICAgIGFyZ3VtZW50czogdHJ1ZSxcbiAgICBhcml0eTogdHJ1ZVxufTtcblxudmFyIGlzR2V0T3duUHJvcGVydHlTeW1ib2xzQXZhaWxhYmxlID0gdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBzb3VyY2VDb21wb25lbnQsIGN1c3RvbVN0YXRpY3MpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZUNvbXBvbmVudCAhPT0gJ3N0cmluZycpIHsgLy8gZG9uJ3QgaG9pc3Qgb3ZlciBzdHJpbmcgKGh0bWwpIGNvbXBvbmVudHNcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmIChpc0dldE93blByb3BlcnR5U3ltYm9sc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlQ29tcG9uZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICghUkVBQ1RfU1RBVElDU1trZXlzW2ldXSAmJiAhS05PV05fU1RBVElDU1trZXlzW2ldXSAmJiAoIWN1c3RvbVN0YXRpY3MgfHwgIWN1c3RvbVN0YXRpY3Nba2V5c1tpXV0pKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q29tcG9uZW50W2tleXNbaV1dID0gc291cmNlQ29tcG9uZW50W2tleXNbaV1dO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlZC1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSA1IiwiZXhwb3J0IGNvbnN0IEJBU0VfRk9OVF9TSVpFID0gMjVcbmV4cG9ydCBjb25zdCBCQVNFX01PQklMRV9GT05UX1NJWkUgPSAyMFxuZXhwb3J0IGNvbnN0IHJlbSA9IHNpemUgPT4gYCR7c2l6ZSAvIEJBU0VfRk9OVF9TSVpFfXJlbWBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3JlbS5qcyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgY29sb3JzOiB7XG4gICAgZ3JleVRleHQ6ICcjNzc3JyxcbiAgICBtdXRlZFRleHQ6ICcjQjhCOEI4JyxcbiAgICBsaWdodEdyZWVuOiAnI0RERThEOCcsXG4gICAgZ3JlZW46ICcjNDRDMjg1JyxcbiAgfSxcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3RoZW1lLmpzIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcblxuaW1wb3J0IHsgcmVtIH0gZnJvbSAnLi4vdXRpbHMvcmVtJ1xuXG5leHBvcnQgY29uc3QgV0lERV9XSURUSCA9IDEyMDBcbmV4cG9ydCBjb25zdCBOT1JNQUxfV0lEVEggPSA5MDBcbmV4cG9ydCBjb25zdCBTSURFX1BBRERJTkdTID0gMjVcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6ICR7cCA9PiAocC53aWRlID8gcmVtKFdJREVfV0lEVEgpIDogcmVtKE5PUk1BTF9XSURUSCkpfTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDAgJHtTSURFX1BBRERJTkdTfXB4O1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbmBcblxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0NvbnRhaW5lci5qcyIsImV4cG9ydCBjb25zdCBDb3JuZXJIYW5kbGUgPSAoKSA9PiAoXG4gIDxzdmcgd2lkdGg9XCIxMTJcIiBoZWlnaHQ9XCI1MlwiIHZpZXdCb3g9XCIwIDAgMTEyIDUyXCI+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjRURFREVEXCJcbiAgICAgIGZpbGxSdWxlPVwiZXZlbm9kZFwiXG4gICAgICBkPVwiTTEwNC41IDQ0LjVWMGg3djUxLjVIMHYtN2gxMDQuNXpcIlxuICAgIC8+XG4gIDwvc3ZnPlxuKVxuXG5leHBvcnQgY29uc3QgTG9nb1R5cGUgPSAoKSA9PiAoXG4gIDxzdmcgd2lkdGg9XCIxOTJcIiBoZWlnaHQ9XCI1NFwiIHZpZXdCb3g9XCIwIDAgMTkyIDU0XCI+XG4gICAgPHBhdGhcbiAgICAgIGZpbGw9XCIjNDc0NzQ3XCJcbiAgICAgIGZpbGxSdWxlPVwiZXZlbm9kZFwiXG4gICAgICBkPVwiTTQ0LjYgNTNjLTIuOCAwLTQuMi0uOC00LjItMi4zVjIuMkM0MC40LjcgNDEuOCAwIDQ0LjYgMGgyYzIuNyAwIDQuMS43IDQuMSAyLjJ2MTguMmExNCAxNCAwIDAgMSA0LjMtMy41IDEyIDEyIDAgMCAxIDUuNi0xLjNjMy42IDAgNi4yIDEgOCAyLjggMS43IDEuOCAyLjYgNC43IDIuNiA4LjZ2MjMuN2MwIDEuNS0xLjQgMi4yLTQuMiAyLjJoLTJjLTIuOCAwLTQuMi0uNy00LjItMi4yVjI4LjVjMC0yLjktMS41LTQuNC00LjUtNC40YTUgNSAwIDAgMC0zLjMgMS4zYy0xIC44LTEuNyAxLjctMi4zIDIuOHYyMi41YzAgMS41LTEuNCAyLjItNC4yIDIuMmgtMnptLTI3LjIgMGMtMi44IDAtNC4yLS44LTQuMi0yLjNWMTIuOUgyLjFjLS43IDAtMS4zLS4yLTEuNi0uOC0uMy0uNS0uNS0xLjQtLjUtMi43VjcuM0MwIDYgLjIgNS4yLjUgNC42Yy4zLS41LjktLjggMS42LS44aDMzLjFjLjggMCAxLjMuMyAxLjYuOC4zLjYuNSAxLjUuNSAyLjd2Mi4xYzAgMS4zLS4yIDIuMi0uNSAyLjctLjMuNi0uOC44LTEuNi44SDI0LjF2MzcuOGMwIDEuNS0xLjQgMi4yLTQuMiAyLjJoLTIuNXptNjMuMy00LjZjMyAzLjMgNy42IDUgMTMuNyA1QTI5LjIgMjkuMiAwIDAgMCAxMDUgNTFjMS40LS44IDIuMS0xLjcgMi4xLTIuOCAwLS41LS4yLTEuMS0uNi0yLS40LS44LS44LTEuNi0xLjUtMi4zLS41LS43LTEtMS0xLjUtMWwtMS41LjVhNDIgNDIgMCAwIDEtMy40IDEuMmMtMSAuMy0yLjMuNC0zLjYuNC0yLjQgMC00LjMtLjUtNS42LTEuNi0xLjQtMS4xLTIuMi0zLTIuNC01LjdoMTcuOGMuNSAwIDEuMi0uNSAyLjEtMS42IDEtMS4xIDEuNS0yIDEuNS0yLjUgMC01LjQtMS4yLTkuNy0zLjctMTMtMi40LTMuNC02LjItNS0xMS40LTUtNS4zIDAtOS41IDEuNC0xMi41IDQuNXMtNC41IDgtNC41IDE0LjVjMCA1LjkgMS41IDEwLjQgNC41IDEzLjd6TTk3IDI1LjhjLjggMS4yIDEuMiAzIDEuMiA1SDg3Yy43LTQuNiAyLjgtNyA2LjMtNyAxLjcgMCAzIC43IDMuOCAyem0yMC40IDI3LjFjLTIuOCAwLTQuMi0uNy00LjItMi4yVjI4LjVhMzkgMzkgMCAwIDAtLjYtOC40Yy0uMi0uNy0uMi0xLjItLjItMS41IDAtLjcgMS0xLjMgMi44LTEuNyAxLjktLjMgMy42LS41IDUtLjUuOSAwIDEuNC4zIDEuOCAxbC43IDIgLjMgMS41Yy45LTEuNiAyLTIuOSAzLTMuOGE3IDcgMCAwIDEgNC42LTEuNWMxLjUgMCAyLjYuNCAzLjEgMS4yYTQgNCAwIDAgMSAxIDIuNmMwIDEtLjMgMi4yLS43IDMuNy0uNCAxLjQtMSAyLjItMS41IDIuMkwxMzEgMjVsLTEuOC0uM2MtMS4zIDAtMi40LjQtMy40IDEuMWE5IDkgMCAwIDAtMi4yIDIuNHYyMi41YzAgMS41LTEuNCAyLjItNC4yIDIuMmgtMnptMjIuNC00LjVjMyAzLjMgNy43IDUgMTMuOCA1QTI5LjIgMjkuMiAwIDAgMCAxNjQgNTFjMS41LS44IDIuMi0xLjcgMi4yLTIuOCAwLS41LS4yLTEuMS0uNi0yLS40LS44LS45LTEuNi0xLjUtMi4zLS41LS43LTEtMS0xLjUtMWwtMS42LjUtMy4zIDEuMmMtMS4xLjMtMi4zLjQtMy42LjQtMi40IDAtNC4zLS41LTUuNy0xLjYtMS4zLTEuMS0yLjEtMy0yLjMtNS43aDE3LjhjLjUgMCAxLjItLjUgMi4xLTEuNiAxLTEuMSAxLjUtMiAxLjUtMi41IDAtNS40LTEuMy05LjctMy43LTEzLTIuNS0zLjQtNi4zLTUtMTEuNC01LTUuNCAwLTkuNSAxLjQtMTIuNiA0LjUtMyAzLjEtNC41IDgtNC41IDE0LjUgMCA1LjkgMS41IDEwLjQgNC41IDEzLjd6bTE2LjMtMjIuNmMuOSAxLjIgMS4zIDMgMS4zIDVoLTExLjNjLjctNC42IDIuOC03IDYuMy03IDEuNiAwIDIuOS43IDMuNyAyem0yOC41LTEyYy4yLjIuNC4zLjcuM2guNGMuMyAwIC41IDAgLjctLjNsMi0zLjVjMC0uMy4yLS41LjMtLjZ2Ni42YzAgLjMuNC41IDEgLjVoLjVjLjYgMCAxLS4yIDEtLjVWNi4xYzAtLjQtLjQtLjYtMS0uNmgtLjljLS41IDAtLjguMi0xIC41bC0yLjcgNC43LS4xLjMtLjItLjMtMi42LTQuN2MtLjItLjMtLjUtLjUtMS0uNWgtLjljLS42IDAtMSAuMi0xIC42djEwLjJjMCAuMy40LjUgMSAuNWguNWMuNiAwIDEtLjIgMS0uNVY5LjdsLjMuNiAyIDMuNXptLTExIDIuNWMwIC4zLjMuNSAxIC41aC41Yy43IDAgMS0uMiAxLS41VjcuN2gyLjVjLjIgMCAuMyAwIC40LS4ybC4xLS42di0uNWwtLjEtLjZjMC0uMi0uMi0uMi0uNC0uMkgxNzFjLS4xIDAtLjIgMC0uMy4ybC0uMS42djEuMWwuNC4yaDIuNnY4LjZ6XCJcbiAgICAvPlxuICA8L3N2Zz5cbilcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvU3Zncy5qcyIsImltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcblxuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuLi9jb21wb25lbnRzL0NvbnRhaW5lcidcbmltcG9ydCBIZXJvIGZyb20gJy4uL3NlY3Rpb25zL0hlcm8nXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vdXRpbHMvdGhlbWUnXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IChcbiAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICA8ZGl2PlxuICAgICAgPEhlcm8gLz5cbiAgICAgIDxDb250YWluZXIga2V5PVwiMlwiIHdpZGU9e3RydWV9IHN0eWxlPXt7IGJhY2tncm91bmQ6ICdncmV5JyB9fT5cbiAgICAgICAgc1xuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9kaXY+XG4gIDwvVGhlbWVQcm92aWRlcj5cbilcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzP2VudHJ5IiwiaW1wb3J0IHN0eWxlZCwgeyBjc3MgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcbmltcG9ydCB7IGRhcmtlbiB9IGZyb20gJ3BvbGlzaGVkJ1xuXG5pbXBvcnQgeyBtb2JpbGUsIHBob25lIH0gZnJvbSAnLi4vdXRpbHMvbWVkaWEnXG5pbXBvcnQgeyBXSURFX1dJRFRILCBTSURFX1BBRERJTkdTIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Db250YWluZXInXG5pbXBvcnQgQXBwU2NyZWVuc2hvdCBmcm9tICcuLi9jb21wb25lbnRzL0FwcFNjcmVlbnNob3QnXG5pbXBvcnQgeyBMb2dvVHlwZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvU3ZncydcblxuY29uc3QgSGVybyA9ICgpID0+IChcbiAgPFdyYXBwZXI+XG4gICAgPENvbnRlbnRXcmFwcGVyPlxuICAgICAgPFBob3RvPlxuICAgICAgICA8QXBwU2NyZWVuc2hvdCAvPlxuICAgICAgPC9QaG90bz5cbiAgICAgIDxUZXh0cyAvPlxuICAgIDwvQ29udGVudFdyYXBwZXI+XG4gIDwvV3JhcHBlcj5cbilcblxuZXhwb3J0IGRlZmF1bHQgSGVyb1xuXG5jb25zdCBUZXh0cyA9ICgpID0+IChcbiAgPFRleHRzV3JhcHBlcj5cbiAgICA8SWNvbkltYWdlIHNyYz1cIi9zdGF0aWMvdGhlcmUtaWNvbi5zdmdcIiBhbHQ9XCJUaGVyZeKEoiBhcHBcIiAvPlxuICAgIDxMb2dvVHlwZVdyYXBwZXI+XG4gICAgICA8TG9nb1R5cGUgLz5cbiAgICA8L0xvZ29UeXBlV3JhcHBlcj5cbiAgICA8RGVzY3JpcHRpb24+WW91ciBmcmllbmRzICYgdGVhbW1hdGVzJyB0aW1lPyBBaCwgVGhlcmUhPC9EZXNjcmlwdGlvbj5cbiAgICA8RG93bmxvYWRTZWN0aW9uPlxuICAgICAgPERvd25sb2FkQnV0dG9uPkRvd25sb2FkPC9Eb3dubG9hZEJ1dHRvbj5cbiAgICAgIDxEb3dubG9hZE5vdGVzPkF2YWlsYWJsZSBmb3IgbWFjT1MsIG90aGVyIHBsYXRmb3JtcyBzb29uITwvRG93bmxvYWROb3Rlcz5cbiAgICA8L0Rvd25sb2FkU2VjdGlvbj5cbiAgPC9UZXh0c1dyYXBwZXI+XG4pXG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuaGVhZGVyYFxuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciBtaW5tYXgoYXV0bywgJHtXSURFX1dJRFRIfXB4KSAxZnI7XG5cbiAgcGFkZGluZy10b3A6IDcwcHg7XG5cbiAgJHtwaG9uZShjc3NgXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIGApfTtcbmBcblxuY29uc3QgQ29udGVudFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBncmlkLWNvbHVtbjogMSAvIDM7XG4gIGRpc3BsYXk6IGZsZXg7XG5cbiAgJHtwaG9uZShjc3NgXG4gICAgZ3JpZC1jb2x1bW46IDE7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYCl9O1xuYFxuXG5jb25zdCBQaG90byA9IHN0eWxlZC5kaXZgXG4gIGZsZXg6IDAgMSBhdXRvO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICBwYWRkaW5nLXJpZ2h0OiA4MHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMzBweDtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG5cbiAgJHttb2JpbGUoY3NzYFxuICAgIHBhZGRpbmctcmlnaHQ6IDUwcHg7XG4gIGApfTtcblxuICAke3Bob25lKGNzc2BcbiAgICBvcmRlcjogMjtcbiAgICBwYWRkaW5nOiAxNXB4IDA7IC8qIGZvciBncmV5IGJvcmRlcnMgKi9cbiAgICBtYXJnaW4tdG9wOiA5MHB4O1xuICBgKX07XG5gXG5cbmNvbnN0IFRleHRzV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGZsZXg6IDEgMCAzMjBweDtcbiAgcGFkZGluZy10b3A6IDgwcHg7XG5cbiAgJHttb2JpbGUoY3NzYFxuICAgIHBhZGRpbmctdG9wOiA0MHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDQwcHg7XG4gIGApfTtcblxuICAke3Bob25lKGNzc2BcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA0MHB4O1xuICAgIHBhZGRpbmctbGVmdDogJHtTSURFX1BBRERJTkdTfXB4O1xuICBgKX07XG5gXG5cbmNvbnN0IEljb25JbWFnZSA9IHN0eWxlZC5pbWdgXG4gIGRpc3BsYXk6IGJsb2NrO1xuYFxuXG5jb25zdCBMb2dvVHlwZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tdG9wOiA0MHB4O1xuXG4gICR7cGhvbmUoY3NzYFxuICAgIG1hcmdpbi10b3A6IDMwcHg7XG4gIGApfTtcbmBcblxuY29uc3QgRGVzY3JpcHRpb24gPSBzdHlsZWQucGBcbiAgbWFyZ2luOiAyNXB4IDAgMCAwO1xuICBjb2xvcjogJHtwID0+IHAudGhlbWUuY29sb3JzLmdyZXlUZXh0fTtcblxuICAke3Bob25lKGNzc2BcbiAgICBtYXJnaW46IDIwcHggMCAwIDA7XG4gIGApfTtcbmBcblxuY29uc3QgRG93bmxvYWRTZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLXRvcDogNzBweDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICR7cGhvbmUoY3NzYFxuICAgIG1hcmdpbi10b3A6IDUwcHg7XG4gIGApfTtcbmBcblxuY29uc3QgRG93bmxvYWRCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICBmbGV4OiAwIDAgYXV0bztcbiAgcGFkZGluZzogMTBweCAxN3B4O1xuXG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDEuMnB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuXG4gIGJhY2tncm91bmQ6ICR7cCA9PiBwLnRoZW1lLmNvbG9ycy5saWdodEdyZWVufTtcbiAgY29sb3I6ICR7cCA9PiBwLnRoZW1lLmNvbG9ycy5ncmVlbn07XG4gIGJvcmRlcjogbm9uZTtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3AgPT4gZGFya2VuKDAuMSwgcC50aGVtZS5jb2xvcnMubGlnaHRHcmVlbil9O1xuICB9XG5gXG5cbmNvbnN0IERvd25sb2FkTm90ZXMgPSBzdHlsZWQucGBcbiAgZm9udC1zaXplOiAxNHB4O1xuICBtYXJnaW46IDAgMCAwIDEwcHg7XG4gIGNvbG9yOiAke3AgPT4gcC50aGVtZS5jb2xvcnMubXV0ZWRUZXh0fTtcbmBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlY3Rpb25zL0hlcm8uanMiLCJpbXBvcnQgc3R5bGVkLCB7IGNzcyB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJ1xuXG5pbXBvcnQgeyBwaG9uZSB9IGZyb20gJy4uL3V0aWxzL21lZGlhJ1xuaW1wb3J0IHsgcmV0aW5hSW1hZ2UgfSBmcm9tICcuLi91dGlscy9yZXRpbmFJbWFnZSdcbmltcG9ydCB7IENvcm5lckhhbmRsZSB9IGZyb20gJy4vU3ZncydcblxuY29uc3QgQXBwU2NyZWVuc2hvdCA9ICgpID0+IChcbiAgPFdyYXBwZXI+XG4gICAgPEhhbmRsZVdyYXBwZXI+XG4gICAgICA8Q29ybmVySGFuZGxlIC8+XG4gICAgPC9IYW5kbGVXcmFwcGVyPlxuICA8L1dyYXBwZXI+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IEFwcFNjcmVlbnNob3RcblxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHdpZHRoOiAxMDIycHg7XG4gIGhlaWdodDogNTk1cHg7XG5cbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gIGJveC1zaGFkb3c6IDBweCA2cHggMTNweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGU4ZTg7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IHRvcCByaWdodDtcblxuICAke3JldGluYUltYWdlKCcvc3RhdGljL2FwcC1zY3JlZW5zaG90JywgJ2pwZycpfTtcblxuICAke3Bob25lKGNzc2BcbiAgICBoZWlnaHQ6IDMyMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvc3RhdGljL2FwcC1zY3JlZW5zaG90LW1vYmlsZUAyeC5qcGcpO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IHRvcCBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAxNXB4ICNmMGYwZjA7IC8qIGNoYW5nZSBQaG90byB3cmFwcGVyIHRvbyAqL1xuICBgKX07XG5gXG5cbmNvbnN0IEhhbmRsZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG5cbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzBweCwgMzVweCk7XG5cbiAgJHtwaG9uZShjc3NgXG4gICAgZGlzcGxheTogbm9uZTtcbiAgYCl9O1xuYFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9BcHBTY3JlZW5zaG90LmpzIiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5cbmV4cG9ydCBjb25zdCByZXRpbmFJbWFnZSA9ICh1cmwsIGV4dCwgc3VmZml4ID0gJ0AyeCcpID0+IGNzc2BcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7dXJsICsgJy4nICsgZXh0fSk7XG5cbiAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpLFxuICAgIG5vdCBhbGwsXG4gICAgbm90IGFsbCxcbiAgICBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxMjVkcGkpLFxuICAgIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDEuM2RwcHgpIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHt1cmwgKyBzdWZmaXggKyAnLicgKyBleHR9KTtcbiAgfVxuYFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcmV0aW5hSW1hZ2UuanMiLCIvLyAgICAgIFxuXG4vLyBAcHJpdmF0ZVxuZnVuY3Rpb24gY2FwaXRhbGl6ZVN0cmluZyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbn1cblxuLy8gICAgICBcbnZhciBwb3NpdGlvbk1hcCA9IFsnVG9wJywgJ1JpZ2h0JywgJ0JvdHRvbScsICdMZWZ0J107XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUHJvcGVydHkocHJvcGVydHksIHBvc2l0aW9uKSB7XG4gIGlmICghcHJvcGVydHkpIHJldHVybiBwb3NpdGlvbi50b0xvd2VyQ2FzZSgpO1xuICB2YXIgc3BsaXRQcm9wZXJ0eSA9IHByb3BlcnR5LnNwbGl0KCctJyk7XG4gIGlmIChzcGxpdFByb3BlcnR5Lmxlbmd0aCA+IDEpIHtcbiAgICBzcGxpdFByb3BlcnR5LnNwbGljZSgxLCAwLCBwb3NpdGlvbik7XG4gICAgcmV0dXJuIHNwbGl0UHJvcGVydHkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHZhbCkge1xuICAgICAgcmV0dXJuICcnICsgYWNjICsgY2FwaXRhbGl6ZVN0cmluZyh2YWwpO1xuICAgIH0pO1xuICB9XG4gIHZhciBqb2luZWRQcm9wZXJ0eSA9IHByb3BlcnR5LnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMScgKyBwb3NpdGlvbiArICckMicpO1xuICByZXR1cm4gcHJvcGVydHkgPT09IGpvaW5lZFByb3BlcnR5ID8gJycgKyBwcm9wZXJ0eSArIHBvc2l0aW9uIDogam9pbmVkUHJvcGVydHk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU3R5bGVzKHByb3BlcnR5LCB2YWx1ZXNXaXRoRGVmYXVsdHMpIHtcbiAgdmFyIHN0eWxlcyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlc1dpdGhEZWZhdWx0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh2YWx1ZXNXaXRoRGVmYXVsdHNbaV0gfHwgdmFsdWVzV2l0aERlZmF1bHRzW2ldID09PSAwKSB7XG4gICAgICBzdHlsZXNbZ2VuZXJhdGVQcm9wZXJ0eShwcm9wZXJ0eSwgcG9zaXRpb25NYXBbaV0pXSA9IHZhbHVlc1dpdGhEZWZhdWx0c1tpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuLyoqXG4gKiBBIGhlbHBlciB0aGF0IGVuYWJsZXMgc2hvcnRoYW5kIGZvciBkaXJlY3Rpb24gYmFzZWQgcHJvcGVydGllcy4gSXQgYWNjZXB0cyBhIHByb3BlcnR5IChoeXBoZW5hdGVkIG9yIGNhbWVsQ2FzZWQpIGFuZCB1cCB0byBmb3VyIHZhbHVlcyB0aGF0IG1hcCB0byB0b3AsIHJpZ2h0LCBib3R0b20sIGFuZCBsZWZ0LCByZXNwZWN0aXZlbHkuIFlvdSBjYW4gb3B0aW9uYWxseSBwYXNzIGFuIGVtcHR5IHN0cmluZyB0byBnZXQgb25seSB0aGUgZGlyZWN0aW9uYWwgdmFsdWVzIGFzIHByb3BlcnRpZXMuIFlvdSBjYW4gYWxzbyBvcHRpb25hbGx5IHBhc3MgYSBudWxsIGFyZ3VtZW50IGZvciBhIGRpcmVjdGlvbmFsIHZhbHVlIHRvIGlnbm9yZSBpdC5cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLmRpcmVjdGlvbmFsUHJvcGVydHkoJ3BhZGRpbmcnLCAnMTJweCcsICcyNHB4JywgJzM2cHgnLCAnNDhweCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7ZGlyZWN0aW9uYWxQcm9wZXJ0eSgncGFkZGluZycsICcxMnB4JywgJzI0cHgnLCAnMzZweCcsICc0OHB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGRpdiB7XG4gKiAgICdwYWRkaW5nVG9wJzogJzEycHgnLFxuICogICAncGFkZGluZ1JpZ2h0JzogJzI0cHgnLFxuICogICAncGFkZGluZ0JvdHRvbSc6ICczNnB4JyxcbiAqICAgJ3BhZGRpbmdMZWZ0JzogJzQ4cHgnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gZGlyZWN0aW9uYWxQcm9wZXJ0eShwcm9wZXJ0eSkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHZhbHVlc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICAvLyAgcHJldHRpZXItaWdub3JlXG4gIHZhciBmaXJzdFZhbHVlID0gdmFsdWVzWzBdLFxuICAgICAgX3ZhbHVlcyQgPSB2YWx1ZXNbMV0sXG4gICAgICBzZWNvbmRWYWx1ZSA9IF92YWx1ZXMkID09PSB1bmRlZmluZWQgPyBmaXJzdFZhbHVlIDogX3ZhbHVlcyQsXG4gICAgICBfdmFsdWVzJDIgPSB2YWx1ZXNbMl0sXG4gICAgICB0aGlyZFZhbHVlID0gX3ZhbHVlcyQyID09PSB1bmRlZmluZWQgPyBmaXJzdFZhbHVlIDogX3ZhbHVlcyQyLFxuICAgICAgX3ZhbHVlcyQzID0gdmFsdWVzWzNdLFxuICAgICAgZm91cnRoVmFsdWUgPSBfdmFsdWVzJDMgPT09IHVuZGVmaW5lZCA/IHNlY29uZFZhbHVlIDogX3ZhbHVlcyQzO1xuXG4gIHZhciB2YWx1ZXNXaXRoRGVmYXVsdHMgPSBbZmlyc3RWYWx1ZSwgc2Vjb25kVmFsdWUsIHRoaXJkVmFsdWUsIGZvdXJ0aFZhbHVlXTtcbiAgcmV0dXJuIGdlbmVyYXRlU3R5bGVzKHByb3BlcnR5LCB2YWx1ZXNXaXRoRGVmYXVsdHMpO1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIENoZWNrIGlmIGEgc3RyaW5nIGVuZHMgd2l0aCBzb21ldGhpbmdcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBlbmRzV2l0aCA9IGZ1bmN0aW9uIChzdHJpbmcsIHN1ZmZpeCkge1xuICByZXR1cm4gc3RyaW5nLnN1YnN0cigtc3VmZml4Lmxlbmd0aCkgPT09IHN1ZmZpeDtcbn07XG5cbi8vICAgICAgXG5cbi8qKlxuICogU3RyaXAgdGhlIHVuaXQgZnJvbSBhIGdpdmVuIENTUyB2YWx1ZSwgcmV0dXJuaW5nIGp1c3QgdGhlIG51bWJlci4gKG9yIHRoZSBvcmlnaW5hbCB2YWx1ZSBpZiBhbiBpbnZhbGlkIHN0cmluZyB3YXMgcGFzc2VkKVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgICctLWRpbWVuc2lvbic6IHN0cmlwVW5pdCgnMTAwcHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAtLWRpbWVuc2lvbjogJHtzdHJpcFVuaXQoJzEwMHB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICAnLS1kaW1lbnNpb24nOiAxMDBcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBzdHJpcFVuaXQodmFsdWUpIHtcbiAgdmFyIHVuaXRsZXNzVmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgaWYgKGlzTmFOKHVuaXRsZXNzVmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIHJldHVybiB1bml0bGVzc1ZhbHVlO1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHBpeGVsLXRvLXggY29udmVydGVyc1xuICogQHByaXZhdGVcbiAqL1xudmFyIHB4dG9GYWN0b3J5ID0gZnVuY3Rpb24gcHh0b0ZhY3RvcnkodG8pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChweHZhbCkge1xuICAgIHZhciBiYXNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnMTZweCc7XG5cbiAgICB2YXIgbmV3UHh2YWwgPSBweHZhbDtcbiAgICB2YXIgbmV3QmFzZSA9IGJhc2U7XG4gICAgaWYgKHR5cGVvZiBweHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghZW5kc1dpdGgocHh2YWwsICdweCcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgZW5kaW5nIGluIFwicHhcIiBvciBhIG51bWJlciBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvICcgKyB0byArICcoKSwgZ290IFwiJyArIHB4dmFsICsgJ1wiIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgICBuZXdQeHZhbCA9IHN0cmlwVW5pdChweHZhbCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBiYXNlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKCFlbmRzV2l0aChiYXNlLCAncHgnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIGVuZGluZyBpbiBcInB4XCIgb3IgYSBudW1iZXIgcGFzc2VkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gJyArIHRvICsgJygpLCBnb3QgXCInICsgYmFzZSArICdcIiBpbnN0ZWFkLicpO1xuICAgICAgfVxuICAgICAgbmV3QmFzZSA9IHN0cmlwVW5pdChiYXNlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5ld1B4dmFsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgaW52YWxpZCBwaXhlbCB2YWx1ZSAoXCInICsgcHh2YWwgKyAnXCIpIHRvICcgKyB0byArICcoKSwgcGxlYXNlIHBhc3MgYSB2YWx1ZSBsaWtlIFwiMTJweFwiIG9yIDEyLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmV3QmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFzc2VkIGludmFsaWQgYmFzZSB2YWx1ZSAoXCInICsgYmFzZSArICdcIikgdG8gJyArIHRvICsgJygpLCBwbGVhc2UgcGFzcyBhIHZhbHVlIGxpa2UgXCIxMnB4XCIgb3IgMTIuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnICsgbmV3UHh2YWwgLyBuZXdCYXNlICsgdG87XG4gIH07XG59O1xuXG4vLyAgICAgIFxuLyoqXG4gKiBDb252ZXJ0IHBpeGVsIHZhbHVlIHRvIGVtcy4gVGhlIGRlZmF1bHQgYmFzZSB2YWx1ZSBpcyAxNnB4LCBidXQgY2FuIGJlIGNoYW5nZWQgYnkgcGFzc2luZyBhXG4gKiBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHB4dmFsXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtiYXNlPScxNnB4J11cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgICdoZWlnaHQnOiBlbSgnMTZweCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGhlaWdodDogJHtlbSgnMTZweCcpfVxuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqXG4gKiBlbGVtZW50IHtcbiAqICAgJ2hlaWdodCc6ICcxZW0nXG4gKiB9XG4gKi9cblxudmFyIGVtID0gLyojX19QVVJFX18qL3B4dG9GYWN0b3J5KCdlbScpO1xuXG4vLyAgICAgIFxuXG52YXIgcmF0aW9OYW1lcyA9IHtcbiAgbWlub3JTZWNvbmQ6IDEuMDY3LFxuICBtYWpvclNlY29uZDogMS4xMjUsXG4gIG1pbm9yVGhpcmQ6IDEuMixcbiAgbWFqb3JUaGlyZDogMS4yNSxcbiAgcGVyZmVjdEZvdXJ0aDogMS4zMzMsXG4gIGF1Z0ZvdXJ0aDogMS40MTQsXG4gIHBlcmZlY3RGaWZ0aDogMS41LFxuICBtaW5vclNpeHRoOiAxLjYsXG4gIGdvbGRlblNlY3Rpb246IDEuNjE4LFxuICBtYWpvclNpeHRoOiAxLjY2NyxcbiAgbWlub3JTZXZlbnRoOiAxLjc3OCxcbiAgbWFqb3JTZXZlbnRoOiAxLjg3NSxcbiAgb2N0YXZlOiAyLFxuICBtYWpvclRlbnRoOiAyLjUsXG4gIG1ham9yRWxldmVudGg6IDIuNjY3LFxuICBtYWpvclR3ZWxmdGg6IDMsXG4gIGRvdWJsZU9jdGF2ZTogNFxufTtcblxuLyoqICovXG5cbi8qKlxuICogRXN0YWJsaXNoIGNvbnNpc3RlbnQgbWVhc3VyZW1lbnRzIGFuZCBzcGFjaWFsIHJlbGF0aW9uc2hpcHMgdGhyb3VnaG91dCB5b3VyIHByb2plY3RzIGJ5IGluY3JlbWVudGluZyB1cCBvciBkb3duIGEgZGVmaW5lZCBzY2FsZS4gV2UgcHJvdmlkZSBhIGxpc3Qgb2YgY29tbW9ubHkgdXNlZCBzY2FsZXMgYXMgcHJlLWRlZmluZWQgdmFyaWFibGVzLCBzZWUgYmVsb3cuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAgLy8gSW5jcmVtZW50IHR3byBzdGVwcyB1cCB0aGUgZGVmYXVsdCBzY2FsZVxuICogICAnZm9udFNpemUnOiBtb2R1bGFyU2NhbGUoMilcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgIC8vIEluY3JlbWVudCB0d28gc3RlcHMgdXAgdGhlIGRlZmF1bHQgc2NhbGVcbiAqICAgZm9udFNpemU6ICR7bW9kdWxhclNjYWxlKDIpfVxuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqXG4gKiBlbGVtZW50IHtcbiAqICAgJ2ZvbnRTaXplJzogJzEuNzc2ODllbSdcbiAqIH1cbiAqL1xuZnVuY3Rpb24gbW9kdWxhclNjYWxlKHN0ZXBzKSB7XG4gIHZhciBiYXNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnMWVtJztcbiAgdmFyIHJhdGlvID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAncGVyZmVjdEZvdXJ0aCc7XG5cbiAgaWYgKHR5cGVvZiBzdGVwcyAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgbnVtYmVyIG9mIHN0ZXBzIHRvIHRoZSBtb2R1bGFyU2NhbGUgaGVscGVyLicpO1xuICB9XG4gIGlmICh0eXBlb2YgcmF0aW8gPT09ICdzdHJpbmcnICYmICFyYXRpb05hbWVzW3JhdGlvXSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHBhc3MgYSBudW1iZXIgb3Igb25lIG9mIHRoZSBwcmVkZWZpbmVkIHNjYWxlcyB0byB0aGUgbW9kdWxhclNjYWxlIGhlbHBlciBhcyB0aGUgcmF0aW8uJyk7XG4gIH1cblxuICB2YXIgcmVhbEJhc2UgPSB0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZycgPyBzdHJpcFVuaXQoYmFzZSkgOiBiYXNlO1xuICB2YXIgcmVhbFJhdGlvID0gdHlwZW9mIHJhdGlvID09PSAnc3RyaW5nJyA/IHJhdGlvTmFtZXNbcmF0aW9dIDogcmF0aW87XG5cbiAgaWYgKHR5cGVvZiByZWFsQmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgcGFzc2VkIGFzIGJhc2UgdG8gbW9kdWxhclNjYWxlLCBleHBlY3RlZCBudW1iZXIgb3IgZW0gc3RyaW5nIGJ1dCBnb3QgXCInICsgYmFzZSArICdcIicpO1xuICB9XG5cbiAgcmV0dXJuIHJlYWxCYXNlICogTWF0aC5wb3cocmVhbFJhdGlvLCBzdGVwcykgKyAnZW0nO1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIENvbnZlcnQgcGl4ZWwgdmFsdWUgdG8gcmVtcy4gVGhlIGRlZmF1bHQgYmFzZSB2YWx1ZSBpcyAxNnB4LCBidXQgY2FuIGJlIGNoYW5nZWQgYnkgcGFzc2luZyBhXG4gKiBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHB4dmFsXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFtiYXNlPScxNnB4J11cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgICdoZWlnaHQnOiByZW0oJzE2cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBoZWlnaHQ6ICR7cmVtKCcxNnB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICAnaGVpZ2h0JzogJzFyZW0nXG4gKiB9XG4gKi9cblxudmFyIHJlbSA9IC8qI19fUFVSRV9fKi9weHRvRmFjdG9yeSgncmVtJyk7XG5cbi8vICAgICAgXG5cbi8qKlxuICogQ1NTIHRvIGNvbnRhaW4gYSBmbG9hdCAoY3JlZGl0IHRvIENTU01vam8pLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgICAuLi5jbGVhckZpeCgpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2NsZWFyRml4KCl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICcmOjphZnRlcic6IHtcbiAqICAgJ2NsZWFyJzogJ2JvdGgnLFxuICogICAnY29udGVudCc6ICdcIlwiJyxcbiAqICAgJ2Rpc3BsYXknOiAndGFibGUnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gY2xlYXJGaXgoKSB7XG4gIHZhciBfcmVmO1xuXG4gIHZhciBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcmJztcblxuICB2YXIgcHNldWRvU2VsZWN0b3IgPSBwYXJlbnQgKyAnOjphZnRlcic7XG4gIHJldHVybiBfcmVmID0ge30sIF9yZWZbcHNldWRvU2VsZWN0b3JdID0ge1xuICAgIGNsZWFyOiAnYm90aCcsXG4gICAgY29udGVudDogJ1wiXCInLFxuICAgIGRpc3BsYXk6ICd0YWJsZSdcbiAgfSwgX3JlZjtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDU1MgdG8gcmVwcmVzZW50IHRydW5jYXRlZCB0ZXh0IHdpdGggYW4gZWxsaXBzaXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4uZWxsaXBzaXMoJzI1MHB4JylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtlbGxpcHNpcygnMjUwcHgnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2OiB7XG4gKiAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXG4gKiAgICdtYXhXaWR0aCc6ICcyNTBweCcsXG4gKiAgICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxuICogICAndGV4dE92ZXJmbG93JzogJ2VsbGlwc2lzJyxcbiAqICAgJ3doaXRlU3BhY2UnOiAnbm93cmFwJyxcbiAqICAgJ3dvcmRXcmFwJzogJ25vcm1hbCdcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBlbGxpcHNpcygpIHtcbiAgdmFyIHdpZHRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnMTAwJSc7XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICBtYXhXaWR0aDogd2lkdGgsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICB3b3JkV3JhcDogJ25vcm1hbCdcbiAgfTtcbn1cblxuLy8gICAgICBcblxuLyoqICovXG5cbmZ1bmN0aW9uIGdlbmVyYXRlRmlsZVJlZmVyZW5jZXMoZm9udEZpbGVQYXRoLCBmaWxlRm9ybWF0cykge1xuICB2YXIgZmlsZUZvbnRSZWZlcmVuY2VzID0gZmlsZUZvcm1hdHMubWFwKGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICByZXR1cm4gJ3VybChcIicgKyBmb250RmlsZVBhdGggKyAnLicgKyBmb3JtYXQgKyAnXCIpJztcbiAgfSk7XG4gIHJldHVybiBmaWxlRm9udFJlZmVyZW5jZXMuam9pbignLCAnKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVMb2NhbFJlZmVyZW5jZXMobG9jYWxGb250cykge1xuICB2YXIgbG9jYWxGb250UmVmZXJlbmNlcyA9IGxvY2FsRm9udHMubWFwKGZ1bmN0aW9uIChmb250KSB7XG4gICAgcmV0dXJuICdsb2NhbChcIicgKyBmb250ICsgJ1wiKSc7XG4gIH0pO1xuICByZXR1cm4gbG9jYWxGb250UmVmZXJlbmNlcy5qb2luKCcsICcpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNvdXJjZXMoZm9udEZpbGVQYXRoLCBsb2NhbEZvbnRzLCBmaWxlRm9ybWF0cykge1xuICB2YXIgZm9udFJlZmVyZW5jZXMgPSBbXTtcbiAgaWYgKGxvY2FsRm9udHMpIGZvbnRSZWZlcmVuY2VzLnB1c2goZ2VuZXJhdGVMb2NhbFJlZmVyZW5jZXMobG9jYWxGb250cykpO1xuICBpZiAoZm9udEZpbGVQYXRoKSB7XG4gICAgZm9udFJlZmVyZW5jZXMucHVzaChnZW5lcmF0ZUZpbGVSZWZlcmVuY2VzKGZvbnRGaWxlUGF0aCwgZmlsZUZvcm1hdHMpKTtcbiAgfVxuICByZXR1cm4gZm9udFJlZmVyZW5jZXMuam9pbignLCAnKTtcbn1cblxuLyoqXG4gKiBDU1MgZm9yIGEgQGZvbnQtZmFjZSBkZWNsYXJhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCBiYXNpYyB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAgLi4uZm9udEZhY2Uoe1xuICogICAgICAnZm9udEZhbWlseSc6ICdTYW5zLVBybydcbiAqICAgICAgJ2ZvbnRGaWxlUGF0aCc6ICdwYXRoL3RvL2ZpbGUnXG4gKiAgICB9KVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIGJhc2ljIHVzYWdlXG4gKiBpbmplY3RHbG9iYWxgJHtcbiAqICAgZm9udEZhY2Uoe1xuICogICAgICdmb250RmFtaWx5JzogJ1NhbnMtUHJvJ1xuICogICAgICdmb250RmlsZVBhdGgnOiAncGF0aC90by9maWxlJ1xuICogICB9XG4gKiApfWBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogJ0Bmb250LWZhY2UnOiB7XG4gKiAgICdmb250RmFtaWx5JzogJ1NhbnMtUHJvJyxcbiAqICAgJ3NyYyc6ICd1cmwoXCJwYXRoL3RvL2ZpbGUuZW90XCIpLCB1cmwoXCJwYXRoL3RvL2ZpbGUud29mZjJcIiksIHVybChcInBhdGgvdG8vZmlsZS53b2ZmXCIpLCB1cmwoXCJwYXRoL3RvL2ZpbGUudHRmXCIpLCB1cmwoXCJwYXRoL3RvL2ZpbGUuc3ZnXCIpJyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBmb250RmFjZShfcmVmKSB7XG4gIHZhciBmb250RmFtaWx5ID0gX3JlZi5mb250RmFtaWx5LFxuICAgICAgZm9udEZpbGVQYXRoID0gX3JlZi5mb250RmlsZVBhdGgsXG4gICAgICBmb250U3RyZXRjaCA9IF9yZWYuZm9udFN0cmV0Y2gsXG4gICAgICBmb250U3R5bGUgPSBfcmVmLmZvbnRTdHlsZSxcbiAgICAgIGZvbnRWYXJpYW50ID0gX3JlZi5mb250VmFyaWFudCxcbiAgICAgIGZvbnRXZWlnaHQgPSBfcmVmLmZvbnRXZWlnaHQsXG4gICAgICBfcmVmJGZpbGVGb3JtYXRzID0gX3JlZi5maWxlRm9ybWF0cyxcbiAgICAgIGZpbGVGb3JtYXRzID0gX3JlZiRmaWxlRm9ybWF0cyA9PT0gdW5kZWZpbmVkID8gWydlb3QnLCAnd29mZjInLCAnd29mZicsICd0dGYnLCAnc3ZnJ10gOiBfcmVmJGZpbGVGb3JtYXRzLFxuICAgICAgbG9jYWxGb250cyA9IF9yZWYubG9jYWxGb250cyxcbiAgICAgIHVuaWNvZGVSYW5nZSA9IF9yZWYudW5pY29kZVJhbmdlO1xuXG4gIC8vIEVycm9yIEhhbmRsaW5nXG4gIGlmICghZm9udEZhbWlseSkgdGhyb3cgbmV3IEVycm9yKCdmb250RmFjZSBleHBlY3RzIGEgbmFtZSBvZiBhIGZvbnQtZmFtaWx5LicpO1xuICBpZiAoIWZvbnRGaWxlUGF0aCAmJiAhbG9jYWxGb250cykge1xuICAgIHRocm93IG5ldyBFcnJvcignZm9udEZhY2UgZXhwZWN0cyBlaXRoZXIgdGhlIHBhdGggdG8gdGhlIGZvbnQgZmlsZShzKSBvciBhIG5hbWUgb2YgYSBsb2NhbCBjb3B5LicpO1xuICB9XG4gIGlmIChsb2NhbEZvbnRzICYmICFBcnJheS5pc0FycmF5KGxvY2FsRm9udHMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmb250RmFjZSBleHBlY3RzIGxvY2FsRm9udHMgdG8gYmUgYW4gYXJyYXkuJyk7XG4gIH1cbiAgaWYgKCFBcnJheS5pc0FycmF5KGZpbGVGb3JtYXRzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZm9udEZhY2UgZXhwZWN0cyBmaWxlRm9ybWF0cyB0byBiZSBhbiBhcnJheS4nKTtcbiAgfVxuXG4gIHZhciBmb250RmFjZURlY2xhcmF0aW9uID0ge1xuICAgICdAZm9udC1mYWNlJzoge1xuICAgICAgZm9udEZhbWlseTogZm9udEZhbWlseSxcbiAgICAgIHNyYzogZ2VuZXJhdGVTb3VyY2VzKGZvbnRGaWxlUGF0aCwgbG9jYWxGb250cywgZmlsZUZvcm1hdHMpLFxuICAgICAgdW5pY29kZVJhbmdlOiB1bmljb2RlUmFuZ2UsXG4gICAgICBmb250U3RyZXRjaDogZm9udFN0cmV0Y2gsXG4gICAgICBmb250U3R5bGU6IGZvbnRTdHlsZSxcbiAgICAgIGZvbnRWYXJpYW50OiBmb250VmFyaWFudCxcbiAgICAgIGZvbnRXZWlnaHQ6IGZvbnRXZWlnaHRcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVtb3ZlcyB1bmRlZmluZWQgZmllbGRzIGZvciBjbGVhbmVyIGNzcyBvYmplY3QuXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZvbnRGYWNlRGVjbGFyYXRpb24pKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDU1MgdG8gaGlkZSB0ZXh0IHRvIHNob3cgYSBiYWNrZ3JvdW5kIGltYWdlIGluIGEgU0VPLWZyaWVuZGx5IHdheS5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAnYmFja2dyb3VuZEltYWdlJzogJ3VybChsb2dvLnBuZyknLFxuICogICAuLi5oaWRlVGV4dCgpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kSW1hZ2U6IHVybChsb2dvLnBuZyk7XG4gKiAgICR7aGlkZVRleHQoKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICdkaXYnOiB7XG4gKiAgICdiYWNrZ3JvdW5kSW1hZ2UnOiAndXJsKGxvZ28ucG5nKScsXG4gKiAgICd0ZXh0SW5kZW50JzogJzEwMSUnLFxuICogICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcbiAqICAgJ3doaXRlU3BhY2UnOiAnbm93cmFwJyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBoaWRlVGV4dCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0SW5kZW50OiAnMTAxJScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnXG4gIH07XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogQ1NTIHRvIGhpZGUgY29udGVudCB2aXN1YWxseSBidXQgcmVtYWluIGFjY2Vzc2libGUgdG8gc2NyZWVuIHJlYWRlcnMuXG4gKiBmcm9tIFtIVE1MNSBCb2lsZXJwbGF0ZV0oaHR0cHM6Ly9naXRodWIuY29tL2g1YnAvaHRtbDUtYm9pbGVycGxhdGUvYmxvYi85YTE3NmY1N2FmMWNmZThlYzcwMzAwZGE0NjIxZmI5YjA3ZTVmYTMxL3NyYy9jc3MvbWFpbi5jc3MjTDEyMSlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5oaWRlVmlzdWFsbHkoKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtoaWRlVmlzdWFsbHkoKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICdkaXYnOiB7XG4gKiAgICdib3JkZXInOiAnMCcsXG4gKiAgICdjbGlwJzogJ3JlY3QoMCAwIDAgMCknLFxuICogICAnY2xpcFBhdGgnOiAnaW5zZXQoNTAlKScsXG4gKiAgICdoZWlnaHQnOiAnMXB4JyxcbiAqICAgJ21hcmdpbic6ICctMXB4JyxcbiAqICAgJ292ZXJmbG93JzogJ2hpZGRlbicsXG4gKiAgICdwYWRkaW5nJzogJzAnLFxuICogICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICogICAnd2hpdGVTcGFjZSc6ICdub3dyYXAnLFxuICogICAnd2lkdGgnOiAnMXB4JyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBoaWRlVmlzdWFsbHkoKSB7XG4gIHJldHVybiB7XG4gICAgYm9yZGVyOiAnMCcsXG4gICAgY2xpcDogJ3JlY3QoMCAwIDAgMCknLFxuICAgIGNsaXBQYXRoOiAnaW5zZXQoNTAlKScsXG4gICAgaGVpZ2h0OiAnMXB4JyxcbiAgICBtYXJnaW46ICctMXB4JyxcbiAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgcGFkZGluZzogJzAnLFxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIHdpZHRoOiAnMXB4J1xuICB9O1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIG1lZGlhIHF1ZXJ5IHRvIHRhcmdldCBIaURQSSBkZXZpY2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgW2hpRFBJKDEuNSldOiB7XG4gKiAgICB3aWR0aDogMjAwcHg7XG4gKiAgfVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2hpRFBJKDEuNSl9IHtcbiAqICAgICB3aWR0aDogMjAwcHg7XG4gKiAgIH1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogJ0BtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMS41KSxcbiAqICBvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMS41KSxcbiAqICBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuNS8xKSxcbiAqICBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxNDRkcGkpLFxuICogIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDEuNWRwcHgpJzoge1xuICogICAnd2lkdGgnOiAnMjAwcHgnLFxuICogfVxuICovXG5cbmZ1bmN0aW9uIGhpRFBJKCkge1xuICB2YXIgcmF0aW8gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDEuMztcblxuICByZXR1cm4gXCJcXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiBcIiArIHJhdGlvICsgXCIpLFxcbiAgICBvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogXCIgKyByYXRpbyArIFwiKSxcXG4gICAgb25seSBzY3JlZW4gYW5kICgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiBcIiArIHJhdGlvICsgXCIvMSksXFxuICAgIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IFwiICsgTWF0aC5yb3VuZChyYXRpbyAqIDk2KSArIFwiZHBpKSxcXG4gICAgb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogXCIgKyByYXRpbyArIFwiZHBweClcXG4gIFwiO1xufVxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UgPSBmdW5jdGlvbiAoc3RyaW5ncywgcmF3KSB7XG4gIHN0cmluZ3MucmF3ID0gcmF3O1xuICByZXR1cm4gc3RyaW5ncztcbn07XG5cbnZhciBfb3BpbmlvbmF0ZWRSdWxlcztcbnZhciBfYWJiclRpdGxlO1xudmFyIF91bm9waW5pb25hdGVkUnVsZXM7XG5cbi8vICAgICAgXG52YXIgb3BpbmlvbmF0ZWRSdWxlcyA9IChfb3BpbmlvbmF0ZWRSdWxlcyA9IHtcbiAgaHRtbDoge1xuICAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJ1xuICB9LFxuXG4gIGJvZHk6IHtcbiAgICBtYXJnaW46ICcwJ1xuICB9XG5cbn0sIF9vcGluaW9uYXRlZFJ1bGVzWydhOmFjdGl2ZSxcXG4gIGE6aG92ZXInXSA9IHtcbiAgb3V0bGluZVdpZHRoOiAnMCdcbn0sIF9vcGluaW9uYXRlZFJ1bGVzWydidXR0b24sXFxuICBpbnB1dCxcXG4gIG9wdGdyb3VwLFxcbiAgc2VsZWN0LFxcbiAgdGV4dGFyZWEnXSA9IHtcbiAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxuICBmb250U2l6ZTogJzEwMCUnLFxuICBsaW5lSGVpZ2h0OiAnMS4xNSdcbn0sIF9vcGluaW9uYXRlZFJ1bGVzKTtcblxudmFyIHVub3BpbmlvbmF0ZWRSdWxlcyA9IChfdW5vcGluaW9uYXRlZFJ1bGVzID0ge1xuICBodG1sOiB7XG4gICAgbGluZUhlaWdodDogJzEuMTUnLFxuICAgIHRleHRTaXplQWRqdXN0OiAnMTAwJSdcbiAgfVxuXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydhcnRpY2xlLFxcbiAgYXNpZGUsXFxuICBmb290ZXIsXFxuICBoZWFkZXIsXFxuICBuYXYsXFxuICBzZWN0aW9uJ10gPSB7XG4gIGRpc3BsYXk6ICdibG9jaydcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuaDEgPSB7XG4gIGZvbnRTaXplOiAnMmVtJyxcbiAgbWFyZ2luOiAnMC42N2VtIDAnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydmaWdjYXB0aW9uLFxcbiAgZmlndXJlLFxcbiAgbWFpbiddID0ge1xuICBkaXNwbGF5OiAnYmxvY2snXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmZpZ3VyZSA9IHtcbiAgbWFyZ2luOiAnMWVtIDQwcHgnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmhyID0ge1xuICBib3hTaXppbmc6ICdjb250ZW50LWJveCcsXG4gIGhlaWdodDogJzAnLFxuICBvdmVyZmxvdzogJ3Zpc2libGUnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLnByZSA9IHtcbiAgZm9udEZhbWlseTogJ21vbm9zcGFjZSwgbW9ub3NwYWNlJyxcbiAgZm9udFNpemU6ICcxZW0nXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmEgPSB7XG4gICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3RyYW5zcGFyZW50JyxcbiAgJy13ZWJraXQtdGV4dC1kZWNvcmF0aW9uLXNraXAnOiAnb2JqZWN0cydcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2FiYnJbdGl0bGVdJ10gPSAoX2FiYnJUaXRsZSA9IHtcbiAgYm9yZGVyQm90dG9tOiAnbm9uZScsXG4gIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJ1xufSwgX2FiYnJUaXRsZVsndGV4dERlY29yYXRpb24nXSA9ICd1bmRlcmxpbmUgZG90dGVkJywgX2FiYnJUaXRsZSksIF91bm9waW5pb25hdGVkUnVsZXNbJ2IsXFxuICBzdHJvbmcnXSA9IHtcbiAgZm9udFdlaWdodDogJ2luaGVyaXQnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydjb2RlLFxcbiAga2JkLFxcbiAgc2FtcCddID0ge1xuICBmb250RmFtaWx5OiAnbW9ub3NwYWNlLCBtb25vc3BhY2UnLFxuICBmb250U2l6ZTogJzFlbSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuZGZuID0ge1xuICBmb250U3R5bGU6ICdpdGFsaWMnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLm1hcmsgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogJyNmZjAnLFxuICBjb2xvcjogJyMwMDAnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLnNtYWxsID0ge1xuICBmb250U2l6ZTogJzgwJSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ3N1YixcXG4gIHN1cCddID0ge1xuICBmb250U2l6ZTogJzc1JScsXG4gIGxpbmVIZWlnaHQ6ICcwJyxcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gIHZlcnRpY2FsQWxpZ246ICdiYXNlbGluZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuc3ViID0ge1xuICBib3R0b206ICctMC4yNWVtJ1xufSwgX3Vub3BpbmlvbmF0ZWRSdWxlcy5zdXAgPSB7XG4gIHRvcDogJy0wLjVlbSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2F1ZGlvLFxcbiAgdmlkZW8nXSA9IHtcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2F1ZGlvOm5vdChbY29udHJvbHNdKSddID0ge1xuICBkaXNwbGF5OiAnbm9uZScsXG4gIGhlaWdodDogJzAnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmltZyA9IHtcbiAgYm9yZGVyU3R5bGU6ICdub25lJ1xufSwgX3Vub3BpbmlvbmF0ZWRSdWxlc1snc3ZnOm5vdCg6cm9vdCknXSA9IHtcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydidXR0b24sXFxuICBpbnB1dCxcXG4gIG9wdGdyb3VwLFxcbiAgc2VsZWN0LFxcbiAgdGV4dGFyZWEnXSA9IHtcbiAgbWFyZ2luOiAnMCdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2J1dHRvbixcXG4gIGlucHV0J10gPSB7XG4gIG92ZXJmbG93OiAndmlzaWJsZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2J1dHRvbixcXG4gIHNlbGVjdCddID0ge1xuICB0ZXh0VHJhbnNmb3JtOiAnbm9uZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2J1dHRvbixcXG4gIGh0bWwgW3R5cGU9XCJidXR0b25cIl0sXFxuICBbdHlwZT1cInJlc2V0XCJdLFxcbiAgW3R5cGU9XCJzdWJtaXRcIl0nXSA9IHtcbiAgJy13ZWJraXQtYXBwZWFyYW5jZSc6ICdidXR0b24nXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydidXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuICBbdHlwZT1cImJ1dHRvblwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG4gIFt0eXBlPVwicmVzZXRcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuICBbdHlwZT1cInN1Ym1pdFwiXTo6LW1vei1mb2N1cy1pbm5lciddID0ge1xuICBib3JkZXJTdHlsZTogJ25vbmUnLFxuICBwYWRkaW5nOiAnMCdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2J1dHRvbjotbW96LWZvY3VzcmluZyxcXG4gIFt0eXBlPVwiYnV0dG9uXCJdOi1tb3otZm9jdXNyaW5nLFxcbiAgW3R5cGU9XCJyZXNldFwiXTotbW96LWZvY3VzcmluZyxcXG4gIFt0eXBlPVwic3VibWl0XCJdOi1tb3otZm9jdXNyaW5nJ10gPSB7XG4gIG91dGxpbmU6ICcxcHggZG90dGVkIEJ1dHRvblRleHQnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzLmZpZWxkc2V0ID0ge1xuICBib3JkZXI6ICcxcHggc29saWQgI2MwYzBjMCcsXG4gIG1hcmdpbjogJzAgMnB4JyxcbiAgcGFkZGluZzogJzAuMzVlbSAwLjYyNWVtIDAuNzVlbSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMubGVnZW5kID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgY29sb3I6ICdpbmhlcml0JyxcbiAgZGlzcGxheTogJ3RhYmxlJyxcbiAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJzAnLFxuICB3aGl0ZVNwYWNlOiAnbm9ybWFsJ1xufSwgX3Vub3BpbmlvbmF0ZWRSdWxlcy5wcm9ncmVzcyA9IHtcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIHZlcnRpY2FsQWxpZ246ICdiYXNlbGluZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMudGV4dGFyZWEgPSB7XG4gIG92ZXJmbG93OiAnYXV0bydcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ1t0eXBlPVwiY2hlY2tib3hcIl0sXFxuICBbdHlwZT1cInJhZGlvXCJdJ10gPSB7XG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICBwYWRkaW5nOiAnMCdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ1t0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcbiAgW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24nXSA9IHtcbiAgaGVpZ2h0OiAnYXV0bydcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ1t0eXBlPVwic2VhcmNoXCJdJ10gPSB7XG4gICctd2Via2l0LWFwcGVhcmFuY2UnOiAndGV4dGZpZWxkJyxcbiAgb3V0bGluZU9mZnNldDogJy0ycHgnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydbdHlwZT1cInNlYXJjaFwiXTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcXG4gIFt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uJ10gPSB7XG4gICctd2Via2l0LWFwcGVhcmFuY2UnOiAnbm9uZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJzo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24nXSA9IHtcbiAgJy13ZWJraXQtYXBwZWFyYW5jZSc6ICdidXR0b24nLFxuICBmb250OiAnaW5oZXJpdCdcbn0sIF91bm9waW5pb25hdGVkUnVsZXNbJ2RldGFpbHMsXFxuICBtZW51J10gPSB7XG4gIGRpc3BsYXk6ICdibG9jaydcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuc3VtbWFyeSA9IHtcbiAgZGlzcGxheTogJ2xpc3QtaXRlbSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMuY2FudmFzID0ge1xuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xufSwgX3Vub3BpbmlvbmF0ZWRSdWxlcy50ZW1wbGF0ZSA9IHtcbiAgZGlzcGxheTogJ25vbmUnXG59LCBfdW5vcGluaW9uYXRlZFJ1bGVzWydbaGlkZGVuXSddID0ge1xuICBkaXNwbGF5OiAnbm9uZSdcbn0sIF91bm9waW5pb25hdGVkUnVsZXMpO1xuXG5mdW5jdGlvbiBtZXJnZVJ1bGVzKGJhc2VSdWxlcywgYWRkaXRpb25hbFJ1bGVzKSB7XG4gIHZhciBtZXJnZWRSdWxlcyA9IF9leHRlbmRzKHt9LCBiYXNlUnVsZXMpO1xuICBPYmplY3Qua2V5cyhhZGRpdGlvbmFsUnVsZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChtZXJnZWRSdWxlc1trZXldKSB7XG4gICAgICBtZXJnZWRSdWxlc1trZXldID0gX2V4dGVuZHMoe30sIG1lcmdlZFJ1bGVzW2tleV0sIGFkZGl0aW9uYWxSdWxlc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VkUnVsZXNba2V5XSA9IF9leHRlbmRzKHt9LCBhZGRpdGlvbmFsUnVsZXNba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG1lcmdlZFJ1bGVzO1xufVxuXG4vKipcbiAqIENTUyB0byBub3JtYWxpemUgYWJub3JtYWxpdGllcyBhY3Jvc3MgYnJvd3NlcnMgKG5vcm1hbGl6ZS5jc3MgdjUuMC4wIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcylcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAgLi4ubm9ybWFsaXplKCksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGluamVjdEdsb2JhbGAke25vcm1hbGl6ZSgpfWBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogaHRtbCB7XG4gKiAgIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcbiAqICAgbGluZUhlaWdodDogMS4xNSxcbiAqICAgdGV4dFNpemVBZGp1c3Q6IDEwMCUsXG4gKiB9IC4uLlxuICovXG5mdW5jdGlvbiBub3JtYWxpemUoZXhjbHVkZU9waW5pb25hdGVkKSB7XG4gIGlmIChleGNsdWRlT3BpbmlvbmF0ZWQpIHJldHVybiB1bm9waW5pb25hdGVkUnVsZXM7XG4gIHJldHVybiBtZXJnZVJ1bGVzKHVub3BpbmlvbmF0ZWRSdWxlcywgb3BpbmlvbmF0ZWRSdWxlcyk7XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogQ1NTIHRvIHN0eWxlIHRoZSBwbGFjZWhvbGRlciBwc2V1ZG8tZWxlbWVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5wbGFjZWhvbGRlcih7J2NvbG9yJzogJ2JsdWUnfSlcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmlucHV0YFxuICogICAgJHtwbGFjZWhvbGRlcih7J2NvbG9yJzogJ2JsdWUnfSl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICdpbnB1dCc6IHtcbiAqICAgJyY6LW1vei1wbGFjZWhvbGRlcic6IHtcbiAqICAgICAnY29sb3InOiAnYmx1ZScsXG4gKiAgIH0sXG4gKiAgICcmOi1tcy1pbnB1dC1wbGFjZWhvbGRlcic6IHtcbiAqICAgICAnY29sb3InOiAnYmx1ZScsXG4gKiAgIH0sXG4gKiAgICcmOjotbW96LXBsYWNlaG9sZGVyJzoge1xuICogICAgICdjb2xvcic6ICdibHVlJyxcbiAqICAgfSxcbiAqICAgJyY6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXInOiB7XG4gKiAgICAgJ2NvbG9yJzogJ2JsdWUnLFxuICogICB9LFxuICogfSxcbiAqL1xuXG5mdW5jdGlvbiBwbGFjZWhvbGRlcihzdHlsZXMpIHtcbiAgdmFyIF9yZWY7XG5cbiAgdmFyIHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyYnO1xuXG4gIHJldHVybiBfcmVmID0ge30sIF9yZWZbcGFyZW50ICsgJzo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciddID0gX2V4dGVuZHMoe30sIHN0eWxlcyksIF9yZWZbcGFyZW50ICsgJzotbW96LXBsYWNlaG9sZGVyJ10gPSBfZXh0ZW5kcyh7fSwgc3R5bGVzKSwgX3JlZltwYXJlbnQgKyAnOjotbW96LXBsYWNlaG9sZGVyJ10gPSBfZXh0ZW5kcyh7fSwgc3R5bGVzKSwgX3JlZltwYXJlbnQgKyAnOi1tcy1pbnB1dC1wbGFjZWhvbGRlciddID0gX2V4dGVuZHMoe30sIHN0eWxlcyksIF9yZWY7XG59XG5cbnZhciBfdGVtcGxhdGVPYmplY3QgPSAvKiNfX1BVUkVfXyovIHRhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlKFsncmFkaWFsLWdyYWRpZW50KCcsICcnLCAnJywgJycsICcpJ10sIFsncmFkaWFsLWdyYWRpZW50KCcsICcnLCAnJywgJycsICcpJ10pO1xuXG4vLyAgICAgIFxuXG4vKiogKi9cblxuZnVuY3Rpb24gcGFyc2VGYWxsYmFjayhjb2xvclN0b3BzKSB7XG4gIHJldHVybiBjb2xvclN0b3BzWzBdLnNwbGl0KCcgJylbMF07XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdEdyYWRpZW50VmFsdWUobGl0ZXJhbHMpIHtcbiAgdmFyIHRlbXBsYXRlID0gJyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGl0ZXJhbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0ZW1wbGF0ZSArPSBsaXRlcmFsc1tpXTtcbiAgICAvLyBBZGRzIGxlYWRpbmcgY29tYSBpZiBwcm9wZXJ0aWVzIHByZWNlZWQgY29sb3Itc3RvcHNcbiAgICBpZiAoaSA9PT0gMyAmJiAoYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV0pICYmICgoYXJndW1lbnRzLmxlbmd0aCA8PSAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzFdKSB8fCAoYXJndW1lbnRzLmxlbmd0aCA8PSAyID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzJdKSB8fCAoYXJndW1lbnRzLmxlbmd0aCA8PSAzID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzNdKSkpIHtcbiAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUuc2xpY2UoMCwgLTEpO1xuICAgICAgdGVtcGxhdGUgKz0gJywgJyArIChhcmd1bWVudHMubGVuZ3RoIDw9IGkgKyAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzW2kgKyAxXSk7XG4gICAgICAvLyBObyB0cmFpbGluZyBzcGFjZSBpZiBjb2xvci1zdG9wcyBpcyB0aGUgb25seSBwYXJhbSBwcm92aWRlZFxuICAgIH0gZWxzZSBpZiAoaSA9PT0gMyAmJiAoYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV0pICYmICEoYXJndW1lbnRzLmxlbmd0aCA8PSAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzFdKSAmJiAhKGFyZ3VtZW50cy5sZW5ndGggPD0gMiA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1syXSkgJiYgIShhcmd1bWVudHMubGVuZ3RoIDw9IDMgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbM10pKSB7XG4gICAgICB0ZW1wbGF0ZSArPSAnJyArIChhcmd1bWVudHMubGVuZ3RoIDw9IGkgKyAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzW2kgKyAxXSk7XG4gICAgICAvLyBPbmx5IGFkZHMgc3Vic3RpdHV0aW9uIGlmIGl0IGlzIGRlZmluZWRcbiAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gaSArIDEgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbaSArIDFdKSB7XG4gICAgICB0ZW1wbGF0ZSArPSAoYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV0pICsgJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGVtcGxhdGUudHJpbSgpO1xufVxuXG4vKipcbiAqIENTUyBmb3IgZGVjbGFyaW5nIGEgcmFkaWFsIGdyYWRpZW50LCBpbmNsdWRpbmcgYSBmYWxsYmFjayBiYWNrZ3JvdW5kLWNvbG9yLiBUaGUgZmFsbGJhY2sgaXMgZWl0aGVyIHRoZSBmaXJzdCBjb2xvci1zdG9wIG9yIGFuIGV4cGxpY2l0bHkgcGFzc2VkIGZhbGxiYWNrIGNvbG9yLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLnJhZGlhbEdyYWRpZW50KHtcbiAqICAgICBjb2xvclN0b3BzOiBbJyMwMEZGRkYgMCUnLCAncmdiYSgwLCAwLCAyNTUsIDApIDUwJScsICcjMDAwMEZGIDk1JSddLFxuICogICAgIGV4dGVudDogJ2ZhcnRoZXN0LWNvcm5lciBhdCA0NXB4IDQ1cHgnLFxuICogICAgIHBvc2l0aW9uOiAnY2VudGVyJyxcbiAqICAgICBzaGFwZTogJ2VsbGlwc2UnLFxuICogICB9KVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3JhZGlhbEdyYWRpZW50KHtcbiAqICAgICBjb2xvclN0b3BzOiBbJyMwMEZGRkYgMCUnLCAncmdiYSgwLCAwLCAyNTUsIDApIDUwJScsICcjMDAwMEZGIDk1JSddLFxuICogICAgIGV4dGVudDogJ2ZhcnRoZXN0LWNvcm5lciBhdCA0NXB4IDQ1cHgnLFxuICogICAgIHBvc2l0aW9uOiAnY2VudGVyJyxcbiAqICAgICBzaGFwZTogJ2VsbGlwc2UnLFxuICogICB9KX1cbiAqYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXY6IHtcbiAqICAgJ2JhY2tncm91bmRDb2xvcic6ICcjMDBGRkZGJyxcbiAqICAgJ2JhY2tncm91bmRJbWFnZSc6ICdyYWRpYWwtZ3JhZGllbnQoY2VudGVyIGVsbGlwc2UgZmFydGhlc3QtY29ybmVyIGF0IDQ1cHggNDVweCwgIzAwRkZGRiAwJSwgcmdiYSgwLCAwLCAyNTUsIDApIDUwJSwgIzAwMDBGRiA5NSUpJyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiByYWRpYWxHcmFkaWVudChfcmVmKSB7XG4gIHZhciBjb2xvclN0b3BzID0gX3JlZi5jb2xvclN0b3BzLFxuICAgICAgZXh0ZW50ID0gX3JlZi5leHRlbnQsXG4gICAgICBmYWxsYmFjayA9IF9yZWYuZmFsbGJhY2ssXG4gICAgICBwb3NpdGlvbiA9IF9yZWYucG9zaXRpb24sXG4gICAgICBzaGFwZSA9IF9yZWYuc2hhcGU7XG5cbiAgaWYgKCFjb2xvclN0b3BzIHx8IGNvbG9yU3RvcHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcigncmFkaWFsR3JhZGllbnQgcmVxdXJpZXMgYXQgbGVhc3QgMiBjb2xvci1zdG9wcyB0byBwcm9wZXJseSByZW5kZXIuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGZhbGxiYWNrIHx8IHBhcnNlRmFsbGJhY2soY29sb3JTdG9wcyksXG4gICAgYmFja2dyb3VuZEltYWdlOiBjb25zdHJ1Y3RHcmFkaWVudFZhbHVlKF90ZW1wbGF0ZU9iamVjdCwgcG9zaXRpb24sIHNoYXBlLCBleHRlbnQsIGNvbG9yU3RvcHMuam9pbignLCAnKSlcbiAgfTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBBIGhlbHBlciB0byBnZW5lcmF0ZSBhIHJldGluYSBiYWNrZ3JvdW5kIGltYWdlIGFuZCBub24tcmV0aW5hXG4gKiBiYWNrZ3JvdW5kIGltYWdlLiBUaGUgcmV0aW5hIGJhY2tncm91bmQgaW1hZ2Ugd2lsbCBvdXRwdXQgdG8gYSBIaURQSSBtZWRpYSBxdWVyeS4gVGhlIG1peGluIHVzZXNcbiAqIGEgXzJ4LnBuZyBmaWxlbmFtZSBzdWZmaXggYnkgZGVmYXVsdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogIC4uLnJldGluYUltYWdlKCdteS1pbWcnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3JldGluYUltYWdlKCdteS1pbWcnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKiBkaXYge1xuICogICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwobXktaW1nLnBuZyknLFxuICogICAnQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpLFxuICogICAgb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMyksXG4gKiAgICBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMy8xKSxcbiAqICAgIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDE0NGRwaSksXG4gKiAgICBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxLjVkcHB4KSc6IHtcbiAqICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwobXktaW1nXzJ4LnBuZyknLFxuICogICB9XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHJldGluYUltYWdlKGZpbGVuYW1lLCBiYWNrZ3JvdW5kU2l6ZSkge1xuICB2YXIgZXh0ZW5zaW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAncG5nJztcblxuICB2YXIgX3JlZjtcblxuICB2YXIgcmV0aW5hRmlsZW5hbWUgPSBhcmd1bWVudHNbM107XG4gIHZhciByZXRpbmFTdWZmaXggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6ICdfMngnO1xuXG4gIGlmICghZmlsZW5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBzdXBwbHkgYSBmaWxlbmFtZSB0byByZXRpbmFJbWFnZSgpIGFzIHRoZSBmaXJzdCBhcmd1bWVudC4nKTtcbiAgfVxuICAvLyBSZXBsYWNlIHRoZSBkb3QgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGFzc2VkIGV4dGVuc2lvbiBpZiBvbmUgZXhpc3RzXG4gIHZhciBleHQgPSBleHRlbnNpb24ucmVwbGFjZSgvXlxcLi8sICcnKTtcbiAgdmFyIHJGaWxlbmFtZSA9IHJldGluYUZpbGVuYW1lID8gcmV0aW5hRmlsZW5hbWUgKyAnLicgKyBleHQgOiAnJyArIGZpbGVuYW1lICsgcmV0aW5hU3VmZml4ICsgJy4nICsgZXh0O1xuXG4gIHJldHVybiBfcmVmID0ge1xuICAgIGJhY2tncm91bmRJbWFnZTogJ3VybCgnICsgZmlsZW5hbWUgKyAnLicgKyBleHQgKyAnKSdcbiAgfSwgX3JlZltoaURQSSgpXSA9IHtcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIHJGaWxlbmFtZSArICcpJyxcbiAgICBiYWNrZ3JvdW5kU2l6ZTogYmFja2dyb3VuZFNpemVcbiAgfSwgX3JlZjtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDU1MgdG8gc3R5bGUgdGhlIHNlbGVjdGlvbiBwc2V1ZG8tZWxlbWVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5zZWxlY3Rpb24oe1xuICogICAgICdiYWNrZ3JvdW5kQ29sb3InOiAnYmx1ZSdcbiAqICAgfSwgJ3NlY3Rpb24nKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3NlbGVjdGlvbih7J2JhY2tncm91bmRDb2xvcic6ICdibHVlJ30sICdzZWN0aW9uJyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqICdkaXYnOiB7XG4gKiAgICdzZWN0aW9uOjotbW96LXNlbGVjdGlvbic6IHtcbiAqICAgICAnYmFja2dyb3VuZENvbG9yJzonYmx1ZScsXG4gKiAgIH0sXG4gKiAgICdzZWN0aW9uOjpzZWxlY3Rpb24nOiB7XG4gKiAgICAgJ2JhY2tncm91bmRDb2xvcic6ICdibHVlJyxcbiAqICAgfVxuICogfVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdGlvbihzdHlsZXMpIHtcbiAgdmFyIF9yZWY7XG5cbiAgdmFyIHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG5cbiAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltwYXJlbnQgKyAnOjotbW96LXNlbGVjdGlvbiddID0gX2V4dGVuZHMoe30sIHN0eWxlcyksIF9yZWZbcGFyZW50ICsgJzo6c2VsZWN0aW9uJ10gPSBfZXh0ZW5kcyh7fSwgc3R5bGVzKSwgX3JlZjtcbn1cblxuLy8gICAgICBcblxuLyogZXNsaW50LWRpc2FibGUga2V5LXNwYWNpbmcgKi9cbnZhciBmdW5jdGlvbnNNYXAgPSB7XG4gIGVhc2VJbkJhY2s6ICdjdWJpYy1iZXppZXIoMC42MDAsIC0wLjI4MCwgMC43MzUsIDAuMDQ1KScsXG4gIGVhc2VJbkNpcmM6ICdjdWJpYy1iZXppZXIoMC42MDAsICAwLjA0MCwgMC45ODAsIDAuMzM1KScsXG4gIGVhc2VJbkN1YmljOiAnY3ViaWMtYmV6aWVyKDAuNTUwLCAgMC4wNTUsIDAuNjc1LCAwLjE5MCknLFxuICBlYXNlSW5FeHBvOiAnY3ViaWMtYmV6aWVyKDAuOTUwLCAgMC4wNTAsIDAuNzk1LCAwLjAzNSknLFxuICBlYXNlSW5RdWFkOiAnY3ViaWMtYmV6aWVyKDAuNTUwLCAgMC4wODUsIDAuNjgwLCAwLjUzMCknLFxuICBlYXNlSW5RdWFydDogJ2N1YmljLWJlemllcigwLjg5NSwgIDAuMDMwLCAwLjY4NSwgMC4yMjApJyxcbiAgZWFzZUluUXVpbnQ6ICdjdWJpYy1iZXppZXIoMC43NTUsICAwLjA1MCwgMC44NTUsIDAuMDYwKScsXG4gIGVhc2VJblNpbmU6ICdjdWJpYy1iZXppZXIoMC40NzAsICAwLjAwMCwgMC43NDUsIDAuNzE1KScsXG5cbiAgZWFzZU91dEJhY2s6ICdjdWJpYy1iZXppZXIoMC4xNzUsICAwLjg4NSwgMC4zMjAsIDEuMjc1KScsXG4gIGVhc2VPdXRDdWJpYzogJ2N1YmljLWJlemllcigwLjIxNSwgIDAuNjEwLCAwLjM1NSwgMS4wMDApJyxcbiAgZWFzZU91dENpcmM6ICdjdWJpYy1iZXppZXIoMC4wNzUsICAwLjgyMCwgMC4xNjUsIDEuMDAwKScsXG4gIGVhc2VPdXRFeHBvOiAnY3ViaWMtYmV6aWVyKDAuMTkwLCAgMS4wMDAsIDAuMjIwLCAxLjAwMCknLFxuICBlYXNlT3V0UXVhZDogJ2N1YmljLWJlemllcigwLjI1MCwgIDAuNDYwLCAwLjQ1MCwgMC45NDApJyxcbiAgZWFzZU91dFF1YXJ0OiAnY3ViaWMtYmV6aWVyKDAuMTY1LCAgMC44NDAsIDAuNDQwLCAxLjAwMCknLFxuICBlYXNlT3V0UXVpbnQ6ICdjdWJpYy1iZXppZXIoMC4yMzAsICAxLjAwMCwgMC4zMjAsIDEuMDAwKScsXG4gIGVhc2VPdXRTaW5lOiAnY3ViaWMtYmV6aWVyKDAuMzkwLCAgMC41NzUsIDAuNTY1LCAxLjAwMCknLFxuXG4gIGVhc2VJbk91dEJhY2s6ICdjdWJpYy1iZXppZXIoMC42ODAsIC0wLjU1MCwgMC4yNjUsIDEuNTUwKScsXG4gIGVhc2VJbk91dENpcmM6ICdjdWJpYy1iZXppZXIoMC43ODUsICAwLjEzNSwgMC4xNTAsIDAuODYwKScsXG4gIGVhc2VJbk91dEN1YmljOiAnY3ViaWMtYmV6aWVyKDAuNjQ1LCAgMC4wNDUsIDAuMzU1LCAxLjAwMCknLFxuICBlYXNlSW5PdXRFeHBvOiAnY3ViaWMtYmV6aWVyKDEuMDAwLCAgMC4wMDAsIDAuMDAwLCAxLjAwMCknLFxuICBlYXNlSW5PdXRRdWFkOiAnY3ViaWMtYmV6aWVyKDAuNDU1LCAgMC4wMzAsIDAuNTE1LCAwLjk1NSknLFxuICBlYXNlSW5PdXRRdWFydDogJ2N1YmljLWJlemllcigwLjc3MCwgIDAuMDAwLCAwLjE3NSwgMS4wMDApJyxcbiAgZWFzZUluT3V0UXVpbnQ6ICdjdWJpYy1iZXppZXIoMC44NjAsICAwLjAwMCwgMC4wNzAsIDEuMDAwKScsXG4gIGVhc2VJbk91dFNpbmU6ICdjdWJpYy1iZXppZXIoMC40NDUsICAwLjA1MCwgMC41NTAsIDAuOTUwKSdcbn07XG4vKiBlc2xpbnQtZW5hYmxlIGtleS1zcGFjaW5nICovXG5cbi8qKiAqL1xuXG4vKipcbiAqIFN0cmluZyB0byByZXByZXNlbnQgY29tbW9uIGVhc2luZyBmdW5jdGlvbnMgYXMgZGVtb25zdHJhdGVkIGhlcmU6IChnaXRodWIuY29tL2phdWtpYS9lYXNpZSkuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgJ3RyYW5zaXRpb25UaW1pbmdGdW5jdGlvbic6IHRpbWluZ0Z1bmN0aW9ucygnZWFzZUluUXVhZCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqICBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICB0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246ICR7dGltaW5nRnVuY3Rpb25zKCdlYXNlSW5RdWFkJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiAnZGl2Jzoge1xuICogICAndHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uJzogJ2N1YmljLWJlemllcigwLjU1MCwgIDAuMDg1LCAwLjY4MCwgMC41MzApJyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiB0aW1pbmdGdW5jdGlvbnModGltaW5nRnVuY3Rpb24pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uc01hcFt0aW1pbmdGdW5jdGlvbl07XG59XG5cbi8vICAgICAgXG5cbi8qKiAqL1xuXG52YXIgZ2V0Qm9yZGVyV2lkdGggPSBmdW5jdGlvbiBnZXRCb3JkZXJXaWR0aChwb2ludGluZ0RpcmVjdGlvbiwgaGVpZ2h0LCB3aWR0aCkge1xuICBzd2l0Y2ggKHBvaW50aW5nRGlyZWN0aW9uKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIHJldHVybiAnMCAnICsgd2lkdGggLyAyICsgJ3B4ICcgKyBoZWlnaHQgKyAncHggJyArIHdpZHRoIC8gMiArICdweCc7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gaGVpZ2h0IC8gMiArICdweCAnICsgd2lkdGggKyAncHggJyArIGhlaWdodCAvIDIgKyAncHggMCc7XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHJldHVybiBoZWlnaHQgKyAncHggJyArIHdpZHRoIC8gMiArICdweCAwICcgKyB3aWR0aCAvIDIgKyAncHgnO1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIHJldHVybiBoZWlnaHQgLyAyICsgJ3B4IDAgJyArIGhlaWdodCAvIDIgKyAncHggJyArIHdpZHRoICsgJ3B4JztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXNzZWQgaW52YWxpZCBhcmd1bWVudCB0byB0cmlhbmdsZSwgcGxlYXNlIHBhc3MgY29ycmVjdCBwb2l0aW5nRGlyZWN0aW9uIGUuZy4gJ3JpZ2h0Jy5cIik7XG4gIH1cbn07XG5cbi8vIG5lZWRlZCBmb3IgYm9yZGVyLWNvbG9yXG52YXIgcmV2ZXJzZURpcmVjdGlvbiA9IHtcbiAgbGVmdDogJ1JpZ2h0JyxcbiAgcmlnaHQ6ICdMZWZ0JyxcbiAgdG9wOiAnQm90dG9tJyxcbiAgYm90dG9tOiAnVG9wJ1xufTtcblxuLyoqXG4gKiBDU1MgdG8gcmVwcmVzZW50IHRyaWFuZ2xlIHdpdGggYW55IHBvaW50aW5nIGRpcmVjdGlvbiB3aXRoIGFuIG9wdGlvbmFsIGJhY2tncm91bmQgY29sb3IuIEFjY2VwdHMgbnVtYmVyIG9yIHB4IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICpcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4udHJpYW5nbGUoeyBwb2ludGluZ0RpcmVjdGlvbjogJ3JpZ2h0Jywgd2lkdGg6ICcxMDBweCcsIGhlaWdodDogJzEwMHB4JywgZm9yZWdyb3VuZENvbG9yOiAncmVkJyB9KVxuICogfVxuICpcbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHt0cmlhbmdsZSh7IHBvaW50aW5nRGlyZWN0aW9uOiAncmlnaHQnLCB3aWR0aDogJzEwMHB4JywgaGVpZ2h0OiAnMTAwcHgnLCBmb3JlZ3JvdW5kQ29sb3I6ICdyZWQnIH0pfVxuICpcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2OiB7XG4gKiAgJ2JvcmRlckNvbG9yJzogJ3RyYW5zcGFyZW50JyxcbiAqICAnYm9yZGVyTGVmdENvbG9yJzogJ3JlZCAhaW1wb3J0YW50JyxcbiAqICAnYm9yZGVyU3R5bGUnOiAnc29saWQnLFxuICogICdib3JkZXJXaWR0aCc6ICc1MHB4IDAgNTBweCAxMDBweCcsXG4gKiAgJ2hlaWdodCc6ICcwJyxcbiAqICAnd2lkdGgnOiAnMCcsXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gdHJpYW5nbGUoX3JlZikge1xuICB2YXIgX3JlZjI7XG5cbiAgdmFyIHBvaW50aW5nRGlyZWN0aW9uID0gX3JlZi5wb2ludGluZ0RpcmVjdGlvbixcbiAgICAgIGhlaWdodCA9IF9yZWYuaGVpZ2h0LFxuICAgICAgd2lkdGggPSBfcmVmLndpZHRoLFxuICAgICAgZm9yZWdyb3VuZENvbG9yID0gX3JlZi5mb3JlZ3JvdW5kQ29sb3IsXG4gICAgICBfcmVmJGJhY2tncm91bmRDb2xvciA9IF9yZWYuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYmFja2dyb3VuZENvbG9yID0gX3JlZiRiYWNrZ3JvdW5kQ29sb3IgPT09IHVuZGVmaW5lZCA/ICd0cmFuc3BhcmVudCcgOiBfcmVmJGJhY2tncm91bmRDb2xvcjtcblxuICB2YXIgdW5pdGxlc3NIZWlnaHQgPSBwYXJzZUZsb2F0KGhlaWdodCk7XG4gIHZhciB1bml0bGVzc1dpZHRoID0gcGFyc2VGbG9hdCh3aWR0aCk7XG4gIGlmIChpc05hTih1bml0bGVzc0hlaWdodCkgfHwgaXNOYU4odW5pdGxlc3NXaWR0aCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBhbiBpbnZhbGlkIHZhbHVlIHRvIGBoZWlnaHRgIG9yIGB3aWR0aGAuIFBsZWFzZSBwcm92aWRlIGEgcGl4ZWwgYmFzZWQgdW5pdCcpO1xuICB9XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGJvcmRlckNvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgd2lkdGg6ICcwJyxcbiAgICBoZWlnaHQ6ICcwJyxcbiAgICBib3JkZXJXaWR0aDogZ2V0Qm9yZGVyV2lkdGgocG9pbnRpbmdEaXJlY3Rpb24sIHVuaXRsZXNzSGVpZ2h0LCB1bml0bGVzc1dpZHRoKSxcbiAgICBib3JkZXJTdHlsZTogJ3NvbGlkJ1xuICB9LCBfcmVmMlsnYm9yZGVyJyArIHJldmVyc2VEaXJlY3Rpb25bcG9pbnRpbmdEaXJlY3Rpb25dICsgJ0NvbG9yJ10gPSBmb3JlZ3JvdW5kQ29sb3IgKyAnICFpbXBvcnRhbnQnLCBfcmVmMjtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBQcm92aWRlcyBhbiBlYXN5IHdheSB0byBjaGFuZ2UgdGhlIGB3b3JkV3JhcGAgcHJvcGVydHkuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4ud29yZFdyYXAoJ2JyZWFrLXdvcmQnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3dvcmRXcmFwKCdicmVhay13b3JkJyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgb3ZlcmZsb3dXcmFwOiAnYnJlYWstd29yZCcsXG4gKiAgIHdvcmRXcmFwOiAnYnJlYWstd29yZCcsXG4gKiAgIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gd29yZFdyYXAoKSB7XG4gIHZhciB3cmFwID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnYnJlYWstd29yZCc7XG5cbiAgdmFyIHdvcmRCcmVhayA9IHdyYXAgPT09ICdicmVhay13b3JkJyA/ICdicmVhay1hbGwnIDogd3JhcDtcbiAgcmV0dXJuIHtcbiAgICBvdmVyZmxvd1dyYXA6IHdyYXAsXG4gICAgd29yZFdyYXA6IHdyYXAsXG4gICAgd29yZEJyZWFrOiB3b3JkQnJlYWtcbiAgfTtcbn1cblxuLy8gICAgICBcblxuXG5mdW5jdGlvbiBjb2xvclRvSW50KGNvbG9yKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKGNvbG9yICogMjU1KTtcbn1cblxuZnVuY3Rpb24gY29udmVydFRvSW50KHJlZCwgZ3JlZW4sIGJsdWUpIHtcbiAgcmV0dXJuIGNvbG9yVG9JbnQocmVkKSArIFwiLFwiICsgY29sb3JUb0ludChncmVlbikgKyBcIixcIiArIGNvbG9yVG9JbnQoYmx1ZSk7XG59XG5cbmZ1bmN0aW9uIGhzbFRvUmdiKGh1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzKSB7XG4gIHZhciBjb252ZXJ0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBjb252ZXJ0VG9JbnQ7XG5cbiAgaWYgKHNhdHVyYXRpb24gPT09IDApIHtcbiAgICAvLyBhY2hyb21hdGljXG4gICAgcmV0dXJuIGNvbnZlcnQobGlnaHRuZXNzLCBsaWdodG5lc3MsIGxpZ2h0bmVzcyk7XG4gIH1cblxuICAvLyBmb3JtdWxhciBmcm9tIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hTTF9hbmRfSFNWXG4gIHZhciBodWVQcmltZSA9IGh1ZSAlIDM2MCAvIDYwO1xuICB2YXIgY2hyb21hID0gKDEgLSBNYXRoLmFicygyICogbGlnaHRuZXNzIC0gMSkpICogc2F0dXJhdGlvbjtcbiAgdmFyIHNlY29uZENvbXBvbmVudCA9IGNocm9tYSAqICgxIC0gTWF0aC5hYnMoaHVlUHJpbWUgJSAyIC0gMSkpO1xuXG4gIHZhciByZWQgPSAwO1xuICB2YXIgZ3JlZW4gPSAwO1xuICB2YXIgYmx1ZSA9IDA7XG5cbiAgaWYgKGh1ZVByaW1lID49IDAgJiYgaHVlUHJpbWUgPCAxKSB7XG4gICAgcmVkID0gY2hyb21hO1xuICAgIGdyZWVuID0gc2Vjb25kQ29tcG9uZW50O1xuICB9IGVsc2UgaWYgKGh1ZVByaW1lID49IDEgJiYgaHVlUHJpbWUgPCAyKSB7XG4gICAgcmVkID0gc2Vjb25kQ29tcG9uZW50O1xuICAgIGdyZWVuID0gY2hyb21hO1xuICB9IGVsc2UgaWYgKGh1ZVByaW1lID49IDIgJiYgaHVlUHJpbWUgPCAzKSB7XG4gICAgZ3JlZW4gPSBjaHJvbWE7XG4gICAgYmx1ZSA9IHNlY29uZENvbXBvbmVudDtcbiAgfSBlbHNlIGlmIChodWVQcmltZSA+PSAzICYmIGh1ZVByaW1lIDwgNCkge1xuICAgIGdyZWVuID0gc2Vjb25kQ29tcG9uZW50O1xuICAgIGJsdWUgPSBjaHJvbWE7XG4gIH0gZWxzZSBpZiAoaHVlUHJpbWUgPj0gNCAmJiBodWVQcmltZSA8IDUpIHtcbiAgICByZWQgPSBzZWNvbmRDb21wb25lbnQ7XG4gICAgYmx1ZSA9IGNocm9tYTtcbiAgfSBlbHNlIGlmIChodWVQcmltZSA+PSA1ICYmIGh1ZVByaW1lIDwgNikge1xuICAgIHJlZCA9IGNocm9tYTtcbiAgICBibHVlID0gc2Vjb25kQ29tcG9uZW50O1xuICB9XG5cbiAgdmFyIGxpZ2h0bmVzc01vZGlmaWNhdGlvbiA9IGxpZ2h0bmVzcyAtIGNocm9tYSAvIDI7XG4gIHZhciBmaW5hbFJlZCA9IHJlZCArIGxpZ2h0bmVzc01vZGlmaWNhdGlvbjtcbiAgdmFyIGZpbmFsR3JlZW4gPSBncmVlbiArIGxpZ2h0bmVzc01vZGlmaWNhdGlvbjtcbiAgdmFyIGZpbmFsQmx1ZSA9IGJsdWUgKyBsaWdodG5lc3NNb2RpZmljYXRpb247XG4gIHJldHVybiBjb252ZXJ0KGZpbmFsUmVkLCBmaW5hbEdyZWVuLCBmaW5hbEJsdWUpO1xufVxuXG4vLyAgICAgIFxudmFyIG5hbWVkQ29sb3JNYXAgPSB7XG4gIGFsaWNlYmx1ZTogJ2YwZjhmZicsXG4gIGFudGlxdWV3aGl0ZTogJ2ZhZWJkNycsXG4gIGFxdWE6ICcwMGZmZmYnLFxuICBhcXVhbWFyaW5lOiAnN2ZmZmQ0JyxcbiAgYXp1cmU6ICdmMGZmZmYnLFxuICBiZWlnZTogJ2Y1ZjVkYycsXG4gIGJpc3F1ZTogJ2ZmZTRjNCcsXG4gIGJsYWNrOiAnMDAwJyxcbiAgYmxhbmNoZWRhbG1vbmQ6ICdmZmViY2QnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgYmx1ZXZpb2xldDogJzhhMmJlMicsXG4gIGJyb3duOiAnYTUyYTJhJyxcbiAgYnVybHl3b29kOiAnZGViODg3JyxcbiAgY2FkZXRibHVlOiAnNWY5ZWEwJyxcbiAgY2hhcnRyZXVzZTogJzdmZmYwMCcsXG4gIGNob2NvbGF0ZTogJ2QyNjkxZScsXG4gIGNvcmFsOiAnZmY3ZjUwJyxcbiAgY29ybmZsb3dlcmJsdWU6ICc2NDk1ZWQnLFxuICBjb3Juc2lsazogJ2ZmZjhkYycsXG4gIGNyaW1zb246ICdkYzE0M2MnLFxuICBjeWFuOiAnMDBmZmZmJyxcbiAgZGFya2JsdWU6ICcwMDAwOGInLFxuICBkYXJrY3lhbjogJzAwOGI4YicsXG4gIGRhcmtnb2xkZW5yb2Q6ICdiODg2MGInLFxuICBkYXJrZ3JheTogJ2E5YTlhOScsXG4gIGRhcmtncmVlbjogJzAwNjQwMCcsXG4gIGRhcmtncmV5OiAnYTlhOWE5JyxcbiAgZGFya2toYWtpOiAnYmRiNzZiJyxcbiAgZGFya21hZ2VudGE6ICc4YjAwOGInLFxuICBkYXJrb2xpdmVncmVlbjogJzU1NmIyZicsXG4gIGRhcmtvcmFuZ2U6ICdmZjhjMDAnLFxuICBkYXJrb3JjaGlkOiAnOTkzMmNjJyxcbiAgZGFya3JlZDogJzhiMDAwMCcsXG4gIGRhcmtzYWxtb246ICdlOTk2N2EnLFxuICBkYXJrc2VhZ3JlZW46ICc4ZmJjOGYnLFxuICBkYXJrc2xhdGVibHVlOiAnNDgzZDhiJyxcbiAgZGFya3NsYXRlZ3JheTogJzJmNGY0ZicsXG4gIGRhcmtzbGF0ZWdyZXk6ICcyZjRmNGYnLFxuICBkYXJrdHVycXVvaXNlOiAnMDBjZWQxJyxcbiAgZGFya3Zpb2xldDogJzk0MDBkMycsXG4gIGRlZXBwaW5rOiAnZmYxNDkzJyxcbiAgZGVlcHNreWJsdWU6ICcwMGJmZmYnLFxuICBkaW1ncmF5OiAnNjk2OTY5JyxcbiAgZGltZ3JleTogJzY5Njk2OScsXG4gIGRvZGdlcmJsdWU6ICcxZTkwZmYnLFxuICBmaXJlYnJpY2s6ICdiMjIyMjInLFxuICBmbG9yYWx3aGl0ZTogJ2ZmZmFmMCcsXG4gIGZvcmVzdGdyZWVuOiAnMjI4YjIyJyxcbiAgZnVjaHNpYTogJ2ZmMDBmZicsXG4gIGdhaW5zYm9ybzogJ2RjZGNkYycsXG4gIGdob3N0d2hpdGU6ICdmOGY4ZmYnLFxuICBnb2xkOiAnZmZkNzAwJyxcbiAgZ29sZGVucm9kOiAnZGFhNTIwJyxcbiAgZ3JheTogJzgwODA4MCcsXG4gIGdyZWVuOiAnMDA4MDAwJyxcbiAgZ3JlZW55ZWxsb3c6ICdhZGZmMmYnLFxuICBncmV5OiAnODA4MDgwJyxcbiAgaG9uZXlkZXc6ICdmMGZmZjAnLFxuICBob3RwaW5rOiAnZmY2OWI0JyxcbiAgaW5kaWFucmVkOiAnY2Q1YzVjJyxcbiAgaW5kaWdvOiAnNGIwMDgyJyxcbiAgaXZvcnk6ICdmZmZmZjAnLFxuICBraGFraTogJ2YwZTY4YycsXG4gIGxhdmVuZGVyOiAnZTZlNmZhJyxcbiAgbGF2ZW5kZXJibHVzaDogJ2ZmZjBmNScsXG4gIGxhd25ncmVlbjogJzdjZmMwMCcsXG4gIGxlbW9uY2hpZmZvbjogJ2ZmZmFjZCcsXG4gIGxpZ2h0Ymx1ZTogJ2FkZDhlNicsXG4gIGxpZ2h0Y29yYWw6ICdmMDgwODAnLFxuICBsaWdodGN5YW46ICdlMGZmZmYnLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogJ2ZhZmFkMicsXG4gIGxpZ2h0Z3JheTogJ2QzZDNkMycsXG4gIGxpZ2h0Z3JlZW46ICc5MGVlOTAnLFxuICBsaWdodGdyZXk6ICdkM2QzZDMnLFxuICBsaWdodHBpbms6ICdmZmI2YzEnLFxuICBsaWdodHNhbG1vbjogJ2ZmYTA3YScsXG4gIGxpZ2h0c2VhZ3JlZW46ICcyMGIyYWEnLFxuICBsaWdodHNreWJsdWU6ICc4N2NlZmEnLFxuICBsaWdodHNsYXRlZ3JheTogJzc4OScsXG4gIGxpZ2h0c2xhdGVncmV5OiAnNzg5JyxcbiAgbGlnaHRzdGVlbGJsdWU6ICdiMGM0ZGUnLFxuICBsaWdodHllbGxvdzogJ2ZmZmZlMCcsXG4gIGxpbWU6ICcwZjAnLFxuICBsaW1lZ3JlZW46ICczMmNkMzInLFxuICBsaW5lbjogJ2ZhZjBlNicsXG4gIG1hZ2VudGE6ICdmMGYnLFxuICBtYXJvb246ICc4MDAwMDAnLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAnNjZjZGFhJyxcbiAgbWVkaXVtYmx1ZTogJzAwMDBjZCcsXG4gIG1lZGl1bW9yY2hpZDogJ2JhNTVkMycsXG4gIG1lZGl1bXB1cnBsZTogJzkzNzBkYicsXG4gIG1lZGl1bXNlYWdyZWVuOiAnM2NiMzcxJyxcbiAgbWVkaXVtc2xhdGVibHVlOiAnN2I2OGVlJyxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46ICcwMGZhOWEnLFxuICBtZWRpdW10dXJxdW9pc2U6ICc0OGQxY2MnLFxuICBtZWRpdW12aW9sZXRyZWQ6ICdjNzE1ODUnLFxuICBtaWRuaWdodGJsdWU6ICcxOTE5NzAnLFxuICBtaW50Y3JlYW06ICdmNWZmZmEnLFxuICBtaXN0eXJvc2U6ICdmZmU0ZTEnLFxuICBtb2NjYXNpbjogJ2ZmZTRiNScsXG4gIG5hdmFqb3doaXRlOiAnZmZkZWFkJyxcbiAgbmF2eTogJzAwMDA4MCcsXG4gIG9sZGxhY2U6ICdmZGY1ZTYnLFxuICBvbGl2ZTogJzgwODAwMCcsXG4gIG9saXZlZHJhYjogJzZiOGUyMycsXG4gIG9yYW5nZTogJ2ZmYTUwMCcsXG4gIG9yYW5nZXJlZDogJ2ZmNDUwMCcsXG4gIG9yY2hpZDogJ2RhNzBkNicsXG4gIHBhbGVnb2xkZW5yb2Q6ICdlZWU4YWEnLFxuICBwYWxlZ3JlZW46ICc5OGZiOTgnLFxuICBwYWxldHVycXVvaXNlOiAnYWZlZWVlJyxcbiAgcGFsZXZpb2xldHJlZDogJ2RiNzA5MycsXG4gIHBhcGF5YXdoaXA6ICdmZmVmZDUnLFxuICBwZWFjaHB1ZmY6ICdmZmRhYjknLFxuICBwZXJ1OiAnY2Q4NTNmJyxcbiAgcGluazogJ2ZmYzBjYicsXG4gIHBsdW06ICdkZGEwZGQnLFxuICBwb3dkZXJibHVlOiAnYjBlMGU2JyxcbiAgcHVycGxlOiAnODAwMDgwJyxcbiAgcmViZWNjYXB1cnBsZTogJzYzOScsXG4gIHJlZDogJ2YwMCcsXG4gIHJvc3licm93bjogJ2JjOGY4ZicsXG4gIHJveWFsYmx1ZTogJzQxNjllMScsXG4gIHNhZGRsZWJyb3duOiAnOGI0NTEzJyxcbiAgc2FsbW9uOiAnZmE4MDcyJyxcbiAgc2FuZHlicm93bjogJ2Y0YTQ2MCcsXG4gIHNlYWdyZWVuOiAnMmU4YjU3JyxcbiAgc2Vhc2hlbGw6ICdmZmY1ZWUnLFxuICBzaWVubmE6ICdhMDUyMmQnLFxuICBzaWx2ZXI6ICdjMGMwYzAnLFxuICBza3libHVlOiAnODdjZWViJyxcbiAgc2xhdGVibHVlOiAnNmE1YWNkJyxcbiAgc2xhdGVncmF5OiAnNzA4MDkwJyxcbiAgc2xhdGVncmV5OiAnNzA4MDkwJyxcbiAgc25vdzogJ2ZmZmFmYScsXG4gIHNwcmluZ2dyZWVuOiAnMDBmZjdmJyxcbiAgc3RlZWxibHVlOiAnNDY4MmI0JyxcbiAgdGFuOiAnZDJiNDhjJyxcbiAgdGVhbDogJzAwODA4MCcsXG4gIHRoaXN0bGU6ICdkOGJmZDgnLFxuICB0b21hdG86ICdmZjYzNDcnLFxuICB0dXJxdW9pc2U6ICc0MGUwZDAnLFxuICB2aW9sZXQ6ICdlZTgyZWUnLFxuICB3aGVhdDogJ2Y1ZGViMycsXG4gIHdoaXRlOiAnZmZmJyxcbiAgd2hpdGVzbW9rZTogJ2Y1ZjVmNScsXG4gIHllbGxvdzogJ2ZmMCcsXG4gIHllbGxvd2dyZWVuOiAnOWFjZDMyJ1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgYSBDU1MgbmFtZWQgY29sb3IgYW5kIHJldHVybnMgaXRzIGVxdWl2YWxlbnQgaGV4IHZhbHVlLCBvdGhlcndpc2UgcmV0dXJucyB0aGUgb3JpZ2luYWwgY29sb3IuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBuYW1lVG9IZXgoY29sb3IpIHtcbiAgaWYgKHR5cGVvZiBjb2xvciAhPT0gJ3N0cmluZycpIHJldHVybiBjb2xvcjtcbiAgdmFyIG5vcm1hbGl6ZWRDb2xvck5hbWUgPSBjb2xvci50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gbmFtZWRDb2xvck1hcFtub3JtYWxpemVkQ29sb3JOYW1lXSA/ICcjJyArIG5hbWVkQ29sb3JNYXBbbm9ybWFsaXplZENvbG9yTmFtZV0gOiBjb2xvcjtcbn1cblxuLy8gICAgICBcbnZhciBoZXhSZWdleCA9IC9eI1thLWZBLUYwLTldezZ9JC87XG52YXIgcmVkdWNlZEhleFJlZ2V4ID0gL14jW2EtZkEtRjAtOV17M30kLztcbnZhciByZ2JSZWdleCA9IC9ecmdiXFwoXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KVxccypcXCkkLztcbnZhciByZ2JhUmVnZXggPSAvXnJnYmFcXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSlcXHMqLFxccyooXFxkezEsM30pXFxzKixcXHMqKFstK10/WzAtOV0qWy5dP1swLTldKylcXHMqXFwpJC87XG52YXIgaHNsUmVnZXggPSAvXmhzbFxcKFxccyooXFxkezEsM30pXFxzKixcXHMqKFxcZHsxLDN9KSVcXHMqLFxccyooXFxkezEsM30pJVxccypcXCkkLztcbnZhciBoc2xhUmVnZXggPSAvXmhzbGFcXChcXHMqKFxcZHsxLDN9KVxccyosXFxzKihcXGR7MSwzfSklXFxzKixcXHMqKFxcZHsxLDN9KSVcXHMqLFxccyooWy0rXT9bMC05XSpbLl0/WzAtOV0rKVxccypcXCkkLztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIFJnYkNvbG9yIG9yIFJnYmFDb2xvciBvYmplY3QuIFRoaXMgdXRpbGl0eSBmdW5jdGlvbiBpcyBvbmx5IHVzZWZ1bFxuICogaWYgd2FudCB0byBleHRyYWN0IGEgY29sb3IgY29tcG9uZW50LiBXaXRoIHRoZSBjb2xvciB1dGlsIGB0b0NvbG9yU3RyaW5nYCB5b3VcbiAqIGNhbiBjb252ZXJ0IGEgUmdiQ29sb3Igb3IgUmdiYUNvbG9yIG9iamVjdCBiYWNrIHRvIGEgc3RyaW5nLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBc3NpZ25zIGB7IHJlZDogMjU1LCBncmVlbjogMCwgYmx1ZTogMCB9YCB0byBjb2xvcjFcbiAqIGNvbnN0IGNvbG9yMSA9ICdyZ2IoMjU1LCAwLCAwKSc7XG4gKiAvLyBBc3NpZ25zIGB7IHJlZDogOTIsIGdyZWVuOiAxMDIsIGJsdWU6IDExMiwgYWxwaGE6IDAuNzUgfWAgdG8gY29sb3IyXG4gKiBjb25zdCBjb2xvcjIgPSAnaHNsYSgyMTAsIDEwJSwgNDAlLCAwLjc1KSc7XG4gKi9cbmZ1bmN0aW9uIHBhcnNlVG9SZ2IoY29sb3IpIHtcbiAgaWYgKHR5cGVvZiBjb2xvciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBhbiBpbmNvcnJlY3QgYXJndW1lbnQgdG8gYSBjb2xvciBmdW5jdGlvbiwgcGxlYXNlIHBhc3MgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBjb2xvci4nKTtcbiAgfVxuICB2YXIgbm9ybWFsaXplZENvbG9yID0gbmFtZVRvSGV4KGNvbG9yKTtcbiAgaWYgKG5vcm1hbGl6ZWRDb2xvci5tYXRjaChoZXhSZWdleCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIG5vcm1hbGl6ZWRDb2xvclsxXSArIG5vcm1hbGl6ZWRDb2xvclsyXSwgMTYpLFxuICAgICAgZ3JlZW46IHBhcnNlSW50KCcnICsgbm9ybWFsaXplZENvbG9yWzNdICsgbm9ybWFsaXplZENvbG9yWzRdLCAxNiksXG4gICAgICBibHVlOiBwYXJzZUludCgnJyArIG5vcm1hbGl6ZWRDb2xvcls1XSArIG5vcm1hbGl6ZWRDb2xvcls2XSwgMTYpXG4gICAgfTtcbiAgfVxuICBpZiAobm9ybWFsaXplZENvbG9yLm1hdGNoKHJlZHVjZWRIZXhSZWdleCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIG5vcm1hbGl6ZWRDb2xvclsxXSArIG5vcm1hbGl6ZWRDb2xvclsxXSwgMTYpLFxuICAgICAgZ3JlZW46IHBhcnNlSW50KCcnICsgbm9ybWFsaXplZENvbG9yWzJdICsgbm9ybWFsaXplZENvbG9yWzJdLCAxNiksXG4gICAgICBibHVlOiBwYXJzZUludCgnJyArIG5vcm1hbGl6ZWRDb2xvclszXSArIG5vcm1hbGl6ZWRDb2xvclszXSwgMTYpXG4gICAgfTtcbiAgfVxuICB2YXIgcmdiTWF0Y2hlZCA9IHJnYlJlZ2V4LmV4ZWMobm9ybWFsaXplZENvbG9yKTtcbiAgaWYgKHJnYk1hdGNoZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIHJnYk1hdGNoZWRbMV0sIDEwKSxcbiAgICAgIGdyZWVuOiBwYXJzZUludCgnJyArIHJnYk1hdGNoZWRbMl0sIDEwKSxcbiAgICAgIGJsdWU6IHBhcnNlSW50KCcnICsgcmdiTWF0Y2hlZFszXSwgMTApXG4gICAgfTtcbiAgfVxuICB2YXIgcmdiYU1hdGNoZWQgPSByZ2JhUmVnZXguZXhlYyhub3JtYWxpemVkQ29sb3IpO1xuICBpZiAocmdiYU1hdGNoZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIHJnYmFNYXRjaGVkWzFdLCAxMCksXG4gICAgICBncmVlbjogcGFyc2VJbnQoJycgKyByZ2JhTWF0Y2hlZFsyXSwgMTApLFxuICAgICAgYmx1ZTogcGFyc2VJbnQoJycgKyByZ2JhTWF0Y2hlZFszXSwgMTApLFxuICAgICAgYWxwaGE6IHBhcnNlRmxvYXQoJycgKyByZ2JhTWF0Y2hlZFs0XSlcbiAgICB9O1xuICB9XG4gIHZhciBoc2xNYXRjaGVkID0gaHNsUmVnZXguZXhlYyhub3JtYWxpemVkQ29sb3IpO1xuICBpZiAoaHNsTWF0Y2hlZCkge1xuICAgIHZhciBodWUgPSBwYXJzZUludCgnJyArIGhzbE1hdGNoZWRbMV0sIDEwKTtcbiAgICB2YXIgc2F0dXJhdGlvbiA9IHBhcnNlSW50KCcnICsgaHNsTWF0Y2hlZFsyXSwgMTApIC8gMTAwO1xuICAgIHZhciBsaWdodG5lc3MgPSBwYXJzZUludCgnJyArIGhzbE1hdGNoZWRbM10sIDEwKSAvIDEwMDtcbiAgICB2YXIgcmdiQ29sb3JTdHJpbmcgPSAncmdiKCcgKyBoc2xUb1JnYihodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcykgKyAnKSc7XG4gICAgdmFyIGhzbFJnYk1hdGNoZWQgPSByZ2JSZWdleC5leGVjKHJnYkNvbG9yU3RyaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVkOiBwYXJzZUludCgnJyArIGhzbFJnYk1hdGNoZWRbMV0sIDEwKSxcbiAgICAgIGdyZWVuOiBwYXJzZUludCgnJyArIGhzbFJnYk1hdGNoZWRbMl0sIDEwKSxcbiAgICAgIGJsdWU6IHBhcnNlSW50KCcnICsgaHNsUmdiTWF0Y2hlZFszXSwgMTApXG4gICAgfTtcbiAgfVxuICB2YXIgaHNsYU1hdGNoZWQgPSBoc2xhUmVnZXguZXhlYyhub3JtYWxpemVkQ29sb3IpO1xuICBpZiAoaHNsYU1hdGNoZWQpIHtcbiAgICB2YXIgX2h1ZSA9IHBhcnNlSW50KCcnICsgaHNsYU1hdGNoZWRbMV0sIDEwKTtcbiAgICB2YXIgX3NhdHVyYXRpb24gPSBwYXJzZUludCgnJyArIGhzbGFNYXRjaGVkWzJdLCAxMCkgLyAxMDA7XG4gICAgdmFyIF9saWdodG5lc3MgPSBwYXJzZUludCgnJyArIGhzbGFNYXRjaGVkWzNdLCAxMCkgLyAxMDA7XG4gICAgdmFyIF9yZ2JDb2xvclN0cmluZyA9ICdyZ2IoJyArIGhzbFRvUmdiKF9odWUsIF9zYXR1cmF0aW9uLCBfbGlnaHRuZXNzKSArICcpJztcbiAgICB2YXIgX2hzbFJnYk1hdGNoZWQgPSByZ2JSZWdleC5leGVjKF9yZ2JDb2xvclN0cmluZyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZDogcGFyc2VJbnQoJycgKyBfaHNsUmdiTWF0Y2hlZFsxXSwgMTApLFxuICAgICAgZ3JlZW46IHBhcnNlSW50KCcnICsgX2hzbFJnYk1hdGNoZWRbMl0sIDEwKSxcbiAgICAgIGJsdWU6IHBhcnNlSW50KCcnICsgX2hzbFJnYk1hdGNoZWRbM10sIDEwKSxcbiAgICAgIGFscGhhOiBwYXJzZUZsb2F0KCcnICsgaHNsYU1hdGNoZWRbNF0pXG4gICAgfTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBwYXJzZSB0aGUgY29sb3Igc3RyaW5nLiBQbGVhc2UgcHJvdmlkZSB0aGUgY29sb3IgYXMgYSBzdHJpbmcgaW4gaGV4LCByZ2IsIHJnYmEsIGhzbCBvciBoc2xhIG5vdGF0aW9uLlwiKTtcbn1cblxuLy8gICAgICBcblxuXG5mdW5jdGlvbiByZ2JUb0hzbChjb2xvcikge1xuICAvLyBtYWtlIHN1cmUgcmdiIGFyZSBjb250YWluZWQgaW4gYSBzZXQgb2YgWzAsIDI1NV1cbiAgdmFyIHJlZCA9IGNvbG9yLnJlZCAvIDI1NTtcbiAgdmFyIGdyZWVuID0gY29sb3IuZ3JlZW4gLyAyNTU7XG4gIHZhciBibHVlID0gY29sb3IuYmx1ZSAvIDI1NTtcblxuICB2YXIgbWF4ID0gTWF0aC5tYXgocmVkLCBncmVlbiwgYmx1ZSk7XG4gIHZhciBtaW4gPSBNYXRoLm1pbihyZWQsIGdyZWVuLCBibHVlKTtcbiAgdmFyIGxpZ2h0bmVzcyA9IChtYXggKyBtaW4pIC8gMjtcblxuICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAvLyBhY2hyb21hdGljXG4gICAgaWYgKGNvbG9yLmFscGhhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB7IGh1ZTogMCwgc2F0dXJhdGlvbjogMCwgbGlnaHRuZXNzOiBsaWdodG5lc3MsIGFscGhhOiBjb2xvci5hbHBoYSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyBodWU6IDAsIHNhdHVyYXRpb246IDAsIGxpZ2h0bmVzczogbGlnaHRuZXNzIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIGh1ZSA9IHZvaWQgMDtcbiAgdmFyIGRlbHRhID0gbWF4IC0gbWluO1xuICB2YXIgc2F0dXJhdGlvbiA9IGxpZ2h0bmVzcyA+IDAuNSA/IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pIDogZGVsdGEgLyAobWF4ICsgbWluKTtcbiAgc3dpdGNoIChtYXgpIHtcbiAgICBjYXNlIHJlZDpcbiAgICAgIGh1ZSA9IChncmVlbiAtIGJsdWUpIC8gZGVsdGEgKyAoZ3JlZW4gPCBibHVlID8gNiA6IDApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBncmVlbjpcbiAgICAgIGh1ZSA9IChibHVlIC0gcmVkKSAvIGRlbHRhICsgMjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBibHVlIGNhc2VcbiAgICAgIGh1ZSA9IChyZWQgLSBncmVlbikgLyBkZWx0YSArIDQ7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGh1ZSAqPSA2MDtcbiAgaWYgKGNvbG9yLmFscGhhICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4geyBodWU6IGh1ZSwgc2F0dXJhdGlvbjogc2F0dXJhdGlvbiwgbGlnaHRuZXNzOiBsaWdodG5lc3MsIGFscGhhOiBjb2xvci5hbHBoYSB9O1xuICB9XG4gIHJldHVybiB7IGh1ZTogaHVlLCBzYXR1cmF0aW9uOiBzYXR1cmF0aW9uLCBsaWdodG5lc3M6IGxpZ2h0bmVzcyB9O1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIFJldHVybnMgYW4gSHNsQ29sb3Igb3IgSHNsYUNvbG9yIG9iamVjdC4gVGhpcyB1dGlsaXR5IGZ1bmN0aW9uIGlzIG9ubHkgdXNlZnVsXG4gKiBpZiB3YW50IHRvIGV4dHJhY3QgYSBjb2xvciBjb21wb25lbnQuIFdpdGggdGhlIGNvbG9yIHV0aWwgYHRvQ29sb3JTdHJpbmdgIHlvdVxuICogY2FuIGNvbnZlcnQgYSBIc2xDb2xvciBvciBIc2xhQ29sb3Igb2JqZWN0IGJhY2sgdG8gYSBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFzc2lnbnMgYHsgcmVkOiAyNTUsIGdyZWVuOiAwLCBibHVlOiAwIH1gIHRvIGNvbG9yMVxuICogY29uc3QgY29sb3IxID0gJ3JnYigyNTUsIDAsIDApJztcbiAqIC8vIEFzc2lnbnMgYHsgcmVkOiA5MiwgZ3JlZW46IDEwMiwgYmx1ZTogMTEyLCBhbHBoYTogMC43NSB9YCB0byBjb2xvcjJcbiAqIGNvbnN0IGNvbG9yMiA9ICdoc2xhKDIxMCwgMTAlLCA0MCUsIDAuNzUpJztcbiAqL1xuZnVuY3Rpb24gcGFyc2VUb0hzbChjb2xvcikge1xuICAvLyBOb3RlOiBBdCBhIGxhdGVyIHN0YWdlIHdlIGNhbiBvcHRpbWl6ZSB0aGlzIGZ1bmN0aW9uIGFzIHJpZ2h0IG5vdyBhIGhzbFxuICAvLyBjb2xvciB3b3VsZCBiZSBwYXJzZWQgY29udmVydGVkIHRvIHJnYiB2YWx1ZXMgYW5kIGNvbnZlcnRlZCBiYWNrIHRvIGhzbC5cbiAgcmV0dXJuIHJnYlRvSHNsKHBhcnNlVG9SZ2IoY29sb3IpKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZWR1Y2VzIGhleCB2YWx1ZXMgaWYgcG9zc2libGUgZS5nLiAjZmY4ODY2IHRvICNmODZcbiAqIEBwcml2YXRlXG4gKi9cbnZhciByZWR1Y2VIZXhWYWx1ZSA9IGZ1bmN0aW9uIHJlZHVjZUhleFZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZS5sZW5ndGggPT09IDcgJiYgdmFsdWVbMV0gPT09IHZhbHVlWzJdICYmIHZhbHVlWzNdID09PSB2YWx1ZVs0XSAmJiB2YWx1ZVs1XSA9PT0gdmFsdWVbNl0pIHtcbiAgICByZXR1cm4gXCIjXCIgKyB2YWx1ZVsxXSArIHZhbHVlWzNdICsgdmFsdWVbNV07XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuLy8gICAgICBcbmZ1bmN0aW9uIG51bWJlclRvSGV4KHZhbHVlKSB7XG4gIHZhciBoZXggPSB2YWx1ZS50b1N0cmluZygxNik7XG4gIHJldHVybiBoZXgubGVuZ3RoID09PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyB2YWx1ZSBmb3IgdGhlIGNvbG9yLiBUaGUgcmV0dXJuZWQgcmVzdWx0IGlzIHRoZSBzbWFsbGVzdCBwb3NzaWJsZSBoZXggbm90YXRpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogcmdiKDI1NSwgMjA1LCAxMDApLFxuICogICBiYWNrZ3JvdW5kOiByZ2IoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwIH0pLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3JnYigyNTUsIDIwNSwgMTAwKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7cmdiKHsgcmVkOiAyNTUsIGdyZWVuOiAyMDUsIGJsdWU6IDEwMCB9KX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiNmZmNkNjRcIjtcbiAqICAgYmFja2dyb3VuZDogXCIjZmZjZDY0XCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHJnYih2YWx1ZSwgZ3JlZW4sIGJsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGdyZWVuID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYmx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gcmVkdWNlSGV4VmFsdWUoJyMnICsgbnVtYmVyVG9IZXgodmFsdWUpICsgbnVtYmVyVG9IZXgoZ3JlZW4pICsgbnVtYmVyVG9IZXgoYmx1ZSkpO1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnICYmIGdyZWVuID09PSB1bmRlZmluZWQgJiYgYmx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlZHVjZUhleFZhbHVlKCcjJyArIG51bWJlclRvSGV4KHZhbHVlLnJlZCkgKyBudW1iZXJUb0hleCh2YWx1ZS5ncmVlbikgKyBudW1iZXJUb0hleCh2YWx1ZS5ibHVlKSk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBpbnZhbGlkIGFyZ3VtZW50cyB0byByZ2IsIHBsZWFzZSBwYXNzIG11bHRpcGxlIG51bWJlcnMgZS5nLiByZ2IoMjU1LCAyMDUsIDEwMCkgb3IgYW4gb2JqZWN0IGUuZy4gcmdiKHsgcmVkOiAyNTUsIGdyZWVuOiAyMDUsIGJsdWU6IDEwMCB9KS4nKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHZhbHVlIGZvciB0aGUgY29sb3IuIFRoZSByZXR1cm5lZCByZXN1bHQgaXMgdGhlIHNtYWxsZXN0IHBvc3NpYmxlIHJnYmEgb3IgaGV4IG5vdGF0aW9uLlxuICpcbiAqIENhbiBhbHNvIGJlIHVzZWQgdG8gZmFkZSBhIGNvbG9yIGJ5IHBhc3NpbmcgYSBoZXggdmFsdWUgb3IgbmFtZWQgQ1NTIGNvbG9yIGFsb25nIHdpdGggYW4gYWxwaGEgdmFsdWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDIwNSwgMTAwLCAwLjcpLFxuICogICBiYWNrZ3JvdW5kOiByZ2JhKHsgcmVkOiAyNTUsIGdyZWVuOiAyMDUsIGJsdWU6IDEwMCwgYWxwaGE6IDAuNyB9KSxcbiAqICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDIwNSwgMTAwLCAxKSxcbiAqICAgYmFja2dyb3VuZDogcmdiYSgnI2ZmZmZmZicsIDAuNCksXG4gKiAgIGJhY2tncm91bmQ6IHJnYmEoJ2JsYWNrJywgMC43KSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtyZ2JhKDI1NSwgMjA1LCAxMDAsIDAuNyl9O1xuICogICBiYWNrZ3JvdW5kOiAke3JnYmEoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwLCBhbHBoYTogMC43IH0pfTtcbiAqICAgYmFja2dyb3VuZDogJHtyZ2JhKDI1NSwgMjA1LCAxMDAsIDEpfTtcbiAqICAgYmFja2dyb3VuZDogJHtyZ2JhKCcjZmZmZmZmJywgMC40KX07XG4gKiAgIGJhY2tncm91bmQ6ICR7cmdiYSgnYmxhY2snLCAwLjcpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjA1LDEwMCwwLjcpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjA1LDEwMCwwLjcpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2ZmY2Q2NFwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjU1LDI1NSwyNTUsMC40KVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiByZ2JhKGZpcnN0VmFsdWUsIHNlY29uZFZhbHVlLCB0aGlyZFZhbHVlLCBmb3VydGhWYWx1ZSkge1xuICBpZiAodHlwZW9mIGZpcnN0VmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBzZWNvbmRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB2YXIgcmdiVmFsdWUgPSBwYXJzZVRvUmdiKGZpcnN0VmFsdWUpO1xuICAgIHJldHVybiAncmdiYSgnICsgcmdiVmFsdWUucmVkICsgJywnICsgcmdiVmFsdWUuZ3JlZW4gKyAnLCcgKyByZ2JWYWx1ZS5ibHVlICsgJywnICsgc2Vjb25kVmFsdWUgKyAnKSc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0VmFsdWUgPT09ICdudW1iZXInICYmIHR5cGVvZiBzZWNvbmRWYWx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHRoaXJkVmFsdWUgPT09ICdudW1iZXInICYmIHR5cGVvZiBmb3VydGhWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZm91cnRoVmFsdWUgPj0gMSA/IHJnYihmaXJzdFZhbHVlLCBzZWNvbmRWYWx1ZSwgdGhpcmRWYWx1ZSkgOiAncmdiYSgnICsgZmlyc3RWYWx1ZSArICcsJyArIHNlY29uZFZhbHVlICsgJywnICsgdGhpcmRWYWx1ZSArICcsJyArIGZvdXJ0aFZhbHVlICsgJyknO1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgZmlyc3RWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoZmlyc3RWYWx1ZSkpID09PSAnb2JqZWN0JyAmJiBzZWNvbmRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIHRoaXJkVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBmb3VydGhWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZpcnN0VmFsdWUuYWxwaGEgPj0gMSA/IHJnYihmaXJzdFZhbHVlLnJlZCwgZmlyc3RWYWx1ZS5ncmVlbiwgZmlyc3RWYWx1ZS5ibHVlKSA6ICdyZ2JhKCcgKyBmaXJzdFZhbHVlLnJlZCArICcsJyArIGZpcnN0VmFsdWUuZ3JlZW4gKyAnLCcgKyBmaXJzdFZhbHVlLmJsdWUgKyAnLCcgKyBmaXJzdFZhbHVlLmFscGhhICsgJyknO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgaW52YWxpZCBhcmd1bWVudHMgdG8gcmdiYSwgcGxlYXNlIHBhc3MgbXVsdGlwbGUgbnVtYmVycyBlLmcuIHJnYigyNTUsIDIwNSwgMTAwLCAwLjc1KSBvciBhbiBvYmplY3QgZS5nLiByZ2IoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwLCBhbHBoYTogMC43NSB9KS4nKTtcbn1cblxuLy8gICAgICBcbmZ1bmN0aW9uIGNvbG9yVG9IZXgoY29sb3IpIHtcbiAgcmV0dXJuIG51bWJlclRvSGV4KE1hdGgucm91bmQoY29sb3IgKiAyNTUpKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFRvSGV4KHJlZCwgZ3JlZW4sIGJsdWUpIHtcbiAgcmV0dXJuIHJlZHVjZUhleFZhbHVlKCcjJyArIGNvbG9yVG9IZXgocmVkKSArIGNvbG9yVG9IZXgoZ3JlZW4pICsgY29sb3JUb0hleChibHVlKSk7XG59XG5cbmZ1bmN0aW9uIGhzbFRvSGV4KGh1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzKSB7XG4gIHJldHVybiBoc2xUb1JnYihodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcywgY29udmVydFRvSGV4KTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHZhbHVlIGZvciB0aGUgY29sb3IuIFRoZSByZXR1cm5lZCByZXN1bHQgaXMgdGhlIHNtYWxsZXN0IHBvc3NpYmxlIGhleCBub3RhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBiYWNrZ3JvdW5kOiBoc2woMzU5LCAwLjc1LCAwLjQpLFxuICogICBiYWNrZ3JvdW5kOiBoc2woeyBodWU6IDM2MCwgc2F0dXJhdGlvbjogMC43NSwgbGlnaHRuZXNzOiAwLjQgfSksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7aHNsKDM1OSwgMC43NSwgMC40KX07XG4gKiAgIGJhY2tncm91bmQ6ICR7aHNsKHsgaHVlOiAzNjAsIHNhdHVyYXRpb246IDAuNzUsIGxpZ2h0bmVzczogMC40IH0pfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2IzMTkxY1wiO1xuICogICBiYWNrZ3JvdW5kOiBcIiNiMzE5MWNcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gaHNsKHZhbHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHNhdHVyYXRpb24gPT09ICdudW1iZXInICYmIHR5cGVvZiBsaWdodG5lc3MgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGhzbFRvSGV4KHZhbHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpO1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnICYmIHNhdHVyYXRpb24gPT09IHVuZGVmaW5lZCAmJiBsaWdodG5lc3MgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoc2xUb0hleCh2YWx1ZS5odWUsIHZhbHVlLnNhdHVyYXRpb24sIHZhbHVlLmxpZ2h0bmVzcyk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBpbnZhbGlkIGFyZ3VtZW50cyB0byBoc2wsIHBsZWFzZSBwYXNzIG11bHRpcGxlIG51bWJlcnMgZS5nLiBoc2woMzYwLCAwLjc1LCAwLjQpIG9yIGFuIG9iamVjdCBlLmcuIHJnYih7IGh1ZTogMjU1LCBzYXR1cmF0aW9uOiAwLjQsIGxpZ2h0bmVzczogMC43NSB9KS4nKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHZhbHVlIGZvciB0aGUgY29sb3IuIFRoZSByZXR1cm5lZCByZXN1bHQgaXMgdGhlIHNtYWxsZXN0IHBvc3NpYmxlIHJnYmEgb3IgaGV4IG5vdGF0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGhzbGEoMzU5LCAwLjc1LCAwLjQsIDAuNyksXG4gKiAgIGJhY2tncm91bmQ6IGhzbGEoeyBodWU6IDM2MCwgc2F0dXJhdGlvbjogMC43NSwgbGlnaHRuZXNzOiAwLjQsIGFscGhhOiAwLDcgfSksXG4gKiAgIGJhY2tncm91bmQ6IGhzbGEoMzU5LCAwLjc1LCAwLjQsIDEpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke2hzbGEoMzU5LCAwLjc1LCAwLjQsIDAuNyl9O1xuICogICBiYWNrZ3JvdW5kOiAke2hzbGEoeyBodWU6IDM2MCwgc2F0dXJhdGlvbjogMC43NSwgbGlnaHRuZXNzOiAwLjQsIGFscGhhOiAwLDcgfSl9O1xuICogICBiYWNrZ3JvdW5kOiAke2hzbGEoMzU5LCAwLjc1LCAwLjQsIDEpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgxNzksMjUsMjgsMC43KVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMTc5LDI1LDI4LDAuNylcIjtcbiAqICAgYmFja2dyb3VuZDogXCIjYjMxOTFjXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIGhzbGEodmFsdWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcywgYWxwaGEpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHNhdHVyYXRpb24gPT09ICdudW1iZXInICYmIHR5cGVvZiBsaWdodG5lc3MgPT09ICdudW1iZXInICYmIHR5cGVvZiBhbHBoYSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gYWxwaGEgPj0gMSA/IGhzbFRvSGV4KHZhbHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpIDogJ3JnYmEoJyArIGhzbFRvUmdiKHZhbHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3MpICsgJywnICsgYWxwaGEgKyAnKSc7XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PT0gJ29iamVjdCcgJiYgc2F0dXJhdGlvbiA9PT0gdW5kZWZpbmVkICYmIGxpZ2h0bmVzcyA9PT0gdW5kZWZpbmVkICYmIGFscGhhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdmFsdWUuYWxwaGEgPj0gMSA/IGhzbFRvSGV4KHZhbHVlLmh1ZSwgdmFsdWUuc2F0dXJhdGlvbiwgdmFsdWUubGlnaHRuZXNzKSA6ICdyZ2JhKCcgKyBoc2xUb1JnYih2YWx1ZS5odWUsIHZhbHVlLnNhdHVyYXRpb24sIHZhbHVlLmxpZ2h0bmVzcykgKyAnLCcgKyB2YWx1ZS5hbHBoYSArICcpJztcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignUGFzc2VkIGludmFsaWQgYXJndW1lbnRzIHRvIGhzbGEsIHBsZWFzZSBwYXNzIG11bHRpcGxlIG51bWJlcnMgZS5nLiBoc2woMzYwLCAwLjc1LCAwLjQsIDAuNykgb3IgYW4gb2JqZWN0IGUuZy4gcmdiKHsgaHVlOiAyNTUsIHNhdHVyYXRpb246IDAuNCwgbGlnaHRuZXNzOiAwLjc1LCBhbHBoYTogMC43IH0pLicpO1xufVxuXG4vLyAgICAgIFxudmFyIGlzUmdiID0gZnVuY3Rpb24gaXNSZ2IoY29sb3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBjb2xvci5yZWQgPT09ICdudW1iZXInICYmIHR5cGVvZiBjb2xvci5ncmVlbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmJsdWUgPT09ICdudW1iZXInICYmICh0eXBlb2YgY29sb3IuYWxwaGEgIT09ICdudW1iZXInIHx8IHR5cGVvZiBjb2xvci5hbHBoYSA9PT0gJ3VuZGVmaW5lZCcpO1xufTtcblxudmFyIGlzUmdiYSA9IGZ1bmN0aW9uIGlzUmdiYShjb2xvcikge1xuICByZXR1cm4gdHlwZW9mIGNvbG9yLnJlZCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmdyZWVuID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgY29sb3IuYmx1ZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmFscGhhID09PSAnbnVtYmVyJztcbn07XG5cbnZhciBpc0hzbCA9IGZ1bmN0aW9uIGlzSHNsKGNvbG9yKSB7XG4gIHJldHVybiB0eXBlb2YgY29sb3IuaHVlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgY29sb3Iuc2F0dXJhdGlvbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmxpZ2h0bmVzcyA9PT0gJ251bWJlcicgJiYgKHR5cGVvZiBjb2xvci5hbHBoYSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIGNvbG9yLmFscGhhID09PSAndW5kZWZpbmVkJyk7XG59O1xuXG52YXIgaXNIc2xhID0gZnVuY3Rpb24gaXNIc2xhKGNvbG9yKSB7XG4gIHJldHVybiB0eXBlb2YgY29sb3IuaHVlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgY29sb3Iuc2F0dXJhdGlvbiA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmxpZ2h0bmVzcyA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGNvbG9yLmFscGhhID09PSAnbnVtYmVyJztcbn07XG5cbnZhciBlcnJNc2cgPSAnUGFzc2VkIGludmFsaWQgYXJndW1lbnQgdG8gdG9Db2xvclN0cmluZywgcGxlYXNlIHBhc3MgYSBSZ2JDb2xvciwgUmdiYUNvbG9yLCBIc2xDb2xvciBvciBIc2xhQ29sb3Igb2JqZWN0Lic7XG5cbi8qKlxuICogQ29udmVydHMgYSBSZ2JDb2xvciwgUmdiYUNvbG9yLCBIc2xDb2xvciBvciBIc2xhQ29sb3Igb2JqZWN0IHRvIGEgY29sb3Igc3RyaW5nLlxuICogVGhpcyB1dGlsIGlzIHVzZWZ1bCBpbiBjYXNlIHlvdSBvbmx5IGtub3cgb24gcnVudGltZSB3aGljaCBjb2xvciBvYmplY3QgaXNcbiAqIHVzZWQuIE90aGVyd2lzZSB3ZSByZWNvbW1lbmQgdG8gcmVseSBvbiBgcmdiYCwgYHJnYmFgLCBgaHNsYCBvciBgaHNsYWAuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogdG9Db2xvclN0cmluZyh7IHJlZDogMjU1LCBncmVlbjogMjA1LCBibHVlOiAxMDAgfSksXG4gKiAgIGJhY2tncm91bmQ6IHRvQ29sb3JTdHJpbmcoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwLCBhbHBoYTogMC43MiB9KSxcbiAqICAgYmFja2dyb3VuZDogdG9Db2xvclN0cmluZyh7IGh1ZTogMjQwLCBzYXR1cmF0aW9uOiAxLCBsaWdodG5lc3M6IDAuNSB9KSxcbiAqICAgYmFja2dyb3VuZDogdG9Db2xvclN0cmluZyh7IGh1ZTogMzYwLCBzYXR1cmF0aW9uOiAwLjc1LCBsaWdodG5lc3M6IDAuNCwgYWxwaGE6IDAuNzIgfSksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7dG9Db2xvclN0cmluZyh7IHJlZDogMjU1LCBncmVlbjogMjA1LCBibHVlOiAxMDAgfSl9O1xuICogICBiYWNrZ3JvdW5kOiAke3RvQ29sb3JTdHJpbmcoeyByZWQ6IDI1NSwgZ3JlZW46IDIwNSwgYmx1ZTogMTAwLCBhbHBoYTogMC43MiB9KX07XG4gKiAgIGJhY2tncm91bmQ6ICR7dG9Db2xvclN0cmluZyh7IGh1ZTogMjQwLCBzYXR1cmF0aW9uOiAxLCBsaWdodG5lc3M6IDAuNSB9KX07XG4gKiAgIGJhY2tncm91bmQ6ICR7dG9Db2xvclN0cmluZyh7IGh1ZTogMzYwLCBzYXR1cmF0aW9uOiAwLjc1LCBsaWdodG5lc3M6IDAuNCwgYWxwaGE6IDAuNzIgfSl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiNmZmNkNjRcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDI1NSwyMDUsMTAwLDAuNzIpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwiIzAwZlwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMTc5LDI1LDI1LDAuNzIpXCI7XG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gdG9Db2xvclN0cmluZyhjb2xvcikge1xuICBpZiAoKHR5cGVvZiBjb2xvciA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoY29sb3IpKSAhPT0gJ29iamVjdCcpIHRocm93IG5ldyBFcnJvcihlcnJNc2cpO1xuICBpZiAoaXNSZ2JhKGNvbG9yKSkgcmV0dXJuIHJnYmEoY29sb3IpO1xuICBpZiAoaXNSZ2IoY29sb3IpKSByZXR1cm4gcmdiKGNvbG9yKTtcbiAgaWYgKGlzSHNsYShjb2xvcikpIHJldHVybiBoc2xhKGNvbG9yKTtcbiAgaWYgKGlzSHNsKGNvbG9yKSkgcmV0dXJuIGhzbChjb2xvcik7XG5cbiAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG59XG5cbi8vICAgICAgXG5cbi8vIFR5cGUgZGVmaW5pdGlvbnMgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2NhbnRpL2Zsb3ctc3RhdGljLWxhbmQvYmxvYi9tYXN0ZXIvc3JjL0Z1bi5qc1xuXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cblxuZnVuY3Rpb24gY3VycmllZChmLCBsZW5ndGgsIGFjYykge1xuICByZXR1cm4gZnVuY3Rpb24gZm4oKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuICAgIHZhciBjb21iaW5lZCA9IGFjYy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgcmV0dXJuIGNvbWJpbmVkLmxlbmd0aCA+PSBsZW5ndGggPyBmLmFwcGx5KHRoaXMsIGNvbWJpbmVkKSA6IGN1cnJpZWQoZiwgbGVuZ3RoLCBjb21iaW5lZCk7XG4gIH07XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcbmZ1bmN0aW9uIGN1cnJ5KGYpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZWRlY2xhcmVcbiAgcmV0dXJuIGN1cnJpZWQoZiwgZi5sZW5ndGgsIFtdKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDaGFuZ2VzIHRoZSBodWUgb2YgdGhlIGNvbG9yLiBIdWUgaXMgYSBudW1iZXIgYmV0d2VlbiAwIHRvIDM2MC4gVGhlIGZpcnN0XG4gKiBhcmd1bWVudCBmb3IgYWRqdXN0SHVlIGlzIHRoZSBhbW91bnQgb2YgZGVncmVlcyB0aGUgY29sb3IgaXMgcm90YXRlZCBhbG9uZ1xuICogdGhlIGNvbG9yIHdoZWVsLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGFkanVzdEh1ZSgxODAsICcjNDQ4JyksXG4gKiAgIGJhY2tncm91bmQ6IGFkanVzdEh1ZSgxODAsICdyZ2JhKDEwMSwxMDAsMjA1LDAuNyknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHthZGp1c3RIdWUoMTgwLCAnIzQ0OCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHthZGp1c3RIdWUoMTgwLCAncmdiYSgxMDEsMTAwLDIwNSwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiM4ODg4NDRcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDEzNiwxMzYsNjgsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBhZGp1c3RIdWUoZGVncmVlLCBjb2xvcikge1xuICB2YXIgaHNsQ29sb3IgPSBwYXJzZVRvSHNsKGNvbG9yKTtcbiAgcmV0dXJuIHRvQ29sb3JTdHJpbmcoX2V4dGVuZHMoe30sIGhzbENvbG9yLCB7XG4gICAgaHVlOiAoaHNsQ29sb3IuaHVlICsgZGVncmVlKSAlIDM2MFxuICB9KSk7XG59XG5cbnZhciBjdXJyaWVkQWRqdXN0SHVlID0gLyojX19QVVJFX18qL2N1cnJ5KGFkanVzdEh1ZSk7XG5cbi8vICAgICAgXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY29tcGxlbWVudCBvZiB0aGUgcHJvdmlkZWQgY29sb3IuIFRoaXMgaXMgaWRlbnRpY2FsIHRvIGFkanVzdEh1ZSgxODAsIDxjb2xvcj4pLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGNvbXBsZW1lbnQoJyM0NDgnKSxcbiAqICAgYmFja2dyb3VuZDogY29tcGxlbWVudCgncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7Y29tcGxlbWVudCgnIzQ0OCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtjb21wbGVtZW50KCdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiIzg4NFwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMTUzLDE1MywxNTMsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBjb21wbGVtZW50KGNvbG9yKSB7XG4gIHZhciBoc2xDb2xvciA9IHBhcnNlVG9Ic2woY29sb3IpO1xuICByZXR1cm4gdG9Db2xvclN0cmluZyhfZXh0ZW5kcyh7fSwgaHNsQ29sb3IsIHtcbiAgICBodWU6IChoc2xDb2xvci5odWUgKyAxODApICUgMzYwXG4gIH0pKTtcbn1cblxuLy8gICAgICBcblxuZnVuY3Rpb24gZ3VhcmQobG93ZXJCb3VuZGFyeSwgdXBwZXJCb3VuZGFyeSwgdmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgubWF4KGxvd2VyQm91bmRhcnksIE1hdGgubWluKHVwcGVyQm91bmRhcnksIHZhbHVlKSk7XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyB2YWx1ZSBmb3IgdGhlIGRhcmtlbmVkIGNvbG9yLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGRhcmtlbigwLjIsICcjRkZDRDY0JyksXG4gKiAgIGJhY2tncm91bmQ6IGRhcmtlbigwLjIsICdyZ2JhKDI1NSwyMDUsMTAwLDAuNyknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtkYXJrZW4oMC4yLCAnI0ZGQ0Q2NCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtkYXJrZW4oMC4yLCAncmdiYSgyNTUsMjA1LDEwMCwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqXG4gKiBlbGVtZW50IHtcbiAqICAgYmFja2dyb3VuZDogXCIjZmZiZDMxXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMTg5LDQ5LDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gZGFya2VuKGFtb3VudCwgY29sb3IpIHtcbiAgdmFyIGhzbENvbG9yID0gcGFyc2VUb0hzbChjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBoc2xDb2xvciwge1xuICAgIGxpZ2h0bmVzczogZ3VhcmQoMCwgMSwgaHNsQ29sb3IubGlnaHRuZXNzIC0gYW1vdW50KVxuICB9KSk7XG59XG5cbnZhciBjdXJyaWVkRGFya2VuID0gLyojX19QVVJFX18qL2N1cnJ5KGRhcmtlbik7XG5cbi8vICAgICAgXG5cbi8qKlxuICogRGVjcmVhc2VzIHRoZSBpbnRlbnNpdHkgb2YgYSBjb2xvci4gSXRzIHJhbmdlIGlzIGJldHdlZW4gMCB0byAxLiBUaGUgZmlyc3RcbiAqIGFyZ3VtZW50IG9mIHRoZSBkZXNhdHVyYXRlIGZ1bmN0aW9uIGlzIHRoZSBhbW91bnQgYnkgaG93IG11Y2ggdGhlIGNvbG9yXG4gKiBpbnRlbnNpdHkgc2hvdWxkIGJlIGRlY3JlYXNlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBiYWNrZ3JvdW5kOiBkZXNhdHVyYXRlKDAuMiwgJyNDQ0NENjQnKSxcbiAqICAgYmFja2dyb3VuZDogZGVzYXR1cmF0ZSgwLjIsICdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtkZXNhdHVyYXRlKDAuMiwgJyNDQ0NENjQnKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7ZGVzYXR1cmF0ZSgwLjIsICdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2I4Yjk3OVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMTg0LDE4NSwxMjEsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBkZXNhdHVyYXRlKGFtb3VudCwgY29sb3IpIHtcbiAgdmFyIGhzbENvbG9yID0gcGFyc2VUb0hzbChjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBoc2xDb2xvciwge1xuICAgIHNhdHVyYXRpb246IGd1YXJkKDAsIDEsIGhzbENvbG9yLnNhdHVyYXRpb24gLSBhbW91bnQpXG4gIH0pKTtcbn1cblxudmFyIGN1cnJpZWREZXNhdHVyYXRlID0gLyojX19QVVJFX18qL2N1cnJ5KGRlc2F0dXJhdGUpO1xuXG4vLyAgICAgIFxuLyoqXG4gKiBSZXR1cm5zIGEgbnVtYmVyIChmbG9hdCkgcmVwcmVzZW50aW5nIHRoZSBsdW1pbmFuY2Ugb2YgYSBjb2xvci5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBiYWNrZ3JvdW5kOiBnZXRMdW1pbmFuY2UoJyNDQ0NENjQnKSA+PSBnZXRMdW1pbmFuY2UoJyMwMDAwZmYnKSA/ICcjQ0NDRDY0JyA6ICcjMDAwMGZmJyxcbiAqICAgYmFja2dyb3VuZDogZ2V0THVtaW5hbmNlKCdyZ2JhKDU4LCAxMzMsIDI1NSwgMSknKSA+PSBnZXRMdW1pbmFuY2UoJ3JnYmEoMjU1LCA1NywgMTQ5LCAxKScpID9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmdiYSg1OCwgMTMzLCAyNTUsIDEpJyA6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoMjU1LCA1NywgMTQ5LCAxKScsXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7Z2V0THVtaW5hbmNlKCcjQ0NDRDY0JykgPj0gZ2V0THVtaW5hbmNlKCcjMDAwMGZmJykgPyAnI0NDQ0Q2NCcgOiAnIzAwMDBmZid9O1xuICogICBiYWNrZ3JvdW5kOiAke2dldEx1bWluYW5jZSgncmdiYSg1OCwgMTMzLCAyNTUsIDEpJykgPj0gZ2V0THVtaW5hbmNlKCdyZ2JhKDI1NSwgNTcsIDE0OSwgMSknKSA/XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3JnYmEoNTgsIDEzMywgMjU1LCAxKScgOlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZ2JhKDI1NSwgNTcsIDE0OSwgMSknfTtcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgYmFja2dyb3VuZDogXCIjQ0NDRDY0XCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSg1OCwgMTMzLCAyNTUsIDEpXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIGdldEx1bWluYW5jZShjb2xvcikge1xuICB2YXIgcmdiQ29sb3IgPSBwYXJzZVRvUmdiKGNvbG9yKTtcblxuICB2YXIgX09iamVjdCRrZXlzJG1hcCA9IE9iamVjdC5rZXlzKHJnYkNvbG9yKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBjaGFubmVsID0gcmdiQ29sb3Jba2V5XSAvIDI1NTtcbiAgICByZXR1cm4gY2hhbm5lbCA8PSAwLjAzOTI4ID8gY2hhbm5lbCAvIDEyLjkyIDogTWF0aC5wb3coKGNoYW5uZWwgKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgfSksXG4gICAgICByID0gX09iamVjdCRrZXlzJG1hcFswXSxcbiAgICAgIGcgPSBfT2JqZWN0JGtleXMkbWFwWzFdLFxuICAgICAgYiA9IF9PYmplY3Qka2V5cyRtYXBbMl07XG5cbiAgcmV0dXJuIDAuMjEyNiAqIHIgKyAwLjcxNTIgKiBnICsgMC4wNzIyICogYjtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgY29sb3IgdG8gYSBncmF5c2NhbGUsIGJ5IHJlZHVjaW5nIGl0cyBzYXR1cmF0aW9uIHRvIDAuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogZ3JheXNjYWxlKCcjQ0NDRDY0JyksXG4gKiAgIGJhY2tncm91bmQ6IGdyYXlzY2FsZSgncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7Z3JheXNjYWxlKCcjQ0NDRDY0Jyl9O1xuICogICBiYWNrZ3JvdW5kOiAke2dyYXlzY2FsZSgncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiM5OTlcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDE1MywxNTMsMTUzLDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gZ3JheXNjYWxlKGNvbG9yKSB7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBwYXJzZVRvSHNsKGNvbG9yKSwge1xuICAgIHNhdHVyYXRpb246IDBcbiAgfSkpO1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIEludmVydHMgdGhlIHJlZCwgZ3JlZW4gYW5kIGJsdWUgdmFsdWVzIG9mIGEgY29sb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogaW52ZXJ0KCcjQ0NDRDY0JyksXG4gKiAgIGJhY2tncm91bmQ6IGludmVydCgncmdiYSgxMDEsMTAwLDIwNSwwLjcpJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7aW52ZXJ0KCcjQ0NDRDY0Jyl9O1xuICogICBiYWNrZ3JvdW5kOiAke2ludmVydCgncmdiYSgxMDEsMTAwLDIwNSwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqXG4gKiBlbGVtZW50IHtcbiAqICAgYmFja2dyb3VuZDogXCIjMzMzMjliXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgxNTQsMTU1LDUwLDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gaW52ZXJ0KGNvbG9yKSB7XG4gIC8vIHBhcnNlIGNvbG9yIHN0cmluZyB0byByZ2JcbiAgdmFyIHZhbHVlID0gcGFyc2VUb1JnYihjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCB2YWx1ZSwge1xuICAgIHJlZDogMjU1IC0gdmFsdWUucmVkLFxuICAgIGdyZWVuOiAyNTUgLSB2YWx1ZS5ncmVlbixcbiAgICBibHVlOiAyNTUgLSB2YWx1ZS5ibHVlXG4gIH0pKTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHZhbHVlIGZvciB0aGUgbGlnaHRlbmVkIGNvbG9yLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IGxpZ2h0ZW4oMC4yLCAnI0NDQ0Q2NCcpLFxuICogICBiYWNrZ3JvdW5kOiBsaWdodGVuKDAuMiwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke2xpZ2h0ZW4oMC4yLCAnI0ZGQ0Q2NCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtsaWdodGVuKDAuMiwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2U1ZTZiMVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjI5LDIzMCwxNzcsMC43KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBsaWdodGVuKGFtb3VudCwgY29sb3IpIHtcbiAgdmFyIGhzbENvbG9yID0gcGFyc2VUb0hzbChjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBoc2xDb2xvciwge1xuICAgIGxpZ2h0bmVzczogZ3VhcmQoMCwgMSwgaHNsQ29sb3IubGlnaHRuZXNzICsgYW1vdW50KVxuICB9KSk7XG59XG5cbnZhciBjdXJyaWVkTGlnaHRlbiA9IC8qI19fUFVSRV9fKi9jdXJyeShsaWdodGVuKTtcblxuLy8gICAgICBcblxuLyoqXG4gKiBNaXhlcyB0d28gY29sb3JzIHRvZ2V0aGVyIGJ5IGNhbGN1bGF0aW5nIHRoZSBhdmVyYWdlIG9mIGVhY2ggb2YgdGhlIFJHQiBjb21wb25lbnRzLlxuICpcbiAqIEJ5IGRlZmF1bHQgdGhlIHdlaWdodCBpcyAwLjUgbWVhbmluZyB0aGF0IGhhbGYgb2YgdGhlIGZpcnN0IGNvbG9yIGFuZCBoYWxmIHRoZSBzZWNvbmRcbiAqIGNvbG9yIHNob3VsZCBiZSB1c2VkLiBPcHRpb25hbGx5IHRoZSB3ZWlnaHQgY2FuIGJlIG1vZGlmaWVkIGJ5IHByb3ZpZGluZyBhIG51bWJlclxuICogYXMgdGhlIGZpcnN0IGFyZ3VtZW50LiAwLjI1IG1lYW5zIHRoYXQgYSBxdWFydGVyIG9mIHRoZSBmaXJzdCBjb2xvciBhbmQgdGhyZWUgcXVhcnRlcnNcbiAqIG9mIHRoZSBzZWNvbmQgY29sb3Igc2hvdWxkIGJlIHVzZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogbWl4KDAuNSwgJyNmMDAnLCAnIzAwZicpXG4gKiAgIGJhY2tncm91bmQ6IG1peCgwLjI1LCAnI2YwMCcsICcjMDBmJylcbiAqICAgYmFja2dyb3VuZDogbWl4KDAuNSwgJ3JnYmEoMjU1LCAwLCAwLCAwLjUpJywgJyMwMGYnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke21peCgwLjUsICcjZjAwJywgJyMwMGYnKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7bWl4KDAuMjUsICcjZjAwJywgJyMwMGYnKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7bWl4KDAuNSwgJ3JnYmEoMjU1LCAwLCAwLCAwLjUpJywgJyMwMGYnKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiM3ZjAwN2ZcIjtcbiAqICAgYmFja2dyb3VuZDogXCIjM2YwMGJmXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSg2MywgMCwgMTkxLCAwLjc1KVwiO1xuICogfVxuICovXG5mdW5jdGlvbiBtaXgoKSB7XG4gIHZhciB3ZWlnaHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDAuNTtcbiAgdmFyIGNvbG9yID0gYXJndW1lbnRzWzFdO1xuICB2YXIgb3RoZXJDb2xvciA9IGFyZ3VtZW50c1syXTtcblxuICB2YXIgcGFyc2VkQ29sb3IxID0gcGFyc2VUb1JnYihjb2xvcik7XG4gIHZhciBjb2xvcjEgPSBfZXh0ZW5kcyh7fSwgcGFyc2VkQ29sb3IxLCB7XG4gICAgYWxwaGE6IHR5cGVvZiBwYXJzZWRDb2xvcjEuYWxwaGEgPT09ICdudW1iZXInID8gcGFyc2VkQ29sb3IxLmFscGhhIDogMVxuICB9KTtcblxuICB2YXIgcGFyc2VkQ29sb3IyID0gcGFyc2VUb1JnYihvdGhlckNvbG9yKTtcbiAgdmFyIGNvbG9yMiA9IF9leHRlbmRzKHt9LCBwYXJzZWRDb2xvcjIsIHtcbiAgICBhbHBoYTogdHlwZW9mIHBhcnNlZENvbG9yMi5hbHBoYSA9PT0gJ251bWJlcicgPyBwYXJzZWRDb2xvcjIuYWxwaGEgOiAxXG4gIH0pO1xuXG4gIC8vIFRoZSBmb3JtdWxhciBpcyBjb3BpZWQgZnJvbSB0aGUgb3JpZ2luYWwgU2FzcyBpbXBsZW1lbnRhdGlvbjpcbiAgLy8gaHR0cDovL3Nhc3MtbGFuZy5jb20vZG9jdW1lbnRhdGlvbi9TYXNzL1NjcmlwdC9GdW5jdGlvbnMuaHRtbCNtaXgtaW5zdGFuY2VfbWV0aG9kXG4gIHZhciBhbHBoYURlbHRhID0gY29sb3IxLmFscGhhIC0gY29sb3IyLmFscGhhO1xuICB2YXIgeCA9IHdlaWdodCAqIDIgLSAxO1xuICB2YXIgeSA9IHggKiBhbHBoYURlbHRhID09PSAtMSA/IHggOiB4ICsgYWxwaGFEZWx0YTtcbiAgdmFyIHogPSAxICsgeCAqIGFscGhhRGVsdGE7XG4gIHZhciB3ZWlnaHQxID0gKHkgLyB6ICsgMSkgLyAyLjA7XG4gIHZhciB3ZWlnaHQyID0gMSAtIHdlaWdodDE7XG5cbiAgdmFyIG1peGVkQ29sb3IgPSB7XG4gICAgcmVkOiBNYXRoLmZsb29yKGNvbG9yMS5yZWQgKiB3ZWlnaHQxICsgY29sb3IyLnJlZCAqIHdlaWdodDIpLFxuICAgIGdyZWVuOiBNYXRoLmZsb29yKGNvbG9yMS5ncmVlbiAqIHdlaWdodDEgKyBjb2xvcjIuZ3JlZW4gKiB3ZWlnaHQyKSxcbiAgICBibHVlOiBNYXRoLmZsb29yKGNvbG9yMS5ibHVlICogd2VpZ2h0MSArIGNvbG9yMi5ibHVlICogd2VpZ2h0MiksXG4gICAgYWxwaGE6IGNvbG9yMS5hbHBoYSArIChjb2xvcjIuYWxwaGEgLSBjb2xvcjEuYWxwaGEpICogKHdlaWdodCAvIDEuMClcbiAgfTtcblxuICByZXR1cm4gcmdiYShtaXhlZENvbG9yKTtcbn1cblxudmFyIGN1cnJpZWRNaXggPSAvKiNfX1BVUkVfXyovY3VycnkobWl4KTtcblxuLy8gICAgICBcbi8qKlxuICogSW5jcmVhc2VzIHRoZSBvcGFjaXR5IG9mIGEgY29sb3IuIEl0cyByYW5nZSBmb3IgdGhlIGFtb3VudCBpcyBiZXR3ZWVuIDAgdG8gMS5cbiAqXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogb3BhY2lmeSgwLjEsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSknKTtcbiAqICAgYmFja2dyb3VuZDogb3BhY2lmeSgwLjIsICdoc2xhKDAsIDAlLCAxMDAlLCAwLjUpJyksXG4gKiAgIGJhY2tncm91bmQ6IG9wYWNpZnkoMC41LCAncmdiYSgyNTUsIDAsIDAsIDAuMiknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtvcGFjaWZ5KDAuMSwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC45KScpfTtcbiAqICAgYmFja2dyb3VuZDogJHtvcGFjaWZ5KDAuMiwgJ2hzbGEoMCwgMCUsIDEwMCUsIDAuNSknKX0sXG4gKiAgIGJhY2tncm91bmQ6ICR7b3BhY2lmeSgwLjUsICdyZ2JhKDI1NSwgMCwgMCwgMC4yKScpfSxcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2ZmZlwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjU1LDI1NSwyNTUsMC43KVwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjU1LDAsMCwwLjcpXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIG9wYWNpZnkoYW1vdW50LCBjb2xvcikge1xuICB2YXIgcGFyc2VkQ29sb3IgPSBwYXJzZVRvUmdiKGNvbG9yKTtcbiAgdmFyIGFscGhhID0gdHlwZW9mIHBhcnNlZENvbG9yLmFscGhhID09PSAnbnVtYmVyJyA/IHBhcnNlZENvbG9yLmFscGhhIDogMTtcbiAgdmFyIGNvbG9yV2l0aEFscGhhID0gX2V4dGVuZHMoe30sIHBhcnNlZENvbG9yLCB7XG4gICAgYWxwaGE6IGd1YXJkKDAsIDEsIChhbHBoYSAqIDEwMCArIGFtb3VudCAqIDEwMCkgLyAxMDApXG4gIH0pO1xuICByZXR1cm4gcmdiYShjb2xvcldpdGhBbHBoYSk7XG59XG5cbnZhciBjdXJyaWVkT3BhY2lmeSA9IC8qI19fUFVSRV9fKi9jdXJyeShvcGFjaWZ5KTtcblxuLy8gICAgICBcbi8qKlxuICogU2VsZWN0cyBibGFjayBvciB3aGl0ZSBmb3IgYmVzdCBjb250cmFzdCBkZXBlbmRpbmcgb24gdGhlIGx1bWlub3NpdHkgb2YgdGhlIGdpdmVuIGNvbG9yLlxuICogRm9sbG93cyBXM0Mgc3BlY3MgZm9yIHJlYWRhYmlsaXR5IGF0IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAtVEVDSFMvRzE4Lmh0bWxcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBjb2xvcjogcmVhZGFibGVDb2xvcignIzAwMCcpLFxuICogICBjb2xvcjogcmVhZGFibGVDb2xvcigncGFwYXlhd2hpcCcpLFxuICogICBjb2xvcjogcmVhZGFibGVDb2xvcigncmdiKDI1NSwwLDApJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGNvbG9yOiAke3JlYWRhYmxlQ29sb3IoJyMwMDAnKX07XG4gKiAgIGNvbG9yOiAke3JlYWRhYmxlQ29sb3IoJ3BhcGF5YXdoaXAnKX07XG4gKiAgIGNvbG9yOiAke3JlYWRhYmxlQ29sb3IoJ3JnYigyNTUsMCwwKScpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGNvbG9yOiBcIiNmZmZcIjtcbiAqICAgY29sb3I6IFwiI2ZmZlwiO1xuICogICBjb2xvcjogXCIjMDAwXCI7XG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gcmVhZGFibGVDb2xvcihjb2xvcikge1xuICByZXR1cm4gZ2V0THVtaW5hbmNlKGNvbG9yKSA+IDAuMTc5ID8gJyMwMDAnIDogJyNmZmYnO1xufVxuXG52YXIgY3VycmllZFJlYWRhYmxlQ29sb3IgPSAvKiNfX1BVUkVfXyovY3VycnkocmVhZGFibGVDb2xvcik7XG5cbi8vICAgICAgXG5cbi8qKlxuICogSW5jcmVhc2VzIHRoZSBpbnRlbnNpdHkgb2YgYSBjb2xvci4gSXRzIHJhbmdlIGlzIGJldHdlZW4gMCB0byAxLiBUaGUgZmlyc3RcbiAqIGFyZ3VtZW50IG9mIHRoZSBzYXR1cmF0ZSBmdW5jdGlvbiBpcyB0aGUgYW1vdW50IGJ5IGhvdyBtdWNoIHRoZSBjb2xvclxuICogaW50ZW5zaXR5IHNob3VsZCBiZSBpbmNyZWFzZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogc2F0dXJhdGUoMC4yLCAnI0NDQ0Q2NCcpLFxuICogICBiYWNrZ3JvdW5kOiBzYXR1cmF0ZSgwLjIsICdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKSxcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtzYXR1cmF0ZSgwLjIsICcjRkZDRDY0Jyl9O1xuICogICBiYWNrZ3JvdW5kOiAke3NhdHVyYXRlKDAuMiwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2UwZTI1MFwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjI0LDIyNiw4MCwwLjcpXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHNhdHVyYXRlKGFtb3VudCwgY29sb3IpIHtcbiAgdmFyIGhzbENvbG9yID0gcGFyc2VUb0hzbChjb2xvcik7XG4gIHJldHVybiB0b0NvbG9yU3RyaW5nKF9leHRlbmRzKHt9LCBoc2xDb2xvciwge1xuICAgIHNhdHVyYXRpb246IGd1YXJkKDAsIDEsIGhzbENvbG9yLnNhdHVyYXRpb24gKyBhbW91bnQpXG4gIH0pKTtcbn1cblxudmFyIGN1cnJpZWRTYXR1cmF0ZSA9IC8qI19fUFVSRV9fKi9jdXJyeShzYXR1cmF0ZSk7XG5cbi8vICAgICAgXG5cbi8qKlxuICogU2V0cyB0aGUgaHVlIG9mIGEgY29sb3IgdG8gdGhlIHByb3ZpZGVkIHZhbHVlLiBUaGUgaHVlIHJhbmdlIGNhbiBiZVxuICogZnJvbSAwIGFuZCAzNTkuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogc2V0SHVlKDQyLCAnI0NDQ0Q2NCcpLFxuICogICBiYWNrZ3JvdW5kOiBzZXRIdWUoMjQ0LCAncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyksXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgIGJhY2tncm91bmQ6ICR7c2V0SHVlKDQyLCAnI0NDQ0Q2NCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtzZXRIdWUoMjQ0LCAncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiNjZGFlNjRcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDEwNywxMDAsMjA1LDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gc2V0SHVlKGh1ZSwgY29sb3IpIHtcbiAgcmV0dXJuIHRvQ29sb3JTdHJpbmcoX2V4dGVuZHMoe30sIHBhcnNlVG9Ic2woY29sb3IpLCB7XG4gICAgaHVlOiBodWVcbiAgfSkpO1xufVxuXG52YXIgY3VycmllZFNldEh1ZSA9IC8qI19fUFVSRV9fKi9jdXJyeShzZXRIdWUpO1xuXG4vLyAgICAgIFxuXG4vKipcbiAqIFNldHMgdGhlIGxpZ2h0bmVzcyBvZiBhIGNvbG9yIHRvIHRoZSBwcm92aWRlZCB2YWx1ZS4gVGhlIGxpZ2h0bmVzcyByYW5nZSBjYW4gYmVcbiAqIGZyb20gMCBhbmQgMS5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICBiYWNrZ3JvdW5kOiBzZXRMaWdodG5lc3MoMC4yLCAnI0NDQ0Q2NCcpLFxuICogICBiYWNrZ3JvdW5kOiBzZXRMaWdodG5lc3MoMC43NSwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3NldExpZ2h0bmVzcygwLjIsICcjQ0NDRDY0Jyl9O1xuICogICBiYWNrZ3JvdW5kOiAke3NldExpZ2h0bmVzcygwLjc1LCAncmdiYSgyMDQsMjA1LDEwMCwwLjcpJyl9O1xuICogYFxuICpcbiAqIC8vIENTUyBpbiBKUyBPdXRwdXRcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiM0ZDRkMTlcIjtcbiAqICAgYmFja2dyb3VuZDogXCJyZ2JhKDIyMywyMjQsMTU5LDAuNylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gc2V0TGlnaHRuZXNzKGxpZ2h0bmVzcywgY29sb3IpIHtcbiAgcmV0dXJuIHRvQ29sb3JTdHJpbmcoX2V4dGVuZHMoe30sIHBhcnNlVG9Ic2woY29sb3IpLCB7XG4gICAgbGlnaHRuZXNzOiBsaWdodG5lc3NcbiAgfSkpO1xufVxuXG52YXIgY3VycmllZFNldExpZ2h0bmVzcyA9IC8qI19fUFVSRV9fKi9jdXJyeShzZXRMaWdodG5lc3MpO1xuXG4vLyAgICAgIFxuXG4vKipcbiAqIFNldHMgdGhlIHNhdHVyYXRpb24gb2YgYSBjb2xvciB0byB0aGUgcHJvdmlkZWQgdmFsdWUuIFRoZSBsaWdodG5lc3MgcmFuZ2UgY2FuIGJlXG4gKiBmcm9tIDAgYW5kIDEuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgYmFja2dyb3VuZDogc2V0U2F0dXJhdGlvbigwLjIsICcjQ0NDRDY0JyksXG4gKiAgIGJhY2tncm91bmQ6IHNldFNhdHVyYXRpb24oMC43NSwgJ3JnYmEoMjA0LDIwNSwxMDAsMC43KScpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3NldFNhdHVyYXRpb24oMC4yLCAnI0NDQ0Q2NCcpfTtcbiAqICAgYmFja2dyb3VuZDogJHtzZXRTYXR1cmF0aW9uKDAuNzUsICdyZ2JhKDIwNCwyMDUsMTAwLDAuNyknKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiI2FkYWQ4NFwiO1xuICogICBiYWNrZ3JvdW5kOiBcInJnYmEoMjI4LDIyOSw3NiwwLjcpXCI7XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHNldFNhdHVyYXRpb24oc2F0dXJhdGlvbiwgY29sb3IpIHtcbiAgcmV0dXJuIHRvQ29sb3JTdHJpbmcoX2V4dGVuZHMoe30sIHBhcnNlVG9Ic2woY29sb3IpLCB7XG4gICAgc2F0dXJhdGlvbjogc2F0dXJhdGlvblxuICB9KSk7XG59XG5cbnZhciBjdXJyaWVkU2V0U2F0dXJhdGlvbiA9IC8qI19fUFVSRV9fKi9jdXJyeShzZXRTYXR1cmF0aW9uKTtcblxuLy8gICAgICBcblxuLyoqXG4gKiBTaGFkZXMgYSBjb2xvciBieSBtaXhpbmcgaXQgd2l0aCBibGFjay4gYHNoYWRlYCBjYW4gcHJvZHVjZVxuICogaHVlIHNoaWZ0cywgd2hlcmUgYXMgYGRhcmtlbmAgbWFuaXB1bGF0ZXMgdGhlIGx1bWluYW5jZSBjaGFubmVsIGFuZCB0aGVyZWZvcmVcbiAqIGRvZXNuJ3QgcHJvZHVjZSBodWUgc2hpZnRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IHNoYWRlKDAuMjUsICcjMDBmJylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgYmFja2dyb3VuZDogJHtzaGFkZSgwLjI1LCAnIzAwZicpfTtcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwiIzAwMDAzZlwiO1xuICogfVxuICovXG5cbmZ1bmN0aW9uIHNoYWRlKHBlcmNlbnRhZ2UsIGNvbG9yKSB7XG4gIGlmICh0eXBlb2YgcGVyY2VudGFnZSAhPT0gJ251bWJlcicgfHwgcGVyY2VudGFnZSA+IDEgfHwgcGVyY2VudGFnZSA8IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgYW4gaW5jb3JyZWN0IGFyZ3VtZW50IHRvIHNoYWRlLCBwbGVhc2UgcGFzcyBhIHBlcmNlbnRhZ2UgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEgYW5kIGxhcmdlciB0aGFuIG9yIGVxdWFsIHRvIC0xLicpO1xuICB9XG4gIGlmICh0eXBlb2YgY29sb3IgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgYW4gaW5jb3JyZWN0IGFyZ3VtZW50IHRvIGEgY29sb3IgZnVuY3Rpb24sIHBsZWFzZSBwYXNzIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgY29sb3IuJyk7XG4gIH1cbiAgcmV0dXJuIGN1cnJpZWRNaXgocGVyY2VudGFnZSwgY29sb3IsICdyZ2IoMCwgMCwgMCknKTtcbn1cblxudmFyIGN1cnJpZWRTaGFkZSA9IC8qI19fUFVSRV9fKi9jdXJyeShzaGFkZSk7XG5cbi8vICAgICAgXG5cbi8qKlxuICogVGludHMgYSBjb2xvciBieSBtaXhpbmcgaXQgd2l0aCB3aGl0ZS4gYHRpbnRgIGNhbiBwcm9kdWNlXG4gKiBodWUgc2hpZnRzLCB3aGVyZSBhcyBgbGlnaHRlbmAgbWFuaXB1bGF0ZXMgdGhlIGx1bWluYW5jZSBjaGFubmVsIGFuZCB0aGVyZWZvcmVcbiAqIGRvZXNuJ3QgcHJvZHVjZSBodWUgc2hpZnRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IHRpbnQoMC4yNSwgJyMwMGYnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3RpbnQoMC4yNSwgJyMwMGYnKX07XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqIGVsZW1lbnQge1xuICogICBiYWNrZ3JvdW5kOiBcIiNiZmJmZmZcIjtcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiB0aW50KHBlcmNlbnRhZ2UsIGNvbG9yKSB7XG4gIGlmICh0eXBlb2YgcGVyY2VudGFnZSAhPT0gJ251bWJlcicgfHwgcGVyY2VudGFnZSA+IDEgfHwgcGVyY2VudGFnZSA8IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXNzZWQgYW4gaW5jb3JyZWN0IGFyZ3VtZW50IHRvIHRpbnQsIHBsZWFzZSBwYXNzIGEgcGVyY2VudGFnZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gMSBhbmQgbGFyZ2VyIHRoYW4gb3IgZXF1YWwgdG8gLTEuJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb2xvciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bhc3NlZCBhbiBpbmNvcnJlY3QgYXJndW1lbnQgdG8gYSBjb2xvciBmdW5jdGlvbiwgcGxlYXNlIHBhc3MgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBjb2xvci4nKTtcbiAgfVxuICByZXR1cm4gY3VycmllZE1peChwZXJjZW50YWdlLCBjb2xvciwgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xufVxuXG52YXIgY3VycmllZFRpbnQgPSAvKiNfX1BVUkVfXyovY3VycnkodGludCk7XG5cbi8vICAgICAgXG4vKipcbiAqIERlY3JlYXNlcyB0aGUgb3BhY2l0eSBvZiBhIGNvbG9yLiBJdHMgcmFuZ2UgZm9yIHRoZSBhbW91bnQgaXMgYmV0d2VlbiAwIHRvIDEuXG4gKlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50aXplKDAuMSwgJyNmZmYnKTtcbiAqICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnRpemUoMC4yLCAnaHNsKDAsIDAlLCAxMDAlKScpLFxuICogICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudGl6ZSgwLjUsICdyZ2JhKDI1NSwgMCwgMCwgMC44KScpLFxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICBiYWNrZ3JvdW5kOiAke3RyYW5zcGFyZW50aXplKDAuMSwgJyNmZmYnKX07XG4gKiAgIGJhY2tncm91bmQ6ICR7dHJhbnNwYXJlbnRpemUoMC4yLCAnaHNsKDAsIDAlLCAxMDAlKScpfSxcbiAqICAgYmFja2dyb3VuZDogJHt0cmFuc3BhcmVudGl6ZSgwLjUsICdyZ2JhKDI1NSwgMCwgMCwgMC44KScpfSxcbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogZWxlbWVudCB7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjkpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjgpXCI7XG4gKiAgIGJhY2tncm91bmQ6IFwicmdiYSgyNTUsMCwwLDAuMylcIjtcbiAqIH1cbiAqL1xuZnVuY3Rpb24gdHJhbnNwYXJlbnRpemUoYW1vdW50LCBjb2xvcikge1xuICB2YXIgcGFyc2VkQ29sb3IgPSBwYXJzZVRvUmdiKGNvbG9yKTtcbiAgdmFyIGFscGhhID0gdHlwZW9mIHBhcnNlZENvbG9yLmFscGhhID09PSAnbnVtYmVyJyA/IHBhcnNlZENvbG9yLmFscGhhIDogMTtcbiAgdmFyIGNvbG9yV2l0aEFscGhhID0gX2V4dGVuZHMoe30sIHBhcnNlZENvbG9yLCB7XG4gICAgYWxwaGE6IGd1YXJkKDAsIDEsIChhbHBoYSAqIDEwMCAtIGFtb3VudCAqIDEwMCkgLyAxMDApXG4gIH0pO1xuICByZXR1cm4gcmdiYShjb2xvcldpdGhBbHBoYSk7XG59XG5cbnZhciBjdXJyaWVkVHJhbnNwYXJlbnRpemUgPSAvKiNfX1BVUkVfXyovY3VycnkodHJhbnNwYXJlbnRpemUpO1xuXG4vLyAgICAgIFxuXG4vKiogKi9cblxuLyoqXG4gKiBTaG9ydGhhbmQgZm9yIGVhc2lseSBzZXR0aW5nIHRoZSBhbmltYXRpb24gcHJvcGVydHkuIEFsbG93cyBlaXRoZXIgbXVsdGlwbGUgYXJyYXlzIHdpdGggYW5pbWF0aW9uc1xuICogb3IgYSBzaW5nbGUgYW5pbWF0aW9uIHNwcmVhZCBvdmVyIHRoZSBhcmd1bWVudHMuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5hbmltYXRpb24oWydyb3RhdGUnLCAnMXMnLCAnZWFzZS1pbi1vdXQnXSwgWydjb2xvcmNoYW5nZScsICcycyddKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2FuaW1hdGlvbihbJ3JvdGF0ZScsICcxcycsICdlYXNlLWluLW91dCddLCBbJ2NvbG9yY2hhbmdlJywgJzJzJ10pfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAnYW5pbWF0aW9uJzogJ3JvdGF0ZSAxcyBlYXNlLWluLW91dCwgY29sb3JjaGFuZ2UgMnMnXG4gKiB9XG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5hbmltYXRpb24oJ3JvdGF0ZScsICcxcycsICdlYXNlLWluLW91dCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7YW5pbWF0aW9uKCdyb3RhdGUnLCAnMXMnLCAnZWFzZS1pbi1vdXQnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ2FuaW1hdGlvbic6ICdyb3RhdGUgMXMgZWFzZS1pbi1vdXQnXG4gKiB9XG4gKi9cbmZ1bmN0aW9uIGFuaW1hdGlvbigpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgLy8gQWxsb3cgc2luZ2xlIG9yIG11bHRpcGxlIGFuaW1hdGlvbnMgcGFzc2VkXG4gIHZhciBtdWx0aU1vZGUgPSBBcnJheS5pc0FycmF5KGFyZ3NbMF0pO1xuICBpZiAoIW11bHRpTW9kZSAmJiBhcmdzLmxlbmd0aCA+IDgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhbmltYXRpb24gc2hvcnRoYW5kIG9ubHkgdGFrZXMgOCBhcmd1bWVudHMuIFNlZSB0aGUgc3BlY2lmaWNhdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbjogaHR0cDovL21kbi5pby9hbmltYXRpb24nKTtcbiAgfVxuICB2YXIgY29kZSA9IGFyZ3MubWFwKGZ1bmN0aW9uIChhcmcpIHtcbiAgICBpZiAobXVsdGlNb2RlICYmICFBcnJheS5pc0FycmF5KGFyZykgfHwgIW11bHRpTW9kZSAmJiBBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRvIHBhc3MgbXVsdGlwbGUgYW5pbWF0aW9ucyBwbGVhc2Ugc3VwcGx5IHRoZW0gaW4gYXJyYXlzLCBlLmcuIGFuaW1hdGlvbihbJ3JvdGF0ZScsICcycyddLCBbJ21vdmUnLCAnMXMnXSlcXG5UbyBwYXNzIGEgc2luZ2xlIGFuaW1hdGlvbiBwbGVhc2Ugc3VwcGx5IHRoZW0gaW4gc2ltcGxlIHZhbHVlcywgZS5nLiBhbmltYXRpb24oJ3JvdGF0ZScsICcycycpXCIpO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZy5sZW5ndGggPiA4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhbmltYXRpb24gc2hvcnRoYW5kIGFycmF5cyBjYW4gb25seSBoYXZlIDggZWxlbWVudHMuIFNlZSB0aGUgc3BlY2lmaWNhdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbjogaHR0cDovL21kbi5pby9hbmltYXRpb24nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpID8gYXJnLmpvaW4oJyAnKSA6IGFyZztcbiAgfSkuam9pbignLCAnKTtcblxuICByZXR1cm4ge1xuICAgIGFuaW1hdGlvbjogY29kZVxuICB9O1xufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIFNob3J0aGFuZCB0aGF0IGFjY2VwdHMgYW55IG51bWJlciBvZiBiYWNrZ3JvdW5kSW1hZ2UgdmFsdWVzIGFzIHBhcmFtZXRlcnMgZm9yIGNyZWF0aW5nIGEgc2luZ2xlIGJhY2tncm91bmQgc3RhdGVtZW50LlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4uYmFja2dyb3VuZEltYWdlcygndXJsKFwiL2ltYWdlL2JhY2tncm91bmQuanBnXCIpJywgJ2xpbmVhci1ncmFkaWVudChyZWQsIGdyZWVuKScpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7YmFja2dyb3VuZEltYWdlcygndXJsKFwiL2ltYWdlL2JhY2tncm91bmQuanBnXCIpJywgJ2xpbmVhci1ncmFkaWVudChyZWQsIGdyZWVuKScpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAnYmFja2dyb3VuZEltYWdlJzogJ3VybChcIi9pbWFnZS9iYWNrZ3JvdW5kLmpwZ1wiKSwgbGluZWFyLWdyYWRpZW50KHJlZCwgZ3JlZW4pJ1xuICogfVxuICovXG5cbmZ1bmN0aW9uIGJhY2tncm91bmRJbWFnZXMoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBwcm9wZXJ0aWVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgcHJvcGVydGllc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZEltYWdlOiBwcm9wZXJ0aWVzLmpvaW4oJywgJylcbiAgfTtcbn1cblxuLy8gICAgICBcblxuLyoqXG4gKiBTaG9ydGhhbmQgdGhhdCBhY2NlcHRzIGFueSBudW1iZXIgb2YgYmFja2dyb3VuZCB2YWx1ZXMgYXMgcGFyYW1ldGVycyBmb3IgY3JlYXRpbmcgYSBzaW5nbGUgYmFja2dyb3VuZCBzdGF0ZW1lbnQuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5iYWNrZ3JvdW5kcygndXJsKFwiL2ltYWdlL2JhY2tncm91bmQuanBnXCIpJywgJ2xpbmVhci1ncmFkaWVudChyZWQsIGdyZWVuKScsICdjZW50ZXIgbm8tcmVwZWF0JylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtiYWNrZ3JvdW5kcygndXJsKFwiL2ltYWdlL2JhY2tncm91bmQuanBnXCIpJywgJ2xpbmVhci1ncmFkaWVudChyZWQsIGdyZWVuKScsICdjZW50ZXIgbm8tcmVwZWF0Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGRpdiB7XG4gKiAgICdiYWNrZ3JvdW5kJzogJ3VybChcIi9pbWFnZS9iYWNrZ3JvdW5kLmpwZ1wiKSwgbGluZWFyLWdyYWRpZW50KHJlZCwgZ3JlZW4pLCBjZW50ZXIgbm8tcmVwZWF0J1xuICogfVxuICovXG5mdW5jdGlvbiBiYWNrZ3JvdW5kcygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHByb3BlcnRpZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBwcm9wZXJ0aWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kOiBwcm9wZXJ0aWVzLmpvaW4oJywgJylcbiAgfTtcbn1cblxuLy8gICAgICBcbi8qKlxuICogU2hvcnRoYW5kIHRoYXQgYWNjZXB0cyB1cCB0byBmb3VyIHZhbHVlcywgaW5jbHVkaW5nIG51bGwgdG8gc2tpcCBhIHZhbHVlLCBhbmQgbWFwcyB0aGVtIHRvIHRoZWlyIHJlc3BlY3RpdmUgZGlyZWN0aW9ucy5cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLmJvcmRlckNvbG9yKCdyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICd5ZWxsb3cnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2JvcmRlckNvbG9yKCdyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICd5ZWxsb3cnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ2JvcmRlclRvcENvbG9yJzogJ3JlZCcsXG4gKiAgICdib3JkZXJSaWdodENvbG9yJzogJ2dyZWVuJyxcbiAqICAgJ2JvcmRlckJvdHRvbUNvbG9yJzogJ2JsdWUnLFxuICogICAnYm9yZGVyTGVmdENvbG9yJzogJ3llbGxvdydcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBib3JkZXJDb2xvcigpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHZhbHVlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHZhbHVlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBkaXJlY3Rpb25hbFByb3BlcnR5LmFwcGx5KHVuZGVmaW5lZCwgWydib3JkZXJDb2xvciddLmNvbmNhdCh2YWx1ZXMpKTtcbn1cblxuLy8gICAgICBcbi8qKlxuICogU2hvcnRoYW5kIHRoYXQgYWNjZXB0cyBhIHZhbHVlIGZvciBzaWRlIGFuZCBhIHZhbHVlIGZvciByYWRpdXMgYW5kIGFwcGxpZXMgdGhlIHJhZGl1cyB2YWx1ZSB0byBib3RoIGNvcm5lcnMgb2YgdGhlIHNpZGUuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5ib3JkZXJSYWRpdXMoJ3RvcCcsICc1cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2JvcmRlclJhZGl1cygndG9wJywgJzVweCcpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAnYm9yZGVyVG9wUmlnaHRSYWRpdXMnOiAnNXB4JyxcbiAqICAgJ2JvcmRlclRvcExlZnRSYWRpdXMnOiAnNXB4JyxcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBib3JkZXJSYWRpdXMoc2lkZSwgcmFkaXVzKSB7XG4gIHZhciB1cHBlcmNhc2VTaWRlID0gY2FwaXRhbGl6ZVN0cmluZyhzaWRlKTtcbiAgaWYgKCFyYWRpdXMgJiYgcmFkaXVzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdib3JkZXJSYWRpdXMgZXhwZWN0cyBhIHJhZGl1cyB2YWx1ZSBhcyBhIHN0cmluZyBvciBudW1iZXIgYXMgdGhlIHNlY29uZCBhcmd1bWVudC4nKTtcbiAgfVxuICBpZiAodXBwZXJjYXNlU2lkZSA9PT0gJ1RvcCcgfHwgdXBwZXJjYXNlU2lkZSA9PT0gJ0JvdHRvbScpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbJ2JvcmRlcicgKyB1cHBlcmNhc2VTaWRlICsgJ1JpZ2h0UmFkaXVzJ10gPSByYWRpdXMsIF9yZWZbJ2JvcmRlcicgKyB1cHBlcmNhc2VTaWRlICsgJ0xlZnRSYWRpdXMnXSA9IHJhZGl1cywgX3JlZjtcbiAgfVxuXG4gIGlmICh1cHBlcmNhc2VTaWRlID09PSAnTGVmdCcgfHwgdXBwZXJjYXNlU2lkZSA9PT0gJ1JpZ2h0Jykge1xuICAgIHZhciBfcmVmMjtcblxuICAgIHJldHVybiBfcmVmMiA9IHt9LCBfcmVmMlsnYm9yZGVyVG9wJyArIHVwcGVyY2FzZVNpZGUgKyAnUmFkaXVzJ10gPSByYWRpdXMsIF9yZWYyWydib3JkZXJCb3R0b20nICsgdXBwZXJjYXNlU2lkZSArICdSYWRpdXMnXSA9IHJhZGl1cywgX3JlZjI7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ2JvcmRlclJhZGl1cyBleHBlY3RzIG9uZSBvZiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiBvciBcInJpZ2h0XCIgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LicpO1xufVxuXG4vLyAgICAgIFxuLyoqXG4gKiBTaG9ydGhhbmQgdGhhdCBhY2NlcHRzIHVwIHRvIGZvdXIgdmFsdWVzLCBpbmNsdWRpbmcgbnVsbCB0byBza2lwIGEgdmFsdWUsIGFuZCBtYXBzIHRoZW0gdG8gdGhlaXIgcmVzcGVjdGl2ZSBkaXJlY3Rpb25zLlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4uYm9yZGVyU3R5bGUoJ3NvbGlkJywgJ2Rhc2hlZCcsICdkb3R0ZWQnLCAnZG91YmxlJylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtib3JkZXJTdHlsZSgnc29saWQnLCAnZGFzaGVkJywgJ2RvdHRlZCcsICdkb3VibGUnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ2JvcmRlclRvcFN0eWxlJzogJ3NvbGlkJyxcbiAqICAgJ2JvcmRlclJpZ2h0U3R5bGUnOiAnZGFzaGVkJyxcbiAqICAgJ2JvcmRlckJvdHRvbVN0eWxlJzogJ2RvdHRlZCcsXG4gKiAgICdib3JkZXJMZWZ0U3R5bGUnOiAnZG91YmxlJ1xuICogfVxuICovXG5cbmZ1bmN0aW9uIGJvcmRlclN0eWxlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsdWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGRpcmVjdGlvbmFsUHJvcGVydHkuYXBwbHkodW5kZWZpbmVkLCBbJ2JvcmRlclN0eWxlJ10uY29uY2F0KHZhbHVlcykpO1xufVxuXG4vLyAgICAgIFxuLyoqXG4gKiBTaG9ydGhhbmQgdGhhdCBhY2NlcHRzIHVwIHRvIGZvdXIgdmFsdWVzLCBpbmNsdWRpbmcgbnVsbCB0byBza2lwIGEgdmFsdWUsIGFuZCBtYXBzIHRoZW0gdG8gdGhlaXIgcmVzcGVjdGl2ZSBkaXJlY3Rpb25zLlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4uYm9yZGVyV2lkdGgoJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke2JvcmRlcldpZHRoKCcxMnB4JywgJzI0cHgnLCAnMzZweCcsICc0OHB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGRpdiB7XG4gKiAgICdib3JkZXJUb3BXaWR0aCc6ICcxMnB4JyxcbiAqICAgJ2JvcmRlclJpZ2h0V2lkdGgnOiAnMjRweCcsXG4gKiAgICdib3JkZXJCb3R0b21XaWR0aCc6ICczNnB4JyxcbiAqICAgJ2JvcmRlckxlZnRXaWR0aCc6ICc0OHB4J1xuICogfVxuICovXG5mdW5jdGlvbiBib3JkZXJXaWR0aCgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHZhbHVlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHZhbHVlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBkaXJlY3Rpb25hbFByb3BlcnR5LmFwcGx5KHVuZGVmaW5lZCwgWydib3JkZXJXaWR0aCddLmNvbmNhdCh2YWx1ZXMpKTtcbn1cblxuLy8gICAgICBcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdG9ycyh0ZW1wbGF0ZSwgc3RhdGUpIHtcbiAgdmFyIHN0YXRlU3VmZml4ID0gc3RhdGUgPyAnOicgKyBzdGF0ZSA6ICcnO1xuICByZXR1cm4gdGVtcGxhdGUoc3RhdGVTdWZmaXgpO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIGhlbHBlciB0aGF0IGFkZHMgYW4gYXJyYXkgb2Ygc3RhdGVzIHRvIGEgdGVtcGxhdGUgb2Ygc2VsZWN0b3JzLiBVc2VkIGluIHRleHRJbnB1dHMgYW5kIGJ1dHRvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzdGF0ZWZ1bFNlbGVjdG9ycyhzdGF0ZXMsIHRlbXBsYXRlLCBzdGF0ZU1hcCkge1xuICBpZiAoIXRlbXBsYXRlKSB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYSB0ZW1wbGF0ZSB0byB0aGlzIG1ldGhvZC4nKTtcbiAgaWYgKHN0YXRlcy5sZW5ndGggPT09IDApIHJldHVybiBnZW5lcmF0ZVNlbGVjdG9ycyh0ZW1wbGF0ZSwgbnVsbCk7XG4gIHZhciBzZWxlY3RvcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGF0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoc3RhdGVNYXAgJiYgc3RhdGVNYXAuaW5kZXhPZihzdGF0ZXNbaV0pIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgcGFzc2VkIGFuIHVuc3VwcG9ydGVkIHNlbGVjdG9yIHN0YXRlIHRvIHRoaXMgbWV0aG9kLicpO1xuICAgIH1cbiAgICBzZWxlY3RvcnMucHVzaChnZW5lcmF0ZVNlbGVjdG9ycyh0ZW1wbGF0ZSwgc3RhdGVzW2ldKSk7XG4gIH1cbiAgc2VsZWN0b3JzID0gc2VsZWN0b3JzLmpvaW4oJywnKTtcbiAgcmV0dXJuIHNlbGVjdG9ycztcbn1cblxuLy8gICAgICBcbnZhciBzdGF0ZU1hcCA9IFt1bmRlZmluZWQsIG51bGwsICdhY3RpdmUnLCAnZm9jdXMnLCAnaG92ZXInXTtcblxuZnVuY3Rpb24gdGVtcGxhdGUoc3RhdGUpIHtcbiAgcmV0dXJuICdidXR0b24nICsgc3RhdGUgKyAnLFxcbiAgaW5wdXRbdHlwZT1cImJ1dHRvblwiXScgKyBzdGF0ZSArICcsXFxuICBpbnB1dFt0eXBlPVwicmVzZXRcIl0nICsgc3RhdGUgKyAnLFxcbiAgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScgKyBzdGF0ZTtcbn1cblxuLyoqXG4gKiBQb3B1bGF0ZXMgc2VsZWN0b3JzIHRoYXQgdGFyZ2V0IGFsbCBidXR0b25zLiBZb3UgY2FuIHBhc3Mgb3B0aW9uYWwgc3RhdGVzIHRvIGFwcGVuZCB0byB0aGUgc2VsZWN0b3JzLlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgW2J1dHRvbnMoJ2FjdGl2ZScpXToge1xuICogICAgICdib3JkZXInOiAnbm9uZSdcbiAqICAgfVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICA+ICR7YnV0dG9ucygnYWN0aXZlJyl9IHtcbiAqICAgICBib3JkZXI6IG5vbmU7XG4gKiAgIH1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgaW4gSlMgT3V0cHV0XG4gKlxuICogICdidXR0b246YWN0aXZlLFxuICogICdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdOmFjdGl2ZSxcbiAqICAnaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXTphY3RpdmUsXG4gKiAgJ2lucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdOmFjdGl2ZToge1xuICogICAnYm9yZGVyJzogJ25vbmUnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gYnV0dG9ucygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHN0YXRlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHN0YXRlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZWZ1bFNlbGVjdG9ycyhzdGF0ZXMsIHRlbXBsYXRlLCBzdGF0ZU1hcCk7XG59XG5cbi8vICAgICAgXG4vKipcbiAqIFNob3J0aGFuZCB0aGF0IGFjY2VwdHMgdXAgdG8gZm91ciB2YWx1ZXMsIGluY2x1ZGluZyBudWxsIHRvIHNraXAgYSB2YWx1ZSwgYW5kIG1hcHMgdGhlbSB0byB0aGVpciByZXNwZWN0aXZlIGRpcmVjdGlvbnMuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5tYXJnaW4oJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke21hcmdpbignMTJweCcsICcyNHB4JywgJzM2cHgnLCAnNDhweCcpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAnbWFyZ2luVG9wJzogJzEycHgnLFxuICogICAnbWFyZ2luUmlnaHQnOiAnMjRweCcsXG4gKiAgICdtYXJnaW5Cb3R0b20nOiAnMzZweCcsXG4gKiAgICdtYXJnaW5MZWZ0JzogJzQ4cHgnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gbWFyZ2luKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsdWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGRpcmVjdGlvbmFsUHJvcGVydHkuYXBwbHkodW5kZWZpbmVkLCBbJ21hcmdpbiddLmNvbmNhdCh2YWx1ZXMpKTtcbn1cblxuLy8gICAgICBcbi8qKlxuICogU2hvcnRoYW5kIHRoYXQgYWNjZXB0cyB1cCB0byBmb3VyIHZhbHVlcywgaW5jbHVkaW5nIG51bGwgdG8gc2tpcCBhIHZhbHVlLCBhbmQgbWFwcyB0aGVtIHRvIHRoZWlyIHJlc3BlY3RpdmUgZGlyZWN0aW9ucy5cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLnBhZGRpbmcoJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3BhZGRpbmcoJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ3BhZGRpbmdUb3AnOiAnMTJweCcsXG4gKiAgICdwYWRkaW5nUmlnaHQnOiAnMjRweCcsXG4gKiAgICdwYWRkaW5nQm90dG9tJzogJzM2cHgnLFxuICogICAncGFkZGluZ0xlZnQnOiAnNDhweCdcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiBwYWRkaW5nKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdmFsdWVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsdWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGRpcmVjdGlvbmFsUHJvcGVydHkuYXBwbHkodW5kZWZpbmVkLCBbJ3BhZGRpbmcnXS5jb25jYXQodmFsdWVzKSk7XG59XG5cbi8vICAgICAgXG52YXIgcG9zaXRpb25NYXAkMSA9IFsnYWJzb2x1dGUnLCAnZml4ZWQnLCAncmVsYXRpdmUnLCAnc3RhdGljJywgJ3N0aWNreSddO1xuXG4vKipcbiAqIFNob3J0aGFuZCBhY2NlcHRzIHVwIHRvIGZpdmUgdmFsdWVzLCBpbmNsdWRpbmcgbnVsbCB0byBza2lwIGEgdmFsdWUsIGFuZCBtYXBzIHRoZW0gdG8gdGhlaXIgcmVzcGVjdGl2ZSBkaXJlY3Rpb25zLiBUaGUgZmlyc3QgdmFsdWUgY2FuIG9wdGlvbmFsbHkgYmUgYSBwb3NpdGlvbiBrZXl3b3JkLlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4ucG9zaXRpb24oJzEycHgnLCAnMjRweCcsICczNnB4JywgJzQ4cHgnKVxuICogfVxuICpcbiAqIC8vIHN0eWxlZC1jb21wb25lbnRzIHVzYWdlXG4gKiBjb25zdCBkaXYgPSBzdHlsZWQuZGl2YFxuICogICAke3Bvc2l0aW9uKCcxMnB4JywgJzI0cHgnLCAnMzZweCcsICc0OHB4Jyl9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGFzIEpTIE91dHB1dFxuICpcbiAqIGRpdiB7XG4gKiAgICd0b3AnOiAnMTJweCcsXG4gKiAgICdyaWdodCc6ICcyNHB4JyxcbiAqICAgJ2JvdHRvbSc6ICczNnB4JyxcbiAqICAgJ2xlZnQnOiAnNDhweCdcbiAqIH1cbiAqXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIC4uLnBvc2l0aW9uKCdhYnNvbHV0ZScsICcxMnB4JywgJzI0cHgnLCAnMzZweCcsICc0OHB4JylcbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgJHtwb3NpdGlvbignYWJzb2x1dGUnLCAnMTJweCcsICcyNHB4JywgJzM2cHgnLCAnNDhweCcpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICogICAndG9wJzogJzEycHgnLFxuICogICAncmlnaHQnOiAnMjRweCcsXG4gKiAgICdib3R0b20nOiAnMzZweCcsXG4gKiAgICdsZWZ0JzogJzQ4cHgnXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gcG9zaXRpb24ocG9zaXRpb25LZXl3b3JkKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCB2YWx1ZXMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdmFsdWVzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChwb3NpdGlvbk1hcCQxLmluZGV4T2YocG9zaXRpb25LZXl3b3JkKSA+PSAwKSB7XG4gICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbktleXdvcmRcbiAgICB9LCBkaXJlY3Rpb25hbFByb3BlcnR5LmFwcGx5KHVuZGVmaW5lZCwgWycnXS5jb25jYXQodmFsdWVzKSkpO1xuICB9IGVsc2Uge1xuICAgIHZhciBmaXJzdFZhbHVlID0gcG9zaXRpb25LZXl3b3JkOyAvLyBpbiB0aGlzIGNhc2UgcG9zaXRpb24gaXMgYWN0dWFsbHkgdGhlIGZpcnN0IHZhbHVlXG4gICAgcmV0dXJuIGRpcmVjdGlvbmFsUHJvcGVydHkuYXBwbHkodW5kZWZpbmVkLCBbJycsIGZpcnN0VmFsdWVdLmNvbmNhdCh2YWx1ZXMpKTtcbiAgfVxufVxuXG4vLyAgICAgIFxuXG4vKipcbiAqIFNob3J0aGFuZCB0byBzZXQgdGhlIGhlaWdodCBhbmQgd2lkdGggcHJvcGVydGllcyBpbiBhIHNpbmdsZSBzdGF0ZW1lbnQuXG4gKiBAZXhhbXBsZVxuICogLy8gU3R5bGVzIGFzIG9iamVjdCB1c2FnZVxuICogY29uc3Qgc3R5bGVzID0ge1xuICogICAuLi5zaXplKCczMDBweCcsICcyNTBweCcpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7c2l6ZSgnMzAwcHgnLCAnMjUwcHgnKX1cbiAqIGBcbiAqXG4gKiAvLyBDU1MgYXMgSlMgT3V0cHV0XG4gKlxuICogZGl2IHtcbiAqICAgJ2hlaWdodCc6ICczMDBweCcsXG4gKiAgICd3aWR0aCc6ICcyNTBweCcsXG4gKiB9XG4gKi9cblxuZnVuY3Rpb24gc2l6ZShoZWlnaHQpIHtcbiAgdmFyIHdpZHRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBoZWlnaHQ7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB3aWR0aDogd2lkdGhcbiAgfTtcbn1cblxuLy8gICAgICBcbnZhciBzdGF0ZU1hcCQxID0gW3VuZGVmaW5lZCwgbnVsbCwgJ2FjdGl2ZScsICdmb2N1cycsICdob3ZlciddO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZSQxKHN0YXRlKSB7XG4gIHJldHVybiAnaW5wdXRbdHlwZT1cImNvbG9yXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXRbdHlwZT1cImRhdGVcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwiZGF0ZXRpbWVcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwiZW1haWxcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwibW9udGhcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXRbdHlwZT1cInNlYXJjaFwiXScgKyBzdGF0ZSArICcsXFxuICAgIGlucHV0W3R5cGU9XCJ0ZWxcIl0nICsgc3RhdGUgKyAnLFxcbiAgICBpbnB1dFt0eXBlPVwidGV4dFwiXScgKyBzdGF0ZSArICcsXFxuICAgIGlucHV0W3R5cGU9XCJ0aW1lXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXRbdHlwZT1cInVybFwiXScgKyBzdGF0ZSArICcsXFxuICAgIGlucHV0W3R5cGU9XCJ3ZWVrXCJdJyArIHN0YXRlICsgJyxcXG4gICAgaW5wdXQ6bm90KFt0eXBlXSknICsgc3RhdGUgKyAnLFxcbiAgICB0ZXh0YXJlYScgKyBzdGF0ZTtcbn1cblxuLyoqXG4gKiBQb3B1bGF0ZXMgc2VsZWN0b3JzIHRoYXQgdGFyZ2V0IGFsbCB0ZXh0IGlucHV0cy4gWW91IGNhbiBwYXNzIG9wdGlvbmFsIHN0YXRlcyB0byBhcHBlbmQgdG8gdGhlIHNlbGVjdG9ycy5cbiAqIEBleGFtcGxlXG4gKiAvLyBTdHlsZXMgYXMgb2JqZWN0IHVzYWdlXG4gKiBjb25zdCBzdHlsZXMgPSB7XG4gKiAgIFt0ZXh0SW5wdXRzKCdhY3RpdmUnKV06IHtcbiAqICAgICAnYm9yZGVyJzogJ25vbmUnXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiAvLyBzdHlsZWQtY29tcG9uZW50cyB1c2FnZVxuICogY29uc3QgZGl2ID0gc3R5bGVkLmRpdmBcbiAqICAgPiAke3RleHRJbnB1dHMoJ2FjdGl2ZScpfSB7XG4gKiAgICAgYm9yZGVyOiBub25lO1xuICogICB9XG4gKiBgXG4gKlxuICogLy8gQ1NTIGluIEpTIE91dHB1dFxuICpcbiAqICAnaW5wdXRbdHlwZT1cImNvbG9yXCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwiZGF0ZVwiXTphY3RpdmUsXG4gKiAgaW5wdXRbdHlwZT1cImRhdGV0aW1lXCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIl06YWN0aXZlLFxuICogIGlucHV0W3R5cGU9XCJlbWFpbFwiXTphY3RpdmUsXG4gKiAgaW5wdXRbdHlwZT1cIm1vbnRoXCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl06YWN0aXZlLFxuICogIGlucHV0W3R5cGU9XCJzZWFyY2hcIl06YWN0aXZlLFxuICogIGlucHV0W3R5cGU9XCJ0ZWxcIl06YWN0aXZlLFxuICogIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOmFjdGl2ZSxcbiAqICBpbnB1dFt0eXBlPVwidGltZVwiXTphY3RpdmUsXG4gKiAgaW5wdXRbdHlwZT1cInVybFwiXTphY3RpdmUsXG4gKiAgaW5wdXRbdHlwZT1cIndlZWtcIl06YWN0aXZlLFxuICogIGlucHV0Om5vdChbdHlwZV0pOmFjdGl2ZSxcbiAqICB0ZXh0YXJlYTphY3RpdmUnOiB7XG4gKiAgICdib3JkZXInOiAnbm9uZSdcbiAqIH1cbiAqL1xuXG5mdW5jdGlvbiB0ZXh0SW5wdXRzKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc3RhdGVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgc3RhdGVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlZnVsU2VsZWN0b3JzKHN0YXRlcywgdGVtcGxhdGUkMSwgc3RhdGVNYXAkMSk7XG59XG5cbi8vICAgICAgXG5cbi8qKlxuICogU2hvcnRoYW5kIHRoYXQgYWNjZXB0cyBhbnkgbnVtYmVyIG9mIHRyYW5zaXRpb24gdmFsdWVzIGFzIHBhcmFtZXRlcnMgZm9yIGNyZWF0aW5nIGEgc2luZ2xlIHRyYW5zaXRpb24gc3RhdGVtZW50LlxuICogQGV4YW1wbGVcbiAqIC8vIFN0eWxlcyBhcyBvYmplY3QgdXNhZ2VcbiAqIGNvbnN0IHN0eWxlcyA9IHtcbiAqICAgLi4udHJhbnNpdGlvbnMoJ29wYWNpdHkgMS4wcyBlYXNlLWluIDBzJywgJ3dpZHRoIDIuMHMgZWFzZS1pbiAycycpXG4gKiB9XG4gKlxuICogLy8gc3R5bGVkLWNvbXBvbmVudHMgdXNhZ2VcbiAqIGNvbnN0IGRpdiA9IHN0eWxlZC5kaXZgXG4gKiAgICR7dHJhbnNpdGlvbnMoJ29wYWNpdHkgMS4wcyBlYXNlLWluIDBzJywgJ3dpZHRoIDIuMHMgZWFzZS1pbiAycycpfVxuICogYFxuICpcbiAqIC8vIENTUyBhcyBKUyBPdXRwdXRcbiAqXG4gKiBkaXYge1xuICogICAndHJhbnNpdGlvbic6ICdvcGFjaXR5IDEuMHMgZWFzZS1pbiAwcywgd2lkdGggMi4wcyBlYXNlLWluIDJzJ1xuICogfVxuICovXG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25zKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcHJvcGVydGllcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHByb3BlcnRpZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRyYW5zaXRpb246IHByb3BlcnRpZXMuam9pbignLCAnKVxuICB9O1xufVxuXG4vLyAgICAgIFxuLy8gSGVscGVyc1xuLy8gTWl4aW5zXG4vLyBDb2xvclxuLy8gU2hvcnRoYW5kc1xuXG5leHBvcnQgeyBjdXJyaWVkQWRqdXN0SHVlIGFzIGFkanVzdEh1ZSwgYW5pbWF0aW9uLCBiYWNrZ3JvdW5kSW1hZ2VzLCBiYWNrZ3JvdW5kcywgYm9yZGVyQ29sb3IsIGJvcmRlclJhZGl1cywgYm9yZGVyU3R5bGUsIGJvcmRlcldpZHRoLCBidXR0b25zLCBjbGVhckZpeCwgY29tcGxlbWVudCwgY3VycmllZERhcmtlbiBhcyBkYXJrZW4sIGN1cnJpZWREZXNhdHVyYXRlIGFzIGRlc2F0dXJhdGUsIGRpcmVjdGlvbmFsUHJvcGVydHksIGVsbGlwc2lzLCBlbSwgZm9udEZhY2UsIGdldEx1bWluYW5jZSwgZ3JheXNjYWxlLCBpbnZlcnQsIGhpZGVUZXh0LCBoaWRlVmlzdWFsbHksIGhpRFBJLCBoc2wsIGhzbGEsIGN1cnJpZWRMaWdodGVuIGFzIGxpZ2h0ZW4sIG1hcmdpbiwgY3VycmllZE1peCBhcyBtaXgsIG1vZHVsYXJTY2FsZSwgbm9ybWFsaXplLCBjdXJyaWVkT3BhY2lmeSBhcyBvcGFjaWZ5LCBwYWRkaW5nLCBwYXJzZVRvSHNsLCBwYXJzZVRvUmdiLCBwbGFjZWhvbGRlciwgcG9zaXRpb24sIHJhZGlhbEdyYWRpZW50LCBjdXJyaWVkUmVhZGFibGVDb2xvciBhcyByZWFkYWJsZUNvbG9yLCByZW0sIHJldGluYUltYWdlLCByZ2IsIHJnYmEsIGN1cnJpZWRTYXR1cmF0ZSBhcyBzYXR1cmF0ZSwgc2VsZWN0aW9uLCBjdXJyaWVkU2V0SHVlIGFzIHNldEh1ZSwgY3VycmllZFNldExpZ2h0bmVzcyBhcyBzZXRMaWdodG5lc3MsIGN1cnJpZWRTZXRTYXR1cmF0aW9uIGFzIHNldFNhdHVyYXRpb24sIGN1cnJpZWRTaGFkZSBhcyBzaGFkZSwgc2l6ZSwgc3RyaXBVbml0LCB0ZXh0SW5wdXRzLCB0aW1pbmdGdW5jdGlvbnMsIGN1cnJpZWRUaW50IGFzIHRpbnQsIHRvQ29sb3JTdHJpbmcsIHRyYW5zaXRpb25zLCBjdXJyaWVkVHJhbnNwYXJlbnRpemUgYXMgdHJhbnNwYXJlbnRpemUsIHRyaWFuZ2xlLCB3b3JkV3JhcCB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcG9saXNoZWQvZGlzdC9wb2xpc2hlZC5lcy5qc1xuLy8gbW9kdWxlIGlkID0gNDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsImltcG9ydCB7IGNzcyB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJ1xuXG5pbXBvcnQgeyBXSURFX1dJRFRILCBOT1JNQUxfV0lEVEggfSBmcm9tICcuLi9jb21wb25lbnRzL0NvbnRhaW5lcidcblxuZXhwb3J0IGNvbnN0IG1vYmlsZSA9IGlubmVyID0+IGNzc2BcbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7V0lERV9XSURUSH1weCkge1xuICAgICR7aW5uZXJ9O1xuICB9XG5gXG5cbmV4cG9ydCBjb25zdCBwaG9uZSA9IGlubmVyID0+IGNzc2BcbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7Tk9STUFMX1dJRFRIfXB4KSB7XG4gICAgJHtpbm5lcn07XG4gIH1cbmBcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL21lZGlhLmpzIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiZcbiAgICBTeW1ib2wuZm9yICYmXG4gICAgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpKSB8fFxuICAgIDB4ZWFjNztcblxuICB2YXIgaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIG9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gIH07XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG4gIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGludmFyaWFudCh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAndGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCVzYC4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSk7XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcik7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDUiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA1IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzUwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDN2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdmtEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDQTtBQUNBO0FBQ0E7QUFBQTtBQUhBO0FBREE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTs7Ozs7O0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBR0E7QUFDQTtBQUFBOztBQUhBO0FBQUE7QUFBQTtBQUNBO0FBT0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUdBO0FBQ0E7QUFBQTs7QUFIQTtBQUFBO0FBQUE7QUFDQTtBQUhBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFFQTtBQUNBOzs7Ozs7O0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFKQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7O0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUVBO0FBRkE7QUFBQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFFQTtBQUZBO0FBQUE7O0FBRUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFUQTtBQUNBO0FBYUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFTQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBcUJBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFlQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFGQTtBQUNBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQVVBO0FBQUE7QUFBQTtBQUFBO0FBU0E7QUFUQTtBQVVBO0FBVkE7QUFjQTtBQWRBO0FBQ0E7QUFpQkE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUhBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSkE7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFzQkE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7O0FDRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuaEdBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFBQTtBQU1BO0FBQ0E7QUFEQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=
            return { page: comp.default }
          })
        