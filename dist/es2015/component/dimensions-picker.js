var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

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

import { BindingEngine, inject, bindingMode, bindable, customElement } from 'aurelia-framework';
import { objectDimensions, entityDimensions } from '../dimensions';
import { Config } from '../config';

export let DimensionsPicker = (_dec = customElement('dimensions-picker'), _dec2 = inject(BindingEngine, Config), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = class DimensionsPicker {

  constructor(bindingEngine, config) {
    _initDefineProp(this, 'object', _descriptor, this);

    _initDefineProp(this, 'entity', _descriptor2, this);

    _initDefineProp(this, 'repository', _descriptor3, this);

    _initDefineProp(this, 'selectedDimensions', _descriptor4, this);

    _initDefineProp(this, 'dimensions', _descriptor5, this);

    this.schema = [];
    this.selectableDimensions = [];

    this.config = config;
    this.vm = this;
    this.bindingEngine = bindingEngine;
    this.dimensionsObservers = [];
  }

  calculateSchema() {
    this.schema = schema.call(this);

    this.selectedDimensions = [{ dimension: this.selectableDimensions[0] }];
  }

  dimensionsChanged() {
    this.dimensionsObservers.forEach(dimensionObserver => {
      dimensionObserver.dispose();
    });

    this.dimensionsObservers = this.selectedDimensions.map(dimension => {
      return this.bindingEngine.propertyObserver(dimension, 'dimension').subscribe(this.selectedDimensionsChanged.bind(this));
    });
  }

  selectedDimensionsChanged() {
    this.dimensions = this.selectedDimensions.map(dimension => {
      return dimension.dimension;
    });
  }

  objectChanged(object) {
    this.selectableDimensions = objectDimensions(object);
    this.calculateSchema();
  }

  entityChanged(entity) {
    this.selectableDimensions = entityDimensions(entity);
    this.calculateSchema();
  }

  maxDimensions() {
    let scales = flatten(this.config.scales.map(def => def.scales));

    return scales.reduce((max, scale) => {
      return Math.max(max, scale.length);
    }, 0);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'object', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'entity', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'repository', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'selectedDimensions', [bindable], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'dimensions', [_dec3], {
  enumerable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class) || _class);

function schema() {
  const addAction = {
    label: 'add dimension',
    action: () => {
      this.selectedDimensions = this.selectedDimensions.concat({
        dimension: this.selectableDimensions[0]
      });
    }
  };

  const removeAction = {
    label: 'remove dimension',
    action: () => {
      this.selectedDimensions = this.selectedDimensions.slice(0, -1);
    }
  };

  return [{
    key: 'selectedDimensions',
    type: 'collection',
    schema: [{
      key: 'dimension',
      label: false,
      type: 'select',
      options: this.selectableDimensions.map(dimension => {
        return {
          value: dimension,
          name: dimension.label()
        };
      })
    }]
  }, {
    type: 'conditional',
    observe: 'selectedDimensions',
    schema: () => {
      let actions = [];

      if (this.selectedDimensions.length >= this.maxDimensions()) {
        actions.push(removeAction);
      }

      if (this.selectedDimensions.length < this.maxDimensions()) {
        actions.push(addAction);
      }

      return [{
        type: 'actions',
        actions: actions
      }];
    }
  }];
}

function flatten(arrays) {
  return arrays.reduce((flattened, array) => {
    return flattened.concat(array);
  }, []);
}