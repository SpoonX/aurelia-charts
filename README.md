# Archived

It was fun while it lasted, but we have to stop maintaining these repositories. We haven't used these projects for quite some time and maintaining them is becoming harder to do.

You deserve better, and for that reason we've decided to archive some repositories, which includes this one.

Feel free to fork and alter the repositories, and go forth making awesome stuff.

# ![aurelia-charts](https://cloud.githubusercontent.com/assets/67802/19197297/50f1d8a2-8cb9-11e6-980a-d342be79a502.png)

A standardized way of leveraging multiple frameworks.

Aurelia-charts is not about reinventing the wheel. To be able to customize the
charts, one is required to read the docs of the chart library being
implemented.

Aurelia charts standardizes the way charts are used in your projects. It does
so by letting others define sane defaults. It is still up to you to make sure
the data received from somewhere is formatted in a way that your preferred
chart library can use.

## Supported libraries

Aurelia-chart by itself is useless. It is only when installing a plugin that
leverages aurelia-chart that you get the desired features. Read more about the
supported libraries in the [libraries](doc/libraries.md) section.

## Quick start

For this example we will use `aurelia-charts-c3` which basically wraps the c3 library.

1. `jspm install aurelia-charts aurelia-charts-c3`
2. .plugin('aurelia-charts') and .plugin('aurelia-charts-c3');
3. create a model with definitions and data (how to do this depends on the
   chart library one is using)
4. `<chart-element settings.bind="vmSettings"
    type="line"></chart-element>`

## Documentation

You can find usage examples and the documentation at [aurelia-charts](http://aurelia-charts.spoonx.org/).

The [changelog](doc/CHANGELOG.md) provides you with information about important changes.

## Contributing

Report bugs, request features, send pull requests for fixes and features and
read the [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](LICENSE)

## Installation

### Uses

Aurelia-chart needs following plugins installed and configured:

* [aurelia-form](https://www.npmjs.com/package/aurelia-form).

### Aureli-Cli

Run `npm i aurelia-charts --save` from your project root.

Aurelia-view-manager uses `extend`, `array-equal` and `typer`, so add following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`:

```js
"dependencies": [
  "extend",
  "array-equal",
  "typer",
  {
    "name": "aurelia-charts",
    "path": "../node_modules/aurelia-charts/dist/amd",
    "main": "aurelia-charts",
    "resources": [
      "component/chart-element.html",
      "component/chart-picker.html",
      "component/dimensions-picker.html"
    ]
  },
  // ...
],
```

### Jspm

Run `jspm i aurelia-charts` from your project root.

Aurelia-view-manager uses `extend`, `array-equal` and `typer`, so add following to the `bundles.dist.aurelia.includes` section of `build/bundles.js`:

```js
  "extend",
  "array-equal",
  "typer",
  "aurelia-charts",
  "[aurelia-charts/**/*.js]",
  "aurelia-charts/**/*.html!text",
```

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

### Webpack

Run `npm i aurelia-charts --save` from your project root.

And add `aurelia-charts` in the `coreBundles.aurelia` section of your `webpack.config.js`.

### Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, run `typings i github:spoonx/aurelia-charts` or add `"aurelia-charts": "github:spoonx/aurelia-charts",` to your `typings.json` and run `typings i`.
