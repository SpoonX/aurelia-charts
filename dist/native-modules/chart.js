'use strict';

exports.__esModule = true;
exports.Chart = undefined;

var _aureliaCharts = require('./aurelia-charts');



var Chart = exports.Chart = function () {
  function Chart() {
    

    this.settings = {};
    this.dimensions = [];
    this.data = {};
  }

  Chart.prototype.create = function create() {
    warn('create');
  };

  Chart.prototype.update = function update(oldData, newData) {
    warn('update');
  };

  Chart.prototype.destroy = function destroy() {
    warn('destroy');
  };

  return Chart;
}();

function warn(methodName) {
  _aureliaCharts.logger.warn(methodName + ' method not defined for ' + this.library + '\'s type ' + this.type);
}