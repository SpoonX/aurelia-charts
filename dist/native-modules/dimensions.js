import { typeScale, prop } from './aurelia-charts';
import typer from 'typer';

export function entityDimensions(entity) {
  var metadata = entity.getMeta();
  var types = metadata.fetch('types') || {};

  return Object.keys(entity).map(function (key) {
    return {
      label: function label(datum) {
        return datum ? '' + datum.key + key : '' + key;
      },
      data: prop(key),
      scale: typeScale(types[key])
    };
  });
}

export function objectDimensions(object) {
  return Object.keys(object).map(function (key) {
    return {
      label: function label(datum) {
        return datum ? '' + datum.key + key : '' + key;
      },
      data: prop(key),
      scale: typeScale(typer.detect(object[key]))
    };
  });
}