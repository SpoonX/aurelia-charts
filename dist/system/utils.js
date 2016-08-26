'use strict';

System.register(['./aurelia-charts'], function (_export, _context) {
  "use strict";

  var quan, qual;
  function typeScale(type) {
    var quantativeTypes = ['date', 'date-time', 'number', 'integer', 'float', 'int'];

    return quantativeTypes.indexOf(type) !== -1 ? quan : qual;
  }

  _export('typeScale', typeScale);

  function typesScales() {
    for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
      types[_key] = arguments[_key];
    }

    return types.map(typeScale);
  }

  _export('typesScales', typesScales);

  function prop(key) {
    return function value(obj) {
      return obj[key];
    };
  }

  _export('prop', prop);

  function unpack(key, data) {
    return data.map(prop(key));
  }

  _export('unpack', unpack);

  function unpackProps(keys, data) {
    return keys.reduce(function (acc, key) {
      acc[key] = unpack(key, data);

      return acc;
    }, {});
  }

  _export('unpackProps', unpackProps);

  function unpackAll(data) {
    return unpackProps(Object.keys(data[0]), data);
  }

  _export('unpackAll', unpackAll);

  function unpackAllGrouped(groups) {
    return groups.map(function (group) {
      return {
        key: group.key,
        values: unpackAll(group.values)
      };
    });
  }

  _export('unpackAllGrouped', unpackAllGrouped);

  function mapValues(fn, object) {
    return Object.keys(object).reduce(function (acc, key) {
      acc[key] = fn(object[key]);

      return acc;
    }, {});
  }

  _export('mapValues', mapValues);

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

  _export('groupBy', groupBy);

  function reduceByX(columns) {
    return columns[0].reduce(function (acc, val, index) {
      var vals = row(index, columns);
      acc[val] = acc[val] ? acc[val].concat(vals) : vals;

      return acc;
    }, {});
  }

  _export('reduceByX', reduceByX);

  function tail(list) {
    return list.slice(1, Infinity);
  }

  _export('tail', tail);

  function row(index, columns) {
    return columns.map(function (column) {
      return column[index];
    });
  }

  _export('row', row);

  function rows(columns) {
    return columns[0].map(function (field, index) {
      return row(index, columns);
    });
  }

  _export('rows', rows);

  return {
    setters: [function (_aureliaCharts) {
      quan = _aureliaCharts.quan;
      qual = _aureliaCharts.qual;
    }],
    execute: function () {}
  };
});