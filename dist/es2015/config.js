import arrayEquals from 'array-equal';
import extend from 'extend';
import { logger } from './aurelia-charts';

export let Config = class Config {
  constructor() {
    this.defaults = {
      library: undefined,
      type: 'line',
      libraries: {}
    };
    this.charts = {};
    this.scales = [];
  }

  registerChart(library, type, target) {
    this.charts[library] = this.charts[library] || {};

    this.charts[library][type] = target;

    return this;
  }

  registerScales(target, ...scales) {
    this.scales.push({
      constructor: target,
      scales: scales
    });

    return this;
  }

  configure(config) {
    extend(true, this, config);

    return this;
  }

  chartsByScale(...scale) {
    let result = [];

    this.scales.forEach(chartScales => {
      chartScales.scales.forEach(chartScale => {
        if (arrayEquals(scale, chartScale)) {
          result.push(chartScales.constructor);
        }
      });
    });

    return result;
  }

  chart(value) {
    if (typeof value === 'undefined') {
      return this.chart(this.defaults);
    }

    if (typeof value === 'string') {
      return this.chart({
        library: undefined,
        type: value
      });
    }

    if (typeof value === 'object') {
      let type = value.type || this.defaults.type;
      let libName = value.library || this.defaults.libraries[type] || this.defaults.library;
      let library = this.charts[libName];

      if (typeof library === 'undefined') {
        logger.warn(`${ value.library } is not a registered library. Either define a default library or tell what library to use`);

        return undefined;
      }

      return library[type];
    }

    return undefined;
  }

};