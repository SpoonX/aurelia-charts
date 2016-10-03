import {BindingEngine, bindingMode, inject, bindable, customElement} from 'aurelia-framework';
import {Config} from '../config';

@customElement('chart-element')
@inject(BindingEngine, Element, Config)
export class ChartElement {

  /* used to determine what chart to use */
  @bindable type;
  @bindable library;

  /* describes what data to use and how */
  @bindable dimensions;

  /* the data to be plotted */
  @bindable data;

  @bindable chart;

  /* optional for getting acess to the library specific chart chart use it
   * if you want to alter the options on the chart */
  @bindable({defaultBindingMode: bindingMode.twoWay})
  instance;

  constructor(bindingEngine, element, config) {
    this.bindingEngine = bindingEngine;
    this.element       = element;
    this.config        = config;
    this.style();
  }

  style() {
    this.element.style.display = 'block';
  }

  dimensionsChanged(dimensions) {
    if (this.instance) {
      this.instance.dimensions = this.dimensions;
      this.instance.update();
    }
  }

  chartChanged() {
    if (typeof this.chart !== 'function') {
      return;
    }
    let Chart = this.chart;
    if (this.instance) {
      this.instance.destroy();
      delete this.instance;
    }
    this.instance            = new Chart();
    this.instance.data       = this.data;
    this.instance.element    = this.element;
    this.instance.dimensions = this.dimensions;
    this.instance.create();
  }

  dataChanged(data) {
    if (this.instance) {
      this.instance.data = this.data;
      this.instance.update();
    }
  }

  typeChanged() {
    this.updateChart();
  }

  libraryChanged() {
    this.updateChart();
  }

  updateChart() {
    let NewChart = this.config.chart({type: this.type, library: this.library});
    /* check if not updating to same chart */
    if (NewChart !== this.chart) {
      this.chart = NewChart;
    }
  }

  detached() {
    this.instance.destroy();
  }

}
