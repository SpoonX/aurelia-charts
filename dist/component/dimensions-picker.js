import {BindingEngine, inject, bindingMode, bindable, customElement} from 'aurelia-framework';
import {objectDimensions, entityDimensions} from '../dimensions';
import {Config} from '../config';

@customElement('dimensions-picker')
@inject(BindingEngine, Config)
export class DimensionsPicker {

  /* either use a simple object */
  @bindable object;

  /* or a simple entity */
  @bindable entity;

  /* @todo */
  @bindable repository;

  @bindable
  selectedDimensions = [];

  /* the selected dimensions */
  @bindable({defaultBindingMode: bindingMode.twoWay})
  dimensions = [];

  schema               = [];
  selectableDimensions = [];

  constructor(bindingEngine, config) {
    this.config = config;
    this.vm                  = this;
    this.bindingEngine       = bindingEngine;
    this.dimensionsObservers = [];
  }

  calculateSchema() {
    this.schema = schema.call(this);
    /* could tell what dimensions to pick when initiaties */
    this.selectedDimensions = [{dimension: this.selectableDimensions[0]}];
  }

  dimensionsChanged() {
    /* remove the old property observers */
    this.dimensionsObservers.forEach(dimensionObserver => {
      dimensionObserver.dispose();
    });

    /* also observe the dimension property of the objects in the dimensions */
    this.dimensionsObservers = this.selectedDimensions.map(dimension => {
      return this.bindingEngine.propertyObserver(dimension, 'dimension')
        .subscribe(this.selectedDimensionsChanged.bind(this));
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
    /* get an array of all the registered scales */
    let scales = flatten(this.config.scales.map(def => def.scales));

    return scales.reduce((max, scale) => {
      return Math.max(max, scale.length);
    }, 0);
  }

}

function schema() {
  const addAction = {
    label : 'add dimension',
    action: () => {
      /* @todo: warn when no dimensions are available */
      this.selectedDimensions = this.selectedDimensions.concat({
        dimension: this.selectableDimensions[0]
      });
    }
  };

  const removeAction = {
    label : 'remove dimension',
    action: () => {
      /* remove the last dimension */
      this.selectedDimensions = this.selectedDimensions.slice(0, -1);
    }
  };

  return [{
    key   : 'selectedDimensions',
    type  : 'collection',
    schema: [{
      key    : 'dimension',
      label  : false,
      type   : 'select',
      options: this.selectableDimensions.map(dimension => {
        return {
          value: dimension,
          name : dimension.label()
        };
      })
    }]
  }, {
    type   : 'conditional',
    observe: 'selectedDimensions',
    schema : () => {
      let actions = [];

      if (this.selectedDimensions.length >= this.maxDimensions()) {
        actions.push(removeAction);
      }

      if (this.selectedDimensions.length < this.maxDimensions()) {
        actions.push(addAction);
      }

      return [{
        type   : 'actions',
        actions: actions
      }];
    }
  }];
}

/**
 * flattens an array once
 */
function flatten(arrays) {
  return arrays.reduce((flattened, array) => {
    return flattened.concat(array);
  }, []);
}
