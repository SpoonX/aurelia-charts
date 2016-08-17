# Components

## `<chart-element>`

Aurelia-charts provies you with one component names `chart-element`. A simple
example on how you would use it follows.

```html

  <chart-element
    type="line"
    settings="{data: [] ....}"
  ></chart-element>

```

### {string} type

Used to decide which chart to render. It should always be a `string`

### {object} settings

The settings can differ depending on the library your leveraging. The settings
bindable is how aurelia-chart communicates library specific information
throughout the application.

### {string} [library]

An optional bindable that overwrites the library configurations. Handy for when
you have an exception to the rule-or preffer it over configuration.

## `<dimensions-picker>`

```html

  <dimensions-picker
    dimensions.bind="dimensions"
    object.bind="object"
  ></dimensions-picker>

```

```js

  class ViewModel {

    constructor() {
      this.dimensions = [];

      this.data = [{
        name: 'Anna',
        money: 20,
      }]

      this.object = this.data[0];
    }

  }

```

###
