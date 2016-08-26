'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartElement = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

var _aureliaFramework = require('aurelia-framework');

var _config = require('../config');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var ChartElement = exports.ChartElement = (_dec = (0, _aureliaFramework.customElement)('chart-element'), _dec2 = (0, _aureliaFramework.inject)(_aureliaFramework.BindingEngine, Element, _config.Config), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
  function ChartElement(bindingEngine, element, config) {
    _classCallCheck(this, ChartElement);

    _initDefineProp(this, 'type', _descriptor, this);

    _initDefineProp(this, 'library', _descriptor2, this);

    _initDefineProp(this, 'dimensions', _descriptor3, this);

    _initDefineProp(this, 'data', _descriptor4, this);

    _initDefineProp(this, 'chart', _descriptor5, this);

    _initDefineProp(this, 'instance', _descriptor6, this);

    this.bindingEngine = bindingEngine;
    this.element = element;
    this.config = config;
  }

  ChartElement.prototype.dimensionsChanged = function dimensionsChanged(dimensions) {
    if (this.instance) {
      this.instance.dimensions = this.dimensions;
      this.instance.update();
    }
  };

  ChartElement.prototype.chartChanged = function chartChanged() {
    if (typeof this.chart !== 'function') {
      return;
    }
    var Chart = this.chart;
    if (this.instance) {
      this.instance.destroy();
      delete this.instance;
    }
    this.instance = new Chart();
    this.instance.data = this.data;
    this.instance.element = this.element;
    this.instance.dimensions = this.dimensions;
    this.instance.create();
  };

  ChartElement.prototype.dataChanged = function dataChanged(data) {
    if (this.instance) {
      this.instance.data = this.data;
      this.instance.update();
    }
  };

  ChartElement.prototype.typeChanged = function typeChanged() {
    this.updateChart();
  };

  ChartElement.prototype.libraryChanged = function libraryChanged() {
    this.updateChart();
  };

  ChartElement.prototype.updateChart = function updateChart() {
    var NewChart = this.config.chart({ type: this.type, library: this.library });

    if (NewChart !== this.chart) {
      this.chart = NewChart;
    }
  };

  ChartElement.prototype.detached = function detached() {
    this.instance.destroy();
  };

  return ChartElement;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'library', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'dimensions', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'data', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'chart', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'instance', [_dec3], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class);