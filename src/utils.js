import {quan, qual} from './aurelia-charts';

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
export function typeScale(type) {
  const quantativeTypes = [
    'date',
    'date-time',
    'number',
    'integer',
    'float',
    'int'
  ];

  return (quantativeTypes.indexOf(type) !== -1) ? quan : qual;
}

/**
 * returns an array where the types are tranformed to scales
 *
 * @param {...string} types
 *
 * @returns {string[]}
 */
export function typesScales(...types) {
  return types.map(typeScale);
}

/**
 * returns a function which gets the property passed as a the prop param
 *
 * @param {string} key
 *
 * @returns {Function}
 */
export function prop(key) {
  /**
   * @param {object} obj
   *
   * @returns {*} the value contained
   */
  return function value(obj) {
    return obj[key];
  };
}

/**
 * takes a list of data and returns a list of the values of one of the
 * properties on the array.
 *
 * @param {string} key
 * @param {*[]}    data
 *
 * @returns {*[]}
 */
export function unpack(key, data) {
  return data.map(prop(key));
}

/**
 * used for when you want to only unpack certain properties
 *
 * @param {string[]} keys - the keys to unpack
 * @param {object[]} data - the objects that contain the keys
 *
 * @returns {object} where the keys are the properties and the values are set
 * as an array.
 */
export function unpackProps(keys, data) {
  return keys.reduce((acc, key) => {
    acc[key] = unpack(key, data);

    return acc;
  }, {});
}

/**
 * returns an object where the objects are transformed to a single object which
 * values are a list of all the objects their values.
 *
 * @param {Object[]} data
 *
 * @return {Object}
 */
export function unpackAll(data) {
  return unpackProps(Object.keys(data[0]), data);
}

/**
 * used to unpack a grouped objects
 *
 * @param {object[]} groups
 *
 * @returns {object[]}
 */
export function unpackAllGrouped(groups) {
  return groups.map(group => {
    return {
      key   : group.key,
      values: unpackAll(group.values)
    };
  });
}

/**
 * @todo: consider removing this function
 * @param {function} fn
 * @param {object}   object
 *
 * @returns {*[]}
 */
export function mapValues(fn, object) {
  return Object.keys(object).reduce((acc, key) => {
    acc[key] = fn(object[key]);

    return acc;
  }, {});
}

/**
 * returns a list of grouped data
 *
 * @param {string} key
 * @param {object[]} objects an object with arrays as properties
 *
 * @returns {*[]}
 */
export function groupBy(key, objects) {
  let groupIndex = [];
  let index;

  return objects.reduce((acc, obj) => {
    let group = obj[key];

    if (groupIndex.indexOf(group) !== -1) {
      index = groupIndex.indexOf(group);
    } else {
      index      = groupIndex.push(group) - 1;
      acc[index] = {
        key   : group,
        values: []
      };
    }
    acc[index].values.push(obj);

    return acc;
  }, []);
}

export function reduceByX(columns) {
  return columns[0].reduce((acc, val, index) => {
    const vals = row(index, columns);

    acc[val] = acc[val] ? acc[val].concat(vals) : vals;

    return acc;
  }, {});
}

export function tail(list) {
  return list.slice(1, Infinity);
}

/**
 * return values that are on the same height
 *
 * @param {number} index
 * @param {array[]} columns
 *
 * @returns {*[]} any value located in the the columns row index
 */
export function row(index, columns) {
  return columns.map(column => {
    return column[index];
  });
}

/**
 * turns the columns around by making the columns the rows
 *
 * @param {array[]} columns
 *
 * @returns {array[]}
 */
export function rows(columns) {
  return columns[0].map((field, index) => {
    return row(index, columns);
  });
}
