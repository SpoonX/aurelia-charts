'use strict';

exports.__esModule = true;
exports.quan = exports.qual = exports.logger = exports.Config = exports.scales = exports.chart = exports.Chart = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _chart = require('./chart');

Object.defineProperty(exports, 'Chart', {
  enumerable: true,
  get: function get() {
    return _chart.Chart;
  }
});

var _chart2 = require('./decorator/chart');

Object.defineProperty(exports, 'chart', {
  enumerable: true,
  get: function get() {
    return _chart2.chart;
  }
});

var _scales = require('./decorator/scales');

Object.defineProperty(exports, 'scales', {
  enumerable: true,
  get: function get() {
    return _scales.scales;
  }
});

var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});
exports.configure = configure;

var _config = require('./config');

var _aureliaLogging = require('aurelia-logging');

var logger = (0, _aureliaLogging.getLogger)('aurelia-charts');

function configure(aurelia, chartsConfig) {
  aurelia.globalResources('./component/chart-element');

  var config = aurelia.container.get(_config.Config);
  var libraries = Object.keys(config.charts);

  if ((typeof chartsConfig === 'undefined' ? 'undefined' : _typeof(chartsConfig)) === 'object') {
    config.configure(chartsConfig);
  } else if (typeof chartsConfig === 'function') {
    chartsConfig(config);
  } else if (chartsConfig) {
    logger.warn('chart configurations can be a function or an object not a ' + (typeof chartsConfig === 'undefined' ? 'undefined' : _typeof(chartsConfig)) + ' value');
  }

  if (libraries.length === 0) {
    logger.warn('no aurelia-charts plugins installed. Head to the docs and read');
  } else {
    logger.debug('installed ' + libraries.join(' and ') + ' as aurelia-charts libraries');
  }
}

var qual = 'qualitative';
var quan = 'quantitative';

exports.Config = _config.Config;
exports.logger = logger;
exports.qual = qual;
exports.quan = quan;