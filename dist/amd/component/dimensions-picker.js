define(['exports', 'aurelia-framework', '../dimensions', '../config'], function (exports, _aureliaFramework, _dimensions, _config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DimensionsPicker = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  var DimensionsPicker = exports.DimensionsPicker = (_dec = (0, _aureliaFramework.customElement)('dimensions-picker'), _dec2 = (0, _aureliaFramework.inject)(_aureliaFramework.BindingEngine, _config.Config), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
    function DimensionsPicker(bindingEngine, config) {
      _classCallCheck(this, DimensionsPicker);

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

    DimensionsPicker.prototype.calculateSchema = function calculateSchema() {
      this.schema = schema.call(this);

      this.selectedDimensions = [{ dimension: this.selectableDimensions[0] }];
    };

    DimensionsPicker.prototype.dimensionsChanged = function dimensionsChanged() {
      var _this = this;

      this.dimensionsObservers.forEach(function (dimensionObserver) {
        dimensionObserver.dispose();
      });

      this.dimensionsObservers = this.selectedDimensions.map(function (dimension) {
        return _this.bindingEngine.propertyObserver(dimension, 'dimension').subscribe(_this.selectedDimensionsChanged.bind(_this));
      });
    };

    DimensionsPicker.prototype.selectedDimensionsChanged = function selectedDimensionsChanged() {
      this.dimensions = this.selectedDimensions.map(function (dimension) {
        return dimension.dimension;
      });
    };

    DimensionsPicker.prototype.objectChanged = function objectChanged(object) {
      this.selectableDimensions = (0, _dimensions.objectDimensions)(object);
      this.calculateSchema();
    };

    DimensionsPicker.prototype.entityChanged = function entityChanged(entity) {
      this.selectableDimensions = (0, _dimensions.entityDimensions)(entity);
      this.calculateSchema();
    };

    DimensionsPicker.prototype.maxDimensions = function maxDimensions() {
      var scales = flatten(this.config.scales.map(function (def) {
        return def.scales;
      }));

      return scales.reduce(function (max, scale) {
        return Math.max(max, scale.length);
      }, 0);
    };

    return DimensionsPicker;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'object', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'entity', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'repository', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'selectedDimensions', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'dimensions', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  })), _class2)) || _class) || _class);


  function schema() {
    var _this2 = this;

    var addAction = {
      label: 'add dimension',
      action: function action() {
        _this2.selectedDimensions = _this2.selectedDimensions.concat({
          dimension: _this2.selectableDimensions[0]
        });
      }
    };

    var removeAction = {
      label: 'remove dimension',
      action: function action() {
        _this2.selectedDimensions = _this2.selectedDimensions.slice(0, -1);
      }
    };

    return [{
      key: 'selectedDimensions',
      type: 'collection',
      schema: [{
        key: 'dimension',
        label: false,
        type: 'select',
        options: this.selectableDimensions.map(function (dimension) {
          return {
            value: dimension,
            name: dimension.label()
          };
        })
      }]
    }, {
      type: 'conditional',
      observe: 'selectedDimensions',
      schema: function schema() {
        var actions = [];

        if (_this2.selectedDimensions.length >= _this2.maxDimensions()) {
          actions.push(removeAction);
        }

        if (_this2.selectedDimensions.length < _this2.maxDimensions()) {
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
    return arrays.reduce(function (flattened, array) {
      return flattened.concat(array);
    }, []);
  }
});