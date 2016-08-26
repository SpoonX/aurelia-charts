'use strict';

System.register(['./config', 'aurelia-logging', './chart', './decorator/chart', './decorator/scales', './utils'], function (_export, _context) {
  "use strict";

  var Config, getLogger, _typeof, logger, qual, quan;

  function configure(aurelia, chartsConfig) {
    aurelia.globalResources('./component/chart-element', './component/dimensions-picker', './component/chart-picker');

    var config = aurelia.container.get(Config);
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

  _export('configure', configure);

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_aureliaLogging) {
      getLogger = _aureliaLogging.getLogger;
    }, function (_chart) {
      var _exportObj = {};
      _exportObj.Chart = _chart.Chart;

      _export(_exportObj);
    }, function (_decoratorChart) {
      var _exportObj2 = {};
      _exportObj2.chart = _decoratorChart.chart;

      _export(_exportObj2);
    }, function (_decoratorScales) {
      var _exportObj3 = {};
      _exportObj3.scales = _decoratorScales.scales;

      _export(_exportObj3);
    }, function (_utils) {
      var _exportObj4 = {};

      for (var _key in _utils) {
        if (_key !== "default" && _key !== "__esModule") _exportObj4[_key] = _utils[_key];
      }

      _export(_exportObj4);
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('logger', logger = getLogger('aurelia-charts'));

      _export('qual', qual = 'qualitative');

      _export('quan', quan = 'quantitative');

      _export('Config', Config);

      _export('logger', logger);

      _export('qual', qual);

      _export('quan', quan);
    }
  };
});