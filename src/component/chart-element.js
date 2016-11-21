import {TaskQueue, BindingEngine, bindingMode, inject, bindable, customElement} from 'aurelia-framework';
import {Config} from '../config';

@customElement('chart-element')
@inject(BindingEngine, Element, Config, TaskQueue)
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

  constructor(bindingEngine, element, config, queue) {
    this.bindingEngine = bindingEngine;
    this.element       = element;
    this.config        = config;
    this.queue         = queue;
    this.style();
  }

  style() {
    this.element.style.display = 'block';
  }

  dimensionsChanged(dimensions) {
    if (this.instance) {
      this.instance.dimensions = this.dimensions;
      this.instance.update(this.data, this.data);
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

    this.queue.queueTask(this.instance.create.bind(this.instance));
  }

  dataChanged(newData, oldData) {
    if (this.instance) {
      this.instance.data = this.data;
      this.instance.update(newData, oldData);
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
