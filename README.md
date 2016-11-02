# aurelia-config

Aurelia-config is an aurelia plugin that allows you to load and configure plugins in a normalized manner.

[![Build Status](https://travis-ci.org/SpoonX/aurelia-api.svg?branch=master)](https://travis-ci.org/SpoonX/aurelia-api)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

## Overview
Using this plugin you can make it a lot easier to allow for configuration using [IoC](https://en.wikipedia.org/wiki/Inversion_of_control).

### For plugin developers
You can allow app developers to configure your plugin through a simple config object. The way you expose it is simple: export an object literal called `config`, and give it a namespace / key to use. This is the same object your `configure()` function will receive upon plugin-configuration time.

```js
// your-plugin.js

export function configure(aurelia, config) {
  // config is pojo
}

export {
  /* you need to namespace your defaults */
  'your-plugin': {
    /* This is your (optional) default config. */
  }
} as config;
```

Now app developers can use this config. Keep on reading to figure out how.

### For app developers
In stead of using `.plugin()` for every plugin, you only use it for the `aurelia-config` plugin. Aurelia-config will register the rest of the plugins, using the corresponding namespace segment of your exported default config (if existing) merged with the appConfigOverwrites.

```js
// Example config
let appConfigOverwrites = {
  'aurelia-api': {
    endpoints: [
      {name: 'api', url: 'http://127.0.0.1:1337/'}
    ]
  },
  'aurelia-notification': {
    baseClass: 'custom-notifications'
  }
};

// Configure function
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-config', [
      'aurelia-api',
      'aurelia-notification',
    ], appConfigOverwrites);
}
```

## Used By

This library is used by plugins and applications.

## Uses

- [homefront](https://www.npmjs.com/package/homefront).

## Documentation

You can find usage examples and the documentation at [aurelia-config-doc](http://aurelia-config.spoonx.org/).

The [changelog](doc/changelog.md) provides you with information about important changes.

## Installation for plugin developers

If you additionally want to use `aurelia-config` to access the global configuration, you can install it for Jspm with `jspm i aurelia-config` from your plugin root resp. `npm i aurelia-config --save` for webpack or aurelia-cli.

## Installation for applications

### Aureli-Cli

Run `npm i aurelia-config --save` from your project root.

Aurelia-config makes use [homefront](https://www.npmjs.com/package/homefront). So, add following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`.

```js
"dependencies": [
  // ...
  {
    "name": "homefront",
    "path": "../node_modules/homefront/dist",
    "main": "index"
  },
  "aurelia-config",
  // ...
],
```

### Jspm

Run `jspm i aurelia-config` from your project root.

Add `aurelia-config` to the `bundles.dist.aurelia.includes` section of `build/bundles.js`.

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

### Webpack

Run `npm i aurelia-config --save` from your project root.

Add `'aurelia-config'` in the `coreBundles.aurelia section` of your `webpack.config.js`.

### Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, run `typings i github:spoonx/aurelia-config` or add `"aurelia-config": "github:spoonx/aurelia-config",` to your `typings.json` and run `typings i`.
