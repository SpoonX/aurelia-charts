import {Config as ChartConfig} from '../config';
import {bindingMode, bindable, inject} from 'aurelia-framework';

@inject(ChartConfig)
export class ChartPicker {

  /* dimensions used to calculate possible charts */
  @bindable dimensions;

  /* the selected chart */
  @bindable({defaultBindingMode: bindingMode.twoWay})
  chart;

  schema = [];
  
  /* charts that are available for the given dimensions */
  charts = [];

  constructor(chartConfig) {
    this.chartConfig = chartConfig;
    this.vm          = this;
  }

  dimensionsChanged(dimensions) {
    const scales = dimensions.map(dimension => dimension.scale);
    this.charts  = this.chartConfig.chartsByScale(...scales);
    this.schema  = [{
      key    : 'chart',
      type   : 'select',
      options: this.charts.map(Chart => {
        return {
          value: Chart,
          name : Chart.name
        };
      })
    }];
  }

}
