import { Config } from '../config.js';
import { Container } from 'aurelia-dependency-injection';

export function scales() {
  for (var _len = arguments.length, scaleTypes = Array(_len), _key = 0; _key < _len; _key++) {
    scaleTypes[_key] = arguments[_key];
  }

  var config = Container.instance.get(Config);

  return function (target) {
    config.registerScales.apply(config, [target].concat(scaleTypes));
  };
}