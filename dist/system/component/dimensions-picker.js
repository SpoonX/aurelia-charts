'use strict';

System.register(['aurelia-framework', '../dimensions', '../config'], function (_export, _context) {
  "use strict";

  var BindingEngine, inject, bindingMode, bindable, customElement, objectDimensions, entityDimensions, Config, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, DimensionsPicker;

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
  return {
    setters: [function (_aureliaFramework) {
      BindingEngine = _aureliaFramework.BindingEngine;
      inject = _aureliaFramework.inject;
      bindingMode = _aureliaFramework.bindingMode;
      bindable = _aureliaFramework.bindable;
      customElement = _aureliaFramework.customElement;
    }, function (_dimensions) {
      objectDimensions = _dimensions.objectDimensions;
      entityDimensions = _dimensions.entityDimensions;
    }, function (_config) {
      Config = _config.Config;
    }],
    execute: function () {
      _export('DimensionsPicker', DimensionsPicker = (_dec = customElement('dimensions-picker'), _dec2 = inject(BindingEngine, Config), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
        function DimensionsPicker(bindingEngine, config) {
          

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
          this.selectableDimensions = objectDimensions(object);
          this.calculateSchema();
        };

        DimensionsPicker.prototype.entityChanged = function entityChanged(entity) {
          this.selectableDimensions = entityDimensions(entity);
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
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'object', [bindable], {
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
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'dimensions', [_dec3], {
        enumerable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class));

      _export('DimensionsPicker', DimensionsPicker);
    }
  };
});