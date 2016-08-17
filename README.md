# aurelia-charts

> A standardized way of leveraging multiple chart libraries. It defines sane
> defaults and enables you to defined the rendering of charts using dimensions.

## Supported libraries

Aurelia-chart by itself is useless. It is only when installing a plugin that
leverages aurelia-chart that you get the desired features. Read more about the
supported libraries in the [libraries](doc/libraries.md) section.

## Quick start

For this example we will use `aurelia-charts-c3` which basicly wraps the c3 library.

1. `jspm install aurelia-charts aurelia-charts-c3`
2. .plugin('aurelia-charts') and .plugin('aurelia-charts-c3');
3. define dimensions, data and a chart type on the view model.
4. `<chart-element dimensions.bind="dimensions" type.bind="type" data.bind="data"`

If you are wondering what [dimensions](doc/dimensions.md) and types are and how
to define them, don't worry well cover those in other chapters.

## Documentation

You can find usage examples and the documentation at [aurelia-charts](http://aurelia-charts.spoonx.org/).

The [changelog](doc/CHANGELOG.md) provides you with information about important changes.

## Contributing

Report bugs, request features, send pull requests for fixes and features and
read the [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](LICENSE)
