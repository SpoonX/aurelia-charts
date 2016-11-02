import arrayEquals from 'array-equal';
import extend      from 'extend';
import {logger}    from './aurelia-charts';

/**
 * @class
 * @todo: consider creating a chartManager for getting, registering charts and
 * charts metadata
 */
export class Config {

  defaults = {
    library  : undefined,
    type     : 'line',
    libraries: {}
  };

  /* stores library and it's types and a reference to it's contructor */
  charts = {};

  scales = [];

  /**
   * @param {string} library
   * @param {string} type
   * @param {Function} constructor of a chart
   *
   * @chainable
   */
  registerChart(library, type, target) {
    this.charts[library] = this.charts[library] || {};
    /* if no type is defined the target reference is stored as the 'generic' type */
    this.charts[library][type] = target;

    return this;
  }

  /**
   * registers valid scales for a chart
   *
   * @param {Function} chart constructor
   * @param {...string[]} scales
   *
   * @chainable
   */
  registerScales(target, ...scales) {
    this.scales.push({
      constructor: target,
      scales     : scales
    });

    return this;
  }

  /**
   * extends the defaults object
   *
   * @param {object} defaults
   *
   * @chainable
   */
  configure(config) {
    extend(true, this, config);

    return this;
  }

  /**
   * Returns multiple scales
   *
   * @param {string[]} scale
   *
   * @returns {Function[]|undefined} an array containing chart constructors
   */
  chartsByScale(...scale) {
    /* scale: returns the charts that support given scales */
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

  /**
   * get the constructor by passing the type, library and type or no arguments
   * at all. Will use defaults to determine what to fallback to.
   *
   * @param {*} [value]
   *
   * @returns {Function|undefined} a constructor function or undefined when no
   * argument is passed
   */
  chart(value) {
    if (typeof value === 'undefined') {
      return this.chart(this.defaults);
    }

    if (typeof value === 'string') {
      return this.chart({
        library: undefined,
        type   : value
      });
    }

    if (typeof value === 'object') {
      let type    = value.type || this.defaults.type;
      let libName = value.library || this.defaults.libraries[type] || this.defaults.library;
      let library = this.charts[libName];

      if (typeof library === 'undefined') {
        logger.warn(`${value.library} is not a registered library. Either define a defalt library or tell what library to use`);

        return undefined;
      }

      return library[type];
    }

    return undefined;
  }

}
