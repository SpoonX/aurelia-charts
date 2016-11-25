import {Config}    from './config';
import {getLogger} from 'aurelia-logging';
export {Chart}     from './chart';
export {chart}     from './decorator/chart';
export {scales}    from './decorator/scales';
export *           from './utils';

const logger = getLogger('aurelia-charts');

export function configure(aurelia, chartsConfig) {
  aurelia.globalResources(
    './component/chart-element',
    './component/dimensions-picker',
    './component/chart-picker'
  );

  let config    = aurelia.container.get(Config);
  let libraries = Object.keys(config.charts);

  if (typeof chartsConfig === 'object') {
    config.configure(chartsConfig);
  } else if (typeof chartsConfig === 'function') {
    chartsConfig(config);
  } else if (chartsConfig) {
    logger.warn(`chart configurations can be a function or an object not a ${typeof chartsConfig} value`);
  }

  if (libraries.length === 0) {
    logger.warn('no aurelia-charts plugins installed. Head to the docs and read');
  } else {
    logger.debug(`installed ${libraries.join(' and ')} as aurelia-charts libraries`);
  }
}

const qual = 'qualitative';
const quan = 'quantitative';

export {
  Config,
  logger,
  qual,
  quan
};
