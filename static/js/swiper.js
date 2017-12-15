/**
 * Swiper 4.0.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2017 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 13, 2017
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Swiper = factory());
}(this, (function () { 'use strict';

var w;
if (typeof window === 'undefined') {
  w = {
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {};
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
  };
} else {
  w = window;
}

var win = w;

/**
 * Dom7 2.0.1
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 *
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: October 2, 2017
 */
var Dom7 = function Dom7(arr) {
  var self = this;
  // Create array-like object
  for (var i = 0; i < arr.length; i += 1) {
    self[i] = arr[i];
  }
  self.length = arr.length;
  // Return collection with methods
  return this;
};

function $$1(selector, context) {
  var arr = [];
  var i = 0;
  if (selector && !context) {
    if (selector instanceof Dom7) {
      return selector;
    }
  }
  if (selector) {
      // String
    if (typeof selector === 'string') {
      var els;
      var tempParent;
      var html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
        if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
        if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
        if (html.indexOf('<option') === 0) { toCreate = 'select'; }
        tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [document.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          els = (context || document).querySelectorAll(selector.trim());
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) { arr.push(els[i]); }
        }
      }
    } else if (selector.nodeType || selector === window || selector === document) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Dom7(arr);
}

$$1.fn = Dom7.prototype;
$$1.Class = Dom7;
$$1.Dom7 = Dom7;

function unique(arr) {
  var uniqueArray = [];
  for (var i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
  }
  return uniqueArray;
}
// Classes and attributes
function addClass(className) {
  var this$1 = this;

  if (typeof className === 'undefined') {
    return this;
  }
  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
    }
  }
  return this;
}
function removeClass(className) {
  var this$1 = this;

  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
    }
  }
  return this;
}
function hasClass(className) {
  if (!this[0]) { return false; }
  return this[0].classList.contains(className);
}
function toggleClass(className) {
  var this$1 = this;

  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
    }
  }
  return this;
}
function attr(attrs, value) {
  var arguments$1 = arguments;
  var this$1 = this;

  if (arguments.length === 1 && typeof attrs === 'string') {
    // Get attr
    if (this[0]) { return this[0].getAttribute(attrs); }
    return undefined;
  }

  // Set attrs
  for (var i = 0; i < this.length; i += 1) {
    if (arguments$1.length === 2) {
      // String
      this$1[i].setAttribute(attrs, value);
    } else {
      // Object
      // eslint-disable-next-line
      for (var attrName in attrs) {
        this$1[i][attrName] = attrs[attrName];
        this$1[i].setAttribute(attrName, attrs[attrName]);
      }
    }
  }
  return this;
}
// eslint-disable-next-line
function removeAttr(attr) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].removeAttribute(attr);
  }
  return this;
}
function data(key, value) {
  var this$1 = this;

  var el;
  if (typeof value === 'undefined') {
    el = this[0];
    // Get value
    if (el) {
      if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
        return el.dom7ElementDataStorage[key];
      }

      var dataKey = el.getAttribute(("data-" + key));
      if (dataKey) {
        return dataKey;
      }
      return undefined;
    }
    return undefined;
  }

  // Set value
  for (var i = 0; i < this.length; i += 1) {
    el = this$1[i];
    if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
    el.dom7ElementDataStorage[key] = value;
  }
  return this;
}
// Transforms
// eslint-disable-next-line
function transform(transform) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this$1[i].style;
    elStyle.webkitTransform = transform;
    elStyle.transform = transform;
  }
  return this;
}
function transition(duration) {
  var this$1 = this;

  if (typeof duration !== 'string') {
    duration = duration + "ms"; // eslint-disable-line
  }
  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this$1[i].style;
    elStyle.webkitTransitionDuration = duration;
    elStyle.transitionDuration = duration;
  }
  return this;
}
// Events
function on() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var eventType = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    var assign;
    (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  if (!capture) { capture = false; }

  function handleLiveEvent(e) {
    var target = e.target;
    if (!target) { return; }
    var eventData = e.target.dom7EventData || [];
    eventData.unshift(e);
    if ($$1(target).is(targetSelector)) { listener.apply(target, eventData); }
    else {
      var parents = $$1(target).parents(); // eslint-disable-line
      for (var k = 0; k < parents.length; k += 1) {
        if ($$1(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
      }
    }
  }
  function handleEvent(e) {
    var eventData = e && e.target ? e.target.dom7EventData || [] : [];
    eventData.unshift(e);
    listener.apply(this, eventData);
  }
  var events = eventType.split(' ');
  var j;
  for (var i = 0; i < this.length; i += 1) {
    var el = this$1[i];
    if (!targetSelector) {
      for (j = 0; j < events.length; j += 1) {
        if (!el.dom7Listeners) { el.dom7Listeners = []; }
        el.dom7Listeners.push({
          type: eventType,
          listener: listener,
          proxyListener: handleEvent,
        });
        el.addEventListener(events[j], handleEvent, capture);
      }
    } else {
      // Live events
      for (j = 0; j < events.length; j += 1) {
        if (!el.dom7LiveListeners) { el.dom7LiveListeners = []; }
        el.dom7LiveListeners.push({
          type: eventType,
          listener: listener,
          proxyListener: handleLiveEvent,
        });
        el.addEventListener(events[j], handleLiveEvent, capture);
      }
    }
  }
  return this;
}
function off() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var eventType = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    var assign;
    (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  if (!capture) { capture = false; }

  var events = eventType.split(' ');
  for (var i = 0; i < events.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      var el = this$1[j];
      if (!targetSelector) {
        if (el.dom7Listeners) {
          for (var k = 0; k < el.dom7Listeners.length; k += 1) {
            if (listener) {
              if (el.dom7Listeners[k].listener === listener) {
                el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
              }
            } else if (el.dom7Listeners[k].type === events[i]) {
              el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
            }
          }
        }
      } else if (el.dom7LiveListeners) {
        for (var k$1 = 0; k$1 < el.dom7LiveListeners.length; k$1 += 1) {
          if (listener) {
            if (el.dom7LiveListeners[k$1].listener === listener) {
              el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
            }
          } else if (el.dom7LiveListeners[k$1].type === events[i]) {
            el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
          }
        }
      }
    }
  }
  return this;
}
function trigger() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var events = args[0].split(' ');
  var eventData = args[1];
  for (var i = 0; i < events.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      var evt = (void 0);
      try {
        evt = new window.CustomEvent(events[i], {
          detail: eventData,
          bubbles: true,
          cancelable: true,
        });
      } catch (e) {
        evt = document.createEvent('Event');
        evt.initEvent(events[i], true, true);
        evt.detail = eventData;
      }
      // eslint-disable-next-line
      this$1[j].dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
      this$1[j].dispatchEvent(evt);
      this$1[j].dom7EventData = [];
      delete this$1[j].dom7EventData;
    }
  }
  return this;
}
function transitionEnd(callback) {
  var events = ['webkitTransitionEnd', 'transitionend'];
  var dom = this;
  var i;
  function fireCallBack(e) {
    /* jshint validthis:true */
    if (e.target !== this) { return; }
    callback.call(this, e);
    for (i = 0; i < events.length; i += 1) {
      dom.off(events[i], fireCallBack);
    }
  }
  if (callback) {
    for (i = 0; i < events.length; i += 1) {
      dom.on(events[i], fireCallBack);
    }
  }
  return this;
}
function outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var styles = this.styles();
      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
    }
    return this[0].offsetWidth;
  }
  return null;
}
function outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var styles = this.styles();
      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
    }
    return this[0].offsetHeight;
  }
  return null;
}
function offset() {
  if (this.length > 0) {
    var el = this[0];
    var box = el.getBoundingClientRect();
    var body = document.body;
    var clientTop = el.clientTop || body.clientTop || 0;
    var clientLeft = el.clientLeft || body.clientLeft || 0;
    var scrollTop = el === window ? window.scrollY : el.scrollTop;
    var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
    return {
      top: (box.top + scrollTop) - clientTop,
      left: (box.left + scrollLeft) - clientLeft,
    };
  }

  return null;
}
function styles() {
  if (this[0]) { return window.getComputedStyle(this[0], null); }
  return {};
}
function css(props, value) {
  var this$1 = this;

  var i;
  if (arguments.length === 1) {
    if (typeof props === 'string') {
      if (this[0]) { return window.getComputedStyle(this[0], null).getPropertyValue(props); }
    } else {
      for (i = 0; i < this.length; i += 1) {
        // eslint-disable-next-line
        for (var prop in props) {
          this$1[i].style[prop] = props[prop];
        }
      }
      return this;
    }
  }
  if (arguments.length === 2 && typeof props === 'string') {
    for (i = 0; i < this.length; i += 1) {
      this$1[i].style[props] = value;
    }
    return this;
  }
  return this;
}

// Iterate over the collection passing elements to `callback`
function each(callback) {
  var this$1 = this;

  // Don't bother continuing without a callback
  if (!callback) { return this; }
  // Iterate over the current collection
  for (var i = 0; i < this.length; i += 1) {
    // If the callback returns false
    if (callback.call(this$1[i], i, this$1[i]) === false) {
      // End the loop early
      return this$1;
    }
  }
  // Return `this` to allow chained DOM operations
  return this;
}
// eslint-disable-next-line
function html(html) {
  var this$1 = this;

  if (typeof html === 'undefined') {
    return this[0] ? this[0].innerHTML : undefined;
  }

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].innerHTML = html;
  }
  return this;
}
// eslint-disable-next-line
function text(text) {
  var this$1 = this;

  if (typeof text === 'undefined') {
    if (this[0]) {
      return this[0].textContent.trim();
    }
    return null;
  }

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].textContent = text;
  }
  return this;
}
function is(selector) {
  var el = this[0];
  var compareWith;
  var i;
  if (!el || typeof selector === 'undefined') { return false; }
  if (typeof selector === 'string') {
    if (el.matches) { return el.matches(selector); }
    else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
    else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

    compareWith = $$1(selector);
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) { return true; }
    }
    return false;
  } else if (selector === document) { return el === document; }
  else if (selector === window) { return el === window; }

  if (selector.nodeType || selector instanceof Dom7) {
    compareWith = selector.nodeType ? [selector] : selector;
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) { return true; }
    }
    return false;
  }
  return false;
}
function index() {
  var child = this[0];
  var i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) { i += 1; }
    }
    return i;
  }
  return undefined;
}
// eslint-disable-next-line
function eq(index) {
  if (typeof index === 'undefined') { return this; }
  var length = this.length;
  var returnIndex;
  if (index > length - 1) {
    return new Dom7([]);
  }
  if (index < 0) {
    returnIndex = length + index;
    if (returnIndex < 0) { return new Dom7([]); }
    return new Dom7([this[returnIndex]]);
  }
  return new Dom7([this[index]]);
}
function append() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var newChild;

  for (var k = 0; k < args.length; k += 1) {
    newChild = args[k];
    for (var i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;
        while (tempDiv.firstChild) {
          this$1[i].appendChild(tempDiv.firstChild);
        }
      } else if (newChild instanceof Dom7) {
        for (var j = 0; j < newChild.length; j += 1) {
          this$1[i].appendChild(newChild[j]);
        }
      } else {
        this$1[i].appendChild(newChild);
      }
    }
  }

  return this;
}
 function prepend(newChild) {
  var this$1 = this;

  var i;
  var j;
  for (i = 0; i < this.length; i += 1) {
    if (typeof newChild === 'string') {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = newChild;
      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
        this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
      }
    } else if (newChild instanceof Dom7) {
      for (j = 0; j < newChild.length; j += 1) {
        this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
      }
    } else {
      this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
    }
  }
  return this;
}
 function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $$1(this[0].nextElementSibling).is(selector)) {
        return new Dom7([this[0].nextElementSibling]);
      }
      return new Dom7([]);
    }

    if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
    return new Dom7([]);
  }
  return new Dom7([]);
}
function nextAll(selector) {
  var nextEls = [];
  var el = this[0];
  if (!el) { return new Dom7([]); }
  while (el.nextElementSibling) {
    var next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if ($$1(next).is(selector)) { nextEls.push(next); }
    } else { nextEls.push(next); }
    el = next;
  }
  return new Dom7(nextEls);
}
function prev(selector) {
  if (this.length > 0) {
    var el = this[0];
    if (selector) {
      if (el.previousElementSibling && $$1(el.previousElementSibling).is(selector)) {
        return new Dom7([el.previousElementSibling]);
      }
      return new Dom7([]);
    }

    if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
    return new Dom7([]);
  }
  return new Dom7([]);
}
function prevAll(selector) {
  var prevEls = [];
  var el = this[0];
  if (!el) { return new Dom7([]); }
  while (el.previousElementSibling) {
    var prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if ($$1(prev).is(selector)) { prevEls.push(prev); }
    } else { prevEls.push(prev); }
    el = prev;
  }
  return new Dom7(prevEls);
}
function parent(selector) {
  var this$1 = this;

  var parents = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i].parentNode !== null) {
      if (selector) {
        if ($$1(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
      } else {
        parents.push(this$1[i].parentNode);
      }
    }
  }
  return $$1(unique(parents));
}
function parents(selector) {
  var this$1 = this;

  var parents = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    var parent = this$1[i].parentNode; // eslint-disable-line
    while (parent) {
      if (selector) {
        if ($$1(parent).is(selector)) { parents.push(parent); }
      } else {
        parents.push(parent);
      }
      parent = parent.parentNode;
    }
  }
  return $$1(unique(parents));
}
function closest(selector) {
  var closest = this; // eslint-disable-line
  if (typeof selector === 'undefined') {
    return new Dom7([]);
  }
  if (!closest.is(selector)) {
    closest = closest.parents(selector).eq(0);
  }
  return closest;
}
function find(selector) {
  var this$1 = this;

  var foundElements = [];
  for (var i = 0; i < this.length; i += 1) {
    var found = this$1[i].querySelectorAll(selector);
    for (var j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }
  return new Dom7(foundElements);
}
function children(selector) {
  var this$1 = this;

  var children = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    var childNodes = this$1[i].childNodes;

    for (var j = 0; j < childNodes.length; j += 1) {
      if (!selector) {
        if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
      } else if (childNodes[j].nodeType === 1 && $$1(childNodes[j]).is(selector)) {
        children.push(childNodes[j]);
      }
    }
  }
  return new Dom7(unique(children));
}
function remove() {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
  }
  return this;
}
function add() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var dom = this;
  var i;
  var j;
  for (i = 0; i < args.length; i += 1) {
    var toAdd = $$1(args[i]);
    for (j = 0; j < toAdd.length; j += 1) {
      dom[dom.length] = toAdd[j];
      dom.length += 1;
    }
  }
  return dom;
}
var noTrigger = ('resize scroll').split(' ');

var Methods = {
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  toggleClass: toggleClass,
  attr: attr,
  removeAttr: removeAttr,
  data: data,
  transform: transform,
  transition: transition,
  on: on,
  off: off,
  trigger: trigger,
  transitionEnd: transitionEnd,
  outerWidth: outerWidth,
  outerHeight: outerHeight,
  offset: offset,
  css: css,
  each: each,
  html: html,
  text: text,
  is: is,
  index: index,
  eq: eq,
  append: append,
  prepend: prepend,
  next: next,
  nextAll: nextAll,
  prev: prev,
  prevAll: prevAll,
  parent: parent,
  parents: parents,
  closest: closest,
  find: find,
  children: children,
  remove: remove,
  add: add,
  styles: styles,
};

Object.keys(Methods).forEach(function (methodName) {
  $$1.fn[methodName] = Methods[methodName];
});

var Utils = {
  deleteProps: function deleteProps(obj) {
    var object = obj;
    Object.keys(object).forEach(function (key) {
      try {
        object[key] = null;
      } catch (e) {
        // no getter for object
      }
      try {
        delete object[key];
      } catch (e) {
        // something got wrong
      }
    });
  },
  nextTick: function nextTick(callback, delay) {
    if ( delay === void 0 ) delay = 0;

    return setTimeout(callback, delay);
  },
  now: function now() {
    return Date.now();
  },
  getTranslate: function getTranslate(el, axis) {
    if ( axis === void 0 ) axis = 'x';

    var matrix;
    var curTransform;
    var transformMatrix;

    var curStyle = win.getComputedStyle(el, null);

    if (win.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[4]); }
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[5]); }
    }
    return curTransform || 0;
  },
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || win.location.href;
    var i;
    var params;
    var param;
    var length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  isObject: function isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  extend: function extend() {
    var args = [], len$1 = arguments.length;
    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

    var to = Object(args[0]);
    for (var i = 1; i < args.length; i += 1) {
      var nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              to[nextKey] = {};
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};

var d;
if (typeof document === 'undefined') {
  d = {
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return {};
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    createElement: function createElement() {
      return {
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  };
} else {
  d = document;
}

var doc = d;

var Support = (function Support() {
  return {
    touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
      return !!(('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
    }()),

    transforms3d: (win.Modernizr && win.Modernizr.csstransforms3d === true) || (function checkTransforms3d() {
      var div = doc.createElement('div').style;
      return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
    }()),

    flexbox: (function checkFlexbox() {
      var div = doc.createElement('div').style;
      var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
      for (var i = 0; i < styles.length; i += 1) {
        if (styles[i] in div) { return true; }
      }
      return false;
    }()),

    observer: (function checkObserver() {
      return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
    }()),

    passiveListener: (function checkPassiveListener() {
      var supportsPassive = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            supportsPassive = true;
          },
        });
        win.addEventListener('testPassiveListener', null, opts);
      } catch (e) {
        // No support
      }
      return supportsPassive;
    }()),

    gestures: (function checkGestures() {
      return 'ongesturestart' in win;
    }()),
  };
}());

var SwiperClass = function SwiperClass(params) {
  if ( params === void 0 ) params = {};

  var self = this;
  self.params = params;

  // Events
  self.eventsListeners = {};

  if (self.params && self.params.on) {
    Object.keys(self.params.on).forEach(function (eventName) {
      self.on(eventName, self.params.on[eventName]);
    });
  }
};

var staticAccessors = { components: {} };
SwiperClass.prototype.on = function on (events, handler) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  events.split(' ').forEach(function (event) {
    if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
    self.eventsListeners[event].push(handler);
  });
  return self;
};
SwiperClass.prototype.once = function once (events, handler) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  function onceHandler() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    handler.apply(self, args);
    self.off(events, onceHandler);
  }
  return self.on(events, onceHandler);
};
SwiperClass.prototype.off = function off (events, handler) {
  var self = this;
  events.split(' ').forEach(function (event) {
    if (typeof handler === 'undefined') {
      self.eventsListeners[event] = [];
    } else {
      self.eventsListeners[event].forEach(function (eventHandler, index) {
        if (eventHandler === handler) {
          self.eventsListeners[event].splice(index, 1);
        }
      });
    }
  });
  return self;
};
SwiperClass.prototype.emit = function emit () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  var self = this;
  if (!self.eventsListeners) { return self; }
  var events;
  var data;
  var context;
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    events = args[0];
    data = args.slice(1, args.length);
    context = self;
  } else {
    events = args[0].events;
    data = args[0].data;
    context = args[0].context || self;
  }
  var eventsArray = Array.isArray(events) ? events : events.split(' ');
  eventsArray.forEach(function (event) {
    if (self.eventsListeners[event]) {
      var handlers = [];
      self.eventsListeners[event].forEach(function (eventHandler) {
        handlers.push(eventHandler);
      });
      handlers.forEach(function (eventHandler) {
        eventHandler.apply(context, data);
      });
    }
  });
  return self;
};
SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    // Extend params
    if (module.params) {
      Utils.extend(instanceParams, module.params);
    }
  });
};
SwiperClass.prototype.useModules = function useModules (modulesParams) {
    if ( modulesParams === void 0 ) modulesParams = {};

  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    var moduleParams = modulesParams[moduleName] || {};
    // Extend instance methods and props
    if (module.instance) {
      Object.keys(module.instance).forEach(function (modulePropName) {
        var moduleProp = module.instance[modulePropName];
        if (typeof moduleProp === 'function') {
          instance[modulePropName] = moduleProp.bind(instance);
        } else {
          instance[modulePropName] = moduleProp;
        }
      });
    }
    // Add event listeners
    if (module.on && instance.on) {
      Object.keys(module.on).forEach(function (moduleEventName) {
        instance.on(moduleEventName, module.on[moduleEventName]);
      });
    }

    // Module create callback
    if (module.create) {
      module.create.bind(instance)(moduleParams);
    }
  });
};
staticAccessors.components.set = function (components) {
  var Class = this;
  if (!Class.use) { return; }
  Class.use(components);
};
SwiperClass.installModule = function installModule (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (!Class.prototype.modules) { Class.prototype.modules = {}; }
  var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
  Class.prototype.modules[name] = module;
  // Prototype
  if (module.proto) {
    Object.keys(module.proto).forEach(function (key) {
      Class.prototype[key] = module.proto[key];
    });
  }
  // Class
  if (module.static) {
    Object.keys(module.static).forEach(function (key) {
      Class[key] = module.static[key];
    });
  }
  // Callback
  if (module.install) {
    module.install.apply(Class, params);
  }
  return Class;
};
SwiperClass.use = function use (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (Array.isArray(module)) {
    module.forEach(function (m) { return Class.installModule(m); });
    return Class;
  }
  return Class.installModule.apply(Class, [ module ].concat( params ));
};

Object.defineProperties( SwiperClass, staticAccessors );

var updateSize = function () {
  var swiper = this;
  var width;
  var height;
  var $el = swiper.$el;
  if (typeof swiper.params.width !== 'undefined') {
    width = swiper.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined') {
    height = swiper.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
    return;
  }

  // Subtract paddings
  width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
  height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

  Utils.extend(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height,
  });
};

var updateSlides = function () {
  var swiper = this;
  var params = swiper.params;

  var $wrapperEl = swiper.$wrapperEl;
  var swiperSize = swiper.size;
  var rtl = swiper.rtl;
  var wrongRTL = swiper.wrongRTL;
  var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  var snapGrid = [];
  var slidesGrid = [];
  var slidesSizesGrid = [];

  var offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }

  var offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }

  var previousSlidesLength = slidesLength;
  var previousSnapGridLength = swiper.snapGrid.length;
  var previousSlidesGridLength = swiper.snapGrid.length;

  var spaceBetween = params.spaceBetween;
  var slidePosition = -offsetBefore;
  var prevSlideSize = 0;
  var index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
  }

  swiper.virtualSize = -spaceBetween;

  // reset margins
  if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
  else { slides.css({ marginRight: '', marginBottom: '' }); }

  var slidesNumberEvenToRows;
  if (params.slidesPerColumn > 1) {
    if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
    }
    if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
    }
  }

  // Calc slides
  var slideSize;
  var slidesPerColumn = params.slidesPerColumn;
  var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
  var numFullColumns = slidesPerRow - ((params.slidesPerColumn * slidesPerRow) - slidesLength);
  for (var i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    var slide = slides.eq(i);
    if (params.slidesPerColumn > 1) {
      // Set slides order
      var newSlideOrderIndex = (void 0);
      var column = (void 0);
      var row = (void 0);
      if (params.slidesPerColumnFill === 'column') {
        column = Math.floor(i / slidesPerColumn);
        row = i - (column * slidesPerColumn);
        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
          row += 1;
          if (row >= slidesPerColumn) {
            row = 0;
            column += 1;
          }
        }
        newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
        slide
          .css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex,
          });
      } else {
        row = Math.floor(i / slidesPerRow);
        column = i - (row * slidesPerRow);
      }
      slide
        .css(
          ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
          (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
        )
        .attr('data-swiper-column', column)
        .attr('data-swiper-row', row);
    }
    if (slide.css('display') === 'none') { continue; } // eslint-disable-line
    if (params.slidesPerView === 'auto') {
      slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
      if (params.roundLengths) { slideSize = Math.floor(slideSize); }
    } else {
      slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
      if (params.roundLengths) { slideSize = Math.floor(slideSize); }

      if (slides[i]) {
        if (swiper.isHorizontal()) {
          slides[i].style.width = slideSize + "px";
        } else {
          slides[i].style.height = slideSize + "px";
        }
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);


    if (params.centeredSlides) {
      slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
      if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
      if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
      if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
      slidesGrid.push(slidePosition);
    } else {
      if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }

    swiper.virtualSize += slideSize + spaceBetween;

    prevSlideSize = slideSize;

    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  var newSlidesGrid;

  if (
    rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
  }
  if (!Support.flexbox || params.setWrapperSize) {
    if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
  }

  if (params.slidesPerColumn > 1) {
    swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
    if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    if (params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
        if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(snapGrid[i$1]); }
      }
      snapGrid = newSlidesGrid;
    }
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    newSlidesGrid = [];
    for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
      if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(snapGrid[i$2]);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (snapGrid.length === 0) { snapGrid = [0]; }

  if (params.spaceBetween !== 0) {
    if (swiper.isHorizontal()) {
      if (rtl) { slides.css({ marginLeft: (spaceBetween + "px") }); }
      else { slides.css({ marginRight: (spaceBetween + "px") }); }
    } else { slides.css({ marginBottom: (spaceBetween + "px") }); }
  }

  Utils.extend(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid,
  });

  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateSlidesOffset();
  }
};

var updateAutoHeight = function () {
  var swiper = this;
  var activeSlides = [];
  var newHeight = 0;
  var i;

  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
      var index = swiper.activeIndex + i;
      if (index > swiper.slides.length) { break; }
      activeSlides.push(swiper.slides.eq(index)[0]);
    }
  } else {
    activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      var height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
};

var updateSlidesOffset = function () {
  var swiper = this;
  var slides = swiper.slides;
  for (var i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
  }
};

var updateSlidesProgress = function (translate) {
  if ( translate === void 0 ) translate = this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var slides = swiper.slides;
  var rtl = swiper.rtl;

  if (slides.length === 0) { return; }
  if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

  var offsetCenter = -translate;
  if (rtl) { offsetCenter = translate; }

  // Visible Slides
  slides.removeClass(params.slideVisibleClass);

  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideProgress =
      (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
    if (params.watchSlidesVisibility) {
      var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
      var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      var isVisible =
                (slideBefore >= 0 && slideBefore < swiper.size) ||
                (slideAfter > 0 && slideAfter <= swiper.size) ||
                (slideBefore <= 0 && slideAfter >= swiper.size);
      if (isVisible) {
        slides.eq(i).addClass(params.slideVisibleClass);
      }
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
  }
};

var updateProgress = function (translate) {
  if ( translate === void 0 ) translate = this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress;
  var isBeginning = swiper.isBeginning;
  var isEnd = swiper.isEnd;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / (translatesDiff);
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Utils.extend(swiper, {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd,
  });

  if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
    swiper.emit('fromEdge');
  }

  swiper.emit('progress', progress);
};

var updateSlidesClasses = function () {
  var swiper = this;

  var slides = swiper.slides;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;
  var realIndex = swiper.realIndex;
  var isVirtual = swiper.virtual && params.virtual.enabled;

  slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

  var activeSlide;
  if (isVirtual) {
    activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
  } else {
    activeSlide = slides.eq(activeIndex);
  }

  // Active classes
  activeSlide.addClass(params.slideActiveClass);

  if (params.loop) {
    // Duplicate to all looped slides
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
        .addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
        .addClass(params.slideDuplicateActiveClass);
    }
  }
  // Next Slide
  var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  }
  // Prev Slide
  var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }
  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicatePrevClass);
    }
  }
};

var updateActiveIndex = function (newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtl ? swiper.translate : -swiper.translate;
  var slidesGrid = swiper.slidesGrid;
  var snapGrid = swiper.snapGrid;
  var params = swiper.params;
  var previousIndex = swiper.activeIndex;
  var previousRealIndex = swiper.realIndex;
  var previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;
  if (typeof activeIndex === 'undefined') {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
    }
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  }

  // Get real index
  var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

  Utils.extend(swiper, {
    snapIndex: snapIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex,
  });
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }
  swiper.emit('slideChange');
};

var updateClickedSlide = function (e) {
  var swiper = this;
  var params = swiper.params;
  var slide = $$1(e.target).closest(("." + (params.slideClass)))[0];
  var slideFound = false;
  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) { slideFound = true; }
    }
  }

  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt($$1(slide).attr('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = $$1(slide).index();
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
};

var update = {
  updateSize: updateSize,
  updateSlides: updateSlides,
  updateAutoHeight: updateAutoHeight,
  updateSlidesOffset: updateSlidesOffset,
  updateSlidesProgress: updateSlidesProgress,
  updateProgress: updateProgress,
  updateSlidesClasses: updateSlidesClasses,
  updateActiveIndex: updateActiveIndex,
  updateClickedSlide: updateClickedSlide,
};

var getTranslate = function (axis) {
  if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

  var swiper = this;

  var params = swiper.params;
  var rtl = swiper.rtl;
  var translate = swiper.translate;
  var $wrapperEl = swiper.$wrapperEl;

  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }

  var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
  if (rtl) { currentTranslate = -currentTranslate; }

  return currentTranslate || 0;
};

var setTranslate = function (translate, byController) {
  var swiper = this;
  var rtl = swiper.rtl;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var progress = swiper.progress;
  var x = 0;
  var y = 0;
  var z = 0;

  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }

  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }

  if (!params.virtualTranslate) {
    if (Support.transforms3d) { $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)")); }
    else { $wrapperEl.transform(("translate(" + x + "px, " + y + "px)")); }
  }

  swiper.translate = swiper.isHorizontal() ? x : y;

  // Check if we need to update progress
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }

  swiper.emit('setTranslate', swiper.translate, byController);
};

var minTranslate = function () {
  return (-this.snapGrid[0]);
};

var maxTranslate = function () {
  return (-this.snapGrid[this.snapGrid.length - 1]);
};

var translate = {
  getTranslate: getTranslate,
  setTranslate: setTranslate,
  minTranslate: minTranslate,
  maxTranslate: maxTranslate,
};

var setTransition = function (duration, byController) {
  var swiper = this;

  swiper.$wrapperEl.transition(duration);

  swiper.emit('setTransition', duration, byController);
};

var transitionStart = function (runCallbacks) {
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var params = swiper.params;
  var previousIndex = swiper.previousIndex;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  swiper.emit('transitionStart');

  if (!runCallbacks) { return; }
  if (activeIndex !== previousIndex) {
    swiper.emit('slideChangeTransitionStart');
    if (activeIndex > previousIndex) {
      swiper.emit('slideNextTransitionStart');
    } else {
      swiper.emit('slidePrevTransitionStart');
    }
  }
};

var transitionEnd$1 = function (runCallbacks) {
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var previousIndex = swiper.previousIndex;
  swiper.animating = false;
  swiper.setTransition(0);

  swiper.emit('transitionEnd');
  if (runCallbacks) {
    if (activeIndex !== previousIndex) {
      swiper.emit('slideChangeTransitionEnd');
      if (activeIndex > previousIndex) {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }
};

var transition$1 = {
  setTransition: setTransition,
  transitionStart: transitionStart,
  transitionEnd: transitionEnd$1,
};

var Browser = (function Browser() {
  function isIE9() {
    // create temporary DIV
    var div = doc.createElement('div');
    // add content to tmp DIV which is wrapped into the IE HTML conditional statement
    div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
    // return true / false value based on what will browser render
    return div.getElementsByTagName('i').length === 1;
  }
  function isSafari() {
    var ua = win.navigator.userAgent.toLowerCase();
    return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
  }
  return {
    isSafari: isSafari(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
    ie: win.navigator.pointerEnabled || win.navigator.msPointerEnabled,
    ieTouch: (win.navigator.msPointerEnabled && win.navigator.msMaxTouchPoints > 1) ||
             (win.navigator.pointerEnabled && win.navigator.maxTouchPoints > 1),
    lteIE9: isIE9(),
  };
}());

var slideTo = function (index, speed, runCallbacks, internal) {
  if ( index === void 0 ) index = 0;
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var slideIndex = index;
  if (slideIndex < 0) { slideIndex = 0; }

  var params = swiper.params;
  var snapGrid = swiper.snapGrid;
  var slidesGrid = swiper.slidesGrid;
  var previousIndex = swiper.previousIndex;
  var activeIndex = swiper.activeIndex;
  var rtl = swiper.rtl;
  var $wrapperEl = swiper.$wrapperEl;

  var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

  if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  var translate = -snapGrid[snapIndex];

  // Update progress
  swiper.updateProgress(translate);

  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
        slideIndex = i;
      }
    }
  }

  // Directions locks
  if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
    return false;
  }
  if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
    if ((activeIndex || 0) !== slideIndex) { return false; }
  }

  // Update Index
  if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    return false;
  }

  if (speed === 0 || Browser.lteIE9) {
    swiper.setTransition(0);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks);
    swiper.transitionEnd(runCallbacks);
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks);
    if (!swiper.animating) {
      swiper.animating = true;
      $wrapperEl.transitionEnd(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.transitionEnd(runCallbacks);
      });
    }
  }

  return true;
};

/* eslint no-unused-vars: "off" */
var slideNext = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var params = swiper.params;
  var animating = swiper.animating;
  if (params.loop) {
    if (animating) { return false; }
    swiper.loopFix();
    // eslint-disable-next-line
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
};

/* eslint no-unused-vars: "off" */
var slidePrev = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var params = swiper.params;
  var animating = swiper.animating;

  if (params.loop) {
    if (animating) { return false; }
    swiper.loopFix();
    // eslint-disable-next-line
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(swiper.activeIndex - 1, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex - 1, speed, runCallbacks, internal);
};

/* eslint no-unused-vars: "off" */
var slideReset = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
};

var slideToClickedSlide = function () {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;

  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;
  if (params.loop) {
    if (swiper.animating) { return; }
    realIndex = parseInt($$1(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        (slideToIndex < swiper.loopedSlides - (slidesPerView / 2)) ||
        (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
      ) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl
        .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
        .eq(0)
        .index();

      Utils.nextTick(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
};

var slide = {
  slideTo: slideTo,
  slideNext: slideNext,
  slidePrev: slidePrev,
  slideReset: slideReset,
  slideToClickedSlide: slideToClickedSlide,
};

var loopCreate = function () {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  // Remove duplicated slides
  $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

  var slides = $wrapperEl.children(("." + (params.slideClass)));

  if (params.loopFillGroupWithBlank) {
    var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
    if (blankSlidesNum !== params.slidesPerGroup) {
      for (var i = 0; i < blankSlidesNum; i += 1) {
        var blankNode = $$1(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
        $wrapperEl.append(blankNode);
      }
      slides = $wrapperEl.children(("." + (params.slideClass)));
    }
  }

  if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

  swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
  swiper.loopedSlides += params.loopAdditionalSlides;
  if (swiper.loopedSlides > slides.length) {
    swiper.loopedSlides = slides.length;
  }

  var prependSlides = [];
  var appendSlides = [];
  slides.each(function (index, el) {
    var slide = $$1(el);
    if (index < swiper.loopedSlides) { appendSlides.push(el); }
    if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
    slide.attr('data-swiper-slide-index', index);
  });
  for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
    $wrapperEl.append($$1(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
  for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
    $wrapperEl.prepend($$1(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
};

var loopFix = function () {
  var swiper = this;
  var params = swiper.params;
  var activeIndex = swiper.activeIndex;
  var slides = swiper.slides;
  var loopedSlides = swiper.loopedSlides;
  var allowSlidePrev = swiper.allowSlidePrev;
  var allowSlideNext = swiper.allowSlideNext;
  var newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  // Fix For Negative Oversliding
  if (activeIndex < loopedSlides) {
    newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
    newIndex += loopedSlides;
    swiper.slideTo(newIndex, 0, false, true);
  } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex > slides.length - (params.slidesPerView * 2))) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    swiper.slideTo(newIndex, 0, false, true);
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
};

var loopDestroy = function () {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl;
  var params = swiper.params;
  var slides = swiper.slides;
  $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();
  slides.removeAttr('data-swiper-slide-index');
};

var loop = {
  loopCreate: loopCreate,
  loopFix: loopFix,
  loopDestroy: loopDestroy,
};

var setGrabCursor = function (moving) {
  var swiper = this;
  if (Support.touch || !swiper.params.simulateTouch) { return; }
  var el = swiper.el;
  el.style.cursor = 'move';
  el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
  el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
  el.style.cursor = moving ? 'grabbing' : 'grab';
};

var unsetGrabCursor = function () {
  var swiper = this;
  if (Support.touch) { return; }
  swiper.el.style.cursor = '';
};

var grabCursor = {
  setGrabCursor: setGrabCursor,
  unsetGrabCursor: unsetGrabCursor,
};

var appendSlide = function (slides) {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl;
  var params = swiper.params;
  if (params.loop) {
    swiper.loopDestroy();
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) { $wrapperEl.append(slides[i]); }
    }
  } else {
    $wrapperEl.append(slides);
  }
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
};

var prependSlide = function (slides) {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
  }
  var newActiveIndex = activeIndex + 1;
  if (typeof slides === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) { $wrapperEl.prepend(slides[i]); }
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    $wrapperEl.prepend(slides);
  }
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
};

var removeSlide = function (slidesIndexes) {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
    swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
  }
  var newActiveIndex = activeIndex;
  var indexToRemove;

  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (var i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
    if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!(params.observer && Support.observer)) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
};

var removeAllSlides = function () {
  var swiper = this;

  var slidesIndexes = [];
  for (var i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
};

var manipulation = {
  appendSlide: appendSlide,
  prependSlide: prependSlide,
  removeSlide: removeSlide,
  removeAllSlides: removeAllSlides,
};

var Device = (function Device() {
  var ua = win.navigator.userAgent;

  var device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windows: false,
    iphone: false,
    ipod: false,
    ipad: false,
    cordova: win.cordova || win.phonegap,
    phonegap: win.cordova || win.phonegap,
  };

  var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


  // Windows
  if (windows) {
    device.os = 'windows';
    device.osVersion = windows[2];
    device.windows = true;
  }
  // Android
  if (android && !windows) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }

  // Desktop
  device.desktop = !(device.os || device.android || device.webView);

  // Webview
  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

  // Minimal UI
  if (device.os && device.os === 'ios') {
    var osVersionArr = device.osVersion.split('.');
    var metaViewport = doc.querySelector('meta[name="viewport"]');
    device.minimalUi =
      !device.webView &&
      (ipod || iphone) &&
      (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
      metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
  }

  // Pixel Ratio
  device.pixelRatio = win.devicePixelRatio || 1;

  // Export object
  return device;
}());

var onTouchStart = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params;
  var touches = swiper.touches;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  data.isTouchEvent = e.type === 'touchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
  if (data.isTouched && data.isMoved) { return; }
  if (params.noSwiping && $$1(e.target).closest(("." + (params.noSwipingClass)))[0]) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!$$1(e).closest(params.swipeHandler)[0]) { return; }
  }

  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

  if (
    Device.ios &&
    !Device.cordova &&
    params.iOSEdgeSwipeDetection &&
    (startX <= params.iOSEdgeSwipeThreshold) &&
    (startX >= window.screen.width - params.iOSEdgeSwipeThreshold)
  ) {
    return;
  }

  Utils.extend(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined,
  });

  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = Utils.now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) { data.allowThresholdMove = false; }
  if (e.type !== 'touchstart') {
    var preventDefault = true;
    if ($$1(e.target).is(data.formElements)) { preventDefault = false; }
    if (doc.activeElement && $$1(doc.activeElement).is(data.formElements)) {
      doc.activeElement.blur();
    }
    if (preventDefault && swiper.allowTouchMove) {
      e.preventDefault();
    }
  }
  swiper.emit('touchStart', e);
};

var onTouchMove = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params;
  var touches = swiper.touches;
  var rtl = swiper.rtl;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  if (data.isTouchEvent && e.type === 'mousemove') { return; }
  var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
  var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    // isMoved = true;
    swiper.allowClick = false;
    if (data.isTouched) {
      Utils.extend(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
      });
      data.touchStartTime = Utils.now();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (
        (touches.currentY < touches.startY && swiper.translate <= swiper.maxTranslate()) ||
        (touches.currentY > touches.startY && swiper.translate >= swiper.minTranslate())
      ) {
        return;
      }
    } else if (
      (touches.currentX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
      (touches.currentX > touches.startX && swiper.translate >= swiper.minTranslate())
    ) {
      return;
    }
  }
  if (data.isTouchEvent && doc.activeElement) {
    if (e.target === doc.activeElement && $$1(e.target).is(data.formElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  if (e.targetTouches && e.targetTouches.length > 1) { return; }

  touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;

  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;
    if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if ((diffX * diffX) + (diffY * diffY) >= 25) {
        touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (!data.isTouched) { return; }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  e.preventDefault();
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }

  if (!data.isMoved) {
    if (params.loop) {
      swiper.loopFix();
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;

  var diff = swiper.isHorizontal() ? diffX : diffY;
  touches.diff = diff;

  diff *= params.touchRatio;
  if (rtl) { diff = -diff; }

  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;

  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
    disableParentSwiper = false;
    if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
  }

  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }


  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }

  if (!params.followFinger) { return; }

  // Update active index in free mode
  if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode) {
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime,
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: Utils.now(),
    });
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
};

var onTouchEnd = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;

  var params = swiper.params;
  var touches = swiper.touches;
  var rtl = swiper.rtl;
  var $wrapperEl = swiper.$wrapperEl;
  var slidesGrid = swiper.slidesGrid;
  var snapGrid = swiper.snapGrid;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) { return; }
  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  var touchEndTime = Utils.now();
  var timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    swiper.updateClickedSlide(e);
    swiper.emit('tap', e);
    if (timeDiff < 300 && (touchEndTime - data.lastClickTime) > 300) {
      if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
      data.clickTimeout = Utils.nextTick(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.emit('click', e);
      }, 300);
    }
    if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
      if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
      swiper.emit('doubleTap', e);
    }
  }

  data.lastClickTime = Utils.now();
  Utils.nextTick(function () {
    if (!swiper.destroyed) { swiper.allowClick = true; }
  });

  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;

  var currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.freeMode) {
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    } else if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }

    if (params.freeModeMomentum) {
      if (data.velocities.length > 1) {
        var lastMoveEvent = data.velocities.pop();
        var velocityEvent = data.velocities.pop();

        var distance = lastMoveEvent.position - velocityEvent.position;
        var time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeModeMomentumVelocityRatio;

      data.velocities.length = 0;
      var momentumDuration = 1000 * params.freeModeMomentumRatio;
      var momentumDistance = swiper.velocity * momentumDuration;

      var newPosition = swiper.translate + momentumDistance;
      if (rtl) { newPosition = -newPosition; }
      var doBounce = false;
      var afterBouncePosition;
      var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeModeMomentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeModeMomentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
      } else if (params.freeModeSticky) {
        var nextSlide;
        for (var j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
      } else if (params.freeModeSticky) {
        swiper.slideReset();
        return;
      }

      if (params.freeModeMomentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart();
        swiper.animating = true;
        $wrapperEl.transitionEnd(function () {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
          swiper.emit('momentumBounce');

          swiper.setTransition(params.speed);
          swiper.setTranslate(afterBouncePosition);
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) { return; }
            swiper.transitionEnd();
          });
        });
      } else if (swiper.velocity) {
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart();
        if (!swiper.animating) {
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) { return; }
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }

      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    return;
  }

  // Find current slide
  var stopIndex = 0;
  var groupSize = swiper.slidesSizesGrid[0];
  for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
    if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
        stopIndex = i;
        groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }

  // Find current slide size
  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
      else { swiper.slideTo(stopIndex); }
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
      else { swiper.slideTo(stopIndex); }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      swiper.slideTo(stopIndex + params.slidesPerGroup);
    }
    if (swiper.swipeDirection === 'prev') {
      swiper.slideTo(stopIndex);
    }
  }
};

var onResize = function () {
  var swiper = this;

  var params = swiper.params;
  var el = swiper.el;
  var allowSlideNext = swiper.allowSlideNext;
  var allowSlidePrev = swiper.allowSlidePrev;

  if (el && el.offsetWidth === 0) { return; }

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;

  swiper.updateSize();
  swiper.updateSlides();

  if (params.freeMode) {
    var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
    swiper.setTranslate(newTranslate);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
  } else {
    swiper.updateSlidesClasses();
    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
};

var onClick = function (e) {
  var swiper = this;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) { e.preventDefault(); }
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
};

function attachEvents() {
  var swiper = this;

  var params = swiper.params;
  var touchEvents = swiper.touchEvents;
  var el = swiper.el;
  var wrapperEl = swiper.wrapperEl;

  {
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
  }

  swiper.onClick = onClick.bind(swiper);

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  {
    if (Browser.ie) {
      target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      (Support.touch ? target : doc).addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      (Support.touch ? target : doc).addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
        target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.addEventListener('mousedown', swiper.onTouchStart, false);
        doc.addEventListener('mousemove', swiper.onTouchMove, capture);
        doc.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.addEventListener('click', swiper.onClick, true);
    }
  }

  // Resize handler
  swiper.on('resize observerUpdate', onResize);
}

function detachEvents() {
  var swiper = this;

  var params = swiper.params;
  var touchEvents = swiper.touchEvents;
  var el = swiper.el;
  var wrapperEl = swiper.wrapperEl;

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  {
    if (Browser.ie) {
      target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      (Support.touch ? target : doc).removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      (Support.touch ? target : doc).removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        target.removeEventListener('mousedown', swiper.onTouchStart, false);
        doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
        doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.removeEventListener('click', swiper.onClick, true);
    }
  }

  // Resize handler
  swiper.off('resize observerUpdate', onResize);
}

var events = {
  attachEvents: attachEvents,
  detachEvents: detachEvents,
};

var setBreakpoint = function () {
  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
  var params = swiper.params;
  var breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }
  // Set breakpoint for window width and update parameters
  var breakpoint = swiper.getBreakpoint(breakpoints);
  if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
    var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
    var needsReLoop = params.loop && (breakPointsParams.slidesPerView !== params.slidesPerView);

    Utils.extend(swiper.params, breakPointsParams);

    Utils.extend(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
    });

    swiper.currentBreakpoint = breakpoint;

    if (needsReLoop) {
      var oldIndex = activeIndex - loopedSlides;
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo(oldIndex + loopedSlides, 0, false);
    }
    swiper.emit('breakpoint', breakPointsParams);
  }
};

var getBreakpoint = function (breakpoints) {
  // Get breakpoint for window width
  if (!breakpoints) { return undefined; }
  var breakpoint = false;
  var points = [];
  Object.keys(breakpoints).forEach(function (point) {
    points.push(point);
  });
  points.sort(function (a, b) { return parseInt(a, 10) > parseInt(b, 10); });
  for (var i = 0; i < points.length; i += 1) {
    var point = points[i];
    if (point >= win.innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
};

var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

var addClasses = function () {
  var swiper = this;
  var classNames = swiper.classNames;
  var params = swiper.params;
  var rtl = swiper.rtl;
  var $el = swiper.$el;
  var suffixes = [];

  suffixes.push(params.direction);

  if (params.freeMode) {
    suffixes.push('free-mode');
  }
  if (!Support.flexbox) {
    suffixes.push('no-flexbox');
  }
  if (params.autoHeight) {
    suffixes.push('autoheight');
  }
  if (rtl) {
    suffixes.push('rtl');
  }
  if (params.slidesPerColumn > 1) {
    suffixes.push('multirow');
  }
  if (Device.android) {
    suffixes.push('android');
  }
  if (Device.ios) {
    suffixes.push('ios');
  }
  // WP8 Touch Events Fix
  if (win.navigator.pointerEnabled || win.navigator.msPointerEnabled) {
    suffixes.push(("wp8-" + (params.direction)));
  }

  suffixes.forEach(function (suffix) {
    classNames.push(params.containerModifierClass + suffix);
  });

  $el.addClass(classNames.join(' '));
};

var removeClasses = function () {
  var swiper = this;
  var $el = swiper.$el;
  var classNames = swiper.classNames;

  $el.removeClass(classNames.join(' '));
};

var classes = { addClasses: addClasses, removeClasses: removeClasses };

var loadImage = function (imageEl, src, srcset, sizes, checkForComplete, callback) {
  var image;
  function onReady() {
    if (callback) { callback(); }
  }
  if (!imageEl.complete || !checkForComplete) {
    if (src) {
      image = new win.Image();
      image.onload = onReady;
      image.onerror = onReady;
      if (sizes) {
        image.sizes = sizes;
      }
      if (srcset) {
        image.srcset = srcset;
      }
      if (src) {
        image.src = src;
      }
    } else {
      onReady();
    }
  } else {
    // image already loaded...
    onReady();
  }
};

var preloadImages = function () {
  var swiper = this;
  swiper.imagesToLoad = swiper.$el.find('img');
  function onReady() {
    if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
    if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
      if (swiper.params.updateOnImagesReady) { swiper.update(); }
      swiper.emit('imagesReady');
    }
  }
  for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
    var imageEl = swiper.imagesToLoad[i];
    swiper.loadImage(
      imageEl,
      imageEl.currentSrc || imageEl.getAttribute('src'),
      imageEl.srcset || imageEl.getAttribute('srcset'),
      imageEl.sizes || imageEl.getAttribute('sizes'),
      true,
      onReady
    );
  }
};

var images = {
  loadImage: loadImage,
  preloadImages: preloadImages,
};

var defaults = {
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'container',
  initialSlide: 0,
  speed: 300,

  // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
  iOSEdgeSwipeDetection: false,
  iOSEdgeSwipeThreshold: 20,

  // Free mode
  freeMode: false,
  freeModeMomentum: true,
  freeModeMomentumRatio: 1,
  freeModeMomentumBounce: true,
  freeModeMomentumBounceRatio: 1,
  freeModeMomentumVelocityRatio: 1,
  freeModeSticky: false,
  freeModeMinimumVelocity: 0.02,

  // Autoheight
  autoHeight: false,

  // Set wrapper width
  setWrapperSize: false,

  // Virtual Translate
  virtualTranslate: false,

  // Effects
  effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,

  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerColumnFill: 'column',
  slidesPerGroup: 1,
  centeredSlides: false,
  slidesOffsetBefore: 0, // in px
  slidesOffsetAfter: 0, // in px
  normalizeSlideIndex: true,

  // Round length
  roundLengths: false,

  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: true,
  touchReleaseOnEdges: false,

  // Unique Navigation Elements
  uniqueNavElements: true,

  // Resistance
  resistance: true,
  resistanceRatio: 0.85,

  // Progress
  watchSlidesProgress: false,
  watchSlidesVisibility: false,

  // Cursor
  grabCursor: false,

  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,

  // Images
  preloadImages: true,
  updateOnImagesReady: true,

  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: false,

  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null, // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',

  // Passive Listeners
  passiveListeners: true,

  // NS
  containerModifierClass: 'swiper-container-', // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-invisible-blank',
  slideActiveClass: 'swiper-slide-active',
  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideDuplicateClass: 'swiper-slide-duplicate',
  slideNextClass: 'swiper-slide-next',
  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
  slidePrevClass: 'swiper-slide-prev',
  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
  wrapperClass: 'swiper-wrapper',

  // Callbacks
  runCallbacksOnInit: true,
};

var prototypes = {
  update: update,
  translate: translate,
  transition: transition$1,
  slide: slide,
  loop: loop,
  grabCursor: grabCursor,
  manipulation: manipulation,
  events: events,
  breakpoints: breakpoints,
  classes: classes,
  images: images,
};

var extendedDefaults = {};

var Swiper$1 = (function (SwiperClass$$1) {
  function Swiper() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var el;
    var params;
    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      params = args[0];
    } else {
      var assign;
      (assign = args, el = assign[0], params = assign[1]);
    }
    if (!params) { params = {}; }

    params = Utils.extend({}, params);
    if (el && !params.el) { params.el = el; }

    SwiperClass$$1.call(this, params);

    Object.keys(prototypes).forEach(function (prototypeGroup) {
      Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
        if (!Swiper.prototype[protoMethod]) {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }
      });
    });

    // Swiper Instance
    var swiper = this;

    Object.keys(swiper.modules).forEach(function (moduleName) {
      var module = swiper.modules[moduleName];
      if (module.params) {
        var moduleParamName = Object.keys(module.params)[0];
        var moduleParams = module.params[moduleParamName];
        if (typeof moduleParams !== 'object') { return; }
        if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
        if (params[moduleParamName] === true) {
          params[moduleParamName] = { enabled: true };
        }
        if (
          typeof params[moduleParamName] === 'object' &&
          !('enabled' in params[moduleParamName])
        ) {
          params[moduleParamName].enabled = true;
        }
        if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
      }
    });

    // Extend defaults with modules params
    var swiperParams = Utils.extend({}, defaults);
    swiper.useModulesParams(swiperParams);

    // Extend defaults with passed params
    swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = Utils.extend({}, swiper.params);
    swiper.passedParams = Utils.extend({}, params);

    // Find el
    var $el = $$1(swiper.params.el);
    el = $el[0];

    if (!el) {
      return undefined;
    }

    if ($el.length > 1) {
      var swipers = [];
      $el.each(function (index, containerEl) {
        var newParams = Utils.extend({}, params, { el: containerEl });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }

    el.swiper = swiper;
    $el.data('swiper', swiper);

    // Find Wrapper
    var $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));

    // Extend Swiper
    Utils.extend(swiper, {
      $el: $el,
      el: el,
      $wrapperEl: $wrapperEl,
      wrapperEl: $wrapperEl[0],

      // Classes
      classNames: [],

      // Slides
      slides: $$1(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],

      // isDirection
      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // RTL
      rtl: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',

      // Indexes
      activeIndex: 0,
      realIndex: 0,

      //
      isBeginning: true,
      isEnd: false,

      // Props
      translate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,

      // Touch Events
      touchEvents: (function touchEvents() {
        var touch = ['touchstart', 'touchmove', 'touchend'];
        var desktop = ['mousedown', 'mousemove', 'mouseup'];
        if (win.navigator.pointerEnabled) {
          desktop = ['pointerdown', 'pointermove', 'pointerup'];
        } else if (win.navigator.msPointerEnabled) {
          desktop = ['MSPointerDown', 'MsPointerMove', 'MsPointerUp'];
        }

        return {
          start: Support.touch || !swiper.params.simulateTouch ? touch[0] : desktop[0],
          move: Support.touch || !swiper.params.simulateTouch ? touch[1] : desktop[1],
          end: Support.touch || !swiper.params.simulateTouch ? touch[2] : desktop[2],
        };
      }()),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        formElements: 'input, select, option, textarea, button, video',
        // Last click time
        lastClickTime: Utils.now(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined,
      },

      // Clicks
      allowClick: true,

      // Touches
      allowTouchMove: swiper.params.allowTouchMove,

      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0,
      },

      // Images
      imagesToLoad: [],
      imagesLoaded: 0,

    });

    // Install Modules
    swiper.useModules();

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    return swiper;
  }

  if ( SwiperClass$$1 ) Swiper.__proto__ = SwiperClass$$1;
  Swiper.prototype = Object.create( SwiperClass$$1 && SwiperClass$$1.prototype );
  Swiper.prototype.constructor = Swiper;

  var staticAccessors = { extendedDefaults: {},defaults: {},Class: {},$: {} };
  Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides;
    var slidesGrid = swiper.slidesGrid;
    var swiperSize = swiper.size;
    var activeIndex = swiper.activeIndex;
    var spv = 1;
    if (params.centeredSlides) {
      var slideSize = slides[activeIndex].swiperSlideSize;
      var breakLoop;
      for (var i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) { breakLoop = true; }
        }
      }
      for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
        if (slides[i$1] && !breakLoop) {
          slideSize += slides[i$1].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) { breakLoop = true; }
        }
      }
    } else {
      for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
        if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
          spv += 1;
        }
      }
    }
    return spv;
  };
  Swiper.prototype.update = function update$$1 () {
    var swiper = this;
    if (!swiper || swiper.destroyed) { return; }
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();

    var newTranslate;
    function setTranslate() {
      newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    var translated;
    if (swiper.params.freeMode) {
      setTranslate();
      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    swiper.emit('update');
  };
  Swiper.prototype.init = function init () {
    var swiper = this;
    if (swiper.initialized) { return; }

    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate();
    }

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();

    // Set Grab Cursor
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }

    if (swiper.params.preloadImages) {
      swiper.preloadImages();
    }

    // Slide To Initial Slide
    if (swiper.params.loop) {
      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
    }

    // Attach events
    swiper.attachEvents();

    // Init Flag
    swiper.initialized = true;

    // Emit
    swiper.emit('init');
  };
  Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
    if ( deleteInstance === void 0 ) deleteInstance = true;
    if ( cleanStyles === void 0 ) cleanStyles = true;

    var swiper = this;
    var params = swiper.params;
    var $el = swiper.$el;
    var $wrapperEl = swiper.$wrapperEl;
    var slides = swiper.slides;
    swiper.emit('beforeDestroy');

    // Init Flag
    swiper.initialized = false;

    // Detach events
    swiper.detachEvents();

    // Destroy loop
    if (params.loop) {
      swiper.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      swiper.removeClasses();
      $el.removeAttr('style');
      $wrapperEl.removeAttr('style');
      if (slides && slides.length) {
        slides
          .removeClass([
            params.slideVisibleClass,
            params.slideActiveClass,
            params.slideNextClass,
            params.slidePrevClass ].join(' '))
          .removeAttr('style')
          .removeAttr('data-swiper-slide-index')
          .removeAttr('data-swiper-column')
          .removeAttr('data-swiper-row');
      }
    }

    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach(function (eventName) {
      swiper.off(eventName);
    });

    if (deleteInstance !== false) {
      swiper.$el[0].swiper = null;
      swiper.$el.data('swiper', null);
      Utils.deleteProps(swiper);
    }
    swiper.destroyed = true;
  };
  Swiper.extendDefaults = function extendDefaults (newDefaults) {
    Utils.extend(extendedDefaults, newDefaults);
  };
  staticAccessors.extendedDefaults.get = function () {
    return extendedDefaults;
  };
  staticAccessors.defaults.get = function () {
    return defaults;
  };
  staticAccessors.Class.get = function () {
    return SwiperClass$$1;
  };
  staticAccessors.$.get = function () {
    return $$1;
  };

  Object.defineProperties( Swiper, staticAccessors );

  return Swiper;
}(SwiperClass));

var Device$2 = {
  name: 'device',
  proto: {
    device: Device,
  },
  static: {
    device: Device,
  },
};

var Support$2 = {
  name: 'support',
  proto: {
    support: Support,
  },
  static: {
    support: Support,
  },
};

var Browser$2 = {
  name: 'browser',
  proto: {
    browser: Browser,
  },
  static: {
    browser: Browser,
  },
};

var Resize = {
  name: 'resize',
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      resize: {
        resizeHandler: function resizeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
          swiper.emit('beforeResize');
          swiper.emit('resize');
        },
        orientationChangeHandler: function orientationChangeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
          swiper.emit('orientationchange');
        },
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      // Emit resize
      win.addEventListener('resize', swiper.resize.resizeHandler);

      // Emit orientationchange
      win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy: function destroy() {
      var swiper = this;
      win.removeEventListener('resize', swiper.resize.resizeHandler);
      win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
  },
};

var Observer = {
  func: win.MutationObserver || win.WebkitMutationObserver,
  attach: function attach(target, options) {
    if ( options === void 0 ) options = {};

    var swiper = this;

    var ObserverFunc = Observer.func;
    var observer = new ObserverFunc(function (mutations) {
      mutations.forEach(function (mutation) {
        swiper.emit('observerUpdate', mutation);
      });
    });

    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
    });

    swiper.observer.observers.push(observer);
  },
  init: function init() {
    var swiper = this;
    if (!Support.observer || !swiper.params.observer) { return; }
    if (swiper.params.observeParents) {
      var containerParents = swiper.$el.parents();
      for (var i = 0; i < containerParents.length; i += 1) {
        swiper.observer.attach(containerParents[i]);
      }
    }
    // Observe container
    swiper.observer.attach(swiper.$el[0], { childList: false });

    // Observe wrapper
    swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.observer.observers.forEach(function (observer) {
      observer.disconnect();
    });
    swiper.observer.observers = [];
  },
};

var Observer$1 = {
  name: 'observer',
  params: {
    observer: false,
    observeParents: false,
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      observer: {
        init: Observer.init.bind(swiper),
        attach: Observer.attach.bind(swiper),
        destroy: Observer.destroy.bind(swiper),
        observers: [],
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.observer.init();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.destroy();
    },
  },
};

var Virtual = {
  update: function update(force) {
    var swiper = this;
    var ref = swiper.params;
    var slidesPerView = ref.slidesPerView;
    var slidesPerGroup = ref.slidesPerGroup;
    var centeredSlides = ref.centeredSlides;
    var ref$1 = swiper.virtual;
    var previousFrom = ref$1.from;
    var previousTo = ref$1.to;
    var slides = ref$1.slides;
    var previousSlidesGrid = ref$1.slidesGrid;
    var renderSlide = ref$1.renderSlide;
    var previousOffset = ref$1.offset;
    swiper.updateActiveIndex();
    var activeIndex = swiper.activeIndex || 0;

    var offsetProp;
    if (swiper.rtl && swiper.isHorizontal()) { offsetProp = 'right'; }
    else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

    var slidesAfter;
    var slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1);
      slidesBefore = slidesPerGroup;
    }
    var from = Math.max((activeIndex || 0) - slidesBefore, 0);
    var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
    var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

    Utils.extend(swiper.virtual, {
      from: from,
      to: to,
      offset: offset,
      slidesGrid: swiper.slidesGrid,
    });

    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      if (swiper.lazy && swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    }

    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.css(offsetProp, (offset + "px"));
      }
      swiper.updateProgress();
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset: offset,
        from: from,
        to: to,
        slides: (function getSlides() {
          var slidesToRender = [];
          for (var i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()),
      });
      onRendered();
      return;
    }
    var prependIndexes = [];
    var appendIndexes = [];
    if (force) {
      swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
    } else {
      for (var i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
        }
      }
    }
    for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
      if (i$1 >= from && i$1 <= to) {
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(i$1);
        } else {
          if (i$1 > previousTo) { appendIndexes.push(i$1); }
          if (i$1 < previousFrom) { prependIndexes.push(i$1); }
        }
      }
    }
    appendIndexes.forEach(function (index) {
      swiper.$wrapperEl.append(renderSlide(slides[index], index));
    });
    prependIndexes.sort(function (a, b) { return a < b; }).forEach(function (index) {
      swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
    });
    swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
    onRendered();
  },
  renderSlide: function renderSlide(slide, index) {
    var swiper = this;
    var params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    var $slideEl = params.renderSlide
      ? $$1(params.renderSlide.call(swiper, slide, index))
      : $$1(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
    if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
    if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
    return $slideEl;
  },
  appendSlide: function appendSlide(slide) {
    var swiper = this;
    swiper.virtual.slides.push(slide);
    swiper.virtual.update(true);
  },
  prependSlide: function prependSlide(slide) {
    var swiper = this;
    swiper.virtual.slides.unshift(slide);
    if (swiper.params.virtual.cache) {
      var cache = swiper.virtual.cache;
      var newCache = {};
      Object.keys(cache).forEach(function (cachedIndex) {
        newCache[cachedIndex + 1] = cache[cachedIndex];
      });
      swiper.virtual.cache = newCache;
    }
    swiper.virtual.update(true);
    swiper.slideNext(0);
  },
};

var Virtual$1 = {
  name: 'virtual',
  params: {
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      virtual: {
        update: Virtual.update.bind(swiper),
        appendSlide: Virtual.appendSlide.bind(swiper),
        prependSlide: Virtual.prependSlide.bind(swiper),
        renderSlide: Virtual.renderSlide.bind(swiper),
        slides: swiper.params.virtual.slides,
        cache: {},
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
      var overwriteParams = {
        watchSlidesProgress: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);

      swiper.virtual.update();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) { return; }
      swiper.virtual.update();
    },
  },
};

var Keyboard = {
  handle: function handle(event) {
    var swiper = this;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; } // jquery fix
    var kc = e.keyCode || e.charCode;
    // Directions locks
    if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40))) {
      return false;
    }
    if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38))) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }
    if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
      var inView = false;
      // Check that swiper should be inside of visible area of window
      if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
        return undefined;
      }
      var windowScroll = {
        left: win.pageXOffset,
        top: win.pageYOffset,
      };
      var windowWidth = win.innerWidth;
      var windowHeight = win.innerHeight;
      var swiperOffset = swiper.$el.offset();
      if (swiper.rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
      var swiperCoord = [
        [swiperOffset.left, swiperOffset.top],
        [swiperOffset.left + swiper.width, swiperOffset.top],
        [swiperOffset.left, swiperOffset.top + swiper.height],
        [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
      for (var i = 0; i < swiperCoord.length; i += 1) {
        var point = swiperCoord[i];
        if (
          point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
            point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
        ) {
          inView = true;
        }
      }
      if (!inView) { return undefined; }
    }
    if (swiper.isHorizontal()) {
      if (kc === 37 || kc === 39) {
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
      }
      if ((kc === 39 && !swiper.rtl) || (kc === 37 && swiper.rtl)) { swiper.slideNext(); }
      if ((kc === 37 && !swiper.rtl) || (kc === 39 && swiper.rtl)) { swiper.slidePrev(); }
    } else {
      if (kc === 38 || kc === 40) {
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
      }
      if (kc === 40) { swiper.slideNext(); }
      if (kc === 38) { swiper.slidePrev(); }
    }
    swiper.emit('keyPress', kc);
    return undefined;
  },
  enable: function enable() {
    var swiper = this;
    if (swiper.keyboard.enabled) { return; }
    $$1(doc).on('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = true;
  },
  disable: function disable() {
    var swiper = this;
    if (!swiper.keyboard.enabled) { return; }
    $$1(doc).off('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = false;
  },
};

var Keyboard$1 = {
  name: 'keyboard',
  params: {
    keyboard: {
      enabled: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      keyboard: {
        enabled: false,
        enable: Keyboard.enable.bind(swiper),
        disable: Keyboard.disable.bind(swiper),
        handle: Keyboard.handle.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.keyboard.enabled) {
        swiper.keyboard.enable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.keyboard.enabled) {
        swiper.keyboard.disable();
      }
    },
  },
};

function isEventSupported() {
  var eventName = 'onwheel';
  var isSupported = eventName in doc;

  if (!isSupported) {
    var element = doc.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported &&
    doc.implementation &&
    doc.implementation.hasFeature &&
    // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    doc.implementation.hasFeature('', '') !== true
  ) {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}
var Mousewheel = {
  lastScrollTime: Utils.now(),
  event: (function getEvent() {
    if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
    return isEventSupported() ? 'wheel' : 'mousewheel';
  }()),
  normalize: function normalize(e) {
    // Reasonable defaults
    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;

    var sX = 0;
    var sY = 0; // spinX, spinY
    var pX = 0;
    var pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail' in e) {
      sY = e.detail;
    }
    if ('wheelDelta' in e) {
      sY = -e.wheelDelta / 120;
    }
    if ('wheelDeltaY' in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in e) {
      sX = -e.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in e) {
      pY = e.deltaY;
    }
    if ('deltaX' in e) {
      pX = e.deltaX;
    }

    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) { // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else { // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = (pX < 1) ? -1 : 1;
    }
    if (pY && !sY) {
      sY = (pY < 1) ? -1 : 1;
    }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY,
    };
  },
  handle: function handle(event) {
    var e = event;
    var swiper = this;
    var params = swiper.params.mousewheel;
    if (e.originalEvent) { e = e.originalEvent; } // jquery fix
    var delta = 0;
    var rtlFactor = swiper.rtl ? -1 : 1;

    var data = Mousewheel.normalize(e);

    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
        else { return true; }
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
      else { return true; }
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }

    if (delta === 0) { return true; }

    if (params.invert) { delta = -delta; }

    if (!swiper.params.freeMode) {
      if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
        if (delta < 0) {
          if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
            swiper.slideNext();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) { return true; }
        } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
          swiper.slidePrev();
          swiper.emit('scroll', e);
        } else if (params.releaseOnEdges) { return true; }
      }
      swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
    } else {
      // Freemode or scrollContainer:
      var position = swiper.getTranslate() + (delta * params.sensitivity);
      var wasBeginning = swiper.isBeginning;
      var wasEnd = swiper.isEnd;

      if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
      if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

      swiper.setTransition(0);
      swiper.setTranslate(position);
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
        swiper.updateSlidesClasses();
      }

      if (swiper.params.freeModeSticky) {
        clearTimeout(swiper.mousewheel.timeout);
        swiper.mousewheel.timeout = Utils.nextTick(function () {
          swiper.slideReset();
        }, 300);
      }
      // Emit event
      swiper.emit('scroll', e);

      // Stop autoplay
      if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.stopAutoplay(); }

      // Return page scroll on edge positions
      if (position === 0 || position === swiper.maxTranslate()) { return true; }
    }

    if (e.preventDefault) { e.preventDefault(); }
    else { e.returnValue = false; }
    return false;
  },
  enable: function enable() {
    var swiper = this;
    if (!Mousewheel.event) { return false; }
    if (swiper.mousewheel.enabled) { return false; }
    var target = swiper.$el;
    if (swiper.params.mousewheel.eventsTarged !== 'container') {
      target = $$1(swiper.params.mousewheel.eventsTarged);
    }
    target.on(Mousewheel.event, swiper.mousewheel.handle);
    swiper.mousewheel.enabled = true;
    return true;
  },
  disable: function disable() {
    var swiper = this;
    if (!Mousewheel.event) { return false; }
    if (!swiper.mousewheel.enabled) { return false; }
    var target = swiper.$el;
    if (swiper.params.mousewheel.eventsTarged !== 'container') {
      target = $$1(swiper.params.mousewheel.eventsTarged);
    }
    target.off(Mousewheel.event, swiper.mousewheel.handle);
    swiper.mousewheel.enabled = false;
    return true;
  },
};

var Mousewheel$1 = {
  name: 'mousewheel',
  params: {
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarged: 'container',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      mousewheel: {
        enabled: false,
        enable: Mousewheel.enable.bind(swiper),
        disable: Mousewheel.disable.bind(swiper),
        handle: Mousewheel.handle.bind(swiper),
        lastScrollTime: Utils.now(),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
    },
  },
};

var Navigation = {
  update: function update() {
    // Update Navigation Buttons
    var swiper = this;
    var params = swiper.params.navigation;

    if (swiper.params.loop) { return; }
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        $prevEl.addClass(params.disabledClass);
      } else {
        $prevEl.removeClass(params.disabledClass);
      }
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        $nextEl.addClass(params.disabledClass);
      } else {
        $nextEl.removeClass(params.disabledClass);
      }
    }
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.navigation;
    if (!(params.nextEl || params.prevEl)) { return; }

    var $nextEl;
    var $prevEl;
    if (params.nextEl) {
      $nextEl = $$1(params.nextEl);
      if (
        swiper.params.uniqueNavElements &&
        typeof params.nextEl === 'string' &&
        $nextEl.length > 1 &&
        swiper.$el.find(params.nextEl).length === 1
      ) {
        $nextEl = swiper.$el.find(params.nextEl);
      }
    }
    if (params.prevEl) {
      $prevEl = $$1(params.prevEl);
      if (
        swiper.params.uniqueNavElements &&
        typeof params.prevEl === 'string' &&
        $prevEl.length > 1 &&
        swiper.$el.find(params.prevEl).length === 1
      ) {
        $prevEl = swiper.$el.find(params.prevEl);
      }
    }

    if ($nextEl && $nextEl.length > 0) {
      $nextEl.on('click', function (e) {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop) { return; }
        swiper.slideNext();
      });
    }
    if ($prevEl && $prevEl.length > 0) {
      $prevEl.on('click', function (e) {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop) { return; }
        swiper.slidePrev();
      });
    }

    Utils.extend(swiper.navigation, {
      $nextEl: $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl: $prevEl,
      prevEl: $prevEl && $prevEl[0],
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;
    if ($nextEl && $nextEl.length) {
      $nextEl.off('click');
      $nextEl.removeClass(swiper.params.navigation.disabledClass);
    }
    if ($prevEl && $prevEl.length) {
      $prevEl.off('click');
      $prevEl.removeClass(swiper.params.navigation.disabledClass);
    }
  },
};

var Navigation$1 = {
  name: 'navigation',
  params: {
    navigation: {
      nextEl: null,
      prevEl: null,

      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      navigation: {
        init: Navigation.init.bind(swiper),
        update: Navigation.update.bind(swiper),
        destroy: Navigation.destroy.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.navigation.init();
      swiper.navigation.update();
    },
    toEdge: function toEdge() {
      var swiper = this;
      swiper.navigation.update();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      swiper.navigation.update();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.navigation.destroy();
    },
    click: function click(e) {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if (
        swiper.params.navigation.hideOnClick &&
        !$$1(e.target).is($prevEl) &&
        !$$1(e.target).is($nextEl)
      ) {
        if ($nextEl) { $nextEl.toggleClass(swiper.params.navigation.hiddenClass); }
        if ($prevEl) { $prevEl.toggleClass(swiper.params.navigation.hiddenClass); }
      }
    },
  },
};

var Pagination = {
  update: function update() {
    // Render || Update Pagination bullets/items
    var swiper = this;
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    // Current/Total
    var current;
    var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
      if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
        current -= (slidesLength - (swiper.loopedSlides * 2));
      }
      if (current > total - 1) { current -= total; }
      if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var bullets = swiper.pagination.bullets;
      if (params.dynamicBullets) {
        swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
        $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * 5) + "px"));
      }
      bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev"));
      if ($el.length > 1) {
        bullets.each(function (index, bullet) {
          var $bullet = $$1(bullet);
          if ($bullet.index() === current) {
            $bullet.addClass(params.bulletActiveClass);
            if (params.dynamicBullets) {
              $bullet
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev"))
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev-prev"));
              $bullet
                .next()
                .addClass(((params.bulletActiveClass) + "-next"))
                .next()
                .addClass(((params.bulletActiveClass) + "-next-next"));
            }
          }
        });
      } else {
        var $bullet = bullets.eq(current);
        $bullet.addClass(params.bulletActiveClass);
        if (params.dynamicBullets) {
          $bullet
            .prev()
            .addClass(((params.bulletActiveClass) + "-prev"))
            .prev()
            .addClass(((params.bulletActiveClass) + "-prev-prev"));
          $bullet
            .next()
            .addClass(((params.bulletActiveClass) + "-next"))
            .next()
            .addClass(((params.bulletActiveClass) + "-next-next"));
        }
      }
      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, 5);
        var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (current * swiper.pagination.bulletSize);
        var offsetProp = rtl ? 'right' : 'left';
        bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
      }
    }
    if (params.type === 'fraction') {
      $el.find(("." + (params.currentClass))).text(current + 1);
      $el.find(("." + (params.totalClass))).text(total);
    }
    if (params.type === 'progressbar') {
      var scale = (current + 1) / total;
      var scaleX = scale;
      var scaleY = 1;
      if (!swiper.isHorizontal()) {
        scaleY = scale;
        scaleX = 1;
      }
      $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
    }
    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(swiper, current + 1, total));
      swiper.emit('paginationRender', swiper, $el[0]);
    } else {
      swiper.emit('paginationUpdate', swiper, $el[0]);
    }
  },
  render: function render() {
    // Render Container
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

    var $el = swiper.pagination.$el;
    var paginationHTML = '';
    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
        }
      }
      $el.html(paginationHTML);
      swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML =
        "<span class=\"" + (params.currentClass) + "\"></span>" +
        ' / ' +
        "<span class=\"" + (params.totalClass) + "\"></span>";
      }
      $el.html(paginationHTML);
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
      }
      $el.html(paginationHTML);
    }
    if (params.type !== 'custom') {
      swiper.emit('paginationRender', swiper.pagination.$el[0]);
    }
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el) { return; }

    var $el = $$1(params.el);
    if ($el.length === 0) { return; }

    if (
      swiper.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      $el.length > 1 &&
      swiper.$el.find(params.el).length === 1
    ) {
      $el = swiper.$el.find(params.el);
    }

    if (params.type === 'bullets' && params.clickable) {
      $el.addClass(params.clickableClass);
    }

    $el.addClass(params.modifierClass + params.type);

    if (params.type === 'bullets' && params.dynamicBullets) {
      $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
    }

    if (params.clickable) {
      $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
        e.preventDefault();
        var index = $$1(this).index() * swiper.params.slidesPerGroup;
        if (swiper.params.loop) { index += swiper.loopedSlides; }
        swiper.slideTo(index);
      });
    }

    Utils.extend(swiper.pagination, {
      $el: $el,
      el: $el[0],
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var $el = swiper.pagination.$el;

    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
    if (params.clickable) {
      $el.off('click', ("." + (params.bulletClass)));
    }
  },
};

var Pagination$1 = {
  name: 'pagination',
  params: {
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,

      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      modifierClass: 'swiper-pagination-', // NEW
      currentClass: 'swiper-pagination-current',
      totalClass: 'swiper-pagination-total',
      hiddenClass: 'swiper-pagination-hidden',
      progressbarFillClass: 'swiper-pagination-progressbar-fill',
      clickableClass: 'swiper-pagination-clickable', // NEW
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      pagination: {
        init: Pagination.init.bind(swiper),
        render: Pagination.render.bind(swiper),
        update: Pagination.update.bind(swiper),
        destroy: Pagination.destroy.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    },
    activeIndexChange: function activeIndexChange() {
      var swiper = this;
      if (swiper.params.loop) {
        swiper.pagination.update();
      } else if (typeof swiper.snapIndex === 'undefined') {
        swiper.pagination.update();
      }
    },
    snapIndexChange: function snapIndexChange() {
      var swiper = this;
      if (!swiper.params.loop) {
        swiper.pagination.update();
      }
    },
    slidesLengthChange: function slidesLengthChange() {
      var swiper = this;
      if (swiper.params.loop) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    },
    snapGridLengthChange: function snapGridLengthChange() {
      var swiper = this;
      if (!swiper.params.loop) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.pagination.destroy();
    },
    click: function click(e) {
      var swiper = this;
      if (
        swiper.params.pagination.el &&
        swiper.params.pagination.hideOnClick &&
        swiper.pagination.$el.length > 0 &&
        !$$1(e.target).hasClass(swiper.params.pagination.bulletClass)
      ) {
        swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
      }
    },
  },
};

var Scrollbar = {
  setTranslate: function setTranslate() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var rtl = swiper.rtl;
    var progress = swiper.progress;
    var dragSize = scrollbar.dragSize;
    var trackSize = scrollbar.trackSize;
    var $dragEl = scrollbar.$dragEl;
    var $el = scrollbar.$el;
    var params = swiper.params.scrollbar;

    var newSize = dragSize;
    var newPos = (trackSize - dragSize) * progress;
    if (rtl && swiper.isHorizontal()) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      if (Support.transforms3d) {
        $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
      } else {
        $dragEl.transform(("translateX(" + newPos + "px)"));
      }
      $dragEl[0].style.width = newSize + "px";
    } else {
      if (Support.transforms3d) {
        $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
      } else {
        $dragEl.transform(("translateY(" + newPos + "px)"));
      }
      $dragEl[0].style.height = newSize + "px";
    }
    if (params.hide) {
      clearTimeout(swiper.scrollbar.timeout);
      $el[0].style.opacity = 1;
      swiper.scrollbar.timeout = setTimeout(function () {
        $el[0].style.opacity = 0;
        $el.transition(400);
      }, 1000);
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
    swiper.scrollbar.$dragEl.transition(duration);
  },
  updateSize: function updateSize() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

    var scrollbar = swiper.scrollbar;
    var $dragEl = scrollbar.$dragEl;
    var $el = scrollbar.$el;

    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

    var divider = swiper.size / swiper.virtualSize;
    var moveDivider = divider * (trackSize / swiper.size);
    var dragSize;
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }

    if (swiper.isHorizontal()) {
      $dragEl[0].style.width = dragSize + "px";
    } else {
      $dragEl[0].style.height = dragSize + "px";
    }

    if (divider >= 1) {
      $el[0].style.display = 'none';
    } else {
      $el[0].style.display = '';
    }
    if (swiper.params.scrollbarHide) {
      $el[0].style.opacity = 0;
    }
    Utils.extend(scrollbar, {
      trackSize: trackSize,
      divider: divider,
      moveDivider: moveDivider,
      dragSize: dragSize,
    });
  },
  setDragPosition: function setDragPosition(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;
    var dragSize = scrollbar.dragSize;
    var moveDivider = scrollbar.moveDivider;

    var pointerPosition;
    if (swiper.isHorizontal()) {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
    } else {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
    }
    var position = (pointerPosition) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragSize / 2);
    var positionMin = -swiper.minTranslate() * moveDivider;
    var positionMax = -swiper.maxTranslate() * moveDivider;
    if (position < positionMin) {
      position = positionMin;
    } else if (position > positionMax) {
      position = positionMax;
    }
    if (swiper.rtl) {
      position = positionMax - position;
    }
    position = -position / moveDivider;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  },
  onDragStart: function onDragStart(e) {
    var swiper = this;
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar;
    var $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    var $dragEl = scrollbar.$dragEl;
    swiper.scrollbar.isTouched = true;
    e.preventDefault();
    e.stopPropagation();

    $wrapperEl.transition(100);
    $dragEl.transition(100);
    scrollbar.setDragPosition(e);

    clearTimeout(swiper.scrollbar.dragTimeout);

    $el.transition(0);
    if (params.hide) {
      $el.css('opacity', 1);
    }
    swiper.emit('scrollbarDragStart', e);
  },
  onDragMove: function onDragMove(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar;
    var $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    var $dragEl = scrollbar.$dragEl;

    if (!swiper.scrollbar.isTouched) { return; }
    if (e.preventDefault) { e.preventDefault(); }
    else { e.returnValue = false; }
    scrollbar.setDragPosition(e);
    $wrapperEl.transition(0);
    $el.transition(0);
    $dragEl.transition(0);
    swiper.emit('scrollbarDragMove', e);
  },
  onDragEnd: function onDragEnd(e) {
    var swiper = this;

    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;

    if (!swiper.scrollbar.isTouched) { return; }
    swiper.scrollbar.isTouched = false;
    if (params.hide) {
      clearTimeout(swiper.scrollbar.dragTimeout);
      swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
        $el.css('opacity', 0);
        $el.transition(400);
      }, 1000);
    }
    swiper.emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideReset();
    }
  },
  enableDraggable: function enableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;
    var target = Support.touch ? $el[0] : document;
    $el.on(swiper.scrollbar.dragEvents.start, swiper.scrollbar.onDragStart);
    $$1(target).on(swiper.scrollbar.dragEvents.move, swiper.scrollbar.onDragMove);
    $$1(target).on(swiper.scrollbar.dragEvents.end, swiper.scrollbar.onDragEnd);
  },
  disableDraggable: function disableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;
    var target = Support.touch ? $el[0] : document;
    $el.off(swiper.scrollbar.dragEvents.start);
    $$1(target).off(swiper.scrollbar.dragEvents.move);
    $$1(target).off(swiper.scrollbar.dragEvents.end);
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var $swiperEl = swiper.$el;
    var touchEvents = swiper.touchEvents;
    var params = swiper.params.scrollbar;

    var $el = $$1(params.el);
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
      $el = $swiperEl.find(params.el);
    }

    var $dragEl = $el.find('.swiper-scrollbar-drag');
    if ($dragEl.length === 0) {
      $dragEl = $$1('<div class="swiper-scrollbar-drag"></div>');
      $el.append($dragEl);
    }

    swiper.scrollbar.dragEvents = (function dragEvents() {
      if ((swiper.params.simulateTouch === false && !Support.touch)) {
        return {
          start: 'mousedown',
          move: 'mousemove',
          end: 'mouseup',
        };
      }
      return touchEvents;
    }());

    Utils.extend(scrollbar, {
      $el: $el,
      el: $el[0],
      $dragEl: $dragEl,
      dragEl: $dragEl[0],
    });

    if (params.draggable) {
      scrollbar.enableDraggable();
    }
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.scrollbar.disableDraggable();
  },
};

var Scrollbar$1 = {
  name: 'scrollbar',
  params: {
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      scrollbar: {
        init: Scrollbar.init.bind(swiper),
        destroy: Scrollbar.destroy.bind(swiper),
        updateSize: Scrollbar.updateSize.bind(swiper),
        setTranslate: Scrollbar.setTranslate.bind(swiper),
        setTransition: Scrollbar.setTransition.bind(swiper),
        enableDraggable: Scrollbar.enableDraggable.bind(swiper),
        disableDraggable: Scrollbar.disableDraggable.bind(swiper),
        setDragPosition: Scrollbar.setDragPosition.bind(swiper),
        onDragStart: Scrollbar.onDragStart.bind(swiper),
        onDragMove: Scrollbar.onDragMove.bind(swiper),
        onDragEnd: Scrollbar.onDragEnd.bind(swiper),
        isTouched: false,
        timeout: null,
        dragTimeout: null,
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.scrollbar.init();
      swiper.scrollbar.updateSize();
      swiper.scrollbar.setTranslate();
    },
    update: function update() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    resize: function resize() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      swiper.scrollbar.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.scrollbar.setTransition(duration);
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.destroy();
    },
  },
};

var Parallax = {
  setTransform: function setTransform(el, progress) {
    var swiper = this;
    var rtl = swiper.rtl;

    var $el = $$1(el);
    var rtlFactor = rtl ? -1 : 1;

    var p = $el.attr('data-swiper-parallax') || '0';
    var x = $el.attr('data-swiper-parallax-x');
    var y = $el.attr('data-swiper-parallax-y');
    var scale = $el.attr('data-swiper-parallax-scale');
    var opacity = $el.attr('data-swiper-parallax-opacity');

    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }

    if ((x).indexOf('%') >= 0) {
      x = (parseInt(x, 10) * progress * rtlFactor) + "%";
    } else {
      x = (x * progress * rtlFactor) + "px";
    }
    if ((y).indexOf('%') >= 0) {
      y = (parseInt(y, 10) * progress) + "%";
    } else {
      y = (y * progress) + "px";
    }

    if (typeof opacity !== 'undefined' && opacity !== null) {
      var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
      $el[0].style.opacity = currentOpacity;
    }
    if (typeof scale === 'undefined' || scale === null) {
      $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
    } else {
      var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
      $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
    }
  },
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el;
    var slides = swiper.slides;
    var progress = swiper.progress;
    var snapGrid = swiper.snapGrid;
    $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each(function (index, el) {
        swiper.parallax.setTransform(el, progress);
      });
    slides.each(function (slideIndex, slideEl) {
      var slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      $$1(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, slideProgress);
        });
    });
  },
  setTransition: function setTransition(duration) {
    if ( duration === void 0 ) duration = this.params.speed;

    var swiper = this;
    var $el = swiper.$el;
    $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each(function (index, parallaxEl) {
        var $parallaxEl = $$1(parallaxEl);
        var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
        if (duration === 0) { parallaxDuration = 0; }
        $parallaxEl.transition(parallaxDuration);
      });
  },
};

var Parallax$1 = {
  name: 'parallax',
  params: {
    parallax: {
      enabled: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      parallax: {
        setTransform: Parallax.setTransform.bind(swiper),
        setTranslate: Parallax.setTranslate.bind(swiper),
        setTransition: Parallax.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      swiper.params.watchSlidesProgress = true;
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTranslate();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTransition(duration);
    },
  },
};

var Zoom = {
  // Calc Scale From Multi-touches
  getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
    if (e.targetTouches.length < 2) { return 1; }
    var x1 = e.targetTouches[0].pageX;
    var y1 = e.targetTouches[0].pageY;
    var x2 = e.targetTouches[1].pageX;
    var y2 = e.targetTouches[1].pageY;
    var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
    return distance;
  },
  // Events
  onGestureStart: function onGestureStart(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    zoom.fakeGestureTouched = false;
    zoom.fakeGestureMoved = false;
    if (!Support.gestures) {
      if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
        return;
      }
      zoom.fakeGestureTouched = true;
      gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
    }
    if (!gesture.$slideEl || !gesture.$slideEl.length) {
      gesture.$slideEl = $$1(this);
      if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (gesture.$imageWrapEl.length === 0) {
        gesture.$imageEl = undefined;
        return;
      }
    }
    gesture.$imageEl.transition(0);
    swiper.zoom.isScaling = true;
  },
  onGestureChange: function onGestureChange(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (!Support.gestures) {
      if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
        return;
      }
      zoom.fakeGestureMoved = true;
      gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (Support.gestures) {
      swiper.zoom.scale = e.scale * zoom.currentScale;
    } else {
      zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
    }
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
    }
    gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
  },
  onGestureEnd: function onGestureEnd(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (!Support.gestures) {
      if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
        return;
      }
      if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
        return;
      }
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    zoom.currentScale = zoom.scale;
    zoom.isScaling = false;
    if (zoom.scale === 1) { gesture.$slideEl = undefined; }
  },
  onTouchStart: function onTouchStart(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (image.isTouched) { return; }
    if (Device.android) { e.preventDefault(); }
    image.isTouched = true;
    image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  },
  onTouchMove: function onTouchMove(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    var velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    swiper.allowClick = false;
    if (!image.isTouched || !gesture.$slideEl) { return; }

    if (!image.isMoved) {
      image.width = gesture.$imageEl[0].offsetWidth;
      image.height = gesture.$imageEl[0].offsetHeight;
      image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
      image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
      gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
      gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
      gesture.$imageWrapEl.transition(0);
      if (swiper.rtl) { image.startX = -image.startX; }
      if (swiper.rtl) { image.startY = -image.startY; }
    }
    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;

    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

    image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
    image.maxX = -image.minX;
    image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
    image.maxY = -image.minY;

    image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!image.isMoved && !zoom.isScaling) {
      if (
        swiper.isHorizontal() &&
        (
          (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x) ||
          (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
        )
      ) {
        image.isTouched = false;
        return;
      } else if (
        !swiper.isHorizontal() &&
        (
          (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y) ||
          (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
        )
      ) {
        image.isTouched = false;
        return;
      }
    }
    e.preventDefault();
    e.stopPropagation();

    image.isMoved = true;
    image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
    image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

    if (image.currentX < image.minX) {
      image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
    }
    if (image.currentX > image.maxX) {
      image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
    }

    if (image.currentY < image.minY) {
      image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
    }
    if (image.currentY > image.maxY) {
      image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
    }

    // Velocity
    if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
    if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
    if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();

    gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
  },
  onTouchEnd: function onTouchEnd() {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    var velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    var momentumDurationX = 300;
    var momentumDurationY = 300;
    var momentumDistanceX = velocity.x * momentumDurationX;
    var newPositionX = image.currentX + momentumDistanceX;
    var momentumDistanceY = velocity.y * momentumDurationY;
    var newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
    if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
    var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

    image.currentX = newPositionX;
    image.currentY = newPositionY;

    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
    image.maxX = -image.minX;
    image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

    gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
  },
  onTransitionEnd: function onTransitionEnd() {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
      gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
      gesture.$imageWrapEl.transform('translate3d(0,0,0)');
      gesture.$slideEl = undefined;
      gesture.$imageEl = undefined;
      gesture.$imageWrapEl = undefined;

      zoom.scale = 1;
      zoom.currentScale = 1;
    }
  },
  // Toggle Zoom
  toggle: function toggle(e) {
    var swiper = this;
    var zoom = swiper.zoom;

    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoom.out();
    } else {
      // Zoom In
      zoom.in(e);
    }
  },
  in: function in$1(e) {
    var swiper = this;

    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;

    if (!gesture.$slideEl) {
      gesture.$slideEl = swiper.clickedSlide ? $$1(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

    gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

    var touchX;
    var touchY;
    var offsetX;
    var offsetY;
    var diffX;
    var diffY;
    var translateX;
    var translateY;
    var imageWidth;
    var imageHeight;
    var scaledWidth;
    var scaledHeight;
    var translateMinX;
    var translateMinY;
    var translateMaxX;
    var translateMaxY;
    var slideWidth;
    var slideHeight;

    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
      touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }

    zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    if (e) {
      slideWidth = gesture.$slideEl[0].offsetWidth;
      slideHeight = gesture.$slideEl[0].offsetHeight;
      offsetX = gesture.$slideEl.offset().left;
      offsetY = gesture.$slideEl.offset().top;
      diffX = (offsetX + (slideWidth / 2)) - touchX;
      diffY = (offsetY + (slideHeight / 2)) - touchY;

      imageWidth = gesture.$imageEl[0].offsetWidth;
      imageHeight = gesture.$imageEl[0].offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;

      translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
      translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;

      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;

      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }

      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
    gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
  },
  out: function out() {
    var swiper = this;

    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;

    if (!gesture.$slideEl) {
      gesture.$slideEl = swiper.clickedSlide ? $$1(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

    zoom.scale = 1;
    zoom.currentScale = 1;
    gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
    gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
    gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
    gesture.$slideEl = undefined;
  },
  // Attach/Detach Events
  enable: function enable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (zoom.enabled) { return; }
    zoom.enabled = true;

    var slides = swiper.slides;

    var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

    // Scale image
    if (Support.gestures) {
      slides.on('gesturestart', zoom.onGestureStart, passiveListener);
      slides.on('gesturechange', zoom.onGestureChange, passiveListener);
      slides.on('gestureend', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      slides.on(swiper.touchEvents.start, zoom.onGestureStart, passiveListener);
      slides.on(swiper.touchEvents.move, zoom.onGestureChange, passiveListener);
      slides.on(swiper.touchEvents.end, zoom.onGestureEnd, passiveListener);
    }

    // Move image
    swiper.slides.each(function (index, slideEl) {
      var $slideEl = $$1(slideEl);
      if ($slideEl.find(("." + (swiper.params.zoom.containerClass))).length > 0) {
        $slideEl.on(swiper.touchEvents.move, zoom.onTouchMove);
      }
    });
  },
  disable: function disable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (!zoom.enabled) { return; }

    swiper.zoom.enabled = false;

    var slides = swiper.slides;

    var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

    // Scale image
    if (Support.gestures) {
      slides.off('gesturestart', zoom.onGestureStart, passiveListener);
      slides.off('gesturechange', zoom.onGestureChange, passiveListener);
      slides.off('gestureend', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      slides.off(swiper.touchEvents.start, zoom.onGestureStart, passiveListener);
      slides.off(swiper.touchEvents.move, zoom.onGestureChange, passiveListener);
      slides.off(swiper.touchEvents.end, zoom.onGestureEnd, passiveListener);
    }

    // Move image
    swiper.slides.each(function (index, slideEl) {
      var $slideEl = $$1(slideEl);
      if ($slideEl.find(("." + (swiper.params.zoom.containerClass))).length > 0) {
        $slideEl.off(swiper.touchEvents.move, zoom.onTouchMove);
      }
    });
  },
};

var Zoom$1 = {
  name: 'zoom',
  params: {
    zoom: {
      enabled: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed',
    },
  },
  create: function create() {
    var swiper = this;
    var zoom = {
      enabled: false,
      scale: 1,
      currentScale: 1,
      isScaling: false,
      gesture: {
        $slideEl: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        $imageEl: undefined,
        $imageWrapEl: undefined,
        maxRatio: 3,
      },
      image: {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {},
      },
      velocity: {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined,
      },
    };
    ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
      zoom[methodName] = Zoom[methodName].bind(swiper);
    });
    Utils.extend(swiper, {
      zoom: zoom,
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.zoom.enabled) {
        swiper.zoom.enable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.zoom.disable();
    },
    touchStart: function touchStart(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) { return; }
      swiper.zoom.onTouchStart(e);
    },
    touchEnd: function touchEnd(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) { return; }
      swiper.zoom.onTouchEnd(e);
    },
    doubleTap: function doubleTap(e) {
      var swiper = this;
      if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
        swiper.zoom.toggle(e);
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
        swiper.zoom.onTransitionEnd();
      }
    },
  },
};

var Lazy = {
  loadInSlide: function loadInSlide(index, loadInDuplicate) {
    if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

    var swiper = this;
    var params = swiper.params.lazy;
    if (typeof index === 'undefined') { return; }
    if (swiper.slides.length === 0) { return; }
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

    var $slideEl = isVirtual
      ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
      : swiper.slides.eq(index);

    var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
    if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
      $images = $images.add($slideEl[0]);
    }
    if ($images.length === 0) { return; }

    $images.each(function (imageIndex, imageEl) {
      var $imageEl = $$1(imageEl);
      $imageEl.addClass(params.loadingClass);

      var background = $imageEl.attr('data-background');
      var src = $imageEl.attr('data-src');
      var srcset = $imageEl.attr('data-srcset');
      var sizes = $imageEl.attr('data-sizes');

      swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
        if (background) {
          $imageEl.css('background-image', ("url(\"" + background + "\")"));
          $imageEl.removeAttr('data-background');
        } else {
          if (srcset) {
            $imageEl.attr('srcset', srcset);
            $imageEl.removeAttr('data-srcset');
          }
          if (sizes) {
            $imageEl.attr('sizes', sizes);
            $imageEl.removeAttr('data-sizes');
          }
          if (src) {
            $imageEl.attr('src', src);
            $imageEl.removeAttr('data-src');
          }
        }

        $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
        $slideEl.find(("." + (params.preloaderClass))).remove();
        if (swiper.params.loop && loadInDuplicate) {
          var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
          if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
            var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
            swiper.lazy.loadInSlide(originalSlide.index(), false);
          } else {
            var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
            swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
          }
        }
        swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
      });

      swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
    });
  },
  load: function load() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var swiperParams = swiper.params;
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
    var params = swiperParams.lazy;

    var slidesPerView = swiperParams.slidesPerView;
    if (slidesPerView === 'auto') {
      slidesPerView = 0;
    }

    function slideExist(index) {
      if (isVirtual) {
        if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
          return true;
        }
      } else if (slides[index]) { return true; }
      return false;
    }
    function slideIndex(slideEl) {
      if (isVirtual) {
        return $$1(slideEl).attr('data-swiper-slide-index');
      }
      return $$1(slideEl).index();
    }

    if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
    if (swiper.params.watchSlidesVisibility) {
      $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
        var index = isVirtual ? $$1(slideEl).attr('data-swiper-slide-index') : $$1(slideEl).index();
        swiper.lazy.loadInSlide(index);
      });
    } else if (slidesPerView > 1) {
      for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
        if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
      }
    } else {
      swiper.lazy.loadInSlide(activeIndex);
    }
    if (params.loadPrevNext) {
      if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
        var amount = params.loadPrevNextAmount;
        var spv = slidesPerView;
        var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
        var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
        // Next Slides
        for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
          if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
        }
        // Prev Slides
        for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
          if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
        }
      } else {
        var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
        if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

        var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
        if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
      }
    }
  },
};

var Lazy$1 = {
  name: 'lazy',
  params: {
    lazy: {
      enabled: false,
      loadPrevNext: false,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: false,

      elementClass: 'swiper-lazy',
      loadingClass: 'swiper-lazy-loading',
      loadedClass: 'swiper-lazy-loaded',
      preloaderClass: 'swiper-lazy-preloader',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      lazy: {
        initialImageLoaded: false,
        load: Lazy.load.bind(swiper),
        loadInSlide: Lazy.loadInSlide.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.preloadImages) { swiper.params.preloadImages = false; }
    },
    init: function init() {
      var swiper = this;
      if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
        swiper.lazy.load();
      }
    },
    scroll: function scroll() {
      var swiper = this;
      if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
        swiper.lazy.load();
      }
    },
    resize: function resize() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    },
    scrollbarDragMove: function scrollbarDragMove() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    },
    transitionStart: function transitionStart() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
          swiper.lazy.load();
        }
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
        swiper.lazy.load();
      }
    },
  },
};

/* eslint no-bitwise: ["error", { "allow": [">>"] }] */
var Controller = {
  LinearSpline: function LinearSpline(x, y) {
    var binarySearch = (function search() {
      var maxIndex;
      var minIndex;
      var guess;
      return function (array, val) {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }());
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    var i1;
    var i3;

    this.interpolate = function interpolate(x2) {
      if (!x2) { return 0; }

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
    };
    return this;
  },
  // xxx: for now i will just save one spline function to to
  getInterpolateFunction: function getInterpolateFunction(c) {
    var swiper = this;
    if (!swiper.controller.spline) {
      swiper.controller.spline = swiper.params.loop ?
        new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) :
        new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
    }
  },
  setTranslate: function setTranslate(setTranslate$1, byController) {
    var swiper = this;
    var controlled = swiper.controller.control;
    var multiplier;
    var controlledTranslate;
    function setControlledTranslate(c) {
      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      var translate = c.rtl && c.params.direction === 'horizontal' ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        swiper.controller.getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }

      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
      }

      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (var i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper$1) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper$1 && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  },
  setTransition: function setTransition(duration, byController) {
    var swiper = this;
    var controlled = swiper.controller.control;
    var i;
    function setControlledTransition(c) {
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        c.$wrapperEl.transitionEnd(function () {
          if (!controlled) { return; }
          if (c.params.loop && swiper.params.controller.by === 'slide') {
            c.loopFix();
          }
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper$1) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper$1 && byController !== controlled) {
      setControlledTransition(controlled);
    }
  },
};
var Controller$1 = {
  name: 'controller',
  params: {
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide', // or 'container'
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      controller: {
        control: swiper.params.controller.control,
        getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
        setTranslate: Controller.setTranslate.bind(swiper),
        setTransition: Controller.setTransition.bind(swiper),
      },
    });
  },
  on: {
    update: function update() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    resize: function resize() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    setTranslate: function setTranslate(translate, byController) {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      swiper.controller.setTranslate(translate, byController);
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      swiper.controller.setTransition(duration, byController);
    },
  },
};

var a11y = {
  makeElFocusable: function makeElFocusable($el) {
    $el.attr('tabIndex', '0');
    return $el;
  },
  addElRole: function addElRole($el, role) {
    $el.attr('role', role);
    return $el;
  },
  addElLabel: function addElLabel($el, label) {
    $el.attr('aria-label', label);
    return $el;
  },
  disableEl: function disableEl($el) {
    $el.attr('aria-disabled', true);
    return $el;
  },
  enableEl: function enableEl($el) {
    $el.attr('aria-disabled', false);
    return $el;
  },
  onEnterKey: function onEnterKey(e) {
    var swiper = this;
    var params = swiper.params.a11y;
    if (e.keyCode !== 13) { return; }
    var $targetEl = $$1(e.target);
    if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
      if (!(swiper.isEnd && !swiper.params.loop)) {
        swiper.slideNext();
      }
      if (swiper.isEnd) {
        swiper.a11y.notify(params.lastSlideMessage);
      } else {
        swiper.a11y.notify(params.nextSlideMessage);
      }
    }
    if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
      if (!(swiper.isBeginning && !swiper.params.loop)) {
        swiper.slidePrev();
      }
      if (swiper.isBeginning) {
        swiper.a11y.notify(params.firstSlideMessage);
      } else {
        swiper.a11y.notify(params.prevSlideMessage);
      }
    }
    if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
      $targetEl[0].click();
    }
  },
  notify: function notify(message) {
    var swiper = this;
    var notification = swiper.a11y.liveRegion;
    if (notification.length === 0) { return; }
    notification.html('');
    notification.html(message);
  },
  updateNavigation: function updateNavigation() {
    var swiper = this;

    if (swiper.params.loop) { return; }
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        swiper.a11y.disableEl($prevEl);
      } else {
        swiper.a11y.enableEl($prevEl);
      }
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        swiper.a11y.disableEl($nextEl);
      } else {
        swiper.a11y.enableEl($nextEl);
      }
    }
  },
  updatePagination: function updatePagination() {
    var swiper = this;
    var params = swiper.params.a11y;
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
        var $bulletEl = $$1(bulletEl);
        swiper.a11y.makeElFocusable($bulletEl);
        swiper.a11y.addElRole($bulletEl, 'button');
        swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
      });
    }
  },
  init: function init() {
    var swiper = this;

    swiper.$el.append(swiper.a11y.liveRegion);

    // Navigation
    var params = swiper.params.a11y;
    var $nextEl;
    var $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      swiper.a11y.makeElFocusable($nextEl);
      swiper.a11y.addElRole($nextEl, 'button');
      swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
      $nextEl.on('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      swiper.a11y.makeElFocusable($prevEl);
      swiper.a11y.addElRole($prevEl, 'button');
      swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
      $prevEl.on('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

    var $nextEl;
    var $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      $nextEl.off('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      $prevEl.off('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
    }
  },
};
var A11y = {
  name: 'a11y',
  params: {
    a11y: {
      enabled: false,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      a11y: {
        liveRegion: $$1(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
      },
    });
    Object.keys(a11y).forEach(function (methodName) {
      swiper.a11y[methodName] = a11y[methodName].bind(swiper);
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.init();
      swiper.a11y.updateNavigation();
    },
    toEdge: function toEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updateNavigation();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updateNavigation();
    },
    paginationUpdate: function paginationUpdate() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updatePagination();
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.destroy();
    },
  },
};

var History = {
  init: function init() {
    var swiper = this;
    if (!swiper.params.history) { return; }
    if (!win.history || !win.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }
    var history = swiper.history;
    history.initialized = true;
    history.paths = History.getPathValues();
    if (!history.paths.key && !history.paths.value) { return; }
    history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
    if (!swiper.params.history.replaceState) {
      win.addEventListener('popstate', swiper.history.setHistoryPopState);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (!swiper.params.history.replaceState) {
      win.removeEventListener('popstate', swiper.history.setHistoryPopState);
    }
  },
  setHistoryPopState: function setHistoryPopState() {
    var swiper = this;
    swiper.history.paths = History.getPathValues();
    swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
  },
  getPathValues: function getPathValues() {
    var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
    var total = pathArray.length;
    var key = pathArray[total - 2];
    var value = pathArray[total - 1];
    return { key: key, value: value };
  },
  setHistory: function setHistory(key, index) {
    var swiper = this;
    if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
    var slide = swiper.slides.eq(index);
    var value = History.slugify(slide.attr('data-history'));
    if (!win.location.pathname.includes(key)) {
      value = key + "/" + value;
    }
    var currentState = win.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (swiper.params.history.replaceState) {
      win.history.replaceState({ value: value }, null, value);
    } else {
      win.history.pushState({ value: value }, null, value);
    }
  },
  slugify: function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  },
  scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
    var swiper = this;
    if (value) {
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var slide = swiper.slides.eq(i);
        var slideHistory = History.slugify(slide.attr('data-history'));
        if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          var index = slide.index();
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  },
};

var History$1 = {
  name: 'history',
  params: {
    history: {
      enabled: false,
      replaceState: false,
      key: 'slides',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      history: {
        init: History.init.bind(swiper),
        setHistory: History.setHistory.bind(swiper),
        setHistoryPopState: History.setHistoryPopState.bind(swiper),
        scrollToSlide: History.scrollToSlide.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.history.enabled) {
        swiper.history.init();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.history.enabled) {
        swiper.history.destroy();
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.history.initialized) {
        swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
      }
    },
  },
};

var HashNavigation = {
  onHashCange: function onHashCange() {
    var swiper = this;
    var newHash = doc.location.hash.replace('#', '');
    var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
    if (newHash !== activeSlideHash) {
      swiper.slideTo(swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index());
    }
  },
  setHash: function setHash() {
    var swiper = this;
    if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
    if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
      win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
    } else {
      var slide = swiper.slides.eq(swiper.activeIndex);
      var hash = slide.attr('data-hash') || slide.attr('data-history');
      doc.location.hash = hash || '';
    }
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
    swiper.hashNavigation.initialized = true;
    var hash = doc.location.hash.replace('#', '');
    if (hash) {
      var speed = 0;
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var slide = swiper.slides.eq(i);
        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
        if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
          var index = slide.index();
          swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
        }
      }
    }
    if (swiper.params.hashNavigation.watchState) {
      $$1(win).on('hashchange', swiper.hashNavigation.onHashCange);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (swiper.params.hashNavigation.watchState) {
      $$1(win).off('hashchange', swiper.hashNavigation.onHashCange);
    }
  },
};
var HashNavigation$1 = {
  name: 'hash-navigation',
  params: {
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      hashNavigation: {
        initialized: false,
        init: HashNavigation.init.bind(swiper),
        destroy: HashNavigation.destroy.bind(swiper),
        setHash: HashNavigation.setHash.bind(swiper),
        onHashCange: HashNavigation.onHashCange.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.hashNavigation.enabled) {
        swiper.hashNavigation.init();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.enabled) {
        swiper.hashNavigation.destroy();
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.hashNavigation.initialized) {
        swiper.hashNavigation.setHash();
      }
    },
  },
};

var Autoplay = {
  run: function run() {
    var swiper = this;
    var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
    var delay = swiper.params.autoplay.delay;
    if ($activeSlideEl.attr('data-swiper-autoplay')) {
      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
    }
    swiper.autoplay.timeout = Utils.nextTick(function () {
      if (swiper.params.loop) {
        swiper.loopFix();
        swiper.slideNext(swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else if (!swiper.isEnd) {
        swiper.slideNext(swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        swiper.slideTo(0, swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else {
        swiper.autoplay.stop();
      }
    }, delay);
  },
  start: function start() {
    var swiper = this;
    if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
    if (swiper.autoplay.running) { return false; }
    swiper.autoplay.running = true;
    swiper.emit('autoplayStart');
    swiper.autoplay.run();
    return true;
  },
  stop: function stop() {
    var swiper = this;
    if (!swiper.autoplay.running) { return false; }
    if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

    if (swiper.autoplay.timeout) {
      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = undefined;
    }
    swiper.autoplay.running = false;
    swiper.emit('autoplayStop');
    return true;
  },
  pause: function pause(speed) {
    var swiper = this;
    if (!swiper.autoplay.running) { return; }
    if (swiper.autoplay.paused) { return; }
    if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
    swiper.autoplay.paused = true;
    if (speed === 0) {
      swiper.autoplay.paused = false;
      swiper.autoplay.run();
    } else {
      swiper.$wrapperEl.transitionEnd(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.autoplay.paused = false;
        if (!swiper.autoplay.running) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.run();
        }
      });
    }
  },
};

var Autoplay$1 = {
  name: 'autoplay',
  params: {
    autoplay: {
      enabled: false,
      delay: 3000,
      disableOnInteraction: true,
      stopOnLastSlide: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      autoplay: {
        running: false,
        paused: false,
        run: Autoplay.run.bind(swiper),
        start: Autoplay.start.bind(swiper),
        stop: Autoplay.stop.bind(swiper),
        pause: Autoplay.pause.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.autoplay.enabled) {
        swiper.autoplay.start();
      }
    },
    beforeTransitionStart: function beforeTransitionStart(speed, internal) {
      var swiper = this;
      if (swiper.autoplay.running) {
        if (internal || !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.pause(speed);
        } else {
          swiper.autoplay.stop();
        }
      }
    },
    sliderFirstMove: function sliderFirstMove() {
      var swiper = this;
      if (swiper.autoplay.running) {
        if (swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.pause();
        }
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      }
    },
  },
};

var Fade = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = swiper.slides.eq(i);
      var offset = $slideEl[0].swiperSlideOffset;
      var tx = -offset;
      if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      var slideOpacity = swiper.params.fadeEffect.crossFade ?
        Math.max(1 - Math.abs($slideEl[0].progress), 0) :
        1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
      $slideEl
        .css({
          opacity: slideOpacity,
        })
        .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides;
    var $wrapperEl = swiper.$wrapperEl;
    slides.transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      slides.transitionEnd(function () {
        if (eventTriggered) { return; }
        if (!swiper || swiper.destroyed) { return; }
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

var EffectFade = {
  name: 'effect-fade',
  params: {
    fadeEffect: {
      crossFade: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      fadeEffect: {
        setTranslate: Fade.setTranslate.bind(swiper),
        setTransition: Fade.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.fadeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.fadeEffect.setTransition(duration);
    },
  },
};

var Cube = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el;
    var $wrapperEl = swiper.$wrapperEl;
    var slides = swiper.slides;
    var swiperWidth = swiper.width;
    var swiperHeight = swiper.height;
    var rtl = swiper.rtl;
    var swiperSize = swiper.size;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var $cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $$1('<div class="swiper-cube-shadow"></div>');
          $wrapperEl.append($cubeShadowEl);
        }
        $cubeShadowEl.css({ height: (swiperWidth + "px") });
      } else {
        $cubeShadowEl = $el.find('.swiper-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $$1('<div class="swiper-cube-shadow"></div>');
          $el.append($cubeShadowEl);
        }
      }
    }
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides.eq(i);
      var slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
      }
      var slideAngle = slideIndex * 90;
      var round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      var tx = 0;
      var ty = 0;
      var tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + (round * 4 * swiperSize);
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = (3 * swiperSize) + (swiperSize * 4 * round);
      }
      if (rtl) {
        tx = -tx;
      }

      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }

      var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
      if (progress <= 1 && progress > -1) {
        wrapperRotate = (slideIndex * 90) + (progress * 90);
        if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
      }
      $slideEl.transform(transform);
      if (params.slideShadows) {
        // Set shadows
        var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
        if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
      }
    }
    $wrapperEl.css({
      '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
    });

    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
      } else {
        var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
        var multiplier = 1.5 - (
          (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2) +
          (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
        );
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var offset = params.shadowOffset;
        $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
      }
    }
    var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
    $wrapperEl
      .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var $el = swiper.$el;
    var slides = swiper.slides;
    slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      $el.find('.swiper-cube-shadow').transition(duration);
    }
  },
};

var EffectCube = {
  name: 'effect-cube',
  params: {
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      cubeEffect: {
        setTranslate: Cube.setTranslate.bind(swiper),
        setTransition: Cube.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.cubeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.cubeEffect.setTransition(duration);
    },
  },
};

var Flip = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides.eq(i);
      var progress = $slideEl[0].progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }
      var offset = $slideEl[0].swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = -offset;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (swiper.rtl) {
        rotateY = -rotateY;
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      if (swiper.params.flipEffect.slideShadows) {
        // Set shadows
        var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $$1(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $$1(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
        if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
      }
      $slideEl
        .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var $wrapperEl = swiper.$wrapperEl;
    slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      // eslint-disable-next-line
      slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
        if (eventTriggered) { return; }
        if (!swiper || swiper.destroyed) { return; }
        // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

var EffectFlip = {
  name: 'effect-flip',
  params: {
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      flipEffect: {
        setTranslate: Flip.setTranslate.bind(swiper),
        setTransition: Flip.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.flipEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.flipEffect.setTransition(duration);
    },
  },
};

var Coverflow = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var swiperWidth = swiper.width;
    var swiperHeight = swiper.height;
    var slides = swiper.slides;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth;
    // Each slide offset from center
    for (var i = 0, length = slides.length; i < length; i += 1) {
      var $slideEl = slides.eq(i);
      var slideSize = slidesSizesGrid[i];
      var slideOffset = $slideEl[0].swiperSlideOffset;
      var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      var translateZ = -translate * Math.abs(offsetMultiplier);

      var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
      var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) { translateX = 0; }
      if (Math.abs(translateY) < 0.001) { translateY = 0; }
      if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
      if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
      if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

      var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

      $slideEl.transform(slideTransform);
      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = $$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
          $slideEl.append($shadowBeforeEl);
        }
        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = $$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append($shadowAfterEl);
        }
        if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
        if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
      }
    }

    // Set correct perspective for IE10
    if (Browser.ie) {
      var ws = $wrapperEl[0].style;
      ws.perspectiveOrigin = center + "px 50%";
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    swiper.slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
  },
};

var EffectCoverflow = {
  name: 'effect-coverflow',
  params: {
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      coverflowEffect: {
        setTranslate: Coverflow.setTranslate.bind(swiper),
        setTransition: Coverflow.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }

      swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }
      swiper.coverflowEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }
      swiper.coverflowEffect.setTransition(duration);
    },
  },
};

// Swiper Class
// Core Modules
Swiper$1.components = [
  Device$2,
  Support$2,
  Browser$2,
  Resize,
  Observer$1,
  Virtual$1,
  Keyboard$1,
  Mousewheel$1,
  Navigation$1,
  Pagination$1,
  Scrollbar$1,
  Parallax$1,
  Zoom$1,
  Lazy$1,
  Controller$1,
  A11y,
  History$1,
  HashNavigation$1,
  Autoplay$1,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow
];

return Swiper$1;

})));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzd2lwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTd2lwZXIgNC4wLjZcbiAqIE1vc3QgbW9kZXJuIG1vYmlsZSB0b3VjaCBzbGlkZXIgYW5kIGZyYW1ld29yayB3aXRoIGhhcmR3YXJlIGFjY2VsZXJhdGVkIHRyYW5zaXRpb25zXG4gKiBodHRwOi8vd3d3LmlkYW5nZXJvLnVzL3N3aXBlci9cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE3IFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gKlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKlxuICogUmVsZWFzZWQgb246IE5vdmVtYmVyIDEzLCAyMDE3XG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLlN3aXBlciA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIHc7XG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdyA9IHtcbiAgICBuYXZpZ2F0b3I6IHtcbiAgICAgIHVzZXJBZ2VudDogJycsXG4gICAgfSxcbiAgICBsb2NhdGlvbjoge30sXG4gICAgaGlzdG9yeToge30sXG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcigpIHt9LFxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fSxcbiAgICBnZXRDb21wdXRlZFN0eWxlOiBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH0sXG4gICAgSW1hZ2U6IGZ1bmN0aW9uIEltYWdlKCkge30sXG4gICAgRGF0ZTogZnVuY3Rpb24gRGF0ZSgpIHt9LFxuICAgIHNjcmVlbjoge30sXG4gIH07XG59IGVsc2Uge1xuICB3ID0gd2luZG93O1xufVxuXG52YXIgd2luID0gdztcblxuLyoqXG4gKiBEb203IDIuMC4xXG4gKiBNaW5pbWFsaXN0aWMgSmF2YVNjcmlwdCBsaWJyYXJ5IGZvciBET00gbWFuaXB1bGF0aW9uLCB3aXRoIGEgalF1ZXJ5LWNvbXBhdGlibGUgQVBJXG4gKiBodHRwOi8vZnJhbWV3b3JrNy5pby9kb2NzL2RvbS5odG1sXG4gKlxuICogQ29weXJpZ2h0IDIwMTcsIFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gKiBUaGUgaURhbmdlcm8udXNcbiAqIGh0dHA6Ly93d3cuaWRhbmdlcm8udXMvXG4gKlxuICogTGljZW5zZWQgdW5kZXIgTUlUXG4gKlxuICogUmVsZWFzZWQgb246IE9jdG9iZXIgMiwgMjAxN1xuICovXG52YXIgRG9tNyA9IGZ1bmN0aW9uIERvbTcoYXJyKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgLy8gQ3JlYXRlIGFycmF5LWxpa2Ugb2JqZWN0XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgc2VsZltpXSA9IGFycltpXTtcbiAgfVxuICBzZWxmLmxlbmd0aCA9IGFyci5sZW5ndGg7XG4gIC8vIFJldHVybiBjb2xsZWN0aW9uIHdpdGggbWV0aG9kc1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICQkMShzZWxlY3RvciwgY29udGV4dCkge1xuICB2YXIgYXJyID0gW107XG4gIHZhciBpID0gMDtcbiAgaWYgKHNlbGVjdG9yICYmICFjb250ZXh0KSB7XG4gICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH1cbiAgfVxuICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIC8vIFN0cmluZ1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgZWxzO1xuICAgICAgdmFyIHRlbXBQYXJlbnQ7XG4gICAgICB2YXIgaHRtbCA9IHNlbGVjdG9yLnRyaW0oKTtcbiAgICAgIGlmIChodG1sLmluZGV4T2YoJzwnKSA+PSAwICYmIGh0bWwuaW5kZXhPZignPicpID49IDApIHtcbiAgICAgICAgdmFyIHRvQ3JlYXRlID0gJ2Rpdic7XG4gICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxsaScpID09PSAwKSB7IHRvQ3JlYXRlID0gJ3VsJzsgfVxuICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dHInKSA9PT0gMCkgeyB0b0NyZWF0ZSA9ICd0Ym9keSc7IH1cbiAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRkJykgPT09IDAgfHwgaHRtbC5pbmRleE9mKCc8dGgnKSA9PT0gMCkgeyB0b0NyZWF0ZSA9ICd0cic7IH1cbiAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRib2R5JykgPT09IDApIHsgdG9DcmVhdGUgPSAndGFibGUnOyB9XG4gICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxvcHRpb24nKSA9PT0gMCkgeyB0b0NyZWF0ZSA9ICdzZWxlY3QnOyB9XG4gICAgICAgIHRlbXBQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRvQ3JlYXRlKTtcbiAgICAgICAgdGVtcFBhcmVudC5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGVtcFBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgYXJyLnB1c2godGVtcFBhcmVudC5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFjb250ZXh0ICYmIHNlbGVjdG9yWzBdID09PSAnIycgJiYgIXNlbGVjdG9yLm1hdGNoKC9bIC48Pjp+XS8pKSB7XG4gICAgICAgICAgLy8gUHVyZSBJRCBzZWxlY3RvclxuICAgICAgICAgIGVscyA9IFtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci50cmltKCkuc3BsaXQoJyMnKVsxXSldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyIHNlbGVjdG9yc1xuICAgICAgICAgIGVscyA9IChjb250ZXh0IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChlbHNbaV0pIHsgYXJyLnB1c2goZWxzW2ldKTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciA9PT0gd2luZG93IHx8IHNlbGVjdG9yID09PSBkb2N1bWVudCkge1xuICAgICAgLy8gTm9kZS9lbGVtZW50XG4gICAgICBhcnIucHVzaChzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmIChzZWxlY3Rvci5sZW5ndGggPiAwICYmIHNlbGVjdG9yWzBdLm5vZGVUeXBlKSB7XG4gICAgICAvLyBBcnJheSBvZiBlbGVtZW50cyBvciBpbnN0YW5jZSBvZiBEb21cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBzZWxlY3Rvci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnIucHVzaChzZWxlY3RvcltpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgRG9tNyhhcnIpO1xufVxuXG4kJDEuZm4gPSBEb203LnByb3RvdHlwZTtcbiQkMS5DbGFzcyA9IERvbTc7XG4kJDEuRG9tNyA9IERvbTc7XG5cbmZ1bmN0aW9uIHVuaXF1ZShhcnIpIHtcbiAgdmFyIHVuaXF1ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHVuaXF1ZUFycmF5LmluZGV4T2YoYXJyW2ldKSA9PT0gLTEpIHsgdW5pcXVlQXJyYXkucHVzaChhcnJbaV0pOyB9XG4gIH1cbiAgcmV0dXJuIHVuaXF1ZUFycmF5O1xufVxuLy8gQ2xhc3NlcyBhbmQgYXR0cmlidXRlc1xuZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHZhciBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzJDFbal0uY2xhc3NMaXN0ICE9PSAndW5kZWZpbmVkJykgeyB0aGlzJDFbal0uY2xhc3NMaXN0LmFkZChjbGFzc2VzW2ldKTsgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcyQxW2pdLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHsgdGhpcyQxW2pdLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1tpXSk7IH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgaWYgKCF0aGlzWzBdKSB7IHJldHVybiBmYWxzZTsgfVxuICByZXR1cm4gdGhpc1swXS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGNsYXNzTmFtZSkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcyQxW2pdLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHsgdGhpcyQxW2pdLmNsYXNzTGlzdC50b2dnbGUoY2xhc3Nlc1tpXSk7IH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBhdHRyKGF0dHJzLCB2YWx1ZSkge1xuICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhdHRycyA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBHZXQgYXR0clxuICAgIGlmICh0aGlzWzBdKSB7IHJldHVybiB0aGlzWzBdLmdldEF0dHJpYnV0ZShhdHRycyk7IH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gU2V0IGF0dHJzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChhcmd1bWVudHMkMS5sZW5ndGggPT09IDIpIHtcbiAgICAgIC8vIFN0cmluZ1xuICAgICAgdGhpcyQxW2ldLnNldEF0dHJpYnV0ZShhdHRycywgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPYmplY3RcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gYXR0cnMpIHtcbiAgICAgICAgdGhpcyQxW2ldW2F0dHJOYW1lXSA9IGF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgdGhpcyQxW2ldLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0cnNbYXR0ck5hbWVdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbmZ1bmN0aW9uIHJlbW92ZUF0dHIoYXR0cikge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGlzJDFbaV0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gZGF0YShrZXksIHZhbHVlKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBlbDtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbCA9IHRoaXNbMF07XG4gICAgLy8gR2V0IHZhbHVlXG4gICAgaWYgKGVsKSB7XG4gICAgICBpZiAoZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSAmJiAoa2V5IGluIGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UpKSB7XG4gICAgICAgIHJldHVybiBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV07XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRhS2V5ID0gZWwuZ2V0QXR0cmlidXRlKChcImRhdGEtXCIgKyBrZXkpKTtcbiAgICAgIGlmIChkYXRhS2V5KSB7XG4gICAgICAgIHJldHVybiBkYXRhS2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIFNldCB2YWx1ZVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBlbCA9IHRoaXMkMVtpXTtcbiAgICBpZiAoIWVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UpIHsgZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSA9IHt9OyB9XG4gICAgZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZVtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG4vLyBUcmFuc2Zvcm1zXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbmZ1bmN0aW9uIHRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmFyIGVsU3R5bGUgPSB0aGlzJDFbaV0uc3R5bGU7XG4gICAgZWxTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgZWxTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmICh0eXBlb2YgZHVyYXRpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgZHVyYXRpb24gPSBkdXJhdGlvbiArIFwibXNcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHZhciBlbFN0eWxlID0gdGhpcyQxW2ldLnN0eWxlO1xuICAgIGVsU3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgZWxTdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbi8vIEV2ZW50c1xuZnVuY3Rpb24gb24oKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gIHZhciBldmVudFR5cGUgPSBhcmdzWzBdO1xuICB2YXIgdGFyZ2V0U2VsZWN0b3IgPSBhcmdzWzFdO1xuICB2YXIgbGlzdGVuZXIgPSBhcmdzWzJdO1xuICB2YXIgY2FwdHVyZSA9IGFyZ3NbM107XG4gIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBhc3NpZ247XG4gICAgKGFzc2lnbiA9IGFyZ3MsIGV2ZW50VHlwZSA9IGFzc2lnblswXSwgbGlzdGVuZXIgPSBhc3NpZ25bMV0sIGNhcHR1cmUgPSBhc3NpZ25bMl0pO1xuICAgIHRhcmdldFNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmICghY2FwdHVyZSkgeyBjYXB0dXJlID0gZmFsc2U7IH1cblxuICBmdW5jdGlvbiBoYW5kbGVMaXZlRXZlbnQoZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAoIXRhcmdldCkgeyByZXR1cm47IH1cbiAgICB2YXIgZXZlbnREYXRhID0gZS50YXJnZXQuZG9tN0V2ZW50RGF0YSB8fCBbXTtcbiAgICBldmVudERhdGEudW5zaGlmdChlKTtcbiAgICBpZiAoJCQxKHRhcmdldCkuaXModGFyZ2V0U2VsZWN0b3IpKSB7IGxpc3RlbmVyLmFwcGx5KHRhcmdldCwgZXZlbnREYXRhKTsgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHBhcmVudHMgPSAkJDEodGFyZ2V0KS5wYXJlbnRzKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcGFyZW50cy5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgICBpZiAoJCQxKHBhcmVudHNba10pLmlzKHRhcmdldFNlbGVjdG9yKSkgeyBsaXN0ZW5lci5hcHBseShwYXJlbnRzW2tdLCBldmVudERhdGEpOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGUpIHtcbiAgICB2YXIgZXZlbnREYXRhID0gZSAmJiBlLnRhcmdldCA/IGUudGFyZ2V0LmRvbTdFdmVudERhdGEgfHwgW10gOiBbXTtcbiAgICBldmVudERhdGEudW5zaGlmdChlKTtcbiAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBldmVudERhdGEpO1xuICB9XG4gIHZhciBldmVudHMgPSBldmVudFR5cGUuc3BsaXQoJyAnKTtcbiAgdmFyIGo7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHZhciBlbCA9IHRoaXMkMVtpXTtcbiAgICBpZiAoIXRhcmdldFNlbGVjdG9yKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgZXZlbnRzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmICghZWwuZG9tN0xpc3RlbmVycykgeyBlbC5kb203TGlzdGVuZXJzID0gW107IH1cbiAgICAgICAgZWwuZG9tN0xpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBldmVudFR5cGUsXG4gICAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyLFxuICAgICAgICAgIHByb3h5TGlzdGVuZXI6IGhhbmRsZUV2ZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbal0sIGhhbmRsZUV2ZW50LCBjYXB0dXJlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGl2ZSBldmVudHNcbiAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKCFlbC5kb203TGl2ZUxpc3RlbmVycykgeyBlbC5kb203TGl2ZUxpc3RlbmVycyA9IFtdOyB9XG4gICAgICAgIGVsLmRvbTdMaXZlTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZSxcbiAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXG4gICAgICAgICAgcHJveHlMaXN0ZW5lcjogaGFuZGxlTGl2ZUV2ZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbal0sIGhhbmRsZUxpdmVFdmVudCwgY2FwdHVyZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gb2ZmKCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcbiAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICB2YXIgZXZlbnRUeXBlID0gYXJnc1swXTtcbiAgdmFyIHRhcmdldFNlbGVjdG9yID0gYXJnc1sxXTtcbiAgdmFyIGxpc3RlbmVyID0gYXJnc1syXTtcbiAgdmFyIGNhcHR1cmUgPSBhcmdzWzNdO1xuICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgYXNzaWduO1xuICAgIChhc3NpZ24gPSBhcmdzLCBldmVudFR5cGUgPSBhc3NpZ25bMF0sIGxpc3RlbmVyID0gYXNzaWduWzFdLCBjYXB0dXJlID0gYXNzaWduWzJdKTtcbiAgICB0YXJnZXRTZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoIWNhcHR1cmUpIHsgY2FwdHVyZSA9IGZhbHNlOyB9XG5cbiAgdmFyIGV2ZW50cyA9IGV2ZW50VHlwZS5zcGxpdCgnICcpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgdmFyIGVsID0gdGhpcyQxW2pdO1xuICAgICAgaWYgKCF0YXJnZXRTZWxlY3Rvcikge1xuICAgICAgICBpZiAoZWwuZG9tN0xpc3RlbmVycykge1xuICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZWwuZG9tN0xpc3RlbmVycy5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgIGlmIChlbC5kb203TGlzdGVuZXJzW2tdLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCBlbC5kb203TGlzdGVuZXJzW2tdLnByb3h5TGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsLmRvbTdMaXN0ZW5lcnNba10udHlwZSA9PT0gZXZlbnRzW2ldKSB7XG4gICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCBlbC5kb203TGlzdGVuZXJzW2tdLnByb3h5TGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbC5kb203TGl2ZUxpc3RlbmVycykge1xuICAgICAgICBmb3IgKHZhciBrJDEgPSAwOyBrJDEgPCBlbC5kb203TGl2ZUxpc3RlbmVycy5sZW5ndGg7IGskMSArPSAxKSB7XG4gICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoZWwuZG9tN0xpdmVMaXN0ZW5lcnNbayQxXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIGVsLmRvbTdMaXZlTGlzdGVuZXJzW2skMV0ucHJveHlMaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChlbC5kb203TGl2ZUxpc3RlbmVyc1trJDFdLnR5cGUgPT09IGV2ZW50c1tpXSkge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIGVsLmRvbTdMaXZlTGlzdGVuZXJzW2skMV0ucHJveHlMaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gdHJpZ2dlcigpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgdmFyIGV2ZW50cyA9IGFyZ3NbMF0uc3BsaXQoJyAnKTtcbiAgdmFyIGV2ZW50RGF0YSA9IGFyZ3NbMV07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICB2YXIgZXZ0ID0gKHZvaWQgMCk7XG4gICAgICB0cnkge1xuICAgICAgICBldnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGV2ZW50c1tpXSwge1xuICAgICAgICAgIGRldGFpbDogZXZlbnREYXRhLFxuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICBldnQuaW5pdEV2ZW50KGV2ZW50c1tpXSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIGV2dC5kZXRhaWwgPSBldmVudERhdGE7XG4gICAgICB9XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHRoaXMkMVtqXS5kb203RXZlbnREYXRhID0gYXJncy5maWx0ZXIoZnVuY3Rpb24gKGRhdGEsIGRhdGFJbmRleCkgeyByZXR1cm4gZGF0YUluZGV4ID4gMDsgfSk7XG4gICAgICB0aGlzJDFbal0uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgdGhpcyQxW2pdLmRvbTdFdmVudERhdGEgPSBbXTtcbiAgICAgIGRlbGV0ZSB0aGlzJDFbal0uZG9tN0V2ZW50RGF0YTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGNhbGxiYWNrKSB7XG4gIHZhciBldmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCddO1xuICB2YXIgZG9tID0gdGhpcztcbiAgdmFyIGk7XG4gIGZ1bmN0aW9uIGZpcmVDYWxsQmFjayhlKSB7XG4gICAgLyoganNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSB7IHJldHVybjsgfVxuICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSk7XG4gICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZG9tLm9mZihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgfVxuICB9XG4gIGlmIChjYWxsYmFjaykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGRvbS5vbihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gb3V0ZXJXaWR0aChpbmNsdWRlTWFyZ2lucykge1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHZhciBzdHlsZXMgPSB0aGlzLnN0eWxlcygpO1xuICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGggKyBwYXJzZUZsb2F0KHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tcmlnaHQnKSkgKyBwYXJzZUZsb2F0KHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tbGVmdCcpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGg7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBvdXRlckhlaWdodChpbmNsdWRlTWFyZ2lucykge1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHZhciBzdHlsZXMgPSB0aGlzLnN0eWxlcygpO1xuICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXRvcCcpKSArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1ib3R0b20nKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzWzBdLm9mZnNldEhlaWdodDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIG9mZnNldCgpIHtcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgdmFyIGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICB2YXIgY2xpZW50VG9wID0gZWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgdmFyIGNsaWVudExlZnQgPSBlbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuICAgIHZhciBzY3JvbGxUb3AgPSBlbCA9PT0gd2luZG93ID8gd2luZG93LnNjcm9sbFkgOiBlbC5zY3JvbGxUb3A7XG4gICAgdmFyIHNjcm9sbExlZnQgPSBlbCA9PT0gd2luZG93ID8gd2luZG93LnNjcm9sbFggOiBlbC5zY3JvbGxMZWZ0O1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IChib3gudG9wICsgc2Nyb2xsVG9wKSAtIGNsaWVudFRvcCxcbiAgICAgIGxlZnQ6IChib3gubGVmdCArIHNjcm9sbExlZnQpIC0gY2xpZW50TGVmdCxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBzdHlsZXMoKSB7XG4gIGlmICh0aGlzWzBdKSB7IHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzWzBdLCBudWxsKTsgfVxuICByZXR1cm4ge307XG59XG5mdW5jdGlvbiBjc3MocHJvcHMsIHZhbHVlKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIGlmICh0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodGhpc1swXSkgeyByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpc1swXSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wcyk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgICB0aGlzJDFbaV0uc3R5bGVbcHJvcF0gPSBwcm9wc1twcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGhpcyQxW2ldLnN0eWxlW3Byb3BzXSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gSXRlcmF0ZSBvdmVyIHRoZSBjb2xsZWN0aW9uIHBhc3NpbmcgZWxlbWVudHMgdG8gYGNhbGxiYWNrYFxuZnVuY3Rpb24gZWFjaChjYWxsYmFjaykge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAvLyBEb24ndCBib3RoZXIgY29udGludWluZyB3aXRob3V0IGEgY2FsbGJhY2tcbiAgaWYgKCFjYWxsYmFjaykgeyByZXR1cm4gdGhpczsgfVxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIGN1cnJlbnQgY29sbGVjdGlvblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAvLyBJZiB0aGUgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICAgIGlmIChjYWxsYmFjay5jYWxsKHRoaXMkMVtpXSwgaSwgdGhpcyQxW2ldKSA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIEVuZCB0aGUgbG9vcCBlYXJseVxuICAgICAgcmV0dXJuIHRoaXMkMTtcbiAgICB9XG4gIH1cbiAgLy8gUmV0dXJuIGB0aGlzYCB0byBhbGxvdyBjaGFpbmVkIERPTSBvcGVyYXRpb25zXG4gIHJldHVybiB0aGlzO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5mdW5jdGlvbiBodG1sKGh0bWwpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgaWYgKHR5cGVvZiBodG1sID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS5pbm5lckhUTUwgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGlzJDFbaV0uaW5uZXJIVE1MID0gaHRtbDtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuZnVuY3Rpb24gdGV4dCh0ZXh0KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodGhpc1swXSkge1xuICAgICAgcmV0dXJuIHRoaXNbMF0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoaXMkMVtpXS50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBpcyhzZWxlY3Rvcikge1xuICB2YXIgZWwgPSB0aGlzWzBdO1xuICB2YXIgY29tcGFyZVdpdGg7XG4gIHZhciBpO1xuICBpZiAoIWVsIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGVsLm1hdGNoZXMpIHsgcmV0dXJuIGVsLm1hdGNoZXMoc2VsZWN0b3IpOyB9XG4gICAgZWxzZSBpZiAoZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSB7IHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpOyB9XG4gICAgZWxzZSBpZiAoZWwubXNNYXRjaGVzU2VsZWN0b3IpIHsgcmV0dXJuIGVsLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTsgfVxuXG4gICAgY29tcGFyZVdpdGggPSAkJDEoc2VsZWN0b3IpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSBlbCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSBpZiAoc2VsZWN0b3IgPT09IGRvY3VtZW50KSB7IHJldHVybiBlbCA9PT0gZG9jdW1lbnQ7IH1cbiAgZWxzZSBpZiAoc2VsZWN0b3IgPT09IHdpbmRvdykgeyByZXR1cm4gZWwgPT09IHdpbmRvdzsgfVxuXG4gIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICBjb21wYXJlV2l0aCA9IHNlbGVjdG9yLm5vZGVUeXBlID8gW3NlbGVjdG9yXSA6IHNlbGVjdG9yO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSBlbCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaW5kZXgoKSB7XG4gIHZhciBjaGlsZCA9IHRoaXNbMF07XG4gIHZhciBpO1xuICBpZiAoY2hpbGQpIHtcbiAgICBpID0gMDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB3aGlsZSAoKGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nKSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSB7IGkgKz0gMTsgfVxuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5mdW5jdGlvbiBlcShpbmRleCkge1xuICBpZiAodHlwZW9mIGluZGV4ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gdGhpczsgfVxuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gIHZhciByZXR1cm5JbmRleDtcbiAgaWYgKGluZGV4ID4gbGVuZ3RoIC0gMSkge1xuICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gIH1cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybkluZGV4ID0gbGVuZ3RoICsgaW5kZXg7XG4gICAgaWYgKHJldHVybkluZGV4IDwgMCkgeyByZXR1cm4gbmV3IERvbTcoW10pOyB9XG4gICAgcmV0dXJuIG5ldyBEb203KFt0aGlzW3JldHVybkluZGV4XV0pO1xuICB9XG4gIHJldHVybiBuZXcgRG9tNyhbdGhpc1tpbmRleF1dKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZCgpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgdmFyIG5ld0NoaWxkO1xuXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgYXJncy5sZW5ndGg7IGsgKz0gMSkge1xuICAgIG5ld0NoaWxkID0gYXJnc1trXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gbmV3Q2hpbGQ7XG4gICAgICAgIHdoaWxlICh0ZW1wRGl2LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICB0aGlzJDFbaV0uYXBwZW5kQ2hpbGQodGVtcERpdi5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuZXdDaGlsZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIHRoaXMkMVtpXS5hcHBlbmRDaGlsZChuZXdDaGlsZFtqXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMkMVtpXS5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG4gZnVuY3Rpb24gcHJlcGVuZChuZXdDaGlsZCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgaTtcbiAgdmFyIGo7XG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHR5cGVvZiBuZXdDaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IG5ld0NoaWxkO1xuICAgICAgZm9yIChqID0gdGVtcERpdi5jaGlsZE5vZGVzLmxlbmd0aCAtIDE7IGogPj0gMDsgaiAtPSAxKSB7XG4gICAgICAgIHRoaXMkMVtpXS5pbnNlcnRCZWZvcmUodGVtcERpdi5jaGlsZE5vZGVzW2pdLCB0aGlzJDFbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBuZXdDaGlsZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICB0aGlzJDFbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkW2pdLCB0aGlzJDFbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMkMVtpXS5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHRoaXMkMVtpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG4gZnVuY3Rpb24gbmV4dChzZWxlY3Rvcikge1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBpZiAodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcgJiYgJCQxKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICB9XG5cbiAgICBpZiAodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpIHsgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pOyB9XG4gICAgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgfVxuICByZXR1cm4gbmV3IERvbTcoW10pO1xufVxuZnVuY3Rpb24gbmV4dEFsbChzZWxlY3Rvcikge1xuICB2YXIgbmV4dEVscyA9IFtdO1xuICB2YXIgZWwgPSB0aGlzWzBdO1xuICBpZiAoIWVsKSB7IHJldHVybiBuZXcgRG9tNyhbXSk7IH1cbiAgd2hpbGUgKGVsLm5leHRFbGVtZW50U2libGluZykge1xuICAgIHZhciBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBpZiAoJCQxKG5leHQpLmlzKHNlbGVjdG9yKSkgeyBuZXh0RWxzLnB1c2gobmV4dCk7IH1cbiAgICB9IGVsc2UgeyBuZXh0RWxzLnB1c2gobmV4dCk7IH1cbiAgICBlbCA9IG5leHQ7XG4gIH1cbiAgcmV0dXJuIG5ldyBEb203KG5leHRFbHMpO1xufVxuZnVuY3Rpb24gcHJldihzZWxlY3Rvcikge1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmICQkMShlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb203KFtlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgIH1cblxuICAgIGlmIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7IHJldHVybiBuZXcgRG9tNyhbZWwucHJldmlvdXNFbGVtZW50U2libGluZ10pOyB9XG4gICAgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgfVxuICByZXR1cm4gbmV3IERvbTcoW10pO1xufVxuZnVuY3Rpb24gcHJldkFsbChzZWxlY3Rvcikge1xuICB2YXIgcHJldkVscyA9IFtdO1xuICB2YXIgZWwgPSB0aGlzWzBdO1xuICBpZiAoIWVsKSB7IHJldHVybiBuZXcgRG9tNyhbXSk7IH1cbiAgd2hpbGUgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICB2YXIgcHJldiA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmICgkJDEocHJldikuaXMoc2VsZWN0b3IpKSB7IHByZXZFbHMucHVzaChwcmV2KTsgfVxuICAgIH0gZWxzZSB7IHByZXZFbHMucHVzaChwcmV2KTsgfVxuICAgIGVsID0gcHJldjtcbiAgfVxuICByZXR1cm4gbmV3IERvbTcocHJldkVscyk7XG59XG5mdW5jdGlvbiBwYXJlbnQoc2VsZWN0b3IpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIHBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodGhpcyQxW2ldLnBhcmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoJCQxKHRoaXMkMVtpXS5wYXJlbnROb2RlKS5pcyhzZWxlY3RvcikpIHsgcGFyZW50cy5wdXNoKHRoaXMkMVtpXS5wYXJlbnROb2RlKTsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyZW50cy5wdXNoKHRoaXMkMVtpXS5wYXJlbnROb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuICQkMSh1bmlxdWUocGFyZW50cykpO1xufVxuZnVuY3Rpb24gcGFyZW50cyhzZWxlY3Rvcikge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgcGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHZhciBwYXJlbnQgPSB0aGlzJDFbaV0ucGFyZW50Tm9kZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoJCQxKHBhcmVudCkuaXMoc2VsZWN0b3IpKSB7IHBhcmVudHMucHVzaChwYXJlbnQpOyB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgIH1cbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJCQxKHVuaXF1ZShwYXJlbnRzKSk7XG59XG5mdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG4gIHZhciBjbG9zZXN0ID0gdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gIH1cbiAgaWYgKCFjbG9zZXN0LmlzKHNlbGVjdG9yKSkge1xuICAgIGNsb3Nlc3QgPSBjbG9zZXN0LnBhcmVudHMoc2VsZWN0b3IpLmVxKDApO1xuICB9XG4gIHJldHVybiBjbG9zZXN0O1xufVxuZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgZm91bmRFbGVtZW50cyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB2YXIgZm91bmQgPSB0aGlzJDFbaV0ucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBmb3VuZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgZm91bmRFbGVtZW50cy5wdXNoKGZvdW5kW2pdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBEb203KGZvdW5kRWxlbWVudHMpO1xufVxuZnVuY3Rpb24gY2hpbGRyZW4oc2VsZWN0b3IpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGNoaWxkcmVuID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSB0aGlzJDFbaV0uY2hpbGROb2RlcztcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICBpZiAoY2hpbGROb2Rlc1tqXS5ub2RlVHlwZSA9PT0gMSkgeyBjaGlsZHJlbi5wdXNoKGNoaWxkTm9kZXNbal0pOyB9XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkTm9kZXNbal0ubm9kZVR5cGUgPT09IDEgJiYgJCQxKGNoaWxkTm9kZXNbal0pLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkTm9kZXNbal0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IERvbTcodW5pcXVlKGNoaWxkcmVuKSk7XG59XG5mdW5jdGlvbiByZW1vdmUoKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh0aGlzJDFbaV0ucGFyZW50Tm9kZSkgeyB0aGlzJDFbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzJDFbaV0pOyB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBhZGQoKSB7XG4gIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgdmFyIGRvbSA9IHRoaXM7XG4gIHZhciBpO1xuICB2YXIgajtcbiAgZm9yIChpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB2YXIgdG9BZGQgPSAkJDEoYXJnc1tpXSk7XG4gICAgZm9yIChqID0gMDsgaiA8IHRvQWRkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICBkb21bZG9tLmxlbmd0aF0gPSB0b0FkZFtqXTtcbiAgICAgIGRvbS5sZW5ndGggKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRvbTtcbn1cbnZhciBub1RyaWdnZXIgPSAoJ3Jlc2l6ZSBzY3JvbGwnKS5zcGxpdCgnICcpO1xuXG52YXIgTWV0aG9kcyA9IHtcbiAgYWRkQ2xhc3M6IGFkZENsYXNzLFxuICByZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXG4gIGhhc0NsYXNzOiBoYXNDbGFzcyxcbiAgdG9nZ2xlQ2xhc3M6IHRvZ2dsZUNsYXNzLFxuICBhdHRyOiBhdHRyLFxuICByZW1vdmVBdHRyOiByZW1vdmVBdHRyLFxuICBkYXRhOiBkYXRhLFxuICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgb246IG9uLFxuICBvZmY6IG9mZixcbiAgdHJpZ2dlcjogdHJpZ2dlcixcbiAgdHJhbnNpdGlvbkVuZDogdHJhbnNpdGlvbkVuZCxcbiAgb3V0ZXJXaWR0aDogb3V0ZXJXaWR0aCxcbiAgb3V0ZXJIZWlnaHQ6IG91dGVySGVpZ2h0LFxuICBvZmZzZXQ6IG9mZnNldCxcbiAgY3NzOiBjc3MsXG4gIGVhY2g6IGVhY2gsXG4gIGh0bWw6IGh0bWwsXG4gIHRleHQ6IHRleHQsXG4gIGlzOiBpcyxcbiAgaW5kZXg6IGluZGV4LFxuICBlcTogZXEsXG4gIGFwcGVuZDogYXBwZW5kLFxuICBwcmVwZW5kOiBwcmVwZW5kLFxuICBuZXh0OiBuZXh0LFxuICBuZXh0QWxsOiBuZXh0QWxsLFxuICBwcmV2OiBwcmV2LFxuICBwcmV2QWxsOiBwcmV2QWxsLFxuICBwYXJlbnQ6IHBhcmVudCxcbiAgcGFyZW50czogcGFyZW50cyxcbiAgY2xvc2VzdDogY2xvc2VzdCxcbiAgZmluZDogZmluZCxcbiAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICByZW1vdmU6IHJlbW92ZSxcbiAgYWRkOiBhZGQsXG4gIHN0eWxlczogc3R5bGVzLFxufTtcblxuT2JqZWN0LmtleXMoTWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAkJDEuZm5bbWV0aG9kTmFtZV0gPSBNZXRob2RzW21ldGhvZE5hbWVdO1xufSk7XG5cbnZhciBVdGlscyA9IHtcbiAgZGVsZXRlUHJvcHM6IGZ1bmN0aW9uIGRlbGV0ZVByb3BzKG9iaikge1xuICAgIHZhciBvYmplY3QgPSBvYmo7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gbnVsbDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbm8gZ2V0dGVyIGZvciBvYmplY3RcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gc29tZXRoaW5nIGdvdCB3cm9uZ1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBuZXh0VGljazogZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgaWYgKCBkZWxheSA9PT0gdm9pZCAwICkgZGVsYXkgPSAwO1xuXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5KTtcbiAgfSxcbiAgbm93OiBmdW5jdGlvbiBub3coKSB7XG4gICAgcmV0dXJuIERhdGUubm93KCk7XG4gIH0sXG4gIGdldFRyYW5zbGF0ZTogZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKGVsLCBheGlzKSB7XG4gICAgaWYgKCBheGlzID09PSB2b2lkIDAgKSBheGlzID0gJ3gnO1xuXG4gICAgdmFyIG1hdHJpeDtcbiAgICB2YXIgY3VyVHJhbnNmb3JtO1xuICAgIHZhciB0cmFuc2Zvcm1NYXRyaXg7XG5cbiAgICB2YXIgY3VyU3R5bGUgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XG5cbiAgICBpZiAod2luLldlYktpdENTU01hdHJpeCkge1xuICAgICAgY3VyVHJhbnNmb3JtID0gY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLndlYmtpdFRyYW5zZm9ybTtcbiAgICAgIGlmIChjdXJUcmFuc2Zvcm0uc3BsaXQoJywnKS5sZW5ndGggPiA2KSB7XG4gICAgICAgIGN1clRyYW5zZm9ybSA9IGN1clRyYW5zZm9ybS5zcGxpdCgnLCAnKS5tYXAoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEucmVwbGFjZSgnLCcsICcuJyk7IH0pLmpvaW4oJywgJyk7XG4gICAgICB9XG4gICAgICAvLyBTb21lIG9sZCB2ZXJzaW9ucyBvZiBXZWJraXQgY2hva2Ugd2hlbiAnbm9uZScgaXMgcGFzc2VkOyBwYXNzXG4gICAgICAvLyBlbXB0eSBzdHJpbmcgaW5zdGVhZCBpbiB0aGlzIGNhc2VcbiAgICAgIHRyYW5zZm9ybU1hdHJpeCA9IG5ldyB3aW4uV2ViS2l0Q1NTTWF0cml4KGN1clRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBjdXJUcmFuc2Zvcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2Zvcm1NYXRyaXggPSBjdXJTdHlsZS5Nb3pUcmFuc2Zvcm0gfHwgY3VyU3R5bGUuT1RyYW5zZm9ybSB8fCBjdXJTdHlsZS5Nc1RyYW5zZm9ybSB8fCBjdXJTdHlsZS5tc1RyYW5zZm9ybSB8fCBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykucmVwbGFjZSgndHJhbnNsYXRlKCcsICdtYXRyaXgoMSwgMCwgMCwgMSwnKTtcbiAgICAgIG1hdHJpeCA9IHRyYW5zZm9ybU1hdHJpeC50b1N0cmluZygpLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgLy8gTGF0ZXN0IENocm9tZSBhbmQgd2Via2l0cyBGaXhcbiAgICAgIGlmICh3aW4uV2ViS2l0Q1NTTWF0cml4KSB7IGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7IH1cbiAgICAgIC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgeyBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxMl0pOyB9XG4gICAgICAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICAgIGVsc2UgeyBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs0XSk7IH1cbiAgICB9XG4gICAgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgICAgLy8gTGF0ZXN0IENocm9tZSBhbmQgd2Via2l0cyBGaXhcbiAgICAgIGlmICh3aW4uV2ViS2l0Q1NTTWF0cml4KSB7IGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDI7IH1cbiAgICAgIC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgeyBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxM10pOyB9XG4gICAgICAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICAgIGVsc2UgeyBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs1XSk7IH1cbiAgICB9XG4gICAgcmV0dXJuIGN1clRyYW5zZm9ybSB8fCAwO1xuICB9LFxuICBwYXJzZVVybFF1ZXJ5OiBmdW5jdGlvbiBwYXJzZVVybFF1ZXJ5KHVybCkge1xuICAgIHZhciBxdWVyeSA9IHt9O1xuICAgIHZhciB1cmxUb1BhcnNlID0gdXJsIHx8IHdpbi5sb2NhdGlvbi5ocmVmO1xuICAgIHZhciBpO1xuICAgIHZhciBwYXJhbXM7XG4gICAgdmFyIHBhcmFtO1xuICAgIHZhciBsZW5ndGg7XG4gICAgaWYgKHR5cGVvZiB1cmxUb1BhcnNlID09PSAnc3RyaW5nJyAmJiB1cmxUb1BhcnNlLmxlbmd0aCkge1xuICAgICAgdXJsVG9QYXJzZSA9IHVybFRvUGFyc2UuaW5kZXhPZignPycpID4gLTEgPyB1cmxUb1BhcnNlLnJlcGxhY2UoL1xcUypcXD8vLCAnJykgOiAnJztcbiAgICAgIHBhcmFtcyA9IHVybFRvUGFyc2Uuc3BsaXQoJyYnKS5maWx0ZXIoZnVuY3Rpb24gKHBhcmFtc1BhcnQpIHsgcmV0dXJuIHBhcmFtc1BhcnQgIT09ICcnOyB9KTtcbiAgICAgIGxlbmd0aCA9IHBhcmFtcy5sZW5ndGg7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBwYXJhbSA9IHBhcmFtc1tpXS5yZXBsYWNlKC8jXFxTKy9nLCAnJykuc3BsaXQoJz0nKTtcbiAgICAgICAgcXVlcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtWzBdKV0gPSB0eXBlb2YgcGFyYW1bMV0gPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtWzFdKSB8fCAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24gaXNPYmplY3Qobykge1xuICAgIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgbyAhPT0gbnVsbCAmJiBvLmNvbnN0cnVjdG9yICYmIG8uY29uc3RydWN0b3IgPT09IE9iamVjdDtcbiAgfSxcbiAgZXh0ZW5kOiBmdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuJDEgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuJDEtLSApIGFyZ3NbIGxlbiQxIF0gPSBhcmd1bWVudHNbIGxlbiQxIF07XG5cbiAgICB2YXIgdG8gPSBPYmplY3QoYXJnc1swXSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3NbaV07XG4gICAgICBpZiAobmV4dFNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIG5leHRTb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGtleXNBcnJheSA9IE9iamVjdC5rZXlzKE9iamVjdChuZXh0U291cmNlKSk7XG4gICAgICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4ICs9IDEpIHtcbiAgICAgICAgICB2YXIgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuZXh0U291cmNlLCBuZXh0S2V5KTtcbiAgICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmlzT2JqZWN0KHRvW25leHRLZXldKSAmJiBVdGlscy5pc09iamVjdChuZXh0U291cmNlW25leHRLZXldKSkge1xuICAgICAgICAgICAgICBVdGlscy5leHRlbmQodG9bbmV4dEtleV0sIG5leHRTb3VyY2VbbmV4dEtleV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghVXRpbHMuaXNPYmplY3QodG9bbmV4dEtleV0pICYmIFV0aWxzLmlzT2JqZWN0KG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICAgIHRvW25leHRLZXldID0ge307XG4gICAgICAgICAgICAgIFV0aWxzLmV4dGVuZCh0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0bztcbiAgfSxcbn07XG5cbnZhciBkO1xuaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgZCA9IHtcbiAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKCkge30sXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHt9LFxuICAgIGFjdGl2ZUVsZW1lbnQ6IHtcbiAgICAgIGJsdXI6IGZ1bmN0aW9uIGJsdXIoKSB7fSxcbiAgICAgIG5vZGVOYW1lOiAnJyxcbiAgICB9LFxuICAgIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3IoKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfSxcbiAgICBxdWVyeVNlbGVjdG9yQWxsOiBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgc2V0QXR0cmlidXRlOiBmdW5jdGlvbiBzZXRBdHRyaWJ1dGUoKSB7fSxcbiAgICAgICAgZ2V0RWxlbWVudHNCeVRhZ05hbWU6IGZ1bmN0aW9uIGdldEVsZW1lbnRzQnlUYWdOYW1lKCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBsb2NhdGlvbjogeyBoYXNoOiAnJyB9LFxuICB9O1xufSBlbHNlIHtcbiAgZCA9IGRvY3VtZW50O1xufVxuXG52YXIgZG9jID0gZDtcblxudmFyIFN1cHBvcnQgPSAoZnVuY3Rpb24gU3VwcG9ydCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3VjaDogKHdpbi5Nb2Rlcm5penIgJiYgd2luLk1vZGVybml6ci50b3VjaCA9PT0gdHJ1ZSkgfHwgKGZ1bmN0aW9uIGNoZWNrVG91Y2goKSB7XG4gICAgICByZXR1cm4gISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbikgfHwgKHdpbi5Eb2N1bWVudFRvdWNoICYmIGRvYyBpbnN0YW5jZW9mIHdpbi5Eb2N1bWVudFRvdWNoKSk7XG4gICAgfSgpKSxcblxuICAgIHRyYW5zZm9ybXMzZDogKHdpbi5Nb2Rlcm5penIgJiYgd2luLk1vZGVybml6ci5jc3N0cmFuc2Zvcm1zM2QgPT09IHRydWUpIHx8IChmdW5jdGlvbiBjaGVja1RyYW5zZm9ybXMzZCgpIHtcbiAgICAgIHZhciBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG4gICAgICByZXR1cm4gKCd3ZWJraXRQZXJzcGVjdGl2ZScgaW4gZGl2IHx8ICdNb3pQZXJzcGVjdGl2ZScgaW4gZGl2IHx8ICdPUGVyc3BlY3RpdmUnIGluIGRpdiB8fCAnTXNQZXJzcGVjdGl2ZScgaW4gZGl2IHx8ICdwZXJzcGVjdGl2ZScgaW4gZGl2KTtcbiAgICB9KCkpLFxuXG4gICAgZmxleGJveDogKGZ1bmN0aW9uIGNoZWNrRmxleGJveCgpIHtcbiAgICAgIHZhciBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG4gICAgICB2YXIgc3R5bGVzID0gKCdhbGlnbkl0ZW1zIHdlYmtpdEFsaWduSXRlbXMgd2Via2l0Qm94QWxpZ24gbXNGbGV4QWxpZ24gbW96Qm94QWxpZ24gd2Via2l0RmxleERpcmVjdGlvbiBtc0ZsZXhEaXJlY3Rpb24gbW96Qm94RGlyZWN0aW9uIG1vekJveE9yaWVudCB3ZWJraXRCb3hEaXJlY3Rpb24gd2Via2l0Qm94T3JpZW50Jykuc3BsaXQoJyAnKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzdHlsZXNbaV0gaW4gZGl2KSB7IHJldHVybiB0cnVlOyB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSgpKSxcblxuICAgIG9ic2VydmVyOiAoZnVuY3Rpb24gY2hlY2tPYnNlcnZlcigpIHtcbiAgICAgIHJldHVybiAoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbiB8fCAnV2Via2l0TXV0YXRpb25PYnNlcnZlcicgaW4gd2luKTtcbiAgICB9KCkpLFxuXG4gICAgcGFzc2l2ZUxpc3RlbmVyOiAoZnVuY3Rpb24gY2hlY2tQYXNzaXZlTGlzdGVuZXIoKSB7XG4gICAgICB2YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmVMaXN0ZW5lcicsIG51bGwsIG9wdHMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBObyBzdXBwb3J0XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlO1xuICAgIH0oKSksXG5cbiAgICBnZXN0dXJlczogKGZ1bmN0aW9uIGNoZWNrR2VzdHVyZXMoKSB7XG4gICAgICByZXR1cm4gJ29uZ2VzdHVyZXN0YXJ0JyBpbiB3aW47XG4gICAgfSgpKSxcbiAgfTtcbn0oKSk7XG5cbnZhciBTd2lwZXJDbGFzcyA9IGZ1bmN0aW9uIFN3aXBlckNsYXNzKHBhcmFtcykge1xuICBpZiAoIHBhcmFtcyA9PT0gdm9pZCAwICkgcGFyYW1zID0ge307XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLnBhcmFtcyA9IHBhcmFtcztcblxuICAvLyBFdmVudHNcbiAgc2VsZi5ldmVudHNMaXN0ZW5lcnMgPSB7fTtcblxuICBpZiAoc2VsZi5wYXJhbXMgJiYgc2VsZi5wYXJhbXMub24pIHtcbiAgICBPYmplY3Qua2V5cyhzZWxmLnBhcmFtcy5vbikuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICBzZWxmLm9uKGV2ZW50TmFtZSwgc2VsZi5wYXJhbXMub25bZXZlbnROYW1lXSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbnZhciBzdGF0aWNBY2Nlc3NvcnMgPSB7IGNvbXBvbmVudHM6IHt9IH07XG5Td2lwZXJDbGFzcy5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbiAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBzZWxmOyB9XG4gIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0pIHsgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107IH1cbiAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0ucHVzaChoYW5kbGVyKTtcbiAgfSk7XG4gIHJldHVybiBzZWxmO1xufTtcblN3aXBlckNsYXNzLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSAoZXZlbnRzLCBoYW5kbGVyKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBzZWxmOyB9XG4gIGZ1bmN0aW9uIG9uY2VIYW5kbGVyKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICBoYW5kbGVyLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIHNlbGYub2ZmKGV2ZW50cywgb25jZUhhbmRsZXIpO1xuICB9XG4gIHJldHVybiBzZWxmLm9uKGV2ZW50cywgb25jZUhhbmRsZXIpO1xufTtcblN3aXBlckNsYXNzLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYgKGV2ZW50cywgaGFuZGxlcikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEhhbmRsZXIsIGluZGV4KSB7XG4gICAgICAgIGlmIChldmVudEhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHNlbGY7XG59O1xuU3dpcGVyQ2xhc3MucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0ICgpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzKSB7IHJldHVybiBzZWxmOyB9XG4gIHZhciBldmVudHM7XG4gIHZhciBkYXRhO1xuICB2YXIgY29udGV4dDtcbiAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgZXZlbnRzID0gYXJnc1swXTtcbiAgICBkYXRhID0gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCk7XG4gICAgY29udGV4dCA9IHNlbGY7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnRzID0gYXJnc1swXS5ldmVudHM7XG4gICAgZGF0YSA9IGFyZ3NbMF0uZGF0YTtcbiAgICBjb250ZXh0ID0gYXJnc1swXS5jb250ZXh0IHx8IHNlbGY7XG4gIH1cbiAgdmFyIGV2ZW50c0FycmF5ID0gQXJyYXkuaXNBcnJheShldmVudHMpID8gZXZlbnRzIDogZXZlbnRzLnNwbGl0KCcgJyk7XG4gIGV2ZW50c0FycmF5LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgdmFyIGhhbmRsZXJzID0gW107XG4gICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgIGhhbmRsZXJzLnB1c2goZXZlbnRIYW5kbGVyKTtcbiAgICAgIH0pO1xuICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgIGV2ZW50SGFuZGxlci5hcHBseShjb250ZXh0LCBkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzZWxmO1xufTtcblN3aXBlckNsYXNzLnByb3RvdHlwZS51c2VNb2R1bGVzUGFyYW1zID0gZnVuY3Rpb24gdXNlTW9kdWxlc1BhcmFtcyAoaW5zdGFuY2VQYXJhbXMpIHtcbiAgdmFyIGluc3RhbmNlID0gdGhpcztcbiAgaWYgKCFpbnN0YW5jZS5tb2R1bGVzKSB7IHJldHVybjsgfVxuICBPYmplY3Qua2V5cyhpbnN0YW5jZS5tb2R1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVOYW1lKSB7XG4gICAgdmFyIG1vZHVsZSA9IGluc3RhbmNlLm1vZHVsZXNbbW9kdWxlTmFtZV07XG4gICAgLy8gRXh0ZW5kIHBhcmFtc1xuICAgIGlmIChtb2R1bGUucGFyYW1zKSB7XG4gICAgICBVdGlscy5leHRlbmQoaW5zdGFuY2VQYXJhbXMsIG1vZHVsZS5wYXJhbXMpO1xuICAgIH1cbiAgfSk7XG59O1xuU3dpcGVyQ2xhc3MucHJvdG90eXBlLnVzZU1vZHVsZXMgPSBmdW5jdGlvbiB1c2VNb2R1bGVzIChtb2R1bGVzUGFyYW1zKSB7XG4gICAgaWYgKCBtb2R1bGVzUGFyYW1zID09PSB2b2lkIDAgKSBtb2R1bGVzUGFyYW1zID0ge307XG5cbiAgdmFyIGluc3RhbmNlID0gdGhpcztcbiAgaWYgKCFpbnN0YW5jZS5tb2R1bGVzKSB7IHJldHVybjsgfVxuICBPYmplY3Qua2V5cyhpbnN0YW5jZS5tb2R1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVOYW1lKSB7XG4gICAgdmFyIG1vZHVsZSA9IGluc3RhbmNlLm1vZHVsZXNbbW9kdWxlTmFtZV07XG4gICAgdmFyIG1vZHVsZVBhcmFtcyA9IG1vZHVsZXNQYXJhbXNbbW9kdWxlTmFtZV0gfHwge307XG4gICAgLy8gRXh0ZW5kIGluc3RhbmNlIG1ldGhvZHMgYW5kIHByb3BzXG4gICAgaWYgKG1vZHVsZS5pbnN0YW5jZSkge1xuICAgICAgT2JqZWN0LmtleXMobW9kdWxlLmluc3RhbmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVQcm9wTmFtZSkge1xuICAgICAgICB2YXIgbW9kdWxlUHJvcCA9IG1vZHVsZS5pbnN0YW5jZVttb2R1bGVQcm9wTmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgbW9kdWxlUHJvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGluc3RhbmNlW21vZHVsZVByb3BOYW1lXSA9IG1vZHVsZVByb3AuYmluZChpbnN0YW5jZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2VbbW9kdWxlUHJvcE5hbWVdID0gbW9kdWxlUHJvcDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICBpZiAobW9kdWxlLm9uICYmIGluc3RhbmNlLm9uKSB7XG4gICAgICBPYmplY3Qua2V5cyhtb2R1bGUub24pLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUV2ZW50TmFtZSkge1xuICAgICAgICBpbnN0YW5jZS5vbihtb2R1bGVFdmVudE5hbWUsIG1vZHVsZS5vblttb2R1bGVFdmVudE5hbWVdKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE1vZHVsZSBjcmVhdGUgY2FsbGJhY2tcbiAgICBpZiAobW9kdWxlLmNyZWF0ZSkge1xuICAgICAgbW9kdWxlLmNyZWF0ZS5iaW5kKGluc3RhbmNlKShtb2R1bGVQYXJhbXMpO1xuICAgIH1cbiAgfSk7XG59O1xuc3RhdGljQWNjZXNzb3JzLmNvbXBvbmVudHMuc2V0ID0gZnVuY3Rpb24gKGNvbXBvbmVudHMpIHtcbiAgdmFyIENsYXNzID0gdGhpcztcbiAgaWYgKCFDbGFzcy51c2UpIHsgcmV0dXJuOyB9XG4gIENsYXNzLnVzZShjb21wb25lbnRzKTtcbn07XG5Td2lwZXJDbGFzcy5pbnN0YWxsTW9kdWxlID0gZnVuY3Rpb24gaW5zdGFsbE1vZHVsZSAobW9kdWxlKSB7XG4gICAgdmFyIHBhcmFtcyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoIGxlbi0tID4gMCApIHBhcmFtc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICB2YXIgQ2xhc3MgPSB0aGlzO1xuICBpZiAoIUNsYXNzLnByb3RvdHlwZS5tb2R1bGVzKSB7IENsYXNzLnByb3RvdHlwZS5tb2R1bGVzID0ge307IH1cbiAgdmFyIG5hbWUgPSBtb2R1bGUubmFtZSB8fCAoKChPYmplY3Qua2V5cyhDbGFzcy5wcm90b3R5cGUubW9kdWxlcykubGVuZ3RoKSArIFwiX1wiICsgKFV0aWxzLm5vdygpKSkpO1xuICBDbGFzcy5wcm90b3R5cGUubW9kdWxlc1tuYW1lXSA9IG1vZHVsZTtcbiAgLy8gUHJvdG90eXBlXG4gIGlmIChtb2R1bGUucHJvdG8pIHtcbiAgICBPYmplY3Qua2V5cyhtb2R1bGUucHJvdG8pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgQ2xhc3MucHJvdG90eXBlW2tleV0gPSBtb2R1bGUucHJvdG9ba2V5XTtcbiAgICB9KTtcbiAgfVxuICAvLyBDbGFzc1xuICBpZiAobW9kdWxlLnN0YXRpYykge1xuICAgIE9iamVjdC5rZXlzKG1vZHVsZS5zdGF0aWMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgQ2xhc3Nba2V5XSA9IG1vZHVsZS5zdGF0aWNba2V5XTtcbiAgICB9KTtcbiAgfVxuICAvLyBDYWxsYmFja1xuICBpZiAobW9kdWxlLmluc3RhbGwpIHtcbiAgICBtb2R1bGUuaW5zdGFsbC5hcHBseShDbGFzcywgcGFyYW1zKTtcbiAgfVxuICByZXR1cm4gQ2xhc3M7XG59O1xuU3dpcGVyQ2xhc3MudXNlID0gZnVuY3Rpb24gdXNlIChtb2R1bGUpIHtcbiAgICB2YXIgcGFyYW1zID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHdoaWxlICggbGVuLS0gPiAwICkgcGFyYW1zWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gIHZhciBDbGFzcyA9IHRoaXM7XG4gIGlmIChBcnJheS5pc0FycmF5KG1vZHVsZSkpIHtcbiAgICBtb2R1bGUuZm9yRWFjaChmdW5jdGlvbiAobSkgeyByZXR1cm4gQ2xhc3MuaW5zdGFsbE1vZHVsZShtKTsgfSk7XG4gICAgcmV0dXJuIENsYXNzO1xuICB9XG4gIHJldHVybiBDbGFzcy5pbnN0YWxsTW9kdWxlLmFwcGx5KENsYXNzLCBbIG1vZHVsZSBdLmNvbmNhdCggcGFyYW1zICkpO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFN3aXBlckNsYXNzLCBzdGF0aWNBY2Nlc3NvcnMgKTtcblxudmFyIHVwZGF0ZVNpemUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgd2lkdGg7XG4gIHZhciBoZWlnaHQ7XG4gIHZhciAkZWwgPSBzd2lwZXIuJGVsO1xuICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMud2lkdGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2lkdGggPSBzd2lwZXIucGFyYW1zLndpZHRoO1xuICB9IGVsc2Uge1xuICAgIHdpZHRoID0gJGVsWzBdLmNsaWVudFdpZHRoO1xuICB9XG4gIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcy5oZWlnaHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGVpZ2h0ID0gc3dpcGVyLnBhcmFtcy5oZWlnaHQ7XG4gIH0gZWxzZSB7XG4gICAgaGVpZ2h0ID0gJGVsWzBdLmNsaWVudEhlaWdodDtcbiAgfVxuICBpZiAoKHdpZHRoID09PSAwICYmIHN3aXBlci5pc0hvcml6b250YWwoKSkgfHwgKGhlaWdodCA9PT0gMCAmJiBzd2lwZXIuaXNWZXJ0aWNhbCgpKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFN1YnRyYWN0IHBhZGRpbmdzXG4gIHdpZHRoID0gd2lkdGggLSBwYXJzZUludCgkZWwuY3NzKCdwYWRkaW5nLWxlZnQnKSwgMTApIC0gcGFyc2VJbnQoJGVsLmNzcygncGFkZGluZy1yaWdodCcpLCAxMCk7XG4gIGhlaWdodCA9IGhlaWdodCAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctdG9wJyksIDEwKSAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctYm90dG9tJyksIDEwKTtcblxuICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHNpemU6IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHdpZHRoIDogaGVpZ2h0LFxuICB9KTtcbn07XG5cbnZhciB1cGRhdGVTbGlkZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcblxuICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICB2YXIgc3dpcGVyU2l6ZSA9IHN3aXBlci5zaXplO1xuICB2YXIgcnRsID0gc3dpcGVyLnJ0bDtcbiAgdmFyIHdyb25nUlRMID0gc3dpcGVyLndyb25nUlRMO1xuICB2YXIgc2xpZGVzID0gJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSkpO1xuICB2YXIgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgdmFyIHNsaWRlc0xlbmd0aCA9IGlzVmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzbGlkZXMubGVuZ3RoO1xuICB2YXIgc25hcEdyaWQgPSBbXTtcbiAgdmFyIHNsaWRlc0dyaWQgPSBbXTtcbiAgdmFyIHNsaWRlc1NpemVzR3JpZCA9IFtdO1xuXG4gIHZhciBvZmZzZXRCZWZvcmUgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlO1xuICBpZiAodHlwZW9mIG9mZnNldEJlZm9yZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmUuY2FsbChzd2lwZXIpO1xuICB9XG5cbiAgdmFyIG9mZnNldEFmdGVyID0gcGFyYW1zLnNsaWRlc09mZnNldEFmdGVyO1xuICBpZiAodHlwZW9mIG9mZnNldEFmdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb2Zmc2V0QWZ0ZXIgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXIuY2FsbChzd2lwZXIpO1xuICB9XG5cbiAgdmFyIHByZXZpb3VzU2xpZGVzTGVuZ3RoID0gc2xpZGVzTGVuZ3RoO1xuICB2YXIgcHJldmlvdXNTbmFwR3JpZExlbmd0aCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG4gIHZhciBwcmV2aW91c1NsaWRlc0dyaWRMZW5ndGggPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuXG4gIHZhciBzcGFjZUJldHdlZW4gPSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICB2YXIgc2xpZGVQb3NpdGlvbiA9IC1vZmZzZXRCZWZvcmU7XG4gIHZhciBwcmV2U2xpZGVTaXplID0gMDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgaWYgKHR5cGVvZiBzd2lwZXJTaXplID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gJ3N0cmluZycgJiYgc3BhY2VCZXR3ZWVuLmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gKHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuLnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwKSAqIHN3aXBlclNpemU7XG4gIH1cblxuICBzd2lwZXIudmlydHVhbFNpemUgPSAtc3BhY2VCZXR3ZWVuO1xuXG4gIC8vIHJlc2V0IG1hcmdpbnNcbiAgaWYgKHJ0bCkgeyBzbGlkZXMuY3NzKHsgbWFyZ2luTGVmdDogJycsIG1hcmdpblRvcDogJycgfSk7IH1cbiAgZWxzZSB7IHNsaWRlcy5jc3MoeyBtYXJnaW5SaWdodDogJycsIG1hcmdpbkJvdHRvbTogJycgfSk7IH1cblxuICB2YXIgc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgaWYgKE1hdGguZmxvb3Ioc2xpZGVzTGVuZ3RoIC8gcGFyYW1zLnNsaWRlc1BlckNvbHVtbikgPT09IHNsaWRlc0xlbmd0aCAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSB7XG4gICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gc2xpZGVzTGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gTWF0aC5jZWlsKHNsaWRlc0xlbmd0aCAvIHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pICogcGFyYW1zLnNsaWRlc1BlckNvbHVtbjtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgcGFyYW1zLnNsaWRlc1BlckNvbHVtbkZpbGwgPT09ICdyb3cnKSB7XG4gICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gTWF0aC5tYXgoc2xpZGVzTnVtYmVyRXZlblRvUm93cywgcGFyYW1zLnNsaWRlc1BlclZpZXcgKiBwYXJhbXMuc2xpZGVzUGVyQ29sdW1uKTtcbiAgICB9XG4gIH1cblxuICAvLyBDYWxjIHNsaWRlc1xuICB2YXIgc2xpZGVTaXplO1xuICB2YXIgc2xpZGVzUGVyQ29sdW1uID0gcGFyYW1zLnNsaWRlc1BlckNvbHVtbjtcbiAgdmFyIHNsaWRlc1BlclJvdyA9IHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgLyBzbGlkZXNQZXJDb2x1bW47XG4gIHZhciBudW1GdWxsQ29sdW1ucyA9IHNsaWRlc1BlclJvdyAtICgocGFyYW1zLnNsaWRlc1BlckNvbHVtbiAqIHNsaWRlc1BlclJvdykgLSBzbGlkZXNMZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlc0xlbmd0aDsgaSArPSAxKSB7XG4gICAgc2xpZGVTaXplID0gMDtcbiAgICB2YXIgc2xpZGUgPSBzbGlkZXMuZXEoaSk7XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgICAvLyBTZXQgc2xpZGVzIG9yZGVyXG4gICAgICB2YXIgbmV3U2xpZGVPcmRlckluZGV4ID0gKHZvaWQgMCk7XG4gICAgICB2YXIgY29sdW1uID0gKHZvaWQgMCk7XG4gICAgICB2YXIgcm93ID0gKHZvaWQgMCk7XG4gICAgICBpZiAocGFyYW1zLnNsaWRlc1BlckNvbHVtbkZpbGwgPT09ICdjb2x1bW4nKSB7XG4gICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoaSAvIHNsaWRlc1BlckNvbHVtbik7XG4gICAgICAgIHJvdyA9IGkgLSAoY29sdW1uICogc2xpZGVzUGVyQ29sdW1uKTtcbiAgICAgICAgaWYgKGNvbHVtbiA+IG51bUZ1bGxDb2x1bW5zIHx8IChjb2x1bW4gPT09IG51bUZ1bGxDb2x1bW5zICYmIHJvdyA9PT0gc2xpZGVzUGVyQ29sdW1uIC0gMSkpIHtcbiAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgICBpZiAocm93ID49IHNsaWRlc1BlckNvbHVtbikge1xuICAgICAgICAgICAgcm93ID0gMDtcbiAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBuZXdTbGlkZU9yZGVySW5kZXggPSBjb2x1bW4gKyAoKHJvdyAqIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MpIC8gc2xpZGVzUGVyQ29sdW1uKTtcbiAgICAgICAgc2xpZGVcbiAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICctd2Via2l0LWJveC1vcmRpbmFsLWdyb3VwJzogbmV3U2xpZGVPcmRlckluZGV4LFxuICAgICAgICAgICAgJy1tb3otYm94LW9yZGluYWwtZ3JvdXAnOiBuZXdTbGlkZU9yZGVySW5kZXgsXG4gICAgICAgICAgICAnLW1zLWZsZXgtb3JkZXInOiBuZXdTbGlkZU9yZGVySW5kZXgsXG4gICAgICAgICAgICAnLXdlYmtpdC1vcmRlcic6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgIG9yZGVyOiBuZXdTbGlkZU9yZGVySW5kZXgsXG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3cgPSBNYXRoLmZsb29yKGkgLyBzbGlkZXNQZXJSb3cpO1xuICAgICAgICBjb2x1bW4gPSBpIC0gKHJvdyAqIHNsaWRlc1BlclJvdyk7XG4gICAgICB9XG4gICAgICBzbGlkZVxuICAgICAgICAuY3NzKFxuICAgICAgICAgIChcIm1hcmdpbi1cIiArIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAndG9wJyA6ICdsZWZ0JykpLFxuICAgICAgICAgIChyb3cgIT09IDAgJiYgcGFyYW1zLnNwYWNlQmV0d2VlbikgJiYgKCgocGFyYW1zLnNwYWNlQmV0d2VlbikgKyBcInB4XCIpKVxuICAgICAgICApXG4gICAgICAgIC5hdHRyKCdkYXRhLXN3aXBlci1jb2x1bW4nLCBjb2x1bW4pXG4gICAgICAgIC5hdHRyKCdkYXRhLXN3aXBlci1yb3cnLCByb3cpO1xuICAgIH1cbiAgICBpZiAoc2xpZGUuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICAgIHNsaWRlU2l6ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHNsaWRlLm91dGVyV2lkdGgodHJ1ZSkgOiBzbGlkZS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7IHNsaWRlU2l6ZSA9IE1hdGguZmxvb3Ioc2xpZGVTaXplKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZVNpemUgPSAoc3dpcGVyU2l6ZSAtICgocGFyYW1zLnNsaWRlc1BlclZpZXcgLSAxKSAqIHNwYWNlQmV0d2VlbikpIC8gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3RocykgeyBzbGlkZVNpemUgPSBNYXRoLmZsb29yKHNsaWRlU2l6ZSk7IH1cblxuICAgICAgaWYgKHNsaWRlc1tpXSkge1xuICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gc2xpZGVTaXplICsgXCJweFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlc1tpXS5zdHlsZS5oZWlnaHQgPSBzbGlkZVNpemUgKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNsaWRlc1tpXSkge1xuICAgICAgc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICB9XG4gICAgc2xpZGVzU2l6ZXNHcmlkLnB1c2goc2xpZGVTaXplKTtcblxuXG4gICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyAoc2xpZGVTaXplIC8gMikgKyAocHJldlNsaWRlU2l6ZSAvIDIpICsgc3BhY2VCZXR3ZWVuO1xuICAgICAgaWYgKHByZXZTbGlkZVNpemUgPT09IDAgJiYgaSAhPT0gMCkgeyBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiAtIChzd2lwZXJTaXplIC8gMikgLSBzcGFjZUJldHdlZW47IH1cbiAgICAgIGlmIChpID09PSAwKSB7IHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gKHN3aXBlclNpemUgLyAyKSAtIHNwYWNlQmV0d2VlbjsgfVxuICAgICAgaWYgKE1hdGguYWJzKHNsaWRlUG9zaXRpb24pIDwgMSAvIDEwMDApIHsgc2xpZGVQb3NpdGlvbiA9IDA7IH1cbiAgICAgIGlmICgoaW5kZXgpICUgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSB7IHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7IH1cbiAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKChpbmRleCkgJSBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHsgc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTsgfVxuICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgKyBzcGFjZUJldHdlZW47XG4gICAgfVxuXG4gICAgc3dpcGVyLnZpcnR1YWxTaXplICs9IHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcblxuICAgIHByZXZTbGlkZVNpemUgPSBzbGlkZVNpemU7XG5cbiAgICBpbmRleCArPSAxO1xuICB9XG4gIHN3aXBlci52aXJ0dWFsU2l6ZSA9IE1hdGgubWF4KHN3aXBlci52aXJ0dWFsU2l6ZSwgc3dpcGVyU2l6ZSkgKyBvZmZzZXRBZnRlcjtcbiAgdmFyIG5ld1NsaWRlc0dyaWQ7XG5cbiAgaWYgKFxuICAgIHJ0bCAmJiB3cm9uZ1JUTCAmJiAocGFyYW1zLmVmZmVjdCA9PT0gJ3NsaWRlJyB8fCBwYXJhbXMuZWZmZWN0ID09PSAnY292ZXJmbG93JykpIHtcbiAgICAkd3JhcHBlckVsLmNzcyh7IHdpZHRoOiAoKHN3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICsgXCJweFwiKSB9KTtcbiAgfVxuICBpZiAoIVN1cHBvcnQuZmxleGJveCB8fCBwYXJhbXMuc2V0V3JhcHBlclNpemUpIHtcbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7ICR3cmFwcGVyRWwuY3NzKHsgd2lkdGg6ICgoc3dpcGVyLnZpcnR1YWxTaXplICsgcGFyYW1zLnNwYWNlQmV0d2VlbikgKyBcInB4XCIpIH0pOyB9XG4gICAgZWxzZSB7ICR3cmFwcGVyRWwuY3NzKHsgaGVpZ2h0OiAoKHN3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICsgXCJweFwiKSB9KTsgfVxuICB9XG5cbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgc3dpcGVyLnZpcnR1YWxTaXplID0gKHNsaWRlU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICogc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgICBzd2lwZXIudmlydHVhbFNpemUgPSBNYXRoLmNlaWwoc3dpcGVyLnZpcnR1YWxTaXplIC8gcGFyYW1zLnNsaWRlc1BlckNvbHVtbikgLSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHsgJHdyYXBwZXJFbC5jc3MoeyB3aWR0aDogKChzd2lwZXIudmlydHVhbFNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKSArIFwicHhcIikgfSk7IH1cbiAgICBlbHNlIHsgJHdyYXBwZXJFbC5jc3MoeyBoZWlnaHQ6ICgoc3dpcGVyLnZpcnR1YWxTaXplICsgcGFyYW1zLnNwYWNlQmV0d2VlbikgKyBcInB4XCIpIH0pOyB9XG4gICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgbmV3U2xpZGVzR3JpZCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgc25hcEdyaWQubGVuZ3RoOyBpJDEgKz0gMSkge1xuICAgICAgICBpZiAoc25hcEdyaWRbaSQxXSA8IHN3aXBlci52aXJ0dWFsU2l6ZSArIHNuYXBHcmlkWzBdKSB7IG5ld1NsaWRlc0dyaWQucHVzaChzbmFwR3JpZFtpJDFdKTsgfVxuICAgICAgfVxuICAgICAgc25hcEdyaWQgPSBuZXdTbGlkZXNHcmlkO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZSBsYXN0IGdyaWQgZWxlbWVudHMgZGVwZW5kaW5nIG9uIHdpZHRoXG4gIGlmICghcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgbmV3U2xpZGVzR3JpZCA9IFtdO1xuICAgIGZvciAodmFyIGkkMiA9IDA7IGkkMiA8IHNuYXBHcmlkLmxlbmd0aDsgaSQyICs9IDEpIHtcbiAgICAgIGlmIChzbmFwR3JpZFtpJDJdIDw9IHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIHtcbiAgICAgICAgbmV3U2xpZGVzR3JpZC5wdXNoKHNuYXBHcmlkW2kkMl0pO1xuICAgICAgfVxuICAgIH1cbiAgICBzbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XG4gICAgaWYgKE1hdGguZmxvb3Ioc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSkgLSBNYXRoLmZsb29yKHNuYXBHcmlkW3NuYXBHcmlkLmxlbmd0aCAtIDFdKSA+IDEpIHtcbiAgICAgIHNuYXBHcmlkLnB1c2goc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSk7XG4gICAgfVxuICB9XG4gIGlmIChzbmFwR3JpZC5sZW5ndGggPT09IDApIHsgc25hcEdyaWQgPSBbMF07IH1cblxuICBpZiAocGFyYW1zLnNwYWNlQmV0d2VlbiAhPT0gMCkge1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIGlmIChydGwpIHsgc2xpZGVzLmNzcyh7IG1hcmdpbkxlZnQ6IChzcGFjZUJldHdlZW4gKyBcInB4XCIpIH0pOyB9XG4gICAgICBlbHNlIHsgc2xpZGVzLmNzcyh7IG1hcmdpblJpZ2h0OiAoc3BhY2VCZXR3ZWVuICsgXCJweFwiKSB9KTsgfVxuICAgIH0gZWxzZSB7IHNsaWRlcy5jc3MoeyBtYXJnaW5Cb3R0b206IChzcGFjZUJldHdlZW4gKyBcInB4XCIpIH0pOyB9XG4gIH1cblxuICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgc2xpZGVzOiBzbGlkZXMsXG4gICAgc25hcEdyaWQ6IHNuYXBHcmlkLFxuICAgIHNsaWRlc0dyaWQ6IHNsaWRlc0dyaWQsXG4gICAgc2xpZGVzU2l6ZXNHcmlkOiBzbGlkZXNTaXplc0dyaWQsXG4gIH0pO1xuXG4gIGlmIChzbGlkZXNMZW5ndGggIT09IHByZXZpb3VzU2xpZGVzTGVuZ3RoKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3NsaWRlc0xlbmd0aENoYW5nZScpO1xuICB9XG4gIGlmIChzbmFwR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU25hcEdyaWRMZW5ndGgpIHtcbiAgICBzd2lwZXIuZW1pdCgnc25hcEdyaWRMZW5ndGhDaGFuZ2UnKTtcbiAgfVxuICBpZiAoc2xpZGVzR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCkge1xuICAgIHN3aXBlci5lbWl0KCdzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJyk7XG4gIH1cblxuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgfVxufTtcblxudmFyIHVwZGF0ZUF1dG9IZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgYWN0aXZlU2xpZGVzID0gW107XG4gIHZhciBuZXdIZWlnaHQgPSAwO1xuICB2YXIgaTtcblxuICAvLyBGaW5kIHNsaWRlcyBjdXJyZW50bHkgaW4gdmlld1xuICBpZiAoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTsgaSArPSAxKSB7XG4gICAgICB2YXIgaW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggKyBpO1xuICAgICAgaWYgKGluZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGgpIHsgYnJlYWs7IH1cbiAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpWzBdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWN0aXZlU2xpZGVzLnB1c2goc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpWzBdKTtcbiAgfVxuXG4gIC8vIEZpbmQgbmV3IGhlaWdodCBmcm9tIGhpZ2hlc3Qgc2xpZGUgaW4gdmlld1xuICBmb3IgKGkgPSAwOyBpIDwgYWN0aXZlU2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHR5cGVvZiBhY3RpdmVTbGlkZXNbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgaGVpZ2h0ID0gYWN0aXZlU2xpZGVzW2ldLm9mZnNldEhlaWdodDtcbiAgICAgIG5ld0hlaWdodCA9IGhlaWdodCA+IG5ld0hlaWdodCA/IGhlaWdodCA6IG5ld0hlaWdodDtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgSGVpZ2h0XG4gIGlmIChuZXdIZWlnaHQpIHsgc3dpcGVyLiR3cmFwcGVyRWwuY3NzKCdoZWlnaHQnLCAobmV3SGVpZ2h0ICsgXCJweFwiKSk7IH1cbn07XG5cbnZhciB1cGRhdGVTbGlkZXNPZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZXNbaV0uc3dpcGVyU2xpZGVPZmZzZXQgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzbGlkZXNbaV0ub2Zmc2V0TGVmdCA6IHNsaWRlc1tpXS5vZmZzZXRUb3A7XG4gIH1cbn07XG5cbnZhciB1cGRhdGVTbGlkZXNQcm9ncmVzcyA9IGZ1bmN0aW9uICh0cmFuc2xhdGUpIHtcbiAgaWYgKCB0cmFuc2xhdGUgPT09IHZvaWQgMCApIHRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlIHx8IDA7XG5cbiAgdmFyIHN3aXBlciA9IHRoaXM7XG4gIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuXG4gIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICB2YXIgcnRsID0gc3dpcGVyLnJ0bDtcblxuICBpZiAoc2xpZGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgaWYgKHR5cGVvZiBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQgPT09ICd1bmRlZmluZWQnKSB7IHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTsgfVxuXG4gIHZhciBvZmZzZXRDZW50ZXIgPSAtdHJhbnNsYXRlO1xuICBpZiAocnRsKSB7IG9mZnNldENlbnRlciA9IHRyYW5zbGF0ZTsgfVxuXG4gIC8vIFZpc2libGUgU2xpZGVzXG4gIHNsaWRlcy5yZW1vdmVDbGFzcyhwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmFyIHNsaWRlID0gc2xpZGVzW2ldO1xuICAgIHZhciBzbGlkZVByb2dyZXNzID1cbiAgICAgIChcbiAgICAgICAgKG9mZnNldENlbnRlciArIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiAwKSkgLSBzbGlkZS5zd2lwZXJTbGlkZU9mZnNldFxuICAgICAgKSAvIChzbGlkZS5zd2lwZXJTbGlkZVNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKTtcbiAgICBpZiAocGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkge1xuICAgICAgdmFyIHNsaWRlQmVmb3JlID0gLShvZmZzZXRDZW50ZXIgLSBzbGlkZS5zd2lwZXJTbGlkZU9mZnNldCk7XG4gICAgICB2YXIgc2xpZGVBZnRlciA9IHNsaWRlQmVmb3JlICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICAgIHZhciBpc1Zpc2libGUgPVxuICAgICAgICAgICAgICAgIChzbGlkZUJlZm9yZSA+PSAwICYmIHNsaWRlQmVmb3JlIDwgc3dpcGVyLnNpemUpIHx8XG4gICAgICAgICAgICAgICAgKHNsaWRlQWZ0ZXIgPiAwICYmIHNsaWRlQWZ0ZXIgPD0gc3dpcGVyLnNpemUpIHx8XG4gICAgICAgICAgICAgICAgKHNsaWRlQmVmb3JlIDw9IDAgJiYgc2xpZGVBZnRlciA+PSBzd2lwZXIuc2l6ZSk7XG4gICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgIHNsaWRlcy5lcShpKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBzbGlkZS5wcm9ncmVzcyA9IHJ0bCA/IC1zbGlkZVByb2dyZXNzIDogc2xpZGVQcm9ncmVzcztcbiAgfVxufTtcblxudmFyIHVwZGF0ZVByb2dyZXNzID0gZnVuY3Rpb24gKHRyYW5zbGF0ZSkge1xuICBpZiAoIHRyYW5zbGF0ZSA9PT0gdm9pZCAwICkgdHJhbnNsYXRlID0gdGhpcy50cmFuc2xhdGUgfHwgMDtcblxuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG5cbiAgdmFyIHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICB2YXIgcHJvZ3Jlc3MgPSBzd2lwZXIucHJvZ3Jlc3M7XG4gIHZhciBpc0JlZ2lubmluZyA9IHN3aXBlci5pc0JlZ2lubmluZztcbiAgdmFyIGlzRW5kID0gc3dpcGVyLmlzRW5kO1xuICB2YXIgd2FzQmVnaW5uaW5nID0gaXNCZWdpbm5pbmc7XG4gIHZhciB3YXNFbmQgPSBpc0VuZDtcbiAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgcHJvZ3Jlc3MgPSAwO1xuICAgIGlzQmVnaW5uaW5nID0gdHJ1ZTtcbiAgICBpc0VuZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcHJvZ3Jlc3MgPSAodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvICh0cmFuc2xhdGVzRGlmZik7XG4gICAgaXNCZWdpbm5pbmcgPSBwcm9ncmVzcyA8PSAwO1xuICAgIGlzRW5kID0gcHJvZ3Jlc3MgPj0gMTtcbiAgfVxuICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgIGlzQmVnaW5uaW5nOiBpc0JlZ2lubmluZyxcbiAgICBpc0VuZDogaXNFbmQsXG4gIH0pO1xuXG4gIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyB8fCBwYXJhbXMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KSB7IHN3aXBlci51cGRhdGVTbGlkZXNQcm9ncmVzcyh0cmFuc2xhdGUpOyB9XG5cbiAgaWYgKGlzQmVnaW5uaW5nICYmICF3YXNCZWdpbm5pbmcpIHtcbiAgICBzd2lwZXIuZW1pdCgncmVhY2hCZWdpbm5pbmcgdG9FZGdlJyk7XG4gIH1cbiAgaWYgKGlzRW5kICYmICF3YXNFbmQpIHtcbiAgICBzd2lwZXIuZW1pdCgncmVhY2hFbmQgdG9FZGdlJyk7XG4gIH1cbiAgaWYgKCh3YXNCZWdpbm5pbmcgJiYgIWlzQmVnaW5uaW5nKSB8fCAod2FzRW5kICYmICFpc0VuZCkpIHtcbiAgICBzd2lwZXIuZW1pdCgnZnJvbUVkZ2UnKTtcbiAgfVxuXG4gIHN3aXBlci5lbWl0KCdwcm9ncmVzcycsIHByb2dyZXNzKTtcbn07XG5cbnZhciB1cGRhdGVTbGlkZXNDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcblxuICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgdmFyIHJlYWxJbmRleCA9IHN3aXBlci5yZWFsSW5kZXg7XG4gIHZhciBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuXG4gIHNsaWRlcy5yZW1vdmVDbGFzcygoKHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5zbGlkZU5leHRDbGFzcykgKyBcIiBcIiArIChwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpICsgXCIgXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpICsgXCIgXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcykpKTtcblxuICB2YXIgYWN0aXZlU2xpZGU7XG4gIGlmIChpc1ZpcnR1YWwpIHtcbiAgICBhY3RpdmVTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmZpbmQoKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIGFjdGl2ZUluZGV4ICsgXCJcXFwiXVwiKSk7XG4gIH0gZWxzZSB7XG4gICAgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZXEoYWN0aXZlSW5kZXgpO1xuICB9XG5cbiAgLy8gQWN0aXZlIGNsYXNzZXNcbiAgYWN0aXZlU2xpZGUuYWRkQ2xhc3MocGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpO1xuXG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgIGlmIChhY3RpdmVTbGlkZS5oYXNDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICR3cmFwcGVyRWxcbiAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIjpub3QoLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyByZWFsSW5kZXggKyBcIlxcXCJdXCIpKVxuICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkd3JhcHBlckVsXG4gICAgICAgIC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCIuXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgcmVhbEluZGV4ICsgXCJcXFwiXVwiKSlcbiAgICAgICAgLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKTtcbiAgICB9XG4gIH1cbiAgLy8gTmV4dCBTbGlkZVxuICB2YXIgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dEFsbCgoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpKSkuZXEoMCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgaWYgKHBhcmFtcy5sb29wICYmIG5leHRTbGlkZS5sZW5ndGggPT09IDApIHtcbiAgICBuZXh0U2xpZGUgPSBzbGlkZXMuZXEoMCk7XG4gICAgbmV4dFNsaWRlLmFkZENsYXNzKHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gIH1cbiAgLy8gUHJldiBTbGlkZVxuICB2YXIgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldkFsbCgoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpKSkuZXEoMCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgaWYgKHBhcmFtcy5sb29wICYmIHByZXZTbGlkZS5sZW5ndGggPT09IDApIHtcbiAgICBwcmV2U2xpZGUgPSBzbGlkZXMuZXEoLTEpO1xuICAgIHByZXZTbGlkZS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgIGlmIChuZXh0U2xpZGUuaGFzQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAkd3JhcHBlckVsXG4gICAgICAgIC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCI6bm90KC5cIiArIChwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykgKyBcIilbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgKG5leHRTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpKSArIFwiXFxcIl1cIikpXG4gICAgICAgIC5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkd3JhcHBlckVsXG4gICAgICAgIC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCIuXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgKG5leHRTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpKSArIFwiXFxcIl1cIikpXG4gICAgICAgIC5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MpO1xuICAgIH1cbiAgICBpZiAocHJldlNsaWRlLmhhc0NsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgJHdyYXBwZXJFbFxuICAgICAgICAuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiOm5vdCguXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCIpW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIChwcmV2U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgKyBcIlxcXCJdXCIpKVxuICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHdyYXBwZXJFbFxuICAgICAgICAuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIChwcmV2U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgKyBcIlxcXCJdXCIpKVxuICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciB1cGRhdGVBY3RpdmVJbmRleCA9IGZ1bmN0aW9uIChuZXdBY3RpdmVJbmRleCkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyIHRyYW5zbGF0ZSA9IHN3aXBlci5ydGwgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIHZhciBzbGlkZXNHcmlkID0gc3dpcGVyLnNsaWRlc0dyaWQ7XG4gIHZhciBzbmFwR3JpZCA9IHN3aXBlci5zbmFwR3JpZDtcbiAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIHZhciBwcmV2aW91c0luZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICB2YXIgcHJldmlvdXNSZWFsSW5kZXggPSBzd2lwZXIucmVhbEluZGV4O1xuICB2YXIgcHJldmlvdXNTbmFwSW5kZXggPSBzd2lwZXIuc25hcEluZGV4O1xuICB2YXIgYWN0aXZlSW5kZXggPSBuZXdBY3RpdmVJbmRleDtcbiAgdmFyIHNuYXBJbmRleDtcbiAgaWYgKHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgMV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSAtICgoc2xpZGVzR3JpZFtpICsgMV0gLSBzbGlkZXNHcmlkW2ldKSAvIDIpKSB7XG4gICAgICAgICAgYWN0aXZlSW5kZXggPSBpO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZSA+PSBzbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZSA8IHNsaWRlc0dyaWRbaSArIDFdKSB7XG4gICAgICAgICAgYWN0aXZlSW5kZXggPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG4gICAgaWYgKHBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KSB7XG4gICAgICBpZiAoYWN0aXZlSW5kZXggPCAwIHx8IHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHsgYWN0aXZlSW5kZXggPSAwOyB9XG4gICAgfVxuICB9XG4gIGlmIChzbmFwR3JpZC5pbmRleE9mKHRyYW5zbGF0ZSkgPj0gMCkge1xuICAgIHNuYXBJbmRleCA9IHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlKTtcbiAgfSBlbHNlIHtcbiAgICBzbmFwSW5kZXggPSBNYXRoLmZsb29yKGFjdGl2ZUluZGV4IC8gcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgfVxuICBpZiAoc25hcEluZGV4ID49IHNuYXBHcmlkLmxlbmd0aCkgeyBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxOyB9XG4gIGlmIChhY3RpdmVJbmRleCA9PT0gcHJldmlvdXNJbmRleCkge1xuICAgIGlmIChzbmFwSW5kZXggIT09IHByZXZpb3VzU25hcEluZGV4KSB7XG4gICAgICBzd2lwZXIuc25hcEluZGV4ID0gc25hcEluZGV4O1xuICAgICAgc3dpcGVyLmVtaXQoJ3NuYXBJbmRleENoYW5nZScpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgcmVhbCBpbmRleFxuICB2YXIgcmVhbEluZGV4ID0gcGFyc2VJbnQoc3dpcGVyLnNsaWRlcy5lcShhY3RpdmVJbmRleCkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSB8fCBhY3RpdmVJbmRleCwgMTApO1xuXG4gIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICBzbmFwSW5kZXg6IHNuYXBJbmRleCxcbiAgICByZWFsSW5kZXg6IHJlYWxJbmRleCxcbiAgICBwcmV2aW91c0luZGV4OiBwcmV2aW91c0luZGV4LFxuICAgIGFjdGl2ZUluZGV4OiBhY3RpdmVJbmRleCxcbiAgfSk7XG4gIHN3aXBlci5lbWl0KCdhY3RpdmVJbmRleENoYW5nZScpO1xuICBzd2lwZXIuZW1pdCgnc25hcEluZGV4Q2hhbmdlJyk7XG4gIGlmIChwcmV2aW91c1JlYWxJbmRleCAhPT0gcmVhbEluZGV4KSB7XG4gICAgc3dpcGVyLmVtaXQoJ3JlYWxJbmRleENoYW5nZScpO1xuICB9XG4gIHN3aXBlci5lbWl0KCdzbGlkZUNoYW5nZScpO1xufTtcblxudmFyIHVwZGF0ZUNsaWNrZWRTbGlkZSA9IGZ1bmN0aW9uIChlKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIHNsaWRlID0gJCQxKGUudGFyZ2V0KS5jbG9zZXN0KChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykpKVswXTtcbiAgdmFyIHNsaWRlRm91bmQgPSBmYWxzZTtcbiAgaWYgKHNsaWRlKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpXSA9PT0gc2xpZGUpIHsgc2xpZGVGb3VuZCA9IHRydWU7IH1cbiAgICB9XG4gIH1cblxuICBpZiAoc2xpZGUgJiYgc2xpZGVGb3VuZCkge1xuICAgIHN3aXBlci5jbGlja2VkU2xpZGUgPSBzbGlkZTtcbiAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSBwYXJzZUludCgkJDEoc2xpZGUpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9ICQkMShzbGlkZSkuaW5kZXgoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLmNsaWNrZWRTbGlkZSA9IHVuZGVmaW5lZDtcbiAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnNsaWRlVG9DbGlja2VkU2xpZGUgJiYgc3dpcGVyLmNsaWNrZWRJbmRleCAhPT0gdW5kZWZpbmVkICYmIHN3aXBlci5jbGlja2VkSW5kZXggIT09IHN3aXBlci5hY3RpdmVJbmRleCkge1xuICAgIHN3aXBlci5zbGlkZVRvQ2xpY2tlZFNsaWRlKCk7XG4gIH1cbn07XG5cbnZhciB1cGRhdGUgPSB7XG4gIHVwZGF0ZVNpemU6IHVwZGF0ZVNpemUsXG4gIHVwZGF0ZVNsaWRlczogdXBkYXRlU2xpZGVzLFxuICB1cGRhdGVBdXRvSGVpZ2h0OiB1cGRhdGVBdXRvSGVpZ2h0LFxuICB1cGRhdGVTbGlkZXNPZmZzZXQ6IHVwZGF0ZVNsaWRlc09mZnNldCxcbiAgdXBkYXRlU2xpZGVzUHJvZ3Jlc3M6IHVwZGF0ZVNsaWRlc1Byb2dyZXNzLFxuICB1cGRhdGVQcm9ncmVzczogdXBkYXRlUHJvZ3Jlc3MsXG4gIHVwZGF0ZVNsaWRlc0NsYXNzZXM6IHVwZGF0ZVNsaWRlc0NsYXNzZXMsXG4gIHVwZGF0ZUFjdGl2ZUluZGV4OiB1cGRhdGVBY3RpdmVJbmRleCxcbiAgdXBkYXRlQ2xpY2tlZFNsaWRlOiB1cGRhdGVDbGlja2VkU2xpZGUsXG59O1xuXG52YXIgZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgaWYgKCBheGlzID09PSB2b2lkIDAgKSBheGlzID0gdGhpcy5pc0hvcml6b250YWwoKSA/ICd4JyA6ICd5JztcblxuICB2YXIgc3dpcGVyID0gdGhpcztcblxuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIHJ0bCA9IHN3aXBlci5ydGw7XG4gIHZhciB0cmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuXG4gIGlmIChwYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgIHJldHVybiBydGwgPyAtdHJhbnNsYXRlIDogdHJhbnNsYXRlO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRUcmFuc2xhdGUgPSBVdGlscy5nZXRUcmFuc2xhdGUoJHdyYXBwZXJFbFswXSwgYXhpcyk7XG4gIGlmIChydGwpIHsgY3VycmVudFRyYW5zbGF0ZSA9IC1jdXJyZW50VHJhbnNsYXRlOyB9XG5cbiAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGUgfHwgMDtcbn07XG5cbnZhciBzZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiAodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpIHtcbiAgdmFyIHN3aXBlciA9IHRoaXM7XG4gIHZhciBydGwgPSBzd2lwZXIucnRsO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgdmFyIHByb2dyZXNzID0gc3dpcGVyLnByb2dyZXNzO1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcbiAgdmFyIHogPSAwO1xuXG4gIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICB4ID0gcnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgfSBlbHNlIHtcbiAgICB5ID0gdHJhbnNsYXRlO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgfVxuXG4gIGlmICghcGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcbiAgICBpZiAoU3VwcG9ydC50cmFuc2Zvcm1zM2QpIHsgJHdyYXBwZXJFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweCwgXCIgKyB6ICsgXCJweClcIikpOyB9XG4gICAgZWxzZSB7ICR3cmFwcGVyRWwudHJhbnNmb3JtKChcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiKSk7IH1cbiAgfVxuXG4gIHN3aXBlci50cmFuc2xhdGUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB4IDogeTtcblxuICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHVwZGF0ZSBwcm9ncmVzc1xuICB2YXIgbmV3UHJvZ3Jlc3M7XG4gIHZhciB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAwO1xuICB9IGVsc2Uge1xuICAgIG5ld1Byb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyAodHJhbnNsYXRlc0RpZmYpO1xuICB9XG4gIGlmIChuZXdQcm9ncmVzcyAhPT0gcHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgfVxuXG4gIHN3aXBlci5lbWl0KCdzZXRUcmFuc2xhdGUnLCBzd2lwZXIudHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xufTtcblxudmFyIG1pblRyYW5zbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICgtdGhpcy5zbmFwR3JpZFswXSk7XG59O1xuXG52YXIgbWF4VHJhbnNsYXRlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gKC10aGlzLnNuYXBHcmlkW3RoaXMuc25hcEdyaWQubGVuZ3RoIC0gMV0pO1xufTtcblxudmFyIHRyYW5zbGF0ZSA9IHtcbiAgZ2V0VHJhbnNsYXRlOiBnZXRUcmFuc2xhdGUsXG4gIHNldFRyYW5zbGF0ZTogc2V0VHJhbnNsYXRlLFxuICBtaW5UcmFuc2xhdGU6IG1pblRyYW5zbGF0ZSxcbiAgbWF4VHJhbnNsYXRlOiBtYXhUcmFuc2xhdGUsXG59O1xuXG52YXIgc2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gIHN3aXBlci4kd3JhcHBlckVsLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuXG4gIHN3aXBlci5lbWl0KCdzZXRUcmFuc2l0aW9uJywgZHVyYXRpb24sIGJ5Q29udHJvbGxlcik7XG59O1xuXG52YXIgdHJhbnNpdGlvblN0YXJ0ID0gZnVuY3Rpb24gKHJ1bkNhbGxiYWNrcykge1xuICBpZiAoIHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwICkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcblxuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNJbmRleDtcbiAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgfVxuICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvblN0YXJ0Jyk7XG5cbiAgaWYgKCFydW5DYWxsYmFja3MpIHsgcmV0dXJuOyB9XG4gIGlmIChhY3RpdmVJbmRleCAhPT0gcHJldmlvdXNJbmRleCkge1xuICAgIHN3aXBlci5lbWl0KCdzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCcpO1xuICAgIGlmIChhY3RpdmVJbmRleCA+IHByZXZpb3VzSW5kZXgpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdzbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCcpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIHRyYW5zaXRpb25FbmQkMSA9IGZ1bmN0aW9uIChydW5DYWxsYmFja3MpIHtcbiAgaWYgKCBydW5DYWxsYmFja3MgPT09IHZvaWQgMCApIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG5cbiAgdmFyIHN3aXBlciA9IHRoaXM7XG4gIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgdmFyIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNJbmRleDtcbiAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcblxuICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvbkVuZCcpO1xuICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgaWYgKGFjdGl2ZUluZGV4ICE9PSBwcmV2aW91c0luZGV4KSB7XG4gICAgICBzd2lwZXIuZW1pdCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJyk7XG4gICAgICBpZiAoYWN0aXZlSW5kZXggPiBwcmV2aW91c0luZGV4KSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCdzbGlkZU5leHRUcmFuc2l0aW9uRW5kJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxudmFyIHRyYW5zaXRpb24kMSA9IHtcbiAgc2V0VHJhbnNpdGlvbjogc2V0VHJhbnNpdGlvbixcbiAgdHJhbnNpdGlvblN0YXJ0OiB0cmFuc2l0aW9uU3RhcnQsXG4gIHRyYW5zaXRpb25FbmQ6IHRyYW5zaXRpb25FbmQkMSxcbn07XG5cbnZhciBCcm93c2VyID0gKGZ1bmN0aW9uIEJyb3dzZXIoKSB7XG4gIGZ1bmN0aW9uIGlzSUU5KCkge1xuICAgIC8vIGNyZWF0ZSB0ZW1wb3JhcnkgRElWXG4gICAgdmFyIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyBhZGQgY29udGVudCB0byB0bXAgRElWIHdoaWNoIGlzIHdyYXBwZWQgaW50byB0aGUgSUUgSFRNTCBjb25kaXRpb25hbCBzdGF0ZW1lbnRcbiAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgbHRlIElFIDldPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xuICAgIC8vIHJldHVybiB0cnVlIC8gZmFsc2UgdmFsdWUgYmFzZWQgb24gd2hhdCB3aWxsIGJyb3dzZXIgcmVuZGVyXG4gICAgcmV0dXJuIGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpLmxlbmd0aCA9PT0gMTtcbiAgfVxuICBmdW5jdGlvbiBpc1NhZmFyaSgpIHtcbiAgICB2YXIgdWEgPSB3aW4ubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiAodWEuaW5kZXhPZignc2FmYXJpJykgPj0gMCAmJiB1YS5pbmRleE9mKCdjaHJvbWUnKSA8IDAgJiYgdWEuaW5kZXhPZignYW5kcm9pZCcpIDwgMCk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpc1NhZmFyaTogaXNTYWZhcmkoKSxcbiAgICBpc1VpV2ViVmlldzogLyhpUGhvbmV8aVBvZHxpUGFkKS4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaS50ZXN0KHdpbi5uYXZpZ2F0b3IudXNlckFnZW50KSxcbiAgICBpZTogd2luLm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCB8fCB3aW4ubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQsXG4gICAgaWVUb3VjaDogKHdpbi5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCAmJiB3aW4ubmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAxKSB8fFxuICAgICAgICAgICAgICh3aW4ubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkICYmIHdpbi5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSxcbiAgICBsdGVJRTk6IGlzSUU5KCksXG4gIH07XG59KCkpO1xuXG52YXIgc2xpZGVUbyA9IGZ1bmN0aW9uIChpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKCBpbmRleCA9PT0gdm9pZCAwICkgaW5kZXggPSAwO1xuICBpZiAoIHNwZWVkID09PSB2b2lkIDAgKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICBpZiAoIHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwICkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcblxuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyIHNsaWRlSW5kZXggPSBpbmRleDtcbiAgaWYgKHNsaWRlSW5kZXggPCAwKSB7IHNsaWRlSW5kZXggPSAwOyB9XG5cbiAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIHZhciBzbmFwR3JpZCA9IHN3aXBlci5zbmFwR3JpZDtcbiAgdmFyIHNsaWRlc0dyaWQgPSBzd2lwZXIuc2xpZGVzR3JpZDtcbiAgdmFyIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNJbmRleDtcbiAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICB2YXIgcnRsID0gc3dpcGVyLnJ0bDtcbiAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcblxuICB2YXIgc25hcEluZGV4ID0gTWF0aC5mbG9vcihzbGlkZUluZGV4IC8gcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgaWYgKHNuYXBJbmRleCA+PSBzbmFwR3JpZC5sZW5ndGgpIHsgc25hcEluZGV4ID0gc25hcEdyaWQubGVuZ3RoIC0gMTsgfVxuXG4gIGlmICgoYWN0aXZlSW5kZXggfHwgcGFyYW1zLmluaXRpYWxTbGlkZSB8fCAwKSA9PT0gKHByZXZpb3VzSW5kZXggfHwgMCkgJiYgcnVuQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVNsaWRlQ2hhbmdlU3RhcnQnKTtcbiAgfVxuXG4gIHZhciB0cmFuc2xhdGUgPSAtc25hcEdyaWRbc25hcEluZGV4XTtcblxuICAvLyBVcGRhdGUgcHJvZ3Jlc3NcbiAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZSk7XG5cbiAgLy8gTm9ybWFsaXplIHNsaWRlSW5kZXhcbiAgaWYgKHBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoLU1hdGguZmxvb3IodHJhbnNsYXRlICogMTAwKSA+PSBNYXRoLmZsb29yKHNsaWRlc0dyaWRbaV0gKiAxMDApKSB7XG4gICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIERpcmVjdGlvbnMgbG9ja3NcbiAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgdHJhbnNsYXRlIDwgc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPCBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgdHJhbnNsYXRlID4gc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPiBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICBpZiAoKGFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4KSB7IHJldHVybiBmYWxzZTsgfVxuICB9XG5cbiAgLy8gVXBkYXRlIEluZGV4XG4gIGlmICgocnRsICYmIC10cmFuc2xhdGUgPT09IHN3aXBlci50cmFuc2xhdGUpIHx8ICghcnRsICYmIHRyYW5zbGF0ZSA9PT0gc3dpcGVyLnRyYW5zbGF0ZSkpIHtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gICAgLy8gVXBkYXRlIEhlaWdodFxuICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICB9XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICBpZiAocGFyYW1zLmVmZmVjdCAhPT0gJ3NsaWRlJykge1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc3BlZWQgPT09IDAgfHwgQnJvd3Nlci5sdGVJRTkpIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSk7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MpO1xuICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcyk7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICAgIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICBzd2lwZXIuZW1pdCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jywgc3BlZWQsIGludGVybmFsKTtcbiAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcyk7XG4gICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xudmFyIHNsaWRlTmV4dCA9IGZ1bmN0aW9uIChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAoIHNwZWVkID09PSB2b2lkIDAgKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICBpZiAoIHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwICkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcblxuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIHZhciBhbmltYXRpbmcgPSBzd2lwZXIuYW5pbWF0aW5nO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoYW5pbWF0aW5nKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdDtcbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gIH1cbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCArIHBhcmFtcy5zbGlkZXNQZXJHcm91cCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufTtcblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG52YXIgc2xpZGVQcmV2ID0gZnVuY3Rpb24gKHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmICggc3BlZWQgPT09IHZvaWQgMCApIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIGlmICggcnVuQ2FsbGJhY2tzID09PSB2b2lkIDAgKSBydW5DYWxsYmFja3MgPSB0cnVlO1xuXG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIGFuaW1hdGluZyA9IHN3aXBlci5hbmltYXRpbmc7XG5cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKGFuaW1hdGluZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci4kd3JhcHBlckVsWzBdLmNsaWVudExlZnQ7XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCAtIDEsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfVxuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4IC0gMSwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufTtcblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG52YXIgc2xpZGVSZXNldCA9IGZ1bmN0aW9uIChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAoIHNwZWVkID09PSB2b2lkIDAgKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICBpZiAoIHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwICkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcblxuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufTtcblxudmFyIHNsaWRlVG9DbGlja2VkU2xpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcblxuICB2YXIgc2xpZGVzUGVyVmlldyA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICB2YXIgc2xpZGVUb0luZGV4ID0gc3dpcGVyLmNsaWNrZWRJbmRleDtcbiAgdmFyIHJlYWxJbmRleDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHsgcmV0dXJuOyB9XG4gICAgcmVhbEluZGV4ID0gcGFyc2VJbnQoJCQxKHN3aXBlci5jbGlja2VkU2xpZGUpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIChzbGlkZVRvSW5kZXggPCBzd2lwZXIubG9vcGVkU2xpZGVzIC0gKHNsaWRlc1BlclZpZXcgLyAyKSkgfHxcbiAgICAgICAgKHNsaWRlVG9JbmRleCA+IChzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHN3aXBlci5sb29wZWRTbGlkZXMpICsgKHNsaWRlc1BlclZpZXcgLyAyKSlcbiAgICAgICkge1xuICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICBzbGlkZVRvSW5kZXggPSAkd3JhcHBlckVsXG4gICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyByZWFsSW5kZXggKyBcIlxcXCJdOm5vdCguXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCIpXCIpKVxuICAgICAgICAgIC5lcSgwKVxuICAgICAgICAgIC5pbmRleCgpO1xuXG4gICAgICAgIFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzbGlkZVRvSW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICBzbGlkZVRvSW5kZXggPSAkd3JhcHBlckVsXG4gICAgICAgIC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgcmVhbEluZGV4ICsgXCJcXFwiXTpub3QoLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiKVwiKSlcbiAgICAgICAgLmVxKDApXG4gICAgICAgIC5pbmRleCgpO1xuXG4gICAgICBVdGlscy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgfVxufTtcblxudmFyIHNsaWRlID0ge1xuICBzbGlkZVRvOiBzbGlkZVRvLFxuICBzbGlkZU5leHQ6IHNsaWRlTmV4dCxcbiAgc2xpZGVQcmV2OiBzbGlkZVByZXYsXG4gIHNsaWRlUmVzZXQ6IHNsaWRlUmVzZXQsXG4gIHNsaWRlVG9DbGlja2VkU2xpZGU6IHNsaWRlVG9DbGlja2VkU2xpZGUsXG59O1xuXG52YXIgbG9vcENyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN3aXBlciA9IHRoaXM7XG4gIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAvLyBSZW1vdmUgZHVwbGljYXRlZCBzbGlkZXNcbiAgJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCIuXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSkucmVtb3ZlKCk7XG5cbiAgdmFyIHNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSkpO1xuXG4gIGlmIChwYXJhbXMubG9vcEZpbGxHcm91cFdpdGhCbGFuaykge1xuICAgIHZhciBibGFua1NsaWRlc051bSA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cCAtIChzbGlkZXMubGVuZ3RoICUgcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICBpZiAoYmxhbmtTbGlkZXNOdW0gIT09IHBhcmFtcy5zbGlkZXNQZXJHcm91cCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibGFua1NsaWRlc051bTsgaSArPSAxKSB7XG4gICAgICAgIHZhciBibGFua05vZGUgPSAkJDEoZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS5hZGRDbGFzcygoKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5zbGlkZUJsYW5rQ2xhc3MpKSk7XG4gICAgICAgICR3cmFwcGVyRWwuYXBwZW5kKGJsYW5rTm9kZSk7XG4gICAgICB9XG4gICAgICBzbGlkZXMgPSAkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykpKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiAhcGFyYW1zLmxvb3BlZFNsaWRlcykgeyBwYXJhbXMubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDsgfVxuXG4gIHN3aXBlci5sb29wZWRTbGlkZXMgPSBwYXJzZUludChwYXJhbXMubG9vcGVkU2xpZGVzIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCk7XG4gIHN3aXBlci5sb29wZWRTbGlkZXMgKz0gcGFyYW1zLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuICBpZiAoc3dpcGVyLmxvb3BlZFNsaWRlcyA+IHNsaWRlcy5sZW5ndGgpIHtcbiAgICBzd2lwZXIubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDtcbiAgfVxuXG4gIHZhciBwcmVwZW5kU2xpZGVzID0gW107XG4gIHZhciBhcHBlbmRTbGlkZXMgPSBbXTtcbiAgc2xpZGVzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgIHZhciBzbGlkZSA9ICQkMShlbCk7XG4gICAgaWYgKGluZGV4IDwgc3dpcGVyLmxvb3BlZFNsaWRlcykgeyBhcHBlbmRTbGlkZXMucHVzaChlbCk7IH1cbiAgICBpZiAoaW5kZXggPCBzbGlkZXMubGVuZ3RoICYmIGluZGV4ID49IHNsaWRlcy5sZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzKSB7IHByZXBlbmRTbGlkZXMucHVzaChlbCk7IH1cbiAgICBzbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTtcbiAgfSk7XG4gIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGFwcGVuZFNsaWRlcy5sZW5ndGg7IGkkMSArPSAxKSB7XG4gICAgJHdyYXBwZXJFbC5hcHBlbmQoJCQxKGFwcGVuZFNsaWRlc1tpJDFdLmNsb25lTm9kZSh0cnVlKSkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKTtcbiAgfVxuICBmb3IgKHZhciBpJDIgPSBwcmVwZW5kU2xpZGVzLmxlbmd0aCAtIDE7IGkkMiA+PSAwOyBpJDIgLT0gMSkge1xuICAgICR3cmFwcGVyRWwucHJlcGVuZCgkJDEocHJlcGVuZFNsaWRlc1tpJDJdLmNsb25lTm9kZSh0cnVlKSkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKTtcbiAgfVxufTtcblxudmFyIGxvb3BGaXggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgdmFyIGxvb3BlZFNsaWRlcyA9IHN3aXBlci5sb29wZWRTbGlkZXM7XG4gIHZhciBhbGxvd1NsaWRlUHJldiA9IHN3aXBlci5hbGxvd1NsaWRlUHJldjtcbiAgdmFyIGFsbG93U2xpZGVOZXh0ID0gc3dpcGVyLmFsbG93U2xpZGVOZXh0O1xuICB2YXIgbmV3SW5kZXg7XG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XG4gIC8vIEZpeCBGb3IgTmVnYXRpdmUgT3ZlcnNsaWRpbmdcbiAgaWYgKGFjdGl2ZUluZGV4IDwgbG9vcGVkU2xpZGVzKSB7XG4gICAgbmV3SW5kZXggPSAoc2xpZGVzLmxlbmd0aCAtIChsb29wZWRTbGlkZXMgKiAzKSkgKyBhY3RpdmVJbmRleDtcbiAgICBuZXdJbmRleCArPSBsb29wZWRTbGlkZXM7XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgfSBlbHNlIGlmICgocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiBhY3RpdmVJbmRleCA+PSBsb29wZWRTbGlkZXMgKiAyKSB8fCAoYWN0aXZlSW5kZXggPiBzbGlkZXMubGVuZ3RoIC0gKHBhcmFtcy5zbGlkZXNQZXJWaWV3ICogMikpKSB7XG4gICAgLy8gRml4IEZvciBQb3NpdGl2ZSBPdmVyc2xpZGluZ1xuICAgIG5ld0luZGV4ID0gLXNsaWRlcy5sZW5ndGggKyBhY3RpdmVJbmRleCArIGxvb3BlZFNsaWRlcztcbiAgICBuZXdJbmRleCArPSBsb29wZWRTbGlkZXM7XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgfVxuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG59O1xuXG52YXIgbG9vcERlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG4gICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkpLnJlbW92ZSgpO1xuICBzbGlkZXMucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbn07XG5cbnZhciBsb29wID0ge1xuICBsb29wQ3JlYXRlOiBsb29wQ3JlYXRlLFxuICBsb29wRml4OiBsb29wRml4LFxuICBsb29wRGVzdHJveTogbG9vcERlc3Ryb3ksXG59O1xuXG52YXIgc2V0R3JhYkN1cnNvciA9IGZ1bmN0aW9uIChtb3ZpbmcpIHtcbiAgdmFyIHN3aXBlciA9IHRoaXM7XG4gIGlmIChTdXBwb3J0LnRvdWNoIHx8ICFzd2lwZXIucGFyYW1zLnNpbXVsYXRlVG91Y2gpIHsgcmV0dXJuOyB9XG4gIHZhciBlbCA9IHN3aXBlci5lbDtcbiAgZWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICBlbC5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnLXdlYmtpdC1ncmFiYmluZycgOiAnLXdlYmtpdC1ncmFiJztcbiAgZWwuc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJy1tb3otZ3JhYmJpbicgOiAnLW1vei1ncmFiJztcbiAgZWwuc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJ2dyYWJiaW5nJyA6ICdncmFiJztcbn07XG5cbnZhciB1bnNldEdyYWJDdXJzb3IgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICBpZiAoU3VwcG9ydC50b3VjaCkgeyByZXR1cm47IH1cbiAgc3dpcGVyLmVsLnN0eWxlLmN1cnNvciA9ICcnO1xufTtcblxudmFyIGdyYWJDdXJzb3IgPSB7XG4gIHNldEdyYWJDdXJzb3I6IHNldEdyYWJDdXJzb3IsXG4gIHVuc2V0R3JhYkN1cnNvcjogdW5zZXRHcmFiQ3Vyc29yLFxufTtcblxudmFyIGFwcGVuZFNsaWRlID0gZnVuY3Rpb24gKHNsaWRlcykge1xuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICB9XG4gIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBzbGlkZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNsaWRlc1tpXSkgeyAkd3JhcHBlckVsLmFwcGVuZChzbGlkZXNbaV0pOyB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgICR3cmFwcGVyRWwuYXBwZW5kKHNsaWRlcyk7XG4gIH1cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgfVxuICBpZiAoIShwYXJhbXMub2JzZXJ2ZXIgJiYgU3VwcG9ydC5vYnNlcnZlcikpIHtcbiAgICBzd2lwZXIudXBkYXRlKCk7XG4gIH1cbn07XG5cbnZhciBwcmVwZW5kU2xpZGUgPSBmdW5jdGlvbiAoc2xpZGVzKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuXG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICB9XG4gIHZhciBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcbiAgaWYgKHR5cGVvZiBzbGlkZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc2xpZGVzW2ldKSB7ICR3cmFwcGVyRWwucHJlcGVuZChzbGlkZXNbaV0pOyB9XG4gICAgfVxuICAgIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyBzbGlkZXMubGVuZ3RoO1xuICB9IGVsc2Uge1xuICAgICR3cmFwcGVyRWwucHJlcGVuZChzbGlkZXMpO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gIH1cbiAgaWYgKCEocGFyYW1zLm9ic2VydmVyICYmIFN1cHBvcnQub2JzZXJ2ZXIpKSB7XG4gICAgc3dpcGVyLnVwZGF0ZSgpO1xuICB9XG4gIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG59O1xuXG52YXIgcmVtb3ZlU2xpZGUgPSBmdW5jdGlvbiAoc2xpZGVzSW5kZXhlcykge1xuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcblxuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICBzd2lwZXIuc2xpZGVzID0gJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpKSk7XG4gIH1cbiAgdmFyIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gIHZhciBpbmRleFRvUmVtb3ZlO1xuXG4gIGlmICh0eXBlb2Ygc2xpZGVzSW5kZXhlcyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gc2xpZGVzSW5kZXhlcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzSW5kZXhlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaW5kZXhUb1JlbW92ZSA9IHNsaWRlc0luZGV4ZXNbaV07XG4gICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgeyBzd2lwZXIuc2xpZGVzLmVxKGluZGV4VG9SZW1vdmUpLnJlbW92ZSgpOyB9XG4gICAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSB7IG5ld0FjdGl2ZUluZGV4IC09IDE7IH1cbiAgICB9XG4gICAgbmV3QWN0aXZlSW5kZXggPSBNYXRoLm1heChuZXdBY3RpdmVJbmRleCwgMCk7XG4gIH0gZWxzZSB7XG4gICAgaW5kZXhUb1JlbW92ZSA9IHNsaWRlc0luZGV4ZXM7XG4gICAgaWYgKHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHsgc3dpcGVyLnNsaWRlcy5lcShpbmRleFRvUmVtb3ZlKS5yZW1vdmUoKTsgfVxuICAgIGlmIChpbmRleFRvUmVtb3ZlIDwgbmV3QWN0aXZlSW5kZXgpIHsgbmV3QWN0aXZlSW5kZXggLT0gMTsgfVxuICAgIG5ld0FjdGl2ZUluZGV4ID0gTWF0aC5tYXgobmV3QWN0aXZlSW5kZXgsIDApO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgfVxuXG4gIGlmICghKHBhcmFtcy5vYnNlcnZlciAmJiBTdXBwb3J0Lm9ic2VydmVyKSkge1xuICAgIHN3aXBlci51cGRhdGUoKTtcbiAgfVxuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xuICB9XG59O1xuXG52YXIgcmVtb3ZlQWxsU2xpZGVzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcblxuICB2YXIgc2xpZGVzSW5kZXhlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gIH1cbiAgc3dpcGVyLnJlbW92ZVNsaWRlKHNsaWRlc0luZGV4ZXMpO1xufTtcblxudmFyIG1hbmlwdWxhdGlvbiA9IHtcbiAgYXBwZW5kU2xpZGU6IGFwcGVuZFNsaWRlLFxuICBwcmVwZW5kU2xpZGU6IHByZXBlbmRTbGlkZSxcbiAgcmVtb3ZlU2xpZGU6IHJlbW92ZVNsaWRlLFxuICByZW1vdmVBbGxTbGlkZXM6IHJlbW92ZUFsbFNsaWRlcyxcbn07XG5cbnZhciBEZXZpY2UgPSAoZnVuY3Rpb24gRGV2aWNlKCkge1xuICB2YXIgdWEgPSB3aW4ubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICB2YXIgZGV2aWNlID0ge1xuICAgIGlvczogZmFsc2UsXG4gICAgYW5kcm9pZDogZmFsc2UsXG4gICAgYW5kcm9pZENocm9tZTogZmFsc2UsXG4gICAgZGVza3RvcDogZmFsc2UsXG4gICAgd2luZG93czogZmFsc2UsXG4gICAgaXBob25lOiBmYWxzZSxcbiAgICBpcG9kOiBmYWxzZSxcbiAgICBpcGFkOiBmYWxzZSxcbiAgICBjb3Jkb3ZhOiB3aW4uY29yZG92YSB8fCB3aW4ucGhvbmVnYXAsXG4gICAgcGhvbmVnYXA6IHdpbi5jb3Jkb3ZhIHx8IHdpbi5waG9uZWdhcCxcbiAgfTtcblxuICB2YXIgd2luZG93cyA9IHVhLm1hdGNoKC8oV2luZG93cyBQaG9uZSk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB2YXIgYW5kcm9pZCA9IHVhLm1hdGNoKC8oQW5kcm9pZCk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB2YXIgaXBhZCA9IHVhLm1hdGNoKC8oaVBhZCkuKk9TXFxzKFtcXGRfXSspLyk7XG4gIHZhciBpcG9kID0gdWEubWF0Y2goLyhpUG9kKSguKk9TXFxzKFtcXGRfXSspKT8vKTtcbiAgdmFyIGlwaG9uZSA9ICFpcGFkICYmIHVhLm1hdGNoKC8oaVBob25lXFxzT1N8aU9TKVxccyhbXFxkX10rKS8pO1xuXG5cbiAgLy8gV2luZG93c1xuICBpZiAod2luZG93cykge1xuICAgIGRldmljZS5vcyA9ICd3aW5kb3dzJztcbiAgICBkZXZpY2Uub3NWZXJzaW9uID0gd2luZG93c1syXTtcbiAgICBkZXZpY2Uud2luZG93cyA9IHRydWU7XG4gIH1cbiAgLy8gQW5kcm9pZFxuICBpZiAoYW5kcm9pZCAmJiAhd2luZG93cykge1xuICAgIGRldmljZS5vcyA9ICdhbmRyb2lkJztcbiAgICBkZXZpY2Uub3NWZXJzaW9uID0gYW5kcm9pZFsyXTtcbiAgICBkZXZpY2UuYW5kcm9pZCA9IHRydWU7XG4gICAgZGV2aWNlLmFuZHJvaWRDaHJvbWUgPSB1YS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2Nocm9tZScpID49IDA7XG4gIH1cbiAgaWYgKGlwYWQgfHwgaXBob25lIHx8IGlwb2QpIHtcbiAgICBkZXZpY2Uub3MgPSAnaW9zJztcbiAgICBkZXZpY2UuaW9zID0gdHJ1ZTtcbiAgfVxuICAvLyBpT1NcbiAgaWYgKGlwaG9uZSAmJiAhaXBvZCkge1xuICAgIGRldmljZS5vc1ZlcnNpb24gPSBpcGhvbmVbMl0ucmVwbGFjZSgvXy9nLCAnLicpO1xuICAgIGRldmljZS5pcGhvbmUgPSB0cnVlO1xuICB9XG4gIGlmIChpcGFkKSB7XG4gICAgZGV2aWNlLm9zVmVyc2lvbiA9IGlwYWRbMl0ucmVwbGFjZSgvXy9nLCAnLicpO1xuICAgIGRldmljZS5pcGFkID0gdHJ1ZTtcbiAgfVxuICBpZiAoaXBvZCkge1xuICAgIGRldmljZS5vc1ZlcnNpb24gPSBpcG9kWzNdID8gaXBvZFszXS5yZXBsYWNlKC9fL2csICcuJykgOiBudWxsO1xuICAgIGRldmljZS5pcGhvbmUgPSB0cnVlO1xuICB9XG4gIC8vIGlPUyA4KyBjaGFuZ2VkIFVBXG4gIGlmIChkZXZpY2UuaW9zICYmIGRldmljZS5vc1ZlcnNpb24gJiYgdWEuaW5kZXhPZignVmVyc2lvbi8nKSA+PSAwKSB7XG4gICAgaWYgKGRldmljZS5vc1ZlcnNpb24uc3BsaXQoJy4nKVswXSA9PT0gJzEwJykge1xuICAgICAgZGV2aWNlLm9zVmVyc2lvbiA9IHVhLnRvTG93ZXJDYXNlKCkuc3BsaXQoJ3ZlcnNpb24vJylbMV0uc3BsaXQoJyAnKVswXTtcbiAgICB9XG4gIH1cblxuICAvLyBEZXNrdG9wXG4gIGRldmljZS5kZXNrdG9wID0gIShkZXZpY2Uub3MgfHwgZGV2aWNlLmFuZHJvaWQgfHwgZGV2aWNlLndlYlZpZXcpO1xuXG4gIC8vIFdlYnZpZXdcbiAgZGV2aWNlLndlYlZpZXcgPSAoaXBob25lIHx8IGlwYWQgfHwgaXBvZCkgJiYgdWEubWF0Y2goLy4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaSk7XG5cbiAgLy8gTWluaW1hbCBVSVxuICBpZiAoZGV2aWNlLm9zICYmIGRldmljZS5vcyA9PT0gJ2lvcycpIHtcbiAgICB2YXIgb3NWZXJzaW9uQXJyID0gZGV2aWNlLm9zVmVyc2lvbi5zcGxpdCgnLicpO1xuICAgIHZhciBtZXRhVmlld3BvcnQgPSBkb2MucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidmlld3BvcnRcIl0nKTtcbiAgICBkZXZpY2UubWluaW1hbFVpID1cbiAgICAgICFkZXZpY2Uud2ViVmlldyAmJlxuICAgICAgKGlwb2QgfHwgaXBob25lKSAmJlxuICAgICAgKG9zVmVyc2lvbkFyclswXSAqIDEgPT09IDcgPyBvc1ZlcnNpb25BcnJbMV0gKiAxID49IDEgOiBvc1ZlcnNpb25BcnJbMF0gKiAxID4gNykgJiZcbiAgICAgIG1ldGFWaWV3cG9ydCAmJiBtZXRhVmlld3BvcnQuZ2V0QXR0cmlidXRlKCdjb250ZW50JykuaW5kZXhPZignbWluaW1hbC11aScpID49IDA7XG4gIH1cblxuICAvLyBQaXhlbCBSYXRpb1xuICBkZXZpY2UucGl4ZWxSYXRpbyA9IHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgLy8gRXhwb3J0IG9iamVjdFxuICByZXR1cm4gZGV2aWNlO1xufSgpKTtcblxudmFyIG9uVG91Y2hTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyIGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIHRvdWNoZXMgPSBzd2lwZXIudG91Y2hlcztcbiAgdmFyIGUgPSBldmVudDtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgeyBlID0gZS5vcmlnaW5hbEV2ZW50OyB9XG4gIGRhdGEuaXNUb3VjaEV2ZW50ID0gZS50eXBlID09PSAndG91Y2hzdGFydCc7XG4gIGlmICghZGF0YS5pc1RvdWNoRXZlbnQgJiYgJ3doaWNoJyBpbiBlICYmIGUud2hpY2ggPT09IDMpIHsgcmV0dXJuOyB9XG4gIGlmIChkYXRhLmlzVG91Y2hlZCAmJiBkYXRhLmlzTW92ZWQpIHsgcmV0dXJuOyB9XG4gIGlmIChwYXJhbXMubm9Td2lwaW5nICYmICQkMShlLnRhcmdldCkuY2xvc2VzdCgoXCIuXCIgKyAocGFyYW1zLm5vU3dpcGluZ0NsYXNzKSkpWzBdKSB7XG4gICAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnN3aXBlSGFuZGxlcikge1xuICAgIGlmICghJCQxKGUpLmNsb3Nlc3QocGFyYW1zLnN3aXBlSGFuZGxlcilbMF0pIHsgcmV0dXJuOyB9XG4gIH1cblxuICB0b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICB0b3VjaGVzLmN1cnJlbnRZID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICB2YXIgc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgdmFyIHN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7XG5cbiAgLy8gRG8gTk9UIHN0YXJ0IGlmIGlPUyBlZGdlIHN3aXBlIGlzIGRldGVjdGVkLiBPdGhlcndpc2UgaU9TIGFwcCAoVUlXZWJWaWV3KSBjYW5ub3Qgc3dpcGUtdG8tZ28tYmFjayBhbnltb3JlXG5cbiAgaWYgKFxuICAgIERldmljZS5pb3MgJiZcbiAgICAhRGV2aWNlLmNvcmRvdmEgJiZcbiAgICBwYXJhbXMuaU9TRWRnZVN3aXBlRGV0ZWN0aW9uICYmXG4gICAgKHN0YXJ0WCA8PSBwYXJhbXMuaU9TRWRnZVN3aXBlVGhyZXNob2xkKSAmJlxuICAgIChzdGFydFggPj0gd2luZG93LnNjcmVlbi53aWR0aCAtIHBhcmFtcy5pT1NFZGdlU3dpcGVUaHJlc2hvbGQpXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFV0aWxzLmV4dGVuZChkYXRhLCB7XG4gICAgaXNUb3VjaGVkOiB0cnVlLFxuICAgIGlzTW92ZWQ6IGZhbHNlLFxuICAgIGFsbG93VG91Y2hDYWxsYmFja3M6IHRydWUsXG4gICAgaXNTY3JvbGxpbmc6IHVuZGVmaW5lZCxcbiAgICBzdGFydE1vdmluZzogdW5kZWZpbmVkLFxuICB9KTtcblxuICB0b3VjaGVzLnN0YXJ0WCA9IHN0YXJ0WDtcbiAgdG91Y2hlcy5zdGFydFkgPSBzdGFydFk7XG4gIGRhdGEudG91Y2hTdGFydFRpbWUgPSBVdGlscy5ub3coKTtcbiAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG4gIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkgeyBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSA9IGZhbHNlOyB9XG4gIGlmIChlLnR5cGUgIT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIHZhciBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgaWYgKCQkMShlLnRhcmdldCkuaXMoZGF0YS5mb3JtRWxlbWVudHMpKSB7IHByZXZlbnREZWZhdWx0ID0gZmFsc2U7IH1cbiAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgJiYgJCQxKGRvYy5hY3RpdmVFbGVtZW50KS5pcyhkYXRhLmZvcm1FbGVtZW50cykpIHtcbiAgICAgIGRvYy5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB9XG4gICAgaWYgKHByZXZlbnREZWZhdWx0ICYmIHN3aXBlci5hbGxvd1RvdWNoTW92ZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuICBzd2lwZXIuZW1pdCgndG91Y2hTdGFydCcsIGUpO1xufTtcblxudmFyIG9uVG91Y2hNb3ZlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICB2YXIgdG91Y2hlcyA9IHN3aXBlci50b3VjaGVzO1xuICB2YXIgcnRsID0gc3dpcGVyLnJ0bDtcbiAgdmFyIGUgPSBldmVudDtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgeyBlID0gZS5vcmlnaW5hbEV2ZW50OyB9XG4gIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBlLnR5cGUgPT09ICdtb3VzZW1vdmUnKSB7IHJldHVybjsgfVxuICB2YXIgcGFnZVggPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgdmFyIHBhZ2VZID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gIGlmIChlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyKSB7XG4gICAgdG91Y2hlcy5zdGFydFggPSBwYWdlWDtcbiAgICB0b3VjaGVzLnN0YXJ0WSA9IHBhZ2VZO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1RvdWNoTW92ZSkge1xuICAgIC8vIGlzTW92ZWQgPSB0cnVlO1xuICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgaWYgKGRhdGEuaXNUb3VjaGVkKSB7XG4gICAgICBVdGlscy5leHRlbmQodG91Y2hlcywge1xuICAgICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgICBzdGFydFk6IHBhZ2VZLFxuICAgICAgICBjdXJyZW50WDogcGFnZVgsXG4gICAgICAgIGN1cnJlbnRZOiBwYWdlWSxcbiAgICAgIH0pO1xuICAgICAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IFV0aWxzLm5vdygpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGRhdGEuaXNUb3VjaEV2ZW50ICYmIHBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzICYmICFwYXJhbXMubG9vcCkge1xuICAgIGlmIChzd2lwZXIuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICAvLyBWZXJ0aWNhbFxuICAgICAgaWYgKFxuICAgICAgICAodG91Y2hlcy5jdXJyZW50WSA8IHRvdWNoZXMuc3RhcnRZICYmIHN3aXBlci50cmFuc2xhdGUgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB8fFxuICAgICAgICAodG91Y2hlcy5jdXJyZW50WSA+IHRvdWNoZXMuc3RhcnRZICYmIHN3aXBlci50cmFuc2xhdGUgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKHRvdWNoZXMuY3VycmVudFggPCB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkgfHxcbiAgICAgICh0b3VjaGVzLmN1cnJlbnRYID4gdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCkge1xuICAgIGlmIChlLnRhcmdldCA9PT0gZG9jLmFjdGl2ZUVsZW1lbnQgJiYgJCQxKGUudGFyZ2V0KS5pcyhkYXRhLmZvcm1FbGVtZW50cykpIHtcbiAgICAgIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG4gICAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZScsIGUpO1xuICB9XG4gIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHsgcmV0dXJuOyB9XG5cbiAgdG91Y2hlcy5jdXJyZW50WCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICB0b3VjaGVzLmN1cnJlbnRZID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG5cbiAgdmFyIGRpZmZYID0gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMuc3RhcnRYO1xuICB2YXIgZGlmZlkgPSB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG5cbiAgaWYgKHR5cGVvZiBkYXRhLmlzU2Nyb2xsaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciB0b3VjaEFuZ2xlO1xuICAgIGlmICgoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIHRvdWNoZXMuY3VycmVudFkgPT09IHRvdWNoZXMuc3RhcnRZKSB8fCAoc3dpcGVyLmlzVmVydGljYWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRYID09PSB0b3VjaGVzLnN0YXJ0WCkpIHtcbiAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBpZiAoKGRpZmZYICogZGlmZlgpICsgKGRpZmZZICogZGlmZlkpID49IDI1KSB7XG4gICAgICAgIHRvdWNoQW5nbGUgPSAoTWF0aC5hdGFuMihNYXRoLmFicyhkaWZmWSksIE1hdGguYWJzKGRpZmZYKSkgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgZGF0YS5pc1Njcm9sbGluZyA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHRvdWNoQW5nbGUgPiBwYXJhbXMudG91Y2hBbmdsZSA6ICg5MCAtIHRvdWNoQW5nbGUgPiBwYXJhbXMudG91Y2hBbmdsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZU9wcG9zaXRlJywgZSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBzdGFydE1vdmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodG91Y2hlcy5jdXJyZW50WCAhPT0gdG91Y2hlcy5zdGFydFggfHwgdG91Y2hlcy5jdXJyZW50WSAhPT0gdG91Y2hlcy5zdGFydFkpIHtcbiAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoIWRhdGEuaXNUb3VjaGVkKSB7IHJldHVybjsgfVxuICBpZiAoZGF0YS5pc1Njcm9sbGluZykge1xuICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZGF0YS5zdGFydE1vdmluZykge1xuICAgIHJldHVybjtcbiAgfVxuICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGlmIChwYXJhbXMudG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uICYmICFwYXJhbXMubmVzdGVkKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGlmICghZGF0YS5pc01vdmVkKSB7XG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgIH1cbiAgICBkYXRhLnN0YXJ0VHJhbnNsYXRlID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpO1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBzd2lwZXIuJHdyYXBwZXJFbC50cmlnZ2VyKCd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcbiAgICB9XG4gICAgZGF0YS5hbGxvd01vbWVudHVtQm91bmNlID0gZmFsc2U7XG4gICAgLy8gR3JhYiBDdXJzb3JcbiAgICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgKHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSB8fCBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpKSB7XG4gICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcih0cnVlKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ3NsaWRlckZpcnN0TW92ZScsIGUpO1xuICB9XG4gIHN3aXBlci5lbWl0KCdzbGlkZXJNb3ZlJywgZSk7XG4gIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG5cbiAgdmFyIGRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBkaWZmWCA6IGRpZmZZO1xuICB0b3VjaGVzLmRpZmYgPSBkaWZmO1xuXG4gIGRpZmYgKj0gcGFyYW1zLnRvdWNoUmF0aW87XG4gIGlmIChydGwpIHsgZGlmZiA9IC1kaWZmOyB9XG5cbiAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gZGlmZiA+IDAgPyAncHJldicgOiAnbmV4dCc7XG4gIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuXG4gIHZhciBkaXNhYmxlUGFyZW50U3dpcGVyID0gdHJ1ZTtcbiAgdmFyIHJlc2lzdGFuY2VSYXRpbyA9IHBhcmFtcy5yZXNpc3RhbmNlUmF0aW87XG4gIGlmIChwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgIHJlc2lzdGFuY2VSYXRpbyA9IDA7XG4gIH1cbiAgaWYgKChkaWZmID4gMCAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBzd2lwZXIubWluVHJhbnNsYXRlKCkpKSB7XG4gICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkgeyBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSAoc3dpcGVyLm1pblRyYW5zbGF0ZSgpIC0gMSkgKyAoTWF0aC5wb3coICgtc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgZGF0YS5zdGFydFRyYW5zbGF0ZSArIGRpZmYpLCByZXNpc3RhbmNlUmF0aW8gKSk7IH1cbiAgfSBlbHNlIGlmIChkaWZmIDwgMCAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgaWYgKHBhcmFtcy5yZXNpc3RhbmNlKSB7IGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IChzd2lwZXIubWF4VHJhbnNsYXRlKCkgKyAxKSAtIChNYXRoLnBvdyggKHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIGRhdGEuc3RhcnRUcmFuc2xhdGUgLSBkaWZmKSwgcmVzaXN0YW5jZVJhdGlvICkpOyB9XG4gIH1cblxuICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlcikge1xuICAgIGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIgPSB0cnVlO1xuICB9XG5cbiAgLy8gRGlyZWN0aW9ucyBsb2Nrc1xuICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICdwcmV2JyAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgfVxuXG5cbiAgLy8gVGhyZXNob2xkXG4gIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkge1xuICAgIGlmIChNYXRoLmFicyhkaWZmKSA+IHBhcmFtcy50aHJlc2hvbGQgfHwgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUpIHtcbiAgICAgIGlmICghZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUpIHtcbiAgICAgICAgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSB0cnVlO1xuICAgICAgICB0b3VjaGVzLnN0YXJ0WCA9IHRvdWNoZXMuY3VycmVudFg7XG4gICAgICAgIHRvdWNoZXMuc3RhcnRZID0gdG91Y2hlcy5jdXJyZW50WTtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgdG91Y2hlcy5kaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMuc3RhcnRYIDogdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMuc3RhcnRZO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgaWYgKCFwYXJhbXMuZm9sbG93RmluZ2VyKSB7IHJldHVybjsgfVxuXG4gIC8vIFVwZGF0ZSBhY3RpdmUgaW5kZXggaW4gZnJlZSBtb2RlXG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgfHwgcGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkge1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSkge1xuICAgIC8vIFZlbG9jaXR5XG4gICAgaWYgKGRhdGEudmVsb2NpdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGRhdGEudmVsb2NpdGllcy5wdXNoKHtcbiAgICAgICAgcG9zaXRpb246IHRvdWNoZXNbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3N0YXJ0WCcgOiAnc3RhcnRZJ10sXG4gICAgICAgIHRpbWU6IGRhdGEudG91Y2hTdGFydFRpbWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZGF0YS52ZWxvY2l0aWVzLnB1c2goe1xuICAgICAgcG9zaXRpb246IHRvdWNoZXNbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2N1cnJlbnRYJyA6ICdjdXJyZW50WSddLFxuICAgICAgdGltZTogVXRpbHMubm93KCksXG4gICAgfSk7XG4gIH1cbiAgLy8gVXBkYXRlIHByb2dyZXNzXG4gIHN3aXBlci51cGRhdGVQcm9ncmVzcyhkYXRhLmN1cnJlbnRUcmFuc2xhdGUpO1xuICAvLyBVcGRhdGUgdHJhbnNsYXRlXG4gIHN3aXBlci5zZXRUcmFuc2xhdGUoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcbn07XG5cbnZhciBvblRvdWNoRW5kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICB2YXIgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG5cbiAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIHZhciB0b3VjaGVzID0gc3dpcGVyLnRvdWNoZXM7XG4gIHZhciBydGwgPSBzd2lwZXIucnRsO1xuICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICB2YXIgc2xpZGVzR3JpZCA9IHN3aXBlci5zbGlkZXNHcmlkO1xuICB2YXIgc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQ7XG4gIHZhciBlID0gZXZlbnQ7XG4gIGlmIChlLm9yaWdpbmFsRXZlbnQpIHsgZSA9IGUub3JpZ2luYWxFdmVudDsgfVxuICBpZiAoZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3RvdWNoRW5kJywgZSk7XG4gIH1cbiAgZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzID0gZmFsc2U7XG4gIGlmICghZGF0YS5pc1RvdWNoZWQpIHsgcmV0dXJuOyB9XG4gIC8vIFJldHVybiBHcmFiIEN1cnNvclxuICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgZGF0YS5pc01vdmVkICYmIGRhdGEuaXNUb3VjaGVkICYmIChzd2lwZXIuYWxsb3dTbGlkZU5leHQgPT09IHRydWUgfHwgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSkge1xuICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKGZhbHNlKTtcbiAgfVxuXG4gIC8vIFRpbWUgZGlmZlxuICB2YXIgdG91Y2hFbmRUaW1lID0gVXRpbHMubm93KCk7XG4gIHZhciB0aW1lRGlmZiA9IHRvdWNoRW5kVGltZSAtIGRhdGEudG91Y2hTdGFydFRpbWU7XG5cbiAgLy8gVGFwLCBkb3VibGVUYXAsIENsaWNrXG4gIGlmIChzd2lwZXIuYWxsb3dDbGljaykge1xuICAgIHN3aXBlci51cGRhdGVDbGlja2VkU2xpZGUoZSk7XG4gICAgc3dpcGVyLmVtaXQoJ3RhcCcsIGUpO1xuICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiAodG91Y2hFbmRUaW1lIC0gZGF0YS5sYXN0Q2xpY2tUaW1lKSA+IDMwMCkge1xuICAgICAgaWYgKGRhdGEuY2xpY2tUaW1lb3V0KSB7IGNsZWFyVGltZW91dChkYXRhLmNsaWNrVGltZW91dCk7IH1cbiAgICAgIGRhdGEuY2xpY2tUaW1lb3V0ID0gVXRpbHMubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIuZW1pdCgnY2xpY2snLCBlKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiAodG91Y2hFbmRUaW1lIC0gZGF0YS5sYXN0Q2xpY2tUaW1lKSA8IDMwMCkge1xuICAgICAgaWYgKGRhdGEuY2xpY2tUaW1lb3V0KSB7IGNsZWFyVGltZW91dChkYXRhLmNsaWNrVGltZW91dCk7IH1cbiAgICAgIHN3aXBlci5lbWl0KCdkb3VibGVUYXAnLCBlKTtcbiAgICB9XG4gIH1cblxuICBkYXRhLmxhc3RDbGlja1RpbWUgPSBVdGlscy5ub3coKTtcbiAgVXRpbHMubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3dpcGVyLmRlc3Ryb3llZCkgeyBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7IH1cbiAgfSk7XG5cbiAgaWYgKCFkYXRhLmlzVG91Y2hlZCB8fCAhZGF0YS5pc01vdmVkIHx8ICFzd2lwZXIuc3dpcGVEaXJlY3Rpb24gfHwgdG91Y2hlcy5kaWZmID09PSAwIHx8IGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9PT0gZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuXG4gIHZhciBjdXJyZW50UG9zO1xuICBpZiAocGFyYW1zLmZvbGxvd0Zpbmdlcikge1xuICAgIGN1cnJlbnRQb3MgPSBydGwgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudFBvcyA9IC1kYXRhLmN1cnJlbnRUcmFuc2xhdGU7XG4gIH1cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSkge1xuICAgIGlmIChjdXJyZW50UG9zIDwgLXN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQb3MgPiAtc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICBpZiAoc3dpcGVyLnNsaWRlcy5sZW5ndGggPCBzbmFwR3JpZC5sZW5ndGgpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc25hcEdyaWQubGVuZ3RoIC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMuZnJlZU1vZGVNb21lbnR1bSkge1xuICAgICAgaWYgKGRhdGEudmVsb2NpdGllcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBsYXN0TW92ZUV2ZW50ID0gZGF0YS52ZWxvY2l0aWVzLnBvcCgpO1xuICAgICAgICB2YXIgdmVsb2NpdHlFdmVudCA9IGRhdGEudmVsb2NpdGllcy5wb3AoKTtcblxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBsYXN0TW92ZUV2ZW50LnBvc2l0aW9uIC0gdmVsb2NpdHlFdmVudC5wb3NpdGlvbjtcbiAgICAgICAgdmFyIHRpbWUgPSBsYXN0TW92ZUV2ZW50LnRpbWUgLSB2ZWxvY2l0eUV2ZW50LnRpbWU7XG4gICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IGRpc3RhbmNlIC8gdGltZTtcbiAgICAgICAgc3dpcGVyLnZlbG9jaXR5IC89IDI7XG4gICAgICAgIGlmIChNYXRoLmFicyhzd2lwZXIudmVsb2NpdHkpIDwgcGFyYW1zLmZyZWVNb2RlTWluaW11bVZlbG9jaXR5KSB7XG4gICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzIGltcGxpZXMgdGhhdCB0aGUgdXNlciBzdG9wcGVkIG1vdmluZyBhIGZpbmdlciB0aGVuIHJlbGVhc2VkLlxuICAgICAgICAvLyBUaGVyZSB3b3VsZCBiZSBubyBldmVudHMgd2l0aCBkaXN0YW5jZSB6ZXJvLCBzbyB0aGUgbGFzdCBldmVudCBpcyBzdGFsZS5cbiAgICAgICAgaWYgKHRpbWUgPiAxNTAgfHwgKFV0aWxzLm5vdygpIC0gbGFzdE1vdmVFdmVudC50aW1lKSA+IDMwMCkge1xuICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IDA7XG4gICAgICB9XG4gICAgICBzd2lwZXIudmVsb2NpdHkgKj0gcGFyYW1zLmZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvO1xuXG4gICAgICBkYXRhLnZlbG9jaXRpZXMubGVuZ3RoID0gMDtcbiAgICAgIHZhciBtb21lbnR1bUR1cmF0aW9uID0gMTAwMCAqIHBhcmFtcy5mcmVlTW9kZU1vbWVudHVtUmF0aW87XG4gICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZSA9IHN3aXBlci52ZWxvY2l0eSAqIG1vbWVudHVtRHVyYXRpb247XG5cbiAgICAgIHZhciBuZXdQb3NpdGlvbiA9IHN3aXBlci50cmFuc2xhdGUgKyBtb21lbnR1bURpc3RhbmNlO1xuICAgICAgaWYgKHJ0bCkgeyBuZXdQb3NpdGlvbiA9IC1uZXdQb3NpdGlvbjsgfVxuICAgICAgdmFyIGRvQm91bmNlID0gZmFsc2U7XG4gICAgICB2YXIgYWZ0ZXJCb3VuY2VQb3NpdGlvbjtcbiAgICAgIHZhciBib3VuY2VBbW91bnQgPSBNYXRoLmFicyhzd2lwZXIudmVsb2NpdHkpICogMjAgKiBwYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvO1xuICAgICAgaWYgKG5ld1Bvc2l0aW9uIDwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZSkge1xuICAgICAgICAgIGlmIChuZXdQb3NpdGlvbiArIHN3aXBlci5tYXhUcmFuc2xhdGUoKSA8IC1ib3VuY2VBbW91bnQpIHtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gYm91bmNlQW1vdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICAgIGRvQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5ld1Bvc2l0aW9uID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZSkge1xuICAgICAgICAgIGlmIChuZXdQb3NpdGlvbiAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSA+IGJvdW5jZUFtb3VudCkge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCkgKyBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFmdGVyQm91bmNlUG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgICAgZG9Cb3VuY2UgPSB0cnVlO1xuICAgICAgICAgIGRhdGEuYWxsb3dNb21lbnR1bUJvdW5jZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmZyZWVNb2RlU3RpY2t5KSB7XG4gICAgICAgIHZhciBuZXh0U2xpZGU7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc25hcEdyaWQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBpZiAoc25hcEdyaWRbal0gPiAtbmV3UG9zaXRpb24pIHtcbiAgICAgICAgICAgIG5leHRTbGlkZSA9IGo7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHNuYXBHcmlkW25leHRTbGlkZV0gLSBuZXdQb3NpdGlvbikgPCBNYXRoLmFicyhzbmFwR3JpZFtuZXh0U2xpZGUgLSAxXSAtIG5ld1Bvc2l0aW9uKSB8fCBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc25hcEdyaWRbbmV4dFNsaWRlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdQb3NpdGlvbiA9IHNuYXBHcmlkW25leHRTbGlkZSAtIDFdO1xuICAgICAgICB9XG4gICAgICAgIG5ld1Bvc2l0aW9uID0gLW5ld1Bvc2l0aW9uO1xuICAgICAgfVxuICAgICAgLy8gRml4IGR1cmF0aW9uXG4gICAgICBpZiAoc3dpcGVyLnZlbG9jaXR5ICE9PSAwKSB7XG4gICAgICAgIGlmIChydGwpIHtcbiAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKC1uZXdQb3NpdGlvbiAtIHN3aXBlci50cmFuc2xhdGUpIC8gc3dpcGVyLnZlbG9jaXR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uIC0gc3dpcGVyLnRyYW5zbGF0ZSkgLyBzd2lwZXIudmVsb2NpdHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICBzd2lwZXIuc2xpZGVSZXNldCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZSAmJiBkb0JvdW5jZSkge1xuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKG1vbWVudHVtRHVyYXRpb24pO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ21vbWVudHVtQm91bmNlJyk7XG5cbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihwYXJhbXMuc3BlZWQpO1xuICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnZlbG9jaXR5KSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhuZXdQb3NpdGlvbik7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKG1vbWVudHVtRHVyYXRpb24pO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAkd3JhcHBlckVsLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhuZXdQb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICB9XG4gICAgaWYgKCFwYXJhbXMuZnJlZU1vZGVNb21lbnR1bSB8fCB0aW1lRGlmZiA+PSBwYXJhbXMubG9uZ1N3aXBlc01zKSB7XG4gICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRmluZCBjdXJyZW50IHNsaWRlXG4gIHZhciBzdG9wSW5kZXggPSAwO1xuICB2YXIgZ3JvdXBTaXplID0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFswXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXApIHtcbiAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIHBhcmFtcy5zbGlkZXNQZXJHcm91cF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldICYmIGN1cnJlbnRQb3MgPCBzbGlkZXNHcmlkW2kgKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXBdKSB7XG4gICAgICAgIHN0b3BJbmRleCA9IGk7XG4gICAgICAgIGdyb3VwU2l6ZSA9IHNsaWRlc0dyaWRbaSArIHBhcmFtcy5zbGlkZXNQZXJHcm91cF0gLSBzbGlkZXNHcmlkW2ldO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldKSB7XG4gICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDFdIC0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDJdO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgY3VycmVudCBzbGlkZSBzaXplXG4gIHZhciByYXRpbyA9IChjdXJyZW50UG9zIC0gc2xpZGVzR3JpZFtzdG9wSW5kZXhdKSAvIGdyb3VwU2l6ZTtcblxuICBpZiAodGltZURpZmYgPiBwYXJhbXMubG9uZ1N3aXBlc01zKSB7XG4gICAgLy8gTG9uZyB0b3VjaGVzXG4gICAgaWYgKCFwYXJhbXMubG9uZ1N3aXBlcykge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICBpZiAocmF0aW8gPj0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykgeyBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApOyB9XG4gICAgICBlbHNlIHsgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTsgfVxuICAgIH1cbiAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgIGlmIChyYXRpbyA+ICgxIC0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykpIHsgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwKTsgfVxuICAgICAgZWxzZSB7IHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7IH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gU2hvcnQgc3dpcGVzXG4gICAgaWYgKCFwYXJhbXMuc2hvcnRTd2lwZXMpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIG9uUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcblxuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIGVsID0gc3dpcGVyLmVsO1xuICB2YXIgYWxsb3dTbGlkZU5leHQgPSBzd2lwZXIuYWxsb3dTbGlkZU5leHQ7XG4gIHZhciBhbGxvd1NsaWRlUHJldiA9IHN3aXBlci5hbGxvd1NsaWRlUHJldjtcblxuICBpZiAoZWwgJiYgZWwub2Zmc2V0V2lkdGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgLy8gQnJlYWtwb2ludHNcbiAgaWYgKHBhcmFtcy5icmVha3BvaW50cykge1xuICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gIH1cblxuICAvLyBEaXNhYmxlIGxvY2tzIG9uIHJlc2l6ZVxuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSB0cnVlO1xuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSB0cnVlO1xuXG4gIHN3aXBlci51cGRhdGVTaXplKCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcblxuICBpZiAocGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgdmFyIG5ld1RyYW5zbGF0ZSA9IE1hdGgubWluKE1hdGgubWF4KHN3aXBlci50cmFuc2xhdGUsIHN3aXBlci5tYXhUcmFuc2xhdGUoKSksIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XG4gICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIC8vIFJldHVybiBsb2NrcyBhZnRlciByZXNpemVcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xufTtcblxudmFyIG9uQ2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIuYWxsb3dDbGljaykge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnByZXZlbnRDbGlja3MpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uICYmIHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcblxuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIHRvdWNoRXZlbnRzID0gc3dpcGVyLnRvdWNoRXZlbnRzO1xuICB2YXIgZWwgPSBzd2lwZXIuZWw7XG4gIHZhciB3cmFwcGVyRWwgPSBzd2lwZXIud3JhcHBlckVsO1xuXG4gIHtcbiAgICBzd2lwZXIub25Ub3VjaFN0YXJ0ID0gb25Ub3VjaFN0YXJ0LmJpbmQoc3dpcGVyKTtcbiAgICBzd2lwZXIub25Ub3VjaE1vdmUgPSBvblRvdWNoTW92ZS5iaW5kKHN3aXBlcik7XG4gICAgc3dpcGVyLm9uVG91Y2hFbmQgPSBvblRvdWNoRW5kLmJpbmQoc3dpcGVyKTtcbiAgfVxuXG4gIHN3aXBlci5vbkNsaWNrID0gb25DbGljay5iaW5kKHN3aXBlcik7XG5cbiAgdmFyIHRhcmdldCA9IHBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyBlbCA6IHdyYXBwZXJFbDtcbiAgdmFyIGNhcHR1cmUgPSAhIXBhcmFtcy5uZXN0ZWQ7XG5cbiAgLy8gVG91Y2ggRXZlbnRzXG4gIHtcbiAgICBpZiAoQnJvd3Nlci5pZSkge1xuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHN3aXBlci5vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgIChTdXBwb3J0LnRvdWNoID8gdGFyZ2V0IDogZG9jKS5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHN3aXBlci5vblRvdWNoTW92ZSwgY2FwdHVyZSk7XG4gICAgICAoU3VwcG9ydC50b3VjaCA/IHRhcmdldCA6IGRvYykuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChTdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSB0b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnICYmIFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLnN0YXJ0LCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyID8geyBwYXNzaXZlOiBmYWxzZSwgY2FwdHVyZTogY2FwdHVyZSB9IDogY2FwdHVyZSk7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLm9uVG91Y2hFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBpZiAoKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFEZXZpY2UuaW9zICYmICFEZXZpY2UuYW5kcm9pZCkgfHwgKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFTdXBwb3J0LnRvdWNoICYmIERldmljZS5pb3MpKSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFByZXZlbnQgTGlua3MgQ2xpY2tzXG4gICAgaWYgKHBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHtcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXBlci5vbkNsaWNrLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXNpemUgaGFuZGxlclxuICBzd2lwZXIub24oJ3Jlc2l6ZSBvYnNlcnZlclVwZGF0ZScsIG9uUmVzaXplKTtcbn1cblxuZnVuY3Rpb24gZGV0YWNoRXZlbnRzKCkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcblxuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIHRvdWNoRXZlbnRzID0gc3dpcGVyLnRvdWNoRXZlbnRzO1xuICB2YXIgZWwgPSBzd2lwZXIuZWw7XG4gIHZhciB3cmFwcGVyRWwgPSBzd2lwZXIud3JhcHBlckVsO1xuXG4gIHZhciB0YXJnZXQgPSBwYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09ICdjb250YWluZXInID8gZWwgOiB3cmFwcGVyRWw7XG4gIHZhciBjYXB0dXJlID0gISFwYXJhbXMubmVzdGVkO1xuXG4gIC8vIFRvdWNoIEV2ZW50c1xuICB7XG4gICAgaWYgKEJyb3dzZXIuaWUpIHtcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLnN0YXJ0LCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAoU3VwcG9ydC50b3VjaCA/IHRhcmdldCA6IGRvYykucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgKFN1cHBvcnQudG91Y2ggPyB0YXJnZXQgOiBkb2MpLnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCBzd2lwZXIub25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoU3VwcG9ydC50b3VjaCkge1xuICAgICAgICB2YXIgcGFzc2l2ZUxpc3RlbmVyID0gdG91Y2hFdmVudHMuc3RhcnQgPT09ICdvblRvdWNoU3RhcnQnICYmIFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLnN0YXJ0LCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHN3aXBlci5vblRvdWNoRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgaWYgKChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhRGV2aWNlLmlvcyAmJiAhRGV2aWNlLmFuZHJvaWQpIHx8IChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhU3VwcG9ydC50b3VjaCAmJiBEZXZpY2UuaW9zKSkge1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3dpcGVyLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGVyLm9uVG91Y2hNb3ZlLCBjYXB0dXJlKTtcbiAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzd2lwZXIub25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBQcmV2ZW50IExpbmtzIENsaWNrc1xuICAgIGlmIChwYXJhbXMucHJldmVudENsaWNrcyB8fCBwYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uKSB7XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzd2lwZXIub25DbGljaywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVzaXplIGhhbmRsZXJcbiAgc3dpcGVyLm9mZigncmVzaXplIG9ic2VydmVyVXBkYXRlJywgb25SZXNpemUpO1xufVxuXG52YXIgZXZlbnRzID0ge1xuICBhdHRhY2hFdmVudHM6IGF0dGFjaEV2ZW50cyxcbiAgZGV0YWNoRXZlbnRzOiBkZXRhY2hFdmVudHMsXG59O1xuXG52YXIgc2V0QnJlYWtwb2ludCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN3aXBlciA9IHRoaXM7XG4gIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgdmFyIGxvb3BlZFNsaWRlcyA9IHN3aXBlci5sb29wZWRTbGlkZXM7IGlmICggbG9vcGVkU2xpZGVzID09PSB2b2lkIDAgKSBsb29wZWRTbGlkZXMgPSAwO1xuICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgdmFyIGJyZWFrcG9pbnRzID0gcGFyYW1zLmJyZWFrcG9pbnRzO1xuICBpZiAoIWJyZWFrcG9pbnRzIHx8IChicmVha3BvaW50cyAmJiBPYmplY3Qua2V5cyhicmVha3BvaW50cykubGVuZ3RoID09PSAwKSkgeyByZXR1cm47IH1cbiAgLy8gU2V0IGJyZWFrcG9pbnQgZm9yIHdpbmRvdyB3aWR0aCBhbmQgdXBkYXRlIHBhcmFtZXRlcnNcbiAgdmFyIGJyZWFrcG9pbnQgPSBzd2lwZXIuZ2V0QnJlYWtwb2ludChicmVha3BvaW50cyk7XG4gIGlmIChicmVha3BvaW50ICYmIHN3aXBlci5jdXJyZW50QnJlYWtwb2ludCAhPT0gYnJlYWtwb2ludCkge1xuICAgIHZhciBicmVha1BvaW50c1BhcmFtcyA9IGJyZWFrcG9pbnQgaW4gYnJlYWtwb2ludHMgPyBicmVha3BvaW50c1ticmVha3BvaW50XSA6IHN3aXBlci5vcmlnaW5hbFBhcmFtcztcbiAgICB2YXIgbmVlZHNSZUxvb3AgPSBwYXJhbXMubG9vcCAmJiAoYnJlYWtQb2ludHNQYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gcGFyYW1zLnNsaWRlc1BlclZpZXcpO1xuXG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5wYXJhbXMsIGJyZWFrUG9pbnRzUGFyYW1zKTtcblxuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxuICAgICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXG4gICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldixcbiAgICB9KTtcblxuICAgIHN3aXBlci5jdXJyZW50QnJlYWtwb2ludCA9IGJyZWFrcG9pbnQ7XG5cbiAgICBpZiAobmVlZHNSZUxvb3ApIHtcbiAgICAgIHZhciBvbGRJbmRleCA9IGFjdGl2ZUluZGV4IC0gbG9vcGVkU2xpZGVzO1xuICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgc3dpcGVyLnNsaWRlVG8ob2xkSW5kZXggKyBsb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ2JyZWFrcG9pbnQnLCBicmVha1BvaW50c1BhcmFtcyk7XG4gIH1cbn07XG5cbnZhciBnZXRCcmVha3BvaW50ID0gZnVuY3Rpb24gKGJyZWFrcG9pbnRzKSB7XG4gIC8vIEdldCBicmVha3BvaW50IGZvciB3aW5kb3cgd2lkdGhcbiAgaWYgKCFicmVha3BvaW50cykgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG4gIHZhciBicmVha3BvaW50ID0gZmFsc2U7XG4gIHZhciBwb2ludHMgPSBbXTtcbiAgT2JqZWN0LmtleXMoYnJlYWtwb2ludHMpLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgcG9pbnRzLnB1c2gocG9pbnQpO1xuICB9KTtcbiAgcG9pbnRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIHBhcnNlSW50KGEsIDEwKSA+IHBhcnNlSW50KGIsIDEwKTsgfSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmFyIHBvaW50ID0gcG9pbnRzW2ldO1xuICAgIGlmIChwb2ludCA+PSB3aW4uaW5uZXJXaWR0aCAmJiAhYnJlYWtwb2ludCkge1xuICAgICAgYnJlYWtwb2ludCA9IHBvaW50O1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnJlYWtwb2ludCB8fCAnbWF4Jztcbn07XG5cbnZhciBicmVha3BvaW50cyA9IHsgc2V0QnJlYWtwb2ludDogc2V0QnJlYWtwb2ludCwgZ2V0QnJlYWtwb2ludDogZ2V0QnJlYWtwb2ludCB9O1xuXG52YXIgYWRkQ2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN3aXBlciA9IHRoaXM7XG4gIHZhciBjbGFzc05hbWVzID0gc3dpcGVyLmNsYXNzTmFtZXM7XG4gIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICB2YXIgcnRsID0gc3dpcGVyLnJ0bDtcbiAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gIHZhciBzdWZmaXhlcyA9IFtdO1xuXG4gIHN1ZmZpeGVzLnB1c2gocGFyYW1zLmRpcmVjdGlvbik7XG5cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSkge1xuICAgIHN1ZmZpeGVzLnB1c2goJ2ZyZWUtbW9kZScpO1xuICB9XG4gIGlmICghU3VwcG9ydC5mbGV4Ym94KSB7XG4gICAgc3VmZml4ZXMucHVzaCgnbm8tZmxleGJveCcpO1xuICB9XG4gIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgIHN1ZmZpeGVzLnB1c2goJ2F1dG9oZWlnaHQnKTtcbiAgfVxuICBpZiAocnRsKSB7XG4gICAgc3VmZml4ZXMucHVzaCgncnRsJyk7XG4gIH1cbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgc3VmZml4ZXMucHVzaCgnbXVsdGlyb3cnKTtcbiAgfVxuICBpZiAoRGV2aWNlLmFuZHJvaWQpIHtcbiAgICBzdWZmaXhlcy5wdXNoKCdhbmRyb2lkJyk7XG4gIH1cbiAgaWYgKERldmljZS5pb3MpIHtcbiAgICBzdWZmaXhlcy5wdXNoKCdpb3MnKTtcbiAgfVxuICAvLyBXUDggVG91Y2ggRXZlbnRzIEZpeFxuICBpZiAod2luLm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCB8fCB3aW4ubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQpIHtcbiAgICBzdWZmaXhlcy5wdXNoKChcIndwOC1cIiArIChwYXJhbXMuZGlyZWN0aW9uKSkpO1xuICB9XG5cbiAgc3VmZml4ZXMuZm9yRWFjaChmdW5jdGlvbiAoc3VmZml4KSB7XG4gICAgY2xhc3NOYW1lcy5wdXNoKHBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgc3VmZml4KTtcbiAgfSk7XG5cbiAgJGVsLmFkZENsYXNzKGNsYXNzTmFtZXMuam9pbignICcpKTtcbn07XG5cbnZhciByZW1vdmVDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3dpcGVyID0gdGhpcztcbiAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gIHZhciBjbGFzc05hbWVzID0gc3dpcGVyLmNsYXNzTmFtZXM7XG5cbiAgJGVsLnJlbW92ZUNsYXNzKGNsYXNzTmFtZXMuam9pbignICcpKTtcbn07XG5cbnZhciBjbGFzc2VzID0geyBhZGRDbGFzc2VzOiBhZGRDbGFzc2VzLCByZW1vdmVDbGFzc2VzOiByZW1vdmVDbGFzc2VzIH07XG5cbnZhciBsb2FkSW1hZ2UgPSBmdW5jdGlvbiAoaW1hZ2VFbCwgc3JjLCBzcmNzZXQsIHNpemVzLCBjaGVja0ZvckNvbXBsZXRlLCBjYWxsYmFjaykge1xuICB2YXIgaW1hZ2U7XG4gIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKCk7IH1cbiAgfVxuICBpZiAoIWltYWdlRWwuY29tcGxldGUgfHwgIWNoZWNrRm9yQ29tcGxldGUpIHtcbiAgICBpZiAoc3JjKSB7XG4gICAgICBpbWFnZSA9IG5ldyB3aW4uSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9IG9uUmVhZHk7XG4gICAgICBpbWFnZS5vbmVycm9yID0gb25SZWFkeTtcbiAgICAgIGlmIChzaXplcykge1xuICAgICAgICBpbWFnZS5zaXplcyA9IHNpemVzO1xuICAgICAgfVxuICAgICAgaWYgKHNyY3NldCkge1xuICAgICAgICBpbWFnZS5zcmNzZXQgPSBzcmNzZXQ7XG4gICAgICB9XG4gICAgICBpZiAoc3JjKSB7XG4gICAgICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb25SZWFkeSgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBpbWFnZSBhbHJlYWR5IGxvYWRlZC4uLlxuICAgIG9uUmVhZHkoKTtcbiAgfVxufTtcblxudmFyIHByZWxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzd2lwZXIgPSB0aGlzO1xuICBzd2lwZXIuaW1hZ2VzVG9Mb2FkID0gc3dpcGVyLiRlbC5maW5kKCdpbWcnKTtcbiAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICBpZiAodHlwZW9mIHN3aXBlciA9PT0gJ3VuZGVmaW5lZCcgfHwgc3dpcGVyID09PSBudWxsIHx8ICFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cbiAgICBpZiAoc3dpcGVyLmltYWdlc0xvYWRlZCAhPT0gdW5kZWZpbmVkKSB7IHN3aXBlci5pbWFnZXNMb2FkZWQgKz0gMTsgfVxuICAgIGlmIChzd2lwZXIuaW1hZ2VzTG9hZGVkID09PSBzd2lwZXIuaW1hZ2VzVG9Mb2FkLmxlbmd0aCkge1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMudXBkYXRlT25JbWFnZXNSZWFkeSkgeyBzd2lwZXIudXBkYXRlKCk7IH1cbiAgICAgIHN3aXBlci5lbWl0KCdpbWFnZXNSZWFkeScpO1xuICAgIH1cbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN3aXBlci5pbWFnZXNUb0xvYWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB2YXIgaW1hZ2VFbCA9IHN3aXBlci5pbWFnZXNUb0xvYWRbaV07XG4gICAgc3dpcGVyLmxvYWRJbWFnZShcbiAgICAgIGltYWdlRWwsXG4gICAgICBpbWFnZUVsLmN1cnJlbnRTcmMgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgaW1hZ2VFbC5zcmNzZXQgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NyY3NldCcpLFxuICAgICAgaW1hZ2VFbC5zaXplcyB8fCBpbWFnZUVsLmdldEF0dHJpYnV0ZSgnc2l6ZXMnKSxcbiAgICAgIHRydWUsXG4gICAgICBvblJlYWR5XG4gICAgKTtcbiAgfVxufTtcblxudmFyIGltYWdlcyA9IHtcbiAgbG9hZEltYWdlOiBsb2FkSW1hZ2UsXG4gIHByZWxvYWRJbWFnZXM6IHByZWxvYWRJbWFnZXMsXG59O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGluaXQ6IHRydWUsXG4gIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICB0b3VjaEV2ZW50c1RhcmdldDogJ2NvbnRhaW5lcicsXG4gIGluaXRpYWxTbGlkZTogMCxcbiAgc3BlZWQ6IDMwMCxcblxuICAvLyBUbyBzdXBwb3J0IGlPUydzIHN3aXBlLXRvLWdvLWJhY2sgZ2VzdHVyZSAod2hlbiBiZWluZyB1c2VkIGluLWFwcCwgd2l0aCBVSVdlYlZpZXcpLlxuICBpT1NFZGdlU3dpcGVEZXRlY3Rpb246IGZhbHNlLFxuICBpT1NFZGdlU3dpcGVUaHJlc2hvbGQ6IDIwLFxuXG4gIC8vIEZyZWUgbW9kZVxuICBmcmVlTW9kZTogZmFsc2UsXG4gIGZyZWVNb2RlTW9tZW50dW06IHRydWUsXG4gIGZyZWVNb2RlTW9tZW50dW1SYXRpbzogMSxcbiAgZnJlZU1vZGVNb21lbnR1bUJvdW5jZTogdHJ1ZSxcbiAgZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvOiAxLFxuICBmcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbzogMSxcbiAgZnJlZU1vZGVTdGlja3k6IGZhbHNlLFxuICBmcmVlTW9kZU1pbmltdW1WZWxvY2l0eTogMC4wMixcblxuICAvLyBBdXRvaGVpZ2h0XG4gIGF1dG9IZWlnaHQ6IGZhbHNlLFxuXG4gIC8vIFNldCB3cmFwcGVyIHdpZHRoXG4gIHNldFdyYXBwZXJTaXplOiBmYWxzZSxcblxuICAvLyBWaXJ0dWFsIFRyYW5zbGF0ZVxuICB2aXJ0dWFsVHJhbnNsYXRlOiBmYWxzZSxcblxuICAvLyBFZmZlY3RzXG4gIGVmZmVjdDogJ3NsaWRlJywgLy8gJ3NsaWRlJyBvciAnZmFkZScgb3IgJ2N1YmUnIG9yICdjb3ZlcmZsb3cnIG9yICdmbGlwJ1xuXG4gIC8vIEJyZWFrcG9pbnRzXG4gIGJyZWFrcG9pbnRzOiB1bmRlZmluZWQsXG5cbiAgLy8gU2xpZGVzIGdyaWRcbiAgc3BhY2VCZXR3ZWVuOiAwLFxuICBzbGlkZXNQZXJWaWV3OiAxLFxuICBzbGlkZXNQZXJDb2x1bW46IDEsXG4gIHNsaWRlc1BlckNvbHVtbkZpbGw6ICdjb2x1bW4nLFxuICBzbGlkZXNQZXJHcm91cDogMSxcbiAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICBzbGlkZXNPZmZzZXRCZWZvcmU6IDAsIC8vIGluIHB4XG4gIHNsaWRlc09mZnNldEFmdGVyOiAwLCAvLyBpbiBweFxuICBub3JtYWxpemVTbGlkZUluZGV4OiB0cnVlLFxuXG4gIC8vIFJvdW5kIGxlbmd0aFxuICByb3VuZExlbmd0aHM6IGZhbHNlLFxuXG4gIC8vIFRvdWNoZXNcbiAgdG91Y2hSYXRpbzogMSxcbiAgdG91Y2hBbmdsZTogNDUsXG4gIHNpbXVsYXRlVG91Y2g6IHRydWUsXG4gIHNob3J0U3dpcGVzOiB0cnVlLFxuICBsb25nU3dpcGVzOiB0cnVlLFxuICBsb25nU3dpcGVzUmF0aW86IDAuNSxcbiAgbG9uZ1N3aXBlc01zOiAzMDAsXG4gIGZvbGxvd0ZpbmdlcjogdHJ1ZSxcbiAgYWxsb3dUb3VjaE1vdmU6IHRydWUsXG4gIHRocmVzaG9sZDogMCxcbiAgdG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uOiB0cnVlLFxuICB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcblxuICAvLyBVbmlxdWUgTmF2aWdhdGlvbiBFbGVtZW50c1xuICB1bmlxdWVOYXZFbGVtZW50czogdHJ1ZSxcblxuICAvLyBSZXNpc3RhbmNlXG4gIHJlc2lzdGFuY2U6IHRydWUsXG4gIHJlc2lzdGFuY2VSYXRpbzogMC44NSxcblxuICAvLyBQcm9ncmVzc1xuICB3YXRjaFNsaWRlc1Byb2dyZXNzOiBmYWxzZSxcbiAgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiBmYWxzZSxcblxuICAvLyBDdXJzb3JcbiAgZ3JhYkN1cnNvcjogZmFsc2UsXG5cbiAgLy8gQ2xpY2tzXG4gIHByZXZlbnRDbGlja3M6IHRydWUsXG4gIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXG5cbiAgLy8gSW1hZ2VzXG4gIHByZWxvYWRJbWFnZXM6IHRydWUsXG4gIHVwZGF0ZU9uSW1hZ2VzUmVhZHk6IHRydWUsXG5cbiAgLy8gbG9vcFxuICBsb29wOiBmYWxzZSxcbiAgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IDAsXG4gIGxvb3BlZFNsaWRlczogbnVsbCxcbiAgbG9vcEZpbGxHcm91cFdpdGhCbGFuazogZmFsc2UsXG5cbiAgLy8gU3dpcGluZy9ubyBzd2lwaW5nXG4gIGFsbG93U2xpZGVQcmV2OiB0cnVlLFxuICBhbGxvd1NsaWRlTmV4dDogdHJ1ZSxcbiAgc3dpcGVIYW5kbGVyOiBudWxsLCAvLyAnLnN3aXBlLWhhbmRsZXInLFxuICBub1N3aXBpbmc6IHRydWUsXG4gIG5vU3dpcGluZ0NsYXNzOiAnc3dpcGVyLW5vLXN3aXBpbmcnLFxuXG4gIC8vIFBhc3NpdmUgTGlzdGVuZXJzXG4gIHBhc3NpdmVMaXN0ZW5lcnM6IHRydWUsXG5cbiAgLy8gTlNcbiAgY29udGFpbmVyTW9kaWZpZXJDbGFzczogJ3N3aXBlci1jb250YWluZXItJywgLy8gTkVXXG4gIHNsaWRlQ2xhc3M6ICdzd2lwZXItc2xpZGUnLFxuICBzbGlkZUJsYW5rQ2xhc3M6ICdzd2lwZXItc2xpZGUtaW52aXNpYmxlLWJsYW5rJyxcbiAgc2xpZGVBY3RpdmVDbGFzczogJ3N3aXBlci1zbGlkZS1hY3RpdmUnLFxuICBzbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1hY3RpdmUnLFxuICBzbGlkZVZpc2libGVDbGFzczogJ3N3aXBlci1zbGlkZS12aXNpYmxlJyxcbiAgc2xpZGVEdXBsaWNhdGVDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUnLFxuICBzbGlkZU5leHRDbGFzczogJ3N3aXBlci1zbGlkZS1uZXh0JyxcbiAgc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLW5leHQnLFxuICBzbGlkZVByZXZDbGFzczogJ3N3aXBlci1zbGlkZS1wcmV2JyxcbiAgc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLXByZXYnLFxuICB3cmFwcGVyQ2xhc3M6ICdzd2lwZXItd3JhcHBlcicsXG5cbiAgLy8gQ2FsbGJhY2tzXG4gIHJ1bkNhbGxiYWNrc09uSW5pdDogdHJ1ZSxcbn07XG5cbnZhciBwcm90b3R5cGVzID0ge1xuICB1cGRhdGU6IHVwZGF0ZSxcbiAgdHJhbnNsYXRlOiB0cmFuc2xhdGUsXG4gIHRyYW5zaXRpb246IHRyYW5zaXRpb24kMSxcbiAgc2xpZGU6IHNsaWRlLFxuICBsb29wOiBsb29wLFxuICBncmFiQ3Vyc29yOiBncmFiQ3Vyc29yLFxuICBtYW5pcHVsYXRpb246IG1hbmlwdWxhdGlvbixcbiAgZXZlbnRzOiBldmVudHMsXG4gIGJyZWFrcG9pbnRzOiBicmVha3BvaW50cyxcbiAgY2xhc3NlczogY2xhc3NlcyxcbiAgaW1hZ2VzOiBpbWFnZXMsXG59O1xuXG52YXIgZXh0ZW5kZWREZWZhdWx0cyA9IHt9O1xuXG52YXIgU3dpcGVyJDEgPSAoZnVuY3Rpb24gKFN3aXBlckNsYXNzJCQxKSB7XG4gIGZ1bmN0aW9uIFN3aXBlcigpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICB2YXIgZWw7XG4gICAgdmFyIHBhcmFtcztcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgYXJnc1swXS5jb25zdHJ1Y3RvciAmJiBhcmdzWzBdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgIHBhcmFtcyA9IGFyZ3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhc3NpZ247XG4gICAgICAoYXNzaWduID0gYXJncywgZWwgPSBhc3NpZ25bMF0sIHBhcmFtcyA9IGFzc2lnblsxXSk7XG4gICAgfVxuICAgIGlmICghcGFyYW1zKSB7IHBhcmFtcyA9IHt9OyB9XG5cbiAgICBwYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIHBhcmFtcyk7XG4gICAgaWYgKGVsICYmICFwYXJhbXMuZWwpIHsgcGFyYW1zLmVsID0gZWw7IH1cblxuICAgIFN3aXBlckNsYXNzJCQxLmNhbGwodGhpcywgcGFyYW1zKTtcblxuICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3RvdHlwZUdyb3VwKSB7XG4gICAgICBPYmplY3Qua2V5cyhwcm90b3R5cGVzW3Byb3RvdHlwZUdyb3VwXSkuZm9yRWFjaChmdW5jdGlvbiAocHJvdG9NZXRob2QpIHtcbiAgICAgICAgaWYgKCFTd2lwZXIucHJvdG90eXBlW3Byb3RvTWV0aG9kXSkge1xuICAgICAgICAgIFN3aXBlci5wcm90b3R5cGVbcHJvdG9NZXRob2RdID0gcHJvdG90eXBlc1twcm90b3R5cGVHcm91cF1bcHJvdG9NZXRob2RdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFN3aXBlciBJbnN0YW5jZVxuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgT2JqZWN0LmtleXMoc3dpcGVyLm1vZHVsZXMpLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZU5hbWUpIHtcbiAgICAgIHZhciBtb2R1bGUgPSBzd2lwZXIubW9kdWxlc1ttb2R1bGVOYW1lXTtcbiAgICAgIGlmIChtb2R1bGUucGFyYW1zKSB7XG4gICAgICAgIHZhciBtb2R1bGVQYXJhbU5hbWUgPSBPYmplY3Qua2V5cyhtb2R1bGUucGFyYW1zKVswXTtcbiAgICAgICAgdmFyIG1vZHVsZVBhcmFtcyA9IG1vZHVsZS5wYXJhbXNbbW9kdWxlUGFyYW1OYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2R1bGVQYXJhbXMgIT09ICdvYmplY3QnKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoIShtb2R1bGVQYXJhbU5hbWUgaW4gcGFyYW1zICYmICdlbmFibGVkJyBpbiBtb2R1bGVQYXJhbXMpKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAocGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09IHRydWUpIHtcbiAgICAgICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHsgZW5hYmxlZDogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlb2YgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgISgnZW5hYmxlZCcgaW4gcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pXG4gICAgICAgICkge1xuICAgICAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pIHsgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPSB7IGVuYWJsZWQ6IGZhbHNlIH07IH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEV4dGVuZCBkZWZhdWx0cyB3aXRoIG1vZHVsZXMgcGFyYW1zXG4gICAgdmFyIHN3aXBlclBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgZGVmYXVsdHMpO1xuICAgIHN3aXBlci51c2VNb2R1bGVzUGFyYW1zKHN3aXBlclBhcmFtcyk7XG5cbiAgICAvLyBFeHRlbmQgZGVmYXVsdHMgd2l0aCBwYXNzZWQgcGFyYW1zXG4gICAgc3dpcGVyLnBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgc3dpcGVyUGFyYW1zLCBleHRlbmRlZERlZmF1bHRzLCBwYXJhbXMpO1xuICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgc3dpcGVyLnBhcmFtcyk7XG4gICAgc3dpcGVyLnBhc3NlZFBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgcGFyYW1zKTtcblxuICAgIC8vIEZpbmQgZWxcbiAgICB2YXIgJGVsID0gJCQxKHN3aXBlci5wYXJhbXMuZWwpO1xuICAgIGVsID0gJGVsWzBdO1xuXG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoJGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBzd2lwZXJzID0gW107XG4gICAgICAkZWwuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGNvbnRhaW5lckVsKSB7XG4gICAgICAgIHZhciBuZXdQYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIHBhcmFtcywgeyBlbDogY29udGFpbmVyRWwgfSk7XG4gICAgICAgIHN3aXBlcnMucHVzaChuZXcgU3dpcGVyKG5ld1BhcmFtcykpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3dpcGVycztcbiAgICB9XG5cbiAgICBlbC5zd2lwZXIgPSBzd2lwZXI7XG4gICAgJGVsLmRhdGEoJ3N3aXBlcicsIHN3aXBlcik7XG5cbiAgICAvLyBGaW5kIFdyYXBwZXJcbiAgICB2YXIgJHdyYXBwZXJFbCA9ICRlbC5jaGlsZHJlbigoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3MpKSk7XG5cbiAgICAvLyBFeHRlbmQgU3dpcGVyXG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgJGVsOiAkZWwsXG4gICAgICBlbDogZWwsXG4gICAgICAkd3JhcHBlckVsOiAkd3JhcHBlckVsLFxuICAgICAgd3JhcHBlckVsOiAkd3JhcHBlckVsWzBdLFxuXG4gICAgICAvLyBDbGFzc2VzXG4gICAgICBjbGFzc05hbWVzOiBbXSxcblxuICAgICAgLy8gU2xpZGVzXG4gICAgICBzbGlkZXM6ICQkMSgpLFxuICAgICAgc2xpZGVzR3JpZDogW10sXG4gICAgICBzbmFwR3JpZDogW10sXG4gICAgICBzbGlkZXNTaXplc0dyaWQ6IFtdLFxuXG4gICAgICAvLyBpc0RpcmVjdGlvblxuICAgICAgaXNIb3Jpem9udGFsOiBmdW5jdGlvbiBpc0hvcml6b250YWwoKSB7XG4gICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgfSxcbiAgICAgIGlzVmVydGljYWw6IGZ1bmN0aW9uIGlzVmVydGljYWwoKSB7XG4gICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJztcbiAgICAgIH0sXG4gICAgICAvLyBSVExcbiAgICAgIHJ0bDogc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiAoZWwuZGlyLnRvTG93ZXJDYXNlKCkgPT09ICdydGwnIHx8ICRlbC5jc3MoJ2RpcmVjdGlvbicpID09PSAncnRsJyksXG4gICAgICB3cm9uZ1JUTDogJHdyYXBwZXJFbC5jc3MoJ2Rpc3BsYXknKSA9PT0gJy13ZWJraXQtYm94JyxcblxuICAgICAgLy8gSW5kZXhlc1xuICAgICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgICByZWFsSW5kZXg6IDAsXG5cbiAgICAgIC8vXG4gICAgICBpc0JlZ2lubmluZzogdHJ1ZSxcbiAgICAgIGlzRW5kOiBmYWxzZSxcblxuICAgICAgLy8gUHJvcHNcbiAgICAgIHRyYW5zbGF0ZTogMCxcbiAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgdmVsb2NpdHk6IDAsXG4gICAgICBhbmltYXRpbmc6IGZhbHNlLFxuXG4gICAgICAvLyBMb2Nrc1xuICAgICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXG4gICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldixcblxuICAgICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgICB0b3VjaEV2ZW50czogKGZ1bmN0aW9uIHRvdWNoRXZlbnRzKCkge1xuICAgICAgICB2YXIgdG91Y2ggPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJ107XG4gICAgICAgIHZhciBkZXNrdG9wID0gWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnXTtcbiAgICAgICAgaWYgKHdpbi5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQpIHtcbiAgICAgICAgICBkZXNrdG9wID0gWydwb2ludGVyZG93bicsICdwb2ludGVybW92ZScsICdwb2ludGVydXAnXTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW4ubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQpIHtcbiAgICAgICAgICBkZXNrdG9wID0gWydNU1BvaW50ZXJEb3duJywgJ01zUG9pbnRlck1vdmUnLCAnTXNQb2ludGVyVXAnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhcnQ6IFN1cHBvcnQudG91Y2ggfHwgIXN3aXBlci5wYXJhbXMuc2ltdWxhdGVUb3VjaCA/IHRvdWNoWzBdIDogZGVza3RvcFswXSxcbiAgICAgICAgICBtb3ZlOiBTdXBwb3J0LnRvdWNoIHx8ICFzd2lwZXIucGFyYW1zLnNpbXVsYXRlVG91Y2ggPyB0b3VjaFsxXSA6IGRlc2t0b3BbMV0sXG4gICAgICAgICAgZW5kOiBTdXBwb3J0LnRvdWNoIHx8ICFzd2lwZXIucGFyYW1zLnNpbXVsYXRlVG91Y2ggPyB0b3VjaFsyXSA6IGRlc2t0b3BbMl0sXG4gICAgICAgIH07XG4gICAgICB9KCkpLFxuICAgICAgdG91Y2hFdmVudHNEYXRhOiB7XG4gICAgICAgIGlzVG91Y2hlZDogdW5kZWZpbmVkLFxuICAgICAgICBpc01vdmVkOiB1bmRlZmluZWQsXG4gICAgICAgIGFsbG93VG91Y2hDYWxsYmFja3M6IHVuZGVmaW5lZCxcbiAgICAgICAgdG91Y2hTdGFydFRpbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNTY3JvbGxpbmc6IHVuZGVmaW5lZCxcbiAgICAgICAgY3VycmVudFRyYW5zbGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICBzdGFydFRyYW5zbGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICBhbGxvd1RocmVzaG9sZE1vdmU6IHVuZGVmaW5lZCxcbiAgICAgICAgLy8gRm9ybSBlbGVtZW50cyB0byBtYXRjaFxuICAgICAgICBmb3JtRWxlbWVudHM6ICdpbnB1dCwgc2VsZWN0LCBvcHRpb24sIHRleHRhcmVhLCBidXR0b24sIHZpZGVvJyxcbiAgICAgICAgLy8gTGFzdCBjbGljayB0aW1lXG4gICAgICAgIGxhc3RDbGlja1RpbWU6IFV0aWxzLm5vdygpLFxuICAgICAgICBjbGlja1RpbWVvdXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgLy8gVmVsb2NpdGllc1xuICAgICAgICB2ZWxvY2l0aWVzOiBbXSxcbiAgICAgICAgYWxsb3dNb21lbnR1bUJvdW5jZTogdW5kZWZpbmVkLFxuICAgICAgICBpc1RvdWNoRXZlbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhcnRNb3Zpbmc6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG5cbiAgICAgIC8vIENsaWNrc1xuICAgICAgYWxsb3dDbGljazogdHJ1ZSxcblxuICAgICAgLy8gVG91Y2hlc1xuICAgICAgYWxsb3dUb3VjaE1vdmU6IHN3aXBlci5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsXG5cbiAgICAgIHRvdWNoZXM6IHtcbiAgICAgICAgc3RhcnRYOiAwLFxuICAgICAgICBzdGFydFk6IDAsXG4gICAgICAgIGN1cnJlbnRYOiAwLFxuICAgICAgICBjdXJyZW50WTogMCxcbiAgICAgICAgZGlmZjogMCxcbiAgICAgIH0sXG5cbiAgICAgIC8vIEltYWdlc1xuICAgICAgaW1hZ2VzVG9Mb2FkOiBbXSxcbiAgICAgIGltYWdlc0xvYWRlZDogMCxcblxuICAgIH0pO1xuXG4gICAgLy8gSW5zdGFsbCBNb2R1bGVzXG4gICAgc3dpcGVyLnVzZU1vZHVsZXMoKTtcblxuICAgIC8vIEluaXRcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5pbml0KSB7XG4gICAgICBzd2lwZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhcHAgaW5zdGFuY2VcbiAgICByZXR1cm4gc3dpcGVyO1xuICB9XG5cbiAgaWYgKCBTd2lwZXJDbGFzcyQkMSApIFN3aXBlci5fX3Byb3RvX18gPSBTd2lwZXJDbGFzcyQkMTtcbiAgU3dpcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFN3aXBlckNsYXNzJCQxICYmIFN3aXBlckNsYXNzJCQxLnByb3RvdHlwZSApO1xuICBTd2lwZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3dpcGVyO1xuXG4gIHZhciBzdGF0aWNBY2Nlc3NvcnMgPSB7IGV4dGVuZGVkRGVmYXVsdHM6IHt9LGRlZmF1bHRzOiB7fSxDbGFzczoge30sJDoge30gfTtcbiAgU3dpcGVyLnByb3RvdHlwZS5zbGlkZXNQZXJWaWV3RHluYW1pYyA9IGZ1bmN0aW9uIHNsaWRlc1BlclZpZXdEeW5hbWljICgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgICB2YXIgc2xpZGVzR3JpZCA9IHN3aXBlci5zbGlkZXNHcmlkO1xuICAgIHZhciBzd2lwZXJTaXplID0gc3dpcGVyLnNpemU7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgIHZhciBzcHYgPSAxO1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIHZhciBzbGlkZVNpemUgPSBzbGlkZXNbYWN0aXZlSW5kZXhdLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgIHZhciBicmVha0xvb3A7XG4gICAgICBmb3IgKHZhciBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzbGlkZXNbaV0gJiYgIWJyZWFrTG9vcCkge1xuICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSB7IGJyZWFrTG9vcCA9IHRydWU7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSQxID0gYWN0aXZlSW5kZXggLSAxOyBpJDEgPj0gMDsgaSQxIC09IDEpIHtcbiAgICAgICAgaWYgKHNsaWRlc1tpJDFdICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICBzbGlkZVNpemUgKz0gc2xpZGVzW2kkMV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSB7IGJyZWFrTG9vcCA9IHRydWU7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpJDIgPSBhY3RpdmVJbmRleCArIDE7IGkkMiA8IHNsaWRlcy5sZW5ndGg7IGkkMiArPSAxKSB7XG4gICAgICAgIGlmIChzbGlkZXNHcmlkW2kkMl0gLSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSA8IHN3aXBlclNpemUpIHtcbiAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3B2O1xuICB9O1xuICBTd2lwZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSQkMSAoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cbiAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuXG4gICAgdmFyIG5ld1RyYW5zbGF0ZTtcbiAgICBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heChzd2lwZXIudHJhbnNsYXRlLCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpLCBzd2lwZXIubWluVHJhbnNsYXRlKCkpO1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgIH1cbiAgICB2YXIgdHJhbnNsYXRlZDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICgoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgfHwgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghdHJhbnNsYXRlZCkge1xuICAgICAgICBzZXRUcmFuc2xhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ3VwZGF0ZScpO1xuICB9O1xuICBTd2lwZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiBpbml0ICgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLmluaXRpYWxpemVkKSB7IHJldHVybjsgfVxuXG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZUluaXQnKTtcblxuICAgIC8vIFNldCBicmVha3BvaW50XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIENsYXNzZXNcbiAgICBzd2lwZXIuYWRkQ2xhc3NlcygpO1xuXG4gICAgLy8gQ3JlYXRlIGxvb3BcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBzaXplXG4gICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcblxuICAgIC8vIFVwZGF0ZSBzbGlkZXNcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG5cbiAgICAvLyBTZXQgR3JhYiBDdXJzb3JcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcigpO1xuICAgIH1cblxuICAgIGlmIChzd2lwZXIucGFyYW1zLnByZWxvYWRJbWFnZXMpIHtcbiAgICAgIHN3aXBlci5wcmVsb2FkSW1hZ2VzKCk7XG4gICAgfVxuXG4gICAgLy8gU2xpZGUgVG8gSW5pdGlhbCBTbGlkZVxuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSwgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpO1xuICAgIH1cblxuICAgIC8vIEF0dGFjaCBldmVudHNcbiAgICBzd2lwZXIuYXR0YWNoRXZlbnRzKCk7XG5cbiAgICAvLyBJbml0IEZsYWdcbiAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgLy8gRW1pdFxuICAgIHN3aXBlci5lbWl0KCdpbml0Jyk7XG4gIH07XG4gIFN3aXBlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3kgKGRlbGV0ZUluc3RhbmNlLCBjbGVhblN0eWxlcykge1xuICAgIGlmICggZGVsZXRlSW5zdGFuY2UgPT09IHZvaWQgMCApIGRlbGV0ZUluc3RhbmNlID0gdHJ1ZTtcbiAgICBpZiAoIGNsZWFuU3R5bGVzID09PSB2b2lkIDAgKSBjbGVhblN0eWxlcyA9IHRydWU7XG5cbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgJGVsID0gc3dpcGVyLiRlbDtcbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgIHN3aXBlci5lbWl0KCdiZWZvcmVEZXN0cm95Jyk7XG5cbiAgICAvLyBJbml0IEZsYWdcbiAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIC8vIERldGFjaCBldmVudHNcbiAgICBzd2lwZXIuZGV0YWNoRXZlbnRzKCk7XG5cbiAgICAvLyBEZXN0cm95IGxvb3BcbiAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vIENsZWFudXAgc3R5bGVzXG4gICAgaWYgKGNsZWFuU3R5bGVzKSB7XG4gICAgICBzd2lwZXIucmVtb3ZlQ2xhc3NlcygpO1xuICAgICAgJGVsLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAkd3JhcHBlckVsLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICBpZiAoc2xpZGVzICYmIHNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgc2xpZGVzXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKFtcbiAgICAgICAgICAgIHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyxcbiAgICAgICAgICAgIHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzLFxuICAgICAgICAgICAgcGFyYW1zLnNsaWRlTmV4dENsYXNzLFxuICAgICAgICAgICAgcGFyYW1zLnNsaWRlUHJldkNsYXNzIF0uam9pbignICcpKVxuICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JylcbiAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItY29sdW1uJylcbiAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItcm93Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpcGVyLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgIC8vIERldGFjaCBlbWl0dGVyIGV2ZW50c1xuICAgIE9iamVjdC5rZXlzKHN3aXBlci5ldmVudHNMaXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgc3dpcGVyLm9mZihldmVudE5hbWUpO1xuICAgIH0pO1xuXG4gICAgaWYgKGRlbGV0ZUluc3RhbmNlICE9PSBmYWxzZSkge1xuICAgICAgc3dpcGVyLiRlbFswXS5zd2lwZXIgPSBudWxsO1xuICAgICAgc3dpcGVyLiRlbC5kYXRhKCdzd2lwZXInLCBudWxsKTtcbiAgICAgIFV0aWxzLmRlbGV0ZVByb3BzKHN3aXBlcik7XG4gICAgfVxuICAgIHN3aXBlci5kZXN0cm95ZWQgPSB0cnVlO1xuICB9O1xuICBTd2lwZXIuZXh0ZW5kRGVmYXVsdHMgPSBmdW5jdGlvbiBleHRlbmREZWZhdWx0cyAobmV3RGVmYXVsdHMpIHtcbiAgICBVdGlscy5leHRlbmQoZXh0ZW5kZWREZWZhdWx0cywgbmV3RGVmYXVsdHMpO1xuICB9O1xuICBzdGF0aWNBY2Nlc3NvcnMuZXh0ZW5kZWREZWZhdWx0cy5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV4dGVuZGVkRGVmYXVsdHM7XG4gIH07XG4gIHN0YXRpY0FjY2Vzc29ycy5kZWZhdWx0cy5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRzO1xuICB9O1xuICBzdGF0aWNBY2Nlc3NvcnMuQ2xhc3MuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBTd2lwZXJDbGFzcyQkMTtcbiAgfTtcbiAgc3RhdGljQWNjZXNzb3JzLiQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAkJDE7XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFN3aXBlciwgc3RhdGljQWNjZXNzb3JzICk7XG5cbiAgcmV0dXJuIFN3aXBlcjtcbn0oU3dpcGVyQ2xhc3MpKTtcblxudmFyIERldmljZSQyID0ge1xuICBuYW1lOiAnZGV2aWNlJyxcbiAgcHJvdG86IHtcbiAgICBkZXZpY2U6IERldmljZSxcbiAgfSxcbiAgc3RhdGljOiB7XG4gICAgZGV2aWNlOiBEZXZpY2UsXG4gIH0sXG59O1xuXG52YXIgU3VwcG9ydCQyID0ge1xuICBuYW1lOiAnc3VwcG9ydCcsXG4gIHByb3RvOiB7XG4gICAgc3VwcG9ydDogU3VwcG9ydCxcbiAgfSxcbiAgc3RhdGljOiB7XG4gICAgc3VwcG9ydDogU3VwcG9ydCxcbiAgfSxcbn07XG5cbnZhciBCcm93c2VyJDIgPSB7XG4gIG5hbWU6ICdicm93c2VyJyxcbiAgcHJvdG86IHtcbiAgICBicm93c2VyOiBCcm93c2VyLFxuICB9LFxuICBzdGF0aWM6IHtcbiAgICBicm93c2VyOiBCcm93c2VyLFxuICB9LFxufTtcblxudmFyIFJlc2l6ZSA9IHtcbiAgbmFtZTogJ3Jlc2l6ZScsXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIHJlc2l6ZToge1xuICAgICAgICByZXNpemVIYW5kbGVyOiBmdW5jdGlvbiByZXNpemVIYW5kbGVyKCkge1xuICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlUmVzaXplJyk7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ3Jlc2l6ZScpO1xuICAgICAgICB9LFxuICAgICAgICBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXI6IGZ1bmN0aW9uIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcigpIHtcbiAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ29yaWVudGF0aW9uY2hhbmdlJyk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIC8vIEVtaXQgcmVzaXplXG4gICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3dpcGVyLnJlc2l6ZS5yZXNpemVIYW5kbGVyKTtcblxuICAgICAgLy8gRW1pdCBvcmllbnRhdGlvbmNoYW5nZVxuICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgc3dpcGVyLnJlc2l6ZS5vcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIpO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHN3aXBlci5yZXNpemUucmVzaXplSGFuZGxlcik7XG4gICAgICB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBzd2lwZXIucmVzaXplLm9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gICAgfSxcbiAgfSxcbn07XG5cbnZhciBPYnNlcnZlciA9IHtcbiAgZnVuYzogd2luLk11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luLldlYmtpdE11dGF0aW9uT2JzZXJ2ZXIsXG4gIGF0dGFjaDogZnVuY3Rpb24gYXR0YWNoKHRhcmdldCwgb3B0aW9ucykge1xuICAgIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG5cbiAgICB2YXIgT2JzZXJ2ZXJGdW5jID0gT2JzZXJ2ZXIuZnVuYztcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXJGdW5jKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICBzd2lwZXIuZW1pdCgnb2JzZXJ2ZXJVcGRhdGUnLCBtdXRhdGlvbik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmF0dHJpYnV0ZXMsXG4gICAgICBjaGlsZExpc3Q6IHR5cGVvZiBvcHRpb25zLmNoaWxkTGlzdCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGlsZExpc3QsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0eXBlb2Ygb3B0aW9ucy5jaGFyYWN0ZXJEYXRhID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoYXJhY3RlckRhdGEsXG4gICAgfSk7XG5cbiAgICBzd2lwZXIub2JzZXJ2ZXIub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICB9LFxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghU3VwcG9ydC5vYnNlcnZlciB8fCAhc3dpcGVyLnBhcmFtcy5vYnNlcnZlcikgeyByZXR1cm47IH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5vYnNlcnZlUGFyZW50cykge1xuICAgICAgdmFyIGNvbnRhaW5lclBhcmVudHMgPSBzd2lwZXIuJGVsLnBhcmVudHMoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVyUGFyZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzd2lwZXIub2JzZXJ2ZXIuYXR0YWNoKGNvbnRhaW5lclBhcmVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBPYnNlcnZlIGNvbnRhaW5lclxuICAgIHN3aXBlci5vYnNlcnZlci5hdHRhY2goc3dpcGVyLiRlbFswXSwgeyBjaGlsZExpc3Q6IGZhbHNlIH0pO1xuXG4gICAgLy8gT2JzZXJ2ZSB3cmFwcGVyXG4gICAgc3dpcGVyLm9ic2VydmVyLmF0dGFjaChzd2lwZXIuJHdyYXBwZXJFbFswXSwgeyBhdHRyaWJ1dGVzOiBmYWxzZSB9KTtcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBzd2lwZXIub2JzZXJ2ZXIub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgc3dpcGVyLm9ic2VydmVyLm9ic2VydmVycyA9IFtdO1xuICB9LFxufTtcblxudmFyIE9ic2VydmVyJDEgPSB7XG4gIG5hbWU6ICdvYnNlcnZlcicsXG4gIHBhcmFtczoge1xuICAgIG9ic2VydmVyOiBmYWxzZSxcbiAgICBvYnNlcnZlUGFyZW50czogZmFsc2UsXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIG9ic2VydmVyOiB7XG4gICAgICAgIGluaXQ6IE9ic2VydmVyLmluaXQuYmluZChzd2lwZXIpLFxuICAgICAgICBhdHRhY2g6IE9ic2VydmVyLmF0dGFjaC5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IE9ic2VydmVyLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxuICAgICAgICBvYnNlcnZlcnM6IFtdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIub2JzZXJ2ZXIuaW5pdCgpO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLm9ic2VydmVyLmRlc3Ryb3koKTtcbiAgICB9LFxuICB9LFxufTtcblxudmFyIFZpcnR1YWwgPSB7XG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGZvcmNlKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHJlZiA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyIHNsaWRlc1BlclZpZXcgPSByZWYuc2xpZGVzUGVyVmlldztcbiAgICB2YXIgc2xpZGVzUGVyR3JvdXAgPSByZWYuc2xpZGVzUGVyR3JvdXA7XG4gICAgdmFyIGNlbnRlcmVkU2xpZGVzID0gcmVmLmNlbnRlcmVkU2xpZGVzO1xuICAgIHZhciByZWYkMSA9IHN3aXBlci52aXJ0dWFsO1xuICAgIHZhciBwcmV2aW91c0Zyb20gPSByZWYkMS5mcm9tO1xuICAgIHZhciBwcmV2aW91c1RvID0gcmVmJDEudG87XG4gICAgdmFyIHNsaWRlcyA9IHJlZiQxLnNsaWRlcztcbiAgICB2YXIgcHJldmlvdXNTbGlkZXNHcmlkID0gcmVmJDEuc2xpZGVzR3JpZDtcbiAgICB2YXIgcmVuZGVyU2xpZGUgPSByZWYkMS5yZW5kZXJTbGlkZTtcbiAgICB2YXIgcHJldmlvdXNPZmZzZXQgPSByZWYkMS5vZmZzZXQ7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4IHx8IDA7XG5cbiAgICB2YXIgb2Zmc2V0UHJvcDtcbiAgICBpZiAoc3dpcGVyLnJ0bCAmJiBzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHsgb2Zmc2V0UHJvcCA9ICdyaWdodCc7IH1cbiAgICBlbHNlIHsgb2Zmc2V0UHJvcCA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnOyB9XG5cbiAgICB2YXIgc2xpZGVzQWZ0ZXI7XG4gICAgdmFyIHNsaWRlc0JlZm9yZTtcbiAgICBpZiAoY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIHNsaWRlc0FmdGVyID0gTWF0aC5mbG9vcihzbGlkZXNQZXJWaWV3IC8gMikgKyBzbGlkZXNQZXJHcm91cDtcbiAgICAgIHNsaWRlc0JlZm9yZSA9IE1hdGguZmxvb3Ioc2xpZGVzUGVyVmlldyAvIDIpICsgc2xpZGVzUGVyR3JvdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlc0FmdGVyID0gc2xpZGVzUGVyVmlldyArIChzbGlkZXNQZXJHcm91cCAtIDEpO1xuICAgICAgc2xpZGVzQmVmb3JlID0gc2xpZGVzUGVyR3JvdXA7XG4gICAgfVxuICAgIHZhciBmcm9tID0gTWF0aC5tYXgoKGFjdGl2ZUluZGV4IHx8IDApIC0gc2xpZGVzQmVmb3JlLCAwKTtcbiAgICB2YXIgdG8gPSBNYXRoLm1pbigoYWN0aXZlSW5kZXggfHwgMCkgKyBzbGlkZXNBZnRlciwgc2xpZGVzLmxlbmd0aCAtIDEpO1xuICAgIHZhciBvZmZzZXQgPSAoc3dpcGVyLnNsaWRlc0dyaWRbZnJvbV0gfHwgMCkgLSAoc3dpcGVyLnNsaWRlc0dyaWRbMF0gfHwgMCk7XG5cbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLnZpcnR1YWwsIHtcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG8sXG4gICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgIHNsaWRlc0dyaWQ6IHN3aXBlci5zbGlkZXNHcmlkLFxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb25SZW5kZXJlZCgpIHtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIGlmIChzd2lwZXIubGF6eSAmJiBzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByZXZpb3VzRnJvbSA9PT0gZnJvbSAmJiBwcmV2aW91c1RvID09PSB0byAmJiAhZm9yY2UpIHtcbiAgICAgIGlmIChzd2lwZXIuc2xpZGVzR3JpZCAhPT0gcHJldmlvdXNTbGlkZXNHcmlkICYmIG9mZnNldCAhPT0gcHJldmlvdXNPZmZzZXQpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlcy5jc3Mob2Zmc2V0UHJvcCwgKG9mZnNldCArIFwicHhcIikpO1xuICAgICAgfVxuICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwucmVuZGVyRXh0ZXJuYWwpIHtcbiAgICAgIHN3aXBlci5wYXJhbXMudmlydHVhbC5yZW5kZXJFeHRlcm5hbC5jYWxsKHN3aXBlciwge1xuICAgICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgZnJvbTogZnJvbSxcbiAgICAgICAgdG86IHRvLFxuICAgICAgICBzbGlkZXM6IChmdW5jdGlvbiBnZXRTbGlkZXMoKSB7XG4gICAgICAgICAgdmFyIHNsaWRlc1RvUmVuZGVyID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IGZyb207IGkgPD0gdG87IGkgKz0gMSkge1xuICAgICAgICAgICAgc2xpZGVzVG9SZW5kZXIucHVzaChzbGlkZXNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc2xpZGVzVG9SZW5kZXI7XG4gICAgICAgIH0oKSksXG4gICAgICB9KTtcbiAgICAgIG9uUmVuZGVyZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByZXBlbmRJbmRleGVzID0gW107XG4gICAgdmFyIGFwcGVuZEluZGV4ZXMgPSBbXTtcbiAgICBpZiAoZm9yY2UpIHtcbiAgICAgIHN3aXBlci4kd3JhcHBlckVsLmZpbmQoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykpKS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IHByZXZpb3VzRnJvbTsgaSA8PSBwcmV2aW91c1RvOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGkgPCBmcm9tIHx8IGkgPiB0bykge1xuICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmZpbmQoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBpICsgXCJcXFwiXVwiKSkucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgc2xpZGVzLmxlbmd0aDsgaSQxICs9IDEpIHtcbiAgICAgIGlmIChpJDEgPj0gZnJvbSAmJiBpJDEgPD0gdG8pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcmV2aW91c1RvID09PSAndW5kZWZpbmVkJyB8fCBmb3JjZSkge1xuICAgICAgICAgIGFwcGVuZEluZGV4ZXMucHVzaChpJDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpJDEgPiBwcmV2aW91c1RvKSB7IGFwcGVuZEluZGV4ZXMucHVzaChpJDEpOyB9XG4gICAgICAgICAgaWYgKGkkMSA8IHByZXZpb3VzRnJvbSkgeyBwcmVwZW5kSW5kZXhlcy5wdXNoKGkkMSk7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRJbmRleGVzLmZvckVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICBzd2lwZXIuJHdyYXBwZXJFbC5hcHBlbmQocmVuZGVyU2xpZGUoc2xpZGVzW2luZGV4XSwgaW5kZXgpKTtcbiAgICB9KTtcbiAgICBwcmVwZW5kSW5kZXhlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhIDwgYjsgfSkuZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHN3aXBlci4kd3JhcHBlckVsLnByZXBlbmQocmVuZGVyU2xpZGUoc2xpZGVzW2luZGV4XSwgaW5kZXgpKTtcbiAgICB9KTtcbiAgICBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbignLnN3aXBlci1zbGlkZScpLmNzcyhvZmZzZXRQcm9wLCAob2Zmc2V0ICsgXCJweFwiKSk7XG4gICAgb25SZW5kZXJlZCgpO1xuICB9LFxuICByZW5kZXJTbGlkZTogZnVuY3Rpb24gcmVuZGVyU2xpZGUoc2xpZGUsIGluZGV4KSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMudmlydHVhbDtcbiAgICBpZiAocGFyYW1zLmNhY2hlICYmIHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XSkge1xuICAgICAgcmV0dXJuIHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XTtcbiAgICB9XG4gICAgdmFyICRzbGlkZUVsID0gcGFyYW1zLnJlbmRlclNsaWRlXG4gICAgICA/ICQkMShwYXJhbXMucmVuZGVyU2xpZGUuY2FsbChzd2lwZXIsIHNsaWRlLCBpbmRleCkpXG4gICAgICA6ICQkMSgoXCI8ZGl2IGNsYXNzPVxcXCJcIiArIChzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpICsgXCJcXFwiIGRhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIGluZGV4ICsgXCJcXFwiPlwiICsgc2xpZGUgKyBcIjwvZGl2PlwiKSk7XG4gICAgaWYgKCEkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpKSB7ICRzbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JywgaW5kZXgpOyB9XG4gICAgaWYgKHBhcmFtcy5jYWNoZSkgeyBzd2lwZXIudmlydHVhbC5jYWNoZVtpbmRleF0gPSAkc2xpZGVFbDsgfVxuICAgIHJldHVybiAkc2xpZGVFbDtcbiAgfSxcbiAgYXBwZW5kU2xpZGU6IGZ1bmN0aW9uIGFwcGVuZFNsaWRlKHNsaWRlKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnB1c2goc2xpZGUpO1xuICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgfSxcbiAgcHJlcGVuZFNsaWRlOiBmdW5jdGlvbiBwcmVwZW5kU2xpZGUoc2xpZGUpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBzd2lwZXIudmlydHVhbC5zbGlkZXMudW5zaGlmdChzbGlkZSk7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbC5jYWNoZSkge1xuICAgICAgdmFyIGNhY2hlID0gc3dpcGVyLnZpcnR1YWwuY2FjaGU7XG4gICAgICB2YXIgbmV3Q2FjaGUgPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGNhY2hlKS5mb3JFYWNoKGZ1bmN0aW9uIChjYWNoZWRJbmRleCkge1xuICAgICAgICBuZXdDYWNoZVtjYWNoZWRJbmRleCArIDFdID0gY2FjaGVbY2FjaGVkSW5kZXhdO1xuICAgICAgfSk7XG4gICAgICBzd2lwZXIudmlydHVhbC5jYWNoZSA9IG5ld0NhY2hlO1xuICAgIH1cbiAgICBzd2lwZXIudmlydHVhbC51cGRhdGUodHJ1ZSk7XG4gICAgc3dpcGVyLnNsaWRlTmV4dCgwKTtcbiAgfSxcbn07XG5cbnZhciBWaXJ0dWFsJDEgPSB7XG4gIG5hbWU6ICd2aXJ0dWFsJyxcbiAgcGFyYW1zOiB7XG4gICAgdmlydHVhbDoge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICBzbGlkZXM6IFtdLFxuICAgICAgY2FjaGU6IHRydWUsXG4gICAgICByZW5kZXJTbGlkZTogbnVsbCxcbiAgICAgIHJlbmRlckV4dGVybmFsOiBudWxsLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIHZpcnR1YWw6IHtcbiAgICAgICAgdXBkYXRlOiBWaXJ0dWFsLnVwZGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGFwcGVuZFNsaWRlOiBWaXJ0dWFsLmFwcGVuZFNsaWRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgcHJlcGVuZFNsaWRlOiBWaXJ0dWFsLnByZXBlbmRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHJlbmRlclNsaWRlOiBWaXJ0dWFsLnJlbmRlclNsaWRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2xpZGVzOiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuc2xpZGVzLFxuICAgICAgICBjYWNoZToge30sXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwidmlydHVhbFwiKSk7XG4gICAgICB2YXIgb3ZlcndyaXRlUGFyYW1zID0ge1xuICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcblxuICAgICAgc3dpcGVyLnZpcnR1YWwudXBkYXRlKCk7XG4gICAgfSxcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgeyByZXR1cm47IH1cbiAgICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSgpO1xuICAgIH0sXG4gIH0sXG59O1xuXG52YXIgS2V5Ym9hcmQgPSB7XG4gIGhhbmRsZTogZnVuY3Rpb24gaGFuZGxlKGV2ZW50KSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIGUgPSBldmVudDtcbiAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSB7IGUgPSBlLm9yaWdpbmFsRXZlbnQ7IH0gLy8ganF1ZXJ5IGZpeFxuICAgIHZhciBrYyA9IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xuICAgIC8vIERpcmVjdGlvbnMgbG9ja3NcbiAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiAoKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBrYyA9PT0gMzkpIHx8IChzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIGtjID09PSA0MCkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmICgoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIGtjID09PSAzNykgfHwgKHN3aXBlci5pc1ZlcnRpY2FsKCkgJiYga2MgPT09IDM4KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkgfHwgZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ICYmIGRvYy5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lICYmIChkb2MuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnIHx8IGRvYy5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoa2MgPT09IDM3IHx8IGtjID09PSAzOSB8fCBrYyA9PT0gMzggfHwga2MgPT09IDQwKSB7XG4gICAgICB2YXIgaW5WaWV3ID0gZmFsc2U7XG4gICAgICAvLyBDaGVjayB0aGF0IHN3aXBlciBzaG91bGQgYmUgaW5zaWRlIG9mIHZpc2libGUgYXJlYSBvZiB3aW5kb3dcbiAgICAgIGlmIChzd2lwZXIuJGVsLnBhcmVudHMoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykpKS5sZW5ndGggPiAwICYmIHN3aXBlci4kZWwucGFyZW50cygoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSkpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdmFyIHdpbmRvd1Njcm9sbCA9IHtcbiAgICAgICAgbGVmdDogd2luLnBhZ2VYT2Zmc2V0LFxuICAgICAgICB0b3A6IHdpbi5wYWdlWU9mZnNldCxcbiAgICAgIH07XG4gICAgICB2YXIgd2luZG93V2lkdGggPSB3aW4uaW5uZXJXaWR0aDtcbiAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW4uaW5uZXJIZWlnaHQ7XG4gICAgICB2YXIgc3dpcGVyT2Zmc2V0ID0gc3dpcGVyLiRlbC5vZmZzZXQoKTtcbiAgICAgIGlmIChzd2lwZXIucnRsKSB7IHN3aXBlck9mZnNldC5sZWZ0IC09IHN3aXBlci4kZWxbMF0uc2Nyb2xsTGVmdDsgfVxuICAgICAgdmFyIHN3aXBlckNvb3JkID0gW1xuICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3BdLFxuICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzd2lwZXIud2lkdGgsIHN3aXBlck9mZnNldC50b3BdLFxuICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3AgKyBzd2lwZXIuaGVpZ2h0XSxcbiAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wICsgc3dpcGVyLmhlaWdodF0gXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3dpcGVyQ29vcmQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIHBvaW50ID0gc3dpcGVyQ29vcmRbaV07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwb2ludFswXSA+PSB3aW5kb3dTY3JvbGwubGVmdCAmJiBwb2ludFswXSA8PSB3aW5kb3dTY3JvbGwubGVmdCArIHdpbmRvd1dpZHRoICYmXG4gICAgICAgICAgICBwb2ludFsxXSA+PSB3aW5kb3dTY3JvbGwudG9wICYmIHBvaW50WzFdIDw9IHdpbmRvd1Njcm9sbC50b3AgKyB3aW5kb3dIZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5WaWV3ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFpblZpZXcpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuICAgIH1cbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICBpZiAoa2MgPT09IDM3IHx8IGtjID09PSAzOSkge1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cbiAgICAgICAgZWxzZSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxuICAgICAgfVxuICAgICAgaWYgKChrYyA9PT0gMzkgJiYgIXN3aXBlci5ydGwpIHx8IChrYyA9PT0gMzcgJiYgc3dpcGVyLnJ0bCkpIHsgc3dpcGVyLnNsaWRlTmV4dCgpOyB9XG4gICAgICBpZiAoKGtjID09PSAzNyAmJiAhc3dpcGVyLnJ0bCkgfHwgKGtjID09PSAzOSAmJiBzd2lwZXIucnRsKSkgeyBzd2lwZXIuc2xpZGVQcmV2KCk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGtjID09PSAzOCB8fCBrYyA9PT0gNDApIHtcbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgICAgIGVsc2UgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH1cbiAgICAgIH1cbiAgICAgIGlmIChrYyA9PT0gNDApIHsgc3dpcGVyLnNsaWRlTmV4dCgpOyB9XG4gICAgICBpZiAoa2MgPT09IDM4KSB7IHN3aXBlci5zbGlkZVByZXYoKTsgfVxuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgna2V5UHJlc3MnLCBrYyk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHN3aXBlci5rZXlib2FyZC5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICQkMShkb2MpLm9uKCdrZXlkb3duJywgc3dpcGVyLmtleWJvYXJkLmhhbmRsZSk7XG4gICAgc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQgPSB0cnVlO1xuICB9LFxuICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgJCQxKGRvYykub2ZmKCdrZXlkb3duJywgc3dpcGVyLmtleWJvYXJkLmhhbmRsZSk7XG4gICAgc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQgPSBmYWxzZTtcbiAgfSxcbn07XG5cbnZhciBLZXlib2FyZCQxID0ge1xuICBuYW1lOiAna2V5Ym9hcmQnLFxuICBwYXJhbXM6IHtcbiAgICBrZXlib2FyZDoge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAga2V5Ym9hcmQ6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGVuYWJsZTogS2V5Ym9hcmQuZW5hYmxlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgZGlzYWJsZTogS2V5Ym9hcmQuZGlzYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGhhbmRsZTogS2V5Ym9hcmQuaGFuZGxlLmJpbmQoc3dpcGVyKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG4gIG9uOiB7XG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMua2V5Ym9hcmQuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIua2V5Ym9hcmQuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcblxuZnVuY3Rpb24gaXNFdmVudFN1cHBvcnRlZCgpIHtcbiAgdmFyIGV2ZW50TmFtZSA9ICdvbndoZWVsJztcbiAgdmFyIGlzU3VwcG9ydGVkID0gZXZlbnROYW1lIGluIGRvYztcblxuICBpZiAoIWlzU3VwcG9ydGVkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoZXZlbnROYW1lLCAncmV0dXJuOycpO1xuICAgIGlzU3VwcG9ydGVkID0gdHlwZW9mIGVsZW1lbnRbZXZlbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIGlmICghaXNTdXBwb3J0ZWQgJiZcbiAgICBkb2MuaW1wbGVtZW50YXRpb24gJiZcbiAgICBkb2MuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSAmJlxuICAgIC8vIGFsd2F5cyByZXR1cm5zIHRydWUgaW4gbmV3ZXIgYnJvd3NlcnMgYXMgcGVyIHRoZSBzdGFuZGFyZC5cbiAgICAvLyBAc2VlIGh0dHA6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNkb20tZG9taW1wbGVtZW50YXRpb24taGFzZmVhdHVyZVxuICAgIGRvYy5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCcnLCAnJykgIT09IHRydWVcbiAgKSB7XG4gICAgLy8gVGhpcyBpcyB0aGUgb25seSB3YXkgdG8gdGVzdCBzdXBwb3J0IGZvciB0aGUgYHdoZWVsYCBldmVudCBpbiBJRTkrLlxuICAgIGlzU3VwcG9ydGVkID0gZG9jLmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoJ0V2ZW50cy53aGVlbCcsICczLjAnKTtcbiAgfVxuXG4gIHJldHVybiBpc1N1cHBvcnRlZDtcbn1cbnZhciBNb3VzZXdoZWVsID0ge1xuICBsYXN0U2Nyb2xsVGltZTogVXRpbHMubm93KCksXG4gIGV2ZW50OiAoZnVuY3Rpb24gZ2V0RXZlbnQoKSB7XG4gICAgaWYgKHdpbi5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xKSB7IHJldHVybiAnRE9NTW91c2VTY3JvbGwnOyB9XG4gICAgcmV0dXJuIGlzRXZlbnRTdXBwb3J0ZWQoKSA/ICd3aGVlbCcgOiAnbW91c2V3aGVlbCc7XG4gIH0oKSksXG4gIG5vcm1hbGl6ZTogZnVuY3Rpb24gbm9ybWFsaXplKGUpIHtcbiAgICAvLyBSZWFzb25hYmxlIGRlZmF1bHRzXG4gICAgdmFyIFBJWEVMX1NURVAgPSAxMDtcbiAgICB2YXIgTElORV9IRUlHSFQgPSA0MDtcbiAgICB2YXIgUEFHRV9IRUlHSFQgPSA4MDA7XG5cbiAgICB2YXIgc1ggPSAwO1xuICAgIHZhciBzWSA9IDA7IC8vIHNwaW5YLCBzcGluWVxuICAgIHZhciBwWCA9IDA7XG4gICAgdmFyIHBZID0gMDsgLy8gcGl4ZWxYLCBwaXhlbFlcblxuICAgIC8vIExlZ2FjeVxuICAgIGlmICgnZGV0YWlsJyBpbiBlKSB7XG4gICAgICBzWSA9IGUuZGV0YWlsO1xuICAgIH1cbiAgICBpZiAoJ3doZWVsRGVsdGEnIGluIGUpIHtcbiAgICAgIHNZID0gLWUud2hlZWxEZWx0YSAvIDEyMDtcbiAgICB9XG4gICAgaWYgKCd3aGVlbERlbHRhWScgaW4gZSkge1xuICAgICAgc1kgPSAtZS53aGVlbERlbHRhWSAvIDEyMDtcbiAgICB9XG4gICAgaWYgKCd3aGVlbERlbHRhWCcgaW4gZSkge1xuICAgICAgc1ggPSAtZS53aGVlbERlbHRhWCAvIDEyMDtcbiAgICB9XG5cbiAgICAvLyBzaWRlIHNjcm9sbGluZyBvbiBGRiB3aXRoIERPTU1vdXNlU2Nyb2xsXG4gICAgaWYgKCdheGlzJyBpbiBlICYmIGUuYXhpcyA9PT0gZS5IT1JJWk9OVEFMX0FYSVMpIHtcbiAgICAgIHNYID0gc1k7XG4gICAgICBzWSA9IDA7XG4gICAgfVxuXG4gICAgcFggPSBzWCAqIFBJWEVMX1NURVA7XG4gICAgcFkgPSBzWSAqIFBJWEVMX1NURVA7XG5cbiAgICBpZiAoJ2RlbHRhWScgaW4gZSkge1xuICAgICAgcFkgPSBlLmRlbHRhWTtcbiAgICB9XG4gICAgaWYgKCdkZWx0YVgnIGluIGUpIHtcbiAgICAgIHBYID0gZS5kZWx0YVg7XG4gICAgfVxuXG4gICAgaWYgKChwWCB8fCBwWSkgJiYgZS5kZWx0YU1vZGUpIHtcbiAgICAgIGlmIChlLmRlbHRhTW9kZSA9PT0gMSkgeyAvLyBkZWx0YSBpbiBMSU5FIHVuaXRzXG4gICAgICAgIHBYICo9IExJTkVfSEVJR0hUO1xuICAgICAgICBwWSAqPSBMSU5FX0hFSUdIVDtcbiAgICAgIH0gZWxzZSB7IC8vIGRlbHRhIGluIFBBR0UgdW5pdHNcbiAgICAgICAgcFggKj0gUEFHRV9IRUlHSFQ7XG4gICAgICAgIHBZICo9IFBBR0VfSEVJR0hUO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZhbGwtYmFjayBpZiBzcGluIGNhbm5vdCBiZSBkZXRlcm1pbmVkXG4gICAgaWYgKHBYICYmICFzWCkge1xuICAgICAgc1ggPSAocFggPCAxKSA/IC0xIDogMTtcbiAgICB9XG4gICAgaWYgKHBZICYmICFzWSkge1xuICAgICAgc1kgPSAocFkgPCAxKSA/IC0xIDogMTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3Bpblg6IHNYLFxuICAgICAgc3Bpblk6IHNZLFxuICAgICAgcGl4ZWxYOiBwWCxcbiAgICAgIHBpeGVsWTogcFksXG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlOiBmdW5jdGlvbiBoYW5kbGUoZXZlbnQpIHtcbiAgICB2YXIgZSA9IGV2ZW50O1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWw7XG4gICAgaWYgKGUub3JpZ2luYWxFdmVudCkgeyBlID0gZS5vcmlnaW5hbEV2ZW50OyB9IC8vIGpxdWVyeSBmaXhcbiAgICB2YXIgZGVsdGEgPSAwO1xuICAgIHZhciBydGxGYWN0b3IgPSBzd2lwZXIucnRsID8gLTEgOiAxO1xuXG4gICAgdmFyIGRhdGEgPSBNb3VzZXdoZWVsLm5vcm1hbGl6ZShlKTtcblxuICAgIGlmIChwYXJhbXMuZm9yY2VUb0F4aXMpIHtcbiAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxYKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxZKSkgeyBkZWx0YSA9IGRhdGEucGl4ZWxYICogcnRsRmFjdG9yOyB9XG4gICAgICAgIGVsc2UgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWSkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWCkpIHsgZGVsdGEgPSBkYXRhLnBpeGVsWTsgfVxuICAgICAgZWxzZSB7IHJldHVybiB0cnVlOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbHRhID0gTWF0aC5hYnMoZGF0YS5waXhlbFgpID4gTWF0aC5hYnMoZGF0YS5waXhlbFkpID8gLWRhdGEucGl4ZWxYICogcnRsRmFjdG9yIDogLWRhdGEucGl4ZWxZO1xuICAgIH1cblxuICAgIGlmIChkZWx0YSA9PT0gMCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgaWYgKHBhcmFtcy5pbnZlcnQpIHsgZGVsdGEgPSAtZGVsdGE7IH1cblxuICAgIGlmICghc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgaWYgKFV0aWxzLm5vdygpIC0gc3dpcGVyLm1vdXNld2hlZWwubGFzdFNjcm9sbFRpbWUgPiA2MCkge1xuICAgICAgICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgICAgICAgaWYgKCghc3dpcGVyLmlzRW5kIHx8IHN3aXBlci5wYXJhbXMubG9vcCkgJiYgIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGwnLCBlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yZWxlYXNlT25FZGdlcykgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICB9IGVsc2UgaWYgKCghc3dpcGVyLmlzQmVnaW5uaW5nIHx8IHN3aXBlci5wYXJhbXMubG9vcCkgJiYgIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ3Njcm9sbCcsIGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yZWxlYXNlT25FZGdlcykgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfVxuICAgICAgc3dpcGVyLm1vdXNld2hlZWwubGFzdFNjcm9sbFRpbWUgPSAobmV3IHdpbi5EYXRlKCkpLmdldFRpbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRnJlZW1vZGUgb3Igc2Nyb2xsQ29udGFpbmVyOlxuICAgICAgdmFyIHBvc2l0aW9uID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpICsgKGRlbHRhICogcGFyYW1zLnNlbnNpdGl2aXR5KTtcbiAgICAgIHZhciB3YXNCZWdpbm5pbmcgPSBzd2lwZXIuaXNCZWdpbm5pbmc7XG4gICAgICB2YXIgd2FzRW5kID0gc3dpcGVyLmlzRW5kO1xuXG4gICAgICBpZiAocG9zaXRpb24gPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7IHBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpOyB9XG4gICAgICBpZiAocG9zaXRpb24gPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7IHBvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpOyB9XG5cbiAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShwb3NpdGlvbik7XG4gICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcblxuICAgICAgaWYgKCghd2FzQmVnaW5uaW5nICYmIHN3aXBlci5pc0JlZ2lubmluZykgfHwgKCF3YXNFbmQgJiYgc3dpcGVyLmlzRW5kKSkge1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICBjbGVhclRpbWVvdXQoc3dpcGVyLm1vdXNld2hlZWwudGltZW91dCk7XG4gICAgICAgIHN3aXBlci5tb3VzZXdoZWVsLnRpbWVvdXQgPSBVdGlscy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlUmVzZXQoKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH1cbiAgICAgIC8vIEVtaXQgZXZlbnRcbiAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGwnLCBlKTtcblxuICAgICAgLy8gU3RvcCBhdXRvcGxheVxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkgJiYgc3dpcGVyLnBhcmFtcy5hdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uKSB7IHN3aXBlci5zdG9wQXV0b3BsYXkoKTsgfVxuXG4gICAgICAvLyBSZXR1cm4gcGFnZSBzY3JvbGwgb24gZWRnZSBwb3NpdGlvbnNcbiAgICAgIGlmIChwb3NpdGlvbiA9PT0gMCB8fCBwb3NpdGlvbiA9PT0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7IHJldHVybiB0cnVlOyB9XG4gICAgfVxuXG4gICAgaWYgKGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgZWxzZSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFNb3VzZXdoZWVsLmV2ZW50KSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmIChzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIHZhciB0YXJnZXQgPSBzd2lwZXIuJGVsO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkICE9PSAnY29udGFpbmVyJykge1xuICAgICAgdGFyZ2V0ID0gJCQxKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQpO1xuICAgIH1cbiAgICB0YXJnZXQub24oTW91c2V3aGVlbC5ldmVudCwgc3dpcGVyLm1vdXNld2hlZWwuaGFuZGxlKTtcbiAgICBzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIU1vdXNld2hlZWwuZXZlbnQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKCFzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIHZhciB0YXJnZXQgPSBzd2lwZXIuJGVsO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkICE9PSAnY29udGFpbmVyJykge1xuICAgICAgdGFyZ2V0ID0gJCQxKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQpO1xuICAgIH1cbiAgICB0YXJnZXQub2ZmKE1vdXNld2hlZWwuZXZlbnQsIHN3aXBlci5tb3VzZXdoZWVsLmhhbmRsZSk7XG4gICAgc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxufTtcblxudmFyIE1vdXNld2hlZWwkMSA9IHtcbiAgbmFtZTogJ21vdXNld2hlZWwnLFxuICBwYXJhbXM6IHtcbiAgICBtb3VzZXdoZWVsOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcbiAgICAgIGludmVydDogZmFsc2UsXG4gICAgICBmb3JjZVRvQXhpczogZmFsc2UsXG4gICAgICBzZW5zaXRpdml0eTogMSxcbiAgICAgIGV2ZW50c1RhcmdlZDogJ2NvbnRhaW5lcicsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgbW91c2V3aGVlbDoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgZW5hYmxlOiBNb3VzZXdoZWVsLmVuYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGRpc2FibGU6IE1vdXNld2hlZWwuZGlzYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGhhbmRsZTogTW91c2V3aGVlbC5oYW5kbGUuYmluZChzd2lwZXIpLFxuICAgICAgICBsYXN0U2Nyb2xsVGltZTogVXRpbHMubm93KCksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZW5hYmxlZCkgeyBzd2lwZXIubW91c2V3aGVlbC5lbmFibGUoKTsgfVxuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIHsgc3dpcGVyLm1vdXNld2hlZWwuZGlzYWJsZSgpOyB9XG4gICAgfSxcbiAgfSxcbn07XG5cbnZhciBOYXZpZ2F0aW9uID0ge1xuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAvLyBVcGRhdGUgTmF2aWdhdGlvbiBCdXR0b25zXG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbjtcblxuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHsgcmV0dXJuOyB9XG4gICAgdmFyIHJlZiA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIHZhciAkbmV4dEVsID0gcmVmLiRuZXh0RWw7XG4gICAgdmFyICRwcmV2RWwgPSByZWYuJHByZXZFbDtcblxuICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgICAkcHJldkVsLmFkZENsYXNzKHBhcmFtcy5kaXNhYmxlZENsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRwcmV2RWwucmVtb3ZlQ2xhc3MocGFyYW1zLmRpc2FibGVkQ2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgJG5leHRFbC5hZGRDbGFzcyhwYXJhbXMuZGlzYWJsZWRDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbmV4dEVsLnJlbW92ZUNsYXNzKHBhcmFtcy5kaXNhYmxlZENsYXNzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbjtcbiAgICBpZiAoIShwYXJhbXMubmV4dEVsIHx8IHBhcmFtcy5wcmV2RWwpKSB7IHJldHVybjsgfVxuXG4gICAgdmFyICRuZXh0RWw7XG4gICAgdmFyICRwcmV2RWw7XG4gICAgaWYgKHBhcmFtcy5uZXh0RWwpIHtcbiAgICAgICRuZXh0RWwgPSAkJDEocGFyYW1zLm5leHRFbCk7XG4gICAgICBpZiAoXG4gICAgICAgIHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiZcbiAgICAgICAgdHlwZW9mIHBhcmFtcy5uZXh0RWwgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICRuZXh0RWwubGVuZ3RoID4gMSAmJlxuICAgICAgICBzd2lwZXIuJGVsLmZpbmQocGFyYW1zLm5leHRFbCkubGVuZ3RoID09PSAxXG4gICAgICApIHtcbiAgICAgICAgJG5leHRFbCA9IHN3aXBlci4kZWwuZmluZChwYXJhbXMubmV4dEVsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcmFtcy5wcmV2RWwpIHtcbiAgICAgICRwcmV2RWwgPSAkJDEocGFyYW1zLnByZXZFbCk7XG4gICAgICBpZiAoXG4gICAgICAgIHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiZcbiAgICAgICAgdHlwZW9mIHBhcmFtcy5wcmV2RWwgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICRwcmV2RWwubGVuZ3RoID4gMSAmJlxuICAgICAgICBzd2lwZXIuJGVsLmZpbmQocGFyYW1zLnByZXZFbCkubGVuZ3RoID09PSAxXG4gICAgICApIHtcbiAgICAgICAgJHByZXZFbCA9IHN3aXBlci4kZWwuZmluZChwYXJhbXMucHJldkVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCA+IDApIHtcbiAgICAgICRuZXh0RWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3ApIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoJHByZXZFbCAmJiAkcHJldkVsLmxlbmd0aCA+IDApIHtcbiAgICAgICRwcmV2RWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3ApIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIubmF2aWdhdGlvbiwge1xuICAgICAgJG5leHRFbDogJG5leHRFbCxcbiAgICAgIG5leHRFbDogJG5leHRFbCAmJiAkbmV4dEVsWzBdLFxuICAgICAgJHByZXZFbDogJHByZXZFbCxcbiAgICAgIHByZXZFbDogJHByZXZFbCAmJiAkcHJldkVsWzBdLFxuICAgIH0pO1xuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciByZWYgPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICB2YXIgJG5leHRFbCA9IHJlZi4kbmV4dEVsO1xuICAgIHZhciAkcHJldkVsID0gcmVmLiRwcmV2RWw7XG4gICAgaWYgKCRuZXh0RWwgJiYgJG5leHRFbC5sZW5ndGgpIHtcbiAgICAgICRuZXh0RWwub2ZmKCdjbGljaycpO1xuICAgICAgJG5leHRFbC5yZW1vdmVDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uZGlzYWJsZWRDbGFzcyk7XG4gICAgfVxuICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoKSB7XG4gICAgICAkcHJldkVsLm9mZignY2xpY2snKTtcbiAgICAgICRwcmV2RWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3MpO1xuICAgIH1cbiAgfSxcbn07XG5cbnZhciBOYXZpZ2F0aW9uJDEgPSB7XG4gIG5hbWU6ICduYXZpZ2F0aW9uJyxcbiAgcGFyYW1zOiB7XG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBudWxsLFxuICAgICAgcHJldkVsOiBudWxsLFxuXG4gICAgICBoaWRlT25DbGljazogZmFsc2UsXG4gICAgICBkaXNhYmxlZENsYXNzOiAnc3dpcGVyLWJ1dHRvbi1kaXNhYmxlZCcsXG4gICAgICBoaWRkZW5DbGFzczogJ3N3aXBlci1idXR0b24taGlkZGVuJyxcbiAgICB9LFxuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgIGluaXQ6IE5hdmlnYXRpb24uaW5pdC5iaW5kKHN3aXBlciksXG4gICAgICAgIHVwZGF0ZTogTmF2aWdhdGlvbi51cGRhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICBkZXN0cm95OiBOYXZpZ2F0aW9uLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIubmF2aWdhdGlvbi5pbml0KCk7XG4gICAgICBzd2lwZXIubmF2aWdhdGlvbi51cGRhdGUoKTtcbiAgICB9LFxuICAgIHRvRWRnZTogZnVuY3Rpb24gdG9FZGdlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIubmF2aWdhdGlvbi51cGRhdGUoKTtcbiAgICB9LFxuICAgIGZyb21FZGdlOiBmdW5jdGlvbiBmcm9tRWRnZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLm5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIubmF2aWdhdGlvbi5kZXN0cm95KCk7XG4gICAgfSxcbiAgICBjbGljazogZnVuY3Rpb24gY2xpY2soZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcmVmID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgICB2YXIgJG5leHRFbCA9IHJlZi4kbmV4dEVsO1xuICAgICAgdmFyICRwcmV2RWwgPSByZWYuJHByZXZFbDtcbiAgICAgIGlmIChcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGVPbkNsaWNrICYmXG4gICAgICAgICEkJDEoZS50YXJnZXQpLmlzKCRwcmV2RWwpICYmXG4gICAgICAgICEkJDEoZS50YXJnZXQpLmlzKCRuZXh0RWwpXG4gICAgICApIHtcbiAgICAgICAgaWYgKCRuZXh0RWwpIHsgJG5leHRFbC50b2dnbGVDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpOyB9XG4gICAgICAgIGlmICgkcHJldkVsKSB7ICRwcmV2RWwudG9nZ2xlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTsgfVxuICAgICAgfVxuICAgIH0sXG4gIH0sXG59O1xuXG52YXIgUGFnaW5hdGlvbiA9IHtcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgLy8gUmVuZGVyIHx8IFVwZGF0ZSBQYWdpbmF0aW9uIGJ1bGxldHMvaXRlbXNcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bDtcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGlmICghcGFyYW1zLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uJGVsIHx8IHN3aXBlci5wYWdpbmF0aW9uLiRlbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgdmFyIHNsaWRlc0xlbmd0aCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgIHZhciAkZWwgPSBzd2lwZXIucGFnaW5hdGlvbi4kZWw7XG4gICAgLy8gQ3VycmVudC9Ub3RhbFxuICAgIHZhciBjdXJyZW50O1xuICAgIHZhciB0b3RhbCA9IHN3aXBlci5wYXJhbXMubG9vcCA/IE1hdGguY2VpbCgoc2xpZGVzTGVuZ3RoIC0gKHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgY3VycmVudCA9IE1hdGguY2VpbCgoc3dpcGVyLmFjdGl2ZUluZGV4IC0gc3dpcGVyLmxvb3BlZFNsaWRlcykgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgIGlmIChjdXJyZW50ID4gc2xpZGVzTGVuZ3RoIC0gMSAtIChzd2lwZXIubG9vcGVkU2xpZGVzICogMikpIHtcbiAgICAgICAgY3VycmVudCAtPSAoc2xpZGVzTGVuZ3RoIC0gKHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudCA+IHRvdGFsIC0gMSkgeyBjdXJyZW50IC09IHRvdGFsOyB9XG4gICAgICBpZiAoY3VycmVudCA8IDAgJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSAhPT0gJ2J1bGxldHMnKSB7IGN1cnJlbnQgPSB0b3RhbCArIGN1cnJlbnQ7IH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3VycmVudCA9IHN3aXBlci5zbmFwSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnQgPSBzd2lwZXIuYWN0aXZlSW5kZXggfHwgMDtcbiAgICB9XG4gICAgLy8gVHlwZXNcbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGJ1bGxldHMgPSBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzO1xuICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRTaXplID0gYnVsbGV0cy5lcSgwKVtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnb3V0ZXJXaWR0aCcgOiAnb3V0ZXJIZWlnaHQnXSh0cnVlKTtcbiAgICAgICAgJGVsLmNzcyhzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnd2lkdGgnIDogJ2hlaWdodCcsICgoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSAqIDUpICsgXCJweFwiKSk7XG4gICAgICB9XG4gICAgICBidWxsZXRzLnJlbW92ZUNsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1uZXh0IFwiICsgKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1uZXh0LW5leHQgXCIgKyAocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLXByZXYgXCIgKyAocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLXByZXYtcHJldlwiKSk7XG4gICAgICBpZiAoJGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgYnVsbGV0cy5lYWNoKGZ1bmN0aW9uIChpbmRleCwgYnVsbGV0KSB7XG4gICAgICAgICAgdmFyICRidWxsZXQgPSAkJDEoYnVsbGV0KTtcbiAgICAgICAgICBpZiAoJGJ1bGxldC5pbmRleCgpID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAkYnVsbGV0LmFkZENsYXNzKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgICAgICAgICRidWxsZXRcbiAgICAgICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLXByZXZcIikpXG4gICAgICAgICAgICAgICAgLnByZXYoKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1wcmV2LXByZXZcIikpO1xuICAgICAgICAgICAgICAkYnVsbGV0XG4gICAgICAgICAgICAgICAgLm5leHQoKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1uZXh0XCIpKVxuICAgICAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoKChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItbmV4dC1uZXh0XCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyICRidWxsZXQgPSBidWxsZXRzLmVxKGN1cnJlbnQpO1xuICAgICAgICAkYnVsbGV0LmFkZENsYXNzKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG4gICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICAkYnVsbGV0XG4gICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoKChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItcHJldlwiKSlcbiAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1wcmV2LXByZXZcIikpO1xuICAgICAgICAgICRidWxsZXRcbiAgICAgICAgICAgIC5uZXh0KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1uZXh0XCIpKVxuICAgICAgICAgICAgLm5leHQoKVxuICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW5leHQtbmV4dFwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgdmFyIGR5bmFtaWNCdWxsZXRzTGVuZ3RoID0gTWF0aC5taW4oYnVsbGV0cy5sZW5ndGgsIDUpO1xuICAgICAgICB2YXIgYnVsbGV0c09mZnNldCA9ICgoKHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldFNpemUgKiBkeW5hbWljQnVsbGV0c0xlbmd0aCkgLSAoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSkpIC8gMikgLSAoY3VycmVudCAqIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldFNpemUpO1xuICAgICAgICB2YXIgb2Zmc2V0UHJvcCA9IHJ0bCA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgIGJ1bGxldHMuY3NzKHN3aXBlci5pc0hvcml6b250YWwoKSA/IG9mZnNldFByb3AgOiAndG9wJywgKGJ1bGxldHNPZmZzZXQgKyBcInB4XCIpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcmFtcy50eXBlID09PSAnZnJhY3Rpb24nKSB7XG4gICAgICAkZWwuZmluZCgoXCIuXCIgKyAocGFyYW1zLmN1cnJlbnRDbGFzcykpKS50ZXh0KGN1cnJlbnQgKyAxKTtcbiAgICAgICRlbC5maW5kKChcIi5cIiArIChwYXJhbXMudG90YWxDbGFzcykpKS50ZXh0KHRvdGFsKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy50eXBlID09PSAncHJvZ3Jlc3NiYXInKSB7XG4gICAgICB2YXIgc2NhbGUgPSAoY3VycmVudCArIDEpIC8gdG90YWw7XG4gICAgICB2YXIgc2NhbGVYID0gc2NhbGU7XG4gICAgICB2YXIgc2NhbGVZID0gMTtcbiAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIHNjYWxlWSA9IHNjYWxlO1xuICAgICAgICBzY2FsZVggPSAxO1xuICAgICAgfVxuICAgICAgJGVsLmZpbmQoKFwiLlwiICsgKHBhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzcykpKS50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlWChcIiArIHNjYWxlWCArIFwiKSBzY2FsZVkoXCIgKyBzY2FsZVkgKyBcIilcIikpLnRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2N1c3RvbScgJiYgcGFyYW1zLnJlbmRlckN1c3RvbSkge1xuICAgICAgJGVsLmh0bWwocGFyYW1zLnJlbmRlckN1c3RvbShzd2lwZXIsIGN1cnJlbnQgKyAxLCB0b3RhbCkpO1xuICAgICAgc3dpcGVyLmVtaXQoJ3BhZ2luYXRpb25SZW5kZXInLCBzd2lwZXIsICRlbFswXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5lbWl0KCdwYWdpbmF0aW9uVXBkYXRlJywgc3dpcGVyLCAkZWxbMF0pO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8gUmVuZGVyIENvbnRhaW5lclxuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKCFwYXJhbXMuZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi4kZWwgfHwgc3dpcGVyLnBhZ2luYXRpb24uJGVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgICB2YXIgc2xpZGVzTGVuZ3RoID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG5cbiAgICB2YXIgJGVsID0gc3dpcGVyLnBhZ2luYXRpb24uJGVsO1xuICAgIHZhciBwYWdpbmF0aW9uSFRNTCA9ICcnO1xuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnKSB7XG4gICAgICB2YXIgbnVtYmVyT2ZCdWxsZXRzID0gc3dpcGVyLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKChzbGlkZXNMZW5ndGggLSAoc3dpcGVyLmxvb3BlZFNsaWRlcyAqIDIpKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZCdWxsZXRzOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5yZW5kZXJCdWxsZXQpIHtcbiAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBwYXJhbXMucmVuZGVyQnVsbGV0LmNhbGwoc3dpcGVyLCBpLCBwYXJhbXMuYnVsbGV0Q2xhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IFwiPFwiICsgKHBhcmFtcy5idWxsZXRFbGVtZW50KSArIFwiIGNsYXNzPVxcXCJcIiArIChwYXJhbXMuYnVsbGV0Q2xhc3MpICsgXCJcXFwiPjwvXCIgKyAocGFyYW1zLmJ1bGxldEVsZW1lbnQpICsgXCI+XCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICRlbC5odG1sKHBhZ2luYXRpb25IVE1MKTtcbiAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgPSAkZWwuZmluZCgoXCIuXCIgKyAocGFyYW1zLmJ1bGxldENsYXNzKSkpO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgIGlmIChwYXJhbXMucmVuZGVyRnJhY3Rpb24pIHtcbiAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBwYXJhbXMucmVuZGVyRnJhY3Rpb24uY2FsbChzd2lwZXIsIHBhcmFtcy5jdXJyZW50Q2xhc3MsIHBhcmFtcy50b3RhbENsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2luYXRpb25IVE1MID1cbiAgICAgICAgXCI8c3BhbiBjbGFzcz1cXFwiXCIgKyAocGFyYW1zLmN1cnJlbnRDbGFzcykgKyBcIlxcXCI+PC9zcGFuPlwiICtcbiAgICAgICAgJyAvICcgK1xuICAgICAgICBcIjxzcGFuIGNsYXNzPVxcXCJcIiArIChwYXJhbXMudG90YWxDbGFzcykgKyBcIlxcXCI+PC9zcGFuPlwiO1xuICAgICAgfVxuICAgICAgJGVsLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcbiAgICAgIGlmIChwYXJhbXMucmVuZGVyUHJvZ3Jlc3NiYXIpIHtcbiAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBwYXJhbXMucmVuZGVyUHJvZ3Jlc3NiYXIuY2FsbChzd2lwZXIsIHBhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IFwiPHNwYW4gY2xhc3M9XFxcIlwiICsgKHBhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzcykgKyBcIlxcXCI+PC9zcGFuPlwiO1xuICAgICAgfVxuICAgICAgJGVsLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLnR5cGUgIT09ICdjdXN0b20nKSB7XG4gICAgICBzd2lwZXIuZW1pdCgncGFnaW5hdGlvblJlbmRlcicsIHN3aXBlci5wYWdpbmF0aW9uLiRlbFswXSk7XG4gICAgfVxuICB9LFxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKCFwYXJhbXMuZWwpIHsgcmV0dXJuOyB9XG5cbiAgICB2YXIgJGVsID0gJCQxKHBhcmFtcy5lbCk7XG4gICAgaWYgKCRlbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAoXG4gICAgICBzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmXG4gICAgICB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJlxuICAgICAgJGVsLmxlbmd0aCA+IDEgJiZcbiAgICAgIHN3aXBlci4kZWwuZmluZChwYXJhbXMuZWwpLmxlbmd0aCA9PT0gMVxuICAgICkge1xuICAgICAgJGVsID0gc3dpcGVyLiRlbC5maW5kKHBhcmFtcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycgJiYgcGFyYW1zLmNsaWNrYWJsZSkge1xuICAgICAgJGVsLmFkZENsYXNzKHBhcmFtcy5jbGlja2FibGVDbGFzcyk7XG4gICAgfVxuXG4gICAgJGVsLmFkZENsYXNzKHBhcmFtcy5tb2RpZmllckNsYXNzICsgcGFyYW1zLnR5cGUpO1xuXG4gICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycgJiYgcGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAkZWwuYWRkQ2xhc3MoKFwiXCIgKyAocGFyYW1zLm1vZGlmaWVyQ2xhc3MpICsgKHBhcmFtcy50eXBlKSArIFwiLWR5bmFtaWNcIikpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAkZWwub24oJ2NsaWNrJywgKFwiLlwiICsgKHBhcmFtcy5idWxsZXRDbGFzcykpLCBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgaW5kZXggPSAkJDEodGhpcykuaW5kZXgoKSAqIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHsgaW5kZXggKz0gc3dpcGVyLmxvb3BlZFNsaWRlczsgfVxuICAgICAgICBzd2lwZXIuc2xpZGVUbyhpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLnBhZ2luYXRpb24sIHtcbiAgICAgICRlbDogJGVsLFxuICAgICAgZWw6ICRlbFswXSxcbiAgICB9KTtcbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGlmICghcGFyYW1zLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uJGVsIHx8IHN3aXBlci5wYWdpbmF0aW9uLiRlbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgdmFyICRlbCA9IHN3aXBlci5wYWdpbmF0aW9uLiRlbDtcblxuICAgICRlbC5yZW1vdmVDbGFzcyhwYXJhbXMuaGlkZGVuQ2xhc3MpO1xuICAgICRlbC5yZW1vdmVDbGFzcyhwYXJhbXMubW9kaWZpZXJDbGFzcyArIHBhcmFtcy50eXBlKTtcbiAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cykgeyBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLnJlbW92ZUNsYXNzKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7IH1cbiAgICBpZiAocGFyYW1zLmNsaWNrYWJsZSkge1xuICAgICAgJGVsLm9mZignY2xpY2snLCAoXCIuXCIgKyAocGFyYW1zLmJ1bGxldENsYXNzKSkpO1xuICAgIH1cbiAgfSxcbn07XG5cbnZhciBQYWdpbmF0aW9uJDEgPSB7XG4gIG5hbWU6ICdwYWdpbmF0aW9uJyxcbiAgcGFyYW1zOiB7XG4gICAgcGFnaW5hdGlvbjoge1xuICAgICAgZWw6IG51bGwsXG4gICAgICBidWxsZXRFbGVtZW50OiAnc3BhbicsXG4gICAgICBjbGlja2FibGU6IGZhbHNlLFxuICAgICAgaGlkZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgcmVuZGVyQnVsbGV0OiBudWxsLFxuICAgICAgcmVuZGVyUHJvZ3Jlc3NiYXI6IG51bGwsXG4gICAgICByZW5kZXJGcmFjdGlvbjogbnVsbCxcbiAgICAgIHJlbmRlckN1c3RvbTogbnVsbCxcbiAgICAgIHR5cGU6ICdidWxsZXRzJywgLy8gJ2J1bGxldHMnIG9yICdwcm9ncmVzc2Jhcicgb3IgJ2ZyYWN0aW9uJyBvciAnY3VzdG9tJ1xuICAgICAgZHluYW1pY0J1bGxldHM6IGZhbHNlLFxuXG4gICAgICBidWxsZXRDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCcsXG4gICAgICBidWxsZXRBY3RpdmVDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnLFxuICAgICAgbW9kaWZpZXJDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLScsIC8vIE5FV1xuICAgICAgY3VycmVudENsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcsXG4gICAgICB0b3RhbENsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tdG90YWwnLFxuICAgICAgaGlkZGVuQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1oaWRkZW4nLFxuICAgICAgcHJvZ3Jlc3NiYXJGaWxsQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1maWxsJyxcbiAgICAgIGNsaWNrYWJsZUNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tY2xpY2thYmxlJywgLy8gTkVXXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICBpbml0OiBQYWdpbmF0aW9uLmluaXQuYmluZChzd2lwZXIpLFxuICAgICAgICByZW5kZXI6IFBhZ2luYXRpb24ucmVuZGVyLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgdXBkYXRlOiBQYWdpbmF0aW9uLnVwZGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IFBhZ2luYXRpb24uZGVzdHJveS5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmluaXQoKTtcbiAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnJlbmRlcigpO1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgfSxcbiAgICBhY3RpdmVJbmRleENoYW5nZTogZnVuY3Rpb24gYWN0aXZlSW5kZXhDaGFuZ2UoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNuYXBJbmRleENoYW5nZTogZnVuY3Rpb24gc25hcEluZGV4Q2hhbmdlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNsaWRlc0xlbmd0aENoYW5nZTogZnVuY3Rpb24gc2xpZGVzTGVuZ3RoQ2hhbmdlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnJlbmRlcigpO1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNuYXBHcmlkTGVuZ3RoQ2hhbmdlOiBmdW5jdGlvbiBzbmFwR3JpZExlbmd0aENoYW5nZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24ucmVuZGVyKCk7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZGVzdHJveSgpO1xuICAgIH0sXG4gICAgY2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGUpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKFxuICAgICAgICBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uZWwgJiZcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGVPbkNsaWNrICYmXG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5sZW5ndGggPiAwICYmXG4gICAgICAgICEkJDEoZS50YXJnZXQpLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcylcbiAgICAgICkge1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwudG9nZ2xlQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcblxudmFyIFNjcm9sbGJhciA9IHtcbiAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cbiAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcbiAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bDtcbiAgICB2YXIgcHJvZ3Jlc3MgPSBzd2lwZXIucHJvZ3Jlc3M7XG4gICAgdmFyIGRyYWdTaXplID0gc2Nyb2xsYmFyLmRyYWdTaXplO1xuICAgIHZhciB0cmFja1NpemUgPSBzY3JvbGxiYXIudHJhY2tTaXplO1xuICAgIHZhciAkZHJhZ0VsID0gc2Nyb2xsYmFyLiRkcmFnRWw7XG4gICAgdmFyICRlbCA9IHNjcm9sbGJhci4kZWw7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xuXG4gICAgdmFyIG5ld1NpemUgPSBkcmFnU2l6ZTtcbiAgICB2YXIgbmV3UG9zID0gKHRyYWNrU2l6ZSAtIGRyYWdTaXplKSAqIHByb2dyZXNzO1xuICAgIGlmIChydGwgJiYgc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICBuZXdQb3MgPSAtbmV3UG9zO1xuICAgICAgaWYgKG5ld1BvcyA+IDApIHtcbiAgICAgICAgbmV3U2l6ZSA9IGRyYWdTaXplIC0gbmV3UG9zO1xuICAgICAgICBuZXdQb3MgPSAwO1xuICAgICAgfSBlbHNlIGlmICgtbmV3UG9zICsgZHJhZ1NpemUgPiB0cmFja1NpemUpIHtcbiAgICAgICAgbmV3U2l6ZSA9IHRyYWNrU2l6ZSArIG5ld1BvcztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5ld1BvcyA8IDApIHtcbiAgICAgIG5ld1NpemUgPSBkcmFnU2l6ZSArIG5ld1BvcztcbiAgICAgIG5ld1BvcyA9IDA7XG4gICAgfSBlbHNlIGlmIChuZXdQb3MgKyBkcmFnU2l6ZSA+IHRyYWNrU2l6ZSkge1xuICAgICAgbmV3U2l6ZSA9IHRyYWNrU2l6ZSAtIG5ld1BvcztcbiAgICB9XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgaWYgKFN1cHBvcnQudHJhbnNmb3JtczNkKSB7XG4gICAgICAgICRkcmFnRWwudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgbmV3UG9zICsgXCJweCwgMCwgMClcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGRyYWdFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlWChcIiArIG5ld1BvcyArIFwicHgpXCIpKTtcbiAgICAgIH1cbiAgICAgICRkcmFnRWxbMF0uc3R5bGUud2lkdGggPSBuZXdTaXplICsgXCJweFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoU3VwcG9ydC50cmFuc2Zvcm1zM2QpIHtcbiAgICAgICAgJGRyYWdFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMHB4LCBcIiArIG5ld1BvcyArIFwicHgsIDApXCIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRkcmFnRWwudHJhbnNmb3JtKChcInRyYW5zbGF0ZVkoXCIgKyBuZXdQb3MgKyBcInB4KVwiKSk7XG4gICAgICB9XG4gICAgICAkZHJhZ0VsWzBdLnN0eWxlLmhlaWdodCA9IG5ld1NpemUgKyBcInB4XCI7XG4gICAgfVxuICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHN3aXBlci5zY3JvbGxiYXIudGltZW91dCk7XG4gICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGVsWzBdLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAkZWwudHJhbnNpdGlvbig0MDApO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICB9LFxuICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cbiAgICBzd2lwZXIuc2Nyb2xsYmFyLiRkcmFnRWwudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gIH0sXG4gIHVwZGF0ZVNpemU6IGZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cblxuICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgIHZhciAkZHJhZ0VsID0gc2Nyb2xsYmFyLiRkcmFnRWw7XG4gICAgdmFyICRlbCA9IHNjcm9sbGJhci4kZWw7XG5cbiAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gJyc7XG4gICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICB2YXIgdHJhY2tTaXplID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJGVsWzBdLm9mZnNldFdpZHRoIDogJGVsWzBdLm9mZnNldEhlaWdodDtcblxuICAgIHZhciBkaXZpZGVyID0gc3dpcGVyLnNpemUgLyBzd2lwZXIudmlydHVhbFNpemU7XG4gICAgdmFyIG1vdmVEaXZpZGVyID0gZGl2aWRlciAqICh0cmFja1NpemUgLyBzd2lwZXIuc2l6ZSk7XG4gICAgdmFyIGRyYWdTaXplO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnU2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICBkcmFnU2l6ZSA9IHRyYWNrU2l6ZSAqIGRpdmlkZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdTaXplID0gcGFyc2VJbnQoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemUsIDEwKTtcbiAgICB9XG5cbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gZHJhZ1NpemUgKyBcInB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICRkcmFnRWxbMF0uc3R5bGUuaGVpZ2h0ID0gZHJhZ1NpemUgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgaWYgKGRpdmlkZXIgPj0gMSkge1xuICAgICAgJGVsWzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICRlbFswXS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhckhpZGUpIHtcbiAgICAgICRlbFswXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB9XG4gICAgVXRpbHMuZXh0ZW5kKHNjcm9sbGJhciwge1xuICAgICAgdHJhY2tTaXplOiB0cmFja1NpemUsXG4gICAgICBkaXZpZGVyOiBkaXZpZGVyLFxuICAgICAgbW92ZURpdmlkZXI6IG1vdmVEaXZpZGVyLFxuICAgICAgZHJhZ1NpemU6IGRyYWdTaXplLFxuICAgIH0pO1xuICB9LFxuICBzZXREcmFnUG9zaXRpb246IGZ1bmN0aW9uIHNldERyYWdQb3NpdGlvbihlKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHNjcm9sbGJhciA9IHN3aXBlci5zY3JvbGxiYXI7XG4gICAgdmFyICRlbCA9IHNjcm9sbGJhci4kZWw7XG4gICAgdmFyIGRyYWdTaXplID0gc2Nyb2xsYmFyLmRyYWdTaXplO1xuICAgIHZhciBtb3ZlRGl2aWRlciA9IHNjcm9sbGJhci5tb3ZlRGl2aWRlcjtcblxuICAgIHZhciBwb2ludGVyUG9zaXRpb247XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgcG9pbnRlclBvc2l0aW9uID0gKChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVggfHwgZS5jbGllbnRYKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnRlclBvc2l0aW9uID0gKChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVkgfHwgZS5jbGllbnRZKTtcbiAgICB9XG4gICAgdmFyIHBvc2l0aW9uID0gKHBvaW50ZXJQb3NpdGlvbikgLSAkZWwub2Zmc2V0KClbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCddIC0gKGRyYWdTaXplIC8gMik7XG4gICAgdmFyIHBvc2l0aW9uTWluID0gLXN3aXBlci5taW5UcmFuc2xhdGUoKSAqIG1vdmVEaXZpZGVyO1xuICAgIHZhciBwb3NpdGlvbk1heCA9IC1zd2lwZXIubWF4VHJhbnNsYXRlKCkgKiBtb3ZlRGl2aWRlcjtcbiAgICBpZiAocG9zaXRpb24gPCBwb3NpdGlvbk1pbikge1xuICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbk1pbjtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID4gcG9zaXRpb25NYXgpIHtcbiAgICAgIHBvc2l0aW9uID0gcG9zaXRpb25NYXg7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucnRsKSB7XG4gICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uTWF4IC0gcG9zaXRpb247XG4gICAgfVxuICAgIHBvc2l0aW9uID0gLXBvc2l0aW9uIC8gbW92ZURpdmlkZXI7XG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHBvc2l0aW9uKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHBvc2l0aW9uKTtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICB9LFxuICBvbkRyYWdTdGFydDogZnVuY3Rpb24gb25EcmFnU3RhcnQoZSkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgIHZhciAkZWwgPSBzY3JvbGxiYXIuJGVsO1xuICAgIHZhciAkZHJhZ0VsID0gc2Nyb2xsYmFyLiRkcmFnRWw7XG4gICAgc3dpcGVyLnNjcm9sbGJhci5pc1RvdWNoZWQgPSB0cnVlO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uKDEwMCk7XG4gICAgJGRyYWdFbC50cmFuc2l0aW9uKDEwMCk7XG4gICAgc2Nyb2xsYmFyLnNldERyYWdQb3NpdGlvbihlKTtcblxuICAgIGNsZWFyVGltZW91dChzd2lwZXIuc2Nyb2xsYmFyLmRyYWdUaW1lb3V0KTtcblxuICAgICRlbC50cmFuc2l0aW9uKDApO1xuICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgJGVsLmNzcygnb3BhY2l0eScsIDEpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnc2Nyb2xsYmFyRHJhZ1N0YXJ0JywgZSk7XG4gIH0sXG4gIG9uRHJhZ01vdmU6IGZ1bmN0aW9uIG9uRHJhZ01vdmUoZSkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgdmFyICRlbCA9IHNjcm9sbGJhci4kZWw7XG4gICAgdmFyICRkcmFnRWwgPSBzY3JvbGxiYXIuJGRyYWdFbDtcblxuICAgIGlmICghc3dpcGVyLnNjcm9sbGJhci5pc1RvdWNoZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgZWxzZSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxuICAgIHNjcm9sbGJhci5zZXREcmFnUG9zaXRpb24oZSk7XG4gICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uKDApO1xuICAgICRlbC50cmFuc2l0aW9uKDApO1xuICAgICRkcmFnRWwudHJhbnNpdGlvbigwKTtcbiAgICBzd2lwZXIuZW1pdCgnc2Nyb2xsYmFyRHJhZ01vdmUnLCBlKTtcbiAgfSxcbiAgb25EcmFnRW5kOiBmdW5jdGlvbiBvbkRyYWdFbmQoZSkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xuICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgIHZhciAkZWwgPSBzY3JvbGxiYXIuJGVsO1xuXG4gICAgaWYgKCFzd2lwZXIuc2Nyb2xsYmFyLmlzVG91Y2hlZCkgeyByZXR1cm47IH1cbiAgICBzd2lwZXIuc2Nyb2xsYmFyLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHN3aXBlci5zY3JvbGxiYXIuZHJhZ1RpbWVvdXQpO1xuICAgICAgc3dpcGVyLnNjcm9sbGJhci5kcmFnVGltZW91dCA9IFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGVsLmNzcygnb3BhY2l0eScsIDApO1xuICAgICAgICAkZWwudHJhbnNpdGlvbig0MDApO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdzY3JvbGxiYXJEcmFnRW5kJywgZSk7XG4gICAgaWYgKHBhcmFtcy5zbmFwT25SZWxlYXNlKSB7XG4gICAgICBzd2lwZXIuc2xpZGVSZXNldCgpO1xuICAgIH1cbiAgfSxcbiAgZW5hYmxlRHJhZ2dhYmxlOiBmdW5jdGlvbiBlbmFibGVEcmFnZ2FibGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cbiAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcbiAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcbiAgICB2YXIgdGFyZ2V0ID0gU3VwcG9ydC50b3VjaCA/ICRlbFswXSA6IGRvY3VtZW50O1xuICAgICRlbC5vbihzd2lwZXIuc2Nyb2xsYmFyLmRyYWdFdmVudHMuc3RhcnQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQpO1xuICAgICQkMSh0YXJnZXQpLm9uKHN3aXBlci5zY3JvbGxiYXIuZHJhZ0V2ZW50cy5tb3ZlLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ01vdmUpO1xuICAgICQkMSh0YXJnZXQpLm9uKHN3aXBlci5zY3JvbGxiYXIuZHJhZ0V2ZW50cy5lbmQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnRW5kKTtcbiAgfSxcbiAgZGlzYWJsZURyYWdnYWJsZTogZnVuY3Rpb24gZGlzYWJsZURyYWdnYWJsZSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsKSB7IHJldHVybjsgfVxuICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgIHZhciAkZWwgPSBzY3JvbGxiYXIuJGVsO1xuICAgIHZhciB0YXJnZXQgPSBTdXBwb3J0LnRvdWNoID8gJGVsWzBdIDogZG9jdW1lbnQ7XG4gICAgJGVsLm9mZihzd2lwZXIuc2Nyb2xsYmFyLmRyYWdFdmVudHMuc3RhcnQpO1xuICAgICQkMSh0YXJnZXQpLm9mZihzd2lwZXIuc2Nyb2xsYmFyLmRyYWdFdmVudHMubW92ZSk7XG4gICAgJCQxKHRhcmdldCkub2ZmKHN3aXBlci5zY3JvbGxiYXIuZHJhZ0V2ZW50cy5lbmQpO1xuICB9LFxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwpIHsgcmV0dXJuOyB9XG4gICAgdmFyIHNjcm9sbGJhciA9IHN3aXBlci5zY3JvbGxiYXI7XG4gICAgdmFyICRzd2lwZXJFbCA9IHN3aXBlci4kZWw7XG4gICAgdmFyIHRvdWNoRXZlbnRzID0gc3dpcGVyLnRvdWNoRXZlbnRzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcblxuICAgIHZhciAkZWwgPSAkJDEocGFyYW1zLmVsKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJiAkZWwubGVuZ3RoID4gMSAmJiAkc3dpcGVyRWwuZmluZChwYXJhbXMuZWwpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgJGVsID0gJHN3aXBlckVsLmZpbmQocGFyYW1zLmVsKTtcbiAgICB9XG5cbiAgICB2YXIgJGRyYWdFbCA9ICRlbC5maW5kKCcuc3dpcGVyLXNjcm9sbGJhci1kcmFnJyk7XG4gICAgaWYgKCRkcmFnRWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAkZHJhZ0VsID0gJCQxKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNjcm9sbGJhci1kcmFnXCI+PC9kaXY+Jyk7XG4gICAgICAkZWwuYXBwZW5kKCRkcmFnRWwpO1xuICAgIH1cblxuICAgIHN3aXBlci5zY3JvbGxiYXIuZHJhZ0V2ZW50cyA9IChmdW5jdGlvbiBkcmFnRXZlbnRzKCkge1xuICAgICAgaWYgKChzd2lwZXIucGFyYW1zLnNpbXVsYXRlVG91Y2ggPT09IGZhbHNlICYmICFTdXBwb3J0LnRvdWNoKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICAgICAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICBlbmQ6ICdtb3VzZXVwJyxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3VjaEV2ZW50cztcbiAgICB9KCkpO1xuXG4gICAgVXRpbHMuZXh0ZW5kKHNjcm9sbGJhciwge1xuICAgICAgJGVsOiAkZWwsXG4gICAgICBlbDogJGVsWzBdLFxuICAgICAgJGRyYWdFbDogJGRyYWdFbCxcbiAgICAgIGRyYWdFbDogJGRyYWdFbFswXSxcbiAgICB9KTtcblxuICAgIGlmIChwYXJhbXMuZHJhZ2dhYmxlKSB7XG4gICAgICBzY3JvbGxiYXIuZW5hYmxlRHJhZ2dhYmxlKCk7XG4gICAgfVxuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHN3aXBlci5zY3JvbGxiYXIuZGlzYWJsZURyYWdnYWJsZSgpO1xuICB9LFxufTtcblxudmFyIFNjcm9sbGJhciQxID0ge1xuICBuYW1lOiAnc2Nyb2xsYmFyJyxcbiAgcGFyYW1zOiB7XG4gICAgc2Nyb2xsYmFyOiB7XG4gICAgICBlbDogbnVsbCxcbiAgICAgIGRyYWdTaXplOiAnYXV0bycsXG4gICAgICBoaWRlOiBmYWxzZSxcbiAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICBzbmFwT25SZWxlYXNlOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIHNjcm9sbGJhcjoge1xuICAgICAgICBpbml0OiBTY3JvbGxiYXIuaW5pdC5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IFNjcm9sbGJhci5kZXN0cm95LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgdXBkYXRlU2l6ZTogU2Nyb2xsYmFyLnVwZGF0ZVNpemUuYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRUcmFuc2xhdGU6IFNjcm9sbGJhci5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRUcmFuc2l0aW9uOiBTY3JvbGxiYXIuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICAgIGVuYWJsZURyYWdnYWJsZTogU2Nyb2xsYmFyLmVuYWJsZURyYWdnYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgIGRpc2FibGVEcmFnZ2FibGU6IFNjcm9sbGJhci5kaXNhYmxlRHJhZ2dhYmxlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0RHJhZ1Bvc2l0aW9uOiBTY3JvbGxiYXIuc2V0RHJhZ1Bvc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgb25EcmFnU3RhcnQ6IFNjcm9sbGJhci5vbkRyYWdTdGFydC5iaW5kKHN3aXBlciksXG4gICAgICAgIG9uRHJhZ01vdmU6IFNjcm9sbGJhci5vbkRyYWdNb3ZlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgb25EcmFnRW5kOiBTY3JvbGxiYXIub25EcmFnRW5kLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgaXNUb3VjaGVkOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogbnVsbCxcbiAgICAgICAgZHJhZ1RpbWVvdXQ6IG51bGwsXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIuaW5pdCgpO1xuICAgICAgc3dpcGVyLnNjcm9sbGJhci51cGRhdGVTaXplKCk7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIudXBkYXRlU2l6ZSgpO1xuICAgIH0sXG4gICAgcmVzaXplOiBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIudXBkYXRlU2l6ZSgpO1xuICAgIH0sXG4gICAgb2JzZXJ2ZXJVcGRhdGU6IGZ1bmN0aW9uIG9ic2VydmVyVXBkYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKTtcbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xuICAgIH0sXG4gICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLnNjcm9sbGJhci5kZXN0cm95KCk7XG4gICAgfSxcbiAgfSxcbn07XG5cbnZhciBQYXJhbGxheCA9IHtcbiAgc2V0VHJhbnNmb3JtOiBmdW5jdGlvbiBzZXRUcmFuc2Zvcm0oZWwsIHByb2dyZXNzKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHJ0bCA9IHN3aXBlci5ydGw7XG5cbiAgICB2YXIgJGVsID0gJCQxKGVsKTtcbiAgICB2YXIgcnRsRmFjdG9yID0gcnRsID8gLTEgOiAxO1xuXG4gICAgdmFyIHAgPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgnKSB8fCAnMCc7XG4gICAgdmFyIHggPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgteCcpO1xuICAgIHZhciB5ID0gJGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LXknKTtcbiAgICB2YXIgc2NhbGUgPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgtc2NhbGUnKTtcbiAgICB2YXIgb3BhY2l0eSA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5Jyk7XG5cbiAgICBpZiAoeCB8fCB5KSB7XG4gICAgICB4ID0geCB8fCAnMCc7XG4gICAgICB5ID0geSB8fCAnMCc7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIHggPSBwO1xuICAgICAgeSA9ICcwJztcbiAgICB9IGVsc2Uge1xuICAgICAgeSA9IHA7XG4gICAgICB4ID0gJzAnO1xuICAgIH1cblxuICAgIGlmICgoeCkuaW5kZXhPZignJScpID49IDApIHtcbiAgICAgIHggPSAocGFyc2VJbnQoeCwgMTApICogcHJvZ3Jlc3MgKiBydGxGYWN0b3IpICsgXCIlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSAoeCAqIHByb2dyZXNzICogcnRsRmFjdG9yKSArIFwicHhcIjtcbiAgICB9XG4gICAgaWYgKCh5KS5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgeSA9IChwYXJzZUludCh5LCAxMCkgKiBwcm9ncmVzcykgKyBcIiVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgeSA9ICh5ICogcHJvZ3Jlc3MpICsgXCJweFwiO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3BhY2l0eSAhPT0gJ3VuZGVmaW5lZCcgJiYgb3BhY2l0eSAhPT0gbnVsbCkge1xuICAgICAgdmFyIGN1cnJlbnRPcGFjaXR5ID0gb3BhY2l0eSAtICgob3BhY2l0eSAtIDEpICogKDEgLSBNYXRoLmFicyhwcm9ncmVzcykpKTtcbiAgICAgICRlbFswXS5zdHlsZS5vcGFjaXR5ID0gY3VycmVudE9wYWNpdHk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc2NhbGUgPT09ICd1bmRlZmluZWQnIHx8IHNjYWxlID09PSBudWxsKSB7XG4gICAgICAkZWwudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgeCArIFwiLCBcIiArIHkgKyBcIiwgMHB4KVwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjdXJyZW50U2NhbGUgPSBzY2FsZSAtICgoc2NhbGUgLSAxKSAqICgxIC0gTWF0aC5hYnMocHJvZ3Jlc3MpKSk7XG4gICAgICAkZWwudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgeCArIFwiLCBcIiArIHkgKyBcIiwgMHB4KSBzY2FsZShcIiArIGN1cnJlbnRTY2FsZSArIFwiKVwiKSk7XG4gICAgfVxuICB9LFxuICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgJGVsID0gc3dpcGVyLiRlbDtcbiAgICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgICB2YXIgcHJvZ3Jlc3MgPSBzd2lwZXIucHJvZ3Jlc3M7XG4gICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xuICAgICRlbC5jaGlsZHJlbignW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0nKVxuICAgICAgLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgICAgICBzd2lwZXIucGFyYWxsYXguc2V0VHJhbnNmb3JtKGVsLCBwcm9ncmVzcyk7XG4gICAgICB9KTtcbiAgICBzbGlkZXMuZWFjaChmdW5jdGlvbiAoc2xpZGVJbmRleCwgc2xpZGVFbCkge1xuICAgICAgdmFyIHNsaWRlUHJvZ3Jlc3MgPSBzbGlkZUVsLnByb2dyZXNzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPiAxICYmIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gJ2F1dG8nKSB7XG4gICAgICAgIHNsaWRlUHJvZ3Jlc3MgKz0gTWF0aC5jZWlsKHNsaWRlSW5kZXggLyAyKSAtIChwcm9ncmVzcyAqIChzbmFwR3JpZC5sZW5ndGggLSAxKSk7XG4gICAgICB9XG4gICAgICBzbGlkZVByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgoc2xpZGVQcm9ncmVzcywgLTEpLCAxKTtcbiAgICAgICQkMShzbGlkZUVsKS5maW5kKCdbZGF0YS1zd2lwZXItcGFyYWxsYXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC15XScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAgICAgICBzd2lwZXIucGFyYWxsYXguc2V0VHJhbnNmb3JtKGVsLCBzbGlkZVByb2dyZXNzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICBpZiAoIGR1cmF0aW9uID09PSB2b2lkIDAgKSBkdXJhdGlvbiA9IHRoaXMucGFyYW1zLnNwZWVkO1xuXG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gICAgJGVsLmZpbmQoJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldJylcbiAgICAgIC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgcGFyYWxsYXhFbCkge1xuICAgICAgICB2YXIgJHBhcmFsbGF4RWwgPSAkJDEocGFyYWxsYXhFbCk7XG4gICAgICAgIHZhciBwYXJhbGxheER1cmF0aW9uID0gcGFyc2VJbnQoJHBhcmFsbGF4RWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgtZHVyYXRpb24nKSwgMTApIHx8IGR1cmF0aW9uO1xuICAgICAgICBpZiAoZHVyYXRpb24gPT09IDApIHsgcGFyYWxsYXhEdXJhdGlvbiA9IDA7IH1cbiAgICAgICAgJHBhcmFsbGF4RWwudHJhbnNpdGlvbihwYXJhbGxheER1cmF0aW9uKTtcbiAgICAgIH0pO1xuICB9LFxufTtcblxudmFyIFBhcmFsbGF4JDEgPSB7XG4gIG5hbWU6ICdwYXJhbGxheCcsXG4gIHBhcmFtczoge1xuICAgIHBhcmFsbGF4OiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBwYXJhbGxheDoge1xuICAgICAgICBzZXRUcmFuc2Zvcm06IFBhcmFsbGF4LnNldFRyYW5zZm9ybS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNldFRyYW5zbGF0ZTogUGFyYWxsYXguc2V0VHJhbnNsYXRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0VHJhbnNpdGlvbjogUGFyYWxsYXguc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXgpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIucGFyYWxsYXguc2V0VHJhbnNsYXRlKCk7XG4gICAgfSxcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnBhcmFsbGF4KSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLnBhcmFsbGF4LnNldFRyYW5zbGF0ZSgpO1xuICAgIH0sXG4gICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXgpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIucGFyYWxsYXguc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgfSxcbiAgfSxcbn07XG5cbnZhciBab29tID0ge1xuICAvLyBDYWxjIFNjYWxlIEZyb20gTXVsdGktdG91Y2hlc1xuICBnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzOiBmdW5jdGlvbiBnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzKGUpIHtcbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpIHsgcmV0dXJuIDE7IH1cbiAgICB2YXIgeDEgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgdmFyIHkxID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgIHZhciB4MiA9IGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWDtcbiAgICB2YXIgeTIgPSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVk7XG4gICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KChNYXRoLnBvdyggKHgyIC0geDEpLCAyICkpICsgKE1hdGgucG93KCAoeTIgLSB5MSksIDIgKSkpO1xuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfSxcbiAgLy8gRXZlbnRzXG4gIG9uR2VzdHVyZVN0YXJ0OiBmdW5jdGlvbiBvbkdlc3R1cmVTdGFydChlKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xuICAgIHZhciBnZXN0dXJlID0gem9vbS5nZXN0dXJlO1xuICAgIHpvb20uZmFrZUdlc3R1cmVUb3VjaGVkID0gZmFsc2U7XG4gICAgem9vbS5mYWtlR2VzdHVyZU1vdmVkID0gZmFsc2U7XG4gICAgaWYgKCFTdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICBpZiAoZS50eXBlICE9PSAndG91Y2hzdGFydCcgfHwgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPCAyKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB6b29tLmZha2VHZXN0dXJlVG91Y2hlZCA9IHRydWU7XG4gICAgICBnZXN0dXJlLnNjYWxlU3RhcnQgPSBab29tLmdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSk7XG4gICAgfVxuICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCB8fCAhZ2VzdHVyZS4kc2xpZGVFbC5sZW5ndGgpIHtcbiAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSAkJDEodGhpcyk7XG4gICAgICBpZiAoZ2VzdHVyZS4kc2xpZGVFbC5sZW5ndGggPT09IDApIHsgZ2VzdHVyZS4kc2xpZGVFbCA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTsgfVxuICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IGdlc3R1cmUuJHNsaWRlRWwuZmluZCgnaW1nLCBzdmcsIGNhbnZhcycpO1xuICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwgPSBnZXN0dXJlLiRpbWFnZUVsLnBhcmVudCgoXCIuXCIgKyAocGFyYW1zLmNvbnRhaW5lckNsYXNzKSkpO1xuICAgICAgZ2VzdHVyZS5tYXhSYXRpbyA9IGdlc3R1cmUuJGltYWdlV3JhcEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXpvb20nKSB8fCBwYXJhbXMubWF4UmF0aW87XG4gICAgICBpZiAoZ2VzdHVyZS4kaW1hZ2VXcmFwRWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlRWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2l0aW9uKDApO1xuICAgIHN3aXBlci56b29tLmlzU2NhbGluZyA9IHRydWU7XG4gIH0sXG4gIG9uR2VzdHVyZUNoYW5nZTogZnVuY3Rpb24gb25HZXN0dXJlQ2hhbmdlKGUpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy56b29tO1xuICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XG4gICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XG4gICAgaWYgKCFTdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICBpZiAoZS50eXBlICE9PSAndG91Y2htb3ZlJyB8fCAoZS50eXBlID09PSAndG91Y2htb3ZlJyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgem9vbS5mYWtlR2VzdHVyZU1vdmVkID0gdHJ1ZTtcbiAgICAgIGdlc3R1cmUuc2NhbGVNb3ZlID0gWm9vbS5nZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzKGUpO1xuICAgIH1cbiAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgaWYgKFN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgIHN3aXBlci56b29tLnNjYWxlID0gZS5zY2FsZSAqIHpvb20uY3VycmVudFNjYWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICB6b29tLnNjYWxlID0gKGdlc3R1cmUuc2NhbGVNb3ZlIC8gZ2VzdHVyZS5zY2FsZVN0YXJ0KSAqIHpvb20uY3VycmVudFNjYWxlO1xuICAgIH1cbiAgICBpZiAoem9vbS5zY2FsZSA+IGdlc3R1cmUubWF4UmF0aW8pIHtcbiAgICAgIHpvb20uc2NhbGUgPSAoZ2VzdHVyZS5tYXhSYXRpbyAtIDEpICsgKE1hdGgucG93KCAoKHpvb20uc2NhbGUgLSBnZXN0dXJlLm1heFJhdGlvKSArIDEpLCAwLjUgKSk7XG4gICAgfVxuICAgIGlmICh6b29tLnNjYWxlIDwgcGFyYW1zLm1pblJhdGlvKSB7XG4gICAgICB6b29tLnNjYWxlID0gKHBhcmFtcy5taW5SYXRpbyArIDEpIC0gKE1hdGgucG93KCAoKHBhcmFtcy5taW5SYXRpbyAtIHpvb20uc2NhbGUpICsgMSksIDAuNSApKTtcbiAgICB9XG4gICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKFwiICsgKHpvb20uc2NhbGUpICsgXCIpXCIpKTtcbiAgfSxcbiAgb25HZXN0dXJlRW5kOiBmdW5jdGlvbiBvbkdlc3R1cmVFbmQoZSkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnpvb207XG4gICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcbiAgICBpZiAoIVN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgIGlmICghem9vbS5mYWtlR2VzdHVyZVRvdWNoZWQgfHwgIXpvb20uZmFrZUdlc3R1cmVNb3ZlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZS50eXBlICE9PSAndG91Y2hlbmQnIHx8IChlLnR5cGUgPT09ICd0b3VjaGVuZCcgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPCAyICYmICFEZXZpY2UuYW5kcm9pZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgem9vbS5mYWtlR2VzdHVyZVRvdWNoZWQgPSBmYWxzZTtcbiAgICAgIHpvb20uZmFrZUdlc3R1cmVNb3ZlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgem9vbS5zY2FsZSA9IE1hdGgubWF4KE1hdGgubWluKHpvb20uc2NhbGUsIGdlc3R1cmUubWF4UmF0aW8pLCBwYXJhbXMubWluUmF0aW8pO1xuICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNpdGlvbihzd2lwZXIucGFyYW1zLnNwZWVkKS50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKFwiICsgKHpvb20uc2NhbGUpICsgXCIpXCIpKTtcbiAgICB6b29tLmN1cnJlbnRTY2FsZSA9IHpvb20uc2NhbGU7XG4gICAgem9vbS5pc1NjYWxpbmcgPSBmYWxzZTtcbiAgICBpZiAoem9vbS5zY2FsZSA9PT0gMSkgeyBnZXN0dXJlLiRzbGlkZUVsID0gdW5kZWZpbmVkOyB9XG4gIH0sXG4gIG9uVG91Y2hTdGFydDogZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xuICAgIHZhciBnZXN0dXJlID0gem9vbS5nZXN0dXJlO1xuICAgIHZhciBpbWFnZSA9IHpvb20uaW1hZ2U7XG4gICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgIGlmIChpbWFnZS5pc1RvdWNoZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKERldmljZS5hbmRyb2lkKSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxuICAgIGltYWdlLmlzVG91Y2hlZCA9IHRydWU7XG4gICAgaW1hZ2UudG91Y2hlc1N0YXJ0LnggPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgaW1hZ2UudG91Y2hlc1N0YXJ0LnkgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gIH0sXG4gIG9uVG91Y2hNb3ZlOiBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcbiAgICB2YXIgaW1hZ2UgPSB6b29tLmltYWdlO1xuICAgIHZhciB2ZWxvY2l0eSA9IHpvb20udmVsb2NpdHk7XG4gICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgaWYgKCFpbWFnZS5pc1RvdWNoZWQgfHwgIWdlc3R1cmUuJHNsaWRlRWwpIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAoIWltYWdlLmlzTW92ZWQpIHtcbiAgICAgIGltYWdlLndpZHRoID0gZ2VzdHVyZS4kaW1hZ2VFbFswXS5vZmZzZXRXaWR0aDtcbiAgICAgIGltYWdlLmhlaWdodCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgaW1hZ2Uuc3RhcnRYID0gVXRpbHMuZ2V0VHJhbnNsYXRlKGdlc3R1cmUuJGltYWdlV3JhcEVsWzBdLCAneCcpIHx8IDA7XG4gICAgICBpbWFnZS5zdGFydFkgPSBVdGlscy5nZXRUcmFuc2xhdGUoZ2VzdHVyZS4kaW1hZ2VXcmFwRWxbMF0sICd5JykgfHwgMDtcbiAgICAgIGdlc3R1cmUuc2xpZGVXaWR0aCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICBnZXN0dXJlLnNsaWRlSGVpZ2h0ID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDApO1xuICAgICAgaWYgKHN3aXBlci5ydGwpIHsgaW1hZ2Uuc3RhcnRYID0gLWltYWdlLnN0YXJ0WDsgfVxuICAgICAgaWYgKHN3aXBlci5ydGwpIHsgaW1hZ2Uuc3RhcnRZID0gLWltYWdlLnN0YXJ0WTsgfVxuICAgIH1cbiAgICAvLyBEZWZpbmUgaWYgd2UgbmVlZCBpbWFnZSBkcmFnXG4gICAgdmFyIHNjYWxlZFdpZHRoID0gaW1hZ2Uud2lkdGggKiB6b29tLnNjYWxlO1xuICAgIHZhciBzY2FsZWRIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiB6b29tLnNjYWxlO1xuXG4gICAgaWYgKHNjYWxlZFdpZHRoIDwgZ2VzdHVyZS5zbGlkZVdpZHRoICYmIHNjYWxlZEhlaWdodCA8IGdlc3R1cmUuc2xpZGVIZWlnaHQpIHsgcmV0dXJuOyB9XG5cbiAgICBpbWFnZS5taW5YID0gTWF0aC5taW4oKChnZXN0dXJlLnNsaWRlV2lkdGggLyAyKSAtIChzY2FsZWRXaWR0aCAvIDIpKSwgMCk7XG4gICAgaW1hZ2UubWF4WCA9IC1pbWFnZS5taW5YO1xuICAgIGltYWdlLm1pblkgPSBNYXRoLm1pbigoKGdlc3R1cmUuc2xpZGVIZWlnaHQgLyAyKSAtIChzY2FsZWRIZWlnaHQgLyAyKSksIDApO1xuICAgIGltYWdlLm1heFkgPSAtaW1hZ2UubWluWTtcblxuICAgIGltYWdlLnRvdWNoZXNDdXJyZW50LnggPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICBpbWFnZS50b3VjaGVzQ3VycmVudC55ID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG5cbiAgICBpZiAoIWltYWdlLmlzTW92ZWQgJiYgIXpvb20uaXNTY2FsaW5nKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHN3aXBlci5pc0hvcml6b250YWwoKSAmJlxuICAgICAgICAoXG4gICAgICAgICAgKE1hdGguZmxvb3IoaW1hZ2UubWluWCkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRYKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC54IDwgaW1hZ2UudG91Y2hlc1N0YXJ0LngpIHx8XG4gICAgICAgICAgKE1hdGguZmxvb3IoaW1hZ2UubWF4WCkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRYKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC54ID4gaW1hZ2UudG91Y2hlc1N0YXJ0LngpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBpbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgIXN3aXBlci5pc0hvcml6b250YWwoKSAmJlxuICAgICAgICAoXG4gICAgICAgICAgKE1hdGguZmxvb3IoaW1hZ2UubWluWSkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRZKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC55IDwgaW1hZ2UudG91Y2hlc1N0YXJ0LnkpIHx8XG4gICAgICAgICAgKE1hdGguZmxvb3IoaW1hZ2UubWF4WSkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRZKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC55ID4gaW1hZ2UudG91Y2hlc1N0YXJ0LnkpXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICBpbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGltYWdlLmlzTW92ZWQgPSB0cnVlO1xuICAgIGltYWdlLmN1cnJlbnRYID0gKGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSBpbWFnZS50b3VjaGVzU3RhcnQueCkgKyBpbWFnZS5zdGFydFg7XG4gICAgaW1hZ2UuY3VycmVudFkgPSAoaW1hZ2UudG91Y2hlc0N1cnJlbnQueSAtIGltYWdlLnRvdWNoZXNTdGFydC55KSArIGltYWdlLnN0YXJ0WTtcblxuICAgIGlmIChpbWFnZS5jdXJyZW50WCA8IGltYWdlLm1pblgpIHtcbiAgICAgIGltYWdlLmN1cnJlbnRYID0gKGltYWdlLm1pblggKyAxKSAtIChNYXRoLnBvdyggKChpbWFnZS5taW5YIC0gaW1hZ2UuY3VycmVudFgpICsgMSksIDAuOCApKTtcbiAgICB9XG4gICAgaWYgKGltYWdlLmN1cnJlbnRYID4gaW1hZ2UubWF4WCkge1xuICAgICAgaW1hZ2UuY3VycmVudFggPSAoaW1hZ2UubWF4WCAtIDEpICsgKE1hdGgucG93KCAoKGltYWdlLmN1cnJlbnRYIC0gaW1hZ2UubWF4WCkgKyAxKSwgMC44ICkpO1xuICAgIH1cblxuICAgIGlmIChpbWFnZS5jdXJyZW50WSA8IGltYWdlLm1pblkpIHtcbiAgICAgIGltYWdlLmN1cnJlbnRZID0gKGltYWdlLm1pblkgKyAxKSAtIChNYXRoLnBvdyggKChpbWFnZS5taW5ZIC0gaW1hZ2UuY3VycmVudFkpICsgMSksIDAuOCApKTtcbiAgICB9XG4gICAgaWYgKGltYWdlLmN1cnJlbnRZID4gaW1hZ2UubWF4WSkge1xuICAgICAgaW1hZ2UuY3VycmVudFkgPSAoaW1hZ2UubWF4WSAtIDEpICsgKE1hdGgucG93KCAoKGltYWdlLmN1cnJlbnRZIC0gaW1hZ2UubWF4WSkgKyAxKSwgMC44ICkpO1xuICAgIH1cblxuICAgIC8vIFZlbG9jaXR5XG4gICAgaWYgKCF2ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSB7IHZlbG9jaXR5LnByZXZQb3NpdGlvblggPSBpbWFnZS50b3VjaGVzQ3VycmVudC54OyB9XG4gICAgaWYgKCF2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSB7IHZlbG9jaXR5LnByZXZQb3NpdGlvblkgPSBpbWFnZS50b3VjaGVzQ3VycmVudC55OyB9XG4gICAgaWYgKCF2ZWxvY2l0eS5wcmV2VGltZSkgeyB2ZWxvY2l0eS5wcmV2VGltZSA9IERhdGUubm93KCk7IH1cbiAgICB2ZWxvY2l0eS54ID0gKGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSAvIChEYXRlLm5vdygpIC0gdmVsb2NpdHkucHJldlRpbWUpIC8gMjtcbiAgICB2ZWxvY2l0eS55ID0gKGltYWdlLnRvdWNoZXNDdXJyZW50LnkgLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSAvIChEYXRlLm5vdygpIC0gdmVsb2NpdHkucHJldlRpbWUpIC8gMjtcbiAgICBpZiAoTWF0aC5hYnMoaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIHZlbG9jaXR5LnByZXZQb3NpdGlvblgpIDwgMikgeyB2ZWxvY2l0eS54ID0gMDsgfVxuICAgIGlmIChNYXRoLmFicyhpbWFnZS50b3VjaGVzQ3VycmVudC55IC0gdmVsb2NpdHkucHJldlBvc2l0aW9uWSkgPCAyKSB7IHZlbG9jaXR5LnkgPSAwOyB9XG4gICAgdmVsb2NpdHkucHJldlBvc2l0aW9uWCA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lng7XG4gICAgdmVsb2NpdHkucHJldlBvc2l0aW9uWSA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lnk7XG4gICAgdmVsb2NpdHkucHJldlRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgKGltYWdlLmN1cnJlbnRYKSArIFwicHgsIFwiICsgKGltYWdlLmN1cnJlbnRZKSArIFwicHgsMClcIikpO1xuICB9LFxuICBvblRvdWNoRW5kOiBmdW5jdGlvbiBvblRvdWNoRW5kKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XG4gICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XG4gICAgdmFyIGltYWdlID0gem9vbS5pbWFnZTtcbiAgICB2YXIgdmVsb2NpdHkgPSB6b29tLnZlbG9jaXR5O1xuICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgICBpZiAoIWltYWdlLmlzVG91Y2hlZCB8fCAhaW1hZ2UuaXNNb3ZlZCkge1xuICAgICAgaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICBpbWFnZS5pc01vdmVkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIGltYWdlLmlzTW92ZWQgPSBmYWxzZTtcbiAgICB2YXIgbW9tZW50dW1EdXJhdGlvblggPSAzMDA7XG4gICAgdmFyIG1vbWVudHVtRHVyYXRpb25ZID0gMzAwO1xuICAgIHZhciBtb21lbnR1bURpc3RhbmNlWCA9IHZlbG9jaXR5LnggKiBtb21lbnR1bUR1cmF0aW9uWDtcbiAgICB2YXIgbmV3UG9zaXRpb25YID0gaW1hZ2UuY3VycmVudFggKyBtb21lbnR1bURpc3RhbmNlWDtcbiAgICB2YXIgbW9tZW50dW1EaXN0YW5jZVkgPSB2ZWxvY2l0eS55ICogbW9tZW50dW1EdXJhdGlvblk7XG4gICAgdmFyIG5ld1Bvc2l0aW9uWSA9IGltYWdlLmN1cnJlbnRZICsgbW9tZW50dW1EaXN0YW5jZVk7XG5cbiAgICAvLyBGaXggZHVyYXRpb25cbiAgICBpZiAodmVsb2NpdHkueCAhPT0gMCkgeyBtb21lbnR1bUR1cmF0aW9uWCA9IE1hdGguYWJzKChuZXdQb3NpdGlvblggLSBpbWFnZS5jdXJyZW50WCkgLyB2ZWxvY2l0eS54KTsgfVxuICAgIGlmICh2ZWxvY2l0eS55ICE9PSAwKSB7IG1vbWVudHVtRHVyYXRpb25ZID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uWSAtIGltYWdlLmN1cnJlbnRZKSAvIHZlbG9jaXR5LnkpOyB9XG4gICAgdmFyIG1vbWVudHVtRHVyYXRpb24gPSBNYXRoLm1heChtb21lbnR1bUR1cmF0aW9uWCwgbW9tZW50dW1EdXJhdGlvblkpO1xuXG4gICAgaW1hZ2UuY3VycmVudFggPSBuZXdQb3NpdGlvblg7XG4gICAgaW1hZ2UuY3VycmVudFkgPSBuZXdQb3NpdGlvblk7XG5cbiAgICAvLyBEZWZpbmUgaWYgd2UgbmVlZCBpbWFnZSBkcmFnXG4gICAgdmFyIHNjYWxlZFdpZHRoID0gaW1hZ2Uud2lkdGggKiB6b29tLnNjYWxlO1xuICAgIHZhciBzY2FsZWRIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiB6b29tLnNjYWxlO1xuICAgIGltYWdlLm1pblggPSBNYXRoLm1pbigoKGdlc3R1cmUuc2xpZGVXaWR0aCAvIDIpIC0gKHNjYWxlZFdpZHRoIC8gMikpLCAwKTtcbiAgICBpbWFnZS5tYXhYID0gLWltYWdlLm1pblg7XG4gICAgaW1hZ2UubWluWSA9IE1hdGgubWluKCgoZ2VzdHVyZS5zbGlkZUhlaWdodCAvIDIpIC0gKHNjYWxlZEhlaWdodCAvIDIpKSwgMCk7XG4gICAgaW1hZ2UubWF4WSA9IC1pbWFnZS5taW5ZO1xuICAgIGltYWdlLmN1cnJlbnRYID0gTWF0aC5tYXgoTWF0aC5taW4oaW1hZ2UuY3VycmVudFgsIGltYWdlLm1heFgpLCBpbWFnZS5taW5YKTtcbiAgICBpbWFnZS5jdXJyZW50WSA9IE1hdGgubWF4KE1hdGgubWluKGltYWdlLmN1cnJlbnRZLCBpbWFnZS5tYXhZKSwgaW1hZ2UubWluWSk7XG5cbiAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKG1vbWVudHVtRHVyYXRpb24pLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZChcIiArIChpbWFnZS5jdXJyZW50WCkgKyBcInB4LCBcIiArIChpbWFnZS5jdXJyZW50WSkgKyBcInB4LDApXCIpKTtcbiAgfSxcbiAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiBvblRyYW5zaXRpb25FbmQoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcbiAgICBpZiAoZ2VzdHVyZS4kc2xpZGVFbCAmJiBzd2lwZXIucHJldmlvdXNJbmRleCAhPT0gc3dpcGVyLmFjdGl2ZUluZGV4KSB7XG4gICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XG4gICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9IHVuZGVmaW5lZDtcbiAgICAgIGdlc3R1cmUuJGltYWdlRWwgPSB1bmRlZmluZWQ7XG4gICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IHVuZGVmaW5lZDtcblxuICAgICAgem9vbS5zY2FsZSA9IDE7XG4gICAgICB6b29tLmN1cnJlbnRTY2FsZSA9IDE7XG4gICAgfVxuICB9LFxuICAvLyBUb2dnbGUgWm9vbVxuICB0b2dnbGU6IGZ1bmN0aW9uIHRvZ2dsZShlKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcblxuICAgIGlmICh6b29tLnNjYWxlICYmIHpvb20uc2NhbGUgIT09IDEpIHtcbiAgICAgIC8vIFpvb20gT3V0XG4gICAgICB6b29tLm91dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBab29tIEluXG4gICAgICB6b29tLmluKGUpO1xuICAgIH1cbiAgfSxcbiAgaW46IGZ1bmN0aW9uIGluJDEoZSkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy56b29tO1xuICAgIHZhciBnZXN0dXJlID0gem9vbS5nZXN0dXJlO1xuICAgIHZhciBpbWFnZSA9IHpvb20uaW1hZ2U7XG5cbiAgICBpZiAoIWdlc3R1cmUuJHNsaWRlRWwpIHtcbiAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSBzd2lwZXIuY2xpY2tlZFNsaWRlID8gJCQxKHN3aXBlci5jbGlja2VkU2xpZGUpIDogc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IGdlc3R1cmUuJHNsaWRlRWwuZmluZCgnaW1nLCBzdmcsIGNhbnZhcycpO1xuICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwgPSBnZXN0dXJlLiRpbWFnZUVsLnBhcmVudCgoXCIuXCIgKyAocGFyYW1zLmNvbnRhaW5lckNsYXNzKSkpO1xuICAgIH1cbiAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICBnZXN0dXJlLiRzbGlkZUVsLmFkZENsYXNzKChcIlwiICsgKHBhcmFtcy56b29tZWRTbGlkZUNsYXNzKSkpO1xuXG4gICAgdmFyIHRvdWNoWDtcbiAgICB2YXIgdG91Y2hZO1xuICAgIHZhciBvZmZzZXRYO1xuICAgIHZhciBvZmZzZXRZO1xuICAgIHZhciBkaWZmWDtcbiAgICB2YXIgZGlmZlk7XG4gICAgdmFyIHRyYW5zbGF0ZVg7XG4gICAgdmFyIHRyYW5zbGF0ZVk7XG4gICAgdmFyIGltYWdlV2lkdGg7XG4gICAgdmFyIGltYWdlSGVpZ2h0O1xuICAgIHZhciBzY2FsZWRXaWR0aDtcbiAgICB2YXIgc2NhbGVkSGVpZ2h0O1xuICAgIHZhciB0cmFuc2xhdGVNaW5YO1xuICAgIHZhciB0cmFuc2xhdGVNaW5ZO1xuICAgIHZhciB0cmFuc2xhdGVNYXhYO1xuICAgIHZhciB0cmFuc2xhdGVNYXhZO1xuICAgIHZhciBzbGlkZVdpZHRoO1xuICAgIHZhciBzbGlkZUhlaWdodDtcblxuICAgIGlmICh0eXBlb2YgaW1hZ2UudG91Y2hlc1N0YXJ0LnggPT09ICd1bmRlZmluZWQnICYmIGUpIHtcbiAgICAgIHRvdWNoWCA9IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgdG91Y2hZID0gZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvdWNoWCA9IGltYWdlLnRvdWNoZXNTdGFydC54O1xuICAgICAgdG91Y2hZID0gaW1hZ2UudG91Y2hlc1N0YXJ0Lnk7XG4gICAgfVxuXG4gICAgem9vbS5zY2FsZSA9IGdlc3R1cmUuJGltYWdlV3JhcEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXpvb20nKSB8fCBwYXJhbXMubWF4UmF0aW87XG4gICAgem9vbS5jdXJyZW50U2NhbGUgPSBnZXN0dXJlLiRpbWFnZVdyYXBFbC5hdHRyKCdkYXRhLXN3aXBlci16b29tJykgfHwgcGFyYW1zLm1heFJhdGlvO1xuICAgIGlmIChlKSB7XG4gICAgICBzbGlkZVdpZHRoID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRXaWR0aDtcbiAgICAgIHNsaWRlSGVpZ2h0ID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICBvZmZzZXRYID0gZ2VzdHVyZS4kc2xpZGVFbC5vZmZzZXQoKS5sZWZ0O1xuICAgICAgb2Zmc2V0WSA9IGdlc3R1cmUuJHNsaWRlRWwub2Zmc2V0KCkudG9wO1xuICAgICAgZGlmZlggPSAob2Zmc2V0WCArIChzbGlkZVdpZHRoIC8gMikpIC0gdG91Y2hYO1xuICAgICAgZGlmZlkgPSAob2Zmc2V0WSArIChzbGlkZUhlaWdodCAvIDIpKSAtIHRvdWNoWTtcblxuICAgICAgaW1hZ2VXaWR0aCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICBpbWFnZUhlaWdodCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgc2NhbGVkV2lkdGggPSBpbWFnZVdpZHRoICogem9vbS5zY2FsZTtcbiAgICAgIHNjYWxlZEhlaWdodCA9IGltYWdlSGVpZ2h0ICogem9vbS5zY2FsZTtcblxuICAgICAgdHJhbnNsYXRlTWluWCA9IE1hdGgubWluKCgoc2xpZGVXaWR0aCAvIDIpIC0gKHNjYWxlZFdpZHRoIC8gMikpLCAwKTtcbiAgICAgIHRyYW5zbGF0ZU1pblkgPSBNYXRoLm1pbigoKHNsaWRlSGVpZ2h0IC8gMikgLSAoc2NhbGVkSGVpZ2h0IC8gMikpLCAwKTtcbiAgICAgIHRyYW5zbGF0ZU1heFggPSAtdHJhbnNsYXRlTWluWDtcbiAgICAgIHRyYW5zbGF0ZU1heFkgPSAtdHJhbnNsYXRlTWluWTtcblxuICAgICAgdHJhbnNsYXRlWCA9IGRpZmZYICogem9vbS5zY2FsZTtcbiAgICAgIHRyYW5zbGF0ZVkgPSBkaWZmWSAqIHpvb20uc2NhbGU7XG5cbiAgICAgIGlmICh0cmFuc2xhdGVYIDwgdHJhbnNsYXRlTWluWCkge1xuICAgICAgICB0cmFuc2xhdGVYID0gdHJhbnNsYXRlTWluWDtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2xhdGVYID4gdHJhbnNsYXRlTWF4WCkge1xuICAgICAgICB0cmFuc2xhdGVYID0gdHJhbnNsYXRlTWF4WDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zbGF0ZVkgPCB0cmFuc2xhdGVNaW5ZKSB7XG4gICAgICAgIHRyYW5zbGF0ZVkgPSB0cmFuc2xhdGVNaW5ZO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zbGF0ZVkgPiB0cmFuc2xhdGVNYXhZKSB7XG4gICAgICAgIHRyYW5zbGF0ZVkgPSB0cmFuc2xhdGVNYXhZO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2xhdGVYID0gMDtcbiAgICAgIHRyYW5zbGF0ZVkgPSAwO1xuICAgIH1cbiAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgdHJhbnNsYXRlWCArIFwicHgsIFwiICsgdHJhbnNsYXRlWSArIFwicHgsMClcIikpO1xuICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoXCIgKyAoem9vbS5zY2FsZSkgKyBcIilcIikpO1xuICB9LFxuICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcblxuICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcblxuICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCkge1xuICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9IHN3aXBlci5jbGlja2VkU2xpZGUgPyAkJDEoc3dpcGVyLmNsaWNrZWRTbGlkZSkgOiBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICBnZXN0dXJlLiRpbWFnZUVsID0gZ2VzdHVyZS4kc2xpZGVFbC5maW5kKCdpbWcsIHN2ZywgY2FudmFzJyk7XG4gICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KChcIi5cIiArIChwYXJhbXMuY29udGFpbmVyQ2xhc3MpKSk7XG4gICAgfVxuICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgIHpvb20uc2NhbGUgPSAxO1xuICAgIHpvb20uY3VycmVudFNjYWxlID0gMTtcbiAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCknKTtcbiAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgxKScpO1xuICAgIGdlc3R1cmUuJHNsaWRlRWwucmVtb3ZlQ2xhc3MoKFwiXCIgKyAocGFyYW1zLnpvb21lZFNsaWRlQ2xhc3MpKSk7XG4gICAgZ2VzdHVyZS4kc2xpZGVFbCA9IHVuZGVmaW5lZDtcbiAgfSxcbiAgLy8gQXR0YWNoL0RldGFjaCBFdmVudHNcbiAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICBpZiAoem9vbS5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgIHpvb20uZW5hYmxlZCA9IHRydWU7XG5cbiAgICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcblxuICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSBzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0JyAmJiBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBzd2lwZXIucGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcblxuICAgIC8vIFNjYWxlIGltYWdlXG4gICAgaWYgKFN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgIHNsaWRlcy5vbignZ2VzdHVyZXN0YXJ0Jywgem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIHNsaWRlcy5vbignZ2VzdHVyZWNoYW5nZScsIHpvb20ub25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgc2xpZGVzLm9uKCdnZXN0dXJlZW5kJywgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgc2xpZGVzLm9uKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCwgem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIHNsaWRlcy5vbihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgem9vbS5vbkdlc3R1cmVDaGFuZ2UsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICBzbGlkZXMub24oc3dpcGVyLnRvdWNoRXZlbnRzLmVuZCwgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gTW92ZSBpbWFnZVxuICAgIHN3aXBlci5zbGlkZXMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIHNsaWRlRWwpIHtcbiAgICAgIHZhciAkc2xpZGVFbCA9ICQkMShzbGlkZUVsKTtcbiAgICAgIGlmICgkc2xpZGVFbC5maW5kKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnpvb20uY29udGFpbmVyQ2xhc3MpKSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkc2xpZGVFbC5vbihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgem9vbS5vblRvdWNoTW92ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICBpZiAoIXpvb20uZW5hYmxlZCkgeyByZXR1cm47IH1cblxuICAgIHN3aXBlci56b29tLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuXG4gICAgdmFyIHBhc3NpdmVMaXN0ZW5lciA9IHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnICYmIFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHN3aXBlci5wYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHsgcGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogZmFsc2UgfSA6IGZhbHNlO1xuXG4gICAgLy8gU2NhbGUgaW1hZ2VcbiAgICBpZiAoU3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgc2xpZGVzLm9mZignZ2VzdHVyZXN0YXJ0Jywgem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIHNsaWRlcy5vZmYoJ2dlc3R1cmVjaGFuZ2UnLCB6b29tLm9uR2VzdHVyZUNoYW5nZSwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIHNsaWRlcy5vZmYoJ2dlc3R1cmVlbmQnLCB6b29tLm9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICB9IGVsc2UgaWYgKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICBzbGlkZXMub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCwgem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIHNsaWRlcy5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLm1vdmUsIHpvb20ub25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgc2xpZGVzLm9mZihzd2lwZXIudG91Y2hFdmVudHMuZW5kLCB6b29tLm9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBNb3ZlIGltYWdlXG4gICAgc3dpcGVyLnNsaWRlcy5lYWNoKGZ1bmN0aW9uIChpbmRleCwgc2xpZGVFbCkge1xuICAgICAgdmFyICRzbGlkZUVsID0gJCQxKHNsaWRlRWwpO1xuICAgICAgaWYgKCRzbGlkZUVsLmZpbmQoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuem9vbS5jb250YWluZXJDbGFzcykpKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICRzbGlkZUVsLm9mZihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgem9vbS5vblRvdWNoTW92ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG59O1xuXG52YXIgWm9vbSQxID0ge1xuICBuYW1lOiAnem9vbScsXG4gIHBhcmFtczoge1xuICAgIHpvb206IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbWF4UmF0aW86IDMsXG4gICAgICBtaW5SYXRpbzogMSxcbiAgICAgIHRvZ2dsZTogdHJ1ZSxcbiAgICAgIGNvbnRhaW5lckNsYXNzOiAnc3dpcGVyLXpvb20tY29udGFpbmVyJyxcbiAgICAgIHpvb21lZFNsaWRlQ2xhc3M6ICdzd2lwZXItc2xpZGUtem9vbWVkJyxcbiAgICB9LFxuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgem9vbSA9IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgc2NhbGU6IDEsXG4gICAgICBjdXJyZW50U2NhbGU6IDEsXG4gICAgICBpc1NjYWxpbmc6IGZhbHNlLFxuICAgICAgZ2VzdHVyZToge1xuICAgICAgICAkc2xpZGVFbDogdW5kZWZpbmVkLFxuICAgICAgICBzbGlkZVdpZHRoOiB1bmRlZmluZWQsXG4gICAgICAgIHNsaWRlSGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgICRpbWFnZUVsOiB1bmRlZmluZWQsXG4gICAgICAgICRpbWFnZVdyYXBFbDogdW5kZWZpbmVkLFxuICAgICAgICBtYXhSYXRpbzogMyxcbiAgICAgIH0sXG4gICAgICBpbWFnZToge1xuICAgICAgICBpc1RvdWNoZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNNb3ZlZDogdW5kZWZpbmVkLFxuICAgICAgICBjdXJyZW50WDogdW5kZWZpbmVkLFxuICAgICAgICBjdXJyZW50WTogdW5kZWZpbmVkLFxuICAgICAgICBtaW5YOiB1bmRlZmluZWQsXG4gICAgICAgIG1pblk6IHVuZGVmaW5lZCxcbiAgICAgICAgbWF4WDogdW5kZWZpbmVkLFxuICAgICAgICBtYXhZOiB1bmRlZmluZWQsXG4gICAgICAgIHdpZHRoOiB1bmRlZmluZWQsXG4gICAgICAgIGhlaWdodDogdW5kZWZpbmVkLFxuICAgICAgICBzdGFydFg6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhcnRZOiB1bmRlZmluZWQsXG4gICAgICAgIHRvdWNoZXNTdGFydDoge30sXG4gICAgICAgIHRvdWNoZXNDdXJyZW50OiB7fSxcbiAgICAgIH0sXG4gICAgICB2ZWxvY2l0eToge1xuICAgICAgICB4OiB1bmRlZmluZWQsXG4gICAgICAgIHk6IHVuZGVmaW5lZCxcbiAgICAgICAgcHJldlBvc2l0aW9uWDogdW5kZWZpbmVkLFxuICAgICAgICBwcmV2UG9zaXRpb25ZOiB1bmRlZmluZWQsXG4gICAgICAgIHByZXZUaW1lOiB1bmRlZmluZWQsXG4gICAgICB9LFxuICAgIH07XG4gICAgKCdvbkdlc3R1cmVTdGFydCBvbkdlc3R1cmVDaGFuZ2Ugb25HZXN0dXJlRW5kIG9uVG91Y2hTdGFydCBvblRvdWNoTW92ZSBvblRvdWNoRW5kIG9uVHJhbnNpdGlvbkVuZCB0b2dnbGUgZW5hYmxlIGRpc2FibGUgaW4gb3V0Jykuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICB6b29tW21ldGhvZE5hbWVdID0gWm9vbVttZXRob2ROYW1lXS5iaW5kKHN3aXBlcik7XG4gICAgfSk7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgem9vbTogem9vbSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy56b29tLmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLnpvb20uZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuem9vbS5kaXNhYmxlKCk7XG4gICAgfSxcbiAgICB0b3VjaFN0YXJ0OiBmdW5jdGlvbiB0b3VjaFN0YXJ0KGUpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuem9vbS5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLnpvb20ub25Ub3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgdG91Y2hFbmQ6IGZ1bmN0aW9uIHRvdWNoRW5kKGUpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuem9vbS5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLnpvb20ub25Ub3VjaEVuZChlKTtcbiAgICB9LFxuICAgIGRvdWJsZVRhcDogZnVuY3Rpb24gZG91YmxlVGFwKGUpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuem9vbS5lbmFibGVkICYmIHN3aXBlci56b29tLmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy56b29tLnRvZ2dsZSkge1xuICAgICAgICBzd2lwZXIuem9vbS50b2dnbGUoZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0cmFuc2l0aW9uRW5kOiBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnpvb20uZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuem9vbS5vblRyYW5zaXRpb25FbmQoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcblxudmFyIExhenkgPSB7XG4gIGxvYWRJblNsaWRlOiBmdW5jdGlvbiBsb2FkSW5TbGlkZShpbmRleCwgbG9hZEluRHVwbGljYXRlKSB7XG4gICAgaWYgKCBsb2FkSW5EdXBsaWNhdGUgPT09IHZvaWQgMCApIGxvYWRJbkR1cGxpY2F0ZSA9IHRydWU7XG5cbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5sYXp5O1xuICAgIGlmICh0eXBlb2YgaW5kZXggPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuICAgIGlmIChzd2lwZXIuc2xpZGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgICB2YXIgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG5cbiAgICB2YXIgJHNsaWRlRWwgPSBpc1ZpcnR1YWxcbiAgICAgID8gc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIl1cIikpXG4gICAgICA6IHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpO1xuXG4gICAgdmFyICRpbWFnZXMgPSAkc2xpZGVFbC5maW5kKChcIi5cIiArIChwYXJhbXMuZWxlbWVudENsYXNzKSArIFwiOm5vdCguXCIgKyAocGFyYW1zLmxvYWRlZENsYXNzKSArIFwiKTpub3QoLlwiICsgKHBhcmFtcy5sb2FkaW5nQ2xhc3MpICsgXCIpXCIpKTtcbiAgICBpZiAoJHNsaWRlRWwuaGFzQ2xhc3MocGFyYW1zLmVsZW1lbnRDbGFzcykgJiYgISRzbGlkZUVsLmhhc0NsYXNzKHBhcmFtcy5sb2FkZWRDbGFzcykgJiYgISRzbGlkZUVsLmhhc0NsYXNzKHBhcmFtcy5sb2FkaW5nQ2xhc3MpKSB7XG4gICAgICAkaW1hZ2VzID0gJGltYWdlcy5hZGQoJHNsaWRlRWxbMF0pO1xuICAgIH1cbiAgICBpZiAoJGltYWdlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAkaW1hZ2VzLmVhY2goZnVuY3Rpb24gKGltYWdlSW5kZXgsIGltYWdlRWwpIHtcbiAgICAgIHZhciAkaW1hZ2VFbCA9ICQkMShpbWFnZUVsKTtcbiAgICAgICRpbWFnZUVsLmFkZENsYXNzKHBhcmFtcy5sb2FkaW5nQ2xhc3MpO1xuXG4gICAgICB2YXIgYmFja2dyb3VuZCA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtYmFja2dyb3VuZCcpO1xuICAgICAgdmFyIHNyYyA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtc3JjJyk7XG4gICAgICB2YXIgc3Jjc2V0ID0gJGltYWdlRWwuYXR0cignZGF0YS1zcmNzZXQnKTtcbiAgICAgIHZhciBzaXplcyA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtc2l6ZXMnKTtcblxuICAgICAgc3dpcGVyLmxvYWRJbWFnZSgkaW1hZ2VFbFswXSwgKHNyYyB8fCBiYWNrZ3JvdW5kKSwgc3Jjc2V0LCBzaXplcywgZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzd2lwZXIgPT09ICd1bmRlZmluZWQnIHx8IHN3aXBlciA9PT0gbnVsbCB8fCAhc3dpcGVyIHx8IChzd2lwZXIgJiYgIXN3aXBlci5wYXJhbXMpIHx8IHN3aXBlci5kZXN0cm95ZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChiYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgJGltYWdlRWwuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgKFwidXJsKFxcXCJcIiArIGJhY2tncm91bmQgKyBcIlxcXCIpXCIpKTtcbiAgICAgICAgICAkaW1hZ2VFbC5yZW1vdmVBdHRyKCdkYXRhLWJhY2tncm91bmQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc3Jjc2V0KSB7XG4gICAgICAgICAgICAkaW1hZ2VFbC5hdHRyKCdzcmNzZXQnLCBzcmNzZXQpO1xuICAgICAgICAgICAgJGltYWdlRWwucmVtb3ZlQXR0cignZGF0YS1zcmNzZXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNpemVzKSB7XG4gICAgICAgICAgICAkaW1hZ2VFbC5hdHRyKCdzaXplcycsIHNpemVzKTtcbiAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtc2l6ZXMnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgJGltYWdlRWwuYXR0cignc3JjJywgc3JjKTtcbiAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtc3JjJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJGltYWdlRWwuYWRkQ2xhc3MocGFyYW1zLmxvYWRlZENsYXNzKS5yZW1vdmVDbGFzcyhwYXJhbXMubG9hZGluZ0NsYXNzKTtcbiAgICAgICAgJHNsaWRlRWwuZmluZCgoXCIuXCIgKyAocGFyYW1zLnByZWxvYWRlckNsYXNzKSkpLnJlbW92ZSgpO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wICYmIGxvYWRJbkR1cGxpY2F0ZSkge1xuICAgICAgICAgIHZhciBzbGlkZU9yaWdpbmFsSW5kZXggPSAkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgICAgIGlmICgkc2xpZGVFbC5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKChcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBzbGlkZU9yaWdpbmFsSW5kZXggKyBcIlxcXCJdOm5vdCguXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiKVwiKSk7XG4gICAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShvcmlnaW5hbFNsaWRlLmluZGV4KCksIGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGR1cGxpY2F0ZWRTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgc2xpZGVPcmlnaW5hbEluZGV4ICsgXCJcXFwiXVwiKSk7XG4gICAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShkdXBsaWNhdGVkU2xpZGUuaW5kZXgoKSwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuZW1pdCgnbGF6eUltYWdlUmVhZHknLCAkc2xpZGVFbFswXSwgJGltYWdlRWxbMF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHN3aXBlci5lbWl0KCdsYXp5SW1hZ2VMb2FkJywgJHNsaWRlRWxbMF0sICRpbWFnZUVsWzBdKTtcbiAgICB9KTtcbiAgfSxcbiAgbG9hZDogZnVuY3Rpb24gbG9hZCgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgIHZhciBzd2lwZXJQYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICB2YXIgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyUGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyUGFyYW1zLmxhenk7XG5cbiAgICB2YXIgc2xpZGVzUGVyVmlldyA9IHN3aXBlclBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgIGlmIChzbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICAgIHNsaWRlc1BlclZpZXcgPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNsaWRlRXhpc3QoaW5kZXgpIHtcbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgaWYgKCR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlclBhcmFtcy5zbGlkZUNsYXNzKSArIFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIGluZGV4ICsgXCJcXFwiXVwiKSkubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2xpZGVzW2luZGV4XSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzbGlkZUluZGV4KHNsaWRlRWwpIHtcbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgcmV0dXJuICQkMShzbGlkZUVsKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICQkMShzbGlkZUVsKS5pbmRleCgpO1xuICAgIH1cblxuICAgIGlmICghc3dpcGVyLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkKSB7IHN3aXBlci5sYXp5LmluaXRpYWxJbWFnZUxvYWRlZCA9IHRydWU7IH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcbiAgICAgICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlclBhcmFtcy5zbGlkZVZpc2libGVDbGFzcykpKS5lYWNoKGZ1bmN0aW9uIChlbEluZGV4LCBzbGlkZUVsKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGlzVmlydHVhbCA/ICQkMShzbGlkZUVsKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpIDogJCQxKHNsaWRlRWwpLmluZGV4KCk7XG4gICAgICAgIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoc2xpZGVzUGVyVmlldyA+IDEpIHtcbiAgICAgIGZvciAodmFyIGkgPSBhY3RpdmVJbmRleDsgaSA8IGFjdGl2ZUluZGV4ICsgc2xpZGVzUGVyVmlldzsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzbGlkZUV4aXN0KGkpKSB7IHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGkpOyB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGFjdGl2ZUluZGV4KTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5sb2FkUHJldk5leHQpIHtcbiAgICAgIGlmIChzbGlkZXNQZXJWaWV3ID4gMSB8fCAocGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudCAmJiBwYXJhbXMubG9hZFByZXZOZXh0QW1vdW50ID4gMSkpIHtcbiAgICAgICAgdmFyIGFtb3VudCA9IHBhcmFtcy5sb2FkUHJldk5leHRBbW91bnQ7XG4gICAgICAgIHZhciBzcHYgPSBzbGlkZXNQZXJWaWV3O1xuICAgICAgICB2YXIgbWF4SW5kZXggPSBNYXRoLm1pbihhY3RpdmVJbmRleCArIHNwdiArIE1hdGgubWF4KGFtb3VudCwgc3B2KSwgc2xpZGVzLmxlbmd0aCk7XG4gICAgICAgIHZhciBtaW5JbmRleCA9IE1hdGgubWF4KGFjdGl2ZUluZGV4IC0gTWF0aC5tYXgoc3B2LCBhbW91bnQpLCAwKTtcbiAgICAgICAgLy8gTmV4dCBTbGlkZXNcbiAgICAgICAgZm9yICh2YXIgaSQxID0gYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3OyBpJDEgPCBtYXhJbmRleDsgaSQxICs9IDEpIHtcbiAgICAgICAgICBpZiAoc2xpZGVFeGlzdChpJDEpKSB7IHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGkkMSk7IH1cbiAgICAgICAgfVxuICAgICAgICAvLyBQcmV2IFNsaWRlc1xuICAgICAgICBmb3IgKHZhciBpJDIgPSBtaW5JbmRleDsgaSQyIDwgYWN0aXZlSW5kZXg7IGkkMiArPSAxKSB7XG4gICAgICAgICAgaWYgKHNsaWRlRXhpc3QoaSQyKSkgeyBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShpJDIpOyB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXh0U2xpZGUgPSAkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXJQYXJhbXMuc2xpZGVOZXh0Q2xhc3MpKSk7XG4gICAgICAgIGlmIChuZXh0U2xpZGUubGVuZ3RoID4gMCkgeyBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShzbGlkZUluZGV4KG5leHRTbGlkZSkpOyB9XG5cbiAgICAgICAgdmFyIHByZXZTbGlkZSA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlclBhcmFtcy5zbGlkZVByZXZDbGFzcykpKTtcbiAgICAgICAgaWYgKHByZXZTbGlkZS5sZW5ndGggPiAwKSB7IHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKHNsaWRlSW5kZXgocHJldlNsaWRlKSk7IH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG59O1xuXG52YXIgTGF6eSQxID0ge1xuICBuYW1lOiAnbGF6eScsXG4gIHBhcmFtczoge1xuICAgIGxhenk6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbG9hZFByZXZOZXh0OiBmYWxzZSxcbiAgICAgIGxvYWRQcmV2TmV4dEFtb3VudDogMSxcbiAgICAgIGxvYWRPblRyYW5zaXRpb25TdGFydDogZmFsc2UsXG5cbiAgICAgIGVsZW1lbnRDbGFzczogJ3N3aXBlci1sYXp5JyxcbiAgICAgIGxvYWRpbmdDbGFzczogJ3N3aXBlci1sYXp5LWxvYWRpbmcnLFxuICAgICAgbG9hZGVkQ2xhc3M6ICdzd2lwZXItbGF6eS1sb2FkZWQnLFxuICAgICAgcHJlbG9hZGVyQ2xhc3M6ICdzd2lwZXItbGF6eS1wcmVsb2FkZXInLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGxhenk6IHtcbiAgICAgICAgaW5pdGlhbEltYWdlTG9hZGVkOiBmYWxzZSxcbiAgICAgICAgbG9hZDogTGF6eS5sb2FkLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgbG9hZEluU2xpZGU6IExhenkubG9hZEluU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiBiZWZvcmVJbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmVsb2FkSW1hZ2VzKSB7IHN3aXBlci5wYXJhbXMucHJlbG9hZEltYWdlcyA9IGZhbHNlOyB9XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sYXp5LmVuYWJsZWQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiBzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSA9PT0gMCkge1xuICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzY3JvbGw6IGZ1bmN0aW9uIHNjcm9sbCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgIXN3aXBlci5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgc3dpcGVyLmxhenkubG9hZCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzaXplOiBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzY3JvbGxiYXJEcmFnTW92ZTogZnVuY3Rpb24gc2Nyb2xsYmFyRHJhZ01vdmUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0cmFuc2l0aW9uU3RhcnQ6IGZ1bmN0aW9uIHRyYW5zaXRpb25TdGFydCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0IHx8ICghc3dpcGVyLnBhcmFtcy5sYXp5LmxvYWRPblRyYW5zaXRpb25TdGFydCAmJiAhc3dpcGVyLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkKSkge1xuICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkICYmICFzd2lwZXIucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0KSB7XG4gICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcblxuLyogZXNsaW50IG5vLWJpdHdpc2U6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCI+PlwiXSB9XSAqL1xudmFyIENvbnRyb2xsZXIgPSB7XG4gIExpbmVhclNwbGluZTogZnVuY3Rpb24gTGluZWFyU3BsaW5lKHgsIHkpIHtcbiAgICB2YXIgYmluYXJ5U2VhcmNoID0gKGZ1bmN0aW9uIHNlYXJjaCgpIHtcbiAgICAgIHZhciBtYXhJbmRleDtcbiAgICAgIHZhciBtaW5JbmRleDtcbiAgICAgIHZhciBndWVzcztcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXJyYXksIHZhbCkge1xuICAgICAgICBtaW5JbmRleCA9IC0xO1xuICAgICAgICBtYXhJbmRleCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKG1heEluZGV4IC0gbWluSW5kZXggPiAxKSB7XG4gICAgICAgICAgZ3Vlc3MgPSBtYXhJbmRleCArIG1pbkluZGV4ID4+IDE7XG4gICAgICAgICAgaWYgKGFycmF5W2d1ZXNzXSA8PSB2YWwpIHtcbiAgICAgICAgICAgIG1pbkluZGV4ID0gZ3Vlc3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gZ3Vlc3M7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXhJbmRleDtcbiAgICAgIH07XG4gICAgfSgpKTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5sYXN0SW5kZXggPSB4Lmxlbmd0aCAtIDE7XG4gICAgLy8gR2l2ZW4gYW4geCB2YWx1ZSAoeDIpLCByZXR1cm4gdGhlIGV4cGVjdGVkIHkyIHZhbHVlOlxuICAgIC8vICh4MSx5MSkgaXMgdGhlIGtub3duIHBvaW50IGJlZm9yZSBnaXZlbiB2YWx1ZSxcbiAgICAvLyAoeDMseTMpIGlzIHRoZSBrbm93biBwb2ludCBhZnRlciBnaXZlbiB2YWx1ZS5cbiAgICB2YXIgaTE7XG4gICAgdmFyIGkzO1xuXG4gICAgdGhpcy5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uIGludGVycG9sYXRlKHgyKSB7XG4gICAgICBpZiAoIXgyKSB7IHJldHVybiAwOyB9XG5cbiAgICAgIC8vIEdldCB0aGUgaW5kZXhlcyBvZiB4MSBhbmQgeDMgKHRoZSBhcnJheSBpbmRleGVzIGJlZm9yZSBhbmQgYWZ0ZXIgZ2l2ZW4geDIpOlxuICAgICAgaTMgPSBiaW5hcnlTZWFyY2godGhpcy54LCB4Mik7XG4gICAgICBpMSA9IGkzIC0gMTtcblxuICAgICAgLy8gV2UgaGF2ZSBvdXIgaW5kZXhlcyBpMSAmIGkzLCBzbyB3ZSBjYW4gY2FsY3VsYXRlIGFscmVhZHk6XG4gICAgICAvLyB5MiA6PSAoKHgy4oiSeDEpIMOXICh5M+KIknkxKSkgw7cgKHgz4oiSeDEpICsgeTFcbiAgICAgIHJldHVybiAoKCh4MiAtIHRoaXMueFtpMV0pICogKHRoaXMueVtpM10gLSB0aGlzLnlbaTFdKSkgLyAodGhpcy54W2kzXSAtIHRoaXMueFtpMV0pKSArIHRoaXMueVtpMV07XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8geHh4OiBmb3Igbm93IGkgd2lsbCBqdXN0IHNhdmUgb25lIHNwbGluZSBmdW5jdGlvbiB0byB0b1xuICBnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uOiBmdW5jdGlvbiBnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uKGMpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lID0gc3dpcGVyLnBhcmFtcy5sb29wID9cbiAgICAgICAgbmV3IENvbnRyb2xsZXIuTGluZWFyU3BsaW5lKHN3aXBlci5zbGlkZXNHcmlkLCBjLnNsaWRlc0dyaWQpIDpcbiAgICAgICAgbmV3IENvbnRyb2xsZXIuTGluZWFyU3BsaW5lKHN3aXBlci5zbmFwR3JpZCwgYy5zbmFwR3JpZCk7XG4gICAgfVxuICB9LFxuICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZShzZXRUcmFuc2xhdGUkMSwgYnlDb250cm9sbGVyKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIGNvbnRyb2xsZWQgPSBzd2lwZXIuY29udHJvbGxlci5jb250cm9sO1xuICAgIHZhciBtdWx0aXBsaWVyO1xuICAgIHZhciBjb250cm9sbGVkVHJhbnNsYXRlO1xuICAgIGZ1bmN0aW9uIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoYykge1xuICAgICAgLy8gdGhpcyB3aWxsIGNyZWF0ZSBhbiBJbnRlcnBvbGF0ZSBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgc25hcEdyaWRzXG4gICAgICAvLyB4IGlzIHRoZSBHcmlkIG9mIHRoZSBzY3JvbGxlZCBzY3JvbGxlciBhbmQgeSB3aWxsIGJlIHRoZSBjb250cm9sbGVkIHNjcm9sbGVyXG4gICAgICAvLyBpdCBtYWtlcyBzZW5zZSB0byBjcmVhdGUgdGhpcyBvbmx5IG9uY2UgYW5kIHJlY2FsbCBpdCBmb3IgdGhlIGludGVycG9sYXRpb25cbiAgICAgIC8vIHRoZSBmdW5jdGlvbiBkb2VzIGEgbG90IG9mIHZhbHVlIGNhY2hpbmcgZm9yIHBlcmZvcm1hbmNlXG4gICAgICB2YXIgdHJhbnNsYXRlID0gYy5ydGwgJiYgYy5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgIHN3aXBlci5jb250cm9sbGVyLmdldEludGVycG9sYXRlRnVuY3Rpb24oYyk7XG4gICAgICAgIC8vIGkgYW0gbm90IHN1cmUgd2h5IHRoZSB2YWx1ZXMgaGF2ZSB0byBiZSBtdWx0aXBsaWNhdGVkIHRoaXMgd2F5LCB0cmllZCB0byBpbnZlcnQgdGhlIHNuYXBHcmlkXG4gICAgICAgIC8vIGJ1dCBpdCBkaWQgbm90IHdvcmsgb3V0XG4gICAgICAgIGNvbnRyb2xsZWRUcmFuc2xhdGUgPSAtc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lLmludGVycG9sYXRlKC10cmFuc2xhdGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNvbnRyb2xsZWRUcmFuc2xhdGUgfHwgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnY29udGFpbmVyJykge1xuICAgICAgICBtdWx0aXBsaWVyID0gKGMubWF4VHJhbnNsYXRlKCkgLSBjLm1pblRyYW5zbGF0ZSgpKSAvIChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpO1xuICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gKCh0cmFuc2xhdGUgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpICogbXVsdGlwbGllcikgKyBjLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmludmVyc2UpIHtcbiAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9IGMubWF4VHJhbnNsYXRlKCkgLSBjb250cm9sbGVkVHJhbnNsYXRlO1xuICAgICAgfVxuICAgICAgYy51cGRhdGVQcm9ncmVzcyhjb250cm9sbGVkVHJhbnNsYXRlKTtcbiAgICAgIGMuc2V0VHJhbnNsYXRlKGNvbnRyb2xsZWRUcmFuc2xhdGUsIHN3aXBlcik7XG4gICAgICBjLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICBjLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29udHJvbGxlZCkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJvbGxlZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoY29udHJvbGxlZFtpXSAhPT0gYnlDb250cm9sbGVyICYmIGNvbnRyb2xsZWRbaV0gaW5zdGFuY2VvZiBTd2lwZXIkMSkge1xuICAgICAgICAgIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoY29udHJvbGxlZFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbnRyb2xsZWQgaW5zdGFuY2VvZiBTd2lwZXIkMSAmJiBieUNvbnRyb2xsZXIgIT09IGNvbnRyb2xsZWQpIHtcbiAgICAgIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoY29udHJvbGxlZCk7XG4gICAgfVxuICB9LFxuICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgY29udHJvbGxlZCA9IHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2w7XG4gICAgdmFyIGk7XG4gICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oYykge1xuICAgICAgYy5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBzd2lwZXIpO1xuICAgICAgaWYgKGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICAgIGMudHJhbnNpdGlvblN0YXJ0KCk7XG4gICAgICAgIGMuJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoIWNvbnRyb2xsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgaWYgKGMucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICBjLmxvb3BGaXgoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYy50cmFuc2l0aW9uRW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb250cm9sbGVkKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRyb2xsZWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyJDEpIHtcbiAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjb250cm9sbGVkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29udHJvbGxlZCBpbnN0YW5jZW9mIFN3aXBlciQxICYmIGJ5Q29udHJvbGxlciAhPT0gY29udHJvbGxlZCkge1xuICAgICAgc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oY29udHJvbGxlZCk7XG4gICAgfVxuICB9LFxufTtcbnZhciBDb250cm9sbGVyJDEgPSB7XG4gIG5hbWU6ICdjb250cm9sbGVyJyxcbiAgcGFyYW1zOiB7XG4gICAgY29udHJvbGxlcjoge1xuICAgICAgY29udHJvbDogdW5kZWZpbmVkLFxuICAgICAgaW52ZXJzZTogZmFsc2UsXG4gICAgICBieTogJ3NsaWRlJywgLy8gb3IgJ2NvbnRhaW5lcidcbiAgICB9LFxuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBjb250cm9sbGVyOiB7XG4gICAgICAgIGNvbnRyb2w6IHN3aXBlci5wYXJhbXMuY29udHJvbGxlci5jb250cm9sLFxuICAgICAgICBnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uOiBDb250cm9sbGVyLmdldEludGVycG9sYXRlRnVuY3Rpb24uYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRUcmFuc2xhdGU6IENvbnRyb2xsZXIuc2V0VHJhbnNsYXRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0VHJhbnNpdGlvbjogQ29udHJvbGxlci5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG4gIG9uOiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgeyByZXR1cm47IH1cbiAgICAgIGlmIChzd2lwZXIuY29udHJvbGxlci5zcGxpbmUpIHtcbiAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xuICAgICAgICBkZWxldGUgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzaXplOiBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgeyByZXR1cm47IH1cbiAgICAgIGlmIChzd2lwZXIuY29udHJvbGxlci5zcGxpbmUpIHtcbiAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xuICAgICAgICBkZWxldGUgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lO1xuICAgICAgfVxuICAgIH0sXG4gICAgb2JzZXJ2ZXJVcGRhdGU6IGZ1bmN0aW9uIG9ic2VydmVyVXBkYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpIHsgcmV0dXJuOyB9XG4gICAgICBpZiAoc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lKSB7XG4gICAgICAgIHN3aXBlci5jb250cm9sbGVyLnNwbGluZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZGVsZXRlIHN3aXBlci5jb250cm9sbGVyLnNwbGluZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgeyByZXR1cm47IH1cbiAgICAgIHN3aXBlci5jb250cm9sbGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIGJ5Q29udHJvbGxlcik7XG4gICAgfSxcbiAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbiAgICB9LFxuICB9LFxufTtcblxudmFyIGExMXkgPSB7XG4gIG1ha2VFbEZvY3VzYWJsZTogZnVuY3Rpb24gbWFrZUVsRm9jdXNhYmxlKCRlbCkge1xuICAgICRlbC5hdHRyKCd0YWJJbmRleCcsICcwJyk7XG4gICAgcmV0dXJuICRlbDtcbiAgfSxcbiAgYWRkRWxSb2xlOiBmdW5jdGlvbiBhZGRFbFJvbGUoJGVsLCByb2xlKSB7XG4gICAgJGVsLmF0dHIoJ3JvbGUnLCByb2xlKTtcbiAgICByZXR1cm4gJGVsO1xuICB9LFxuICBhZGRFbExhYmVsOiBmdW5jdGlvbiBhZGRFbExhYmVsKCRlbCwgbGFiZWwpIHtcbiAgICAkZWwuYXR0cignYXJpYS1sYWJlbCcsIGxhYmVsKTtcbiAgICByZXR1cm4gJGVsO1xuICB9LFxuICBkaXNhYmxlRWw6IGZ1bmN0aW9uIGRpc2FibGVFbCgkZWwpIHtcbiAgICAkZWwuYXR0cignYXJpYS1kaXNhYmxlZCcsIHRydWUpO1xuICAgIHJldHVybiAkZWw7XG4gIH0sXG4gIGVuYWJsZUVsOiBmdW5jdGlvbiBlbmFibGVFbCgkZWwpIHtcbiAgICAkZWwuYXR0cignYXJpYS1kaXNhYmxlZCcsIGZhbHNlKTtcbiAgICByZXR1cm4gJGVsO1xuICB9LFxuICBvbkVudGVyS2V5OiBmdW5jdGlvbiBvbkVudGVyS2V5KGUpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5hMTF5O1xuICAgIGlmIChlLmtleUNvZGUgIT09IDEzKSB7IHJldHVybjsgfVxuICAgIHZhciAkdGFyZ2V0RWwgPSAkJDEoZS50YXJnZXQpO1xuICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsICYmICR0YXJnZXRFbC5pcyhzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsKSkge1xuICAgICAgaWYgKCEoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3ApKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgc3dpcGVyLmExMXkubm90aWZ5KHBhcmFtcy5sYXN0U2xpZGVNZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5hMTF5Lm5vdGlmeShwYXJhbXMubmV4dFNsaWRlTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsICYmICR0YXJnZXRFbC5pcyhzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSkge1xuICAgICAgaWYgKCEoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3ApKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICAgICAgc3dpcGVyLmExMXkubm90aWZ5KHBhcmFtcy5maXJzdFNsaWRlTWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuYTExeS5ub3RpZnkocGFyYW1zLnByZXZTbGlkZU1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgJHRhcmdldEVsLmlzKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpKSkpIHtcbiAgICAgICR0YXJnZXRFbFswXS5jbGljaygpO1xuICAgIH1cbiAgfSxcbiAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkobWVzc2FnZSkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBub3RpZmljYXRpb24gPSBzd2lwZXIuYTExeS5saXZlUmVnaW9uO1xuICAgIGlmIChub3RpZmljYXRpb24ubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgIG5vdGlmaWNhdGlvbi5odG1sKCcnKTtcbiAgICBub3RpZmljYXRpb24uaHRtbChtZXNzYWdlKTtcbiAgfSxcbiAgdXBkYXRlTmF2aWdhdGlvbjogZnVuY3Rpb24gdXBkYXRlTmF2aWdhdGlvbigpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcblxuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHsgcmV0dXJuOyB9XG4gICAgdmFyIHJlZiA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIHZhciAkbmV4dEVsID0gcmVmLiRuZXh0RWw7XG4gICAgdmFyICRwcmV2RWwgPSByZWYuJHByZXZFbDtcblxuICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgICBzd2lwZXIuYTExeS5kaXNhYmxlRWwoJHByZXZFbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuYTExeS5lbmFibGVFbCgkcHJldkVsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCRuZXh0RWwgJiYgJG5leHRFbC5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgIHN3aXBlci5hMTF5LmRpc2FibGVFbCgkbmV4dEVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5hMTF5LmVuYWJsZUVsKCRuZXh0RWwpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgdXBkYXRlUGFnaW5hdGlvbjogZnVuY3Rpb24gdXBkYXRlUGFnaW5hdGlvbigpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5hMTF5O1xuICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5sZW5ndGgpIHtcbiAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMuZWFjaChmdW5jdGlvbiAoYnVsbGV0SW5kZXgsIGJ1bGxldEVsKSB7XG4gICAgICAgIHZhciAkYnVsbGV0RWwgPSAkJDEoYnVsbGV0RWwpO1xuICAgICAgICBzd2lwZXIuYTExeS5tYWtlRWxGb2N1c2FibGUoJGJ1bGxldEVsKTtcbiAgICAgICAgc3dpcGVyLmExMXkuYWRkRWxSb2xlKCRidWxsZXRFbCwgJ2J1dHRvbicpO1xuICAgICAgICBzd2lwZXIuYTExeS5hZGRFbExhYmVsKCRidWxsZXRFbCwgcGFyYW1zLnBhZ2luYXRpb25CdWxsZXRNZXNzYWdlLnJlcGxhY2UoL3t7aW5kZXh9fS8sICRidWxsZXRFbC5pbmRleCgpICsgMSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgc3dpcGVyLiRlbC5hcHBlbmQoc3dpcGVyLmExMXkubGl2ZVJlZ2lvbik7XG5cbiAgICAvLyBOYXZpZ2F0aW9uXG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcbiAgICB2YXIgJG5leHRFbDtcbiAgICB2YXIgJHByZXZFbDtcbiAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCkge1xuICAgICAgJG5leHRFbCA9IHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWw7XG4gICAgfVxuICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSB7XG4gICAgICAkcHJldkVsID0gc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbDtcbiAgICB9XG4gICAgaWYgKCRuZXh0RWwpIHtcbiAgICAgIHN3aXBlci5hMTF5Lm1ha2VFbEZvY3VzYWJsZSgkbmV4dEVsKTtcbiAgICAgIHN3aXBlci5hMTF5LmFkZEVsUm9sZSgkbmV4dEVsLCAnYnV0dG9uJyk7XG4gICAgICBzd2lwZXIuYTExeS5hZGRFbExhYmVsKCRuZXh0RWwsIHBhcmFtcy5uZXh0U2xpZGVNZXNzYWdlKTtcbiAgICAgICRuZXh0RWwub24oJ2tleWRvd24nLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcbiAgICB9XG4gICAgaWYgKCRwcmV2RWwpIHtcbiAgICAgIHN3aXBlci5hMTF5Lm1ha2VFbEZvY3VzYWJsZSgkcHJldkVsKTtcbiAgICAgIHN3aXBlci5hMTF5LmFkZEVsUm9sZSgkcHJldkVsLCAnYnV0dG9uJyk7XG4gICAgICBzd2lwZXIuYTExeS5hZGRFbExhYmVsKCRwcmV2RWwsIHBhcmFtcy5wcmV2U2xpZGVNZXNzYWdlKTtcbiAgICAgICRwcmV2RWwub24oJ2tleWRvd24nLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcbiAgICB9XG5cbiAgICAvLyBQYWdpbmF0aW9uXG4gICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5jbGlja2FibGUgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCkge1xuICAgICAgc3dpcGVyLnBhZ2luYXRpb24uJGVsLm9uKCdrZXlkb3duJywgKFwiLlwiICsgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcykpLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHN3aXBlci5hMTF5LmxpdmVSZWdpb24gJiYgc3dpcGVyLmExMXkubGl2ZVJlZ2lvbi5sZW5ndGggPiAwKSB7IHN3aXBlci5hMTF5LmxpdmVSZWdpb24ucmVtb3ZlKCk7IH1cblxuICAgIHZhciAkbmV4dEVsO1xuICAgIHZhciAkcHJldkVsO1xuICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsKSB7XG4gICAgICAkbmV4dEVsID0gc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbDtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRwcmV2RWwpIHtcbiAgICAgICRwcmV2RWwgPSBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsO1xuICAgIH1cbiAgICBpZiAoJG5leHRFbCkge1xuICAgICAgJG5leHRFbC5vZmYoJ2tleWRvd24nLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcbiAgICB9XG4gICAgaWYgKCRwcmV2RWwpIHtcbiAgICAgICRwcmV2RWwub2ZmKCdrZXlkb3duJywgc3dpcGVyLmExMXkub25FbnRlcktleSk7XG4gICAgfVxuXG4gICAgLy8gUGFnaW5hdGlvblxuICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5sZW5ndGgpIHtcbiAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5vZmYoJ2tleWRvd24nLCAoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKSksIHN3aXBlci5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgIH1cbiAgfSxcbn07XG52YXIgQTExeSA9IHtcbiAgbmFtZTogJ2ExMXknLFxuICBwYXJhbXM6IHtcbiAgICBhMTF5OiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnc3dpcGVyLW5vdGlmaWNhdGlvbicsXG4gICAgICBwcmV2U2xpZGVNZXNzYWdlOiAnUHJldmlvdXMgc2xpZGUnLFxuICAgICAgbmV4dFNsaWRlTWVzc2FnZTogJ05leHQgc2xpZGUnLFxuICAgICAgZmlyc3RTbGlkZU1lc3NhZ2U6ICdUaGlzIGlzIHRoZSBmaXJzdCBzbGlkZScsXG4gICAgICBsYXN0U2xpZGVNZXNzYWdlOiAnVGhpcyBpcyB0aGUgbGFzdCBzbGlkZScsXG4gICAgICBwYWdpbmF0aW9uQnVsbGV0TWVzc2FnZTogJ0dvIHRvIHNsaWRlIHt7aW5kZXh9fScsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgYTExeToge1xuICAgICAgICBsaXZlUmVnaW9uOiAkJDEoKFwiPHNwYW4gY2xhc3M9XFxcIlwiICsgKHN3aXBlci5wYXJhbXMuYTExeS5ub3RpZmljYXRpb25DbGFzcykgKyBcIlxcXCIgYXJpYS1saXZlPVxcXCJhc3NlcnRpdmVcXFwiIGFyaWEtYXRvbWljPVxcXCJ0cnVlXFxcIj48L3NwYW4+XCIpKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMoYTExeSkuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgc3dpcGVyLmExMXlbbWV0aG9kTmFtZV0gPSBhMTF5W21ldGhvZE5hbWVdLmJpbmQoc3dpcGVyKTtcbiAgICB9KTtcbiAgfSxcbiAgb246IHtcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMuYTExeS5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLmExMXkuaW5pdCgpO1xuICAgICAgc3dpcGVyLmExMXkudXBkYXRlTmF2aWdhdGlvbigpO1xuICAgIH0sXG4gICAgdG9FZGdlOiBmdW5jdGlvbiB0b0VkZ2UoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuYTExeS51cGRhdGVOYXZpZ2F0aW9uKCk7XG4gICAgfSxcbiAgICBmcm9tRWRnZTogZnVuY3Rpb24gZnJvbUVkZ2UoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuYTExeS51cGRhdGVOYXZpZ2F0aW9uKCk7XG4gICAgfSxcbiAgICBwYWdpbmF0aW9uVXBkYXRlOiBmdW5jdGlvbiBwYWdpbmF0aW9uVXBkYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMuYTExeS5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLmExMXkudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmExMXkuZW5hYmxlZCkgeyByZXR1cm47IH1cbiAgICAgIHN3aXBlci5hMTF5LmRlc3Ryb3koKTtcbiAgICB9LFxuICB9LFxufTtcblxudmFyIEhpc3RvcnkgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLmhpc3RvcnkpIHsgcmV0dXJuOyB9XG4gICAgaWYgKCF3aW4uaGlzdG9yeSB8fCAhd2luLmhpc3RvcnkucHVzaFN0YXRlKSB7XG4gICAgICBzd2lwZXIucGFyYW1zLmhpc3RvcnkuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGhpc3RvcnkgPSBzd2lwZXIuaGlzdG9yeTtcbiAgICBoaXN0b3J5LmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBoaXN0b3J5LnBhdGhzID0gSGlzdG9yeS5nZXRQYXRoVmFsdWVzKCk7XG4gICAgaWYgKCFoaXN0b3J5LnBhdGhzLmtleSAmJiAhaGlzdG9yeS5wYXRocy52YWx1ZSkgeyByZXR1cm47IH1cbiAgICBoaXN0b3J5LnNjcm9sbFRvU2xpZGUoMCwgaGlzdG9yeS5wYXRocy52YWx1ZSwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc3dpcGVyLmhpc3Rvcnkuc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBzd2lwZXIuaGlzdG9yeS5zZXRIaXN0b3J5UG9wU3RhdGUpO1xuICAgIH1cbiAgfSxcbiAgc2V0SGlzdG9yeVBvcFN0YXRlOiBmdW5jdGlvbiBzZXRIaXN0b3J5UG9wU3RhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgc3dpcGVyLmhpc3RvcnkucGF0aHMgPSBIaXN0b3J5LmdldFBhdGhWYWx1ZXMoKTtcbiAgICBzd2lwZXIuaGlzdG9yeS5zY3JvbGxUb1NsaWRlKHN3aXBlci5wYXJhbXMuc3BlZWQsIHN3aXBlci5oaXN0b3J5LnBhdGhzLnZhbHVlLCBmYWxzZSk7XG4gIH0sXG4gIGdldFBhdGhWYWx1ZXM6IGZ1bmN0aW9uIGdldFBhdGhWYWx1ZXMoKSB7XG4gICAgdmFyIHBhdGhBcnJheSA9IHdpbi5sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgxKS5zcGxpdCgnLycpLmZpbHRlcihmdW5jdGlvbiAocGFydCkgeyByZXR1cm4gcGFydCAhPT0gJyc7IH0pO1xuICAgIHZhciB0b3RhbCA9IHBhdGhBcnJheS5sZW5ndGg7XG4gICAgdmFyIGtleSA9IHBhdGhBcnJheVt0b3RhbCAtIDJdO1xuICAgIHZhciB2YWx1ZSA9IHBhdGhBcnJheVt0b3RhbCAtIDFdO1xuICAgIHJldHVybiB7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfTtcbiAgfSxcbiAgc2V0SGlzdG9yeTogZnVuY3Rpb24gc2V0SGlzdG9yeShrZXksIGluZGV4KSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIuaGlzdG9yeS5pbml0aWFsaXplZCB8fCAhc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgdmFyIHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpbmRleCk7XG4gICAgdmFyIHZhbHVlID0gSGlzdG9yeS5zbHVnaWZ5KHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpKTtcbiAgICBpZiAoIXdpbi5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICB2YWx1ZSA9IGtleSArIFwiL1wiICsgdmFsdWU7XG4gICAgfVxuICAgIHZhciBjdXJyZW50U3RhdGUgPSB3aW4uaGlzdG9yeS5zdGF0ZTtcbiAgICBpZiAoY3VycmVudFN0YXRlICYmIGN1cnJlbnRTdGF0ZS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgIHdpbi5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7IHZhbHVlOiB2YWx1ZSB9LCBudWxsLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbi5oaXN0b3J5LnB1c2hTdGF0ZSh7IHZhbHVlOiB2YWx1ZSB9LCBudWxsLCB2YWx1ZSk7XG4gICAgfVxuICB9LFxuICBzbHVnaWZ5OiBmdW5jdGlvbiBzbHVnaWZ5KHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKClcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csICctJylcbiAgICAgIC5yZXBsYWNlKC9bXlxcdy1dKy9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC8tLSsvZywgJy0nKVxuICAgICAgLnJlcGxhY2UoL14tKy8sICcnKVxuICAgICAgLnJlcGxhY2UoLy0rJC8sICcnKTtcbiAgfSxcbiAgc2Nyb2xsVG9TbGlkZTogZnVuY3Rpb24gc2Nyb2xsVG9TbGlkZShzcGVlZCwgdmFsdWUsIHJ1bkNhbGxiYWNrcykge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgdmFyIHNsaWRlSGlzdG9yeSA9IEhpc3Rvcnkuc2x1Z2lmeShzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKSk7XG4gICAgICAgIGlmIChzbGlkZUhpc3RvcnkgPT09IHZhbHVlICYmICFzbGlkZS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgdmFyIGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oMCwgc3BlZWQsIHJ1bkNhbGxiYWNrcyk7XG4gICAgfVxuICB9LFxufTtcblxudmFyIEhpc3RvcnkkMSA9IHtcbiAgbmFtZTogJ2hpc3RvcnknLFxuICBwYXJhbXM6IHtcbiAgICBoaXN0b3J5OiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHJlcGxhY2VTdGF0ZTogZmFsc2UsXG4gICAgICBrZXk6ICdzbGlkZXMnLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGhpc3Rvcnk6IHtcbiAgICAgICAgaW5pdDogSGlzdG9yeS5pbml0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0SGlzdG9yeTogSGlzdG9yeS5zZXRIaXN0b3J5LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0SGlzdG9yeVBvcFN0YXRlOiBIaXN0b3J5LnNldEhpc3RvcnlQb3BTdGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNjcm9sbFRvU2xpZGU6IEhpc3Rvcnkuc2Nyb2xsVG9TbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhpc3RvcnkuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuaGlzdG9yeS5pbml0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmhpc3RvcnkuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5oaXN0b3J5LmluaXRpYWxpemVkKSB7XG4gICAgICAgIHN3aXBlci5oaXN0b3J5LnNldEhpc3Rvcnkoc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmtleSwgc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcblxudmFyIEhhc2hOYXZpZ2F0aW9uID0ge1xuICBvbkhhc2hDYW5nZTogZnVuY3Rpb24gb25IYXNoQ2FuZ2UoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIG5ld0hhc2ggPSBkb2MubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuICAgIHZhciBhY3RpdmVTbGlkZUhhc2ggPSBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCkuYXR0cignZGF0YS1oYXNoJyk7XG4gICAgaWYgKG5ld0hhc2ggIT09IGFjdGl2ZVNsaWRlSGFzaCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLWhhc2g9XFxcIlwiICsgbmV3SGFzaCArIFwiXFxcIl1cIikpLmluZGV4KCkpO1xuICAgIH1cbiAgfSxcbiAgc2V0SGFzaDogZnVuY3Rpb24gc2V0SGFzaCgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5oYXNoTmF2aWdhdGlvbi5pbml0aWFsaXplZCB8fCAhc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLnJlcGxhY2VTdGF0ZSAmJiB3aW4uaGlzdG9yeSAmJiB3aW4uaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgIHdpbi5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCAoKFwiI1wiICsgKHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKSkpIHx8ICcnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHZhciBoYXNoID0gc2xpZGUuYXR0cignZGF0YS1oYXNoJykgfHwgc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5Jyk7XG4gICAgICBkb2MubG9jYXRpb24uaGFzaCA9IGhhc2ggfHwgJyc7XG4gICAgfVxuICB9LFxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkIHx8IChzd2lwZXIucGFyYW1zLmhpc3RvcnkgJiYgc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpKSB7IHJldHVybjsgfVxuICAgIHN3aXBlci5oYXNoTmF2aWdhdGlvbi5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdmFyIGhhc2ggPSBkb2MubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuICAgIGlmIChoYXNoKSB7XG4gICAgICB2YXIgc3BlZWQgPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgdmFyIHNsaWRlSGFzaCA9IHNsaWRlLmF0dHIoJ2RhdGEtaGFzaCcpIHx8IHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpO1xuICAgICAgICBpZiAoc2xpZGVIYXNoID09PSBoYXNoICYmICFzbGlkZS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgdmFyIGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0LCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi53YXRjaFN0YXRlKSB7XG4gICAgICAkJDEod2luKS5vbignaGFzaGNoYW5nZScsIHN3aXBlci5oYXNoTmF2aWdhdGlvbi5vbkhhc2hDYW5nZSk7XG4gICAgfVxuICB9LFxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLndhdGNoU3RhdGUpIHtcbiAgICAgICQkMSh3aW4pLm9mZignaGFzaGNoYW5nZScsIHN3aXBlci5oYXNoTmF2aWdhdGlvbi5vbkhhc2hDYW5nZSk7XG4gICAgfVxuICB9LFxufTtcbnZhciBIYXNoTmF2aWdhdGlvbiQxID0ge1xuICBuYW1lOiAnaGFzaC1uYXZpZ2F0aW9uJyxcbiAgcGFyYW1zOiB7XG4gICAgaGFzaE5hdmlnYXRpb246IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgcmVwbGFjZVN0YXRlOiBmYWxzZSxcbiAgICAgIHdhdGNoU3RhdGU6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGhhc2hOYXZpZ2F0aW9uOiB7XG4gICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgaW5pdDogSGFzaE5hdmlnYXRpb24uaW5pdC5iaW5kKHN3aXBlciksXG4gICAgICAgIGRlc3Ryb3k6IEhhc2hOYXZpZ2F0aW9uLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxuICAgICAgICBzZXRIYXNoOiBIYXNoTmF2aWdhdGlvbi5zZXRIYXNoLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgb25IYXNoQ2FuZ2U6IEhhc2hOYXZpZ2F0aW9uLm9uSGFzaENhbmdlLmJpbmQoc3dpcGVyKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG4gIG9uOiB7XG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uaW5pdCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24uZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5oYXNoTmF2aWdhdGlvbi5pbml0aWFsaXplZCkge1xuICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uc2V0SGFzaCgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59O1xuXG52YXIgQXV0b3BsYXkgPSB7XG4gIHJ1bjogZnVuY3Rpb24gcnVuKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciAkYWN0aXZlU2xpZGVFbCA9IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICB2YXIgZGVsYXkgPSBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuICAgIGlmICgkYWN0aXZlU2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1hdXRvcGxheScpKSB7XG4gICAgICBkZWxheSA9ICRhY3RpdmVTbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLWF1dG9wbGF5JykgfHwgc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kZWxheTtcbiAgICB9XG4gICAgc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQgPSBVdGlscy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgIHN3aXBlci5zbGlkZU5leHQoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgfSBlbHNlIGlmICghc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZU5leHQoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oMCwgc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgIH1cbiAgICB9LCBkZWxheSk7XG4gIH0sXG4gIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHN3aXBlci5hdXRvcGxheS50aW1lb3V0ICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgPSB0cnVlO1xuICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheVN0YXJ0Jyk7XG4gICAgc3dpcGVyLmF1dG9wbGF5LnJ1bigpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiBzd2lwZXIuYXV0b3BsYXkudGltZW91dCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dChzd2lwZXIuYXV0b3BsYXkudGltZW91dCk7XG4gICAgICBzd2lwZXIuYXV0b3BsYXkudGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgPSBmYWxzZTtcbiAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXlTdG9wJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHBhdXNlOiBmdW5jdGlvbiBwYXVzZShzcGVlZCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHsgcmV0dXJuOyB9XG4gICAgaWYgKHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKHN3aXBlci5hdXRvcGxheS50aW1lb3V0KSB7IGNsZWFyVGltZW91dChzd2lwZXIuYXV0b3BsYXkudGltZW91dCk7IH1cbiAgICBzd2lwZXIuYXV0b3BsYXkucGF1c2VkID0gdHJ1ZTtcbiAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgIHN3aXBlci5hdXRvcGxheS5ydW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnJ1bigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG59O1xuXG52YXIgQXV0b3BsYXkkMSA9IHtcbiAgbmFtZTogJ2F1dG9wbGF5JyxcbiAgcGFyYW1zOiB7XG4gICAgYXV0b3BsYXk6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgZGVsYXk6IDMwMDAsXG4gICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogdHJ1ZSxcbiAgICAgIHN0b3BPbkxhc3RTbGlkZTogZmFsc2UsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgYXV0b3BsYXk6IHtcbiAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgIHBhdXNlZDogZmFsc2UsXG4gICAgICAgIHJ1bjogQXV0b3BsYXkucnVuLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc3RhcnQ6IEF1dG9wbGF5LnN0YXJ0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc3RvcDogQXV0b3BsYXkuc3RvcC5iaW5kKHN3aXBlciksXG4gICAgICAgIHBhdXNlOiBBdXRvcGxheS5wYXVzZS5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBiZWZvcmVUcmFuc2l0aW9uU3RhcnQ6IGZ1bmN0aW9uIGJlZm9yZVRyYW5zaXRpb25TdGFydChzcGVlZCwgaW50ZXJuYWwpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgIGlmIChpbnRlcm5hbCB8fCAhc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZShzcGVlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc2xpZGVyRmlyc3RNb3ZlOiBmdW5jdGlvbiBzbGlkZXJGaXJzdE1vdmUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICBzd2lwZXIuYXV0b3BsYXkuc3RvcCgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59O1xuXG52YXIgRmFkZSA9IHtcbiAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciAkc2xpZGVFbCA9IHN3aXBlci5zbGlkZXMuZXEoaSk7XG4gICAgICB2YXIgb2Zmc2V0ID0gJHNsaWRlRWxbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICB2YXIgdHggPSAtb2Zmc2V0O1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHsgdHggLT0gc3dpcGVyLnRyYW5zbGF0ZTsgfVxuICAgICAgdmFyIHR5ID0gMDtcbiAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIHR5ID0gdHg7XG4gICAgICAgIHR4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciBzbGlkZU9wYWNpdHkgPSBzd2lwZXIucGFyYW1zLmZhZGVFZmZlY3QuY3Jvc3NGYWRlID9cbiAgICAgICAgTWF0aC5tYXgoMSAtIE1hdGguYWJzKCRzbGlkZUVsWzBdLnByb2dyZXNzKSwgMCkgOlxuICAgICAgICAxICsgTWF0aC5taW4oTWF0aC5tYXgoJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIC0xKSwgMCk7XG4gICAgICAkc2xpZGVFbFxuICAgICAgICAuY3NzKHtcbiAgICAgICAgICBvcGFjaXR5OiBzbGlkZU9wYWNpdHksXG4gICAgICAgIH0pXG4gICAgICAgIC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyB0eCArIFwicHgsIFwiICsgdHkgKyBcInB4LCAwcHgpXCIpKTtcbiAgICB9XG4gIH0sXG4gIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgIHNsaWRlcy50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlICYmIGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICB2YXIgZXZlbnRUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgIHNsaWRlcy50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGV2ZW50VHJpZ2dlcmVkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxuICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCddO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyaWdnZXJFdmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAkd3JhcHBlckVsLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG5cbnZhciBFZmZlY3RGYWRlID0ge1xuICBuYW1lOiAnZWZmZWN0LWZhZGUnLFxuICBwYXJhbXM6IHtcbiAgICBmYWRlRWZmZWN0OiB7XG4gICAgICBjcm9zc0ZhZGU6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGZhZGVFZmZlY3Q6IHtcbiAgICAgICAgc2V0VHJhbnNsYXRlOiBGYWRlLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNldFRyYW5zaXRpb246IEZhZGUuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2ZhZGUnKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcImZhZGVcIikpO1xuICAgICAgdmFyIG92ZXJ3cml0ZVBhcmFtcyA9IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdmYWRlJykgeyByZXR1cm47IH1cbiAgICAgIHN3aXBlci5mYWRlRWZmZWN0LnNldFRyYW5zbGF0ZSgpO1xuICAgIH0sXG4gICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdmYWRlJykgeyByZXR1cm47IH1cbiAgICAgIHN3aXBlci5mYWRlRWZmZWN0LnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH0sXG4gIH0sXG59O1xuXG52YXIgQ3ViZSA9IHtcbiAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgICB2YXIgc3dpcGVyV2lkdGggPSBzd2lwZXIud2lkdGg7XG4gICAgdmFyIHN3aXBlckhlaWdodCA9IHN3aXBlci5oZWlnaHQ7XG4gICAgdmFyIHJ0bCA9IHN3aXBlci5ydGw7XG4gICAgdmFyIHN3aXBlclNpemUgPSBzd2lwZXIuc2l6ZTtcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5jdWJlRWZmZWN0O1xuICAgIHZhciBpc0hvcml6b250YWwgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG4gICAgdmFyIGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgIHZhciB3cmFwcGVyUm90YXRlID0gMDtcbiAgICB2YXIgJGN1YmVTaGFkb3dFbDtcbiAgICBpZiAocGFyYW1zLnNoYWRvdykge1xuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAkY3ViZVNoYWRvd0VsID0gJHdyYXBwZXJFbC5maW5kKCcuc3dpcGVyLWN1YmUtc2hhZG93Jyk7XG4gICAgICAgIGlmICgkY3ViZVNoYWRvd0VsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICRjdWJlU2hhZG93RWwgPSAkJDEoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcbiAgICAgICAgICAkd3JhcHBlckVsLmFwcGVuZCgkY3ViZVNoYWRvd0VsKTtcbiAgICAgICAgfVxuICAgICAgICAkY3ViZVNoYWRvd0VsLmNzcyh7IGhlaWdodDogKHN3aXBlcldpZHRoICsgXCJweFwiKSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRjdWJlU2hhZG93RWwgPSAkZWwuZmluZCgnLnN3aXBlci1jdWJlLXNoYWRvdycpO1xuICAgICAgICBpZiAoJGN1YmVTaGFkb3dFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkY3ViZVNoYWRvd0VsID0gJCQxKCc8ZGl2IGNsYXNzPVwic3dpcGVyLWN1YmUtc2hhZG93XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgJGVsLmFwcGVuZCgkY3ViZVNoYWRvd0VsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgdmFyIHNsaWRlSW5kZXggPSBpO1xuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICBzbGlkZUluZGV4ID0gcGFyc2VJbnQoJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgICAgfVxuICAgICAgdmFyIHNsaWRlQW5nbGUgPSBzbGlkZUluZGV4ICogOTA7XG4gICAgICB2YXIgcm91bmQgPSBNYXRoLmZsb29yKHNsaWRlQW5nbGUgLyAzNjApO1xuICAgICAgaWYgKHJ0bCkge1xuICAgICAgICBzbGlkZUFuZ2xlID0gLXNsaWRlQW5nbGU7XG4gICAgICAgIHJvdW5kID0gTWF0aC5mbG9vcigtc2xpZGVBbmdsZSAvIDM2MCk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigkc2xpZGVFbFswXS5wcm9ncmVzcywgMSksIC0xKTtcbiAgICAgIHZhciB0eCA9IDA7XG4gICAgICB2YXIgdHkgPSAwO1xuICAgICAgdmFyIHR6ID0gMDtcbiAgICAgIGlmIChzbGlkZUluZGV4ICUgNCA9PT0gMCkge1xuICAgICAgICB0eCA9IC1yb3VuZCAqIDQgKiBzd2lwZXJTaXplO1xuICAgICAgICB0eiA9IDA7XG4gICAgICB9IGVsc2UgaWYgKChzbGlkZUluZGV4IC0gMSkgJSA0ID09PSAwKSB7XG4gICAgICAgIHR4ID0gMDtcbiAgICAgICAgdHogPSAtcm91bmQgKiA0ICogc3dpcGVyU2l6ZTtcbiAgICAgIH0gZWxzZSBpZiAoKHNsaWRlSW5kZXggLSAyKSAlIDQgPT09IDApIHtcbiAgICAgICAgdHggPSBzd2lwZXJTaXplICsgKHJvdW5kICogNCAqIHN3aXBlclNpemUpO1xuICAgICAgICB0eiA9IHN3aXBlclNpemU7XG4gICAgICB9IGVsc2UgaWYgKChzbGlkZUluZGV4IC0gMykgJSA0ID09PSAwKSB7XG4gICAgICAgIHR4ID0gLXN3aXBlclNpemU7XG4gICAgICAgIHR6ID0gKDMgKiBzd2lwZXJTaXplKSArIChzd2lwZXJTaXplICogNCAqIHJvdW5kKTtcbiAgICAgIH1cbiAgICAgIGlmIChydGwpIHtcbiAgICAgICAgdHggPSAtdHg7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNIb3Jpem9udGFsKSB7XG4gICAgICAgIHR5ID0gdHg7XG4gICAgICAgIHR4ID0gMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHRyYW5zZm9ybSA9IFwicm90YXRlWChcIiArIChpc0hvcml6b250YWwgPyAwIDogLXNsaWRlQW5nbGUpICsgXCJkZWcpIHJvdGF0ZVkoXCIgKyAoaXNIb3Jpem9udGFsID8gc2xpZGVBbmdsZSA6IDApICsgXCJkZWcpIHRyYW5zbGF0ZTNkKFwiICsgdHggKyBcInB4LCBcIiArIHR5ICsgXCJweCwgXCIgKyB0eiArIFwicHgpXCI7XG4gICAgICBpZiAocHJvZ3Jlc3MgPD0gMSAmJiBwcm9ncmVzcyA+IC0xKSB7XG4gICAgICAgIHdyYXBwZXJSb3RhdGUgPSAoc2xpZGVJbmRleCAqIDkwKSArIChwcm9ncmVzcyAqIDkwKTtcbiAgICAgICAgaWYgKHJ0bCkgeyB3cmFwcGVyUm90YXRlID0gKC1zbGlkZUluZGV4ICogOTApIC0gKHByb2dyZXNzICogOTApOyB9XG4gICAgICB9XG4gICAgICAkc2xpZGVFbC50cmFuc2Zvcm0odHJhbnNmb3JtKTtcbiAgICAgIGlmIChwYXJhbXMuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgIC8vIFNldCBzaGFkb3dzXG4gICAgICAgIHZhciBzaGFkb3dCZWZvcmUgPSBpc0hvcml6b250YWwgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AnKTtcbiAgICAgICAgdmFyIHNoYWRvd0FmdGVyID0gaXNIb3Jpem9udGFsID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNoYWRvd0JlZm9yZSA9ICQkMSgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKGlzSG9yaXpvbnRhbCA/ICdsZWZ0JyA6ICd0b3AnKSArIFwiXFxcIj48L2Rpdj5cIikpO1xuICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzaGFkb3dBZnRlciA9ICQkMSgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKGlzSG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJykgKyBcIlxcXCI+PC9kaXY+XCIpKTtcbiAgICAgICAgICAkc2xpZGVFbC5hcHBlbmQoc2hhZG93QWZ0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoKSB7IHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgoLXByb2dyZXNzLCAwKTsgfVxuICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSB7IHNoYWRvd0FmdGVyWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heChwcm9ncmVzcywgMCk7IH1cbiAgICAgIH1cbiAgICB9XG4gICAgJHdyYXBwZXJFbC5jc3Moe1xuICAgICAgJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbic6IChcIjUwJSA1MCUgLVwiICsgKHN3aXBlclNpemUgLyAyKSArIFwicHhcIiksXG4gICAgICAnLW1vei10cmFuc2Zvcm0tb3JpZ2luJzogKFwiNTAlIDUwJSAtXCIgKyAoc3dpcGVyU2l6ZSAvIDIpICsgXCJweFwiKSxcbiAgICAgICctbXMtdHJhbnNmb3JtLW9yaWdpbic6IChcIjUwJSA1MCUgLVwiICsgKHN3aXBlclNpemUgLyAyKSArIFwicHhcIiksXG4gICAgICAndHJhbnNmb3JtLW9yaWdpbic6IChcIjUwJSA1MCUgLVwiICsgKHN3aXBlclNpemUgLyAyKSArIFwicHhcIiksXG4gICAgfSk7XG5cbiAgICBpZiAocGFyYW1zLnNoYWRvdykge1xuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAkY3ViZVNoYWRvd0VsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZCgwcHgsIFwiICsgKChzd2lwZXJXaWR0aCAvIDIpICsgcGFyYW1zLnNoYWRvd09mZnNldCkgKyBcInB4LCBcIiArICgtc3dpcGVyV2lkdGggLyAyKSArIFwicHgpIHJvdGF0ZVgoOTBkZWcpIHJvdGF0ZVooMGRlZykgc2NhbGUoXCIgKyAocGFyYW1zLnNoYWRvd1NjYWxlKSArIFwiKVwiKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2hhZG93QW5nbGUgPSBNYXRoLmFicyh3cmFwcGVyUm90YXRlKSAtIChNYXRoLmZsb29yKE1hdGguYWJzKHdyYXBwZXJSb3RhdGUpIC8gOTApICogOTApO1xuICAgICAgICB2YXIgbXVsdGlwbGllciA9IDEuNSAtIChcbiAgICAgICAgICAoTWF0aC5zaW4oKHNoYWRvd0FuZ2xlICogMiAqIE1hdGguUEkpIC8gMzYwKSAvIDIpICtcbiAgICAgICAgICAoTWF0aC5jb3MoKHNoYWRvd0FuZ2xlICogMiAqIE1hdGguUEkpIC8gMzYwKSAvIDIpXG4gICAgICAgICk7XG4gICAgICAgIHZhciBzY2FsZTEgPSBwYXJhbXMuc2hhZG93U2NhbGU7XG4gICAgICAgIHZhciBzY2FsZTIgPSBwYXJhbXMuc2hhZG93U2NhbGUgLyBtdWx0aXBsaWVyO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyYW1zLnNoYWRvd09mZnNldDtcbiAgICAgICAgJGN1YmVTaGFkb3dFbC50cmFuc2Zvcm0oKFwic2NhbGUzZChcIiArIHNjYWxlMSArIFwiLCAxLCBcIiArIHNjYWxlMiArIFwiKSB0cmFuc2xhdGUzZCgwcHgsIFwiICsgKChzd2lwZXJIZWlnaHQgLyAyKSArIG9mZnNldCkgKyBcInB4LCBcIiArICgtc3dpcGVySGVpZ2h0IC8gMiAvIHNjYWxlMikgKyBcInB4KSByb3RhdGVYKC05MGRlZylcIikpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgekZhY3RvciA9IChCcm93c2VyLmlzU2FmYXJpIHx8IEJyb3dzZXIuaXNVaVdlYlZpZXcpID8gKC1zd2lwZXJTaXplIC8gMikgOiAwO1xuICAgICR3cmFwcGVyRWxcbiAgICAgIC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMHB4LDAsXCIgKyB6RmFjdG9yICsgXCJweCkgcm90YXRlWChcIiArIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAwIDogd3JhcHBlclJvdGF0ZSkgKyBcImRlZykgcm90YXRlWShcIiArIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAtd3JhcHBlclJvdGF0ZSA6IDApICsgXCJkZWcpXCIpKTtcbiAgfSxcbiAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciAkZWwgPSBzd2lwZXIuJGVsO1xuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgIHNsaWRlc1xuICAgICAgLnRyYW5zaXRpb24oZHVyYXRpb24pXG4gICAgICAuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JylcbiAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jdWJlRWZmZWN0LnNoYWRvdyAmJiAhc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAkZWwuZmluZCgnLnN3aXBlci1jdWJlLXNoYWRvdycpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH1cbiAgfSxcbn07XG5cbnZhciBFZmZlY3RDdWJlID0ge1xuICBuYW1lOiAnZWZmZWN0LWN1YmUnLFxuICBwYXJhbXM6IHtcbiAgICBjdWJlRWZmZWN0OiB7XG4gICAgICBzbGlkZVNoYWRvd3M6IHRydWUsXG4gICAgICBzaGFkb3c6IHRydWUsXG4gICAgICBzaGFkb3dPZmZzZXQ6IDIwLFxuICAgICAgc2hhZG93U2NhbGU6IDAuOTQsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgY3ViZUVmZmVjdDoge1xuICAgICAgICBzZXRUcmFuc2xhdGU6IEN1YmUuc2V0VHJhbnNsYXRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgc2V0VHJhbnNpdGlvbjogQ3ViZS5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG4gIG9uOiB7XG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gYmVmb3JlSW5pdCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY3ViZScpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiY3ViZVwiKSk7XG4gICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiM2RcIikpO1xuICAgICAgdmFyIG92ZXJ3cml0ZVBhcmFtcyA9IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgcmVzaXN0YW5jZVJhdGlvOiAwLFxuICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgICAgdmlydHVhbFRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLnBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIub3JpZ2luYWxQYXJhbXMsIG92ZXJ3cml0ZVBhcmFtcyk7XG4gICAgfSxcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY3ViZScpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuY3ViZUVmZmVjdC5zZXRUcmFuc2xhdGUoKTtcbiAgICB9LFxuICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY3ViZScpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuY3ViZUVmZmVjdC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICB9LFxuICB9LFxufTtcblxudmFyIEZsaXAgPSB7XG4gIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgJHNsaWRlRWwgPSBzbGlkZXMuZXEoaSk7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkc2xpZGVFbFswXS5wcm9ncmVzcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZsaXBFZmZlY3QubGltaXRSb3RhdGlvbikge1xuICAgICAgICBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKCRzbGlkZUVsWzBdLnByb2dyZXNzLCAxKSwgLTEpO1xuICAgICAgfVxuICAgICAgdmFyIG9mZnNldCA9ICRzbGlkZUVsWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgdmFyIHJvdGF0ZSA9IC0xODAgKiBwcm9ncmVzcztcbiAgICAgIHZhciByb3RhdGVZID0gcm90YXRlO1xuICAgICAgdmFyIHJvdGF0ZVggPSAwO1xuICAgICAgdmFyIHR4ID0gLW9mZnNldDtcbiAgICAgIHZhciB0eSA9IDA7XG4gICAgICBpZiAoIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICB0eSA9IHR4O1xuICAgICAgICB0eCA9IDA7XG4gICAgICAgIHJvdGF0ZVggPSAtcm90YXRlWTtcbiAgICAgICAgcm90YXRlWSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHN3aXBlci5ydGwpIHtcbiAgICAgICAgcm90YXRlWSA9IC1yb3RhdGVZO1xuICAgICAgfVxuXG4gICAgICAkc2xpZGVFbFswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChwcm9ncmVzcykpICsgc2xpZGVzLmxlbmd0aDtcblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZmxpcEVmZmVjdC5zbGlkZVNoYWRvd3MpIHtcbiAgICAgICAgLy8gU2V0IHNoYWRvd3NcbiAgICAgICAgdmFyIHNoYWRvd0JlZm9yZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xuICAgICAgICB2YXIgc2hhZG93QWZ0ZXIgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tJyk7XG4gICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc2hhZG93QmVmb3JlID0gJCQxKChcIjxkaXYgY2xhc3M9XFxcInN3aXBlci1zbGlkZS1zaGFkb3ctXCIgKyAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCcpICsgXCJcXFwiPjwvZGl2PlwiKSk7XG4gICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKHNoYWRvd0JlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCQxKChcIjxkaXYgY2xhc3M9XFxcInN3aXBlci1zbGlkZS1zaGFkb3ctXCIgKyAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3JpZ2h0JyA6ICdib3R0b20nKSArIFwiXFxcIj48L2Rpdj5cIikpO1xuICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dBZnRlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHsgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heCgtcHJvZ3Jlc3MsIDApOyB9XG4gICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGgpIHsgc2hhZG93QWZ0ZXJbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KHByb2dyZXNzLCAwKTsgfVxuICAgICAgfVxuICAgICAgJHNsaWRlRWxcbiAgICAgICAgLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZChcIiArIHR4ICsgXCJweCwgXCIgKyB0eSArIFwicHgsIDBweCkgcm90YXRlWChcIiArIHJvdGF0ZVggKyBcImRlZykgcm90YXRlWShcIiArIHJvdGF0ZVkgKyBcImRlZylcIikpO1xuICAgIH1cbiAgfSxcbiAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgIHNsaWRlc1xuICAgICAgLnRyYW5zaXRpb24oZHVyYXRpb24pXG4gICAgICAuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JylcbiAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlICYmIGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICB2YXIgZXZlbnRUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgc2xpZGVzLmVxKGFjdGl2ZUluZGV4KS50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgaWYgKGV2ZW50VHJpZ2dlcmVkKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxuICAgICAgICAvLyBpZiAoISQodGhpcykuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSkgcmV0dXJuO1xuICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCddO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyaWdnZXJFdmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAkd3JhcHBlckVsLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG5cbnZhciBFZmZlY3RGbGlwID0ge1xuICBuYW1lOiAnZWZmZWN0LWZsaXAnLFxuICBwYXJhbXM6IHtcbiAgICBmbGlwRWZmZWN0OiB7XG4gICAgICBzbGlkZVNoYWRvd3M6IHRydWUsXG4gICAgICBsaW1pdFJvdGF0aW9uOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgIGZsaXBFZmZlY3Q6IHtcbiAgICAgICAgc2V0VHJhbnNsYXRlOiBGbGlwLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNldFRyYW5zaXRpb246IEZsaXAuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICBvbjoge1xuICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2ZsaXAnKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcImZsaXBcIikpO1xuICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcIjNkXCIpKTtcbiAgICAgIHZhciBvdmVyd3JpdGVQYXJhbXMgPSB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgIHNsaWRlc1BlckNvbHVtbjogMSxcbiAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgdmlydHVhbFRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLnBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIub3JpZ2luYWxQYXJhbXMsIG92ZXJ3cml0ZVBhcmFtcyk7XG4gICAgfSxcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmxpcCcpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuZmxpcEVmZmVjdC5zZXRUcmFuc2xhdGUoKTtcbiAgICB9LFxuICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmxpcCcpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuZmxpcEVmZmVjdC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICB9LFxuICB9LFxufTtcblxudmFyIENvdmVyZmxvdyA9IHtcbiAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHN3aXBlcldpZHRoID0gc3dpcGVyLndpZHRoO1xuICAgIHZhciBzd2lwZXJIZWlnaHQgPSBzd2lwZXIuaGVpZ2h0O1xuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgdmFyIHNsaWRlc1NpemVzR3JpZCA9IHN3aXBlci5zbGlkZXNTaXplc0dyaWQ7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuY292ZXJmbG93RWZmZWN0O1xuICAgIHZhciBpc0hvcml6b250YWwgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG4gICAgdmFyIHRyYW5zZm9ybSA9IHN3aXBlci50cmFuc2xhdGU7XG4gICAgdmFyIGNlbnRlciA9IGlzSG9yaXpvbnRhbCA/IC10cmFuc2Zvcm0gKyAoc3dpcGVyV2lkdGggLyAyKSA6IC10cmFuc2Zvcm0gKyAoc3dpcGVySGVpZ2h0IC8gMik7XG4gICAgdmFyIHJvdGF0ZSA9IGlzSG9yaXpvbnRhbCA/IHBhcmFtcy5yb3RhdGUgOiAtcGFyYW1zLnJvdGF0ZTtcbiAgICB2YXIgdHJhbnNsYXRlID0gcGFyYW1zLmRlcHRoO1xuICAgIC8vIEVhY2ggc2xpZGUgb2Zmc2V0IGZyb20gY2VudGVyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgdmFyIHNsaWRlU2l6ZSA9IHNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICAgIHZhciBzbGlkZU9mZnNldCA9ICRzbGlkZUVsWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgdmFyIG9mZnNldE11bHRpcGxpZXIgPSAoKGNlbnRlciAtIHNsaWRlT2Zmc2V0IC0gKHNsaWRlU2l6ZSAvIDIpKSAvIHNsaWRlU2l6ZSkgKiBwYXJhbXMubW9kaWZpZXI7XG5cbiAgICAgIHZhciByb3RhdGVZID0gaXNIb3Jpem9udGFsID8gcm90YXRlICogb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICB2YXIgcm90YXRlWCA9IGlzSG9yaXpvbnRhbCA/IDAgOiByb3RhdGUgKiBvZmZzZXRNdWx0aXBsaWVyO1xuICAgICAgLy8gdmFyIHJvdGF0ZVogPSAwXG4gICAgICB2YXIgdHJhbnNsYXRlWiA9IC10cmFuc2xhdGUgKiBNYXRoLmFicyhvZmZzZXRNdWx0aXBsaWVyKTtcblxuICAgICAgdmFyIHRyYW5zbGF0ZVkgPSBpc0hvcml6b250YWwgPyAwIDogcGFyYW1zLnN0cmV0Y2ggKiAob2Zmc2V0TXVsdGlwbGllcik7XG4gICAgICB2YXIgdHJhbnNsYXRlWCA9IGlzSG9yaXpvbnRhbCA/IHBhcmFtcy5zdHJldGNoICogKG9mZnNldE11bHRpcGxpZXIpIDogMDtcblxuICAgICAgLy8gRml4IGZvciB1bHRyYSBzbWFsbCB2YWx1ZXNcbiAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVYKSA8IDAuMDAxKSB7IHRyYW5zbGF0ZVggPSAwOyB9XG4gICAgICBpZiAoTWF0aC5hYnModHJhbnNsYXRlWSkgPCAwLjAwMSkgeyB0cmFuc2xhdGVZID0gMDsgfVxuICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVopIDwgMC4wMDEpIHsgdHJhbnNsYXRlWiA9IDA7IH1cbiAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVZKSA8IDAuMDAxKSB7IHJvdGF0ZVkgPSAwOyB9XG4gICAgICBpZiAoTWF0aC5hYnMocm90YXRlWCkgPCAwLjAwMSkgeyByb3RhdGVYID0gMDsgfVxuXG4gICAgICB2YXIgc2xpZGVUcmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKFwiICsgdHJhbnNsYXRlWCArIFwicHgsXCIgKyB0cmFuc2xhdGVZICsgXCJweCxcIiArIHRyYW5zbGF0ZVogKyBcInB4KSAgcm90YXRlWChcIiArIHJvdGF0ZVggKyBcImRlZykgcm90YXRlWShcIiArIHJvdGF0ZVkgKyBcImRlZylcIjtcblxuICAgICAgJHNsaWRlRWwudHJhbnNmb3JtKHNsaWRlVHJhbnNmb3JtKTtcbiAgICAgICRzbGlkZUVsWzBdLnN0eWxlLnpJbmRleCA9IC1NYXRoLmFicyhNYXRoLnJvdW5kKG9mZnNldE11bHRpcGxpZXIpKSArIDE7XG4gICAgICBpZiAocGFyYW1zLnNsaWRlU2hhZG93cykge1xuICAgICAgICAvLyBTZXQgc2hhZG93c1xuICAgICAgICB2YXIgJHNoYWRvd0JlZm9yZUVsID0gaXNIb3Jpem9udGFsID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgIHZhciAkc2hhZG93QWZ0ZXJFbCA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgaWYgKCRzaGFkb3dCZWZvcmVFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkc2hhZG93QmVmb3JlRWwgPSAkJDEoKFwiPGRpdiBjbGFzcz1cXFwic3dpcGVyLXNsaWRlLXNoYWRvdy1cIiArIChpc0hvcml6b250YWwgPyAnbGVmdCcgOiAndG9wJykgKyBcIlxcXCI+PC9kaXY+XCIpKTtcbiAgICAgICAgICAkc2xpZGVFbC5hcHBlbmQoJHNoYWRvd0JlZm9yZUVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJHNoYWRvd0FmdGVyRWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJHNoYWRvd0FmdGVyRWwgPSAkJDEoKFwiPGRpdiBjbGFzcz1cXFwic3dpcGVyLXNsaWRlLXNoYWRvdy1cIiArIChpc0hvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbScpICsgXCJcXFwiPjwvZGl2PlwiKSk7XG4gICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKCRzaGFkb3dBZnRlckVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJHNoYWRvd0JlZm9yZUVsLmxlbmd0aCkgeyAkc2hhZG93QmVmb3JlRWxbMF0uc3R5bGUub3BhY2l0eSA9IG9mZnNldE11bHRpcGxpZXIgPiAwID8gb2Zmc2V0TXVsdGlwbGllciA6IDA7IH1cbiAgICAgICAgaWYgKCRzaGFkb3dBZnRlckVsLmxlbmd0aCkgeyAkc2hhZG93QWZ0ZXJFbFswXS5zdHlsZS5vcGFjaXR5ID0gKC1vZmZzZXRNdWx0aXBsaWVyKSA+IDAgPyAtb2Zmc2V0TXVsdGlwbGllciA6IDA7IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29ycmVjdCBwZXJzcGVjdGl2ZSBmb3IgSUUxMFxuICAgIGlmIChCcm93c2VyLmllKSB7XG4gICAgICB2YXIgd3MgPSAkd3JhcHBlckVsWzBdLnN0eWxlO1xuICAgICAgd3MucGVyc3BlY3RpdmVPcmlnaW4gPSBjZW50ZXIgKyBcInB4IDUwJVwiO1xuICAgIH1cbiAgfSxcbiAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHN3aXBlci5zbGlkZXNcbiAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKVxuICAgICAgLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpXG4gICAgICAudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gIH0sXG59O1xuXG52YXIgRWZmZWN0Q292ZXJmbG93ID0ge1xuICBuYW1lOiAnZWZmZWN0LWNvdmVyZmxvdycsXG4gIHBhcmFtczoge1xuICAgIGNvdmVyZmxvd0VmZmVjdDoge1xuICAgICAgcm90YXRlOiA1MCxcbiAgICAgIHN0cmV0Y2g6IDAsXG4gICAgICBkZXB0aDogMTAwLFxuICAgICAgbW9kaWZpZXI6IDEsXG4gICAgICBzbGlkZVNoYWRvd3M6IHRydWUsXG4gICAgfSxcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgY292ZXJmbG93RWZmZWN0OiB7XG4gICAgICAgIHNldFRyYW5zbGF0ZTogQ292ZXJmbG93LnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgIHNldFRyYW5zaXRpb246IENvdmVyZmxvdy5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sXG4gIG9uOiB7XG4gICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gYmVmb3JlSW5pdCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY292ZXJmbG93JykgeyByZXR1cm47IH1cblxuICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcImNvdmVyZmxvd1wiKSk7XG4gICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiM2RcIikpO1xuXG4gICAgICBzd2lwZXIucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgIH0sXG4gICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2NvdmVyZmxvdycpIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuY292ZXJmbG93RWZmZWN0LnNldFRyYW5zbGF0ZSgpO1xuICAgIH0sXG4gICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdjb3ZlcmZsb3cnKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLmNvdmVyZmxvd0VmZmVjdC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICB9LFxuICB9LFxufTtcblxuLy8gU3dpcGVyIENsYXNzXG4vLyBDb3JlIE1vZHVsZXNcblN3aXBlciQxLmNvbXBvbmVudHMgPSBbXG4gIERldmljZSQyLFxuICBTdXBwb3J0JDIsXG4gIEJyb3dzZXIkMixcbiAgUmVzaXplLFxuICBPYnNlcnZlciQxLFxuICBWaXJ0dWFsJDEsXG4gIEtleWJvYXJkJDEsXG4gIE1vdXNld2hlZWwkMSxcbiAgTmF2aWdhdGlvbiQxLFxuICBQYWdpbmF0aW9uJDEsXG4gIFNjcm9sbGJhciQxLFxuICBQYXJhbGxheCQxLFxuICBab29tJDEsXG4gIExhenkkMSxcbiAgQ29udHJvbGxlciQxLFxuICBBMTF5LFxuICBIaXN0b3J5JDEsXG4gIEhhc2hOYXZpZ2F0aW9uJDEsXG4gIEF1dG9wbGF5JDEsXG4gIEVmZmVjdEZhZGUsXG4gIEVmZmVjdEN1YmUsXG4gIEVmZmVjdEZsaXAsXG4gIEVmZmVjdENvdmVyZmxvd1xuXTtcblxucmV0dXJuIFN3aXBlciQxO1xuXG59KSkpOyJdLCJmaWxlIjoic3dpcGVyLmpzIn0=
