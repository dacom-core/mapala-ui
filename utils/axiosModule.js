import Vue from 'vue'
const assign = Object.assign || _assign;
const isArray = Array.isArray;
var {hasOwnProperty} = {}, {slice} = [], debug = false, ntick;

function _merge(target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {};
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = [];
      }
      _merge(target[key], source[key], deep);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
}

function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function merge(target) {

  var args = slice.call(arguments, 1);

  args.forEach(source => {
    _merge(target, source, true);
  });

  return target;
}

function each(obj, iterator) {

  var i, key;

  if (isArray(obj)) {
    for (i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i);
    }
  } else if (isObject(obj)) {
    for (key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        iterator.call(obj[key], obj[key], key);
      }
    }
  }

  return obj;
}

function expand(url, params, variables) {

  var tmpl = parse(url), expanded = tmpl.expand(params);

  if (variables) {
    variables.push.apply(variables, tmpl.vars);
  }

  return expanded;
}

function parse(template) {
  var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];

  return {
    vars: variables,
    expand(context) {
      return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, (_, expression, literal) => {
        if (expression) {

          var operator = null, values = [];

          if (operators.indexOf(expression.charAt(0)) !== -1) {
            operator = expression.charAt(0);
            expression = expression.substr(1);
          }

          expression.split(/,/g).forEach((variable) => {
            var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
            values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
            variables.push(tmp[1]);
          });

          if (operator && operator !== '+') {

            var separator = ',';

            if (operator === '?') {
              separator = '&';
            } else if (operator !== '#') {
              separator = operator;
            }

            return (values.length !== 0 ? operator : '') + values.join(separator);
          } else {
            return values.join(',');
          }

        } else {
          return encodeReserved(literal);
        }
      });
    }
  };
}

function getValues(context, operator, key, modifier) {

  var value = context[key], result = [];

  if (isDefined(value) && value !== '') {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      value = value.toString();

      if (modifier && modifier !== '*') {
        value = value.substring(0, parseInt(modifier, 10));
      }

      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
    } else {
      if (modifier === '*') {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach((value) => {
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
          });
        } else {
          Object.keys(value).forEach((k) => {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        var tmp = [];

        if (Array.isArray(value)) {
          value.filter(isDefined).forEach((value) => {
            tmp.push(encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach((k) => {
            if (isDefined(value[k])) {
              tmp.push(encodeURIComponent(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }

        if (isKeyOperator(operator)) {
          result.push(encodeURIComponent(key) + '=' + tmp.join(','));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(','));
        }
      }
    }
  } else {
    if (operator === ';') {
      result.push(encodeURIComponent(key));
    } else if (value === '' && (operator === '&' || operator === '?')) {
      result.push(encodeURIComponent(key) + '=');
    } else if (value === '') {
      result.push('');
    }
  }

  return result;
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
  return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

  value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);

  if (key) {
    return encodeURIComponent(key) + '=' + value;
  } else {
    return value;
  }
}

function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map((part) => {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part);
    }
    return part;
  }).join('');
}

function opts(action, args) {

  var options = assign({}, action), params = {}, body;

  switch (args.length) {

    case 2:

      params = args[0];
      body = args[1];

      break;

    case 1:

      if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
        body = args[0];
      } else {
        params = args[0];
      }

      break;

    case 0:

      break;

    default:

      throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
  }

  options.body = body;
  options.params = assign({}, options.params, params);

  return options;
}

Resource.actions = {

  get: {method: 'GET'},
  save: {method: 'POST'},
  query: {method: 'GET'},
  update: {method: 'PUT'},
  remove: {method: 'DELETE'},
  delete: {method: 'DELETE'}

};
function isFunction(val) {
  return typeof val === 'function';
}

function trimEnd(str, chars) {

  if (str && chars === undefined) {
    return str.replace(/\s+$/, '');
  }

  if (!str || !chars) {
    return str;
  }

  return str.replace(new RegExp(`[${chars}]+$`), '');
}

function query (options, next) {

  var urlParams = Object.keys(Url.options.params), query = {}, url = next(options);

  each(options.params, (value, key) => {
    if (urlParams.indexOf(key) === -1) {
      query[key] = value;
    }
  });

  query = Url.params(query);

  if (query) {
    url += (url.indexOf('?') == -1 ? '?' : '&') + query;
  }

  return url;
}

function root (options, next) {

  var url = next(options);

  if (isString(options.root) && !/^(https?:)?\//.test(url)) {
    url = trimEnd(options.root, '/') + '/' + url;
  }

  return url;
}

function template (options) {

  var variables = [], url = expand(options.url, options.params, variables);

  variables.forEach((key) => {
    delete options.params[key];
  });

  return url;
}

function isString(val) {
  return typeof val === 'string';
}

function factory(handler, next, vm) {
  return options => {
    return handler.call(vm, options, next);
  };
}



function Url (url, params) {

  var self = this || {}, options = url, transform;

  if (isString(url)) {
    options = {url, params};
  }

  options = merge({}, Url.options, self.$options, options);

  Url.transforms.forEach(handler => {

    if (isString(handler)) {
      handler = Url.transform[handler];
    }

    if (isFunction(handler)) {
      transform = factory(handler, transform, self.$vm);
    }

  });

  return transform(options);
}

Url.options = {
  url: '',
  root: null,
  params: {}
};

/**
 * Url transforms.
 */

Url.transform = {template, query, root};
Url.transforms = ['template', 'query', 'root'];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

  var params = [], escape = encodeURIComponent;

  params.add = function (key, value) {

    if (isFunction(value)) {
      value = value();
    }

    if (value === null) {
      value = '';
    }

    this.push(escape(key) + '=' + escape(value));
  };

  serialize(params, obj);

  return params.join('&').replace(/%20/g, '+');
};

function serialize(params, obj, scope) {

  var array = isArray(obj), plain = isPlainObject(obj), hash;

  each(obj, (value, key) => {

    hash = isObject(value) || isArray(value);

    if (scope) {
      key = scope + '[' + (plain || hash ? key : '') + ']';
    }

    if (!scope && array) {
      params.add(value.name, value.value);
    } else if (hash) {
      serialize(params, value, key);
    } else {
      params.add(key, value);
    }
  });
}

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

  var el = document.createElement('a');

  if (document.documentMode) {
    el.href = url;
    url = el.href;
  }

  el.href = url;

  return {
    href: el.href,
    protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
    port: el.port,
    host: el.host,
    hostname: el.hostname,
    pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
    search: el.search ? el.search.replace(/^\?/, '') : '',
    hash: el.hash ? el.hash.replace(/^#/, '') : ''
  };
};

export function Resource (url, params, actions, options) {
  var self = this || {}, resource = {};

  actions = assign({},
    Resource.actions,
    actions
  );

  each(actions, (action, name) => {
    action = merge({ url, params: assign({}, params) }, options, action)
    resource[name] = function () {
      const options = opts(action, arguments)
      const method = action.method
      const data = options.body
      const url = Url(options.url, options.params)

      // console.log(Vue.axios.defaults)
      return Vue.axios({ method, url, data })
    }
  })

  return resource
}

// const User = Resource('http://dev.mapala.net/api/users{/username}/')

// User.query({ username: 'avral', qwe: '111' }).then(res => {
//   console.log(res.data)
// }, err => {
//   console.log(err)
// })
