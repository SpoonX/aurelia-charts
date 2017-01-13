import {getLogger} from 'aurelia-logging';
import {Container} from 'aurelia-dependency-injection';
import {TaskQueue,BindingEngine,bindingMode,inject,bindable,customElement} from 'aurelia-framework';

export declare {
  Chart
} from 'aurelia-charts/chart';
export declare {
  chart
} from 'aurelia-charts/decorator/chart';
export declare {
  scales
} from 'aurelia-charts/decorator/scales';
export * from 'aurelia-charts/utils';
export declare function configure(aurelia?: any, chartsConfig?: any): any;
export declare {
  Config,
  logger,
  qual,
  quan
};
/**
 * used when defining library chart types. It warns developers that certain
 * methods are required to be defined
 *
 * @class
 */
export declare class Chart {
  settings: any;
  dimensions: any;
  data: any;
  
  /**
     * called when the chart is attached to the DOM.
     */
  create(): any;
  
  /**
     * called when wanting to perform a change to the chart. Depending on the
     * chart extension used this method is called either when new data is
     * provided and/or settings are altered.
     *
     * @param {*} oldData
     * @param {*} newData - not defined the first time the method is called
     */
  update(oldData?: any, newData?: any): any;
  
  /**
     * Called when the chart is detached
     */
  destroy(): any;
}
/**
 * @class
 * @todo: consider creating a chartManager for getting, registering charts and
 * charts metadata
 */
export declare class Config {
  defaults: any;
  
  /* stores library and it's types and a reference to it's contructor */
  charts: any;
  scales: any;
  
  /**
     * @param {string}   library
     * @param {string}   type
     * @param {Function} target constructor of a chart
     *
     * @returns {Config}
     */
  registerChart(library?: any, type?: any, target?: any): any;
  
  /**
     * registers valid scales for a chart
     *
     * @param {Function}    target constructor
     * @param {...string} scales
     *
     * @returns {Config}
     */
  registerScales(target?: any, ...scales: any[]): any;
  
  /**
     * extends the defaults object
     *
     * @param {object} defaults
     *
     * @returns {Config}
     */
  configure(defaults?: any): any;
  
  /**
     * Returns multiple scales
     *
     * @param {string[]} scale
     *
     * @returns {Function[]|undefined} an array containing chart constructors
     */
  chartsByScale(...scale: any[]): any;
  
  /**
     * get the constructor by passing the type, library and type or no arguments
     * at all. Will use defaults to determine what to fallback to.
     *
     * @param {*} [value]
     *
     * @returns {Function|undefined} a constructor function or undefined when no
     * argument is passed
     */
  chart(value?: any): any;
}
/**
 * returns the dimensions definitions of an entity.
 *
 * @param {Entity} entity
 *
 * @returns {object}
 */
export declare function entityDimensions(entity?: any): any;

/**
 * creates an dimensions based on a js-object and using the npm's typer
 *
 * @param {object} object
 *
 * @returns {object}
 */
export declare function objectDimensions(object?: any): any;
/* making charts often requires one to normalize filter and transform data.
 * This specialized functions are defined in this file to make it easier to
 * grab a piece of data and transform it into the format required by graph
 * libraries
 */
/**
 * converst a type to a scale
 *
 * @param {string} type - which can be a number or string or some other alias
 * for it
 *
 * @returns {string}
 */
export declare function typeScale(type?: any): any;

/**
 * returns an array where the types are tranformed to scales
 *
 * @param {...string} types
 *
 * @returns {string[]}
 */
export declare function typesScales(...types: any[]): any;

/**
 * returns a function which gets the property passed as a the prop param
 *
 * @param {string} key
 *
 * @returns {Function}
 */
export declare function prop(key?: any): any;

/**
 * takes a list of data and returns a list of the values of one of the
 * properties on the array.
 *
 * @param {string} key
 * @param {*[]}    data
 *
 * @returns {*[]}
 */
export declare function unpack(key?: any, data?: any): any;

/**
 * used for when you want to only unpack certain properties
 *
 * @param {string[]} keys - the keys to unpack
 * @param {object[]} data - the objects that contain the keys
 *
 * @returns {object} where the keys are the properties and the values are set
 * as an array.
 */
export declare function unpackProps(keys?: any, data?: any): any;

/**
 * returns an object where the objects are transformed to a single object which
 * values are a list of all the objects their values.
 *
 * @param {Object[]} data
 *
 * @return {Object}
 */
export declare function unpackAll(data?: any): any;

/**
 * used to unpack a grouped objects
 *
 * @param {object[]} groups
 *
 * @returns {object[]}
 */
export declare function unpackAllGrouped(groups?: any): any;

/**
 * @todo: consider removing this function
 * @param {function} fn
 * @param {object}   object
 *
 * @returns {*[]}
 */
export declare function mapValues(fn?: any, object?: any): any;

/**
 * returns a list of grouped data
 *
 * @param {string} key
 * @param {object[]} objects an object with arrays as properties
 *
 * @returns {*[]}
 */
export declare function groupBy(key?: any, objects?: any): any;
export declare function reduceByX(columns?: any): any;
export declare function tail(list?: any): any;

/**
 * return values that are on the same height
 *
 * @param {number} index
 * @param {array[]} columns
 *
 * @returns {*[]} any value located in the the columns row index
 */
export declare function row(index?: any, columns?: any): any;

/**
 * turns the columns around by making the columns the rows
 *
 * @param {array[]} columns
 *
 * @returns {array[]}
 */
export declare function rows(columns?: any): any;
export declare function chart(namespace?: any, type?: any): any;
export declare function scales(...scaleTypes: any[]): any;
export declare class ChartElement {
  type: any;
  library: any;
  dimensions: any;
  data: any;
  chart: any;
  instance: any;
  constructor(bindingEngine?: any, element?: any, config?: any, queue?: any);
  style(): any;
  dimensionsChanged(dimensions?: any): any;
  chartChanged(): any;
  dataChanged(newData?: any, oldData?: any): any;
  typeChanged(): any;
  libraryChanged(): any;
  updateChart(): any;
  detached(): any;
}