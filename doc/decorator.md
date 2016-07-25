# Decorator

## chart

The `@chart` decorator enables users of the aurelia-charts library to register
the chart classes in aurelia-charts. The decorator is used on a class and takes
a required `namespace` argument and an optional `type` arguments.

```js

  import {Chart} from 'aurelia-charts';

  @chart('D3', 'scatter')
  class ScatterChart extends Chart{
    create() {...}
    update() {...}
    destroy() {...}
  }

```

The exact implementation of the chart defined here is left up to you. You can
read more about the creating a chart in the usage section.
