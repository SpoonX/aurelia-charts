# Installation

## Uses

Aurelia-chart needs following plugins installed and configured:

* [aurelia-form](https://www.npmjs.com/package/aurelia-form).

## Aureli-Cli

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

## Jspm

Run `jspm i aurelia-charts` from your project root.

Aurelia-view-manager uses [homefront](https://www.npmjs.com/package/homefront), so add following to the `bundles.dist.aurelia.includes` section of `build/bundles.js`:

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

## Webpack

Run `npm i aurelia-charts --save` from your project root.

And add `aurelia-charts` in the `coreBundles.aurelia` section of your `webpack.config.js`.

## Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, run `typings i github:spoonx/aurelia-charts` or add `"aurelia-charts": "github:spoonx/aurelia-charts",` to your `typings.json` and run `typings i`.
