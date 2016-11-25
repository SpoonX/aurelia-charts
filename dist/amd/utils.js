define(['exports', './aurelia-charts'], function (exports, _aureliaCharts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.typeScale = typeScale;
  exports.typesScales = typesScales;
  exports.prop = prop;
  exports.unpack = unpack;
  exports.unpackProps = unpackProps;
  exports.unpackAll = unpackAll;
  exports.unpackAllGrouped = unpackAllGrouped;
  exports.mapValues = mapValues;
  exports.groupBy = groupBy;
  exports.reduceByX = reduceByX;
  exports.tail = tail;
  exports.row = row;
  exports.rows = rows;
  function typeScale(type) {
    var quantativeTypes = ['date', 'date-time', 'number', 'integer', 'float', 'int'];

    return quantativeTypes.indexOf(type) !== -1 ? _aureliaCharts.quan : _aureliaCharts.qual;
  }

  function typesScales() {
    for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
      types[_key] = arguments[_key];
    }

    return types.map(typeScale);
  }

  function prop(key) {
    return function value(obj) {
      return obj[key];
    };
  }

  function unpack(key, data) {
    return data.map(prop(key));
  }

  function unpackProps(keys, data) {
    return keys.reduce(function (acc, key) {
      acc[key] = unpack(key, data);

      return acc;
    }, {});
  }

  function unpackAll(data) {
    return unpackProps(Object.keys(data[0]), data);
  }

  function unpackAllGrouped(groups) {
    return groups.map(function (group) {
      return {
        key: group.key,
        values: unpackAll(group.values)
      };
    });
  }

  function mapValues(fn, object) {
    return Object.keys(object).reduce(function (acc, key) {
      acc[key] = fn(object[key]);

      return acc;
    }, {});
  }

  function groupBy(key, objects) {
    var groupIndex = [];
    var index = void 0;

    return objects.reduce(function (acc, obj) {
      var group = obj[key];

      if (groupIndex.indexOf(group) !== -1) {
        index = groupIndex.indexOf(group);
      } else {
        index = groupIndex.push(group) - 1;
        acc[index] = {
          key: group,
          values: []
        };
      }
      acc[index].values.push(obj);

      return acc;
    }, []);
  }

  function reduceByX(columns) {
    return columns[0].reduce(function (acc, val, index) {
      var vals = row(index, columns);

      acc[val] = acc[val] ? acc[val].concat(vals) : vals;

      return acc;
    }, {});
  }

  function tail(list) {
    return list.slice(1, Infinity);
  }

  function row(index, columns) {
    return columns.map(function (column) {
      return column[index];
    });
  }

  function rows(columns) {
    return columns[0].map(function (field, index) {
      return row(index, columns);
    });
  }
});