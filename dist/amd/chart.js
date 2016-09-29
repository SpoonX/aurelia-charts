define(['exports', './aurelia-charts'], function (exports, _aureliaCharts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Chart = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Chart = exports.Chart = function () {
    function Chart() {
      _classCallCheck(this, Chart);

      this.settings = {};
      this.dimensions = [];
      this.data = {};
    }

    Chart.prototype.create = function create() {
      warn('create');
    };

    Chart.prototype.update = function update() {
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
});