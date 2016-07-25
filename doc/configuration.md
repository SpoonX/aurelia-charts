# Configuration

```js

  .plugin('aurelia-charts-plotly')

  .plugin('aurelia-charts-c3')

  .plugin('aurelia-charts', charts => {

    charts.configure({
      defaults: {

        /* the default library type */
        library: 'C3',

        /* the default chart type */
        type: 'line'

        /* what library to use for the chart type */
        libraries: {
          bar: 'c3',
          geo: 'datamaps'
        }
      }
    });
  })

```

Aurelia-charts will choose the C3 line chart when choosing to render a line
chart using the `<chart-element type='line' settings.bind='vmSettings'></chart-element>`

You can also choose to overwrite the config defaults by setting the `library`
atribute. You can read more about that in the *component* chapter
