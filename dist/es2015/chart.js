import { logger } from './aurelia-charts';

export let Chart = class Chart {
  constructor() {
    this.settings = {};
    this.dimensions = [];
    this.data = {};
  }

  create() {
    warn('create');
  }

  update(oldData, newData) {
    warn('update');
  }

  destroy() {
    warn('destroy');
  }

};

function warn(methodName) {
  logger.warn(`${ methodName } method not defined for ${ this.library }'s type ${ this.type }`);
}