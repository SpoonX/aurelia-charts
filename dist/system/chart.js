'use strict';

System.register(['./aurelia-charts'], function (_export, _context) {
  "use strict";

  var logger, Chart;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function warn(methodName) {
    logger.warn(methodName + ' method not defined for ' + this.library + '\'s type ' + this.type);
  }
  return {
    setters: [function (_aureliaCharts) {
      logger = _aureliaCharts.logger;
    }],
    execute: function () {
      _export('Chart', Chart = function () {
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
      }());

      _export('Chart', Chart);
    }
  };
});