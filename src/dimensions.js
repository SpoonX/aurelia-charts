import {typeScale, prop} from './aurelia-charts';
import typer from 'typer';

/**
 * returns the dimensions definitions of an entity.
 *
 * @param {Entity} entity
 *
 * @returns {object}
 */
export function entityDimensions(entity) {
  const metadata = entity.getMeta();
  const types    = metadata.fetch('types') || {};

  return Object.keys(entity).map(key => {
    return {
      label: datum => {
        return datum ? `${datum.key}${key}` : `${key}`;
      },
      data:  prop(key),
      scale: typeScale(types[key])
    };
  });
}

/**
 * creates an dimensions based on a js-object and using the npm's typer
 *
 * @param {object} object
 *
 * @returns {object}
 */
export function objectDimensions(object) {
  return Object.keys(object).map(key => {
    return {
      label: datum => {
        return datum ? `${datum.key}${key}` : `${key}`;
      },
      data:  prop(key),
      scale: typeScale(typer.detect(object[key]))
    };
  });
}
