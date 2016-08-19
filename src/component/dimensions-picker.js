import {BindingEngine, inject, bindingMode, bindable, customElement} from 'aurelia-framework';
import {objectDimensions, entityDimensions} from '../dimensions';

@customElement('dimensions-picker')
@inject(BindingEngine)
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

  constructor(bindingEngine) {
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

}

function schema() {
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
    type   : 'actions',
    actions: [{
      label : 'add dimension',
      action: () => {
        /* @todo: warn when no dimensions are available */
        this.selectedDimensions = this.selectedDimensions.concat({
          dimension: this.selectableDimensions[0]
        });
      }
    }, {
      label : 'remove dimension',
      action: () => {
        /* remove the last dimension */
        this.selectedDimensions = this.selectedDimensions.slice(0, -1);
      }
    }]
  }];
}
