'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chart = chart;

var _config = require('../config.js');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

function chart(namespace, type) {
  var config = _aureliaDependencyInjection.Container.instance.get(_config.Config);

  return function (target) {
    config.registerChart(namespace, type, target);
  };
}