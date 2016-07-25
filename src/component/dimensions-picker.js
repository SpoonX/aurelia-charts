import {BindingEngine, inject, bindingMode, bindable, customElement} from 'aurelia-framework';
import {objectDimensions, entityDimensions} from '../dimensions';

@customElement('dimensions-picker')
@inject(BindingEngine)
export class DimensionsPicker {

  @bindable object; /* either use a simple object */
  @bindable entity; /* or a simple entity */

  @bindable repository; /* @todo: can also be used to calculate selectableDimensions */

  @bindable
  selectedDimensions   = [];

  @bindable({defaultBindingMode: bindingMode.twoWay})
  dimensions = []; /* the selected dimensions */

  schema               = [];
  selectableDimensions = [];

  constructor(bindingEngine) {
    this.vm = this;
  }

  calculateSchema() {
    this.schema = schema.call(this);
    /* could tell what dimensions to pick when initiaties */
    this.selectedDimensions = [{dimension: this.selectableDimensions[0]}];
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
    type: 'actions',
    actions: [{
      label: 'add dimension',
      action: () => {
        /* @todo: warn when no dimensions are available */
        this.selectedDimensions = this.selectedDimensions.concat({
          dimension: this.selectableDimensions[0]
        });
      }
    }, {
      label: 'remove dimension',
      action: () => {
        this.selectedDimensions = this.selectedDimensions.slice(0, -1);
      }
    }]
  }];
}
