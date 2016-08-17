# Dimensions

> You might call them axis or variables. I named them dimensions.

Dimensions are usefull as they provide a standardized way of telling what data
to use for what dimensions of a chart.

https://en.wikipedia.org/wiki/Scatter_plot

So let's say I have data and want to plot that data in a scatter plot.

The shape of the data is as follows.

```js
  this.data = [{
    label: 'Anna',
    records: [{
      distance: 0,
      duration: 0,
      heartrate: 50
    }, {
      distance: 10, /* Anna ran 10 meters in the first second */
      duration: 1,
      heartrate: 55 /* Anna's heartrate has increased */
    }, {
      /* ... */
    }]
  }, {
    /* ... */
  }];
```

By default aurelia charts expects multiple datasets. This means that data
is always an array with objects. The array represents the datasets and the
object in the array is one dataset.

Now we would like to plot this data in a scatter plot where each dimension
represents one the the variables in Anna's dataset.

1. The first dimension is the x axis which represents time.

2. The distance Anna traveled is on the y axis

3. The heartrate of Anna is visualized by displaying a circle with a larger
   radius (you could also use color coding)

What each dimension represents may differ per chart. In a pie chart the first
dimensions could represent the angle of the slice.

```js

  this.dimensions = [{
    /* x-axis */
    label: dataset => dataset.label + ' duration in seconds',
    data:  dataset => dataset.records.map(record => record.duration)
  }, {
    /* y-axis */
    label: dataset => dataset.label + ' distance in meters',
    data:  dataset => dataset.records.map(record => record.distance)
  }, {
    /* scatter-radius */
    label: dataset => dataset.label + ' heartrate',
    data:  dataset => dataset.records.map(record => record.heartrate)
  }];

```

As we are defining the dimensions and type ourselves we need a view model where
these are defined.

```js
  @inject(ChartConfig)
  export class ViewModel {
    constructor(chartConfig) {
      this.type = "scatter";
      this.dimensions = [ /* see dimensions example above */ ];
      this.data = [ /* see the this.data example above * / ];
    }
  }
```

We then define a chart using aurelia-chart's chart-element component.

```html
  <chart-element
    type.bind="type"
    dimensions.bind="dimensions"
    data.bind="data"
  ></chart-element>
```

Assuming you configured the plugins correctly we should now see a scatter plot
with the features we desire.

So this is not a copy paste example but it does show the main concept of
aurelia charts. Define dimensions, data and tell what chart type to use to plot
the data on the correct dimensions.
