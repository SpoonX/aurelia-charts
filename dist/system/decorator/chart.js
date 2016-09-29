'use strict';

System.register(['../config.js', 'aurelia-dependency-injection'], function (_export, _context) {
  "use strict";

  var Config, Container;
  return {
    setters: [function (_configJs) {
      Config = _configJs.Config;
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }],
    execute: function () {
      function chart(namespace, type) {
        var config = Container.instance.get(Config);

        return function (target) {
          config.registerChart(namespace, type, target);
        };
      }

      _export('chart', chart);
    }
  };
});