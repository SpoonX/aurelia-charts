# ![aurelia-charts](https://cloud.githubusercontent.com/assets/67802/19197297/50f1d8a2-8cb9-11e6-980a-d342be79a502.png)

A standardized way of leveraging multiple frameworks.

Aurelia-charts is not about reinventing the wheel. To be able to customize the
charts, one is required to read the docs of the chart library being
implemented.

Aurelia charts standardizes the way charts are used in your projects. It does
so by letting others define sane defaults. It is still up to you to make sure
the data received from somewhere is formatted in a way that your preffered
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
