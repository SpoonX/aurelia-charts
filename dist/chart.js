import {logger} from './aurelia-charts';

/**
 * used when defining library chart types. It warns developers that certain
 * methods are required to be defined
 *
 * @class
 */
export class Chart {

  settings   = {};
  dimensions = [];
  data       = {};

  /**
   * called when the chart is attached to the DOM.
   */
  create() {
    warn('create');
  }

  /**
   * called when wanting to perform a change to the chart. Depending on the
   * chart extension used this method is called either when new data is
   * provided and/or settings are altered.
   *
   * @param {*} oldData
   * @param {*} newData - not defined the first time the method is called
   */
  update(oldData, newData) {
    warn('update');
  }

  /**
   * Called when the chart is detached
   */
  destroy() {
    warn('destroy');
  }

}

function warn(methodName) {
  logger.warn(`${methodName} method not defined for ${this.library}'s type ${this.type}`);
}
