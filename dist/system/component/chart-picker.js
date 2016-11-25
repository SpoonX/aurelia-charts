'use strict';

System.register(['../config', 'aurelia-framework'], function (_export, _context) {
  "use strict";

  var ChartConfig, bindingMode, bindable, inject, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, ChartPicker;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_config) {
      ChartConfig = _config.Config;
    }, function (_aureliaFramework) {
      bindingMode = _aureliaFramework.bindingMode;
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('ChartPicker', ChartPicker = (_dec = inject(ChartConfig), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function ChartPicker(chartConfig) {
          

          _initDefineProp(this, 'dimensions', _descriptor, this);

          _initDefineProp(this, 'chart', _descriptor2, this);

          this.schema = [];
          this.charts = [];

          this.chartConfig = chartConfig;
          this.vm = this;
        }

        ChartPicker.prototype.dimensionsChanged = function dimensionsChanged(dimensions) {
          var _chartConfig;

          var scales = dimensions.map(function (dimension) {
            return dimension.scale;
          });

          this.charts = (_chartConfig = this.chartConfig).chartsByScale.apply(_chartConfig, scales);
          this.schema = [{
            key: 'chart',
            type: 'select',
            options: this.charts.map(function (Chart) {
              return {
                value: Chart,
                name: Chart.name
              };
            })
          }];
        };

        return ChartPicker;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'dimensions', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'chart', [_dec2], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class));

      _export('ChartPicker', ChartPicker);
    }
  };
});