import {Config as ChartConfig} from '../config';
import {bindingMode, bindable, inject} from 'aurelia-framework';

@inject(ChartConfig)
export class ChartPicker {

  @bindable dimensions; /* dimensions used to calculate possible charts */

  @bindable({defaultBindingMode: bindingMode.twoWay})
  class; /* the selected chart */

  schema = [];
  charts = []; /* charts that are available for the given dimensions */

  constructor(chartConfig) {
    this.chartConfig = chartConfig;
    this.vm          = this;
  }

  dimensionsChanged(dimensions) {
    const scales = dimensions.map(dimension => dimension.scale);
    this.charts  = this.chartConfig.chartsByScale(...scales);
    this.schema  = [{
      key    : 'class',
      type   : 'select',
      options: this.charts.map(Chart => {
        return {
          value: Chart,
          name: Chart.name
        };
      })
    }];
  }

}
