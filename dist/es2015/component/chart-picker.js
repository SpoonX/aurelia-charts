var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

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

import { Config as ChartConfig } from '../config';
import { bindingMode, bindable, inject } from 'aurelia-framework';

export let ChartPicker = (_dec = inject(ChartConfig), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class ChartPicker {

  constructor(chartConfig) {
    _initDefineProp(this, 'dimensions', _descriptor, this);

    _initDefineProp(this, 'chart', _descriptor2, this);

    this.schema = [];
    this.charts = [];

    this.chartConfig = chartConfig;
    this.vm = this;
  }

  dimensionsChanged(dimensions) {
    const scales = dimensions.map(dimension => dimension.scale);

    this.charts = this.chartConfig.chartsByScale(...scales);
    this.schema = [{
      key: 'chart',
      type: 'select',
      options: this.charts.map(Chart => {
        return {
          value: Chart,
          name: Chart.name
        };
      })
    }];
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'dimensions', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'chart', [_dec2], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);