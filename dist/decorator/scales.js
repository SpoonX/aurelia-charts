import {Config} from '../config';
import {Container} from 'aurelia-dependency-injection';

export function scales(...scaleTypes) {
  let config = Container.instance.get(Config);

  return function(target) {
    config.registerScales(target, ...scaleTypes);
  };
}
