# Component


Aurelia-charts provies you with one component names `chart-element`. A simple
example on how you would use it follows.


```html


  <chart-element
    type="line"
    settings="{data: [] ....}"
  ></chart-element>

```

## Bindables

### {string} type

Used to decide which chart to render. It should always be a `string`

### {object} settings

The settings can differ depending on the library your leveraging. The settings
bindable is how aurelia-chart communicates library specific information
throughout the application.

### {string} [library]

An optional bindable that overwrites the library configurations. Handy for when
you have an exception to the rule-or preffer it over configuration.
