define(['exports', '../config.js', 'aurelia-dependency-injection'], function (exports, _config, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.chart = chart;
  function chart(namespace, type) {
    var config = _aureliaDependencyInjection.Container.instance.get(_config.Config);

    return function (target) {
      config.registerChart(namespace, type, target);
    };
  }
});