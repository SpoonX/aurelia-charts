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

  create() {
    warn('create');
  }

  update() {
    warn('update');
  }

  destroy() {
    warn('destroy');
  }

  /* @todo: add user friendly methods on the chart class */

}

function warn(methodName) {
  logger.warn(`${methodName} method not defined for ${this.library}'s type ${this.type}`);
}
