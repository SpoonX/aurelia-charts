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

  @bindable class;

  /* optional for getting acess to the library specific chart chart use it
   * if you want to alter the options on the chart */
  @bindable({defaultBindingMode: bindingMode.twoWay})
  chart;

  constructor(bindingEngine, element, config) {
    this.bindingEngine = bindingEngine;
    this.element       = element;
    this.config        = config;
  }

  dimensionsChanged(dimensions) {
    if (this.chart) {
      this.chart.dimensions = this.dimensions;
      this.chart.update();
    }
  }

  classChanged() {
    if (typeof this.class !== 'function') {
      return;
    }
    let Chart = this.class;
    if (this.chart) {
      this.chart.destroy();
      delete this.chart;
    }
    this.chart            = new Chart();
    this.chart.data       = this.data;
    this.chart.element    = this.element;
    this.chart.dimensions = this.dimensions;
    this.chart.create();
  }

  dataChanged(data) {
    if (this.chart) {
      this.chart.data = this.data;
      this.chart.update();
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
    if (NewChart !== this.class) {
      this.class = NewChart;
    }
  }

  detached() {
    this.chart.destroy();
  }

}
