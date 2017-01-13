'use strict';

System.register(['array-equal', 'extend', './aurelia-charts'], function (_export, _context) {
  "use strict";

  var arrayEquals, extend, logger, _typeof, Config;

  

  return {
    setters: [function (_arrayEqual) {
      arrayEquals = _arrayEqual.default;
    }, function (_extend) {
      extend = _extend.default;
    }, function (_aureliaCharts) {
      logger = _aureliaCharts.logger;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _export('Config', Config = function () {
        function Config() {
          

          this.defaults = {
            library: undefined,
            type: 'line',
            libraries: {}
          };
          this.charts = {};
          this.scales = [];
        }

        Config.prototype.registerChart = function registerChart(library, type, target) {
          this.charts[library] = this.charts[library] || {};

          this.charts[library][type] = target;

          return this;
        };

        Config.prototype.registerScales = function registerScales(target) {
          for (var _len = arguments.length, scales = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            scales[_key - 1] = arguments[_key];
          }

          this.scales.push({
            constructor: target,
            scales: scales
          });

          return this;
        };

        Config.prototype.configure = function configure(defaults) {
          extend(true, this, defaults);

          return this;
        };

        Config.prototype.chartsByScale = function chartsByScale() {
          for (var _len2 = arguments.length, scale = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            scale[_key2] = arguments[_key2];
          }

          var result = [];

          this.scales.forEach(function (chartScales) {
            chartScales.scales.forEach(function (chartScale) {
              if (arrayEquals(scale, chartScale)) {
                result.push(chartScales.constructor);
              }
            });
          });

          return result;
        };

        Config.prototype.chart = function chart(value) {
          if (typeof value === 'undefined') {
            return this.chart(this.defaults);
          }

          if (typeof value === 'string') {
            return this.chart({
              library: undefined,
              type: value
            });
          }

          if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            var type = value.type || this.defaults.type;
            var libName = value.library || this.defaults.libraries[type] || this.defaults.library;
            var library = this.charts[libName];

            if (typeof library === 'undefined') {
              logger.warn(value.library + ' is not a registered library. Either define a default library or tell what library to use');

              return undefined;
            }

            return library[type];
          }

          return undefined;
        };

        return Config;
      }());

      _export('Config', Config);
    }
  };
});