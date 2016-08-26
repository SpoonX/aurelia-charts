'use strict';

System.register(['../config.js', 'aurelia-dependency-injection'], function (_export, _context) {
  "use strict";

  var Config, Container;
  function scales() {
    for (var _len = arguments.length, scaleTypes = Array(_len), _key = 0; _key < _len; _key++) {
      scaleTypes[_key] = arguments[_key];
    }

    var config = Container.instance.get(Config);

    return function (target) {
      config.registerScales.apply(config, [target].concat(scaleTypes));
    };
  }

  _export('scales', scales);

  return {
    setters: [function (_configJs) {
      Config = _configJs.Config;
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }],
    execute: function () {}
  };
});