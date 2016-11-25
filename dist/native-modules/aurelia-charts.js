var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { Config } from './config';
import { getLogger } from 'aurelia-logging';
export { Chart } from './chart';
export { chart } from './decorator/chart';
export { scales } from './decorator/scales';
export * from './utils';

var logger = getLogger('aurelia-charts');

export function configure(aurelia, chartsConfig) {
  aurelia.globalResources('./component/chart-element', './component/dimensions-picker', './component/chart-picker');

  var config = aurelia.container.get(Config);
  var libraries = Object.keys(config.charts);

  if ((typeof chartsConfig === 'undefined' ? 'undefined' : _typeof(chartsConfig)) === 'object') {
    config.configure(chartsConfig);
  } else if (typeof chartsConfig === 'function') {
    chartsConfig(config);
  } else if (chartsConfig) {
    logger.warn('chart configurations can be a function or an object not a ' + (typeof chartsConfig === 'undefined' ? 'undefined' : _typeof(chartsConfig)) + ' value');
  }

  if (libraries.length === 0) {
    logger.warn('no aurelia-charts plugins installed. Head to the docs and read');
  } else {
    logger.debug('installed ' + libraries.join(' and ') + ' as aurelia-charts libraries');
  }
}

var qual = 'qualitative';
var quan = 'quantitative';

export { Config, logger, qual, quan };