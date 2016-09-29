'use strict';

System.register(['./aurelia-charts', 'typer'], function (_export, _context) {
  "use strict";

  var typeScale, prop, typer;
  return {
    setters: [function (_aureliaCharts) {
      typeScale = _aureliaCharts.typeScale;
      prop = _aureliaCharts.prop;
    }, function (_typer) {
      typer = _typer.default;
    }],
    execute: function () {
      function entityDimensions(entity) {
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

      _export('entityDimensions', entityDimensions);

      function objectDimensions(object) {
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

      _export('objectDimensions', objectDimensions);
    }
  };
});