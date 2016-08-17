# Decorators

## chart

The `@chart` decorator enables users of the aurelia-charts library to register
the chart classes in aurelia-charts. The decorator is used on a class and takes
a required `namespace` argument and an optional `type` arguments.

```js

  import {chart, Chart} from 'aurelia-charts';

  @chart('D3', 'scatter')
  class ScatterChart extends Chart{
    create() {...}
    update() {...}
    destroy() {...}
  }

```

The exact implementation of the chart defined here is left up to you. You can
read more about creating support for library charts in the
[extending](doc/extending.md) section.

## chartScales

Registering chart scales for a chart allows aurelia charts to derive what
charts are usable for the selected dimensions.

```js

  import {chartScales, quan, qual} from 'aurelia-charts';

  @chartScales([quan, quan, quan], [quan, quan], [])
  class ScatterChart extends Chart {
     /* implementation */
  }

```

This extra metadata is usefull when wanting to provide the user with charts
that are adequate for the selected dimensions. Charts that use the chartScales
decorator will be rendered in the `<chart-picker>` component's select element.
