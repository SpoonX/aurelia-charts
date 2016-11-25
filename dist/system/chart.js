'use strict';

System.register(['./aurelia-charts'], function (_export, _context) {
  "use strict";

  var logger, Chart;

  

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
      }());

      _export('Chart', Chart);
    }
  };
});